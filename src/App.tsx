import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import Hero from '@/sections/Hero';
import CenterCardCarousel from '@/sections/CenterCardCarousel';
import PainPoints from '@/sections/PainPoints';
import Courses from '@/sections/Courses';
import Testimonials from '@/sections/Testimonials';
import SocialProof from '@/sections/SocialProof';
import FAQ from '@/sections/FAQ';
import Instructor from '@/sections/Instructor';
import LeadForm from '@/sections/LeadForm';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function App() {
  useSmoothScroll();
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <CenterCardCarousel />
        <PainPoints />
        <Courses />
        <Instructor />
        <SocialProof />
        <Testimonials />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
