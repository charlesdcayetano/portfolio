import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface AskOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const KNOWLEDGE_BASE: {
  keywords: string[];
  title: string;
  answer: string;
}[] = [
  {
    keywords: [
      'project',
      'work',
      'pos',
      'resume',
      'medicore',
      'bms',
      'chep',
      'filtracer',
    ],
    title: 'Flagship Systems',
    answer:
      'Charles has shipped 6 major systems: Chep-POS (Retail POS for PH sari-sari counters), Cheap Resume (ATS resume builder SaaS on Laravel 11 & Vue 3), MediCore (Hospital management platform), BMS (Barangay governance & clearance system), Byahe Ta (Public commute guide), and FilTracer (Alumni tracking thesis for Filamer Christian University).',
  },
  {
    keywords: [
      'stack',
      'tech',
      'skills',
      'language',
      'framework',
      'react',
      'vue',
      'laravel',
      'php',
      'python',
    ],
    title: 'Technical Stack',
    answer:
      'Frontend: React, Vue.js 3, Inertia.js, TypeScript, JavaScript, Tailwind CSS. Backend & DB: Laravel 11, PHP, Python 3, MySQL, RESTful APIs. AI & Tooling: Claude Code, Copilot, ChatGPT, Gemini, n8n, Git, Figma.',
  },
  {
    keywords: [
      'contact',
      'email',
      'hire',
      'reach',
      'message',
      'job',
      'freelance',
    ],
    title: 'Contact Information',
    answer:
      'You can reach Charles directly at cayetanocharlesd92000@gmail.com. He is actively open to Front-End and Full-Stack engineering roles, as well as freelance business systems development.',
  },
  {
    keywords: [
      'education',
      'college',
      'degree',
      'cert',
      'certification',
      'diploma',
      'dict',
      'filamer',
    ],
    title: 'Education & Certifications',
    answer:
      'Charles graduated with a Bachelor of Science in Information Technology (BSIT) from Filamer Christian University (2025). He passed the DICT ICT Proficiency Diagnostic Examination and completed the 486-hour Python Level III Developer Residency at DBTC.',
  },
  {
    keywords: ['location', 'where', 'city', 'timezone', 'country'],
    title: 'Location & Timezone',
    answer:
      'Based in Roxas City, Capiz, Philippines (GMT+8). Available for both local on-site and worldwide remote collaboration.',
  },
];

const SUGGESTIONS = [
  {
    number: '01',
    label: 'What systems have you built?',
    query: 'Flagship systems?',
  },
  {
    number: '02',
    label: 'What is your technical stack?',
    query: 'What is your stack?',
  },
  {
    number: '03',
    label: 'Where are you based?',
    query: 'Where are you based?',
  },
  {
    number: '04',
    label: 'How can I hire you?',
    query: 'How do I hire you?',
  },
];

