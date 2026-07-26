import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Calendar, ExternalLink, ChevronLeft, ChevronRight, FileText, Globe } from 'lucide-react';
import { useMCP } from '../context/MCPProvider';

// URL Validator
const safeUrl = (url) => {
  if (!url) return '#';
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return url;
    return '#';
  } catch {
    if (url.startsWith('/')) return `https://scholar.google.com${url}`;
    if (!url.startsWith('http')) return `https://${url}`;
    return '#';
  }
};

const ITEMS_PER_PAGE = 9;

export default function ResearchPage() {
  const { client, isConnected } = useMCP();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [paperResults, setPaperResults] = useState([]);
  const [confResults, setConfResults] = useState([]);
  const [error, setError] = useState(null);
  
  // Pagination State for Papers
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(paperResults.length / ITEMS_PER_PAGE);
  const currentPaperResults = paperResults.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Initial load for default conferences
  React.useEffect(() => {
    if (!client || !isConnected) return;
    
    const fetchDefaultConferences = async () => {
      setLoading(true);
      try {
        const confRes = await client.callTool({ 
          name: 'research_search_conferences', 
          arguments: { query: 'Technology OR Computer Science' } 
        });
        
        if (confRes.status !== 'error') {
          const cData = confRes?.content?.[0]?.text ? JSON.parse(confRes.content[0].text) : confRes;
          setConfResults(cData?.conferences || []);
        }
      } catch (err) {
        console.error("Failed to fetch default conferences", err);
      } finally {
        setLoading(false);
      }
    };
    
    // Only fetch if empty
    if (confResults.length === 0 && paperResults.length === 0 && !query) {
       fetchDefaultConferences();
    }
  }, [client, isConnected]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    if (!client || !isConnected) {
      setError("Not connected to the Ekalavya server. Please refresh.");
      return;
    }

    setLoading(true);
    setError(null);
    setPaperResults([]);
    setConfResults([]);
    setCurrentPage(1);

    try {
      // Fetch both papers and conferences concurrently
      const [paperRes, confRes] = await Promise.allSettled([
        client.callTool({ name: 'research_search_papers', arguments: { query } }),
        client.callTool({ name: 'research_search_conferences', arguments: { query } })
      ]);

      let newPapers = [];
      let newConfs = [];

      if (paperRes.status === 'fulfilled') {
        const pData = paperRes.value?.content?.[0]?.text ? JSON.parse(paperRes.value.content[0].text) : paperRes.value;
        newPapers = pData?.papers || [];
      } else {
        console.error("Paper search failed", paperRes.reason);
      }

      if (confRes.status === 'fulfilled') {
        const cData = confRes.value?.content?.[0]?.text ? JSON.parse(confRes.value.content[0].text) : confRes.value;
        newConfs = cData?.conferences || [];
      } else {
        console.error("Conference search failed", confRes.reason);
      }

      setPaperResults(newPapers);
      setConfResults(newConfs);

      if (newPapers.length === 0 && newConfs.length === 0) {
        setError("No results found. Google Scholar may be rate limiting — try a different query.");
      }
    } catch (err) {
      setError("Failed to fetch research data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto custom-scrollbar relative">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <BookOpen className="text-[#fbc05c]" size={36} /> Research Engine
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Algorithmic exploration of academic literature, research papers, and technical publications.
          </p>
        </div>

        {/* Search */}
        <div className="flex w-full mb-10">
          <form onSubmit={handleSearch} className="w-full relative">
            <input
              type="text"
              placeholder="Search topics, authors, or specific domains..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-4 pl-12 text-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#fbc05c]/50 transition-colors"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={22} />
            <button type="submit" disabled={loading} className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#fbc05c]/10 text-[#fbc05c] p-2 rounded-lg hover:bg-[#fbc05c]/20 transition-colors">
               <ChevronRight size={22} />
            </button>
          </form>
        </div>

        {/* Content Area */}
        {loading && (
          <div className="flex justify-center items-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fbc05c]"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-center mb-8">
            {error}
          </div>
        )}

        {/* Papers Section */}
        {!loading && paperResults.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="text-[#fbc05c]" /> Academic Literature
            </h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AnimatePresence mode="popLayout">
                {currentPaperResults.map((item, idx) => (
                  <motion.div
                    key={`${item.title}-${idx}`}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 hover:border-[#fbc05c]/30 hover:shadow-[0_0_20px_rgba(251,192,92,0.1)] transition-all flex flex-col h-full group"
                  >
                    <div className="flex justify-between items-start mb-3">
                        <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <FileText size={12}/> Paper
                        </span>
                        {item.authors_venue_year && (
                          <span className="text-xs text-gray-500 font-mono bg-black/50 px-2 py-1 rounded">
                            {item.authors_venue_year.split('-')[-1]?.trim() || 'N/A'}
                          </span>
                        )}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-[#fbc05c] transition-colors">{item.title}</h3>
                    <p className="text-xs text-gray-400 mb-4 line-clamp-1 italic">{item.authors_venue_year}</p>
                    <p className="text-sm text-gray-300 line-clamp-4 mb-6 flex-1">{item.abstract || 'No abstract available.'}</p>
                    <a 
                      href={safeUrl(item.link)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-auto w-full py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      View Paper <ExternalLink size={16} />
                    </a>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-6 mt-12 mb-8">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex items-center gap-2">
                   <span className="text-sm text-gray-400">Page</span>
                   <span className="px-3 py-1 bg-[#111] border border-white/10 rounded-md font-bold text-white">{currentPage}</span>
                   <span className="text-sm text-gray-400">of {totalPages}</span>
                </div>

                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Conferences Section */}
        {!loading && confResults.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Globe className="text-emerald-400" /> Current Conferences & Calls for Papers
            </h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AnimatePresence mode="popLayout">
                {confResults.map((item, idx) => (
                  <motion.div
                    key={`conf-${idx}`}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all flex flex-col h-full group"
                  >
                    <div className="flex justify-between items-start mb-3">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${item.type === 'Journal' ? 'bg-purple-500/10 text-purple-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                          <Globe size={12}/> {item.type}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                    
                    <div className="bg-white/5 rounded-lg p-3 mb-4 border border-white/5">
                        <div className="flex items-center gap-2 text-emerald-400 mb-1">
                          <Calendar size={14} />
                          <span className="text-xs font-bold uppercase tracking-wider">Deadline / Date</span>
                        </div>
                        <p className="text-sm font-medium text-white">{item.deadline}</p>
                    </div>
                    
                    <p className="text-sm text-gray-400 line-clamp-3 mb-6 flex-1">{item.description}</p>
                    <a 
                      href={safeUrl(item.url)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-auto w-full py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      View Details <ExternalLink size={16} />
                    </a>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
        
        {!loading && !error && paperResults.length === 0 && confResults.length === 0 && (
          <div className="text-center py-20">
             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-gray-500" size={24} />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">No research found</h3>
             <p className="text-gray-500 max-w-md mx-auto">Try adjusting your search query to explore different academic resources.</p>
          </div>
        )}
      </div>
    </div>
  );
}
