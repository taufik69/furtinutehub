import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";

import Footer from "@/components/commonComponents/Footer";
import Navbar from "@/components/Homepage/Navbar";
import ToastContainerClient from "@/components/AllCollection/Toast/ToastContainer";
import FloatingContact from "@/components/commonComponents/FloatingContact";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "TotalBazar.bd | Premium Products & Home Decor Store in Bangladesh",
    template: "%s | TotalBazar.bd",
  },
  description:
    "Discover high-quality, modern Products and home decor at TotalBazar.bd. Shop premium sofas, beds, ergonomic chairs, and office solutions in Bangladesh with home delivery.",
  keywords: [
    "Products",
    "home decor",
    "modern Products",
    "sofa",
    "bed",
    "office Products",
    "TotalBazar.bd",
    "Bangladesh Products",
    "online shopping BD",
    "living room Products",
  ],
  metadataBase: new URL("https://totalbazar.bd"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    title: "TotalBazar.bd | Premium Furniture & Home Decor in Bangladesh",
    description:
      "Discover high-quality, modern Products and home decor at TotalBazar.bd. Shop premium sofas, beds, ergonomic chairs, and office solutions in Bangladesh with home delivery.",
    url: "https://totalbazar.bd",
    siteName: "TotalBazar.bd",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "TotalBazar.bd Furniture Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TotalBazar.bd | Premium Products & Home Decor",
    description:
      "Modern furniture and home decor solutions in Bangladesh. Quality you can trust.",
    images: ["/logo.jpeg"],
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {process.env.NEXT_PUBLIC_API_URL && (
          <>
            <link rel="preconnect" href={new URL(process.env.NEXT_PUBLIC_API_URL).origin} />
            <link rel="dns-prefetch" href={new URL(process.env.NEXT_PUBLIC_API_URL).origin} />
          </>
        )}
      </head>
      <Script id="google-tag-manager" strategy="lazyOnload">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-57HWKN4F');
        `}
      </Script>
      <body className={`${poppins.variable}`} suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-57HWKN4F"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Navbar />
        <ToastContainerClient />
        <FloatingContact />
        {children}
        <Footer />
      </body>
    </html>
  );
}
