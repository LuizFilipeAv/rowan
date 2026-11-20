import styles from './Marquee.module.css';

type Props = {
  reverse?: boolean;
  tone?: 'primaria' | 'acento' | 'coral';
};

const items = [
  'Agenda',
  'Confirmação no WhatsApp',
  'Banho & Tosa ao vivo',
  'Leva e traz',
  'Caixa e PDV',
  'Notas fiscais',
  'Financeiro',
  'Vacinas',
];

function Paw() {
  return (
    <svg className={styles.paw} viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <ellipse cx="12" cy="16" rx="5.6" ry="4.6" />
      <ellipse cx="4.6" cy="10.2" rx="2.1" ry="2.7" />
      <ellipse cx="9.2" cy="5.6" rx="2.1" ry="2.7" />
      <ellipse cx="14.8" cy="5.6" rx="2.1" ry="2.7" />
      <ellipse cx="19.4" cy="10.2" rx="2.1" ry="2.7" />
    </svg>
  );
}

/**
 * Decorative ticker band. The moving track is aria-hidden; a visually-hidden
 * list carries the same modules for screen readers.
 * tone: 'primaria' (default, teal band) or 'acento' (light teal band, dark text).
 * 'coral' is a legacy alias of 'acento', kept until src/app/page.tsx is updated.
 * reverse: scrolls in the opposite direction.
 */
export default function Marquee({ reverse = false, tone = 'primaria' }: Props) {
  const isAcento = tone === 'acento' || tone === 'coral';
  const rootClass = isAcento ? `${styles.marquee} ${styles.acento}` : styles.marquee;
  const trackClass = reverse ? `${styles.track} ${styles.reverse}` : styles.track;

  return (
    <div className={rootClass}>
      <div className={styles.band}>
        <div className={trackClass} aria-hidden="true">
          {[0, 1].map((group) => (
            <div className={styles.group} key={group}>
              {items.map((label) => (
                <span className={styles.item} key={label}>
                  {label}
                  <Paw />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <ul className="visually-hidden">
        {items.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
    </div>
  );
}
