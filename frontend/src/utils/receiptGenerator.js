import { jsPDF } from 'jspdf';

/**
 * Formats order data into a standardized receipt structure
 */
export function formatReceiptData(order, fallbackUser = {}) {
  const orderId = order.orderId || (order._id ? `URBAN-${order._id.slice(-8).toUpperCase()}` : `URBAN-${Math.floor(100000 + Math.random() * 900000)}`);
  
  const dateFormatted = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

  const address = order.shippingAddress || {};
  const customer = {
    fullName: address.fullName || fallbackUser.name || 'Valued Customer',
    email: address.email || fallbackUser.email || order.email || 'customer@urbanstep.store',
    phone: address.phone || fallbackUser.phone || order.phone || 'N/A',
    street: address.street || address.address || 'Standard Delivery Address',
    city: address.city || 'Metropolis',
    zipCode: address.postalCode || address.zipCode || '',
    country: address.country || 'USA'
  };

  const items = (order.items || []).map((item) => {
    const qty = Number(item.quantity) || 1;
    const price = Number(item.unitPrice || item.price || (item.product && item.product.price) || 0);
    return {
      name: item.name || (item.product && item.product.name) || 'UrbanStep Footwear / Apparel',
      sku: item.sku || 'URBAN-SKU',
      size: item.size || 'Standard',
      color: item.color || 'Default',
      quantity: qty,
      unitPrice: price,
      totalPrice: Number((price * qty).toFixed(2))
    };
  });

  const subtotal = order.subtotal !== undefined
    ? Number(order.subtotal)
    : items.reduce((sum, item) => sum + item.totalPrice, 0);

  const shippingFee = order.shippingFee !== undefined
    ? Number(order.shippingFee)
    : (subtotal > 100 || subtotal === 0 ? 0 : 12.50);

  const tax = order.tax !== undefined
    ? Number(order.tax)
    : Number((subtotal * 0.08).toFixed(2));

  const totalPrice = order.totalAmount !== undefined
    ? Number(order.totalAmount)
    : (order.totalPrice !== undefined ? Number(order.totalPrice) : Number((subtotal + shippingFee + tax).toFixed(2)));

  return {
    orderId,
    date: dateFormatted,
    customer,
    paymentMethod: (order.paymentMethod || 'Credit / Debit Card').toUpperCase(),
    paymentStatus: (order.paymentStatus || 'PAID').toUpperCase(),
    orderStatus: (order.orderStatus || 'CONFIRMED').toUpperCase(),
    items,
    financials: {
      subtotal,
      shippingFee,
      tax,
      totalPrice
    }
  };
}

/**
 * Downloads a clean, professional PDF receipt file directly to the user's browser
 */
