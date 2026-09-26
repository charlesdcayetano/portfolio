import { useEffect, useState } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { getStoredTheme, setTheme, type Theme } from '../utils/theme'

const options: { value: Theme; icon: JSX.Element; label: string }[] = [
  { value: 'light', icon: <Sun size={14} />, label: 'Light theme' },
  { value: 'dark', icon: <Moon size={14} />, label: 'Dark theme' },
  { value: 'system', icon: <Monitor size={14} />, label: 'System theme' },
]

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>('system')

  useEffect(() => {
    setThemeState(getStoredTheme())
  }, [])

  function choose(value: Theme) {
    setTheme(value)
    setThemeState(value)
  }

  return (
    <div
      role="group"
      aria-label="Theme"
      className="inline-flex items-center gap-1 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] p-0.5"
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-label={opt.label}
          aria-pressed={theme === opt.value}
          onClick={() => choose(opt.value)}
          className={`p-1.5 rounded transition-colors duration-150 ${
            theme === opt.value
              ? 'bg-[#171717] text-[#FAFAFA] dark:bg-[#F5F5F5] dark:text-[#111111]'
              : 'text-[#666666] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#F5F5F5]'
          }`}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  )
}
