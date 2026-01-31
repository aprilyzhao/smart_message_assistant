import { X, Sparkles, Languages, Type } from 'lucide-react';

interface ModePickerModalProps {
  onClose: () => void;
  onSelectMode: (mode: 'refine' | 'translate' | 'style-tone') => void;
}

export function ModePickerModal({ onClose, onSelectMode }: ModePickerModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[600px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-gray-900">Smart Message Assistant</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Choose how you'd like to enhance your message:
          </p>

          <div className="space-y-3">
            {/* Refine Card */}
            <button
              onClick={() => onSelectMode('refine')}
              className="w-full flex items-start gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-[#1164a3] hover:bg-[#1164a3]/5 transition-all text-left group"
            >
              <div className="w-10 h-10 bg-[#1164a3]/10 group-hover:bg-[#1164a3]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-[#1164a3]" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900 mb-1">Refine</div>
                <div className="text-sm text-gray-600">
                  Improve clarity, fix grammar, and enhance readability while keeping your message's intent
                </div>
              </div>
            </button>

            {/* Translate Card */}
            <button
              onClick={() => onSelectMode('translate')}
              className="w-full flex items-start gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-[#1164a3] hover:bg-[#1164a3]/5 transition-all text-left group"
            >
              <div className="w-10 h-10 bg-[#1164a3]/10 group-hover:bg-[#1164a3]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Languages className="w-5 h-5 text-[#1164a3]" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900 mb-1">Translate</div>
                <div className="text-sm text-gray-600">
                  Convert your message to another language with optional custom glossary support
                </div>
              </div>
            </button>

            {/* Style & Tone Card */}
            <button
              onClick={() => onSelectMode('style-tone')}
              className="w-full flex items-start gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-[1164a3] hover:bg-[#1164a3]/5 transition-all text-left group"
            >
              <div className="w-10 h-10 bg-[#1164a3]/10 group-hover:bg-[#1164a3]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Type className="w-5 h-5 text-[#1164a3]" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900 mb-1">Style & Tone</div>
                <div className="text-sm text-gray-600">
                  Adjust how your message sounds—from formal to friendly, concise to detailed
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            Privacy: We don't collect PII. Drafts retained for 48 hours max.
          </div>
        </div>
      </div>
    </div>
  );
}
