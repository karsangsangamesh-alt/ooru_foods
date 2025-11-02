-- ============================================================================
-- SIMPLE SAMPLE DATA FOR DATABASE - CONFLICT SAFE
-- ============================================================================
-- Clean syntax, essential data only with conflict handling
-- ============================================================================

-- Product Tags (with conflict handling)
INSERT INTO product_tags (name, slug, description, color) VALUES
('Spicy', 'spicy', 'Products with a kick of heat', '#DC2626'),
('Mild', 'mild', 'Gentle on the palate', '#16A34A'),
('Vegan', 'vegan', '100% plant-based products', '#16A34A'),
('Gluten-Free', 'gluten-free', 'No gluten ingredients', '#0EA5E9'),
('Best Seller', 'best-seller', 'Customer favorites', '#F59E0B'),
('Traditional', 'traditional', 'Authentic traditional recipes', '#A16207'),
('Heritage', 'heritage', 'Passed down through generations', '#7C2D12'),
('Authentic', 'authentic', 'Authentic regional specialties', '#A21CAF')
ON CONFLICT (slug) DO NOTHING;

-- Product Categories (with conflict handling)
INSERT INTO product_categories (name, slug, description, sort_order) VALUES
('Traditional Chutneys', 'traditional-chutneys', 'Authentic South Indian chutneys made with traditional recipes', 1),
('Spicy Blends', 'spicy-blends', 'Bold and fiery chutneys for the adventurous palate', 2),
('Heritage Collections', 'heritage-collections', 'Rare and traditional recipes preserved through generations', 3),
('Family Favorites', 'family-favorites', 'Popular chutneys loved by families across India', 4)
ON CONFLICT (slug) DO NOTHING;

