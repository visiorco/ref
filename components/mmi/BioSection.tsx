import Image from 'next/image';
import styles from '../../app/mmi.module.css';
import { ForwardedRef, forwardRef } from 'react';

const BioSection = forwardRef<HTMLElement>((props, ref: ForwardedRef<HTMLElement>) => {
    return (
        <section className={styles.bioSection} ref={ref}>
            <div className={styles.bioContainer}>
                <div className={styles.bioImageWrapper}>
                    <Image
                        src="/Bruno-BIO.png"
                        alt="Bruno Andrade"
                        width={500}
                        height={600}
                        className={styles.bioImage}
                    />
                </div>

                <div className={styles.bioContent}>
                    <h2 className={styles.bioTitle}>
                        Bruno Andrade é especialista em percepção de valor e fundador da BC&reg;C, uma boutique de branding que <strong>já assinou projetos para grandes nomes como Seu Elias, Neymar, Let Ponto,</strong> entre outros.
                    </h2>

                    <div className={styles.bioColumns}>
                        <div>
                            <p className={styles.bioText}>
                                Ajuda transformar propósito em valor de mercado, Bruno é conhecido por trás da Referência Máxima um movimento que ajuda especialistas a se posicionarem como escolhas óbvias para los clientes certos.
                            </p>
                            <br />
                            <p className={styles.bioText}>
                                De contratos de R$150 a projetos fechados por R$1.2Mi. Essa virada não foi por sorte. Foi posicionamento.
                            </p>
                        </div>

                        <div>
                            <p className={styles.bioText}>
                                Bruno ensina o que vive. Sua metodologia, aplicada por centenas de especialistas, é baseada em três pilares: Mentalidade, Mensagem e Imagem e já ajudou profissionais, negócios e marcas a saírem do anonimato para assumirem o lugar de autoridade que merecem.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

BioSection.displayName = 'BioSection';

export default BioSection;
