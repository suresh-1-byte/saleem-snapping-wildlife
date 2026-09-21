"use client";

import Image, { ImageProps } from 'next/image';
import { useCloudinaryImages } from '@/lib/useCloudinaryImages';

interface CloudinaryImageProps extends Omit<ImageProps, 'src'> {
  src: string;
}

export default function CloudinaryImage({ src, alt, ...props }: CloudinaryImageProps) {
  const { getImageUrl } = useCloudinaryImages();
  const imageUrl = getImageUrl(src);

  return <Image src={imageUrl} alt={alt} {...props} />;
}
