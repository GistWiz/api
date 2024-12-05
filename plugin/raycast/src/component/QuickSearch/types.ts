export interface GistQuickSearchItem {
  id: string;
  description: string;
  url: string;
}

export interface QuickSearchResultsProps {
  data: GistQuickSearchItem[] | undefined
}
