import React, { useState } from 'react';
import { Terminal, FileText, ChevronRight, Quote } from 'lucide-react';
import { sound } from '../utils/sound';

interface OutcomeItem {
  quote: string;
  author: string;
  role: string;
  initials: string;
  project: string;
}

const outcomes: OutcomeItem[] = [
  {
    quote:
      "A centralized system designed to make alumni information and employment surveys easier to manage, track, and access. Successfully eliminated legacy paper-based graduate tracer processes.",
    author: "FilTracer Capstone",
    role: "Filamer Christian University · Lead Architect",
    initials: "FC",
    project: "FilTracer — Alumni Tracer System",
  },
  {
    quote:
      "Designed specifically for the realities of local retail and sari-sari counters in the Philippines. It combines barcode scanning and inventory tracking in a fast, offline-tolerant workflow without unnecessary bloat.",
    author: "Chep-POS System",
    role: "Retail Platform · Full-Stack Developer",
    initials: "CP",
    project: "Chep-POS — Retail Terminal",
  },
  {
    quote:
      "Directly modeled on actual district hospital workflows observed during IT public health rotations. Centralizes patient admissions, pharmacy inventory batches, and appointment scheduling into one coherent portal.",
    author: "MediCore Healthcare",
    role: "Hospital Information System · Architecture",
    initials: "MC",
    project: "MediCore — Healthcare Platform",
  },
];

export const Recommendations: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeItem = outcomes[activeIndex];

  return (
    <section id="recommendations" className="py-12 border-t border-g200 select-none">
      {/* Editorial System Header */}
      <div className="mb-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-g400">
        <div className="flex items-center gap-2">
          <Terminal className="h-3 w-3 text-g400" />
          <span>05 / Field Research & Outcomes</span>
        </div>
        <span className="font-mono text-[10px] text-g400">
          LOGS: {outcomes.length.toString().padStart(2, '0')} RECORDED
        </span>
      </div>

      {/* Title Callout */}
      <div className="mb-8 border-b border-g200 pb-6">
        <h2 className="font-pixel text-2xl sm:text-3xl text-ink tracking-tight">
          Engineering Impact Notes.
        </h2>
        <p className="mt-2 font-sans text-sm text-g600 max-w-xl leading-relaxed">
          Case notes and operational outcomes gathered from real-world software deployments, university thesis defenses, and system implementations.
        </p>
      </div>

      {/* Interactive Case Notebook Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Navigator List */}
        <div className="lg:col-span-5 rounded-xl border border-g200 bg-bg overflow-hidden">
          <div className="flex items-center justify-between border-b border-g200 bg-g50 px-4 py-2.5 font-mono text-[11px] text-g500">
            <span className="uppercase tracking-wider">System Impact Logs</span>
            <span className="text-[10px] text-g400">[ Select Log ]</span>
          </div>

          <div className="divide-y divide-g200">
            {outcomes.map((item, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={item.project}
                  type="button"
                  onMouseEnter={() => sound.play('tick')}
                  onClick={() => {
                    sound.play('press');
                    setActiveIndex(idx);
                  }}
                  className={`w-full text-left p-4 transition-colors flex items-center justify-between gap-3 group ${
                    isSelected ? 'bg-g50' : 'hover:bg-g50/40'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`h-7 w-7 rounded-md border flex items-center justify-center font-mono text-[10px] shrink-0 transition-colors ${
                        isSelected
                          ? 'border-ink bg-ink text-bg font-bold'
                          : 'border-g200 bg-bg text-g500 group-hover:border-g300'
                      }`}
                    >
                      {item.initials}
                    </div>

                    <div className="min-w-0">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-g400 block truncate">
                        {item.author}
                      </span>
                      <h3
                        className={`text-[13px] font-medium truncate transition-colors ${
                          isSelected ? 'text-ink font-semibold' : 'text-g700 group-hover:text-ink'
                        }`}
                      >
                        {item.project}
                      </h3>
                    </div>
                  </div>

                  <ChevronRight
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isSelected ? 'text-ink translate-x-0.5' : 'text-g300 group-hover:text-g400'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Terminal Log Inspector */}
        <div className="lg:col-span-7 rounded-xl border border-g200 bg-bg overflow-hidden sticky top-20">
          <div className="flex items-center justify-between border-b border-g200 bg-g50 px-4 py-2.5 font-mono text-[11px] text-g500">
            <div className="flex items-center gap-2">
              <FileText className="h-3.5 w-3.5 text-g400" />
              <span className="uppercase tracking-wider">Log Detail View</span>
            </div>
            <span className="text-[10px] text-g400 font-mono">
              [ REF: 0{activeIndex + 1} ]
            </span>
          </div>

          <div className="p-6 space-y-5 font-mono">
            <div>
              <span className="text-[9.5px] uppercase tracking-widest text-g400 block mb-1">
                Target Project
              </span>
              <h3 className="font-sans text-lg font-bold text-ink">
                {activeItem.project}
              </h3>
              <span className="text-[11px] text-g500 mt-0.5 block">
                {activeItem.role}
              </span>
            </div>

            <div className="rounded-lg border border-g200 bg-g50/50 p-4 relative">
              <Quote className="h-5 w-5 text-g300 mb-2" />
              <p className="font-sans text-[13.5px] leading-relaxed text-g700 italic">
                "{activeItem.quote}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-g100 text-[11px]">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-g400 block mb-0.5">
                  Deployment Scope
                </span>
                <span className="text-ink font-medium">Production / Field Validated</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-g400 block mb-0.5">
                  Audit Status
                </span>
                <span className="text-emerald-600 font-medium">Passed Inspection</span>
              </div>
            </div>
          </div>

          <div className="border-t border-g200 bg-g50/50 px-4 py-2 flex items-center justify-between font-mono text-[10px] text-g400">
            <span>Verified System Outcome</span>
            <span>Terminal Operational</span>
          </div>
        </div>
      </div>
    </section>
  );
};