-- Test Products Table for Supabase with Cart/Order Tables
CREATE TABLE IF NOT EXISTS orders_cart (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  product_id INTEGER REFERENCES test_products(id) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Processing', 'Completed', 'Cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) NOT NULL,
  product_id INTEGER REFERENCES test_products(id) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10,2) NOT NULL
);

-- Main products table with enhanced storytelling fields
CREATE TABLE IF NOT EXISTS test_products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  story TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category VARCHAR(100) NOT NULL,
  spice_level VARCHAR(20) CHECK (spice_level IN ('Medium', 'Spicy')) NOT NULL,
  ingredients TEXT[],
  cooking_tips TEXT[],
  nutrition_facts JSONB,
  rating DECIMAL(3,2) DEFAULT 4.5,
  reviews_count INTEGER DEFAULT 0,
  tags TEXT[],
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  is_vegetarian BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  image_url TEXT
);

-- Insert sample chutney products with storytelling
INSERT INTO test_products (name, description, story, price, original_price, category, spice_level, ingredients, cooking_tips, nutrition_facts, rating, reviews_count, tags, in_stock, featured, image_url) VALUES

-- Medium Spiced Products
('Traditional Coconut Chutney', 
 'Fresh coconut chutney with green chilies and curry leaves - perfect companion for idli and dosa', 
 'Our grandmother''s secret recipe passed down through four generations. In the coastal villages of Kerala, coconut trees sway as they have for centuries, and this chutney captures the essence of those peaceful mornings. Made with freshly grated coconut, this recipe has been refined by my great-grandmother who believed that the best flavors come from patience and love. Every bite takes you back to those traditional breakfast tables where families gather to share stories and start their day together.',
 120.00, 150.00, 'Traditional', 'Medium', 
 ARRAY['Fresh coconut', 'Green chilies', 'Curry leaves', 'Ginger', 'Salt', 'Yogurt'], 
 ARRAY['Grind coconut while fresh for best flavor', 'Serve with hot idlis or dosas', 'Add tempering with mustard seeds for extra flavor'], 
 '{"calories": "89", "protein": "2.1g", "carbs": "4.2g", "fat": "7.8g"}',
 4.8, 156, 
 ARRAY['traditional', 'breakfast', 'kerala', 'vegetarian'], 
 true, true, 
 '/app/public/assets/coconut-chutney.png'),

('Classic Tomato Chutney', 
 'Tangy tomato chutney with aromatic spices - a burst of summer flavors in every bite', 
 'During the monsoon seasons in Tamil Nadu, when tomatoes were abundant in our backyard garden, my mother would spend hours creating this masterpiece. This chutney tells the story of those rainy afternoons, where the aroma of roasting spices would fill our home. The secret lies in slowly roasting the tomatoes until they develop a deep, rich flavor. It''s not just a condiment - it''s a memory of simpler times when cooking was an act of love.',
 95.00, 120.00, 'Traditional', 'Medium', 
 ARRAY['Fresh tomatoes', 'Red chilies', 'Tamarind', 'Jaggery', 'Curry leaves', 'Mustard seeds'], 
 ARRAY['Roast tomatoes until soft and sweet', 'Add tamarind for tangy balance', 'Perfect with rice and rasam'], 
 '{"calories": "67", "protein": "1.8g", "carbs": "12.1g", "fat": "1.5g"}',
 4.6, 89, 
 ARRAY['tangy', 'comfort', 'rice', 'south-indian'], 
 true, false, 
 '/app/public/assets/tomato-chutney.png'),

('Mint Magic Chutney', 
 'Refreshing mint chutney with yogurt and cilantro - the perfect cooling accompaniment', 
 'In the scorching summers of Rajasthan, where the heat can be relentless, my aunt discovered the magic of combining mint''s cooling properties with yogurt. This chutney was born from necessity - a way to bring relief and flavor to every meal. The story goes that she would pick fresh mint from her garden at dawn when the leaves were most tender, and create this delightful blend that instantly transports you to those desert gardens. It''s more than a condiment - it''s a breath of fresh air.',
 135.00, 165.00, 'Refreshing', 'Medium', 
 ARRAY['Fresh mint leaves', 'Cilantro', 'Yogurt', 'Green chilies', 'Lemon juice', 'Cumin'], 
 ARRAY['Use mint leaves when they are fresh and crisp', 'Add yogurt slowly for perfect consistency', 'Chill before serving for maximum refreshment'], 
 '{"calories": "45", "protein": "3.2g", "carbs": "5.8g", "fat": "1.1g"}',
 4.7, 124, 
 ARRAY['refreshing', 'cooling', 'summer', 'healthy'], 
 true, true, 
 '/app/public/assets/mint-chutney.png'),

