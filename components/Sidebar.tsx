import React from 'react';

const TRIPURA_EMBLEM_URL = "https://ui-avatars.com/api/?name=Tripura+Expert&background=007AFF&color=fff&size=128&bold=true";

const Sidebar: React.FC = () => {
  return (
    <div className="hidden md:flex flex-col w-[320px] lg:w-[350px] h-full glass-sidebar z-20">
      
      {/* Header */}
      <div className="h-[72px] flex items-center justify-between px-6 pt-2 shrink-0">
         <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Chats</h1>
         <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-black/5 transition-all text-blue-600">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
         </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 pb-4">
        <div className="bg-gray-100/50 rounded-[12px] flex items-center px-3 py-2.5 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 border border-transparent focus-within:border-blue-500/20">
          <svg viewBox="0 0 24 24" width="16" height="16" className="text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" placeholder="Search" className="bg-transparent w-full text-[15px] focus:outline-none text-gray-800 placeholder-gray-400" />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-4 space-y-2 py-2">
        
        {/* Active Chat Item */}
        <div className="group flex items-center p-3 rounded-[18px] bg-white shadow-sm border border-black/5 cursor-pointer transition-all">
          <div className="relative w-[52px] h-[52px] shrink-0 mr-3.5">
             <div className="w-full h-full rounded-[16px] overflow-hidden bg-white shadow-inner border border-gray-100">
                 <img src={TRIPURA_EMBLEM_URL} alt="Tripura Expert" className="w-full h-full object-cover" />
             </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline mb-0.5">
              <h3 className="text-gray-900 font-semibold text-[16px] truncate">Tripura History</h3>
              <span className="text-[12px] text-blue-600 font-medium">Now</span>
            </div>
            <p className="text-[14px] text-gray-600 truncate leading-snug">
               Historical analysis ready.
            </p>
          </div>
        </div>

        {/* Inactive Chat Item */}
        <div className="group flex items-center p-3 rounded-[18px] hover:bg-white/40 cursor-pointer transition-colors">
          <div className="w-[52px] h-[52px] shrink-0 rounded-[16px] bg-gradient-to-tr from-blue-400 to-cyan-300 overflow-hidden mr-3.5 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            A
          </div>
          <div className="flex-1 min-w-0 border-b border-gray-100/50 pb-3 group-hover:border-transparent">
            <div className="flex justify-between items-baseline mb-0.5">
              <h3 className="text-gray-800 font-medium text-[16px]">Archives Dept</h3>
              <span className="text-[12px] text-gray-400">Fri</span>
            </div>
            <p className="text-[14px] text-gray-400 truncate leading-snug">
               New digitization records available.
            </p>
          </div>
        </div>

        {/* Inactive Chat Item 2 */}
         <div className="group flex items-center p-3 rounded-[18px] hover:bg-white/40 cursor-pointer transition-colors">
          <div className="w-[52px] h-[52px] shrink-0 rounded-[16px] bg-gradient-to-tr from-orange-400 to-pink-400 overflow-hidden mr-3.5 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            M
          </div>
          <div className="flex-1 min-w-0 border-b border-gray-100/50 pb-3 group-hover:border-transparent">
            <div className="flex justify-between items-baseline mb-0.5">
              <h3 className="text-gray-800 font-medium text-[16px]">Museum Curator</h3>
              <span className="text-[12px] text-gray-400">Mon</span>
            </div>
            <p className="text-[14px] text-gray-400 truncate leading-snug">
               The statue dimensions are confirmed.
            </p>
          </div>
        </div>

      </div>
      
      {/* Bottom Profile Section */}
      <div className="p-4 border-t border-black/5 bg-white/20 backdrop-blur-md">
          <div className="flex items-center justify-between">
              <div className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-gray-200 mr-3 overflow-hidden shadow-sm border border-white">
                      <img src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff" alt="User" />
                  </div>
                  <div>
                      <p className="text-[15px] font-semibold text-gray-800">You</p>
                      <p className="text-[12px] text-gray-500">Online</p>
                  </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-black/5 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              </button>
          </div>
      </div>
    </div>
  );
};

export default Sidebar;