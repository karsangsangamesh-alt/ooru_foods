-- ============================================================================
-- COMPREHENSIVE SAMPLE DATA FOR COMPLETE PROJECT
-- ============================================================================
-- This file contains rich sample data for all tables
-- Run this AFTER the main schema is created
-- ============================================================================

-- ============================================================================
-- PRODUCT TAGS
-- ============================================================================

INSERT INTO product_tags (name, slug, description, color) VALUES
('Spicy', 'spicy', 'Products with a kick of heat', '#DC2626'),
('Mild', 'mild', 'Gentle on the palate', '#16A34A'),
('Medium', 'medium', 'Balanced spice level', '#CA8A04'),
('Vegan', 'vegan', '100% plant-based products', '#16A34A'),
('Gluten-Free', 'gluten-free', 'No gluten ingredients', '#0EA5E9'),
('Best Seller', 'best-seller', 'Customer favorites', '#F59E0B'),
('New Arrival', 'new-arrival', 'Newly added products', '#8B5CF6'),
('Limited Edition', 'limited-edition', 'Special seasonal items', '#EC4899'),
('Organic', 'organic', 'Made with organic ingredients', '#059669'),
('Family Pack', 'family-pack', 'Larger quantity options', '#DC2626'),
('Traditional', 'traditional', 'Authentic traditional recipes', '#A16207'),
('Heritage', 'heritage', 'Passed down through generations', '#7C2D12'),
('Authentic', 'authentic', 'Authentic regional specialties', '#A21CAF');

-- ============================================================================
-- PRODUCT CATEGORIES
-- ============================================================================

INSERT INTO product_categories (name, slug, description, sort_order) VALUES
('Traditional Chutneys', 'traditional-chutneys', 'Authentic South Indian chutneys made with traditional recipes', 1),
('Spicy Blends', 'spicy-blends', 'Bold and fiery chutneys for the adventurous palate', 2),
('Heritage Collections', 'heritage-collections', 'Rare and traditional recipes preserved through generations', 3),
('Family Favorites', 'family-favorites', 'Popular chutneys loved by families across India', 4),
('Regional Specialties', 'regional-specialties', 'Authentic regional chutneys from different parts of India', 5);

-- ============================================================================
-- ENHANCED PRODUCTS (Story-First Products)
-- ============================================================================

-- Product 1: Traditional Coconut Chutney
INSERT INTO enhanced_products (
  name, slug, description, long_description, story, heritage_story, 
  cultural_origin, family_recipe, tradition_story, base_price, sale_price, 
  original_price, category, spice_level, is_vegetarian, is_vegan, is_gluten_free,
  region, preparation_time, shelf_life, pairing_suggestions, preparation_tips, 
  serving_ideas, health_benefits, spice_explained, ingredients, nutritional_info,
  image_url, thumbnail_url, featured, bestseller, rating, reviews_count, tags
) VALUES 
(
  'Traditional Coconut Chutney', 'traditional-coconut-chutney',
  'Fresh coconut chutney with green chilies and curry leaves - perfect companion for idli and dosa',
  'Our grandmother''s secret recipe passed down through four generations. In the coastal villages of Kerala, coconut trees sway as they have for centuries, and this chutney captures the essence of those peaceful mornings.',
  'In the coastal villages of Kerala, where coconut trees have been swaying for centuries, this traditional chutney was born from the wisdom of generations. My great-grandmother would wake up at dawn to grind fresh coconut, believing that the morning mist infused the coconut with special magic. The sound of the stone grinder echoing through the village was the soundtrack to many childhood mornings.',
  'Our grandmother''s secret recipe passed down through four generations. In the coastal villages of Kerala, coconut trees sway as they have for centuries, and this chutney captures the essence of those peaceful mornings. Made with freshly grated coconut, this recipe has been refined by my great-grandmother who believed that the best flavors come from patience and love. Every bite takes you back to those traditional breakfast tables where families gather to share stories and start their day together.',
  'Kerala, South India',
  'This recipe comes from my grandmother who learned it from her mother. The key is to use fresh coconut and roast the lentils to perfection. She would say, "The coconut should be ground with love, not haste."',
  'A staple in South Indian households for centuries, this chutney is often the first thing children learn to make. It represents the wisdom of using simple, natural ingredients to create extraordinary flavors. In Kerala, every family has their own variation, but the essence remains the same - fresh, pure, and comforting.',
  120.00, 110.00, 150.00,
  'Traditional Chutneys', 'Medium', true, true, true,
  'South India', '15 minutes', '5 days',
  ARRAY['Dosa', 'Idli', 'Vada', 'Pongal', 'Appam'],
  'Grind coconut while fresh for best flavor. Roast the lentils until golden brown for depth.',
  'Serve with hot idlis or dosas. Garnish with fresh coriander and a teaspoon of ghee for extra flavor.',
  'Rich in healthy fats, fiber, and essential minerals. Coconut provides quick energy and supports metabolism. The spices aid digestion and add anti-inflammatory properties.',
  'Mild spice level with a hint of heat from green chilies and black pepper. The coconut balances the heat perfectly, making it family-friendly.',
  ARRAY['Fresh coconut', 'Green chilies', 'Curry leaves', 'Ginger', 'Salt', 'Cumin seeds', 'Mustard seeds', 'Yogurt'],
  '{"calories": "89", "protein": "2.1g", "carbs": "4.2g", "fat": "7.8g", "fiber": "2.3g", "sodium": "245mg"}',
  '/assets/coconut-chutney.png', '/assets/coconut-chutney-thumb.png',
  true, true, 4.8, 156,
  ARRAY['traditional', 'mild', 'vegetarian', 'vegan', 'gluten-free', 'south-indian', 'family-pack', 'best-seller']
);

