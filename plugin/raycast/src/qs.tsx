import { ActionPanel, Action, getPreferenceValues, List } from '@raycast/api'
import { useFetch } from '@raycast/utils'
import { useState } from 'react'
import { URLSearchParams } from 'node:url'

interface GistAutocompleteItem {
  id: string;
  description: string;
  url: string;
}

export default function Command() {
  const [searchText, setSearchText] = useState('')
  const { data, isLoading } = useFetch(`http://${getPreferenceValues().host}/qs/${getPreferenceValues().username}?` + new URLSearchParams({ query: searchText.length === 0 ? 'Business Ideas' : searchText }), { parseResponse: parseFetchResponse })

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search gists..."
      throttle
    >
      <List.Section title="Results" subtitle={data?.length + ""}>
        {data?.map((gist) => <SearchListItem key={gist.id} gist={gist} />)}
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

/** Parse the response from the fetch query into something we can display */
async function parseFetchResponse(response: Response) {
  const json = (await response.json()) as { id: string; description: string; url: string; }[] | { code: string; message: string }

  if (!response.ok || "message" in json) {
    throw new Error("message" in json ? json.message : response.statusText)
  }

  return json.map((gist) => {
    return {
      id: gist.id,
      description: gist.description,
      url: gist.url,
    } as GistAutocompleteItem
  })
}
