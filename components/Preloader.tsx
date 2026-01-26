'use client';

import { useState, useEffect } from 'react';
import styles from './Preloader.module.css';

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const [animateContent, setAnimateContent] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        // Trigger animations after mount
        const animationTimer = setTimeout(() => {
            setAnimateContent(true);
        }, 100);

        // Final fallback to ensure preloader ALWAYS disappears
        const fallbackTimeout = setTimeout(() => {
            setLoading(false);
            document.body.classList.add('site-loaded');
        }, 5000);

        const handleLoad = () => {
            clearTimeout(fallbackTimeout);
            setTimeout(() => {
                setLoading(false);
                document.body.classList.add('site-loaded');
            }, 2000);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => {
                window.removeEventListener('load', handleLoad);
                clearTimeout(fallbackTimeout);
                clearTimeout(animationTimer);
            };
        }
    }, []);

    if (!isMounted) return null;

    return (
        <div className={`${styles.preloader} ${!loading ? styles.hidden : ''}`}>
            <div className={styles.innerSection}>
                <div className={`${styles.centerContent} ${animateContent ? styles.active : ''}`}>
                    <div className={styles.infinityContainer}>
                        <svg
                            viewBox="0 0 120 60"
                            className={styles.infinitySvg}
                        >
                            <path
                                className={styles.infinitySymbol}
                                d="M 30 10 a 20 20 0 1 0 0 40 c 20 0 40 -40 60 -40 a 20 20 0 0 1 0 40 c -20 0 -40 -40 -60 -40"
                            />
                        </svg>
                    </div>
                    <p className={styles.loadingText}>
                        {"Moldando o infinito, hoje.".split("").map((char, index) => (
                            <span
                                key={index}
                                className={styles.letter}
                                style={{ transitionDelay: `${index * 0.03}s` }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
        </div>
    );
}
