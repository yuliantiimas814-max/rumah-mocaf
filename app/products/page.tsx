'use client';

import Link from 'next/link';

export default function ProductsPage() {
  return (
    <>
      <section className="page-hero" style={{ background: 'linear-gradient(135deg,#1A3D2B 0%,#2D7A4F 60%,#4a9e6e 100%)' }}>
        <div className="container">
          <span className="section-label" style={{ color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.15)' }}>Our Products</span>
          <h1 className="page-hero-title" style={{ color: '#fff' }}>Premium Cassava Products<br />for Every Table</h1>
          <p className="page-hero-subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>From versatile mocaf flour to gluten-free cookies and organic cassava oil — all our products are made from premium cassava grown in Banjarnegara, Central Java.</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
            <a href="#retail" className="btn btn-white" style={{ color: '#1A3D2B' }}>Retail Products</a>
            <a href="#b2b" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>B2B / Bulk Order</a>
            <a href="https://mocafine.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>Shop Online ↗</a>
          </div>
        </div>
      </section>

      <section className="section" id="retail">
        <div className="container">
          <div className="text-center">
            <span className="section-label">Flagship Product</span>
            <h2 className="section-title">Premium Mocaf Flour</h2>
            <p className="section-subtitle">Our core product — a multi-purpose mocaf flour that can replace wheat flour in virtually any recipe.</p>
          </div>
          <div style={{ marginTop: '48px' }}>
            <div className="two-col">
              <div className="two-col-img" style={{ background: '#f8faf8', borderRadius: 'var(--radius-lg)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                <img src="/images/foto-produk/Mocafine.png" alt="Mocafine Mocaf Flour" style={{ width: '100%', height: '100%', objectFit: 'contain', maxHeight: '340px' }} />
              </div>
              <div className="two-col-text">
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  <span className="badge badge-green">Gluten Free</span>
                  <span className="badge badge-blue">Halal MUI</span>
                  <span className="badge badge-white">BPOM Certified</span>
                  <span className="badge" style={{ background: '#f59e0b', color: '#fff' }}>Organic</span>
                </div>
                <h3>Mocafine — Multi-purpose Modified Cassava Flour</h3>
                <p>Mocafine is our flagship product — a high-quality modified cassava flour suitable for a wide range of cooking and baking applications. It delivers the same performance as wheat flour without the gluten.</p>
                <p>Available in retail packs (500g, 1kg) and 25kg industrial bulk packaging for food service and manufacturing needs.</p>
                <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href="https://mocafine.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Buy Now ↗</a>
                  <Link href="/contact" className="btn btn-outline">Request Sample (B2B)</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center">
            <span className="section-label">Derivative Products</span>
            <h2 className="section-title">The Mocafine Product Line</h2>
            <p className="section-subtitle">Innovative mocaf-based products for health-conscious modern consumers.</p>
          </div>
          <div className="product-grid" style={{ marginTop: '48px' }}>
            {[
              { img: '/images/foto-produk/BerryFine.png', alt: 'BerryFil Cookies', name: 'BerryFil — Gluten Free Cookies', desc: 'Gluten-free cookies with a luscious berry filling. Crunchy, malty, and wholesome — perfect for daily snacking or gifting.', badges: [{ cls: 'badge-green', label: 'Gluten Free' }, { cls: 'badge-white', label: 'Vegan' }] },
              { img: '/images/foto-produk/Chocofine.png', alt: 'Chocofine Cookies', name: 'Chocofine — Gluten Free Cookies', desc: 'Gluten-free cookies with a rich, malty chocolate flavor. A satisfying crunch in every bite — guilt-free indulgence.', badges: [{ cls: 'badge-green', label: 'Gluten Free' }, { cls: 'badge-white', label: 'Vegan' }] },
              { img: '/images/foto-produk/Master Bread.png', alt: 'Lasti Bread Premix', name: 'Lasti Bread — Bread Premix', desc: 'Gluten-Free Bread Premix. Bake Like a Pro — a complete mix for baking delicious, fluffy gluten-free bread at home.', badges: [{ cls: 'badge-green', label: 'Gluten Free' }, { cls: 'badge-blue', label: 'Halal' }] },
              { img: '/images/foto-produk/Seasoned Flour.png', alt: 'Fried Chicken Flour', name: 'Fried Chicken Flour', desc: 'Gluten-free seasoned coating flour for perfectly crispy fried chicken. A special mocaf-based formula for exceptional crunch.', badges: [{ cls: 'badge-green', label: 'Gluten Free' }, { cls: 'badge-blue', label: 'Halal' }] },
              { img: '/images/Product/image21.png', alt: 'Mocasion', name: 'Mocasion', desc: 'An innovative mocaf-based snack — the latest creation from the Rumah Mocaf innovation kitchen for health-conscious snack lovers.', badges: [{ cls: 'badge-green', label: 'Gluten Free' }, { cls: 'badge-blue', label: 'Halal' }] },
              { img: '/images/foto-produk/Garva.png', alt: 'Garva Cassava Oil', name: 'Garva — Healthy Cassava Oil', desc: 'Organic cassava oil cold-pressed from selected cassava — a natural, nourishing oil for healthy everyday cooking.', badges: [{ cls: 'badge-green', label: 'Organic' }, { cls: 'badge-white', label: 'Natural' }] },
            ].map((p) => (
              <div key={p.name} className="product-card">
                <div className="product-img">
                  <img src={p.img} alt={p.alt} />
                  <div className="product-badges">{p.badges.map((b) => <span key={b.label} className={`badge ${b.cls}`}>{b.label}</span>)}</div>
                </div>
                <div className="product-info">
                  <div className="product-name">{p.name}</div>
                  <p className="product-desc">{p.desc}</p>
                  <div className="product-actions">
                    <a href="https://mocafine.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Buy Now ↗</a>
                    <Link href="/contact" className="btn btn-outline btn-sm">Wholesale</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="text-center">
            <span className="section-label">Comparison</span>
            <h2 className="section-title">Mocaf Flour vs. Wheat Flour</h2>
            <p className="section-subtitle">Why make the switch to mocaf? Here is a full side-by-side comparison.</p>
          </div>
          <table className="compare-table">
            <thead>
              <tr><th>Aspect</th><th>🌾 Mocaf Flour</th><th>Wheat Flour</th></tr>
            </thead>
            <tbody>
              <tr><td>Gluten</td><td className="check">✓ 100% Gluten Free</td><td className="cross">✗ Contains Gluten</td></tr>
              <tr><td>Raw Material</td><td className="check">✓ Local Indonesian Cassava</td><td className="cross">✗ Imported Wheat</td></tr>
              <tr><td>Carbohydrate Content</td><td className="check">✓ Higher</td><td>High</td></tr>
              <tr><td>Dietary Fiber</td><td className="check">✓ Higher</td><td>Low</td></tr>
              <tr><td>Glycemic Index</td><td className="check">✓ Lower</td><td className="cross">✗ Higher</td></tr>
              <tr><td>Environmental Impact</td><td className="check">✓ Local sourcing, zero-waste process</td><td className="cross">✗ Relies on imports</td></tr>
              <tr><td>Supports Local Farmers</td><td className="check">✓ Directly empowers local farmers</td><td className="cross">✗ No local impact</td></tr>
              <tr><td>Safe for Celiac / Gluten Sensitivity</td><td className="check">✓ Yes</td><td className="cross">✗ No</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2 className="section-title">Ready to Order?</h2>
          <p>Shop retail products at mocafine.com or contact us for wholesale and B2B requirements.</p>
          <div className="cta-actions">
            <a href="https://mocafine.com" target="_blank" rel="noopener noreferrer" className="btn btn-white">🛒 Shop at Mocafine ↗</a>
            <Link href="/contact" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>B2B Inquiry →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
