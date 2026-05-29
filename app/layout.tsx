import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Splendid Spaces Pune",
  description:
    "Transforming Spaces, Enhancing Lives. Premium residential and commercial interior design solutions in Pune.",

  icons: {
    icon: "/icon.png",
  },

  keywords: [
    "Interior Designer Pune",
    "Modular Kitchen Pune",
    "Home Interior Design Pune",
    "Commercial Interior Design",
    "Luxury Interiors Pune",
    "Splendid Spaces",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
