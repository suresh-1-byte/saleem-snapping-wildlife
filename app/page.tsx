import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import CameraScrollSection from "@/components/CameraScrollSection";
import FeaturedWork from "@/components/home/FeaturedWork";
import FeaturedStory from "@/components/home/FeaturedStory";
import SpeciesPreview from "@/components/home/SpeciesPreview";
import ClosingCTA from "@/components/home/ClosingCTA";
import { getPublicImages } from "@/lib/images";
import { getStories } from "@/lib/content";

export default async function Home() {
  const featuredImages = await getPublicImages("featured");
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
