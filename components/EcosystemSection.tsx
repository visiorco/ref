'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './EcosystemSection.module.css';
import Image from 'next/image';

const members = [
    '/empresarios/Ellipse 1.png',
    '/empresarios/Ellipse 2.png',
    '/empresarios/Ellipse 3.png',
    '/empresarios/Ellipse 4.png',
    '/empresarios/Ellipse 5.png',
    '/empresarios/Ellipse 6.png',
    '/empresarios/Ellipse 7.png',
    '/empresarios/Ellipse 12.png',
    '/empresarios/Ellipse 13.png',
    '/empresarios/Ellipse 15.png',
    '/empresarios/Ellipse 16.png',
    '/empresarios/Ellipse 17.png',
    '/empresarios/Ellipse 20.png',
];

export default function EcosystemSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Wait for the longest animation to complete (1.6s delay + 1.6s duration = 3.2s + buffer)
                    setTimeout(() => {
                        setAnimationComplete(true);
                    }, 3500);
                }
            },
            {
                threshold: 0.2,
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

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section ref={sectionRef} className={`${styles.section} ${isVisible ? styles.visible : ''} ${animationComplete ? styles.animationComplete : ''}`}>
            <div className={styles.backgroundLines}>
                {[...Array(19)].map((_, i) => (
                    <div key={i} className={styles.line}></div>
                ))}
            </div>
            <div className={styles.container}>
                <div className={styles.circleContainer}>
                    {/* Title in center */}
                    <div className={styles.centerTitle}>
                        <h2 className={styles.title}>
                            <span className={styles.textGray}>Grandes empresários</span><br />
                            <span className={styles.textGray}>que já fazem parte</span><br />
                            <span className={styles.textGray}>do nosso </span>
                            <span className={styles.textWhite}>Ecossistema</span><br />
                            <span className={styles.textWhite}>de Abundância.</span>
                        </h2>

                        <button
                            className={styles.joinButton}
                            onClick={() => scrollToSection('programs-section')}
                        >
                            <div>
                                {"Junte-se a nós".split("").map((char, i) => (
                                    <span key={i}>
                                        {char === " " ? "\u00A0" : char}
                                    </span>
                                ))}
                            </div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    {/* Photos in circle */}
                    <div className={styles.photosCircle}>
                        {members.map((member, index) => (
                            <div key={`member-${index}`} className={styles.memberPhoto} style={{ '--index': index } as React.CSSProperties}>
                                <div className={styles.photoInner}>
                                    <Image
                                        src={member}
                                        alt={`Membro ${index + 1}`}
                                        width={80}
                                        height={80}
                                        className={styles.photo}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
