import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Cinzel } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SiteImagesProvider } from "@/components/SiteImagesProvider";
import { getSiteImageMap } from "@/lib/cloudinary";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cinzel = Cinzel({ 
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Saleem Snapping | Wildlife Photography",
  description: "Wildlife photography from Chennai, India. Birds, mammals, landscapes and the quiet moments that often go unnoticed in the wild.",
  keywords: ["wildlife photography", "Chennai photographer", "bird photography", "mammal photography", "South India wildlife"],
  authors: [{ name: "Saleem Snapping" }],
  openGraph: {
    title: "Saleem Snapping | Wildlife Photography",
    description: "Wildlife photography from Chennai, India. Birds, mammals, landscapes and the quiet moments that often go unnoticed in the wild.",
    type: "website",
    locale: "en_US",
    siteName: "Saleem Snapping",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saleem Snapping | Wildlife Photography",
    description: "Wildlife photography from Chennai, India. Birds, mammals, landscapes and the quiet moments that often go unnoticed in the wild.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Admin-uploaded replacements for the site's images, shared with every page
  // so the website always shows exactly what the admin panel shows.
  const siteImages = await getSiteImageMap();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cinzel.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={inter.className}>
        <SiteImagesProvider images={siteImages}>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </SiteImagesProvider>
      </body>
    </html>
  );
}
