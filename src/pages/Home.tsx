import { HeroSection } from '../components/HeroSection'
import { WhyFailSection } from '../components/WhyFailSection'
import { HowItWorksSection } from '../components/HowItWorksSection'
import { StayMotivatedSection } from '../components/StayMotivatedSection'

export function Home() {
  return (
    <>
      <HeroSection />
      <WhyFailSection />
      <HowItWorksSection />
      <StayMotivatedSection />
    </>
  )
}
