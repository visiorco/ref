'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import styles from './mmi.module.css';

// Dynamic Imports for performance
const MethodologySection = dynamic(() => import('../components/mmi/MethodologySection'), { ssr: true });
const InvestmentSection = dynamic(() => import('../components/mmi/InvestmentSection'), { ssr: true });
const FAQSection = dynamic(() => import('../components/mmi/FAQSection'), { ssr: true });
const ModalPopup = dynamic(() => import('../components/mmi/ModalPopup'), { ssr: false });

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        revenue: ''
    });
    const [focused, setFocused] = useState({
        name: false,
        email: false,
        phone: false,
        revenue: false
    });


    const maskPhone = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{4})(\d+?)$/, "$1");
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const urlParams = new URLSearchParams(window.location.search);
        const utms = {
            utm_source: urlParams.get('utm_source') || '',
            utm_medium: urlParams.get('utm_medium') || '',
            utm_campaign: urlParams.get('utm_campaign') || '',
            utm_content: urlParams.get('utm_content') || '',
            utm_term: urlParams.get('utm_term') || '',
            source_url: typeof window !== 'undefined' ? window.location.href : ''
        };

        const payload = {
            ...formData,
            ...utms,
            source: 'Landing Page MMI'
        };

        try {
            fetch('https://script.google.com/macros/s/AKfycbwpWT4D8K910JgLrIzGxhrdRlswh3pQMt0uMtxjFXCRb4fjT-bekx99R1wt7aB-z0Wpfg/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                keepalive: true
            });

            fetch('https://api.datacrazy.io/v1/crm/api/crm/integrations/webhook/business/bf74cc08-35e9-4835-87d7-a16faccb6413', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                keepalive: true
            });

            setTimeout(() => {
                const cleanPhone = formData.phone.replace(/\D/g, '');

                // Add UTMs to Eduzz URL
                const currentQuery = window.location.search;
                const separator = currentQuery ? (currentQuery.includes('?') ? '&' : '?') : '?';
                const utmParams = currentQuery.startsWith('?') ? currentQuery.substring(1) : currentQuery;

                const eduzzUrl = `https://sun.eduzz.com/E0D68V8N91?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&phone=${cleanPhone}${utmParams ? `&${utmParams}` : ''}`;

                window.location.href = eduzzUrl;
            }, 600);

        } catch (error) {
            console.error('Error submitting form:', error);
            const cleanPhone = formData.phone.replace(/\D/g, '');
            const currentQuery = window.location.search;
            const utmParams = currentQuery.startsWith('?') ? currentQuery.substring(1) : currentQuery;
            const eduzzUrl = `https://sun.eduzz.com/E0D68V8N91?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&phone=${cleanPhone}${utmParams ? `&${utmParams}` : ''}`;
            window.location.href = eduzzUrl;
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', revenue: '' });
    };

    const scrollToPricing = () => {
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.revealed);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        const elements = document.querySelectorAll(`
            .${styles.storySection}, 
            .${styles.pillarsSection}, 
            .${styles.methodologySection}, 
            .${styles.investmentSection}, 
            .${styles.guaranteeSection}, 
            .${styles.faqSection}, 
            .${styles.ctaSection}
        `);

        const marketSection = document.querySelector(`.${styles.marketSection}`);
        if (marketSection) observer.observe(marketSection);
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className={`${styles.pageWrapper} ${isDarkMode ? styles.darkMode : ''}`}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerText}>100% Online & Ao Vivo</div>
                <div className={styles.logoContainer}>
                    <Image
                        src="/ref-logo.svg"
                        alt="Logo"
                        width={40}
                        height={40}
                        priority
                        className={styles.logo}
                    />
                </div>
                <div className={styles.headerText}>21 • Fevereiro • 2026</div>
            </header>

            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroContainer}>
                    <div className={styles.imageSection}>
                        <Image
                            src="/BG-Bruno.webp"
                            alt="Bruno Andrade"
                            width={600}
                            height={800}
                            priority
                            fetchPriority="high"
                            quality={85}
                            sizes="(max-width: 768px) 100vw, 600px"
                            className={styles.brunoImage}
                        />
                    </div>

                    <div className={styles.contentSection}>
                        <h1 className={styles.headline}>
                            Como Atrair <strong>Pacientes que Pagam Mais</strong>, Dão Valor ao seu trabalho e te Recomendam <strong>Naturalmente.</strong>
                        </h1>

                        <p className={styles.description}>
                            Existe um tipo de paciente que é mais consciente, segue suas orientações e impulsiona o seu posicionamento. Você só precisa saber como se tornar a escolha óbvia para ele.
                        </p>

                        <div className={styles.heroButtonWrapper}>
                            <button className={styles.priceButton} onClick={scrollToPricing}>
                                <div className={styles.priceButtonText}>GARANTIR MINHA VAGA</div>
                                <div className={styles.priceArrowCircle}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Context Section */}
            <section className={styles.storySection}>
                <div className={styles.storyGrid}>
                    <div className={styles.storyLeft}>
                        <div className={styles.badgeWrapper}>
                            <div className={styles.badgeDot}></div>
                            <p className={styles.badgeText}>
                                Aula Exclusiva para Médicos,<br />
                                Dentistas e Profissionais<br />
                                da Área da Saúde.
                            </p>
                        </div>
                    </div>

                    <div className={styles.storyRight}>
                        <div className={styles.storyTextLarge}>
                            <p>
                                Se <strong>você está cansado de ver pessoas que começaram depois do que você,</strong> menos capacitadas que nao entregam tudo o que você entrega, mas… <strong>possuem um resultado mais alto do que o seu, alcançam pacientes mais relevantes,</strong> faturam mais e tem visibilidade no que fazem do que você.
                            </p>
                        </div>

                        <div className={styles.storyTextSmall}>
                            <p>
                                Se você sente que o lugar da relevância é seu por direito, pelos anos de estudo, capacitação e técnica que construiu, esse é o treinamento mais efetivo para você assistir.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Story Section */}
            <section className={styles.pillarsSection}>
                <div className={styles.successGrid}>
                    <div className={styles.successLeft}>
                        <h2 className={styles.successHeadline}>
                            Depois de sair de <strong>contratos de R$150 para mais de R$1.2Milhões trabalhando com posicionamento de marcas</strong> empresarias e ter saído de atender uma pizzaria de bairro para marca de suplementação do Neymar Jr.
                        </h2>

                        <button className={`${styles.priceButton} ${styles.priceButtonGrid}`} onClick={scrollToPricing}>
                            <div className={styles.priceButtonText}>Quero ser mais relevante</div>
                            <div className={styles.priceArrowCircle}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </button>
                    </div>

                    <div className={styles.successRight}>
                        <p className={styles.successDesc}>
                            Depois de <strong>ser convidado para os podcasts ultra relevantes como Joel Jota</strong> eu decidi abrir para profissionais que desejam <strong>construir valor pro seu nome e levar isso para os seus negócios.</strong>
                        </p>

                        <p className={styles.successDesc}>
                            <strong>Se você é médico, dentista ou profissional da área da saúde,</strong> esse conteúdo será cirurgicamente para você, porque afinal o nosso objetivo é trabalhar com profissionais que podem <strong>trabalhar com protocolo de alto valor</strong> e oferecer isso ao mercado.
                        </p>
                    </div>
                </div>
            </section>

            <MethodologySection scrollToPricing={scrollToPricing} />

            {/* Market Change Section */}
            <section className={styles.marketSection}>
                <div className={styles.marketGrid}>
                    <div className={styles.lightCard}>
                        <h2 className={styles.lightCardTitle}>
                            Depois que você <br /> passar por esse <br /> treinamento, isso vai <br /> acontecer com você!
                        </h2>
                        <div className={styles.checkList}>
                            {[
                                "Você atrairá o perfil de paciente que sempre sonhou em atender",
                                "Você será visto como referência na sua região e conquistará o respeito de muitos",
                                "Você poderá começar a receber convites para palestrar em eventos da sua área",
                                "As pessoas irão te escolher pela oportunidade de ser atendidas por você e não pelo preço mais baixo"
                            ].map((item, i) => (
                                <div key={i} className={styles.checkItem}>
                                    <Image src="/check-circle.svg" alt="check" width={16} height={16} className={styles.benefitIcon} />
                                    <div className={styles.checkText}>{item}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`${styles.marketCard} ${styles.imageCard}`}>
                        <Image
                            src="/BG-C4.webp"
                            alt="Market Change"
                            fill
                            className={styles.marketImage}
                            sizes="(max-width: 768px) 100vw, 33vw"
                            quality={75}
                        />
                    </div>

                    <div className={`${styles.marketCard} ${styles.blackCard}`}>
                        <div className={styles.blackCardContent}>
                            <h2 className={styles.blackCardTitle}>E você irá <br /> evitar que...</h2>
                        </div>

                        <div className={styles.whiteNestedCard}>
                            <div className={styles.nestedList}>
                                {[
                                    "Pessoas menos capacitadas ganhem o lugar que é seu por direito;",
                                    "Irá evitar que continue chegando pacientes que não te valorizam e insistem em pedir desconto e ainda te comparam com pessoas que não são tão boas quanto você;",
                                    "Você nunca mais terá que ficar insistindo o porque a pessoa deveria comprar o seu protocolo, elas irão entender e pedirão pra ser atendidas por você."
                                ].map((item, i) => (
                                    <div key={i} className={styles.nestedListItem}>
                                        <Image src="/angle-circle-right.svg" alt="arrow" width={16} height={16} className={styles.avoidIcon} />
                                        <div className={styles.nestedItemText}>{item}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className={styles.sectionDivider} />

            <InvestmentSection openModal={openModal} />


            {/* Guarantee Section */}
            <section className={styles.guaranteeSection}>
                <div className={styles.guaranteeContainer}>
                    <h2 className={styles.guaranteeTitle}>
                        Garantia<br />
                        de satisfação.
                    </h2>

                    <div className={styles.guaranteeTextColumn}>
                        <p className={styles.guaranteeText}>
                            Se, após a experiência, você sentir que isso não te aproximou do posicionamento que deseja, devolvemos 100% do valor investido. Sem letra miúda. Sem explicações.
                        </p>
                        <p className={styles.guaranteeText}>
                            Ou você sai mais claro, ou não paga nada.
                        </p>
                    </div>
                </div>
            </section>

            <FAQSection />

            {/* Final CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaContainer}>
                    <h2 className={styles.ctaTitle}>Tirou suas dúvidas?</h2>
                    <p className={styles.ctaDesc}>
                        Então dê o próximo passo para se tornar a escolha óbvia no seu mercado.
                    </p>

                    <div className={styles.ctaButtonWrapper}>
                        <button className={styles.priceButton} onClick={scrollToPricing}>
                            <div className={styles.priceButtonText}>GARANTIR MINHA VAGA</div>
                            <div className={styles.priceArrowCircle}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerText}>Referência Máxima &copy; 2026</div>
                <div className={styles.footerText}>All Right Reserved</div>
            </footer>

            <ModalPopup
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formData={formData}
                setFormData={setFormData}
                focused={focused}
                setFocused={setFocused}
                handleFormSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
                isSubmitted={isSubmitted}
                maskPhone={maskPhone}
            />
        </div>
    );
}
