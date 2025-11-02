// Database-based data access
// All product data now comes from the database instead of mock data

// Helper function to get products by category
export const getProductsByCategory = async (category: string) => {
  const { supabase } = await import('../../lib/supabaseClient');
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('category', category)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
  
  return data || [];
};

// Helper function to get products by spice level
export const getProductsBySpiceLevel = async (spiceLevel: 'mild' | 'medium' | 'hot' | 'extra_hot') => {
  const { supabase } = await import('../../lib/supabaseClient');
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('spice_level', spiceLevel)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching products by spice level:', error);
    return [];
  }
  
  return data || [];
};

// Helper function to get affordable products
export const getAffordableProducts = async (maxPrice: number) => {
  const { supabase } = await import('../../lib/supabaseClient');
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .lte('base_price', maxPrice)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching affordable products:', error);
    return [];
  }
  
  return data || [];
};

// Helper function to get in-stock products
export const getInStockProducts = async () => {
  const { supabase } = await import('../../lib/supabaseClient');
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('in_stock', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching in-stock products:', error);
    return [];
  }
  
  return data || [];
};

// Helper function to get featured products
export const getFeaturedProducts = async () => {
  const { supabase } = await import('../../lib/supabaseClient');
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('featured', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
  
  return data || [];
};

// Helper function to get bestsellers
export const getBestsellerProducts = async () => {
  const { supabase } = await import('../../lib/supabaseClient');
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('bestseller', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching bestseller products:', error);
    return [];
  }
  
  return data || [];
};

// Helper function to search products
export const searchProducts = async (searchTerm: string) => {
  const { supabase } = await import('../../lib/supabaseClient');
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error searching products:', error);
    return [];
  }
  
  return data || [];
};

// This file is kept for backward compatibility but is no longer used
// All product data now comes from the database

// Existing story-based data for backward compatibility
interface FoodPairing {
  id: number;
  dish_name: string;
  cuisine_type: string;
  occasion: string;
  description: string;
  popularity_score: number;
}

interface UsageScenario {
  id: number;
  scenario_title: string;
  scenario_description: string;
  best_time: string;
  season_relevance: string;
}

interface CulturalContext {
  id: number;
  tradition_name: string;
  cultural_significance: string;
  region: string;
  historical_background: string;
  festival_relevance: string;
}

interface StoryProduct {
  id: number;
  name: string;
  image_url: string;
  base_price: number;
  heritage_story: string;
  cultural_origin: string;
  family_recipe: string;
  pairing_suggestions: string[];
  preparation_tips: string;
  serving_ideas: string;
  health_benefits: string;
  spice_explained: string;
  tradition_story: string;
  spice_level: string;
  is_vegetarian: boolean;
  region: string;
  preparation_time: string;
  food_pairings: FoodPairing[];
  usage_scenarios: UsageScenario[];
  cultural_contexts: CulturalContext[];
}

