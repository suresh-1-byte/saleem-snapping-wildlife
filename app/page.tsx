import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import CameraScrollSection from "@/components/CameraScrollSection";
import FeaturedWork from "@/components/home/FeaturedWork";
import FeaturedStory from "@/components/home/FeaturedStory";
import SpeciesPreview from "@/components/home/SpeciesPreview";
import ClosingCTA from "@/components/home/ClosingCTA";
import { getStories } from "@/lib/content";
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

export default async function Home() {
  // Fetch featured images directly from Cloudinary
  let featuredImages: string[] = [];
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'wildlife/featured',
      max_results: 500,
    });

    featuredImages = result.resources.map((resource: any) => resource.secure_url);
    console.log(`Homepage loaded ${featuredImages.length} featured images from Cloudinary`);
  } catch (error) {
    console.error('Failed to load featured images:', error);
  }

  const stories = await getStories();

  return (
    <>
      <Hero />
      <Intro />
      <CameraScrollSection />
      <FeaturedWork images={featuredImages} />
      {stories[0] && <FeaturedStory story={stories[0]} />}
      <SpeciesPreview />
      <ClosingCTA />
    </>
  );
}
