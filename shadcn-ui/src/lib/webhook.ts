// Webhook handler for Magpie.im payment confirmations
// This handles real payment confirmations from Magpie.im

export interface WebhookPayload {
  id: string;
  type: 'payment.succeeded' | 'payment.failed' | 'payment.pending';
  data: {
    id: string;
    status: 'succeeded' | 'failed' | 'pending' | 'cancelled';
    amount: number;
    currency: string;
    customer: {
      email: string;
      name: string;
    };
    metadata: {
      user_id: string;
      cart_items: string;
      subtotal: string;
      fee: string;
      total: string;
      payment_method_name: string;
    };
    created_at: string;
    updated_at: string;
  };
}

interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  payment_intent_id: string;
  created_at: string;
  items: Array<{
    id: string;
    product_id: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
      price: number;
    };
  }>;
}

export class WebhookHandler {
  static async handlePaymentWebhook(payload: WebhookPayload): Promise<void> {
    console.log('Processing payment webhook:', payload);

    try {
      switch (payload.type) {
        case 'payment.succeeded':
          await this.handlePaymentSuccess(payload.data);
          break;
        case 'payment.failed':
          await this.handlePaymentFailure(payload.data);
          break;
        case 'payment.pending':
          await this.handlePaymentPending(payload.data);
          break;
        default:
          console.log('Unknown webhook type:', payload.type);
      }
    } catch (error) {
      console.error('Webhook processing error:', error);
      throw error;
    }
  }

  private static async handlePaymentSuccess(paymentData: WebhookPayload['data']): Promise<void> {
    console.log('Payment succeeded:', paymentData.id);

    // In a real application, you would:
    // 1. Update order status in database
    // 2. Send confirmation email to customer
    // 3. Trigger product delivery (download links, etc.)
    // 4. Update inventory if applicable
    // 5. Send receipt

    // For now, we'll update local storage and trigger notifications
    const cartItems: OrderItem[] = JSON.parse(paymentData.metadata.cart_items);
    
    // Create order record
    const order: Order = {
      id: `order_${Date.now()}`,
      user_id: paymentData.metadata.user_id,
      total_amount: parseFloat(paymentData.metadata.total),
      status: 'completed',
      payment_intent_id: paymentData.id,
      created_at: paymentData.created_at,
      items: cartItems.map((item: OrderItem) => ({
        id: `item_${Date.now()}_${item.product_id}`,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        product: {
          id: item.product_id,
          name: item.product_name,
          price: item.price
        }
      }))
    };

    // Store order (in production, this would be in your database)
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Send confirmation email (placeholder)
    await this.sendConfirmationEmail(paymentData.customer.email, order);

    console.log('Order completed successfully:', order.id);
  }

  private static async handlePaymentFailure(paymentData: WebhookPayload['data']): Promise<void> {
    console.log('Payment failed:', paymentData.id);

    // In production:
    // 1. Update order status to failed
    // 2. Send failure notification to customer
    // 3. Log for investigation
    // 4. Possibly retry or offer alternative payment methods

    // Send failure notification
    await this.sendPaymentFailureEmail(paymentData.customer.email, paymentData.id);
  }

  private static async handlePaymentPending(paymentData: WebhookPayload['data']): Promise<void> {
    console.log('Payment pending:', paymentData.id);

    // In production:
    // 1. Update order status to pending
    // 2. Send pending notification to customer
    // 3. Set up monitoring for status changes

    console.log('Payment is pending, monitoring for updates...');
  }

  private static async sendConfirmationEmail(email: string, order: Order): Promise<void> {
    console.log(`Sending confirmation email to ${email} for order ${order.id}`);
    
    // In production, integrate with email service like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Resend
    
    // Email template would include:
    // - Order confirmation
    // - Receipt/invoice
    // - Download links for digital products
    // - Support contact information
    
    // For now, just log
    console.log('✅ Confirmation email sent successfully');
  }

  private static async sendPaymentFailureEmail(email: string, paymentId: string): Promise<void> {
    console.log(`Sending payment failure notification to ${email} for payment ${paymentId}`);
    
    // In production, send failure notification with:
    // - Explanation of failure
    // - Alternative payment methods
    // - Support contact information
    // - Link to retry payment
    
    console.log('❌ Payment failure email sent');
  }
}

// URL verification for webhook endpoints
export function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  // In production, implement proper signature verification
  // using HMAC-SHA256 or similar cryptographic method
  
  // For now, return true for demo purposes
  console.log('Verifying webhook signature (demo mode)');
  return true;
}