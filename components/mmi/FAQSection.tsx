import { useState } from 'react';
import styles from '../../app/mmi.module.css';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
            <button className={styles.accordionTrigger} onClick={() => setIsOpen(!isOpen)}>
                {question}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.chevron}>
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className={styles.accordionContent}>
                <div className={styles.accordionInner}>
                    <p className={styles.accordionText}>{answer}</p>
                </div>
            </div>
        </div>
    );
};

export default function FAQSection() {
    const faqs = [
        {
            question: "Vai ficar gravado?",
            answer: "Sim! Mas recomendamos assistir ao vivo para aproveitar a energia, as orientações personalizadas e o contato direto com Bruno."
        },
        {
            question: "Serve para iniciantes?",
            answer: "Sim, se você sente que está no anonimato, e quer construir um posicionamento forte desde o início."
        },
        {
            question: "Serve para quem já tem mais experiência?",
            answer: "Totalmente. A Metodologia MMI já ajudou especialistas experientes a ajustarem sua comunicação e atraírem clientes mais alinhados e lucrativos."
        },
        {
            question: "Vai mostrar ferramentas?",
            answer: "Sim. Mas mais importante do que as ferramentas, você vai entender como pensar, comunicar e se posicionar com autoridade. Ferramenta sem clareza não gera resultado."
        }
    ];

    return (
        <section className={styles.faqSection}>
            <div className={styles.faqDivider}></div>
            <div className={styles.faqContainer}>
                <h2 className={styles.faqTitle}>
                    Perguntas<br />
                    frequentes
                </h2>

                <div className={styles.faqAccordion}>
                    {faqs.map((item, i) => (
                        <FAQItem key={i} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
}
