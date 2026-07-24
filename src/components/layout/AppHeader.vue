<script setup>
import { Icon } from '@iconify/vue'
import { useUiStore } from '@/stores/ui'
import AppNav from './AppNav.vue'
import ThemeToggle from './ThemeToggle.vue'

const ui = useUiStore()
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-800/70 dark:bg-surface-dark/85">
    <div class="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
      <RouterLink to="/" class="flex items-center gap-2 shrink-0">
        <span class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-poke-red to-poke-red-dark shadow-sm">
          <Icon icon="mdi:pokeball" class="h-5 w-5 text-white" />
        </span>
        <span class="font-display text-lg font-bold text-slate-800 dark:text-white">Pokédex</span>
      </RouterLink>

      <AppNav class="flex-1 justify-center" />

      <div class="ml-auto flex items-center gap-2">
        <button
          type="button"
          class="flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-sm text-slate-400 transition hover:border-poke-red hover:text-poke-red dark:border-slate-700 dark:bg-surface-dark-raised dark:text-slate-400"
          @click="ui.openSearch()"
        >
          <Icon icon="mdi:magnify" class="h-4 w-4" />
          <span class="hidden sm:inline">Search…</span>
          <kbd class="hidden rounded border border-slate-300 px-1 text-[10px] sm:inline dark:border-slate-600">Ctrl K</kbd>
        </button>
        <ThemeToggle />
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 lg:hidden dark:border-slate-700 dark:bg-surface-dark-raised dark:text-slate-300"
          aria-label="Toggle navigation menu"
          @click="ui.toggleMobileNav()"
        >
          <Icon :icon="ui.mobileNavOpen ? 'mdi:close' : 'mdi:menu'" class="h-5 w-5" />
        </button>
      </div>
    </div>

    <div v-if="ui.mobileNavOpen" class="border-t border-slate-200 bg-white px-4 py-3 lg:hidden dark:border-slate-800 dark:bg-surface-dark">
      <AppNav vertical @navigate="ui.toggleMobileNav(false)" />
    </div>
  </header>
</template>
