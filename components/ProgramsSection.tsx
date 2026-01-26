'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './ProgramsSection.module.css';
import Image from 'next/image';

const programs = [
    {
        id: 'segundo-cerebro',
        title: 'Segundo Cérebro com [IA]™',
        image: '/programs/lendaria-ia.png',
        description: 'Programa completo que ensina construir um 2º Cérebro otimizado com IA usando Obsidian, transformando informação dispersa em conhecimento organizado e aplicável através de metodologias práticas que aceleram produtividade e tomada de decisões estratégicas.',
        href: 'https://academialendaria.ai/2-cerebro-ia'
    },
    {
        id: 'comunidade',
        title: 'Comunidade Lendár[IA]™',
        image: '/programs/lendaria-negocios.png',
        description: 'Ecossistema exclusivo que conecta Profissionais e Empresários em IA através de networking estratégico, eventos presenciais, mentorias coletivas e acesso a oportunidades reais de negócios, acelerando crescimento profissional e empresarial de forma colaborativa.',
        href: 'https://academialendaria.ai/comunidade'
    },
    {
        id: 'certificacao-gestor',
        title: 'Certificação Gestor [IA]™',
        image: '/programs/lendaria-carreiras.png',
        description: 'Programa prático que capacita profissionais a Dominar a Implementação e Gestão de IA Generativa Empresarial através de casos reais, eliminando a lacuna entre conhecimento técnico e aplicação estratégica no mercado de forma acelerada.',
        href: 'https://academialendaria.ai/gestor'
    },
    {
        id: 'formacao',
        title: 'Formação Lendár[IA]™',
        image: '/programs/lendaria-jovens.png',
        description: 'Sistema completo que capacita Empresários e Gestores a implementar IA Estratégica para Reduzir Despesas e Aumentar a Receita, combinando nosso Arsenal de Ferramentas proprietárias, automação de processos, treinamentos práticos e Monitoria Online e Ao Vivo 2 Vezes ao dia.',
        href: 'https://academialendaria.ai/formacao'
    }
];

const ProgramsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
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
        <section id="programs-section" ref={sectionRef} className={`${styles.programsSection} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <div className={styles.labelWrapper}>
                        <i className="fi fi-rr-graduation-cap" style={{ color: '#0A84FF', fontSize: '16px' }}></i>
                        <span className={styles.label}>Programas</span>
                    </div>
                    <h2 className={styles.title}>4 Caminhos Estruturados para Dominar IA Generativa.</h2>
                </div>
                <div className={styles.programsGrid}>
                    {programs.map((program) => (
                        <div key={program.id} className={styles.programCard}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={program.image}
                                    alt={program.title}
                                    fill
                                    className={styles.programImage}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.programTitle}>{program.title}</h3>
                                <p className={styles.programDescription}>
                                    {program.description}
                                </p>
                                <a href={program.href} className={styles.learnMoreButton}>
                                    <span>
                                        <span>Saiba Mais</span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProgramsSection;

