-- ============================================================================
-- COMPREHENSIVE PROJECT DATABASE SCHEMA
-- ============================================================================
-- Complete e-commerce schema with story-first features
-- Compatible with existing code while adding new functionality
-- ============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- CORE PRODUCT MANAGEMENT (Enhanced from existing test_products)
-- ============================================================================

-- Enhanced products table (main product table with story-first features)
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
  
  -- Pricing
  base_price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  original_price DECIMAL(10,2),
  
  -- Product Details
  category VARCHAR(100) NOT NULL,
  spice_level VARCHAR(20) CHECK (spice_level IN ('Mild', 'Medium', 'Hot', 'Extra Hot')),
  is_vegetarian BOOLEAN DEFAULT true,
  is_vegan BOOLEAN DEFAULT false,
  is_gluten_free BOOLEAN DEFAULT true,
  region VARCHAR(100),
  preparation_time VARCHAR(50),
  shelf_life VARCHAR(50),
  
  -- Usage Guide
  pairing_suggestions TEXT[],
  preparation_tips TEXT,
  serving_ideas TEXT,
  cooking_instructions TEXT,
  
  -- Educational Content
  health_benefits TEXT,
  spice_explained TEXT,
  ingredients TEXT[],
  nutritional_info JSONB,
  
  -- Media & SEO
  image_url TEXT,
  thumbnail_url TEXT,
  gallery_images TEXT[],
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT[],
  
  -- E-commerce Features
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  bestseller BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 4.5,
  reviews_count INTEGER DEFAULT 0,
  tags TEXT[],
  
  -- System Fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Product Categories
