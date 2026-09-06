import React, { useState } from 'react';
import { Mail, Volume2, VolumeX, MessageSquare, Sun, Moon, Monitor, Terminal, Command } from 'lucide-react';
import { sound } from '../utils/sound';
import { ThemeMode } from '../utils/theme';

interface SidebarProps {
  currentTheme: ThemeMode;
  onThemeChange: (mode: ThemeMode, e: React.MouseEvent) => void;
  onOpenAsk: () => void;
  onOpenTyping: () => void;
  onOpenChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTheme,
  onThemeChange,
  onOpenAsk,
  onOpenTyping,
  onOpenChat,
}) => {
  const [soundActive, setSoundActive] = useState(sound.isEnabled());

  const handleSoundToggle = () => {
    const next = sound.toggle();
    setSoundActive(next);
  };

  const navLinks = [
    { id: '01', label: 'Projects', href: '#projects' },
    { id: '02', label: 'Experience', href: '#experience' },
    { id: '03', label: 'Stack', href: '#stack' },
    { id: '04', label: 'Certifications', href: '#certifications' },
    { id: '05', label: 'Systems', href: '#systems' },
    { id: '06', label: 'Outcomes', href: '#recommendations' },
    { id: '07', label: 'Contact', href: '#contact' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-60 flex-col border-r border-g200 bg-bg p-5 lg:flex select-none">
      {/* Editorial Header Block */}
      <div className="pb-4 border-b border-g200">
        <a
          href="#top"
          onClick={() => sound.play('press')}
          className="group block"
        >
          <div className="flex items-center justify-between font-mono text-[10px] text-g400 uppercase tracking-widest">
            <span>Inspired</span>
            <span>bryllim</span>
          </div>
          <h1 className="mt-1 font-pixel text-base text-ink tracking-tight group-hover:text-g600 transition-colors">
            Charles C.
          </h1>
        </a>
      </div>

      {/* Directory Index Navigation */}
      <nav className="my-4 flex-1 overflow-y-auto space-y-1">
        <div className="font-mono text-[10px] uppercase tracking-wider text-g400 px-2 py-1 flex items-center justify-between">
          <span>Index</span>
          <span>[{navLinks.length}]</span>
        </div>

        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={() => sound.play('tick')}
            className="group flex items-center justify-between px-2 py-1.5 rounded-md font-mono text-[12px] text-g500 hover:text-ink hover:bg-g100 transition-all"
          >
            <span className="group-hover:translate-x-1 transition-transform">
              {link.label}
            </span>
            <span className="text-[10px] text-g300 group-hover:text-g500">
              {link.id}
            </span>
          </a>
        ))}
      </nav>

      {/* Utility System Modules */}
      <div className="space-y-3 pt-3 border-t border-g200">
        {/* Command Launcher Triggers */}
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => {
              sound.play('toggle');
              onOpenAsk();
            }}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border border-g200 bg-g50 font-mono text-[11px] text-g600 hover:text-ink hover:border-g300 transition-colors"
          >
            <span>Ask Anything</span>
            <span className="flex items-center text-[10px] text-g400">
              <Command className="h-2.5 w-2.5 mr-0.5" />K
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.play('toggle');
              onOpenTyping();
            }}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border border-g200 bg-g50 font-mono text-[11px] text-g600 hover:text-ink hover:border-g300 transition-colors"
          >
            <span>Typing Speed</span>
            <span className="flex items-center text-[10px] text-g400">
              <Command className="h-2.5 w-2.5 mr-0.5" />J
            </span>
          </button>
        </div>

        {/* Live Traffic Badge */}
        <div className="flex items-center justify-between p-2 rounded-lg border border-g200 bg-bg font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-g600">1 Live</span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.play('toggle');
              onOpenChat();
            }}
            className="text-g400 hover:text-ink transition-colors"
            title="Open Community Chat"
          >
            <MessageSquare className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* System Controls Panel */}
        <div className="flex items-center justify-between pt-1">
          <div className="inline-flex items-center p-0.5 rounded-md border border-g200 bg-g50 gap-0.5">
            {(['system', 'light', 'dark'] as const).map((mode) => {
              const Icon = mode === 'system' ? Monitor : mode === 'light' ? Sun : Moon;
              const isActive = currentTheme === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={(e) => onThemeChange(mode, e)}
                  className={`p-1 rounded transition-colors ${
                    isActive ? 'bg-bg text-ink shadow-2xs' : 'text-g400 hover:text-g600'
                  }`}
                  title={`${mode} mode`}
                >
                  <Icon className="h-3 w-3" />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleSoundToggle}
            className={`p-1.5 rounded-md border border-g200 text-g500 transition-colors ${
              soundActive ? 'bg-g100 text-ink border-g300' : 'hover:text-ink'
            }`}
            title={soundActive ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
          >
            {soundActive ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3 text-g400" />}
          </button>
        </div>

        {/* Footer Contact Direct */}
        <a
          href="mailto:cayetanocharlesd92000@gmail.com"
          onClick={() => sound.play('press')}
          className="flex items-center gap-2 pt-2 text-[11px] font-mono text-g500 hover:text-ink transition-colors group truncate"
        >
          <Mail className="h-3 w-3 text-g400 group-hover:text-ink shrink-0" />
          <span className="truncate">cayetanocharlesd92000@...</span>
        </a>
      </div>
    </aside>
  );
};