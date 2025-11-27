import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

// Simple formatter to handle bold text and newlines
const FormatText = ({ text }: { text: string }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span className="whitespace-pre-wrap break-words text-[15px] leading-relaxed font-normal tracking-wide">
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="font-semibold">{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </span>
  );
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      
      {/* Avatar for Bot only - Outside Bubble */}
      {!isUser && (
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 mt-auto shadow-sm border border-white/50 bg-white">
           <img src="https://ui-avatars.com/api/?name=Tripura+Expert&background=007AFF&color=fff&size=128&bold=true" className="w-full h-full object-cover" alt="Bot Avatar" />
        </div>
      )}

      <div
        className={`relative max-w-[80%] sm:max-w-[70%] px-5 py-3 shadow-sm transition-all ${
          isUser
            ? 'bg-gradient-to-r from-[#5B7FFF] to-[#3366FF] text-white rounded-[22px] rounded-br-none'
            : 'bg-white text-gray-800 rounded-[22px] rounded-bl-none shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-white/60'
        }`}
      >
        {/* Image Content */}
        {message.image && (
          <div className="mb-3 -mx-2 -mt-2">
            <img 
              src={message.image} 
              alt="Uploaded content" 
              className="rounded-xl w-full h-auto max-h-80 object-cover"
            />
          </div>
        )}

        <div className={isUser ? "text-white antialiased" : "text-gray-800"}>
          <FormatText text={message.text} />
        </div>

        <div className={`flex items-center justify-end mt-1.5 space-x-1 ${isUser ? 'text-blue-100' : 'text-gray-400'}`}>
          <span className="text-[10px] font-medium opacity-90">
            {formatTime(message.timestamp)}
          </span>
          {isUser && (
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;