import React, { useEffect, useState } from 'react';
import { ParsedPage, parsePdfDocument } from '../services/pdfParserService';

export default function EasyReaderView() {
  const [pageData, setPageData] = useState<ParsedPage | null>(null);
  const [isSyllableMode, setIsSyllableMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Automatically parse mock document on mount for preview verification
    parsePdfDocument("").then((pages) => {
      if (pages.length > 0) setPageData(pages[0]);
      setLoading(false);
    });
  }, []);

  /**
   * Scans text tokens and injects spaced syllables dynamically when active
   */
  const processDocumentText = () => {
    if (!pageData) return "";
    if (!isSyllableMode) return pageData.text;

    let modifiedText = pageData.text;
    
    // Sort words by length descending to match larger tokens first safely
    const sortedMap = [...pageData.syllableMap].sort((a, b) => b.original.length - a.original.length);

    sortedMap.forEach(({ original, split }) => {
      // Use boundary regex to safely replace whole words without corrupting letters inside other terms
      const regex = new RegExp(`\\b${original}\\b`, 'g');
      modifiedText = modifiedText.replace(regex, split);
    });

    return modifiedText;
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-gray-500">Loading reader dashboard...</div>;
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white shadow-xl border-x font-sans">
      
      {/* HEADER BAR - (Cluttered chips bar completely gone) */}
      <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
        <button className="p-2 hover:bg-gray-200 rounded-full text-gray-700 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-black text-gray-900 tracking-wide">Zyralex</h1>
          <p className="text-xs text-gray-500 tracking-wider -mt-1">Simplified learning.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs bg-gray-200 text-gray-700 font-bold px-2.5 py-1 rounded-md">Page 1 of 1</span>
        </div>
      </div>

      {/* READING CANVAS VIEW */}
      <div className="flex-1 p-8 overflow-y-auto bg-white select-text">
        <p className="text-gray-800 text-2xl font-normal leading-[2.2rem] tracking-wide whitespace-pre-line transition-all duration-300">
          {processDocumentText()}
        </p>
      </div>

      {/* PRIMARY CONTROLS ACTION PANEL */}
      <div className="p-6 bg-gray-50 border-t space-y-4">
        <div className="flex gap-4 items-center justify-between">
          
          {/* THE SINGLE DEDICATED TOGGLE BUTTON */}
          <button
            onClick={() => setIsSyllableMode(!isSyllableMode)}
            className={`px-6 py-4 rounded-xl font-bold tracking-wide text-base border-2 transition-all duration-200 flex items-center gap-2 ${
              isSyllableMode 
                ? 'bg-purple-600 text-white border-purple-700 shadow-md transform scale-102' 
                : 'bg-white text-purple-700 border-purple-300 hover:bg-purple-50 shadow-sm'
            }`}
          >
            <span className="text-lg">{isSyllableMode ? '🟢' : '⚪'}</span>
            <span>Syllable Splitter</span>
          </button>

          {/* READ ALOUD AUDIO BAR */}
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition text-base tracking-wide">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            <span>Read Aloud</span>
          </button>
          
        </div>

        <button className="w-full text-center text-sm font-semibold text-gray-500 hover:text-gray-800 transition py-1">
          ⚙️ Adjust Accessibility Settings
        </button>
      </div>

    </div>
  );
}