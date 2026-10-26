import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle2, AlertCircle, ArrowRight, Truck, RefreshCw, Download, FileText } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { downloadReceiptPDF } from '../utils/receiptGenerator';
import ReceiptModal from '../components/ReceiptModal';

export default function Orders() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState(null);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/orders' } } });
      return;
    }

    fetchOrders();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getMyOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>
          <RefreshCw size={36} color="var(--accent-orange)" />
        </div>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading your order history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}
        >
          <AlertCircle size={36} />
        </div>
        <h2>Unable to Load Orders</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{error}</p>
        <button className="btn btn-primary" onClick={fetchOrders}>
          Try Again
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
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
          <Package size={44} />
        </div>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>No Orders Found</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem' }}>
          You haven't placed any orders yet. Start exploring our collection!
        </p>
        <Link to="/shop" className="btn btn-primary btn-lg">
          Start Shopping <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 5rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.4rem' }}>My Order History</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          View status and details of your previous UrbanStep orders.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {orders.map((order) => {
          const dateFormatted = new Date(order.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });

          return (
            <div
              key={order._id}
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {/* Order Card Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--border-color)',
                  marginBottom: '1.25rem',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Order ID:
                  </span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>#{order._id.slice(-8).toUpperCase()}</h4>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Placed On:</span>
                    <p style={{ fontSize: '0.9rem', fontWeight: 700 }}>{dateFormatted}</p>
                  </div>

                  <span
                    className={`badge ${
                      order.orderStatus === 'delivered'
                        ? 'badge-emerald'
                        : order.orderStatus === 'shipped'
                        ? 'badge-primary'
                        : 'badge-orange'
                    }`}
                  >
                    {order.orderStatus.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Order Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {order.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h5 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.2rem' }}>{item.name}</h5>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        SKU: {item.sku} | Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                      </span>
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Footer & Actions */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '1.25rem',
                  borderTop: '1px dashed var(--border-color)',
                  fontSize: '0.9rem',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Payment: </span>
                  <strong style={{ textTransform: 'uppercase' }}>{order.paymentMethod}</strong>
                  <span style={{ marginLeft: '0.5rem', color: order.paymentStatus === 'paid' ? '#10b981' : '#f59e0b', fontWeight: 700 }}>
                    ({order.paymentStatus})
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Total Amount: </span>
                    <strong style={{ fontSize: '1.2rem', color: 'var(--accent-orange)' }}>
                      ${order.totalAmount.toFixed(2)}
                    </strong>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => {
                        setSelectedReceiptOrder(order);
                        setReceiptModalOpen(true);
                      }}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
                    >
                      <FileText size={15} /> View Bill
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={() => downloadReceiptPDF(order, user)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
                    >
                      <Download size={15} /> Receipt PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ReceiptModal
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        order={selectedReceiptOrder}
        user={user}
      />
    </div>
  );
}
