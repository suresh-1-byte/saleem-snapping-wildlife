"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import imageCompression from 'browser-image-compression';

interface ImageItem {
  key: string;
  label: string;
  path: string;
  description: string;
}

interface CloudinaryImages {
  [key: string]: string;
}

const IMAGE_CATEGORIES = [
  {
    category: "Hero & Backgrounds",
    addPrefix: "background",
    images: [
      { key: "hero", label: "Hero Background", path: "/images/hero%20pg.png", description: "Main homepage hero image" },
      { key: "closing-cta", label: "Closing CTA Background", path: "/images/closing-cta.jpg", description: "Bottom section background" },
      { key: "contact-bg", label: "Contact Page Background", path: "/images/contact-bg.jpg", description: "Contact page background" },
    ],
  },
  {
    category: "Featured Work",
    addPrefix: "featured",
    images: Array.from({ length: 6 }, (_, i) => ({
      key: `featured-${i + 1}`,
      label: `Featured Image ${i + 1}`,
      path: `/images/featured-${i + 1}.jpg`,
      description: `Featured work image ${i + 1}`,
    })),
  },
  {
    category: "Portfolio",
    addPrefix: "portfolio",
    images: Array.from({ length: 6 }, (_, i) => ({
      key: `portfolio-${i + 1}`,
      label: `Portfolio Image ${i + 1}`,
      path: `/images/portfolio-${i + 1}.jpg`,
      description: `Portfolio image ${i + 1}`,
    })),
  },
  {
    category: "Species Categories",
    addPrefix: "species",
    images: [
      { key: "species-birds", label: "Birds Category", path: "/images/species-birds.jpg", description: "Birds category thumbnail" },
      { key: "species-mammals", label: "Mammals Category", path: "/images/species-mammals.jpg", description: "Mammals category thumbnail" },
      { key: "species-macro", label: "Macro Category", path: "/images/species-macro.jpg", description: "Macro category thumbnail" },
      { key: "species-landscapes", label: "Landscapes Category", path: "/images/species-landscapes.jpg", description: "Landscapes category thumbnail" },
      { key: "species-moments", label: "Wildlife Moments", path: "/images/species-moments.jpg", description: "Wildlife moments category" },
    ],
  },
  {
    category: "Stories",
    addPrefix: "story",
    images: [
      { key: "story-hero", label: "Story Hero Image", path: "/images/story-hero.jpg", description: "Featured story hero image" },
      { key: "story-support-1", label: "Story Support 1", path: "/images/story-support-1.jpg", description: "Story supporting image 1" },
      { key: "story-support-2", label: "Story Support 2", path: "/images/story-support-2.jpg", description: "Story supporting image 2" },
    ],
  },
  {
    category: "About Page",
    addPrefix: "about",
    images: [
      { key: "about-portrait", label: "About Portrait", path: "/images/about-portrait.jpg", description: "Personal portrait for about page" },
    ],
  },
  {
    category: "Watermarks",
    addPrefix: "watermark",
    images: [
      { key: "watermark", label: "Light Watermark", path: "/images/watermark.png", description: "Used on dark photos" },
      { key: "watermark-black", label: "Black Watermark", path: "/images/watermark%20black.png", description: "Used automatically on bright photos" },
    ],
  },
];

