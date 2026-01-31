import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
    content: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);

    // Close tooltip when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const showTooltip = isOpen || isHovered;

    return (
        <div className="relative inline-block" ref={tooltipRef}>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full border border-current/40 hover:border-current/60 transition-colors cursor-pointer nodrag"
                aria-label="More information"
            >
                <span className="text-[10px] font-medium">?</span>
            </button>

            {showTooltip && (
                <div className="absolute z-50 left-0 top-6 w-64 p-2 text-xs rounded-lg border border-current/20 bg-white dark:bg-gray-900 shadow-lg nodrag">
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                        {content}
                    </p>
                </div>
            )}
        </div>
    );
};