-- Product 2: Fiery Gunpowder Chutney
INSERT INTO enhanced_products (
  name, slug, description, long_description, story, heritage_story,
  cultural_origin, family_recipe, tradition_story, base_price, sale_price,
  original_price, category, spice_level, is_vegetarian, is_vegan, is_gluten_free,
  region, preparation_time, shelf_life, pairing_suggestions, preparation_tips,
  serving_ideas, health_benefits, spice_explained, ingredients, nutritional_info,
  image_url, thumbnail_url, featured, bestseller, rating, reviews_count, tags
) VALUES 
(
  'Fiery Gunpowder Chutney', 'fiery-gunpowder-chutney',
  'Bold garlic chutney for the adventurous palate - a tribute to bold flavors',
  'In the spice markets of Gujarat, where vendors take pride in their most potent creations, this fiery chutney was born. My grandfather, a spice trader, challenged our family to create something that would wake up every taste bud.',
  'In the spice markets of Gujarat, where vendors take pride in their most potent creations, this fiery chutney was born. The markets were filled with the most amazing array of spices, and my grandfather, a spice trader, challenged our family to create something that would wake up every taste bud. This chutney is the result of that challenge - bold, unapologetic, and unforgettable.',
  'My grandfather was a spice trader who traveled across India. He said, "A chutney should tell a story of courage and the pursuit of extraordinary flavors." This recipe was his pride - a testament to his belief that food should be an adventure, not just sustenance.',
  'Gujarat, Western India',
  'My grandfather''s secret blend of spices, with roasted garlic and the hottest chilies he could find. He would toast them until they were dark brown, then grind them to a fine powder. The key is in the roasting - get it wrong, and you lose the magic.',
  'Originally created as a long-lasting condiment that could be carried on long journeys by warriors and travelers. In ancient times, it was considered a warrior''s food - providing energy and courage for battle. The intense heat was believed to ignite the warrior spirit.',
  145.00, 135.00, 180.00,
  'Spicy Blends', 'Hot', true, true, true,
  'Gujarat', '20 minutes', '3 months',
  ARRAY['Rice', 'Dosa', 'Idli', 'Curd Rice', 'Paratha'],
  'Roast spices on low heat until dark brown. Store in airtight container for maximum shelf life.',
  'Sprinkle over rice or mix with curd. Start with small quantities and build up your tolerance.',
  'Rich in protein from garlic and metabolism-boosting spices. Great for circulation and digestion. The heat helps clear sinuses.',
  'High spice level with a smoky flavor from roasted spices and garlic. The heat builds gradually and leaves a warm afterglow.',
  ARRAY['Garlic', 'Dried red chilies', 'Cumin seeds', 'Coriander seeds', 'Fenugreek seeds', 'Salt', 'Oil'],
  '{"calories": "156", "protein": "3.8g", "carbs": "8.2g", "fat": "12.5g", "fiber": "2.1g", "vitaminC": "45mg"}',
  '/assets/garlic-chutney.png', '/assets/garlic-chutney-thumb.png',
  true, false, 4.9, 203,
  ARRAY['spicy', 'bold', 'garlic', 'traditional', 'vegan', 'gluten-free', 'adventurous', 'best-seller']
);

-- Product 3: Mint Magic Chutney
INSERT INTO enhanced_products (
  name, slug, description, long_description, story, heritage_story,
  cultural_origin, family_recipe, tradition_story, base_price, sale_price,
  original_price, category, spice_level, is_vegetarian, is_vegan, is_gluten_free,
  region, preparation_time, shelf_life, pairing_suggestions, preparation_tips,
  serving_ideas, health_benefits, spice_explained, ingredients, nutritional_info,
  image_url, thumbnail_url, featured, bestseller, rating, reviews_count, tags
) VALUES 
(
  'Mint Magic Chutney', 'mint-magic-chutney',
  'Refreshing mint chutney with yogurt and cilantro - the perfect cooling accompaniment',
  'In the scorching summers of Rajasthan, where the heat can be relentless, my aunt discovered the magic of combining mint''s cooling properties with yogurt. This chutney was born from necessity.',
  'In the scorching summers of Rajasthan, where the heat can be relentless, my aunt discovered the magic of combining mint''s cooling properties with yogurt. The story goes that she would pick fresh mint from her garden at dawn when the leaves were most tender, and create this delightful blend that instantly transports you to those desert gardens.',
  'My aunt would say, "Mint is nature''s air conditioner." In the blazing Rajasthani summers, this chutney was more than food - it was survival. She would prepare huge batches, and the entire neighborhood would come for relief. It''s not just a condiment - it''s a breath of fresh air in a desert of flavors.',
  'Rajasthan, North India',
  'My aunt''s cooling recipe using the freshest mint leaves and thick yogurt. She would add just a pinch of black salt for that unique flavor that cuts through the heat. The secret is in the timing - harvest the mint when the dew is still on the leaves.',
  'In Rajasthan, mint chutney is more than a side dish - it''s a way of life during the unforgiving summers. Nomadic communities would carry mint chutney as their cooling secret, passed down through generations of desert travelers who understood that flavor could be both sustenance and salvation.',
  135.00, 125.00, 165.00,
  'Traditional Chutneys', 'Medium', true, false, true,
  'Rajasthan', '10 minutes', '3 days',
  ARRAY['Samosa', 'Kebab', 'Paratha', 'Pulao', 'Indian Bread'],
  'Use mint leaves when they are fresh and crisp. Add yogurt slowly for perfect consistency.',
  'Serve chilled with snacks or main courses. Perfect for summer BBQs and grilled foods.',
  'Rich in antioxidants and cooling properties. Mint aids digestion and provides natural cooling. Yogurt adds probiotics for gut health.',
  'Medium spice level with cooling mint and yogurt balance. The combination creates a paradoxical experience - refreshing yet flavorful.',
  ARRAY['Fresh mint leaves', 'Cilantro', 'Yogurt', 'Green chilies', 'Lemon juice', 'Cumin', 'Black salt'],
  '{"calories": "45", "protein": "3.2g", "carbs": "5.8g", "fat": "1.1g", "fiber": "1.5g", "calcium": "120mg"}',
  '/assets/mint-chutney.png', '/assets/mint-chutney-thumb.png',
  true, true, 4.7, 124,
  ARRAY['refreshing', 'cooling', 'mint', 'yogurt', 'vegetarian', 'gluten-free', 'summer', 'best-seller']
);

