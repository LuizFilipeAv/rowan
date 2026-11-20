import styles from './Logo.module.css';

type Props = { className?: string; id?: string; as?: 'span' | 'div'; mono?: boolean };

/**
 * Marca rowan (docs/06 §2 do monorepo): símbolo em quadrado arredondado com pata e cruz + wordmark em caixa baixa.
 * O quadrado usa `--logo-bg` (padrão: primária); `mono` deixa símbolo e texto em `currentColor`, para fundo escuro.
 * Escala com font-size. `.logo__toe` é o gancho da animação de entrada no Hero.
 */
export default function Logo({ className = '', id, as: Tag = 'span', mono = false }: Props) {
  return (
    <Tag
      className={`${styles.logo} ${mono ? styles.mono : ''} logo ${className}`}
      id={id}
      role="img"
      aria-label="rowan"
    >
      <svg className={styles.mark} viewBox="0 0 48 48" aria-hidden="true">
        <rect className={styles.tile} width="48" height="48" rx="12" />
        <g className={styles.ink}>
          <circle className={`${styles.toe} logo__toe`} cx="12.6" cy="21.2" r="3.3" />
          <circle className={`${styles.toe} logo__toe`} cx="19.6" cy="13.4" r="3.7" />
          <circle className={`${styles.toe} logo__toe`} cx="28.4" cy="13.4" r="3.7" />
          <path className={`${styles.leaf} logo__toe`} d="M32.1 22.8C31.5 17.1 34.8 13.4 40.7 13c.6 5.7-2.7 9.3-8.6 9.8z" />
          <path d="M24 22.6c7 0 13 6 13 11.5 0 4.5-3 6.5-6.5 6.5-2.5 0-4.3-1.5-6.5-1.5s-4 1.5-6.5 1.5C14 40.6 11 38.6 11 34.1 11 28.6 17 22.6 24 22.6z" />
        </g>
        <path className={styles.vein} d="M33.4 21.6l5.9-7.1" />
        <g className={styles.cross}>
          <rect x="22.6" y="27.4" width="2.8" height="9" rx="1" />
          <rect x="19.5" y="30.5" width="9" height="2.8" rx="1" />
        </g>
      </svg>
      <span className={styles.word} aria-hidden="true">rowan</span>
    </Tag>
  );
}
