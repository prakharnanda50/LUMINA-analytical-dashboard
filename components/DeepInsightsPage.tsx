import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Sparkles, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';
import { getAnalystChat } from '../services/geminiService';
import { Chat } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const DeepInsightsPage: React.FC = () => {
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello, Jane. I am Lumina, your executive data analyst. How can I help you understand your business metrics today?' }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat
    setChatSession(getAnalystChat());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setTyping(true);

    try {
      const result = await chatSession.sendMessage({ message: userMsg });
      const responseText = result.text;
      
      setMessages(prev => [...prev, { role: 'model', text: responseText || "I'm having trouble analyzing that right now." }]);
    } catch (error) {
      console.error("Chat error", error);
      setMessages(prev => [...prev, { role: 'model', text: "I encountered an error connecting to the intelligence engine." }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-6">
      {/* Left Column: Strategic Signals */}
      <div className="w-full lg:w-1/3 space-y-4 overflow-y-auto pr-2">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
          <Sparkles className="w-5 h-5 text-primary mr-2" />
          Strategic Signals
        </h2>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">Opportunity</span>
          </div>
          <h3 className="font-semibold text-slate-800 mb-1">Enterprise Expansion</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Q4 Enterprise pipeline shows a 22% increase in deal size. Recommend allocating more SDR resources to this segment.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2 bg-amber-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-1 rounded-full">Risk</span>
          </div>
          <h3 className="font-semibold text-slate-800 mb-1">SMB Churn Alert</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Churn in the SMB cohort spiked to 3.2% last month. Competitor "Nexus" recently lowered pricing.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Observation</span>
          </div>
          <h3 className="font-semibold text-slate-800 mb-1">Feature Adoption</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Users who enable "Auto-Sync" have a 40% higher LTV. Suggest prominent in-app prompt.
          </p>
        </div>
      </div>

      {/* Right Column: Chat Interface */}
      <div className="flex-1 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
             </div>
             <div>
               <h3 className="font-bold text-slate-800 text-sm">Lumina Analyst</h3>
               <p className="text-xs text-slate-500">Powered by Gemini 3 Flash</p>
             </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-slate-200' : 'bg-primary'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-slate-600" /> : <Bot className="w-4 h-4 text-white" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-slate-100 text-slate-800 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {typing && (
             <div className="flex justify-start">
               <div className="flex flex-row items-center gap-3 ml-11">
                  <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-tl-none flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-slate-100 bg-white">
          <div className="flex items-center space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question about your data..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || typing}
              className="bg-primary hover:bg-primary/90 text-white p-3 rounded-lg transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
