// Mock Data - Comprehensive Product Collection using Supabase Storage Images
export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Traditional Coconut Chutney",
    description: "Fresh coconut chutney with green chilies and curry leaves - perfect companion for idli and dosa",
    price: 120.00,
    image_url: "https://ycymizccbnjamzrbztqz.supabase.co/storage/v1/object/public/products/coconut-chutney.png",
    category: "Traditional Chutneys",
    spice_level: "medium" as const,
    is_vegetarian: true,
    stock: 50,
    created_at: "2024-01-15T10:00:00Z",
    long_description: "Our grandmother's secret recipe passed down through four generations. In the coastal villages of Kerala, coconut trees sway as they have for centuries, and this chutney captures the essence of those peaceful mornings.",
    ingredients: "Fresh coconut, Green chilies, Curry leaves, Ginger, Salt, Cumin seeds, Mustard seeds, Yogurt",
    nutritional_info: "Rich in healthy fats, fiber, and essential minerals. Provides quick energy and supports metabolism.",
    tags: ["traditional", "mild", "vegetarian", "vegan", "gluten-free", "south-indian"]
  },
  {
    id: 2,
    name: "Fiery Gunpowder Chutney",
    description: "Bold garlic chutney for the adventurous palate - a tribute to bold flavors",
    price: 145.00,
    image_url: "https://ycymizccbnjamzrbztqz.supabase.co/storage/v1/object/public/products/garlic-chutney.png",
    category: "Spicy Blends",
    spice_level: "hot" as const,
    is_vegetarian: true,
    stock: 40,
    created_at: "2024-01-16T10:00:00Z",
    long_description: "In the spice markets of Gujarat, where vendors take pride in their most potent creations, this fiery chutney was born. My grandfather, a spice trader, challenged our family to create something that would wake up every taste bud.",
    ingredients: "Garlic, Dried red chilies, Cumin seeds, Coriander seeds, Fenugreek seeds, Salt, Oil",
    nutritional_info: "Rich in protein from garlic and metabolism-boosting spices. Great for circulation and digestion.",
    tags: ["spicy", "bold", "garlic", "traditional", "vegan", "gluten-free"]
  },
  {
    id: 3,
    name: "Mint Magic Chutney",
    description: "Refreshing mint chutney with yogurt and cilantro - the perfect cooling accompaniment",
    price: 135.00,
    image_url: "https://ycymizccbnjamzrbztqz.supabase.co/storage/v1/object/public/products/mint-chutney.png",
    category: "Traditional Chutneys",
    spice_level: "medium" as const,
    is_vegetarian: true,
    stock: 45,
    created_at: "2024-01-17T10:00:00Z",
    long_description: "In the scorching summers of Rajasthan, where the heat can be relentless, my aunt discovered the magic of combining mint's cooling properties with yogurt. This chutney was born from necessity.",
    ingredients: "Fresh mint leaves, Cilantro, Yogurt, Green chilies, Lemon juice, Cumin, Black salt",
    nutritional_info: "Rich in antioxidants and cooling properties. Mint aids digestion and provides natural cooling.",
    tags: ["refreshing", "cooling", "mint", "yogurt", "vegetarian", "gluten-free"]
  },
  {
    id: 4,
    name: "Tomato Symphony Chutney",
    description: "Tangy tomato chutney with aromatic spices - a burst of summer flavors in every bite",
    price: 95.00,
    image_url: "https://ycymizccbnjamzrbztqz.supabase.co/storage/v1/object/public/products/tomato-chutney.png",
    category: "Traditional Chutneys",
    spice_level: "medium" as const,
    is_vegetarian: true,
    stock: 60,
    created_at: "2024-01-18T10:00:00Z",
    long_description: "During the monsoon seasons in Tamil Nadu, when tomatoes were abundant in our backyard garden, my mother would spend hours creating this masterpiece. This chutney tells the story of those rainy afternoons.",
    ingredients: "Fresh tomatoes, Red chilies, Tamarind, Jaggery, Curry leaves, Mustard seeds, Fenugreek seeds",
    nutritional_info: "Rich in lycopene and vitamin C. Aids digestion and boosts immunity.",
    tags: ["tangy", "comfort", "tomato", "vegetarian", "vegan", "gluten-free"]
  },
  {
    id: 5,
    name: "Royal Coriander Chutney",
    description: "Elegant coriander chutney with hints of coconut and mint - fit for royalty",
    price: 165.00,
    image_url: "https://ycymizccbnjamzrbztqz.supabase.co/storage/v1/object/public/products/onion-chutney.png",
    category: "Heritage Collections",
    spice_level: "mild" as const,
    is_vegetarian: true,
    stock: 30,
    created_at: "2024-01-19T10:00:00Z",
    long_description: "This elegant chutney was created for the royal courts of Mysore, where spice mastery was considered an art form. The recipe was a closely guarded secret, passed down through generations of court chefs.",
    ingredients: "Fresh coriander, Coconut, Mint leaves, Green chilies, Rose water, Cardamom, Cashews",
    nutritional_info: "Rich in vitamins A, C, and K. Coriander aids in detoxification and provides antioxidant benefits.",
    tags: ["elegant", "coriander", "mint", "coconut", "vegetarian", "vegan", "heritage"]
  },
  {
    id: 6,
    name: "Red Chili Fire Chutney",
    description: "Intense red chili chutney that sets taste buds dancing with authentic South Indian heat",
    price: 125.00,
    image_url: "https://ycymizccbnjamzrbztqz.supabase.co/storage/v1/object/public/products/tomato-chutney.png",
    category: "Spicy Blends",
    spice_level: "extra_hot" as const,
    is_vegetarian: true,
    stock: 35,
    created_at: "2024-01-20T10:00:00Z",
    long_description: "Born from the bold traditions of Andhra Pradesh, this fiery chutney is for those who dare to embrace the extreme heat of authentic Indian spices.",
    ingredients: "Dried red chilies, Garlic, Tamarind, Salt, Oil, Spices",
    nutritional_info: "High in capsaicin which boosts metabolism and provides pain relief benefits.",
    tags: ["extra_hot", "spicy", "red_chili", "andhra", "bold", "authentic"]
  },
  {
    id: 7,
    name: "Sesame Bliss Chutney",
    description: "Nutty sesame chutney with aromatic spices - a protein-rich traditional favorite",
    price: 155.00,
    image_url: "https://ycymizccbnjamzrbztqz.supabase.co/storage/v1/object/public/products/sesame-chutney.png",
    category: "Heritage Collections",
    spice_level: "mild" as const,
    is_vegetarian: true,
    stock: 25,
    created_at: "2024-01-21T10:00:00Z",
    long_description: "From the kitchens of Maharashtra, where sesame seeds are revered for their nutritional value, this chutney represents the perfect marriage of taste and health.",
    ingredients: "Roasted sesame seeds, Green chilies, Coconut, Curry leaves, Spices",
    nutritional_info: "Excellent source of calcium, healthy fats, and plant-based protein.",
    tags: ["nutty", "sesame", "protein", "healthy", "maharashtrian", "traditional"]
  },
  {
    id: 8,
    name: "Onion Harmony Chutney",
    description: "Savory onion chutney with perfectly balanced spices - comfort food reimagined",
    price: 85.00,
    image_url: "https://ycymizccbnjamzrbztqz.supabase.co/storage/v1/object/public/products/onion-chutney.png",
    category: "Traditional Chutneys",
    spice_level: "mild" as const,
    is_vegetarian: true,
    stock: 55,
    created_at: "2024-01-22T10:00:00Z",
    long_description: "Born from the need to preserve onions during harvest season, this chutney transforms humble onions into something extraordinary with the magic of traditional spices.",
    ingredients: "Fresh onions, Red chilies, Tamarind, Jaggery, Spices, Oil",
    nutritional_info: "Rich in quercetin and antioxidants that boost heart health and immunity.",
    tags: ["savory", "onion", "comfort", "mild", "traditional", "wholesome"]
  },
  {
    id: 9,
    name: "Pudina Special Chutney",
    description: "Premium mint chutney with secret family recipe - the pinnacle of refreshing flavors",
    price: 175.00,
    image_url: "https://ycymizccbnjamzrbztqz.supabase.co/storage/v1/object/public/products/pudina-chutney.png",
    category: "Premium Collection",
    spice_level: "medium" as const,
    is_vegetarian: true,
    stock: 20,
    created_at: "2024-01-23T10:00:00Z",
    long_description: "Our crown jewel - a premium version of mint chutney using only the finest garden-fresh mint and exotic spices sourced from across India.",
    ingredients: "Premium mint leaves, Rose water, Saffron, Exotic spices, Premium yogurt",
    nutritional_info: "Packed with antioxidants, vitamins, and unique medicinal properties from premium ingredients.",
    tags: ["premium", "mint", "luxury", "saffron", "exotic", "special"]
  }
];

