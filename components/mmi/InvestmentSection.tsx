import Image from 'next/image';
import styles from '../../app/mmi.module.css';

interface InvestmentSectionProps {
    openModal: () => void;
    mode?: 'paciente' | 'cliente';
}

export default function InvestmentSection({ openModal, mode = 'paciente' }: InvestmentSectionProps) {
    const isCliente = mode === 'cliente';

    const items = [
        "Aula ao vivo com Bruno Andrade (transmitido no Zoom)",
        "Acesso completo à Metodologia MMI",
        "Mapa visual do seu novo posicionamento",
        "Diagnóstico da percepção de valor",
        "Replay disponível por 7 dias"
    ];

    return (
        <section className={styles.investmentSection} id="pricing">
            <div className={styles.investmentGrid}>
                <h2 className={styles.investmentTitle}>
                    {isCliente ? (
                        <>Qual é o investimento para <strong>se tornar relevante no seu mercado?</strong></>
                    ) : (
                        <>Qual é o investimento para <strong>se tornar relevante na sua região?</strong></>
                    )}
                </h2>

                <p className={styles.investmentDesc}>
                    {isCliente ? (
                        <>
                            Uma manhã lapidando o seu posicionamento, com a <strong>Metodologia MMI</strong>, usada por profissionais que deixaram de ser vistos como “só mais um” e passaram a ser <strong>reconhecidos, bem pagos e naturalmente recomendados</strong> pelos clientes certos.
                        </>
                    ) : (
                        <>
                            Uma manhã lapidando o seu posicionamento, com a <strong>Metodologia MMI</strong>, usada por especialistas da saúde que deixaram de ser vistos como “só mais um” e passaram a ser <strong>reconhecidos, bem pagos e naturalmente recomendados</strong> pelos pacientes certos.
                        </>
                    )}
                </p>

                <div className={styles.investmentBottomWrapper}>
                    <div className={styles.investmentList}>
                        {items.map((item, i) => (
                            <div key={i} className={styles.investmentItem}>
                                <Image src="/check-circle.svg" alt="check" width={16} height={16} className={styles.checkIconInvestment} />
                                <span className={styles.investmentItemText}>{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.investmentPriceCard}>
                        <div className={styles.priceContainer}>
                            <div className={styles.priceSmall}>Hoje será apenas,</div>
                            <div className={styles.priceDisplay}>R$ 67</div>
                        </div>
                        <button className={styles.priceButton} onClick={openModal} aria-label="Garantir minha vaga e se tornar relevante">
                            <div className={styles.priceButtonText}>GARANTIR MINHA VAGA</div>
                            <div className={styles.priceArrowCircle}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
