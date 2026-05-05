import { useState, useCallback } from 'react'

export function useSearch(initialQuery = '') {
  const [query, setQuery] = useState(initialQuery)

  const handleChange = useCallback((value: string) => {
    setQuery(value)
  }, [])

  const clear = useCallback(() => setQuery(''), [])

  return { query, handleChange, clear }
}
