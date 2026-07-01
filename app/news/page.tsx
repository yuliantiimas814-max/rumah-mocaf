'use client';

import Link from 'next/link';
import { useState } from 'react';

const articles = [
  { emoji: '🏭', bg: 'linear-gradient(135deg,#e8f5e9,#e3f2fd)', badgeCls: 'badge-blue', badge: 'Exhibition', date: 'April 15, 2025 · 4 min read', title: 'Rumah Mocaf at Hannover Messe: Bringing Mocaf to the European Market', excerpt: 'Rumah Mocaf represented Indonesia at Hannover Messe Germany, introducing premium mocaf flour to buyers from over 50 countries...', category: 'Exhibition' },
  { emoji: '👶', bg: 'linear-gradient(135deg,#fff3e0,#fce4ec)', badgeCls: 'badge-green', badge: 'Community', date: 'March 2, 2025 · 6 min read', title: 'From Field to Table: How Mocaf Flour Helps Reduce Stunting', excerpt: 'The high nutritional content of mocaf flour is becoming a new hope in the fight against childhood stunting in Banjarnegara...', category: 'Community' },
  { emoji: '👩‍🌾', bg: 'linear-gradient(135deg,#f3e5f5,#e8f5e9)', badgeStyle: { background: '#9c27b0', color: '#fff' }, badge: 'Community', date: 'February 18, 2025 · 5 min read', title: 'Women Farmers of Banjarnegara: Driving Household Food Security', excerpt: 'The story of women farmers who have become an integral part of the Rumah Mocaf ecosystem, leading change in their communities...', category: 'Community' },
  { emoji: '🌾', bg: 'linear-gradient(135deg,#e8f4fc,#e8f5e9)', badgeStyle: { background: 'var(--blue)', color: '#fff' }, badge: 'Research', date: 'January 10, 2025 · 7 min read', title: 'Mocaf vs. Wheat Flour: A Full Nutritional Comparison', excerpt: 'An in-depth analysis of the nutritional content of mocaf flour compared to wheat flour — which one wins for a healthy lifestyle?', category: 'Research' },
  { emoji: '📊', bg: 'linear-gradient(135deg,#fff8e1,#e8f5e9)', badgeCls: 'badge-green', badge: 'Products', date: 'December 5, 2024 · 4 min read', title: 'Rumah Mocaf Achieves 27% National Digital Market Share', excerpt: 'Reaching #3 in the national digital market, Rumah Mocaf proves that locally made products can compete powerfully in the e-commerce era...', category: 'Products' },
  { emoji: '🇸🇦', bg: 'linear-gradient(135deg,#e8f5e9,#fff3e0)', badgeCls: 'badge-blue', badge: 'Exhibition', date: 'November 20, 2024 · 3 min read', title: 'Amazing Indonesia in Jeddah: Mocaf Meets the Middle Eastern Market', excerpt: "Rumah Mocaf's participation in Amazing Indonesia Jeddah opened exciting export opportunities in the high-potential Middle Eastern halal market...", category: 'Exhibition' },
];

const mediaCoverage = [
  { name: 'Metro TV', type: 'Televisi Nasional' },
  { name: 'Republika', type: 'Media Cetak & Online' },
  { name: 'Antara', type: 'Kantor Berita Nasional' },
  { name: 'Kompas', type: 'Media Cetak & Online' },
  { name: 'SINDOnews', type: 'Media Online' },
  { name: 'Media Indonesia', type: 'Media Cetak & Online' },
  { name: 'WartaTani.co', type: 'Media Pertanian' },
  { name: 'GATRA.com', type: 'Majalah & Online' },
  { name: 'iNews TV', type: 'Televisi' },
  { name: 'Warta Ekonomi', type: 'Media Bisnis' },
  { name: 'Tribun Timur', type: 'Media Regional' },
  { name: 'MURI', type: 'Museum Rekor Indonesia', featured: true },
];

const filters = ['All', 'Exhibition', 'Products', 'Community', 'Sustainability', 'Research'];

