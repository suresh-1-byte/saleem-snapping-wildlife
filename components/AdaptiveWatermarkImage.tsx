"use client";

import Image from "next/image";

interface AdaptiveWatermarkImageProps {
  src: string;
  alt: string;
  imageClassName?: string;
  watermarkClassName?: string;
  fill?: boolean;
}

export default function AdaptiveWatermarkImage({
  src,
  alt,
  imageClassName = "",
  watermarkClassName = "w-14 md:w-16",
  fill = false,
}: AdaptiveWatermarkImageProps) {
  const watermark = "/images/watermark.png";

  return (
    <div className={`relative ${fill ? "w-full h-full" : "w-full"} overflow-hidden`}>
      {/* Main Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`${fill ? "absolute inset-0 w-full h-full" : "block w-full h-auto"} ${imageClassName}`}
        style={{ display: 'block' }}
      />
      
      {/* Watermark - stays inside photo boundaries */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src={watermark}
            alt=""
            aria-hidden="true"
            width={180}
            height={72}
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
