<script setup>
import { computed, ref } from 'vue'
import CategoryHeader from '@/components/common/CategoryHeader.vue'
import CrossLink from '@/components/common/CrossLink.vue'
import { humanize } from '@/composables/useLocalized'

const props = defineProps(['data'])

const rows = computed(() => {
  const list = []
  for (const enc of props.data.pokemon_encounters) {
    for (const vd of enc.version_details) {
      for (const ed of vd.encounter_details) {
        list.push({
          pokemon: enc.pokemon,
          method: ed.method.name,
          levels: ed.min_level === ed.max_level ? `${ed.min_level}` : `${ed.min_level}–${ed.max_level}`,
          chance: ed.chance,
          version: vd.version.name,
        })
      }
    }
  }
  return list
})

const versions = computed(() => Array.from(new Set(rows.value.map((r) => r.version))))
const selectedVersion = ref('')
const activeVersion = computed(() => selectedVersion.value || versions.value[0] || '')
const filteredRows = computed(() => rows.value.filter((r) => r.version === activeVersion.value))
</script>

<template>
  <div>
    <CategoryHeader icon="mdi:map-marker-radius" color="type-ground" :title="humanize(data.name)" :description="`Part of ${humanize(data.location.name)}`" />

    <select
      v-if="versions.length"
      v-model="selectedVersion"
      class="mb-3 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm capitalize text-slate-700 dark:border-slate-700 dark:bg-surface-dark-raised dark:text-slate-200"
    >
      <option v-for="v in versions" :key="v" :value="v">{{ humanize(v) }}</option>
    </select>

    <div v-if="filteredRows.length" class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
      <table class="w-full min-w-[520px] text-left text-sm">
        <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-400 dark:bg-slate-800/60">
          <tr>
            <th class="px-4 py-2 font-semibold">Pokémon</th>
            <th class="px-4 py-2 font-semibold">Method</th>
            <th class="px-4 py-2 font-semibold">Level</th>
            <th class="px-4 py-2 font-semibold">Chance</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in filteredRows" :key="i" class="border-t border-slate-100 dark:border-slate-800">
            <td class="px-4 py-2"><CrossLink :resource="row.pokemon" /></td>
            <td class="px-4 py-2 capitalize text-slate-600 dark:text-slate-300">{{ humanize(row.method) }}</td>
            <td class="px-4 py-2 text-slate-600 dark:text-slate-300">{{ row.levels }}</td>
            <td class="px-4 py-2 text-slate-600 dark:text-slate-300">{{ row.chance }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="rounded-2xl border border-dashed border-slate-200 px-6 py-10 text-center text-sm text-slate-400 dark:border-slate-700">
      No wild Pokémon encounters recorded for this area.
    </p>
  </div>
</template>
