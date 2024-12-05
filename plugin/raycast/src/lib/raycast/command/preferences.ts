import packageJson from '../../../../package.json'
import { getPreferenceValues } from '@raycast/api'

// cast raw preferences to a statically typed structure using `as const`
const rawPreferences = packageJson.commands[0]?.preferences || []

// dynamically infer the Preferences type
export type Preferences = {
  [P in (typeof rawPreferences)[number] as P['name']]: P['type'] extends 'checkbox'
    ? boolean
    : string
}

// load preferences using Raycast's API with default fallback
export function loadPreferences(): Preferences {
  const preferencesFromRaycast = getPreferenceValues<Partial<Preferences>>() // partial because not all keys may be set
  const preferences = {} as Preferences

  for (const pref of rawPreferences) {
    const userValue = preferencesFromRaycast[pref.name] // user-provided value
    const isEmptyString = userValue === '' // check if it's an empty string
    preferences[pref.name as keyof Preferences] =
      !isEmptyString && userValue !== undefined
        ? userValue // use user-provided value
        : (pref.default as Preferences[keyof Preferences]) // fallback to default
  }

  return preferences
}