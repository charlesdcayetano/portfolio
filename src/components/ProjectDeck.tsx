import React, { useState } from 'react';
import {
  ArrowUpRight,
  ExternalLink,
  Terminal,
  Cpu,
  CornerDownRight,
} from 'lucide-react';
import { sound } from '../utils/sound';

interface Project {
  number: string;
  category: string;
  title: string;
  description: string;
  technologies: string[];
  href?: string;
}

const projects: Project[] = [
  {
    number: '01',
    category: 'Higher Education',
    title: 'CSAS — Chep Smart Academic System',
    description:
      'A comprehensive academic management platform handling student enrollment workflows, grading mark sheets, faculty loading, and official scholastic records.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    href: 'https://github.com/charlesdcayetano/csas',
  },
  {
    number: '02',
    category: 'Resume Platform',
    title: 'Cheap Resume',
    description:
      'A real-time split-screen builder designed to help users create ATS-friendly, professional resumes with vector PDF exports.',
    technologies: ['Laravel 11', 'Vue 3', 'Inertia.js', 'Tailwind'],
    href: 'https://github.com/charlesdcayetano/cheapresume',
  },
  {
    number: '03',
    category: 'Booking Management',
    title: 'CBMS — Booking Management System',
    description:
      'A web-based booking management system centralizing customer reservations, service schedules, availability, and payment tracking.',
    technologies: ['Laravel 11', 'PHP', 'MySQL', 'Redis', 'Tailwind'],
    href: 'https://github.com/charlesdcayetano/bms',
  },
  {
    number: '04',
    category: 'Travel Platform',
    title: 'Byahe Ta',
    description:
      'A public transit guide centralizing local jeepney and bus routes, timetable schedules, fare matrices, and terminal locations.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Leaflet'],
    href: 'https://github.com/charlesdcayetano/byahe-ta',
  },
];

export const ProjectDeck: React.FC = () => {
  const [activeNumber, setActiveNumber] = useState<string>(projects[0].number);

  return (
    <section id="systems" className="py-12 border-t border-g200 select-none">
      {/* Editorial System Header */}
      <div className="mb-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-g400">
        <div className="flex items-center gap-2">
          <Terminal className="h-3 w-3 text-g400" />
          <span>02 / System Architecture Index</span>
        </div>
        <span className="font-mono text-[10px] text-g400">
          INDEX: {projects.length.toString().padStart(2, '0')} DEPLOYED
        </span>
      </div>

      {/* Title Callout */}
      <div className="mb-8 border-b border-g200 pb-6">
        <h2 className="font-pixel text-2xl sm:text-3xl text-ink tracking-tight">
          Shipped Software Systems.
        </h2>
        <p className="mt-2 font-sans text-sm text-g600 max-w-xl leading-relaxed">
          Production-grade web platforms, automation backends, and business operating tools built with modern PHP, JavaScript, and database infrastructure.
        </p>
      </div>

      {/* Terminal Deck Architecture Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Interactive Navigator */}
        <div className="lg:col-span-5 rounded-xl border border-g200 bg-bg overflow-hidden">
          <div className="flex items-center justify-between border-b border-g200 bg-g50 px-4 py-2.5 font-mono text-[11px] text-g500">
            <span className="uppercase tracking-wider">System Directory</span>
            <span className="text-[10px] text-g400">[ Select Node ]</span>
          </div>

          <div className="divide-y divide-g200">
            {projects.map((project) => {
              const isActive = activeNumber === project.number;
              return (
                <button
                  key={project.number}
                  type="button"
                  onMouseEnter={() => sound.play('tick')}
                  onClick={() => {
                    sound.play('press');
                    setActiveNumber(project.number);
                  }}
                  className={`w-full text-left p-4 transition-colors flex items-center justify-between group ${
                    isActive ? 'bg-g50' : 'hover:bg-g50/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`font-mono text-[11px] h-6 w-6 rounded border flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'border-ink bg-ink text-bg font-bold'
                          : 'border-g200 bg-bg text-g400 group-hover:border-g300'
                      }`}
                    >
                      {project.number}
                    </span>
                    <div className="min-w-0">
                      <span className="font-mono text-[9.5px] uppercase tracking-wider text-g400 block truncate">
                        {project.category}
                      </span>
                      <h3
                        className={`text-[13px] font-medium truncate transition-colors ${
                          isActive ? 'text-ink font-semibold' : 'text-g700 group-hover:text-ink'
                        }`}
                      >
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <CornerDownRight
                    className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                      isActive ? 'text-ink translate-x-0.5' : 'text-g300 group-hover:text-g400'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail Console Screen */}
        <div className="lg:col-span-7 rounded-xl border border-g200 bg-bg overflow-hidden sticky top-20">
          {projects
            .filter((p) => p.number === activeNumber)
            .map((project) => (
              <React.Fragment key={project.number}>
                {/* Console Topbar */}
                <div className="flex items-center justify-between border-b border-g200 bg-g50 px-4 py-2.5 font-mono text-[11px] text-g500">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-3.5 w-3.5 text-g400" />
                    <span className="uppercase tracking-wider">
                      Node Spec: {project.number}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    DEPLOYED
                  </span>
                </div>

                {/* Main Spec Payload */}
                <div className="p-6 space-y-5">
                  <div className="flex items-start justify-between gap-4 border-b border-g100 pb-4">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-g400 block mb-1">
                        {project.category}
                      </span>
                      <h3 className="font-pixel text-2xl text-ink">
                        {project.title}
                      </h3>
                    </div>

                    {project.href && project.href !== '#' ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.play('tick')}
                        aria-label={`Open ${project.title}`}
                        className="rounded-lg border border-g200 p-2.5 text-g500 transition-colors hover:border-ink hover:bg-ink hover:text-bg shrink-0"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <div className="rounded-lg border border-g200 p-2.5 text-g300 shrink-0 bg-g50">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-g400 block mb-1.5">
                      System Architecture Overview
                    </span>
                    <p className="font-sans text-[13.5px] leading-relaxed text-g600">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-g400 block mb-2">
                      Core Technology Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5 font-mono">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-g200 bg-g50 px-2.5 py-1 text-[11px] text-g700 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Console Footer */}
                <div className="border-t border-g200 bg-g50/50 px-4 py-2 flex items-center justify-between font-mono text-[10px] text-g400">
                  <span>Runtime: Operational</span>
                  <span>Environment: Production</span>
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </section>
  );
};