import Image from 'next/image';
import SplitText from '@/components/motion/SplitText';
import dog from '@/assets/img/cta-peek-dog.webp';
import CtaPeek from './CtaPeek';
import styles from './CtaFinal.module.css';

export default function CtaFinal() {
  return (
    <section id="contato" className={styles.cta} aria-labelledby="cta-title">
      <div className={styles.card}>
        <div className={styles.main}>
          <SplitText as="h2" id="cta-title" className={`display ${styles.title}`}>
            Leve o rowan para a sua loja
          </SplitText>
          <p className={styles.lead} data-reveal="up">
            Mostramos o sistema funcionando com a rotina do seu petshop ou clínica e ajudamos a escolher o plano.
          </p>

          <div className={styles.actions} data-reveal="up">
            <a className="btn btn--claro" href="https://wa.me/5511900000000?text=Quero%20conhecer%20o%20rowan" target="_blank" rel="noopener" data-magnetic>Falar com a equipe</a>
            <a className="btn btn--ghost" href="#planos">Ver planos</a>

            <svg className={styles.arrow} viewBox="0 0 100 66" fill="none" aria-hidden="true" data-draw>
              <path d="M94 60C70 64 30 58 20 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M7 25L20 9L34 22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        </div>

        <div className={styles.panel} data-reveal="scale">
          <CtaPeek>
            <Image
              src={dog}
              alt="Cachorro jack russell sorridindo de língua para fora, espiando por cima de uma beirada, sobre fundo cinza de estúdio"
              fill
              sizes="(min-width: 900px) 40vw, 90vw"
              className={styles.img}
            />
          </CtaPeek>
        </div>

        <dl className={styles.info} data-stagger>
          <div data-reveal="up">
            <dt>Um cadastro só</dt>
            <dd>Tutor e pet com o mesmo histórico no banho, na vacina e na consulta.</dd>
          </div>
          <div data-reveal="up">
            <dt>Anual: paga 10, usa 12</dt>
            <dd>No plano anual você paga 10 meses e usa 12.</dd>
          </div>
          <div data-reveal="up">
            <dt>Seus dados por loja, isolados</dt>
            <dd>Cada conta enxerga só os próprios dados. Dúvidas: <a href="mailto:oi@rowan.app">oi@rowan.app</a></dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
