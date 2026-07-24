/** Reads a dot-path ('a.b.c') off an arbitrary object, returning undefined if any segment is missing. */
export function getByPath(obj, path) {
  return path.split('.').reduce((acc, segment) => {
    if (acc === null || acc === undefined) return undefined
    return acc[segment]
  }, obj)
}
