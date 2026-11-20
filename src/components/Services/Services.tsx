import SplitText from '@/components/motion/SplitText';
import consulta from '@/assets/img/service-consulta.webp';
import vacina from '@/assets/img/service-vacina.webp';
import banho from '@/assets/img/service-banho.webp';
import hotel from '@/assets/img/service-hotel.webp';
import ServicesAccordion, { type Service } from './ServicesAccordion';
import styles from './Services.module.css';

const services: Service[] = [
  {
    id: 'banho',
    title: 'Banho & Tosa ao vivo',
    text: 'Chega de tutor ligando três vezes para saber se o cachorro está pronto. O painel do dia mostra cada pet por fase e o tutor acompanha pelo link.',
    details: [
      'Painel por fases: chegada, banho, secagem, tosa e pronto',
      'Link para o tutor ver a fase, com fotos',
      'Intercorrência com foto e ciência do tutor',
    ],
    img: banho,
    alt: 'Poodle molhado, em preto e branco, enrolado numa toalha e cercado de bolhas de sabão, sobre fundo teal escuro',
    tone: 'primaria',
    pos: '50% 30%',
  },
  {
    id: 'agenda',
    title: 'Agenda + WhatsApp',
    text: 'Horário perdido por confusão de agenda sai caro. O sistema mostra o conflito antes de marcar e confirma com o tutor sozinho.',
    details: [
      'Agenda por profissional, com conflito avisado antes',
      'Confirmação automática pelo WhatsApp da loja',
      'Lista de espera para encaixar cancelamentos',
    ],
    img: consulta,
    alt: 'Beagle sentado em preto e branco, olhando para cima enquanto uma veterinária de luvas ouve seu coração com um estetoscópio, sobre fundo teal escuro',
    tone: 'primaria',
    pos: '45% 18%',
  },
  {
    id: 'vacinas',
    title: 'Vacinas e prevenção',
    text: 'Reforço esquecido é cliente que some e pet desprotegido. O rowan lembra o tutor na data certa e guarda tudo na carteirinha.',
    details: [
      'Protocolos de vacinas e vermífugos',
      'Lembrete de reforço por mensagem',
      'Carteirinha digital para o tutor',
    ],
    img: vacina,
    alt: 'Gatinho em preto e branco com um curativo na pata, depois da vacina, sobre fundo teal claro',
    tone: 'acento',
    pos: '50% 30%',
  },
  {
    id: 'caixa',
    title: 'Caixa, notas e financeiro',
    text: 'Fim de dia sem planilha do lado. Venda, nota e contas ficam no mesmo lugar, e você vê o resultado sem esperar o contador.',
    details: [
      'PDV com Pix, maquininha e leitor de código de barras',
      'NFC-e e NFS-e emitidas no sistema',
      'A receber, a pagar e resultado (DRE)',
    ],
    img: hotel,
    alt: 'Golden retriever dormindo com o focinho apoiado nas patas, numa caminha felpuda, em preto e branco sobre fundo teal claro',
    tone: 'acento',
    pos: '50% 100%',
  },
];

export default function Services() {
  return (
    <section id="modulos" className={styles.services} aria-labelledby="modulos-title">
      <div className="container">
        <header className={styles.head}>
          <SplitText as="h2" id="modulos-title" className={`display ${styles.title}`}>
            Do agendamento ao caixa, sem planilha do lado
          </SplitText>
          <p className={styles.intro} data-reveal="up">
            Um sistema só para a operação inteira do petshop e da clínica. O mesmo tutor e o mesmo pet têm um
            cadastro e um histórico, do banho à consulta.
          </p>
        </header>

        <ServicesAccordion services={services} />
      </div>
    </section>
  );
}
