import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSpecies } from "@/lib/content";
import WatermarkedPhoto from "@/components/WatermarkedPhoto";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const species = await getSpecies();
  return species.map((entry) => ({ slug: entry.id }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const entry = (await getSpecies()).find((species) => species.id === params.slug);
  return entry
    ? { title: `${entry.commonName} | Saleem Snapping`, description: entry.observation }
    : { title: "Species | Saleem Snapping" };
}

export default async function SpeciesPage({ params }: { params: { slug: string } }) {
  const entry = (await getSpecies()).find((species) => species.id === params.slug);
  if (!entry) notFound();

  const uniqueImages = Array.from(new Set(entry.images));

  return (
    <article className="bg-black pt-32 pb-24">
      <div className="container-padding max-w-7xl mx-auto">
        <Link href="/species" className="text-xs tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">Back to species</Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mt-12">
          <div className={uniqueImages.length > 1 ? "grid grid-cols-2 gap-4" : "max-w-xl"}>
            {uniqueImages.map((image, index) => (
              <div key={image} className={`overflow-hidden ${index === 0 ? "" : "mt-12"}`}>
                <WatermarkedPhoto src={image} alt={`${entry.commonName}, photograph ${index + 1}`} watermarkClassName="w-20 md:w-24" />
              </div>
            ))}
          </div>
          <div className="lg:sticky lg:top-32">
            <p className="text-xs tracking-[0.25em] uppercase text-earthy-green-light mb-5">{entry.locations.join(", ")}</p>
            <h1 className="text-4xl sm:text-6xl font-light tracking-wide uppercase mb-4">{entry.commonName}</h1>
            <p className="text-lg italic opacity-60 mb-10">{entry.scientificName}</p>
            <p className="text-xl leading-relaxed opacity-85">{entry.observation}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
