import { supabase } from './supabaseClient';

export const getSupabaseImageUrl = (path: string | null): string => {
  if (!path) return '/placeholder-food.svg';
  
  // If it's already a full URL, return as is
  if (path.startsWith('http')) return path;
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Get the Supabase URL from the environment
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    console.error('NEXT_PUBLIC_SUPABASE_URL is not set in environment variables');
    return '/placeholder-food.svg';
  }
  
  // Construct the full URL for Supabase storage
  return `${supabaseUrl}/storage/v1/object/public/product-images/${cleanPath}`;
};

export const testImageAccess = async (path: string): Promise<{ success: boolean; url: string; error?: string }> => {
  try {
    const url = getSupabaseImageUrl(path);
    const response = await fetch(url, { method: 'HEAD' });
    
    if (!response.ok) {
      return {
        success: false,
        url,
        error: `HTTP error! status: ${response.status}`
      };
    }
    
    return { success: true, url };
  } catch (error) {
    return {
      success: false,
      url: '',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
