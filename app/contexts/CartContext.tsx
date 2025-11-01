"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../../lib/supabaseClient';
import * as cartService from '../lib/cartService';

export interface CartItem extends cartService.CartItem {
  product: Product;
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
  loading: boolean;
  checkout: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const initializeCart = async () => {
    try {
      const cartItems = await cartService.getCartItems();
      
      if (!cartItems || cartItems.length === 0) {
        setItems([]);
        return;
      }
      
      // Fetch product details for each cart item
      const products = await Promise.all(
        cartItems.map(async (item) => {
          try {
            const { data, error } = await cartService.supabase
              .from('test_products')
              .select('*')
              .eq('id', item.product_id)
              .single();
            
            if (error) {
              console.error(`Error fetching product ${item.product_id}:`, error);
              return null;
            }
            return data;
          } catch (err) {
            console.error(`Error processing product ${item.product_id}:`, err);
            return null;
          }
        })
      );

      // Filter out any null products and merge with cart items
      const validProducts = products.filter((product): product is Product => product !== null);
      
      if (validProducts.length !== cartItems.length) {
        console.warn('Some products could not be loaded and were removed from the cart');
      }

      const mergedItems = cartItems
        .map((item, index) => ({
          ...item,
          product: products[index]
        }))
        .filter(item => item.product != null); // Remove items with missing products

      setItems(mergedItems);
    } catch (error) {
      console.error('Error initializing cart:', error instanceof Error ? error.message : 'Unknown error');
      // Optionally set an error state here if you want to show it in the UI
      // setError('Failed to load cart. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeCart();
  }, []);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const addToCart = async (product: Product, quantity = 1) => {
    try {
      const cartItem = await cartService.addToCart(product, quantity);
      setItems(prevItems => {
        const existingItem = prevItems.find(item => item.product_id === product.id);
        if (existingItem) {
          return prevItems.map(item => 
            item.product_id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevItems, { ...cartItem, product }];
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      await cartService.deleteCartItem(cartItemId);
      setItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    try {
      await cartService.updateCartItem(cartItemId, quantity);
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === cartItemId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const checkout = async () => {
    try {
      if (items.length === 0) throw new Error('Cart is empty');
      
      // Create order in database
      const { data: order } = await cartService.supabase
        .from('orders')
        .insert([{ 
          total_amount: total,
          status: 'Pending'
        }])
        .select()
        .single();

      if (!order) throw new Error('Failed to create order');
      
      // Create order items
      await cartService.supabase
        .from('order_items')
        .insert(items.map(item => ({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.product.price
        })));

      // Clear cart after successful checkout
      await clearCart();
      return order;
    } catch (error) {
      console.error('Error during checkout:', error);
      throw error;
    }
  };

  const value = {
    items,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    checkout,
    total,
    loading
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
