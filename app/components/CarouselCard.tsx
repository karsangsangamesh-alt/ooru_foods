"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CarouselProduct } from '../lib/productService';

interface CarouselCardProps {
  product: CarouselProduct;
  index: number;
  isCenter: boolean;
  onCardClick?: () => void;
}

const getSpiceLevelColor = (level?: string) => {
  switch (level) {
    case 'mild': return 'bg-green-100 text-green-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'hot': return 'bg-orange-100 text-orange-800';
    case 'extra_hot': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getImageUrl = (imageUrl: string | null) => {
  // If no image_url provided, use placeholder
  if (!imageUrl) {
    return '/placeholder-food.svg';
  }
  return imageUrl;
};

export default function CarouselCard({ product, index, isCenter, onCardClick }: CarouselCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onCardClick) {
      onCardClick();
    } else {
      router.push(`/product/${product.id}`);
    }
  };

  // Simple card animation variants (removed 3D positioning)
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        duration: 0.6,
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="w-full h-full cursor-pointer"
      onClick={handleClick}
    >
      <div className={`
        relative w-full h-full rounded-2xl overflow-hidden shadow-lg
        transition-all duration-300 ease-out
      `}>
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <motion.img
            src={getImageUrl(product.image_url)}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-food.svg';
            }}
          />
        </div>

        {/* Gradient Overlay for Title */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
          {/* Spice Level Badge */}
          {product.spice_level && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-2"
            >
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getSpiceLevelColor(product.spice_level)}`}>
                {product.spice_level.replace('_', ' ').toUpperCase()}
              </span>
            </motion.div>
          )}

          {/* Product Name */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl font-bold mb-2 line-clamp-1"
          >
            {product.name}
          </motion.h3>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between"
          >
            <span className="text-xl md:text-2xl font-bold text-orange-300">
              ₹{product.price.toFixed(2)}
            </span>
            
            {/* Vegetarian Indicator */}
            {product.is_vegetarian && (
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">V</span>
              </div>
            )}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-gray-200 mt-2 line-clamp-2"
          >
            {product.description}
          </motion.p>
        </div>

        {/* Stock Status Overlay */}
        {product.stock <= 5 && product.stock > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium"
          >
            Only {product.stock} left!
          </motion.div>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center rounded-2xl">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
