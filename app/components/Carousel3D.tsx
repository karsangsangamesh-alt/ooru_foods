"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCarouselProducts, CarouselProduct } from '../lib/productService';
import CarouselCard from './CarouselCard';

interface Carousel3DProps {
  autoRotateInterval?: number;
  enableAutoRotate?: boolean;
  onProductSelect?: (product: CarouselProduct) => void;
  className?: string;
}

export default function Carousel3D({
  autoRotateInterval = 6000, // Increased for mobile to reduce accidental navigation
  enableAutoRotate = true,
  onProductSelect,
  className = ''
}: Carousel3DProps) {
  const [products, setProducts] = useState<CarouselProduct[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Mobile detection
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const fetchedProducts = await fetchCarouselProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching carousel products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Auto-rotation functionality
  useEffect(() => {
    if (!enableAutoRotate || products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [enableAutoRotate, products.length, autoRotateInterval]);

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    } else if (isRightSwipe) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    }
  };

  // Mouse drag handlers for desktop
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStart) return;
    
    const distance = dragStart - e.clientX;
    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
      } else {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
      }
      setIsDragging(false);
      setDragStart(null);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  // Navigation function
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Handle product selection
  const handleProductSelect = (product: CarouselProduct) => {
    if (onProductSelect) {
      onProductSelect(product);
    }
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-80 md:h-96 lg:h-[500px] xl:h-[550px] ${className}`}>
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"
          />
          <p className="text-gray-600">Loading delicious chutneys...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={`flex items-center justify-center h-80 md:h-96 lg:h-[500px] xl:h-[550px] ${className}`}>
        <div className="text-center">
          <p className="text-gray-600 mb-4">No products available</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={carouselRef}
      className={`relative ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Mobile-First Container with Optimized Heights */}
      <div className={`relative ${
        isMobile ? 'h-64 sm:h-72' : 'h-80 md:h-96 lg:h-[500px] xl:h-[550px]'
      } overflow-hidden`}>
        {/* Card Container with Mobile-First Responsive Sizing */}
        <div className="relative h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: isMobile ? 50 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isMobile ? -50 : -100 }}
              transition={{ 
                duration: isMobile ? 0.4 : 0.5,
                ease: "easeInOut"
              }}
              className="absolute inset-0 flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8"
            >
              {/* Mobile-First Responsive Card Sizing */}
              <div className={`w-full h-full ${
                isMobile 
                  ? 'max-w-[280px] sm:max-w-[320px]' 
                  : 'max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg'
              }`}>
                <CarouselCard
                  product={products[currentIndex]}
                  onCardClick={() => handleProductSelect(products[currentIndex])}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile-First Touch-Friendly Indicator Dots */}
        <div className={`absolute left-1/2 transform -translate-x-1/2 ${
          isMobile ? 'bottom-3' : 'bottom-4'
        } flex space-x-2 sm:space-x-3`}>
          {products.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`${
                isMobile ? 'h-3 min-w-[44px]' : 'h-2'
              } rounded-full transition-all duration-200 touch-manipulation ${
                index === currentIndex
                  ? `${isMobile ? 'w-6' : 'w-8'} bg-orange-500`
                  : `${isMobile ? 'w-3' : 'w-2'} bg-white/50 hover:bg-white/70`
              }`}
              title={`Go to slide ${index + 1}`}
              aria-label={`Navigate to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile-First Swipe Hint */}
        {!isMobile && (
          <div className="absolute top-4 right-4 text-white/70 text-xs hidden md:block">
            Swipe to navigate
          </div>
        )}
        
        {/* Mobile Touch Feedback */}
        {isMobile && (
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/60 text-xs text-center">
            Swipe to explore
          </div>
        )}
      </div>
    </div>
  );
}
