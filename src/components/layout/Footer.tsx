/**
 * Footer - With GitHub contribution chart and credits
 */

import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github } from 'lucide-react';

const Footer = memo(() => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-obsidian border-t border-slate/20 mt-12">
      <div className="section-container py-6">
        <div className="mb-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Github className="w-6 h-6 text-electric" />
            <span className="font-heading text-base text-silver">Contribution Activity</span>
          </div>
          <div className="max-w-5xl mx-auto rounded-xl overflow-hidden bg-carbon/50 p-6 border border-slate/20">
            <img
              src="https://ghchart.rshah.org/00f0ff/sharpeye08"
              alt="GitHub Contribution Graph"
              className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate/30 to-transparent mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-display text-xl font-bold">
              <span className="text-pearl">DEV</span>
              <span className="text-electric">.</span>
            </span>
            <div className="h-4 w-px bg-slate/30 hidden md:block" />
            <p className="text-sm text-steel">
              © {currentYear} Dev Bansal
            </p>
          </div>
          
          
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate/30 text-sm text-silver hover:border-electric hover:text-electric transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;