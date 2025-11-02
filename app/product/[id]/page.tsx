"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CarouselProduct, fetchRelatedProducts, fetchProductById } from '../../lib/productService';
import Image from 'next/image';
import { useCart } from '../../contexts/CartContext';
import Carousel3D from '../../components/Carousel3D';
import { Star, Heart, Clock, Users, Award, MapPin, ChefHat, Leaf, Sparkles, Utensils, Package, ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';

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
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('story');
  
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProductData() {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        console.log('🔍 Loading product with ID:', id);
        
        const productData = await fetchProductById(parseInt(id));
        console.log('📦 Fetched product data:', productData);

        if (!productData) {
          console.warn('⚠️ Product not found');
          setError('Product not found');
          setLoading(false);
          return;
        }

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
      
      setTimeout(() => {
        setAddingToCart(false);
      }, 2000);
    } catch (err) {
      setAddingToCart(false);
      console.error('Error adding to cart:', err);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
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

  const getSpiceLevelInfo = (spiceLevel: string) => {
    switch (spiceLevel) {
      case 'mild':
        return { icon: '🌱', bgClass: 'bg-green-500', text: 'Mild' };
      case 'medium':
        return { icon: '⚡', bgClass: 'bg-yellow-500', text: 'Medium' };
      case 'hot':
        return { icon: '🌶️🌶️', bgClass: 'bg-red-500', text: 'Hot' };
      case 'extra_hot':
        return { icon: '🌶️🌶️🌶️', bgClass: 'bg-red-600', text: 'Extra Hot' };
      default:
        return { icon: '⚡', bgClass: 'bg-yellow-500', text: 'Medium' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'This product could not be found.'}</p>
          <Link href="/shop">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
              Back to Shop
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const spiceInfo = getSpiceLevelInfo(product.spice_level);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 truncate mx-4">
            Product Details
          </h1>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Heart className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto bg-white">
        {/* Product Image Section */}
        <div className="relative">
          <div className="aspect-square bg-gray-100">
            <Image
              src={product.image_url || '/placeholder-food.svg'}
              alt={product.name}
              fill
              className="object-cover"
              onError={handleImageError}
            />
          </div>
          
          {/* Spice Level Badge */}
          <div className="absolute top-4 left-4">
            <div className={`${spiceInfo.bgClass} text-white px-3 py-1 rounded-full text-sm font-medium`}>
              {spiceInfo.icon} {spiceInfo.text}
            </div>
          </div>

          {/* Vegetarian Badge */}
          {product.is_vegetarian && (
            <div className="absolute top-4 right-4">
              <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                <Leaf className="w-3 h-3" />
                <span>Veg</span>
              </div>
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="p-4 space-y-4">
          {/* Category */}
          <div className="flex items-center justify-between">
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
              {product.category}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{product.rating || 4.5}</span>
              <span className="text-xs text-gray-400">({product.reviews_count || 127})</span>
            </div>
          </div>

          {/* Product Name */}
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Price Section */}
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-2xl font-bold text-gray-900">₹{product.price}</div>
              {product.original_price && (
                <div className="text-sm text-gray-500 line-through">₹{product.original_price}</div>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Stock</div>
              <div className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-t border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('story')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'story'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Story
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'ingredients'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Ingredients
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'nutrition'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Nutrition
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === 'story' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">About this product</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.story || product.long_description || product.description}
              </p>
              
              {/* Cooking Tips */}
              {product.cooking_tips && product.cooking_tips.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Cooking Tips</h4>
                  <div className="space-y-2">
                    {product.cooking_tips.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-gray-600 text-sm">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Ingredients</h3>
              {product.ingredients ? (
                <div className="space-y-2">
                  {product.ingredients.split(',').map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                      <span className="text-gray-600 text-sm">{ingredient.trim()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">Ingredients information not available.</p>
              )}
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Nutrition Facts</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                {Object.entries(product.nutrition_facts || {
                  calories: "85 kcal",
                  protein: "3.2g",
                  carbs: "12.1g", 
                  fat: "2.8g"
                }).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm capitalize">{key}</span>
                    <span className="text-gray-900 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quantity and Add to Cart Section */}
        <div className="border-t border-gray-200 p-4 space-y-4">
          {/* Quantity Selector */}
          <div className="flex items-center justify-between">
            <span className="text-gray-900 font-medium">Quantity</span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
              >
                <Minus className="w-4 h-4 text-gray-700" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Total Price */}
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Total Price</span>
            <span className="text-xl font-bold text-gray-900">₹{(product.price * quantity).toFixed(2)}</span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={addingToCart || !(product.in_stock ?? (product.stock > 0))}
            className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold text-base hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {addingToCart ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Adding to cart...</span>
              </>
            ) : !(product.in_stock ?? (product.stock > 0)) ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-md mx-auto bg-white mt-4">
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">You might also like</h3>
            <div className="grid grid-cols-2 gap-3">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  onClick={() => handleRelatedProductSelect(relatedProduct)}
                  className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="aspect-square bg-white rounded-md mb-2 overflow-hidden">
                    <Image
                      src={relatedProduct.image_url || '/placeholder-food.svg'}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                    {relatedProduct.name}
                  </h4>
                  <p className="text-sm text-gray-600">₹{relatedProduct.price}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
