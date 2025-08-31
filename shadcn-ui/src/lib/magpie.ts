// Enhanced Magpie Payment Integration with Better Error Handling
export interface PaymentRequest {
  amount: number;
  currency: string;
  description: string;
  customer: {
    email: string;
    name: string;
    phone: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  paymentMethod: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export interface PaymentDetails {
  method: string;
  amount: number;
  currency: string;
  status: string;
  accountDetails?: {
    accountName: string;
    accountNumber: string;
    bank: string;
    reference: string;
  };
}

export interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  paymentUrl?: string;
  instructions?: string;
  error?: string;
  details?: PaymentDetails;
}

export interface PaymentVerification {
  success: boolean;
  status: string;
  details?: {
    paymentId: string;
    verifiedAt: string;
    method: string;
  };
}

export interface WebhookPayload {
  paymentId: string;
  status: string;
  amount?: number;
  currency?: string;
  metadata?: Record<string, string>;
}

export interface WebhookResponse {
  success: boolean;
  message: string;
}

export const PAYMENT_METHODS = [
  {
    id: 'gcash',
    name: 'GCash',
    icon: '💙',
    fee: '2.5%',
    description: 'Pay with GCash e-wallet'
  },
  {
    id: 'maya',
    name: 'Maya (PayMaya)',
    icon: '🟢',
    fee: '3.0%',
    description: 'Pay with Maya e-wallet'
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: '💳',
    fee: '3.5%',
    description: 'Visa, Mastercard, etc.'
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    icon: '🏦',
    fee: '1.5%',
    description: 'Direct bank transfer'
  }
];

class MagpiePaymentService {
  private baseUrl = 'https://api.magpie.im/v1';
  private apiKey = 'pk_test_magpie_demo_key_2024'; // Demo key for testing
  private secretKey = 'sk_test_magpie_demo_secret_2024'; // Demo secret

  constructor() {
    console.log('🔧 Initializing Magpie Payment Service');
    console.log('📍 Base URL:', this.baseUrl);
    console.log('🔑 Using demo API key for testing');
  }

  calculateFee(amount: number, paymentMethod: string): number {
    const method = PAYMENT_METHODS.find(m => m.id === paymentMethod);
    if (!method) return amount * 0.035; // Default 3.5%

    const feePercentage = parseFloat(method.fee.replace('%', '')) / 100;
    return amount * feePercentage;
  }

  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    console.log('🚀 Creating payment with Magpie.im');
    console.log('📋 Payment Request:', JSON.stringify(request, null, 2));

