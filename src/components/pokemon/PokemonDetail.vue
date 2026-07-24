<script setup>
import { computed, ref } from 'vue'
import { useResourceByUrl } from '@/composables/useResourceByUrl'
import { humanize } from '@/composables/useLocalized'
import { typeColor } from '@/utils/typeColors'
import CrossLink from '@/components/common/CrossLink.vue'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue'
import PokemonHero from './PokemonHero.vue'
import PokemonStatsRadar from './PokemonStatsRadar.vue'
import PokemonTypeEffectiveness from './PokemonTypeEffectiveness.vue'
import PokemonAbilities from './PokemonAbilities.vue'
import PokemonMovesList from './PokemonMovesList.vue'
import PokemonSpeciesInfo from './PokemonSpeciesInfo.vue'
import EvolutionChainDetail from './EvolutionChainDetail.vue'

const props = defineProps(['data'])

const { data: species } = useResourceByUrl(() => props.data.species.url)
const { data: evolutionChain } = useResourceByUrl(() => species.value?.evolution_chain.url)
const { data: encounters, loading: encountersLoading } = useResourceByUrl(
  () => props.data.location_area_encounters,
)

const TABS = ['About', 'Stats', 'Moves', 'Evolution', 'Encounters']
const activeTab = ref('About')

const primaryTypeColor = computed(() => typeColor(props.data.types[0]?.type.name))

const encounterRows = computed(() => {
  if (!encounters.value) return []
  const rows = []
  for (const enc of encounters.value) {
    const methods = new Set()
    const versions = new Set()
    for (const vd of enc.version_details) {
      versions.add(vd.version.name)
      for (const ed of vd.encounter_details) methods.add(ed.method.name)
    }
    rows.push({
      location: enc.location_area.name,
      url: enc.location_area.url,
      method: Array.from(methods).map(humanize).join(', '),
      version: Array.from(versions).map(humanize).join(', '),
    })
  }
  return rows
})
</script>

<template>
  <div>
    <PokemonHero :pokemon="data" />

    <nav class="mt-6 flex gap-1 overflow-x-auto rounded-full bg-slate-100 p-1 dark:bg-slate-800">
      <button
        v-for="tab in TABS"
        :key="tab"
        type="button"
        class="flex-1 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition"
        :class="activeTab === tab ? 'bg-white text-poke-red shadow-sm dark:bg-surface-dark-raised' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </nav>

    <div class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-surface-dark-raised">
      <template v-if="activeTab === 'About'">
        <div v-if="species" class="grid gap-8 sm:grid-cols-2">
          <PokemonSpeciesInfo :species="species" />
          <div>
            <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Abilities</p>
            <PokemonAbilities :abilities="data.abilities" />
          </div>
        </div>
        <LoadingSkeleton v-else variant="line" :rows="4" />
      </template>

      <template v-else-if="activeTab === 'Stats'">
        <div class="grid gap-8 sm:grid-cols-2">
          <PokemonStatsRadar :stats="data.stats" :color="primaryTypeColor" />
          <div>
            <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Type Matchups</p>
            <PokemonTypeEffectiveness :types="data.types" />
          </div>
        </div>
      </template>

      <template v-else-if="activeTab === 'Moves'">
        <PokemonMovesList :moves="data.moves" />
      </template>

      <template v-else-if="activeTab === 'Evolution'">
        <EvolutionChainDetail v-if="evolutionChain" :data="evolutionChain" embedded />
        <LoadingSkeleton v-else variant="line" :rows="3" />
      </template>

      <template v-else-if="activeTab === 'Encounters'">
        <LoadingSkeleton v-if="encountersLoading" variant="line" :rows="4" />
        <div v-else-if="encounterRows.length" class="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
          <table class="w-full min-w-[480px] text-left text-sm">
            <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-400 dark:bg-slate-800/60">
              <tr>
                <th class="px-4 py-2 font-semibold">Location</th>
                <th class="px-4 py-2 font-semibold">Method</th>
                <th class="px-4 py-2 font-semibold">Version</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in encounterRows" :key="row.location" class="border-t border-slate-100 dark:border-slate-800">
                <td class="px-4 py-2"><CrossLink :resource="{ name: row.location, url: row.url }" /></td>
                <td class="px-4 py-2 capitalize text-slate-600 dark:text-slate-300">{{ row.method }}</td>
                <td class="px-4 py-2 capitalize text-slate-600 dark:text-slate-300">{{ row.version }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else class="py-10 text-center text-sm text-slate-400">This Pokémon isn't found in the wild.</p>
      </template>
    </div>
  </div>
</template>
