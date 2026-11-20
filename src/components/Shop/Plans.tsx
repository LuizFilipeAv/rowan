'use client';
import { useRef, useState, type KeyboardEvent } from 'react';
import { plans, extras } from './planData';
import styles from './Shop.module.css';

type Billing = 'mensal' | 'anual';
const options: { id: Billing; label: string }[] = [
  { id: 'mensal', label: 'Mensal' },
  { id: 'anual', label: 'Anual' },
];

const brl = (n: number) => n.toLocaleString('pt-BR');
/** "Paga 10, usa 12": equivalent monthly price, rounded to whole reais. */
const annualMonthly = (price: number) => Math.round((price * 10) / 12);

export default function Plans() {
  const [billing, setBilling] = useState<Billing>('mensal');
  const switchRef = useRef<HTMLDivElement>(null);
  const annual = billing === 'anual';

  const onKey = (e: KeyboardEvent) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const next: Billing = billing === 'mensal' ? 'anual' : 'mensal';
    setBilling(next);
    switchRef.current?.querySelector<HTMLButtonElement>(`[data-to="${next}"]`)?.focus();
  };

  return (
    <>
      <div className={styles.controls} data-reveal="up">
        <div className={styles.switch} role="radiogroup" aria-label="Período de cobrança" data-active={billing}
          ref={switchRef} onKeyDown={onKey}>
          <span className={styles.switchHl} aria-hidden="true" />
          {options.map((o) => (
            <button key={o.id} type="button" role="radio" aria-checked={billing === o.id}
              tabIndex={billing === o.id ? 0 : -1} data-to={o.id} onClick={() => setBilling(o.id)}>
              {o.label}
            </button>
          ))}
        </div>
        <span className={styles.badge}>2 meses grátis</span>
      </div>

      <ul className={styles.grid} data-stagger>
        {plans.map((p) => {
          const shown = annual ? annualMonthly(p.price) : p.price;
          return (
            <li key={p.id} className={`${styles.card} ${p.recommended ? styles.cardRec : ''}`} data-reveal="up">
              <article aria-labelledby={`plano-${p.id}`}>
                {p.recommended ? <p className={styles.tag}>Recomendado para quem tem banho e tosa</p> : null}
                <h3 id={`plano-${p.id}`} className={styles.planName}>{p.name}</h3>
                <p className={styles.forWho}>{p.forWho}</p>

                <p className={styles.priceRow}>
                  <span className={`${styles.price} tabular`}>R$ {brl(shown)}</span>
                  <span className={styles.per}>/mês</span>
                </p>
                <p className={`${styles.priceNote} tabular`} aria-live="polite">
                  {annual ? `Cobrança anual de R$ ${brl(p.price * 10)} (paga 10, usa 12)` : 'Cobrança mensal'}
                </p>

                <dl className={styles.limits}>
                  {p.limits.map((l) => (
                    <div key={l.label} className={styles.limit}>
                      <dt>{l.label}</dt>
                      <dd className="tabular">{l.value}</dd>
                    </div>
                  ))}
                </dl>

                <ul className={styles.includes}>
                  {p.includes.map((i) => <li key={i}>{i}</li>)}
                </ul>

                <a href="#contato" className={`btn ${p.recommended ? 'btn--claro' : 'btn--ghost'} ${styles.cta}`}>
                  Testar 14 dias grátis
                </a>
              </article>
            </li>
          );
        })}
      </ul>

      <div className={styles.extras} data-reveal="up">
        <h3 className={styles.extrasTitle}>Adicionais</h3>
        <ul className={styles.extrasList}>
          {extras.map((x) => (
            <li key={x.name}><span>{x.name}</span> <b className="tabular">{x.price}</b></li>
          ))}
        </ul>
      </div>
      <p className={styles.note} data-reveal="up">
        14 dias grátis com todos os módulos do plano, uma vez por CNPJ.
      </p>
    </>
  );
}
