import Logo from '@/components/Logo/Logo';
import styles from './Footer.module.css';

const sections = [
  { href: '#modulos', label: 'Módulos' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#planos', label: 'Planos' },
  { href: '#para-quem', label: 'Para quem' },
  { href: '#contato', label: 'Contato' },
];

const produtos = ['Petshop', 'Clínica', 'Hospital', 'White-label'];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Logo className={styles.logo} mono />
            <p className={styles.tagline}>Um cadastro e um histórico para o tutor e o pet, do banho à internação.</p>
          </div>

          <nav className={styles.col} aria-labelledby="footer-nav-title">
            <h2 className={styles.title} id="footer-nav-title">
              Navegação
            </h2>
            <ul className={styles.list}>
              {sections.map((s) => (
                <li key={s.href}>
                  <a href={s.href}>{s.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <h2 className={styles.title} id="footer-product-title">
              Produto
            </h2>
            <ul className={styles.list}>
              {produtos.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <address className={styles.col}>
            <h2 className={styles.title} id="footer-contact-title">
              Contato
            </h2>
            <ul className={styles.list}>
              <li>
                <a href="mailto:oi@rowan.app">oi@rowan.app</a>
              </li>
              <li>
                <a href="https://wa.me/5511900000000">WhatsApp da equipe</a>
              </li>
            </ul>
          </address>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 rowan</p>
          <a href="#top" className={styles.topLink}>
            Voltar ao topo
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
