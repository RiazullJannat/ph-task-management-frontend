import CTABanner from "@/components/pages/shared/home/CTABanner";
import FeaturesSection from "@/components/pages/shared/home/FeaturesSection";
import HeroSection from "@/components/pages/shared/home/HeroSection";
import HowItWorksSection from "@/components/pages/shared/home/HowItWorksSection";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTABanner />
    </main>
  );
};

export default Home;
