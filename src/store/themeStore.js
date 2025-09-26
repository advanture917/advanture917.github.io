import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: 'light',
  
  setTheme: (theme) => {
    set({ theme })
    localStorage.setItem('theme', theme)
  },
  
  toggleTheme: () => {
    const currentTheme = useThemeStore.getState().theme
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    set({ theme: newTheme })
    localStorage.setItem('theme', newTheme)
  },
  
  initializeTheme: () => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme) {
      set({ theme: savedTheme })
    } else if (prefersDark) {
      set({ theme: 'dark' })
      localStorage.setItem('theme', 'dark')
    } else {
      set({ theme: 'light' })
      localStorage.setItem('theme', 'light')
    }
  }
}))