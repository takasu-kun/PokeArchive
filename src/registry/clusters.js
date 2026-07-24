export const CLUSTERS = [
  {
    key: 'pokemon',
    label: 'Pokémon',
    description: 'Every creature in the National Dex, with stats, types and evolutions.',
    icon: 'mdi:pokeball',
    color: 'poke-red',
  },
  {
    key: 'moves',
    label: 'Moves',
    description: 'Attacks, ailments, damage classes and battle styles.',
    icon: 'mdi:sword-cross',
    color: 'type-fighting',
  },
  {
    key: 'items',
    label: 'Items',
    description: 'Held items, categories, pockets and fling effects.',
    icon: 'mdi:bag-personal',
    color: 'poke-gold',
  },
  {
    key: 'berries',
    label: 'Berries',
    description: 'Every berry, its firmness and flavor profile.',
    icon: 'mdi:fruit-cherries',
    color: 'type-grass',
  },
  {
    key: 'locations',
    label: 'Locations',
    description: 'Regions, locations and the areas within them.',
    icon: 'mdi:map-marker-radius',
    color: 'type-ground',
  },
  {
    key: 'encounters',
    label: 'Encounters',
    description: 'How, where and under what conditions Pokémon appear.',
    icon: 'mdi:magnify-scan',
    color: 'type-bug',
  },
  {
    key: 'evolution',
    label: 'Evolution',
    description: 'Evolution chains and the triggers that drive them.',
    icon: 'mdi:family-tree',
    color: 'type-dragon',
  },
  {
    key: 'games',
    label: 'Games',
    description: 'Generations, versions, version groups and Pokédexes.',
    icon: 'mdi:gamepad-variant',
    color: 'poke-blue',
  },
  {
    key: 'contests',
    label: 'Contests',
    description: 'Contest types, effects and super contest effects.',
    icon: 'mdi:trophy-award',
    color: 'type-fairy',
  },
  {
    key: 'machines',
    label: 'Machines',
    description: 'TMs/HMs and the moves they teach.',
    icon: 'mdi:disc',
    color: 'type-steel',
  },
  {
    key: 'misc',
    label: 'More',
    description: 'Abilities, natures, stats, types, egg groups and more.',
    icon: 'mdi:shape-plus',
    color: 'type-psychic',
  },
]

export function getClusterMeta(key) {
  return CLUSTERS.find((c) => c.key === key)
}
