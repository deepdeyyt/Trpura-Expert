import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../types';
import MessageBubble from './MessageBubble';
import { sendMessageToGemini } from '../services/geminiService';
import { INITIAL_GREETING } from '../constants';

const TRIPURA_EMBLEM_URL = "https://ui-avatars.com/api/?name=Tripura+Expert&background=007AFF&color=fff&size=128&bold=true";

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize with greeting
  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: INITIAL_GREETING,
        sender: 'bot',
        timestamp: new Date(),
        status: 'read'
      }
    ]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, selectedImage]);

  const handleSendMessage = async () => {
    if (!inputText.trim() && !selectedImage) return;

    const currentText = inputText;
    const currentImage = selectedImage;

    // Reset input immediately
    setInputText('');
    setSelectedImage(null);

    const userMsg: Message = {
      id: Date.now().toString(),
      text: currentText,
      image: currentImage || undefined,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text, currentImage || undefined);
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
        status: 'read'
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "I encountered an error connecting to the archives. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        status: 'read'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full relative glass-content">
      
      {/* Header - Frosted Glass Strip */}
      <div className="h-[72px] flex items-center px-6 z-10 shrink-0 glass-header">
        <div className="flex items-center space-x-3.5 cursor-pointer">
          {/* Profile Picture */}
          <div className="w-[42px] h-[42px] rounded-[14px] overflow-hidden bg-white shadow-sm p-0.5 border border-white/50">
            <img src={TRIPURA_EMBLEM_URL} alt="Tripura Emblem" className="w-full h-full object-cover rounded-[12px]" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[17px] text-gray-900 leading-none mb-1">Tripura History Expert</span>
            <span className="text-[13px] text-gray-500 font-medium leading-none">Online</span>
          </div>
        </div>
        <div className="ml-auto flex space-x-3 text-gray-600">
           <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
           </button>
           <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
           </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 z-10 scroll-smooth">
        {/* Date Divider */}
        <div className="flex justify-center my-6">
             <span className="text-[12px] font-medium text-gray-500 bg-white/50 px-3 py-1 rounded-full backdrop-blur-md shadow-sm border border-white/40">Today</span>
        </div>

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        
        {isLoading && (
           <div className="flex w-full mb-6 justify-start pl-14 animate-fade-in">
             <div className="relative bg-white text-gray-800 rounded-[22px] rounded-bl-none px-5 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-white/60">
                <div className="flex space-x-1.5 items-center h-4">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Floating Capsule */}
      <div className="p-6 shrink-0 z-20 flex justify-center pb-8">
         <div className="w-full max-w-4xl glass-input-capsule rounded-full p-1.5 pl-2 flex items-center space-x-2 relative">
            
            {/* Image Upload Button - Left Side Plus */}
            <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />
            <button 
                onClick={triggerFileInput}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${selectedImage ? 'bg-blue-100 text-blue-600 rotate-45' : 'hover:bg-black/5 text-gray-500'}`}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>

            {/* Input Field */}
            <div className="flex-1 flex flex-col justify-center px-1">
                {selectedImage && (
                    <div className="flex items-center space-x-2 mb-1 absolute -top-14 left-4 bg-white/90 backdrop-blur rounded-xl p-2 shadow-sm border border-white/50">
                        <div className="relative group">
                             <img src={selectedImage} alt="Selected" className="h-10 w-10 rounded-lg object-cover" />
                             <button onClick={clearSelectedImage} className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-0.5 shadow-md">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                             </button>
                        </div>
                        <span className="text-[11px] text-gray-600 font-medium">Image attached</span>
                    </div>
                )}
                <input 
                    type="text" 
                    className="w-full bg-transparent focus:outline-none text-gray-900 placeholder-gray-400 text-[16px] h-full py-2 px-1"
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </div>

            {/* Send Button - Right Arrow */}
            <button 
                onClick={handleSendMessage} 
                disabled={!inputText.trim() && !selectedImage}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    (inputText.trim() || selectedImage) 
                    ? 'text-blue-600 hover:bg-blue-50' 
                    : 'text-gray-300 cursor-not-allowed'
                }`}
            >
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="transform rotate-0"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
            </button>
         </div>
      </div>
    </div>
  );
};

export default ChatInterface;