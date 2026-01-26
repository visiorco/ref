'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
    const [isVisible, setIsVisible] = React.useState(false);
    const footerRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);

    return (
        <div className={styles.footerWrapper}>
            <footer ref={footerRef} className={`${styles.footerContainer} ${isVisible ? styles.visible : ''}`}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {/* Column 1: Mapa do Site */}
                        <div className={styles.column}>
                            <h4 className={styles.title}>Mapa do Site</h4>
                            <ul className={styles.list}>
                                <li><a href="https://academialendaria.ai/">Página Inicial</a></li>
                                <li><a href="#quem-somos">Quem Somos</a></li>
                                <li><a href="#manifesto">Manifesto®</a></li>
                                <li><a href="#parcerias">Parcerias</a></li>
                                <li><a href="#newsletter">NewsLetter</a></li>
                                <li><a href="#lives">Lives Semanais</a></li>
                            </ul>
                        </div>

                        {/* Column 2: Programas & Eventos */}
                        <div className={styles.column}>
                            <h4 className={styles.title}>Programas</h4>
                            <ul className={styles.list}>
                                <li><a href="https://academialendaria.ai/comunidade">Comunidade Lendár[IA]™</a></li>
                                <li><a href="https://academialendaria.ai/gestor">Certificação Gestor [IA]™</a></li>
                                <li><a href="https://academialendaria.ai/formacao">Formação Lendár[IA]™</a></li>
                            </ul>

                            <h4 className={`${styles.title} ${styles.marginTop}`}>Eventos</h4>
                            <ul className={styles.list}>
                                <li><a href="#hackathon">Hackathon Lendário™</a></li>
                                <li><a href="#experiencia">Experiência Lendár[IA]™</a></li>
                            </ul>
                        </div>

                        {/* Column 3: Ecossistema */}
                        <div className={styles.column}>
                            <h4 className={styles.title}>Ecossistema</h4>
                            <ul className={styles.list}>
                                <li><a href="https://agencialendaria.ai/">Agência Lendar[IA]™</a></li>
                                <li><a href="https://lendario.ai/chat">Chat Lendário™</a></li>
                                <li><a href="https://superagentes.ai/">Super Agentes™</a></li>
                                <li><a href="https://hub.lendario.ai/">Hub Lendário™</a></li>
                                <li><a href="https://youtu.be/alPHSWRpbzU?si=kvWS46pbEw1kBrwz">Lendário Cast™</a></li>
                                <li><a href="#store">Lendário Store™</a></li>
                            </ul>
                        </div>

                        {/* Column 4: Siga-nos & Info */}
                        <div className={styles.infoColumn}>
                            <h4 className={styles.title}>Siga-nos nas redes</h4>
                            <div className={styles.socials}>
                                <a href="https://www.youtube.com/@Academia.Lendaria" className={styles.socialIcon} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                                    <Image src="/social-logos/youtube.svg" alt="YouTube" width={20} height={20} className={styles.iconImg} />
                                </a>
                                <a href="https://www.instagram.com/academialendaria/" className={styles.socialIcon} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                    <Image src="/social-logos/instagram.svg" alt="Instagram" width={20} height={20} className={styles.iconImg} />
                                </a>
                                <a href="https://x.com/oalanicolas" className={styles.socialIcon} aria-label="X" target="_blank" rel="noopener noreferrer">
                                    <Image src="/social-logos/twitter.svg" alt="X" width={18} height={18} className={styles.iconImg} />
                                </a>
                                <a href="https://www.tiktok.com/@oalanicolas" className={styles.socialIcon} aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                                    <Image src="/social-logos/tik-tok.svg" alt="TikTok" width={20} height={20} className={styles.iconImg} />
                                </a>
                                <a href="https://www.linkedin.com/company/academia-lend-r-ia/" className={styles.socialIcon} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                                    <Image src="/social-logos/linkedin.svg" alt="LinkedIn" width={20} height={20} className={styles.iconImg} />
                                </a>
                            </div>

                            <div className={styles.tagline}>
                                <p>
                                    Somos Um <strong>Ecossistema de Educação & Inovação para Pessoas e Negócios</strong> serem Potencializados com IA Generativa.
                                </p>
                            </div>

                            <div className={styles.copyright}>
                                <p>Academia Lendár[IA] © 2025 · All rights reserved</p>
                                <p className={styles.cnpj}>CNPJ: 37.348.342.0001-07</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
