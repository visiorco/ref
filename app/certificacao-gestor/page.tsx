import Header from '../../components/Header';
import GestorHero from '../../components/GestorHero';
import GestorTestimonials from '../../components/GestorTestimonials';
import Footer from '../../components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Certificação Gestor de IA | Referência Máxima',
    description: 'Seja pago para implementar Inteligência Artificial em empresas reais.',
};

export default function CertificacaoGestorPage() {
    return (
        <main>
            <Header />
            <GestorHero />
            <GestorTestimonials />
            {/* We will add more sections here following the user's instructions */}
            <Footer />
        </main>
    );
}
