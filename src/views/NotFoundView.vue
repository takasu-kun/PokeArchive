<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <section class="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
    <Icon icon="mdi:pokeball" class="h-16 w-16 text-poke-red/50" />
    <h1 class="font-display text-3xl font-bold text-slate-800 dark:text-white">404</h1>
    <p class="text-slate-500 dark:text-slate-400">This Pokémon fled before we could see this page.</p>
    <RouterLink to="/" class="rounded-full bg-poke-red px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-poke-red-dark">
      Back to Home
    </RouterLink>
  </section>
</template>
