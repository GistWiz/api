import { Clipboard } from '@raycast/api'
import { useFetch } from '@raycast/utils'
import { useEffect, useMemo, useState } from 'react'
import { URLSearchParams } from 'node:url'
import { parseResponse } from './http/response/parser'
import { loadPreferences } from '../../lib/raycast/command/preferences'

export const useSearchList = () => {
  const { host, defaultTerm, autoPasteEnabled, token } = loadPreferences()
  const [query, setQuery] = useState<string>(defaultTerm)

  const createUrl = (host: string, query: string) =>
    `http://${host}/qs?${new URLSearchParams({ query: query.length === 0 ? 'Productivity Dashboard' : query })}`

  const url = useMemo(() => createUrl(host, query), [host, query])

  const { data, isLoading, error } = useFetch(url, {
    parseResponse,
    execute: Boolean(url),
    headers: { Authorization: `Bearer ${token}` },
  })

  useEffect(() => {
    const autopaste = async () => {
      try {
        const clipboardText = await Clipboard.readText()
        clipboardText && setQuery(clipboardText)
      } catch (error) {
        console.error('Failed to read clipboard content:', error)
      }
    }

    autoPasteEnabled && autopaste()
  }, [autoPasteEnabled])

  console.debug({ url, query, data, isLoading, error })

  return {
    query,
    setQuery,
    data,
    isLoading,
    error,
  }
}