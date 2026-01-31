import { X, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';

interface StyleToneFormProps {
  onClose: () => void;
  onSubmit: (styledText: string) => void;
}

const TONE_PRESETS = [
  { id: 'polite-formal', label: 'Polite & Formal', description: 'Professional, respectful tone' },
  { id: 'concise-direct', label: 'Concise & Direct', description: 'Clear, to-the-point messaging' },
  { id: 'friendly-neutral', label: 'Friendly & Neutral', description: 'Warm yet professional' },
  { id: 'enthusiastic', label: 'Enthusiastic', description: 'Energetic and positive' },
  { id: 'empathetic', label: 'Empathetic', description: 'Understanding and supportive' },
  { id: 'confident', label: 'Confident', description: 'Assertive and assured' },
];

export function StyleToneForm({ onClose, onSubmit }: StyleToneFormProps) {
  const [sourceText, setSourceText] = useState('');
  const [selectedTone, setSelectedTone] = useState('friendly-neutral');
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = () => {
    // Mock styled output based on tone
    const mockOutputs: Record<string, string> = {
      'polite-formal': 'Good morning team. I would like to provide our client with an update regarding the project timeline at your earliest convenience.',
      'concise-direct': 'Team: Need to update client on project timeline.',
      'friendly-neutral': 'Hey team! I need to send our client an update about where we are with the project timeline.',
      'enthusiastic': 'Hey team! I\'m excited to share a progress update with our client about the project timeline!',
      'empathetic': 'Hi team, I understand everyone\'s been working hard. I\'d like to share a thoughtful update with our client about the project timeline.',
      'confident': 'Team, I\'ll be updating our client on the project timeline. We\'re making solid progress.',
    };
    
    const styled = mockOutputs[selectedTone] || 'Styled output would appear here.';
    onSubmit(styled);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[680px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-gray-900">Adjust Style & Tone</h2>
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
            <Label htmlFor="message-text" className="text-gray-900 mb-2 block">
              Your message
            </Label>
            <textarea
              id="message-text"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Type your message here..."
              className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1164a3] focus:border-transparent resize-none text-gray-900 placeholder:text-gray-500"
            />
          </div>

          {/* Tone Presets */}
          <div>
            <Label className="text-gray-900 mb-3 block">
              Choose a tone
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {TONE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedTone(preset.id)}
                  className={`p-3 border-2 rounded-lg text-left transition-all ${
                    selectedTone === preset.id
                      ? 'border-[#1164a3] bg-[#1164a3]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-sm text-gray-900 mb-0.5">
                    {preset.label}
                  </div>
                  <div className="text-xs text-gray-600">
                    {preset.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Preview Toggle */}
          <div className="flex items-center justify-between pt-2">
            <Label className="text-gray-900">
              Preview changes
            </Label>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gray-100 text-gray-700"
            >
              {showPreview ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  <span className="text-sm">Hide</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">Show</span>
                </>
              )}
            </button>
          </div>

          {/* Preview Box */}
          {showPreview && sourceText && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="text-xs text-gray-600 mb-2">Preview:</div>
              <div className="text-sm text-gray-900">
                {selectedTone === 'polite-formal' && 'Good morning team. I would like to provide our client with an update regarding the project timeline...'}
                {selectedTone === 'concise-direct' && 'Team: Need to update client on project timeline.'}
                {selectedTone === 'friendly-neutral' && 'Hey team! I need to send our client an update about where we are with the project timeline.'}
                {selectedTone === 'enthusiastic' && 'Hey team! I\'m excited to share a progress update with our client about the project timeline!'}
                {selectedTone === 'empathetic' && 'Hi team, I understand everyone\'s been working hard. I\'d like to share a thoughtful update with our client...'}
                {selectedTone === 'confident' && 'Team, I\'ll be updating our client on the project timeline. We\'re making solid progress.'}
              </div>
            </div>
          )}
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
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
