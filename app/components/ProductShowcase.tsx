"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { fetchCarouselProducts } from "../lib/productService";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  spice_level?: 'mild' | 'medium' | 'hot' | 'extra_hot';
  is_vegetarian?: boolean;
  stock: number;
  image_url: string | null;
  created_at?: string;
}

const SPICE_LEVELS = {
  mild: { emoji: '🌱', label: 'Mild', color: 'bg-green-100 text-green-800' },
  medium: { emoji: '🌶️', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  hot: { emoji: '🌶️🌶️', label: 'Hot', color: 'bg-orange-100 text-orange-800' },
  extra_hot: { emoji: '🌶️🌶️🌶️', label: 'Extra Hot', color: 'bg-red-100 text-red-800' }
};

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  // Using SPICE_LEVELS directly where needed
  
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
    >
      {/* Mobile-First Image Container */}
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden bg-gray-50">
        <Image
          src={product.image_url || '/placeholder-food.svg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={index < 3}
        />

        {/* Mobile-First Stock indicator */}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
            <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full">
              {product.stock} left
            </span>
          </div>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
            <span className="bg-white text-gray-900 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      {/* Mobile-First Content Area */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 space-y-2">
        {/* Mobile-First Category badge */}
        <div className="flex justify-start">
          <span className="inline-block bg-orange-50 text-orange-700 text-xs font-medium px-2 sm:px-2.5 py-1 rounded-full">
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

        {/* Price and CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
              ₹{product.price.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">Starting price</div>
          </div>
          
          <Link 
            href={`/product/${product.id}`}
            className="inline-flex items-center justify-center w-10 h-10 text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200 min-w-[44px] min-h-[44px] touch-manipulation"
            title="View Details"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProductShowcase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching carousel products from mock data...');
      
      // Use mock data service
      const products = await fetchCarouselProducts();
      
      console.log('Fetched products:', products);
      console.log('Number of products found:', products.length);
      
      if (products.length === 0) {
        setError('No products available at the moment.');
      } else {
        setProducts(products);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(`Error loading products: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="h-8 sm:h-10 bg-gray-200 rounded-full w-3/4 md:w-1/3 mx-auto mb-3 sm:mb-4"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2 md:w-1/4 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border border-gray-100">
                <div className="h-48 sm:h-64 md:h-72 lg:h-80 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg mb-3 sm:mb-4 animate-pulse"></div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="h-5 sm:h-6 bg-gray-200 rounded-full w-3/4 mx-auto"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded-full w-1/2 mx-auto"></div>
                  <div className="h-8 sm:h-10 bg-gray-200 rounded-lg w-20 sm:w-24 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg inline-block max-w-2xl">
            <h3 className="text-lg font-medium mb-2">Error loading products</h3>
            <p className="mb-4">{error}</p>
            <button 
              onClick={fetchProducts}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <span className="inline-block bg-orange-100 text-orange-700 text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-full mb-3 sm:mb-4">
            Handcrafted Delicacies
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Featured Chutneys
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Discover authentic South Indian flavors with our handcrafted chutneys, made from traditional recipes and the freshest ingredients
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {products.length > 0 ? (
            <>
              {/* Mobile-First Horizontal Scroll Container */}
              <div className="block lg:hidden">
                {/* Mobile Scroll Hint */}
                <div className="text-center mb-4">
                  <p className="text-xs text-gray-500 flex items-center justify-center space-x-2">
                    <span>← Scroll to explore more chutneys →</span>
                  </p>
                </div>
                
                {/* Horizontal Scroll Products */}
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-2 snap-x snap-mandatory">
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.1, 
                        duration: 0.5,
                        type: 'spring',
                        stiffness: 100
                      }}
                      className="flex-none w-[280px] snap-start"
                    >
                      <ProductCard product={product} index={index} />
                    </motion.div>
                  ))}
                </div>
                
                {/* Mobile Scroll Indicators */}
                <div className="flex justify-center mt-6 space-x-2">
                  {products.map((_, index) => (
                    <div
                      key={index}
                      className="w-2 h-2 rounded-full bg-orange-200"
                    />
                  ))}
                </div>
              </div>

              {/* Desktop Grid Layout */}
              <div className="hidden lg:grid grid-cols-3 gap-6 lg:gap-8">
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center border border-gray-100"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4.5L4 7m16 0l-8 4.5M4 7v10l8 4.5m0-14.5v14.5m8-10l-8 4.5m0 0L4 17" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No Products Available</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                We're currently updating our menu. Please check back soon for our delicious chutneys!
              </p>
              <button
                onClick={fetchProducts}
                className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </motion.div>
          )}
        </motion.div>
        
        {products.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mt-8 sm:mt-12 lg:mt-16"
          >
            <Link 
              href="/shop" 
              className="group inline-flex items-center px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 min-w-[44px] min-h-[44px]"
            >
              <span>Explore All Chutneys</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
