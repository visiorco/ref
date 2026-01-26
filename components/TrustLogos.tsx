'use client';

import styles from './TrustLogos.module.css';

// Using local logos from public/logos-empresas
const logos = [
    { name: 'Globo', src: '/logos-empresas/Globo.svg', height: 32 },
    { name: 'RedBull', src: '/logos-empresas/RedBull.svg', height: 24 },
    { name: 'BTG', src: '/logos-empresas/BTG.svg', height: 48 },
    { name: 'Amazon', src: '/logos-empresas/Amazon.svg', height: 32, marginTop: 16 },
    { name: 'Meta', src: '/logos-empresas/Meta.svg', height: 24 },
    { name: 'Caixa', src: '/logos-empresas/Caixa.svg', height: 24 },
    { name: 'Banco do Brasil', src: '/logos-empresas/BB.svg', height: 32 },
    { name: 'AllFluence', src: '/logos-empresas/allfluence.svg', height: 32 },
];

const TrustLogos = () => {
    // Duplicate logos for seamless infinite scroll
    const duplicatedLogos = [...logos, ...logos, ...logos];

    return (
        <div className={styles.trustSection}>
            <div className={styles.marqueeContainer}>
                <div className={styles.marqueeTrack}>
                    {duplicatedLogos.map((logo, index) => (
                        <div key={`${logo.name}-${index}`} className={styles.logoItem}>
                            <img
                                src={logo.src}
                                alt={logo.name}
                                className={styles.logo}
                                style={{
                                    height: `${logo.height}px`,
                                    marginTop: (logo as any).marginTop ? `${(logo as any).marginTop}px` : undefined
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <p className={styles.label}>
                Colaboradores de grandes empresas que já <br className={styles.mobileBreak} />
                fazem parte do Ecossistema Lendária
            </p>
        </div>
    );
};

export default TrustLogos;

