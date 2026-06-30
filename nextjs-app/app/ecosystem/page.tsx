'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function EcosystemPage() {
  useEffect(() => {
    // Production process step animation
    const stepsWrap = document.getElementById('processSteps');
    if (stepsWrap) {
      const steps = Array.from(stepsWrap.querySelectorAll('.process-step')) as HTMLElement[];
      let current = 0;
      let timer: ReturnType<typeof setInterval> | null = null;
      function activate(index: number) {
        steps.forEach((s, i) => s.classList.toggle('active', i <= index));
      }
      function startCycle() {
        if (timer) return;
        timer = setInterval(() => {
          current++;
          if (current >= steps.length) {
            current = 0;
            steps.forEach((s) => s.classList.remove('active'));
            setTimeout(() => activate(current), 300);
            return;
          }
          activate(current);
        }, 1200);
      }
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) startCycle();
          else { if (timer) clearInterval(timer); timer = null; }
        });
      }, { threshold: 0.3 });
      obs.observe(stepsWrap);
    }

    // Eco step navigation
    const steps = Array.from(document.querySelectorAll('.eco-step')) as HTMLElement[];
    const sectionIds = ['farmers', 'craftsmen', 'youth', 'livestock-farmers'];
    steps.forEach((step) => {
      step.addEventListener('click', () => {
        const target = step.getAttribute('data-target');
        if (!target) return;
        const el = document.getElementById(target);
        if (el) {
          const offset = el.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      });
    });
    function updateEcoSteps() {
      let active = sectionIds[0];
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight / 2) active = id;
      });
      steps.forEach((step) => step.classList.toggle('active', step.getAttribute('data-target') === active));
    }
    window.addEventListener('scroll', updateEcoSteps);
    updateEcoSteps();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .process-steps { display:flex;gap:0;margin-top:40px;flex-wrap:wrap; }
        .process-step { flex:1;min-width:100px;text-align:center;position:relative; }
        .process-step:not(:last-child)::after { content:'→';position:absolute;right:-10px;top:26px;font-size:18px;color:#ccc;font-weight:700;transition:color 0.4s;z-index:1; }
        .process-step.active:not(:last-child)::after { color:var(--green); }
        .process-icon { width:60px;height:60px;border-radius:50%;background:#f3f4f6;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;transition:background 0.4s,box-shadow 0.4s,transform 0.4s; }
        .process-icon img { width:32px;height:32px;object-fit:contain;filter:grayscale(1) opacity(0.4);transition:filter 0.4s; }
        .process-step.active .process-icon { background:#fff;box-shadow:0 0 0 6px rgba(45,122,79,0.15);transform:scale(1.12); }
        .process-step.active .process-icon img { filter:none; }
        .process-label { font-size:12px;font-weight:700;color:#aaa;transition:color 0.4s; }
        .process-step.active .process-label { color:var(--green); }
        .circular-flow { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px; }
        .circular-card { background:#fff;border-radius:var(--radius);padding:24px;text-align:center;border:2px solid var(--green-light); }
        .circular-card .c-icon { font-size:36px;margin-bottom:12px;display:flex;align-items:center;justify-content:center;height:64px; }
        .circular-card .c-title { font-size:15px;font-weight:700;color:var(--gray-800);margin-bottom:8px; }
        .circular-card .c-desc { font-size:13px;color:var(--gray-600);line-height:1.6; }
        @media (max-width:768px) { .circular-flow{grid-template-columns:repeat(2,1fr)}.process-steps{gap:16px}.process-step:not(:last-child)::after{display:none} }
        @media (max-width:560px) { .circular-flow{grid-template-columns:1fr} }
        .eco-steps { display:flex;gap:0;margin-top:32px;flex-wrap:wrap;justify-content:center;padding-bottom:8px; }
        .eco-step { flex:1;min-width:100px;text-align:center;position:relative;cursor:pointer;padding:0 8px; }
        .eco-step:not(:last-child)::after { content:'→';position:absolute;right:-10px;top:28px;font-size:18px;color:#ccc;font-weight:700;transition:color 0.4s;z-index:1; }
        .eco-step.active:not(:last-child)::after { color:var(--green); }
        .eco-step-num { width:56px;height:56px;border-radius:50%;background:#f3f4f6;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;font-size:20px;font-weight:800;color:#bbb;transition:background 0.4s,box-shadow 0.4s,transform 0.4s,color 0.4s; }
        .eco-step.active .eco-step-num { background:var(--green);box-shadow:0 0 0 6px rgba(45,122,79,0.15);transform:scale(1.1);color:#fff; }
        .eco-step-label { font-size:12px;font-weight:700;color:#aaa;transition:color 0.4s; }
        .eco-step.active .eco-step-label { color:var(--green); }
        @media (max-width:560px) { .eco-step:not(:last-child)::after{display:none} }
        .page-hero-eco { min-height:100vh;padding:0;background:none;position:relative;display:flex;align-items:center;justify-content:center; }
        .page-hero-eco::before { content:'';position:absolute;inset:0;background:url('/images/craftsmen.jpg') center center/cover no-repeat;z-index:0; }
        .page-hero-eco::after { content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0.45) 0%,rgba(0,0,0,0.3) 100%);z-index:1; }
        .page-hero-eco .container { position:relative;z-index:2; }
      `}} />

      <section className="page-hero page-hero-eco">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff' }}>Our Ecosystem</span>
          <h1 style={{ color: '#fff' }}>The Rumah Mocaf Ecosystem</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', margin: '0 auto', maxWidth: '620px' }}>Four interconnected pillars form a sustainable cassava value chain — from the field, to the processing floor, to the dining table, and back to the earth.</p>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 0 }}>
            <span className="section-label">Ecosystem Members</span>
          </div>
          <div className="eco-steps" id="ecoSteps">
            {[
              { num: '1', label: 'Farmers', target: 'farmers' },
              { num: '2', label: 'Craftsmen', target: 'craftsmen' },
              { num: '3', label: 'Youth Innovators', target: 'youth' },
              { num: '4', label: 'Livestock Farmers', target: 'livestock-farmers' },
            ].map((s, i) => (
              <div key={s.target} className={`eco-step${i === 0 ? ' active' : ''}`} data-target={s.target}>
                <div className="eco-step-num">{s.num}</div>
                <div className="eco-step-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="farmers">
        <div className="container">
          <div className="two-col">
            <div className="two-col-img" style={{ padding: 0, overflow: 'hidden', background: '#eaf5ee', aspectRatio: 'unset' }}>
              <img src="/images/petani%20rumah%20mocaf.jpg" alt="Petani Rumah Mocaf" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'var(--radius-lg)' }} />
            </div>
            <div className="two-col-text">
              <span className="section-label">Farmers</span>
              <h3>Sustainable Cassava Cultivation</h3>
              <p>At the heart of Rumah Mocaf&apos;s ecosystem are the farmers who practice integrated organic farming. These dedicated individuals manage every step of the cassava growth process, from planting high-quality seedlings to nurturing the crop through sustainable farming practices.</p>
              <p>We purchase cassava at fair, stable prices — ensuring farmers earn a reliable income without depending on exploitative middlemen. Every partner farmer receives training, mentoring, and access to broader markets.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="craftsmen">
        <div className="container">
          <div className="two-col">
            <div className="two-col-text">
              <span className="section-label">Craftsmen</span>
              <h3>Transforming Cassava into Premium Mocaf Flour</h3>
              <p>The craftsmen are responsible for converting raw cassava into high-quality, gluten-free mocaf flour. This process involves meticulous attention to detail, ensuring quality at every stage — from soaking and pressing to drying and sieving.</p>
              <p>Our craftsmen are the backbone of the production process. Through continuous training and skill development, they produce mocaf flour that meets rigorous national and international quality standards.</p>
            </div>
            <div className="two-col-img" style={{ padding: 0, overflow: 'hidden', background: '#eaf5ee', aspectRatio: 'unset' }}>
              <img src="/images/pengrajin%20singkong.jpg" alt="Craftsmen Rumah Mocaf" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'var(--radius-lg)' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="text-center">
            <span className="section-label">Production Process</span>
            <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--gray-800)', marginBottom: '8px' }}>From Cassava to Mocaf Flour</h3>
          </div>
          <div className="process-steps" id="processSteps">
            {[
              { img: '/images/Production%20Process/Cassava%20Harvest.svg', label: 'Cassava Harvest' },
              { img: '/images/Production%20Process/Peeling%20Harvest.svg', label: 'Peeling Harvest' },
              { img: '/images/Production%20Process/Washing.svg', label: 'Washing' },
              { img: '/images/Production%20Process/Pressing.svg', label: 'Pressing' },
              { img: '/images/Production%20Process/Drying.svg', label: 'Drying' },
              { img: '/images/Production%20Process/Packing%20%26%20QC.svg', label: 'Packing & QC' },
              { img: '/images/Production%20Process/Allocation.svg', label: 'Allocation' },
            ].map((p, i) => (
              <div key={p.label} className={`process-step${i === 0 ? ' active' : ''}`}>
                <div className="process-icon"><img src={p.img} alt={p.label} /></div>
                <div className="process-label">{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="youth">
        <div className="container">
          <div className="two-col">
            <div className="two-col-img" style={{ padding: 0, overflow: 'hidden', background: '#eaf5ee', aspectRatio: 'unset' }}>
              <img src="/images/internasional%20inovator%201.jpeg" alt="Youth Innovators Rumah Mocaf" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'var(--radius-lg)' }} />
            </div>
            <div className="two-col-text">
              <span className="section-label">Youth Innovators</span>
              <h3>Global Distribution and Innovation</h3>
              <p>The youth in Rumah Mocaf&apos;s ecosystem are pivotal to bringing mocaf products to a broader market. They handle quality control, ensuring that every batch of mocaf flour meets international standards. Additionally, they oversee product certification, packaging, branding, and research.</p>
              <p>Our young innovators actively develop mocaf-derived products — from gluten-free cookies to cassava oil — and ensure distribution across digital platforms and global export markets.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="livestock-farmers">
        <div className="container">
          <div className="two-col">
            <div className="two-col-text">
              <span className="section-label">Livestock Farmers</span>
              <h3>Circular Waste Utilization</h3>
              <p>Livestock farmers play an important role in the Rumah Mocaf ecosystem by processing mocaf production waste into animal feed and organic fertilizer. This utilization of waste helps reduce environmental pollution, lower agricultural and livestock production costs, and create added value for farmers.</p>
            </div>
            <div className="two-col-img" style={{ padding: 0, overflow: 'hidden', background: '#eaf5ee', aspectRatio: 'unset' }}>
              <img src="/images/eco-livestock-farmers.svg" alt="Livestock Farmers Rumah Mocaf" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'var(--radius-lg)' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-green" id="livestock">
        <div className="container">
          <div className="text-center">
            <span className="section-label">Circular Economy</span>
            <h2 className="section-title">Zero Waste: Turning Byproducts into Value</h2>
            <p className="section-subtitle">Livestock farmers play a key role in converting mocaf production waste into value-added products, realizing a true circular economy.</p>
          </div>
          <div className="circular-flow">
            {[
              { img: '/images/Circular%20Economy/Cassava.svg', title: 'Cassava', desc: 'Farmers harvest organic cassava and sell it to Rumah Mocaf at a guaranteed fair price.' },
              { img: '/images/Circular%20Economy/Mocaf%20production.svg', title: 'Mocaf Production', desc: 'Craftsmen process cassava into premium mocaf flour through a controlled fermentation process.' },
              { img: '/images/Circular%20Economy/Waste%20Processing.svg', title: 'Waste Processing', desc: 'Cassava pulp and liquid waste are processed by livestock farmers into animal feed and organic fertilizer.' },
              { img: '/images/Circular%20Economy/Back%20to%20the%20Field.svg', title: 'Back to the Field', desc: 'Organic fertilizer is returned to the cassava fields — reducing costs and naturally enriching the soil.' },
            ].map((c) => (
              <div key={c.title} className="circular-card">
                <div className="c-icon"><img src={c.img} alt={c.title} style={{ width: '56px', height: '56px', objectFit: 'contain' }} /></div>
                <div className="c-title">{c.title}</div>
                <p className="c-desc">{c.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '15px', color: 'var(--gray-600)' }}>Nothing is wasted. Every part of the cassava plant delivers value.</p>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2 className="section-title">Join Our Ecosystem</h2>
          <p>Whether you are a farmer, craftsman, young innovator, or investor — there is a place for you at Rumah Mocaf.</p>
          <div className="cta-actions">
            <Link href="/contact" className="btn btn-white">✉ Contact Us</Link>
            <Link href="/sustainability" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>See Sustainability →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
