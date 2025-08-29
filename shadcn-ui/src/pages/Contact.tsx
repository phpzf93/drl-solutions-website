import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Calendar,
  CheckCircle
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        budget: '',
        timeline: '',
        message: ''
      });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "Email Us",
      content: "info@drlsolutions.com",
      description: "Send us an email anytime"
    },
    {
      icon: <Phone className="h-6 w-6 text-green-600" />,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 5pm"
    },
    {
      icon: <MapPin className="h-6 w-6 text-red-600" />,
      title: "Visit Us",
      content: "123 Business Ave, Suite 100",
      description: "Your City, State 12345"
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-600" />,
      title: "Business Hours",
      content: "Mon - Fri: 8:00 AM - 5:00 PM",
      description: "Weekend support available"
    }
  ];

  const services = [
    "Web Development",
    "Mobile App Development", 
    "E-commerce Solutions",
    "UI/UX Design",
    "Backend Development",
    "Cloud Solutions",
    "Consultation",
    "Other"
  ];

  const budgetRanges = [
    "Under $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000+",
    "Let's discuss"
  ];

  const timelines = [
    "ASAP (Rush)",
    "1-2 weeks",
    "1 month",
    "2-3 months",
    "3-6 months",
    "6+ months",
    "Flexible"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="mb-4">
              📞 Get In Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Let's Start Your Project
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your ideas into reality? Get in touch with us for a free 
              consultation and detailed project proposal.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl flex items-center">
                    <MessageSquare className="h-6 w-6 mr-2 text-blue-600" />
                    Project Inquiry Form
                  </CardTitle>
                  <CardDescription>
                    Tell us about your project and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="px-0">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-green-600 mb-2">Message Sent Successfully!</h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input
                          id="company"
                          placeholder="Your company name (optional)"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Service Needed *</Label>
                          <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem key={service} value={service}>
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Budget Range</Label>
                          <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              {budgetRanges.map((range) => (
                                <SelectItem key={range} value={range}>
                                  {range}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Project Timeline</Label>
                        <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="When do you need this completed?" />
                          </SelectTrigger>
                          <SelectContent>
                            {timelines.map((timeline) => (
                              <SelectItem key={timeline} value={timeline}>
                                {timeline}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Project Description *</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your project, goals, and any specific requirements..."
                          rows={6}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          required
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    Quick Response
                  </CardTitle>
                  <CardDescription>
                    We typically respond to all inquiries within 24 hours
                  </CardDescription>
                </CardHeader>
              </Card>

              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        <p className="text-sm font-medium text-blue-600 mb-1">{info.content}</p>
                        <p className="text-xs text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-blue-900 mb-2">Free Consultation</h3>
                  <p className="text-sm text-blue-700 mb-4">
                    Get a free 30-minute consultation to discuss your project requirements and get expert advice.
                  </p>
                  <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    Schedule Call
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Quick answers to common questions</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How long does a typical project take?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Project timelines vary based on complexity. Simple websites take 2-4 weeks, 
                  while complex applications can take 2-6 months. We provide detailed timelines during consultation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you provide ongoing support?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! We offer comprehensive support and maintenance packages to keep your 
                  applications running smoothly and up-to-date.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's included in your development process?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our process includes discovery, design, development, testing, deployment, 
                  and training. We keep you involved throughout every step.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can you work with our existing systems?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutely! We specialize in integrating with existing systems and can 
                  work with your current infrastructure and third-party services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;