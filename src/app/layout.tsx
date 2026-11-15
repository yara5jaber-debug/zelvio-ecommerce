
import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import BottomNavigation from "@/components/layout/BottomNavigation";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  variable: "--font-ibm-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "E-Commerce Store",
  description: "A modern multi-category shopping experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
    <body
      className={`${archivo.variable} ${ibmPlexArabic.variable} font-sans antialiased pb-16 md:pb-0`}
      >

        {children}
        <BottomNavigation />
      </body>
    </html>
  );
}
