"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function OrderSuccess() {
  const [orderDetails, setOrderDetails] = useState({
    orderId: '',
    estimatedDelivery: '',
    totalAmount: 0,
    items: [] as unknown[]
  });

  useEffect(() => {
    // Generate dummy order details
    const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + 1);
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrderDetails({
      orderId,
      estimatedDelivery: estimatedDate.toLocaleDateString('en-IN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      totalAmount: 0, // This would come from cart context
      items: [] // This would come from cart context
    });
  }, []);

  const trackingSteps = [
    { id: 1, title: 'Order Confirmed', description: 'Your order has been confirmed', completed: true, icon: '✅' },
    { id: 2, title: 'Preparing', description: 'We are preparing your delicious items', completed: true, icon: '👨‍🍳' },
    { id: 3, title: 'Out for Delivery', description: 'Your order is on the way', completed: false, icon: '🚚' },
    { id: 4, title: 'Delivered', description: 'Order will be delivered to you', completed: false, icon: '🏠' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          {/* Animated Success Icon */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-32 h-32 bg-green-100 rounded-full mb-8 relative"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="text-6xl"
            >
              🎉
            </motion.div>
            
            {/* Confetti Animation */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1
                  }}
                  animate={{
                    x: Math.cos(i * 30 * Math.PI / 180) * 120,
                    y: Math.sin(i * 30 * Math.PI / 180) * 120,
                    opacity: 0
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.8 + i * 0.1,
                    ease: "easeOut"
                  }}
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                />
              ))}
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4"
          >
            Order Placed Successfully!
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Thank you for your order! Your delicious South Indian flavors are being prepared with love.
          </motion.p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-green-100"
        >
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Order ID */}
            <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="text-2xl mb-2">🆔</div>
              <h3 className="font-semibold text-green-800 mb-1">Order ID</h3>
              <p className="text-green-600 font-mono font-bold">{orderDetails.orderId}</p>
            </div>

            {/* Estimated Delivery */}
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="text-2xl mb-2">🕐</div>
              <h3 className="font-semibold text-blue-800 mb-1">Estimated Delivery</h3>
              <p className="text-blue-600 font-semibold">{orderDetails.estimatedDelivery}</p>
              <p className="text-sm text-blue-500">by 10:00 PM</p>
            </div>

            {/* Total Amount */}
            <div className="text-center p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="font-semibold text-amber-800 mb-1">Total Amount</h3>
              <p className="text-amber-600 font-bold text-xl">₹{orderDetails.totalAmount.toFixed(2)}</p>
            </div>
          </div>

          {/* Order Tracking */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Track Your Order</h3>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {trackingSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  className="flex flex-col items-center text-center max-w-xs"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-3 ${
                    step.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {step.icon}
                  </div>
                  <h4 className={`font-bold mb-1 ${
                    step.completed ? 'text-green-700' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </h4>
                  <p className={`text-sm ${
                    step.completed ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </p>
                  
                  {/* Connecting Line */}
                  {index < trackingSteps.length - 1 && (
                    <div className="hidden md:block absolute mt-8 ml-16 w-32 h-0.5 bg-gray-200">
                      <div className={`h-full transition-all duration-1000 ${
                        step.completed ? 'bg-green-500 w-full' : 'bg-gray-200 w-0'
                      }`} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* What's Next */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-8 border border-orange-200 mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">What's Next?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">📱</div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Order Updates</h4>
                <p className="text-gray-600">You'll receive SMS updates about your order status and delivery.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-3xl">📞</div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Contact Support</h4>
                <p className="text-gray-600">Need help? Call us at <strong>+91 98765 43210</strong> anytime.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/shop">
            <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Continue Shopping
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </Link>

          <Link href="/">
            <Button variant="outline" className="border-2 border-green-300 text-green-700 hover:bg-green-50 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
              Back to Home
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Button>
          </Link>
        </motion.div>

        {/* Thank You Message */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-center mt-12 p-6 bg-white rounded-2xl shadow-lg border border-green-100"
        >
          <div className="text-4xl mb-4">🙏</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You for Choosing Us!</h3>
          <p className="text-gray-600">
            We hope you enjoy your authentic South Indian flavors. Your satisfaction is our priority!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
