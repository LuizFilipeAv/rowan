'use client';
import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from 'react';
import Image from 'next/image';
import Logo from '@/components/Logo/Logo';
import { gsap, ScrollTrigger, useGSAP, prefersReduced, finePointer, getLenis } from '@/lib/motion';
import cat from '@/assets/img/hero-cat.webp';
import dog from '@/assets/img/hero-dog.webp';
import s from './Hero.module.css';

/** Cada modo do switch mostra um pet e a prova de produto daquele tipo de negócio. */
type Modo = 'petshop' | 'clinica';

const FASES = ['Chegada', 'Banho', 'Secagem', 'Tosa', 'Pronto'] as const;
const FASE_INICIAL = 2; // abre em "Secagem": já tem histórico e ainda falta

/** Replays a [data-draw] svg by toggling the runtime's data-inview flag across two frames. */
const redraw = (svgs: NodeListOf<SVGElement> | SVGElement[]) => {
  svgs.forEach((m) => m.removeAttribute('data-inview'));
  requestAnimationFrame(() => requestAnimationFrame(() => svgs.forEach((m) => m.setAttribute('data-inview', ''))));
};

const Check = () => (
  <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 6.3 5 8.7l4.6-5.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const Arrow = () => (
  <span className="btn__arrow" aria-hidden="true">
    <svg viewBox="0 0 10 10"><path d="M0 5.6h7.6L4.1 9.1 5 10l5-5-5-5-.9.9 3.5 3.5H0z" fill="currentColor" /></svg>
  </span>
);

/** Fase do banho avançando em loop só enquanto o hero está na tela (parada em reduced motion). */
function useFaseAoVivo(root: RefObject<HTMLElement | null>, ativo: boolean) {
  const [fase, setFase] = useState(FASE_INICIAL);
  useEffect(() => {
    if (!ativo || prefersReduced() || !root.current) return;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (e.isIntersecting) timer = window.setInterval(() => setFase((f) => (f + 1) % FASES.length), 2400);
    });
    io.observe(root.current);
    return () => { io.disconnect(); window.clearInterval(timer); };
  }, [ativo, root]);
  return fase;
}

function CardBanho({ fase }: { fase: number }) {
  const pronto = fase === FASES.length - 1;
  return (
    <div className={s.card}>
      <div className={s.card__head}>
        <span className={s.card__avatar} aria-hidden="true">T</span>
        <div className={s.card__who}>
          <p className={s.card__title}>Thor · Banho e tosa</p>
          <p className={s.card__meta}>Link enviado para a tutora às 9:02</p>
        </div>
        <span className={`${s.chip} ${pronto ? s['chip--ok'] : s['chip--live']}`}>
          {pronto ? <Check /> : <i className={s.pulse} aria-hidden="true" />}
          {pronto ? 'Pronto' : 'Ao vivo'}
        </span>
      </div>
      <ol className={s.fases} aria-label={`Fase atual: ${FASES[fase]}`}>
        {FASES.map((nome, i) => (
          <li key={nome} className={i < fase ? s['is-done'] : i === fase ? s['is-now'] : undefined} aria-current={i === fase ? 'step' : undefined}>
            <span className={s.fases__dot} aria-hidden="true">{i < fase && <Check />}</span>
            <span className={s.fases__label}>{nome}</span>
          </li>
        ))}
      </ol>
      <p className={`${s.card__foot} tabular`}>
        {pronto ? 'Pode buscar · aviso enviado no WhatsApp' : `Em ${FASES[fase].toLowerCase()} há ${4 + fase * 3} min`}
      </p>
    </div>
  );
}

function CardPrevencao() {
  return (
    <div className={s.card}>
      <div className={s.card__head}>
        <span className={s.card__avatar} aria-hidden="true">M</span>
        <div className={s.card__who}>
          <p className={s.card__title}>Mia · Prevenção</p>
          <p className={s.card__meta}>Mesmo cadastro do banho e da consulta</p>
        </div>
        <span className={`${s.chip} ${s['chip--warn']}`}>Vence em 3 dias</span>
      </div>
      <ul className={s.doses}>
        <li><span>V4 felina</span><span className="tabular">reforço 22/11</span></li>
        <li><span>Antirrábica</span><span className={s.ok}><Check /> em dia</span></li>
        <li><span>Vermífugo</span><span className={s.ok}><Check /> em dia</span></li>
      </ul>
    </div>
  );
}

function CardWhats({ modo }: { modo: Modo }) {
  const msg =
    modo === 'petshop'
      ? 'Oi! Confirma o banho do Thor amanhã, às 9h?'
      : 'Oi! A V4 da Mia vence sexta. Pode ser quinta, 15h?';
  return (
    <div className={`${s.card} ${s['card--whats']}`}>
      <p className={s.whats__from}>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5a6.4 6.4 0 0 0-5.5 9.7L1.6 14.4l3.3-.9A6.4 6.4 0 1 0 8 1.5z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
        WhatsApp da loja · enviado sozinho
      </p>
      <p className={s.bubble}>{msg}</p>
      <p className={`${s.bubble} ${s['bubble--me']}`}>Confirmo!</p>
      <p className={`${s.chip} ${s['chip--ok']}`}><Check /> Agenda confirmada</p>
    </div>
  );
}

