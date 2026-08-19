import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import Hero from '@/sections/Hero';
import Stats from '@/sections/Stats';
import CenterCardCarousel from '@/sections/CenterCardCarousel';
import PainPoints from '@/sections/PainPoints';
import Steps from '@/sections/Steps';
import Courses from '@/sections/Courses';
import Testimonials from '@/sections/Testimonials';
import SocialProof from '@/sections/SocialProof';
import FAQ from '@/sections/FAQ';
import Instructor from '@/sections/Instructor';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function LandingPage() {
  useSmoothScroll();
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Stats />
        <CenterCardCarousel />
        <PainPoints />
        <Steps />
        <Courses />
        <Instructor />
        <SocialProof />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
