/**
 * Mirrors the --color-type-* custom properties in style.css. Kept as a plain JS map
 * because canvas-rendered contexts (Chart.js) can't resolve CSS var()/color-mix() —
 * those only work inside the DOM's CSS cascade.
 */
export const TYPE_COLORS = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
}

export function typeColor(name) {
  return (name && TYPE_COLORS[name]) || '#EE1515'
}

/** Mirrors the --color-poke-* custom properties in style.css, for the same canvas/dynamic-string reason. */
export const POKE_COLORS = {
  red: '#EE1515',
  'red-dark': '#B71212',
  blue: '#2A75BB',
  'blue-dark': '#3B4CCA',
  yellow: '#FFCB05',
  gold: '#B3A125',
}

/**
 * Resolves a registry/cluster `color` token (e.g. 'type-fire', 'poke-red') to a real hex value.
 * Tailwind v4 only emits CSS variables for theme tokens it sees as literal class names in source,
 * so tokens only ever used dynamically (data-driven `:style` bindings) get tree-shaken away —
 * this resolver sidesteps that by keeping a plain JS lookup instead of relying on var(--color-*).
 */
export function resolveColorToken(token) {
  if (!token) return POKE_COLORS.red
  if (token.startsWith('type-')) return typeColor(token.slice(5))
  if (token.startsWith('poke-')) return POKE_COLORS[token.slice(5)] ?? POKE_COLORS.red
  return POKE_COLORS.red
}
