'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './mmi.module.css';

const RevealWords = ({ text, className = '' }: { text: string; className?: string }) => {
    const containerRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const words = entry.target.querySelectorAll(`.${styles.word}`);
                if (entry.isIntersecting) {
                    words.forEach((word, index) => {
                        setTimeout(() => {
                            word.classList.add(styles.revealed);
                        }, index * 30);
                    });
                    observer.unobserve(entry.target); // Trava as palavras
                }
            });
        }, observerOptions);

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <p ref={containerRef} className={className}>
            {text.split(' ').map((word, i) => (
                <span key={i} className={styles.word}>
                    {word}{' '}
                </span>
            ))}
        </p>
    );
};

export default function MMIPage() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [carouselScrolled, setCarouselScrolled] = useState(false);
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

    const bioSectionRef = useRef<HTMLElement>(null);
    const storyCarouselRef = useRef<HTMLDivElement>(null);

    const handleCarouselScroll = () => {
        if (storyCarouselRef.current) {
            setCarouselScrolled(storyCarouselRef.current.scrollLeft > 10);
        }
    };

    const scrollCarousel = (direction: 'left' | 'right') => {
        if (storyCarouselRef.current) {
            const scrollAmount = 512; // Card width (480) + gap (32)
            const currentScroll = storyCarouselRef.current.scrollLeft;
            const targetScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;

            storyCarouselRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

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

        try {
            // Envia para o CRM
            await fetch('https://api.datacrazy.io/v1/crm/api/crm/integrations/webhook/business/8eae9e52-7f44-48a0-8cf6-f2e002822d26', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Redireciona imediatamente para a Eduzz com o parâmetro de telefone correto
            const cleanPhone = formData.phone.replace(/\D/g, '');
            const eduzzUrl = `https://sun.eduzz.com/E0D68V8N91?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&phone=${cleanPhone}`;

            window.location.href = eduzzUrl;

        } catch (error) {
            console.error('Error submitting form:', error);
            // Mesmo com erro no CRM, redireciona para não perder a venda
            const cleanPhone = formData.phone.replace(/\D/g, '');
            const eduzzUrl = `https://sun.eduzz.com/E0D68V8N91?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&phone=${cleanPhone}`;
            window.location.href = eduzzUrl;
        } finally {
            setIsSubmitting(false);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', revenue: '' });
    };

    useEffect(() => {
        const checkDarkMode = () => {
            if (bioSectionRef.current) {
                const rect = bioSectionRef.current.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.8) {
                    setIsDarkMode(true);
                } else {
                    setIsDarkMode(false);
                }
            }
        };

        checkDarkMode();
        window.addEventListener('scroll', checkDarkMode);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsDarkMode(true);
                } else {
                    const bounding = entry.boundingClientRect;
                    if (bounding.top > 0) {
                        setIsDarkMode(false);
                    }
                }
            },
            {
                threshold: 0.2,
            }
        );

        if (bioSectionRef.current) {
            observer.observe(bioSectionRef.current);
        }

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', checkDarkMode);
        };
    }, []);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.4,
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.revealed);
                    observer.unobserve(entry.target); // Trava o elemento na tela
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        const elements = document.querySelectorAll(`.${styles.description}, .${styles.storySection}`);
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
                            src="/BG-Bruno.png"
                            alt="Bruno"
                            width={600}
                            height={800}
                            priority
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
                            <button className={styles.priceButton} onClick={openModal}>
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

                        <button className={styles.successButton} onClick={openModal}>
                            <span className={styles.successButtonText}>Quero ser mais relevante</span>
                            <div className={styles.successArrow}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12H19M19 12L13 6M19 12L13 18" />
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

            {/* Market Change Section */}
            <section className={styles.marketSection}>
                <div className={styles.marketGrid}>
                    {/* Column 1: Image */}
                    <div className={`${styles.marketCard} ${styles.imageCard}`}>
                        <Image
                            src="/BG-C4.png"
                            alt="Market Change"
                            fill
                            className={styles.marketImage}
                        />
                    </div>

                    {/* Column 2: Black Card with Nested White Card */}
                    <div className={`${styles.marketCard} ${styles.blackCard}`}>
                        <div className={styles.blackCardContent}>
                            <h2 className={styles.blackCardTitle}>O Mercado <br /> Mudou. E você?</h2>
                            <p className={styles.blackCardText}>
                                E quem não ajustar sua percepção de valor agora não vai apenas ficar invisível vai ser ultrapassado por quem aprendeu a se posicionar.
                            </p>
                            <p className={styles.blackCardText}>
                                Profissionais incríveis estão sendo ignorados, enquanto quem comunica bem ocupa o lugar de referência.
                            </p>
                        </div>

                        <div className={styles.whiteNestedCard}>
                            <h3 className={styles.nestedTitle}>E você já se pegou pensando:</h3>
                            <div className={styles.nestedItem}>“Por que chamam sempre os mesmos nomes, e nunca o meu?”</div>
                            <div className={styles.nestedItem}>“Como tem gente cobrando mais com entrega mais fraca?”</div>
                            <div className={styles.nestedItem}>“O que é que eu tô deixando de mostrar pro mercado?”</div>
                        </div>
                    </div>

                    {/* Column 3: Stacked Light Cards */}
                    <div className={styles.col3Stack}>
                        <div className={styles.lightCard}>
                            <h2 className={styles.lightCardTitle}>E a régua <br /> não para de subir:</h2>
                            <div className={styles.checkList}>
                                {[
                                    "Mais gente falando, menos gente sendo ouvida.",
                                    "Concorrência com preço baixo e promessas vazias.",
                                    "Clientes cada vez mais céticos, seletivos e distraídos.",
                                    "Currículo não sustenta mais autoridade.",
                                    "Quem não se posiciona com clareza perde espaço e, rápido."
                                ].map((item, i) => (
                                    <div key={i} className={styles.checkItem}>
                                        <Image src="/angle-circle-right.svg" alt="check" width={16} height={16} className={styles.checkIcon} />
                                        <div className={styles.checkText}>{item}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`${styles.lightCard} ${styles.gradientCard}`}>
                            <p className={styles.urgentPara}>
                                A verdade é que ser bom não é mais suficiente. Você precisa ser percebido como a único opção na mente do seu cliente.
                            </p>
                            <p className={styles.urgentPara}>
                                E isso não acontece por acaso, acontece quando você constrói uma percepção de valor de verdade.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Market Footer - Refactored to 3 columns */}
                <div className={styles.marketFooter}>
                    <div className={styles.emptyCol}></div>
                    <div className={styles.footerCol}>
                        <h2 className={styles.urgentHeadline}>
                            Por isso, <br />
                            posicionar-se <br />
                            <span>é urgente.</span>
                        </h2>
                    </div>
                    <div className={styles.footerCol}>
                        <p className={styles.urgentParaSmall}>
                            Mas não é sobre gritar.
                        </p>
                        <p className={styles.urgentPara}>
                            É sobre alinhar quem você é, o que você comunica e como o mercado te percebe. Você não precisa parecer importante pra todo mundo. Precisa ser indispensável pra quem realmente importa.
                        </p>
                    </div>
                </div>
            </section>

            {/* Methodology Section */}
            <section className={styles.methodologySection}>
                <div className={styles.methodologyContainer}>
                    <div className={styles.methodologyTop}>
                        <h2 className={styles.methodologyTitle}>
                            Um dia para <strong>reconstruir sua mentalidade, mensagem e imagem</strong> e destravar a percepção de valor que faz os clientes certos te escolherem.
                        </h2>
                        <div className={styles.methodologyRight}>
                            <p className={styles.methodologyDesc}>
                                Durante esse encontro online e ao vivo, <strong>você vai acessar a Metodologia MMI</strong> (o exato modelo que me tirou de contratos de R$150 para fechar R$1.200.000 em valor percebido).
                            </p>
                        </div>
                    </div>

                    <div className={styles.methodologyGrid}>
                        {/* Card 1 */}
                        <div className={styles.methodCard}>
                            <Image src="/icon-mentalidade.svg" alt="Mentalidade" width={40} height={40} className={styles.methodIcon} />
                            <div>
                                <h3 className={styles.methodLabel}>Mentalidade</h3>
                                <p className={styles.methodText}>
                                    Como desenvolver uma visão interna de alto valor, sair da mentalidade baseada em preço e ocupar o lugar que você merece.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className={styles.methodCard}>
                            <Image src="/icon-mensagem.svg" alt="Mensagem" width={40} height={40} className={styles.methodIcon} />
                            <div>
                                <h3 className={styles.methodLabel}>Mensagem</h3>
                                <p className={styles.methodText}>
                                    Como construir uma mensagem clara, magnética e de autoridade, mesmo que você ache difícil se comunicar.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className={styles.methodCard}>
                            <Image src="/icon-imagem.svg" alt="Imagem" width={40} height={40} className={styles.methodIcon} />
                            <div>
                                <h3 className={styles.methodLabel}>Imagem</h3>
                                <p className={styles.methodText}>
                                    Como alinhar sua presença, estética e identidade para gerar valor percebido antes mesmo de abrir a boca.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.methodologyFooter}>
                        <p className={styles.footerTextStrong}>Você não vai sair dessa aula com mais uma lista de ideias.</p>
                        <p className={styles.footerTextSub}>
                            Vai sair com clareza, estrutura e um novo padrão de posicionamento baseado em quem você é, no valor que você entrega e em como o mercado vai passar a te enxergar.
                        </p>
                    </div>
                </div>
            </section>

            {/* Investment Section */}
            <section className={styles.investmentSection} id="pricing">
                <div className={styles.investmentGrid}>
                    <h2 className={styles.investmentTitle}>
                        Qual é o investimento para <strong>se tornar a escolha óbvia</strong> para os melhores clientes?
                    </h2>

                    <p className={styles.investmentDesc}>
                        Um dia de conteúdo profundo e transformador com a Metodologia MMI usada por especialistas que deixaram de se vender barato e passaram a ser reconhecidos, bem pagos e naturalmente indicados.
                    </p>

                    <div className={styles.investmentBottomWrapper}>
                        <div className={styles.investmentList}>
                            {[
                                "Aula ao vivo com Bruno Andrade (transmitido no Zoom)",
                                "Acesso completo à Metodologia MMI",
                                "Mapa visual do seu novo posicionamento",
                                "Diagnóstico da percepção de valor",
                                "Material complementar em PDF",
                                "Replay disponível por 7 dias"
                            ].map((item, i) => (
                                <div key={i} className={styles.investmentItem}>
                                    <Image src="/check-circle.svg" alt="check" width={16} height={16} className={styles.checkIconInvestment} />
                                    <span className={styles.investmentItemText}>{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.investmentPriceCard}>
                            <div className={styles.priceContainer}>
                                <div className={styles.priceSmall}>Hoje será apenas,</div>
                                <div className={styles.priceDisplay}>R$ 67</div>
                            </div>
                            <button className={styles.priceButton} onClick={openModal}>
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

            {/* Bio Section */}
            <section className={styles.bioSection} ref={bioSectionRef}>
                <div className={styles.bioContainer}>
                    <div className={styles.bioImageWrapper}>
                        <Image
                            src="/Bruno-bio.png"
                            alt="Bruno Andrade"
                            width={500}
                            height={600}
                            className={styles.bioImage}
                        />
                    </div>

                    <div className={styles.bioContent}>
                        <h2 className={styles.bioTitle}>
                            Bruno Andrade é especialista em percepção de valor e fundador da BC&reg;C, uma boutique de branding que <strong>já assinou projetos para grandes nomes como Seu Elias, Neymar, Let Ponto,</strong> entre outros.
                        </h2>

                        <div className={styles.bioColumns}>
                            <div>
                                <p className={styles.bioText}>
                                    Ajuda transformar propósito em valor de mercado, Bruno é conhecido por trás da Referência Máxima um movimento que ajuda especialistas a se posicionarem como escolhas óbvias para os clientes certos.
                                </p>
                                <br />
                                <p className={styles.bioText}>
                                    De contratos de R$150 a projetos fechados por R$1.2Mi. Essa virada não foi por sorte. Foi posicionamento.
                                </p>
                            </div>

                            <div>
                                <p className={styles.bioText}>
                                    Bruno ensina o que vive. Sua metodologia, aplicada por centenas de especialistas, é baseada em três pilares: Mentalidade, Mensagem e Imagem e já ajudou profissionais, negócios e marcas a saírem do anonimato para assumirem o lugar de autoridade que merecem.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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

            {/* FAQ Section */}
            <section className={styles.faqSection}>
                <div className={styles.faqDivider}></div>
                <div className={styles.faqContainer}>
                    <h2 className={styles.faqTitle}>
                        Perguntas<br />
                        frequentes
                    </h2>

                    <div className={styles.faqAccordion}>
                        {[
                            {
                                question: "Vai ficar gravado?",
                                answer: "Sim! Mas recomendamos assistir ao vivo para aproveitar a energia, as orientações personalizadas e o contato direto com Bruno."
                            },
                            {
                                question: "Serve para iniciantes?",
                                answer: "Sim, se você sente que está no anonimato, e quer construir um posicionamento forte desde o início."
                            },
                            {
                                question: "Serve para quem já tem mais experiência?",
                                answer: "Totalmente. A Metodologia MMI já ajudou especialistas experientes a ajustarem sua comunicação e atraírem clientes mais alinhados e lucrativos."
                            },
                            {
                                question: "Vai mostrar ferramentas?",
                                answer: "Sim. Mas mais importante do que as ferramentas, você vai entender como pensar, comunicar e se posicionar com autoridade. Ferramenta sem clareza não gera resultado."
                            }
                        ].map((item, i) => (
                            <FAQItem key={i} question={item.question} answer={item.answer} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaContainer}>
                    <h2 className={styles.ctaTitle}>Tirou suas dúvidas?</h2>
                    <p className={styles.ctaDesc}>
                        Então dê o próximo passo para se tornar a escolha óbvia no seu mercado.
                    </p>

                    <div className={styles.ctaButtonWrapper}>
                        <button className={styles.priceButton} onClick={openModal}>
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

            {/* Modal Popup */}
            <div className={`${styles.modalOverlay} ${isModalOpen ? styles.modalActive : ''}`} onClick={() => setIsModalOpen(false)}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>

                    {!isSubmitted ? (
                        <>
                            <h2 className={styles.modalTitle}>Garanta sua vaga!</h2>
                            <form className={styles.popupForm} onSubmit={handleFormSubmit}>
                                <div className={styles.modalInputGroup}>
                                    <input
                                        type="text"
                                        placeholder=" "
                                        className={styles.modalInput}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        onFocus={() => setFocused({ ...focused, name: true })}
                                        onBlur={() => setFocused({ ...focused, name: false })}
                                        required
                                    />
                                    <label className={`${styles.modalFloatingLabel} ${(formData.name || focused.name) ? styles.modalFloatingLabelActive : ''}`}>
                                        Nome
                                    </label>
                                </div>

                                <div className={styles.modalInputGroup}>
                                    <input
                                        type="email"
                                        placeholder=" "
                                        className={styles.modalInput}
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        onFocus={() => setFocused({ ...focused, email: true })}
                                        onBlur={() => setFocused({ ...focused, email: false })}
                                        required
                                    />
                                    <label className={`${styles.modalFloatingLabel} ${(formData.email || focused.email) ? styles.modalFloatingLabelActive : ''}`}>
                                        E-mail
                                    </label>
                                </div>

                                <div className={styles.modalInputGroup}>
                                    <input
                                        type="tel"
                                        placeholder=" "
                                        className={styles.modalInput}
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: maskPhone(e.target.value) })}
                                        onFocus={() => setFocused({ ...focused, phone: true })}
                                        onBlur={() => setFocused({ ...focused, phone: false })}
                                        required
                                    />
                                    <label className={`${styles.modalFloatingLabel} ${(formData.phone || focused.phone) ? styles.modalFloatingLabelActive : ''}`}>
                                        WhatsApp
                                    </label>
                                </div>

                                <div className={styles.modalInputGroup}>
                                    <select
                                        className={styles.modalSelect}
                                        value={formData.revenue}
                                        onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                                        onFocus={() => setFocused({ ...focused, revenue: true })}
                                        onBlur={() => setFocused({ ...focused, revenue: false })}
                                        required
                                    >
                                        <option value="" disabled hidden></option>
                                        <option value="Até R$5.000">Até R$5.000</option>
                                        <option value="R$5.001 a R$15.000">R$5.001 a R$15.000</option>
                                        <option value="R$15.001 a R$30.000">R$15.001 a R$30.000</option>
                                        <option value="R$30.001 a R$50.000">R$30.001 a R$50.000</option>
                                        <option value="R$50.001 a R$100.000">R$50.001 a R$100.000</option>
                                        <option value="Acima de R$100.000">Acima de R$100.000</option>
                                    </select>
                                    <label className={`${styles.modalFloatingLabel} ${(formData.revenue || focused.revenue) ? styles.modalFloatingLabelActive : ''}`}>
                                        Qual seu faturamento mensal?
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className={styles.modalSubmit}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Enviando...' : 'GARANTIR MINHA VAGA'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className={styles.successState}>
                            <div className={styles.successIcon}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h2 className={styles.successTitle}>Inscrição Realizada!</h2>
                            <p className={styles.successText}>
                                Seus dados foram enviados com sucesso. <br />
                                Entraremos em contato em breve via WhatsApp.
                            </p>
                            <button className={styles.modalSubmit} onClick={() => setIsModalOpen(false)}>
                                FECHAR
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
            <button className={styles.accordionTrigger} onClick={() => setIsOpen(!isOpen)}>
                {question}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.chevron}>
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className={styles.accordionContent}>
                <div className={styles.accordionInner}>
                    <p className={styles.accordionText}>{answer}</p>
                </div>
            </div>
        </div>
    );
};

const StoryCarousel = () => {
    const blocks = [
        [
            "“Qual o menor valor que eu posso cobrar pra esse cliente não recusar?”",
            "Esse foi meu pensamento no meu primeiro contrato de consultoria.",
            "Era uma pizzaria. Eu cobrei R$200, achando que era impossível ele recusar."
        ],
        [
            "Ele respondeu:",
            "— “Fecha por R$150?”",
            "E eu aceitei. Sem pizza de brinde. Sem negociação. Só desconto.",
            "Aquele valor era metade do aluguel da minha esposa."
        ],
        [
            "Eu saí dali com a missão: conseguir mais um cliente pra fechar o mês.",
            "Foi nesse dia que comecei a me tornar o profissional que sou hoje.",
            "1 ANO E MEIO DEPOIS…",
            "O mesmo cliente me liga."
        ],
        [
            "— “Quero te contratar de novo. R$5.000 fixo + comissão. Vai dar uns R$13.000 por mês.”",
            "Mas eu respondi:",
            "— “Se eu aceitar, vou precisar recusar contratos melhores que estão chegando. Não consigo.”"
        ],
        [
            "O mesmo cliente que pediu R$50 de desconto, agora me oferecia R$13.000 por mês.",
            "O que mudou? Ele ficou mais rico? Não.",
            "Mudou a percepção de valor que ele tinha sobre mim. E mais importante: mudou a percepção que eu tinha sobre mim mesmo."
        ]
    ];

    return (
        <div className={styles.storyScrollWrapper}>
            <div className={styles.storyScrollContainer}>
                {blocks.map((blockLines, index) => (
                    <StoryBlock key={index} lines={blockLines} />
                ))}
            </div>
        </div>
    );
};

const StoryBlock = ({ lines }: { lines: string[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsActive(entry.isIntersecting);
            },
            {
                threshold: 0.6, // Activate when 60% visible
                rootMargin: "0px -10% 0px -10%" // Focus area horizontal
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={`${styles.storyBlock} ${isActive ? styles.storyBlockActive : ''}`}>
            {lines.map((line, i) => (
                <p key={i} className={styles.storyText} style={{ marginBottom: 16 }}>{line}</p>
            ))}
        </div>
    );
};
