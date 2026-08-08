import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PainPoints from '@/components/PainPoints';
import AboutUs from '@/components/AboutUs';
import Courses from '@/components/Courses';
import Instructor from '@/components/Instructor';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { useSmoothScroll } from '@/lib/useSmoothScroll';
import { useScrollAnimation } from '@/lib/useScrollAnimation';

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
