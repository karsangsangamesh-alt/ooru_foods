"use client";

import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { useToast } from '../components/Toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { fetchAllProducts } from '../lib/productService';
import { useCart } from '../contexts/CartContext';
import { Star, Heart, ChefHat, Flame, Zap, Eye, Plus } from 'lucide-react';

// Lazy load heavy components
// const ProductGrid = lazy(() => import('../components/ProductGrid')); // Will be used later

// Interface matching the mock data structure
interface MockProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  spice_level: 'mild' | 'medium' | 'hot' | 'extra_hot';
  is_vegetarian: boolean;
  stock: number;
  image_url: string | null;
  created_at?: string;
  long_description?: string;
  ingredients?: string;
  nutritional_info?: string;
  tags?: string[];
}

// Loading component for Suspense
const ShopLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className="relative w-24 h-24 mx-auto mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-4 border-orange-200 border-t-orange-500 rounded-full"
        />
        <ChefHat className="absolute inset-0 m-auto w-8 h-8 text-orange-500" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Loading Our Collections</h2>
      <p className="text-gray-600">Discovering the perfect flavors for you...</p>
    </motion.div>
  </div>
);

function ShopPage() {
  const [products, setProducts] = useState<MockProduct[]>([]);
  const { showToast } = useToast();
  const [filteredProducts, setFilteredProducts] = useState<MockProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const router = useRouter();

  // Categories with circular layout - adapted for mock data categories
  const categories = [
    { 
      id: 'All', 
      name: 'All Products', 
      icon: ChefHat, 
      color: 'from-gray-400 to-gray-600',
      description: 'Explore our complete collection'
    },
    { 
      id: 'Traditional Chutneys', 
      name: 'Traditional', 
      icon: Zap, 
      color: 'from-yellow-400 to-orange-500',
      description: 'Classic family recipes'
    },
    { 
      id: 'Spicy Blends', 
      name: 'Spicy', 
      icon: Flame, 
      color: 'from-red-500 to-orange-600',
      description: 'For the adventurous taste'
    },
    { 
      id: 'Heritage Collections', 
      name: 'Heritage', 
      icon: Heart, 
      color: 'from-purple-400 to-pink-500',
      description: 'Premium traditional blends'
    },
    { 
      id: 'Premium Collection', 
      name: 'Premium', 
      icon: Star, 
      color: 'from-indigo-400 to-purple-500',
      description: 'Exquisite gourmet creations'
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = useCallback(() => {
    console.log('🔍 Filtering products...');
    console.log('📍 Total products before filter:', products.length);
    console.log('🏷️ Selected category:', selectedCategory);
    
    let filtered = products;
    
    if (selectedCategory !== 'All') {
      console.log('🔍 Filtering for category:', selectedCategory);
      filtered = filtered.filter(product => {
        console.log('📦 Product category:', product.category, 'vs selected:', selectedCategory, 'Match:', product.category === selectedCategory);
        return product.category === selectedCategory;
      });
    }
    
    console.log('✅ Filtered products:', filtered.length);
    setFilteredProducts(filtered);
  }, [products, selectedCategory]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Starting product fetch...');
      
      const mockProducts = await fetchAllProducts();
      console.log('📦 Fetched mock products:', mockProducts);
      console.log('📊 Number of products:', mockProducts.length);
      
      if (!mockProducts || mockProducts.length === 0) {
        console.warn('⚠️ No products returned from fetchAllProducts');
        setError('No products available in the system.');
        return;
      }
      
      // Transform products to match MockProduct interface
      const transformedProducts: MockProduct[] = mockProducts.map(p => ({
        ...p,
        spice_level: p.spice_level || 'medium',
        is_vegetarian: p.is_vegetarian ?? true,
        stock: p.stock || 50,
        tags: p.tags || []
      }));
      
      console.log('✅ Transformed products:', transformedProducts);
      console.log('📍 Setting products state with', transformedProducts.length, 'items');
      
      setProducts(transformedProducts);
      console.log('🎉 Products state updated successfully');
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      showToast(`Error fetching products: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleProductClick = (product: MockProduct) => {
    router.push(`/product/${product.id}`);
  };

  const validateProductForCart = (product: MockProduct): void => {
    // Enhanced validation
    if (!product.id || !product.name) {
      throw new Error('Invalid product data');
    }
    
    if (typeof product.price !== 'number' || product.price <= 0) {
      throw new Error('Invalid product price');
    }

    if (product.stock <= 0) {
      throw new Error('Product is out of stock');
    }
  };

  // Define interface for cart product (matching the cart context)
  interface CartProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string | null;
    category: string;
    spice_level: 'mild' | 'medium' | 'hot' | 'extra_hot';
    is_vegetarian: boolean;
    stock: number;
    created_at?: string;
  }

  const handleAddToCart = async (product: MockProduct, e: React.MouseEvent, quantity: number = 1) => {
    e.stopPropagation();
    
    if (product.stock <= 0) {
      setError('Product is currently out of stock');
      return;
    }
    
    setAddingToCart(product.id.toString());
    
    try {
      // Validate product data before adding to cart
      validateProductForCart(product);
      
      // Transform to match cart interface
      const cartItem: CartProduct = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image_url: product.image_url,
        category: product.category,
        spice_level: product.spice_level || 'medium',
        is_vegetarian: product.is_vegetarian || true,
        stock: product.stock,
        created_at: product.created_at
      };
      
      // Add to cart with proper error handling
      await addToCart(cartItem, quantity);
      showToast(`${product.name} added to cart successfully!`, 'success');
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError(error instanceof Error ? error.message : 'Failed to add item to cart');
    } finally {
      setAddingToCart(null);
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Helper function to get spice level icon/display
  const getSpiceLevelDisplay = (spiceLevel: string) => {
    switch (spiceLevel) {
      case 'mild': return { emoji: '🌱', label: 'Mild', color: 'from-green-400 to-emerald-500' };
      case 'medium': return { emoji: '⚡', label: 'Medium', color: 'from-yellow-400 to-orange-500' };
      case 'hot': return { emoji: '🌶️🌶️', label: 'Hot', color: 'from-red-500 to-orange-600' };
      case 'extra_hot': return { emoji: '🌶️🌶️🌶️', label: 'Extra Hot', color: 'from-red-600 to-red-700' };
      default: return { emoji: '⚡', label: 'Medium', color: 'from-yellow-400 to-orange-500' };
    }
  };

  if (loading) {
    return <ShopLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-red-500 text-white p-4 text-center relative"
          >
            <span>{error}</span>
            <button
              onClick={clearError}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Fixed spacing for header overlap */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto px-4"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-3 sm:mb-4 md:mb-6">
            Taste the{' '}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Story
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6 md:mb-8 leading-relaxed px-2 sm:px-4">
            Every jar tells a tale of tradition, passion, and authentic flavors. 
            Discover our handcrafted chutneys that bring families together.
          </p>
        </motion.div>
      </section>

      {/* Category Selector */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Flavor Journey</h2>
            <p className="text-gray-600">Select your spice preference to explore curated collections</p>
          </motion.div>

          {/* Mobile-First Category Navigation - Fixed sizing and overflow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="overflow-x-auto pb-4"
          >
            <div className="flex justify-start items-center space-x-3 sm:space-x-4 lg:space-x-6 min-w-max px-2 sm:px-4">
              {categories.map((category, index) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;
                
                return (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategorySelect(category.id)}
                    className="relative group flex-shrink-0"
                    aria-label={`Select ${category.name} category`}
                  >
                    {/* Mobile-First Outer Ring - Icon only inside circle */}
                    <motion.div
                      className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br ${category.color} p-1 shadow-xl`}
                      animate={{
                        boxShadow: isSelected 
                          ? '0 0 20px rgba(249, 115, 22, 0.5)' 
                          : '0 5px 15px rgba(0, 0, 0, 0.1)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Inner Circle */}
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <Icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 ${
                          isSelected ? 'text-orange-500' : 'text-gray-600'
                        }`} />
                      </div>
                    </motion.div>

                    {/* Selection Indicator - More visible and positioned better */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-orange-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-white rounded-full" />
                      </motion.div>
                    )}

                    {/* Category Text Below Circle - Always visible with better spacing */}
                    <motion.div
                      className="text-center mt-2 sm:mt-3"
                    >
                      <p className={`text-xs sm:text-sm md:text-base font-semibold ${
                        isSelected ? 'text-orange-500' : 'text-gray-700'
                      }`}>
                        {category.name}
                      </p>
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
              {selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Collection`}
            </h2>
            <p className="text-gray-600 text-center">
              {filteredProducts.length} premium chutney{filteredProducts.length !== 1 ? 's' : ''} ready to delight your taste buds
            </p>
          </motion.div>

          {/* Products Grid - Horizontal Scrolling Layout */}
          <Suspense fallback={<ShopLoader />}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="relative"
            >
              {/* Horizontal Scroll Container */}
              <div className="overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-3 sm:gap-4 lg:gap-6 min-w-max px-4">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex-shrink-0"
                      style={{
                        width: 'calc(25% - 0.5rem)', // 4 products per screen
                        minWidth: '140px', // Minimum width for small screens
                        maxWidth: '200px' // Maximum width for larger screens
                      }}
                    >
                      <ProductCard
                        product={product}
                        index={index}
                        onProductClick={handleProductClick}
                        onAddToCart={handleAddToCart}
                        addingToCart={addingToCart}
                        getSpiceLevelDisplay={getSpiceLevelDisplay}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Scroll Indicator */}
              <div className="flex justify-center mt-4 space-x-1">
                {Array.from({ length: Math.ceil(filteredProducts.length / 4) }).map((_, pageIndex) => (
                  <div
                    key={pageIndex}
                    className="w-2 h-2 rounded-full bg-gray-300"
                  />
                ))}
              </div>
            </motion.div>
          </Suspense>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ShopPage;

// Product Card Component
interface ProductCardProps {
  product: MockProduct;
  index: number;
  onProductClick: (product: MockProduct) => void;
  onAddToCart: (product: MockProduct, e: React.MouseEvent, quantity?: number) => void;
  addingToCart: string | null;
  getSpiceLevelDisplay: (spiceLevel: string) => { emoji: string; label: string; color: string };
}

function ProductCard({ product, index, onProductClick, onAddToCart, addingToCart, getSpiceLevelDisplay }: ProductCardProps) {
  const spiceDisplay = getSpiceLevelDisplay(product.spice_level || 'medium');
  const isOutOfStock = product.stock <= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.4,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{ 
        y: -4,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full touch-manipulation"
      onClick={() => onProductClick(product)}
    >
      {/* Product Image - Featured Card Style */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-50">
        <Image
          src={product.image_url || '/placeholder-food.svg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-food.svg';
          }}
        />
        
        {/* Spice Level Badge */}
        <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${spiceDisplay.color}`}>
          {spiceDisplay.emoji} {spiceDisplay.label}
        </div>

        {/* Stock Status */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
            <span className="bg-white text-gray-900 text-xs font-medium px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}

        {/* Stock Count */}
        {!isOutOfStock && product.stock < 10 && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-amber-500 text-white rounded-full text-xs font-semibold">
            {product.stock} left
          </div>
        )}
      </div>

      {/* Product Info - Featured Card Style */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 space-y-2">
        {/* Category Badge */}
        <div className="flex justify-start">
          <span className="inline-block bg-orange-50 text-orange-700 text-xs font-medium px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <div className="flex-1">
          <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="text-base sm:text-lg font-bold text-gray-900">
              ₹{product.price.toFixed(2)}
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => onAddToCart(product, e)}
            disabled={addingToCart === product.id.toString() || isOutOfStock}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-50 ${
              isOutOfStock 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg'
            }`}
            title={isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          >
            {addingToCart === product.id.toString() ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
            ) : isOutOfStock ? (
              <span className="text-xs">✕</span>
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
