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
    // Return Cloudinary URL if available, otherwise return original path
    return imageMap[path] || path;
  };

  return { getImageUrl, loading, imageMap };
}
