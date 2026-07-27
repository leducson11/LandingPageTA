import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PainPoints from '@/components/PainPoints';
import ValueProposition from '@/components/ValueProposition';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import LeadForm from '@/components/LeadForm';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <ValueProposition />
        <Features />
        <Testimonials />
        <Pricing />
        <LeadForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
