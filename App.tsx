import React from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center p-4 sm:p-8 lg:p-12">
        
        {/* Main App Container - Floating Glass Window */}
        <div className="w-full h-full max-w-[1400px] glass-window rounded-[40px] flex overflow-hidden relative shadow-2xl">
            <Sidebar />
            <ChatInterface />
        </div>
    </div>
  );
};

export default App;