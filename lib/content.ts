import { unstable_cache } from "next/cache";
import { readContent } from "@/lib/contentStorage";
import { CLOUDINARY_CACHE_TAG } from "@/lib/cloudinary";

export interface Species {
  id: string;
  commonName: string;
  scientificName: string;
  category: string;
  images: string[];
  locations: string[];
  observation: string;
}

export interface Story {
  id: string;
  title: string;
  location: string;
  date: string;
  introduction: string;
  content: string;
  heroImage: string;
  images: string[];
  species: string[];
}

// Cached for visitors; saving in the admin panel clears the cache immediately.
const cacheOptions = { tags: [CLOUDINARY_CACHE_TAG], revalidate: 300 };

export const getSpecies = unstable_cache(
  (): Promise<Species[]> => readContent<Species>("species.json", "species"),
  ["content-species-v1"],
  cacheOptions
);

export const getStories = unstable_cache(
  (): Promise<Story[]> => readContent<Story>("stories.json", "stories"),
  ["content-stories-v1"],
  cacheOptions
);
