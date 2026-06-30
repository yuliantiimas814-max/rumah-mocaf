import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <img src="/images/logo rumah mocaf.png" alt="Rumah Mocaf" style={{ height: '72px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <p className="footer-tagline">Empowering Cassava Farmers, Producing Quality Mocaf Flour.</p>
            <p className="footer-tagline" style={{ fontSize: '13px' }}>Founded 2017 · Banjarnegara, Jawa Tengah, Indonesia.</p>
            <div className="social-links">
              <a href="#" className="social-link" title="Facebook">f</a>
              <a href="#" className="social-link" title="YouTube">▶</a>
              <a href="#" className="social-link" title="LinkedIn">in</a>
              <a href="#" className="social-link" title="Instagram">◉</a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Navigation</div>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">Who We Are</Link></li>
              <li><Link href="/ecosystem">Ecosystem</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/sustainability">Sustainability</Link></li>
              <li><Link href="/news">News &amp; Insights</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Products</div>
            <ul className="footer-links">
              <li><Link href="/products">Mocaf Flour (Mocafine)</Link></li>
              <li><Link href="/products">BerryFil &amp; Chocofine Cookies</Link></li>
              <li><Link href="/products">Lasti Bread Premix</Link></li>
              <li><Link href="/products">Fried Chicken Flour</Link></li>
              <li><Link href="/products">Asoned &amp; Master Bread (B2B)</Link></li>
              <li><Link href="/products">Garva Cassava Oil</Link></li>
              <li><a href="https://mocafine.com" target="_blank" rel="noopener noreferrer" className="external" style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>Shop Online — mocafine.com</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Contact</div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">✉</div>
              <div className="footer-contact-text"><a href="mailto:info@rumahmocaf.co.id" style={{ color: 'rgba(255,255,255,0.65)' }}>info@rumahmocaf.co.id</a></div>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">💬</div>
              <div className="footer-contact-text"><a href="https://wa.me/6281234567890" style={{ color: 'rgba(255,255,255,0.65)' }}>WhatsApp — Click to Chat</a></div>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">📍</div>
              <div className="footer-contact-text">Banjarnegara, Central Java,<br />Indonesia</div>
            </div>
            <div className="footer-newsletter">
              <p>Stay updated with our latest news</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email address" />
                <button>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2017–2025 Rumah Mocaf Indonesia. All rights reserved.</div>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
