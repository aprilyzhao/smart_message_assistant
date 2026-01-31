import { Copy, Send, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface EphemeralResultProps {
  text: string;
  mode: 'translate' | 'style-tone' | 'refine' | null;
  onFeedback: () => void;
}

export function EphemeralResult({ text, mode, onFeedback }: EphemeralResultProps) {
  const [copied, setCopied] = useState(false);
  const [inserted, setInserted] = useState(false);

  const handleCopy = () => {
    // Fallback for environments where Clipboard API is blocked
    try {
      navigator.clipboard.writeText(text);
    } catch (error) {
      // Silent fail - just show copied state
      console.log('Clipboard not available');
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInsert = () => {
    setInserted(true);
  };

  const getModeLabel = () => {
    switch (mode) {
      case 'translate': return 'Translation';
      case 'style-tone': return 'Style & Tone';
      case 'refine': return 'Refinement';
      default: return 'Result';
    }
  };

  return (
    <div className="mb-4 border-l-4 border-[#1164a3] bg-[#1164a3]/5 rounded">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-[#1164a3] rounded flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-900">
              Smart Message Assistant
              <span className="text-gray-600 ml-1">• {getModeLabel()}</span>
            </div>
            <div className="text-xs text-gray-500">Only visible to you</div>
          </div>
        </div>

        {/* Result Text */}
        <div className="bg-white border border-gray-200 rounded p-4 mb-3">
          <div className="text-gray-900">{text}</div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="border-gray-300 text-gray-700 hover:bg-gray-100 gap-2"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          
          <Button
            onClick={handleInsert}
            size="sm"
            className="bg-[#007a5a] hover:bg-[#006644] text-white gap-2"
          >
            <Send className="w-4 h-4" />
            {inserted ? 'Inserted' : 'Insert into thread'}
          </Button>

          <div className="flex-1" />

          <Button
            onClick={onFeedback}
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            Feedback
          </Button>
        </div>

        {inserted && (
          <div className="mt-3 text-xs text-gray-600 flex items-center gap-1">
            <span className="text-green-600">✓</span>
            Message inserted below
          </div>
        )}
      </div>
    </div>
  );
}