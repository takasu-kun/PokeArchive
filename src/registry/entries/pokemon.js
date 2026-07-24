import { officialArtworkUrl } from '@/api/client'

export const pokemonEntries = [
  {
    key: 'pokemon',
    endpoint: 'pokemon',
    cluster: 'pokemon',
    label: 'Pokémon',
    pluralLabel: 'Pokémon',
    icon: 'mdi:pokeball',
    color: 'poke-red',
    description: 'Stats, types, abilities, moves and evolutions for every Pokémon.',
    searchable: true,
    listFields: [
      {
        key: 'sprites',
        label: '',
        kind: 'image',
        showInList: true,
        transform: (r) => officialArtworkUrl(r.id),
      },
      { key: 'name', label: 'Name', kind: 'text', showInList: true },
      { key: 'types', label: 'Type', kind: 'badge-list', showInList: true, transform: (r) => r.types.map((t) => t.type) },
    ],
    detailFields: [],
    detailComponent: 'PokemonDetail',
  },
]
