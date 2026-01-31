import { X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';

interface RefineFormProps {
  onClose: () => void;
  onSubmit: (refinedText: string) => void;
}

export function RefineForm({ onClose, onSubmit }: RefineFormProps) {
  const [sourceText, setSourceText] = useState('');
  const [options, setOptions] = useState({
    grammar: true,
    clarity: true,
    conciseness: false,
  });

  const handleSubmit = () => {
    // Mock refined output
    const refined = 'Hi team, I need to send our client an update on the project timeline.';
    onSubmit(refined);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[600px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-gray-900">Refine Message</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Source Text */}
          <div>
            <Label htmlFor="refine-text" className="text-gray-900 mb-2 block">
              Message to refine
            </Label>
            <textarea
              id="refine-text"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Paste or type your message here..."
              className="w-full min-h-[140px] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1164a3] focus:border-transparent resize-none text-gray-900 placeholder:text-gray-500"
            />
          </div>

          {/* Refinement Options */}
          <div>
            <Label className="text-gray-900 mb-3 block">
              Refinement options
            </Label>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.grammar}
                  onChange={(e) => setOptions({ ...options, grammar: e.target.checked })}
                  className="mt-0.5 w-4 h-4 text-[#1164a3] border-gray-300 rounded focus:ring-[#1164a3]"
                />
                <div className="flex-1">
                  <div className="text-sm text-gray-900">Fix grammar & spelling</div>
                  <div className="text-xs text-gray-600">Correct grammatical errors and typos</div>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.clarity}
                  onChange={(e) => setOptions({ ...options, clarity: e.target.checked })}
                  className="mt-0.5 w-4 h-4 text-[#1164a3] border-gray-300 rounded focus:ring-[#1164a3]"
                />
                <div className="flex-1">
                  <div className="text-sm text-gray-900">Improve clarity</div>
                  <div className="text-xs text-gray-600">Make your message easier to understand</div>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.conciseness}
                  onChange={(e) => setOptions({ ...options, conciseness: e.target.checked })}
                  className="mt-0.5 w-4 h-4 text-[#1164a3] border-gray-300 rounded focus:ring-[#1164a3]"
                />
                <div className="flex-1">
                  <div className="text-sm text-gray-900">Increase conciseness</div>
                  <div className="text-xs text-gray-600">Remove unnecessary words and phrases</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!sourceText.trim()}
            className="bg-[#007a5a] hover:bg-[#006644] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Refine
          </Button>
        </div>
      </div>
    </div>
  );
}
