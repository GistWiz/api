import { List } from '@raycast/api'
import { useSearchList } from './useSearchList'
import { SearchListItem } from './SearchListItem'

export const SearchList = () => {
  const { query, setQuery, data, isLoading } = useSearchList()

  return (
    <List
      isLoading={isLoading}
      searchText={query}
      onSearchTextChange={setQuery}
      searchBarPlaceholder="Gist QuickSearch"
      throttle
    >
      <List.Section title="results" subtitle={`${Number((data || []).length)}`}>
        {(data || []).map((gist: any) => (
          <SearchListItem key={gist.id} gist={gist} />
        ))}
      </List.Section>
    </List>
  )
}