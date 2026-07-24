import { defineStore } from 'pinia'

const THEME_KEY = 'pokedex:theme'

function prefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const useUiStore = defineStore('ui', {
  state: () => ({
    theme: localStorage.getItem(THEME_KEY) ?? (prefersDark() ? 'dark' : 'light'),
    searchOpen: false,
    mobileNavOpen: false,
  }),
  actions: {
    applyTheme() {
      document.documentElement.classList.toggle('dark', this.theme === 'dark')
      localStorage.setItem(THEME_KEY, this.theme)
    },
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      this.applyTheme()
    },
    openSearch() {
      this.searchOpen = true
    },
    closeSearch() {
      this.searchOpen = false
    },
    toggleMobileNav(open) {
      this.mobileNavOpen = open ?? !this.mobileNavOpen
    },
  },
})
