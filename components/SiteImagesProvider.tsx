"use client";

import { createContext, useCallback, useContext } from "react";
import Image, { type ImageProps } from "next/image";
import { deliveryUrl, resolveSiteImage, type SiteImageMap } from "@/lib/siteImages";

const SiteImagesContext = createContext<SiteImageMap>({});

export function SiteImagesProvider({
  images,
  children,
}: {
  images: SiteImageMap;
  children: React.ReactNode;
}) {
  return <SiteImagesContext.Provider value={images}>{children}</SiteImagesContext.Provider>;
}

/** Resolve local image paths to the version uploaded from the admin panel. */
export function useSiteImages() {
  const images = useContext(SiteImagesContext);
  const resolve = useCallback((path: string) => resolveSiteImage(path, images), [images]);
  return { images, resolve };
}

type SiteImageProps = Omit<ImageProps, "src"> & {
  src: string;
  /** Longest edge to deliver from Cloudinary; omit for original resolution. */
  deliveryWidth?: number;
};

/** next/image that shows the admin-uploaded version of a local image when there is one. */
export function SiteImage({ src, deliveryWidth, alt, ...props }: SiteImageProps) {
  const { resolve } = useSiteImages();
  const resolved = resolve(src);
  const isUploaded = resolved !== src;

  return (
    <Image
      {...props}
      alt={alt}
      src={isUploaded ? deliveryUrl(resolved, { width: deliveryWidth, quality: "auto:best" }) : resolved}
      // Cloudinary already optimises uploaded images.
      unoptimized={isUploaded || props.unoptimized}
    />
  );
}
