"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CarouselProduct } from '../lib/productService';
import { getImageUrl } from '../../lib/supabaseImage';

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

const CarouselCard = React.memo(({ 
  product, 
  onCardClick 
}: Omit<CarouselCardProps, 'index' | 'isCenter'>) => {

  const router = useRouter();
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>(
    product.image_url ? 'loading' : 'error'
  );
  const [showFallback, setShowFallback] = useState(!product.image_url);
  
  // Get the image URL - the getImageUrl function now handles all the logic
  const imageUrl = product.image_url ? getImageUrl(product.image_url) : '/placeholder-food.svg';

  const handleClick = () => {
    if (onCardClick) {
      onCardClick();
    } else {
      router.push(`/product/${product.id}`);
    }
  };

  // Simple card animation variants
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
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center overflow-hidden">
{showFallback || !product.image_url ? (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="text-gray-500 font-medium">No Image Available</div>
                <div className="text-xs mt-1 text-gray-400">{product.name}</div>
              </div>
            </div>
          ) : (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-opacity duration-300"
              onLoadingComplete={() => setImageStatus('loaded')}
              onError={() => {
                if (imageUrl.includes('supabase.co')) {
                  console.warn('Image not found in Supabase storage:', imageUrl);
                } else {
                  console.error('Failed to load image:', imageUrl);
                }
                setImageStatus('error');
                setShowFallback(true);
              }}
              style={{
                opacity: imageStatus === 'loaded' ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
              }}
              priority={false}
              unoptimized={process.env.NODE_ENV !== 'production'} // Optimize in production
            />
          )}
          
          {/* Loading overlay */}
          {imageStatus === 'loading' && (
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <div className="animate-pulse text-gray-500">Loading...</div>
            </div>
          )}
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
});

// Add display name for debugging
CarouselCard.displayName = 'CarouselCard';

export default CarouselCard;
