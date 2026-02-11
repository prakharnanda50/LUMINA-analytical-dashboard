import { GoogleGenAI, Modality, Type, Chat } from "@google/genai";
import { decodeBase64, decodeAudioData, playAudioBuffer } from "./audioUtils";
import { AnalysisResult, Anomaly } from "../types";

// Initialize Gemini Client
// CRITICAL: process.env.API_KEY is automatically injected.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Uses Gemini with Google Search Grounding to get latest market insights.
 */
export const fetchMarketInsights = async (query: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No insights available.";
    
    // Extract grounding chunks for sources
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => chunk.web)
      .filter((web: any) => web && web.uri && web.title) || [];

    return {
      text,
      relatedLinks: sources,
    };
  } catch (error) {
    console.error("Error fetching market insights:", error);
    return { text: "Failed to retrieve market insights. Please try again." };
  }
};

/**
 * Uses Gemini Vision (gemini-3-pro-preview) to analyze an uploaded image.
 */
export const analyzeImage = async (base64Image: string, prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/png", // Assuming PNG or JPEG, generic handling
              data: base64Image,
            },
          },
          { text: prompt },
        ],
      },
    });
    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw new Error("Failed to analyze the document.");
  }
};

/**
 * Uses Gemini TTS (gemini-2.5-flash-preview-tts) to speak text.
 */
export const speakText = async (text: string): Promise<void> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: {
        parts: [{ text }],
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Puck" }, // 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error("No audio data received.");
    }

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const audioBytes = decodeBase64(base64Audio);
    const audioBuffer = await decodeAudioData(audioBytes, audioContext, 24000, 1);
    
    playAudioBuffer(audioBuffer, audioContext);

  } catch (error) {
    console.error("Error generating speech:", error);
    alert("Could not generate audio summary.");
  }
};

/**
 * Detects data anomalies using Gemini 3 Flash with JSON schema.
 */
export const detectDataAnomalies = async (data: any): Promise<Anomaly[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this dataset for significant outliers, anomalies, or interesting patterns. 
      Dataset: ${JSON.stringify(data)}. 
      Return a list of anomalies. If none are found, return an empty list.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              period: { type: Type.STRING, description: "The time period or label where the anomaly occurred" },
              severity: { type: Type.STRING, enum: ["critical", "warning", "info"] },
              description: { type: Type.STRING, description: "Brief explanation of the anomaly" },
            },
            required: ["period", "severity", "description"],
          },
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as Anomaly[];
    }
    return [];
  } catch (error) {
    console.error("Error detecting anomalies:", error);
    return [];
  }
};

/**
 * Creates a chat session for the Deep Insights analyst.
 */
export const getAnalystChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are Lumina, a Senior Business Intelligence Analyst. 
      Your goal is to help executives understand their data.
      - Be concise, professional, and insight-driven.
      - If asked about data you don't have, make reasonable assumptions based on general industry trends for a SaaS company, but explicitly state they are assumptions.
      - Focus on actionable strategic advice.`,
    },
  });
};
