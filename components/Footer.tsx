import React, { useState } from 'react';
import { Twitter, Linkedin, Link2, Check } from 'lucide-react';
import '../styles/components.css';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=Designing AI Systems - Understanding LLMs&url=${window.location.href}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-gray-300 dark:border-gray-800 mt-20">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-600 dark:text-gray-400">
            © 2026 AI Systems Blog. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-gray-400">Share:</span>
            <button
              onClick={shareOnTwitter}
              className="footer-icon-button p-2 rounded-xl"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-4 h-4" />
            </button>
            <button
              onClick={shareOnLinkedIn}
              className="footer-icon-button p-2 rounded-xl"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </button>
            <button
              onClick={copyLink}
              className="footer-icon-button p-2 rounded-xl relative"
              aria-label="Copy link"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};