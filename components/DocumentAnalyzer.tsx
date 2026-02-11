import React, { useRef, useState } from 'react';
import { Upload, FileImage, Loader2, ScanEye } from 'lucide-react';
import { analyzeImage } from '../services/geminiService';

export const DocumentAnalyzer: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Reset state
      setAnalysis('');
    }
  };

  const handleAnalyze = async () => {
    if (!preview) return;
    setLoading(true);
    
    // Extract base64 content only (remove data:image/png;base64, prefix)
    const base64Data = preview.split(',')[1];
    
    try {
      const result = await analyzeImage(
        base64Data, 
        "Analyze this chart or document. Identify key trends, anomalies, and provide a summary for an executive."
      );
      setAnalysis(result);
    } catch (err) {
      setAnalysis("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-warning/10 p-2 rounded-lg">
          <ScanEye className="w-5 h-5 text-warning" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Visual Data Analyst</h3>
      </div>
      
      <p className="text-sm text-slate-500 mb-4">
        Upload a screenshot of a competitor's dashboard, a PDF report table, or a chart. 
        <span className="font-semibold text-warning ml-1">Gemini 3 Pro</span> will extract the insights.
      </p>

      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-slate-50 hover:border-warning/50 transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6 text-slate-400 group-hover:text-warning" />
          </div>
          <span className="text-sm font-medium text-slate-600">Click to upload image</span>
          <span className="text-xs text-slate-400 mt-1">PNG, JPG supported</span>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="relative h-32 w-full bg-slate-100 rounded-lg overflow-hidden mb-4 border border-slate-200">
            <img src={preview} alt="Upload preview" className="w-full h-full object-cover opacity-80" />
            <button 
              onClick={() => {
                setPreview(null);
                setSelectedFile(null);
                setAnalysis('');
              }}
              className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full hover:bg-red-50 text-slate-500 hover:text-red-500 transition-colors"
            >
              <FileImage className="w-4 h-4" />
            </button>
          </div>
          
          {analysis ? (
             <div className="flex-1 overflow-y-auto text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 prose prose-sm max-w-none">
                <p>{analysis}</p>
             </div>
          ) : (
            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing visual data...
                </>
              ) : (
                'Run Visual Analysis'
              )}
            </button>
          )}
        </div>
      )}

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
};
