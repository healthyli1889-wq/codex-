import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import BackgroundBlobs from "@/components/BackgroundBlobs";

export const metadata: Metadata = {
  title: "Creation Space - Personal Portfolio & CMS",
  description: "Welcome to my creative space - featuring my products, research, podcast, and portfolio work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <BackgroundBlobs />
        <Navigation />
        <main className="pt-20 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
