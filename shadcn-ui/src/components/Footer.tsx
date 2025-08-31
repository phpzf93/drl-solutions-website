import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-4 text-red-400">DRL Solutions</h3>
            <p className="text-gray-300 mb-4">
              Transforming businesses through innovative digital solutions and cutting-edge technology.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">info@drl-solutions.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">+63 123 456 7890</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4 text-red-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-red-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-red-400 transition-colors">Services</Link></li>
              <li><Link to="/shop" className="text-gray-300 hover:text-red-400 transition-colors">Shop</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-red-400 transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-red-400 transition-colors">Contact</Link></li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4 text-red-400">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-gray-300 hover:text-red-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="text-gray-300 hover:text-red-400 transition-colors">Refund Policy</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-red-400 transition-colors">Terms of Service</a></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4 text-red-400">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-red-400 mt-1" />
                <span className="text-gray-300">
                  123 Tech Street<br />
                  Manila, Philippines 1000
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">24/7 Support Available</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700 mt-12 pt-8 text-center"
        >
          <p className="text-gray-400">
            © {currentYear} DRL Solutions. All rights reserved. Built with ❤️ for digital transformation.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}