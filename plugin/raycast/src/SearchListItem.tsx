import { GistAutocompleteItem } from './quicksearch.types'
import { ActionPanel, Action, List } from '@raycast/api'

export const SearchListItem = ({ key, gist }: { key: string, gist: GistAutocompleteItem }) => {
  return (
    <List.Item
      key={gist.id}
      title={gist.description}
      accessoryTitle={gist.id}
      actions={
        <ActionPanel>
          <Action.CopyToClipboard content={gist.id} title='Copy Gist ID'/>
          <Action.CopyToClipboard content={gist.description} title='Copy Gist Description'/>
          <Action.CopyToClipboard content={gist.url} title='Copy Gist URL'/>
          <ActionPanel.Section>
            <Action.OpenInBrowser title="Open in Browser" url={gist.url} />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  )
}