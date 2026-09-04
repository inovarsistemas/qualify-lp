import { CTASection } from "@/components/marketing/cta-section"
import { Features } from "@/components/marketing/features"
import { Hero } from "@/components/marketing/hero"
import { HowItWorks } from "@/components/marketing/how-it-works"
import { SiteFooter } from "@/components/marketing/site-footer"
import { SiteHeader } from "@/components/marketing/site-header"

export default function Page() {
  return (
    <div
      className="min-h-svh bg-black text-white"
      style={{
        backgroundImage:
          "radial-gradient(1100px 620px at 78% -8%, rgba(244,68,26,0.12), transparent 60%), radial-gradient(900px 500px at 0% 30%, rgba(251,92,36,0.06), transparent 60%)",
      }}
    >
      <SiteHeader />
      <Hero />
      <HowItWorks />
      <Features />
      <CTASection />
      <SiteFooter />
    </div>
  )
}
