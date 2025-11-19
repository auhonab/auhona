import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auhona - Full Stack Developer & AI Enthusiast",
  description: "Portfolio of Auhona, a passionate full stack developer and AI/ML enthusiast creating innovative solutions that bridge technology and user experience.",
  keywords: ["Auhona", "Full Stack Developer", "AI", "Machine Learning", "React", "Node.js", "Portfolio"],
  authors: [{ name: "Auhona" }],
  creator: "Auhona",
  openGraph: {
    title: "Auhona - Full Stack Developer & AI Enthusiast",
    description: "Portfolio of Auhona, a passionate full stack developer and AI/ML enthusiast creating innovative solutions.",
    url: "https://auhona-portfolio.vercel.app",
    siteName: "Auhona Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Auhona Portfolio"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auhona - Full Stack Developer & AI Enthusiast",
    description: "Portfolio of Auhona, a passionate full stack developer and AI/ML enthusiast.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-serif bg-background-dark text-dutch-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
