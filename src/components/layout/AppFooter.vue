<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <footer class="mt-auto border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-surface-dark-raised dark:text-slate-400">
    <div class="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4">
      <div class="flex items-center gap-2 font-display font-semibold text-slate-700 dark:text-slate-200">
        <Icon icon="mdi:pokeball" class="h-4 w-4 text-poke-red" />
        Pokédex
      </div>
      <p>
        Data from
        <a href="https://pokeapi.co" target="_blank" rel="noopener" class="text-poke-blue hover:underline">PokeAPI</a>.
        Not affiliated with Nintendo, Game Freak or The Pokémon Company.
      </p>
      <p class="text-xs text-slate-400 dark:text-slate-500">
        Made just for fun by a lifelong Pokémon fan — loving it since childhood, still loving it now.
      </p>
    </div>
  </footer>
</template>
