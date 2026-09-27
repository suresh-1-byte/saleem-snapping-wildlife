import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import CameraScrollSection from "@/components/CameraScrollSection";
import FeaturedWork from "@/components/home/FeaturedWork";
import FeaturedStory from "@/components/home/FeaturedStory";
import SpeciesPreview from "@/components/home/SpeciesPreview";
import ClosingCTA from "@/components/home/ClosingCTA";
import { getStories } from "@/lib/content";
import { listAssets } from "@/lib/cloudinary";

// Always render with the latest admin changes.
export const dynamic = 'force-dynamic';

export default async function Home() {
  const [featured, stories] = await Promise.all([
    listAssets("wildlife/featured/"),
    getStories(),
  ]);

  return (
    <>
      <Hero />
      <Intro />
      <CameraScrollSection />
      <FeaturedWork images={featured.map((image) => image.url)} />
      {stories[0] && <FeaturedStory story={stories[0]} />}
      <SpeciesPreview />
      <ClosingCTA />
    </>
  );
}
