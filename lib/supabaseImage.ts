import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getImageUrl = (path: string | null): string => {
  // Default placeholder image
  const placeholder = '/placeholder-food.svg';
  
  if (!path) {
    console.warn('No image path provided, using placeholder');
    return placeholder;
  }
  
  // If it's already a full URL, return as is
  if (path.startsWith('http')) {
    return path;
  }
  
  // Handle case where supabaseUrl might be undefined
  if (!supabaseUrl) {
    console.error('Supabase URL is not configured');
    return placeholder;
  }
  
  try {
    // Remove any leading slashes from the path
    const cleanPath = path.replace(/^\/+/, '');
    
    // Check if the path already includes 'product-images'
    const basePath = cleanPath.includes('product-images/') ? '' : 'product-images/';
    
    // Construct the full URL
    const url = new URL(`/storage/v1/object/public/${basePath}${cleanPath}`, supabaseUrl);
    
    // Add cache buster to prevent caching issues
    url.searchParams.set('t', Date.now().toString());
    
    console.log('Constructed image URL:', url.toString());
    return url.toString();
    
  } catch (error) {
    console.error('Error constructing image URL:', error);
    return placeholder;
  }
};

export const testImageAccess = async (path: string): Promise<{ success: boolean; url: string; error?: string }> => {
  try {
    const url = getImageUrl(path);
    console.log('Testing image access:', url);
    
    // Add cache-busting parameter
    const cacheBuster = `?t=${new Date().getTime()}`;
    const testUrl = url + (url.includes('?') ? '&' : '?') + cacheBuster;
    
    console.log('Making request to:', testUrl);
    const response = await fetch(testUrl, { 
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    console.log('Image test response:', {
      url: testUrl,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Could not read error response');
      console.error('Image load failed:', {
        url: testUrl,
        status: response.status,
        error: errorText
      });
      
      return {
        success: false,
        url,
        error: `HTTP error! status: ${response.status} - ${response.statusText}`
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
