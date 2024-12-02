import { ActionPanel, Action, getPreferenceValues, List } from "@raycast/api"
import { useFetch } from "@raycast/utils"
import { useState, useMemo } from "react"
import { URLSearchParams } from "node:url"

interface Preferences {
  host: string;
  token: string;
}

interface GistAutocompleteItem {
  id: string;
  description: string;
  url: string;
}

export default function Command() {
  const preferences = getPreferenceValues<Preferences>()
  const [searchText, setSearchText] = useState("")

  const queryUrl = useMemo(() => {
    return `http://${preferences.host}/qs?` + new URLSearchParams({ query: searchText.length === 0 ? "Business Ideas" : searchText })
  }, [preferences.host])

  const { data, isLoading } = useFetch(queryUrl ?? "", {
    parseResponse: parseFetchResponse,
    execute: !!queryUrl,
    headers: { Authorization: `Bearer ${preferences.token}` },
  });

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
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

/** Parse the response from the fetch query into something we can display */
async function parseFetchResponse(response: Response) {
  const json = (await response.json()) as { id: string; description: string; url: string }[] | { code: string; message: string }

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