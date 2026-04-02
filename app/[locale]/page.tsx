import { useTranslations } from 'next-intl';
import HeroSection from '@/components/landing/HeroSection';
import SocialProofStrip from '@/components/landing/SocialProofStrip';
import PricingGuarantee from '@/components/landing/PricingGuarantee';
import PopularPlans from '@/components/landing/PopularPlans';
import TrustBadges from '@/components/landing/TrustBadges';
import ReviewCarousel from '@/components/landing/ReviewCarousel';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SocialProofStrip />
      <PricingGuarantee />
      <PopularPlans />
      <TrustBadges />
      <ReviewCarousel />
    </>
  );
}
