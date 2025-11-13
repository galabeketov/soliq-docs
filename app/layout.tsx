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
  title: "Soliq Servis API Documentation",
  description:
    "Integration APIs for Soliq-Service platform. Complete documentation for developers.",
  keywords: "soliq servis, api, documentation, integration, uzbekistan, tax",
  openGraph: {
    title: "Soliq Servis API Docs",
    description: "Integration APIs documentation",
    url: "https://v3.soliqservis.uz:2443/docs",
    siteName: "Soliq Servis",
    locale: "uz_UZ",
    type: "website",
  },
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
