import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore, Product } from '@/store/useStore';
import { ShoppingCart, Plus, Check, Star, Zap, Shield, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  AnimatedPage, 
  AnimatedCard, 
  fadeInUp, 
  staggerContainer,
  buttonHover,
  buttonTap,
  cardHover,
  messageVariants
} from '@/components/AnimatedComponents';

export default function Shop() {
  const { products, addToCart, getCartItemCount } = useStore();
  const { toast } = useToast();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedItems(prev => new Set([...prev, product.id]));
    
    // Remove the added state after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 2000);

    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web Development':
        return <Zap className="h-5 w-5" />;
      case 'E-commerce':
        return <ShoppingCart className="h-5 w-5" />;
      case 'Mobile Development':
        return <Star className="h-5 w-5" />;
      case 'Digital Marketing':
        return <Users className="h-5 w-5" />;
      case 'Cloud Services':
        return <Shield className="h-5 w-5" />;
      default:
        return <Zap className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Web Development':
        return 'from-red-500 to-red-700';
      case 'E-commerce':
        return 'from-red-600 to-black';
      case 'Mobile Development':
        return 'from-red-400 to-red-600';
      case 'Digital Marketing':
        return 'from-red-700 to-black';
      case 'Cloud Services':
        return 'from-red-500 to-red-800';
      default:
        return 'from-red-500 to-red-700';
    }
  };

  return (
    <AnimatedPage className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center mb-16"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-black mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Professional development services tailored to your business needs. 
            Choose from our comprehensive range of digital solutions.
          </motion.p>
          
          {/* Cart Counter */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center space-x-2 bg-red-50 backdrop-blur-sm rounded-full px-6 py-3 border border-red-200"
          >
            <ShoppingCart className="h-5 w-5 text-red-600" />
            <span className="text-black">Cart:</span>
            <motion.span
              key={getCartItemCount()}
              initial={{ scale: 1.5, color: '#dc2626' }}
              animate={{ scale: 1, color: '#000000' }}
              className="font-bold text-black"
            >
              {getCartItemCount()} items
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product, index) => (
            <AnimatedCard key={product.id} delay={index * 0.1}>
              <Card className="bg-white border-gray-200 h-full group overflow-hidden relative shadow-lg hover:shadow-xl transition-shadow">
                {/* Gradient Overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(product.category)} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Category Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="absolute top-4 left-4"
                  >
                    <Badge className={`bg-gradient-to-r ${getCategoryColor(product.category)} text-white border-0`}>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="mr-1"
                      >
                        {getCategoryIcon(product.category)}
                      </motion.div>
                      {product.category}
                    </Badge>
                  </motion.div>
                </div>

                <CardHeader className="relative z-10">
                  <CardTitle className="text-black text-xl group-hover:text-red-600 transition-colors">
                    {product.name}
                  </CardTitle>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="h-0.5 bg-gradient-to-r from-red-400 to-red-600"
                  />
                </CardHeader>

                <CardContent className="flex-1 flex flex-col relative z-10">
                  <p className="text-gray-600 mb-6 flex-1">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {product.features.slice(0, 3).map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-center text-sm text-gray-500"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, color: '#10b981' }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                        </motion.div>
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="text-2xl font-bold text-black"
                    >
                      ₱{product.price.toLocaleString()}
                    </motion.div>

                    <AnimatePresence mode="wait">
                      {addedItems.has(product.id) ? (
                        <motion.div
                          key="added"
                          variants={messageVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className="flex items-center space-x-2 text-green-600"
                        >
                          <Check className="h-5 w-5" />
                          <span className="font-medium">Added!</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="add-button"
                          variants={messageVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                        >
                          <Button
                            onClick={() => handleAddToCart(product)}
                            className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white"
                          >
                            <motion.div
                              whileHover={{ rotate: 180 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                            </motion.div>
                            Add to Cart
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </motion.div>
      </div>
    </AnimatedPage>
  );
}