export type Plan = {
  id: string;
  name: string;
  forWho: string;
  /** Monthly price in reais. */
  price: number;
  recommended?: boolean;
  /** Label / value pairs, only what the product brief guarantees. */
  limits: { label: string; value: string }[];
  includes: string[];
};

export const plans: Plan[] = [
  {
    id: 'essencial',
    name: 'Petshop Essencial',
    forWho: 'Petshop de bairro, uma loja e equipe pequena.',
    price: 129,
    limits: [
      { label: 'Unidades', value: '1' },
      { label: 'Usuários', value: '3' },
      { label: 'Mensagens/mês', value: '2.000' },
      { label: 'Notas/mês', value: '500' },
    ],
    includes: [
      'Agenda com confirmação no WhatsApp',
      'Banho & Tosa em painel por fases',
      'Estoque, caixa e notas fiscais',
    ],
  },
  {
    id: 'pro',
    name: 'Petshop Pro',
    forWho: 'Petshop que quer crescer e tem banho e tosa todo dia.',
    price: 249,
    recommended: true,
    limits: [
      { label: 'Unidades', value: '1 (+R$ 149 por extra)' },
      { label: 'Usuários', value: '8' },
      { label: 'Mensagens/mês', value: '8.000' },
      { label: 'Notas/mês', value: '5.000' },
    ],
    includes: [
      'Acompanhamento ao vivo do banho',
      'Pacotes com saldo e comissão do tosador',
      'Financeiro e relatórios',
    ],
  },
  {
    id: 'clinica',
    name: 'Clínica',
    forWho: 'Clínica veterinária que também atende no balcão.',
    price: 590,
    limits: [
      { label: 'Usuários', value: '12' },
      { label: 'Mensagens/mês', value: '10.000' },
    ],
    includes: [
      'Prontuário e receitas',
      'Vacinas e vermífugos com lembrete de reforço',
      'Mesmo cadastro de tutor e pet do petshop',
    ],
  },
  {
    id: 'hospital',
    name: 'Hospital',
    forWho: 'Hospital veterinário com internação e mais de uma unidade.',
    price: 1290,
    limits: [
      { label: 'Unidades', value: '2' },
      { label: 'Usuários', value: '25' },
      { label: 'Mensagens/mês', value: '20.000' },
    ],
    includes: [
      'Internação e conta de internação',
      'Prontuário e receitas',
      'Histórico único do pet entre banho, consulta e internação',
    ],
  },
];

export const extras = [
  { name: 'Leva e traz', price: 'R$ 100/mês' },
  { name: 'Usuário extra', price: 'R$ 19/mês' },
  { name: 'Pacote de 2.000 mensagens', price: 'R$ 60' },
];
