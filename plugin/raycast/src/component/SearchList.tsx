import { getPreferenceValues, List } from '@raycast/api'

import { parseResponse } from '../lib/response/parser'
import { Preferences } from '../lib/types'
import { SearchListItem } from './SearchListItem'

import { useFetch } from '@raycast/utils'
import { useQuickSearch } from '../lib/quicksearch'
import { useState } from 'react'

export const SearchList = () => {
  const preferences = getPreferenceValues<Preferences>()

  const [ query, setQuery ] = useState<string>('')
  const { quickSearchUrl } = useQuickSearch({ host: preferences.host, query })

  const { data, isLoading } = useFetch(quickSearchUrl, {
    parseResponse,
    execute: Boolean(quickSearchUrl),
    headers: { Authorization: `Bearer ${preferences.token}` }
  })

  console.debug({ preferences, quickSearchUrl, data, isLoading })

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setQuery}
      searchBarPlaceholder='Gist QuickSearch'
      throttle
    >
      <List.Section title='Total Gists' subtitle={`${Number((data || []).length)}`}>
        {(data || []).map((gist) => <SearchListItem key={gist.id} gist={gist} />)}
      </List.Section>
    </List>
  )
}