"use client";

import { motion } from "framer-motion";
import Carousel3D from "./Carousel3D";
import { CarouselProduct } from "../lib/productService";

// Animation variants for interactive elements

// Framer Motion variants (simplified to avoid TypeScript conflicts)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 }
};

const slideInRight = {
  hidden: { opacity: 0, x: 100, scale: 0.8 },
  visible: { opacity: 1, x: 0, scale: 1 }
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    y: -2,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  },
  tap: {
    scale: 0.95
  }
};

// Animation variants for interactive elements

export default function HeroSection() {
  // Removed unused chutney rotation logic to improve performance

  const headlineWords = "Authentic South Indian Chutney Pudi".split(" ");

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fef9f7]"
    >
      {/* Simple Plain Background */}
      <div className="absolute inset-0 bg-[#fef9f7]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          
          {/* Left Side - Text Content */}
          <motion.div variants={slideInLeft} className="text-center lg:text-left space-y-8">
            {/* Animated Headline */}
            <motion.h1 className="font-['Poppins'] text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent leading-tight">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariants}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              variants={slideInLeft}
              className="font-['Inter'] text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-orange-50"
            >
              Handcrafted with traditional recipes and premium ingredients, our chutney pudi brings the authentic taste of South India to your table. Each batch is slow-roasted to perfection for that irresistible aroma and flavor.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={slideInLeft} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                variants={buttonVariants}
                whileHover={{
                  ...buttonVariants.hover,
                  backgroundColor: '#ea580c', // Darker orange on hover
                  transition: { 
                    duration: 0.3,
                    backgroundColor: { duration: 0.2 }
                  }
                }}
                whileTap="tap"
                className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-full font-['Inter'] font-semibold text-lg transition-all duration-300"
                onClick={() => window.location.href = '/shop'}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Shop Now</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                />
              </motion.button>
              
              <motion.button
                variants={buttonVariants}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  backgroundColor: '#f3f4f6',
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden bg-white border-2 border-gray-200 text-gray-800 px-8 py-4 rounded-full font-['Inter'] font-semibold text-lg transition-all duration-300 hover:border-orange-100"
                onClick={() => window.location.href = '/about'}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Our Story</span>
                  <motion.span
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✨
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Single Card Carousel */}
          <motion.div 
            variants={slideInRight}
            className="relative flex justify-center lg:justify-end"
          >
            <Carousel3D
              autoRotateInterval={5000}
              enableAutoRotate={true}
              onProductSelect={(product: CarouselProduct) => {
                // Navigate to product details page
                window.location.href = `/product/${product.id}`;
              }}
              className="w-full max-w-md lg:max-w-lg"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