-- Spicy Products
('Fiery Garlic Chutney', 
 'Bold garlic chutney for the adventurous palate - a tribute to bold flavors', 
 'In the spice markets of Gujarat, where vendors take pride in their most potent creations, this fiery chutney was born. My grandfather, a spice trader, challenged our family to create something that would wake up every taste bud. This chutney is the result of that challenge - bold, unapologetic, and unforgettable. It''s for those who believe that food should be an adventure, not just sustenance. Each bite tells a story of courage and the pursuit of extraordinary flavors.',
 145.00, 180.00, 'Bold', 'Spicy', 
 ARRAY['Garlic cloves', 'Red chilies', 'Jaggery', 'Salt', 'Vinegar', 'Oil'], 
 ARRAY['Use fresh garlic for maximum flavor', 'Adjust chili quantity to taste', 'Store in refrigerator for longer shelf life'], 
 '{"calories": "156", "protein": "3.8g", "carbs": "8.2g", "fat": "12.5g"}',
 4.9, 203, 
 ARRAY['spicy', 'bold', 'garlic', 'adventurous'], 
 true, true, 
 '/app/public/assets/garlic-chutney.png'),

('Red Hot Chili Chutney', 
 'The ultimate spicy experience - not for the faint of heart', 
 'Deep in the forests of Andhra Pradesh, where red chilies grow wild and fierce, this chutney was discovered by a local chef who dared to harness their power. This is not just food - it''s a test of will, a celebration of heat, and a tribute to those who live life at full throttle. Legend says that this chutney can cure any sadness and awaken any spirit. Only the brave should venture here, but those who do will never forget the journey.',
 165.00, 200.00, 'Extreme', 'Spicy', 
 ARRAY['Dried red chilies', 'Garlic', 'Salt', 'Oil', 'Tamarind', 'Jaggery'], 
 ARRAY['Handle chilies with care - wear gloves', 'Taste gradually to find your heat level', 'Serve with rice or bread to balance heat'], 
 '{"calories": "178", "protein": "4.2g", "carbs": "6.1g", "fat": "15.8g"}',
 4.4, 67, 
 ARRAY['extremely-spicy', 'chili', 'heat', 'brave'], 
 true, false, 
 '/app/public/assets/red-chili-chutney.png'),

('Pudina Fury Chutney', 
 'Super-spicy mint chutney that will change your definition of heat', 
 'When our head chef decided to create the ultimate spicy mint chutney, he traveled to the highest altitudes where mint grows wild and potent. This creation combines the cooling nature of mint with the heat of the hottest chilies, creating a paradoxical experience that both refreshes and challenges. It''s a chutney that speaks to the soul - cooling the body while igniting the spirit. For those who thought they knew spicy, this will redefine everything.',
 155.00, 190.00, 'Extreme', 'Spicy', 
 ARRAY['Fresh mint', 'Green chilies', 'Garlic', 'Salt', 'Lemon juice', 'Chili powder'], 
 ARRAY['Use the freshest mint leaves available', 'Build heat gradually', 'Perfect with grilled meats and parathas'], 
 '{"calories": "72", "protein": "2.8g", "carbs": "9.1g", "fat": "2.5g"}',
 4.5, 91, 
 ARRAY['mint', 'spicy', 'extreme', 'refreshing'], 
 true, false, 
 '/app/public/assets/pudina-chutney.png');

-- Enable Row Level Security (optional)
ALTER TABLE test_products ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access
CREATE POLICY "Allow public read access" ON test_products FOR SELECT USING (true);
