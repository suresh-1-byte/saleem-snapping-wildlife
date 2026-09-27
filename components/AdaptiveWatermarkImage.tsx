"use client";

import { useSiteImages } from "@/components/SiteImagesProvider";
import { deliveryUrl } from "@/lib/siteImages";

interface AdaptiveWatermarkImageProps {
  src: string;
  alt: string;
  imageClassName?: string;
  watermarkClassName?: string;
  fill?: boolean;
  /** Longest edge (px) to deliver from Cloudinary. */
  deliveryWidth?: number;
}

export default function AdaptiveWatermarkImage({
  src,
  alt,
  imageClassName = "",
  watermarkClassName = "w-14 md:w-16",
  fill = false,
  deliveryWidth = 1600,
}: AdaptiveWatermarkImageProps) {
  const { resolve } = useSiteImages();
  const imageSrc = deliveryUrl(resolve(src), { width: deliveryWidth });
  const watermark = deliveryUrl(resolve("/images/watermark.png"), { width: 400 });

  return (
    <div className={`relative ${fill ? "w-full h-full" : "w-full"} overflow-hidden`}>
      {/* Main Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`${fill ? "absolute inset-0 w-full h-full" : "block w-full h-auto"} ${imageClassName}`}
        style={{ display: 'block' }}
      />

      {/* Watermark - stays inside photo boundaries */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={watermark}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className={`absolute right-2 bottom-2 z-10 h-auto opacity-75 drop-shadow-md ${watermarkClassName}`}
            style={{
              maxWidth: '25%',
              height: 'auto',
            }}
          />
        </div>
      </div>
    </div>
  );
}
