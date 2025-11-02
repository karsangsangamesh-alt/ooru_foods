"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LoaderPinwheel } from "./LoaderPinwheel";

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  product_name: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Bangalore, Karnataka",
    rating: 5,
    comment: "The coconut chutney pudi reminds me of my grandmother's recipe. Absolutely authentic taste and the quality is outstanding. Fast delivery too!",
    avatar: "PS",
    product_name: "Coconut Chutney Pudi",
    date: "2024-01-15"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    comment: "Been ordering for 6 months now. The mint chutney is perfect with our daily meals. Kids love it too. Highly recommended!",
    avatar: "RK",
    product_name: "Mint Chutney Pudi",
    date: "2024-01-10"
  },
  {
    id: 3,
    name: "Anjali Reddy",
    location: "Hyderabad, Telangana",
    rating: 4,
    comment: "Authentic taste just like homemade. The coriander chutney has the perfect spice level. Will definitely order again.",
    avatar: "AR",
    product_name: "Coriander Chutney Pudi",
    date: "2024-01-08"
  },
  {
    id: 4,
    name: "Venkat Rao",
    location: "Mumbai, Maharashtra",
    rating: 5,
    comment: "Best chutney pudi in Mumbai! The red chili version is perfectly balanced. Packaging was excellent and arrived fresh.",
    avatar: "VR",
    product_name: "Red Chili Chutney Pudi",
    date: "2024-01-05"
  },
  {
    id: 5,
    name: "Sunita Patel",
    location: "Pune, Maharashtra",
    rating: 5,
    comment: "My family loves all varieties. The groundnut chutney is a hit with our guests. Quality is consistently excellent.",
    avatar: "SP",
    product_name: "Groundnut Chutney Pudi",
    date: "2024-01-03"
  },
  {
    id: 6,
    name: "Karthik Nair",
    location: "Kochi, Kerala",
    rating: 4,
    comment: "Great taste and authentic flavors. The curry leaves chutney is unique and delicious. Quick delivery service.",
    avatar: "KN",
    product_name: "Curry Leaves Chutney Pudi",
    date: "2023-12-30"
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-0.5">
      {[...Array(5)].map((_, i) => (
        <motion.svg
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          className={`w-3 h-3 md:w-4 md:h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { 
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      className="bg-gradient-to-br from-white via-gray-50 to-orange-50/30 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl hover:shadow-orange-100/60 transition-all duration-500 border border-orange-100/40 backdrop-blur-sm flex-shrink-0 w-[260px] sm:w-[280px] md:w-[350px] lg:w-[400px] xl:w-[440px] group relative overflow-hidden"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Floating sparkle effect */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-orange-300/40 rounded-full animate-pulse" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3 md:mb-6 relative z-10">
        <div className="flex items-center space-x-2 md:space-x-4">
          <motion.div 
            className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-base shadow-lg ring-2 md:ring-4 ring-white/20"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            {review.avatar}
          </motion.div>
          <div>
            <motion.h4 
              className="font-semibold text-gray-900 text-xs md:text-base mb-0.5 md:mb-1 line-clamp-1"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {review.name}
            </motion.h4>
            <motion.p 
              className="text-xs md:text-sm text-gray-500 flex items-center line-clamp-1"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <svg className="w-2 h-2 md:w-3 md:h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="truncate">{review.location}</span>
            </motion.p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* Product Info */}
      <motion.div 
        className="mb-4 md:mb-6 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <span className="inline-block bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 text-xs md:text-sm px-3 py-1.5 rounded-full border border-orange-200 shadow-sm">
          {review.product_name}
        </span>
      </motion.div>

      {/* Review Comment */}
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4 md:mb-6 line-clamp-4 relative">
          <span className="text-3xl text-orange-300/30 leading-none mr-2">"</span>
          {review.comment}
        </p>
      </motion.div>

      {/* Footer */}
      <motion.div 
        className="flex items-center justify-between pt-4 md:pt-6 border-t border-orange-100/60 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500">
          <motion.svg 
            className="w-3 h-3 md:w-4 md:h-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </motion.svg>
          <span>{new Date(review.date).toLocaleDateString('en-IN', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
          })}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.div
            className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full border border-green-200"
            whileHover={{ scale: 1.05 }}
          >
            <motion.svg 
              className="w-3 h-3 md:w-4 md:h-4 text-green-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </motion.svg>
            <span className="text-xs md:text-sm text-green-700 font-medium hidden sm:inline">Verified</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ReviewSection() {
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Create duplicated reviews for infinite scroll effect
  const extendedReviews = [...mockReviews, ...mockReviews, ...mockReviews, ...mockReviews];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Calculate responsive card size with increased spacing
  const getCardSize = () => {
    if (typeof window === 'undefined') return { width: 360, gap: 32 };
    
    const width = window.innerWidth;
    if (width < 640) return { width: 320, gap: 24 }; // sm
    if (width < 768) return { width: 360, gap: 28 }; // md
    if (width < 1024) return { width: 400, gap: 32 }; // lg
    if (width < 1280) return { width: 440, gap: 36 }; // xl
    return { width: 480, gap: 40 }; // 2xl
  };

  // Update container width on resize
  useEffect(() => {
    const updateDimensions = () => {
      const { width: cardWidth } = getCardSize();
      setContainerWidth(extendedReviews.length * cardWidth);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [extendedReviews.length]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const { width: cardWidth, gap } = getCardSize();
      const cardSize = cardWidth + gap;
      
      setOffset(prev => {
        const nextOffset = prev + cardSize;
        
        // Reset to beginning when we reach the end
        if (nextOffset >= cardSize * mockReviews.length) {
          return 0;
        }
        
        return nextOffset;
      });

      // Update current card index for touch events
      setCurrentCardIndex(prev => {
        const newIndex = prev + 1;
        return newIndex >= mockReviews.length ? 0 : newIndex;
      });
    }, 4000); // Slightly slower for smoother feel

    return () => clearInterval(interval);
  }, [isPaused]);

  // Touch/Swipe support for mobile with enhanced smoothness
  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsPaused(true);
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startX) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    
    if (Math.abs(diff) > 5) {
      setIsDragging(true);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!startX || !isDragging) {
      setIsPaused(false);
      setStartX(null);
      return;
    }

    const currentX = e.changedTouches[0].clientX;
    const diff = startX - currentX;
    const threshold = 50;

    const { width: cardWidth, gap } = getCardSize();
    const cardSize = cardWidth + gap;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next card
        setOffset(prev => prev + cardSize);
      } else {
        // Swipe right - previous card
        setOffset(prev => {
          const newOffset = prev - cardSize;
          if (newOffset < 0) {
            return cardSize * (mockReviews.length - 1);
          }
          return newOffset;
        });
      }
    }

    setStartX(null);
    setIsDragging(false);
    
    // Resume auto-scroll after delay
    setTimeout(() => setIsPaused(false), 6000);
  };

  if (loading) {
    return (
      <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-br from-orange-50/30 via-white to-amber-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div 
              className="h-6 md:h-8 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-2/3 md:w-1/3 mx-auto mb-4 animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
            <motion.div 
              className="h-3 md:h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-3/5 md:w-1/2 mx-auto animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            />
          </div>
          
          <div className="flex justify-center items-center py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <LoaderPinwheel width={40} height={40} stroke="#f97316" />
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-br from-orange-50/30 via-white to-amber-50/30 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <motion.span 
            className="inline-block bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs md:text-sm font-medium px-4 md:px-6 py-2 rounded-full mb-4 md:mb-6 shadow-sm border border-green-200/50"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Customer Stories
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            What Our Customers Say
          </motion.h2>
          <motion.p 
            className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Real reviews from satisfied customers who love our authentic chutney pudi
          </motion.p>
        </motion.div>

        {/* Mobile-First Horizontal Scroll Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-12 md:mb-16 lg:mb-20"
        >
          {/* Mobile Scroll Hint */}
          <div className="block lg:hidden text-center mb-4">
            <p className="text-xs text-gray-500 flex items-center justify-center space-x-2">
              <span>← Swipe to see our achievements →</span>
            </p>
          </div>
          
          {/* Mobile Horizontal Scroll */}
          <div className="block lg:hidden">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-2 snap-x snap-mandatory">
              {[
                { label: "Happy Customers", value: "10,000+", icon: "😊" },
                { label: "5-Star Reviews", value: "4.8/5", icon: "⭐" },
                { label: "Products Sold", value: "50,000+", icon: "📦" },
                { label: "Repeat Customers", value: "85%", icon: "🔄" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 0.5 + index * 0.1,
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 100
                  }}
                  className="flex-none w-[200px] snap-start"
                >
                  <motion.div 
                    className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 text-center group h-full"
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div 
                      className="text-3xl mb-3"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.icon}
                    </motion.div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 group-hover:text-orange-600 transition-colors">
                      {stat.label}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Desktop Grid Layout */}
          <div className="hidden lg:grid grid-cols-4 gap-8">
            {[
              { label: "Happy Customers", value: "10,000+", icon: "😊" },
              { label: "5-Star Reviews", value: "4.8/5", icon: "⭐" },
              { label: "Products Sold", value: "50,000+", icon: "📦" },
              { label: "Repeat Customers", value: "85%", icon: "🔄" }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="text-3xl mb-3"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Infinite Scroll Reviews */}
        <div 
          ref={containerRef}
          className="relative overflow-hidden touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="flex items-center"
            animate={{
              x: `-${offset}px`
            }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 25,
              mass: 0.8
            }}
            style={{
              width: `${containerWidth}px`
            }}
          >
            {extendedReviews.map((review, index) => (
              <div key={`${review.id}-${index}`} className="flex-shrink-0 px-4 md:px-6">
                <ReviewCard review={review} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Status Indicator */}
        <motion.div 
          className="flex justify-center mt-8 md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div 
            className={`flex items-center space-x-3 text-xs md:text-sm px-4 py-2 rounded-full border transition-all duration-500 ${
              isPaused 
                ? 'bg-gray-50 text-gray-500 border-gray-200' 
                : 'bg-orange-50 text-orange-600 border-orange-200 shadow-sm'
            }`}
          >
            <motion.div 
              className={`w-2 h-2 rounded-full ${isPaused ? 'bg-gray-400' : 'bg-orange-500'}`} 
              animate={!isPaused ? { 
                scale: [1, 1.2, 1], 
                opacity: [0.7, 1, 0.7] 
              } : {}}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            <span className="font-medium">
              {isPaused ? 'Paused - Touch to resume' : 'Continuously updating with new reviews'}
            </span>
          </div>
        </motion.div>

        {/* Enhanced Swipe Hint */}
        <motion.div 
          className="flex justify-center mt-4 md:mt-6 lg:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center space-x-3 text-xs text-gray-400 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-gray-200/50">
            <motion.svg 
              className="w-4 h-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
            <span className="font-medium">Swipe left or right to browse reviews</span>
          </div>
        </motion.div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-12 md:mt-16 lg:mt-20"
        >
          <motion.h3 
            className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            Join Our Happy Customers
          </motion.h3>
          <motion.p 
            className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            Experience the authentic taste that thousands of families love
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(249, 115, 22, 0.3), 0 10px 10px -5px rgba(249, 115, 22, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 1.1, duration: 0.3 }}
            className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-400/20"
            onClick={() => window.location.href = '/shop'}
          >
            Shop Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
