"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import LoginModal from "./LoginModal";
import SearchBar from "./SearchBar";
import { ShoppingCart, Bell, Menu, X, Search, User, LogOut, LogIn, ChevronUp, ChevronDown } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholderText, setPlaceholderText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const fullPlaceholder = 'Shenga chutney';
  
  // Smooth scroll tracking for header animation
  const { scrollY } = useScroll();
  const scrollYSpring = useSpring(scrollY, { stiffness: 100, damping: 30, mass: 1 });
  
  useEffect(() => {
    const unsubscribe = scrollYSpring.on('change', (current) => {
      const direction = current > lastScrollY ? 'down' : 'up';
      
      if (direction === 'up' && !showHeader && current > 100) {
        setShowHeader(true);
      } else if (direction === 'down' && showHeader && current > 50) {
        setShowHeader(false);
      }
      
      setLastScrollY(current);
    });
    
    return () => unsubscribe();
  }, [scrollYSpring, lastScrollY, showHeader]);

  // Auto-typing effect for search placeholder
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const typingSpeed = 50;
    const pauseAtEnd = 500;
    const pauseAtStart = 200;
    
    const typeCharacter = () => {
      if (isTyping) {
        if (placeholderIndex < fullPlaceholder.length) {
          setPlaceholderText(fullPlaceholder.substring(0, placeholderIndex + 1));
          setPlaceholderIndex(prev => prev + 1);
          timer = setTimeout(typeCharacter, typingSpeed);
        } else {
          timer = setTimeout(() => {
            setIsTyping(false);
            setIsDeleting(true);
            typeCharacter();
          }, pauseAtEnd);
        }
      } else if (isDeleting) {
        if (placeholderIndex > 0) {
          setPlaceholderText(fullPlaceholder.substring(0, placeholderIndex - 1));
          setPlaceholderIndex(prev => prev - 1);
          timer = setTimeout(typeCharacter, typingSpeed / 3);
        } else {
          timer = setTimeout(() => {
            setIsDeleting(false);
            setIsTyping(true);
            typeCharacter();
          }, pauseAtStart);
        }
      }
    };

    timer = setTimeout(typeCharacter, 200);
    return () => clearTimeout(timer);
  }, [placeholderIndex, isTyping, isDeleting, fullPlaceholder]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query)}`);
    } else {
      router.push('/shop');
    }
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleLogout = async () => {
    await logout();
    setIsLoginModalOpen(false);
  };

  const handleNavigation = (item: string) => {
    switch (item) {
      case "Shop":
        router.push('/shop');
        break;
      case "About":
        router.push('/about');
        break;
      case "Contact":
        router.push('/contact');
        break;
      default:
        break;
    }
    setIsMobileMenuOpen(false);
  };

  const navigation = ["Shop", "About", "Contact"];

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.08
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const headerVariants = {
    hidden: {
      y: -120,
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1
    }
  };

  // Scroll indicators for visual feedback
  const scrollIndicators = {
    down: lastScrollY > 50 && !showHeader,
    up: scrollYSpring.get() > 100 && showHeader
  };

  return (
    <>
      {/* Floating Scroll Indicators */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: scrollIndicators.down ? 1 : 0,
          scale: scrollIndicators.down ? 1 : 0
        }}
        className="fixed top-1/2 right-4 z-40 flex flex-col space-y-2"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg"
        >
          <ChevronUp className="w-4 h-4" />
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        {showHeader && (
          <motion.header
            key="header"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
            style={{
              background: 'rgba(255, 255, 255, 0.95)'
            }}
          >
            {/* Animated Background Pattern */}
            <motion.div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, orange 0%, transparent 50%), radial-gradient(circle at 75% 75%, amber 0%, transparent 50%)`,
                backgroundSize: '100px 100px'
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <div className="container mx-auto px-4 py-3 relative z-10">
              <nav className="flex items-center justify-between min-h-[60px]">
                {/* Left Section - Logo with enhanced animations */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ 
                    scale: 1.05
                  }}
                  whileTap={{ 
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                  className="cursor-pointer select-none relative group"
                  onClick={() => router.push('/')}
                >
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
                      Ooru Foods
                    </span>
                  </div>
                  
                  {/* Animated underline */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 via-red-500 to-amber-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  
                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    whileHover={{ opacity: 0.3 }}
                  />
                </motion.div>

                {/* Center Section - Desktop Navigation */}
                <div className="hidden xl:flex items-center space-x-12 flex-1 justify-center">
                  {navigation.map((item, index) => (
                    <motion.button
                      key={item}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * (index + 2) }}
                      whileHover={{ 
                        y: -2,
                        scale: 1.05,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      whileTap={{ 
                        scale: 0.98,
                        transition: { duration: 0.1 }
                      }}
                      onClick={() => handleNavigation(item)}
                      className="relative text-gray-700 hover:text-orange-600 font-semibold text-lg transition-colors duration-300"
                    >
                      <span className="relative z-10">{item}</span>
                      
                      {/* Smooth background highlight */}
                      <motion.div
                        className="absolute inset-0 bg-orange-50 rounded-lg -mx-2 -my-1"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ 
                          scale: 1.1, 
                          opacity: 1,
                          transition: { duration: 0.3, ease: "easeOut" }
                        }}
                        exit={{ 
                          scale: 0, 
                          opacity: 0,
                          transition: { duration: 0.2 }
                        }}
                      />
                      
                      {/* Enhanced underline with gradient */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                      
                      {/* Animated dots */}
                      <motion.div
                        className="absolute -right-2 top-1/2 w-1 h-1 bg-orange-500 rounded-full opacity-0"
                        initial={{ scale: 0 }}
                        whileHover={{ 
                          opacity: 1,
                          scale: 1.2,
                          transition: { duration: 0.3, delay: 0.1 }
                        }}
                      />
                    </motion.button>
                  ))}
                </div>

                {/* Center Section - Enhanced Search Bar */}
                <div className="hidden md:flex flex-1 justify-center px-6">
                  <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xs">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={placeholderText}
                      className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-base bg-white/80 backdrop-blur-sm"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Search className="h-5 w-5 text-orange-500" />
                      </motion.div>
                    </div>
                    
                    {/* Animated search indicator */}
                    <motion.div
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    </motion.div>
                  </form>
                </div>

                {/* Right Section - Enhanced Cart and Auth */}
                <div className="flex items-center space-x-4">
                  {/* Search Icon for mobile */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all duration-200 md:hidden"
                    title="Menu"
                  >
                    <Search className="w-5 h-5" />
                  </motion.button>

                  {/* Enhanced Cart Icon */}
                  <motion.button
                    whileHover={{ 
                      scale: 1.2,
                      rotate: [0, 5, -5, 0],
                      transition: { 
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }
                    }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      y: [0, -2, 0],
                      boxShadow: [
                        "0 0 0px rgba(249, 115, 22, 0)",
                        "0 0 20px rgba(249, 115, 22, 0.3)",
                        "0 0 0px rgba(249, 115, 22, 0)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut"
                    }}
                    onClick={() => router.push('/cart')}
                    className="relative p-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all duration-300 group"
                  >
                    <ShoppingCart className="w-6 h-6 group-hover:animate-bounce" />
                    
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                          y: [0, -2, 0]
                        }}
                        transition={{
                          scale: { duration: 0.6, delay: 0.2 },
                          rotate: { duration: 1, delay: 0.4, repeat: Infinity },
                          y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full w-7 h-7 flex items-center justify-center font-medium shadow-lg border-2 border-white"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </motion.button>

                  {/* Enhanced Auth Section */}
                  {user ? (
                    <div className="relative group">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all duration-200"
                      >
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className="relative"
                        >
                          <User className="w-4 h-4" />
                          <motion.div
                            className="absolute -inset-2 bg-orange-400 rounded-full opacity-0"
                            whileHover={{ opacity: 0.2, scale: 1.5 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                        <span className="text-xs sm:text-sm md:text-base font-medium hidden sm:block">
                          {user.email?.split('@')[0]}
                        </span>
                      </motion.button>
                      
                      {/* Enhanced Dropdown Menu */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        whileHover={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-amber-100/50"
                          whileHover={{ opacity: 1 }}
                        />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white transition-all duration-300 flex items-center space-x-3 relative z-10"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsLoginModalOpen(true)}
                      className="p-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all duration-200 relative"
                      aria-label="Login"
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <User className="w-5 h-5" />
                      </motion.div>
                    </motion.button>
                  )}

                  {/* Enhanced Mobile Menu Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="xl:hidden p-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all duration-200 relative"
                  >
                    <motion.div
                      animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isMobileMenuOpen ? (
                        <X className="w-5 h-5" />
                      ) : (
                        <Menu className="w-5 h-5" />
                      )}
                    </motion.div>
                  </motion.button>
                </div>
              </nav>

              {/* Enhanced Mobile Search Bar */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0,
                  height: isMobileMenuOpen ? "auto" : 0
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="lg:hidden overflow-hidden"
              >
                <div className="py-4 border-t border-gray-200/50 relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-100/30 to-amber-100/30"
                    animate={{
                      opacity: isMobileMenuOpen ? [0.3, 0.6, 0.3] : 0.3
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <SearchBar onSearch={handleSearch} />
                </div>
              </motion.div>
            </div>

            {/* Enhanced Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -50 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -50 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="xl:hidden bg-white/98 backdrop-blur-xl border-t border-gray-200/50 relative overflow-hidden"
                >
                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, orange 0%, transparent 50%), radial-gradient(circle at 75% 75%, amber 0%, transparent 50%)`,
                      backgroundSize: '80px 80px'
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  <motion.div
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="px-4 py-6 space-y-4 relative z-10"
                  >
                    {navigation.map((item, index) => (
                      <motion.button
                        key={item}
                        variants={menuItemVariants}
                        onClick={() => handleNavigation(item)}
                        className="block w-full text-left px-6 py-4 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 rounded-2xl font-medium transition-all duration-300 shadow-lg"
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item}
                      </motion.button>
                    ))}
                    
                    {/* Enhanced Mobile Auth Actions */}
                    {user ? (
                      <motion.button
                        variants={menuItemVariants}
                        onClick={handleLogout}
                        className="block w-full text-left px-6 py-4 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 rounded-2xl font-medium transition-all duration-300 flex items-center space-x-3 shadow-lg"
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </motion.button>
                    ) : (
                      <motion.button
                        variants={menuItemVariants}
                        onClick={() => setIsLoginModalOpen(true)}
                        className="block w-full text-left px-6 py-4 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-2xl font-medium transition-all duration-300 flex items-center space-x-3 shadow-lg"
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        <User className="w-5 h-5" />
                        <span>Login</span>
                      </motion.button>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500 transform-origin-left z-50"
        style={{
          scaleX: scrollYSpring,
          background: 'linear-gradient(90deg, #f97316, #f59e0b, #eab308)'
        }}
      />
    </>
  );
}
