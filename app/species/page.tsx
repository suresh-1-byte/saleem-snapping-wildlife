import type { Metadata } from "next";
import SpeciesGrid from "@/components/species/SpeciesGrid";
import { getSpecies } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Species Index | Saleem Snapping",
  description: "A visual index of documented wildlife species from across South India.",
  openGraph: {
    title: "Species Index | Saleem Snapping",
    description: "A visual index of documented wildlife species from across South India.",
  },
};

export default async function SpeciesPage() {
  const species = await getSpecies();

  return (
    <>
      <SpeciesGrid species={species} />
    </>
  );
}
