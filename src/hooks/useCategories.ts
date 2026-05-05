import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Category } from '../lib/types'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      setError(null)
      try {
        const { data, error: err } = await supabase
          .from('categories')
          .select('*')
          .order('display_order')
        if (err) throw err
        setCategories(data ?? [])
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load categories')
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [])

  return { categories, loading, error }
}
