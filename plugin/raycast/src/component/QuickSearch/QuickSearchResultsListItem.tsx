import { ActionPanel, Action, List } from '@raycast/api'
import { GistQuickSearchItem } from './types'

export const SearchListItem = ({ gist }: { gist: GistQuickSearchItem }) => {
  return (
    <List.Item
      key={gist.id}
      title={gist.description}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser url={gist.url} title="Open in Default Browser" />
          <Action.CopyToClipboard content={gist.id} title='Copy Gist ID'/>
          <Action.CopyToClipboard content={gist.description} title='Copy Gist Description'/>
          <Action.CopyToClipboard content={gist.url} title='Copy Gist URL'/>
        </ActionPanel>
      }
    />
  )
}