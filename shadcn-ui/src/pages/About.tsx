import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Users, 
  Target, 
  Award,
  ArrowRight,
  Code,
  Smartphone,
  Globe,
  Heart,
  Lightbulb,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const team = [
    {
      name: "David Rodriguez",
      role: "Founder & Lead Developer",
      expertise: "Full-Stack Development, System Architecture",
      description: "10+ years of experience in web and mobile development"
    },
    {
      name: "Lisa Chen",
      role: "UI/UX Designer",
      expertise: "User Experience, Visual Design",
      description: "Specialized in creating intuitive and beautiful user interfaces"
    },
    {
      name: "Michael Johnson",
      role: "Mobile Developer",
      expertise: "iOS & Android Development",
      description: "Expert in native and cross-platform mobile applications"
    }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Client-Focused",
      description: "Your success is our success. We prioritize understanding your needs and delivering solutions that exceed expectations."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
      title: "Innovation",
      description: "We stay ahead of technology trends and implement cutting-edge solutions to give you a competitive advantage."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Quality & Security",
      description: "We follow industry best practices and security standards to ensure your applications are robust and secure."
    }
  ];

  const stats = [
    { number: "100+", label: "Projects Completed", icon: <Code className="h-6 w-6" /> },
    { number: "50+", label: "Happy Clients", icon: <Users className="h-6 w-6" /> },
    { number: "3+", label: "Years Experience", icon: <Award className="h-6 w-6" /> },
    { number: "24/7", label: "Support Available", icon: <Globe className="h-6 w-6" /> }
  ];

  const technologies = [
    "React", "Vue.js", "Angular", "Node.js", "Python", "PHP",
    "React Native", "Flutter", "iOS", "Android", "AWS", "Azure",
    "MongoDB", "PostgreSQL", "MySQL", "Docker", "Kubernetes", "CI/CD"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="mb-4">
              👥 About DRL Solutions
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Passionate About Digital Innovation
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're a dedicated team of developers, designers, and digital strategists 
              committed to transforming your ideas into powerful digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                  To empower businesses of all sizes with cutting-edge digital solutions 
                  that drive growth, enhance user experience, and create lasting value. 
                  We believe technology should be accessible, reliable, and transformative.
                </p>
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Lightbulb className="h-6 w-6 text-yellow-500" />
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                  To be the leading digital solutions partner that businesses trust 
                  for innovation, quality, and results. We envision a world where 
                  every great idea has the technology foundation to succeed.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals dedicated to your success
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-12 w-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">{member.expertise}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technologies We Use</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We work with the latest and most reliable technologies
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-sm px-4 py-2 hover:bg-blue-100 transition-colors">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Work Together?</h2>
            <p className="text-xl opacity-90">
              Let's discuss how we can help bring your digital vision to life. 
              We're excited to learn about your project and explore the possibilities.
            </p>
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
              <Link to="/contact">
                Get In Touch <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;