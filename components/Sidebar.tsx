import React from 'react';
import { Section } from '@/types';
import '@/styles/sidebar.css';

interface SidebarProps {
  sections: Section[];
  activeSection: string;
  showSidebar: boolean;
  onSectionClick: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activeSection,
  showSidebar,
  onSectionClick
}) => {
  return (
    <aside
      className={`fixed left-[8rem] top-1/2 -translate-y-1/2 z-40 transition-all duration-500 max-w-[calc(25%-10rem)] ${showSidebar ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'
        }`}
    >
      <nav>
        <ol className="space-y-3">
          {sections.map((section, index) => (
            <li key={section.id}>
              <button
                onClick={() => onSectionClick(section.id)}
                className={`sidebar-button block text-left text-sm transition-colors duration-200 ${activeSection === section.id
                  ? 'sidebar-button-active'
                  : ''
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
  );
};