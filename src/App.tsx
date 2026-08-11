import Header from '@/components/Header';
import Hero from '@/sections/Hero';
import PainPoints from '@/sections/PainPoints';
import AboutUs from '@/sections/AboutUs';
import Courses from '@/sections/Courses';
import Instructor from '@/sections/Instructor';
import LeadForm from '@/sections/LeadForm';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function App() {
  useSmoothScroll();
  // Kích hoạt Fade In / Fly In / Bounce trên toàn trang
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <AboutUs />
        <Courses />
        <Instructor />
        <LeadForm />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
