import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pariniti Exhibit Solutions | Premium Exhibition Stall Design & Fabrication",
  description:
    "We Design Experiences, Not Just Stalls. India's leading exhibition stall fabrication & branding company. Premium stall design, fabrication, and branding for trade shows and expos.",
  keywords: [
    "exhibition stall design",
    "stall fabrication",
    "exhibition branding",
    "trade show booth",
    "event planning India",
    "exhibition stand builder",
    "Pariniti Exhibit Solutions",
  ],
  openGraph: {
    title: "Pariniti Exhibit Solutions | Premium Exhibition Stall Design",
    description:
      "We Design Experiences, Not Just Stalls. Transform your exhibition space into an unforgettable brand experience.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
