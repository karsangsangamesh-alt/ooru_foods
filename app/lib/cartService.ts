"use client";

import { supabase as baseSupabase } from "../../lib/supabaseClient";
import { Product } from "../../lib/supabaseClient";

export interface CartItem {
  id?: string;
  user_id?: string;
  product_id: number;
  quantity: number;
  created_at?: string;
}

// Re-export supabase client
export const supabase = baseSupabase;

// Local storage key for cart
const CART_STORAGE_KEY = 'ooru-foods-cart';

// Local storage cart operations
const getLocalCart = (): CartItem[] => {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading local cart:', error);
    return [];
  }
};

const saveLocalCart = (cart: CartItem[]): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving local cart:', error);
  }
};

export const getCartItems = async (): Promise<CartItem[]> => {
  try {
    // Try to get from Supabase first, fallback to localStorage
    const { data, error } = await supabase
      .from("orders_cart")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn('Supabase cart not available, using local storage:', error.message);
      return getLocalCart();
    }
    return data || [];
  } catch (error) {
    console.warn('Error connecting to Supabase, using local storage:', error);
    return getLocalCart();
  }
};

export const addToCart = async (
  product: Product,
  quantity: number
): Promise<CartItem> => {
  try {
    // Try Supabase first
    const { data: existing } = await supabase
      .from("orders_cart")
      .select("*")
      .eq("product_id", product.id)
      .single();

    if (existing) {
      const newQuantity = existing.quantity + quantity;
      return updateCartItem(existing.id as string, newQuantity);
    }

    const { data, error } = await supabase
      .from("orders_cart")
      .insert([{ product_id: product.id, quantity }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    // Fallback to localStorage
    console.warn('Using local cart storage:', error);
    const localCart = getLocalCart();
    const existingIndex = localCart.findIndex(item => item.product_id === product.id);
    
    if (existingIndex >= 0) {
      localCart[existingIndex].quantity += quantity;
    } else {
      localCart.push({
        product_id: product.id,
        quantity,
        id: `local-${Date.now()}`
      });
    }
    
    saveLocalCart(localCart);
    return localCart.find(item => item.product_id === product.id)!;
  }
};

export const updateCartItem = async (
  cartItemId: string,
  quantity: number
): Promise<CartItem> => {
  if (quantity <= 0) {
    return deleteCartItem(cartItemId);
  }

  try {
    // Try Supabase first
    const { data, error } = await supabase
      .from("orders_cart")
      .update({ quantity })
      .eq("id", cartItemId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    // Fallback to localStorage
    console.warn('Using local cart storage for update:', error);
    const localCart = getLocalCart();
    const itemIndex = localCart.findIndex(item => item.id === cartItemId);
    
    if (itemIndex >= 0) {
      localCart[itemIndex].quantity = quantity;
      saveLocalCart(localCart);
      return localCart[itemIndex];
    }
    
    throw new Error('Cart item not found');
  }
};

export const deleteCartItem = async (
  cartItemId: string
): Promise<CartItem> => {
  try {
    // Try Supabase first
    const { data, error } = await supabase
      .from("orders_cart")
      .delete()
      .eq("id", cartItemId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    // Fallback to localStorage
    console.warn('Using local cart storage for delete:', error);
    const localCart = getLocalCart();
    const itemIndex = localCart.findIndex(item => item.id === cartItemId);
    
    if (itemIndex >= 0) {
      const deletedItem = localCart[itemIndex];
      localCart.splice(itemIndex, 1);
      saveLocalCart(localCart);
      return deletedItem;
    }
    
    throw new Error('Cart item not found');
  }
};

export interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
}

export const createOrder = async (items: OrderItem[], total: number) => {
  try {
    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{ 
        total_amount: total,
        status: 'Pending'
      }])
      .select()
      .single();

    if (orderError || !order) {
      throw orderError || new Error('Failed to create order');
    }

    // Create order items
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      })));

    if (itemsError) throw itemsError;
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const clearCart = async (): Promise<boolean> => {
  try {
    // Try Supabase first
    const { error } = await supabase
      .from("orders_cart")
      .delete()
      .neq("id", null);

    if (error) throw error;
    return true;
  } catch (error) {
    // Fallback to localStorage
    console.warn('Using local cart storage for clear:', error);
    localStorage.removeItem(CART_STORAGE_KEY);
    return true;
  }
};
