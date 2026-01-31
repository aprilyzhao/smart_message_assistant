import { useState } from 'react';
import { Hash, Users, Lock, ChevronDown } from 'lucide-react';
import { SlashCommandEntry } from './SlashCommandEntry';
import { ModePickerModal } from './ModePickerModal';
import { TranslateForm } from './TranslateForm';
import { StyleToneForm } from './StyleToneForm';
import { RefineForm } from './RefineForm';
import { EphemeralResult } from './EphemeralResult';
import { FeedbackModal } from './FeedbackModal';

type Screen = 'slash-command' | 'mode-picker' | 'translate' | 'style-tone' | 'refine' | 'result';
type Mode = 'translate' | 'style-tone' | 'refine' | null;

export function SlackWorkspace() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('slash-command');
  const [selectedMode, setSelectedMode] = useState<Mode>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [resultText, setResultText] = useState('');

  const handleModeSelect = (mode: Mode) => {
    setSelectedMode(mode);
    if (mode === 'translate') setCurrentScreen('translate');
    else if (mode === 'style-tone') setCurrentScreen('style-tone');
    else if (mode === 'refine') setCurrentScreen('refine');
  };

  const handleSubmitForm = (text: string) => {
    setResultText(text);
    setCurrentScreen('result');
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-[260px] bg-[#3f0e40] text-white flex flex-col">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-white/90">Workspace Name</h2>
            <ChevronDown className="w-4 h-4 text-white/70" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-3 py-2">
          <div className="mb-4">
            <div className="text-white/70 text-sm px-2 mb-1">Channels</div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 cursor-pointer bg-[#1164a3] text-white">
                <Hash className="w-4 h-4" />
                <span className="text-sm">general</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 cursor-pointer text-white/70">
                <Hash className="w-4 h-4" />
                <span className="text-sm">random</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 cursor-pointer text-white/70">
                <Lock className="w-4 h-4" />
                <span className="text-sm">team-sync</span>
              </div>
            </div>
          </div>
          
          <div>
            <div className="text-white/70 text-sm px-2 mb-1">Direct messages</div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 cursor-pointer text-white/70">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm">Sarah Chen</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 cursor-pointer text-white/70">
                <div className="w-2 h-2 rounded-full bg-gray-400" />
                <span className="text-sm">Mike Johnson</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="h-[49px] border-b border-gray-200 flex items-center px-4">
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-gray-600" />
            <span>general</span>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-[880px] mx-auto">
            {/* Sample messages */}
            <div className="mb-6">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded bg-[#3f0e40] flex items-center justify-center text-white flex-shrink-0">
                  SC
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-gray-900">Sarah Chen</span>
                    <span className="text-xs text-gray-500">10:23 AM</span>
                  </div>
                  <p className="text-gray-900">Hey team, I need to send an update to our client about the project timeline.</p>
                </div>
              </div>
            </div>

            {currentScreen === 'result' && (
              <EphemeralResult 
                text={resultText}
                mode={selectedMode}
                onFeedback={() => setShowFeedback(true)}
              />
            )}
          </div>
        </div>

        {/* Composer */}
        <SlashCommandEntry 
          onOpenModal={() => setCurrentScreen('mode-picker')}
          isActive={currentScreen === 'slash-command'}
        />
      </div>

      {/* Modals */}
      {currentScreen === 'mode-picker' && (
        <ModePickerModal
          onClose={() => setCurrentScreen('slash-command')}
          onSelectMode={handleModeSelect}
        />
      )}

      {currentScreen === 'translate' && (
        <TranslateForm
          onClose={() => setCurrentScreen('mode-picker')}
          onSubmit={handleSubmitForm}
        />
      )}

      {currentScreen === 'style-tone' && (
        <StyleToneForm
          onClose={() => setCurrentScreen('mode-picker')}
          onSubmit={handleSubmitForm}
        />
      )}

      {currentScreen === 'refine' && (
        <RefineForm
          onClose={() => setCurrentScreen('mode-picker')}
          onSubmit={handleSubmitForm}
        />
      )}

      {showFeedback && (
        <FeedbackModal
          onClose={() => setShowFeedback(false)}
          onSubmit={() => {
            setShowFeedback(false);
            // Reset to slash command view
            setCurrentScreen('slash-command');
          }}
        />
      )}
    </div>
  );
}
