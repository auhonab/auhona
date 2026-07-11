"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Inbox, Flag, FileText as DraftsIcon, Send, Trash2, Archive, Folder,
  Search, Edit, ExternalLink, MoreHorizontal, Filter, Reply, Forward,
  User, MessageSquare, Megaphone, X
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

const papers = [
  {
    id: 1,
    title: "A Hierarchical conv-LSTM and LLM Integrated Model for Holistic Stock Forecasting",
    listTitle: "A Hierarchical conv-LSTM and LLM Integrated Model for Holistic Stock Forecasting",
    authors: "Auhona Basu, Arya Chakraborty",
    date: "October 2024",
    time: "12:59 AM",
    venue: "arXiv preprint arXiv:2410.12807",
    arxivUrl: "https://arxiv.org/abs/2410.12807",
    pdfUrl: "https://arxiv.org/pdf/2410.12807",
    tags: ["Conv-LSTM", "LLM", "Stock Forecasting", "Sentiment", "Time Series", "q-fin.ST"],
    abstract: `The financial domain presents a complex environment for stock market prediction, characterized by volatile patterns and the influence of multifaceted data sources. Traditional models have leveraged either Convolutional Neural Networks (CNN) for spatial feature extraction or Long Short-Term Memory (LSTM) networks for capturing temporal dependencies, with limited integration of external textual data. 

This paper proposes a novel Two-Level Conv-LSTM Neural Network integrated with a Large Language Model (LLM) for comprehensive stock advising. The model harnesses the strengths of Conv-LSTM for analyzing time-series data and LLM for processing and understanding textual information from financial news, social media, and reports. 

In the first level, convolutional layers are employed to identify local patterns in historical stock prices and technical indicators, followed by LSTM layers to capture the temporal dynamics. The second level integrates the output with an LLM that analyzes sentiment and contextual information from textual data, providing a holistic view of market conditions. The combined approach aims to improve prediction accuracy and provide contextually rich stock advising.`
  }
];

const draftPapers = [
  {
    id: 101,
    title: "Work In Progress",
    listTitle: "Ai Agents",
    authors: "Auhona Basu",
    date: "2026",
    time: "Draft",
    venue: "Draft",
    arxivUrl: "#",
    pdfUrl: "#",
    tags: ["Draft", "AI"],
    abstract: "you might want to check back later this year"
  },
  {
    id: 102,
    title: "Work In Progress",
    listTitle: "Trustscript XAI",
    authors: "Auhona Basu",
    date: "2026",
    time: "Draft",
    venue: "Draft",
    arxivUrl: "#",
    pdfUrl: "#",
    tags: ["Draft", "XAI"],
    abstract: "you might want to check back later this year"
  }
];

