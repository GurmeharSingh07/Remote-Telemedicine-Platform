import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { SocialProofWithMarquee } from "@/components/SocialProofBar";
import FeaturesSection from "@/components/FeaturesSection";
import HEALAISection from "@/components/HEALAISection";
import DashboardShowcase from "@/components/DashboardShowcase";
import HospitalNetworkMap from "@/components/HospitalNetworkMap";
import ImageSection1 from "@/components/ImageSection1";
import ImageSection2 from "@/components/ImageSection2";
import ImageSection3 from "@/components/ImageSection3";
import Footer from "@/components/Footer";
import HealChatbotWidget from "@/components/HealChatbotWidget";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <HeroSection />
      <SocialProofWithMarquee />
      <FeaturesSection />
      <HEALAISection />
      <DashboardShowcase />
      <HospitalNetworkMap />
      <ImageSection1 />
      <ImageSection2 />
      <ImageSection3 />
      <Footer />
      <HealChatbotWidget />
    </SmoothScrollProvider>
  );
}