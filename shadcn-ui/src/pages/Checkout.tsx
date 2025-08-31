import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/store/useStore';
import { useToast } from '@/hooks/use-toast';
import { 
  magpiePayment, 
  PAYMENT_METHODS, 
  CheckoutSessionRequest,
  CheckoutSessionResponse,
  PaymentStatus
} from '@/lib/magpie';
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
  ExternalLink,
  Clock
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
  
  // Checkout session state
  const [checkoutSession, setCheckoutSession] = useState<CheckoutSessionResponse | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

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

  const createCheckoutSession = async () => {
    if (!validateForm()) {
      toast({
        title: "Please fill in all required fields",
        description: "Complete your information to proceed with payment.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    setCheckoutSession(null);
    setPaymentStatus(null);
    setSessionExpired(false);

    try {
      const sessionRequest: CheckoutSessionRequest = {
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
          price: item.product.price,
          description: `${item.product.name} - Digital Service`
        })),
        paymentMethod: selectedPaymentMethod,
        successUrl: `${window.location.origin}/order-success`,
        cancelUrl: `${window.location.origin}/checkout`,
        metadata: {
          customer_name: customerInfo.name,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
          items_count: cart.length.toString(),
          source: 'drl-solutions-checkout'
        }
      };

      const response = await magpiePayment.createCheckoutSession(sessionRequest);

      if (response.success && response.sessionId) {
        setCheckoutSession(response);
        
        const order = {
          id: response.sessionId,
          user_id: 'guest',
          total_amount: total,
          status: 'pending' as const,
          payment_intent_id: response.paymentIntentId || response.sessionId,
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
          title: "Checkout Session Created!",
          description: response.checkoutUrl 
            ? "Click the payment button to complete your purchase."
            : "Follow the payment instructions to complete your purchase.",
        });

      } else {
        throw new Error(response.error || 'Failed to create checkout session');
      }
    } catch (error) {
      let errorMessage = 'Failed to create checkout session. Please try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Checkout Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
    } finally {
      setProcessing(false);
    }
  };

  const checkPaymentStatus = async () => {
    if (!checkoutSession?.sessionId) return;
    
    setCheckingStatus(true);
    
    try {
      const status = await magpiePayment.getPaymentStatus(checkoutSession.sessionId);
      setPaymentStatus(status);
      
      if (status.success && status.status === 'completed') {
        toast({
          title: "Payment Completed!",
          description: "Your payment has been processed successfully.",
        });
        
        clearCart();
        navigate(`/order-success/${checkoutSession.sessionId}`, {
          state: {
            paymentMethod: selectedPaymentMethod,
            paymentId: status.paymentId,
            amount: status.amount || total,
            verified: true,
            paidAt: status.paidAt
          }
        });
        
      } else if (status.status === 'failed') {
        toast({
          title: "Payment Failed",
          description: status.error || "Your payment could not be processed.",
          variant: "destructive",
        });
        
      } else if (status.status === 'cancelled') {
        toast({
          title: "Payment Cancelled",
          description: "Your payment was cancelled.",
          variant: "destructive",
        });
        
      } else {
        toast({
          title: "Payment Pending",
          description: "Your payment is still being processed. Please wait a moment and check again.",
        });
      }
    } catch (error) {
      toast({
        title: "Unable to Check Payment Status",
        description: "Please try again or contact support if payment was completed.",
        variant: "destructive",
      });
    } finally {
      setCheckingStatus(false);
    }
  };

  const openPaymentGateway = () => {
    if (checkoutSession?.checkoutUrl) {
      window.open(checkoutSession.checkoutUrl, '_blank', 'noopener,noreferrer');
      toast({
        title: "Payment Gateway Opened",
        description: "Complete your payment in the new tab, then check status here.",
        duration: 5000,
      });
    }
  };

  const resetCheckout = () => {
    setCheckoutSession(null);
    setPaymentStatus(null);
    setSessionExpired(false);
    setErrors({});
  };

  if (cart.length === 0) {
    return null;
  }

  const hasActiveSession = checkoutSession && !sessionExpired;

  return (
    <AnimatedPage className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Checkout
            </h1>
            <p className="text-xl text-gray-600">
              Complete your order and start your project
            </p>
          </motion.div>

          <AnimatePresence>
            {hasActiveSession && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8"
              >
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                        <div>
                          <h3 className="text-blue-800 font-medium">Payment Session Active</h3>
                          <p className="text-blue-700 text-sm">
                            {checkoutSession?.checkoutUrl 
                              ? "Click 'Pay Now' to complete your payment, then check status."
                              : "Follow the payment instructions, then check status."
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {checkoutSession?.checkoutUrl && (
                          <Button
                            onClick={openPaymentGateway}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Pay Now
                          </Button>
                        )}
                        <Button
                          onClick={checkPaymentStatus}
                          disabled={checkingStatus}
                          variant="outline"
                          className="border-blue-300"
                        >
                          {checkingStatus ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Checking...
                            </>
                          ) : (
                            'Check Status'
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                              disabled={hasActiveSession}
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
                              disabled={hasActiveSession}
                            >
                              <Plus className="h-4 w-4" />
                            </motion.button>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.1, color: '#ef4444' }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            disabled={hasActiveSession}
                          >
                            <Trash2 className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

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

            <AnimatedCard delay={0.2}>
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-black flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
                          disabled={hasActiveSession}
                          className={`pl-10 bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 ${
                            errors.name ? 'border-red-400' : ''
                          } ${hasActiveSession ? 'opacity-50' : ''}`}
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
                          disabled={hasActiveSession}
                          className={`pl-10 bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 ${
                            errors.email ? 'border-red-400' : ''
                          } ${hasActiveSession ? 'opacity-50' : ''}`}
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
                          disabled={hasActiveSession}
                          className={`pl-10 bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 ${
                            errors.phone ? 'border-red-400' : ''
                          } ${hasActiveSession ? 'opacity-50' : ''}`}
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
                            whileHover={{ scale: hasActiveSession ? 1 : 1.02 }}
                            whileTap={{ scale: hasActiveSession ? 1 : 0.98 }}
                            onClick={() => !hasActiveSession && setSelectedPaymentMethod(method.id)}
                            disabled={hasActiveSession}
                            className={`w-full p-4 rounded-lg border transition-all ${
                              selectedPaymentMethod === method.id
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 bg-white hover:bg-gray-50'
                            } ${hasActiveSession ? 'opacity-50 cursor-not-allowed' : ''}`}
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

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    {!hasActiveSession ? (
                      <Button
                        onClick={createCheckoutSession}
                        disabled={processing}
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
                              Creating Session...
                            </motion.div>
                          ) : (
                            <motion.div
                              key="create"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center"
                            >
                              <CreditCard className="mr-2 h-5 w-5" />
                              Create Payment Session - ₱{total.toLocaleString()}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        {checkoutSession?.checkoutUrl && (
                          <Button
                            onClick={openPaymentGateway}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-6 text-lg font-semibold"
                          >
                            <ExternalLink className="mr-2 h-5 w-5" />
                            Complete Payment - ₱{total.toLocaleString()}
                          </Button>
                        )}
                        <Button
                          onClick={resetCheckout}
                          variant="outline"
                          className="w-full border-gray-300 py-3"
                        >
                          Start New Payment
                        </Button>
                      </div>
                    )}
                  </motion.div>

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