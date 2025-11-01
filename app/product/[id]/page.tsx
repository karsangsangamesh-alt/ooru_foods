"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CarouselProduct } from '../../lib/productService';
import Image from 'next/image';
import { useCart } from '../../contexts/CartContext';
import Carousel3D from '../../components/Carousel3D';
import { Star, Heart, Clock, Users, Award, MapPin, ChefHat, Leaf, Sparkles } from 'lucide-react';

interface TestProduct {
  id: number;
  name: string;
  description: string;
  story: string;
  price: number;
  original_price?: number;
  category: string;
  spice_level: string;
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

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [product, setProduct] = useState<TestProduct | null>(null);
  const [relatedProducts] = useState<CarouselProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeStorySection, setActiveStorySection] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProductData() {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Mock data for demonstration - replace with actual API call
        const mockProduct: TestProduct = {
          id: parseInt(id),
          name: "Traditional Coconut Chutney",
          description: "Fresh coconut chutney with green chilies and curry leaves - perfect companion for idli and dosa",
          story: "Our grandmother's secret recipe passed down through four generations. In the coastal villages of Kerala, coconut trees sway as they have for centuries, and this chutney captures the essence of those peaceful mornings. Made with freshly grated coconut, this recipe has been refined by my great-grandmother who believed that the best flavors come from patience and love. Every bite takes you back to those traditional breakfast tables where families gather to share stories and start their day together.",
          price: 120.00,
          original_price: 150.00,
          category: "Traditional",
          spice_level: "Medium",
          ingredients: ["Fresh coconut", "Green chilies", "Curry leaves", "Ginger", "Salt", "Yogurt"],
          cooking_tips: ["Grind coconut while fresh for best flavor", "Serve with hot idlis or dosas", "Add tempering with mustard seeds for extra flavor"],
          nutrition_facts: {
            calories: "89",
            protein: "2.1g",
            carbs: "4.2g",
            fat: "7.8g"
          },
          rating: 4.8,
          reviews_count: 156,
          tags: ["traditional", "breakfast", "kerala", "vegetarian"],
          in_stock: true,
          featured: true,
          is_vegetarian: true,
          image_url: "/coconut-chutney.png" // FIXED: Changed from /assets/coconut-chutney.png to /coconut-chutney.png
        };
        
        setProduct(mockProduct);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        console.error('Error fetching product:', err);
        setLoading(false);
      }
    }

    loadProductData();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || addingToCart) return;
    
    setAddingToCart(true);
    
    try {
      // Transform to match Supabase Product interface for cart compatibility
      const cartProduct = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image_url: product.image_url || null,
        category: product.category,
        spice_level: product.spice_level as 'mild' | 'medium' | 'hot' | 'extra_hot',
        is_vegetarian: product.is_vegetarian,
        stock: 1,
        created_at: product.created_at
      };
      
      await addToCart(cartProduct, quantity);
      
      // Show success feedback
      setTimeout(() => {
        setAddingToCart(false);
      }, 2000);
    } catch (err) {
      setAddingToCart(false);
      console.error('Error adding to cart:', err);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) { // Max 10 for premium products
      setQuantity(newQuantity);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/placeholder-food.svg';
  };

  const handleRelatedProductSelect = (selectedProduct: CarouselProduct) => {
    router.push(`/product/${selectedProduct.id}`);
  };

  const storySections = [
    { icon: ChefHat, title: "The Heritage", subtitle: "4 Generations of Love" },
    { icon: MapPin, title: "The Origin", subtitle: "Kerala's Coastal Villages" },
    { icon: Users, title: "The Family", subtitle: "Grandmother's Secret Recipe" },
    { icon: Heart, title: "The Tradition", subtitle: "Morning Breakfast Stories" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative w-32 h-32 mx-auto mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 border-4 border-orange-200 border-t-orange-500 rounded-full"
            />
            <ChefHat className="absolute inset-0 m-auto w-12 h-12 text-orange-500" />
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-gray-800 mb-4"
          >
            Unveiling the Story...
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 text-lg"
          >
            Preparing an unforgettable culinary journey for you
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8"
        >
          <ChefHat className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Story Not Found</h2>
          <p className="text-gray-600 mb-8 text-lg">{error || 'This culinary tale seems to have gone missing.'}</p>
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300"
            >
              Explore Other Stories
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50"
      >
        {/* Hero Section - Story First */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zM10 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '80px 80px'
            }} />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
              {/* Story Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Breadcrumb */}
                <motion.nav 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center space-x-2 text-sm text-gray-600"
                >
                  <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                  <span>/</span>
                  <Link href="/shop" className="hover:text-orange-600 transition-colors">Shop</Link>
                  <span>/</span>
                  <span className="text-orange-600 font-medium">{product.name}</span>
                </motion.nav>

                {/* Product Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center space-x-4"
                >
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span>Heritage Recipe</span>
                  </span>
                  {product.is_vegetarian && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Leaf className="w-4 h-4" />
                      <span>100% Vegetarian</span>
                    </span>
                  )}
                </motion.div>

                {/* Title with Animation */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 leading-tight">
                    {product.name.split(' ').map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className={index === product.name.split(' ').length - 1 ? 'text-orange-600' : ''}
                      >
                        {word}{' '}
                      </motion.span>
                    ))}
                  </h1>
                </motion.div>

                {/* Story Excerpt */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-6"
                >
                  <p className="text-xl text-gray-700 leading-relaxed font-medium">
                    {product.story.substring(0, 200)}...
                  </p>
                  
                  {/* Story Progress Indicators */}
                  <div className="flex items-center space-x-4">
                    {storySections.map((section, index) => {
                      const Icon = section.icon;
                      return (
                        <motion.div
                          key={index}
                          className={`flex flex-col items-center space-y-2 cursor-pointer transition-all duration-300 ${
                            activeStorySection === index ? 'text-orange-600' : 'text-gray-400'
                          }`}
                          onClick={() => setActiveStorySection(index)}
                          whileHover={{ scale: 1.1 }}
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            activeStorySection === index 
                              ? 'bg-orange-100 border-2 border-orange-500' 
                              : 'bg-gray-100'
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="text-center">
                            <p className="text-xs font-medium">{section.title}</p>
                            <p className="text-xs text-gray-500">{section.subtitle}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Rating & Reviews */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-800">{product.rating}</span>
                  <span className="text-gray-600">({product.reviews_count} stories shared)</span>
                </motion.div>
              </motion.div>

              {/* Product Visual */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                {/* Main Product Image */}
                <div className="relative group">
                  <motion.div
                    className="relative bg-white rounded-3xl shadow-2xl overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {!imageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100">
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-16 h-16 bg-orange-300 rounded-full"
                        />
                      </div>
                    )}
                    
                    <motion.img
                      src={product.image_url || '/placeholder-food.svg'}
                      alt={product.name}
                      className={`w-full h-96 object-cover ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
                      onError={handleImageError}
                      onLoad={() => setImageLoaded(true)}
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    />

                    {/* Floating Elements */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 }}
                      className="absolute top-6 right-6"
                    >
                      <button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isWishlisted 
                            ? 'bg-red-500 text-white shadow-lg' 
                            : 'bg-white text-gray-400 hover:text-red-500 shadow-md'
                        }`}
                      >
                        <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>
                    </motion.div>

                    {/* Spice Level Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="absolute top-6 left-6"
                    >
                      <div className={`px-4 py-2 rounded-full text-white font-semibold text-sm ${
                        product.spice_level === 'Spicy' 
                          ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                          : 'bg-gradient-to-r from-yellow-400 to-orange-400'
                      }`}>
                        {product.spice_level === 'Spicy' ? '🔥 Spicy' : '⚡ Medium'}
                      </div>
                    </motion.div>

                    {/* Heritage Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 }}
                      className="absolute bottom-6 left-6"
                    >
                      <div className="bg-black bg-opacity-70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>4 Generations</span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Floating Price Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                    className="absolute -bottom-8 -right-8 bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-2xl shadow-xl"
                  >
                    <div className="text-center">
                      <p className="text-sm opacity-90">Starting from</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-3xl font-bold">₹{product.price}</span>
                        {product.original_price && (
                          <span className="text-sm opacity-75 line-through">₹{product.original_price}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center space-y-2 text-gray-400"
            >
              <span className="text-sm">Discover the Story</span>
              <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                The Story Behind Every Bite
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {product.story}
              </p>
            </motion.div>

            {/* Story Timeline */}
            <div className="max-w-4xl mx-auto">
              {storySections.map((section, index) => {
                const Icon = section.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`flex items-center mb-16 ${
                      isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    <div className="flex-1 lg:px-8">
                      <div className={`bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl ${
                        isEven ? 'lg:text-right' : 'lg:text-left'
                      }`}>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h3>
                        <p className="text-gray-600 leading-relaxed">
                          {index === 0 && "Crafted with love and refined over four generations, each recipe carries the essence of our family's culinary heritage."}
                          {index === 1 && "Born in the lush coastal villages of Kerala, where coconut trees dance in the tropical breeze and spices tell stories of the land."}
                          {index === 2 && "Our grandmother's secret recipe, passed down through generations, represents the heart of our family's cooking tradition."}
                          {index === 3 && "Every morning, families gather around tables filled with these chutneys, creating moments of connection and joy."}
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      {index < storySections.length - 1 && (
                        <div className="hidden lg:block absolute top-20 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-orange-300 to-red-300" />
                      )}
                    </div>
                    
                    <div className="flex-1 lg:px-8" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Premium Experience Section */}
        <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                What Makes It Special
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Ingredients */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Premium Ingredients</h3>
                <div className="space-y-3">
                  {product.ingredients.map((ingredient, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      <span className="text-gray-700">{ingredient}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Chef Tips */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Chef's Secrets</h3>
                <div className="space-y-4">
                  {product.cooking_tips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500"
                    >
                      <p className="text-gray-700 italic">&ldquo;{tip}&rdquo;</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Nutrition */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Nutrition Facts</h3>
                <div className="space-y-4">
                  {Object.entries(product.nutrition_facts).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-gray-600 capitalize font-medium">{key}</span>
                      <span className="text-gray-800 font-bold">{value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Purchase Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zM0 20c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20S0 31.046 0 20z'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                  }} />
                </div>

                <div className="relative z-10">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                      Bring This Story Home
                    </h2>
                    <p className="text-xl opacity-90">
                      Experience the tradition that has brought families together for generations
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Product Summary */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-white rounded-xl overflow-hidden">
                          <Image 
                            src={product.image_url || '/placeholder-food.svg'}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                            priority
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{product.name}</h3>
                          <p className="opacity-80">Heritage Recipe • 4 Generations</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold">₹{product.price}</div>
                          <div className="text-sm opacity-75">per jar</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <div className="text-sm opacity-75">{product.rating} rating</div>
                        </div>
                      </div>
                    </div>

                    {/* Purchase Controls */}
                    <div className="space-y-8">
                      {/* Quantity Selector */}
                      <div>
                        <label className="block text-lg font-semibold mb-4">Quantity</label>
                        <div className="flex items-center space-x-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={quantity <= 1}
                            className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl ${
                              quantity <= 1
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-white text-orange-500 hover:bg-orange-50'
                            }`}
                          >
                            -
                          </motion.button>
                          
                          <motion.div
                            className="w-20 h-14 bg-white rounded-xl flex items-center justify-center"
                            whileFocus={{ scale: 1.05 }}
                          >
                            <span className="text-2xl font-bold text-gray-800">{quantity}</span>
                          </motion.div>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleQuantityChange(quantity + 1)}
                            disabled={quantity >= 10}
                            className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl ${
                              quantity >= 10
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-white text-orange-500 hover:bg-orange-50'
                            }`}
                          >
                            +
                          </motion.button>
                        </div>
                      </div>

                      {/* Total Price */}
                      <div className="text-center">
                        <p className="text-lg opacity-90 mb-2">Total</p>
                        <div className="text-4xl font-bold">₹{(product.price * quantity).toFixed(2)}</div>
                        {product.original_price && (
                          <div className="text-lg opacity-75 line-through">₹{(product.original_price * quantity).toFixed(2)}</div>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <motion.button
                        onClick={handleAddToCart}
                        disabled={addingToCart || !product.in_stock}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-6 px-8 rounded-2xl font-bold text-xl transition-all duration-300 ${
                          !product.in_stock
                            ? 'bg-gray-400 cursor-not-allowed'
                            : addingToCart
                            ? 'bg-green-600 cursor-wait'
                            : 'bg-white text-orange-600 hover:bg-orange-50 shadow-xl hover:shadow-2xl'
                        }`}
                      >
                        {addingToCart ? (
                          <div className="flex items-center justify-center space-x-3">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span>Adding to your story...</span>
                          </div>
                        ) : !product.in_stock ? (
                          'Currently Unavailable'
                        ) : (
                          `Add ${quantity} to Cart`
                        )}
                      </motion.button>

                      {/* Trust Indicators */}
                      <div className="flex justify-center space-x-8 text-sm opacity-80">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                          <span>Fresh Daily</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                          <span>No Preservatives</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                          <span>Family Recipe</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                  More Stories to Explore
                </h2>
                <p className="text-xl text-gray-600">
                  Discover other culinary tales waiting to be told in your kitchen
                </p>
              </motion.div>
              
              <div className="max-w-4xl mx-auto">
                <Carousel3D
                  autoRotateInterval={6000}
                  enableAutoRotate={true}
                  onProductSelect={handleRelatedProductSelect}
                  className="w-full"
                />
              </div>
            </div>
          </section>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
