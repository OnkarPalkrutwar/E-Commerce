import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, moveToCart } = useCart();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}
        >
          <Heart size={44} />
        </div>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Your Wishlist is Empty</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem', maxWidth: '420px', margin: '0 auto 2rem auto' }}>
          Save your favorite sneakers, jackets, and accessories by clicking the heart icon on any product card!
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/shop')}>
          Explore Trending Collection <ArrowRight size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.4rem' }}>My Saved Wishlist</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          You have <strong style={{ color: 'var(--text-main)' }}>{wishlist.length}</strong> saved items
        </p>
      </div>

      <div className="product-grid">
        {wishlist.map((product) => {
          const img = product.images ? product.images[0] : product.image;
          const defaultSize = product.availableSizes ? product.availableSizes[0] : 'Standard';
          const defaultColor = product.availableColors ? product.availableColors[0] : 'Default';

          return (
            <div
              key={product.id}
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden' }}>
                <img
                  src={img}
                  alt={product.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    color: '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2
                  }}
                  title="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {product.brand}
                </span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.3rem 0 0.5rem 0' }}>
                  <Link to={`/product/${product.id}`} style={{ color: 'var(--text-main)' }}>
                    {product.name}
                  </Link>
                </h3>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
                  ${product.price.toFixed(2)}
                </span>

                <button
                  className="btn btn-primary"
                  style={{ marginTop: 'auto', width: '100%' }}
                  onClick={() => moveToCart(product, defaultSize, defaultColor)}
                >
                  <ShoppingBag size={18} /> Move to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
