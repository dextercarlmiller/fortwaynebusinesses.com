import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { DEFAULT_CATEGORIES } from '../lib/defaultCategories'
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

        if (data && data.length > 0) {
          // Merge DB categories with default descriptions/icons for any missing fields
          const merged = data.map(dbCat => {
            const def = DEFAULT_CATEGORIES.find(d => d.slug === dbCat.slug)
            return {
              ...dbCat,
              description: dbCat.description ?? def?.description,
              icon: dbCat.icon || def?.icon || '📋',
            }
          })
          setCategories(merged)
        } else {
          // Fall back to defaults with placeholder IDs when DB is empty
          setCategories(
            DEFAULT_CATEGORIES.map((cat, i) => ({
              ...cat,
              id: `default-${i}`,
              listing_count: 0,
            }))
          )
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load categories')
        // Still show defaults on error
        setCategories(
          DEFAULT_CATEGORIES.map((cat, i) => ({
            ...cat,
            id: `default-${i}`,
            listing_count: 0,
          }))
        )
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [])

  return { categories, loading, error }
}
