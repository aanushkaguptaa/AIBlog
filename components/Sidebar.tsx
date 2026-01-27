import React, { useState } from 'react';
import { Section } from '@/types';
import { Menu, X } from 'lucide-react';
import '@/styles/sidebar.css';

interface SidebarProps {
  sections: Section[];
  activeSection: string;
  showSidebar: boolean;
  onSectionClick: (id: string) => void;
  isDark: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activeSection,
  showSidebar,
  onSectionClick,
  isDark
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSectionClick = (id: string) => {
    onSectionClick(id);
    setMobileMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <>
      {/* Mobile Hamburger Button - Matches header style, positioned top-left */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`fixed left-3 top-3 sm:left-6 sm:top-6 z-50 lg:hidden p-2 sm:p-3 rounded-xl transition-all duration-500 ${showSidebar ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'
          } ${mobileMenuOpen
            ? 'bg-gray-800/80 text-gray-100 dark:bg-white/80 dark:text-gray-900'
            : 'bg-white/80 text-gray-900 dark:bg-gray-800/80 dark:text-gray-100'
          } backdrop-blur-sm shadow-lg hover:shadow-xl`}
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
      </button>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-4 sm:left-8 md:left-12 lg:left-32 top-1/2 -translate-y-1/2 z-40 transition-all duration-500 max-w-[calc(25%-2rem)] hidden lg:block ${showSidebar ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'
          }`}
      >
        <nav>
          <ol className="space-y-3">
            {sections.map((section, index) => (
              <li key={section.id}>
                <button
                  onClick={() => handleSectionClick(section.id)}
                  className={`sidebar-button block text-left text-sm transition-colors duration-200 ${activeSection === section.id ? 'sidebar-button-active' : ''
                    }`}
                >
                  <span className="font-bold" style={{ fontFamily: 'Space Mono, monospace' }}>
                    {index + 1}. {section.title}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </aside>

      {/* Mobile Slide-in Menu */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 lg:hidden transition-transform duration-300 shadow-2xl ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } ${isDark ? 'bg-[#25262C]' : 'bg-[#F1F0EC]'
          }`}
      >
        <nav className="pt-16 px-6">
          <ol className="space-y-4">
            {sections.map((section, index) => (
              <li key={section.id}>
                <button
                  onClick={() => handleSectionClick(section.id)}
                  className={`sidebar-button block text-left text-base transition-colors duration-200 w-full ${activeSection === section.id ? 'sidebar-button-active' : ''
                    }`}
                >
                  <span className="font-bold" style={{ fontFamily: 'Space Mono, monospace' }}>
                    {index + 1}. {section.title}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </aside>
    </>
  );
};