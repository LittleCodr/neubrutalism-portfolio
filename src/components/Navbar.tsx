import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useGSAP('.nav-item', {
    from: { y: -50, opacity: 0 },
    to: { y: 0, opacity: 1 },
    staggerChildren: 0.1,
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 10);

      // Determine active section
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass py-2 border-b border-white/10' : 'bg-transparent py-4'
      }`}
    >
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <a 
          href="#home" 
          className="text-2xl md:text-3xl font-bold neon-text"
          style={{ color: 'var(--primary)' }}
        >
          M<span className="">AYANK</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={`nav-item nav-link text-lg ${
                activeSection === link.href.substring(1) ? 'active font-bold' : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobsile Navigation Toggle */}
        <button 
          className="md:hidden neubrutalism-button glass"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-[#0b0f14]/95 backdrop-blur-md transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col h-full justify-center items-center space-y-8 p-6">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-2xl font-bold neon-link"
              style={{ color: activeSection === link.href.substring(1) ? 'var(--secondary)' : 'var(--light)' }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({
                  behavior: 'smooth',
                });
                setIsOpen(false);
              }}
            >
              {link.name}
            </a>
          ))}
          <button 
            className="absolute top-6 right-6 neubrutalism-button glass"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;