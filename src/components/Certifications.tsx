import { useState } from 'react'
import { ChevronDown, ArrowUpRight } from 'lucide-react'
import { certifications } from '../data/certifications'

export default function Certifications() {
  const [open, setOpen] = useState(false)

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="py-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="certifications-list"
        className="flex items-center gap-2 section-label"
      >
        Certifications
        <ChevronDown
          size={14}
          className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <h2 id="certifications-heading" className="sr-only">Certifications</h2>

      {open && (
        <ul id="certifications-list" className="mt-4 space-y-3">
          {certifications.map((cert) => (
            <li key={cert.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm">
              <div>
                <span className="font-medium">{cert.name}</span>
                <span className="text-[#666666] dark:text-[#A3A3A3]"> — {cert.issuer}</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-[#999999] dark:text-[#737373]">
                <span>{cert.year}</span>
                {cert.url && (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="link-arrow">
                    Verify <ArrowUpRight size={10} />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
