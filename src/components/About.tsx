import { profile } from '../data/profile'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
      <p className="section-label mb-4">About</p>
      <h2 id="about-heading" className="sr-only">
        About Charles D. Cayetano
      </h2>
      <div className="space-y-3 max-w-content text-base leading-relaxed text-[#666666] dark:text-[#A3A3A3]">
        {profile.about.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}
