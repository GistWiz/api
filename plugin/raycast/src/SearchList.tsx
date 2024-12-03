import { GistAutocompleteItem } from './quicksearch.types'
import { List } from '@raycast/api'
import { SearchListItem } from './SearchListItem'

export const SearchList = ({ query, setQuery, data, isLoading }: { query: string, setQuery: (query: string) => void, data: GistAutocompleteItem[] | undefined, isLoading: boolean}) => {
  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setQuery}
      searchBarPlaceholder="Gist QuickSearch"
      throttle
    >
      <List.Section title='Number of Gists' subtitle={data?.length + ""}>
        {data?.map((gist) => (
          <SearchListItem key={gist.id} gist={gist} />
        ))}
      </List.Section>
    </List>
  )
}
