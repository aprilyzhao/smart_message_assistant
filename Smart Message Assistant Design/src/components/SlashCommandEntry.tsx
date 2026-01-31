import { MessageSquare, Smile, AtSign, Bold, Italic } from 'lucide-react';
import { useState } from 'react';

interface SlashCommandEntryProps {
  onOpenModal: () => void;
  isActive: boolean;
}

export function SlashCommandEntry({ onOpenModal, isActive }: SlashCommandEntryProps) {
  const [inputValue, setInputValue] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setShowHint(value === '/sma' || value.startsWith('/sma '));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue === '/sma') {
      e.preventDefault();
      onOpenModal();
      setInputValue('');
      setShowHint(false);
    }
  };

  return (
    <div className="border-t border-gray-300 px-5 py-4 relative">
      {showHint && (
        <div className="absolute bottom-full left-5 mb-2 bg-white border border-gray-300 rounded shadow-lg p-3 w-[400px]">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 bg-[#611f69] rounded flex items-center justify-center text-white flex-shrink-0 mt-0.5">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="text-gray-900 mb-1">Smart Message Assistant</div>
              <div className="text-xs text-gray-600">
                Refine, translate, or adjust the style & tone of your message
              </div>
              <div className="text-xs text-gray-500 mt-2">Press Enter to open</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="border border-gray-400 rounded-lg focus-within:border-[#1164a3] focus-within:shadow-[0_0_0_1px_#1164a3]">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message #general"
          className="w-full px-3 py-2.5 outline-none rounded-t-lg text-gray-900 placeholder:text-gray-500"
        />
        
        <div className="flex items-center justify-between px-2 py-1.5 border-t border-gray-200">
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600">
              <Bold className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600">
              <Italic className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-gray-300 mx-1" />
            <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600">
              <AtSign className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600">
              <Smile className="w-4 h-4" />
            </button>
          </div>
          
          {isActive && (
            <div className="text-xs text-gray-500">
              Try typing <span className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-700">/sma</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
