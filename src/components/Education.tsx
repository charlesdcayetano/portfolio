import { education } from '../data/experience'

export default function Education() {
  return (
    <section
      id="background"
      aria-labelledby="background-heading"
      className="py-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]"
    >
      <p className="section-label mb-4">Background</p>
      <h2 id="background-heading" className="sr-only">Education</h2>

      <div className="mb-5">
        <h3 className="text-base font-medium">{education.degree}</h3>
        <p className="text-sm text-[#666666] dark:text-[#A3A3A3]">
          {education.school} · {education.year}
        </p>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2 text-[#666666] dark:text-[#A3A3A3]">
          Additional Training
        </h4>
        <ul className="text-sm space-y-1">
          {education.additional.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[#B45309] dark:text-[#F59E0B]">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