-- Product 4: Tomato Symphony Chutney
INSERT INTO enhanced_products (
  name, slug, description, long_description, story, heritage_story,
  cultural_origin, family_recipe, tradition_story, base_price, sale_price,
  original_price, category, spice_level, is_vegetarian, is_vegan, is_gluten_free,
  region, preparation_time, shelf_life, pairing_suggestions, preparation_tips,
  serving_ideas, health_benefits, spice_explained, ingredients, nutritional_info,
  image_url, thumbnail_url, featured, bestseller, rating, reviews_count, tags
) VALUES 
(
  'Tomato Symphony Chutney', 'tomato-symphony-chutney',
  'Tangy tomato chutney with aromatic spices - a burst of summer flavors in every bite',
  'During the monsoon seasons in Tamil Nadu, when tomatoes were abundant in our backyard garden, my mother would spend hours creating this masterpiece. This chutney tells the story of those rainy afternoons.',
  'During the monsoon seasons in Tamil Nadu, when tomatoes were abundant in our backyard garden, my mother would spend hours creating this masterpiece. The story goes that she would slow-roast the tomatoes until they developed a deep, rich flavor. The aroma would fill our home and attract neighbors who would come to share stories while she cooked.',
  'My mother always said, "Tomatoes are the heart of South Indian cooking." During the monsoons, when the garden overflowed with tomatoes, she would create this chutney that captured the essence of those rainy afternoons. It''s not just a condiment - it''s a memory of simpler times when cooking was an act of love.',
  'Tamil Nadu, South India',
  'My mother''s slow-roasting technique that brings out the sweetness of tomatoes. She would add jaggery to balance the tanginess, and roast everything until it turned a deep amber color. The secret is patience - never rush a good tomato chutney.',
  'A versatile chutney that varies by household, with each family adding their unique touch to this classic recipe. In Tamil Nadu, it''s considered a comfort food that reminds people of home, especially during the monsoon season when families gather indoors.',
  95.00, 85.00, 120.00,
  'Traditional Chutneys', 'Medium', true, true, true,
  'Tamil Nadu', '25 minutes', '1 week',
  ARRAY['Idli', 'Dosa', 'Pongal', 'Rice', 'Chapati'],
  'Roast tomatoes until soft and sweet. Add tamarind for tangy balance and jaggery for sweetness.',
  'Serve at room temperature with hot idlis or spread on toast for a quick snack.',
  'Rich in lycopene and vitamin C. Aids digestion and boosts immunity. The combination of spices provides anti-inflammatory benefits.',
  'Medium spice level with a perfect balance of sweet and tangy flavors. The slow roasting creates complex, caramelized notes.',
  ARRAY['Fresh tomatoes', 'Red chilies', 'Tamarind', 'Jaggery', 'Curry leaves', 'Mustard seeds', 'Fenugreek seeds'],
  '{"calories": "67", "protein": "1.8g", "carbs": "12.1g", "fat": "1.5g", "fiber": "3.2g", "vitaminC": "28mg"}',
  '/assets/tomato-chutney.png', '/assets/tomato-chutney-thumb.png',
  false, true, 4.6, 89,
  ARRAY['tangy', 'comfort', 'tomato', 'vegetarian', 'vegan', 'gluten-free', 'rice', 'south-indian']
);

-- Product 5: Royal Coriander Chutney
INSERT INTO enhanced_products (
  name, slug, description, long_description, story, heritage_story,
  cultural_origin, family_recipe, tradition_story, base_price, sale_price,
  original_price, category, spice_level, is_vegetarian, is_vegan, is_gluten_free,
  region, preparation_time, shelf_life, pairing_suggestions, preparation_tips,
  serving_ideas, health_benefits, spice_explained, ingredients, nutritional_info,
  image_url, thumbnail_url, featured, bestseller, rating, reviews_count, tags
) VALUES 
(
  'Royal Coriander Chutney', 'royal-coriander-chutney',
  'Elegant coriander chutney with hints of coconut and mint - fit for royalty',
  'This elegant chutney was created for the royal courts of Mysore, where spice mastery was considered an art form. The recipe was a closely guarded secret, passed down through generations of court chefs.',
  'This elegant chutney was created for the royal courts of Mysore, where spice mastery was considered an art form. The palace chefs would prepare this chutney for the royal family using only the finest ingredients. The recipe was a closely guarded secret, with each chef adding their own subtle touches while maintaining the core essence.',
  'The royal recipe represents the pinnacle of South Indian chutney-making. It combines the earthiness of coriander with the luxury of coconut and the freshness of mint. Each ingredient was carefully selected for its quality and flavor profile. This is chutney as haute cuisine - where every bite is a celebration of sophistication.',
  'Mysore, Karnataka',
  'The royal court''s secret recipe using the youngest coriander leaves and finest coconut. The chefs would grind it with rose water for a subtle floral note, and add a pinch of cardamom for luxury. The presentation was as important as the taste.',
  'This chutney represents the refinement of South Indian cuisine at its finest. In royal courts, the quality of chutney was a matter of honor for the chef. This recipe embodies the philosophy that food should be both nourishing and elevating - a true royal experience.',
  165.00, 155.00, 200.00,
  'Heritage Collections', 'Mild', true, true, true,
  'Karnataka', '18 minutes', '4 days',
  ARRAY['Dosa', 'Idli', 'Royal Rice Dishes', 'South Indian Meals', 'Traditional Sweets'],
  'Use the youngest coriander leaves for best flavor. Add rose water sparingly for elegance.',
  'Serve with special occasions and royal-themed meals. Perfect for entertaining guests.',
  'Rich in vitamins A, C, and K. Coriander aids in detoxification and provides antioxidant benefits.',
  'Mild spice level with sophisticated flavor profile. The combination creates a refined, elegant taste.',
  ARRAY['Fresh coriander', 'Coconut', 'Mint leaves', 'Green chilies', 'Rose water', 'Cardamom', 'Cashews'],
  '{"calories": "78", "protein": "2.8g", "carbs": "6.5g", "fat": "5.2g", "fiber": "3.8g", "vitaminA": "450mcg"}',
  '/assets/coriander-chutney.png', '/assets/coriander-chutney-thumb.png',
  true, false, 4.9, 67,
  ARRAY['elegant', 'coriander', 'mint', 'coconut', 'vegetarian', 'vegan', 'gluten-free', 'heritage', 'organic']
);

-- ============================================================================
-- PRODUCT IMAGES
-- ============================================================================

-- Insert product images for all products
INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
-- Coconut Chutney Images
(1, '/assets/coconut-chutney-1.jpg', 'Traditional Coconut Chutney - Main Image', 1, true),
(1, '/assets/coconut-chutney-2.jpg', 'Coconut Chutney with Idli', 2, false),
(1, '/assets/coconut-chutney-3.jpg', 'Coconut Chutney Close-up', 3, false),

-- Gunpowder Chutney Images  
(2, '/assets/garlic-chutney-1.jpg', 'Fiery Gunpowder Chutney - Main Image', 1, true),
(2, '/assets/garlic-chutney-2.jpg', 'Gunpowder Chutney with Rice', 2, false),
(2, '/assets/garlic-chutney-3.jpg', 'Gunpowder Spices Close-up', 3, false),

