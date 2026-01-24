import React from 'react';
import { Moon, Sun } from 'lucide-react';
import '@/styles/components.css';

interface DarkModeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="dark-mode-toggle fixed top-6 left-[calc(6rem+3*(3rem+0.75rem))] z-50 p-3 rounded-2xl shadow-lg"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};