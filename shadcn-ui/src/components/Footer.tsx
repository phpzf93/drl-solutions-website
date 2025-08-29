import { Link } from 'react-router-dom';
import { Code, Smartphone, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Code className="h-6 w-6 text-blue-400" />
                <Smartphone className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-xl font-bold">DRL Solutions</span>
            </div>
            <p className="text-gray-300 text-sm">
              Professional website and mobile app development services. 
              Your digital transformation partner.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-blue-400">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-blue-400">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-blue-400">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Home
              </Link>
              <Link to="/services" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Services
              </Link>
              <Link to="/shop" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Shop
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                About
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">Web Development</p>
              <p className="text-gray-300 text-sm">Mobile Apps</p>
              <p className="text-gray-300 text-sm">E-commerce Solutions</p>
              <p className="text-gray-300 text-sm">Digital Products</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">info@drlsolutions.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">Your City, State</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 DRL Solutions. All rights reserved. | 
            <Link to="/privacy" className="hover:text-blue-400 ml-1">Privacy Policy</Link> | 
            <Link to="/terms" className="hover:text-blue-400 ml-1">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;