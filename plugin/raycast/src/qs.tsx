import { GistAutocompleteItem, Preferences } from './quicksearch.types'
import { useQuickSearch } from './quicksearch'
import { parseResponse } from './response'
import { useState } from 'react'
import { ActionPanel, Action, getPreferenceValues, List } from '@raycast/api'
import { useFetch } from '@raycast/utils'

export default function Command() {
  const preferences = getPreferenceValues<Preferences>()
  const [ query, setQuery ] = useState("")
  const { quickSearchUrl } = useQuickSearch({ host: preferences.host, query })
  const { data, isLoading } = useFetch(quickSearchUrl, {
    parseResponse,
    execute: Boolean(quickSearchUrl),
    headers: {
      Authorization: `Bearer ${preferences.token}`
    }
  })

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setQuery}
      searchBarPlaceholder="Gist QuickSearch"
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

function SearchListItem({ gist }: { gist: GistAutocompleteItem }) {
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