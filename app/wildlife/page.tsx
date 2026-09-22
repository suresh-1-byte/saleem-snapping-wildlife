import type { Metadata } from "next";
import WildlifeGallery from "@/components/wildlife/WildlifeGallery";
import fs from 'fs/promises';
import path from 'path';

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
  // Read portfolio images from JSON file
  let portfolioImages: any[] = [];
  try {
    const portfolioFile = path.join(process.cwd(), 'data', 'portfolio.json');
    const fileContent = await fs.readFile(portfolioFile, 'utf-8');
    portfolioImages = JSON.parse(fileContent);
  } catch (error) {
    console.error('Failed to load portfolio images:', error);
  }

  return (
    <>
      <WildlifeGallery images={portfolioImages} />
    </>
  );
}
