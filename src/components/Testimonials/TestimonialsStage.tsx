'use client';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Image, { type StaticImageData } from 'next/image';
import styles from './Testimonials.module.css';

export type Perfil = {
  nome: string;
  tab: string;
  img: StaticImageData;
  tamanho: string;
  dor: string;
  resolve: string[];
  plano: string;
};

const INTERVAL = 7000;

export default function TestimonialsStage({ items }: { items: Perfil[] }) {
  const n = items.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [index, setIndex] = useState(0);
  /* bumped on every manual selection so the auto-advance timer restarts */
  const [epoch, setEpoch] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [docHidden, setDocHidden] = useState(false);
  const [reduced, setReduced] = useState(false);

  /* reduced motion + document visibility */
  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncRm = () => setReduced(rm.matches);
    const syncVis = () => setDocHidden(document.hidden);
    syncRm();
    syncVis();
    rm.addEventListener('change', syncRm);
    document.addEventListener('visibilitychange', syncVis);
    return () => {
      rm.removeEventListener('change', syncRm);
      document.removeEventListener('visibilitychange', syncVis);
    };
  }, []);

  /* pause while the section is off-screen */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const root = stage.closest('section') ?? stage;
    const io = new IntersectionObserver(
      (entries) => setVisible(entries[entries.length - 1].isIntersecting),
      { threshold: 0.3 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  /* auto-advance: one timeout per (index, pause-state) combination */
  useEffect(() => {
    if (reduced || hovered || focused || !visible || docHidden) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % n), INTERVAL);
    return () => clearTimeout(t);
  }, [index, epoch, reduced, hovered, focused, visible, docHidden, n]);

  const select = (i: number, focus = false) => {
    const next = (i + n) % n;
    setIndex(next);
    setEpoch((e) => e + 1);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowDown') select(index + 1, true);
    else if (k === 'ArrowLeft' || k === 'ArrowUp') select(index - 1, true);
    else if (k === 'Home') select(0, true);
    else if (k === 'End') select(n - 1, true);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={stageRef}
      className={styles.stage}
      data-reveal="up"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={(e) => setFocused((e.target as Element).matches(':focus-visible'))}
      onBlur={() => setFocused(false)}
    >
      <div className={styles.panels}>
        {items.map((it, i) => (
          <article
            key={it.nome}
            className={`${styles.panel}${i === index ? ` ${styles['is-active']}` : ''}`}
            role="tabpanel"
            id={`dep-panel-${i}`}
            aria-labelledby={`dep-tab-${i}`}
          >
            <h3 className={styles.perfil}>{it.nome}</h3>
            <p className={styles.tamanho}>{it.tamanho}</p>
            <p className={styles.rotulo}>O que trava hoje</p>
            <blockquote className={styles.quote}>{it.dor}</blockquote>
            <p className={styles.rotulo}>O que o rowan resolve</p>
            <ul className={styles.lista}>
              {it.resolve.map((r) => <li key={r}>{r}</li>)}
            </ul>
            <p className={styles.who}>
              Plano indicado: <strong>{it.plano}</strong>. <a className={styles.link} href="#planos">Ver planos</a>
            </p>
          </article>
        ))}
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Escolha o perfil do seu negócio">
        {items.map((it, i) => (
          <button
            key={it.nome}
            ref={(el) => { tabRefs.current[i] = el; }}
            type="button"
            role="tab"
            className={styles.tab}
            id={`dep-tab-${i}`}
            aria-controls={`dep-panel-${i}`}
            aria-selected={i === index}
            tabIndex={i === index ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={onKeyDown}
          >
            <span className={styles.avatar}>
              <Image className={styles.avatarImg} src={it.img} alt="" sizes="88px" />
            </span>
            <span className={styles.name}>{it.tab}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
