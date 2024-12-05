import packageJson from '../../../../package.json'

// Define the structure for preferences
export type Preference = {
  name: string;
  type: 'textfield' | 'password' | 'checkbox';
  default: string | boolean;
};

// Helper function to cast and validate preferences
function castPreference(pref: any): Preference | null {
  if (
    typeof pref.name === 'string' &&
    (pref.type === 'textfield' || pref.type === 'password' || pref.type === 'checkbox') &&
    (typeof pref.default === 'string' || typeof pref.default === 'boolean')
  ) {
    return pref as Preference;
  }
  return null; // Invalid preferences are excluded
}

// Extract and cast preferences
const rawPreferences = packageJson.commands[0]?.preferences || [];
export const preferencesArray: Preference[] = rawPreferences
  .map(castPreference) // Cast each item to Preference
  .filter((pref): pref is Preference => pref !== null); // Filter out invalid ones

// Define the Preferences interface dynamically
export type Preferences = {
  [P in Preference['name']]: Preference['type'] extends 'checkbox' ? boolean : string;
};

// Create a function to load preferences with defaults
export function loadPreferences(): Preferences {
  const preferences = {} as Preferences;

  for (const pref of preferencesArray) {
    preferences[pref.name as keyof Preferences] =
      pref.default as Preferences[keyof Preferences];
  }

  return preferences;
}

// Export the defaults
export const defaultPreferences: Preferences = loadPreferences();
