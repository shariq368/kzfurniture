import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  view: 'home' | 'collections' | 'login';
  isAdmin: boolean;
  onLogout: () => void;
}

export default function Header({ view, isAdmin, onLogout }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === 'collections') {
      window.location.hash = '#/collections';
    } else if (targetId === 'login') {
      window.location.hash = '#/login';
    } else {
      window.location.hash = '#/';
      // Small delay to allow page render if switching views
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'glass-nav py-4 shadow-xl' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo brand reference styled gold */}
          <a
            href="#/"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="flex items-end gap-3 group select-none"
          >
            <img
              src="/kzlogo.png"
              alt="K & Z Furniture & Interior"
              className="h-16 md:h-20 w-auto object-contain"
            />
          </a>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-10 text-sm tracking-widest text-gray-300">
            <a
              href="#/collections"
              onClick={(e) => handleNavClick(e, 'collections')}
              className={`hover:text-gold-premium transition-colors duration-300 uppercase font-medium ${
                view === 'collections' ? 'text-gold-premium font-bold' : ''
              }`}
            >
              Collections
            </a>
            <a
              href="#identity"
              onClick={(e) => handleNavClick(e, 'identity')}
              className="hover:text-gold-premium transition-colors duration-300 uppercase font-medium"
            >
              About Us
            </a>
            <a
              href="#craftsmanship"
              onClick={(e) => handleNavClick(e, 'craftsmanship')}
              className="hover:text-gold-premium transition-colors duration-300 uppercase font-medium"
            >
              Craftsmanship
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, 'projects')}
              className="hover:text-gold-premium transition-colors duration-300 uppercase font-medium"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hover:text-gold-premium transition-colors duration-300 uppercase font-medium"
            >
              Contact
            </a>
            {isAdmin ? (
              <button
                onClick={onLogout}
                className="hover:text-red-400 text-gold-premium transition-colors duration-300 uppercase font-medium tracking-widest text-sm cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <a
                href="#/login"
                onClick={(e) => handleNavClick(e, 'login')}
                className={`hover:text-gold-premium transition-colors duration-300 uppercase font-medium ${
                  view === 'login' ? 'text-gold-premium font-bold' : ''
                }`}
              >
                Admin
              </a>
            )}
          </nav>

          {/* Showroom Callout Button */}
          <div className="hidden md:block">
            <a
              href="https://wa.me/923011447981"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold-premium text-gold-premium hover:bg-gold-premium hover:text-black transition-all duration-500 text-xs tracking-widest uppercase font-bold py-2.5 px-6 rounded-none inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" /> Call Showroom
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-white hover:text-gold-premium transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN NAV */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-[#0B0B0B] flex flex-col p-8 justify-between"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-end gap-2.5 select-none">
                <img
                  src="/kzlogo.png"
                  alt="K & Z Furniture & Interior"
                  className="h-14 w-auto object-contain"
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-gold-premium"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-8 text-2xl font-serif-luxury tracking-wide text-center">
              <a
                href="#/collections"
                onClick={(e) => handleNavClick(e, 'collections')}
                className={`hover:text-gold-premium transition-colors ${
                  view === 'collections' ? 'text-gold-premium font-bold' : ''
                }`}
              >
                Collections
              </a>
              <a
                href="#identity"
                onClick={(e) => handleNavClick(e, 'identity')}
                className="hover:text-gold-premium transition-colors"
              >
                About Us
              </a>
              <a
                href="#craftsmanship"
                onClick={(e) => handleNavClick(e, 'craftsmanship')}
                className="hover:text-gold-premium transition-colors"
              >
                Craftsmanship
              </a>
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, 'projects')}
                className="hover:text-gold-premium transition-colors"
              >
                Projects
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="hover:text-gold-premium transition-colors"
              >
                Contact
              </a>
              {isAdmin ? (
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="hover:text-red-400 text-gold-premium transition-colors text-2xl font-serif-luxury cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <a
                  href="#/login"
                  onClick={(e) => handleNavClick(e, 'login')}
                  className={`hover:text-gold-premium transition-colors ${
                    view === 'login' ? 'text-gold-premium font-bold' : ''
                  }`}
                >
                  Admin
                </a>
              )}
            </nav>

            <a
              href="https://wa.me/923011447981"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-gold-premium text-black font-bold uppercase tracking-widest text-sm text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" /> Call Showroom
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
