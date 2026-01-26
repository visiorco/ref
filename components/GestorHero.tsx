'use client';

import styles from './GestorHero.module.css';
import GradientBlinds from './GradientBlinds';

export default function GestorHero() {
    const handleCTAClick = () => {
        // This will be replaced by the actual scheduling link or anchor
        window.open('https://calendly.com/academialendaria', '_blank');
    };

    return (
        <div className={styles.heroWrapper}>
            <div className={styles.heroContainer}>
                <div className={styles.backgroundOverlay}>
                    <GradientBlinds
                        gradientColors={['#161616', '#323232']}
                        angle={0}
                        noise={0.3}
                        blindCount={32}
                        blindMinWidth={30}
                        spotlightRadius={0.7}
                        spotlightSoftness={1}
                        spotlightOpacity={1}
                        mouseDampening={0.15}
                        distortAmount={0}
                        shineDirection="left"
                        mixBlendMode="normal"
                    />
                    <div className={styles.darkOverlay} />
                </div>

                <div className={styles.content}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.textBlock}>
                            Seja pago para implementar Inteligência Artificial em empresas reais.
                        </h1>
                    </div>

                    <p className={styles.description}>
                        Em uma conversa de 45 minutos com o time de Especialistas da Academia Lendár[IA],
                        você vai entender como se tornar um Gestor de IA o profissional que constrói, aplica e vende soluções inteligentes para negócios.
                    </p>

                    <div className={styles.buttonsContainer}>
                        <button
                            className={styles.ctaButton}
                            onClick={handleCTAClick}
                        >
                            <div>
                                {'Agende sua Reunião Estratégica Gratuita'.split('').map((char, index) => (
                                    <span key={index} style={{ transitionDelay: `${index * 0.02}s` }}>
                                        {char === ' ' ? '\u00A0' : char}
                                    </span>
                                ))}
                            </div>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M7 7L17 17M17 17H7M17 17V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
