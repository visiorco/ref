'use client';

import styles from './Hero.module.css';
import GradientBlinds from './GradientBlinds';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
    const { t } = useLanguage();

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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
                        <p className={styles.textBlock}>
                            <span className={styles.textGray}>{t.hero.title1} </span>
                            <span className={styles.textWhite}>{t.hero.title2}</span>
                        </p>
                        <p className={styles.textBlock}>
                            <span className={styles.textWhite}>{t.hero.title3}</span>
                            <span className={styles.textGray}> {t.hero.title4}</span>
                        </p>
                        <p className={styles.textBlock}>
                            <span className={styles.textGray}>{t.hero.title5}</span>
                        </p>
                    </div>

                    <div className={styles.buttonsContainer}>
                        <button
                            className={styles.exploreButton}
                            onClick={() => scrollToSection('intro-quem-somos')}
                        >
                            <div>
                                {t.hero.explore.split('').map((char, index) => (
                                    <span key={index}>{char}</span>
                                ))}
                            </div>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M7 7L17 17M17 17H7M17 17V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            className={styles.programsButton}
                            onClick={() => scrollToSection('programs-section')}
                        >
                            <i className="fi fi-rr-graduation-cap"></i>
                            <div>
                                {t.hero.programs.split('').map((char, index) => (
                                    <span key={index}>{char}</span>
                                ))}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
