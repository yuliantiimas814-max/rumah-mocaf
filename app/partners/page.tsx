'use client';

import Link from 'next/link';
import { useState } from 'react';

const regions = [
  { icon: '🌴', name: 'Sumatera', desc: 'Agent data for the Sumatera region will be added soon. Contact us for more information.', defaultOpen: false },
  { icon: '🏝️', name: 'Jawa', desc: 'Agent data for the Jawa region will be added soon. Rumah Mocaf is headquartered in Banjarnegara, Central Java.', defaultOpen: true },
  { icon: '🌲', name: 'Kalimantan', desc: 'Agent data for the Kalimantan region will be added soon.', defaultOpen: false },
  { icon: '🌺', name: 'Bali & Nusa Tenggara', desc: 'Agent data for the Bali & Nusa Tenggara region will be added soon.', defaultOpen: false },
  { icon: '🌊', name: 'Sulawesi', desc: 'Agent data for the Sulawesi region will be added soon.', defaultOpen: false },
  { icon: '🦜', name: 'Maluku & Papua', desc: 'Agent data for the Maluku & Papua region will be added soon.', defaultOpen: false },
];

export default function PartnersPage() {
  const [openRegion, setOpenRegion] = useState<string>('Jawa');

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

      <section className="page-hero" style={{ background: 'linear-gradient(135deg,#1A3D2B 0%,#2D7A4F 60%,#4a9e6e 100%)' }}>
        <div className="container">
          <span className="section-label" style={{ color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.15)' }}>Partners &amp; Agents</span>
          <h1 className="page-hero-title" style={{ color: '#fff' }}>Rumah Mocaf Network</h1>
          <p className="page-hero-subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>Our network of partners and agents spread across Indonesia — from Sumatera to Papua.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <span className="section-label">Distribution</span>
            <h2 className="section-title">Our Agents Across Indonesia</h2>
            <p className="section-subtitle">Find the nearest Rumah Mocaf partner in your region.</p>
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
                      <Link href="/services" className="btn btn-primary btn-sm" style={{ marginTop: '12px', display: 'inline-block' }}>Register as Agent →</Link>
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
          <h2 className="section-title">Become Part of the Rumah Mocaf Family</h2>
          <p>Join as an official Rumah Mocaf agent or partner and grow your business with us.</p>
          <div className="cta-actions">
            <Link href="/services" className="btn btn-white">Register as Agent →</Link>
            <Link href="/contact" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
