import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedAnim, setAddedAnim] = useState(false);
  const navigate = useNavigate();

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Default to first available size
    const defaultSize = product.availableSizes ? product.availableSizes[0] : 'Standard';
    const defaultColor = product.availableColors ? product.availableColors[0] : 'Default';
    addToCart(product, defaultSize, defaultColor, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const primaryImg = product.images ? product.images[0] : product.image;
  const secondaryImg = product.images && product.images[1] ? product.images[1] : primaryImg;

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      {/* Image Container */}
      <div className="card-image-container">
        {product.badge && (
          <span
            className={`badge card-badge ${
              product.badge === 'Best Seller'
                ? 'badge-orange'
                : product.badge === 'New Arrival'
                ? 'badge-primary'
                : 'badge-emerald'
            }`}
            style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 3 }}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Heart Toggle */}
        <button
          className={`card-wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={18} fill={wishlisted ? '#ef4444' : 'none'} color={wishlisted ? '#ef4444' : 'currentColor'} />
        </button>

        {/* Primary & Secondary Images */}
        <img src={primaryImg} alt={product.name} className="card-img-primary" loading="lazy" />
        <img src={secondaryImg} alt={`${product.name} alternate view`} className="card-img-secondary" loading="lazy" />
      </div>

      {/* Card Body */}
      <div className="card-body" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
          <span className="card-brand">{product.brand}</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)' }}>{product.gender}</span>
        </div>

        <h3 className="card-title" title={product.name} style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', height: '2.8rem' }}>
          {product.name}
        </h3>

        {/* Rating Stars */}
        <div className="card-rating" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', marginBottom: '0.8rem', color: 'var(--text-muted)' }}>
          <div className="stars" style={{ display: 'flex', color: '#f59e0b' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'} color="#f59e0b" />
            ))}
          </div>
          <span>
            {product.rating} ({product.reviewsCount})
          </span>
        </div>

        {/* Color swatches count indicator */}
        {product.availableColors && (
          <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.8rem', alignItems: 'center' }}>
            {product.availableColors.slice(0, 3).map((col, idx) => (
              <span
                key={idx}
                title={col}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: '1px solid #cbd5e1',
                  backgroundColor: col.toLowerCase().includes('black') ? '#000' : col.toLowerCase().includes('white') ? '#fff' : col.toLowerCase().includes('red') ? '#ef4444' : col.toLowerCase().includes('blue') ? '#3b82f6' : '#94a3b8'
                }}
              />
            ))}
            {product.availableColors.length > 3 && (
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                +{product.availableColors.length - 3} colors
              </span>
            )}
          </div>
        )}

        {/* Price & Add to Cart button */}
        <div className="card-footer" style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="price-box">
            <span className="current-price" style={{ fontSize: '1.2rem', fontWeight: 800 }}>${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span className="original-price" style={{ fontSize: '0.82rem', textDecoration: 'line-through', color: 'var(--text-light)' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 800 }}>
                  -{discountPercent}%
                </span>
              </div>
            )}
          </div>

          <button
            className={`btn btn-sm ${addedAnim ? 'btn-dark' : 'btn-primary'}`}
            onClick={handleAddToCart}
            title="Add to Cart"
          >
            {addedAnim ? (
              <>
                <Check size={16} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={16} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
