import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/store/useStore';
import { useToast } from '@/hooks/use-toast';
import { magpiePayment, PAYMENT_METHODS, PaymentDetails } from '@/lib/magpie';
import { 
  CreditCard, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  User, 
  Mail, 
  Phone,
  AlertCircle,
  CheckCircle,
  Loader2,
  Copy
} from 'lucide-react';
import { 
  AnimatedPage, 
  AnimatedCard, 
  fadeInUp, 
  staggerContainer,
  messageVariants,
  cartItemVariants
} from '@/components/AnimatedComponents';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart, clearCart, getCartTotal, addOrder } = useStore();
  const { toast } = useToast();

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('gcash');
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentInstructions, setPaymentInstructions] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [awaitingPayment, setAwaitingPayment] = useState(false);
  const [currentPaymentId, setCurrentPaymentId] = useState<string | null>(null);

  const subtotal = getCartTotal();
  const selectedMethod = PAYMENT_METHODS.find(method => method.id === selectedPaymentMethod);
  const fee = selectedMethod ? magpiePayment.calculateFee(subtotal, selectedPaymentMethod) : 0;
  const total = subtotal + fee;

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/shop');
    }
  }, [cart.length, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!customerInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  const verifyPaymentStatus = async (paymentId: string): Promise<boolean> => {
    try {
      console.log('🔍 Verifying payment status for:', paymentId);
      const verification = await magpiePayment.verifyPayment(paymentId);
      
      if (verification.success && verification.status === 'completed') {
        console.log('✅ Payment verified as completed');
        return true;
      } else {
        console.log('⏳ Payment still pending or failed:', verification.status);
        return false;
      }
    } catch (error) {
      console.error('❌ Payment verification error:', error);
      return false;
    }
  };

  const handlePayment = async () => {
    console.log('🛒 Starting payment process...');
    
    if (!validateForm()) {
      toast({
        title: "Please fill in all required fields",
        description: "Complete your information to proceed with payment.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    setPaymentInstructions(null);
    setPaymentDetails(null);

    try {
      const paymentRequest = {
        amount: subtotal,
        currency: 'PHP',
        description: `DRL Solutions - ${cart.length} item(s)`,
        customer: {
          email: customerInfo.email,
          name: customerInfo.name,
          phone: customerInfo.phone
        },
        items: cart.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        paymentMethod: selectedPaymentMethod,
        successUrl: `${window.location.origin}/order-success`,
        cancelUrl: `${window.location.origin}/checkout`,
        metadata: {
          customer_name: customerInfo.name,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
          items_count: cart.length.toString()
        }
      };

      console.log('🚀 Processing payment with request:', paymentRequest);

      const response = await magpiePayment.createPayment(paymentRequest);
      console.log('📨 Payment response received:', response);

      if (response.success && response.paymentId) {
        // Create order record with pending status
        const order = {
          id: response.paymentId,
          user_id: 'guest',
          total_amount: total,
          status: 'pending' as const,
          payment_intent_id: response.paymentId,
          created_at: new Date().toISOString(),
          items: cart.map(item => ({
            id: `item_${Date.now()}_${Math.random()}`,
            product_id: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
            product: item.product
          }))
        };

        addOrder(order);
        
        toast({
          title: "Payment Initiated Successfully!",
          description: response.instructions || "Payment is being processed...",
        });

        // Handle different payment method responses
        if (response.paymentUrl) {
          console.log('🔗 Payment URL provided:', response.paymentUrl);
          
          // Set awaiting payment state instead of auto-redirect
          setCurrentPaymentId(response.paymentId);
          setAwaitingPayment(true);
          
          toast({
            title: "Payment Gateway Ready",
            description: "Complete your payment in the payment gateway, then click 'Verify Payment' to continue.",
            duration: 8000,
          });
          
        } else if (response.instructions) {
          // For bank transfer or other manual methods
          console.log('📋 Showing payment instructions');
          setPaymentInstructions(response.instructions);
          setPaymentDetails(response.details || null);
          
          toast({
            title: "Payment Instructions Provided",
            description: "Please follow the instructions below to complete your payment.",
          });
          
        } else {
          // This should not happen without proper payment validation
          console.warn('⚠️ No payment URL or instructions provided');
          toast({
            title: "Payment Setup Incomplete",
            description: "Please try again or contact support.",
            variant: "destructive",
          });
        }
        
      } else {
        throw new Error(response.error || 'Payment processing failed');
      }
    } catch (error) {
      console.error('❌ Payment error:', error);
      
      let errorMessage = 'Payment processing failed. Please try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Payment Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      setPaymentInstructions(null);
      setPaymentDetails(null);
    } finally {
      setProcessing(false);
    }
  };

  const proceedWithManualPayment = () => {
    // For manual payments like bank transfer, proceed to success page
    clearCart();
    navigate(`/order-success/${paymentDetails?.accountDetails?.reference || 'manual'}`, {
      state: {
        paymentMethod: selectedPaymentMethod,
        paymentId: paymentDetails?.accountDetails?.reference,
        amount: total,
        instructions: paymentInstructions,
        isManualPayment: true
      }
    });
  };

  const checkPaymentStatus = async () => {
    if (!currentPaymentId) return;
    
    setProcessing(true);
    
    try {
      const isCompleted = await verifyPaymentStatus(currentPaymentId);
      
      if (isCompleted) {
        // Payment verified as completed
        clearCart();
        navigate(`/order-success/${currentPaymentId}`, {
          state: {
            paymentMethod: selectedPaymentMethod,
            paymentId: currentPaymentId,
            amount: total,
            verified: true
          }
        });
      } else {
        toast({
          title: "Payment Not Yet Completed",
          description: "Please complete your payment first, then check again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Unable to Verify Payment",
        description: "Please try again or contact support if payment was completed.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <AnimatedPage className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Checkout
            </h1>
            <p className="text-xl text-gray-600">
              Complete your order and start your project
            </p>
          </motion.div>

          {/* Payment Status Alert */}
          <AnimatePresence>
            {awaitingPayment && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8"
              >
                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <AlertCircle className="h-6 w-6 text-yellow-600" />
                        <div>
                          <h3 className="text-yellow-800 font-medium">Payment Pending</h3>
                          <p className="text-yellow-700 text-sm">Complete your payment, then verify below</p>
                        </div>
                      </div>
                      <Button
                        onClick={checkPaymentStatus}
                        disabled={processing}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      >
                        {processing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Checking...
                          </>
                        ) : (
                          'Verify Payment'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Payment Instructions Modal */}
          <AnimatePresence>
            {paymentInstructions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              >
                <Card className="bg-white max-w-md w-full max-h-[80vh] overflow-y-auto">
                  <CardHeader>
                    <CardTitle className="text-black flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                      Payment Instructions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                        {paymentInstructions}
                      </pre>
                    </div>
                    
                    {paymentDetails?.accountDetails && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Reference:</span>
                          <div className="flex items-center space-x-2">
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                              {paymentDetails.accountDetails.reference}
                            </code>
                            <button
                              onClick={() => copyToClipboard(paymentDetails.accountDetails.reference)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex space-x-3">
                      <Button
                        onClick={proceedWithManualPayment}
                        className="flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white"
                      >
                        I've Made the Payment
                      </Button>
                      <Button
                        onClick={() => {
                          setPaymentInstructions(null);
                          setPaymentDetails(null);
                        }}
                        variant="outline"
                        className="border-gray-300"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <AnimatedCard>
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-black flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={item.product.id}
                        variants={cartItemVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0"
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          <motion.img
                            src={item.product.image_url}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          />
                          <div className="flex-1">
                            <h3 className="text-black font-medium">{item.product.name}</h3>
                            <p className="text-gray-500 text-sm">₱{item.product.price.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 text-gray-600 hover:text-red-500 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </motion.button>
                            <motion.span
                              key={item.quantity}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                              className="text-black font-medium w-8 text-center"
                            >
                              {item.quantity}
                            </motion.span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 text-gray-600 hover:text-red-500 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </motion.button>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.1, color: '#ef4444' }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Totals */}
                  <div className="space-y-3 pt-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₱{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Processing Fee ({selectedMethod?.fee || '3.5%'})</span>
                      <span>₱{fee.toFixed(2)}</span>
                    </div>
                    <motion.div 
                      className="flex justify-between text-xl font-bold text-black border-t border-gray-200 pt-3"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <span>Total</span>
                      <span>₱{total.toLocaleString()}</span>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>

            {/* Payment Form */}
            <AnimatedCard delay={0.2}>
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-black flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Customer Information */}
                  <div className="space-y-4">
                    <h3 className="text-black font-medium">Customer Information</h3>
                    
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label htmlFor="name" className="text-black">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          value={customerInfo.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter your full name"
                          className={`pl-10 bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 ${
                            errors.name ? 'border-red-400' : ''
                          }`}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.name && (
                          <motion.p
                            variants={messageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="text-red-500 text-sm mt-1 flex items-center"
                          >
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.name}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Label htmlFor="email" className="text-black">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={customerInfo.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter your email address"
                          className={`pl-10 bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 ${
                            errors.email ? 'border-red-400' : ''
                          }`}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.email && (
                          <motion.p
                            variants={messageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="text-red-500 text-sm mt-1 flex items-center"
                          >
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.email}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Label htmlFor="phone" className="text-black">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={customerInfo.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Enter your phone number"
                          className={`pl-10 bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 ${
                            errors.phone ? 'border-red-400' : ''
                          }`}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.phone && (
                          <motion.p
                            variants={messageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="text-red-500 text-sm mt-1 flex items-center"
                          >
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.phone}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-4">
                    <h3 className="text-black font-medium">Payment Method</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PAYMENT_METHODS.map((method, index) => (
                        <motion.div
                          key={method.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedPaymentMethod(method.id)}
                            className={`w-full p-4 rounded-lg border transition-all ${
                              selectedPaymentMethod === method.id
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 bg-white hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{method.icon}</span>
                                <div className="text-left">
                                  <p className="text-black font-medium">{method.name}</p>
                                  <p className="text-gray-500 text-xs">{method.fee}</p>
                                </div>
                              </div>
                              <AnimatePresence>
                                {selectedPaymentMethod === method.id && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                  >
                                    <CheckCircle className="h-5 w-5 text-red-500" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button
                      onClick={handlePayment}
                      disabled={processing || awaitingPayment}
                      className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-6 text-lg font-semibold"
                    >
                      <AnimatePresence mode="wait">
                        {processing ? (
                          <motion.div
                            key="processing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center"
                          >
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing Payment...
                          </motion.div>
                        ) : awaitingPayment ? (
                          <motion.div
                            key="awaiting"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center"
                          >
                            <AlertCircle className="mr-2 h-5 w-5" />
                            Complete Payment First
                          </motion.div>
                        ) : (
                          <motion.div
                            key="pay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center"
                          >
                            <CreditCard className="mr-2 h-5 w-5" />
                            Pay ₱{total.toLocaleString()}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>

                  {/* Security Notice */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center text-sm text-gray-500"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Secure payment powered by Magpie.im</span>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </motion.div>
      </div>
    </AnimatedPage>
  );
}