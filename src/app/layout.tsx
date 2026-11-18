
import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans_Arabic } from "next/font/google";
import { Suspense } from "react";

import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import CategoryNav from "@/components/layout/CategoryNav";
import BottomNavigation from "@/components/layout/BottomNavigation";
import Footer from "@/components/layout/Footer";
import CartProvider from "@/components/cart/CartProvider";
import { WishlistProvider } from "@/components/wishlist/WishlistProvider";

import "./globals.css";

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
  title: {
    default: "ZELVIO | The Everyday Edit",
    template: "%s | ZELVIO",
  },
  description:
    "Discover thoughtfully selected essentials across fashion, electronics, beauty, home and grocery.",
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
        <CartProvider>
          <WishlistProvider>
            <AnnouncementBar />
            <Header />
            <CategoryNav />

            {children}

            <Footer />

            <Suspense fallback={null}>
              <BottomNavigation />
            </Suspense>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
