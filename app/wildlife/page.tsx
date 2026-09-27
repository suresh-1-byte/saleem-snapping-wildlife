import type { Metadata } from "next";
import WildlifeGallery from "@/components/wildlife/WildlifeGallery";
import { listAssets } from "@/lib/cloudinary";
import { toPortfolioImage } from "@/lib/portfolioData";

// Always render with the latest admin changes.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Wildlife Portfolio | Saleem Snapping",
  description: "A curated collection of wildlife photography from South India. Birds, mammals, macro, landscapes, and wildlife moments.",
  openGraph: {
    title: "Wildlife Portfolio | Saleem Snapping",
    description: "A curated collection of wildlife photography from South India.",
  },
};

export default async function WildlifePage() {
  const portfolioImages = (await listAssets("wildlife/portfolio/")).map(toPortfolioImage);

  return <WildlifeGallery images={portfolioImages} />;
}
