import { pokemonEntries } from './entries/pokemon'
import { berryEntries } from './entries/berries'
import { contestEntries } from './entries/contests'
import { encounterEntries } from './entries/encounters'
import { evolutionEntries } from './entries/evolution'
import { gameEntries } from './entries/games'
import { itemEntries } from './entries/items'
import { locationEntries } from './entries/locations'
import { machineEntries } from './entries/machines'
import { moveEntries } from './entries/moves'
import { miscEntries } from './entries/misc'

export const ALL_RESOURCES = [
  ...pokemonEntries,
  ...berryEntries,
  ...contestEntries,
  ...encounterEntries,
  ...evolutionEntries,
  ...gameEntries,
  ...itemEntries,
  ...locationEntries,
  ...machineEntries,
  ...moveEntries,
  ...miscEntries,
]

const byKey = new Map(ALL_RESOURCES.map((entry) => [entry.key, entry]))

export function getRegistryEntry(key) {
  if (!key) return undefined
  return byKey.get(key)
}

export function getEntriesForCluster(cluster) {
  return ALL_RESOURCES.filter((entry) => entry.cluster === cluster)
}

export function getSearchableEntries() {
  return ALL_RESOURCES.filter((entry) => entry.searchable)
}

/** Builds the app-internal route path for a resource cross-link, given its type and identifier. */
export function resolveResourceRoute(resourceType, idOrName) {
  if (resourceType === 'pokemon') return `/pokemon/${idOrName}`
  const entry = getRegistryEntry(resourceType)
  const cluster = entry?.cluster ?? 'misc'
  return `/${cluster}/${resourceType}/${idOrName}`
}

export { CLUSTERS, getClusterMeta } from './clusters'
