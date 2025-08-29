import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Code, 
  Smartphone, 
  ShoppingCart, 
  Zap, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

const Index = () => {
  const services = [
    {
      icon: <Code className="h-8 w-8 text-blue-600" />,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies",
      features: ["Responsive Design", "SEO Optimized", "Fast Performance"]
    },
    {
      icon: <Smartphone className="h-8 w-8 text-blue-600" />,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android",
      features: ["Native Performance", "Cross-Platform", "App Store Ready"]
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-blue-600" />,
      title: "E-commerce Solutions",
      description: "Complete online stores with payment integration and inventory management",
      features: ["Payment Gateway", "Inventory System", "Admin Dashboard"]
    }
  ];

  const stats = [
    { number: "100+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "3+", label: "Years Experience" },
    { number: "24/7", label: "Support" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "DRL Solutions delivered an exceptional website that exceeded our expectations. Professional, timely, and innovative.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Founder, AppVenture",
      content: "The mobile app they built for us has been a game-changer. Highly recommend their services.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="mb-4">
              🚀 Professional Development Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Transform Your Ideas Into Digital Reality
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              DRL Solutions specializes in creating stunning websites, powerful mobile apps, 
              and comprehensive e-commerce solutions. Plus, shop our collection of premium development tools and source code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link to="/contact">
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6">
                <Link to="/shop">
                  Browse Shop <ShoppingCart className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-blue-400">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive development services to bring your vision to life
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-blue-50 rounded-full w-fit group-hover:bg-blue-100 transition-colors">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/services">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Shop Preview Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Development Tools & Source Code</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Premium digital products to accelerate your development process
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                  React Templates
                </CardTitle>
                <CardDescription>Ready-to-use React components and templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 mb-2">From $29</div>
                <p className="text-sm text-muted-foreground">Professional React templates for rapid development</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 text-green-500 mr-2" />
                  E-commerce Solutions
                </CardTitle>
                <CardDescription>Complete e-commerce source code packages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 mb-2">From $99</div>
                <p className="text-sm text-muted-foreground">Full-featured online store solutions</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 text-purple-500 mr-2" />
                  Premium Tools
                </CardTitle>
                <CardDescription>Advanced development tools and utilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 mb-2">From $49</div>
                <p className="text-sm text-muted-foreground">Professional development utilities and tools</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/shop">
                Browse All Products <ShoppingCart className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground">Don't just take our word for it</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Project?</h2>
            <p className="text-xl opacity-90">
              Let's discuss how we can help transform your ideas into reality. 
              Get a free consultation and project quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
                <Link to="/contact">
                  Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 text-white border-white hover:bg-white hover:text-blue-600">
                <Link to="/services">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;