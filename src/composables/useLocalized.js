/** Picks the English entry from PokeAPI's repeating [{ language: {name}, ... }] shape. */
export function pickLocalized(entries, languageCode = 'en') {
  if (!entries || entries.length === 0) return undefined
  return entries.find((e) => e.language?.name === languageCode) ?? entries[0]
}

export function localizedName(entries, languageCode = 'en') {
  return pickLocalized(entries, languageCode)?.name ?? ''
}

export function localizedText(entries, languageCode = 'en') {
  const entry = pickLocalized(entries, languageCode)
  if (!entry) return ''
  const raw =
    entry.flavor_text ??
    entry.text ??
    entry.genus ??
    ('effect' in entry ? entry.effect : undefined) ??
    ('description' in entry ? entry.description : undefined) ??
    ''
  return raw.replace(/[\f\n\r\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim()
}

/** Human-friendly label from a kebab-case PokeAPI resource name, e.g. 'move-damage-class' -> 'Move Damage Class'. */
export function humanize(name) {
  if (!name) return ''
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
