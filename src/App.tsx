import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PainPoints from '@/components/PainPoints';
import AboutUs from '@/components/AboutUs';
import Courses from '@/components/Courses';
import FAQNew from '@/components/FAQNew';
import Feedback from '@/components/Feedback';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <AboutUs />
        <Courses />
        <Feedback />
        <FAQNew />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
