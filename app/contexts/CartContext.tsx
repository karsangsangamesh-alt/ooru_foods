"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useToast } from '../components/Toast';
import { Product } from '../../lib/supabaseClient';
import * as cartService from '../lib/cartService';

export interface CartItem extends Omit<cartService.CartItem, 'id'> {
  product: Product;
  id: string; // Make id required in this context
  product_id: number;
  quantity: number;
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
  const { showToast } = useToast();

  const initializeCart = useCallback(async () => {
    try {
      setLoading(true);
      const cartItems = await cartService.getCartItems();
      
      if (!cartItems?.length) {
        setItems([]);
        return;
      }
      
      // Batch fetch all products in cart
      const productIds = cartItems.map((item: cartService.CartItem) => item.product_id);
      let products = [];
      let error = null;
      
      try {
        // First try enhanced_products table
        const { data, error: dbError } = await cartService.supabase
          .from('enhanced_products')
          .select('*')
          .in('id', productIds);
        
        if (dbError) {
          console.log('enhanced_products not found, trying products table');
          // Fallback to products table
          const result = await cartService.supabase
            .from('products')
            .select('*')
            .in('id', productIds);
          
          products = result.data || [];
          error = result.error;
        } else {
          products = data || [];
        }
      } catch (dbError) {
        console.log('Database error, using empty products list');
        // No fallback to mock data - database should be the source of truth
        products = [];
        error = dbError;
      }
      
      if (error) {
        console.log('Database error, using fallback products');
      }

      // Create product map for efficient lookup
      const productMap = new Map(products.map((p) => [p.id, p]));
      
      // If no products found, clear the cart to prevent future issues
      if (products.length === 0 && cartItems.length > 0) {
        console.log('No products found in database, clearing cart');
        await cartService.clearCart();
        showToast('Cart cleared - database does not contain the products from your cart', 'info');
        setItems([]);
        return;
      }
      
      // Merge cart items with products
      const mergedItems = cartItems
        .map((item: cartService.CartItem) => {
          const product = productMap.get(item.product_id);
          // Ensure id is always a string by providing a fallback
          const itemId = item.id || `temp-${Math.random().toString(36).substr(2, 9)}`;
          
          if (product) {
            return { 
              ...item, 
              product,
              id: itemId,
              product_id: item.product_id,
              quantity: item.quantity
            };
          } else {
            // Log the missing product for debugging
            console.log(`Product ${item.product_id} not found in database, removing from cart`);
            return null;
          }
        })
        .filter((item): item is CartItem => item !== null);

      if (mergedItems.length !== cartItems.length) {
        const missingCount = cartItems.length - mergedItems.length;
        showToast(`${missingCount} product${missingCount > 1 ? 's' : ''} not found in database and removed from cart`, 'info');
      }

      setItems(mergedItems);
    } catch (error) {
      console.error('Error initializing cart:', error instanceof Error ? error.message : 'Unknown error');
      // Optionally set an error state here if you want to show it in the UI
      // setError('Failed to load cart. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  const cartCount = useMemo(() => 
    items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0), 
    [items]
  );
  
  const total = useMemo(() => 
    items.reduce((sum: number, item: CartItem) => sum + (item.product.price * item.quantity), 0), 
    [items]
  );

  const addToCart = async (product: Product, quantity = 1) => {
    try {
      const cartItem = await cartService.addToCart(product, quantity);
      // Ensure the id is always defined
      const newItem: CartItem = {
        ...cartItem,
        id: cartItem.id || `temp-${Math.random().toString(36).substr(2, 9)}`,
        product,
        product_id: product.id,
        quantity: cartItem.quantity
      };
      
      setItems(prevItems => {
        const existingItem = prevItems.find(item => item.product_id === product.id);
        if (existingItem) {
          return prevItems.map(item => 
            item.product_id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevItems, newItem];
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
      if (items.length === 0) {
        throw new Error('Cart is empty');
      }
      
      const orderItems = items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product.price
      }));
      const order = await cartService.createOrder(orderItems, total);
      showToast('Order placed successfully!', 'success');
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
