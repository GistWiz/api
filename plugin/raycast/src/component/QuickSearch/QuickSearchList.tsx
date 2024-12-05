import { List } from '@raycast/api'
import { QuickSearchResults } from './QuickSearchResults'
import { GistQuickSearchItem } from './types'

interface QuickSearchListProps {
  term: string
  setTerm: (term: string) => void
  data: GistQuickSearchItem[] | undefined
  isLoading: boolean
}

export const QuickSearchList = ({
  term,
  setTerm,
  data,
  isLoading,
}: QuickSearchListProps) => {
  return (
    <List
      isLoading={isLoading}
      searchText={term}
      onSearchTextChange={setTerm}
      searchBarPlaceholder="Gist QuickSearch"
      throttle
    >
      <QuickSearchResults data={data} />
    </List>
  )
}