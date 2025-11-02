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
  
  // Additional properties for cart functionality
  ingredients?: string[]
  cooking_tips?: string[]
  nutrition_facts?: {
    calories: string
    protein: string
    carbs: string
    fat: string
  }
  rating?: number
  reviews_count?: number
  tags?: string[]
  in_stock?: boolean
  featured?: boolean
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
