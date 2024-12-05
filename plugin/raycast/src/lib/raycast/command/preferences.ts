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

// load preferences using Raycast's API
export function loadPreferences(): Preferences {
  return getPreferenceValues<Preferences>()
}