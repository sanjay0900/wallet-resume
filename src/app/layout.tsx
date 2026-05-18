import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wallet Resume",
  description:
    "Discover your ecosystem addiction, degen psychology and onchain reputation.",

  metadataBase: new URL(
    "https://wallet-resume.vercel.app"
  ),

  openGraph: {
    title:
      "Wallet Resume — Your wallet has lore.",
    description:
      "Analyze your wallet personality and onchain reputation.",
    url: "https://wallet-resume.vercel.app",
    siteName: "Wallet Resume",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wallet Resume",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Wallet Resume — Your wallet has lore.",
    description:
      "Analyze your wallet personality and onchain reputation.",
    images: ["/og-image.png"],
    creator: "@S4Sanjay_das",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<body>
  {children}
  <Analytics />
</body>
    </html>
  );
}