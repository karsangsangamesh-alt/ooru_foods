"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, Star, Heart, ChefHat, Flame, Zap, Eye, Plus } from 'lucide-react';

// Interface matching the actual database schema
interface TestProduct {
  id: number;
  name: string;
  description: string;
  story: string;
  price: number;
  original_price?: number;
  category: string;
  spice_level: string; // 'Medium' or 'Spicy'
  ingredients: string[];
  cooking_tips: string[];
  nutrition_facts: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  rating: number;
  reviews_count: number;
  tags: string[];
  in_stock: boolean;
  featured: boolean;
  is_vegetarian: boolean;
  created_at?: string;
  image_url?: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<TestProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<TestProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const router = useRouter();

  // Categories with circular layout
  const categories = [
    { 
      id: 'All', 
      name: 'All Products', 
      icon: ChefHat, 
      color: 'from-gray-400 to-gray-600',
      description: 'Explore our complete collection'
    },
    { 
      id: 'Medium', 
      name: 'Medium', 
      icon: Zap, 
      color: 'from-yellow-400 to-orange-500',
      description: 'Perfectly balanced flavors'
    },
    { 
      id: 'Spicy', 
      name: 'Spicy', 
      icon: Flame, 
      color: 'from-red-500 to-orange-600',
      description: 'For the adventurous taste'
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('test_products')
        .select('*')
        .eq('in_stock', true) // Use correct column name
        .order('featured', { ascending: false });

      if (fetchError) throw fetchError;
      
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => 
        product.spice_level.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    setFilteredProducts(filtered);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleProductClick = (product: TestProduct) => {
    router.push(`/product/${product.id}`);
  };

  const validateProductForCart = (product: TestProduct): void => {
    // Enhanced validation
    if (!product.id || !product.name) {
      throw new Error('Invalid product data');
    }
    
    if (typeof product.price !== 'number' || product.price <= 0) {
      throw new Error('Invalid product price');
    }

    if (!product.in_stock) {
      throw new Error('Product is out of stock');
    }
  };

  const handleAddToCart = async (product: TestProduct, e: React.MouseEvent, quantity: number = 1) => {
    e.stopPropagation();
    
    if (!product.in_stock) {
      setError('Product is currently out of stock');
      return;
    }
    
    setAddingToCart(product.id.toString());
    
    try {
      // Validate product data before adding to cart
      validateProductForCart(product);
      
      // Transform to match Supabase Product interface for cart compatibility
      const cartProduct = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image_url: product.image_url,
        category: product.category,
        spice_level: product.spice_level as 'mild' | 'medium' | 'hot' | 'extra_hot',
        is_vegetarian: product.is_vegetarian,
        stock: 1, // Default stock value for cart compatibility
        created_at: product.created_at
      };
      
      // Add to cart with proper error handling
      await addToCart(cartProduct, quantity);
      
      // Optional: Show success feedback (you could integrate with a toast library)
      console.log(`Added ${product.name} to cart`);
      
      // Remove artificial delay as it's not necessary and can frustrate users
      // await new Promise(resolve => setTimeout(resolve, 500));
      
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

  if (loading) {
    return (
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

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Taste the{' '}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Story
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
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

          {/* Circular Category Navigation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center items-center space-x-8 lg:space-x-16"
          >
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
                  className="relative group"
                  aria-label={`Select ${category.name} category`}
                >
                  {/* Outer Ring */}
                  <motion.div
                    className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br ${category.color} p-1 shadow-xl`}
                    animate={{
                      boxShadow: isSelected 
                        ? '0 0 30px rgba(249, 115, 22, 0.5)' 
                        : '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Inner Circle */}
                    <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center">
                      <Icon className={`w-8 h-8 md:w-10 md:h-10 mb-2 ${
                        isSelected ? 'text-orange-500' : 'text-gray-600'
                      }`} />
                      <span className={`text-sm md:text-base font-semibold ${
                        isSelected ? 'text-orange-500' : 'text-gray-700'
                      }`}>
                        {category.name}
                      </span>
                    </div>
                  </motion.div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                    >
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </motion.div>
                  )}

                  {/* Category Description */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isSelected ? 1 : 0 }}
                    className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                  >
                    <p className="text-xs text-gray-500 text-center max-w-32">
                      {category.description}
                    </p>
                  </motion.div>
                </motion.button>
              );
            })}
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

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onProductClick={handleProductClick}
                onAddToCart={handleAddToCart}
                addingToCart={addingToCart}
              />
            ))}
          </motion.div>

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

// Product Card Component
interface ProductCardProps {
  product: TestProduct;
  index: number;
  onProductClick: (product: TestProduct) => void;
  onAddToCart: (product: TestProduct, e: React.MouseEvent, quantity?: number) => void;
  addingToCart: string | null;
}

function ProductCard({ product, index, onProductClick, onAddToCart, addingToCart }: ProductCardProps) {
  const isSpicy = product.spice_level === 'Spicy';
  const isOutOfStock = !product.in_stock;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
      onClick={() => onProductClick(product)}
    >
      <div className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
        isOutOfStock ? 'opacity-75' : 'hover:shadow-2xl'
      }`}>
        {/* Product Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={product.image_url || '/placeholder-food.svg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            whileHover={{ scale: 1.05 }}
            loading="lazy"
          />
          
          {/* Spice Level Badge */}
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${
            isSpicy 
              ? 'bg-gradient-to-r from-red-500 to-orange-500' 
              : 'bg-gradient-to-r from-yellow-400 to-orange-400'
          }`}>
            {isSpicy ? '🔥 Spicy' : '⚡ Medium'}
          </div>

          {/* Stock Status */}
          {isOutOfStock && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-gray-500 text-white rounded-full text-xs font-semibold">
              Out of Stock
            </div>
          )}

          {/* Quick View Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white text-gray-800 px-4 py-2 rounded-full font-semibold flex items-center space-x-2"
              onClick={(e) => {
                e.stopPropagation();
                onProductClick(product);
              }}
            >
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
              {product.name}
            </h3>
            <Heart className="w-5 h-5 text-gray-300 hover:text-red-500 cursor-pointer transition-colors" />
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({product.reviews_count})
            </span>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-800">₹{product.price}</span>
              {product.original_price && (
                <span className="text-sm text-gray-500 line-through">₹{product.original_price}</span>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => onAddToCart(product, e)}
              disabled={addingToCart === product.id.toString() || isOutOfStock}
              className={`px-4 py-2 rounded-full font-semibold flex items-center space-x-2 transition-all duration-200 disabled:opacity-50 ${
                isOutOfStock 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
              }`}
            >
              {addingToCart === product.id.toString() ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : isOutOfStock ? (
                <span>Out of Stock</span>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
