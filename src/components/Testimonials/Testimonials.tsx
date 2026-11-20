import SplitText from '@/components/motion/SplitText';
import a1 from '@/assets/img/pet-avatar-1.webp';
import a2 from '@/assets/img/pet-avatar-2.webp';
import a3 from '@/assets/img/pet-avatar-3.webp';
import TestimonialsStage, { type Perfil } from './TestimonialsStage';
import styles from './Testimonials.module.css';

const items: Perfil[] = [
  {
    nome: 'Petshop de bairro', tab: 'De bairro', img: a1,
    tamanho: '1 unidade, 2 a 6 pessoas',
    dor: 'Perco horário por confusão de agenda, e o tutor liga três vezes perguntando se o cachorro já está pronto.',
    resolve: [
      'Agenda por profissional, com conflito mostrado antes de confirmar',
      'Confirmação automática pelo WhatsApp: o tutor responde e a agenda atualiza',
      'Acompanhamento ao vivo do banho, por link, com fotos',
    ],
    plano: 'Petshop Essencial, R$ 129/mês',
  },
  {
    nome: 'Petshop com clínica', tab: 'Com clínica', img: a2,
    tamanho: '1 a 2 unidades, 8 a 20 pessoas',
    dor: 'Uso um sistema para o banho e outro para a consulta, e eles não conversam entre si.',
    resolve: [
      'Um cadastro e um histórico por tutor e por pet, do banho à internação',
      'Prontuário, receitas e controlados no mesmo sistema da loja',
      'Vacinas e vermífugos com lembrete de reforço e carteirinha digital',
    ],
    plano: 'Clínica, R$ 590/mês',
  },
  {
    nome: 'Rede ou franquia', tab: 'Rede', img: a3,
    tamanho: '3 ou mais unidades, mais de um CNPJ',
    dor: 'Para comparar as lojas eu junto planilha de cada uma, e o consolidado por CNPJ sai na mão.',
    resolve: [
      'Dados separados por loja, isolados por conta',
      'Relatórios e dashboard para comparar as unidades',
      'Financeiro e notas fiscais (NFC-e e NFS-e) por CNPJ',
    ],
    plano: 'Petshop Pro, R$ 249/mês + R$ 149 por unidade extra',
  },
];

export default function Testimonials() {
  return (
    <section id="para-quem" className={styles.testi} aria-labelledby="dep-title">
      <div className={`container ${styles.grid}`}>
        <SplitText as="h2" id="dep-title" className={`display ${styles.title}`}>
          Para quem é o rowan
        </SplitText>
        <TestimonialsStage items={items} />
      </div>
    </section>
  );
}
