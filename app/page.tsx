import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import CameraScrollSection from "@/components/CameraScrollSection";
import FeaturedWork from "@/components/home/FeaturedWork";
import FeaturedStory from "@/components/home/FeaturedStory";
import SpeciesPreview from "@/components/home/SpeciesPreview";
import ClosingCTA from "@/components/home/ClosingCTA";
import { getStories } from "@/lib/content";
import fs from 'fs/promises';
import path from 'path';

// Disable caching to always show latest images
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  // Read featured images from JSON file
  let featuredImages: string[] = [];
  try {
    const featuredFile = path.join(process.cwd(), 'data', 'featured.json');
    const fileContent = await fs.readFile(featuredFile, 'utf-8');
    const featuredData = JSON.parse(fileContent);
    featuredImages = featuredData.map((img: any) => img.cloudinaryUrl);
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
