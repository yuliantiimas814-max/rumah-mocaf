'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Products', href: '/products' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'News', href: '/news' },
];

export default function Navbar() {
  const pathname = usePathname();

  useEffect(() => {
    // Navbar scroll shadow
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
      if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    // Run once on mount to set initial state
    handleScroll();

    // Hamburger toggle
    const hamburger = document.getElementById('hamburger');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const handleHamburger = () => {
      if (mobileDrawer) mobileDrawer.classList.toggle('open');
    };
    if (hamburger) hamburger.addEventListener('click', handleHamburger);

    const drawerLinks = document.querySelectorAll('.mobile-drawer a');
    const closeDrawer = () => {
      if (mobileDrawer) mobileDrawer.classList.remove('open');
    };
    drawerLinks.forEach((link) => link.addEventListener('click', closeDrawer));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hamburger) hamburger.removeEventListener('click', handleHamburger);
      drawerLinks.forEach((link) => link.removeEventListener('click', closeDrawer));
    };
  }, []);

  return (
    <>
      <nav className="navbar" id="navbar">
        <div className="container">
          <div className="navbar-inner">
            <Link href="/" className="navbar-logo">
              <img src="/images/logo rumah mocaf.png" alt="Rumah Mocaf Indonesia" style={{ height: '62px', width: 'auto' }} />
            </Link>
            <ul className="navbar-menu">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={pathname === link.href ? 'active' : ''}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="navbar-actions">
              <Link href="/contact" className="btn btn-outline btn-sm">Contact Us</Link>
              <a href="https://mocafine.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Shop</a>
              <button className="hamburger" id="hamburger" aria-label="Menu">
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="mobile-drawer" id="mobileDrawer">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>{link.label}</Link>
        ))}
        <div className="mobile-drawer-actions">
          <Link href="/contact" className="btn btn-outline">Contact Us</Link>
          <a href="https://mocafine.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Shop</a>
        </div>
      </div>
    </>
  );
}
