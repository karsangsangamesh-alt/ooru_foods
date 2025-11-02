"use client";

import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ProductRecommendations, { RecommendationProduct } from '../components/ProductRecommendations';
import { useToast } from '../components/Toast';
import { Product as SupabaseProduct } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

// Define the union type that ProductRecommendations expects
type AnyProduct = SupabaseProduct | RecommendationProduct;

export default function CartPage() {
  const { items, loading, updateQuantity, removeFromCart, total, addToCart } = useCart();
  const { showToast } = useToast();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [addingItem, setAddingItem] = useState<string | null>(null);

  const shippingThreshold = 500;
  const progress = Math.min((total / shippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(shippingThreshold - total, 0);

  const handleAddToCartFromRecommendations = async (product: AnyProduct) => {
    setAddingItem(product.id.toString());
    try {
      // Convert to SupabaseProduct for addToCart with safe property access
      const supabaseProduct: SupabaseProduct = {
        id: product.id as number,
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        image_url: product.image_url || null,
        stock: product.stock,
        is_vegetarian: true,
        spice_level: 'medium'
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

  // Removed unused toggleExpandedItem and saveForLater functions

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
                    🎉 Congratulations! You&apos;ve qualified for free shipping!
                  </p>
                )}
              </motion.div>

              {/* Dynamic Product Recommendations */}
              <ProductRecommendations 
                cartItems={items.map(item => ({
                  id: item.id,
                  product: {
                    ...item.product,
                    image_url: item.product.image_url || '/placeholder-food.svg',
                    // Add mock values for LocalProduct properties
                    reviews: item.product.rating || 0,
                    inStock: true,
                    spice_level: (item.product.spice_level as 'mild' | 'medium' | 'hot' | 'extra_hot') || 'medium',
                    rating: item.product.rating || 0
                  },
                  quantity: item.quantity
                }))}
                onAddToCart={handleAddToCartFromRecommendations}
                loadingItemId={addingItem}
              />

              {/* Cart Items - Horizontal Layout */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800">
                    Cart Items ({items.length})
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
                        <div className="flex gap-6 items-center">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            {item.product.image_url ? (
                              <Image 
                                src={item.product.image_url}
                                alt={item.product.name}
                                width={80}
                                height={80}
                                className="w-20 h-20 object-cover rounded-lg"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/placeholder-food.svg';
                                }}
                              />
                            ) : (
                              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500 text-xs">No Image</span>
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <div className="flex-grow">
                                <h4 className="font-semibold text-gray-900 mb-1">{item.product.name}</h4>
                                <p className="text-orange-600 font-bold">₹{item.product.price}</p>
                              </div>
                              <div className="text-right ml-4">
                                <p className="font-bold text-lg text-gray-900">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                                {item.quantity > 1 && (
                                  <p className="text-sm text-gray-500">{item.quantity} × ₹{item.product.price}</p>
                                )}
                              </div>
                            </div>

                            {/* Ultra Minimal Quantity Controls - Plain Grid */}
                            <div className="grid grid-cols-3 gap-4 mt-3">
                              {/* Decrease Button */}
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex justify-center"
                              >
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-600 hover:text-orange-600 hover:bg-orange-50 border-0"
                                  onClick={() => item.id && updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                  </svg>
                                </Button>
                              </motion.div>

                              {/* Quantity Display */}
                              <div className="flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-900">{item.quantity}</span>
                              </div>

                              {/* Increase Button & Remove Button */}
                              <div className="flex items-center justify-center gap-2">
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-gray-600 hover:text-orange-600 hover:bg-orange-50 border-0"
                                    onClick={() => item.id && updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                  </Button>
                                </motion.div>
                                
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 border-0"
                                    onClick={() => item.id && removeFromCart(item.id)}
                                    title="Remove item"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </Button>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>

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
