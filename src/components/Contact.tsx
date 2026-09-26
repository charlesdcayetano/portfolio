import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/profile'

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-8 border-t border-[#E5E5E5] dark:border-[#2A2A2A]"
    >
      <h2 id="contact-heading" className="text-2xl font-semibold tracking-tight">
        Let&rsquo;s work together.
      </h2>
      <p className="mt-3 max-w-content text-[#666666] dark:text-[#A3A3A3]">
        Have a project, role, or technical problem in mind? I&rsquo;m open to engineering
        opportunities and practical software projects.
      </p>

      <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6">
        <a href={`mailto:${profile.email}`} className="link-arrow text-sm">
          <Mail size={14} /> Email me <ArrowUpRight size={12} />
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-arrow text-sm">
          <Github size={14} /> GitHub <ArrowUpRight size={12} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-arrow text-sm">
          <Linkedin size={14} /> LinkedIn <ArrowUpRight size={12} />
        </a>
      </div>
    </section>
  )
}
