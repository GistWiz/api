import { List } from '@raycast/api'
import { QuickSearchResults } from './QuickSearchResults'
import { GistQuickSearchItem } from './types'

interface QuickSearchListProps {
  query: string
  setQuery: (query: string) => void
  data: GistQuickSearchItem[] | undefined
  isLoading: boolean
}

export const QuickSearchList = ({
  query,
  setQuery,
  data,
  isLoading,
}: QuickSearchListProps) => {
  return (
    <List
      isLoading={isLoading}
      searchText={query}
      onSearchTextChange={setQuery}
      searchBarPlaceholder="Gist QuickSearch"
      throttle
    >
      <QuickSearchResults data={data} />
    </List>
  )
}