'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './IntroQuemSomos.module.css';
import Globe from './Globe';
import { GlowingEffect } from './GlowingEffect';

const IntroQuemSomos = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    // States for animation persistence
    const [isTextAnimating, setIsTextAnimating] = useState(false);
    const [isVisualAnimating, setIsVisualAnimating] = useState(false);

    // Refs to track hover state without re-renders
    const isTextHovering = useRef(false);
    const isVisualHovering = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const handleTextMouseEnter = () => {
        isTextHovering.current = true;
        setIsTextAnimating(true);
    };

    const handleTextMouseLeave = () => {
        isTextHovering.current = false;
    };

    const handleTextAnimationIteration = () => {
        if (!isTextHovering.current) {
            setIsTextAnimating(false);
        }
    };

    const handleVisualMouseEnter = () => {
        isVisualHovering.current = true;
        setIsVisualAnimating(true);
    };

    const handleVisualMouseLeave = () => {
        isVisualHovering.current = false;
    };

    const handleVisualAnimationIteration = () => {
        if (!isVisualHovering.current) {
            setIsVisualAnimating(false);
        }
    };

    return (
        <section
            id="intro-quem-somos"
            ref={sectionRef}
            className={`${styles.introSection} ${isVisible ? styles.visible : ''}`}
        >
            <div className={styles.container}>
                <h1 className={styles.title}>Mais que Educação, <br /><span className={styles.gradientText}>Um Movimento.</span></h1>

                <div className={styles.contentGrid}>
                    <div
                        className={`${styles.textContent} ${isTextAnimating ? styles.animating : ''}`}
                        onMouseEnter={handleTextMouseEnter}
                        onMouseLeave={handleTextMouseLeave}
                        onAnimationIteration={handleTextAnimationIteration}
                    >
                        <p className={styles.paragraph}>
                            O mercado está cheio de cursos que ensinam teoria.
                            Nós criamos <strong>Um Movimento</strong> porque descobrimos algo
                            fundamental: <strong>O Sucesso não vem do que você sabe,
                                mas de com quem você caminha.</strong>
                        </p>
                        <p className={styles.paragraph}>
                            Quando você está cercado de pessoas que pensam e
                            agem na mesma direção, que compartilham os
                            mesmos valores de excelência e transformação,
                            qualquer desafio se transforma em oportunidade.
                            <strong>Juntos, construímos algo extraordinário - muito maior
                                do que qualquer um conseguiria sozinho.</strong>
                        </p>
                        <p className={styles.paragraph}>
                            Por isso nosso objetivo dentro do Ecossistema
                            Lendário é claro: <strong>Unir e potencializar pessoas lendárias
                                com IA para construírem soluções e negócios que
                                beneficiem a humanidade.</strong> Não formamos apenas
                            especialistas em IA. Formamos uma tribo que
                            construirão legados.
                        </p>
                    </div>

                    <div
                        className={`${styles.visualContent} ${isVisualAnimating ? styles.animating : ''}`}
                        onMouseEnter={handleVisualMouseEnter}
                        onMouseLeave={handleVisualMouseLeave}
                        onAnimationIteration={handleVisualAnimationIteration}
                    >
                        <div className={styles.globeWrapper}>
                            <Globe className={styles.globeImage} />
                        </div>

                        <div className={styles.statsCard}>
                            <div className={styles.statsRow}>
                                <div className={styles.statItem}>
                                    <img src="/icon-population-globe.svg" alt="" className={styles.statIcon} />
                                    <span>+15 Mil Alunos em</span>
                                </div>
                                <div className={styles.statDivider}></div>
                                <div className={styles.statItemLarge}>
                                    +40 Países
                                </div>
                            </div>
                            <a href="https://hub.lendario.ai/" className={styles.hubsButton} target="_blank" rel="noopener noreferrer">
                                +50 Hubs Regionais espalhados pelo Brasil e Mundo.
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IntroQuemSomos;
