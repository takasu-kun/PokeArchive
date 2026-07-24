<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-poke-red via-poke-red-dark to-poke-blue-dark">
    <Icon icon="mdi:pokeball" class="pointer-events-none absolute -right-16 -top-16 h-96 w-96 text-white/10" />
    <Icon icon="mdi:pokeball" class="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 text-white/10" />

    <div class="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
      <span class="rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-poke-yellow backdrop-blur">
        Powered by PokeAPI
      </span>
      <h1 class="font-display text-4xl font-extrabold text-white drop-shadow-sm sm:text-5xl">
        Every Pokémon. Every Move.<br class="hidden sm:block" /> Every Detail.
      </h1>
      <p class="max-w-xl text-balance text-white/85">
        A complete PokeArchive covering Pokémon, moves, items, berries, locations, games, contests, encounters,
        evolutions and machines — all in one modern, searchable archive.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <RouterLink
          to="/pokemon"
          class="flex items-center gap-2 rounded-full bg-poke-yellow px-6 py-2.5 font-semibold text-slate-900 shadow-lg transition hover:brightness-105"
        >
          <Icon icon="mdi:pokeball" class="h-5 w-5" />
          Browse Pokémon
        </RouterLink>
        <RouterLink
          to="/search"
          class="flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-2.5 font-semibold text-white backdrop-blur transition hover:bg-white/20"
        >
          <Icon icon="mdi:magnify" class="h-5 w-5" />
          Search the Archive
        </RouterLink>
      </div>
    </div>
  </section>
</template>
