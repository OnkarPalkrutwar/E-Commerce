import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { itemKey, product, size, color, quantity } = item;

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(itemKey, quantity - 1);
    } else {
      removeFromCart(itemKey);
    }
  };

  const handleIncrease = () => {
    updateQuantity(itemKey, quantity + 1);
  };

  const img = product.images ? product.images[0] : product.image;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '85px 1fr auto auto',
        gap: '1.25rem',
        alignItems: 'center',
        padding: '1.25rem 0',
        borderBottom: '1px solid var(--border-color)'
      }}
    >
      {/* Thumbnail */}
      <Link to={`/product/${product.id}`} style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
        <img
          src={img}
          alt={product.name}
          style={{ width: '85px', height: '85px', objectFit: 'cover', display: 'block' }}
        />
      </Link>

      {/* Item Details */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {product.brand}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>• {product.category}</span>
        </div>

        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>
          <Link to={`/product/${product.id}`} style={{ color: 'var(--text-main)' }}>
            {product.name}
          </Link>
        </h4>

        {/* Selected Variant Badges */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              backgroundColor: 'var(--bg-primary)',
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)'
            }}
          >
            Size: {size}
          </span>
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              backgroundColor: 'var(--bg-primary)',
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)'
            }}
          >
            Color: {color}
          </span>
        </div>
      </div>

      {/* Quantity Selector */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--bg-primary)',
          padding: '0.35rem 0.6rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}
      >
        <button onClick={handleDecrease} style={{ color: 'var(--text-muted)' }} title="Decrease">
          <Minus size={16} />
        </button>
        <span style={{ fontWeight: 800, minWidth: '24px', textAlign: 'center' }}>
          {quantity}
        </span>
        <button onClick={handleIncrease} style={{ color: 'var(--text-muted)' }} title="Increase">
          <Plus size={16} />
        </button>
      </div>

      {/* Item Price & Remove */}
      <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
          ${(product.price * quantity).toFixed(2)}
        </span>
        <button
          onClick={() => removeFromCart(itemKey)}
          style={{ color: '#ef4444', padding: '0.4rem' }}
          title="Remove item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
