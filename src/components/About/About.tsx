import Image from 'next/image';
import SplitText from '@/components/motion/SplitText';
import vet from '@/assets/img/about-vet.webp';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="como-funciona" className={styles.about} aria-labelledby="sobre-title">
      <div className={styles.card}>
        <div className={styles.copy} data-stagger>
          <SplitText as="h2" id="sobre-title" className={`display ${styles.title}`}>
            Petshop e clínica no mesmo <span className={styles.hl}>sistema</span>
          </SplitText>

          <p className={styles.lead} data-reveal="up">
            O negócio pet é híbrido: o mesmo tutor e o mesmo pet passam por banho, vacina e consulta. No rowan eles
            têm um cadastro só. Quem usa dois sistemas que não conversam digita tudo duas vezes.
          </p>

          <dl className={styles.facts} data-reveal="up">
            <div className={styles.fact}>
              <dt>modos: petshop, clínica e hospital</dt>
              <dd><span className={styles.num} data-count="3">3</span></dd>
            </div>
            <div className={styles.fact}>
              <dt>módulos num sistema só</dt>
              <dd><span className={styles.num} data-count="8">8</span></dd>
            </div>
            <div className={styles.fact}>
              <dt>cadastro por tutor e por pet</dt>
              <dd><span className={styles.num} data-count="1">1</span></dd>
            </div>
          </dl>

          <a className="btn btn--claro" href="#planos" data-reveal="up" data-magnetic>
            Ver os planos
            <span className="btn__arrow" aria-hidden="true">
              <svg viewBox="0 0 10 10"><path d="M0 5.6h7.6L4.1 9.1 5 10l5-5-5-5-.9.9 3.5 3.5H0z" fill="currentColor" /></svg>
            </span>
          </a>
        </div>

        <div className={styles.photo} data-reveal="up">
          <Image
            src={vet}
            alt="Veterinária sorrindo com um buldogue francês nos braços, em um fundo verde-azulado"
            sizes="(min-width: 900px) 48vw, 90vw"
            className={styles.img}
          />

          <svg className={styles.scribble} viewBox="0 0 170 110" fill="none" aria-hidden="true" data-draw>
            <path
              d="M6 12C52-6 92 22 70 46C54 64 26 44 52 30C84 14 124 52 152 94"
              stroke="var(--acento)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M131 87.6L152 94L147 72.6"
              stroke="var(--acento)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
