import { ArrowUpRight } from 'lucide-react'
import { profile } from '../data/profile'

export default function GithubActivity() {
  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="py-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]"
    >
      <p className="section-label mb-4">GitHub</p>
      <h2 id="github-heading" className="sr-only">
        GitHub Activity
      </h2>

      <div className="overflow-x-auto rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] p-4 bg-white/40 dark:bg-white/[0.02]">
        <img
          src={`https://ghchart.rshah.org/B45309/${'charlesdcayetano'}`}
          alt="Charles D. Cayetano's GitHub contribution graph"
          className="min-w-[600px] w-full dark:invert-[0.92] dark:hue-rotate-180"
          loading="lazy"
        />
      </div>

      <a
        href={`${profile.github}`}
        target="_blank"
        rel="noopener noreferrer"
        className="link-arrow text-sm mt-4"
      >
        View GitHub activity
        <ArrowUpRight size={12} />
      </a>
    </section>
  )
}
