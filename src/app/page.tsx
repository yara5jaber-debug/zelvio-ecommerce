
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import CategoryNav from "@/components/layout/CategoryNav";
import HeroSection from "@/components/home/HeroSection";
import TrendingSection from "@/components/home/TrendingSection";

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <CategoryNav />

      <main id="main-content">
        <HeroSection />
        <TrendingSection />
      </main>
    </>
  );
}
