-- ============================================================================
-- CLEAN PROJECT DATABASE SCHEMA
-- ============================================================================
-- Essential e-commerce schema with story-first features
-- Fixed syntax errors and optimized for immediate use
-- ============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- CORE PRODUCT MANAGEMENT
-- ============================================================================

-- Enhanced products table (main product table)
CREATE TABLE IF NOT EXISTS enhanced_products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  story TEXT,
  heritage_story TEXT,
  cultural_origin VARCHAR(100),
  family_recipe TEXT,
  tradition_story TEXT,
  base_price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  original_price DECIMAL(10,2),
  category VARCHAR(100) NOT NULL,
  spice_level VARCHAR(20),
  is_vegetarian BOOLEAN DEFAULT true,
  is_vegan BOOLEAN DEFAULT false,
  is_gluten_free BOOLEAN DEFAULT true,
  region VARCHAR(100),
  preparation_time VARCHAR(50),
  shelf_life VARCHAR(50),
  pairing_suggestions TEXT[],
  preparation_tips TEXT,
  serving_ideas TEXT,
  health_benefits TEXT,
  spice_explained TEXT,
  ingredients TEXT[],
  nutritional_info JSONB,
  image_url TEXT,
  thumbnail_url TEXT,
  gallery_images TEXT[],
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT[],
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  bestseller BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 4.5,
  reviews_count INTEGER DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Product Images
CREATE TABLE IF NOT EXISTS product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES enhanced_products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Reviews
CREATE TABLE IF NOT EXISTS product_reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES enhanced_products(id) ON DELETE CASCADE,
  reviewer_name VARCHAR(255),
  reviewer_email VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  is_verified_purchase BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- STORY-FIRST FEATURES
-- ============================================================================

-- Food Pairings
CREATE TABLE IF NOT EXISTS food_pairings (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES enhanced_products(id) ON DELETE CASCADE,
  dish_name VARCHAR(100) NOT NULL,
  cuisine_type VARCHAR(100),
  occasion VARCHAR(100),
  description TEXT,
  popularity_score INTEGER DEFAULT 5 CHECK (popularity_score >= 1 AND popularity_score <= 5),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Usage Scenarios
CREATE TABLE IF NOT EXISTS usage_scenarios (
  id SERIAL PRIMARY KEY,
