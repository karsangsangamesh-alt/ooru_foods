"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface ImageDebuggerProps {
  productId: number;
  imageUrl: string | null;
}

export default function ImageDebugger({ productId, imageUrl }: ImageDebuggerProps) {
  const [debugInfo, setDebugInfo] = useState<{
    status: 'idle' | 'checking' | 'success' | 'error';
    message: string;
    publicUrl: string;
    bucketExists: boolean;
    fileExists: boolean;
    isPublic: boolean;
  }>({
    status: 'idle',
    message: '',
    publicUrl: '',
    bucketExists: false,
    fileExists: false,
    isPublic: false,
  });

  useEffect(() => {
    const checkImage = async () => {
      if (!imageUrl) {
        setDebugInfo(prev => ({
          ...prev,
          status: 'error',
          message: 'No image URL provided for this product',
        }));
        return;
      }

      setDebugInfo(prev => ({ ...prev, status: 'checking' }));

      try {
        // 1. Check if we can construct a valid URL
        const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
        const bucket = 'product-images';
        const publicUrl = imageUrl.startsWith('http') 
          ? imageUrl 
          : `${baseUrl}/storage/v1/object/public/${bucket}/${imageUrl.replace(/^\//, '')}`;

        // 2. Check if the file exists in Supabase Storage
        const fileData = await supabase.storage
          .from(bucket)
          .getPublicUrl(imageUrl.replace(/^\//, ''));

        // 3. Try to fetch the image
        const response = await fetch(publicUrl, { method: 'HEAD' });
        const isAccessible = response.ok;

        setDebugInfo({
          status: isAccessible ? 'success' : 'error',
          message: isAccessible 
            ? 'Image is accessible' 
            : `Failed to load image (HTTP ${response.status})`,
          publicUrl,
          bucketExists: true, // If we got this far, bucket exists
          fileExists: !!fileData,
          isPublic: isAccessible,
        });

        console.log('Image debug info:', {
          productId,
          imageUrl,
          publicUrl,
          isAccessible,
          fileData,
          responseStatus: response.status,
        });
      } catch (error) {
        console.error('Debug error:', error);
        setDebugInfo(prev => ({
          ...prev,
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
        }));
      }
    };

    checkImage();
  }, [productId, imageUrl]);

  if (debugInfo.status === 'idle' || debugInfo.status === 'checking') {
    return <div className="p-2 text-sm text-gray-500">Checking image...</div>;
  }

  return (
    <div className="p-4 border rounded-md bg-gray-50 text-sm space-y-2">
      <div className="font-semibold">Image Debug Info (Product ID: {productId})</div>
      <div>Status: 
        <span className={`font-medium ${debugInfo.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {debugInfo.status.toUpperCase()}
        </span>
      </div>
      <div>Message: {debugInfo.message}</div>
      <div className="break-all">Public URL: 
        <a href={debugInfo.publicUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {debugInfo.publicUrl}
        </a>
      </div>
      <div>Bucket Exists: {debugInfo.bucketExists ? '✅' : '❌'}</div>
      <div>File Exists: {debugInfo.fileExists ? '✅' : '❌'}</div>
      <div>Public Access: {debugInfo.isPublic ? '✅' : '❌'}</div>
      
      {debugInfo.status === 'error' && (
        <div className="mt-2 p-2 bg-red-50 text-red-700 rounded text-xs">
          <div className="font-semibold">Troubleshooting Steps:</div>
          <ol className="list-decimal pl-5 space-y-1 mt-1">
            <li>Verify the image exists in your Supabase Storage bucket</li>
            <li>Check the bucket's CORS and public access settings</li>
            <li>Ensure the image URL is correct and properly formatted</li>
            <li>Check the browser's network tab for failed requests</li>
            <li>Verify your Supabase project URL is correct in the environment variables</li>
          </ol>
        </div>
      )}
    </div>
  );
}
