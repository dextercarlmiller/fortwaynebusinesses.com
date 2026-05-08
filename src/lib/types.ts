export interface Business {
  id: string
  name: string
  slug: string
  category: string
  subcategory?: string
  description?: string
  address?: string
  city: string
  state: string
  zip?: string
  phone?: string
  email?: string
  website_url?: string | null
  hours?: Record<string, string>
  logo_url?: string
  photos?: string[]
  tags?: string[]
  is_claimed: boolean
  is_featured: boolean
  is_verified: boolean
  tier: 'free' | 'premium' | 'featured'
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description?: string
  display_order: number
  listing_count: number
}

export interface WebStudioLead {
  id: string
  business_id?: string
  business_name?: string
  contact_name?: string
  contact_email: string
  contact_phone?: string
  notes?: string
  status: 'new' | 'contacted' | 'converted' | 'declined'
  created_at: string
}

export interface ClaimRequest {
  id: string
  business_id: string
  claimant_name: string
  claimant_email: string
  claimant_phone?: string
  verification_method?: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}
