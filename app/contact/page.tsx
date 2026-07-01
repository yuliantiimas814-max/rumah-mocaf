'use client';

import Link from 'next/link';
import { useState } from 'react';

const regions = [
  { icon: '🌴', name: 'Sumatera', desc: 'Agent data for the Sumatera region will be added soon. Contact us for more information.' },
  { icon: '🏝️', name: 'Jawa', desc: 'Agent data for the Jawa region will be added soon. Rumah Mocaf is headquartered in Banjarnegara, Central Java.', defaultOpen: true },
  { icon: '🌲', name: 'Kalimantan', desc: 'Agent data for the Kalimantan region will be added soon.' },
  { icon: '🌺', name: 'Bali & Nusa Tenggara', desc: 'Agent data for the Bali & Nusa Tenggara region will be added soon.' },
  { icon: '🌊', name: 'Sulawesi', desc: 'Agent data for the Sulawesi region will be added soon.' },
  { icon: '🦜', name: 'Maluku & Papua', desc: 'Agent data for the Maluku & Papua region will be added soon.' },
];

export default function ContactPage() {
  const [openRegion, setOpenRegion] = useState<string>('Jawa');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  function toggleRegion(name: string) {
    setOpenRegion((prev) => (prev === name ? '' : name));
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .map-placeholder { background:linear-gradient(135deg,#e8f5ee,#d4ede0); border-radius:20px; padding:60px 40px; text-align:center; position:relative; min-height:220px; overflow:hidden; margin-bottom:48px; border:2px dashed rgba(45,122,79,0.25); }
        .map-label { font-size:24px; font-weight:700; color:#1A3D2B; }
        .map-dots { position:absolute; inset:0; pointer-events:none; }
        .map-dot { position:absolute; font-size:20px; color:#2D7A4F; opacity:0.6; }
        .region-accordion { display:flex; flex-direction:column; gap:12px; }
        .region-item { background:#fff; border-radius:14px; border:1.5px solid rgba(0,0,0,0.08); overflow:hidden; }
        .region-item.active { border-color:rgba(45,122,79,0.35); }
        .region-header { width:100%; display:flex; align-items:center; gap:14px; padding:20px 24px; background:none; border:none; cursor:pointer; text-align:left; font-family:inherit; }
        .region-header:hover { background:#f8fdf9; }
        .region-icon { font-size:22px; }
        .region-name { font-size:16px; font-weight:700; color:#1A3D2B; flex:1; }
        .region-count { font-size:13px; color:#7a9485; }
        .region-chevron { font-size:12px; color:#2D7A4F; transition:transform 0.25s; }
        .region-item.active .region-chevron { transform:rotate(180deg); }
        .region-body { display:none; padding:0 24px 24px; }
        .region-item.active .region-body { display:block; }
        .agent-placeholder { background:#f8fdf9; border-radius:10px; padding:20px 24px; border:1px dashed rgba(45,122,79,0.25); }
        .agent-placeholder p { font-size:14px; color:#7a9485; margin:0; }
      `}} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Get in Touch</span>
          <h1>Let&apos;s Collaborate</h1>
          <p>Whether you&apos;re a B2B buyer, investor, CSR partner, or simply want to learn more — we&apos;d love to hear from you.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            <div>
              <span className="section-label">Send a Message</span>
              <h2 className="section-title" style={{ fontSize: '28px', marginBottom: '32px' }}>Write to Us</h2>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input id="fullName" type="text" placeholder="Your name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input id="email" type="email" placeholder="email@company.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company / Organization</label>
                  <input id="company" type="text" placeholder="Your company name (optional)" />
                </div>
                <div className="form-group">
                  <label htmlFor="inquiry">Type of Inquiry *</label>
                  <select id="inquiry" required>
                    <option value="">-- Select inquiry type --</option>
                    <option>B2B Order / Wholesale</option>
                    <option>Request Sample</option>
                    <option>Partnership</option>
                    <option>Investor / CSR</option>
                    <option>Media / Press</option>
                    <option>Join as Farmer Partner</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" placeholder="Write your question or message here..." required></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '14px', background: submitted ? '#10b981' : '' }}
                  disabled={submitted}
                >
                  {submitted ? '✓ Message Sent!' : 'Send Message →'}
                </button>
                <p style={{ fontSize: '12px', color: 'var(--gray-400)', marginTop: '12px', textAlign: 'center' }}>We will respond within 1–2 business days.</p>
              </form>
            </div>

            <div>
              <span className="section-label">Contact Information</span>
              <h2 className="section-title" style={{ fontSize: '28px', marginBottom: '32px' }}>Reach Us Directly</h2>

              <div className="contact-info-item">
                <div className="contact-info-icon">✉</div>
                <div>
                  <div className="contact-info-title">Email</div>
                  <a href="mailto:info@rumahmocaf.co.id" className="contact-info-text" style={{ color: 'var(--green)' }}>info@rumahmocaf.co.id</a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">💬</div>
                <div>
                  <div className="contact-info-title">WhatsApp</div>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="contact-info-text" style={{ color: 'var(--green)' }}>+62 812-3456-7890</a>
                  <div style={{ fontSize: '12px', color: 'var(--gray-400)', marginTop: '2px' }}>Click to start a chat</div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">📍</div>
                <div>
                  <div className="contact-info-title">Production Office</div>
                  <div className="contact-info-text">Jl. Raya Banjarnegara No. 123<br />Banjarnegara, Central Java 53400</div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">🏢</div>
                <div>
                  <div className="contact-info-title">Marketing Office</div>
                  <div className="contact-info-text">Jl. Sudirman No. 45<br />Purwokerto, Central Java 53111</div>
                </div>
              </div>

              <div style={{ marginTop: '32px' }}>
                <div className="contact-info-title" style={{ marginBottom: '14px' }}>Follow Us</div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a href="#" style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'var(--green)', fontWeight: 700 }} title="Facebook">f</a>
                  <a href="#" style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'var(--green)' }} title="YouTube">▶</a>
                  <a href="#" style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'var(--green)', fontWeight: 700 }} title="LinkedIn">in</a>
                  <a href="#" style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'var(--green)' }} title="Instagram">◉</a>
                </div>
              </div>

              <div style={{ marginTop: '32px', background: 'var(--green-light)', borderRadius: 'var(--radius)', padding: '20px' }}>
                <div style={{ fontWeight: 700, color: 'var(--green-dark)', marginBottom: '8px' }}>🛒 Shop Our Products Online</div>
                <p style={{ fontSize: '14px', color: 'var(--gray-600)', marginBottom: '12px' }}>For retail purchases, visit our online store at mocafine.com</p>
                <a href="https://mocafine.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Visit Mocafine.com ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="text-center">
            <span className="section-label">Location</span>
            <h2 className="section-title">Find Us</h2>
          </div>
          <div style={{ marginTop: '40px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '450px', boxShadow: 'var(--shadow-lg)' }}>
            <iframe
              src="https://www.google.com/maps?q=-7.3982513,109.6933294&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rumah Mocaf Location — Banjarnegara"
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <a href="https://maps.app.goo.gl/DPiZvTeKw1zci3uB6" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Open in Google Maps ↗</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <span className="section-label">Partners &amp; Agents</span>
            <h2 className="section-title">Rumah Mocaf Network</h2>
            <p className="section-subtitle">Our network of partners and agents spread across Indonesia — from Sumatera to Papua.</p>
          </div>

          <div className="map-placeholder">
            <div className="map-label">🗺️ Agent Distribution Map</div>
            <p style={{ color: '#7a9485', fontSize: '14px', marginTop: '8px' }}>Rumah Mocaf agents across 6 major regions of Indonesia</p>
            <div className="map-dots">
              <span className="map-dot" style={{ left: '10%', top: '40%' }} title="Sumatera">●</span>
              <span className="map-dot" style={{ left: '35%', top: '55%' }} title="Jawa">●</span>
              <span className="map-dot" style={{ left: '52%', top: '45%' }} title="Kalimantan">●</span>
              <span className="map-dot" style={{ left: '62%', top: '62%' }} title="Bali & NTT">●</span>
              <span className="map-dot" style={{ left: '70%', top: '38%' }} title="Sulawesi">●</span>
              <span className="map-dot" style={{ left: '87%', top: '50%' }} title="Maluku & Papua">●</span>
            </div>
          </div>

          <div className="region-accordion">
            {regions.map((r) => {
              const isOpen = openRegion === r.name;
              return (
                <div key={r.name} className={`region-item${isOpen ? ' active' : ''}`}>
                  <button className="region-header" onClick={() => toggleRegion(r.name)}>
                    <span className="region-icon">{r.icon}</span>
                    <span className="region-name">{r.name}</span>
                    <span className="region-count">— agents</span>
                    <span className="region-chevron">▼</span>
                  </button>
                  <div className="region-body">
                    <div className="agent-placeholder">
                      <p>{r.desc}</p>
                      <Link href="/services" className="btn btn-primary btn-sm" style={{ marginTop: '12px' }}>Register as Agent →</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2 className="section-title">Partner with Us</h2>
          <p>Whether you&apos;re a buyer, investor, or farmer — there&apos;s a place for you in the Rumah Mocaf ecosystem.</p>
          <div className="cta-actions">
            <a href="mailto:info@rumahmocaf.co.id" className="btn btn-white">✉ Email Us Directly</a>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>💬 WhatsApp →</a>
          </div>
        </div>
      </section>
    </>
  );
}