export default function Hero() {
  const [modo, setModo] = useState<Modo>('petshop');
  const root = useRef<HTMLElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const switchRef = useRef<HTMLDivElement>(null);
  const fase = useFaseAoVivo(root, modo === 'petshop');

  const { contextSafe } = useGSAP(
    () => {
      const reduced = prefersReduced();
      const q = gsap.utils.selector(root);
      const mark = q('[data-hero-mark-inner]')[0];
      const stage = q('[data-hero-stage]')[0];
      const ui = q('[data-hero-ui]');
      const floats = q('[data-hero-float]') as HTMLElement[];
      const marks = q('[data-draw]') as unknown as SVGElement[];

      /* ---------- Entrance ---------- */
      const firstVisit = !document.documentElement.classList.contains('intro-seen');
      if ((reduced || !firstVisit) && intro.current) intro.current.style.display = 'none';

      if (!reduced) {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        gsap.set(mark, { yPercent: 100, clipPath: 'inset(0 0 100% 0)' });
        gsap.set(stage, { yPercent: 6, scale: 1.04, opacity: 0 });
        gsap.set(ui, { y: 30, opacity: 0 });
        gsap.set(floats, { y: 40, scale: 0.94, opacity: 0 });

        if (firstVisit && intro.current) {
          try { sessionStorage.setItem('rowan-intro', '1'); } catch {}
          const ov = intro.current;
          const logo = ov.querySelector('.logo')!;
          tl.add(() => getLenis()?.stop())
            .from(logo, { yPercent: 40, opacity: 0, duration: 0.6 })
            .from(logo.querySelectorAll('.logo__toe'), { scale: 0, transformOrigin: '50% 100%', duration: 0.45, ease: 'back.out(2.2)', stagger: 0.06 }, '<0.15')
            .to(ov, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'expo.inOut' }, '+=0.15')
            .add(() => { ov.style.display = 'none'; getLenis()?.start(); });
        }
        tl.to(stage, { yPercent: 0, scale: 1, opacity: 1, duration: 1.2 }, firstVisit ? '-=0.45' : 0)
          .to(mark, { yPercent: 0, clipPath: 'inset(0 0 -20% 0)', duration: 1 }, '<0.1')
          .to(ui, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, '<0.3')
          .to(floats, { y: 0, scale: 1, opacity: 1, duration: 0.9, stagger: 0.14, ease: 'back.out(1.3)' }, '<0.35')
          .add(() => redraw(marks), '<');

        /* ---------- Scroll: card shrinks, wordmark lifts away, product cards drift faster ---------- */
        const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
        gsap.to(q('[data-hero-card]'), { scale: 0.92, borderRadius: 48, ease: 'none', scrollTrigger: st });
        gsap.to(q('[data-hero-mark]'), { yPercent: -60, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '60% top' } });
        gsap.to(q('[data-hero-pets]'), { yPercent: 10, ease: 'none', scrollTrigger: st });
        floats.forEach((f, i) => gsap.to(f.parentElement, { yPercent: -18 - i * 14, ease: 'none', scrollTrigger: st }));
        ScrollTrigger.refresh();
      }

      /* ---------- Pointer: subtle depth ---------- */
      if (!reduced && finePointer()) {
        const px = gsap.quickTo(q('[data-hero-pets]'), 'x', { duration: 1, ease: 'power3.out' });
        const mx = gsap.quickTo(mark, 'x', { duration: 1.2, ease: 'power3.out' });
        const my = gsap.quickTo(mark, 'y', { duration: 1.2, ease: 'power3.out' });
        const fx = floats.map((f) => gsap.quickTo(f.parentElement, 'x', { duration: 1.1, ease: 'power3.out' }));
        const move = (e: PointerEvent) => {
          const nx = e.clientX / innerWidth - 0.5;
          const ny = e.clientY / innerHeight - 0.5;
          px(nx * 18); mx(nx * -26); my(ny * -12);
          fx.forEach((f, i) => f(nx * (24 + i * 14)));
        };
        const leave = () => { px(0); mx(0); my(0); fx.forEach((f) => f(0)); };
        const el = root.current!;
        el.addEventListener('pointermove', move, { passive: true });
        el.addEventListener('pointerleave', leave);
        return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
      }
    },
    { scope: root },
  );

  const select = contextSafe((to: Modo) => {
    if (to === modo) return;
    setModo(to);
    if (prefersReduced()) return;
    gsap.fromTo(root.current!.querySelectorAll('[data-hero-float]'), { y: 14, opacity: 0.3 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.6)', stagger: 0.06 });
    redraw(root.current!.querySelectorAll<SVGElement>('[data-draw]'));
  });

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const next: Modo = modo === 'petshop' ? 'clinica' : 'petshop';
    select(next);
    switchRef.current?.querySelector<HTMLButtonElement>(`[data-to="${next}"]`)?.focus();
  };

  return (
    <>
      <div className={s.intro} ref={intro} aria-hidden="true">
        <Logo className={s.intro__logo} mono />
      </div>

      <section className={s.hero} id="top" ref={root} aria-labelledby="hero-title">
        <div className={s.hero__card} data-hero-card="">
          <div className={s.hero__mark} data-hero-mark="" aria-hidden="true">
            <div data-hero-mark-inner=""><span className={s.hero__word}>rowan</span></div>
          </div>

          <div className={s.hero__stage} data-hero-stage="">
            <div className={s.hero__pets} data-hero-pets="">
              <div className={`${s.hero__pet} ${modo === 'petshop' ? s['is-active'] : ''}`} aria-hidden={modo !== 'petshop'}>
                <Image src={dog} alt="Filhote de samoieda branco com coleira verde-azulada, recém-saído do banho"
                  fill priority sizes="(min-width: 900px) 62vh, 90vw" />
              </div>
              <div className={`${s.hero__pet} ${modo === 'clinica' ? s['is-active'] : ''}`} aria-hidden={modo !== 'clinica'}>
                <Image src={cat} alt="Gato branco de pelo longo e olhos verde-azulados caminhando em direção à câmera"
                  fill sizes="(min-width: 900px) 62vh, 90vw" />
              </div>
            </div>

            <svg className={s.hero__marks} viewBox="0 0 120 120" fill="none" data-draw="" aria-hidden="true">
              <path d="M18 62 L44 50" stroke="var(--primaria)" strokeWidth="7" strokeLinecap="round" />
              <path d="M24 34 L48 30" stroke="var(--primaria)" strokeWidth="7" strokeLinecap="round" style={{ ['--i' as string]: 1 }} />
              <path d="M40 10 L54 18" stroke="var(--primaria)" strokeWidth="7" strokeLinecap="round" style={{ ['--i' as string]: 2 }} />
            </svg>
          </div>

          {/* Prova de produto: o que a loja e o tutor veem */}
          <div className={s.hero__floats} role="group" aria-live="polite"
            aria-label={modo === 'petshop' ? 'Exemplo: banho acompanhado ao vivo e confirmação pelo WhatsApp' : 'Exemplo: prevenção do pet e lembrete pelo WhatsApp'}>
            <div className={s.float1}><div data-hero-float="">{modo === 'petshop' ? <CardBanho fase={fase} /> : <CardPrevencao />}</div></div>
            <div className={s.float2}><div data-hero-float=""><CardWhats modo={modo} /></div></div>
          </div>

          <div className={s.hero__copy} data-hero-ui="">
            <p className={s.hero__eyebrow}>Sistema para petshop, clínica e hospital veterinário</p>
            <h1 id="hero-title" className={s.hero__title}>O tutor para de ligar. A agenda se confirma sozinha.</h1>
            <p className={s.hero__lead}>
              Agenda, banho e tosa, caixa e financeiro num cadastro só. O tutor acompanha o banho ao vivo pelo link e confirma o horário no WhatsApp.
            </p>
            <div className={s.hero__actions}>
              <a className="btn" href="#planos" data-magnetic="">Ver planos <Arrow /></a>
              <a className={`btn btn--ghost ${s.hero__ghost}`} href="#contato">Falar com a equipe</a>
            </div>
          </div>

          <div className={s.hero__switch} role="radiogroup" aria-label="Veja o rowan no seu tipo de negócio" data-hero-ui=""
            data-active={modo} ref={switchRef} onKeyDown={onKey}>
            <span className={s['hero__switch-hl']} aria-hidden="true" />
            <button type="button" role="radio" aria-checked={modo === 'petshop'} tabIndex={modo === 'petshop' ? 0 : -1}
              data-to="petshop" onClick={() => select('petshop')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 5C4 5 2 8 3 12l3-1" /><path d="M17 5c3 0 5 3 4 7l-3-1" /><path d="M6 9.5a6 6 0 0 0 12 0V9a6 6 0 0 0-12 0z" /><path d="M10 11h.01M14 11h.01" /><path d="M11 15h2l-1 1z" />
              </svg>
              Petshop
            </button>
            <button type="button" role="radio" aria-checked={modo === 'clinica'} tabIndex={modo === 'clinica' ? 0 : -1}
              data-to="clinica" onClick={() => select('clinica')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 10 4 3l5 3.5h6L20 3l-1 7" /><path d="M5 10a7 7 0 1 0 14 0" /><path d="M10 13h.01M14 13h.01" /><path d="M2 15l4-.5M22 15l-4-.5" />
              </svg>
              Clínica
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
