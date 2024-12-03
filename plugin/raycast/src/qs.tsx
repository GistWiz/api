import { Preferences } from './quicksearch.types'
import { useQuickSearch } from './quicksearch'
import { parseResponse } from './response'
import { useState } from 'react'
import { getPreferenceValues, List } from '@raycast/api'
import { useFetch } from '@raycast/utils'
import { SearchList } from './SearchList'

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

  console.debug({ preferences, quickSearchUrl, data, isLoading })

  return <SearchList query={query} setQuery={setQuery} data={data} isLoading={isLoading} />
}