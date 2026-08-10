import { FeaturesSectionWithHoverEffects } from "./landing/Features-Card"

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-24 py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            What We Do
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>
        
        <FeaturesSectionWithHoverEffects />
      </div>
    </section>
  )
}
