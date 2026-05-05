import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Business } from '../lib/types'

interface UseBusinessesOptions {
  category?: string
  featured?: boolean
  limit?: number
  search?: string
}

export function useBusinesses(options: UseBusinessesOptions = {}) {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      setError(null)
      try {
        let query = supabase.from('businesses').select('*')

        if (options.category) {
          query = query.eq('category', options.category)
        }
        if (options.featured) {
          query = query.eq('is_featured', true)
        }
        if (options.search) {
          query = query.or(
            `name.ilike.%${options.search}%,description.ilike.%${options.search}%,category.ilike.%${options.search}%`
          )
        }
        if (options.limit) {
          query = query.limit(options.limit)
        }

        query = query.order('is_featured', { ascending: false }).order('name')

        const { data, error: err } = await query
        if (err) throw err
        setBusinesses(data ?? [])
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load businesses')
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [options.category, options.featured, options.limit, options.search])

  return { businesses, loading, error }
}

export function useBusiness(slug: string) {
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      setError(null)
      try {
        const { data, error: err } = await supabase
          .from('businesses')
          .select('*')
          .eq('slug', slug)
          .single()
        if (err) throw err
        setBusiness(data)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Business not found')
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetch()
  }, [slug])

  return { business, loading, error }
}
