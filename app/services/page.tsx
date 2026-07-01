'use client';

import Link from 'next/link';

export default function ServicesPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .service-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .service-card { background: #fff; border-radius: 16px; padding: 32px 28px; border: 1.5px solid rgba(0,0,0,0.07); box-shadow: 0 2px 12px rgba(0,0,0,0.05); display: flex; flex-direction: column; }
        .service-icon { width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 20px; }
        .service-title { font-size: 20px; font-weight: 700; color: #1A3D2B; margin-bottom: 12px; }
        .service-desc { font-size: 14px; line-height: 1.7; color: #556b5f; margin-bottom: 20px; text-align: justify; }
        .service-benefits { list-style: none; padding: 0; margin: 0 0 24px; flex: 1; }
        .service-benefits li { font-size: 13px; color: #3a5040; padding: 6px 0; border-bottom: 1px solid rgba(0,0,0,0.06); padding-left: 20px; position: relative; }
        .service-benefits li::before { content: "✓"; color: #2D7A4F; font-weight: 700; position: absolute; left: 0; }
        .service-benefits li:last-child { border-bottom: none; }
        .service-btn { width: 100%; text-align: center; margin-top: auto; }
        @media (max-width: 900px) { .service-cards { grid-template-columns: 1fr; } }
      `}} />

      <section className="page-hero" style={{ background: 'linear-gradient(135deg,#1A3D2B 0%,#2D7A4F 60%,#4a9e6e 100%)' }}>
        <div className="container">
          <span className="section-label" style={{ color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.15)' }}>Our Services</span>
          <h1 className="page-hero-title" style={{ color: '#fff' }}>How We Can Help</h1>
          <p className="page-hero-subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>We are here to support you — from joining as an agent to educational visits to our production facility in Banjarnegara.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <span className="section-label">Services</span>
            <h2 className="section-title">What Can We Help You With?</h2>
            <p className="section-subtitle">Contact our team through one of the services below.</p>
          </div>
          <div className="service-cards">
            <div className="service-card">
              <div className="service-icon" style={{ background: '#e8f5ee' }}>🤝</div>
              <h3 className="service-title">Agent &amp; Reseller Info</h3>
              <p className="service-desc">Interested in becoming an agent or reseller of Rumah Mocaf products? Get complete information about the requirements, benefits, and how to join our distribution network across Indonesia.</p>
              <ul className="service-benefits">
                <li>Competitive margins for agents and resellers</li>
                <li>Marketing and promotional material support</li>
                <li>Product training and usage guidance</li>
                <li>Priority stock allocation and shipping</li>
              </ul>
              <a href="mailto:info@rumahmocaf.co.id" className="btn btn-primary service-btn">Contact Us →</a>
            </div>

            <div className="service-card">
              <div className="service-icon" style={{ background: '#fff4e6' }}>📣</div>
              <h3 className="service-title">Feedback &amp; Complaints</h3>
              <p className="service-desc">We are committed to delivering the best products and service. If you have a complaint or suggestion, our team is ready to listen and follow up on every input quickly and professionally.</p>
              <ul className="service-benefits">
                <li>Fast response within 1×24 hours</li>
                <li>Product complaint handling</li>
                <li>Feedback for quality improvement</li>
                <li>Customer satisfaction guarantee</li>
              </ul>
              <a href="mailto:info@rumahmocaf.co.id" className="btn btn-primary service-btn">Contact Our Team →</a>
            </div>

            <div className="service-card">
              <div className="service-icon" style={{ background: '#e8f0ff' }}>🏭</div>
              <h3 className="service-title">Visit &amp; Internship Info</h3>
              <p className="service-desc">Rumah Mocaf welcomes industrial visits and internship programs for students. Experience the full mocaf production process firsthand with our team in Banjarnegara, Central Java.</p>
              <ul className="service-benefits">
                <li>Industrial visits for schools &amp; universities</li>
                <li>Structured internship programs</li>
                <li>Direct mentoring from our production team</li>
                <li>Official certificate from Rumah Mocaf</li>
              </ul>
              <a href="mailto:info@rumahmocaf.co.id" className="btn btn-primary service-btn">Contact Admin →</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <span className="section-label">Contact</span>
            <h2 className="section-title">Get in Touch</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', padding: '28px 20px', background: '#fff', borderRadius: '14px', boxShadow: '0 1px 6px rgba(0,0,0,0.05)', border: '1.5px solid rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>✉️</div>
              <div style={{ fontWeight: 700, color: '#1A3D2B', marginBottom: '6px' }}>Email</div>
              <a href="mailto:info@rumahmocaf.co.id" style={{ fontSize: '13px', color: '#2D7A4F' }}>info@rumahmocaf.co.id</a>
            </div>
            <div style={{ textAlign: 'center', padding: '28px 20px', background: '#fff', borderRadius: '14px', boxShadow: '0 1px 6px rgba(0,0,0,0.05)', border: '1.5px solid rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📍</div>
              <div style={{ fontWeight: 700, color: '#1A3D2B', marginBottom: '6px' }}>Location</div>
              <div style={{ fontSize: '13px', color: '#7a9485' }}>Banjarnegara, Central Java, Indonesia</div>
            </div>
            <div style={{ textAlign: 'center', padding: '28px 20px', background: '#fff', borderRadius: '14px', boxShadow: '0 1px 6px rgba(0,0,0,0.05)', border: '1.5px solid rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🕐</div>
              <div style={{ fontWeight: 700, color: '#1A3D2B', marginBottom: '6px' }}>Office Hours</div>
              <div style={{ fontSize: '13px', color: '#7a9485' }}>Mon–Sat: 08:00–17:00 WIB</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2 className="section-title">Ready to Partner with Us?</h2>
          <p>Join the Rumah Mocaf ecosystem and be part of Indonesia's local food movement.</p>
          <div className="cta-actions">
            <Link href="/contact" className="btn btn-white">✉ Send Message</Link>
            <Link href="/products" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>View Products →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
