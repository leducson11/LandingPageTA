import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import Hero from '@/sections/Hero';
import Features from '@/sections/Features';
import PainPoints from '@/sections/PainPoints';
import ValueProposition from '@/sections/ValueProposition';
import AboutUs from '@/sections/AboutUs';
import Courses from '@/sections/Courses';
import Testimonials from '@/sections/Testimonials';
import Feedback from '@/sections/Feedback';
import Pricing from '@/sections/Pricing';
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
        <PainPoints />
        <ValueProposition />
        <AboutUs />
        <Features />
        <Courses />
        <Instructor />
        <Feedback />
        <Testimonials />
        <Pricing />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
