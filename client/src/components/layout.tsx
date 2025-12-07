import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Logo } from "./ui/logo";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Instagram, Facebook, MapPin } from "lucide-react";
import { theme } from "@/lib/theme";

export function Layout({ children, transparent = false }: { children: React.ReactNode; transparent?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine header style based on transparent prop and scroll state
  const isTransparentState = transparent && !isScrolled;
  
  // Text colors
  const textColorClass = isTransparentState ? "text-white" : "text-foreground";
  const logoVariant = isTransparentState ? "dark" : "light"; // "dark" variant is white logo for dark backgrounds
  const subTextColorClass = isTransparentState ? "text-white/80" : "text-muted-foreground";
  const navLinkColor = isTransparentState 
    ? "text-white hover:text-saffron" 
    : "text-foreground/80 hover:text-saffron";
  const activeNavLinkColor = "text-saffron font-bold";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans overflow-x-hidden">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-nav py-3 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <Logo
              className="w-16 h-16 md:w-20 md:h-20 text-saffron drop-shadow-sm"
              variant={logoVariant}
            />
            <div className="flex flex-col">
              <span className={`font-serif text-2xl md:text-3xl font-bold tracking-wide transition-colors leading-none ${textColorClass} group-hover:text-saffron`}>
                SHANVI
              </span>
              <span className={`text-xs md:text-sm uppercase tracking-[0.2em] transition-colors mt-1 ${subTextColorClass} group-hover:text-saffron`}>
                Property Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-base font-medium tracking-wide transition-all duration-300 relative py-1 underline-animation ${
                  location === link.href
                    ? activeNavLinkColor
                    : navLinkColor
                }`}
              >
                  {link.label}
                  {location === link.href && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-saffron to-gold rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
              </Link>
            ))}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/contact" className="bg-gradient-to-r from-saffron to-amber-500 hover:from-amber-500 hover:to-saffron text-black font-bold px-6 py-3 rounded-full text-sm transition-all duration-300 shadow-lg shadow-saffron/20 whitespace-nowrap btn-shine inline-block">
                  Get in Touch
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-2 ${textColorClass}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="text-foreground" /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="text-2xl font-serif text-foreground hover:text-saffron"
                  onClick={() => setMobileMenuOpen(false)}
                >
                    {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-20 md:pt-24">{children}</main>

      {/* Footer - Keeping it dark for contrast and tradition, but updating logo usage */}
      <footer className="bg-[#1a1a1a] text-white border-t border-white/5 pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Logo className="w-8 h-8 text-white/50" variant="dark" />
                <span className="font-serif font-bold text-white">
                  Shanvi Properties
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Elevating the real estate experience in Madhya Pradesh and
                across India. Trust, transparency, and tradition.
              </p>
            </div>

            <div>
              <h4 className="text-saffron font-serif mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <Link href="/" className="hover:text-saffron transition-colors">Home</Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-saffron transition-colors">
                      About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-saffron transition-colors">
                      Services
                  </Link>
                </li>
                <li>
                  <Link href="/pan-india" className="hover:text-saffron transition-colors">
                      Pan-India Projects
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-saffron font-serif mb-4">Cities</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <Link href="/city/bhopal" className="hover:text-saffron transition-colors">
                      Bhopal Real Estate
                  </Link>
                </li>
                <li>
                  <Link href="/city/vidisha" className="hover:text-saffron transition-colors">
                      Vidisha Properties
                  </Link>
                </li>
                <li>
                  <Link href="/city/raisen" className="hover:text-saffron transition-colors">
                      Raisen Opportunities
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-saffron font-serif mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-saffron" />
                  <span>Shop No. 52, Bajrang Market, BHEL, Bhopal - 462022</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-saffron" />
                  <span>+91 92430 23754 / +91 9039627923</span>
                </li>
                <li className="flex gap-4 mt-4">
                  <a
                    href="#"
                    className="bg-white/10 p-2 rounded-full hover:bg-saffron hover:text-black transition-all"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="bg-white/10 p-2 rounded-full hover:bg-saffron hover:text-black transition-all"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

            <div className="border-t border-white/10 pt-8 text-center text-xs text-white/30">
            <p>
              &copy; {new Date().getFullYear()} Shanvi Property
              Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <motion.a
        href="https://wa.me/919243023754"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg z-50 hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="fill-white stroke-none"
        >
          <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.966-.944 1.164-.173.199-.347.223-.647.075-.299-.15-1.258-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.767-.721 2.016-1.418.249-.697.249-1.294.174-1.418-.074-.125-.272-.2-.572-.35z"></path>
        </svg>
      </motion.a>
    </div>
  );
}
