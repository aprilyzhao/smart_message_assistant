import { useState } from 'react';
import { SlackWorkspace } from './components/SlackWorkspace';

export default function App() {
  return (
    <div className="w-full h-screen bg-[#1a1d21]">
      <SlackWorkspace />
    </div>
  );
}
