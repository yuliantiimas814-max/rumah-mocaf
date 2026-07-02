'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  // Lottie ecosystem backgrounds — separate effect for reliability
  useEffect(() => {
    const containers = Array.from(document.querySelectorAll<HTMLElement>('.eco-lottie'));
    if (!containers.length) return;
    const paths = [
      '/video-animasi/farmers.json',
      '/video-animasi/craftsmen.json',
      '/video-animasi/youth-innovators.json',
      '/video-animasi/livestock-farmers.json',
    ];
    let alive = true;
    function runLottie() {
      const lottie = (window as any).lottie;
      if (!lottie) return;
      // Load satu per satu agar animasi pertama tampil segera
      paths.forEach((p, i) => {
        fetch(p).then(r => r.json()).then(data => {
          if (!alive) return;
          lottie.loadAnimation({
            container: containers[i],
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: data,
            rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
          });
        }).catch(e => console.error('Lottie fetch error:', p, e));
      });
    }
    if ((window as any).lottie) {
      runLottie();
    } else {
      const s = document.createElement('script');
      s.src = '/lottie.min.js';
      s.onload = runLottie;
      s.onerror = () => console.error('Failed to load lottie');
      document.head.appendChild(s);
    }
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    // Hero ticker
    const heroTrack = document.getElementById('heroTickerTrack') as HTMLElement | null;
    const heroSet = document.getElementById('heroTickerSet') as HTMLElement | null;
    function syncHeroTicker() {
      if (!heroTrack || !heroSet) return;
      const w = heroSet.getBoundingClientRect().width;
      if (w > 0) heroTrack.style.setProperty('--hero-set-w', w + 'px');
    }
    if (document.readyState === 'complete') { syncHeroTicker(); }
    else { window.addEventListener('load', syncHeroTicker); }
    window.addEventListener('resize', syncHeroTicker);

    // Ecosystem scroll-driven
    const ecoWrap = document.getElementById('ecoWrap');
    if (ecoWrap) {
      let cur = 0;
      const total = 4;
      const slides = Array.from(document.querySelectorAll('.eco-slide')) as HTMLElement[];
      const lottieDivs = Array.from(document.querySelectorAll('.eco-lottie')) as HTMLElement[];
      const dots = Array.from(document.querySelectorAll('.eco-dot-btn')) as HTMLElement[];
      function goTo(idx: number) {
        idx = Math.max(0, Math.min(total - 1, idx));
        if (idx === cur) return;
        const prev = cur;
        cur = idx;
        lottieDivs[cur].classList.add('active');
        slides[cur].classList.remove('inactive');
        dots[cur].classList.add('active');
        setTimeout(() => {
          lottieDivs[prev].classList.remove('active');
          slides[prev].classList.add('inactive');
          dots[prev].classList.remove('active');
        }, 50);
      }
      function checkEcoScroll() {
        if (!ecoWrap) return;
        const rect = ecoWrap.getBoundingClientRect();
        const scrolled = -rect.top;
        const scrollable = ecoWrap.offsetHeight - window.innerHeight;
        if (scrolled < 0 || scrollable <= 0) return;
        const p = Math.min(1, scrolled / scrollable);
        goTo(Math.min(total - 1, Math.floor(p * total)));
      }
      dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
      window.addEventListener('scroll', checkEcoScroll, { passive: true });
      checkEcoScroll();
    }

    // Product showcase scroll
    (function () {
      const bgColors = ['#d4e84a', '#f5dede', '#c8a07a', '#ddeef8', '#e8f5d4', '#fde8c8'];
      const items = Array.from(document.querySelectorAll('.psc-prod')) as HTMLElement[];
      const texts = Array.from(document.querySelectorAll('.psc-text')) as HTMLElement[];
      const bg = document.getElementById('pscBg') as HTMLElement | null;
      const wrap = document.getElementById('pscWrap') as HTMLElement | null;
      if (!items.length || !bg || !wrap) return;
      const total = items.length;
      let cur = 0;
      let busy = false;
      function stateFor(i: number) {
        const d = i - cur;
        if (d === 0) return 'psc-active';
        if (d === 1) return 'psc-next';
        return 'psc-hidden';
      }
      function setTextsAndBg() {
        texts.forEach((el, i) => el.classList.toggle('psc-text-active', i === cur));
        bg!.style.background = bgColors[cur];
        bg!.querySelectorAll('.psc-deco').forEach((el, i) => {
          const media = el as HTMLElement & { tagName: string };
          if (i === cur) {
            media.classList.add('psc-deco-active');
            if (media.tagName === 'VIDEO') (media as HTMLVideoElement).play();
          } else {
            media.classList.remove('psc-deco-active');
            if (media.tagName === 'VIDEO') (media as HTMLVideoElement).pause();
          }
        });
      }
      function applyAll() {
        items.forEach((el, i) => { el.className = 'psc-prod ' + stateFor(i); });
        setTextsAndBg();
      }
      function snapTo(el: HTMLElement, cls: string) {
        el.style.transition = 'none';
        el.className = 'psc-prod ' + cls;
        requestAnimationFrame(() => requestAnimationFrame(() => { el.style.transition = ''; }));
      }
      function goForward() {
        if (busy || cur >= total - 1) return;
        busy = true;
        const exiting = items[cur];
        cur++;
        exiting.style.transition = '';
        exiting.classList.remove('psc-active');
        exiting.classList.add('psc-exiting');
        items.forEach((el, i) => { if (el !== exiting) el.className = 'psc-prod ' + stateFor(i); });
        setTextsAndBg();
        setTimeout(() => { snapTo(exiting, 'psc-hidden'); busy = false; checkPscScroll(); }, 740);
      }
      function goBackward() {
        if (busy || cur <= 0) return;
        busy = true;
        const incoming = items[cur - 1];
        cur--;
        incoming.style.transition = 'none';
        incoming.className = 'psc-prod psc-rise-start';
        items.forEach((el, i) => { if (el !== incoming) el.className = 'psc-prod ' + stateFor(i); });
        setTextsAndBg();
        requestAnimationFrame(() => requestAnimationFrame(() => {
          incoming.style.transition = '';
          incoming.className = 'psc-prod psc-active';
          setTimeout(() => { busy = false; checkPscScroll(); }, 760);
        }));
      }
      function checkPscScroll() {
        if (!wrap || busy) return;
        const scrolled = -wrap!.getBoundingClientRect().top;
        const scrollable = wrap!.offsetHeight - window.innerHeight;
        if (scrolled < 0 || scrolled > scrollable) return;
        const target = Math.min(total - 1, Math.floor((scrolled / scrollable) * (total - 0.5)));
        if (target > cur) goForward();
        else if (target < cur) goBackward();
      }
      window.addEventListener('scroll', checkPscScroll, { passive: true });
      applyAll();
    })();

    // OIC cards scroll animation
    (function () {
      const outer = document.querySelector('.oic-outer') as HTMLElement | null;
      const cards = [document.getElementById('oicC1'), document.getElementById('oicC2'), document.getElementById('oicC3')] as (HTMLElement | null)[];
      if (!outer || !cards[0]) return;
      if (window.matchMedia('(max-width:900px)').matches) return;
      const wins: [number, number][] = [[0, 0.36], [0.32, 0.68], [0.64, 1.0]];
      function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }
      let ticking = false;
      function update() {
        const rect = outer!.getBoundingClientRect();
        const range = outer!.offsetHeight - window.innerHeight;
        const p = range > 0 ? Math.max(0, Math.min(1, -rect.top / range)) : 0;
        const startY = window.innerHeight * 1.02;
        cards.forEach((card, i) => {
          if (!card) return;
          const w = wins[i];
          const cp = Math.max(0, Math.min(1, (p - w[0]) / (w[1] - w[0])));
          card.style.transform = 'translateY(' + (startY * (1 - easeOut(cp))).toFixed(1) + 'px)';
        });
        ticking = false;
      }
      window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
      update();
    })();

    // OIC count animation on hover
    (function () {
      const counts = Array.from(document.querySelectorAll('.oic-count')) as HTMLElement[];
      counts.forEach((el) => {
        const target = parseInt(el.textContent || '0', 10);
        const card = el.closest('.oic-card') as HTMLElement | null;
        if (!card) return;
        let busy = false;
        card.addEventListener('mouseenter', () => {
          if (busy) return;
          busy = true;
          let start: number | null = null;
          function step(ts: number) {
            if (!start) start = ts;
            const p = Math.min((ts - start) / 1000, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.round(ease * target));
            if (p < 1) requestAnimationFrame(step);
            else { el.textContent = String(target); busy = false; }
          }
          requestAnimationFrame(step);
        });
      });
    })();

    // Testimonial cards scroll-driven
    (function () {
      const wrap = document.getElementById('tcsWrap') as HTMLElement | null;
      const cards = [
        document.getElementById('tcsCard0'), document.getElementById('tcsCard1'),
        document.getElementById('tcsCard2'), document.getElementById('tcsCard3'),
        document.getElementById('tcsCard4'),
      ] as (HTMLElement | null)[];
      if (!wrap || !cards[0]) return;
      const total = cards.length;
      let cur = 0;
      const ALL = ['tcs-pos-front', 'tcs-pos-back1', 'tcs-pos-back2', 'tcs-gone-left', 'tcs-gone-right'];
      function cls(el: HTMLElement, add: string) { ALL.forEach((c) => el.classList.remove(c)); el.classList.add(add); }
      function applyState() {
        cards.forEach((card, i) => {
          if (!card) return;
          const offset = i - cur;
          if (offset < 0) cls(card, i % 2 === 0 ? 'tcs-gone-left' : 'tcs-gone-right');
          else if (offset === 0) cls(card, 'tcs-pos-front');
          else if (offset === 1) cls(card, 'tcs-pos-back1');
          else cls(card, 'tcs-pos-back2');
        });
      }
      function goTo(idx: number) { if (idx === cur || idx < 0 || idx >= total) return; cur = idx; applyState(); }
      function checkTcsScroll() {
        if (!wrap) return;
        const scrolled = -wrap.getBoundingClientRect().top;
        const scrollable = wrap.offsetHeight - window.innerHeight;
        if (scrolled < 0 || scrolled > scrollable) return;
        goTo(Math.min(total - 1, Math.floor((scrolled / scrollable) * total)));
      }
      applyState();
      window.addEventListener('scroll', checkTcsScroll, { passive: true });
    })();

    // Map pins: appear via CSS animation when section enters viewport
    (function () {
      const mapSection = document.getElementById('mapSection') as HTMLElement | null;
      if (!mapSection) return;
      const SVG_W = 1440, SVG_H = 716, PIN_W = 52;
      const PINS = [
        { pin: 'mapPinOverlay',   lbl: 'mapSgLabel', tipX: 1081, tipY: 488, lblX: 1081, lblY: 366, ph: 114, delay: '0ms' },
        { pin: 'mapMyPinOverlay', lbl: 'mapMyLabel', tipX: 1071, tipY: 485, lblX: 1071, lblY: 363, ph: 114, delay: '100ms' },
        { pin: 'mapAePinOverlay', lbl: 'mapAeLabel', tipX: 880,  tipY: 423, lblX: 880,  lblY: 308, ph: 114, delay: '200ms' },
        { pin: 'mapOmPinOverlay', lbl: 'mapOmLabel', tipX: 894,  tipY: 433, lblX: 894,  lblY: 318, ph: 114, delay: '300ms' },
        { pin: 'mapTrPinOverlay', lbl: 'mapTrLabel', tipX: 798,  tipY: 389, lblX: 798,  lblY: 267, ph: 114, delay: '400ms' },
        { pin: 'mapGbPinOverlay', lbl: 'mapGbLabel', tipX: 666,  tipY: 356, lblX: 666,  lblY: 234, ph: 114, delay: '500ms' },
        { pin: 'mapDePinOverlay', lbl: 'mapDeLabel', tipX: 716,  tipY: 361, lblX: 716,  lblY: 220, ph: 135, delay: '600ms' },
        { pin: 'mapUsPinOverlay', lbl: 'mapUsLabel', tipX: 371,  tipY: 390, lblX: 371,  lblY: 268, ph: 114, delay: '700ms' },
      ];
      type PD = typeof PINS[0] & { pinEl: HTMLElement; lblEl: HTMLElement };
      const pinData: PD[] = PINS.map((p) => ({
        ...p,
        pinEl: document.getElementById(p.pin) as HTMLElement,
        lblEl: document.getElementById(p.lbl) as HTMLElement,
      }));
      function placeAll() {
        const cw = mapSection!.offsetWidth;
        const ch = mapSection!.offsetHeight || window.innerHeight;
        if (!cw) return;
        const s = Math.max(cw / SVG_W, ch / SVG_H);
        const xOff = (cw - SVG_W * s) / 2, yOff = (ch - SVG_H * s) / 2;
        pinData.forEach(({ pinEl, lblEl, tipX, tipY, lblX, lblY, ph }) => {
          if (!pinEl || !lblEl) return;
          const w = PIN_W * s, h = ph * s;
          pinEl.style.width = w + 'px'; pinEl.style.height = h + 'px';
          pinEl.style.left = (tipX * s + xOff - w / 2) + 'px';
          pinEl.style.top  = (tipY * s + yOff - h) + 'px';
          lblEl.style.fontSize = Math.round(14 * s) + 'px';
          lblEl.style.left = (lblX * s + xOff) + 'px';
          lblEl.style.top  = (lblY * s + yOff) + 'px';
        });
      }
      // Position pins immediately (CSS keeps them invisible via scale(0))
      placeAll();
      window.addEventListener('resize', placeAll);
      // Pins appear one-by-one scrolling down, disappear scrolling back up
      const mapWrapper = document.getElementById('mapSectionWrapper') as HTMLElement | null;
      const THRESHOLDS = [0, 0.12, 0.24, 0.36, 0.48, 0.60, 0.72, 0.84];
      const pinStates = pinData.map((p, i) => ({ ...p, threshold: THRESHOLDS[i] ?? 0, shown: false }));
      function onScrollPin() {
        if (!mapWrapper) return;
        const wRect = mapWrapper.getBoundingClientRect();
        if (wRect.top > 0) {
          // Above sticky zone — hide all
          pinStates.forEach((p) => {
            if (!p.shown) return;
            p.shown = false;
            if (p.pinEl) p.pinEl.classList.remove('pin-animate');
            if (p.lblEl) p.lblEl.classList.remove('pin-label-animate');
          });
          return;
        }
        const progress = Math.min(1, (-wRect.top) / (mapWrapper.offsetHeight - window.innerHeight));
        pinStates.forEach((p) => {
          if (!p.shown && progress >= p.threshold) {
            p.shown = true;
            if (p.pinEl) { p.pinEl.style.animationDelay = '0ms'; p.pinEl.classList.add('pin-animate'); }
            if (p.lblEl) { p.lblEl.style.animationDelay = '300ms'; p.lblEl.classList.add('pin-label-animate'); }
          } else if (p.shown && progress < p.threshold) {
            p.shown = false;
            if (p.pinEl) p.pinEl.classList.remove('pin-animate');
            if (p.lblEl) p.lblEl.classList.remove('pin-label-animate');
          }
        });
      }
      window.addEventListener('scroll', onScrollPin, { passive: true });
    })();

    // Media partner ticker
    (function () {
      const track = document.getElementById('mpTickerTrack') as HTMLElement | null;
      if (!track) return;
      function syncMp() {
        const logos = track!.querySelectorAll('.mp-logo');
        if (logos.length < 14) return;
        const offset = (logos[13] as HTMLElement).offsetLeft - track!.offsetLeft;
        if (offset > 0) track!.style.setProperty('--mp-offset', offset + 'px');
      }
      if (document.readyState === 'complete') syncMp();
      else window.addEventListener('load', syncMp);
      window.addEventListener('resize', syncMp);
    })();

    // News filter buttons
    document.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    return () => { window.removeEventListener('resize', syncHeroTicker); };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-ticker-bar { position:absolute;bottom:0;left:0;right:0;z-index:3;padding:18px 0 28px; }
        .hero-ticker-label { text-align:center;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.38);margin-bottom:14px; }
        .hero-ticker-marquee { overflow:hidden;position:relative; }
        .hero-ticker-track { display:flex;align-items:center;width:max-content;will-change:transform;animation:hero-marquee 22s linear infinite; }
        @keyframes hero-marquee { from{transform:translateX(0);}to{transform:translateX(calc(-1 * var(--hero-set-w,25%)));} }
        .hero-ticker-set { display:flex;align-items:center;gap:64px;padding-right:64px;flex-shrink:0; }
        .hero-ticker-track img { height:32px;width:auto;object-fit:contain;filter:brightness(0) invert(1) opacity(0.55);flex-shrink:0;user-select:none; }
        .eco-scroll-wrap { position:relative;height:400vh;margin-bottom:0; }
        .eco-sticky-view { position:sticky;top:0;height:100vh;overflow:hidden;display:flex;align-items:stretch;background:#c8dfd0; }
        .eco-scroll-label { position:absolute;left:28px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;align-items:center;gap:10px;z-index:3; }
        .eco-scroll-line-v { width:1px;height:72px;background:#2D7A4F;opacity:0.6; }
        .eco-scroll-label span { writing-mode:vertical-rl;text-orientation:mixed;font-size:10px;font-weight:700;letter-spacing:0.18em;color:#2D7A4F;opacity:0.8; }
        .eco-bg-videos { position:absolute;inset:0;z-index:0; }
        .eco-overlay { display:none; }
        .eco-content-area { position:relative;z-index:2;display:flex;align-items:center;width:100%;height:100%;padding:0 0 0 max(80px,calc((100vw - 1200px)/2 + 24px)); }
        .eco-text-side { flex:0 0 44%;position:relative;display:flex;flex-direction:column;justify-content:center;gap:0;padding:0;background:transparent; }
        .eco-section-tag { display:inline-block;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#1A3D2B;padding:4px 14px;background:rgba(255,255,255,0.6);border-radius:20px;width:fit-content;margin-bottom:16px; }
        .eco-slides-wrapper { display:grid;margin:0; }
        .eco-slide { grid-area:1/1;width:100%;transition:opacity 0.5s ease,transform 0.5s ease; }
        .eco-slide.inactive { opacity:0;transform:translateY(20px);pointer-events:none; }
        .eco-slide:not(.inactive) { opacity:1;transform:translateY(0); }
        .eco-name { font-size:clamp(44px,4.5vw,68px);font-weight:800;color:#2D5A3D;line-height:1.1;margin-bottom:10px; }
        .eco-role { font-size:17px;font-weight:600;color:#3a8a5f;margin-bottom:18px; }
        .eco-desc-text { font-size:15px;line-height:1.75;color:#4a7060;max-width:38ch;margin-bottom:24px; }
        .eco-count-badge { display:block;font-size:15px;font-weight:700;color:#fff;padding:7px 20px;background:#2D7A4F;border-radius:24px;width:fit-content;margin-bottom:0; }
        .eco-scroll-dots { display:flex;flex-direction:column;align-items:center;gap:6px;margin-top:12px; }
        .eco-dot-btn { width:6px;height:6px;border-radius:50%;background:rgba(45,122,79,0.35);border:none;cursor:pointer;transition:all 0.3s;padding:0; }
        .eco-dot-btn.active { height:20px;border-radius:3px;background:#2D7A4F; }
        .eco-cta-btn { display:inline-block;margin-top:24px; }
        .eco-cta-btn:hover { color:#fff!important; }
        .eco-lottie { position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 0.8s ease;overflow:hidden; }
        .eco-lottie.active { opacity:1; }
        .eco-lottie svg { position:absolute!important;inset:0!important;width:100%!important;height:100%!important; }
        .eco-lottie:nth-child(1) { background:linear-gradient(135deg,#1a4d2e 0%,#2d7a4f 40%,#4caf80 80%,#a8d5b5 100%); }
        .eco-lottie:nth-child(2) { background:linear-gradient(135deg,#1a3a4d 0%,#1e5f7a 40%,#3090b0 80%,#8acce0 100%); }
        .eco-lottie:nth-child(3) { background:linear-gradient(135deg,#3d1a4d 0%,#6b2d8a 40%,#9b5dc0 80%,#cda8e0 100%); }
        .eco-lottie:nth-child(4) { background:linear-gradient(135deg,#4d3a1a 0%,#8a6020 40%,#c09040 80%,#e0c888 100%); }
        @media (max-width:900px) { .eco-scroll-wrap{height:auto}.eco-sticky-view{position:relative;height:100vh}.eco-content-area{padding:0 24px}.eco-text-side{flex:0 0 100%;padding:80px 0}.eco-slide{position:relative;top:auto;left:auto}.eco-slide.inactive{display:none;opacity:1;transform:none}.eco-scroll-label{display:none}.eco-cta-btn{position:relative;bottom:auto;margin-top:8px} }
        @media (max-width:768px) { .eco-content-area{padding:0 16px} }
        .psc-scroll-wrap { position:relative;height:1000vh;overflow:clip; }
        .psc-section { position:sticky;top:0;height:100vh;min-height:560px;overflow:hidden; }
        .psc-bg { position:absolute;inset:0;background:#d4e84a;transition:none;z-index:0; }
        .psc-deco { position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:0;pointer-events:none;display:block;transition:opacity 0.5s ease; }
        .psc-deco.psc-deco-active { opacity:1; }
        .psc-text[data-idx="0"] h2,.psc-text[data-idx="0"] p { color:#408904; }
        .psc-text[data-idx="0"] .psc-buybtn { background:#408904;border-color:#408904;color:#fff; }
        .psc-text[data-idx="0"] .psc-all-btn { border-color:#408904;color:#408904; }
        .psc-text[data-idx="0"] .psc-all-btn:hover { background:#408904;color:#fff; }
        .psc-text[data-idx="1"] h2 { color:#832526; }
        .psc-text[data-idx="1"] p { color:#FFE4E4; }
        .psc-text[data-idx="1"] .psc-buybtn { background:#832526;border-color:#832526;color:#fff; }
        .psc-text[data-idx="1"] .psc-all-btn { border-color:#832526;color:#832526; }
        .psc-text[data-idx="1"] .psc-all-btn:hover { background:#832526;color:#fff; }
        .psc-text[data-idx="2"] h2,.psc-text[data-idx="2"] p { color:#FFEDE4; }
        .psc-text[data-idx="2"] .psc-buybtn { background:#FFEDE4;border-color:#FFEDE4;color:#3b1a0a; }
        .psc-text[data-idx="2"] .psc-all-btn { border-color:#FFEDE4;color:#FFEDE4; }
        .psc-text[data-idx="2"] .psc-all-btn:hover { background:#FFEDE4;color:#3b1a0a; }
        .psc-text[data-idx="4"] h2,.psc-text[data-idx="4"] p { color:#FFEDE4; }
        .psc-text[data-idx="4"] .psc-buybtn { background:#FFEDE4;border-color:#FFEDE4;color:#3b1a0a; }
        .psc-text[data-idx="4"] .psc-all-btn { border-color:#FFEDE4;color:#FFEDE4; }
        .psc-text[data-idx="4"] .psc-all-btn:hover { background:#FFEDE4;color:#3b1a0a; }
        .psc-inner { position:absolute;inset:0;z-index:2; }
        .psc-texts { position:absolute;left:max(24px,calc((100% - 1200px)/2 + 24px));top:22%;width:clamp(200px,24vw,320px);z-index:6; }
        .psc-text { position:absolute;inset:0;opacity:0;transform:translateY(16px);transition:opacity 0.5s ease,transform 0.5s ease;pointer-events:none; }
        .psc-text-active { opacity:1!important;transform:translateY(0)!important;pointer-events:auto!important; }
        .psc-text h2 { font-size:clamp(24px,2.6vw,40px);font-weight:800;color:#1a3d2b;line-height:1.15;margin:0 0 14px; }
        .psc-text p { font-size:14px;line-height:1.75;color:#2a5c2a;max-width:270px;margin-bottom:26px; }
        .psc-buybtn { display:inline-block;padding:10px 28px;border:2px solid #1a3d2b;border-radius:8px;color:#fff;font-weight:700;font-size:14px;text-decoration:none;background:#1a3d2b;transition:background 0.3s,color 0.3s; }
        .psc-buybtn:hover { background:transparent;color:#1a3d2b; }
        .psc-text[data-idx="0"] .psc-buybtn:hover { background:transparent;color:#408904; }
        .psc-text[data-idx="1"] .psc-buybtn:hover { background:transparent;color:#832526; }
        .psc-text[data-idx="2"] .psc-buybtn:hover { background:transparent;color:#FFEDE4; }
        .psc-text[data-idx="4"] .psc-buybtn:hover { background:transparent;color:#FFEDE4; }
        .psc-all-btn { display:inline-block;padding:10px 28px;border:2px solid currentColor;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;background:transparent;transition:background 0.3s,color 0.3s;white-space:nowrap; }
        .psc-stage { position:absolute;inset:0; }
        .psc-prod { position:absolute;top:50%;left:50%;transition:transform 0.75s cubic-bezier(0.35,0,0.25,1),opacity 0.75s ease; }
        .psc-prod img { height:clamp(340px,58vh,560px);width:auto;max-width:clamp(260px,34vw,480px);object-fit:contain;display:block;filter:drop-shadow(0 20px 40px rgba(0,0,0,0.20));user-select:none; }
        .psc-active { transform:translate(-50%,-50%) scale(1);opacity:1;z-index:4; }
        .psc-next { transform:translate(calc(-50% + 30vw),-50%) scale(0.52);opacity:0;z-index:3;pointer-events:none; }
        .psc-hidden { transform:translate(calc(-50% + 70vw),-50%) scale(0.55);opacity:0;z-index:2;pointer-events:none; }
        .psc-exiting { transform:translate(-50%,80vh) scale(0.5)!important;opacity:0!important;z-index:5!important;pointer-events:none;transition:transform 0.72s cubic-bezier(0.4,0,0.6,1),opacity 0.55s ease 0.05s!important; }
        .psc-rise-start { transform:translate(-50%,80vh) scale(0.5);opacity:0;z-index:5;pointer-events:none;transition:none!important; }
        .psc-wave { position:absolute;bottom:-2px;left:0;right:0;z-index:3;pointer-events:none;overflow:hidden;height:110px; }
        .psc-wave-back,.psc-wave-front { position:absolute;bottom:0;left:0;width:200%;height:110px;display:block; }
        .psc-wave-back { animation:waveScroll 9s linear infinite; }
        .psc-wave-front { animation:waveScroll 6s linear infinite reverse; }
        @keyframes waveScroll { 0%{transform:translateX(0);}100%{transform:translateX(-50%);} }
        @media (max-width:768px) { .psc-scroll-wrap{height:auto}.psc-section{position:relative;height:auto;min-height:0;padding:56px 0 110px}.psc-inner{position:relative;height:480px}.psc-texts{left:24px;top:20px;width:calc(100% - 48px)}.psc-text{position:absolute;inset:0}.psc-text:not(.psc-text-active){display:none}.psc-active{transform:translate(-50%,-40%) scale(1)}.psc-next{transform:translate(calc(-50% + 60vw),-40%) scale(0.68)}.psc-hidden{transform:translate(calc(-50% + 110vw),-40%) scale(0.55)} }
        .oic-outer { height:260vh; }
        .oic-section { position:sticky;top:0;height:100vh;overflow:hidden;background:#fff;z-index:1; }
        .oic-inner { height:100%;max-width:1280px;width:100%;margin:0 auto;padding:0 60px;display:flex;flex-direction:column;box-sizing:border-box; }
        .oic-header { padding:145px 0 32px 42%;text-align:left;flex-shrink:0; }
        .oic-badge { display:inline-block;background:#DBEFFF;color:#36739B;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:10px 26px;border-radius:100px;margin-bottom:20px; }
        .oic-title { font-size:clamp(38px,4vw,56px);font-weight:800;color:#111;line-height:1.12;margin:0; }
        .oic-grid { display:flex;gap:28px;align-items:flex-end;flex:1; }
        .oic-card { flex:1;overflow:hidden;background:linear-gradient(155deg,#F0FAF6 0%,#E9F4FC 100%);border-radius:20px 20px 0 0;padding:40px 36px 44px;text-align:left;will-change:transform; }
        .oic-card--1 { height:118%; }
        .oic-card--2 { height:80%; }
        .oic-card--3 { height:68%; }
        .oic-num { font-size:84px;font-weight:400;color:#111;line-height:1;margin-bottom:12px;letter-spacing:-3px;transition:color 0.3s; }
        .oic-num sup { font-size:46px;vertical-align:super;line-height:0;font-weight:400; }
        .oic-card:hover .oic-num { background:linear-gradient(135deg,#2D7A4F 0%,#3bb8d4 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .oic-label { font-size:20px;font-weight:700;color:#1A3D2B;margin-bottom:14px; }
        .oic-text { font-size:14px;color:#527563;line-height:1.8;margin:0; }
        @media (max-width:900px) { .oic-outer{height:auto}.oic-section{position:static;height:auto;overflow:visible}.oic-inner{display:block;padding:72px 24px 80px}.oic-header{padding:0 0 32px}.oic-grid{flex-direction:column;align-items:stretch;gap:16px}.oic-card{height:auto!important;padding:36px 28px 40px} }
        .tcs-wrap { position:relative;height:500vh; }
        .tcs-sticky { position:sticky;top:0;height:100vh;background:#fff;display:flex;flex-direction:column;justify-content:center;padding-top:52px;box-sizing:border-box;overflow:hidden; }
        .tcs-inner { width:100%;max-width:1200px;margin:0 auto;padding:0 24px; }
        .tcs-heading { text-align:center;margin-bottom:56px; }
        .tcs-title { font-size:clamp(26px,3.2vw,42px);font-weight:800;color:#111;line-height:1.15;margin:10px 0 12px; }
        .tcs-subtitle { font-size:16px;color:#555;line-height:1.65;max-width:520px;margin:0 auto 18px; }
        .tcs-deck { position:relative;max-width:860px;margin:0 auto;height:360px;overflow:visible; }
        .tcs-card { position:absolute;inset:0;border-radius:24px;display:flex;align-items:center;padding:56px 64px;gap:56px;overflow:hidden;transition:transform 0.72s cubic-bezier(0.35,0,0.25,1),opacity 0.55s ease;will-change:transform,opacity; }
        .tcs-navy{background:#0d1b4d}.tcs-blue{background:#3b5bdb}.tcs-green{background:#3da85a}.tcs-teal{background:#0d5c73}.tcs-purple{background:#5e2d91}
        .tcs-pos-front{transform:translate(0,0) scale(1);opacity:1;z-index:3}
        .tcs-pos-back1{transform:translateY(-14px) scaleX(0.968);opacity:1;z-index:2}
        .tcs-pos-back2{transform:translateY(-26px) scaleX(0.940);opacity:1;z-index:1}
        .tcs-gone-left{transform:translateX(-130%) rotate(-16deg);opacity:0;z-index:4;pointer-events:none}
        .tcs-gone-right{transform:translateX(130%) rotate(16deg);opacity:0;z-index:4;pointer-events:none}
        .tcs-left{flex:1;min-width:0}.tcs-qmark{font-size:110px;line-height:0.8;color:rgba(255,255,255,0.35);font-family:Georgia,serif;margin-bottom:-8px;display:block}
        .tcs-quote{font-size:14.5px;font-style:italic;color:rgba(255,255,255,0.9);line-height:1.8;margin:0 0 28px}
        .tcs-author{display:flex;align-items:center;gap:14px}
        .tcs-author-line{width:3px;height:42px;background:rgba(255,255,255,0.55);flex-shrink:0}
        .tcs-name{font-size:15px;font-weight:700;color:#fff;margin:0 0 4px}
        .tcs-role{font-size:12.5px;color:rgba(255,255,255,0.55);margin:0}
        .tcs-right{flex-shrink:0}.tcs-hex{width:220px;height:280px;border-radius:24px;overflow:hidden}
        .tcs-hex img{width:100%;height:100%;object-fit:cover;object-position:center 20%}
        @media (max-width:900px){.tcs-deck{height:360px}.tcs-card{padding:40px 36px;gap:28px}.tcs-hex{width:150px;height:240px}}
        @media (max-width:768px){.tcs-wrap{height:auto}.tcs-sticky{position:relative;height:auto;padding:80px 0 60px;overflow:visible}.tcs-deck{height:480px}.tcs-card{flex-direction:column;padding:36px 24px;gap:20px;align-items:flex-start}.tcs-hex{width:130px;height:210px}}
        #mapSectionWrapper{height:250vh;}
        .map-section{position:sticky;top:0;height:100vh;overflow:hidden;z-index:2;background:#0B1E40}
        .map-img{width:100%;height:100%;display:block;object-fit:cover;object-position:center 62%}
        .map-heading-bar{position:absolute;top:0;left:0;right:0;height:40%;background:linear-gradient(to bottom,#0B1E40 55%,transparent 100%);display:flex;flex-direction:column;align-items:center;padding-top:130px;z-index:10;pointer-events:none}
        .map-heading-bar h2{font-size:clamp(20px,2.4vw,36px);font-weight:800;color:#fff;margin:0 0 14px;letter-spacing:-0.01em}
        .map-heading-bar hr{width:200px;border:none;border-top:1px solid rgba(255,255,255,0.25);margin:0 auto}
        .map-sg-label{position:absolute;color:#fff;font-family:inherit;font-weight:400;letter-spacing:0.04em;white-space:nowrap;transform:translate(-50%,-100%);opacity:0;pointer-events:none;text-shadow:0 1px 6px rgba(0,0,0,0.6)}
        .map-pin-overlay{position:absolute;transform-origin:49% 100%;transform:scale(0);pointer-events:none;overflow:visible}
        @keyframes pin-drop{0%{transform:scale(0)}60%{transform:scale(1.15)}80%{transform:scale(0.95)}100%{transform:scale(1)}}
        @keyframes label-fade{from{opacity:0}to{opacity:1}}
        .pin-animate{animation:pin-drop 0.55s ease both}
        .pin-label-animate{animation:label-fade 0.4s ease both}
        .map-pin-svg{width:100%;height:100%;display:block;overflow:visible}
        .mp-bar{background:#F8F9FA;padding:20px 0;overflow:hidden}
        .mp-bar-inner{max-width:1200px;margin:0 auto;padding:0 32px;display:flex;align-items:center;gap:32px}
        .mp-bar-label{font-size:13px;color:#374151;white-space:nowrap;flex-shrink:0}
        .mp-bar-label strong{font-weight:700;color:#111827}
        .mp-ticker-outer{overflow:hidden;flex:1;min-width:0;-webkit-mask-image:linear-gradient(to right,transparent 0%,#000 12%,#000 88%,transparent 100%);mask-image:linear-gradient(to right,transparent 0%,#000 12%,#000 88%,transparent 100%)}
        .mp-ticker-track{display:flex;align-items:center;gap:40px;width:max-content;will-change:transform;animation:mp-marquee 28s linear infinite;padding-right:40px}
        @keyframes mp-marquee{from{transform:translateX(0);}to{transform:translateX(calc(-1 * var(--mp-offset,50%)));}}
        .mp-logo{height:36px;width:auto;max-width:120px;object-fit:contain;flex-shrink:0;filter:grayscale(100%) opacity(0.5);transition:filter 0.3s}
        .mp-logo:hover{filter:grayscale(0%) opacity(1)}
        @media (max-width:640px){.mp-bar-label{display:none}}
        .cta-float-wrap{position:absolute;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;pointer-events:none;z-index:1}
        .cta-float-left{left:clamp(16px,4vw,80px)}.cta-float-right{right:clamp(16px,4vw,80px)}
        .cta-fp{width:clamp(100px,10vw,160px);height:auto;max-height:260px;object-fit:contain;filter:drop-shadow(0 16px 40px rgba(0,0,0,0.35));border-radius:16px;animation:ctaFloat 5s ease-in-out infinite}
        .fp2{animation-duration:5.1s;animation-delay:-1.7s;--rot:-3deg}.fp4{animation-duration:4.6s;animation-delay:-2.3s;--rot:3deg}
        @keyframes ctaFloat{0%{transform:translateY(0px) rotate(var(--rot,0deg))}50%{transform:translateY(-20px) rotate(var(--rot,0deg))}100%{transform:translateY(0px) rotate(var(--rot,0deg))}}
        @media (max-width:900px){.cta-float-wrap{display:none}}
      `}} />

      {/* HERO */}
      <section className="hero" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: 0 }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: '#000' }}>
          <video autoPlay muted loop playsInline style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '100vw', height: '56.25vw', minHeight: '100vh', minWidth: '177.78vh', objectFit: 'cover' }}>
            <source src="/Video/Hero Home.mp4" type="video/mp4" />
          </video>
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(26,61,43,0.70)' }}></div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', zIndex: 2, background: 'linear-gradient(to bottom,transparent,rgba(0,0,0,0.95))', pointerEvents: 'none' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '120px 24px' }}>
          <h1 className="hero-title" style={{ fontSize: 'clamp(28px,3.5vw,52px)', lineHeight: 1.2, marginBottom: '20px', color: '#fff' }}>
            Empowering Farmers,<br />
            <span style={{ color: '#7dd3a8', whiteSpace: 'nowrap' }}>Producing Premium Mocaf Flour</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: '16px', lineHeight: 1.7, marginBottom: '36px', color: 'rgba(255,255,255,0.85)', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto' }}>
            Rumah Mocaf Indonesia transforms the lives of cassava farmers through sustainable practices and innovation.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link href="/products" className="btn btn-primary">Explore Products</Link>
            <Link href="/about" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.6)', color: '#fff' }}>Our Story</Link>
          </div>
        </div>
        <div className="hero-ticker-bar">
          <p className="hero-ticker-label">Presented at</p>
          <div className="hero-ticker-marquee">
            <div className="hero-ticker-track" id="heroTickerTrack">
              {[1,2,3,4].map((set) => (
                <div key={set} className="hero-ticker-set" id={set === 1 ? 'heroTickerSet' : undefined} aria-hidden={set > 1 ? 'true' : undefined}>
                  <img src="/images/LOGO/MIHAS.svg" alt={set===1?"MIHAS":""} />
                  <img src="/images/LOGO/FHA.png" alt={set===1?"FHA":""} />
                  <img src="/images/LOGO/Hannover%20Messe.svg" alt={set===1?"Hannover Messe":""} />
                  <img src="/images/LOGO/Turkiye.png" alt={set===1?"Odicoff Türkiye":""} />
                  <img src="/images/LOGO/SIAL%20Interfood.svg" alt={set===1?"SIAL Interfood":""} />
                  <img src="/images/LOGO/Trade%20Expo%20Indonesia.png" alt={set===1?"Trade Expo Indonesia":""} />
                  <img src="/images/LOGO/Amazing.png" alt={set===1?"Amazing Indonesia":""} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM SCROLL */}
      <section className="eco-scroll-wrap" id="ecoWrap">
        <div className="eco-sticky-view" id="ecoView">
          <div className="eco-bg-videos">
            <div className="eco-lottie active"></div>
            <div className="eco-lottie"></div>
            <div className="eco-lottie"></div>
            <div className="eco-lottie"></div>
          </div>
          <div className="eco-overlay"></div>
          <div className="eco-scroll-label">
            <div className="eco-scroll-line-v"></div>
            <span>SCROLL</span>
            <div className="eco-scroll-dots" id="ecoNavDots">
              <button className="eco-dot-btn active" data-target="0"></button>
              <button className="eco-dot-btn" data-target="1"></button>
              <button className="eco-dot-btn" data-target="2"></button>
              <button className="eco-dot-btn" data-target="3"></button>
            </div>
          </div>
          <div className="eco-content-area">
            <div className="eco-text-side">
              <span className="eco-section-tag">Our Ecosystem</span>
              <div className="eco-slides-wrapper">
                <div className="eco-slide"><h2 className="eco-name">Farmers</h2><p className="eco-role">Sustainable Cassava Cultivation</p><p className="eco-desc-text">Farmers practice integrated organic farming, managing every step of cassava cultivation — from planting quality seedlings to sustainable harvesting.</p><div className="eco-count-badge">625+ Farmers</div><Link href="/ecosystem" className="btn btn-outline eco-cta-btn" style={{ borderColor: 'rgba(45,122,79,0.6)', color: '#2D5A3D' }}>Explore Ecosystem →</Link></div>
                <div className="eco-slide inactive"><h2 className="eco-name">Craftsmen</h2><p className="eco-role">Transforming Cassava into Premium Mocaf Flour</p><p className="eco-desc-text">Craftsmen transform raw cassava into premium gluten-free mocaf flour through careful soaking, pressing, drying, and sieving at every step.</p><div className="eco-count-badge">265+ Craftsmen</div><Link href="/ecosystem" className="btn btn-outline eco-cta-btn" style={{ borderColor: 'rgba(45,122,79,0.6)', color: '#2D5A3D' }}>Explore Ecosystem →</Link></div>
                <div className="eco-slide inactive"><h2 className="eco-name">Youth Innovators</h2><p className="eco-role">Global Distribution and Innovation</p><p className="eco-desc-text">Youth lead quality control, branding, and R&amp;D — continuously innovating mocaf products and expanding Rumah Mocaf&apos;s global reach.</p><div className="eco-count-badge">124+ Youth Innovators</div><Link href="/ecosystem" className="btn btn-outline eco-cta-btn" style={{ borderColor: 'rgba(45,122,79,0.6)', color: '#2D5A3D' }}>Explore Ecosystem →</Link></div>
                <div className="eco-slide inactive"><h2 className="eco-name">Livestock Farmers</h2><p className="eco-role">Circular Waste Utilization</p><p className="eco-desc-text">Livestock farmers convert mocaf production waste into animal feed and organic fertilizer, reducing pollution and adding value to the ecosystem.</p><div className="eco-count-badge">Circular Economy</div><Link href="/ecosystem" className="btn btn-outline eco-cta-btn" style={{ borderColor: 'rgba(45,122,79,0.6)', color: '#2D5A3D' }}>Explore Ecosystem →</Link></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <div className="psc-scroll-wrap" id="pscWrap">
        <section className="psc-section" id="pscSection">
          <div className="psc-bg" id="pscBg">
            <video className="psc-deco psc-deco-active" src="/Video/V2/Garva v2.mp4" muted loop playsInline></video>
            <video className="psc-deco" src="/Video/V2/berryfine v2.mp4" muted loop playsInline></video>
            <video className="psc-deco" src="/Video/V2/chocofine v2.mp4" muted loop playsInline></video>
            <video className="psc-deco" src="/Video/Mocafine.mp4" muted loop playsInline></video>
            <video className="psc-deco" src="/Video/V2/master Bread v2.mp4" muted loop playsInline></video>
            <video className="psc-deco" src="/Video/V2/seasoned v2.mp4" muted loop playsInline></video>
          </div>
          <div className="psc-inner">
            <div className="psc-texts">
              {[
                { title: 'Garva\nLiquid Cassava Sugar', desc: 'A natural, healthy sweetener made from cassava — low glycemic and diabetes-friendly. Dissolves perfectly in drinks and everyday cooking.' },
                { title: 'BerryFine\nGluten Free Cookies', desc: 'Crispy gluten-free cookies made from mocaf flour with real berry flavor — a healthy and delicious snack for everyone.' },
                { title: 'Chocofine\nGluten Free Cookies', desc: 'Rich chocolate cookies from mocaf flour — vegan-friendly, egg and dairy free. Crunchy, wholesome, and irresistible.' },
                { title: 'Mocafine\nPremium Mocaf Flour', desc: 'High-quality gluten-free flour from naturally fermented cassava — the best wheat flour substitute for a wide range of recipes.' },
                { title: 'Master Bread\nBread Premix', desc: 'Ready-to-use bread premix made with mocaf. Easy to prepare, producing soft and perfectly risen loaves every time.' },
                { title: 'Seasoned Flour\nCrispy Coating', desc: 'Crunchy mocaf-based seasoned flour — blended with select spices for fried chicken, tempura, and all your favourite fried dishes.' },
              ].map((item, i) => (
                <div key={i} className={`psc-text${i === 0 ? ' psc-text-active' : ''}`} data-idx={i}>
                  <h2>{item.title.split('\n').map((line, j) => (<span key={j}>{line}{j===0&&<br />}</span>))}</h2>
                  <p>{item.desc}</p>
                  <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', alignItems:'center' }}>
                    <a href="https://mocafine.com" target="_blank" rel="noopener noreferrer" className="psc-buybtn">Buy Now</a>
                    <Link href="/products" className="psc-all-btn">See All Products</Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="psc-stage">
              {[
                { cls: 'psc-active', src: '/images/foto-produk/Garva.png', alt: 'Garva' },
                { cls: 'psc-next', src: '/images/foto-produk/BerryFine.png', alt: 'BerryFine' },
                { cls: 'psc-hidden', src: '/images/foto-produk/Chocofine.png', alt: 'Chocofine' },
                { cls: 'psc-hidden', src: '/images/foto-produk/Mocafine.png', alt: 'Mocafine' },
                { cls: 'psc-hidden', src: '/images/foto-produk/Master Bread.png', alt: 'Master Bread' },
                { cls: 'psc-hidden', src: '/images/foto-produk/Seasoned Flour.png', alt: 'Seasoned Flour' },
              ].map((p, i) => (
                <div key={i} className={`psc-prod ${p.cls}`} data-idx={i}><img src={p.src} alt={p.alt} /></div>
              ))}
            </div>
          </div>
          <div className="psc-wave">
            <svg className="psc-wave-back" viewBox="0 0 2880 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,65 C240,110 480,10 720,60 C960,110 1100,20 1440,65 C1680,110 1920,10 2160,60 C2400,110 2540,20 2880,65 L2880,110 L0,110 Z" fill="rgba(255,255,255,0.55)" /></svg>
            <svg className="psc-wave-front" viewBox="0 0 2880 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,55 C200,110 400,0 600,55 C800,110 1000,5 1200,55 C1320,85 1380,40 1440,55 C1640,110 1840,0 2040,55 C2240,110 2440,5 2640,55 C2760,85 2820,40 2880,55 L2880,110 L0,110 Z" fill="#ffffff" /></svg>
          </div>
        </section>
      </div>

      {/* OUR IMPACT */}
      <div className="oic-outer">
        <section className="oic-section">
          <div className="oic-inner">
            <div className="oic-header">
              <span className="oic-badge">Our Impact</span>
              <h2 className="oic-title">Growing with<br />Community</h2>
            </div>
            <div className="oic-grid" id="oicGrid">
              <div className="oic-card oic-card--1" id="oicC1">
                <div className="oic-num"><span className="oic-count">476</span><sup>+</sup></div>
                <div className="oic-label">Cassava Farmers</div>
                <p className="oic-text">Directly impacting the lives of cassava farmers through a fair partnership system, organic farming guidance, and stable guaranteed prices in Banjarnegara.</p>
              </div>
              <div className="oic-card oic-card--2" id="oicC2">
                <div className="oic-num"><span className="oic-count">58</span><sup>+</sup></div>
                <div className="oic-label">Craftsmen</div>
                <p className="oic-text">Empowering local craftsmen in the production of high-quality mocaf flour to HACCP, Halal MUI, and international export certification standards.</p>
              </div>
              <div className="oic-card oic-card--3" id="oicC3">
                <div className="oic-num"><span className="oic-count">34</span><sup>+</sup></div>
                <div className="oic-label">Youth</div>
                <p className="oic-text">Engaging young people across the mocaf value chain — from quality control and branding to product research and global market distribution.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* TESTIMONIALS */}
      <div className="tcs-wrap" id="tcsWrap">
        <section className="tcs-sticky">
          <div className="tcs-inner">
            <div className="tcs-heading">
              <span className="section-label">Testimonials</span>
              <h2 className="tcs-title">Voices from Our Ecosystem</h2>
              <p className="tcs-subtitle">Real stories from the farmers, craftsmen, and innovators who power the Rumah Mocaf mission.</p>
            </div>
            <div className="tcs-deck">
              {[
                { id: 'tcsCard2', cls: 'tcs-green tcs-pos-back2', quote: 'Learning the process of turning cassava into mocaf flour opened new business opportunities. Our product quality is recognized in international markets. I am proud to be part of this value chain.', name: 'Bu Endah Suryani', role: 'Mocaf Craftsman, Banjarnegara', img: '/images/Foto Testimonials/Bu.jpg', bg: '#217a35' },
                { id: 'tcsCard1', cls: 'tcs-blue tcs-pos-back1', quote: 'Joining Rumah Mocaf changed my life. Cassava prices used to be unpredictable. Now I receive fair and stable prices, along with organic farming training that has significantly improved my harvest.', name: 'Pak Slamet Riyadi', role: 'Cassava Farmer, Banjarnegara', img: '/images/Foto Testimonials/Laki laki.jpg', bg: '#2240b0' },
                { id: 'tcsCard4', cls: 'tcs-purple tcs-pos-back2', quote: 'Our research collaboration with Rumah Mocaf has been invaluable. Their real-world data and community network accelerate our studies on sustainable food systems and cassava utilization in Indonesia.', name: 'Dr. Retno Widayati', role: 'Food Technology Researcher, Yogyakarta', img: '/images/Foto Testimonials/dr retno widayati.jpg', bg: '#3a1a6b' },
                { id: 'tcsCard3', cls: 'tcs-teal tcs-pos-back2', quote: "Rumah Mocaf's commitment to quality and sustainability aligns perfectly with our retail standards. Our customers love the clean-label story behind every product — it sells itself.", name: 'Ibu Sari Dewi', role: 'Retail Partner, Jakarta', img: '/images/Foto Testimonials/Ibu.jpg', bg: '#094455' },
                { id: 'tcsCard0', cls: 'tcs-navy tcs-pos-front', quote: 'As a distributor, I have seen demand for mocaf-based products grow significantly. Rumah Mocaf provides consistent quality and supply reliability that lets us confidently expand our market reach.', name: 'Cipta Asmara', role: 'Mocaf Craftsman, Banjarnegara', img: '/images/Foto Testimonials/Perempuan.jpg', bg: '#162360' },
              ].map((t) => (
                <div key={t.id} className={`tcs-card ${t.cls}`} id={t.id}>
                  <div className="tcs-left">
                    <div className="tcs-qmark">&ldquo;</div>
                    <p className="tcs-quote">&ldquo;{t.quote}&rdquo;</p>
                    <div className="tcs-author">
                      <div className="tcs-author-line"></div>
                      <div><p className="tcs-name">{t.name}</p><p className="tcs-role">{t.role}</p></div>
                    </div>
                  </div>
                  <div className="tcs-right">
                    <div className="tcs-hex" style={{ background: t.bg }}><img src={t.img} alt={t.name} /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* MAP SECTION */}
      <div id="mapSectionWrapper">
      <div className="map-section" id="mapSection">
          <div className="map-heading-bar"><h2>International Buyers</h2><hr /></div>
          <img src="/MAP.svg" alt="Rumah Mocaf — World Reach" className="map-img" id="mapImg" />
          {[
            { id: 'mapSgLabel', label: 'Singapore' }, { id: 'mapMyLabel', label: 'Malaysia' },
            { id: 'mapAeLabel', label: 'Dubai' }, { id: 'mapOmLabel', label: 'Oman' },
            { id: 'mapTrLabel', label: 'Turkey' }, { id: 'mapGbLabel', label: 'UK' },
            { id: 'mapDeLabel', label: 'Germany' }, { id: 'mapUsLabel', label: 'United States' },
          ].map((l) => <div key={l.id} className="map-sg-label" id={l.id}>{l.label}</div>)}
          <div className="map-pin-overlay" id="mapPinOverlay">
            <svg className="map-pin-svg" viewBox="1043 320 77 168" xmlns="http://www.w3.org/2000/svg">
              <defs><linearGradient id="mpo-g" x1="1031.99" y1="388.129" x2="1104.5" y2="410.298" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#47A91E" /><stop offset="1" stopColor="#227908" /></linearGradient></defs>
              <path d="M1080.79 320C1059.92 320 1043 336.921 1043 357.794C1043 369.535 1048.98 379.331 1056.75 386.957C1075.34 405.189 1076.96 394.161 1080.79 487.838C1084.62 394.161 1086.24 405.189 1104.83 386.957C1112.61 379.331 1118.59 369.535 1118.59 357.794C1118.59 336.92 1101.67 320 1080.79 320Z" fill="url(#mpo-g)" />
              <path d="M1080.79 390.315C1098.38 390.315 1112.63 376.061 1112.63 358.478C1112.63 340.895 1098.38 326.641 1080.79 326.641C1063.21 326.641 1048.96 340.895 1048.96 358.478C1048.96 376.061 1063.21 390.315 1080.79 390.315Z" fill="white" />
              <path d="M1081 383.312C1095.01 383.312 1106.31 372.006 1106.31 358H1055.69C1055.69 372.006 1066.99 383.312 1081 383.312Z" fill="#F9F9F9" />
              <path d="M1081 332.688C1066.99 332.688 1055.69 343.994 1055.69 358H1106.31C1106.31 343.994 1095.01 332.688 1081 332.688Z" fill="#ED4C5C" />
            </svg>
          </div>
          <div className="map-pin-overlay" id="mapTrPinOverlay">
            <svg className="map-pin-svg" viewBox="0 0 77 168" xmlns="http://www.w3.org/2000/svg">
              <defs><linearGradient id="tr-g" x1="0" y1="0" x2="77" y2="77" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#47A91E" /><stop offset="1" stopColor="#227908" /></linearGradient></defs>
              <path d="M37.79 0C16.92 0 0 16.921 0 37.794C0 49.535 5.98 59.331 13.75 66.957C32.34 85.189 33.96 74.161 37.79 167.838C41.62 74.161 43.24 85.189 61.83 66.957C69.61 59.331 75.59 49.535 75.59 37.794C75.59 16.92 58.67 0 37.79 0Z" fill="url(#tr-g)" />
              <circle cx="37.79" cy="38.5" r="30" fill="white" /><circle cx="37.79" cy="38.5" r="26.5" fill="#E30A17" />
              <circle cx="33.5" cy="38.5" r="12.5" fill="white" /><circle cx="37" cy="38.5" r="10" fill="#E30A17" />
              <polygon points="50,31.5 51.65,36.24 56.66,36.34 52.66,39.37 54.12,44.16 50,41.3 45.88,44.16 47.34,39.37 43.34,36.34 48.35,36.24" fill="white" />
            </svg>
          </div>
          <div className="map-pin-overlay" id="mapMyPinOverlay">
            <svg className="map-pin-svg" viewBox="0 0 77 168" xmlns="http://www.w3.org/2000/svg">
              <defs><linearGradient id="g-my" x1="0" y1="0" x2="77" y2="77" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#47A91E" /><stop offset="1" stopColor="#227908" /></linearGradient><clipPath id="c-my"><circle cx="38.5" cy="38.5" r="25.5" /></clipPath></defs>
              <path d="M37.79 0C16.92 0 0 16.921 0 37.794C0 49.535 5.98 59.331 13.75 66.957C32.34 85.189 33.96 74.161 37.79 167.838C41.62 74.161 43.24 85.189 61.83 66.957C69.61 59.331 75.59 49.535 75.59 37.794C75.59 16.92 58.67 0 37.79 0Z" fill="url(#g-my)" />
              <circle cx="38.5" cy="38.5" r="26.5" fill="white" />
              <g clipPath="url(#c-my)"><rect x="13" y="13" width="51" height="51" fill="#CC0001" /><rect x="13" y="16.6" width="51" height="3.6" fill="white" /><rect x="13" y="23.9" width="51" height="3.6" fill="white" /><rect x="13" y="31.1" width="51" height="3.6" fill="white" /><rect x="13" y="38.4" width="51" height="3.6" fill="white" /><rect x="13" y="45.6" width="51" height="3.6" fill="white" /><rect x="13" y="52.9" width="51" height="3.6" fill="white" /><rect x="13" y="60.1" width="51" height="3.6" fill="white" /><rect x="13" y="13" width="25.5" height="25.5" fill="#010066" /><circle cx="29" cy="24" r="8" fill="#FFD100" /><circle cx="31" cy="22" r="7" fill="#010066" /><polygon points="37,21 37.9,23.7 40.7,23.7 38.5,25.3 39.3,28 37,26.4 34.7,28 35.5,25.3 33.3,23.7 36.1,23.7" fill="#FFD100" /></g>
            </svg>
          </div>
          <div className="map-pin-overlay" id="mapAePinOverlay">
            <svg className="map-pin-svg" viewBox="0 0 77 168" xmlns="http://www.w3.org/2000/svg">
              <defs><linearGradient id="g-ae" x1="0" y1="0" x2="77" y2="77" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#47A91E" /><stop offset="1" stopColor="#227908" /></linearGradient><clipPath id="c-ae"><circle cx="38.5" cy="38.5" r="25.5" /></clipPath></defs>
              <path d="M37.79 0C16.92 0 0 16.921 0 37.794C0 49.535 5.98 59.331 13.75 66.957C32.34 85.189 33.96 74.161 37.79 167.838C41.62 74.161 43.24 85.189 61.83 66.957C69.61 59.331 75.59 49.535 75.59 37.794C75.59 16.92 58.67 0 37.79 0Z" fill="url(#g-ae)" />
              <circle cx="38.5" cy="38.5" r="26.5" fill="white" />
              <g clipPath="url(#c-ae)"><rect x="13" y="13" width="51" height="17" fill="#009A44" /><rect x="13" y="30" width="51" height="17" fill="#FFFFFF" /><rect x="13" y="47" width="51" height="17" fill="#000000" /><rect x="13" y="13" width="12.75" height="51" fill="#FF0000" /></g>
            </svg>
          </div>
          <div className="map-pin-overlay" id="mapOmPinOverlay">
            <svg className="map-pin-svg" viewBox="0 0 77 168" xmlns="http://www.w3.org/2000/svg">
              <defs><linearGradient id="g-om" x1="0" y1="0" x2="77" y2="77" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#47A91E" /><stop offset="1" stopColor="#227908" /></linearGradient><clipPath id="c-om"><circle cx="38.5" cy="38.5" r="25.5" /></clipPath></defs>
              <path d="M37.79 0C16.92 0 0 16.921 0 37.794C0 49.535 5.98 59.331 13.75 66.957C32.34 85.189 33.96 74.161 37.79 167.838C41.62 74.161 43.24 85.189 61.83 66.957C69.61 59.331 75.59 49.535 75.59 37.794C75.59 16.92 58.67 0 37.79 0Z" fill="url(#g-om)" />
              <circle cx="38.5" cy="38.5" r="26.5" fill="white" />
              <g clipPath="url(#c-om)"><rect x="13" y="13" width="51" height="17" fill="#FFFFFF" /><rect x="13" y="30" width="51" height="17" fill="#DB161B" /><rect x="13" y="47" width="51" height="17" fill="#008000" /><rect x="13" y="13" width="12.75" height="51" fill="#DB161B" /></g>
            </svg>
          </div>
          <div className="map-pin-overlay" id="mapDePinOverlay">
            <svg className="map-pin-svg" viewBox="0 0 77 168" xmlns="http://www.w3.org/2000/svg">
              <defs><linearGradient id="g-de" x1="0" y1="0" x2="77" y2="77" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#47A91E" /><stop offset="1" stopColor="#227908" /></linearGradient><clipPath id="c-de"><circle cx="38.5" cy="38.5" r="25.5" /></clipPath></defs>
              <path d="M37.79 0C16.92 0 0 16.921 0 37.794C0 49.535 5.98 59.331 13.75 66.957C32.34 85.189 33.96 74.161 37.79 167.838C41.62 74.161 43.24 85.189 61.83 66.957C69.61 59.331 75.59 49.535 75.59 37.794C75.59 16.92 58.67 0 37.79 0Z" fill="url(#g-de)" />
              <circle cx="38.5" cy="38.5" r="26.5" fill="white" />
              <g clipPath="url(#c-de)"><rect x="13" y="13" width="51" height="17" fill="#000000" /><rect x="13" y="30" width="51" height="17" fill="#DD0000" /><rect x="13" y="47" width="51" height="17" fill="#FFCE00" /></g>
            </svg>
          </div>
          <div className="map-pin-overlay" id="mapUsPinOverlay">
            <svg className="map-pin-svg" viewBox="0 0 77 168" xmlns="http://www.w3.org/2000/svg">
              <defs><linearGradient id="g-us" x1="0" y1="0" x2="77" y2="77" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#47A91E" /><stop offset="1" stopColor="#227908" /></linearGradient><clipPath id="c-us"><circle cx="38.5" cy="38.5" r="25.5" /></clipPath></defs>
              <path d="M37.79 0C16.92 0 0 16.921 0 37.794C0 49.535 5.98 59.331 13.75 66.957C32.34 85.189 33.96 74.161 37.79 167.838C41.62 74.161 43.24 85.189 61.83 66.957C69.61 59.331 75.59 49.535 75.59 37.794C75.59 16.92 58.67 0 37.79 0Z" fill="url(#g-us)" />
              <circle cx="38.5" cy="38.5" r="26.5" fill="white" />
              <g clipPath="url(#c-us)"><rect x="13" y="13" width="51" height="51" fill="#B22234" /><rect x="13" y="16.9" width="51" height="3.9" fill="white" /><rect x="13" y="24.7" width="51" height="3.9" fill="white" /><rect x="13" y="32.5" width="51" height="3.9" fill="white" /><rect x="13" y="40.3" width="51" height="3.9" fill="white" /><rect x="13" y="48.1" width="51" height="3.9" fill="white" /><rect x="13" y="55.9" width="51" height="3.9" fill="white" /><rect x="13" y="13" width="21.4" height="27.4" fill="#3C3B6E" /></g>
            </svg>
          </div>
          <div className="map-pin-overlay" id="mapGbPinOverlay">
            <svg className="map-pin-svg" viewBox="0 0 77 168" xmlns="http://www.w3.org/2000/svg">
              <defs><linearGradient id="g-gb" x1="0" y1="0" x2="77" y2="77" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#47A91E" /><stop offset="1" stopColor="#227908" /></linearGradient><clipPath id="c-gb"><circle cx="38.5" cy="38.5" r="25.5" /></clipPath></defs>
              <path d="M37.79 0C16.92 0 0 16.921 0 37.794C0 49.535 5.98 59.331 13.75 66.957C32.34 85.189 33.96 74.161 37.79 167.838C41.62 74.161 43.24 85.189 61.83 66.957C69.61 59.331 75.59 49.535 75.59 37.794C75.59 16.92 58.67 0 37.79 0Z" fill="url(#g-gb)" />
              <circle cx="38.5" cy="38.5" r="26.5" fill="white" />
              <g clipPath="url(#c-gb)"><rect x="13" y="13" width="51" height="51" fill="#012169" /><line x1="13" y1="13" x2="64" y2="64" stroke="white" strokeWidth="10" /><line x1="64" y1="13" x2="13" y2="64" stroke="white" strokeWidth="10" /><line x1="13" y1="13" x2="64" y2="64" stroke="#C8102E" strokeWidth="5" /><line x1="64" y1="13" x2="13" y2="64" stroke="#C8102E" strokeWidth="5" /><rect x="13" y="32" width="51" height="13" fill="white" /><rect x="32" y="13" width="13" height="51" fill="white" /><rect x="13" y="34.5" width="51" height="8" fill="#C8102E" /><rect x="34.5" y="13" width="8" height="51" fill="#C8102E" /></g>
            </svg>
          </div>
      </div>
      </div>

      {/* MEDIA PARTNER */}
      <div className="mp-bar">
        <div className="mp-bar-inner">
          <p className="mp-bar-label">Featured in <strong>13+ leading</strong> national media outlets</p>
          <div className="mp-ticker-outer">
            <div className="mp-ticker-track" id="mpTickerTrack">
              {['MetroTV.jpg','HARIAN%20REPUBLIKA.jpg','ANTARA.jpg','KOMPAS.jpg','MEDIA%20INDONESIA.jpg','MURI.jpg','TV%20TANI.jpg','SMN.jpg','GATRA%20com.jpg','Tribun%20Timur.com.jpg','Warta%20Ekonomi.jpg','WartaTani.co.jpg','kick%20Andy.jpg',
                'MetroTV.jpg','HARIAN%20REPUBLIKA.jpg','ANTARA.jpg','KOMPAS.jpg','MEDIA%20INDONESIA.jpg','MURI.jpg','TV%20TANI.jpg','SMN.jpg','GATRA%20com.jpg','Tribun%20Timur.com.jpg','Warta%20Ekonomi.jpg','WartaTani.co.jpg','kick%20Andy.jpg'
              ].map((f, i) => <img key={i} src={`/Media%20Partner/${f}`} alt={i < 13 ? f.replace(/%20/g,' ').replace('.jpg','') : ''} className="mp-logo" aria-hidden={i >= 13 ? 'true' : undefined} />)}
            </div>
          </div>
        </div>
      </div>

      {/* NEWS PREVIEW */}
      <section className="section section-alt">
        <div className="container">
          <div className="news-header">
            <div><span className="section-label">News &amp; Insights</span><h2 className="section-title">Latest from Rumah Mocaf</h2></div>
            <Link href="/news" className="btn btn-outline">All News →</Link>
          </div>
          <div className="news-grid">
            <div className="news-card">
              <div className="news-thumb" style={{ background: '#111', padding: 0, overflow: 'hidden' }}><img src="/images/image%2035.png" alt="Pameran ODICOFF" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>
              <div className="news-body"><div className="news-meta">15 April 2025 · 4 min read</div><div className="news-title">Rumah Mocaf at Hannover Messe: Bringing Mocaf to the European Market</div><p className="news-excerpt">Rumah Mocaf represented Indonesia at Hannover Messe Germany, introducing premium mocaf flour to buyers and distributors from over 50 countries...</p><Link href="/news" className="news-read">Read More →</Link></div>
            </div>
            <div className="news-card">
              <div className="news-thumb" style={{ background: '#111', padding: 0, overflow: 'hidden' }}><img src="/images/komunitas.jpg" alt="Komunitas" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>
              <div className="news-body"><div className="news-meta">2 March 2025 · 6 min read</div><div className="news-title">From Field to Table: How Mocaf Flour Helps Reduce Stunting</div><p className="news-excerpt">The high nutritional content of mocaf flour is becoming a new hope in the fight against childhood stunting in Banjarnegara...</p><Link href="/news" className="news-read">Read More →</Link></div>
            </div>
            <div className="news-card">
              <div className="news-thumb" style={{ background: '#111', padding: 0, overflow: 'hidden' }}><img src="/images/women.png" alt="Women Farmers of Banjarnegara" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>
              <div className="news-body"><div className="news-meta">18 February 2025 · 5 min read</div><div className="news-title">Women Farmers of Banjarnegara: Driving Household Food Security</div><p className="news-excerpt">The story of women farmers who have become an integral part of the Rumah Mocaf ecosystem, leading change in their communities...</p><Link href="/news" className="news-read">Read More →</Link></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ctaFloat { 0%,100%{transform:translateY(0px) rotate(var(--rot,0deg))} 50%{transform:translateY(-20px) rotate(var(--rot,0deg))} }
        .cta-fp-wrap { position:absolute; top:0; bottom:0; display:flex; align-items:center; justify-content:center; pointer-events:none; z-index:1; }
        .cta-fp-wrap.left  { left:clamp(16px,4vw,80px); }
        .cta-fp-wrap.right { right:clamp(16px,4vw,80px); }
        .cta-fp { width:clamp(100px,10vw,160px); height:auto; max-height:260px; object-fit:contain; filter:drop-shadow(0 16px 40px rgba(0,0,0,0.35)); animation:ctaFloat 5s ease-in-out infinite; }
        .cta-fp.fp-garva  { --rot:-3deg; animation-duration:5.1s; animation-delay:-1.7s; }
        .cta-fp.fp-mocaf  { --rot:3deg;  animation-duration:4.6s; animation-delay:-2.3s; }
        @media (max-width:900px){ .cta-fp-wrap{ display:none; } }
      `}} />
      <section className="cta-banner" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="cta-fp-wrap left"><img src="/images/foto-produk/Garva.png" alt="" className="cta-fp fp-garva" /></div>
        <div className="cta-fp-wrap right"><img src="/images/foto-produk/Mocafine.png" alt="" className="cta-fp fp-mocaf" /></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h2 className="section-title">Partner with Us</h2>
          <p>Whether you&apos;re a buyer, investor, or farmer — there&apos;s a place for you in the Rumah Mocaf ecosystem.</p>
          <div className="cta-actions">
            <Link href="/contact" className="btn btn-white">Inquire Now</Link>
            <a href="https://mocafine.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>Browse Products</a>
          </div>
        </div>
      </section>
    </>
  );
}
