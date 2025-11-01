import { supabase } from '../../lib/supabaseClient';

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
    const { data, error } = await supabase
      .from('test_products')
      .select('*')
      .limit(3)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching carousel products:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchCarouselProducts:', error);
    return [];
  }
}

// Fetch single product by ID
export async function fetchProductById(id: number): Promise<ProductDetail | null> {
  try {
    const { data, error } = await supabase
      .from('test_products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    if (!data) return null;

    // Add enhanced data for product details
    const enhancedProduct: ProductDetail = {
      ...data,
      long_description: data.description + " This authentic South Indian chutney is prepared using traditional methods and the finest ingredients. Each batch is carefully crafted to ensure the perfect balance of flavors that complement your meals perfectly.",
      ingredients: "Fresh coconut, roasted gram dal, green chilies, curry leaves, tamarind, salt, oil",
      nutritional_info: "Rich in dietary fiber, healthy fats, and essential vitamins. Low in calories and cholesterol-free.",
      cooking_instructions: "Ready to serve chutney. Can be enjoyed with idli, dosa, rice, or as a side dish.",
      tags: ['traditional', 'homemade', 'authentic', 'south indian', 'spicy', 'vegetarian']
    };

    return enhancedProduct;
  } catch (error) {
    console.error('Error in fetchProductById:', error);
    return null;
  }
}

// Fetch related products for the product details page
export async function fetchRelatedProducts(currentProductId: number, category?: string): Promise<CarouselProduct[]> {
  try {
    let query = supabase
      .from('test_products')
      .select('*')
      .neq('id', currentProductId)
      .limit(3)
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching related products:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchRelatedProducts:', error);
    return [];
  }
}

// Get all products for potential future use
export async function fetchAllProducts(): Promise<CarouselProduct[]> {
  try {
    const { data, error } = await supabase
      .from('test_products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all products:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchAllProducts:', error);
    return [];
  }
}
