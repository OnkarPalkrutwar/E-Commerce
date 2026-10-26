import React from 'react';
import { X, Download, Printer, CheckCircle2, ShieldCheck, Footprints } from 'lucide-react';
import { downloadReceiptPDF, printReceipt, formatReceiptData } from '../utils/receiptGenerator';

export default function ReceiptModal({ isOpen, onClose, order, user }) {
  if (!isOpen || !order) return null;

  const data = formatReceiptData(order, user);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--bg-primary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Footprints size={22} style={{ color: 'var(--accent-orange)' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>UrbanStep Order Receipt</h3>
          </div>
          <button
            onClick={onClose}
            className="icon-btn"
            style={{ width: '34px', height: '34px', border: 'none', background: 'transparent' }}
            title="Close Receipt"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Receipt Content */}
        <div style={{ padding: '1.75rem', overflowY: 'auto', flex: 1 }}>
          {/* Order Header Badge */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              paddingBottom: '1.25rem',
              borderBottom: '1px dashed var(--border-color)',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Invoice Number
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-orange)' }}>
                #{data.orderId}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Issued on {data.date}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: '#d1fae5',
                  color: '#065f46',
                  fontSize: '0.82rem',
                  fontWeight: 800
                }}
              >
                <CheckCircle2 size={14} /> {data.paymentStatus}
              </span>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                Method: <strong>{data.paymentMethod}</strong>
              </p>
            </div>
          </div>

          {/* Customer & Shipping Summary */}
          <div
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius-md)',
              padding: '1.2rem',
              border: '1px solid var(--border-color)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              marginBottom: '1.5rem',
              fontSize: '0.88rem'
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Billed & Shipped To:
              </span>
              <p style={{ fontWeight: 700, marginTop: '4px', color: 'var(--text-main)' }}>
                {data.customer.fullName}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                {data.customer.street}<br />
                {data.customer.city}, {data.customer.zipCode} {data.customer.country}
              </p>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Contact & Delivery:
              </span>
              <p style={{ color: 'var(--text-main)', marginTop: '4px' }}>
                Email: <strong>{data.customer.email}</strong>
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                Phone: {data.customer.phone}
              </p>
              <p style={{ color: '#10b981', fontSize: '0.82rem', fontWeight: 700, marginTop: '2px' }}>
                Fulfillment: Express Doorstep Delivery
              </p>
            </div>
          </div>

          {/* Purchased Items Table */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Purchased Items ({data.items.reduce((s, i) => s + i.quantity, 0)})
            </h4>
            <div
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden'
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-muted)' }}>Product</th>
                    <th style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-muted)' }}>Variant</th>
                    <th style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-muted)', textAlign: 'center' }}>Qty</th>
                    <th style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-muted)', textAlign: 'right' }}>Price</th>
                    <th style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-muted)', textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>
                        {item.name}
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>SKU: {item.sku}</div>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>
                        {item.size} • {item.color}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center', fontWeight: 700 }}>
                        {item.quantity}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'right', color: 'var(--text-muted)' }}>
                        ${item.unitPrice.toFixed(2)}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 800 }}>
                        ${item.totalPrice.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '1.5rem'
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '300px',
                backgroundColor: 'var(--bg-primary)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                fontSize: '0.88rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                <span>Subtotal:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>${data.financials.subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                <span>Shipping:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                  {data.financials.shippingFee === 0 ? 'FREE' : `$${data.financials.shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                <span>Estimated Tax (8%):</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>${data.financials.tax.toFixed(2)}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '0.6rem',
                  borderTop: '1px solid var(--border-color)',
                  fontSize: '1.1rem',
                  fontWeight: 900
                }}
              >
                <span>Total Paid:</span>
                <span style={{ color: 'var(--accent-orange)' }}>${data.financials.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              backgroundColor: '#ecfdf5',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid #a7f3d0'
            }}
          >
            <ShieldCheck size={18} color="#059669" />
            <span>Eligible for 30-day free returns & exchange at any UrbanStep outlet.</span>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--bg-primary)',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          <button className="btn btn-secondary" onClick={onClose} style={{ padding: '0.6rem 1.25rem' }}>
            Close
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              className="btn btn-secondary"
              onClick={() => printReceipt(order, user)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.25rem' }}
            >
              <Printer size={16} /> Print Receipt
            </button>
            <button
              className="btn btn-primary"
              onClick={() => downloadReceiptPDF(order, user)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.35rem' }}
            >
              <Download size={16} /> Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