-- Mint Chutney Images
(3, '/assets/mint-chutney-1.jpg', 'Mint Magic Chutney - Main Image', 1, true),
(3, '/assets/mint-chutney-2.jpg', 'Mint Chutney with Samosa', 2, false),
(3, '/assets/mint-chutney-3.jpg', 'Fresh Mint Leaves', 3, false),

-- Tomato Chutney Images
(4, '/assets/tomato-chutney-1.jpg', 'Tomato Symphony Chutney - Main Image', 1, true),
(4, '/assets/tomato-chutney-2.jpg', 'Tomato Chutney with Dosa', 2, false),
(4, '/assets/tomato-chutney-3.jpg', 'Roasted Tomatoes', 3, false),

-- Coriander Chutney Images
(5, '/assets/coriander-chutney-1.jpg', 'Royal Coriander Chutney - Main Image', 1, true),
(5, '/assets/coriander-chutney-2.jpg', 'Coriander Chutney Elegant Presentation', 2, false),
(5, '/assets/coriander-chutney-3.jpg', 'Fresh Coriander Leaves', 3, false);

-- ============================================================================
-- PRODUCT VARIANTS
-- ============================================================================

-- Insert product variants (sizes)
INSERT INTO product_variants (product_id, name, description, sku, price, compare_at_price, weight_grams, stock_quantity, is_default) VALUES
-- Coconut Chutney Variants
(1, 'Small Pack (100g)', 'Perfect for trying our traditional recipe', 'COC-100', 120.00, 150.00, 100, 50, false),
(1, 'Family Pack (250g)', 'Great for families and regular use', 'COC-250', 250.00, 300.00, 250, 75, true),
(1, 'Party Pack (500g)', 'Perfect for gatherings and parties', 'COC-500', 450.00, 550.00, 500, 30, false),

-- Gunpowder Chutney Variants
(2, 'Small Pack (100g)', 'Bold flavors in a compact size', 'GUN-100', 145.00, 180.00, 100, 40, false),
(2, 'Family Pack (250g)', 'Spice up your family meals', 'GUN-250', 320.00, 380.00, 250, 60, true),
(2, 'Party Pack (500g)', 'For the truly adventurous', 'GUN-500', 580.00, 720.00, 500, 25, false),

-- Mint Chutney Variants
(3, 'Small Pack (100g)', 'Cooling freshness in every bite', 'MIN-100', 135.00, 165.00, 100, 45, false),
(3, 'Family Pack (250g)', 'Beat the heat with family', 'MIN-250', 280.00, 330.00, 250, 70, true),
(3, 'Party Pack (500g)', 'Summer party essential', 'MIN-500', 520.00, 620.00, 500, 35, false),

-- Tomato Chutney Variants
(4, 'Small Pack (100g)', 'Comfort flavors to try', 'TOM-100', 95.00, 120.00, 100, 60, false),
(4, 'Family Pack (250g)', 'Monsoon comfort for the family', 'TOM-250', 200.00, 240.00, 250, 80, true),
(4, 'Party Pack (500g)', 'Share the comfort', 'TOM-500', 360.00, 450.00, 500, 40, false),

-- Coriander Chutney Variants
(5, 'Small Pack (100g)', 'Royal elegance to experience', 'COR-100', 165.00, 200.00, 100, 30, false),
(5, 'Family Pack (250g)', 'Elegant dining at home', 'COR-250', 350.00, 420.00, 250, 50, true),
(5, 'Party Pack (500g)', 'Royal gatherings', 'COR-500', 650.00, 780.00, 500, 20, false);

-- ============================================================================
-- PRODUCT TAGS MAPPING
-- ============================================================================

INSERT INTO product_tags_mapping (product_id, tag_id) VALUES
-- Coconut Chutney tags
(1, 2), -- mild
(1, 4), -- vegan  
(1, 5), -- gluten-free
(1, 6), -- best-seller
(1, 11), -- traditional
(1, 13), -- authentic

-- Gunpowder Chutney tags
(2, 1), -- spicy
(2, 4), -- vegan
(2, 5), -- gluten-free
(2, 6), -- best-seller
(2, 11), -- traditional

-- Mint Chutney tags
(3, 2), -- mild
(3, 4), -- vegan
(3, 5), -- gluten-free
(3, 6), -- best-seller

-- Tomato Chutney tags
(4, 3), -- medium
(4, 4), -- vegan
(4, 5), -- gluten-free

-- Coriander Chutney tags
(5, 2), -- mild
(5, 4), -- vegan
(5, 5), -- gluten-free
(5, 12), -- heritage
(5, 13), -- authentic

-- ============================================================================
-- STORY-FIRST CONTENT: FOOD PAIRINGS
-- ============================================================================

INSERT INTO food_pairings (product_id, dish_name, cuisine_type, occasion, description, popularity_score) VALUES
-- Coconut Chutney pairings
(1, 'Masala Dosa', 'South Indian', 'Breakfast', 'Classic crispy dosa with potato filling', 5),
(1, 'Steamed Idli', 'South Indian', 'Any time', 'Soft, fluffy rice cakes perfect for soaking up chutney', 5),
(1, 'Medu Vada', 'South Indian', 'Snack', 'Crispy lentil donuts that complement the coconut flavor', 4),
(1, 'Appam', 'Kerala', 'Breakfast', 'Soft rice pancakes with crispy edges', 4),
(1, 'Pongal', 'South Indian', 'Breakfast', 'Comforting rice and lentil dish', 3),

-- Gunpowder Chutney pairings  
(2, 'Steamed Rice', 'Universal', 'Main meal', 'Simple rice enhanced with this bold chutney', 5),
(2, 'Curd Rice', 'South Indian', 'Comfort', 'Cooling yogurt rice balanced with spicy chutney', 4),
(2, 'Rava Dosa', 'South Indian', 'Breakfast', 'Crispy semolina crepe', 4),
(2, 'Paratha', 'North Indian', 'Lunch', 'Flaky flatbread', 3),
(2, 'Khichdi', 'Universal', 'Comfort', 'Simple rice and lentil dish', 3),

-- Mint Chutney pairings
(3, 'Samosa', 'Indian', 'Tea time', 'Crispy pastries filled with spiced potatoes', 5),
(3, 'Seekh Kebab', 'North Indian', 'Dinner', 'Grilled minced meat skewers', 4),
(3, 'Laccha Paratha', 'North Indian', 'Lunch', 'Multi-layered flaky bread', 4),
(3, 'Biryani', 'Indian', 'Special occasions', 'Aromatic rice dish', 3),
(3, 'Kulcha', 'North Indian', 'Lunch', 'Soft leavened bread', 3),

