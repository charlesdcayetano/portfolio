import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MobileHeader } from './components/MobileHeader';
import { Hero } from './components/Hero';
import { StatsRibbon } from './components/StatsRibbon';
import { ProjectDeck } from './components/ProjectDeck';
import { Experience } from './components/Experience';
import { Certifications } from './components/Certifications';
import { Recommendations } from './components/Recommendations';
import { GithubGraph } from './components/GithubGraph';
import { ContactSection } from './components/ContactSection';
import { AskOverlay } from './components/AskOverlay';
import { TypingOverlay } from './components/TypingOverlay';
import { CommunityChat } from './components/CommunityChat';
import { getStoredTheme, applyTheme, ThemeMode } from './utils/theme';
import { sound } from './utils/sound';
import { ArrowUp } from 'lucide-react';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>(getStoredTheme());
  const [askOpen, setAskOpen] = useState(false);
  const [typingOpen, setTypingOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    applyTheme(theme);
  }, []);

  const handleThemeChange = (newTheme: ThemeMode, event: React.MouseEvent) => {
    sound.play('toggle');
    setTheme(newTheme);
    applyTheme(newTheme, event);
  };

  const scrollToTop = () => {
    sound.play('press');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-bg text-ink relative font-sans">
      {/* ── Page-wide Halftone Backdrop (Bryl Lim Signature Aesthetic) ── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 select-none">
        <div className="halftone halftone-wide mask-tr absolute right-0 top-0 h-[70vh] w-[65vw] opacity-[0.16]" />
        <div className="halftone mask-bl absolute bottom-0 left-0 h-[60vh] w-[55vw] opacity-[0.13]" />
      </div>

      {/* ── Fixed Left Sidebar for Desktop (lg+) ── */}
      <Sidebar
        currentTheme={theme}
        onThemeChange={handleThemeChange}
        onOpenAsk={() => setAskOpen(true)}
        onOpenTyping={() => setTypingOpen(true)}
        onOpenChat={() => setChatOpen(true)}
      />

      {/* ── Mobile Top Bar & Sheet (below lg) ── */}
      <MobileHeader
        currentTheme={theme}
        onThemeChange={handleThemeChange}
        onOpenAsk={() => setAskOpen(true)}
        onOpenTyping={() => setTypingOpen(true)}
        onOpenChat={() => setChatOpen(true)}
      />

      {/* ── Main Content Area ── */}
      <main id="top" className="relative z-10 lg:pl-56">
        <div className="mx-auto max-w-2xl px-6 sm:px-8 py-8 sm:py-12">
          {/* Hero Section with Halftone bottom dissolve */}
          <Hero />

          {/* Stats Ribbon */}
          <StatsRibbon />

          {/* 3D Spotlight Project Deck & Systems */}
          <ProjectDeck />

          {/* Experience Ledger & Stack Cloud */}
          <Experience />

          {/* Embossed Certifications & Verification Badges */}
          <Certifications />

          {/* Editorial Case Outcomes & Philosophy */}
          <Recommendations />

          {/* Halftone GitHub Graph */}
          <GithubGraph />

          {/* Contact Section */}
          <ContactSection />

          {/* Minimalist Editorial Footer */}
          <footer className="mt-14 pt-8 border-t border-g200 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[12px] text-g400">
            <div>
              © 2026 Charles D. Cayetano. All systems operational.
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 hover:text-ink transition-colors"
              >
                <span>Back to top</span>
                <ArrowUp className="h-3 w-3" />
              </button>
              <span>·</span>
              <span className="font-pixel text-ink">CDC</span>
            </div>
          </footer>
        </div>
      </main>

      {/* ── Interactive Modals & Easter Eggs ── */}
      <AskOverlay isOpen={askOpen} onClose={() => setAskOpen(false)} />
      <TypingOverlay isOpen={typingOpen} onClose={() => setTypingOpen(false)} />
      <CommunityChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
};
