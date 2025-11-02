export const getSupabaseImageUrl = (path: string | null): string => {
  if (!path) return '/placeholder-food.svg';
  
  // If it's already a full URL, return as is
  if (path.startsWith('http')) return path;
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Construct the full URL for Supabase storage
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const bucket = 'product-images'; // Your Supabase storage bucket name
  
  return `${baseUrl}/storage/v1/object/public/${bucket}/${cleanPath}`;
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
