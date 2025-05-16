
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { SearchBox } from "@/components/home/SearchBox";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { CarCategories } from "@/components/home/CarCategories";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CTASection } from "@/components/home/CTASection";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />

      <main className="flex-grow relative z-0">
        <HeroSection />
        <SearchBox />
        <FeaturedCars />
        <CarCategories />
        <WhyChooseUs />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
