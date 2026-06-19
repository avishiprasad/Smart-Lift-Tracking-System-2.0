import { LandingNav } from "@/components/layout/landing-nav";
import { LandingFooter } from "@/components/layout/landing-footer";
import { HeroSection } from "@/components/dashboard/hero-section";
import { StatsSection } from "@/components/dashboard/stats-section";
import { FeaturesSection } from "@/components/dashboard/features-section";
import { ArchitectureSection } from "@/components/dashboard/architecture-section";
import { TechStackSection } from "@/components/dashboard/tech-stack-section";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ArchitectureSection />
      <TechStackSection />
      <LandingFooter />
    </div>
  );
}