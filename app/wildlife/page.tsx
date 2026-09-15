import type { Metadata } from "next";
import WildlifeGallery from "@/components/wildlife/WildlifeGallery";
import { getPublicImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Wildlife Portfolio | Saleem Snapping",
  description: "A curated collection of wildlife photography from South India. Birds, mammals, macro, landscapes, and wildlife moments.",
  openGraph: {
    title: "Wildlife Portfolio | Saleem Snapping",
    description: "A curated collection of wildlife photography from South India.",
  },
};

export default async function WildlifePage() {
  const portfolioImages = await getPublicImages("portfolio");

  return (
    <>
      <WildlifeGallery images={portfolioImages} />
    </>
  );
}