export default function ImagesManager() {
  const [uploading, setUploading] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [cloudinaryImages, setCloudinaryImages] = useState<CloudinaryImages>({});

  // Fetch Cloudinary images on mount
  useEffect(() => {
    fetch('/api/admin/images')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.images) {
          setCloudinaryImages(data.images);
        }
      })
      .catch(err => console.error('Failed to fetch Cloudinary images:', err));
  }, []);

  // Helper to get the actual image URL (Cloudinary if available, otherwise local)
  const getImageUrl = (path: string): string => {
    // Remove file extension and try to match
    const pathWithoutExt = path.replace(/\.[^/.]+$/, '');
    return cloudinaryImages[pathWithoutExt] || path;
  };

  async function handleImageUpload(imageKey: string, imagePath: string) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setUploading(imageKey);
      setMessage("");

      try {
        // Compress image before upload to avoid 413 errors
        const options = {
          maxSizeMB: 3, // Max 3MB
          maxWidthOrHeight: 2400, // Max dimension
          useWebWorker: true,
          fileType: file.type,
        };
        
        const compressedFile = await imageCompression(file, options);
        
        const formData = new FormData();
        formData.append("file", compressedFile);
        formData.append("imagePath", imagePath);

        const res = await fetch("/api/admin/upload-image", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        
        if (res.ok) {
          setMessage(`✓ ${imageKey} updated successfully! Reloading...`);
          // Reload to fetch new Cloudinary URL
          setTimeout(() => window.location.reload(), 1500);
        } else {
          setMessage(`✗ Failed to upload ${imageKey}: ${data.error || 'Unknown error'}`);
        }
      } catch (error) {
        setMessage(`✗ Error uploading ${imageKey}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setUploading(null);
      }
    };

    input.click();
  }

  async function handleImageDelete(imageKey: string, imagePath: string) {
    if (!window.confirm(`Remove ${imageKey}? You can add a new image to this slot later.`)) {
      return;
    }

    setDeleting(imageKey);
    setMessage("");

    try {
      const res = await fetch(
        `/api/admin/upload-image?imagePath=${encodeURIComponent(imagePath)}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setMessage(`✓ ${imageKey} removed successfully.`);
        window.location.reload();
      } else {
        const data = await res.json().catch(() => null);
        setMessage(`✗ ${data?.error || `Failed to remove ${imageKey}`}`);
      }
    } catch (error) {
      setMessage(`✗ Error removing ${imageKey}`);
    } finally {
      setDeleting(null);
    }
  }

  function handleNewImageUpload(prefix: string) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const imageKey = `${prefix}-new`;
      const imagePath = `/images/${prefix}-${Date.now()}.${extension}`;
      setUploading(imageKey);
      setMessage("");

      try {
        // Compress image before upload
        const options = {
          maxSizeMB: 3, // Max 3MB
          maxWidthOrHeight: 2400, // Max dimension
          useWebWorker: true,
          fileType: file.type,
        };
        
        const compressedFile = await imageCompression(file, options);
        
        const formData = new FormData();
        formData.append("file", compressedFile);
        formData.append("imagePath", imagePath);

        const res = await fetch("/api/admin/upload-image", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        
        if (res.ok) {
          setMessage(`✓ New ${prefix} photo added successfully! URL: ${data.path}`);
          setTimeout(() => window.location.reload(), 2000);
        } else {
          setMessage(`✗ Failed to add new ${prefix} photo: ${data.error || 'Unknown error'}`);
        }
      } catch (error) {
        setMessage(`✗ Error adding new ${prefix} photo: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setUploading(null);
      }
    };

    input.click();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-wider mb-2">MANAGE IMAGES</h2>
          <p className="text-white/60">Add, replace, or remove any image on your website</p>
        </div>
        {message && (
          <div className={`px-4 py-2 rounded ${message.startsWith("✓") ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
            {message}
          </div>
        )}
      </div>

      {IMAGE_CATEGORIES.map((category) => (
        <div key={category.category} className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold tracking-wide text-earthy-green uppercase">
              {category.category}
            </h3>
            <button
              onClick={() => handleNewImageUpload(category.addPrefix)}
              disabled={uploading === `${category.addPrefix}-new`}
              className="shrink-0 px-3 py-2 border border-earthy-green/60 text-earthy-green-light hover:bg-earthy-green/20 text-xs font-medium tracking-wide uppercase rounded transition-colors disabled:opacity-50"
            >
              {uploading === `${category.addPrefix}-new` ? "Adding..." : "+ Add New Photo"}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.images.map((image) => (
              <div
                key={image.key}
                className="bg-charcoal border border-white/10 rounded-lg overflow-hidden hover:border-earthy-green/50 transition-colors"
              >
                <div className="relative aspect-video bg-black">
                  <Image
                    src={getImageUrl(image.path)}
                    alt={image.label}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="font-medium">{image.label}</h4>
                    <p className="text-sm text-white/60 mt-1">{image.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleImageUpload(image.key, image.path)}
                      disabled={uploading === image.key || deleting === image.key}
                      className="px-3 py-2 bg-earthy-green hover:bg-earthy-green-light text-white text-sm font-medium tracking-wide rounded transition-colors disabled:opacity-50"
                    >
                      {uploading === image.key ? "Uploading..." : "Add / Replace"}
                    </button>
                    <button
                      onClick={() => handleImageDelete(image.key, image.path)}
                      disabled={uploading === image.key || deleting === image.key}
                      className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 text-sm font-medium tracking-wide rounded transition-colors disabled:opacity-50"
                    >
                      {deleting === image.key ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
