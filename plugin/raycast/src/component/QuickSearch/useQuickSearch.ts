import { Clipboard } from '@raycast/api'
import { useFetch } from '@raycast/utils'
import { useEffect, useMemo, useState } from 'react'
import { URLSearchParams } from 'node:url'
import { parseResponse } from './http/response/parser'
import { loadPreferences } from '../../lib/raycast/command/preferences'

export const useSearchList = () => {
  const { host, defaultTerm, autoPasteEnabled, token } = loadPreferences()
  const [term, setTerm] = useState<string>(defaultTerm)

  const createUrl = (host: string, term: string) =>
    `http://${host}/qs?${new URLSearchParams({ term: term.length === 0 ? 'Productivity Dashboard' : term })}`

  const url = useMemo(() => createUrl(host, term), [host, term])

  const { data, isLoading, error } = useFetch(url, {
    parseResponse,
    execute: Boolean(url),
    headers: { Authorization: `Bearer ${token}` },
  })

  useEffect(() => {
    const autopaste = async () => {
      try {
        const clipboardText = await Clipboard.readText()
        clipboardText && setTerm(clipboardText)
      } catch (error) {
        console.error('Failed to read clipboard content:', error)
      }
    }

    autoPasteEnabled && autopaste()
  }, [autoPasteEnabled])

  console.debug({ url, term, data, isLoading, error })

  return {
    term,
    setTerm,
    data,
    isLoading,
    error,
  }
}