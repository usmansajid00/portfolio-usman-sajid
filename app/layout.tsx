import type { Metadata } from "next";
import { Inter, Poppins, Fira_Code } from "next/font/google";
import "./globals.css";
import { seo, personalInfo, education } from "@/lib/portfolio-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: seo.metaTitle,
  description: seo.metaDescription,
  keywords: seo.keywords,
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: seo.structuredData.url,
    title: seo.metaTitle,
    description: seo.metaDescription,
    siteName: personalInfo.name,
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} - ${personalInfo.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.metaTitle,
    description: seo.metaDescription,
    creator: seo.twitterHandle,
    images: [seo.ogImage],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL(seo.structuredData.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    url: seo.structuredData.url,
    image: personalInfo.avatar,
    email: personalInfo.email,
    telephone: personalInfo.phone,
    sameAs: seo.structuredData.sameAs,
    address: {
      "@type": "PostalAddress",
      addressLocality: personalInfo.location.city,
      addressRegion: personalInfo.location.state,
      addressCountry: personalInfo.location.country,
    },
    alumniOf: {
      "@type": "Organization",
      name: education[0]?.institution || "",
    },
    knowsAbout: seo.keywords,
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${firaCode.variable} text-text bg-background font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
