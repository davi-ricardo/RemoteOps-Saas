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
        'glow-blue': '0 0 40px rgba(59, 130, 246, 0.7)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.4)',
        'light-card': '0 10px 25px -5px rgba(15, 23, 42, 0.15), 0 8px 10px -6px rgba(15, 23, 42, 0.1)',
        'light-card-hover': '0 20px 40px -12px rgba(15, 23, 42, 0.25), 0 10px 20px -10px rgba(15, 23, 42, 0.15)',
        'light-box': '0 10px 30px -10px rgba(15, 23, 42, 0.25), 0 8px 24px -8px rgba(15, 23, 42, 0.15)',
        'light-box-hover': '0 15px 35px -10px rgba(15, 23, 42, 0.3), 0 10px 20px -8px rgba(15, 23, 42, 0.2)',
      },
    },
  },
  plugins: [],
}
