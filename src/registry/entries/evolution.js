export const evolutionEntries = [
  {
    key: 'evolution-chain',
    endpoint: 'evolution-chain',
    cluster: 'evolution',
    label: 'Evolution Chain',
    pluralLabel: 'Evolution Chains',
    icon: 'mdi:family-tree',
    color: 'type-dragon',
    description: 'The full evolution family tree starting from a base species.',
    primaryIdentifier: 'id',
    listFields: [
      { key: 'id', label: 'Chain #', kind: 'text', showInList: true },
      { key: 'chain.species', label: 'Base Species', kind: 'link', linkResourceType: 'pokemon-species', showInList: true },
    ],
    detailFields: [],
    detailComponent: 'EvolutionChainDetail',
  },
  {
    key: 'evolution-trigger',
    endpoint: 'evolution-trigger',
    cluster: 'evolution',
    label: 'Evolution Trigger',
    pluralLabel: 'Evolution Triggers',
    icon: 'mdi:lightning-bolt',
    color: 'type-dragon',
    description: 'What causes a Pokémon to evolve — leveling up, trading, using an item.',
    listFields: [{ key: 'name', label: 'Name', kind: 'text', showInList: true }],
    detailFields: [
      { key: 'names', label: 'Localized Name', kind: 'localized-name', showInDetail: true },
      { key: 'pokemon_species', label: 'Species Using This Trigger', kind: 'link-list', linkResourceType: 'pokemon-species', showInDetail: true },
    ],
  },
]
