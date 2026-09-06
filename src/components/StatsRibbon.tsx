import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile';
import { sound } from '../utils/sound';

export const StatsRibbon: React.FC = () => {
  const stats = profile.stats;

  return (
    <section
      aria-label="Portfolio statistics"
      className="relative border-y border-g200"
    >
      {/* Top editorial label */}
      <div className="flex items-center justify-between border-b border-g200 px-0 py-2.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-g400">
          At a glance
        </span>

        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-g300">
          2026 / 001
        </span>
      </div>

      {/* Main statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4">

        {stats.map((stat, index) => {
          const isFirst = index === 0;

          return (
            <div
              key={stat.label}
              className={`
                group relative py-5 sm:py-6
                ${index % 2 === 0 ? 'pr-4' : 'pl-4'}
                sm:px-5
                ${isFirst ? 'sm:pl-0' : ''}
                ${index !== 0 ? 'border-l border-g200' : ''}
                ${index >= 2 ? 'border-t border-g200 sm:border-t-0' : ''}
              `}
            >
              <button
                type="button"
                onClick={() => sound.play('tick')}
                className="block w-full cursor-default text-left"
              >
                {/* Number / Index */}
                <div className="mb-4 flex items-start justify-between">
                  <span className="font-mono text-[9px] text-g300">
                    0{index + 1}
                  </span>

                  <ArrowUpRight
                    className="
                      h-3.5 w-3.5
                      text-g300
                      transition-all duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                      group-hover:text-ink
                    "
                  />
                </div>

                {/* Value */}
                <div
                  className={`
                    font-pixel leading-none tracking-tight text-ink
                    ${isFirst ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}
                  `}
                >
                  {stat.value}
                </div>

                {/* Label */}
                <div className="mt-3 max-w-[140px] font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-g500 transition-colors group-hover:text-ink">
                  {stat.label}
                </div>

                {/* Detail */}
                {stat.detail && (
                  <div className="mt-1.5 hidden max-w-[150px] truncate text-[10px] leading-relaxed text-g400 sm:block">
                    {stat.detail}
                  </div>
                )}

                {/* Hover rule */}
                <span
                  className="
                    absolute bottom-0 left-0
                    h-px w-0
                    bg-ink
                    transition-all duration-500
                    group-hover:w-full
                  "
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Technical baseline */}
      <div className="flex items-center gap-3 border-t border-g200 py-2.5">
        <span className="h-px w-8 bg-g300" />

        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-g400">
          Systems / Experience / Practice
        </span>

        <span className="ml-auto font-mono text-[8px] text-g300">
          ↓
        </span>
      </div>

      {/* Halftone transition */}
      <div
        aria-hidden="true"
        className="halftone halftone-wide mask-fade-x pointer-events-none absolute -bottom-6 left-0 h-5 w-full opacity-[0.16]"
      />
    </section>
  );
};