import type { Metadata } from "next";
import { Poppins, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
});

export const metadata: Metadata = {
  title: "AnaghaInteriors | Space. Crafted with intention.",
  description: "Freelance interior architecture and design portfolio specializing in minimalist residential spaces, tactile materiality, and bespoke custom cabinetry.",
  openGraph: {
    title: "AnaghaInteriors | Space. Crafted with intention.",
    description: "Freelance interior architecture and design portfolio specializing in minimalist residential spaces.",
    url: "https://anaghainteriors.vercel.app",
    siteName: "AnaghaInteriors",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "AnaghaInteriors Interior Design Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${dmSerif.variable} scroll-smooth`}>
      <body className="antialiased font-poppins selection:bg-electricBlue selection:text-white bg-background text-cream">
        {/* Scroll progression tracking bar */}
        <ScrollProgress />
        {/* Subtle cinematic film grain noise overlay */}
        <div className="noise-overlay" />

        <SmoothScrollProvider>
          <Navbar />
          <CustomCursor />
          <main className="relative min-h-screen bg-background w-full">
            {children}
          </main>
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