-- Enhanced Products (sample products)
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
  'In the coastal villages of Kerala, where coconut trees have been swaying for centuries, this traditional chutney was born from the wisdom of generations. My great-grandmother would wake up at dawn to grind fresh coconut, believing that the morning mist infused the coconut with special magic.',
  'Our grandmother''s secret recipe passed down through four generations. In the coastal villages of Kerala, coconut trees sway as they have for centuries, and this chutney captures the essence of those peaceful mornings. Made with freshly grated coconut, this recipe has been refined by my great-grandmother who believed that the best flavors come from patience and love.',
  'Kerala, South India',
  'This recipe comes from my grandmother who learned it from her mother. The key is to use fresh coconut and roast the lentils to perfection.',
  'A staple in South Indian households for centuries, this chutney is often the first thing children learn to make. It represents the wisdom of using simple, natural ingredients to create extraordinary flavors.',
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
),
(
  'Fiery Gunpowder Chutney', 'fiery-gunpowder-chutney',
  'Bold garlic chutney for the adventurous palate - a tribute to bold flavors',
  'In the spice markets of Gujarat, where vendors take pride in their most potent creations, this fiery chutney was born. My grandfather, a spice trader, challenged our family to create something that would wake up every taste bud.',
  'In the spice markets of Gujarat, where vendors take pride in their most potent creations, this fiery chutney was born. The markets were filled with the most amazing array of spices, and my grandfather, a spice trader, challenged our family to create something that would wake up every taste bud.',
  'My grandfather was a spice trader who traveled across India. He said, "A chutney should tell a story of courage and the pursuit of extraordinary flavors." This recipe was his pride - a testament to his belief that food should be an adventure, not just sustenance.',
  'Gujarat, Western India',
  'My grandfather''s secret blend of spices, with roasted garlic and the hottest chilies he could find. He would toast them until they were dark brown, then grind them to a fine powder.',
  'Originally created as a long-lasting condiment that could be carried on long journeys by warriors and travelers. In ancient times, it was considered a warrior''s food - providing energy and courage for battle.',
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
),
(
  'Mint Magic Chutney', 'mint-magic-chutney',
  'Refreshing mint chutney with yogurt and cilantro - the perfect cooling accompaniment',
  'In the scorching summers of Rajasthan, where the heat can be relentless, my aunt discovered the magic of combining mint''s cooling properties with yogurt. This chutney was born from necessity.',
  'In the scorching summers of Rajasthan, where the heat can be relentless, my aunt discovered the magic of combining mint''s cooling properties with yogurt. The story goes that she would pick fresh mint from her garden at dawn when the leaves were most tender.',
  'My aunt would say, "Mint is nature''s air conditioner." In the blazing Rajasthani summers, this chutney was more than food - it was survival. She would prepare huge batches, and the entire neighborhood would come for relief.',
  'Rajasthan, North India',
  'My aunt''s cooling recipe using the freshest mint leaves and thick yogurt. She would add just a pinch of black salt for that unique flavor that cuts through the heat.',
  'In Rajasthan, mint chutney is more than a side dish - it''s a way of life during the unforgiving summers. Nomadic communities would carry mint chutney as their cooling secret.',
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

-- Product Images
INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
(1, '/assets/coconut-chutney.png', 'Traditional Coconut Chutney', 1, true),
(2, '/assets/garlic-chutney.png', 'Fiery Gunpowder Chutney', 1, true),
(3, '/assets/mint-chutney.png', 'Mint Magic Chutney', 1, true);

-- Product Variants
INSERT INTO product_variants (product_id, name, description, sku, price, compare_at_price, weight_grams, stock_quantity, is_default) VALUES
(1, 'Small Pack (100g)', 'Perfect for trying our traditional recipe', 'COC-100', 120.00, 150.00, 100, 50, false),
(1, 'Family Pack (250g)', 'Great for families and regular use', 'COC-250', 250.00, 300.00, 250, 75, true),
(1, 'Party Pack (500g)', 'Perfect for gatherings and parties', 'COC-500', 450.00, 550.00, 500, 30, false),
(2, 'Small Pack (100g)', 'Bold flavors in a compact size', 'GUN-100', 145.00, 180.00, 100, 40, false),
(2, 'Family Pack (250g)', 'Spice up your family meals', 'GUN-250', 320.00, 380.00, 250, 60, true),
(2, 'Party Pack (500g)', 'For the truly adventurous', 'GUN-500', 580.00, 720.00, 500, 25, false),
(3, 'Small Pack (100g)', 'Cooling freshness in every bite', 'MIN-100', 135.00, 165.00, 100, 45, false),
(3, 'Family Pack (250g)', 'Beat the heat with family', 'MIN-250', 280.00, 330.00, 250, 70, true),
(3, 'Party Pack (500g)', 'Summer party essential', 'MIN-500', 520.00, 620.00, 500, 35, false);

-- Food Pairings
INSERT INTO food_pairings (product_id, dish_name, cuisine_type, occasion, description, popularity_score) VALUES
(1, 'Masala Dosa', 'South Indian', 'Breakfast', 'Classic crispy dosa with potato filling', 5),
(1, 'Steamed Idli', 'South Indian', 'Any time', 'Soft, fluffy rice cakes perfect for soaking up chutney', 5),
(1, 'Medu Vada', 'South Indian', 'Snack', 'Crispy lentil donuts that complement the coconut flavor', 4),
(2, 'Steamed Rice', 'Universal', 'Main meal', 'Simple rice enhanced with this bold chutney', 5),
(2, 'Curd Rice', 'South Indian', 'Comfort', 'Cooling yogurt rice balanced with spicy chutney', 4),
(3, 'Samosa', 'Indian', 'Tea time', 'Crispy pastries filled with spiced potatoes', 5),
(3, 'Seekh Kebab', 'North Indian', 'Dinner', 'Grilled minced meat skewers', 4);

-- Usage Scenarios
INSERT INTO usage_scenarios (product_id, scenario_title, scenario_description, best_time, season_relevance, mood) VALUES
(1, 'Morning Comfort', 'Start your day with the traditional flavors of Kerala. Perfect with hot idlis for a wholesome breakfast that connects you to generations of tradition.', 'morning', 'All seasons', 'Peaceful'),
(1, 'Weekend Family Breakfast', 'Gather the family around for a leisurely South Indian breakfast. The mild flavors make it perfect for sharing stories and creating memories.', 'morning', 'Weekends', 'Nostalgic'),
(2, 'Adventure Meal', 'For those who crave bold flavors and aren''t afraid of heat. This chutney is for the adventurous souls who believe food should be exciting.', 'lunch', 'All seasons', 'Adventurous'),
(3, 'Summer Relief', 'Beat the heat with this cooling chutney. Perfect for hot days when you need something refreshing that also excites your taste buds.', 'afternoon', 'Summer', 'Refreshing'),
(3, 'BBQ Companion', 'Grilled foods come alive with this chutney. The cooling mint cuts through richness and adds brightness to any barbecue.', 'evening', 'Summer', 'Outdoor');

-- Cultural Contexts
INSERT INTO cultural_contexts (product_id, tradition_name, cultural_significance, region, historical_background, festival_relevance, story_teller, generation) VALUES
(1, 'Kerala Temple Prasadam', 'In Kerala temples, coconut chutney is considered sacred prasadam, blessed by the deities and shared with devotees as a blessing.', 'Kerala', 'Temple kitchens have been preparing this chutney for over 500 years, with recipes passed down through generations of temple cooks.', 'Offered during all temple festivals and special occasions', 'Temple Kitchen Master', '15+ generations'),
(1, 'Keralite Breakfast Tradition', 'The morning ritual of idli and coconut chutney is deeply embedded in Kerala culture, representing the start of a day with gratitude.', 'Coastal Kerala', 'This tradition dates back to the ancient Chera kingdom, where coconut was considered the tree of life.', 'Integral part of Onam and other Kerala festivals', 'Traditional Cook', '20+ generations'),
(2, 'Warrior''s Sustenance', 'Originally created as high-energy food for warriors and traders on long journeys across the harsh landscapes of Gujarat.', 'Gujarat', 'The chutney provided both nutrition and protection against spoilage during long travels.', 'Celebrated during traditional festivals honoring warriors', 'Spice Merchant Grandfather', '10+ generations'),
(3, 'Desert Cooling Wisdom', 'Rajasthani nomads developed this chutney as a survival tool against the desert heat.', 'Rajasthan', 'Nomadic communities carried mint chutney as a natural air conditioner, using it to cool the body in extreme temperatures.', 'Essential during summer festivals like Teej', 'Desert Nomad Elder', '30+ generations');

-- Product Reviews
INSERT INTO product_reviews (product_id, reviewer_name, rating, title, comment, is_verified_purchase, is_approved) VALUES
(1, 'Priya Sharma', 5, 'Authentic Taste of Kerala', 'This takes me straight back to my grandmother''s kitchen in Kerala. The flavors are exactly how I remember them from childhood.', true, true),
(1, 'Rajesh Kumar', 5, 'Perfect with Dosa', 'I make dosas at home and this chutney makes them taste like they''re from a Kerala restaurant. Amazing quality!', true, true),
(1, 'Anita Reddy', 4, 'Good but could be spicier', 'Tastes authentic but I wish it had a bit more heat. Still very good quality.', true, true),
(2, 'Vikram Singh', 5, 'Perfect for Spice Lovers', 'This is exactly what I was looking for - bold, authentic, and it packs a real punch! Not for the faint of heart.', true, true),
(2, 'Deepika Mehta', 4, 'Very Spicy but Good', 'My husband loves spicy food and this is his favorite now. It''s authentic Gujarati flavors.', true, true),
(3, 'Neha Gupta', 5, 'Summer Essential', 'Perfect for summer! The mint flavor is fresh and cooling, exactly what you need during hot weather.', true, true),
(3, 'Rahul Jain', 5, 'Refreshing and Delicious', 'This chutney is like a breath of fresh air. Goes perfectly with samosas and kebabs.', true, true);

-- Site Settings (with conflict handling)
INSERT INTO site_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('site_name', 'Ooru Chutney Pudi', 'text', 'Website name', true),
('site_tagline', 'Authentic Indian Chutneys - Preserving Generations of Flavor', 'text', 'Main website tagline', true),
('contact_email', 'hello@ooruchutneypudi.com', 'email', 'Main contact email', true),
('phone_number', '+91 9876543210', 'text', 'Customer service phone', true),
('address', 'Mysore Road, Bangalore, Karnataka, India', 'text', 'Business address', true),
('shipping_threshold_free', '500', 'number', 'Minimum order amount for free shipping', true),
('default_currency', 'INR', 'text', 'Default currency for pricing', true),
('tax_rate', '18', 'number', 'Default tax rate percentage', false)
ON CONFLICT (setting_key) DO NOTHING;
