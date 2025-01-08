import { CTASection } from '@/features/home/components/CTASection';
import { FeatureHighlights } from '@/features/home/components/FeatureHighlights';
import { ForwardLink } from '@/features/home/components/ForwardLink';
import { HeroSection } from '@/features/home/components/HeroSection';
import { UsedLibraries } from '@/features/home/components/UsedLibraries';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection>
        <ForwardLink />
      </HeroSection>
      <FeatureHighlights />
      <UsedLibraries />
      <CTASection />
    </div>
  );
}
