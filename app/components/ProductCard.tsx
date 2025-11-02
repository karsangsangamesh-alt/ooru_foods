"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Product as SupabaseProduct } from '../../lib/supabaseClient';
import { RecommendationProduct as ProductRecommendationsProduct } from './ProductRecommendations';
import { useCart } from '../contexts/CartContext';

type AnyProduct = SupabaseProduct | ProductRecommendationsProduct;

interface ProductCardProps {
  product: AnyProduct;
  index: number;
  onAddToCart?: (product: AnyProduct) => Promise<void> | void;
  loadingItemId?: string | null;
}

const ProductCard = React.memo(function ProductCard({ product, index, onAddToCart, loadingItemId }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      try {
        setIsAdding(true);
        await onAddToCart(product);
      } finally {
        setIsAdding(false);
      }
    } else {
      if ('created_at' in product || typeof product.id === 'number') {
        addToCart(product as SupabaseProduct);
      }
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/placeholder-food.svg';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative h-48 bg-gray-200">
          <Image
            src={product.image_url || '/placeholder-food.svg'}
            alt={product.name}
            className="w-full h-full object-cover"
            width={300}
            height={200}
            onError={handleImageError}
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
          <button
            onClick={handleAddToCart}
            className={`absolute bottom-2 right-2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors flex items-center justify-center ${(isAdding && loadingItemId === product.id.toString()) ? 'opacity-75' : ''}`}
            disabled={product.stock === 0 || (isAdding && loadingItemId === product.id.toString())}
            aria-label="Add to cart"
          >
            {isAdding && loadingItemId === product.id.toString() ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            )}
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-orange-600 transition-colors cursor-pointer">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-orange-600">
              ₹{product.price.toFixed(2)}
            </span>
            
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {product.category}
              </span>
              
              <span className={`text-xs px-2 py-1 rounded-full ${
                product.stock > 10 
                  ? 'text-green-600 bg-green-100' 
                  : product.stock > 0 
                  ? 'text-yellow-600 bg-yellow-100'
                  : 'text-red-600 bg-red-100'
              }`}>
                {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4 pt-0">
        <motion.button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`w-full py-2 px-4 rounded-full font-medium transition-colors duration-200 ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 text-white'
          }`}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.div>
  );
});

export default ProductCard;
