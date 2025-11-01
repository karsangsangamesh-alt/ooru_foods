"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './Toast';

interface CartItemCardProps {
  id: string;
  product: {
    name: string;
    price: number;
    image_url: string;
    category?: string;
    description?: string;
    stock?: number;
    is_vegetarian?: boolean;
    spice_level?: string;
    rating?: number;
    reviews?: number;
  };
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onSaveForLater?: (id: string) => void;
  isSavedForLater?: boolean;
}

export default function CartItemCard({
  id,
  product,
  quantity,
  onUpdateQuantity,
  onRemove,
  onSaveForLater,
  isSavedForLater = false
}: CartItemCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [tempQuantity, setTempQuantity] = useState(quantity);
  const { showToast } = useToast();

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    setTempQuantity(newQuantity);
    
    try {
      await onUpdateQuantity(id, newQuantity);
      showToast(`Quantity updated to ${newQuantity}`, 'success');
    } catch (error) {
      setTempQuantity(quantity); // Revert on error
      showToast('Failed to update quantity', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    try {
      await onRemove(id);
      showToast(`${product.name} removed from cart`, 'info');
    } catch (error) {
      showToast('Failed to remove item', 'error');
    }
  };

  const handleSaveForLater = async () => {
    if (onSaveForLater) {
      try {
        await onSaveForLater(id);
        showToast(`${product.name} saved for later`, 'info');
      } catch (error) {
        showToast('Failed to save item', 'error');
      }
    }
  };

  const formatSpiceLevel = (level?: string) => {
    const levels = {
      'mild': '🌶️',
      'medium': '🌶️🌶️',
      'hot': '🌶️🌶️🌶️',
      'extra_hot': '🌶️🌶️🌶️🌶️'
    };
    return levels[level as keyof typeof levels] || '🌶️';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
      whileHover={{ scale: 1.005 }}
      className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${
        isExpanded ? 'border-orange-200 shadow-xl' : 'border-gray-100 hover:border-orange-100 hover:shadow-xl'
      } overflow-hidden`}
    >
      {/* Main Card Content */}
      <div className="p-6">
        <div className="flex gap-6">
          {/* Product Image */}
          <motion.div 
            className="relative group flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative w-32 h-32 rounded-xl overflow-hidden shadow-md">
              <Image
                src={product.image_url || '/placeholder-food.svg'}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-food.svg';
                }}
              />
              
              {/* Overlay with quick actions */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/90 backdrop-blur-sm shadow-lg"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Button>
                </motion.div>
              </div>

              {/* Stock Badge */}
              <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold ${
                (product.stock || 0) > 10 
                  ? 'bg-green-500 text-white' 
                  : (product.stock || 0) > 0 
                  ? 'bg-yellow-500 text-white'
                  : 'bg-red-500 text-white'
              }`}>
                {(product.stock || 0) > 10 ? 'In Stock' : (product.stock || 0) > 0 ? 'Low Stock' : 'Out of Stock'}
              </div>

              {/* Spice Level Badge */}
              {product.spice_level && (
                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium">{formatSpiceLevel(product.spice_level)}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Details */}
          <div className="flex-grow min-w-0">
            {/* Title and Price Row */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-orange-600 font-bold text-2xl">₹{product.price}</span>
                  {quantity > 1 && (
                    <span className="text-gray-500 text-sm">× {quantity}</span>
                  )}
                </div>
                
                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating!) 
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
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews || 0} reviews)
                    </span>
                  </div>
                )}
              </div>
              
              {/* Total Price */}
              <div className="text-right">
                <motion.span 
                  key={quantity}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-gray-800"
                >
                  ₹{(product.price * quantity).toFixed(2)}
                </motion.span>
              </div>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Fresh
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Fast Delivery
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Quality Assured
              </motion.div>

              {product.is_vegetarian && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  🌱
                  Vegetarian
                </motion.div>
              )}
            </div>

            {/* Enhanced Quantity Controls */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-2 shadow-inner border border-orange-100">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1 || isUpdating}
                  className="w-10 h-10 rounded-lg bg-white shadow-sm border border-orange-200 flex items-center justify-center hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                  </svg>
                </motion.button>

                <motion.div
                  key={tempQuantity}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="mx-4 min-w-[60px] text-center"
                >
                  <Input
                    type="number"
                    value={tempQuantity}
                    onChange={(e) => setTempQuantity(parseInt(e.target.value) || 1)}
                    onBlur={() => {
                      if (tempQuantity !== quantity && tempQuantity >= 1) {
                        handleQuantityChange(tempQuantity);
                      } else {
                        setTempQuantity(quantity);
                      }
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleQuantityChange(Math.max(1, tempQuantity));
                        (e.target as HTMLInputElement).blur();
                      }
                    }}
                    className="w-16 text-center border-0 bg-transparent font-bold text-lg text-gray-800 focus:ring-0"
                    min={1}
                    disabled={isUpdating}
                  />
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={isUpdating}
                  className="w-10 h-10 rounded-lg bg-white shadow-sm border border-orange-200 flex items-center justify-center hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </motion.button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSaveForLater}
                    disabled={isUpdating}
                    className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:border-amber-300"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Save for Later
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemove}
                    disabled={isUpdating}
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Loading Indicator */}
            {isUpdating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-orange-600 text-sm"
              >
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600"></div>
                Updating quantity...
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Details Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50"
          >
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-gray-600 font-medium">Delivery</p>
                  <p className="text-green-600 font-semibold flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Tomorrow by 10 PM
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-gray-600 font-medium">Weight</p>
                  <p className="font-semibold">250g</p>
                </div>
                
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-gray-600 font-medium">Shelf Life</p>
                  <p className="font-semibold">7 days</p>
                </div>
                
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-gray-600 font-medium">Origin</p>
                  <p className="font-semibold">Tamil Nadu</p>
                </div>
              </div>
              
              {product.description && (
                <div className="mt-4 p-3 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
