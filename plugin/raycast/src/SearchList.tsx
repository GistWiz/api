import { GistAutocompleteItem } from './quicksearch.types'
import { ActionPanel, Action, List } from '@raycast/api'

export const SearchList = ({ data, isLoading, query, setQuery }: { data: GistAutocompleteItem[] | undefined, isLoading: boolean, query: string, setQuery: (query: string) => void }) => {
  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setQuery}
      searchBarPlaceholder='Gist QuickSearch'
      throttle
    >
      <List.Section title="Results" subtitle={data?.length + ""}>
        {data?.map((gist) => (
          <SearchListItem key={gist.id} gist={gist} />
        ))}
      </List.Section>
    </List>
  )
}

export const SearchListItem = ({ key, gist }: { key: string, gist: GistAutocompleteItem }) => {
  return (
    <List.Item
      key={gist.id}
      title={gist.description}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action.OpenInBrowser title="Open in Browser" url={gist.url} />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  )
}