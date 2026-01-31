import { X, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';

interface TranslateFormProps {
  onClose: () => void;
  onSubmit: (translatedText: string) => void;
}

const LANGUAGES = [
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'zh', label: 'Chinese (Simplified)' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'it', label: 'Italian' },
  { value: 'ru', label: 'Russian' },
  { value: 'ar', label: 'Arabic' },
];

const GLOSSARIES = [
  { value: 'none', label: 'None' },
  { value: 'tech', label: 'Technical Terms' },
  { value: 'marketing', label: 'Marketing & Brand' },
  { value: 'legal', label: 'Legal & Compliance' },
];

export function TranslateForm({ onClose, onSubmit }: TranslateFormProps) {
  const [sourceText, setSourceText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [glossary, setGlossary] = useState('none');

  const handleSubmit = () => {
    // Mock translation
    const mockTranslations: Record<string, string> = {
      'es': '¡Hola equipo! Necesito enviar una actualización a nuestro cliente sobre el cronograma del proyecto.',
      'fr': 'Salut l\'équipe ! Je dois envoyer une mise à jour à notre client concernant le calendrier du projet.',
      'de': 'Hallo Team! Ich muss unserem Kunden ein Update zum Projektzeitplan schicken.',
      'ja': 'チームの皆さん、こんにちは！プロジェクトのタイムラインについて、クライアントに更新情報を送る必要があります。',
    };
    
    const translated = mockTranslations[targetLanguage] || 'Translation output would appear here.';
    onSubmit(translated);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[600px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-gray-900">Translate Message</h2>
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
            <Label htmlFor="source-text" className="text-gray-900 mb-2 block">
              Message to translate
            </Label>
            <textarea
              id="source-text"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Paste or type your message here..."
              className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1164a3] focus:border-transparent resize-none text-gray-900 placeholder:text-gray-500"
            />
          </div>

          {/* Target Language */}
          <div>
            <Label htmlFor="target-language" className="text-gray-900 mb-2 block">
              Target language
            </Label>
            <select
              id="target-language"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1164a3] focus:border-transparent text-gray-900 bg-white"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Glossary */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="glossary" className="text-gray-900">
                Glossary (optional)
              </Label>
              <button className="text-xs text-[#1164a3] hover:underline flex items-center gap-1">
                Manage glossaries
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <select
              id="glossary"
              value={glossary}
              onChange={(e) => setGlossary(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1164a3] focus:border-transparent text-gray-900 bg-white"
            >
              {GLOSSARIES.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1.5">
              Apply custom terminology to maintain consistency
            </p>
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
            Translate
          </Button>
        </div>
      </div>
    </div>
  );
}