export default function ResearchWorkSection() {
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [showContact, setShowContact] = useState(false);
  const [activeTab, setActiveTab] = useState("All Research");

  const activePaper = selectedId ? [...papers, ...draftPapers].find(p => p.id === selectedId) : null;

  const handleTabClick = (name: string) => {
    setActiveTab(name);
    if (name === "Drafts" || name === "NLP/LLM") {
      setSelectedId(null);
    } else {
      setSelectedId(papers[0].id);
    }
  };

  const renderTabItem = (name: string, IconComponent: any, count: number, isLast = false) => {
    const isActive = activeTab === name;
    return (
      <div 
        onClick={() => handleTabClick(name)}
        className={`flex flex-row items-center rounded-md transition-colors ${isActive ? 'bg-[#0a84ff]/20 text-[#0a84ff] cursor-default' : 'text-[#ccc] hover:bg-[#2c2c2e] cursor-pointer'}`} 
        style={{ gap: '10px', padding: '6px 8px', marginBottom: isLast ? '16px' : '2px' }}
      >
         <IconComponent size={15} className={isActive ? "opacity-100" : "opacity-70"} />
         <span className="text-[13px] font-medium">{name}</span>
         <span className={`ml-auto text-[11px] font-medium ${isActive ? 'text-[#0a84ff]' : 'text-[#888]'}`}>{count}</span>
      </div>
    );
  };

  return (
    <motion.section
      id="research"
      className="min-h-screen w-full flex flex-col items-center justify-center bg-black px-2 sm:px-6 lg:px-8 py-20"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
        <motion.div
          className="w-full flex flex-col items-center"
          variants={fadeIn}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 
            className="text-center text-5xl sm:text-[64px] font-bold tracking-tight text-white"
            style={{ fontFamily: '"Dela Gothic One", sans-serif', paddingBottom: '48px' }}
          >
            Research Works
          </h2>

          {/* Apple Mail OS Window */}
          <div className="w-full h-[600px] sm:h-[700px] rounded-xl overflow-x-auto overflow-y-hidden flex flex-row font-sans border border-[#333] shadow-2xl relative" style={{ backgroundColor: '#1e1e1e' }}>
            
            {/* Contact Popup */}
            <AnimatePresence>
              {showContact && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-[#1c1c1e] border border-[#333] rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-md w-full mx-4"
                  >
                    <div className="flex justify-end p-4">
                      <button onClick={() => setShowContact(false)} className="text-[#888] hover:text-white transition-colors">
                        <X size={20} />
                      </button>
                    </div>
                    <div className="px-8 pb-8 text-center flex flex-col items-center">
                      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: '"Dela Gothic One", sans-serif' }}>
                        Let's Connect
                      </h3>
                      <p className="text-[#ccc] text-[15px] mb-2 font-medium">Have a research idea?</p>
                      <p className="text-[#ccc] text-[15px] mb-8 font-medium">Want to collaborate? Reach out.</p>
                      <a 
                        href="#contact"
                        onClick={() => setShowContact(false)}
                        className="bg-[#0a84ff] hover:bg-[#0a84ff]/90 text-white rounded-md font-medium transition-colors w-full flex items-center justify-center"
                        style={{ padding: '12px 24px', fontSize: '14px' }}
                      >
                        Contact Me
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Left Sidebar (Horizontally scrollable on mobile) */}
            <div 
              className="flex flex-col border-r border-[#333] relative flex-shrink-0" 
              style={{ 
                width: '240px',
                backgroundColor: '#141414'
              }}
            >
              {/* Traffic Lights */}
              <div className="flex flex-row gap-2" style={{ padding: '20px 16px 16px' }}>
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
              </div>

              {/* Mailboxes */}
              <div className="overflow-y-auto" style={{ padding: '0px 12px 24px' }}>
                <h3 className="text-[#888] text-[11px] font-bold tracking-wide" style={{ padding: '0px 8px', marginBottom: '8px' }}>Favorites</h3>
                
                {renderTabItem("All Research", Inbox, 1)}
                {renderTabItem("Featured", Flag, 1)}
                {renderTabItem("Drafts", DraftsIcon, 2)}

                <h3 className="text-[#888] text-[11px] font-bold tracking-wide" style={{ padding: '0px 8px', marginTop: '16px', marginBottom: '8px' }}>Categories</h3>
                
                {renderTabItem("Deep Learning", Folder, 1)}
                {renderTabItem("Time Series", DraftsIcon, 1)}
                {renderTabItem("NLP/LLM", Send, 0)}

                <h3 className="text-[#888] text-[11px] font-bold tracking-wide" style={{ padding: '0px 8px', marginTop: '16px', marginBottom: '8px' }}>Google Scholar</h3>
                
                <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center text-[#ccc] hover:bg-[#2c2c2e] rounded-md cursor-pointer transition-colors" style={{ gap: '10px', padding: '6px 8px', marginBottom: '2px' }}>
                   <ExternalLink size={15} className="opacity-70" />
                   <span className="text-[13px] font-medium">Auhona</span>
                </a>
              </div>
            </div>

            {/* Middle Pane (Message List) */}
            <div className="flex flex-col border-r border-[#333] flex-shrink-0" style={{ width: '320px', backgroundColor: '#1A1A1A' }}>
              <div style={{ padding: '16px 16px 12px 16px', borderBottom: '1px solid #333' }}>
                <div className="flex justify-between items-center" style={{ marginBottom: '4px' }}>
                  <h2 className="font-bold text-white" style={{ fontSize: '13px' }}>{activeTab}</h2>
                  <div className="flex text-[#aaa]" style={{ gap: '12px' }}>
                    <Filter size={14} className="cursor-pointer hover:text-white" />
                    <MoreHorizontal size={14} className="cursor-pointer hover:text-white" />
                  </div>
                </div>
                <p className="text-[#888]" style={{ fontSize: '11px', marginBottom: '12px' }}>
                  {activeTab} · {
                    activeTab === "All Research" ? "1 paper, 2 Drafts" :
                    activeTab === "NLP/LLM" ? "0 papers" : 
                    activeTab === "Drafts" ? "2 Drafts" : 
                    "1 paper"
                  }
                </p>
                
                {/* Categorization Pills (from screenshot) */}
                <div className="flex flex-row items-center" style={{ gap: '16px' }}>
                  <div className="bg-[#0a84ff] text-white rounded-full flex items-center justify-center font-medium" style={{ padding: '4px 12px', gap: '6px' }}>
                     <User size={12} />
                     <span style={{ fontSize: '11px' }}>All</span>
                  </div>
                  <Archive size={14} className="text-[#888] cursor-pointer hover:text-white" />
                  <MessageSquare size={14} className="text-[#888] cursor-pointer hover:text-white" />
                  <Megaphone size={14} className="text-[#888] cursor-pointer hover:text-white" />
                </div>
              </div>

              {/* Message Items */}
              <div className="flex-1 overflow-y-auto">
                {activeTab === "NLP/LLM" ? (
                  <div className="flex-1 flex h-full items-center justify-center" style={{ minHeight: '200px' }}>
                    <span className="text-[#888] font-medium" style={{ fontSize: '13px' }}>Nothing to show here yet.</span>
                  </div>
                ) : activeTab === "Drafts" ? (
                  <>
                    {draftPapers.map((paper) => (
                      <div key={paper.id} style={{ padding: '4px 8px', borderBottom: selectedId === paper.id ? 'none' : '1px solid #333' }}>
                        <div 
                          onClick={() => setSelectedId(selectedId === paper.id ? null : paper.id)}
                          className={`flex flex-col cursor-pointer transition-colors rounded-lg ${selectedId === paper.id ? 'bg-[#0a84ff] text-white shadow-sm' : 'hover:bg-[#2c2c2e]'}`}
                          style={{ padding: '10px 12px' }}
                        >
                          <div className="flex flex-row justify-between items-baseline" style={{ marginBottom: '4px' }}>
                            <div className="flex flex-row items-center" style={{ gap: '8px' }}>
                              <div 
                                className={`rounded-full ${selectedId === paper.id ? 'bg-white' : 'bg-[#0a84ff]'}`}
                                style={{ width: '8px', height: '8px' }}
                              />
                              <span className={`font-bold ${selectedId === paper.id ? 'text-white' : 'text-[#ddd]'}`} style={{ fontSize: '13px' }}>
                                Auhona Basu
                              </span>
                            </div>
                            <span className={`${selectedId === paper.id ? 'text-white/80' : 'text-[#888]'}`} style={{ fontSize: '11px', paddingLeft: '8px' }}>
                              {paper.time}
                            </span>
                          </div>
                          <span 
                            className={`font-semibold line-clamp-1 ${selectedId === paper.id ? 'text-white' : 'text-[#ccc]'}`}
                            style={{ paddingLeft: '16px', paddingRight: '8px', marginBottom: '4px', fontSize: '13px' }}
                          >
                            {paper.listTitle}
                          </span>
                          <span 
                            className={`line-clamp-2 leading-snug ${selectedId === paper.id ? 'text-white/70' : 'text-[#888]'}`}
                            style={{ paddingLeft: '16px', paddingRight: '8px', fontSize: '12px' }}
                          >
                            {paper.abstract}
                          </span>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  papers.map((paper) => (
                    <div key={paper.id} style={{ padding: '4px 8px', borderBottom: selectedId === paper.id ? 'none' : '1px solid #333' }}>
                      <div 
                        onClick={() => setSelectedId(selectedId === paper.id ? null : paper.id)}
                        className={`flex flex-col cursor-pointer transition-colors rounded-lg ${selectedId === paper.id ? 'bg-[#0a84ff] text-white shadow-sm' : 'hover:bg-[#2c2c2e]'}`}
                        style={{ padding: '10px 12px' }}
                      >
                        <div className="flex flex-row justify-between items-baseline" style={{ marginBottom: '4px' }}>
                          <div className="flex flex-row items-center" style={{ gap: '8px' }}>
                            {/* Unread Dot */}
                            <div 
                              className={`rounded-full ${selectedId === paper.id ? 'bg-white' : 'bg-[#0a84ff]'}`}
                              style={{ width: '8px', height: '8px' }}
                            />
                            <span className={`font-bold ${selectedId === paper.id ? 'text-white' : 'text-[#ddd]'}`} style={{ fontSize: '13px' }}>
                              Auhona Basu
                            </span>
                          </div>
                          <span className={`${selectedId === paper.id ? 'text-white/80' : 'text-[#888]'}`} style={{ fontSize: '11px', paddingLeft: '8px' }}>
                            {paper.time}
                          </span>
                        </div>
                        <span 
                          className={`font-semibold line-clamp-1 ${selectedId === paper.id ? 'text-white' : 'text-[#ccc]'}`}
                          style={{ paddingLeft: '16px', paddingRight: '8px', marginBottom: '4px', fontSize: '13px' }}
                        >
                          {paper.listTitle}
                        </span>
                        <span 
                          className={`line-clamp-2 leading-snug ${selectedId === paper.id ? 'text-white/70' : 'text-[#888]'}`}
                          style={{ paddingLeft: '16px', paddingRight: '8px', fontSize: '12px' }}
                        >
                          {paper.abstract}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Pane (Reading View) */}
            <div className="flex-1 flex flex-col flex-shrink-0" style={{ backgroundColor: '#1c1c1e', minWidth: '400px' }}>
              {activePaper ? (
                <>
                  {/* Toolbar */}
                  <div className="border-b border-[#333] flex flex-row items-center justify-between" style={{ height: '52px', padding: '0px 24px' }}>
                    <div className="flex flex-row items-center text-[#888]" style={{ gap: '16px' }}>
                      <div 
                        onClick={() => setShowContact(true)}
                        className="border border-[#444] rounded-md flex items-center justify-center cursor-pointer hover:bg-[#2c2c2e] transition-colors" style={{ padding: '6px 10px' }}>
                        <Edit size={14} className="hover:text-white" />
                      </div>
                      
                      <div className="flex flex-row items-center border border-[#444] rounded-md overflow-hidden">
                        <div className="cursor-pointer hover:bg-[#2c2c2e] transition-colors border-r border-[#444]" style={{ padding: '6px 10px' }}>
                          <Reply size={14} className="hover:text-white" />
                        </div>
                        <div className="cursor-pointer hover:bg-[#2c2c2e] transition-colors" style={{ padding: '6px 10px' }}>
                          <Forward size={14} className="hover:text-white" />
                        </div>
                      </div>
                      
                      <div className="flex flex-row items-center border border-[#444] rounded-md overflow-hidden">
                        <div className="cursor-pointer hover:bg-[#2c2c2e] transition-colors border-r border-[#444]" style={{ padding: '6px 10px' }}>
                          <Archive size={14} className="hover:text-white" />
                        </div>
                        <div className="cursor-pointer hover:bg-[#2c2c2e] transition-colors" style={{ padding: '6px 10px' }}>
                          <Trash2 size={14} className="hover:text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-row items-center" style={{ gap: '12px' }}>
                      <div className="bg-[#2c2c2e] border border-[#444] rounded-md flex items-center cursor-pointer hover:bg-[#3a3a3c] transition-colors" style={{ padding: '6px 10px' }}>
                         <Search size={14} className="text-[#888] hover:text-white" />
                      </div>
                      
                      <a 
                        href={activePaper.arxivUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white rounded-md flex items-center font-medium transition-colors border border-[#444]"
                        style={{ gap: '8px', padding: '6px 12px', fontSize: '11px' }}
                      >
                        <ExternalLink size={12} className="opacity-70" />
                        arXiv
                      </a>
                      <a 
                        href={activePaper.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white rounded-md flex items-center font-medium transition-colors border border-[#444]"
                        style={{ gap: '8px', padding: '6px 12px', fontSize: '11px' }}
                      >
                        <DraftsIcon size={12} className="opacity-70" />
                        PDF
                      </a>
                    </div>
                  </div>
                  
                  {/* Email Content */}
                  <div className="flex-1 overflow-y-auto" style={{ padding: '40px' }}>
                    <h1 className="font-bold text-white leading-tight" style={{ fontSize: '24px', marginBottom: '24px' }}>
                      {activePaper.title}
                    </h1>
                    
                    {/* Header Row */}
                    <div className="flex flex-row items-start border-b border-[#333]" style={{ marginBottom: '32px', paddingBottom: '24px' }}>
                      <div className="rounded-full bg-gradient-to-br from-[#0a84ff] to-[#5e5ce6] flex items-center justify-center text-white font-bold shadow-inner flex-shrink-0" style={{ width: '48px', height: '48px', marginRight: '16px', fontSize: '18px' }}>
                        A
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex flex-row justify-between items-baseline">
                          <span className="font-bold text-white" style={{ fontSize: '14px' }}>
                            {activePaper.authors}
                          </span>
                          <span className="text-[#888]" style={{ fontSize: '12px' }}>
                            {activePaper.date} at {activePaper.time}
                          </span>
                        </div>
                        <span className="text-[#aaa]" style={{ fontSize: '12px', marginTop: '2px' }}>
                          To: Research Community
                        </span>
                        <span className="text-[#888]" style={{ fontSize: '12px', marginTop: '2px' }}>
                          Venue: {activePaper.venue}
                        </span>
                      </div>
                    </div>
                    
                    {/* Body */}
                    <div className="text-[#ddd] leading-relaxed whitespace-pre-wrap" style={{ fontSize: '14px', marginBottom: '40px', maxWidth: '768px' }}>
                      {activePaper.abstract}
                    </div>
                    
                    {/* Tags acting as attachments/footer */}
                    <div className="border-t border-[#333]" style={{ paddingTop: '24px' }}>
                      <p className="text-[#888] uppercase tracking-wider font-bold" style={{ fontSize: '11px', marginBottom: '12px' }}>Tags & Keywords</p>
                      <div className="flex flex-wrap" style={{ gap: '8px' }}>
                        {activePaper.tags.map(tag => (
                          <span key={tag} className="bg-[#2c2c2e] border border-[#444] text-[#ccc] rounded-full" style={{ padding: '4px 12px', fontSize: '12px' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-[#888] font-medium" style={{ fontSize: '18px' }}>No Message Selected</span>
                </div>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