-- Tomato Chutney pairings
(4, 'Rava Idli', 'South Indian', 'Breakfast', 'Semolina steamed cakes', 5),
(4, 'Pongal', 'South Indian', 'Breakfast', 'Savory rice and lentil dish', 4),
(4, 'Dosa', 'South Indian', 'Breakfast', 'Crispy rice crepe', 4),
(4, 'Chapati', 'Indian', 'Any time', 'Whole wheat flatbread', 3),
(4, 'Puri', 'North Indian', 'Special', 'Deep fried bread', 3),

-- Coriander Chutney pairings
(5, 'Mysore Pak', 'Karnataka', 'Dessert', 'Traditional sweet that balances the chutney', 4),
(5, 'Neer Dosa', 'Karnataka', 'Breakfast', 'Thin rice crepes', 4),
(5, 'Bisi Bisi Bele Bath', 'Karnataka', 'Main meal', 'Spicy lentil rice', 3),
(5, 'Maddur Vada', 'Karnataka', 'Snack', 'Crispy fritters', 3),
(5, 'Royal Meals', 'Karnataka', 'Special occasions', 'Traditional royal feast', 5);

-- ============================================================================
-- STORY-FIRST CONTENT: USAGE SCENARIOS
-- ============================================================================

INSERT INTO usage_scenarios (product_id, scenario_title, scenario_description, best_time, season_relevance, mood) VALUES
-- Coconut Chutney scenarios
(1, 'Morning Comfort', 'Start your day with the traditional flavors of Kerala. Perfect with hot idlis for a wholesome breakfast that connects you to generations of tradition.', 'morning', 'All seasons', 'Peaceful'),
(1, 'Weekend Family Breakfast', 'Gather the family around for a leisurely South Indian breakfast. The mild flavors make it perfect for sharing stories and creating memories.', 'morning', 'Weekends', 'Nostalgic'),
(1, 'Quick Weeknight Dinner', 'When you need comfort food fast, this chutney with simple rice or dosa provides warmth and satisfaction after a long day.', 'evening', 'All seasons', 'Comforting'),

