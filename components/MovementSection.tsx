import styles from './MovementSection.module.css';

const MovementSection = () => {
    return (
        <section className={styles.movement}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.textSide}>
                        <h2 className={styles.title}>Mais que Educação, <br />Um Movimento.</h2>
                        <div className={styles.content}>
                            <p>
                                O mercado está cheio de cursos que ensinam teoria, nós criamos um Movimento porque descobrimos algo fundamental:
                                <strong> O Sucesso não tem só que ver com o que você sabe, mas com quem você está caminhando.</strong>
                            </p>
                            <p>
                                Quando você está cercado de pessoas que pensam e agem na mesma direção, que compartilham os mesmos valores de excelência e transformação,
                                qualquer desafio se transforma em oportunidade. Juntos, construímos algo extraordinário - muito maior do que qualquer um de nós sozinho.
                            </p>
                        </div>
                    </div>

                    <div className={styles.visualSide}>
                        <div className={styles.globeWrapper}>
                            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" alt="Global Network" className={styles.globeImg} />
                            <div className={styles.statsPanel}>
                                <div className={styles.statLine}> +13 Mil Alunos em <strong>+40 Países</strong></div>
                                <div className={styles.ctaBadge}>IA Mudando Negócios espalhados pelo Brasil e Mundo.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MovementSection;
