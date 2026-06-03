/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Design Tokens Semânticos
        'background': 'var(--color-background)',
        'background-secondary': 'var(--color-background-secondary)',
        'surface': 'var(--color-surface)',
        'surface-hover': 'var(--color-surface-hover)',
        'surface-elevated': 'var(--color-surface-elevated)',
        'border': 'var(--color-border)',
        'border-hover': 'var(--color-border-hover)',
        'text': 'var(--color-text)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'primary': 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
        'danger': 'var(--color-danger)',
        'info': 'var(--color-info)',
        'sidebar-background': 'var(--color-sidebar-background)',
        'sidebar-surface': 'var(--color-sidebar-surface)',
        'sidebar-text': 'var(--color-sidebar-text)',
        'sidebar-active': 'var(--color-sidebar-active)',
        'topbar-background': 'var(--color-topbar-background)',
        'topbar-border': 'var(--color-topbar-border)',
        
        // Cores customizadas existentes (preservadas para compatibilidade)
        'slate-dark': '#0f172a',
        'slate-card': '#111827',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.4)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.4)',
      },
    },
  },
  plugins: [],
}
