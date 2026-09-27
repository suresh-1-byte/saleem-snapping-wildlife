"use client";

import { SiteImage } from "@/components/SiteImagesProvider";

export default function ContactHero() {
  return (
    <div className="absolute inset-0 z-0">
      <SiteImage
        src="/images/contact-bg.jpg"
        alt="Misty forest landscape"
        fill
        className="object-cover"
        sizes="100vw"
        deliveryWidth={2560}
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-black/70" />
    </div>
  );
}
