"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CarouselProduct, fetchRelatedProducts, fetchProductById } from '../../lib/productService';
import Image from 'next/image';
import { useCart } from '../../contexts/CartContext';
import Carousel3D from '../../components/Carousel3D';
import { Star, Heart, Clock, Users, Award, MapPin, ChefHat, Leaf, Sparkles, Utensils, Package } from 'lucide-react';

interface MockProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  spice_level: 'mild' | 'medium' | 'hot' | 'extra_hot';
  is_vegetarian: boolean;
  stock: number;
  image_url: string | null;
  created_at?: string;
  long_description?: string;
  ingredients?: string;
  nutritional_info?: string;
  tags?: string[];
  // Additional properties for product details
  rating?: number;
  reviews_count?: number;
  story?: string;
  original_price?: number;
  in_stock?: boolean;
  cooking_tips?: string[];
  nutrition_facts?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [product, setProduct] = useState<MockProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<CarouselProduct[]>([]);
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
        console.log('🔍 Loading product with ID:', id);
        
        // Fetch product data from mock service
        const productData = await fetchProductById(parseInt(id));
        console.log('📦 Fetched product data:', productData);

        if (!productData) {
          console.warn('⚠️ Product not found');
          setError('Product not found');
          setLoading(false);
          return;
        }

        // Transform to match our interface with defaults
        const transformedProduct: MockProduct = {
          id: productData.id,
          name: productData.name,
          description: productData.description,
          price: productData.price,
          category: productData.category,
          spice_level: productData.spice_level || 'medium',
          is_vegetarian: productData.is_vegetarian || true,
          stock: productData.stock || 50,
          image_url: productData.image_url,
          created_at: productData.created_at,
          long_description: productData.long_description,
          ingredients: productData.ingredients,
          nutritional_info: productData.nutritional_info,
          tags: productData.tags || [],
          // Add defaults for missing properties
          rating: 4.5,
          reviews_count: 127,
          story: productData.long_description || productData.description,
          original_price: undefined,
          in_stock: productData.stock > 0,
          cooking_tips: [
            "Best enjoyed fresh with hot rice or dosas",
            "Store in refrigerator after opening",
            "Let it come to room temperature before serving"
          ],
          nutrition_facts: {
            calories: "85 kcal",
            protein: "3.2g",
            carbs: "12.1g", 
            fat: "2.8g"
          }
        };
        
        console.log('✅ Transformed product:', transformedProduct);
        setProduct(transformedProduct);

        // Fetch related products
        const relatedData = await fetchRelatedProducts(parseInt(id), productData.category);
        console.log('🔗 Related products:', relatedData);
        setRelatedProducts(relatedData);

        setLoading(false);
      } catch (err) {
        console.error('❌ Error loading product:', err);
        setError('Failed to load product details');
        setLoading(false);
      }
    }

    loadProductData();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || addingToCart) return;
    
    setAddingToCart(true);
    
    try {
      // Transform to match cart interface
      const cartProduct = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image_url: product.image_url,
        category: product.category,
        spice_level: product.spice_level || 'medium',
        is_vegetarian: product.is_vegetarian || true,
        stock: product.stock,
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
    { icon: ChefHat, title: "The Heritage", subtitle: "Family Recipe" },
    { icon: MapPin, title: "The Origin", subtitle: "Traditional Roots" },
    { icon: Users, title: "The Family", subtitle: "Generational Knowledge" },
    { icon: Heart, title: "The Tradition", subtitle: "Culinary Legacy" }
  ];

  // Dynamic spice level styling
  const getSpiceLevelInfo = (spiceLevel: string) => {
    switch (spiceLevel) {
      case 'mild':
        return { icon: '🌱', bgClass: 'bg-gradient-to-r from-green-400 to-emerald-500', text: 'Mild' };
      case 'medium':
        return { icon: '⚡', bgClass: 'bg-gradient-to-r from-yellow-400 to-orange-400', text: 'Medium' };
      case 'hot':
        return { icon: '🌶️🌶️', bgClass: 'bg-gradient-to-r from-red-500 to-orange-500', text: 'Hot' };
      case 'extra_hot':
        return { icon: '🌶️🌶️🌶️', bgClass: 'bg-gradient-to-r from-red-600 to-red-700', text: 'Extra Hot' };
      default:
        return { icon: '⚡', bgClass: 'bg-gradient-to-r from-yellow-400 to-orange-400', text: 'Medium' };
    }
  };

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

  const spiceInfo = getSpiceLevelInfo(product.spice_level);

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
        {/* Mobile-First Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zM10 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '80px 80px'
            }} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center min-h-screen py-8 sm:py-12 lg:py-20">
              {/* Mobile-First Story Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1"
              >
                {/* Mobile-First Breadcrumb */}
                <motion.nav 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600"
                >
                  <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                  <span>/</span>
                  <Link href="/shop" className="hover:text-orange-600 transition-colors">Shop</Link>
                  <span>/</span>
                  <span className="text-orange-600 font-medium truncate">{product.name}</span>
                </motion.nav>

                {/* Mobile-First Product Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap items-center gap-2 sm:gap-4"
                >
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-2">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Heritage Recipe</span>
                  </span>
                  {product.is_vegetarian && (
                    <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center space-x-1">
                      <Leaf className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>100% Vegetarian</span>
                    </span>
                  )}
                </motion.div>

                {/* Mobile-First Title */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 leading-tight">
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

                {/* Mobile-First Story Excerpt */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed font-medium">
                    {product.story && product.story.length > 150 
                      ? `${product.story.substring(0, 150)}...` 
                      : product.story || product.description
                    }
                  </p>
                  
                  {/* Mobile-Friendly Story Progress Indicators */}
                  <div className="flex justify-center sm:justify-start items-center space-x-3 sm:space-x-4 overflow-x-auto pb-2">
                    {storySections.map((section, index) => {
                      const Icon = section.icon;
                      return (
                        <motion.div
                          key={index}
                          className={`flex flex-col items-center space-y-1 sm:space-y-2 cursor-pointer transition-all duration-300 min-w-[60px] ${
                            activeStorySection === index ? 'text-orange-600' : 'text-gray-400'
                          }`}
                          onClick={() => setActiveStorySection(index)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            activeStorySection === index 
                              ? 'bg-orange-100 border-2 border-orange-500' 
                              : 'bg-gray-100'
                          }`}>
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                          </div>
                          <div className="text-center hidden sm:block">
                            <p className="text-xs font-medium">{section.title}</p>
                            <p className="text-xs text-gray-500">{section.subtitle}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Mobile-First Rating & Reviews */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex items-center space-x-2 sm:space-x-4"
                >
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          i < Math.floor(product.rating || 4.5) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">{product.rating || 4.5}</span>
                  <span className="text-xs sm:text-sm text-gray-600">({product.reviews_count || 127} stories shared)</span>
                </motion.div>
              </motion.div>

              {/* Mobile-First Product Visual */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative order-1 lg:order-2"
              >
                {/* Mobile-First Main Product Image */}
                <div className="relative group">
                  <motion.div
                    className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                  >
                    {!imageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100">
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-300 rounded-full"
                        />
                      </div>
                    )}
                    
                    <motion.img
                      src={product.image_url || '/placeholder-food.svg'}
                      alt={product.name}
                      className={`w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
                      onError={handleImageError}
                      onLoad={() => setImageLoaded(true)}
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    />

                    {/* Mobile-First Floating Elements */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 }}
                      className="absolute top-4 right-4"
                    >
                      <button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isWishlisted 
                            ? 'bg-red-500 text-white shadow-lg' 
                            : 'bg-white text-gray-400 hover:text-red-500 shadow-md'
                        }`}
                      >
                        <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>
                    </motion.div>

                    {/* Mobile-First Spice Level Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="absolute top-4 left-4"
                    >
                      <div className={`${spiceInfo.bgClass} px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white font-semibold text-xs sm:text-sm flex items-center space-x-1`}>
                        <span>{spiceInfo.icon}</span>
                        <span>{spiceInfo.text}</span>
                      </div>
                    </motion.div>

                    {/* Mobile-First Heritage Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 }}
                      className="absolute bottom-4 left-4"
                    >
                      <div className="bg-black bg-opacity-70 backdrop-blur-sm text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium flex items-center space-x-1 sm:space-x-2">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Traditional Recipe</span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Mobile-First Floating Price Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                    className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 bg-gradient-to-br from-orange-500 to-red-500 text-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl"
                  >
                    <div className="text-center">
                      <p className="text-xs sm:text-sm opacity-90">Starting from</p>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <span className="text-xl sm:text-2xl lg:text-3xl font-bold">₹{product.price}</span>
                        {product.original_price && (
                          <span className="text-xs sm:text-sm opacity-75 line-through">₹{product.original_price}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile-First Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center space-y-1 sm:space-y-2 text-gray-400"
            >
              <span className="text-xs sm:text-sm">Discover the Story</span>
              <div className="w-4 h-6 sm:w-6 sm:h-10 border-2 border-gray-300 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-2 sm:h-3 bg-gray-400 rounded-full mt-1 sm:mt-2"
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
                {product.story || product.long_description || `${product.description} This authentic recipe represents the rich culinary heritage passed down through generations, bringing the true flavors of tradition to your table.`}
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
                          {index === 0 && "Crafted with love and attention to detail, this recipe represents the essence of traditional cooking methods passed down through generations."}
                          {index === 1 && "Born from the rich culinary traditions of South India, where spices and flavors come together to create something truly special."}
                          {index === 2 && "Our family recipe, perfected over time, captures the authentic taste that can only come from years of tradition and expertise."}
                          {index === 3 && "Every jar brings the same love and care that has been poured into this recipe for decades, ensuring each bite is a journey through time."}
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
                  {product.ingredients ? (
                    product.ingredients.split(',').map((ingredient, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        <span className="text-gray-700">{ingredient.trim()}</span>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">Fresh, quality ingredients carefully selected for authentic taste.</p>
                  )}
                </div>
              </motion.div>

              {/* Chef's Secrets */}
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
                <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Chef&apos;s Secrets</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Serving Suggestion",
                      tip: product.cooking_tips?.[0] || "Best enjoyed fresh with hot rice or dosas",
                      icon: <Utensils className="w-6 h-6 text-orange-500" />,
                      bg: "from-orange-50 to-orange-100"
                    },
                    {
                      title: "Storage Tips",
                      tip: product.cooking_tips?.[1] || "Store in refrigerator after opening and consume within 5 days",
                      icon: <Package className="w-6 h-6 text-amber-500" />,
                      bg: "from-amber-50 to-amber-100"
                    },
                    {
                      title: "Pro Tip",
                      tip: product.cooking_tips?.[2] || "For best flavor, let it come to room temperature before serving",
                      icon: <Sparkles className="w-6 h-6 text-yellow-500" />,
                      bg: "from-yellow-50 to-yellow-100"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`bg-gradient-to-br ${item.bg} p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col`}
                    >
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                        {item.icon}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h4>
                      <p className="text-gray-600 flex-1">&ldquo;{item.tip}&rdquo;</p>
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
                  {Object.entries(product.nutrition_facts || {
                    calories: "85 kcal",
                    protein: "3.2g",
                    carbs: "12.1g", 
                    fat: "2.8g"
                  }).map(([key, value], index) => (
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

        {/* Mobile-First Enhanced Purchase Section */}
        <section className="py-8 sm:py-12 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
                  {/* Mobile-First Product Information Side */}
                  <div className="relative bg-gradient-to-br from-orange-50 to-red-50 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                    {/* Mobile-First Decorative Elements */}
                    <div className="hidden md:block absolute top-6 right-6 w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20 blur-xl" />
                    <div className="hidden md:block absolute bottom-6 left-6 w-20 h-20 lg:w-28 lg:h-28 bg-gradient-to-br from-red-200 to-orange-200 rounded-full opacity-20 blur-xl" />
                    
                    <div className="relative z-10 space-y-4 sm:space-y-6">
                      {/* Mobile-First Product Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.2 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap items-center gap-2 sm:gap-3"
                      >
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-1 sm:space-x-2 shadow-lg">
                          <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Heritage Recipe</span>
                        </div>
                        {product.is_vegetarian && (
                          <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center space-x-1">
                            <Leaf className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>100% Vegetarian</span>
                          </div>
                        )}
                      </motion.div>
                      
                      {/* Mobile-First Product Image */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="w-full flex justify-center bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden mb-4 sm:mb-6 p-3 sm:p-4 lg:p-6"
                      >
                        <div className="relative w-full max-w-[200px] sm:max-w-[280px] md:max-w-[350px] aspect-square mx-auto">
                          <Image 
                            src={product.image_url || '/placeholder-food.svg'}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 40vw"
                            className="object-contain drop-shadow-lg"
                            priority
                            quality={100}
                          />
                        </div>
                      </motion.div>

                      {/* Mobile-First Product Title */}
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 leading-tight"
                      >
                        {product.name}
                      </motion.h2>

                      {/* Mobile-First Product Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed"
                      >
                        {product.description}
                      </motion.p>
                      
                      {/* Mobile-First Rating */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6"
                      >
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                i < Math.floor(product.rating || 4.5) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">{product.rating || 4.5}</span>
                        <span className="text-xs sm:text-sm text-gray-600">({product.reviews_count || 127} reviews)</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Mobile-First Purchase Controls Side */}
                  <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center space-y-4 sm:space-y-6">
                    {/* Mobile-First Quantity Selector */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="w-full"
                    >
                      <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
                        <label className="block text-base sm:text-lg font-semibold text-gray-800">Quantity</label>
                        <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={quantity <= 1}
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl transition-all duration-200 ${
                              quantity <= 1
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm'
                            }`}
                          >
                            -
                          </motion.button>
                          
                          <div className="w-16 h-12 sm:w-20 sm:h-14 bg-gray-50 border-2 border-gray-200 rounded-xl flex items-center justify-center">
                            <span className="text-xl sm:text-2xl font-bold text-gray-800">{quantity}</span>
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuantityChange(quantity + 1)}
                            disabled={quantity >= 10}
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl transition-all duration-200 ${
                              quantity >= 10
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm'
                            }`}
                          >
                            +
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>

                    {/* Mobile-First Total Price */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-center p-3 sm:p-4 bg-gray-50 rounded-xl"
                    >
                      <p className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-2">Total Price</p>
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">₹{(product.price * quantity).toFixed(2)}</div>
                    </motion.div>

                    {/* Mobile-First Add to Cart Button */}
                    <motion.button
                      onClick={handleAddToCart}
                      disabled={addingToCart || !(product.in_stock ?? (product.stock > 0))}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full py-3 sm:py-4 md:py-6 px-4 sm:px-6 md:px-8 rounded-xl font-bold text-sm sm:text-lg md:text-xl transition-all duration-300 shadow-lg min-h-[48px] ${
                        !(product.in_stock ?? (product.stock > 0))
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : addingToCart
                          ? 'bg-green-600 text-white cursor-wait'
                          : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-xl hover:shadow-2xl'
                      }`}
                    >
                      {addingToCart ? (
                        <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span className="text-sm sm:text-base">Adding to cart...</span>
                        </div>
                      ) : !(product.in_stock ?? (product.stock > 0)) ? (
                        'Out of Stock'
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.68 4.24M7 13v8a2 2 0 002 2h8a2 2 0 002-2v-8M7 13v8" />
                          </svg>
                          <span className="text-sm sm:text-base">Add {quantity} to Cart</span>
                        </div>
                      )}
                    </motion.button>

                    {/* Mobile-First Trust Indicators */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="mt-4 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-center"
                    >
                      <div className="flex flex-col items-center space-y-1 sm:space-y-2 p-2 sm:p-3 bg-green-50 rounded-lg">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-green-800">Fresh Daily</span>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-1 sm:space-y-2 p-2 sm:p-3 bg-blue-50 rounded-lg">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-blue-800">No Preservatives</span>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-1 sm:space-y-2 p-2 sm:p-3 bg-orange-50 rounded-lg">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-orange-800">Family Recipe</span>
                      </div>
                    </motion.div>
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
