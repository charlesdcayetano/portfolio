import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Mail, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  Sun, 
  Moon, 
  Monitor, 
  Keyboard, 
  Sparkles, 
  ArrowUpRight,
  Terminal
} from 'lucide-react';
import { sound } from '../utils/sound';
import { ThemeMode } from '../utils/theme';

interface MobileHeaderProps {
  currentTheme: ThemeMode;
  onThemeChange: (mode: ThemeMode, e: React.MouseEvent) => void;
  onOpenAsk: () => void;
  onOpenTyping: () => void;
  onOpenChat: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  currentTheme,
  onThemeChange,
  onOpenAsk,
  onOpenTyping,
  onOpenChat,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(sound.isEnabled());

  const toggleMenu = () => {
    sound.play('toggle');
    const nextState = !isOpen;
    setIsOpen(nextState);
    document.documentElement.style.overflow = nextState ? 'hidden' : '';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.documentElement.style.overflow = '';
  };

  const handleSoundToggle = () => {
    const next = sound.toggle();
    setSoundActive(next);
  };

  const navLinks = [
    { num: '01', label: 'Projects', href: '#projects' },
    { num: '02', label: 'Experience', href: '#experience' },
    { num: '03', label: 'Stack', href: '#stack' },
    { num: '04', label: 'Certifications', href: '#certifications' },
    { num: '05', label: 'More Systems', href: '#systems' },
    { num: '06', label: 'Outcomes', href: '#recommendations' },
    { num: '07', label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Editorial Sticky Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-g200 bg-bg/95 px-5 py-3.5 backdrop-blur-md lg:hidden">
        <a 
          href="#top" 
          onClick={() => sound.play('tick')} 
          className="flex items-center gap-2 font-mono text-[11px] font-semibold tracking-wider text-ink uppercase"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Charles D. C.</span>
        </a>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation drawer"
            className="flex items-center gap-1.5 rounded-lg border border-g200 bg-g50 px-2.5 py-1 font-mono text-[11px] text-g600 hover:text-ink hover:border-g300 transition-all"
          >
            <span>{isOpen ? 'Close' : 'Menu'}</span>
            {isOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
          </button>
        </div>
      </header>

      {/* Structured Drawer Sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg px-6 py-5 lg:hidden overflow-y-auto">
          {/* Drawer Top Header */}
          <div className="flex items-center justify-between border-b border-g200 pb-4 font-mono text-[11px]">
            <div className="flex items-center gap-2 text-g500 uppercase tracking-wider">
              <Terminal className="h-3.5 w-3.5 text-g400" />
              <span>Navigation Index</span>
            </div>

            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Close menu"
              className="rounded-md border border-g200 p-1.5 text-g600 hover:text-ink hover:bg-g100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Directory Navigation Index */}
          <nav className="mt-4 flex flex-col divide-y divide-g100">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  sound.play('tick');
                  closeMenu();
                }}
                className="group flex items-center justify-between py-3.5 font-mono transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-g400 group-hover:text-ink transition-colors">
                    {link.num}
                  </span>
                  <span className="text-[15px] text-g700 group-hover:text-ink font-medium">
                    {link.label}
                  </span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-g300 opacity-0 group-hover:opacity-100 group-hover:text-ink transition-all" />
              </a>
            ))}
          </nav>

          {/* Utility Systems Section */}
          <div className="mt-6 rounded-xl border border-g200 bg-g50/60 p-3.5 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-g400 block mb-1 px-1">
              Interactive Tools
            </span>

            <button
              type="button"
              onClick={() => {
                closeMenu();
                sound.play('toggle');
                setTimeout(onOpenAsk, 200);
              }}
              className="w-full flex items-center justify-between rounded-lg border border-g200 bg-bg p-2.5 font-mono text-[12px] text-g600 hover:text-ink hover:border-g300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>Ask Anything</span>
              </div>
              <kbd className="rounded border border-g200 bg-g100 px-1.5 py-0.5 text-[10px] text-g500">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => {
                closeMenu();
                sound.play('toggle');
                setTimeout(onOpenTyping, 200);
              }}
              className="w-full flex items-center justify-between rounded-lg border border-g200 bg-bg p-2.5 font-mono text-[12px] text-g600 hover:text-ink hover:border-g300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Keyboard className="h-3.5 w-3.5 text-g400" />
                <span>Typing Speed Test</span>
              </div>
              <kbd className="rounded border border-g200 bg-g100 px-1.5 py-0.5 text-[10px] text-g500">
                ⌘J
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => {
                closeMenu();
                sound.play('toggle');
                setTimeout(onOpenChat, 200);
              }}
              className="w-full flex items-center justify-between rounded-lg border border-g200 bg-bg p-2.5 font-mono text-[12px] text-g600 hover:text-ink hover:border-g300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="h-3.5 w-3.5 text-g400" />
                <span>Community Chat</span>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </button>
          </div>

          {/* System Environment Preferences & Contact Footer */}
          <div className="mt-auto pt-6 border-t border-g200 space-y-4">
            <div className="flex items-center justify-between">
              {/* Theme Selector segmented control */}
              <div className="inline-flex items-center gap-1 rounded-lg border border-g200 bg-g50 p-1">
                {(['system', 'light', 'dark'] as const).map((mode) => {
                  const Icon = mode === 'system' ? Monitor : mode === 'light' ? Sun : Moon;
                  const isActive = currentTheme === mode;
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={(e) => onThemeChange(mode, e)}
                      className={`p-1.5 rounded-md transition-colors ${
                        isActive ? 'bg-bg text-ink shadow-2xs' : 'text-g400 hover:text-g600'
                      }`}
                      title={`${mode} mode`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </button>
                  );
                })}
              </div>

              {/* Sound Toggle */}
              <button
                type="button"
                onClick={handleSoundToggle}
                className={`flex items-center gap-2 rounded-lg border border-g200 px-3 py-1.5 font-mono text-[11px] transition-colors ${
                  soundActive 
                    ? 'bg-g100 text-ink border-g300' 
                    : 'text-g400 hover:text-g600'
                }`}
              >
                {soundActive ? <Volume2 className="h-3.5 w-3.5 text-emerald-500" /> : <VolumeX className="h-3.5 w-3.5" />}
                <span>{soundActive ? 'SFX ON' : 'MUTED'}</span>
              </button>
            </div>

            {/* Email Strip */}
            <div className="font-mono">
              <span className="text-[10px] text-g400 uppercase tracking-wider block">
                Direct Contact
              </span>
              <a
                href="mailto:cayetanocharlesd92000@gmail.com"
                className="mt-0.5 inline-flex items-center gap-1.5 text-[12px] text-ink hover:underline"
              >
                <Mail className="h-3 w-3 text-g400" />
                <span>cayetanocharlesd92000@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};