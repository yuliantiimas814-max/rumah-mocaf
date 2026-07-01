'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function AboutPage() {
  useEffect(() => {
    // Journey scroll-driven
    const journeyWrapper = document.getElementById('journeyWrapper');
    if (journeyWrapper) {
      const btns = Array.from(document.querySelectorAll('.gj-year-btn')) as HTMLElement[];
      const panels = Array.from(document.querySelectorAll('.gj-panel')) as HTMLElement[];
      const photos = Array.from(document.querySelectorAll('.gj-right img')) as HTMLElement[];
      const count = btns.length;
      let userClicked = false;
      let clickTimeout: ReturnType<typeof setTimeout> | null = null;
      function goJourney(idx: number) {
        btns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        photos.forEach(p => p.classList.remove('active'));
        if (btns[idx]) btns[idx].classList.add('active');
        if (panels[idx]) panels[idx].classList.add('active');
        if (photos[idx]) photos[idx].classList.add('active');
      }
      btns.forEach((btn, i) => {
        btn.addEventListener('click', () => {
          goJourney(i);
          userClicked = true;
          if (clickTimeout) clearTimeout(clickTimeout);
          clickTimeout = setTimeout(() => { userClicked = false; }, 1200);
        });
      });
      function onJourneyScroll() {
        if (userClicked) return;
        if (!journeyWrapper) return;
        const rect = journeyWrapper.getBoundingClientRect();
        const scrolled = -rect.top;
        const scrollable = journeyWrapper.offsetHeight - window.innerHeight;
        if (scrollable <= 0 || scrolled < 0) return;
        const p = Math.min(1, scrolled / scrollable);
        goJourney(Math.min(count - 1, Math.floor(p * count)));
      }
      window.addEventListener('scroll', onJourneyScroll, { passive: true });
      onJourneyScroll();
    }

    // Achievement card deck
    const achieveWrapper = document.getElementById('achieveWrapper');
    const deck = document.getElementById('achieveDeck');
    if (deck) {
      const cards = Array.from(deck.querySelectorAll('.ach-card')) as HTMLElement[];
      const dotsWrap = document.getElementById('achieveDots');
      let current = 0;
      if (dotsWrap) {
        dotsWrap.innerHTML = '';
        cards.forEach((_, i) => {
          const d = document.createElement('span');
          d.className = 'proc-dot';
          dotsWrap.appendChild(d);
        });
      }
      function render() {
        cards.forEach((card, i) => {
          const pos = Math.max(-4, Math.min(4, i - current));
          card.setAttribute('data-pos', String(pos));
        });
        if (dotsWrap) {
          Array.from(dotsWrap.querySelectorAll('.proc-dot')).forEach((d, i) => {
            d.classList.toggle('active', i === current);
          });
        }
      }
      function go(index: number) { current = Math.max(0, Math.min(cards.length - 1, index)); render(); }
      if (achieveWrapper) {
        function onAchieveScroll() {
          const rect = achieveWrapper!.getBoundingClientRect();
          const scrolled = -rect.top;
          const scrollable = achieveWrapper!.offsetHeight - window.innerHeight;
          if (scrollable <= 0 || scrolled < 0) return;
          const p = Math.min(1, scrolled / scrollable);
          go(Math.min(cards.length - 1, Math.floor(p * cards.length)));
        }
        window.addEventListener('scroll', onAchieveScroll, { passive: true });
        onAchieveScroll();
      }
      render();
    }

  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .page-hero-wwa { min-height:100vh;padding:0;background:none;position:relative;display:flex;align-items:center;justify-content:center; }
        .page-hero-wwa::before { content:'';position:absolute;inset:0;background:url('/images/women.png') center center/cover no-repeat;z-index:0; }
        .page-hero-wwa::after { content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0.45) 0%,rgba(0,0,0,0.3) 100%);z-index:1; }
        .page-hero-wwa .container { position:relative;z-index:2; }
        .proc-swipe { position:relative;padding:8px 0 24px; }
        .proc-deck { position:relative;height:360px;overflow:visible; }
        .ach-card { position:absolute;left:50%;width:220px;background:#fff;border-radius:24px;padding:20px 20px 18px;color:var(--gray-800);border:1.5px solid rgba(45,122,79,0.12);transition:transform 0.55s cubic-bezier(0.4,0,0.2,1),opacity 0.55s,box-shadow 0.55s;cursor:pointer;user-select:none;transform:translateX(-50%);opacity:0; }
        .ach-card[data-pos="0"]  { transform:translateX(-50%) rotate(0deg) scale(1);z-index:10;box-shadow:0 20px 60px rgba(45,122,79,0.18);cursor:default;opacity:1; }
        .ach-card[data-pos="-1"] { transform:translateX(calc(-50% - 195px)) rotate(-10deg) scale(0.84);z-index:5;opacity:0.72; }
        .ach-card[data-pos="1"]  { transform:translateX(calc(-50% + 195px)) rotate(10deg) scale(0.84);z-index:5;opacity:0.72; }
        .ach-card[data-pos="-2"] { transform:translateX(calc(-50% - 310px)) rotate(-17deg) scale(0.7);z-index:1;opacity:0;pointer-events:none; }
        .ach-card[data-pos="2"]  { transform:translateX(calc(-50% + 310px)) rotate(17deg) scale(0.7);z-index:1;opacity:0;pointer-events:none; }
        .ach-card[data-pos="-3"],.ach-card[data-pos="3"],.ach-card[data-pos="-4"],.ach-card[data-pos="4"] { transform:translateX(-50%) scale(0.5);opacity:0;pointer-events:none;z-index:0; }
        .proc-num { font-size:44px;font-weight:800;color:rgba(45,122,79,0.10);line-height:1;margin-bottom:12px;display:flex;align-items:flex-start;gap:4px; }
        .proc-num-star { color:var(--green);font-size:22px;margin-top:4px; }
        .proc-card-icon { width:80px;height:80px;margin:0 auto 10px;display:flex;align-items:center;justify-content:center; }
        .proc-card-icon img { width:100%;height:100%;object-fit:contain; }
        .ach-year { font-size:11px;font-weight:700;color:var(--green);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;text-align:center; }
        .proc-card-title { font-size:17px;font-weight:700;color:var(--gray-800);margin-bottom:10px;text-align:center;line-height:1.35; }
        .proc-card-desc { font-size:12.5px;color:var(--gray-400);line-height:1.65;text-align:center; }
        .proc-controls { display:flex;align-items:center;justify-content:center;gap:20px;margin-top:28px; }
        .proc-btn { width:46px;height:46px;border-radius:50%;background:var(--green);color:#fff;border:none;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s,transform 0.15s; }
        .proc-btn:hover { background:#25633f;transform:scale(1.08); }
        .proc-btn:disabled { background:#ccc;cursor:default;transform:none; }
        .proc-dots { display:flex;gap:7px;align-items:center; }
        .proc-dot { width:8px;height:8px;border-radius:50%;background:#ddd;transition:background 0.3s,width 0.3s;cursor:pointer; }
        .proc-dot.active { background:var(--green);width:22px;border-radius:4px; }
        @media (max-width:700px) { .proc-deck{height:420px}.ach-card[data-pos="-1"]{transform:translateX(calc(-50% - 140px)) rotate(-10deg) scale(0.82);opacity:0.6}.ach-card[data-pos="1"]{transform:translateX(calc(-50% + 140px)) rotate(10deg) scale(0.82);opacity:0.6} }
        .awards-list-wrap { margin-top:40px;background:var(--gray-50,#f8faf8);border-radius:16px;padding:32px 36px; }
        .awards-list-title { font-size:16px;font-weight:700;color:#1A3D2B;margin-bottom:24px; }
        .awards-photo-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
        .award-photo-card { background:#fff;border-radius:12px;overflow:hidden;border:1.5px solid rgba(0,0,0,0.07);transition:transform 0.2s,box-shadow 0.2s; }
        .award-photo-card:hover { transform:translateY(-3px);box-shadow:0 8px 24px rgba(45,122,79,0.1); }
        .award-photo-img { width:100%;aspect-ratio:4/3;overflow:hidden;background:#f3f4f6; }
        .award-photo-img img { width:100%;height:100%;object-fit:cover; }
        .award-photo-info { padding:14px 16px; }
        .award-date { font-size:11px;font-weight:700;color:#2D7A4F;letter-spacing:0.08em;text-transform:uppercase; }
        .award-name { font-size:13px;font-weight:700;color:#1A3D2B;margin:4px 0;line-height:1.35; }
        .award-by { font-size:12px;color:#7a9485;line-height:1.5; }
        @media (max-width:768px) { .awards-photo-grid{grid-template-columns:repeat(2,1fr)} }
        @media (max-width:480px) { .awards-photo-grid{grid-template-columns:1fr} }
      `}} />

      <section className="page-hero page-hero-wwa">
        <div className="container" style={{ textAlign: 'center', paddingTop: '80px' }}>
          <h1 style={{ color: '#fff' }}>About Us</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', margin: '0 auto', maxWidth: '620px' }}>We are an agri-food company born from the passion to empower local cassava farmers and deliver premium cassava-based products for Indonesia and the world.</p>
        </div>
      </section>

      <div id="journeyWrapper" style={{ height:'700vh' }}>
      <section id="timeline" style={{ background: '#f7f8f5', height:'calc(100vh - 80px)', display:'flex', flexDirection:'column', overflow:'hidden', position:'sticky', top:'80px' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .gj-wrap { display:flex; flex:1; overflow:hidden; }
          .gj-left { width:200px; flex-shrink:0; display:flex; flex-direction:column; justify-content:center; padding:60px 0; gap:0; border-right:1px solid rgba(0,0,0,0.08); }
          .gj-year-btn { display:block; width:100%; background:none; border:none; cursor:pointer; padding:10px 16px 10px 48px; font-size:14px; font-weight:600; color:#bbb; transition:color 0.25s,background 0.25s; border-radius:0; text-align:left; }
          .gj-year-btn.active { color:#1A3D2B; background:rgba(45,122,79,0.12); }
          .gj-center { flex:1; display:flex; flex-direction:column; justify-content:center; padding:80px 60px; max-width:480px; }
          .gj-big-year { font-size:clamp(32px,4vw,52px); font-weight:900; color:#1A3D2B; line-height:1; letter-spacing:-1px; margin-bottom:16px; }
          .gj-sub { font-size:11px; font-weight:700; color:#2D7A4F; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:20px; }
          .gj-desc { font-size:15px; color:#3a5040; line-height:1.8; max-width:380px; }
          .gj-right { flex:1; position:relative; overflow:hidden; min-height:500px; }
          .gj-right img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0; transition:opacity 0.5s ease; }
          .gj-right img.active { opacity:1; }
          .gj-panel { display:none; }
          .gj-panel.active { display:block; }
          @media (max-width:900px) {
            .gj-wrap { flex-direction:column; min-height:auto; }
            .gj-left { flex-direction:row; width:auto; padding:24px 20px; border-right:none; border-bottom:1px solid rgba(0,0,0,0.08); gap:8px; flex-wrap:wrap; }
            .gj-year-btn.active::before { display:none; }
            .gj-year-btn.active { border-bottom:2px solid #1A3D2B; padding-bottom:6px; }
            .gj-right { min-height:260px; }
            .gj-center { padding:40px 24px; max-width:100%; }
          }
        `}} />
        <div style={{ padding:'16px 48px 0', borderBottom:'1px solid rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize:'clamp(32px,4vw,48px)', fontWeight:800, color:'#1A3D2B', margin:'0', textAlign:'left' }}>Our Journey</h2>
        </div>
        <div className="gj-wrap">
          {/* Left: year list */}
          <div className="gj-left">
            {['2017','2018','2019','2020','2021–2022','2023','2024–NOW'].map((y, i) => (
              <button key={y} className={`gj-year-btn${i === 0 ? ' active' : ''}`} data-gj={i}>{y}</button>
            ))}
          </div>

          {/* Center: content panels */}
          <div className="gj-center">
            {[
              { year:'2017', sub:'The Beginning', desc:'Rumah Mocaf Indonesia was established with modest capital but enormous drive to empower local cassava farmers in Banjarnegara, Central Java.' },
              { year:'2018', sub:'Farmer Ecosystem', desc:'We began recruiting and training partner farmers, establishing a fair-price purchasing system that replaced exploitative middlemen.' },
              { year:'2019', sub:'Certification & Standards', desc:'Obtained halal and BPOM certifications. Standardized the production process to meet modern retail and export quality requirements.' },
              { year:'2020', sub:'Product Expansion', desc:'Launched the Mocafine product line and began digital sales. Thrived through the pandemic thanks to a resilient local ecosystem.' },
              { year:'2021–2022', sub:'International Debut', desc:'First international appearances at SIAL Interfood Indonesia and MIHAS Malaysia. Mocaf products attracted buyers from multiple countries.' },
              { year:'2023', sub:'European Market', desc:'Presented at Hannover Messe Germany, introducing mocaf to Europe. Achieved #3 national digital market share at ~27%.' },
              { year:'2024–NOW', sub:'Global Expansion', desc:'Exhibited at FHA Singapore, Odicoff Turkiye, TEI 40th, and Amazing Indonesia Jeddah. Ecosystem now spans 625+ farmers, 265+ craftsmen, 124+ youth innovators.' },
            ].map((t, i) => (
              <div key={t.year} className={`gj-panel${i === 0 ? ' active' : ''}`} data-gj={i}>
                <div className="gj-big-year">{t.year}</div>
                <div className="gj-sub">{t.sub}</div>
                <p className="gj-desc">{t.desc}</p>
              </div>
            ))}
          </div>

          {/* Right: photos */}
          <div className="gj-right">
            {[
              '/images/history rumah mocaf.jpg',
              '/images/petani rumah mocaf.jpg',
              '/images/komunitas.jpg',
              '/images/foto-produk/Mocafine.png',
              '/images/internasional inovator 1.jpeg',
              '/images/internasional inovator 1.jpeg',
              '/images/craftsmen.jpg',
            ].map((src, i) => (
              <img key={i} src={src} alt="" data-gj={i} className={i === 0 ? 'active' : ''} />
            ))}
          </div>
        </div>
      </section>
      </div>

      <section className="section section-green">
        <div className="container">
          <div className="text-center"><span className="section-label">Vision &amp; Mission</span><h2 className="section-title">Why We Exist</h2></div>
          <div className="info-grid" style={{ marginTop: '48px' }}>
            <div className="info-card" style={{ borderTop: '4px solid var(--green)' }}>
              <div className="info-card-icon"><img src="/images/Visi%20%26%20Misi/Vision.svg" alt="Vision" style={{ width: '48px', height: '48px', objectFit: 'contain' }} /></div>
              <div className="info-card-title">Vision</div>
              <p className="info-card-desc">To become a globally recognized premium Indonesian mocaf brand — realizing sustainable cassava-based food security while empowering local communities.</p>
            </div>
            <div className="info-card" style={{ borderTop: '4px solid var(--blue)' }}>
              <div className="info-card-icon"><img src="/images/Visi%20%26%20Misi/Misi.svg" alt="Mission" style={{ width: '48px', height: '48px', objectFit: 'contain' }} /></div>
              <div className="info-card-title">Mission</div>
              <p className="info-card-desc">To build an integrated cassava farming ecosystem, empower farmers through fair pricing, create internationally quality-standard innovative products, and contribute to the UN SDGs.</p>
            </div>
            <div className="info-card" style={{ borderTop: '4px solid #f59e0b' }}>
              <div className="info-card-icon"><img src="/images/Visi%20%26%20Misi/Approach.svg" alt="Approach" style={{ width: '48px', height: '48px', objectFit: 'contain' }} /></div>
              <div className="info-card-title">Approach</div>
              <p className="info-card-desc">We believe change begins with community. Every business decision we make considers its impact on farmers, the environment, and future generations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center"><span className="section-label">Core Values</span><h2 className="section-title">The Values That Guide Us</h2></div>
          <div className="values-grid">
            {[
              { icon: '/images/Core%20Values/Comunity%20Empowerment.svg', title: 'Community Empowerment', desc: 'Every step we take is oriented toward the well-being of farmers and local communities in Banjarnegara.' },
              { icon: '/images/Core%20Values/Sustainability.svg', title: 'Sustainability', desc: 'We practice integrated organic farming and circular economy principles that minimize environmental impact.' },
              { icon: '/images/Core%20Values/Premium%20Quality.svg', title: 'Premium Quality', desc: 'Every product passes strict quality standards to ensure consumer satisfaction and trust in global markets.' },
              { icon: '/images/Core%20Values/Continuous%20Innovation.svg', title: 'Continuous Innovation', desc: "We continuously innovate mocaf-derived products that are relevant to the needs of today's health-conscious consumers." },
              { icon: '/images/Core%20Values/fairness%20and%20Inclusion.svg', title: 'Fairness & Inclusion', desc: 'Our work system is performance-based, open to women, and provides equal opportunities to all partners regardless of background.' },
              { icon: '/images/Core%20Values/Global%20Impact.svg', title: 'Global Impact', desc: 'We bring local Indonesian products to the international stage through global exhibitions and premium export channels.' },
            ].map((v) => (
              <div key={v.title} className="value-card">
                <div className="value-icon"><img src={v.icon} alt={v.title} style={{ width: '48px', height: '48px', objectFit: 'contain' }} /></div>
                <div className="value-title">{v.title}</div>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <div id="achieveWrapper" style={{ height:'500vh' }}>
        <section style={{ position:'sticky', top:'80px', height:'calc(100vh - 80px)', background:'#fff', display:'flex', flexDirection:'column', justifyContent:'center', overflow:'visible', zIndex:10, padding:'24px 0' }}>
          <div className="container">
            <div className="text-center">
              <span className="section-label">Recognition</span>
              <h2 className="section-title">Our Achievements</h2>
              <p className="section-subtitle">Awards that reflect our commitment to innovation, community empowerment, and sustainable growth.</p>
            </div>
            <div className="proc-swipe" style={{ marginTop: '16px' }}>
              <div className="proc-deck" id="achieveDeck">
                {[
                  { num: '01', img: '/images/Achievement/Anugerah%20Bangga%20Buatan%20Indonesia%202020.png', alt: 'ABBI 2020', year: '2020', title: 'Anugerah Bangga Buatan Indonesia', desc: 'Award from the Ministry of Tourism & Creative Economy for the best local SMEs and creative industries during the COVID-19 pandemic.' },
                  { num: '02', img: '/images/Achievement/Juara%201%20Hyundai%20Startup%20Challege%202020.png', alt: '1st Place Hyundai', year: '2020', title: '1st Place — Hyundai Startup Challenge', desc: 'Won first place for demonstrating real social impact and environmental innovation through our cassava ecosystem.' },
                  { num: '03', img: '/images/Achievement/Juara%202%20Indonesia%20Food%20Innovation%202020.png', alt: '2nd Place Food Innovation', year: '2020', title: '2nd Place — Indonesian Food Innovation', desc: 'A food business acceleration program by the Ministry of Industry for innovative SMEs utilizing local resources.' },
                  { num: '04', img: '/images/Achievement/Juara%203%20Astra%20Startup%20Challenge%202021.png', alt: '3rd Place Astra', year: '2021', title: '3rd Place — Astra Startup Challenge', desc: 'Received 6 months of professional business mentoring and startup capital from the Astra Group.' },
                  { num: '05', img: '/images/Achievement/Kick%20Andy%20Heroes%202021.png', alt: 'Kick Andy Heroes', year: '2021', title: 'Kick Andy Heroes', desc: 'Award from Metro TV recognizing inspiring figures who build and empower local communities.' },
                ].map((a) => (
                  <div key={a.num} className="ach-card">
                    <div className="proc-num">{a.num}</div>
                    <div className="proc-card-icon"><img src={a.img} alt={a.alt} /></div>
                    <div className="ach-year">{a.year}</div>
                    <div className="proc-card-title">{a.title}</div>
                    <div className="proc-card-desc">{a.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* PENGHARGAAN LAINNYA */}
      <section className="section">
        <div className="container">
          <div className="awards-list-wrap">
            <h3 className="awards-list-title">Other Awards</h3>
            <div className="awards-photo-grid">
              {[
                { img: '/images/penghargaan%20lainnya/Wirausaha%20Muda%20Mandiri.png', alt: 'Wirausaha Muda Mandiri', date: 'Jan 2025', name: 'Wirausaha Muda Mandiri', by: 'Runner Up Food Category — Bank Mandiri' },
                { img: '/images/penghargaan%20lainnya/Talenta%20Wirausaha%20BSI%20Winner.png', alt: 'Talenta Wirausaha BSI', date: 'Oct 2023', name: 'Talenta Wirausaha BSI', by: 'Winner — Berdaya Category, Bank Syariah Indonesia' },
                { img: '/images/penghargaan%20lainnya/1731658580-slide1-edt%201.png', alt: 'Mental Revolution Award', date: 'Dec 2022', name: 'Mental Revolution Award', by: 'Coordinating Ministry for Human Development & Culture' },
                { img: '/images/penghargaan%20lainnya/UKM%20Pangan%20Award%202022.png', alt: 'UKM Pangan Awards', date: 'Aug 2022', name: 'UKM Pangan Awards', by: 'Ministry of Trade, Republic of Indonesia' },
                { img: '/images/penghargaan%20lainnya/Pengabdian%20di%20bidang%20sosial-ekonomi.png', alt: 'Social-Economic Service Award', date: 'Nov 2021', name: 'Social-Economic Service Award', by: 'Executive Board of Muhammadiyah' },
                { img: '/images/penghargaan%20lainnya/Kementan%20Awards%202021.png', alt: 'Kementan Awards 2021', date: 'Aug 2021', name: 'Kementan Awards 2021', by: 'Ministry of Agriculture, Republic of Indonesia' },
              ].map((a) => (
                <div key={a.name} className="award-photo-card">
                  <div className="award-photo-img"><img src={a.img} alt={a.alt} /></div>
                  <div className="award-photo-info">
                    <span className="award-date">{a.date}</span>
                    <div className="award-name">{a.name}</div>
                    <div className="award-by">{a.by}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2 className="section-title">Ready to Collaborate?</h2>
          <p>Contact us for partnership information, B2B orders, or to simply learn more about Rumah Mocaf.</p>
          <div className="cta-actions">
            <Link href="/contact" className="btn btn-white">✉ Get in Touch</Link>
            <Link href="/ecosystem" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>Explore Our Ecosystem →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
