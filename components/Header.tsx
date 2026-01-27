import React from 'react';
import { Linkedin, Briefcase, Moon, Sun } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
    isDark: boolean;
    onToggleDark: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, onToggleDark }) => {

    const openLinkedIn = () => {
        window.open('https://www.linkedin.com/in/anushka-gupta-here/', '_blank');
    };

    const openPortfolio = () => {
        window.open('https://anushkacreates.vercel.app/', '_blank');
    };

    const buttonClass = `p-2 sm:p-3 rounded-xl transition-all duration-200 ${isDark
        ? 'bg-gray-800/80 hover:bg-gray-700/80 text-gray-100'
        : 'bg-white/80 hover:bg-gray-100/80 text-gray-900'
        } backdrop-blur-sm shadow-lg hover:shadow-xl`;

    return (
        <header className="fixed top-3 right-3 sm:top-6 sm:right-6 z-50">
            <div className="flex items-center gap-2 sm:gap-3">
                {/* LinkedIn Button */}
                <button
                    onClick={openLinkedIn}
                    className={buttonClass}
                    aria-label="LinkedIn"
                    title="LinkedIn"
                >
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Portfolio Button */}
                <button
                    onClick={openPortfolio}
                    className={buttonClass}
                    aria-label="Portfolio"
                    title="Portfolio"
                >
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Dark Mode Toggle */}
                <button
                    onClick={onToggleDark}
                    className={buttonClass}
                    aria-label="Toggle dark mode"
                >
                    {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
            </div>
        </header>
    );
};