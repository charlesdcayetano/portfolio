import React, { useState } from 'react';
import {
  ChevronDown,
  ArrowUpRight,
  Wrench,
} from 'lucide-react';
import { experiences } from '../data/experience';
import {
  featuredStackPills,
  techStackCategories,
} from '../data/stack';
import { sound } from '../utils/sound';

export const Experience: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const toggleExpand = (index: number) => {
    sound.play('toggle');
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const categories = [
    'all',
    ...techStackCategories.map((category) => category.title),
  ];

  const filteredSkills =
    activeCategory === 'all'
      ? featuredStackPills
      : techStackCategories.find(
          (category) => category.title === activeCategory
        )?.skills || [];

  return (
    <section
      id="experience"
      className="border-t border-g200 py-14 sm:py-20"
    >
      {/* =====================================================
          SECTION HEADER
      ====================================================== */}
      <header className="mb-10">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-g400">
              02
            </span>

            <span className="h-px w-8 bg-g300" />

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-g500">
              Experience
            </span>
          </div>

          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-g300">
            Selected history
          </span>
        </div>

        <div className="mt-6 max-w-xl">
          <h2 className="font-pixel text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
            Where I've worked
          </h2>

          <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-g500">
            A short record of roles, training, and environments that shaped
            how I approach software.
          </p>
        </div>
      </header>


      {/* =====================================================
          EXPERIENCE LEDGER
      ====================================================== */}
      <div className="relative">

        {/* Vertical timeline */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-[38px] top-0 w-px bg-g200 sm:left-[54px]"
        />

        <div className="space-y-0">
          {experiences.map((item, index) => {
            const isExpanded = expandedIndex === index;
            const isLast = index === experiences.length - 1;

            return (
              <article
                key={`${item.role}-${item.year}`}
                className={`group relative ${
                  !isLast ? 'border-b border-g100' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(index)}
                  aria-expanded={isExpanded}
                  className="relative block w-full py-6 text-left sm:py-7"
                >
                  <div className="grid grid-cols-[64px_1fr] gap-5 sm:grid-cols-[90px_1fr] sm:gap-6">

                    {/* Year */}
                    <div className="relative">
                      <span
                        className={`
                          relative z-10 inline-flex
                          bg-bg pr-3
                          font-mono text-[10px]
                          transition-colors
                          ${
                            isExpanded
                              ? 'text-ink'
                              : 'text-g400 group-hover:text-ink'
                          }
                        `}
                      >
                        {item.year}
                      </span>

                      {/* Timeline node */}
                      <span
                        className={`
                          absolute left-[34px] top-[7px]
                          z-20 h-2 w-2
                          -translate-x-1/2
                          rounded-full
                          border
                          transition-all duration-300
                          sm:left-[44px]
                          ${
                            isExpanded
                              ? 'scale-125 border-ink bg-ink'
                              : 'border-g300 bg-bg group-hover:border-ink'
                          }
                        `}
                      />
                    </div>


                    {/* Main entry */}
                    <div>

                      {/* Role + Arrow */}
                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">
                          <h3
                            className={`
                              text-[15px] font-medium leading-snug
                              transition-colors
                              ${
                                isExpanded
                                  ? 'text-ink'
                                  : 'text-g600 group-hover:text-ink'
                              }
                            `}
                          >
                            {item.role}
                          </h3>

                          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="text-[12px] text-g500">
                              {item.organization}
                            </span>

                            {item.badge && (
                              <>
                                <span className="text-g300">·</span>

                                <span className="font-mono text-[9px] uppercase tracking-wider text-g400">
                                  {item.badge}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <span
                          className={`
                            flex h-6 w-6 shrink-0
                            items-center justify-center
                            border border-g200
                            transition-all duration-300
                            ${
                              isExpanded
                                ? 'rotate-180 bg-ink text-bg'
                                : 'text-g400 group-hover:border-g400 group-hover:text-ink'
                            }
                          `}
                        >
                          <ChevronDown className="h-3 w-3" />
                        </span>
                      </div>


                      {/* Expanded Content */}
                      <div
                        className={`
                          grid transition-all duration-300
                          ${
                            isExpanded
                              ? 'mt-5 grid-rows-[1fr] opacity-100'
                              : 'grid-rows-[0fr] opacity-0'
                          }
                        `}
                      >
                        <div className="overflow-hidden">

                          <div className="border-l border-g300 pl-4">
                            <ul className="space-y-2.5">
                              {item.description.map((bullet, bulletIndex) => (
                                <li
                                  key={bulletIndex}
                                  className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-g500"
                                >
                                  <span className="mt-[7px] h-1 w-1 shrink-0 bg-g300" />

                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Entry footer */}
                            <div className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-g300">
                              <span>Role record</span>
                              <span>—</span>
                              <span>CDC / Archive</span>
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </div>


      {/* =====================================================
          TOOLBOX
      ====================================================== */}
      <section
        id="stack"
        className="mt-16 border-t border-g200 pt-10"
      >

        {/* Toolbox header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <Wrench className="h-3 w-3 text-g400" />

              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-g400">
                Toolbox
              </span>
            </div>

            <h3 className="font-pixel text-2xl tracking-tight text-ink">
              Things I work with
            </h3>
          </div>

          <span className="max-w-[220px] font-mono text-[9px] uppercase leading-relaxed tracking-wider text-g300">
            Languages / frameworks / tools
          </span>
        </div>


        {/* Category navigation */}
        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-b border-g200 pb-3">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  sound.play('toggle');
                  setActiveCategory(category);
                }}
                className={`
                  relative pb-2
                  font-mono text-[9px]
                  uppercase tracking-[0.14em]
                  transition-colors
                  ${
                    isActive
                      ? 'text-ink'
                      : 'text-g400 hover:text-ink'
                  }
                `}
              >
                {category}

                {isActive && (
                  <span className="absolute bottom-[-1px] left-0 h-px w-full bg-ink" />
                )}
              </button>
            );
          })}
        </div>


        {/* Skills */}
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2">

            {filteredSkills.map((skill, index) => (
              <button
                key={skill}
                type="button"
                onClick={() => sound.play('tick')}
                className={`
                  group flex items-center justify-between
                  border-b border-g100
                  py-3
                  text-left
                  transition-colors
                  ${
                    index % 2 === 0
                      ? 'sm:pr-6 sm:border-r'
                      : 'sm:pl-6'
                  }
                `}
              >
                <div className="flex items-center gap-3">

                  <span className="font-mono text-[9px] text-g300">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="text-[12px] text-g600 transition-colors group-hover:text-ink">
                    {skill}
                  </span>
                </div>

                <ArrowUpRight
                  className="
                    h-3 w-3
                    text-g300
                    opacity-0
                    transition-all
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-ink
                    group-hover:opacity-100
                  "
                />
              </button>
            ))}

          </div>
        </div>


        {/* Toolbox footer */}
        <div className="mt-5 flex items-center justify-between">
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-g300">
            Updated / 2026
          </span>

          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-g300">
            Always learning
          </span>
        </div>
      </section>


      {/* Halftone transition */}
      <div
        aria-hidden="true"
        className="halftone halftone-wide mask-fade-x mt-8 h-5 w-full opacity-[0.12]"
      />
    </section>
  );
};