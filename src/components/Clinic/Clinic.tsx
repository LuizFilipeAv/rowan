import Image from 'next/image';
import SplitText from '@/components/motion/SplitText';
import space from '@/assets/img/clinic-space.webp';
import ClinicStage from './ClinicStage';
import styles from './Clinic.module.css';

export default function Clinic() {
  return (
    <section className={styles.clinic} aria-labelledby="espaco-title">
      <div className={`container ${styles.head}`}>
        <SplitText as="h2" id="espaco-title" className={`display ${styles.title}`}>
          Feito para o balcão
        </SplitText>
        <p className={styles.lead} data-reveal="up">
          O rowan é usado em pé, com cliente esperando e cachorro latindo. Funciona no tablet da recepção, no
          celular do motorista e no do tutor. Toda ação responde na hora.
        </p>
      </div>

      <ClinicStage>
        <div className={styles.frame} data-frame>
          <div className={styles.inner} data-inner>
            <Image
              src={space}
              alt="Recepção clara de um petshop com clínica, com poltronas verde-azuladas e um golden retriever deitado no chão"
              fill
              sizes="(min-width: 900px) calc(100vw - 4rem), 100vw"
              className={styles.img}
            />
          </div>
        </div>

        <ul className={styles.tags} data-tags data-stagger>
          <li className={styles.tag} data-reveal="up">Recepção no tablet</li>
          <li className={styles.tag} data-reveal="up">Motorista no celular</li>
          <li className={styles.tag} data-reveal="up">Tutor acompanha pelo link</li>
        </ul>
      </ClinicStage>
    </section>
  );
}
