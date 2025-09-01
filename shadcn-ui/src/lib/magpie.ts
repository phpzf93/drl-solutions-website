// Magpie.im Payment Integration
// Based on official checkout session samples and best practices

export interface MagpieConfig {
  apiKey: string;
  baseUrl: string;
  environment: 'sandbox' | 'production';
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  fee: string;
  type: 'ewallet' | 'bank' | 'card' | 'crypto';
}

export interface CustomerInfo {
  email: string;
  name: string;
  phone: string;
}

export interface PaymentItem {
  name: string;
  quantity: number;
  price: number;
  description?: string;
}

export interface CheckoutSessionRequest {
  amount: number;
  currency: string;
  description: string;
  customer: CustomerInfo;
  items: PaymentItem[];
  paymentMethod: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export interface CheckoutSessionResponse {
  success: boolean;
  sessionId?: string;
  checkoutUrl?: string;
  paymentIntentId?: string;
  instructions?: string;
  error?: string;
  expiresAt?: string;
}

export interface PaymentStatus {
  success: boolean;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'expired';
  paymentId: string;
  amount?: number;
  currency?: string;
  paidAt?: string;
  error?: string;
}

export interface WebhookEvent {
  id: string;
  type: 'payment.completed' | 'payment.failed' | 'payment.cancelled';
  data: {
    paymentId: string;
    sessionId: string;
    status: string;
    amount: number;
    currency: string;
    metadata?: Record<string, string>;
  };
  createdAt: string;
}

// Magpie.im Configuration
const MAGPIE_CONFIG: MagpieConfig = {
  apiKey: process.env.NEXT_PUBLIC_MAGPIE_API_KEY || 'demo_key',
  baseUrl: process.env.NEXT_PUBLIC_MAGPIE_BASE_URL || 'https://api.magpie.im',
  environment: (process.env.NODE_ENV === 'production' ? 'production' : 'sandbox') as 'sandbox' | 'production'
};

// Frontend -> Backend base URL (configure via Vite env var VITE_API_BASE)
const API_BASE = (import.meta?.env?.VITE_API_BASE as string) || 'https://drl-solutions-website.onrender.com';

// Available Payment Methods (following official examples)
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'gcash',
    name: 'GCash',
    icon: '💙',
    fee: '2.5%',
    type: 'ewallet'
  },
  {
    id: 'paymaya',
    name: 'PayMaya',
    icon: '💚',
    fee: '2.5%',
    type: 'ewallet'
  },
  {
    id: 'grabpay',
    name: 'GrabPay',
    icon: '🟢',
    fee: '2.8%',
    type: 'ewallet'
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    icon: '🏦',
    fee: '₱15',
    type: 'bank'
  },
  {
    id: 'credit_card',
    name: 'Credit/Debit Card',
    icon: '💳',
    fee: '3.5%',
    type: 'card'
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    icon: '₿',
    fee: '1.5%',
    type: 'crypto'
  }
];

class MagpiePaymentService {
  private config: MagpieConfig;

  constructor(config: MagpieConfig) {
    this.config = config;
  }

  /**
   * Calculate processing fee based on payment method
   */
  calculateFee(amount: number, paymentMethod: string): number {
    const method = PAYMENT_METHODS.find(m => m.id === paymentMethod);
    if (!method) return 0;

    if (method.fee.includes('%')) {
      const percentage = parseFloat(method.fee.replace('%', '')) / 100;
      return amount * percentage;
    } else if (method.fee.includes('₱')) {
      return parseFloat(method.fee.replace('₱', ''));
    }
    return 0;
  }

