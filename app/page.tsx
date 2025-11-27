import { HeroSection } from "@/components/hero-section"
import { ServiceSummary } from "@/components/service-summary"
import { UseCaseScenarios } from "@/components/use-case-scenarios"
import { DemoPreview } from "@/components/demo-preview"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServiceSummary />
      <UseCaseScenarios />
      <DemoPreview />
      <Footer />
    </main>
  )
}
