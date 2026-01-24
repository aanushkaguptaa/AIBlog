import React, { useState } from 'react';
import { Linkedin, Briefcase, Check, Moon, Sun } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
    isDark: boolean;
    onToggleDark: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, onToggleDark }) => {
    const [copied, setCopied] = useState(false);

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const openLinkedIn = () => {
        window.open('https://www.linkedin.com/in/anushkagupta/', '_blank');
    };

    const openPortfolio = () => {
        window.open('https://yourportfolio.com', '_blank');
    };

    const buttonClass = `p-3 rounded-xl transition-all duration-200 ${isDark
        ? 'bg-gray-800/80 hover:bg-gray-700/80 text-gray-100'
        : 'bg-white/80 hover:bg-gray-100/80 text-gray-900'
        } backdrop-blur-sm shadow-lg hover:shadow-xl`;

    return (
        <header className="fixed top-6 right-6 z-50">
            <div className="flex items-center gap-3">
                {/* Share Link Button */}
                <button
                    onClick={copyLink}
                    className={buttonClass}
                    aria-label="Share link"
                    title="Share link"
                >
                    {copied ? (
                        <Check className="w-5 h-5 text-green-500" />
                    ) : (
                        <Image
                            src="/share_link.svg"
                            alt="Share"
                            width={20}
                            height={20}
                            className={isDark ? 'invert' : ''}
                        />
                    )}
                </button>

                {/* LinkedIn Button */}
                <button
                    onClick={openLinkedIn}
                    className={buttonClass}
                    aria-label="LinkedIn"
                    title="LinkedIn"
                >
                    <Linkedin className="w-5 h-5" />
                </button>

                {/* Portfolio Button */}
                <button
                    onClick={openPortfolio}
                    className={buttonClass}
                    aria-label="Portfolio"
                    title="Portfolio"
                >
                    <Briefcase className="w-5 h-5" />
                </button>

                {/* Dark Mode Toggle */}
                <button
                    onClick={onToggleDark}
                    className={buttonClass}
                    aria-label="Toggle dark mode"
                >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>
        </header>
    );
};