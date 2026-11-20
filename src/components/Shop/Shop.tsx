import SplitText from '@/components/motion/SplitText';
import Plans from './Plans';
import styles from './Shop.module.css';

export default function Shop() {
  return (
    <section id="planos" className={styles.shop} aria-labelledby="planos-title">
      <div className="container">
        <header className={styles.head}>
          <SplitText as="h2" id="planos-title" className={`display ${styles.title}`}>
            Um preço por loja, sem surpresa na fatura
          </SplitText>
          <p className={styles.lead} data-reveal="up">
            Escolha pelo tamanho da operação. Todo plano começa com 14 dias grátis e dá para trocar depois.
          </p>
        </header>
        <Plans />
      </div>
    </section>
  );
}
