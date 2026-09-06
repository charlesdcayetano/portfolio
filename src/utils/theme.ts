// Theme management with View Transitions circular reveal and system preference support
export type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'charles_portfolio_theme';

export function getStoredTheme(): ThemeMode {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    if (val === 'light' || val === 'dark' || val === 'system') return val;
  } catch {}
  return 'dark';
}

export function isDarkMode(mode: ThemeMode): boolean {
  if (mode === 'dark') return true;
  if (mode === 'light') return false;
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return true;
}

export function applyTheme(mode: ThemeMode, event?: React.MouseEvent | MouseEvent) {
  const root = document.documentElement;
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {}

  const targetDark = isDarkMode(mode);
  const currentDark = root.classList.contains('dark');

  if (targetDark === currentDark) {
    // Just sync classes if already matches
    root.classList.toggle('dark', targetDark);
    return;
  }

  // Check if browser supports View Transitions API and prefers-reduced-motion is false
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // View Transitions circular reveal
  if (!prefersReducedMotion && 'startViewTransition' in document) {
    const x = event ? (event.clientX || (event as any).pageX) : window.innerWidth / 2;
    const y = event ? (event.clientY || (event as any).pageY) : window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = (document as any).startViewTransition(() => {
      root.classList.toggle('dark', targetDark);
    });

    transition.ready.then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 540,
          easing: 'cubic-bezier(0.32, 0.08, 0.24, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    }).catch(() => {
      root.classList.toggle('dark', targetDark);
    });
  } else {
    // Fallback: smooth CSS color transition
    root.classList.add('theme-anim');
    root.classList.toggle('dark', targetDark);
    setTimeout(() => {
      root.classList.remove('theme-anim');
    }, 520);
  }
}
