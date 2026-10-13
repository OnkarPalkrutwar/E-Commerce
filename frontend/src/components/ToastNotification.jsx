import React from 'react';
import { ShoppingBag, CheckCircle, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ToastNotification() {
  const { toast, hideToast } = useCart();

  if (!toast.show) return null;

  return (
    <div className="toast-container">
      <div className="toast-box">
        {toast.product?.image ? (
          <img src={toast.product.image} alt={toast.product.name} className="toast-img" />
        ) : (
          <CheckCircle size={28} color="#10b981" />
        )}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontSize: '0.85rem', fontWeight: 700 }}>
            <CheckCircle size={14} /> Item Added to Cart!
          </div>
          <div style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 600, marginTop: '2px' }}>
            {toast.product?.name || toast.message}
          </div>
        </div>
        <button onClick={hideToast} style={{ color: '#94a3b8', marginLeft: '0.5rem' }}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
