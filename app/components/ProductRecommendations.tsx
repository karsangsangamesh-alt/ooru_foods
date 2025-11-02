"use client";

import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ErrorBoundary } from 'react-error-boundary';

// Define types
type SupabaseProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category: string;
  spice_level?: string;
  in_stock: boolean;
  rating: number;
  reviews_count: number;
  featured?: boolean;
  stock: number;
  created_at?: string;
  base_price?: number;
  stock_quantity?: number;
};

type RecommendationProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  isPopular?: boolean;
  isNew?: boolean;
};

interface CartItem {
  id: string;
  product: RecommendationProduct;
  quantity: number;
}

interface ProductRecommendationsProps {
  cartItems: CartItem[];
  onAddToCart: (product: RecommendationProduct) => Promise<void> | void;
  loadingItemId?: string | null;
}

// Mock recommendations data with correct Supabase URLs
const MOCK_RECOMMENDATIONS: RecommendationProduct[] = [
  {
    id: 3,
    name: "Mint Magic Chutney",
    description: "Refreshing mint chutney with yogurt and cilantro - perfect cooling accompaniment",
    price: 135.00,
    image_url: "https://ycymizccbnjamzrbztqz.supabase.co/storage/v1/object/public/products/mint-chutney.png",
    category: "Traditional Chutneys",
    stock: 45,
    rating: 4.7,
    reviews: 89,
    inStock: true,
    isPopular: true
  },
  {
    id: 1,
    name: "Traditional Coconut Chutney",
    description: "Fresh coconut chutney with green chilies and curry leaves - perfect companion for idli and dosa",
    price: 120.00,
    image_url: "https://ycymizccbnjamzrbztqz.supabase.co/storage/v1/object/public/products/coconut-chutney.png",
    category: "Traditional Chutneys",
    stock: 32,
    rating: 4.5,
    reviews: 124,
    inStock: true,
    isPopular: true
  },
  {
    id: 4,
    name: "Tomato Symphony Chutney",
    description: "Tangy tomato chutney with aromatic spices - a burst of summer flavors in every bite",
    price: 95.00,
    image_url: "https://ycymizccbnjamzrbztqz.supabase.co/storage/v1/object/public/products/tomato-chutney.png",
    category: "Traditional Chutneys",
    stock: 28,
    rating: 4.3,
    reviews: 76,
    inStock: true,
    isNew: true
  }
];

export default function ProductRecommendations({ cartItems, onAddToCart, loadingItemId }: ProductRecommendationsProps) {
  const [allProducts, setAllProducts] = useState<RecommendationProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Supabase or use mock data
  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        setLoading(true);
        
        // Use mock data directly for consistent results
        if (isMounted) {
          setAllProducts(MOCK_RECOMMENDATIONS);
        }
      } catch (error) {
        console.error('Error in fetchProducts, using mock data:', error);
        if (isMounted) {
          setAllProducts(MOCK_RECOMMENDATIONS);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    { id: 'complete-meal', title: 'Complete Your Meal', icon: '🍽️' },
    { id: 'frequently-bought', title: 'Frequently Bought Together', icon: '🤝' },
    { id: 'trending', title: 'Trending Now', icon: '🔥' },
    { id: 'seasonal', title: 'Seasonal Specials', icon: '🌟' }
  ];

  const [activeSection, setActiveSection] = useState<string>('complete-meal');

  // Memoize the recommendation functions 
  const recommendedProducts = useMemo(() => {
    const cartProductIds = new Set(cartItems.map(item => item.product.id.toString()));
    return allProducts.filter((product) => {
      const productId = product.id.toString();
      return !cartProductIds.has(productId) && product.inStock;
    });
  }, [allProducts, cartItems]);

  // Function to get frequently bought together items
  const getFrequentlyBoughtTogether = useCallback((): RecommendationProduct[] => {
    return allProducts
      .filter(p => p.isPopular)
      .slice(0, 3);
  }, [allProducts]);

  // Function to get trending items
  const getTrendingItems = useCallback((): RecommendationProduct[] => {
    return [...allProducts]
      .sort((a, b) => (b.rating * 10 + b.reviews) - (a.rating * 10 + a.reviews))
      .slice(0, 3);
  }, [allProducts]);

  // Function to get seasonal items
  const getSeasonalItems = useCallback((): RecommendationProduct[] => {
    return allProducts
      .filter(p => p.isNew)
      .concat(allProducts.filter(p => p.isPopular))
      .slice(0, 3);
  }, [allProducts]);

  // Get products for the active section
  const getSectionProducts = useCallback((): RecommendationProduct[] => {
    switch (activeSection) {
      case 'complete-meal':
        return recommendedProducts;
      case 'frequently-bought':
        return getFrequentlyBoughtTogether();
      case 'trending':
        return getTrendingItems();
      case 'seasonal':
        return getSeasonalItems();
      default:
        return recommendedProducts;
    }
  }, [activeSection, recommendedProducts, getFrequentlyBoughtTogether, getTrendingItems, getSeasonalItems]);

  // Error boundary fallback component
  const ErrorFallback = ({ resetErrorBoundary }: { resetErrorBoundary: () => void }) => {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 text-center my-6">
        <div className="mx-auto w-16 h-16 flex items-center justify-center bg-red-50 rounded-full mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Oops! Something went wrong</h3>
        <p className="text-gray-600 mb-4">We couldn&apos;t load product recommendations. Please try again.</p>
        <button
          onClick={resetErrorBoundary}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  };

  // Handle error boundary reset
  const handleErrorReset = useCallback(async () => {
    setLoading(true);
    try {
      // Use mock data directly
      setAllProducts(MOCK_RECOMMENDATIONS);
    } catch (error) {
      console.error('Error retrying fetch:', error);
      setAllProducts(MOCK_RECOMMENDATIONS);
    } finally {
      setLoading(false);
    }
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto"></div>
            <p className="h-4 bg-gray-100 rounded w-3/4 max-w-md mx-auto"></p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200">
                  <div className="aspect-w-1 aspect-h-1 w-full bg-gray-100">
                    <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse"></div>
                  </div>
                  <div className="p-4">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-gray-100 rounded w-5/6 mb-1"></div>
                    <div className="h-3 bg-gray-100 rounded w-4/6 mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-8 bg-gray-200 rounded w-20"></div>
                      <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main component render
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={handleErrorReset}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm mb-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">You May Also Like</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular chutneys and pickles, carefully crafted with authentic recipes and premium ingredients.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveSection(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSection === category.id
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.icon} {category.title}
            </button>
          ))}
        </div>

        {/* Products Grid - 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {getSectionProducts().slice(0, 3).map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 border border-gray-100"
            >
              <div className="relative h-48 bg-gray-50">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-food.svg';
                  }}
                />
                {product.isNew && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    New
                  </span>
                )}
                {product.isPopular && (
                  <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2 h-10">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-orange-600">₹{product.price.toFixed(2)}</span>
                  <button
                    onClick={() => onAddToCart(product)}
                    disabled={!product.inStock || loadingItemId === product.id.toString()}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      product.inStock
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {loadingItemId === product.id.toString() ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                      </span>
                    ) : product.inStock ? (
                      'Add to Cart'
                    ) : (
                      'Out of Stock'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </ErrorBoundary>
  );
}

export type { RecommendationProduct, CartItem, SupabaseProduct };
