import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

function Header() {
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerVariants = {
    initial: { y: -100 },
    animate: { y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  };

  const linkVariants = {
    hover: { scale: 1.1, color: '#4ade80', transition: { duration: 0.2 } },
  };

  const searchBarVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { width: '100%', opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 bg-green-600 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
      initial="initial"
      animate="animate"
      variants={headerVariants}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div whileHover="hover" variants={linkVariants}>
            <Link to="/" className="text-2xl font-bold text-white">
              Organic Foods
            </Link>
          </motion.div>
          <div className="hidden md:flex items-center space-x-6">
            {['Home', 'Products'].map((item) => (
              <motion.div key={item} whileHover="hover" variants={linkVariants}>
                <Link
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-white hover:text-green-200 transition-colors duration-200"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
            <motion.div className="relative" whileHover="hover" variants={linkVariants}>
              <Link to="/cart" className="text-white flex items-center">
                <FaShoppingCart className="mr-1" />
                <span className="bg-white text-green-600 rounded-full px-2 py-1 text-xs font-bold">
                  {cart.length}
                </span>
              </Link>
            </motion.div>
            <motion.div
              className="relative"
              initial="hidden"
              animate="visible"
              variants={searchBarVariants}
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-green-500 text-white placeholder-green-200 rounded-full py-1 px-4 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
            </motion.div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-green-600 overflow-hidden"
          >
            <div className="px-4 py-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-green-500 text-white placeholder-green-200 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            {['Home', 'Products', 'Cart'].map((item) => (
              <motion.div
                key={item}
                whileHover={{ backgroundColor: '#4ade80', x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="block px-4 py-2 text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item} {item === 'Cart' && `(${cart.length})`}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;