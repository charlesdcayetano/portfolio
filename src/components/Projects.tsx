import { Github, ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="py-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]"
    >
      <p className="section-label mb-4">Selected Work</p>
      <h2 id="work-heading" className="sr-only">Selected Work</h2>

      <ol className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
        {projects.map((project) => (
          <li key={project.index} className="py-6 first:pt-0">
            <div className="flex gap-4">
              <span className="font-mono text-xs text-[#999999] dark:text-[#737373] pt-1 shrink-0">
                {project.index}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-medium">
                  {project.name}
                  {project.fullName && (
                    <span className="text-[#666666] dark:text-[#A3A3A3] font-normal">
                      {' '}
                      — {project.fullName}
                    </span>
                  )}
                </h3>
                <p className="text-sm text-[#666666] dark:text-[#A3A3A3] mt-1">
                  {project.description}
                </p>

                {project.note && (
                  <p className="text-xs text-[#999999] dark:text-[#737373] mt-1 italic">
                    {project.note}
                  </p>
                )}

                <ul className="flex flex-wrap gap-2 mt-3" aria-label={`Technologies used in ${project.name}`}>
                  {project.technologies.map((tech) => (
                    <li key={tech} className="tag">
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-arrow text-sm"
                    >
                      <Github size={13} />
                      GitHub
                      <ArrowUpRight size={11} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-arrow text-sm"
                    >
                      Live Demo
                      <ArrowUpRight size={11} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
