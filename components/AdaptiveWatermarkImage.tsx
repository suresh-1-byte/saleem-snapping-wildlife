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
  watermarkClassName = "w-16 md:w-20",
  fill = false,
}: AdaptiveWatermarkImageProps) {
  const watermark = "/images/watermark.png";

  return (
    <div className={`relative overflow-hidden ${fill ? "w-full h-full" : "w-full"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`${fill ? "absolute inset-0 w-full h-full" : "block w-full h-auto"} ${imageClassName}`}
      />
      <Image
        src={watermark}
        alt=""
        aria-hidden="true"
        width={240}
        height={96}
        className={`absolute right-2 bottom-2 z-10 h-auto opacity-75 drop-shadow-md ${watermarkClassName}`}
      />
    </div>
  );
}
