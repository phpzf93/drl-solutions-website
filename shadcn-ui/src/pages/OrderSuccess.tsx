import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useStore, Order } from '@/store/useStore';
import { CheckCircle, Download, Mail, ArrowLeft, Package, Calendar, CreditCard, Receipt } from 'lucide-react';
import { emailService, EmailReceipt } from '@/lib/emailService';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const { getOrderById } = useStore();
  const [order, setOrder] = useState(getOrderById(orderId || ''));
  const [emailSent, setEmailSent] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    if (orderId) {
      const foundOrder = getOrderById(orderId);
      setOrder(foundOrder);
      
      // Automatically send receipt email
      if (foundOrder && !emailSent) {
        sendReceiptEmail(foundOrder);
      }
    }
  }, [orderId, getOrderById, emailSent]);

  const sendReceiptEmail = async (orderData: Order) => {
    if (sendingEmail) return;
    
    setSendingEmail(true);
    try {
      const receipt: EmailReceipt = {
        orderId: orderData.id,
        customerName: 'Valued Customer', // Will be updated when user data is available
        customerEmail: 'customer@example.com', // Will be updated when user data is available
        items: orderData.items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity
        })),
        subtotal: orderData.total_amount * 0.965, // Approximate subtotal (total - 3.5% fee)
        fee: orderData.total_amount * 0.035, // Approximate fee
        total: orderData.total_amount,
        paymentMethod: 'Online Payment',
        transactionId: orderData.payment_intent_id,
        orderDate: orderData.created_at,
        status: orderData.status
      };

      const success = await emailService.sendOrderReceipt(receipt);
      if (success) {
        setEmailSent(true);
        console.log('✅ Receipt email sent successfully');
      }
    } catch (error) {
      console.error('❌ Failed to send receipt email:', error);
    } finally {
      setSendingEmail(false);
    }
  };

  const downloadReceipt = () => {
    if (!order) return;

    const receiptContent = `
DRL SOLUTIONS - OFFICIAL RECEIPT
================================

Order ID: ${order.id}
Date: ${new Date(order.created_at).toLocaleDateString('en-PH')}
Status: ${order.status.toUpperCase()}
Payment ID: ${order.payment_intent_id}

ITEMS:
${order.items.map(item => 
  `${item.product.name} x${item.quantity} - ₱${(item.price * item.quantity).toFixed(2)}`
).join('\n')}

TOTAL: ₱${order.total_amount.toFixed(2)}

Thank you for your business!
DRL Solutions - Professional Web & Mobile App Development
Email: admin@drl-softechs.dev
Phone: +63 952 447 5356
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DRL-Solutions-Receipt-${order.id}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="py-16">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-4">Order Not Found</h1>
                <p className="text-gray-300 mb-8">
                  We couldn't find the order you're looking for.
                </p>
                <Link to="/shop">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Shop
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="bg-green-500/20 border border-green-500/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
            <p className="text-gray-300">Thank you for your order. Your payment has been processed successfully.</p>
            
            {emailSent && (
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mt-4 inline-block">
                <div className="flex items-center space-x-2 text-blue-400">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">Receipt email sent successfully!</span>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Receipt className="mr-2 h-5 w-5" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Order ID</p>
                    <p className="text-white font-medium">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Status</p>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        order.status === 'completed' ? 'bg-green-400' :
                        order.status === 'pending' ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`} />
                      <span className="text-white capitalize">{order.status}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400">Order Date</p>
                    <div className="flex items-center space-x-2 text-white">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(order.created_at).toLocaleDateString('en-PH')}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400">Payment ID</p>
                    <div className="flex items-center space-x-2 text-white">
                      <CreditCard className="h-4 w-4" />
                      <span className="text-xs">{order.payment_intent_id}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <h3 className="text-white font-medium mb-3">Items Ordered</h3>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.product.image_url}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="text-white font-medium text-sm">{item.product.name}</p>
                            <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-white font-medium">₱{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-white">Total Paid</span>
                    <span className="text-green-400">₱{order.total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions & Next Steps */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                    <h3 className="text-blue-400 font-medium mb-2">📧 Email Confirmation</h3>
                    <p className="text-gray-300 text-sm">
                      {emailSent 
                        ? 'A receipt has been sent to your email address with all order details.'
                        : sendingEmail 
                        ? 'Sending receipt email...'
                        : 'Receipt email will be sent shortly to your registered email address.'
                      }
                    </p>
                  </div>

                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                    <h3 className="text-green-400 font-medium mb-2">🚀 Project Kickoff</h3>
                    <p className="text-gray-300 text-sm">
                      Our team will contact you within 24 hours to discuss project requirements and timeline.
                    </p>
                  </div>

                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                    <h3 className="text-purple-400 font-medium mb-2">📞 Support Available</h3>
                    <p className="text-gray-300 text-sm">
                      Have questions? Contact us at admin@drl-softechs.dev or +63 952 447 5356
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={downloadReceipt}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Receipt
                  </Button>

                  <Button
                    onClick={() => sendReceiptEmail(order)}
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                    disabled={sendingEmail}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    {sendingEmail ? 'Sending...' : emailSent ? 'Resend Receipt' : 'Send Receipt Email'}
                  </Button>

                  <Link to="/shop" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Button>
                  </Link>

                  <Link to="/" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Info */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mt-8">
            <CardContent className="py-6">
              <div className="text-center">
                <h3 className="text-white font-semibold mb-2">DRL Solutions</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Professional Web & Mobile App Development Services
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>admin@drl-softechs.dev</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📞</span>
                    <span>+63 952 447 5356</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}