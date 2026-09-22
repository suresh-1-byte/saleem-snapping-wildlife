"use client";

import { useState, useEffect } from 'react';

interface ImageMap {
  [key: string]: string;
}

let cachedImages: ImageMap | null = null;

export function useCloudinaryImages() {
  const [imageMap, setImageMap] = useState<ImageMap>(cachedImages || {});
  const [loading, setLoading] = useState(!cachedImages);

  useEffect(() => {
    if (cachedImages) return; // Already loaded

    fetch('/api/admin/images')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.images) {
          cachedImages = data.images;
          setImageMap(data.images);
        }
      })
      .catch(err => console.error('Failed to load Cloudinary images:', err))
      .finally(() => setLoading(false));
  }, []);

  const getImageUrl = (path: string): string => {
    // Try exact match first
    if (imageMap[path]) return imageMap[path];
    
    // Try without extension
    const pathWithoutExt = path.replace(/\.[^/.]+$/, '');
    if (imageMap[pathWithoutExt]) return imageMap[pathWithoutExt];
    
    // Try common extensions
    const extensions = ['.png', '.jpg', '.jpeg', '.webp'];
    for (const ext of extensions) {
      const pathWithExt = pathWithoutExt + ext;
      if (imageMap[pathWithExt]) return imageMap[pathWithExt];
    }
    
    // Return original path with .png extension as fallback
    return path.includes('.') ? path : path + '.png';
  };

  return { getImageUrl, loading, imageMap };
}
