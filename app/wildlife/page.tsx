import type { Metadata } from "next";
import WildlifeGallery from "@/components/wildlife/WildlifeGallery";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

// Disable caching to always show latest images
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Wildlife Portfolio | Saleem Snapping",
  description: "A curated collection of wildlife photography from South India. Birds, mammals, macro, landscapes, and wildlife moments.",
  openGraph: {
    title: "Wildlife Portfolio | Saleem Snapping",
    description: "A curated collection of wildlife photography from South India.",
  },
};

export default async function WildlifePage() {
  // Fetch portfolio images directly from Cloudinary
  let portfolioImages: any[] = [];
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'wildlife/portfolio',
      max_results: 500,
      context: true, // Include metadata
    });

    portfolioImages = result.resources.map((resource: any) => ({
      id: resource.public_id,
      cloudinaryUrl: resource.secure_url,
      title: resource.context?.custom?.title || 'Untitled',
      location: resource.context?.custom?.location || 'Unknown',
      category: resource.context?.custom?.category ? resource.context.custom.category.split(',') : ['All'],
      uploadedAt: resource.created_at,
    }));

    console.log(`Wildlife page loaded ${portfolioImages.length} images from Cloudinary`);
  } catch (error) {
    console.error('Failed to load portfolio images:', error);
  }

  return (
    <>
      <WildlifeGallery images={portfolioImages} />
    </>
  );
}
