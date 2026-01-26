'use client';

import { useRef, useState, useEffect } from 'react';
import styles from './FounderSection.module.css';

export default function FounderSection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [isDescriptionAnimating, setIsDescriptionAnimating] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const isDescriptionHovering = useRef(false);

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

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.loop = true;
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.loop = false;
        }
    };

    const handleDescriptionMouseEnter = () => {
        isDescriptionHovering.current = true;
        setIsDescriptionAnimating(true);
    };

    const handleDescriptionMouseLeave = () => {
        isDescriptionHovering.current = false;
    };

    const handleDescriptionAnimationIteration = () => {
        if (!isDescriptionHovering.current) {
            setIsDescriptionAnimating(false);
        }
    };

    const ArrowSVG = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <section
            ref={sectionRef}
            className={`${styles.section} ${isVisible ? styles.visible : ''}`}
            id="founder"
        >
            <div className={styles.container}>
                {/* First Column */}
                <div className={styles.founderInfo}>
                    <div className={styles.topInfo}>
                        <h2 className={styles.name}>Alan Nicolas</h2>
                        <p className={styles.role}>
                            Líder do Movimento<br />
                            & CEO do Ecossistema Lendário.
                        </p>
                    </div>

                    <div className={styles.tags}>
                        <div className={styles.tagItem}>
                            <ArrowSVG />
                            <span>Empresário</span>
                        </div>
                        <div className={styles.tagItem}>
                            <ArrowSVG />
                            <span>Filósofo</span>
                        </div>
                        <div className={styles.tagItem}>
                            <ArrowSVG />
                            <span>Futurista</span>
                        </div>
                        <div className={styles.tagItem}>
                            <ArrowSVG />
                            <span>Speaker</span>
                        </div>
                    </div>
                </div>

                {/* Second Column (Video) */}
                <div
                    className={styles.videoColumn}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => {
                        if (videoRef.current) {
                            videoRef.current.loop = true;
                            videoRef.current.play();
                        }
                    }}
                >
                    <video
                        ref={videoRef}
                        className={styles.video}
                        src="/alan.mp4#t=0.001"
                        muted
                        playsInline
                        loop={false}
                        preload="auto"
                    />
                </div>

                {/* Third Column */}
                <div
                    className={`${styles.descriptionColumn} ${isDescriptionAnimating ? styles.animating : ''}`}
                    onMouseEnter={handleDescriptionMouseEnter}
                    onMouseLeave={handleDescriptionMouseLeave}
                    onAnimationIteration={handleDescriptionAnimationIteration}
                >
                    <div className={styles.descriptionBox}>
                        <p className={styles.descriptionText}>
                            Especialista em Inteligência Artificial aplicada aos negócios, Alan Nicolas desenvolveu uma metodologia exclusiva que <span className={styles.highlight}>já impactou +15 Mil de Alunos por todo mundo.</span>
                        </p>
                        <p className={styles.descriptionText}>
                            Responsável por difundir o conceito do "2º Cérebro com IA" no Brasil, Alan ajudou a automatizar processos e gerar insights estratégicos, alcançando um <span className={styles.highlight}>faturamento pessoal superior a R$200 Milhões.</span>
                        </p>
                        <p className={styles.descriptionText}>
                            <span className={styles.highlight}>Sua habilidade em construir e liderar empresas rumo ao sucesso</span> reflete sua visão de que a tecnologia, quando usada corretamente, pode ser uma poderosa alavanca para crescimento pessoal, profissional e financeiro.
                        </p>
                    </div>

                    {/* Newspaper Marquee aligend to bottom */}
                    <div className={styles.marqueeContainer}>
                        <span className={styles.marqueeLabel}>
                            Alan na Mídia
                            <i className="fi fi-rr-newspaper"></i>
                        </span>
                        <div className={styles.marqueeTrackWrapper}>
                            <div className={styles.marqueeTrack}>
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className={styles.marqueeTrackGroup} style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                                        <div className={styles.logoItem}><img src="/jornais/g1.svg" alt="G1" className={styles.newsLogo} style={{ height: '22px' }} /></div>
                                        <div className={styles.logoItem}><img src="/jornais/exame.svg" alt="Exame" className={styles.newsLogo} style={{ height: '14px', marginTop: '2px' }} /></div>
                                        <div className={styles.logoItem}><img src="/jornais/estadao.svg" alt="Estadão" className={styles.newsLogo} /></div>
                                        <div className={styles.logoItem}><img src="/jornais/terra.svg" alt="Terra" className={styles.newsLogo} style={{ height: '20px' }} /></div>
                                        <div className={styles.logoItem}><img src="/jornais/DN.svg" alt="Diário de Notícias" className={styles.newsLogo} style={{ marginTop: '2px' }} /></div>
                                        <div className={styles.logoItem}><img src="/jornais/Revista ISTOÉ_idjwPq_fx__1 1.svg" alt="IstoÉ" className={styles.newsLogo} /></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </section>
    );
}
