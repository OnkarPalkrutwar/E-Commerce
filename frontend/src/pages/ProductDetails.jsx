import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  ShoppingBag,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Ruler,
  X,
  RefreshCw
} from 'lucide-react';
import { products as fallbackProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import api from '../services/api';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    api.getProductById(id)
      .then((data) => {
        if (isMounted && data && data._id) {
          setProduct({
            ...data,
            id: data._id,
            rating: data.rating || 4.8,
            reviewsCount: data.reviewsCount || 45
          });
          setLoading(false);
        }
      })
      .catch(() => {
        // Fallback search in static products
        if (isMounted) {
          const match = fallbackProducts.find((p) => p.id === id || p.slug === id);
          setProduct(match || null);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>
          <RefreshCw size={36} color="var(--accent-orange)" />
        </div>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading product details from MongoDB...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}
        >
          <AlertCircle size={40} />
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Product Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          The requested fashion item is unavailable or invalid.
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/shop')}>
          <ArrowLeft size={18} /> Back to Catalog
        </button>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const imagesList = product.images || [product.image];
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize && product.availableSizes && product.availableSizes.length > 0) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    const color = selectedColor || (product.availableColors ? product.availableColors[0] : 'Default');
    addToCart(product, selectedSize, color, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize && product.availableSizes && product.availableSizes.length > 0) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    const color = selectedColor || (product.availableColors ? product.availableColors[0] : 'Default');
    addToCart(product, selectedSize, color, quantity);
    navigate('/cart');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary"
        style={{ marginBottom: '2rem', display: 'inline-flex' }}
      >
        <ArrowLeft size={18} /> Back to Catalog
      </button>

      {/* Main Details Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'start',
          backgroundColor: 'var(--bg-surface)',
          padding: '2.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        {/* Left Image Gallery Column */}
        <div>
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            {product.badge && (
              <span
                className="badge badge-orange"
                style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 2, padding: '0.4rem 0.8rem' }}
              >
                {product.badge}
              </span>
            )}
            <img
              src={imagesList[selectedImageIndex]}
              alt={product.name}
              style={{
                width: '100%',
                maxHeight: '520px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-md)'
              }}
            />
          </div>

          {/* Thumbnails */}
          {imagesList.length > 1 && (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {imagesList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: selectedImageIndex === idx ? '2px solid var(--accent-orange)' : '1px solid var(--border-color)'
                  }}
                >
                  <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Info & Selectors Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-orange)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {product.brand}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Gender: {product.gender}</span>
          </div>

          <h1 style={{ fontSize: '2.4rem', marginBottom: '0.8rem' }}>{product.name}</h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'} color="#f59e0b" />
              ))}
            </div>
            <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{product.rating}</span>
            <span style={{ color: 'var(--text-muted)' }}>({product.reviewsCount} customer reviews)</span>
          </div>

          {/* Price Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
              marginBottom: '1.5rem',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid var(--border-color)'
            }}
          >
            <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <>
                <span style={{ fontSize: '1.3rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="badge badge-emerald">Save {discountPercent}%</span>
              </>
            )}
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
            {product.description}
          </p>

          {/* Size Selector */}
          {product.availableSizes && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                  Select Size {product.mainCategory === 'Shoes' ? '(UK Sizing)' : ''} *
                </span>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  style={{ color: 'var(--accent-orange)', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <Ruler size={16} /> Size Guide
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`size-pill ${selectedSize === size ? 'active' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {sizeError && (
                <p style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.85rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <AlertCircle size={16} /> Please select a size before adding to cart.
                </p>
              )}
            </div>
          )}

          {/* Color Selector */}
          {product.availableColors && (
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ display: 'block', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                Color: {selectedColor || product.availableColors[0]}
              </span>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {product.availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: (selectedColor || product.availableColors[0]) === color ? '2px solid var(--accent-orange)' : '1px solid var(--border-color)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      backgroundColor: 'var(--bg-primary)'
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                backgroundColor: 'var(--bg-primary)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)'
              }}
            >
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} style={{ color: 'var(--text-muted)' }}>
                <Minus size={18} />
              </button>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', minWidth: '30px', textAlign: 'center' }}>
                {quantity}
              </span>
              <button onClick={() => setQuantity((q) => q + 1)} style={{ color: 'var(--text-muted)' }}>
                <Plus size={18} />
              </button>
            </div>

            <button className="btn btn-primary btn-lg" onClick={handleAddToCart} style={{ flex: 1 }}>
              <ShoppingBag size={20} /> Add to Cart
            </button>

            <button
              className="btn btn-secondary btn-lg"
              onClick={() => toggleWishlist(product)}
              style={{ color: wishlisted ? '#ef4444' : 'currentColor' }}
              title="Wishlist"
            >
              <Heart size={20} fill={wishlisted ? '#ef4444' : 'none'} />
            </button>
          </div>

          <button className="btn btn-dark btn-lg" onClick={handleBuyNow} style={{ width: '100%', marginBottom: '2rem' }}>
            Buy Now
          </button>

          {/* Guarantees */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-color)',
              fontSize: '0.85rem',
              color: 'var(--text-muted)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={18} color="var(--accent-orange)" /> Free Shipping over $100
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <RotateCcw size={18} color="var(--accent-orange)" /> 30-Day Hassle Free Returns
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal Popup */}
      {showSizeGuide && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '540px',
              width: '100%',
              padding: '2rem',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem' }}>
                {product.mainCategory === 'Shoes' ? 'Shoe Size Conversion Chart' : 'Clothing Size Chart'}
              </h3>
              <button onClick={() => setShowSizeGuide(false)}>
                <X size={20} />
              </button>
            </div>

            {product.mainCategory === 'Shoes' ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-primary)', borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: '0.6rem' }}>UK Size</th>
                    <th style={{ padding: '0.6rem' }}>US Men</th>
                    <th style={{ padding: '0.6rem' }}>EU Size</th>
                    <th style={{ padding: '0.6rem' }}>Foot Length (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: '0.6rem', borderBottom: '1px solid var(--border-color)' }}>UK 6</td><td>US 7</td><td>EU 40</td><td>24.5 cm</td></tr>
                  <tr><td style={{ padding: '0.6rem', borderBottom: '1px solid var(--border-color)' }}>UK 7</td><td>US 8</td><td>EU 41</td><td>25.5 cm</td></tr>
                  <tr><td style={{ padding: '0.6rem', borderBottom: '1px solid var(--border-color)' }}>UK 8</td><td>US 9</td><td>EU 42.5</td><td>26.5 cm</td></tr>
                  <tr><td style={{ padding: '0.6rem', borderBottom: '1px solid var(--border-color)' }}>UK 9</td><td>US 10</td><td>EU 44</td><td>27.5 cm</td></tr>
                  <tr><td style={{ padding: '0.6rem' }}>UK 10</td><td>US 11</td><td>EU 45</td><td>28.5 cm</td></tr>
                </tbody>
              </table>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-primary)', borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: '0.6rem' }}>Size</th>
                    <th style={{ padding: '0.6rem' }}>Chest (in)</th>
                    <th style={{ padding: '0.6rem' }}>Waist (in)</th>
                    <th style={{ padding: '0.6rem' }}>Fit Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: '0.6rem', borderBottom: '1px solid var(--border-color)' }}>S</td><td>36 - 38"</td><td>30 - 32"</td><td>Slim Fit</td></tr>
                  <tr><td style={{ padding: '0.6rem', borderBottom: '1px solid var(--border-color)' }}>M</td><td>38 - 40"</td><td>32 - 34"</td><td>Regular Fit</td></tr>
                  <tr><td style={{ padding: '0.6rem', borderBottom: '1px solid var(--border-color)' }}>L</td><td>40 - 42"</td><td>34 - 36"</td><td>Relaxed Fit</td></tr>
                  <tr><td style={{ padding: '0.6rem' }}>XL</td><td>42 - 44"</td><td>36 - 38"</td><td>Oversized</td></tr>
                </tbody>
              </table>
            )}

            <button className="btn btn-dark" style={{ width: '100%', marginTop: '1.5rem' }} onClick={() => setShowSizeGuide(false)}>
              Got It
            </button>
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: '5rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>You Might Also Like</h2>
          <div className="product-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
