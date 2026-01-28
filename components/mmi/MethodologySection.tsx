import Image from 'next/image';
import styles from '../../app/mmi.module.css';

interface MethodologySectionProps {
    scrollToPricing: () => void;
    mode?: 'paciente' | 'cliente';
}

export default function MethodologySection({ scrollToPricing, mode = 'paciente' }: MethodologySectionProps) {
    const isCliente = mode === 'cliente';

    return (
        <section className={styles.methodologySection}>
            <Image
                src="/BG-Metodo.webp"
                alt="Background"
                fill
                className={styles.methodologyBg}
                loading="lazy"
                sizes="100vw"
                quality={75}
            />
            <div className={styles.methodologyContainer}>

                <div className={styles.methodologyTop}>
                    <h2 className={styles.methodologyTitle}>
                        Entenda os <strong>3 Pilares</strong> que você vai entender <br /> nessa <strong>Aula Online & Ao Vivo.</strong>
                    </h2>
                </div>

                <div className={styles.methodologyGrid}>
                    {/* Card 1 */}
                    <div className={styles.methodCard}>
                        <Image src="/icon-mentalidade.svg" alt="Mentalidade" width={40} height={40} className={styles.methodIcon} />
                        <div>
                            <h3 className={styles.methodLabel}>Mentalidade</h3>
                            <p className={styles.methodText}>
                                Se você ainda sente dificuldade de falar o preço que deseja é porque tem crenças que te limitam. Se você se compara com a sua concorrência e às vezes se sente perdido por isso.
                                <br /><br />
                                Nesse pilar você vai entender como ter uma mentalidade para se sentir pronto para cobrar o quanto merece receber sem que você gagueje ou tenha um pingo de dúvida ao falar o seu preço.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className={styles.methodCard}>
                        <Image src="/icon-mensagem.svg" alt="Mensagem" width={40} height={40} className={styles.methodIcon} />
                        <div>
                            <h3 className={styles.methodLabel}>Mensagem</h3>
                            <p className={styles.methodText}>
                                {isCliente ? (
                                    <>
                                        Aqui você aprenderá a comunicar de uma maneira que sempre explique aquilo que faz as pessoas falarem "é isso que eu quero", "é isso que eu preciso".
                                        <br /><br />
                                        Você eliminará toda a confusão da sua mensagem que faz chegar os clientes que você não quer atender. Dominará a clareza necessária para atrair exatamente quem você deseja.
                                    </>
                                ) : (
                                    <>
                                        Aqui você aprenderá a comunicar de uma maneira que sempre explique aquilo que faz as pessoas falarem "é isso que eu quero", "é isso que eu preciso".
                                        <br /><br />
                                        Você eliminará toda a confusão da sua mensagem que faz chegar os pacientes/clientes que você não quer atender. Dominará a clareza necessária para atrair exatamente quem você deseja.
                                    </>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className={styles.methodCard}>
                        <Image src="/icon-imagem.svg" alt="Imagem" width={40} height={40} className={styles.methodIcon} />
                        <div>
                            <h3 className={styles.methodLabel}>Imagem</h3>
                            <p className={styles.methodText}>
                                {isCliente ? (
                                    <>
                                        Por fim, você entenderá como construir uma imagem estratégica que impulsione a sua autoridade, atraia clientes qualificados e sustente a mensagem que foi construída.
                                        <br /><br />
                                        Essa imagem será refletida nas suas redes sociais e também no mundo offline, criando coerência e credibilidade em todos os pontos de contato.
                                    </>
                                ) : (
                                    <>
                                        Por fim, você entenderá como construir uma imagem estratégica que impulsione a sua autoridade, atraia pacientes qualificados e sustente a mensagem que foi construída.
                                        <br /><br />
                                        Essa imagem será refletida nas suas redes sociais e também no mundo offline, criando coerência e credibilidade em todos os pontos de contato.
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.methodologyFooter}>
                    <h2 className={styles.methodologyHeadline}>
                        Posicionamento é ser relevante para quem realmente importa!
                    </h2>

                    <div className={styles.methodologyCTA}>
                        <button className={styles.priceButton} onClick={scrollToPricing}>
                            <div className={styles.priceButtonText}>Quero ser o profissional mais relevante</div>
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