    try {
      // Validate request
      if (!request.amount || request.amount <= 0) {
        throw new Error('Invalid payment amount');
      }

      if (!request.customer.email || !request.customer.name) {
        throw new Error('Customer information is required');
      }

      // Calculate total with fees
      const fee = this.calculateFee(request.amount, request.paymentMethod);
      const totalAmount = request.amount + fee;

      console.log('💰 Payment breakdown:');
      console.log(`  - Subtotal: ₱${request.amount.toLocaleString()}`);
      console.log(`  - Fee (${PAYMENT_METHODS.find(m => m.id === request.paymentMethod)?.fee}): ₱${fee.toFixed(2)}`);
      console.log(`  - Total: ₱${totalAmount.toLocaleString()}`);

      // Simulate different payment method responses
      const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // For demo purposes, simulate different scenarios based on payment method
      if (request.paymentMethod === 'gcash') {
        console.log('💙 Processing GCash payment...');
        
        // Simulate GCash success
        const response: PaymentResponse = {
          success: true,
          paymentId,
          paymentUrl: `https://gcash.com/pay/${paymentId}`,
          instructions: 'You will be redirected to GCash to complete your payment.',
          details: {
            method: 'gcash',
            amount: totalAmount,
            currency: request.currency,
            status: 'pending'
          }
        };

        console.log('✅ GCash payment created successfully:', response);
        return response;

      } else if (request.paymentMethod === 'maya') {
        console.log('🟢 Processing Maya payment...');
        
        const response: PaymentResponse = {
          success: true,
          paymentId,
          paymentUrl: `https://maya.ph/pay/${paymentId}`,
          instructions: 'You will be redirected to Maya to complete your payment.',
          details: {
            method: 'maya',
            amount: totalAmount,
            currency: request.currency,
            status: 'pending'
          }
        };

        console.log('✅ Maya payment created successfully:', response);
        return response;

      } else if (request.paymentMethod === 'card') {
        console.log('💳 Processing card payment...');
        
        const response: PaymentResponse = {
          success: true,
          paymentId,
          paymentUrl: `https://checkout.magpie.im/pay/${paymentId}`,
          instructions: 'You will be redirected to our secure payment page.',
          details: {
            method: 'card',
            amount: totalAmount,
            currency: request.currency,
            status: 'pending'
          }
        };

        console.log('✅ Card payment created successfully:', response);
        return response;

      } else if (request.paymentMethod === 'bank_transfer') {
        console.log('🏦 Processing bank transfer...');
        
        // For bank transfer, provide instructions instead of redirect
        const response: PaymentResponse = {
          success: true,
          paymentId,
          instructions: `Bank Transfer Instructions:
          
Account Name: DRL Solutions
Account Number: 1234567890
Bank: BPI
Amount: ₱${totalAmount.toLocaleString()}
Reference: ${paymentId}

Please send proof of payment to orders@drl-solutions.com`,
          details: {
            method: 'bank_transfer',
            amount: totalAmount,
            currency: request.currency,
            status: 'pending',
            accountDetails: {
              accountName: 'DRL Solutions',
              accountNumber: '1234567890',
              bank: 'BPI',
              reference: paymentId
            }
          }
        };

        console.log('✅ Bank transfer payment created successfully:', response);
        return response;

      } else {
        throw new Error(`Unsupported payment method: ${request.paymentMethod}`);
      }

    } catch (error) {
      console.error('❌ Payment creation failed:', error);
      
      const errorResponse: PaymentResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Payment processing failed',
        details: {
          method: request.paymentMethod,
          amount: request.amount,
          currency: request.currency,
          status: 'failed'
        }
      };

      console.log('💥 Error response:', errorResponse);
      return errorResponse;
    }
  }

  async verifyPayment(paymentId: string): Promise<PaymentVerification> {
    console.log('🔍 Verifying payment:', paymentId);

    try {
      // Simulate payment verification
      // In a real implementation, this would call the Magpie API
      
      // For demo purposes, randomly simulate different statuses
      const statuses = ['completed', 'pending', 'failed'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      console.log(`✅ Payment ${paymentId} status: ${randomStatus}`);
      
      return {
        success: true,
        status: randomStatus,
        details: {
          paymentId,
          verifiedAt: new Date().toISOString(),
          method: 'demo_verification'
        }
      };

    } catch (error) {
      console.error('❌ Payment verification failed:', error);
      return {
        success: false,
        status: 'error',
        details: {
          paymentId,
          verifiedAt: new Date().toISOString(),
          method: 'error'
        }
      };
    }
  }

  async handleWebhook(payload: WebhookPayload): Promise<WebhookResponse> {
    console.log('🔔 Processing webhook:', payload);

    try {
      // Validate webhook payload
      if (!payload.paymentId || !payload.status) {
        throw new Error('Invalid webhook payload');
      }

      // Process webhook based on status
      switch (payload.status) {
        case 'completed':
          console.log('✅ Payment completed via webhook');
          // Here you would update your database, send confirmation emails, etc.
          break;
        
        case 'failed':
          console.log('❌ Payment failed via webhook');
          // Handle failed payment
          break;
        
        case 'cancelled':
          console.log('🚫 Payment cancelled via webhook');
          // Handle cancelled payment
          break;
        
        default:
          console.log(`ℹ️ Payment status updated: ${payload.status}`);
      }

      return {
        success: true,
        message: 'Webhook processed successfully'
      };

    } catch (error) {
      console.error('❌ Webhook processing failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Webhook processing failed'
      };
    }
  }
}

// Export singleton instance
export const magpiePayment = new MagpiePaymentService();

// Export for testing
export { MagpiePaymentService };