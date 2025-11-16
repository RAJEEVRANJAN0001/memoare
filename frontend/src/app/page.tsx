import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroFuturistic from '@/components/sections/HeroFuturistic'
import FeaturesAdvanced from '@/components/sections/FeaturesAdvanced'
import MemoryShowcase from '@/components/sections/MemoryShowcase'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import InteractiveDemo from '@/components/sections/InteractiveDemo'
import TestimonialsAdvanced from '@/components/sections/TestimonialsAdvanced'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0118]">
      <Header />
      <HeroFuturistic />
      <FeaturesAdvanced />
      <MemoryShowcase />
      <HowItWorksSection />
      <InteractiveDemo />
      <TestimonialsAdvanced />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
