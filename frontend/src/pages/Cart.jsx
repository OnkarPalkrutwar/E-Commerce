import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ArrowLeft, Trash2, Tag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

export default function Cart() {
  const { cart, clearCart, totalItems, subtotal, shippingFee, tax, totalPrice } = useCart();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState({ text: '', type: '' });

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'URBAN20') {
      setAppliedDiscount(subtotal * 0.2);
      setPromoMessage({ text: 'Promo code URBAN20 applied! (20% Off)', type: 'success' });
    } else if (code === 'FREESHIP') {
      setAppliedDiscount(shippingFee);
      setPromoMessage({ text: 'Free shipping promo code applied!', type: 'success' });
    } else {
      setAppliedDiscount(0);
      setPromoMessage({ text: 'Invalid promo code. Try "URBAN20"', type: 'error' });
    }
  };

  const finalGrandTotal = Math.max(0, totalPrice - appliedDiscount);

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--accent-orange)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}
        >
          <ShoppingBag size={44} />
        </div>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Your Shopping Cart is Empty</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem', maxWidth: '420px', margin: '0 auto 2rem auto' }}>
          Explore our streetwear, sneakers, hoodies, and accessories to find your fit!
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/shop')}>
          Start Shopping <ArrowRight size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      {/* Title Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.4rem' }}>Shopping Bag</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            You have <strong style={{ color: 'var(--text-main)' }}>{totalItems}</strong> items in your bag
          </p>
        </div>
        <button
          onClick={clearCart}
          style={{
            color: '#ef4444',
            fontWeight: 700,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <Trash2 size={16} /> Empty Bag
        </button>
      </div>

      {/* Main Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start'
        }}
      >
        {/* Cart Item Column */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem 2rem',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {cart.map((item) => (
            <CartItem key={item.itemKey} item={item} />
          ))}

          <div style={{ paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/shop" className="btn btn-secondary">
              <ArrowLeft size={18} /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Column */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)',
            position: 'sticky',
            top: '100px'
          }}
        >
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
            Order Summary
          </h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: 'var(--text-muted)' }}>
            <span>Subtotal ({totalItems} items)</span>
            <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>${subtotal.toFixed(2)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: 'var(--text-muted)' }}>
            <span>Estimated Shipping</span>
            <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>
              {shippingFee === 0 ? <span style={{ color: '#10b981' }}>FREE</span> : `$${shippingFee.toFixed(2)}`}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: 'var(--text-muted)' }}>
            <span>Estimated Tax (8%)</span>
            <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>${tax.toFixed(2)}</span>
          </div>

          {appliedDiscount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: '#10b981', fontWeight: 800 }}>
              <span>Promo Discount</span>
              <span>-${appliedDiscount.toFixed(2)}</span>
            </div>
          )}

          {/* Promo Code Form */}
          <form onSubmit={handleApplyPromo} style={{ margin: '1.5rem 0', display: 'flex', gap: '0.5rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Tag size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Promo code (e.g. URBAN20)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.6rem 0.6rem 2.2rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  textTransform: 'uppercase',
                  fontSize: '0.85rem'
                }}
              />
            </div>
            <button type="submit" className="btn btn-secondary btn-sm">
              Apply
            </button>
          </form>

          {promoMessage.text && (
            <p style={{ fontSize: '0.82rem', marginBottom: '1rem', color: promoMessage.type === 'success' ? '#10b981' : '#ef4444', fontWeight: 700 }}>
              {promoMessage.text}
            </p>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingTop: '1rem',
              marginTop: '1rem',
              borderTop: '2px solid var(--border-color)',
              marginBottom: '1.5rem'
            }}
          >
            <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>Total</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-orange)' }}>
              ${finalGrandTotal.toFixed(2)}
            </span>
          </div>

          <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => navigate('/checkout')}>
            Proceed to Checkout <ArrowRight size={20} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <ShieldCheck size={16} color="var(--accent-emerald)" /> 256-Bit Encrypted SSL Checkout
          </div>
        </div>
      </div>
    </div>
  );
}
