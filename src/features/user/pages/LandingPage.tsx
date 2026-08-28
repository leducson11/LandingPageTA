import TopBar from '@user/components/TopBar';
import Header from '@user/components/Header';
import Footer from '@user/components/Footer';
import FloatingCTA from '@user/components/FloatingCTA';
import Hero from '@user/sections/Hero';
import Stats from '@user/sections/Stats';
import CenterCardCarousel from '@user/sections/CenterCardCarousel';
import PainPoints from '@user/sections/PainPoints';
import Steps from '@user/sections/Steps';
import Courses from '@user/sections/Courses';
import Testimonials from '@user/sections/Testimonials';
import SocialProof from '@user/sections/SocialProof';
import FAQ from '@user/sections/FAQ';
import Instructor from '@user/sections/Instructor';
import { useSmoothScroll } from '@user/hooks/useSmoothScroll';
import { useScrollAnimation } from '@user/hooks/useScrollAnimation';

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
