const STORAGE_PREFIX = 'pokeapi:'

const memory = new Map()
const inFlight = new Map()

let storageDisabled = false

function readStorage(key) {
  if (storageDisabled) return undefined
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key)
    return raw ? JSON.parse(raw) : undefined
  } catch {
    return undefined
  }
}

function writeStorage(key, value) {
  if (storageDisabled) return
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value))
  } catch {
    // Quota exceeded or storage unavailable — fall back to memory-only caching.
    storageDisabled = true
  }
}

/**
 * Fetches a JSON resource with a two-tier cache (in-memory + localStorage) and
 * in-flight request de-duplication. PokeAPI's resources are effectively static,
 * so once fetched a URL never needs to be re-requested.
 */
export async function cachedFetchUrl(url) {
  if (memory.has(url)) return memory.get(url)

  const stored = readStorage(url)
  if (stored !== undefined) {
    memory.set(url, stored)
    return stored
  }

  const existing = inFlight.get(url)
  if (existing) return existing

  const promise = fetch(url)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText} — ${url}`)
      }
      const json = await res.json()
      memory.set(url, json)
      writeStorage(url, json)
      return json
    })
    .finally(() => {
      inFlight.delete(url)
    })

  inFlight.set(url, promise)
  return promise
}

export function clearResourceCache() {
  memory.clear()
  if (storageDisabled) return
  try {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith(STORAGE_PREFIX))
    keys.forEach((k) => localStorage.removeItem(k))
  } catch {
    // ignore
  }
}