export function downloadReceiptPDF(rawOrder, fallbackUser = {}) {
  const data = formatReceiptData(rawOrder, fallbackUser);
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Top Accent Header Bar (UrbanStep Orange)
  doc.setFillColor(255, 87, 34);
  doc.rect(0, 0, 210, 5, 'F');

  // UrbanStep Brand Logo / Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(15, 23, 42);
  doc.text('Urban', 15, 20);
  const urbanWidth = doc.getTextWidth('Urban');
  doc.setTextColor(255, 87, 34);
  doc.text('Step', 15 + urbanWidth, 20);

  // Sub-tagline
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text('PREMIUM STREETWEAR & SNEAKER ARCHIVE', 15, 26);
  doc.text('100 Urban Ave, Fashion District, NY 10001', 15, 30.5);
  doc.text('Email: support@urbanstep.com | Web: urbanstep.store', 15, 35);

  // Right-side Invoice / Receipt Label
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text('OFFICIAL RECEIPT', 195, 19, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(255, 87, 34);
  doc.text(`Invoice #${data.orderId}`, 195, 25, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Date: ${data.date}`, 195, 30, { align: 'right' });
  doc.text(`Payment: ${data.paymentMethod} (${data.paymentStatus})`, 195, 35, { align: 'right' });

  // Divider Line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(15, 41, 195, 41);

  // Customer & Shipping Info Box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, 45, 180, 26, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(15, 45, 180, 26, 2, 2, 'S');

  // Customer Information (Left)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('CUSTOMER / SHIPPING INFO:', 20, 52);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text(data.customer.fullName, 20, 58);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`${data.customer.street}, ${data.customer.city} ${data.customer.zipCode}`, 20, 63);
  doc.text(`Email: ${data.customer.email} | Phone: ${data.customer.phone}`, 20, 68);

  // Order Status Badge (Right inside box)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text('ORDER STATUS:', 135, 52);

  doc.setFillColor(16, 185, 129);
  doc.roundedRect(135, 55, 32, 6, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(data.orderStatus, 151, 59.2, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Status: Confirmed & Paid', 135, 66);

  // Table Header
  const tableTopY = 78;
  doc.setFillColor(15, 23, 42);
  doc.rect(15, tableTopY, 180, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('ITEM DESCRIPTION', 20, tableTopY + 5.5);
  doc.text('VARIANT', 110, tableTopY + 5.5);
  doc.text('QTY', 145, tableTopY + 5.5, { align: 'center' });
  doc.text('PRICE', 168, tableTopY + 5.5, { align: 'right' });
  doc.text('AMOUNT', 190, tableTopY + 5.5, { align: 'right' });

  // Table Body Rows
  let currentY = tableTopY + 14;

  data.items.forEach((item, index) => {
    if (currentY > 250) {
      doc.addPage();
      currentY = 25;
    }

    // Alternating row background
    if (index % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(15, currentY - 5, 180, 9, 'F');
    }

    // Product Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    const splitName = doc.splitTextToSize(item.name, 85);
    doc.text(splitName[0], 20, currentY);

    // Variant
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`${item.size} • ${item.color}`, 110, currentY);

    // Quantity
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(String(item.quantity), 145, currentY, { align: 'center' });

    // Unit Price
    doc.setFont('helvetica', 'normal');
    doc.text(`$${item.unitPrice.toFixed(2)}`, 168, currentY, { align: 'right' });

    // Line Total
    doc.setFont('helvetica', 'bold');
    doc.text(`$${item.totalPrice.toFixed(2)}`, 190, currentY, { align: 'right' });

    // Row separator
    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.2);
    doc.line(15, currentY + 3.5, 195, currentY + 3.5);

    currentY += 9;
  });

  // Financial Breakdown Box (Right Aligned)
  const summaryTop = Math.max(currentY + 6, 135);
  const summaryLeft = 120;
  const summaryWidth = 75;

  doc.setFillColor(248, 250, 252);
  doc.roundedRect(summaryLeft, summaryTop, summaryWidth, 42, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(summaryLeft, summaryTop, summaryWidth, 42, 2, 2, 'S');

  let fY = summaryTop + 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Subtotal:', summaryLeft + 5, fY);
  doc.setTextColor(15, 23, 42);
  doc.text(`$${data.financials.subtotal.toFixed(2)}`, summaryLeft + summaryWidth - 5, fY, { align: 'right' });

  fY += 6;
  doc.setTextColor(100, 116, 139);
  doc.text('Shipping:', summaryLeft + 5, fY);
  doc.setTextColor(15, 23, 42);
  doc.text(
    data.financials.shippingFee === 0 ? 'FREE' : `$${data.financials.shippingFee.toFixed(2)}`,
    summaryLeft + summaryWidth - 5,
    fY,
    { align: 'right' }
  );

  fY += 6;
  doc.setTextColor(100, 116, 139);
  doc.text('Sales Tax (8%):', summaryLeft + 5, fY);
  doc.setTextColor(15, 23, 42);
  doc.text(`$${data.financials.tax.toFixed(2)}`, summaryLeft + summaryWidth - 5, fY, { align: 'right' });

  // Total divider
  fY += 4;
  doc.setDrawColor(203, 213, 225);
  doc.line(summaryLeft + 5, fY, summaryLeft + summaryWidth - 5, fY);

  fY += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Total Paid:', summaryLeft + 5, fY);
  doc.setTextColor(255, 87, 34);
  doc.text(`$${data.financials.totalPrice.toFixed(2)}`, summaryLeft + summaryWidth - 5, fY, { align: 'right' });

  // Guarantee / Notes on the left side
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('RETURNS & EXCHANGES POLICY', 15, summaryTop + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  const termsText = [
    '• 30-Day Hassle-Free Returns on unworn items with tags intact.',
    '• For tracking & exchange requests, visit urbanstep.store/orders',
    '• Questions? Reach our 24/7 concierge at support@urbanstep.com'
  ];
  let tY = summaryTop + 14;
  termsText.forEach((line) => {
    doc.text(line, 15, tY);
    tY += 5;
  });

  // Bottom Footer
  doc.setDrawColor(226, 232, 240);
  doc.line(15, 280, 195, 280);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'This is a computer-generated tax receipt from UrbanStep Inc. No physical signature required.',
    105,
    285,
    { align: 'center' }
  );

  // Save the PDF file
  const fileName = `UrbanStep-Receipt-${data.orderId}.pdf`;
  doc.save(fileName);
  return fileName;
}

/**
 * Opens a print-friendly invoice view and triggers the browser print dialog
 */
export function printReceipt(rawOrder, fallbackUser = {}) {
  const data = formatReceiptData(rawOrder, fallbackUser);

  const printWindow = window.open('', '_blank', 'width=850,height=900');
  if (!printWindow) {
    alert('Please allow pop-ups to print your receipt.');
    return;
  }

  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid #f1f5f9;">
          <strong style="color: #0f172a; font-size: 13px;">${item.name}</strong>
          <div style="color: #64748b; font-size: 11px;">SKU: ${item.sku}</div>
        </td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #f1f5f9; color: #475569; font-size: 12px;">
          ${item.size} • ${item.color}
        </td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #f1f5f9; text-align: center; font-weight: 700; font-size: 13px;">
          ${item.quantity}
        </td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #f1f5f9; text-align: right; color: #475569; font-size: 13px;">
          $${item.unitPrice.toFixed(2)}
        </td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: 700; color: #0f172a; font-size: 13px;">
          $${item.totalPrice.toFixed(2)}
        </td>
      </tr>
    `
    )
    .join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Receipt - ${data.orderId}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; background: #fff; color: #0f172a; padding: 30px; }
          .receipt-container { max-width: 780px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 30px; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #ff5722; padding-bottom: 20px; margin-bottom: 24px; }
          .logo { font-size: 26px; font-weight: 900; color: #0f172a; }
          .logo span { color: #ff5722; }
          .company-info { font-size: 12px; color: #64748b; margin-top: 4px; line-height: 1.4; }
          .invoice-meta { text-align: right; }
          .invoice-title { font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; }
          .invoice-id { font-size: 14px; font-weight: 700; color: #ff5722; margin-top: 2px; }
          .invoice-date { font-size: 12px; color: #64748b; margin-top: 4px; }
          .customer-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
          .box-title { font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; margin-bottom: 6px; }
          .box-text { font-size: 13px; color: #334155; line-height: 1.4; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          th { background: #0f172a; color: #fff; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; padding: 10px 14px; font-weight: 700; text-align: left; }
          .totals-section { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; }
          .policy-box { max-width: 380px; font-size: 11px; color: #64748b; line-height: 1.5; background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; }
          .totals-table { width: 280px; border: 1px solid #e2e8f0; border-radius: 6px; background: #f8fafc; padding: 14px; }
          .totals-row { display: flex; justify-content: space-between; font-size: 13px; color: #475569; margin-bottom: 8px; }
          .totals-row.grand-total { border-top: 1px solid #cbd5e1; padding-top: 8px; margin-top: 8px; font-size: 16px; font-weight: 800; color: #ff5722; }
          .footer { text-align: center; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 11px; color: #94a3b8; }
          @media print {
            body { padding: 0; }
            .receipt-container { border: none; padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="header">
            <div>
              <div class="logo">Urban<span>Step</span></div>
              <div class="company-info">
                Official Retail Store & Streetwear Archive<br />
                100 Urban Ave, Fashion District, NY 10001<br />
                support@urbanstep.com | www.urbanstep.store
              </div>
            </div>
            <div class="invoice-meta">
              <div class="invoice-title">OFFICIAL RECEIPT</div>
              <div class="invoice-id">#${data.orderId}</div>
              <div class="invoice-date">Placed: ${data.date}</div>
              <div class="invoice-date" style="font-weight: 700; color: #10b981;">STATUS: ${data.paymentStatus} (${data.paymentMethod})</div>
            </div>
          </div>

          <div class="customer-box">
            <div>
              <div class="box-title">Billed & Shipped To:</div>
              <div class="box-text">
                <strong>${data.customer.fullName}</strong><br />
                ${data.customer.street}<br />
                ${data.customer.city}, ${data.customer.zipCode} ${data.customer.country}<br />
                Phone: ${data.customer.phone}
              </div>
            </div>
            <div>
              <div class="box-title">Order Info:</div>
              <div class="box-text">
                Order ID: <strong>${data.orderId}</strong><br />
                Account Email: <strong>${data.customer.email}</strong><br />
                Payment Method: <strong>${data.paymentMethod}</strong><br />
                Fulfillment: <strong>Standard Express Delivery</strong>
              </div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Variant</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Unit Price</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="totals-section">
            <div class="policy-box">
              <strong style="color: #0f172a; display: block; margin-bottom: 4px;">Thank you for shopping at UrbanStep!</strong>
              • Free exchanges & returns available within 30 days.<br />
              • Retain this digital receipt for warranty or return claims.<br />
              • For live tracking updates, visit urbanstep.store/orders
            </div>

            <div class="totals-table">
              <div class="totals-row">
                <span>Subtotal:</span>
                <span>$${data.financials.subtotal.toFixed(2)}</span>
              </div>
              <div class="totals-row">
                <span>Shipping Fee:</span>
                <span>${data.financials.shippingFee === 0 ? 'FREE' : '$' + data.financials.shippingFee.toFixed(2)}</span>
              </div>
              <div class="totals-row">
                <span>Sales Tax (8%):</span>
                <span>$${data.financials.tax.toFixed(2)}</span>
              </div>
              <div class="totals-row grand-total">
                <span>Total Paid:</span>
                <span>$${data.financials.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div class="footer">
            UrbanStep E-Commerce Inc. • Authorized Electronic Sales Receipt • All Rights Reserved.
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
