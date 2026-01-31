import type { Metadata } from "next";
import { DotGothic16, Space_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/components.css";
import { Analytics } from "@vercel/analytics/next"

const dotGothic16 = DotGothic16({
  variable: "--font-dotgothic16",
  subsets: ["latin"],
  weight: ["400"],
});

const spaceMono = Space_Mono({
  variable: "--font-spacemono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Designing AI Systems",
  description: "Understanding AI through system design components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dotGothic16.variable} ${spaceMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