  /**
   * Create a checkout session following official Magpie.im patterns
   */
  async createCheckoutSession(request: CheckoutSessionRequest): Promise<CheckoutSessionResponse> {
    try {
      console.log('🚀 Creating Magpie checkout session:', request);

      // Validate request
      if (!request.amount || request.amount <= 0) {
        throw new Error('Invalid amount');
      }
      if (!request.customer.email || !request.customer.name) {
        throw new Error('Customer information is required');
      }

      // Calculate total with fees
      const fee = this.calculateFee(request.amount, request.paymentMethod);
      const totalAmount = request.amount + fee;

      // Prepare checkout session payload (following official examples)
      const sessionPayload = {
        amount: Math.round(totalAmount * 100), // Convert to cents
        currency: request.currency.toUpperCase(),
        description: request.description,
        payment_method: request.paymentMethod,
        customer: {
          email: request.customer.email,
          name: request.customer.name,
          phone: request.customer.phone
        },
        line_items: request.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          amount: Math.round(item.price * 100), // Convert to cents
          description: item.description || item.name
        })),
        success_url: request.successUrl,
        cancel_url: request.cancelUrl,
        metadata: {
          ...request.metadata,
          integration: 'drl-solutions',
          version: '1.0.0'
        },
        expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes
      };

      // Make API call to Magpie.im
  const response = await fetch(`${API_BASE}/api/checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sessionPayload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Checkout session created:', data);

      return {
        success: true,
        sessionId: data.id,
        checkoutUrl: data.checkout_url,
        paymentIntentId: data.payment_intent_id,
        instructions: data.instructions,
        expiresAt: data.expires_at
      };

    } catch (error) {
      console.error('❌ Checkout session creation failed:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Retrieve payment status following official patterns
   */
  async getPaymentStatus(sessionId: string): Promise<PaymentStatus> {
    try {
      console.log('🔍 Checking payment status for session:', sessionId);

  const response = await fetch(`${API_BASE}/api/payment-status/${sessionId}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📊 Payment status retrieved:', data);

      return {
        success: true,
        status: data.payment_status,
        paymentId: data.payment_intent_id,
        amount: data.amount_total / 100, // Convert from cents
        currency: data.currency,
        paidAt: data.paid_at
      };

    } catch (error) {
      console.error('❌ Payment status check failed:', error);
      
      return {
        success: false,
        status: 'failed',
        paymentId: sessionId,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Verify webhook signature for security (browser-compatible version)
   */
  verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
    try {
      // For browser environment, we'll use a simple comparison
      // In production, this should be handled server-side with proper crypto
      console.log('⚠️ Webhook signature verification should be handled server-side');
      
      // Simple validation for demo purposes
      return signature.length > 0 && secret.length > 0;
    } catch (error) {
      console.error('❌ Webhook signature verification failed:', error);
      return false;
    }
  }

  /**
   * Handle webhook events
   */
  async handleWebhook(event: WebhookEvent): Promise<boolean> {
    try {
      console.log('📨 Processing webhook event:', event);

      switch (event.type) {
        case 'payment.completed':
          console.log('✅ Payment completed:', event.data.paymentId);
          // Handle successful payment
          break;
        
        case 'payment.failed':
          console.log('❌ Payment failed:', event.data.paymentId);
          // Handle failed payment
          break;
        
        case 'payment.cancelled':
          console.log('🚫 Payment cancelled:', event.data.paymentId);
          // Handle cancelled payment
          break;
        
        default:
          console.log('ℹ️ Unknown webhook event type:', event.type);
      }

      return true;
    } catch (error) {
      console.error('❌ Webhook handling failed:', error);
      return false;
    }
  }

  /**
   * Get configuration info
   */
  getConfig(): MagpieConfig {
    return { ...this.config };
  }
}

// Export singleton instance
export const magpiePayment = new MagpiePaymentService(MAGPIE_CONFIG);

// Legacy compatibility - maintain existing interface
export const createPayment = (request: CheckoutSessionRequest) => 
  magpiePayment.createCheckoutSession(request).then(response => ({
    success: response.success,
    paymentId: response.sessionId,
    paymentUrl: response.checkoutUrl,
    instructions: response.instructions,
    error: response.error,
    details: response.paymentIntentId ? {
      accountDetails: {
        reference: response.paymentIntentId
      }
    } : undefined
  }));

export const verifyPayment = (paymentId: string) =>
  magpiePayment.getPaymentStatus(paymentId);

// Export types for external use
export type {
  MagpieConfig,
  PaymentMethod,
  CustomerInfo,
  PaymentItem,
  CheckoutSessionRequest,
  CheckoutSessionResponse,
  PaymentStatus,
  WebhookEvent
};