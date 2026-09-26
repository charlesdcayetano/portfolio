import { profile } from '../data/profile'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] py-8 mt-4 text-sm text-[#666666] dark:text-[#A3A3A3]">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <p className="font-medium text-[#171717] dark:text-[#F5F5F5]">{profile.name}</p>
          <p>{profile.title}</p>
          <p className="font-mono text-xs mt-1">Philippines · GMT+8</p>
        </div>
        <nav aria-label="Footer links" className="flex gap-4">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#B45309] dark:hover:text-[#F59E0B]">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#B45309] dark:hover:text-[#F59E0B]">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-[#B45309] dark:hover:text-[#F59E0B]">
            Email
          </a>
        </nav>
      </div>
      <p className="font-mono text-xs mt-6 text-[#999999] dark:text-[#737373]">
        © {year} {profile.name}
      </p>
    </footer>
  )
}