export interface CarouselProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category: string;
  spice_level?: 'mild' | 'medium' | 'hot' | 'extra_hot';
  is_vegetarian?: boolean;
  stock: number;
  created_at?: string;
  long_description?: string;
  ingredients?: string;
  nutritional_info?: string;
  tags?: string[];
}

export interface ProductDetail extends CarouselProduct {
  long_description?: string;
  ingredients?: string;
  nutritional_info?: string;
  cooking_instructions?: string;
  tags?: string[];
}

// Fetch products for carousel (limited to 3 for the 3D effect)
export async function fetchCarouselProducts(): Promise<CarouselProduct[]> {
  try {
    // Simulate API delay for realistic behavior
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_PRODUCTS.slice(0, 3);
  } catch (error) {
    console.error('Error fetching carousel products:', error);
    return [];
  }
}

// Fetch single product by ID
export async function fetchProductById(id: number): Promise<ProductDetail | null> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    return product ? { ...product } : null;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
}

// Fetch related products for the product details page
export async function fetchRelatedProducts(currentProductId: number, category?: string): Promise<CarouselProduct[]> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    return MOCK_PRODUCTS
      .filter(product => product.id !== currentProductId && (!category || product.category === category))
      .slice(0, 3);
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

// Get all products for potential future use
export async function fetchAllProducts(): Promise<CarouselProduct[]> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_PRODUCTS;
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
}

