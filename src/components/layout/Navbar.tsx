/**
 * Navbar - Sticky navigation with scroll-based effects
 * Features: Glass morphism, smooth transitions, active section tracking
 */

import { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'socials', label: 'Contact' },
];

const navVariants = {
  hidden: { 
    y: 0,
    opacity: 1
  },
  visible: { 
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const Navbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  
  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;
    
    if (currentScrollY < 100) {
      setIsScrolled(false);
    } else {
      setIsScrolled(true);
    }
    
    lastScrollY.current = currentScrollY;
  });
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);
    
    navItems.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    
    return () => observer.disconnect();
  }, []);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };
  
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);
  
  return (
    <>
      <motion.header
        variants={navVariants}
        initial="visible"
        animate="visible"
        className={`
          fixed top-0 left-0 right-0 z-50 
          transition-all duration-500 ease-expo-out
          ${isScrolled ? 'py-4' : 'py-6'}
        `}
      >
        <div className="section-container">
          <nav
            className={`
              flex items-center justify-between px-6 py-4 rounded-full
              transition-all duration-500 ease-expo-out
              ${isScrolled 
                ? 'glass shadow-lg' 
                : 'bg-transparent'
              }
            `}
          >
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-display text-2xl font-bold tracking-tight">
                <span className="text-pearl">DEV</span>
                <span className="text-electric">.</span>
              </span>
              <div className="absolute inset-0 bg-electric/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.a>
            
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map(({ id, label }) => (
                <li key={id}>
                  <motion.button
                    onClick={() => scrollToSection(id)}
                    className={`
                      relative px-5 py-2 font-body text-sm font-medium tracking-wide
                      transition-colors duration-300
                      ${activeSection === id 
                        ? 'text-electric' 
                        : 'text-silver hover:text-pearl'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {label}
                    {activeSection === id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-electric rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30
                        }}
                      />
                    )}
                  </motion.button>
                </li>
              ))}
            </ul>
            
            <motion.a
              href="mailto:devbansal08@gmail.com"
              className="hidden md:inline-flex btn-primary text-xs px-6 py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Talk
            </motion.a>
            
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-60 p-2 text-pearl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </nav>
        </div>
      </motion.header>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-void/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <div className="relative h-full flex flex-col items-center justify-center gap-8 p-8">
              {navItems.map(({ id, label }, index) => (
                <motion.button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 }
                  }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`
                    font-display text-4xl font-bold tracking-tight
                    transition-colors duration-300
                    ${activeSection === id 
                      ? 'text-electric' 
                      : 'text-pearl hover:text-electric'
                    }
                  `}
                >
                  {label}
                </motion.button>
              ))}
              
              <motion.a
                href="mailto:devbansal08@gmail.com"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: navItems.length * 0.1 }
                }}
                exit={{ opacity: 0, y: -20 }}
                className="btn-primary mt-8"
              >
                Let's Talk
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;