"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ContactHero() {
  const [bgImage, setBgImage] = useState("/images/contact-bg.jpg");

  useEffect(() => {
    // Fetch the contact background image from the images API
    fetch('/api/admin/images')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.images) {
          const contactBgUrl = data.images['/images/contact-bg'] || data.images['/images/contact-bg.jpg'];
          if (contactBgUrl) {
            setBgImage(contactBgUrl);
          }
        }
      })
      .catch(err => console.error('Failed to fetch contact background:', err));
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={bgImage}
        alt="Misty forest landscape"
        fill
        className="object-cover"
        sizes="100vw"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-black/70" />
    </div>
  );
}
