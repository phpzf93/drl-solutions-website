import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { Menu, X, ShoppingCart, User, Home, Info, Briefcase, Mail, Store } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { getCartItemCount } = useStore();

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'About', path: '/about', icon: <Info className="h-4 w-4" /> },
    { name: 'Services', path: '/services', icon: <Briefcase className="h-4 w-4" /> },
    { name: 'Shop', path: '/shop', icon: <Store className="h-4 w-4" /> },
    { name: 'Contact', path: '/contact', icon: <Mail className="h-4 w-4" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: -20
    },
    open: {
      opacity: 1,
      y: 0
    }
  };

  const staggerContainer = {
    open: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-700 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold text-sm">D</span>
              </motion.div>
              <span className="text-black font-bold text-xl">DRL Solutions</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className="relative group"
                >
                  <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.path) 
                      ? 'text-red-600 bg-red-50' 
                      : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                  }`}>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.div>
                    <span>{item.name}</span>
                  </div>
                  
                  {/* Active indicator */}
                  <AnimatePresence>
                    {isActive(item.path) && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-red-700"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Link to="/checkout">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-600 hover:bg-red-50 relative"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <AnimatePresence>
                    {getCartItemCount() > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                      >
                        <motion.span
                          key={getCartItemCount()}
                          initial={{ scale: 1.5 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                        >
                          {getCartItemCount()}
                        </motion.span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </Link>

            {/* Admin Login */}
            <Link to="/admin/login">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-600 hover:bg-red-50 hidden sm:flex"
                >
                  <User className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </motion.div>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 p-2"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden bg-white border-t border-gray-200"
            >
              <motion.div
                variants={staggerContainer}
                initial="closed"
                animate="open"
                className="py-4 space-y-2"
              >
                {navItems.map((item) => (
                  <motion.div key={item.path} variants={itemVariants}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.path) 
                          ? 'text-red-600 bg-red-50' 
                          : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                      }`}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.icon}
                      </motion.div>
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Admin Link */}
                <motion.div variants={itemVariants}>
                  <Link
                    to="/admin/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>Admin Login</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}