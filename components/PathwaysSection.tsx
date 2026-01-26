'use client';
import styles from './PathwaysSection.module.css';

const programs = [
    {
        id: '2cerebro',
        title: '2º Cérebro',
        image: 'http://localhost:3845/assets/e82e29e8f78d69b700e93d0013f7ec01de851865.png',
        description: 'Sistema completo que capacita Empresários e Gestores a implementar IA Estratégica para Reduzir Despesas e Aumentar a Receita, combinando nosso Arsenal de Ferramentas proprietárias, automação de processos, treinamentos práticos e Monitoria Online e Ao Vivo 2 Vezes ao dia.'
    },
    {
        id: 'comunidade',
        title: 'Comunidade',
        image: 'http://localhost:3845/assets/8ad35bb11949df362471f09160927933474f1458.png',
        description: 'O ecossistema mais completo de networking e conexões estratégicas, onde empresários e experts compartilham experiências, fecham parcerias e aceleram seus resultados juntos.'
    },
    {
        id: 'legado',
        title: 'Legado',
        image: 'http://localhost:3845/assets/858def211f86c013335d4a1af0e62f6da3f45d8e.png',
        description: 'Programa de alto impacto para empresários que desejam escalar seus negócios com estratégias comprovadas, mentorias exclusivas e acesso direto aos maiores especialistas do mercado.'
    },
    {
        id: 'empresa',
        title: 'Empresa',
        image: 'http://localhost:3845/assets/2fe50d8509c8a5cac4688f0b5098a180707467c3.png',
        description: 'Transforme sua empresa em uma máquina de resultados com implementação de IA, automações e processos otimizados que reduzem custos e aumentam a produtividade do seu time.'
    }
];

export default function PathwaysSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.badge}>
                        <i className="fi fi-rr-graduation-cap"></i>
                        Programas
                    </span>
                    <h2 className={styles.title}>
                        4 Caminhos para<br />
                        <span className={styles.highlight}>Transformar seu Negócio</span>
                    </h2>
                </div>

                <div className={styles.grid}>
                    {programs.map((program) => (
                        <div key={program.id} className={styles.card}>
                            <div className={styles.cardImage}>
                                <img src={program.image} alt={program.title} />
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{program.title}</h3>
                                <p className={styles.cardDescription}>{program.description}</p>
                                <button className={styles.cardButton}>
                                    Saiba Mais
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
