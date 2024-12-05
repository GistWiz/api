import { useSearchList } from './useQuickSearch'
import { QuickSearchList } from './QuickSearchList'

export const QuickSearch = () => {
  const { query, setQuery, data, isLoading } = useSearchList()

  return (
    <QuickSearchList
      query={query}
      setQuery={setQuery}
      data={data}
      isLoading={isLoading}
    />
  )
}