import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Code, Smartphone, Globe, Zap, Shield, Users, Star, CheckCircle } from 'lucide-react';
import { 
  AnimatedPage, 
  AnimatedCard, 
  fadeInUp, 
  staggerContainer, 
  slideInLeft, 
  slideInRight,
  buttonHover,
  buttonTap,
  ParallaxContainer,
  floatingVariants
} from '@/components/AnimatedComponents';

export default function Index() {
  const services = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Web Development',
      description: 'Custom responsive websites with modern design and optimal performance.',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
      color: 'from-red-500 to-red-700'
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: 'Mobile Apps',
      description: 'Cross-platform mobile applications for iOS and Android.',
      features: ['Native Performance', 'Cross-Platform', 'App Store Ready'],
      color: 'from-red-600 to-black'
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: 'Custom Software',
      description: 'Tailored software solutions for your specific business needs.',
      features: ['Custom Development', 'API Integration', 'Scalable Architecture'],
      color: 'from-red-400 to-red-800'
    }
  ];

  const stats = [
    { number: '100+', label: 'Projects Completed', icon: <CheckCircle className="h-6 w-6" /> },
    { number: '50+', label: 'Happy Clients', icon: <Users className="h-6 w-6" /> },
    { number: '5+', label: 'Years Experience', icon: <Star className="h-6 w-6" /> },
    { number: '24/7', label: 'Support Available', icon: <Shield className="h-6 w-6" /> }
  ];

  return (
    <AnimatedPage className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, #ef4444 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, #000000 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, #dc2626 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
        />
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-8"
            >
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold text-black leading-tight"
              >
                Transform Your
                <motion.span 
                  className="block bg-gradient-to-r from-red-600 via-red-500 to-black bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Digital Vision
                </motion.span>
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
              >
                We create stunning websites, powerful mobile apps, and custom software solutions 
                that drive your business forward in the digital age.
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <Link to="/shop">
                  <motion.div
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl"
                    >
                      Get Started
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </Link>

                <Link to="/about">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-red-500 text-red-600 hover:bg-red-50 px-8 py-4 text-lg font-semibold rounded-full"
                    >
                      Learn More
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-20 h-20 bg-red-100 rounded-full blur-xl"
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-20 right-10 w-32 h-32 bg-gray-100 rounded-full blur-xl"
          style={{ animationDelay: '1s' }}
        />
      </section>

      {/* Services Section */}
      <section className="py-20 relative bg-gray-50">
        <ParallaxContainer className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <AnimatedCard key={index} delay={index * 0.2}>
                <Card className="bg-white border-gray-200 h-full group overflow-hidden relative shadow-lg hover:shadow-xl transition-shadow">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />
                  <CardHeader className="relative z-10">
                    <motion.div 
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} p-4 mb-4 mx-auto`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </motion.div>
                    <CardTitle className="text-black text-xl text-center">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center relative z-10">
                    <p className="text-gray-600 mb-6">
                      {service.description}
                    </p>
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          className="flex items-center justify-center text-sm text-gray-500"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </motion.div>
        </ParallaxContainer>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <ParallaxContainer className="container mx-auto px-4">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-red-500 mb-4 flex justify-center"
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                  className="text-3xl md:text-4xl font-bold text-black mb-2"
                >
                  {stat.number}
                </motion.div>
                <p className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </ParallaxContainer>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Card className="bg-white border-red-200 p-12 shadow-xl">
              <motion.h2 
                variants={slideInLeft}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-black mb-6"
              >
                Ready to Start Your Project?
              </motion.h2>
              <motion.p 
                variants={slideInRight}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="text-xl text-gray-600 mb-8"
              >
                Let's bring your digital vision to life with our expert development team.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/contact">
                  <motion.div
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-2xl"
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      Start Your Project
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </section>
    </AnimatedPage>
  );
}