import { URLSearchParams } from 'node:url'
import { useMemo } from 'react'

const generate = (host: string, query: string) => `http://${host}/qs?${new URLSearchParams({ query: query.length === 0 ? '0' : query })}`

export const useQuickSearch = ({ host, query }: { host: string, query: string}) => ({
  quickSearchUrl: useMemo(() => generate(host, query), [host, query])
})