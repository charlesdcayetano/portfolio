import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, RotateCcw, Award } from 'lucide-react';
import { sound } from '../utils/sound';

interface TypingOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const WORD_BANK = [
  'system', 'react', 'laravel', 'vue', 'database', 'frontend', 'developer', 'philippines',
  'interface', 'workflow', 'software', 'engineer', 'component', 'tailwind', 'service',
  'network', 'client', 'server', 'application', 'deploy', 'code', 'script', 'project',
  'management', 'terminal', 'records', 'inventory', 'analytics', 'fast', 'build'
];

const KEYBOARD_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

export const TypingOverlay: React.FC<TypingOverlayProps> = ({ isOpen, onClose }) => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [totalChars, setTotalChars] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const resetTest = useCallback(() => {
    // Pick 20 words
    const shuffled = [...WORD_BANK].sort(() => 0.5 - Math.random()).slice(0, 18);
    setWords(shuffled);
    setCurrentWordIdx(0);
    setCurrentInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setTotalChars(0);
    setCorrectChars(0);
    setIsFinished(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    if (isOpen) {
      sound.play('toggle');
      document.documentElement.style.overflow = 'hidden';
      resetTest();
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [isOpen, resetTest]);

  // Global keybindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        isOpen ? onClose() : undefined;
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      } else if (e.key === 'Tab' && isOpen) {
        e.preventDefault();
        resetTest();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, resetTest]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;
    const val = e.target.value;

    if (!startTime) {
      setStartTime(Date.now());
    }

    // Space pressed -> move to next word
    if (val.endsWith(' ')) {
      const trimmed = val.trim();
      const target = words[currentWordIdx];

      if (trimmed === target) {
        sound.play('release');
      } else {
        sound.play('droplet');
      }

      if (currentWordIdx + 1 >= words.length) {
        // Finish test
        setIsFinished(true);
        sound.play('success');
      } else {
        setCurrentWordIdx((prev) => prev + 1);
        setCurrentInput('');
      }
      return;
    }

    const lastChar = val.slice(-1).toLowerCase();
    setActiveKey(lastChar);
    setTimeout(() => setActiveKey(null), 120);

    const targetChar = words[currentWordIdx]?.[val.length - 1];
    const isCorrect = lastChar === targetChar;

    if (isCorrect) {
      sound.play('tick');
      setCorrectChars((c) => c + 1);
    } else {
      sound.play('droplet');
    }
    setTotalChars((t) => t + 1);

    setCurrentInput(val);

    // Calculate real-time stats
    if (startTime) {
      const elapsedMinutes = (Date.now() - startTime) / 60000;
      if (elapsedMinutes > 0.05) {
        const calculatedWpm = Math.round((correctChars / 5) / elapsedMinutes);
        setWpm(calculatedWpm);
        setAccuracy(Math.round((correctChars / (totalChars + 1)) * 100));
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg/85 backdrop-blur-md transition-opacity"
        onClick={() => {
          sound.play('release');
          onClose();
        }}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-g200 bg-bg p-6 sm:p-8 shadow-2xl">
        {/* Header & Stats */}
        <div className="flex items-center justify-between pb-4 border-b border-g200">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <span className="font-pixel text-2xl sm:text-3xl text-ink font-bold">
                {wpm}
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-wider text-g400">
                WPM
              </span>
            </div>
            <div className="text-center">
              <span className="font-pixel text-2xl sm:text-3xl text-ink font-bold">
                {accuracy}%
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-wider text-g400">
                ACC
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetTest}
              className="p-1.5 rounded-lg border border-g200 text-g500 hover:text-ink hover:border-g300 transition-colors"
              title="Restart (Tab)"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg border border-g200 text-g500 hover:text-ink hover:border-g300 transition-colors"
              title="Close (Esc)"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Word Display Stream */}
        <div className="my-6 min-h-[4rem] flex flex-wrap gap-2 text-lg sm:text-xl font-mono leading-relaxed">
          {words.map((w, wIdx) => {
            const isCurrent = wIdx === currentWordIdx;
            const isDone = wIdx < currentWordIdx;

            return (
              <span
                key={wIdx}
                className={`rounded px-1.5 py-0.5 transition-colors ${
                  isCurrent
                    ? 'bg-g200 text-ink font-semibold'
                    : isDone
                    ? 'text-g400 line-through'
                    : 'text-g300'
                }`}
              >
                {w}
              </span>
            );
          })}
        </div>

        {/* Hidden Input field */}
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          className="w-full rounded-xl border border-g200 bg-g50 px-4 py-2.5 font-mono text-sm text-ink outline-none focus:border-ink transition-colors"
          placeholder="Start typing the highlighted word..."
          autoFocus
        />

        {/* Virtual Keyboard Indicator */}
        <div className="mt-6 hidden sm:flex flex-col gap-1.5 items-center">
          {KEYBOARD_ROWS.map((row, rIdx) => (
            <div key={rIdx} className="flex gap-1.5">
              {row.split('').map((char) => {
                const isPressed = activeKey === char;
                return (
                  <span
                    key={char}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border font-mono text-xs uppercase transition-all ${
                      isPressed
                        ? 'border-ink bg-ink text-bg scale-95 shadow-inner'
                        : 'border-g200 bg-g100 text-g500'
                    }`}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        {/* Finished banner */}
        {isFinished && (
          <div className="mt-6 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-emerald-500 font-pixel text-base">
              <Award className="h-5 w-5" />
              <span>Speed Test Completed!</span>
            </div>
            <p className="mt-1 font-mono text-xs text-g600">
              Score: <b>{wpm} WPM</b> with <b>{accuracy}%</b> accuracy. Press <b>Tab</b> to try again.
            </p>
          </div>
        )}

        {/* Instructions footer */}
        <div className="mt-6 flex items-center justify-between font-mono text-[11px] text-g400 pt-3 border-t border-g100">
          <span>Press Tab to restart · Space to advance words</span>
          <span>⌘J</span>
        </div>
      </div>
    </div>
  );
};
