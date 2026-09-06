import React from 'react';
import { certifications } from '../data/certifications';
import { sound } from '../utils/sound';
import {
  Award,
  ShieldCheck,
  GraduationCap,
  ArrowUpRight,
} from 'lucide-react';

export const Certifications: React.FC = () => {
  const getIcon = (id: string) => {
    if (id.includes('bsit')) {
      return GraduationCap;
    }

    if (id.includes('cyber') || id.includes('cip')) {
      return ShieldCheck;
    }

    return Award;
  };

  return (
    <section
      id="certifications"
      className="border-t border-g200 py-14 sm:py-20"
    >
      {/* ─────────────────────────────────────────
          HEADER
      ───────────────────────────────────────── */}
      <header className="mb-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-g400">04</span>

            <span className="h-px w-8 bg-g300" />

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-g500">
              Credentials
            </span>
          </div>

          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-g300">
            Archive / {certifications.length.toString().padStart(2, '0')}
          </span>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_220px] sm:items-end">
          <div>
            <h2 className="font-pixel text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
              Things I've earned.
            </h2>

            <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-g500">
              A record of formal study, technical training, and credentials
              collected along the way.
            </p>
          </div>

          <div className="border-l border-g200 pl-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-g300">
              Record status
            </div>

            <div className="mt-1 text-[12px] text-g600">
              {certifications.length} credentials on file
            </div>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────
          CREDENTIAL INDEX
      ───────────────────────────────────────── */}
      <div className="border-y border-g200">
        {/* Column labels */}
        <div className="hidden grid-cols-[64px_74px_1fr_110px_24px] items-center border-b border-g200 py-2 sm:grid">
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-g300">
            No.
          </span>

          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-g300">
            Year
          </span>

          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-g300">
            Credential
          </span>

          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-g300">
            Issuer
          </span>

          <span />
        </div>

        {certifications.slice(0, 6).map((cert, index) => {
          const Icon = getIcon(cert.id);
          const isFeatured = index === 0;

          return (
            <article
              key={cert.id}
              onMouseEnter={() => sound.play('tick')}
              className="group relative border-b border-g200 last:border-b-0"
            >
              <button
                type="button"
                onClick={() => sound.play('press')}
                className="relative block w-full text-left"
              >
                <div className="grid grid-cols-[42px_1fr_24px] gap-4 px-0 py-6 sm:grid-cols-[64px_74px_1fr_110px_24px] sm:items-center sm:gap-0 sm:py-5">
                  {/* Number */}
                  <div className="flex items-start sm:items-center">
                    <span
                      className={`font-mono text-[9px] transition-colors ${
                        isFeatured
                          ? 'text-ink'
                          : 'text-g300 group-hover:text-ink'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Mobile / Year */}
                  <div className="hidden sm:block">
                    <span
                      className={`font-mono text-[10px] ${
                        isFeatured ? 'text-ink' : 'text-g400'
                      }`}
                    >
                      {cert.year}
                    </span>
                  </div>

                  {/* Credential */}
                  <div className="min-w-0">
                    <div className="flex items-start gap-3">
                      {/* Small technical marker */}
                      <div
                        className={`mt-0.5 hidden h-7 w-7 shrink-0 items-center justify-center border sm:flex ${
                          isFeatured
                            ? 'border-ink bg-ink text-bg'
                            : 'border-g200 text-g400 group-hover:border-g400 group-hover:text-ink'
                        } transition-colors`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[9px] text-g300 sm:hidden">
                            {cert.year}
                          </span>

                          {isFeatured && (
                            <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-g400">
                              Primary
                            </span>
                          )}
                        </div>

                        <h3
                          className={`mt-1 leading-snug transition-colors ${
                            isFeatured
                              ? 'text-[14px] font-medium text-ink sm:text-[15px]'
                              : 'text-[13px] text-g600 group-hover:text-ink'
                          }`}
                        >
                          {cert.title}
                        </h3>

                        <p className="mt-1 truncate font-mono text-[9px] uppercase tracking-[0.12em] text-g400 sm:hidden">
                          {cert.issuer}
                        </p>

                        <p className="mt-1 hidden font-mono text-[8px] tracking-[0.08em] text-g300 sm:block">
                          ID / {cert.credentialId.split('-')[0]}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Issuer */}
                  <div className="hidden min-w-0 sm:block">
                    <p className="truncate text-[10px] text-g500">
                      {cert.issuer}
                    </p>

                    <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-g300">
                      {cert.credentialId.split('-')[0]}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-end">
                    <ArrowUpRight
                      className={`h-3.5 w-3.5 transition-all duration-300 ${
                        isFeatured
                          ? 'text-ink'
                          : 'text-g300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink'
                      }`}
                    />
                  </div>
                </div>

                {/* Hover progress line */}
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 h-px bg-ink transition-all duration-500 ${
                    isFeatured
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            </article>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────
          FOOTER NOTE
      ───────────────────────────────────────── */}
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-ink" />

          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-g400">
            Credentials / maintained
          </span>
        </div>

        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-g300">
          Last updated / 2026
        </span>
      </div>

      {/* Halftone transition */}
      <div
        aria-hidden="true"
        className="halftone halftone-wide mask-fade-x mt-8 h-5 w-full opacity-[0.12]"
      />
    </section>
  );
};