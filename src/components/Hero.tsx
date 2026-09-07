import React from 'react';
import { ArrowUpRight, MapPin, Mail, Sparkles } from 'lucide-react';
import { profile } from '../data/profile';
import { sound } from '../utils/sound';

export const Hero: React.FC = () => {
  const profileTitle =
    (profile as Partial<{ title?: string; role?: string }>).title ??
    (profile as Partial<{ title?: string; role?: string }>).role ??
    'Front - End Developer';

  return (
    <section className="py-10 sm:py-16">
      {/* Editorial Header Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-g200 pb-3 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          <span className="uppercase tracking-wider text-g600 font-medium">
            Available for Engineering Roles
          </span>
        </div>
        <div className="flex items-center gap-4 text-g400">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-g400" />
            {profile.location || 'Remote'}
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline uppercase">Folio / 2026</span>
        </div>
      </div>

      {/* Main Structural Layout Grid */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Hero Typography & Info Block */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <span className="font-mono text-[12px] uppercase tracking-widest text-g400 block mb-1">
              {profileTitle}
            </span>
            <h1 className="font-pixel text-4xl sm:text-5xl lg:text-6xl text-ink leading-tight tracking-tight">
              {profile.name}
            </h1>
          </div>

          <div className="space-y-3 max-w-xl text-[14.5px] leading-relaxed text-g600 border-l-2 border-g200 pl-4">
            <p>{profile.bio1}</p>
            {profile.bio2 && <p>{profile.bio2}</p>}
          </div>

          {/* Direct CTA Action Row */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              onClick={() => sound.play('press')}
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 font-mono text-[12px] font-medium text-bg hover:opacity-90 transition-opacity"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Get in touch</span>
            </a>

            {/* Social Network Chips */}
            <div className="flex flex-wrap items-center gap-1 font-mono text-[11px]">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.play('tick')}
                  className="inline-flex items-center gap-0.5 rounded px-2.5 py-1 text-g600 hover:text-ink hover:bg-g100 transition-colors"
                >
                  <span>{social.label}</span>
                  <ArrowUpRight className="h-3 w-3 text-g400" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Framed Image Display */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
            {/* Outer Architectural Border Container */}
            <div className="relative rounded-2xl border border-g200 bg-g50 p-2">
              {/* Image Canvas Container */}
              <div className="relative overflow-hidden rounded-xl border border-g200/80 bg-g100 aspect-[4/5]">
                <img
                  src={profile.avatarUrl || '/images/Portfolio.webp'}
                  alt={profile.name}
                  width={400}
                  height={500}
                  loading="eager"
                  decoding="sync"
                  // @ts-ignore - Instructs browser engine to prioritize LCP image fetch
                  fetchpriority="high"
                  className="h-full w-full object-cover select-none grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-500"
                  draggable={false}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== window.location.origin + '/images/Portfolio.webp') {
                      target.src = '/images/Portfolio.webp';
                    }
                  }}
                />

                {/* Halftone Bottom Fade Overlay */}
                <div
                  aria-hidden="true"
                  className="halftone-white mask-up pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-80"
                />
              </div>

              {/* Minimal Status Bar Badge */}
              <div className="mt-2 flex items-center justify-between px-2 py-1 font-mono text-[10px] text-g500">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-amber-500" />
                  <span>Verified Profile</span>
                </span>
                <span className="uppercase text-g400">Fig. 01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};