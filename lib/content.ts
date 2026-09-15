import { readJSON } from "@/lib/db";

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
  const data = await readJSON("species.json");
  return data?.species || [];
}

export async function getStories(): Promise<Story[]> {
  const data = await readJSON("stories.json");
  return data?.stories || [];
}
