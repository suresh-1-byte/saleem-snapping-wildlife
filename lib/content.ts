import { readContent } from "@/lib/contentStorage";

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

export async function getSpecies(): Promise<Species[]> {
  return readContent<Species>("species.json", "species");
}

export async function getStories(): Promise<Story[]> {
  return readContent<Story>("stories.json", "stories");
}
