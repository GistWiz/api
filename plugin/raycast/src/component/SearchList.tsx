import { Clipboard, getPreferenceValues, List } from '@raycast/api'

import { parseResponse } from '../lib/response/parser'
import { Preferences } from '../lib/types'
import { SearchListItem } from './SearchListItem'

import { useFetch } from '@raycast/utils'
import { useQuickSearch } from '../lib/quicksearch'
import { useEffect, useState } from 'react'
const pkg = require('../../package.json')

export const SearchList = () => {
  const preferences = getPreferenceValues<Preferences>()

  const [ query, setQuery ] = useState<string>(preferences.defaultTerm)
  const { quickSearchUrl } = useQuickSearch({ host: preferences.host || pkg.commands[0].preferences[1].default, query })

  let { data, isLoading, error } = useFetch(quickSearchUrl, {
    parseResponse,
    execute: Boolean(quickSearchUrl),
    headers: { Authorization: `Bearer ${preferences.token}` }
  })

  console.debug({ preferences, quickSearchUrl, data, error, isLoading })

  useEffect(() => {
    const autopaste = async () => {
      try {
        const clipboardText = await Clipboard.readText()
        if (clipboardText) {
          setQuery(clipboardText); // Set the clipboard content as the initial query
        }
      } catch (error) {
        console.error('Failed to read clipboard content:', error)
      }
    }

    preferences.autopaste && autopaste()
  }, []);

  return (
    <List
      isLoading={isLoading}
      searchText={query}
      onSearchTextChange={setQuery}
      searchBarPlaceholder='Gist QuickSearch'
      throttle
    >
      <List.Section title='results' subtitle={`${Number((data || []).length)}`}>
        {(data || []).map((gist) => <SearchListItem key={gist.id} gist={gist} />)}
      </List.Section>
    </List>
  )
}