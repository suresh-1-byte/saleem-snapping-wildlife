import type { Metadata } from "next";
import StoriesGrid from "@/components/stories/StoriesGrid";
import { getStories } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Wildlife Stories | Saleem Snapping",
  description: "Documentary-style wildlife narratives from wetlands and forests across South India.",
  openGraph: {
    title: "Wildlife Stories | Saleem Snapping",
    description: "Documentary-style wildlife narratives from wetlands and forests across South India.",
  },
};

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <>
      <div className="pt-32 pb-16 bg-black">
        <div className="container-padding text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wider uppercase">
            Wildlife Stories
          </h1>
          <div className="w-16 h-px bg-muted-olive mx-auto mt-5" />
          <p className="text-xl opacity-80 mt-6 max-w-3xl mx-auto">
            Documentary-style narratives from the wild
          </p>
        </div>
      </div>
      <StoriesGrid stories={stories} />
    </>
  );
}
