// Force Vercel Rebuild
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustLogos from '../components/TrustLogos';
import IntroQuemSomos from '../components/IntroQuemSomos';
import FounderSection from '../components/FounderSection';
import ProgramsSection from '../components/ProgramsSection';
import SuccessCases from '../components/SuccessCases';
import EcosystemSection from '../components/EcosystemSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <TrustLogos />
      <IntroQuemSomos />
      <ProgramsSection />
      <SuccessCases />
      <EcosystemSection />
      <FounderSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
