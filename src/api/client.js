import { cachedFetchUrl } from './cache'

export const API_BASE = 'https://pokeapi.co/api/v2'

function normalize(path) {
  const trimmed = path.replace(/^\/+|\/+$/g, '')
  return `${API_BASE}/${trimmed}/`
}

/** Fetch a single named/id-keyed resource, e.g. fetchResource('berry', 'cheri') */
export function fetchResource(endpoint, idOrName) {
  return cachedFetchUrl(normalize(`${endpoint}/${idOrName}`))
}

/** Fetch an arbitrary absolute PokeAPI URL (used to follow cross-links embedded in responses). */
export function fetchByUrl(url) {
  return cachedFetchUrl(url)
}

/** Fetch a page of a resource list using PokeAPI's native limit/offset pagination. */
export function fetchResourceList(endpoint, limit = 20, offset = 0) {
  return cachedFetchUrl(`${normalize(endpoint)}?limit=${limit}&offset=${offset}`)
}

/** Fetch the complete {name,url} index for a resource type in one request. */
export function fetchFullIndex(endpoint) {
  return cachedFetchUrl(`${normalize(endpoint)}?limit=100000&offset=0`)
}

/** Extract the numeric id from a PokeAPI resource URL, e.g. .../pokemon/25/ -> 25 */
export function idFromUrl(url) {
  const match = url.match(/\/(\d+)\/?$/)
  return match ? Number(match[1]) : NaN
}

/** Extract the resource-type path segment from a PokeAPI resource URL, e.g. .../pokemon/25/ -> 'pokemon' */
export function resourceTypeFromUrl(url) {
  const parts = url.replace(API_BASE, '').split('/').filter(Boolean)
  return parts[0] ?? ''
}

export function officialArtworkUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export function spriteUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}
