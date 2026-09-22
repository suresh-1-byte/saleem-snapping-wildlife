"use client";

import Image from 'next/image';
import { useCloudinaryImages } from '@/lib/useCloudinaryImages';

interface CloudinaryBackgroundProps {
  src: string;
  alt: string;
  className?: string;
  overlay?: string;
}

export default function CloudinaryBackground({ src, alt, className = "", overlay }: CloudinaryBackgroundProps) {
  const { getImageUrl } = useCloudinaryImages();
  const imageUrl = getImageUrl(src);

  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        sizes="100vw"
        unoptimized
        priority
      />
      {overlay && <div className={overlay} />}
    </div>
  );
}
