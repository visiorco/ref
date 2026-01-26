'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './SuccessCases.module.css';

const testimonials = [
    { id: 1, vimeoId: '1149732076' },
    { id: 2, vimeoId: '1047112195' },
    { id: 3, vimeoId: '1047105990' },
    { id: 4, vimeoId: '1149732145' },
];

// Duplicate items for infinite scroll effect
const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

export default function SuccessCases() {
    const [currentIndex, setCurrentIndex] = useState(testimonials.length); // Start at the middle set
    const [isTransitioning, setIsTransitioning] = useState(true);
    const trackRef = useRef<HTMLDivElement>(null);
    const [slideWidth, setSlideWidth] = useState(584 + 64); // Default desktop width + gap

    // Calculate slide width based on screen size
    useEffect(() => {
        const calculateSlideWidth = () => {
            if (typeof window !== 'undefined') {
                const width = window.innerWidth;
                if (width <= 1024) {
                    // Mobile & Tablet: 80% of viewport width + gap
                    const slideW = width * 0.8;
                    const gap = 16;
                    setSlideWidth(slideW + gap);
                } else {
                    // Desktop
                    setSlideWidth(584 + 64);
                }
            }
        };

        calculateSlideWidth();
        window.addEventListener('resize', calculateSlideWidth);
        return () => window.removeEventListener('resize', calculateSlideWidth);
    }, []);

    const handlePrev = () => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - 1);
    };

    const handleNext = () => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
    };

    // Reset position seamlessly when reaching the edges
    useEffect(() => {
        if (currentIndex <= 0) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(testimonials.length);
            }, 500);
        } else if (currentIndex >= testimonials.length * 2) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(testimonials.length);
            }, 500);
        }
    }, [currentIndex]);

    // Section visibility animation
    const [sectionVisible, setSectionVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSectionVisible(true);
                }
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

    return (
        <section ref={sectionRef} className={`${styles.section} ${sectionVisible ? styles.visible : ''}`} id="depoimentos">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        Alguns CASES <br className={styles.titleBreak} />
                        de Sucesso.
                    </h2>
                    <div className={styles.controls}>
                        <button className={styles.controlBtn} onClick={handlePrev} aria-label="Anterior">
                            <i className="fi fi-rr-angle-small-left"></i>
                        </button>
                        <button className={styles.controlBtn} onClick={handleNext} aria-label="Próximo">
                            <i className="fi fi-rr-angle-small-right"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.carousel}>
                <div className={styles.shadowLeft}></div>
                <div className={styles.carouselInner}>
                    <div
                        ref={trackRef}
                        className={styles.track}
                        style={{
                            transform: `translateX(-${currentIndex * slideWidth}px)`,
                            transition: isTransitioning ? 'transform 0.5s ease' : 'none',
                        }}
                    >
                        {extendedTestimonials.map((item, index) => (
                            <div key={`${item.id}-${index}`} className={styles.slide}>
                                <div className={styles.videoWrapper}>
                                    <iframe
                                        src={`https://player.vimeo.com/video/${item.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                                        frameBorder="0"
                                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                                        title={`Depoimento ${item.id}`}
                                        className={styles.video}
                                    ></iframe>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.shadowRight}></div>
            </div>
        </section>
    );
}


