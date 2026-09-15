"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import WatermarkedPhoto from "@/components/WatermarkedPhoto";

interface Photo {
  id: number;
  src: string;
  alt: string;
  title: string;
  location: string;
}

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ photos, currentIndex, onClose, onNavigate }: LightboxProps) {
  const currentPhoto = photos[currentIndex];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else if (e.key === "ArrowRight" && currentIndex < photos.length - 1) {
        onNavigate(currentIndex + 1);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, photos.length, onClose, onNavigate]);

  // Don't render until mounted on the client (prevents SSR mismatch)
  if (!mounted) return null;

  const lightboxContent = (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center text-white hover:opacity-70 transition-opacity"
        aria-label="Close lightbox"
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
        <div className="relative w-full max-w-7xl max-h-full">
          <WatermarkedPhoto
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            className="max-h-[80vh] object-contain"
            watermarkClassName="w-24 md:w-32"
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <button
          onClick={() => onNavigate(currentIndex - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white hover:opacity-70 transition-opacity"
          aria-label="Previous image"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {currentIndex < photos.length - 1 && (
        <button
          onClick={() => onNavigate(currentIndex + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white hover:opacity-70 transition-opacity"
          aria-label="Next image"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Metadata */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="container-padding text-center text-white">
          <h3 className="text-xl font-medium mb-2">{currentPhoto.title}</h3>
          <p className="text-sm opacity-80">{currentPhoto.location}</p>
          <p className="text-xs opacity-60 mt-2">
            {currentIndex + 1} / {photos.length}
          </p>
        </div>
      </div>

      {/* Click outside to close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />
    </div>
  );

  // Use a portal so the lightbox mounts directly on document.body,
  // preventing React removeChild errors from DOM tree mismatches
  return createPortal(lightboxContent, document.body);
}

