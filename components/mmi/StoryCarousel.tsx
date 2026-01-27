import { useRef } from 'react';
import styles from '../../app/mmi.module.css';

const StoryBlock = ({ lines }: { lines: string[] }) => {
    return (
        <div className={styles.storyCard}>
            {lines.map((line, i) => (
                <p key={i} className={styles.storyCardText}>
                    {line.includes('—') ? <strong>{line}</strong> : line}
                </p>
            ))}
        </div>
    );
};

export default function StoryCarousel() {
    const blocks = [
        [
            "“Qual o menor valor que eu posso cobrar pra esse cliente não recusar?”",
            "Esse foi meu pensamento no meu primeiro contrato de consultoria.",
            "Era uma pizzaria. Eu cobrei R$200, achando que era impossível ele recusar."
        ],
        [
            "Ele respondeu:",
            "— “Fecha por R$150?”",
            "E eu aceitei. Sem pizza de brinde. Sem negociação. Só desconto.",
            "Aquele valor era metade do aluguel da minha esposa."
        ],
        [
            "Eu saí dali com a missão: conseguir mais um cliente pra fechar o mês.",
            "Foi nesse dia que comecei a me tornar o profissional que sou hoje.",
            "1 ANO E MEIO DEPOIS…",
            "O mesmo cliente me liga."
        ],
        [
            "— “Quero te contratar de novo. R$5.000 fixo + comissão. Vai dar uns R$13.000 por mês.”",
            "Mas eu respondi:",
            "— “Se eu aceitar, vou precisar recusar contratos melhores que estão chegando. Não consigo.”"
        ],
        [
            "O mesmo cliente que pediu R$50 de desconto, agora me oferecia R$13.000 por mês.",
            "O que mudou? Ele ficou mais rico? Não.",
            "Mudou a percepção de valor que ele tinha sobre mim. E mais importante: mudou a percepção que eu tinha sobre mim mesmo."
        ]
    ];

    return (
        <div className={styles.storyScrollWrapper}>
            <div className={styles.storyScrollContainer}>
                {blocks.map((blockLines, index) => (
                    <StoryBlock key={index} lines={blockLines} />
                ))}
            </div>
        </div>
    );
}
