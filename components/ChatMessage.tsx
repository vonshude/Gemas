
import React from 'react';
import { Message, Role } from '../types';
import { UserIcon } from './icons/UserIcon';
import { BotIcon } from './icons/BotIcon';

interface ChatMessageProps {
  message: Message;
}

// A simple function to format text with bold and lists.
const FormattedContent: React.FC<{ content: string }> = ({ content }) => {
    const lines = content.split('\n');
    return (
        <>
            {lines.map((line, i) => {
                let formattedLine = line;
                
                // Bold text: **text**
                formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                
                // Unordered list item: * item or - item
                if (formattedLine.trim().startsWith('* ') || formattedLine.trim().startsWith('- ')) {
                    return <li key={i} className="ml-5" dangerouslySetInnerHTML={{ __html: formattedLine.substring(2) }} />;
                }

                return <p key={i} className="my-1" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
            })}
        </>
    );
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isModel = message.role === Role.Model;
  
  if (isModel && message.content === "") {
      // Don't render empty placeholder
      return null;
  }

  return (
    <div className={`flex items-start gap-3 ${isModel ? 'justify-start' : 'justify-end'}`}>
      {isModel && <BotIcon />}
      
      <div 
        className={`px-4 py-3 rounded-xl max-w-xl lg:max-w-2xl xl:max-w-3xl whitespace-pre-wrap ${
          isModel 
            ? 'bg-white text-gray-800 border border-gray-200' 
            : 'bg-blue-600 text-white'
        }`}
      >
        <div className="prose prose-sm max-w-none">
            <FormattedContent content={message.content} />
            {isModel && message.content.length === 0 && (
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                </div>
            )}
        </div>
      </div>

      {!isModel && <UserIcon />}
    </div>
  );
};