-- Gunpowder Chutney scenarios
(2, 'Adventure Meal', 'For those who crave bold flavors and aren't afraid of heat. This chutney is for the adventurous souls who believe food should be exciting.', 'lunch', 'All seasons', 'Adventurous'),
(2, 'Winters Warmth', 'The intense flavors and warmth make this perfect for cold days when you need something to energize and invigorate your senses.', 'lunch', 'Winter', 'Warming'),
(2, 'Celebration Spicing', 'When ordinary flavors won't do, this chutney brings the heat and excitement that special occasions demand.', 'dinner', 'Festivals', 'Celebratory'),

-- Mint Chutney scenarios
(3, 'Summer Relief', 'Beat the heat with this cooling chutney. Perfect for hot days when you need something refreshing that also excites your taste buds.', 'afternoon', 'Summer', 'Refreshing'),
(3, 'BBQ Companion', 'Grilled foods come alive with this chutney. The cooling mint cuts through richness and adds brightness to any barbecue.', 'evening', 'Summer', 'Outdoor'),
(3, 'Tea Time Elegance', 'Transform your evening tea with this sophisticated chutney that pairs beautifully with samosas and other snacks.', 'afternoon', 'All seasons', 'Elegant'),

-- Tomato Chutney scenarios
(4, 'Monsoon Comfort', 'When the rains come and you want something warm and comforting, this chutney brings the sunshine back to your table.', 'evening', 'Monsoon', 'Comforting'),
(4, 'Homestyle Memories', 'Recreate the taste of childhood with this chutney that reminds you of home and mother''s cooking.', 'anytime', 'All seasons', 'Nostalgic'),
(4, 'Budget-Friendly Meal', 'Turn simple rice or bread into something special with this flavorful chutney that makes every meal feel special.', 'lunch', 'All seasons', 'Satisfying'),

-- Coriander Chutney scenarios
(5, 'Royal Dining Experience', 'Transform any meal into a royal experience with this elegant chutney that speaks of sophistication and refinement.', 'dinner', 'Special occasions', 'Elegant'),
(5, 'Chef''s Special', 'Impress your guests with this restaurant-quality chutney that elevates even simple dishes to culinary excellence.', 'evening', 'Entertaining', 'Impressive'),
(5, 'Cultural Appreciation', 'Experience the rich heritage of Karnataka through this carefully crafted chutney that honors traditional techniques.', 'anytime', 'Cultural events', 'Appreciative');

-- ============================================================================
-- STORY-FIRST CONTENT: CULTURAL CONTEXTS
-- ============================================================================

INSERT INTO cultural_contexts (product_id, tradition_name, cultural_significance, region, historical_background, festival_relevance, story_teller, generation) VALUES
-- Coconut Chutney cultural contexts
(1, 'Kerala Temple Prasadam', 'In Kerala temples, coconut chutney is considered sacred prasadam, blessed by the deities and shared with devotees as a blessing.', 'Kerala', 'Temple kitchens have been preparing this chutney for over 500 years, with recipes passed down through generations of temple cooks.', 'Offered during all temple festivals and special occasions', 'Temple Kitchen Master', '15+ generations'),
(1, 'Keralite Breakfast Tradition', 'The morning ritual of idli and coconut chutney is deeply embedded in Kerala culture, representing the start of a day with gratitude.', 'Coastal Kerala', 'This tradition dates back to the ancient Chera kingdom, where coconut was considered the tree of life.', 'Integral part of Onam and other Kerala festivals', 'Traditional Cook', '20+ generations'),
(1, 'Matriarchal Recipe Keeping', 'In Kerala families, the grandmother holds the recipe, teaching it to daughters as a sacred family duty.', 'Kerala', 'Recipes were never written down, only passed through demonstration and practice in the family kitchen.', 'Reunion meals and family gatherings', 'Family Matriarch', '25+ generations'),

-- Gunpowder Chutney cultural contexts
(2, 'Warrior''s Sustenance', 'Originally created as high-energy food for warriors and traders on long journeys across the harsh landscapes of Gujarat.', 'Gujarat', 'The chutney provided both nutrition and protection against spoilage during long travels.', 'Celebrated during traditional festivals honoring warriors', 'Spice Merchant Grandfather', '10+ generations'),
(2, 'Market Vendor Culture', 'Street vendors in Gujarat take pride in their unique chutney blends, each claiming to have the most authentic family recipe.', 'Gujarat spice markets', 'Each vendor''s family has guarded their blend for decades, creating a competitive yet respectful market culture.', 'Integral part of Gujarati street food culture', 'Market Vendor', '8+ generations'),
(2, 'Pride of Heat', 'In Gujarat, the ability to handle spicy food is a matter of pride and social status.', 'Western Gujarat', 'The tradition of competitive eating and spice tolerance has deep cultural roots.', 'Featured in spice-eating competitions', 'Local Spice Master', '12+ generations'),

-- Mint Chutney cultural contexts
(3, 'Desert Cooling Wisdom', 'Rajasthani nomads developed this chutney as a survival tool against the desert heat.', 'Rajasthan', 'Nomadic communities carried mint chutney as a natural air conditioner, using it to cool the body in extreme temperatures.', 'Essential during summer festivals like Teej', 'Desert Nomad Elder', '30+ generations'),
(3, 'Palace Kitchen Refinement', 'Royal kitchens of Rajasthan elevated mint chutney to an art form, using it to refresh royal guests between courses.', 'Rajasthan palaces', 'Royal chefs developed sophisticated variations, adding rose water and exotic spices.', 'Served during royal feasts and special court events', 'Former Palace Chef', '5+ generations'),
(3, 'Ayurvedic Balance', 'In traditional medicine, mint is revered for its cooling properties, making this chutney both delicious and therapeutic.', 'All Rajasthan', 'Based on ancient Ayurvedic principles of balancing body heat with cooling foods.', 'Used in traditional health practices', 'Ayurvedic Practitioner', '15+ generations'),

-- Tomato Chutney cultural contexts
(4, 'Monsoon Comfort Food', 'During Tamil Nadu''s monsoon season, this chutney represents warmth and comfort when people stay indoors.', 'Tamil Nadu', 'Monsoon cooking traditions emphasize warming, comforting foods that cheer the spirits during rainy days.', 'Prepared during monsoon festivals and family gatherings', 'Monsoon Cook', '12+ generations'),
(4, 'Garden-to-Table Tradition', 'In Tamil households, this chutney represents the joy of using fresh tomatoes from backyard gardens.', 'Rural Tamil Nadu', 'Rural families would plant tomatoes specifically for making this chutney during peak harvest seasons.', 'Celebrated during harvest festivals', 'Family Gardener', '8+ generations'),
(4, 'Mother''s Love Recipe', 'Every Tamil mother has her special variation, making this chutney a symbol of maternal love and care.', 'All Tamil Nadu', 'Each family recipe is unique, representing the personal touch and love of each mother.', 'Mother''s Day and family celebrations', 'Tamil Mother', 'Generational'),

-- Coriander Chutney cultural contexts
(5, 'Mysore Royal Kitchen', 'This chutney was created exclusively for the Mysore royal family, representing the height of South Indian culinary refinement.', 'Mysore Palace', 'Royal chefs would prepare this chutney using only the finest ingredients available, often sourcing special spices from distant lands.', 'Served during royal ceremonies and important state functions', 'Former Royal Chef', '3+ generations'),
(5, 'Court Cuisine Art Form', 'In royal courts, the preparation of chutney was considered an art, with chefs competing to create the most elegant presentations.', 'Mysore court', 'The royal court valued culinary artistry as highly as military achievements, with chutney-making being a prestigious skill.', 'Featured in court festivals and cultural celebrations', 'Court Culinary Master', '5+ generations'),
(5, ' Brahminical Refinement', ' Brahmin communities in Karnataka elevated coriander chutney to represent spiritual refinement through food.', 'Karnataka Brahmin culture', ' Brahmin kitchens were considered sacred spaces where only the purest ingredients and most refined techniques were used.', 'Offered during religious ceremonies and Brahmin festivals', 'Traditional Brahmin Cook', '20+ generations');

-- ============================================================================
-- PRODUCT REVIEWS
-- ============================================================================

INSERT INTO product_reviews (product_id, reviewer_name, rating, title, comment, is_verified_purchase, is_approved) VALUES
-- Coconut Chutney Reviews
(1, 'Priya Sharma', 5, 'Authentic Taste of Kerala', 'This takes me straight back to my grandmother''s kitchen in Kerala. The flavors are exactly how I remember them from childhood.', true, true),
(1, 'Rajesh Kumar', 5, 'Perfect with Dosa', 'I make dosas at home and this chutney makes them taste like they''re from a Kerala restaurant. Amazing quality!', true, true),
(1, 'Anita Reddy', 4, 'Good but could be spicier', 'Tastes authentic but I wish it had a bit more heat. Still very good quality.', true, true),
(1, 'Mohan Iyer', 5, 'Brings Back Memories', 'My wife is from Kerala and she says this tastes exactly like her mother''s recipe. We''re very happy with it.', true, true),
(1, 'Sunita Nair', 5, 'Traditional and Fresh', 'You can taste the difference in quality. The coconut is fresh and the spices are perfectly balanced.', true, true),

-- Gunpowder Chutney Reviews
(2, 'Vikram Singh', 5, 'Perfect for Spice Lovers', 'This is exactly what I was looking for - bold, authentic, and it packs a real punch! Not for the faint of heart.', true, true),
(2, 'Deepika Mehta', 4, 'Very Spicy but Good', 'My husband loves spicy food and this is his favorite now. It''s authentic Gujarati flavors.', true, true),
(2, 'Rohit Gupta', 5, 'Like Grandmother Made', 'Taste reminds me of my grandmother''s cooking from Gujarat. She used to make something very similar.', true, true),
(2, 'Kavya Patel', 5, 'Restaurant Quality', 'We serve this at our restaurant and customers love it. Great texture and authentic taste.', true, true),
(2, 'Arjun Sharma', 4, 'Great Flavor', 'Love the bold flavors, though it''s definitely on the spicy side. Perfect for those who like heat.', true, true),

-- Mint Chutney Reviews
(3, 'Neha Gupta', 5, 'Summer Essential', 'Perfect for summer! The mint flavor is fresh and cooling, exactly what you need during hot weather.', true, true),
(3, 'Rahul Jain', 5, 'Refreshing and Delicious', 'This chutney is like a breath of fresh air. Goes perfectly with samosas and kebabs.', true, true),
(3, 'Aarti Sharma', 4, 'Good Quality', 'Taste is good and fresh, though I expected a bit more mint flavor. Still recommend it.', true, true),
(3, 'Karan Singh', 5, 'Perfect Balance', 'Love how the mint and yogurt balance each other. Not too sweet, not too tangy - just perfect.', true, true),
(3, 'Pooja Agarwal', 5, 'Family Favorite', 'Everyone in my family loves this. We have it with almost everything now. Great quality mint.', true, true),

-- Tomato Chutney Reviews
(4, 'Madhuri Devi', 5, 'Tastes Like Home', 'This brings back so many memories of my mother''s cooking during monsoon season. Absolutely authentic.', true, true),
(4, 'Suresh Reddy', 4, 'Good Flavor', 'The tomato flavor is fresh and the balance of sweet and tangy is well done. Good quality.', true, true),
(4, 'Lakshmi Rao', 5, 'Perfect with Idli', 'I make idlis at home and this chutney makes them taste restaurant-quality. My family loves it.', true, true),
(4, 'Venkat Rao', 4, 'Traditional Taste', 'Reminds me of the chutney we used to get from local eateries in Tamil Nadu. Authentic flavors.', true, true),
(4, 'Kavitha Reddy', 5, 'Comfort Food', 'This is pure comfort food for me. The taste is exactly how my grandmother used to make it.', true, true),

-- Coriander Chutney Reviews
(5, 'Sanjay Krishna', 5, 'Royal Quality', 'You can taste the premium quality in this chutney. The coriander flavor is sophisticated and well-balanced.', true, true),
(5, 'Divya Sharma', 5, 'Elegant and Refined', 'Perfect for special occasions. The flavors are subtle yet complex - truly restaurant quality.', true, true),
(5, 'Madhav Iyer', 5, 'Authentic Royal Recipe', 'I''ve had similar chutneys in premium restaurants in Mysore. This matches that quality perfectly.', true, true),
(5, 'Lakshmi Iyer', 4, 'Sophisticated Flavor', 'The rose water adds a beautiful touch. Very elegant and different from regular chutneys.', true, true),
(5, 'Ravi Krishna', 5, 'Special Occasion Chutney', 'We save this for when we have guests over. It''s sophisticated and impressive.', true, true);

-- ============================================================================
-- TESTIMONIALS
-- ============================================================================

INSERT INTO testimonials (customer_name, customer_location, rating, title, comment, product_id, is_featured, is_approved) VALUES
('Dr. Rajesh Kumar', 'Bangalore, Karnataka', 5, 'Restaurant Quality at Home', 'I''ve been searching for authentic chutneys like these for years. Finally found them! The quality is exceptional and the flavors are incredibly authentic. My family now orders regularly.', 1, true, true),

('Meera Sharma', 'Mumbai, Maharashtra', 5, 'Brings Back Kerala Memories', 'Living in Mumbai, I missed the authentic taste of Kerala. These chutneys transport me right back to my grandmother''s kitchen. The coconut chutney is exactly how she made it.', 1, true, true),

('Chef Anand Patel', 'Ahmedabad, Gujarat', 5, 'Professional Kitchen Approval', 'As a chef, I''m very particular about ingredients. These chutneys meet professional standards and I use them in my restaurant. Customers love the authentic flavors.', 2, true, true),

('Priya Krishnan', 'Chennai, Tamil Nadu', 4, 'Perfect for Summer', 'The mint chutney is my summer essential. It''s refreshing and the perfect complement to spicy foods. Great quality and fresh taste.', 3, true, true),

('Sunita Iyer', 'Pune, Maharashtra', 5, 'Traditional Family Recipes', 'These chutneys remind me of the traditional recipes our families used to make. The attention to authenticity and quality is evident in every jar.', 4, false, true),

('Madhav Rao', 'Hyderabad, Telangana', 5, 'Heritage Recipe Preservation', 'It''s wonderful to see these traditional recipes being preserved and made available. The coriander chutney is particularly exceptional - truly royal quality.', 5, true, true);

-- ============================================================================
-- ABOUT PAGE CONTENT
-- ============================================================================

INSERT INTO about_content (section_name, title, content, sort_order) VALUES
('Our Story', 'Preserving Culinary Heritage', 'Ooru Chutney Pudi was born from a simple belief - that authentic Indian flavors deserve to be preserved and shared with the world. Our journey began in the kitchens of grandmothers who spent lifetimes perfecting recipes passed down through generations.

Each chutney in our collection tells a story. From the coconut groves of Kerala where our Traditional Coconut Chutney originates, to the spice markets of Gujarat where our Fiery Gunpowder Chutney was born, every flavor carries the essence of its cultural heritage.

We work directly with traditional recipe keepers - grandmothers, family cooks, and culinary masters who have dedicated their lives to preserving these authentic flavors. Every jar you open is a gateway to a different region, a different story, a different tradition.

Our commitment goes beyond just selling chutneys. We''re guardians of culinary heritage, ensuring that these time-tested recipes continue to thrive in a world where fast food often overshadows authentic flavors.

Join us in this delicious journey of preserving and celebrating the rich tapestry of Indian culinary traditions.', 1),

('Our Philosophy', 'Quality Without Compromise', 'We believe that authentic flavors cannot be rushed or compromised. Every chutney we create follows time-honored traditions, using only the finest ingredients sourced from their regions of origin.

Our philosophy is simple: honor the traditions that created these recipes while ensuring they reach modern tables with the same integrity and flavor that made them beloved for generations.

We work directly with local farmers and spice growers to ensure the freshest, highest-quality ingredients. Each batch is carefully crafted in small quantities to maintain the personal touch that defines authentic family recipes.', 2),

('Our Mission', 'Connecting Cultures Through Flavor', 'Food is a universal language that transcends boundaries. Through our chutneys, we aim to connect people with the rich culinary heritage of India, one authentic flavor at a time.

Our mission is to preserve these traditional recipes while making them accessible to food lovers around the world. We believe that every jar we sell is more than a condiment - it''s a cultural ambassador, carrying stories, traditions, and the love of generations to your table.', 3),

('Our Promise', 'Authenticity in Every Jar', 'When you choose Ooru Chutney Pudi, you''re not just buying a chutney - you''re investing in the preservation of culinary heritage. We promise that every jar contains the authentic flavors crafted by traditional recipe keepers, made with the same care and attention that has defined these recipes for centuries.

Our commitment to quality means every ingredient is carefully selected, every recipe is faithfully reproduced, and every jar carries the love and tradition that makes these chutneys truly special.', 4);

-- ============================================================================
-- FAQ ITEMS
-- ============================================================================

INSERT INTO FAQS (category, question, answer, sort_order) VALUES
('General', 'What makes your chutneys different from store-bought varieties?', 'Our chutneys are crafted using traditional family recipes passed down through generations. We use only the finest, freshest ingredients sourced directly from their regions of origin. Each batch is made in small quantities to ensure the quality and authenticity that defines genuine family recipes.', 1),

('General', 'Are your chutneys authentic?', 'Yes, absolutely! We work directly with traditional recipe keepers - grandmothers, family cooks, and culinary masters who have dedicated their lives to preserving these authentic flavors. Every recipe is faithfully reproduced to maintain its traditional integrity.', 1),

('General', 'How should I store the chutneys?', 'Our chutneys should be refrigerated after opening. Most varieties last 2-4 weeks when properly refrigerated. The Gunpowder Chutney, being a dry powder, has a longer shelf life of 2-3 months when stored in a cool, dry place.', 2),

('General', 'What is the shelf life of your chutneys?', 'Unopened chutneys last 6 months in a cool, dry place. Once opened, they should be refrigerated and consumed within 2-4 weeks for optimal freshness and flavor.', 2),

('Ingredients', 'Are your chutneys vegan?', 'Most of our chutneys are vegan, made with plant-based ingredients. Some varieties like our Mint Magic Chutney contain yogurt and are vegetarian. We clearly label all ingredients for transparency.', 3),

('Ingredients', 'Do your chutneys contain preservatives?', 'We believe in keeping our chutneys as natural as possible. While some varieties may contain natural preservatives like vinegar or citric acid for food safety, we avoid artificial preservatives. Check individual product labels for specific ingredients.', 3),

('Ingredients', 'Are your products gluten-free?', 'Most of our chutneys are naturally gluten-free, but we process some products in facilities that handle gluten. We clearly label all products and provide detailed ingredient lists for those with dietary restrictions.', 3),

('Shipping', 'Do you ship internationally?', 'Currently, we ship within India. We are working on expanding our shipping capabilities to serve our international customers who love authentic Indian flavors. Please check back soon for updates.', 4),

('Shipping', 'How long does delivery take?', 'Standard delivery within India takes 3-7 business days. Express delivery options are available for select cities. We ensure all products are packed carefully to maintain freshness during transit.', 4),

('Orders', 'Can I customize my order?', 'We offer various pack sizes for most of our chutneys. While we cannot customize the recipes themselves (as they are traditional family recipes), you can mix and match different varieties and quantities to create your perfect selection.', 5),

('Orders', 'What if I''m not satisfied with my order?', 'Customer satisfaction is our priority. If you''re not completely satisfied with your purchase, please contact us within 7 days of delivery. We''ll work with you to make it right, whether that means replacement or refund.', 5);

-- ============================================================================
-- HOMEPAGE CONTENT
-- ============================================================================

INSERT INTO homepage_content (section_type, title, subtitle, content, button_text, button_link, sort_order) VALUES
('hero', 'Authentic Indian Chutneys', 'Preserving Generations of Flavor', 'Discover the rich heritage of Indian chutneys, crafted using traditional family recipes passed down through generations. Each jar tells a story of culinary tradition and authentic flavor.', 'Explore Our Collection', '/shop', 1),

('featured_products', 'Our Bestsellers', 'Discover Why Customers Love These Flavors', 'These customer favorites represent the best of our collection - authentic, traditional chutneys that bring the true taste of India to your table.', 'Shop All Products', '/shop', 2),

('story_section', 'Our Story', 'Culinary Heritage Preserved', 'From the coconut groves of Kerala to the spice markets of Gujarat, each chutney carries the essence of its cultural heritage. Learn about our journey of preserving authentic Indian flavors.', 'Learn More', '/about', 3),

('testimonials', 'What Our Customers Say', 'Real Stories, Real Flavors', 'Hear from food lovers who have discovered the authentic taste of traditional Indian chutneys through our collection.', 'Read All Reviews', '/testimonials', 4),

('newsletter', 'Stay Connected', 'Be the First to Know', 'Join our community of flavor enthusiasts. Get updates on new products, recipes, and stories from the world of authentic Indian chutneys.', 'Subscribe Now', '/newsletter', 5);

-- ============================================================================
-- SITE SETTINGS
-- ============================================================================

INSERT INTO site_settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'Ooru Chutney Pudi', 'text', 'Website name'),
('site_tagline', 'Authentic Indian Chutneys - Preserving Generations of Flavor', 'text', 'Main website tagline'),
('contact_email', 'hello@ooruchutneypudi.com', 'email', 'Main contact email'),
('phone_number', '+91 9876543210', 'text', 'Customer service phone'),
('address', 'Mysore Road, Bangalore, Karnataka, India', 'text', 'Business address'),
('social_facebook', 'https://facebook.com/ooruchutneypudi', 'url', 'Facebook page URL'),
('social_instagram', 'https://instagram.com/ooruchutneypudi', 'url', 'Instagram account URL'),
('shipping_threshold_free', '500', 'number', 'Minimum order amount for free shipping'),
('default_currency', 'INR', 'text', 'Default currency for pricing'),
('tax_rate', '18', 'number', 'Default tax rate percentage');

-- ============================================================================
-- CONTACT SUBMISSIONS (Sample Data)
-- ============================================================================

INSERT INTO contact_submissions (name, email, phone, subject, message) VALUES
('Anita Sharma', 'anita.sharma@email.com', '+91 9876543211', 'Bulk Order Inquiry', 'I would like to inquire about bulk ordering your chutneys for my restaurant. We serve traditional South Indian food and are looking for authentic chutney suppliers.'),

('Rajesh Kumar', 'rajesh.kumar@email.com', '+91 9876543212', 'Product Quality Feedback', 'I wanted to share how impressed I am with the quality of your coconut chutney. It reminds me of my grandmother''s recipe from Kerala.'),

('Priya Nair', 'priya.nair@email.com', '+91 9876543213', 'International Shipping', 'I live in the US and would love to order your chutneys. Do you have plans to ship internationally? The flavors here just don''t match what I grew up with in India.'),

('Vikram Singh', 'vikram.singh@email.com', '+91 9876543214', 'Wholesale Partnership', 'I own a chain of Indian restaurants and would be interested in discussing a wholesale partnership for your chutneys. The quality looks exceptional.'),

('Sunita Rao', 'sunita.rao@email.com', '+91 9876543215', 'Recipe Story', 'I loved reading the stories behind each chutney. The Gunpowder Chutney recipe reminds me of my grandfather who was a spice trader in Gujarat. Thank you for preserving these traditions.');