export const mockStoryProducts: { [key: string]: StoryProduct } = {
  '1': {
    id: 1,
    name: 'Coconut Chutney',
    image_url: '/assets/coconut-chutney.png',
    base_price: 85.00,
    heritage_story: 'In the kitchens of Tamil Nadu, coconut chutney has been the heartbeat of breakfast for generations. This creamy, mildly spiced accompaniment transforms simple dishes into memorable meals.',
    cultural_origin: 'Originating from the coconut-rich coastal regions of South India, this chutney represents the wisdom of using locally available ingredients to create maximum flavor.',
    family_recipe: 'My grandmother would soak fresh coconuts overnight, grind them with roasted chana dal, green chilies, and a pinch of hing. The secret was always in the tempering - mustard seeds that pop like tiny fireworks in hot oil.',
    pairing_suggestions: ['Dosa', 'Idli', 'Appam', 'Pongal', 'Upma', 'Rasam Rice', 'Steamed Rice'],
    preparation_tips: 'Grind coconut with minimal water for creamy texture. Temper with mustard seeds, dried red chilies, and curry leaves for authentic flavor.',
    serving_ideas: 'Best served fresh with hot steamed rice or breakfast items. Can be stored for 2-3 days in refrigerator.',
    health_benefits: 'Coconut provides healthy fats, fiber, and minerals. The spices aid digestion and add antimicrobial properties.',
    spice_explained: 'Green chilies provide vitamin C and capsaicin, which boosts metabolism. Coconut oil in tempering provides medium-chain fatty acids.',
    tradition_story: 'In Tamil households, no festival breakfast is complete without coconut chutney. It\'s believed to bring prosperity and is offered to deities during prayer times.',
    spice_level: 'Mild',
    is_vegetarian: true,
    region: 'Tamil Nadu, Kerala',
    preparation_time: '15 minutes',
    food_pairings: [
      {
        id: 1,
        dish_name: 'Masala Dosa',
        cuisine_type: 'South Indian',
        occasion: 'breakfast',
        description: 'The classic combination - crispy dosa with spicy potato filling paired perfectly with cool coconut chutney',
        popularity_score: 5
      },
      {
        id: 2,
        dish_name: 'Idli',
        cuisine_type: 'South Indian',
        occasion: 'breakfast',
        description: 'Soft, fluffy idlis become extraordinary when dipped in this creamy chutney',
        popularity_score: 5
      },
      {
        id: 3,
        dish_name: 'Pongal',
        cuisine_type: 'South Indian',
        occasion: 'festival',
        description: 'Traditional comfort food that pairs beautifully with the mild sweetness of coconut chutney',
        popularity_score: 4
      }
    ],
    usage_scenarios: [
      {
        id: 1,
        scenario_title: 'Perfect Breakfast Start',
        scenario_description: 'Begin your day with this light, nutritious chutney that won\'t weigh you down but will energize you for hours',
        best_time: 'morning',
        season_relevance: 'Year-round'
      },
      {
        id: 2,
        scenario_title: 'Monsoon Comfort',
        scenario_description: 'During rainy season, this chutney with hot idlis provides warmth and comfort',
        best_time: 'monsoon',
        season_relevance: 'Monsoon'
      },
      {
        id: 3,
        scenario_title: 'Post-Fast Meal',
        scenario_description: 'After religious fasting, this simple yet satisfying chutney helps break the fast gently',
        best_time: 'evening',
        season_relevance: 'Fasting days'
      }
    ],
    cultural_contexts: [
      {
        id: 1,
        tradition_name: 'Tamil Breakfast Tradition',
        cultural_significance: 'Coconut chutney represents the essence of Tamil hospitality - simple, pure, and made with love',
        region: 'Tamil Nadu',
        historical_background: 'Dating back to the Chola dynasty, coconut was considered sacred and used in religious offerings',
        festival_relevance: 'Prepared for Pongal festival and offered to Sun God'
      }
    ]
  },
  '2': {
    id: 2,
    name: 'Garlic Chutney',
    image_url: '/assets/garlic-chutney.png',
    base_price: 75.00,
    heritage_story: 'In the rugged landscapes of Maharashtra and Gujarat, garlic chutney emerged as the warrior\'s fuel - bold, intense, and unforgettable. This isn\'t for the faint-hearted.',
    cultural_origin: 'Born from the need to preserve harvests and create intense flavors, garlic chutney became the signature of Gujarati and Marathi cuisine.',
    family_recipe: 'My great-grandmother would grind 50 cloves of garlic with red chilies, salt, and a touch of jaggery. She always said, "Garlic chutney is like life - bold, intense, and transformative."',
    pairing_suggestions: ['Bhakri', 'Bajra Roti', 'Thepla', 'Dal Rice', 'Khakhra', 'Pav Bhaji', 'Misal Pav'],
    preparation_tips: 'Use fresh garlic for best flavor. Red chilies add heat and color. A pinch of jaggery balances the sharp garlic taste.',
    serving_ideas: 'Perfect with rustic breads and grains. Excellent with dal and rice. Can be mixed into yogurt for a spicy raita.',
    health_benefits: 'Garlic is nature\'s antibiotic, rich in allicin which boosts immunity. Red chilies contain capsaicin for metabolism boost.',
    spice_explained: 'Garlic\'s pungency is balanced by red chilies which provide vitamin A and C. The combination creates a perfect digestive aid.',
    tradition_story: 'In rural Maharashtra, garlic chutney was the secret weapon of farmers - providing energy, strength, and protection against seasonal illnesses.',
    spice_level: 'Hot',
    is_vegetarian: true,
    region: 'Maharashtra, Gujarat',
    preparation_time: '10 minutes',
    food_pairings: [
      {
        id: 1,
        dish_name: 'Bhakri',
        cuisine_type: 'Gujarati',
        occasion: 'lunch',
        description: 'Rustic millet flatbread that pairs perfectly with the bold flavors of garlic chutney',
        popularity_score: 5
      },
      {
        id: 2,
        dish_name: 'Bajra Roti',
        cuisine_type: 'Gujarati',
        occasion: 'dinner',
        description: 'Pearl millet flatbread becomes extraordinary with this intense, earthy chutney',
        popularity_score: 4
      },
      {
        id: 3,
        dish_name: 'Pav Bhaji',
        cuisine_type: 'Mumbai Street Food',
        occasion: 'evening',
        description: 'Mumbai\'s favorite street food elevated with the authentic taste of garlic chutney',
        popularity_score: 5
      }
    ],
    usage_scenarios: [
      {
        id: 1,
        scenario_title: 'Winter Warmth',
        scenario_description: 'During cold months, this chutney provides internal warmth and boosts immunity naturally',
        best_time: 'morning',
        season_relevance: 'Winter'
      },
      {
        id: 2,
        scenario_title: 'Heavy Meal Digestion',
        scenario_description: 'Perfect after rich meals to aid digestion and prevent lethargy',
        best_time: 'evening',
        season_relevance: 'Year-round'
      }
    ],
    cultural_contexts: [
      {
        id: 1,
        tradition_name: 'Kharif Harvest Celebration',
        cultural_significance: 'Celebrates the garlic harvest and represents the strength of rural communities',
        region: 'Gujarat',
        historical_background: 'Mentioned in ancient Ayurvedic texts as a health tonic',
        festival_relevance: 'Prepared during Uttarayan (Makar Sankranti) for energy'
      }
    ]
  },
  '3': {
    id: 3,
    name: 'Mint Chutney',
    image_url: '/assets/mint-chutney.png',
    base_price: 80.00,
    heritage_story: 'In the royal kitchens of North India, mint chutney was considered the prince among condiments - cooling, refreshing, and fit for kings.',
    cultural_origin: 'Originating from the gardens of Kashmir and spreading through the Mughal influence, mint chutney represents the refinement of Indian cuisine.',
    family_recipe: 'The royal recipe calls for fresh mint leaves, coriander, green chilies, and a secret ingredient - a pinch of fennel powder that creates the perfect cooling effect.',
    pairing_suggestions: ['Kebabs', 'Tandoori Items', 'Biryani', 'Paratha', 'Dal Tadka', 'Grilled Fish', 'Samosa'],
    preparation_tips: 'Use only fresh mint leaves. Avoid stems for smooth texture. Add a few mint sprigs as garnish for visual appeal.',
    serving_ideas: 'Serve with grilled meats, kebabs, or as a dip with appetizers. Excellent with rice dishes and bread.',
    health_benefits: 'Mint naturally cools the body, aids digestion, and provides refreshing breath. Rich in antioxidants and vitamin A.',
    spice_explained: 'Mint\'s menthol creates cooling sensation while green chilies add gentle heat. The combination balances doshas according to Ayurveda.',
    tradition_story: 'In Mughal courts, mint chutney was served with elaborate feasts to balance rich, spiced dishes and aid digestion.',
    spice_level: 'Medium',
    is_vegetarian: true,
    region: 'North India, Kashmir',
    preparation_time: '12 minutes',
    food_pairings: [
      {
        id: 1,
        dish_name: 'Seekh Kebab',
        cuisine_type: 'Mughlai',
        occasion: 'dinner',
        description: 'The perfect pairing - grilled meat\'s smoky flavor balanced by mint\'s cooling freshness',
        popularity_score: 5
      },
      {
        id: 2,
        dish_name: 'Biryani',
        cuisine_type: 'Mughlai',
        occasion: 'festival',
        description: 'Mint chutney cuts through the richness of layered rice and meat',
        popularity_score: 4
      },
      {
        id: 3,
        dish_name: 'Tandoori Chicken',
        cuisine_type: 'North Indian',
        occasion: 'dinner',
        description: 'Traditional tandoori preparation elevated with this royal chutney',
        popularity_score: 4
      }
    ],
    usage_scenarios: [
      {
        id: 1,
        scenario_title: 'Summer Cooler',
        scenario_description: 'Beat the summer heat with this naturally cooling chutney that provides instant refreshment',
        best_time: 'afternoon',
        season_relevance: 'Summer'
      },
      {
        id: 2,
        scenario_title: 'Post-Meal Refreshment',
        scenario_description: 'After heavy meals, mint chutney aids digestion and leaves a fresh feeling',
        best_time: 'evening',
        season_relevance: 'Year-round'
      }
    ],
    cultural_contexts: [
      {
        id: 1,
        tradition_name: 'Mughlai Royal Cuisine',
        cultural_significance: 'Represents the sophistication of Mughal cooking and the art of balancing flavors',
        region: 'North India',
        historical_background: 'Perfected in the kitchens of Akbar and Shah Jahan',
        festival_relevance: 'Served during Eid and royal celebrations'
      }
    ]
  }
};