// Helper function to get product by slug
export async function fetchProductBySlug(slug: string): Promise<ProductDetail | null> {
  try {
    // Convert slug back to ID (simple mapping for demo)
    const productMap: { [key: string]: number } = {
      'traditional-coconut-chutney': 1,
      'fiery-gunpowder-chutney': 2,
      'mint-magic-chutney': 3,
      'tomato-symphony-chutney': 4,
      'royal-coriander-chutney': 5,
      'red-chili-fire-chutney': 6,
      'sesame-bliss-chutney': 7,
      'onion-harmony-chutney': 8,
      'pudina-special-chutney': 9
    };
    
    const productId = productMap[slug];
    if (productId) {
      return await fetchProductById(productId);
    }
    return null;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
}

// Legacy exports for backward compatibility
export const mockProducts = MOCK_PRODUCTS;
export const featuredProducts = MOCK_PRODUCTS;
export const allProducts = MOCK_PRODUCTS;
export const spicyProducts = MOCK_PRODUCTS.filter(p => p.spice_level === 'hot' || p.spice_level === 'extra_hot');
export const traditionalProducts = MOCK_PRODUCTS.filter(p => p.category === 'Traditional Chutneys');
export const premiumProducts = MOCK_PRODUCTS.filter(p => p.category === 'Premium Collection');
