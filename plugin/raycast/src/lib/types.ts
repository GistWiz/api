export interface Preferences {
  host: string;
  token: string;
  autopaste: boolean;
  defaultTerm: string;
}

export interface GistAutocompleteItem {
  id: string;
  description: string;
  url: string;
}
