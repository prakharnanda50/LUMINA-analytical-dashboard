import React, { useState } from 'react';
import { Search, Loader2, ExternalLink, Volume2 } from 'lucide-react';
import { fetchMarketInsights, speakText } from '../services/geminiService';
import { AnalysisResult } from '../types';

export const MarketInsights: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [speaking, setSpeaking] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    const data = await fetchMarketInsights(query);
    setResult(data);
    setLoading(false);
  };

  const handleSpeak = async () => {
    if (result && result.text) {
      setSpeaking(true);
      await speakText(result.text);
      setSpeaking(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-secondary/10 p-2 rounded-lg">
          <Search className="w-5 h-5 text-secondary" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">AI Market Intelligence</h3>
      </div>
      
      <p className="text-sm text-slate-500 mb-4">
        Ask complex questions about market trends, competitors, or financial news. 
        Powered by <span className="font-semibold text-primary">Gemini 3 Flash</span>.
      </p>

      <div className="flex space-x-2 mb-4">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="E.g., What is the outlook for SaaS in 2024?"
          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
        />
        <button 
          onClick={handleSearch}
          disabled={loading || !query}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Analyze'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-[150px] relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <div className="flex flex-col items-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
              <span className="text-xs text-slate-500">Searching live data...</span>
            </div>
          </div>
        )}
        
        {result && (
          <div className="prose prose-sm max-w-none text-slate-700">
             <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Insight</span>
                <button 
                  onClick={handleSpeak}
                  disabled={speaking}
                  className="p-1.5 hover:bg-slate-100 rounded-md transition-colors text-primary"
                  title="Read Aloud"
                >
                  {speaking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Volume2 className="w-4 h-4" />}
                </button>
             </div>
            <p className="whitespace-pre-wrap leading-relaxed">{result.text}</p>
            
            {result.relatedLinks && result.relatedLinks.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Sources</h4>
                <ul className="space-y-1">
                  {result.relatedLinks.map((link, idx) => (
                    <li key={idx}>
                      <a href={link.uri} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs text-primary hover:underline">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {!result && !loading && (
          <div className="h-full flex flex-col items-center justify-center text-slate-300">
            <Search className="w-12 h-12 mb-2 opacity-20" />
            <span className="text-sm">Ready to research</span>
          </div>
        )}
      </div>
    </div>
  );
};
