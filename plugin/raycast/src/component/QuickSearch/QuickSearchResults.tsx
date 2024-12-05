import { List } from '@raycast/api'
import { SearchListItem } from './QuickSearchResultsListItem'
import { QuickSearchResultsProps } from './types'

export const QuickSearchResults = ({ data = [] }: QuickSearchResultsProps) => {
  return (
    <List.Section title="results" subtitle={`${data.length}`}>
      {data.map((gist: any) => (
        <SearchListItem key={gist.id} gist={gist} />
      ))}
    </List.Section>
  )
}