import packageJson from '../../../../package.json'

// define preference schema
export type Preference = {
  name: string;
  type: 'textfield' | 'password' | 'checkbox';
  default: string | boolean;
}

// cast and validate preferences (invalid preferences are excluded)
function castPreference(pref: any): Preference | null {
  if (
    typeof pref.name === 'string' &&
    (pref.type === 'textfield' || pref.type === 'password' || pref.type === 'checkbox') &&
    (typeof pref.default === 'string' || typeof pref.default === 'boolean')
  ) {
    return pref as Preference;
  }
  return null;
}

// extract and cast preferences (filtering out invalid preferences)
const rawPreferences = packageJson.commands[0]?.preferences || [];
export const preferencesArray: Preference[] = rawPreferences
  .map(castPreference)
  .filter((pref): pref is Preference => pref !== null);

// define Preferences interface dynamically
export type Preferences = {
  [P in Preference['name']]: Preference['type'] extends 'checkbox' ? boolean : string;
}

// load preferences with defaults
export function loadPreferences(): Preferences {
  const preferences = {} as Preferences;

  for (const pref of preferencesArray) {
    preferences[pref.name as keyof Preferences] =
      pref.default as Preferences[keyof Preferences];
  }

  return preferences;
}

export const defaultPreferences: Preferences = loadPreferences()