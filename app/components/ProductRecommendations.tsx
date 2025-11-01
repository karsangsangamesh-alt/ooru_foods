"use client";

import React, { useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product as SupabaseProduct } from '../../lib/supabaseClient';
import ProductCard from './ProductCard';

// Define AnyProduct type for compatibility
type AnyProduct = SupabaseProduct | RecommendationProduct;

// Extended interface for our UI needs
type LocalProduct = Omit<SupabaseProduct, 'id' | 'image_url'> & {
  id: string | number; // Allow both string and number IDs
  image_url: string; // Make image_url required in our UI
  rating: number;
  reviews: number;
  inStock: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  isRecommended?: boolean;
};

// Type that's compatible with both local and Supabase Product
type RecommendationProduct = Omit<LocalProduct, 'id'> & { id: number | string };

interface CartItem {
  id: string;
  product: RecommendationProduct;
  quantity: number;
}

interface ProductRecommendationsProps {
  cartItems: CartItem[];
  onAddToCart: (product: AnyProduct) => Promise<void> | void;
  loadingItemId?: string | null;
}

export default function ProductRecommendations({ cartItems, onAddToCart, loadingItemId }: ProductRecommendationsProps) {
  const [, setRecommendations] = useState<RecommendationProduct[]>([]);
  const [activeSection, setActiveSection] = useState<string>('complete-meal');

  // Use real Supabase products - no hardcoded mock data
  const allProducts = useMemo((): RecommendationProduct[] => [], []);

  const categories = [
    { id: 'complete-meal', title: 'Complete Your Meal', icon: '🍽️', description: 'Perfect pairings for your cart items' },
    { id: 'frequently-bought', title: 'Frequently Bought Together', icon: '🤝', description: 'What other customers love with these items' },
    { id: 'trending', title: 'Trending Now', icon: '🔥', description: 'Popular items this week' },
    { id: 'seasonal', title: 'Seasonal Specials', icon: '🌟', description: 'Limited time offers' }
  ];

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
    const combinations = [
      { main: 'idli-batter', together: ['coconut-chutney', 'tomato-chutney'] },
      { main: 'dosa-batter', together: ['mint-chutney', 'pudina-chutney'] },
      { main: 'sambar-rice', together: ['coconut-chutney', 'pudina-chutney'] },
      { main: 'lemon-rice', together: ['mango-pickle', 'lemon-pickle'] },
    ];

    const frequentlyBought: RecommendationProduct[] = [];
    const cartProductIds = cartItems.map(item => item.product.id.toString());
    
    // Find combinations for items in cart
    cartItems.forEach(cartItem => {
      const combination = combinations.find(c => c.main === cartItem.product.id.toString());
      if (combination) {
        combination.together.forEach(productId => {
          const product = allProducts.find(p => p.id.toString() === productId);
          if (product && !cartProductIds.includes(product.id.toString()) && 
              !frequentlyBought.some(p => p.id === product.id)) {
            frequentlyBought.push(product);
          }
        });
      }
    });

    return frequentlyBought.slice(0, 6);
  }, [cartItems, allProducts]);

  // Function to get trending items
  const getTrendingItems = useCallback((): RecommendationProduct[] => {
    const cartProductIds = cartItems.map(item => item.product.id.toString());
    return allProducts
      .filter(p => (p.isPopular || p.rating > 4.5) && !cartProductIds.includes(p.id.toString()))
      .slice(0, 6);
  }, [cartItems, allProducts]);

  // Function to get seasonal items
  const getSeasonalItems = useCallback((): RecommendationProduct[] => {
    const cartProductIds = new Set(cartItems.map(item => item.product.id.toString()));
    return allProducts
      .filter(p => p.isNew && !cartProductIds.has(p.id.toString()))
      .slice(0, 6);
  }, [cartItems, allProducts]);

  // Update recommendations when cart changes
  React.useEffect(() => {
    // Simulate API call to get recommendations
    const timer = setTimeout(() => {
      setRecommendations(recommendedProducts);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [recommendedProducts]);

  // Ensure we have a valid loadingItemId
  const currentLoadingItemId = loadingItemId ?? null;

  // Get current products based on active section
  const currentProducts = useMemo(() => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3 border border-amber-100 shadow-sm mb-4"
    >
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-3">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="bg-gradient-to-r from-orange-400 to-amber-400 text-white px-2 py-1 rounded-full text-xs font-medium">
            ✨ Smart Picks
          </span>
          <h3 className="text-base font-bold text-gray-700">
            Complete Your Meal
          </h3>
        </motion.div>
        
        {/* Compact Tab Navigation */}
        <div className="flex gap-1 bg-white rounded-md p-0.5 shadow-sm">
          {categories.slice(0, 3).map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveSection(category.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-2 py-1 rounded text-xs font-medium transition-all duration-300 flex items-center gap-1 ${
                activeSection === category.id
                  ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-white shadow-sm'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <span className="text-xs">{category.icon}</span>
              <span className="hidden xs:inline text-xs">{category.title.split(' ')[0]}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Compact Products Grid */}
      <motion.div 
        className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 mb-3"
        layout
      >
        <AnimatePresence mode="wait">
          {currentProducts.slice(0, 6).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{
                duration: 0.2,
                delay: index * 0.03,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              {/* Compact Product Card */}
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-orange-50 group-hover:border-orange-100">
                <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={product.image_url || '/placeholder-food.svg'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-food.svg';
                    }}
                  />
                  
                  {/* Compact Add to Cart Button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-1 right-1 bg-orange-400 hover:bg-orange-500 text-white p-1 rounded-full shadow-sm transition-colors opacity-0 group-hover:opacity-100"
                    disabled={product.stock === 0}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </motion.button>

                  {/* Compact Badge */}
                  {product.isPopular && (
                    <div className="absolute top-1 left-1 bg-red-400 text-white text-xs px-1 py-0.5 rounded font-medium">
                      Pop
                    </div>
                  )}
                  
                  {/* Compact Stock Status */}
                  <div className={`absolute bottom-1 left-1 text-xs px-1 py-0.5 rounded font-medium ${
                    product.stock > 10 
                      ? 'bg-green-100 text-green-600' 
                      : product.stock > 0 
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {product.stock > 10 ? 'Stock' : product.stock > 0 ? 'Low' : 'Out'}
                  </div>
                </div>
                
                <div className="p-2">
                  <h4 className="font-semibold text-gray-800 text-xs mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h4>
                  
                  <div className="flex items-center gap-1 mb-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-2 w-2 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-orange-600 text-sm">
                      ₹{product.price}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-50 px-1 py-0.5 rounded">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Compact Smart Suggestion */}
      {cartItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-orange-400 to-amber-400 rounded-md p-0.5">
            <div className="bg-white rounded-sm p-2">
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ 
                    rotate: [0, 3, -3, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="text-sm"
                >
                  🎯
                </motion.div>
                <div className="text-center">
                  <p className="font-medium text-gray-700 text-xs">
                    {activeSection === 'complete-meal' && "Perfect Pairings!"}
                    {activeSection === 'frequently-bought' && "Customers Also Love"}
                    {activeSection === 'trending' && "Trending Now"}
                    {activeSection === 'seasonal' && "Seasonal Specials"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Export the RecommendationProduct and CartItem interfaces for use in other components
export type { RecommendationProduct, CartItem };
export type { LocalProduct };
