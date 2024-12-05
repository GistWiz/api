import { useSearchList } from './useQuickSearch'
import { QuickSearchList } from './QuickSearchList'

export const QuickSearch = () => {
  const { term, setTerm, data, isLoading } = useSearchList()

  return (
    <QuickSearchList
      term={term}
      setTerm={setTerm}
      data={data}
      isLoading={isLoading}
    />
  )
}