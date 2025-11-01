"use client";

import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ProductRecommendations, { RecommendationProduct as Product } from '../components/ProductRecommendations';
import { useToast } from '../components/Toast';
import { Product as SupabaseProduct } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

// Define the union type for the onAddToCart parameter
type AnyProduct = SupabaseProduct | Product;

export default function CartPage() {
  const { items, loading, updateQuantity, removeFromCart, total, checkout, addToCart } = useCart();
  const { showToast } = useToast();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [savedForLater, setSavedForLater] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [addingItem, setAddingItem] = useState<string | null>(null);

  const shippingThreshold = 500;
  const progress = Math.min((total / shippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(shippingThreshold - total, 0);

  const handleAddToCartFromRecommendations = async (product: AnyProduct) => {
    setAddingItem(product.id.toString());
    try {
      // Convert to SupabaseProduct for addToCart
      const supabaseProduct: SupabaseProduct = {
        id: product.id as number,
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        image_url: product.image_url,
        stock: product.stock,
        is_vegetarian: product.is_vegetarian,
        spice_level: product.spice_level
      };
      await addToCart(supabaseProduct, 1);
      showToast(`${product.name} added to cart successfully!`, 'success');
    } catch (error) {
      showToast('Failed to add item to cart. Please try again.', 'error');
      console.error('Error adding to cart:', error);
    } finally {
      setAddingItem(null);
    }
  };

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      setCheckoutError(null);
      
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect to success page
      showToast('Order placed successfully!', 'success');
      router.push('/order-success');
    } catch (error) {
      setCheckoutError('Failed to complete checkout. Please try again.');
      showToast('Checkout failed. Please try again.', 'error');
      console.error(error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const applyPromoCode = () => {
    // Simple promo code logic for demo
    const validCodes = {
      'SAVE10': 10,
      'WELCOME20': 20,
      'FIRST15': 15
    };
    
    if (validCodes[promoCode as keyof typeof validCodes]) {
      setDiscount(validCodes[promoCode as keyof typeof validCodes]);
      setAppliedPromo(promoCode);
      showToast(`Promo code applied! ${validCodes[promoCode as keyof typeof validCodes]}% off`, 'success');
    } else {
      showToast('Invalid promo code', 'error');
    }
  };

  const removePromoCode = () => {
    setDiscount(0);
    setAppliedPromo(null);
    setPromoCode('');
    showToast('Promo code removed', 'info');
  };

  const toggleExpandedItem = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const saveForLater = (itemId: string) => {
    if (!savedForLater.includes(itemId)) {
      setSavedForLater(prev => [...prev, itemId]);
      showToast('Item saved for later', 'info');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
            Your Shopping Cart
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fresh, authentic flavors from South India delivered to your doorstep
          </p>
        </motion.div>

        {items.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.68 4.24M7 13v8a2 2 0 002 2h8a2 2 0 002-2v-8M7 13v8" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h3>
              <p className="text-gray-600 mb-8">Discover our delicious range of chutneys and traditional dishes</p>
              <Link href="/shop">
                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Start Shopping
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Free Shipping Progress */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Free Shipping Progress</h3>
                  <span className="text-sm text-gray-500">₹{remainingForFreeShipping} to go</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div 
                      className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full relative"
                      style={{ width: `${progress}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    >
                      <div className="absolute right-0 top-0 w-3 h-3 bg-white rounded-full border-2 border-orange-500 shadow-md"></div>
                    </motion.div>
                  </div>
                </div>
                {remainingForFreeShipping > 0 ? (
                  <p className="text-sm text-gray-600 mt-2">
                    Add ₹{remainingForFreeShipping} more for free shipping! 🚚
                  </p>
                ) : (
                  <p className="text-sm text-green-600 mt-2 font-medium">
                    🎉 Congratulations! You've qualified for free shipping!
                  </p>
                )}
              </motion.div>

              {/* Dynamic Product Recommendations */}
              <ProductRecommendations 
                cartItems={items.map(item => ({
                  id: item.id || '',
                  product: {
                    id: item.id || '',
                    name: item.product?.name || 'Product',
                    price: item.product?.price || 0,
                    category: item.product?.category || 'general',
                    description: item.product?.description || '',
                    image_url: item.product?.image_url || '/placeholder-food.svg',
                    stock: item.product?.stock || 0,
                    is_vegetarian: item.product?.is_vegetarian || true,
                    spice_level: item.product?.spice_level || 'mild',
                    isPopular: false,
                    isNew: false,
                    inStock: true,
                    rating: 4.5,
                    reviews: 0
                  },
                  quantity: item.quantity || 1,
                }))}
                onAddToCart={handleAddToCartFromRecommendations}
                loadingItemId={addingItem}
              />

              {/* Cart Items */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm mr-3">
                      {items.length} {items.length === 1 ? 'Item' : 'Items'}
                    </span>
                    Shopping Cart
                  </h3>
                </div>

                <div className="divide-y divide-gray-100">
                  <AnimatePresence>
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 hover:bg-gray-50 transition-colors duration-300"
                      >
                        <div className="flex gap-6">
                          {/* Product Image - Wider */}
                          <div className="flex-shrink-0 relative group">
                            {item.product.image_url ? (
                              <Image 
                                src={item.product.image_url}
                                alt={item.product.name}
                                width={120}
                                height={120}
                                className="w-32 h-32 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300"
                              />
                            ) : (
                              <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center shadow-md">
                                <span className="text-gray-400 text-sm">No Image</span>
                              </div>
                            )}
                            {/* Quick actions overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all duration-300 flex items-center justify-center">
                              <Button
                                variant="outline"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 bg-white shadow-lg"
                                onClick={() => toggleExpandedItem(item.id!)}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </Button>
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="flex-grow">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-bold text-lg text-gray-800 mb-1">{item.product.name}</h4>
                                <p className="text-orange-600 font-semibold text-lg">₹{item.product.price}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-xl text-gray-800">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                                {item.quantity > 1 && (
                                  <p className="text-sm text-gray-500">{item.quantity} × ₹{item.product.price}</p>
                                )}
                              </div>
                            </div>

                            {/* Enhanced Product Features */}
                            <div className="mb-4">
                              <motion.div 
                                className="flex flex-wrap gap-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <motion.div
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 px-3 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span className="text-sm font-semibold text-green-800">✓ Fresh</span>
                                </motion.div>
                                
                                <motion.div
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 px-3 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  </svg>
                                  <span className="text-sm font-semibold text-blue-800">🚚 Express Delivery</span>
                                </motion.div>
                                
                                <motion.div
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 px-3 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                  </svg>
                                  <span className="text-sm font-semibold text-amber-800">⭐ Premium Quality</span>
                                </motion.div>
                              </motion.div>
                            </div>

                            {/* Enhanced Quantity Controls & Actions */}
                            <div className="space-y-3">
                              {/* Quantity Control */}
                              <motion.div 
                                className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-3 border border-orange-200"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-semibold text-gray-700">Quantity:</span>
                                  <div className="flex items-center bg-white rounded-lg shadow-inner border border-orange-200">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="h-9 w-9 p-0 hover:bg-orange-50 hover:border-orange-300 rounded-l-lg transition-all duration-200"
                                      onClick={() => item.id && updateQuantity(item.id, item.quantity - 1)}
                                      disabled={item.quantity <= 1}
                                      aria-label="Decrease quantity"
                                    >
                                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                      </svg>
                                    </Button>
                                    <Input
                                      type="number"
                                      className="w-16 text-center border-0 bg-transparent font-bold text-lg text-gray-800 focus:ring-0 focus:outline-none"
                                      value={item.quantity}
                                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                        item.id && updateQuantity(item.id, Math.max(1, parseInt(e.target.value || '1')))
                                      }
                                      min={1}
                                    />
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="h-9 w-9 p-0 hover:bg-orange-50 hover:border-orange-300 rounded-r-lg transition-all duration-200"
                                      onClick={() => item.id && updateQuantity(item.id, item.quantity + 1)}
                                      aria-label="Increase quantity"
                                    >
                                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                      </svg>
                                    </Button>
                                  </div>
                                </div>
                                
                                <div className="text-right">
                                  <p className="text-lg font-bold text-gray-800">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                                  <p className="text-xs text-gray-500">₹{item.product.price} each</p>
                                </div>
                              </motion.div>

                              {/* Action Buttons */}
                              <motion.div 
                                className="flex gap-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.15 }}
                              >
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 text-amber-700 border-amber-200 hover:bg-amber-50 hover:border-amber-300 hover:shadow-md transition-all duration-200 font-medium"
                                  onClick={() => item.id && saveForLater(item.id)}
                                >
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                  </svg>
                                  Save for Later
                                </Button>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 hover:shadow-md transition-all duration-200 font-medium"
                                  onClick={() => item.id && removeFromCart(item.id)}
                                >
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  Remove
                                </Button>
                              </motion.div>
                            </div>

                            {/* Additional Product Info */}
                            <AnimatePresence>
                              {expandedItems.includes(item.id!) && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-4 p-4 bg-gray-50 rounded-lg"
                                >
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <p className="text-gray-600">Delivery</p>
                                      <p className="font-medium text-green-600">Tomorrow by 10 PM</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Stock</p>
                                      <p className="font-medium text-green-600">Available</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Weight</p>
                                      <p className="font-medium">250g</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Shelf Life</p>
                                      <p className="font-medium">7 days</p>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Saved for Later Section */}
              {savedForLater.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Saved for Later</h3>
                  <div className="text-sm text-gray-600">
                    You have {savedForLater.length} item(s) saved. 
                    <Button variant="link" className="p-0 ml-2 text-orange-600">
                      View all saved items
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-6 sticky top-8 border border-orange-100"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-full text-sm mr-3">Order</span>
                  Summary
                </h3>

                {/* Promo Code Section */}
                <div className="mb-6">
                  {appliedPromo ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-800">Promo Applied</p>
                          <p className="text-xs text-green-600">{appliedPromo} - {discount}% off</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={removePromoCode}
                          className="text-green-600 hover:text-green-700 border-0 hover:bg-transparent"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2 mb-4">
                      <Input
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-grow"
                      />
                      <Button 
                        onClick={applyPromoCode}
                        variant="outline"
                        disabled={!promoCode}
                      >
                        Apply
                      </Button>
                    </div>
                  )}
                </div>

                {/* Order Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedPromo} - {discount}%)</span>
                      <span>-₹{(total * discount / 100).toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={total >= shippingThreshold ? "text-green-600 font-medium" : ""}>
                      {total >= shippingThreshold ? 'FREE' : '₹49'}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between font-bold text-xl text-gray-800">
                      <span>Total</span>
                      <span>₹{(total - (total * discount / 100) + (total >= shippingThreshold ? 0 : 49)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods Preview */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Payment Methods</h4>
                  <div className="flex gap-2">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-xs text-blue-600 text-center">
                      💳 Card
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-xs text-green-600 text-center">
                      💰 UPI
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 text-xs text-orange-600 text-center">
                      🚚 COD
                    </div>
                  </div>
                </div>

                {/* Security & Trust Indicators */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-800">Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-sm text-gray-600">Lightning-fast delivery</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button 
                  className="w-full mb-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Proceed to Checkout
                    </div>
                  )}
                </Button>

                {checkoutError && (
                  <div className="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-lg p-3">
                    {checkoutError}
                  </div>
                )}

                {/* Terms and Support */}
                <div className="text-center text-sm text-gray-500 mt-6">
                  <p>By checking out, you agree to our</p>
                  <div className="flex justify-center gap-2 mt-1">
                    <Link href="/terms-of-service" className="text-orange-600 hover:underline">Terms of Service</Link>
                    <span>•</span>
                    <Link href="/privacy-policy" className="text-orange-600 hover:underline">Privacy Policy</Link>
                  </div>
                </div>

                {/* Customer Support */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-800">Need Help?</p>
                      <p className="text-xs text-blue-600">24/7 Customer Support</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                      Chat Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
