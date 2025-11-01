import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our products table
export interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string | null
  category: string
  spice_level?: 'mild' | 'medium' | 'hot' | 'extra_hot'
  is_vegetarian?: boolean
  stock: number
  created_at?: string
}

// Legacy interface for existing test products
export interface TestProduct {
  id: number
  name: string
  description: string
  price: number
  category: string
  spice_level: 'mild' | 'medium' | 'hot' | 'extra_hot'
  is_vegetarian: boolean
  created_at: string
  image_url?: string
}
