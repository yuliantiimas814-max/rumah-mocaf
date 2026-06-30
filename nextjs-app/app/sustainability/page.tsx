'use client';

import Link from 'next/link';

export default function SustainabilityPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Sustainability</span>
          <h1>Our Commitment to<br />People and Planet</h1>
          <p>Sustainability is not just a word — it is the way we do business, from the cassava field to the dining table, from production waste back to the soil.</p>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .circular-flow-row { display:flex; align-items:center; gap:0; margin-top:56px; flex-wrap:wrap; justify-content:center; }
        .circular-flow-card { background:var(--green-light); border-radius:var(--radius); padding:24px; text-align:center; flex:1; min-width:160px; max-width:220px; }
        .circular-flow-arrow { font-size:24px; color:var(--green); padding:0 12px; font-weight:700; flex-shrink:0; }
        @media (max-width:768px) {
          .circular-flow-row { flex-direction:column; align-items:stretch; }
          .circular-flow-card { max-width:100%; }
          .circular-flow-arrow { transform:rotate(90deg); align-self:center; padding:8px 0; }
        }
      `}} />
      <section className="section">
        <div className="container">
          <div className="text-center">
            <span className="section-label">Zero Waste</span>
            <h2 className="section-title">Zero-Waste Circular Economy</h2>
            <p className="section-subtitle">Every part of the cassava plant is utilized. Nothing is wasted.</p>
          </div>
          <div className="circular-flow-row">
            <div className="circular-flow-card">
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌾</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--green-dark)' }}>Cassava</div>
              <div style={{ fontSize: '12px', color: 'var(--gray-600)', marginTop: '4px' }}>Organic harvest from Banjarnegara fields</div>
            </div>
            <div className="circular-flow-arrow">→</div>
            <div className="circular-flow-card">
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏭</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--green-dark)' }}>Mocaf Flour</div>
              <div style={{ fontSize: '12px', color: 'var(--gray-600)', marginTop: '4px' }}>Premium gluten-free product</div>
            </div>
            <div className="circular-flow-arrow">→</div>
            <div className="circular-flow-card">
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>♻️</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--green-dark)' }}>Production Waste</div>
              <div style={{ fontSize: '12px', color: 'var(--gray-600)', marginTop: '4px' }}>Pulp and liquid waste processed</div>
            </div>
            <div className="circular-flow-arrow">→</div>
            <div className="circular-flow-card">
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌱</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--green-dark)' }}>Fertilizer &amp; Feed</div>
              <div style={{ fontSize: '12px', color: 'var(--gray-600)', marginTop: '4px' }}>Returned to the field and livestock farms</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="text-center">
            <span className="section-label">Sustainability Pillars</span>
            <h2 className="section-title">Three Dimensions of Our Sustainability</h2>
          </div>
          <div className="info-grid">
            <div className="info-card" style={{ borderLeft: '4px solid var(--green)' }}>
              <div className="info-card-icon">🌍</div>
              <div className="info-card-title">Environment (Planet)</div>
              <p className="info-card-desc">Integrated organic farming without harmful chemical pesticides. Water-efficient production process with zero-waste output. Organic fertilizer from mocaf waste replaces chemical inputs.</p>
            </div>
            <div className="info-card" style={{ borderLeft: '4px solid var(--blue)' }}>
              <div className="info-card-icon">🤝</div>
              <div className="info-card-title">People</div>
              <p className="info-card-desc">Fair and stable purchasing prices for farmers. Continuous training and capacity-building programs. Women&apos;s empowerment and inclusivity throughout the value chain.</p>
            </div>
            <div className="info-card" style={{ borderLeft: '4px solid #f59e0b' }}>
              <div className="info-card-icon">📈</div>
              <div className="info-card-title">Economy (Profit)</div>
              <p className="info-card-desc">A shared-value business model where farmers, craftsmen, and the company grow together. Global market expansion increases the value of local Indonesian produce.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="two-col">
            <div className="two-col-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px', background: '#eaf5ee', borderRadius: 'var(--radius-lg)' }}>🌿</div>
            <div className="two-col-text">
              <span className="section-label">Organic Farming</span>
              <h3>Integrated Organic Farming</h3>
              <p>Our partner farmers apply integrated organic farming practices — using organic fertilizer derived from mocaf production waste, avoiding harmful chemical pesticides, and maintaining the balance of the farmland ecosystem.</p>
              <p>This approach not only produces higher-quality cassava, but also preserves long-term soil fertility and the health of Banjarnegara&apos;s agricultural ecosystem for generations to come.</p>
              <ul style={{ marginTop: '16px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span> <span style={{ fontSize: '14px', color: 'var(--gray-600)' }}>No harmful chemical pesticides</span></li>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span> <span style={{ fontSize: '14px', color: 'var(--gray-600)' }}>Organic fertilizer from mocaf waste</span></li>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span> <span style={{ fontSize: '14px', color: 'var(--gray-600)' }}>Crop rotation to maintain soil fertility</span></li>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span> <span style={{ fontSize: '14px', color: 'var(--gray-600)' }}>Efficient irrigation systems that conserve water</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-green">
        <div className="container">
          <div className="two-col reverse">
            <div className="two-col-text">
              <span className="section-label">Fair Economy</span>
              <h3>Economic Justice for Farmers</h3>
              <p>One of the biggest challenges facing farmers is poor economic conditions caused by volatile prices and dependence on middlemen who often take an unfair cut. Rumah Mocaf was created to solve this problem.</p>
              <p>We purchase cassava at fair, transparent prices that do not fluctuate with unpredictable market forces. Farmers receive income certainty that allows them to plan for the future — investing in education, health, and their farms.</p>
              <div style={{ marginTop: '24px', padding: '20px', background: '#fff', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--green)' }}>
                <p style={{ fontSize: '14px', color: 'var(--gray-600)', fontStyle: 'italic' }}>&ldquo;With Rumah Mocaf&apos;s fair pricing system, I can finally plan my children&apos;s school fees with confidence.&rdquo; — Partner Farmer, Banjarnegara</p>
              </div>
            </div>
            <div className="two-col-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px', background: 'rgba(255,255,255,0.2)', borderRadius: 'var(--radius-lg)' }}>⚖️</div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="text-center">
            <span className="section-label">Standards &amp; Certifications</span>
            <h2 className="section-title">Standards &amp; Certifications</h2>
            <p className="section-subtitle">Our commitment to quality and sustainability is confirmed by certifications from trusted national and international bodies.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', marginTop: '48px' }}>
            {[
              { icon: '☪️', title: 'Halal MUI', desc: 'Certified halal by the Indonesian Council of Ulama' },
              { icon: '🏛️', title: 'BPOM RI', desc: "Registered with Indonesia's National Food & Drug Authority" },
              { icon: '🌱', title: 'Organic Certified', desc: 'Verified organic production process' },
              { icon: '🌾', title: 'Gluten Free', desc: 'Independently verified gluten-free product' },
            ].map((c) => (
              <div key={c.title} style={{ background: '#fff', borderRadius: 'var(--radius)', padding: '24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>{c.icon}</div>
                <div style={{ fontWeight: 700, color: 'var(--gray-800)', marginBottom: '6px' }}>{c.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--gray-400)' }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center">
            <span className="section-label">Looking Ahead</span>
            <h2 className="section-title">Our Forward Commitments</h2>
            <p className="section-subtitle">Our sustainability agenda for 2025–2027.</p>
          </div>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div className="timeline" style={{ marginTop: '48px' }}>
              <div className="timeline-item">
                <div className="timeline-year">2025</div>
                <div className="timeline-title">Farmer Ecosystem Expansion</div>
                <p className="timeline-desc">Target 1,000 partner farmers across Banjarnegara and surrounding areas. Expand the organic farming training program to new communities.</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2026</div>
                <div className="timeline-title">Zero-Carbon Production Facility</div>
                <p className="timeline-desc">Investment in renewable energy (solar panels) for the production facility. Target carbon-neutral operations for the primary production line.</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2027</div>
                <div className="timeline-title">International Certification &amp; Premium Export</div>
                <p className="timeline-desc">Achieve international organic certifications (EU Organic, USDA Organic) to unlock premium export markets in Europe and North America.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center">
            <span className="section-label">UN SDGs</span>
            <h2 className="section-title">Aligned with the UN Sustainable Development Goals</h2>
            <p className="section-subtitle">Every aspect of Rumah Mocaf&apos;s operations is designed to contribute to the United Nations Sustainable Development Goals.</p>
          </div>
          <div className="sdg-grid">
            {[
              { num: 1, label: 'No Poverty', bg: '#e5243b', title: 'Economic Justice for Farmers', desc: 'Rumah Mocaf purchases cassava at fair prices and builds processing industry in Banjarnegara. 625 farmers are now part of the ecosystem and 50+ people are directly employed at Rumah Mocaf.' },
              { num: 2, label: 'Zero Hunger', bg: '#dda63a', title: 'Cassava-Based Food Alternatives', desc: 'Mocaf as a wheat flour substitute promotes cassava-based food culture, reducing dependence on imported grains. Rumah Mocaf holds approximately 27% of the national digital market share.' },
              { num: 3, label: 'Good Health', bg: '#4c9f38', title: 'Mocaf for Nutrition & Anti-Stunting', desc: 'High-quality mocaf flour is nutrient-rich and gluten-free. Its nutritional composition contributes positively to reducing stunting in communities.' },
              { num: 5, label: 'Gender Equality', bg: '#ff3a21', title: 'Empowering Women Farmers', desc: 'We empower women farmers throughout the full value chain — from farming and processing to distribution — creating equal opportunities for all.' },
              { num: 8, label: 'Decent Work', bg: '#fcc30b', title: 'Fair & Inclusive Work Environment', desc: 'Performance-based reward systems, open opportunities for women, product certification, and continuous skills training for the entire team.' },
              { num: 17, label: 'Partnerships', bg: '#19486a', title: 'Partnerships for Shared Goals', desc: 'Collaboration with cassava farmers, mocaf craftsmen, and youth ensures sustainable raw material supply and broader market access through training and mentoring.' },
            ].map((sdg) => (
              <div key={sdg.num} className="sdg-row">
                <div className="sdg-badge" style={{ background: sdg.bg }}>
                  <div className="sdg-num">{sdg.num}</div>
                  <div>{sdg.label}</div>
                </div>
                <div>
                  <div className="sdg-content-title">{sdg.title}</div>
                  <p className="sdg-content-desc">{sdg.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2 className="section-title">Support Sustainable Farming</h2>
          <p>Every purchase of a Rumah Mocaf product is direct, tangible support for local farmers and environmental sustainability.</p>
          <div className="cta-actions">
            <a href="https://mocafine.com" target="_blank" rel="noopener noreferrer" className="btn btn-white">🛒 Shop Our Products ↗</a>
            <Link href="/contact" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>Become a CSR Partner →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