CREATE TABLE IF NOT EXISTS product_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  parent_id INTEGER REFERENCES product_categories(id),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Variants (sizes, packages, etc.)
CREATE TABLE IF NOT EXISTS product_variants (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES enhanced_products(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  sku VARCHAR(100) UNIQUE,
  price DECIMAL(10,2) NOT NULL,
  compare_at_price DECIMAL(10,2),
  weight_grams INTEGER,
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Images Gallery
CREATE TABLE IF NOT EXISTS product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES enhanced_products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Tags
CREATE TABLE IF NOT EXISTS product_tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(7), -- hex color for UI
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Tags Mapping (many-to-many)
CREATE TABLE IF NOT EXISTS product_tags_mapping (
  product_id INTEGER REFERENCES enhanced_products(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES product_tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (product_id, tag_id)
);

-- Product Reviews
CREATE TABLE IF NOT EXISTS product_reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES enhanced_products(id) ON DELETE CASCADE,
  user_id UUID,
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
-- STORY-FIRST FEATURES (Enhanced storytelling)
-- ============================================================================

-- Food Pairings (traditional combinations)
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

-- Usage Scenarios (when/how to enjoy)
CREATE TABLE IF NOT EXISTS usage_scenarios (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES enhanced_products(id) ON DELETE CASCADE,
  scenario_title VARCHAR(255) NOT NULL,
  scenario_description TEXT,
  best_time VARCHAR(50), -- morning, afternoon, evening, etc.
  season_relevance VARCHAR(100),
  mood VARCHAR(100),
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cultural Contexts (heritage and traditions)
CREATE TABLE IF NOT EXISTS cultural_contexts (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES enhanced_products(id) ON DELETE CASCADE,
  tradition_name VARCHAR(255) NOT NULL,
  cultural_significance TEXT,
  region VARCHAR(100),
  historical_background TEXT,
  festival_relevance VARCHAR(255),
  story_teller VARCHAR(255),
  generation VARCHAR(50), -- how many generations
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- USER MANAGEMENT & AUTHENTICATION
-- ============================================================================

-- User Profiles (standalone, can be linked to auth later)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  avatar_url TEXT,
  date_of_birth DATE,
  gender VARCHAR(20),
  preferences JSONB DEFAULT '{}',
  marketing_consent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Addresses
CREATE TABLE IF NOT EXISTS user_addresses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  type VARCHAR(20) DEFAULT 'home' CHECK (type IN ('home', 'work', 'other')),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  company VARCHAR(100),
  address_line_1 VARCHAR(255) NOT NULL,
  address_line_2 VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100),
  postal_code VARCHAR(20) NOT NULL,
  country VARCHAR(100) NOT NULL DEFAULT 'India',
  phone VARCHAR(20),
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- SHOPPING CART & ORDERS
-- ============================================================================

-- Cart Items
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id),
  session_id VARCHAR(255), -- for guest users
  product_id INTEGER REFERENCES enhanced_products(id),
  variant_id INTEGER REFERENCES product_variants(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  
  -- Pricing
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  
  -- Payment
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method VARCHAR(50),
  payment_reference VARCHAR(255),
  
  -- Shipping
  shipping_address JSONB,
  billing_address JSONB,
  shipping_method VARCHAR(100),
  tracking_number VARCHAR(255),
  
  -- Notes
  customer_notes TEXT,
  admin_notes TEXT,
  
  -- timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES enhanced_products(id),
  variant_id INTEGER REFERENCES product_variants(id),
  product_name VARCHAR(255) NOT NULL,
  product_sku VARCHAR(100),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- CONTENT MANAGEMENT SYSTEM
-- ============================================================================

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_id UUID REFERENCES user_profiles(id),
  author_name VARCHAR(255),
  category VARCHAR(100),
  tags TEXT[],
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- About Page Content
CREATE TABLE IF NOT EXISTS about_content (
  id SERIAL PRIMARY KEY,
  section_name VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255),
  content TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQ Items
CREATE TABLE IF NOT EXISTS faq_items (
  id SERIAL PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_location VARCHAR(255),
  customer_image TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT NOT NULL,
  product_id INTEGER REFERENCES enhanced_products(id),
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Homepage Content Sections
CREATE TABLE IF NOT EXISTS homepage_content (
  id SERIAL PRIMARY KEY,
  section_type VARCHAR(50) NOT NULL, -- hero, featured_products, testimonials, etc.
  title VARCHAR(255),
  subtitle TEXT,
  content TEXT,
  image_url TEXT,
  button_text VARCHAR(100),
  button_link VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- SYSTEM TABLES & UTILITIES
-- ============================================================================

-- Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type VARCHAR(50) DEFAULT 'text',
  description TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Form Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  replied_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Product indexes
CREATE INDEX IF NOT EXISTS idx_enhanced_products_name ON enhanced_products(name);
CREATE INDEX IF NOT EXISTS idx_enhanced_products_slug ON enhanced_products(slug);
CREATE INDEX IF NOT EXISTS idx_enhanced_products_category ON enhanced_products(category);
CREATE INDEX IF NOT EXISTS idx_enhanced_products_featured ON enhanced_products(featured);
CREATE INDEX IF NOT EXISTS idx_enhanced_products_bestseller ON enhanced_products(bestseller);
CREATE INDEX IF NOT EXISTS idx_enhanced_products_in_stock ON enhanced_products(in_stock);
CREATE INDEX IF NOT EXISTS idx_enhanced_products_rating ON enhanced_products(rating);

-- Story indexes
CREATE INDEX IF NOT EXISTS idx_food_pairings_product ON food_pairings(product_id);
CREATE INDEX IF NOT EXISTS idx_usage_scenarios_product ON usage_scenarios(product_id);
CREATE INDEX IF NOT EXISTS idx_cultural_contexts_product ON cultural_contexts(product_id);

-- Order indexes
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);

-- Content indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_faq_items_category ON faq_items(category);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_enhanced_products_updated_at ON enhanced_products;
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
DROP TRIGGER IF EXISTS update_about_content_updated_at ON about_content;
DROP TRIGGER IF EXISTS update_faq_items_updated_at ON faq_items;
DROP TRIGGER IF EXISTS update_homepage_content_updated_at ON homepage_content;
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
DROP TRIGGER IF EXISTS update_cart_items_updated_at ON cart_items;
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;

-- Create triggers for updated_at
CREATE TRIGGER update_enhanced_products_updated_at
  BEFORE UPDATE ON enhanced_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_content_updated_at
  BEFORE UPDATE ON about_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faq_items_updated_at
  BEFORE UPDATE ON faq_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_homepage_content_updated_at
  BEFORE UPDATE ON homepage_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at
  BEFORE UPDATE ON cart_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  order_num TEXT;
  counter INTEGER;
BEGIN
  counter := 1;
  LOOP
    order_num := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(counter::TEXT, 4, '0');
    
    -- Check if order number exists
    IF NOT EXISTS (SELECT 1 FROM orders WHERE order_number = order_num) THEN
      RETURN order_num;
    END IF;
    
    counter := counter + 1;
    
    -- Prevent infinite loop
    IF counter > 9999 THEN
      RAISE EXCEPTION 'Could not generate unique order number';
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Function to update product rating when reviews are added/updated
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
DECLARE
  target_product_id INTEGER;
BEGIN
  -- Determine which product to update
  IF TG_OP = 'DELETE' THEN
    target_product_id := OLD.product_id;
  ELSE
    target_product_id := NEW.product_id;
  END IF;
  
  -- Update the product rating and review count
  UPDATE enhanced_products 
  SET 
    rating = (
      SELECT COALESCE(AVG(rating::DECIMAL), 4.5)
      FROM product_reviews 
      WHERE product_id = target_product_id AND is_approved = true
    ),
    reviews_count = (
      SELECT COUNT(*)
      FROM product_reviews 
      WHERE product_id = target_product_id AND is_approved = true
    )
  WHERE id = target_product_id;
  
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_product_rating_trigger ON product_reviews;

-- Trigger to update product rating when reviews change
CREATE TRIGGER update_product_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON product_reviews
  FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- ============================================================================
-- VIEWS FOR EASIER QUERIES
-- ============================================================================

-- Product listings view (for shop page)
CREATE OR REPLACE VIEW product_listings AS
SELECT 
  ep.id,
  ep.name,
  ep.slug,
  ep.description,
  ep.story,
  ep.base_price,
  ep.sale_price,
  ep.original_price,
  ep.category,
  ep.spice_level,
  ep.is_vegetarian,
  ep.region,
  ep.rating,
  ep.reviews_count,
  ep.featured,
  ep.bestseller,
  ep.in_stock,
  ep.stock_quantity,
  ep.image_url,
  ep.thumbnail_url,
  ep.tags,
  -- Get primary image
  (SELECT image_url FROM product_images WHERE product_id = ep.id AND is_primary = true LIMIT 1) as primary_image,
  -- Get variants
  COALESCE(
    json_agg(
      json_build_object(
        'id', pv.id,
        'name', pv.name,
        'price', pv.price,
        'in_stock', pv.in_stock
      ) ORDER BY pv.sort_order
    ) FILTER (WHERE pv.id IS NOT NULL),
    '[]'::json
  ) as variants,
  -- Get tags
  COALESCE(
    array_agg(DISTINCT pt.name) FILTER (WHERE pt.name IS NOT NULL),
    ARRAY[]::text[]
  ) as tag_list
FROM enhanced_products ep
LEFT JOIN product_variants pv ON ep.id = pv.product_id
LEFT JOIN product_tags_mapping ptm ON ep.id = ptm.product_id
LEFT JOIN product_tags pt ON ptm.tag_id = pt.id
WHERE ep.is_active = true
GROUP BY ep.id;

-- Order details view
CREATE OR REPLACE VIEW order_details AS
SELECT 
  o.id,
  o.order_number,
  o.status,
  o.payment_status,
  o.total_amount,
  o.shipping_amount,
  o.discount_amount,
  o.created_at,
  -- Customer info
  up.full_name,
  up.email,
  -- Order items summary
  COALESCE(
    json_agg(
      json_build_object(
        'id', oi.id,
        'product_name', oi.product_name,
        'quantity', oi.quantity,
        'unit_price', oi.unit_price,
        'total_price', oi.total_price
      )
    ) FILTER (WHERE oi.id IS NOT NULL),
    '[]'::json
  ) as items
FROM orders o
LEFT JOIN user_profiles up ON o.user_id = up.id
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, o.order_number, o.status, o.payment_status, o.total_amount, 
         o.shipping_amount, o.discount_amount, o.created_at, up.full_name, up.email;

-- ============================================================================
-- INITIAL DATA (Optional - can be removed if not needed)
-- ============================================================================

-- Insert default product tags
INSERT INTO product_tags (name, slug, description, color) VALUES
('Spicy', 'spicy', 'Products with a kick of heat', '#FF5733'),
('Mild', 'mild', 'Gentle on the palate', '#81C784'),
('Vegan', 'vegan', '100% plant-based products', '#4CAF50'),
('Gluten-Free', 'gluten-free', 'No gluten ingredients', '#FFC107'),
('Best Seller', 'best-seller', 'Customer favorites', '#2196F3'),
('New Arrival', 'new-arrival', 'Newly added products', '#9C27B0'),
('Limited Edition', 'limited-edition', 'Special seasonal items', '#FF9800'),
('Organic', 'organic', 'Made with organic ingredients', '#8BC34A'),
('Family Pack', 'family-pack', 'Larger quantity options', '#00BCD4'),
('Giftable', 'giftable', 'Perfect for gifting', '#E91E63')
ON CONFLICT (slug) DO NOTHING;

-- Insert default product categories
INSERT INTO product_categories (name, slug, description, sort_order) VALUES
('Chutneys', 'chutneys', 'Traditional Indian chutneys and condiments', 1),
('Pickles', 'pickles', 'Authentic Indian pickles', 2),
('Spice Mixes', 'spice-mixes', 'Aromatic spice blends', 3),
('Sauces', 'sauces', 'Flavorful Indian sauces', 4),
('Snacks', 'snacks', 'Traditional Indian snacks', 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert default FAQ items
INSERT INTO faq_items (category, question, answer, sort_order) VALUES
('Shipping', 'What are your shipping options?', 'We offer standard and express shipping across India. Delivery typically takes 3-5 business days.', 1),
('Products', 'Are your products authentic?', 'Yes, all our products are made using traditional family recipes with authentic ingredients.', 2),
('Returns', 'What is your return policy?', 'We accept returns within 7 days of delivery if the product is unopened and in original condition.', 3),
('Payment', 'What payment methods do you accept?', 'We accept all major credit/debit cards, UPI, net banking, and cash on delivery.', 4)
ON CONFLICT DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('site_name', 'Chutney Store', 'text', 'Name of the website', true),
('site_email', 'contact@chutneystore.com', 'email', 'Contact email address', true),
('site_phone', '+91-1234567890', 'text', 'Contact phone number', true),
('shipping_fee', '50', 'number', 'Default shipping fee', true),
('free_shipping_threshold', '500', 'number', 'Minimum order value for free shipping', true),
('tax_rate', '5', 'number', 'Tax percentage', false)
ON CONFLICT (setting_key) DO NOTHING;