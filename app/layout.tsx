import type { Metadata } from "next";
import { Inter, Playfair_Display, Cinzel } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cinzel.variable}`}>
      <head>
        {/* Preload hero image for faster LCP */}
        <link rel="preload" href="/images/hero%20pg.png" as="image" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
