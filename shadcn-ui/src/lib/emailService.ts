// Email Service for DRL Solutions
// Automated receipt and notification system using EmailJS

import emailjs from '@emailjs/browser';

const EMAIL_CONFIG = {
  serviceId: 'service_drl_solutions',
  templateId: 'template_receipt',
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY' // Replace with actual EmailJS public key
};

export interface EmailReceipt {
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  fee: number;
  total: number;
  paymentMethod: string;
  transactionId: string;
  orderDate: string;
  status: string;
}

class EmailService {
  private initialized = false;

  async initialize() {
    if (this.initialized) return;
    
    try {
      emailjs.init(EMAIL_CONFIG.publicKey);
      this.initialized = true;
      console.log('✅ EmailJS initialized successfully');
    } catch (error) {
      console.error('❌ EmailJS initialization failed:', error);
      throw new Error('Email service initialization failed');
    }
  }

  async sendOrderReceipt(receipt: EmailReceipt): Promise<boolean> {
    try {
      await this.initialize();

      const templateParams = {
        to_name: receipt.customerName,
        to_email: receipt.customerEmail,
        order_id: receipt.orderId,
        order_date: new Date(receipt.orderDate).toLocaleDateString('en-PH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        items_html: this.generateItemsHtml(receipt.items),
        subtotal: `₱${receipt.subtotal.toFixed(2)}`,
        fee: `₱${receipt.fee.toFixed(2)}`,
        total: `₱${receipt.total.toFixed(2)}`,
        payment_method: receipt.paymentMethod,
        transaction_id: receipt.transactionId,
        status: receipt.status,
        company_name: 'DRL Solutions',
        company_email: 'admin@drl-softechs.dev',
        company_phone: '+63 952 447 5356',
        support_email: 'support@drl-softechs.dev'
      };

      console.log('📧 Sending order receipt email:', {
        to: receipt.customerEmail,
        orderId: receipt.orderId,
        total: receipt.total
      });

      const response = await emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        templateParams
      );

      if (response.status === 200) {
        console.log('✅ Order receipt sent successfully:', response);
        return true;
      } else {
        console.error('❌ Email sending failed:', response);
        return false;
      }

    } catch (error) {
      console.error('❌ Error sending order receipt:', error);
      return false;
    }
  }

  private generateItemsHtml(items: EmailReceipt['items']): string {
    return items.map(item => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; text-align: left;">${item.name}</td>
        <td style="padding: 12px; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; text-align: right;">₱${item.price.toFixed(2)}</td>
        <td style="padding: 12px; text-align: right; font-weight: bold;">₱${item.total.toFixed(2)}</td>
      </tr>
    `).join('');
  }

  async sendAdminNotification(receipt: EmailReceipt): Promise<boolean> {
    try {
      await this.initialize();

      const templateParams = {
        to_name: 'DRL Solutions Admin',
        to_email: 'admin@drl-softechs.dev',
        subject: `New Order Received - ${receipt.orderId}`,
        order_id: receipt.orderId,
        customer_name: receipt.customerName,
        customer_email: receipt.customerEmail,
        total: `₱${receipt.total.toFixed(2)}`,
        payment_method: receipt.paymentMethod,
        transaction_id: receipt.transactionId,
        order_date: new Date(receipt.orderDate).toLocaleDateString('en-PH'),
        items_count: receipt.items.length,
        items_summary: receipt.items.map(item => `${item.name} (x${item.quantity})`).join(', ')
      };

      const response = await emailjs.send(
        EMAIL_CONFIG.serviceId,
        'template_admin_notification',
        templateParams
      );

      return response.status === 200;

    } catch (error) {
      console.error('❌ Error sending admin notification:', error);
      return false;
    }
  }

  // Test email functionality
  async testEmail(): Promise<boolean> {
    const testReceipt: EmailReceipt = {
      orderId: 'TEST_ORDER_001',
      customerName: 'Test Customer',
      customerEmail: 'test@example.com',
      items: [
        {
          name: 'Test Product',
          quantity: 1,
          price: 100,
          total: 100
        }
      ],
      subtotal: 100,
      fee: 3.5,
      total: 103.5,
      paymentMethod: 'GCash',
      transactionId: 'TEST_TXN_001',
      orderDate: new Date().toISOString(),
      status: 'completed'
    };

    return this.sendOrderReceipt(testReceipt);
  }
}

export const emailService = new EmailService();
export default emailService;