export const AskOverlay: React.FC<AskOverlayProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [activeResponse, setActiveResponse] = useState<{
    title: string;
    answer: string;
  } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      sound.play('toggle');

      document.documentElement.style.overflow = 'hidden';

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      document.documentElement.style.overflow = '';
      setQuery('');
      setActiveResponse(null);
    }

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        sound.play('release');
        onClose();
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();

        if (isOpen) {
          sound.play('release');
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSearch = (text: string) => {
    const lower = text.toLowerCase().trim();

    if (!lower) return;

    sound.play('press');

    const matched = KNOWLEDGE_BASE.find((item) =>
      item.keywords.some((keyword) => lower.includes(keyword))
    );

    if (matched) {
      setActiveResponse({
        title: matched.title,
        answer: matched.answer,
      });

      sound.play('chime');
    } else {
      setActiveResponse({
        title: 'Portfolio Index',
        answer: `Regarding "${text}": Charles is a full-stack engineer experienced in building operational web systems using React, Vue, Laravel, and MySQL. Explore the projects or get in touch directly at cayetanocharlesd92000@gmail.com.`,
      });

      sound.play('droplet');
    }
  };

  const handleSuggestion = (query: string) => {
    setQuery(query);
    handleSearch(query);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg/90 backdrop-blur-sm"
        onClick={() => {
          sound.play('release');
          onClose();
        }}
      />

      {/* Main Interface */}
      <div
        className="
          relative z-10
          w-full
          max-w-4xl
          overflow-hidden
          border
          border-g200
          bg-bg
          shadow-[0_24px_80px_rgba(0,0,0,0.18)]
          animate-fadeIn
          sm:mx-6
          sm:mb-6
        "
      >
        {/* Top metadata bar */}
        <div className="flex items-center justify-between border-b border-g200 px-5 py-3 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.18em] text-g400">
              ASK
            </span>

            <span className="h-px w-6 bg-g300" />

            <span className="font-mono text-[10px] tracking-[0.12em] text-g400">
              CHARLES.DEV / INDEX
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.play('release');
              onClose();
            }}
            className="
              group
              flex
              items-center
              gap-2
              font-mono
              text-[10px]
              uppercase
              tracking-wider
              text-g400
              transition-colors
              hover:text-ink
            "
          >
            <span className="hidden sm:block">Close</span>

            <span className="flex h-7 w-7 items-center justify-center border border-g200 transition-colors group-hover:border-g400">
              <X className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-[0.8fr_1.2fr]">
          {/* Intro column */}
          <div className="border-b border-g200 p-6 sm:p-8 md:border-b-0 md:border-r">
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] tracking-[0.2em] text-g400">
                01 / QUERY
              </span>

              <span className="font-mono text-[10px] text-g300">
                {new Date().getFullYear()}
              </span>
            </div>

            <h2 className="mt-12 max-w-xs font-sans text-3xl font-medium leading-[1.05] tracking-[-0.04em] text-ink sm:text-4xl">
              Ask me
              <br />
              <span className="italic text-g500">anything.</span>
            </h2>

            <p className="mt-6 max-w-xs text-sm leading-6 text-g500">
              A small index of Charles' work, background, technology,
              and availability.
            </p>

            <div className="mt-10 hidden border-t border-g200 pt-4 md:block">
              <p className="font-mono text-[10px] uppercase tracking-wider text-g400">
                Available topics
              </p>

              <p className="mt-2 max-w-[240px] text-xs leading-5 text-g500">
                Projects · Stack · Experience · Education · Contact
              </p>
            </div>
          </div>

          {/* Query column */}
          <div className="p-6 sm:p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(query);
              }}
            >
              <label
                htmlFor="ask-query"
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-g400"
              >
                Your question
              </label>

              <div className="mt-3 border-b border-g300 pb-3 focus-within:border-ink transition-colors">
                <input
                  ref={inputRef}
                  id="ask-query"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What do you want to know?"
                  className="
                    w-full
                    bg-transparent
                    font-sans
                    text-lg
                    tracking-[-0.02em]
                    text-ink
                    placeholder:text-g300
                    outline-none
                    sm:text-xl
                  "
                />
              </div>

              <button
                type="submit"
                className="
                  mt-4
                  flex
                  items-center
                  gap-2
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.15em]
                  text-g500
                  transition-colors
                  hover:text-ink
                "
              >
                Search index
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </form>

            {/* Suggestions */}
            <div className="mt-10">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-g400">
                  Try asking
                </span>

                <span className="font-mono text-[10px] text-g300">
                  4 QUICK PICKS
                </span>
              </div>

              <div className="border-t border-g200">
                {SUGGESTIONS.map((item) => (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => handleSuggestion(item.query)}
                    className="
                      group
                      flex
                      w-full
                      items-center
                      gap-4
                      border-b
                      border-g200
                      py-3
                      text-left
                      transition-colors
                      hover:bg-g50
                    "
                  >
                    <span className="w-6 shrink-0 font-mono text-[10px] text-g300">
                      {item.number}
                    </span>

                    <span className="flex-1 text-sm text-g600 transition-colors group-hover:text-ink">
                      {item.label}
                    </span>

                    <ArrowUpRight
                      className="
                        h-3.5
                        w-3.5
                        -translate-x-1
                        text-g300
                        opacity-0
                        transition-all
                        group-hover:translate-x-0
                        group-hover:text-ink
                        group-hover:opacity-100
                      "
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Response */}
            {activeResponse && (
              <div className="mt-8 border-t-2 border-ink pt-4 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-g400">
                    02 / MATCH
                  </span>

                  <span className="font-mono text-[10px] text-g300">
                    FOUND
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-medium tracking-[-0.02em] text-ink">
                  {activeResponse.title}
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-g600">
                  {activeResponse.answer}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-g200 px-5 py-3 sm:px-7">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-g300">
            Personal knowledge index
          </span>

          <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-wider text-g400">
            <span className="hidden sm:inline">ESC to close</span>

            <span className="border border-g200 px-1.5 py-1">
              {navigator.platform?.toLowerCase().includes('mac')
                ? '⌘K'
                : 'CTRL K'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
