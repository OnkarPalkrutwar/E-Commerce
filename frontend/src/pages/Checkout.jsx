import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { ShieldCheck, CheckCircle2, CreditCard, Wallet, Truck, Download, FileText, Printer } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../services/api';
import { downloadReceiptPDF } from '../utils/receiptGenerator';
import ReceiptModal from '../components/ReceiptModal';

export default function Checkout() {
  const { cart, clearCart, totalItems, subtotal, shippingFee, tax, totalPrice } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExp: '',
    cardCvc: ''
  });

  const [errors, setErrors] = useState({});
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 7)
      newErrors.phone = 'Valid phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Shipping address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardExp.trim()) newErrors.cardExp = 'Expiry date is required';
      if (!formData.cardCvc.trim()) newErrors.cardCvc = 'CVC code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const shippingAddress = {
        fullName: formData.fullName,
        street: formData.address,
        city: formData.city,
        state: '',
        postalCode: formData.zipCode,
        country: 'USA'
      };

      const orderItems = cart.map((item) => ({
        productId: item.product.id || item.product._id,
        name: item.product.name,
        sku: item.itemKey || `${item.product.slug || 'prod'}-${item.size}-${item.color}`,
        size: item.size || 'Standard',
        color: item.color || 'Default',
        quantity: item.quantity,
        unitPrice: item.product.price
      }));

      // Snapshot totals before clearing cart
      const snapshotSubtotal = subtotal;
      const snapshotShippingFee = shippingFee;
      const snapshotTax = tax;
      const snapshotTotalPrice = totalPrice;

      let finalOrderId = `URBAN-${Math.floor(100000 + Math.random() * 900000)}`;

      try {
        const orderData = {
          shippingAddress,
          paymentMethod: formData.paymentMethod,
          items: orderItems
        };

        const result = await api.createOrder(orderData);
        if (result && result._id) {
          finalOrderId = `URBAN-${result._id.slice(-8).toUpperCase()}`;
        }
      } catch (err) {
        console.warn('Backend order submission fallback:', err.message);
      }

      const receiptData = {
        orderId: finalOrderId,
        createdAt: new Date().toISOString(),
        shippingAddress,
        paymentMethod: formData.paymentMethod,
        paymentStatus: formData.paymentMethod === 'cod' ? 'pending' : 'paid',
        orderStatus: 'confirmed',
        items: orderItems,
        subtotal: snapshotSubtotal,
        shippingFee: snapshotShippingFee,
        tax: snapshotTax,
        totalPrice: snapshotTotalPrice,
        totalAmount: snapshotTotalPrice,
        email: formData.email,
        phone: formData.phone
      };

      setOrderId(finalOrderId);
      setConfirmedOrder(receiptData);
      setOrderComplete(true);

      try {
        confetti({
          particleCount: 130,
          spread: 85,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti trigger', err);
      }

      clearCart();
    }
  };

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>No Items to Checkout</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Your shopping bag is currently empty.
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/shop')}>
          Return to Catalog
        </button>
      </div>
    );
  }

  // Order Complete Modal View
  if (orderComplete && confirmedOrder) {
    return (
      <div className="container" style={{ padding: '5rem 1.5rem', maxWidth: '720px', margin: '0 auto' }}>
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2.5rem',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-xl)',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              backgroundColor: '#d1fae5',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <CheckCircle2 size={48} />
          </div>

          <span className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
            Order Confirmed
          </span>
          <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>Thank You For Shopping At UrbanStep!</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
            We've received your order and sent a tracking receipt to <strong>{formData.email}</strong>.
          </p>

          <div
            style={{
              backgroundColor: 'var(--bg-primary)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              marginBottom: '1.75rem',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
              <strong style={{ color: 'var(--accent-orange)' }}>#{confirmedOrder.orderId}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Recipient Name:</span>
              <strong>{formData.fullName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Shipping Address:</span>
              <strong>{formData.address}, {formData.city}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Payment Method:</span>
              <strong style={{ textTransform: 'uppercase' }}>{confirmedOrder.paymentMethod}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.6rem', borderTop: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Total Paid:</span>
              <span style={{ color: '#10b981', fontWeight: 900, fontSize: '1.15rem' }}>${confirmedOrder.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Download Receipt Actions */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}
          >
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => downloadReceiptPDF(confirmedOrder, formData)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.6rem' }}
            >
              <Download size={20} /> Download Receipt (PDF)
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={() => setIsReceiptModalOpen(true)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem' }}
            >
              <FileText size={20} /> View Bill & Print
            </button>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-outline">
              Return to Home
            </Link>
            <Link to="/orders" className="btn btn-outline">
              View My Orders
            </Link>
            <Link to="/shop" className="btn btn-outline">
              Explore More Gear
            </Link>
          </div>
        </div>

        <ReceiptModal
          isOpen={isReceiptModalOpen}
          onClose={() => setIsReceiptModalOpen(false)}
          order={confirmedOrder}
          user={formData}
        />
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>Checkout</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
        Please enter your shipping address and payment info to complete your UrbanStep order.
      </p>

      <form onSubmit={handleSubmitOrder}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start'
          }}
        >
          {/* Shipping Details Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '2rem',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={20} color="var(--accent-orange)" /> 1. Shipping Details
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Alex Rivera"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: errors.fullName ? '1px solid #ef4444' : '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)'
                    }}
                  />
                  {errors.fullName && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.2rem' }}>{errors.fullName}</p>}
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@urbanstep.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: errors.email ? '1px solid #ef4444' : '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)'
                    }}
                  />
                  {errors.email && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.2rem' }}>{errors.email}</p>}
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 019-2834"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: errors.phone ? '1px solid #ef4444' : '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)'
                    }}
                  />
                  {errors.phone && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.2rem' }}>{errors.phone}</p>}
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="742 Evergreen Terrace"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: errors.address ? '1px solid #ef4444' : '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)'
                    }}
                  />
                  {errors.address && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.2rem' }}>{errors.address}</p>}
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: errors.city ? '1px solid #ef4444' : '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)'
                    }}
                  />
                  {errors.city && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.2rem' }}>{errors.city}</p>}
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    ZIP / Postal Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="10001"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: errors.zipCode ? '1px solid #ef4444' : '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)'
                    }}
                  />
                  {errors.zipCode && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.2rem' }}>{errors.zipCode}</p>}
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '2rem',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={20} color="var(--accent-orange)" /> 2. Payment Method
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: formData.paymentMethod === 'card' ? '2px solid var(--accent-orange)' : '1px solid var(--border-color)',
                    backgroundColor: formData.paymentMethod === 'card' ? 'var(--primary-light)' : 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  <CreditCard size={22} color={formData.paymentMethod === 'card' ? 'var(--accent-orange)' : 'currentColor'} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Credit Card</span>
                </label>

                <label
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: formData.paymentMethod === 'upi' ? '2px solid var(--accent-orange)' : '1px solid var(--border-color)',
                    backgroundColor: formData.paymentMethod === 'upi' ? 'var(--primary-light)' : 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  <Wallet size={22} color={formData.paymentMethod === 'upi' ? 'var(--accent-orange)' : 'currentColor'} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>UPI / Wallet</span>
                </label>

                <label
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: formData.paymentMethod === 'cod' ? '2px solid var(--accent-orange)' : '1px solid var(--border-color)',
                    backgroundColor: formData.paymentMethod === 'cod' ? 'var(--primary-light)' : 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  <Truck size={22} color={formData.paymentMethod === 'cod' ? 'var(--accent-orange)' : 'currentColor'} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Cash on Delivery</span>
                </label>
              </div>

              {formData.paymentMethod === 'card' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      Card Number *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="4532 •••• •••• 8892"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: errors.cardNumber ? '1px solid #ef4444' : '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-primary)'
                      }}
                    />
                    {errors.cardNumber && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.2rem' }}>{errors.cardNumber}</p>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      name="cardExp"
                      value={formData.cardExp}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: errors.cardExp ? '1px solid #ef4444' : '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-primary)'
                      }}
                    />
                    {errors.cardExp && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.2rem' }}>{errors.cardExp}</p>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      CVC / CVV *
                    </label>
                    <input
                      type="text"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleChange}
                      placeholder="123"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: errors.cardCvc ? '1px solid #ef4444' : '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-primary)'
                      }}
                    />
                    {errors.cardCvc && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.2rem' }}>{errors.cardCvc}</p>}
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'upi' && (
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Authorize payment via UPI app (Google Pay, PhonePe, Paytm).
                </p>
              )}

              {formData.paymentMethod === 'cod' && (
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Pay cash directly upon delivery of your UrbanStep package.
                </p>
              )}
            </div>
          </div>

          {/* Sidebar Order Summary */}
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
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
              Order Items ({totalItems})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '250px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.5rem' }}>
              {cart.map(({ itemKey, product, size, color, quantity }) => {
                const img = product.images ? product.images[0] : product.image;
                return (
                  <div key={itemKey} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={img} alt={product.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <h5 style={{ fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h5>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Size: {size} | Color: {color} | Qty: {quantity}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>${(product.price * quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <span>Shipping</span>
              <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <span>Taxes</span>
              <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>${tax.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '1rem', marginTop: '1rem', borderTop: '2px solid var(--border-color)', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>Total Due</span>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-orange)' }}>${totalPrice.toFixed(2)}</span>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Complete Order (${totalPrice.toFixed(2)})
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={14} color="var(--accent-emerald)" /> Demo Checkout - No actual payment will be charged.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
