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
  Database,
  Cloud,
  Palette,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Award
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Code className="h-12 w-12 text-blue-600" />,
      title: "Web Development",
      description: "Custom websites and web applications built with cutting-edge technologies",
      features: [
        "Responsive Design",
        "SEO Optimization",
        "Performance Optimization",
        "Modern Frameworks (React, Vue, Angular)",
        "Progressive Web Apps (PWA)",
        "API Integration"
      ],
      pricing: "Starting at $2,500",
      timeline: "2-8 weeks"
    },
    {
      icon: <Smartphone className="h-12 w-12 text-green-600" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
      features: [
        "Native iOS & Android Apps",
        "Cross-Platform Development",
        "App Store Optimization",
        "Push Notifications",
        "Offline Functionality",
        "Third-party Integrations"
      ],
      pricing: "Starting at $5,000",
      timeline: "4-12 weeks"
    },
    {
      icon: <ShoppingCart className="h-12 w-12 text-purple-600" />,
      title: "E-commerce Solutions",
      description: "Complete online stores with payment processing and inventory management",
      features: [
        "Custom E-commerce Platforms",
        "Payment Gateway Integration",
        "Inventory Management",
        "Order Processing System",
        "Customer Management",
        "Analytics & Reporting"
      ],
      pricing: "Starting at $3,500",
      timeline: "3-10 weeks"
    },
    {
      icon: <Database className="h-12 w-12 text-orange-600" />,
      title: "Backend Development",
      description: "Robust server-side solutions and API development",
      features: [
        "RESTful API Development",
        "Database Design & Optimization",
        "Cloud Infrastructure Setup",
        "Authentication & Security",
        "Real-time Features",
        "Microservices Architecture"
      ],
      pricing: "Starting at $2,000",
      timeline: "2-6 weeks"
    },
    {
      icon: <Cloud className="h-12 w-12 text-cyan-600" />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment services",
      features: [
        "AWS/Azure/GCP Setup",
        "DevOps & CI/CD",
        "Auto-scaling Solutions",
        "Monitoring & Logging",
        "Backup & Recovery",
        "Performance Optimization"
      ],
      pricing: "Starting at $1,500",
      timeline: "1-4 weeks"
    },
    {
      icon: <Palette className="h-12 w-12 text-pink-600" />,
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interface and experience design",
      features: [
        "User Research & Analysis",
        "Wireframing & Prototyping",
        "Visual Design",
        "Interaction Design",
        "Usability Testing",
        "Design Systems"
      ],
      pricing: "Starting at $1,200",
      timeline: "1-3 weeks"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Discovery & Planning",
      description: "We analyze your requirements and create a detailed project roadmap"
    },
    {
      step: "2",
      title: "Design & Prototyping",
      description: "Creating wireframes, mockups, and interactive prototypes"
    },
    {
      step: "3",
      title: "Development",
      description: "Building your solution using best practices and modern technologies"
    },
    {
      step: "4",
      title: "Testing & QA",
      description: "Comprehensive testing to ensure quality and performance"
    },
    {
      step: "5",
      title: "Deployment & Launch",
      description: "Deploying your solution and ensuring smooth launch"
    },
    {
      step: "6",
      title: "Support & Maintenance",
      description: "Ongoing support and maintenance to keep everything running smoothly"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="mb-4">
              💼 Professional Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Comprehensive Development Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From concept to deployment, we provide end-to-end development solutions 
              tailored to your business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="space-y-1">
                      <div className="text-lg font-semibold text-blue-600">{service.pricing}</div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {service.timeline}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Development Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {item.step}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose DRL Solutions?</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-muted-foreground">
                Experienced developers with expertise in latest technologies and best practices
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">On-Time Delivery</h3>
              <p className="text-muted-foreground">
                We respect deadlines and deliver projects on time without compromising quality
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">
                Ongoing support and maintenance to ensure your solution runs smoothly
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl opacity-90">
              Let's discuss your project requirements and provide you with a detailed proposal.
            </p>
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
              <Link to="/contact">
                Get Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;