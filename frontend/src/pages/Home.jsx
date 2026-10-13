import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Flame, Footprints, ShieldCheck, Sparkles, Shirt } from 'lucide-react';
import { products, mainCategories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const navigate = useNavigate();

  const trendingSneakers = products.filter((p) => p.category === 'Sneakers' || p.category === 'Running Shoes').slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <div className="container" style={{ paddingTop: '1rem' }}>
      {/* Redesigned UrbanStep Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="badge badge-orange" style={{ marginBottom: '1.2rem', padding: '0.4rem 0.8rem' }}>
            <Flame size={14} /> New Fall/Winter Drop 2026
          </span>
          <h1>
            Step Into <span>Streetwear & Footwear</span> Excellence
          </h1>
          <p>
            Explore high-performance sneakers, heavyweight hoodies, tailored denim, and premium athletic accessories designed for modern urban fashion.
          </p>
          <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/shop?gender=Men')}>
              Shop Men <ArrowRight size={20} />
            </button>
            <button className="btn btn-dark btn-lg" onClick={() => navigate('/shop?gender=Women')}>
              Shop Women
            </button>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80"
            alt="UrbanStep High Top Sneakers"
          />
        </div>
      </section>

      {/* Shop by Gender Spotlight Cards */}
      <section style={{ margin: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ color: 'var(--accent-orange)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Curated Collections
          </span>
          <h2 style={{ fontSize: '2.4rem', marginTop: '0.3rem' }}>Shop By Gender</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Men's Card */}
          <div
            onClick={() => navigate('/shop?gender=Men')}
            style={{
              position: 'relative',
              height: '320px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
              alt="Men's Fashion"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.1) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2rem',
                color: '#ffffff'
              }}
            >
              <h3 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.4rem' }}>Men's Collection</h3>
              <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>Sneakers, Hoodies, Jackets & Denim</p>
              <span className="btn btn-primary btn-sm" style={{ width: 'fit-content' }}>
                Explore Men <ArrowRight size={16} />
              </span>
            </div>
          </div>

          {/* Women's Card */}
          <div
            onClick={() => navigate('/shop?gender=Women')}
            style={{
              position: 'relative',
              height: '320px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
              alt="Women's Fashion"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.1) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2rem',
                color: '#ffffff'
              }}
            >
              <h3 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.4rem' }}>Women's Collection</h3>
              <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>Platform Kicks, Active Tops & Cropped Jackets</p>
              <span className="btn btn-primary btn-sm" style={{ width: 'fit-content' }}>
                Explore Women <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section style={{ margin: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ color: 'var(--text-muted)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Browse Departments
          </span>
          <h2 style={{ fontSize: '2.4rem', marginTop: '0.3rem' }}>Shop By Category</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {mainCategories.filter(c => c.name !== 'All').map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
              style={{
                position: 'relative',
                height: '240px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.2) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.5rem',
                  color: '#ffffff'
                }}
              >
                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.2rem' }}>{cat.name}</h3>
                <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{cat.count} Items</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Sneakers Section */}
      <section style={{ margin: '4rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <span style={{ color: 'var(--accent-orange)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Footwear Spotlight
            </span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '0.3rem' }}>Trending Sneakers & Kicks</h2>
          </div>
          <Link to="/shop?category=Shoes" className="btn btn-outline">
            View All Shoes <ArrowRight size={16} />
          </Link>
        </div>

        <div className="product-grid">
          {trendingSneakers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Seasonal Sale Promotional Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '3.5rem 3rem',
          color: '#ffffff',
          margin: '5rem 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          alignItems: 'center',
          gap: '2.5rem',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid #334155'
        }}
      >
        <div>
          <span className="badge badge-orange" style={{ marginBottom: '1rem', padding: '0.4rem 0.8rem' }}>
            <Flame size={14} /> Seasonal Clearance
          </span>
          <h2 style={{ fontSize: '2.8rem', color: '#fff', marginBottom: '1rem', textTransform: 'uppercase' }}>
            Flat 20% Off Sneakers & Apparel
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', marginBottom: '1.8rem' }}>
            Upgrade your rotation with code <strong style={{ color: 'var(--accent-orange)', background: 'rgba(255,87,34,0.15)', padding: '0.3rem 0.7rem', borderRadius: '4px', border: '1px solid var(--accent-orange)' }}>URBAN20</strong>. Free shipping included on orders over $100.
          </p>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/shop?sale=true')}>
            Shop Sale Items Now <ArrowRight size={20} />
          </button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
            alt="Sneakers Sale"
            style={{
              maxHeight: '280px',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              transform: 'rotate(-3deg)'
            }}
          />
        </div>
      </section>

      {/* Best Sellers Section */}
      <section style={{ margin: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ color: 'var(--accent-emerald)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Top Rated Gear
          </span>
          <h2 style={{ fontSize: '2.4rem', marginTop: '0.3rem' }}>Best Sellers</h2>
        </div>

        <div className="product-grid">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