export default function NewsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' ? articles : articles.filter((a) => a.category === activeFilter);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .media-coverage-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .media-cov-card { background: #fff; border-radius: 12px; padding: 24px 20px; text-align: center; border: 1.5px solid rgba(0,0,0,0.07); box-shadow: 0 1px 4px rgba(0,0,0,0.04); transition: border-color 0.2s, transform 0.2s; }
        .media-cov-card:hover { border-color: rgba(45,122,79,0.3); transform: translateY(-2px); }
        .media-cov-card--featured { border-color: rgba(45,122,79,0.3); background: #f5fbf7; }
        .media-cov-name { font-size: 16px; font-weight: 700; color: #1A3D2B; margin-bottom: 6px; }
        .media-cov-type { font-size: 12px; color: #7a9485; }
        @media (max-width: 768px) { .featured-grid { grid-template-columns: 1fr !important; } .media-coverage-grid { grid-template-columns: repeat(2, 1fr); } }
      `}} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">News &amp; Insights</span>
          <h1>Latest News from<br />Rumah Mocaf</h1>
          <p>Follow our journey — from the cassava fields of Banjarnegara to the international stage, from product innovation to real social impact.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px', marginBottom: '16px' }} className="featured-grid">
            <div className="news-card" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <div className="news-thumb" style={{ background: '#111', padding: 0, overflow: 'hidden', aspectRatio: '16/7' }}>
                <img src="/images/image 35.png" alt="Hannover Messe" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div className="news-cat-badge"><span className="badge badge-blue">Exhibition</span></div>
              </div>
              <div className="news-body" style={{ padding: '28px' }}>
                <div className="news-meta">April 15, 2025 · 4 min read</div>
                <div className="news-title" style={{ fontSize: '22px', marginBottom: '12px' }}>Rumah Mocaf at Hannover Messe: Bringing Premium Mocaf to Europe</div>
                <p className="news-excerpt" style={{ fontSize: '15px', marginBottom: '20px' }}>Rumah Mocaf Indonesia represented the nation at Hannover Messe Germany, one of the world&apos;s largest industrial trade fairs, introducing premium mocaf flour to buyers and distributors from over 50 countries. Our presence at Hannover marks a historic milestone in bringing a local Indonesian product to the global stage...</p>
                <Link href="/news" className="btn btn-primary btn-sm">Read Full Article →</Link>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="news-card">
                <div className="news-thumb" style={{ background: '#111', padding: 0, overflow: 'hidden', aspectRatio: '16/6' }}>
                  <img src="/images/komunitas.jpg" alt="Mocaf Stunting" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div className="news-cat-badge"><span className="badge badge-green">Community</span></div>
                </div>
                <div className="news-body">
                  <div className="news-meta">March 2, 2025 · 6 min read</div>
                  <div className="news-title">From Field to Table: How Mocaf Flour Helps Reduce Stunting</div>
                  <p className="news-excerpt">The high nutritional content of mocaf flour is becoming a new hope in the fight against childhood stunting...</p>
                  <Link href="/news" className="news-read">Read More →</Link>
                </div>
              </div>
              <div className="news-card">
                <div className="news-thumb" style={{ background: '#111', padding: 0, overflow: 'hidden', aspectRatio: '16/6' }}>
                  <img src="/images/women.png" alt="Women Farmers" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div className="news-cat-badge"><span className="badge" style={{ background: '#9c27b0', color: '#fff' }}>Community</span></div>
                </div>
                <div className="news-body">
                  <div className="news-meta">February 18, 2025 · 5 min read</div>
                  <div className="news-title">Women Farmers of Banjarnegara: Driving Household Food Security</div>
                  <p className="news-excerpt">The story of women farmers who have become an integral part of the Rumah Mocaf ecosystem...</p>
                  <Link href="/news" className="news-read">Read More →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="news-header">
            <div>
              <span className="section-label">All Articles</span>
              <h2 className="section-title">News &amp; Insights</h2>
            </div>
          </div>
          <div className="news-filter">
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-btn${activeFilter === f ? ' active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >{f}</button>
            ))}
          </div>
          <div className="news-grid">
            {filtered.map((a) => (
              <div key={a.title} className="news-card">
                <div className="news-thumb" style={{ background: a.bg }}>
                  <span style={{ fontSize: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{a.emoji}</span>
                  <div className="news-cat-badge">
                    {a.badgeCls
                      ? <span className={`badge ${a.badgeCls}`}>{a.badge}</span>
                      : <span className="badge" style={a.badgeStyle}>{a.badge}</span>
                    }
                  </div>
                </div>
                <div className="news-body">
                  <div className="news-meta">{a.date}</div>
                  <div className="news-title">{a.title}</div>
                  <p className="news-excerpt">{a.excerpt}</p>
                  <Link href="/news" className="news-read">Read More →</Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <button className="btn btn-outline">Load More Articles</button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <span className="section-label">Media Coverage</span>
            <h2 className="section-title">Featured In</h2>
            <p className="section-subtitle">Rumah Mocaf has been featured by numerous leading national media outlets.</p>
          </div>
          <div className="media-coverage-grid">
            {mediaCoverage.map((m) => (
              <div key={m.name} className={`media-cov-card${m.featured ? ' media-cov-card--featured' : ''}`}>
                <div className="media-cov-name">{m.name}</div>
                <div className="media-cov-type">{m.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2 className="section-title">Interested in Our Products?</h2>
          <p>After reading our stories and insights, experience the quality of Rumah Mocaf&apos;s premium cassava products for yourself.</p>
          <div className="cta-actions">
            <Link href="/products" className="btn btn-white">🛒 See Products</Link>
            <Link href="/contact" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>Contact Us →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
