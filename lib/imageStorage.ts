// Simple image storage mapping
// Maps local paths to Cloudinary URLs

export interface ImageMapping {
  [key: string]: string;
}

// This will be updated when images are uploaded via admin
// For now, it points to the original images in /public
export const imageUrls: ImageMapping = {
  // Hero & Backgrounds
  "/images/hero%20pg.png": "/images/hero%20pg.png",
  "/images/closing-cta.jpg": "/images/closing-cta.jpg",
  "/images/contact-bg.jpg": "/images/contact-bg.jpg",
  
  // Featured Work
  "/images/featured-1.jpg": "/images/featured-1.jpg",
  "/images/featured-2.jpg": "/images/featured-2.jpg",
  "/images/featured-3.jpg": "/images/featured-3.jpg",
  "/images/featured-4.jpg": "/images/featured-4.jpg",
  "/images/featured-5.jpg": "/images/featured-5.jpg",
  "/images/featured-6.jpg": "/images/featured-6.jpg",
  
  // Portfolio
  "/images/portfolio-1.jpg": "/images/portfolio-1.jpg",
  "/images/portfolio-2.jpg": "/images/portfolio-2.jpg",
  "/images/portfolio-3.jpg": "/images/portfolio-3.jpg",
  "/images/portfolio-4.jpg": "/images/portfolio-4.jpg",
  "/images/portfolio-5.jpg": "/images/portfolio-5.jpg",
  "/images/portfolio-6.jpg": "/images/portfolio-6.jpg",
};

export function getImageUrl(path: string): string {
  return imageUrls[path] || path;
}
