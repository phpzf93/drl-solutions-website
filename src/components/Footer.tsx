import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-purple-400">DRL Solutions</h3>
            <p className="text-gray-300 mb-4">
              Professional web and mobile app development services. Transforming ideas into digital reality.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-purple-400" />
                <span className="text-sm">admin@drl-softechs.dev</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-purple-400" />
                <span className="text-sm">+63 952 447 5356</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-purple-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-purple-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-purple-400 transition-colors">Services</Link></li>
              <li><Link to="/shop" className="text-gray-300 hover:text-purple-400 transition-colors">Shop</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-purple-400 transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-purple-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-purple-400">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-gray-300 hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="text-gray-300 hover:text-purple-400 transition-colors">Refund Policy</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-purple-400">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-purple-400 mt-1" />
                <div className="text-sm text-gray-300">
                  <p>542 Lopez Jaena St.</p>
                  <p>Brgy Bulilan Norte</p>
                  <p>Pila, Laguna 4010</p>
                  <p>Philippines</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-purple-400" />
                <div className="text-sm text-gray-300">
                  <p>Viber, WhatsApp, Telegram</p>
                  <p>09524475356</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} DRL Solutions. All rights reserved. | Den Russell Leonardo
          </p>
        </div>
      </div>
    </footer>
  );
}