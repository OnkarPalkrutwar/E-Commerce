import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Send, Globe, Share2, MessageCircle, ShieldCheck, Truck, Headphones, RotateCcw } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Value Proposition Highlights */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          paddingBottom: '3rem',
          marginBottom: '3rem',
          borderBottom: '1px solid #1e293b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#1e293b', padding: '0.8rem', borderRadius: '12px', color: 'var(--primary-light)' }}>
              <Truck size={24} />
            </div>
            <div>
              <h5 style={{ color: '#fff', fontSize: '0.95rem' }}>Free Express Shipping</h5>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>On all orders over $100</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#1e293b', padding: '0.8rem', borderRadius: '12px', color: 'var(--primary-light)' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h5 style={{ color: '#fff', fontSize: '0.95rem' }}>Secure Checkout</h5>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>256-Bit Encrypted Payments</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#1e293b', padding: '0.8rem', borderRadius: '12px', color: 'var(--primary-light)' }}>
              <RotateCcw size={24} />
            </div>
            <div>
              <h5 style={{ color: '#fff', fontSize: '0.95rem' }}>30 Days Easy Return</h5>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Hassle-free money back guarantee</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#1e293b', padding: '0.8rem', borderRadius: '12px', color: 'var(--primary-light)' }}>
              <Headphones size={24} />
            </div>
            <div>
              <h5 style={{ color: '#fff', fontSize: '0.95rem' }}>24/7 Dedicated Support</h5>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Here whenever you need help</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="footer-grid">
          <div className="footer-col">
            <Link to="/" className="nav-brand" style={{ color: '#fff', marginBottom: '1rem', display: 'inline-flex' }}>
              <Sparkles size={26} style={{ color: 'var(--primary)' }} />
              Aura<span style={{ color: 'var(--primary-light)' }}>Market</span>
            </Link>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '320px', marginBottom: '1.5rem' }}>
              Your premium destination for curated electronics, designer fashion, sleek accessories, and contemporary home decor.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#website" className="icon-btn" style={{ background: '#1e293b', color: '#fff' }}><Globe size={18} /></a>
              <a href="#share" className="icon-btn" style={{ background: '#1e293b', color: '#fff' }}><Share2 size={18} /></a>
              <a href="#community" className="icon-btn" style={{ background: '#1e293b', color: '#fff' }}><MessageCircle size={18} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home Page</Link></li>
              <li><Link to="/shop">Shop Catalog</Link></li>
              <li><Link to="/shop?category=Electronics">Electronics</Link></li>
              <li><Link to="/shop?category=Fashion">Fashion & Apparel</Link></li>
              <li><Link to="/cart">My Cart</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Customer Service</h4>
            <ul className="footer-links">
              <li><a href="#orders">Track Order</a></li>
              <li><a href="#returns">Returns & Exchanges</a></li>
              <li><a href="#shipping">Shipping Policy</a></li>
              <li><a href="#privacy">Privacy & Terms</a></li>
              <li><a href="#faq">Help Center</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Join Our Newsletter</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Subscribe to get $15 off your first order and exclusive access to new product drops.
            </p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email..." required />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 1rem' }}>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} AuraMarket Inc. All rights reserved.</p>
          <p style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookies</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
