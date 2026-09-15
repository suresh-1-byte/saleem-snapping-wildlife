import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStories } from "@/lib/content";
import StoryPhotoViewer from "@/components/stories/StoryPhotoViewer";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map((story) => ({ slug: story.id }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const story = (await getStories()).find((entry) => entry.id === params.slug);
  return story
    ? { title: `${story.title} | Field Journal` }
    : { title: "Field Journal" };
}

export default async function StoryPage({ params }: { params: { slug: string } }) {
  const story = (await getStories()).find((entry) => entry.id === params.slug);
  if (!story) notFound();

  return (
    <>
      <article
        style={{
          backgroundColor: "#0d0b09",
          minHeight: "100vh",
          padding: "40px 16px",
          fontFamily: "'Playfair Display', Georgia, serif",
          color: "#2a221b",
        }}
        className="flex flex-col items-center justify-center"
      >
        {/* ========================================================= */}
        {/* OPEN RECTANGLE DIARY FRAME SPREAD                         */}
        {/* ========================================================= */}
        <div
          style={{
            maxWidth: "1100px",
            width: "100%",
            backgroundColor: "#f4ebd0",
            border: "12px solid #2b1e16",
            borderRadius: "6px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.85), inset 0 0 60px rgba(100,60,20,0.3)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* CENTER BINDER CREASE & RINGS */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              transform: "translateX(-50%)",
              width: "40px",
              background: "linear-gradient(to right, rgba(0,0,0,0.15), rgba(60,35,15,0.25), rgba(0,0,0,0.15))",
              zIndex: 30,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "40px 0",
              alignItems: "center",
              pointerEvents: "none",
            }}
            className="absolute left-[calc(100%-40px)] md:left-1/2 flex"
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  backgroundColor: "#110b07",
                  border: "1px solid #5c4331",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.8)",
                }}
              />
            ))}
          </div>

          {/* TWO-PAGE DIARY GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* LEFT PAGE: PHOTO & FIELD DATA */}
            <div
              style={{
                padding: "40px 32px",
                borderRight: "1px solid rgba(80,50,20,0.2)",
                backgroundColor: "#efe4c8",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                {/* Journal Stamp Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: "11px", letterSpacing: "2px", color: "#6b4f3a" }}>
                    FIELD LOG #{story.id.slice(0, 6).toUpperCase()}
                  </span>
                  <div
                    style={{
                      border: "2px dashed #8c5a3c",
                      borderRadius: "50%",
                      width: "65px",
                      height: "65px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: "rotate(-12deg)",
                      color: "#6b4f3a",
                      fontFamily: "'Courier Prime', monospace",
                      fontSize: "9px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    WILDLIFE<br />VERIFIED
                  </div>
                </div>

                <StoryPhotoViewer images={story.images} title={story.title} />
              </div>

              {/* Observed Species Card */}
              <div
                style={{
                  backgroundColor: "#e4d6b6",
                  border: "1px solid #c8b793",
                  padding: "16px",
                  borderRadius: "2px",
                  marginTop: "20px",
                }}
              >
                <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "10px", letterSpacing: "1px", color: "#5c4331", fontWeight: "bold", marginBottom: "6px" }}>
                  CATALOGED SPECIES:
                </div>
                <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "12px", color: "#2a1e16" }}>
                  {story.species.join(" • ")}
                </div>
              </div>
            </div>

            {/* RIGHT PAGE: DIARY NARRATIVE WRITING */}
            <div
              style={{
                padding: "40px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#f4ebd0",
              }}
            >
              <div>
                {/* Location and Date Banner */}
                <div
                  style={{
                    borderBottom: "1px dashed rgba(90,60,30,0.3)",
                    paddingBottom: "12px",
                    marginBottom: "24px",
                    fontFamily: "'Courier Prime', monospace",
                    fontSize: "12px",
                    color: "#6b4f3a",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>LOC: {story.location.toUpperCase()}</span>
                  <span>DATE: {story.date}</span>
                </div>

                {/* Entry Title */}
                <h1
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    color: "#1e140d",
                    marginBottom: "20px",
                    lineHeight: "1.2",
                  }}
                >
                  {story.title}
                </h1>

                {/* Field Notes Intro Quote */}
                <p
                  style={{
                    fontSize: "17px",
                    fontStyle: "italic",
                    color: "#4a3322",
                    borderLeft: "3px solid #8c5a3c",
                    paddingLeft: "14px",
                    marginBottom: "20px",
                    lineHeight: "1.6",
                  }}
                >
                  &ldquo;{story.introduction}&rdquo;
                </p>

                {/* Body Paragraphs */}
                <div
                  style={{
                    fontSize: "15px",
                    lineHeight: "1.8",
                    color: "#2c221a",
                  }}
                >
                  {story.content}
                </div>
              </div>

              {/* Page Footer */}
              <div
                style={{
                  marginTop: "40px",
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(90,60,30,0.2)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: "'Courier Prime', monospace",
                  fontSize: "11px",
                  color: "#7a5c45",
                }}
              >
                <span>PAGE 01 / OBS LOG</span>
                <span>SALEEM SNAPPING</span>
              </div>
            </div>

          </div>
        </div>

        {/* BACK TO STORIES BUTTON */}
        <div style={{ marginTop: "32px" }}>
          <Link
            href="/stories"
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: "12px",
              letterSpacing: "2px",
              color: "#f4ebd0",
              backgroundColor: "#2b1e16",
              padding: "12px 24px",
              border: "1px solid #5c4331",
              borderRadius: "2px",
              textDecoration: "none",
              textTransform: "uppercase",
              display: "inline-block",
            }}
          >
            ← Back to Field Index
          </Link>
        </div>
      </article>
    </>
  );
}