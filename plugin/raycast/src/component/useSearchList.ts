import { Clipboard, getPreferenceValues } from '@raycast/api'
import { useFetch } from '@raycast/utils'
import { useEffect, useMemo, useState } from 'react'
import { URLSearchParams } from 'node:url'
import { parseResponse } from '../lib/qs/response/parser'
import { Preferences } from '../lib/raycast/command/preferences'
import packageJson from '../../package.json'

export const useSearchList = () => {
  const preferences = getPreferenceValues<Preferences>()
  const host = String(preferences.host || packageJson.commands[0].preferences[1].default)

  const [query, setQuery] = useState<string>(preferences.defaultTerm)

  const createUrl = (host: string, query: string) =>
    `http://${host}/qs?${new URLSearchParams({ query: query.length === 0 ? 'Productivity Dashboard' : query })}`

  const url = useMemo(() => createUrl(host, query), [host, query])

  const { data, isLoading, error } = useFetch(url, {
    parseResponse,
    execute: Boolean(url),
    headers: { Authorization: `Bearer ${preferences.token}` },
  })

  useEffect(() => {
    const autopaste = async () => {
      try {
        const clipboardText = await Clipboard.readText()
        if (clipboardText) {
          setQuery(clipboardText) // Set the clipboard content as the initial query
        }
      } catch (error) {
        console.error('Failed to read clipboard content:', error)
      }
    }

    if (preferences.autopaste) {
      autopaste()
    }
  }, [preferences.autopaste])

  return {
    query,
    setQuery,
    data,
    isLoading,
    error,
  }
}