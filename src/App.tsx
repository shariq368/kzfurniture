import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  Quote,
  Menu,
  X,
  Phone,
  MapPin,
  Sparkles
} from 'lucide-react';

// Image assets mapping from public/picture directory
const IMGS = {
  brandCard: '/picture/WhatsApp Image 2026-06-02 at 10.31.15 AM.jpeg',
  hero: '/picture/WhatsApp Image 2026-06-02 at 10.40.45 AM.jpeg',
  living1: '/picture/WhatsApp Image 2026-06-02 at 10.40.45 AM (1).jpeg',
  living2: '/picture/WhatsApp Image 2026-06-02 at 10.40.45 AM (2).jpeg',
  living3: '/picture/WhatsApp Image 2026-06-02 at 10.40.45 AM (3).jpeg',
  bedroom1: '/picture/WhatsApp Image 2026-06-02 at 10.40.46 AM.jpeg',
  bedroom2: '/picture/WhatsApp Image 2026-06-02 at 10.40.46 AM (1).jpeg',
  bedroom3: '/picture/WhatsApp Image 2026-06-02 at 10.40.46 AM (2).jpeg',
  dining1: '/picture/WhatsApp Image 2026-06-02 at 10.40.47 AM.jpeg',
  dining2: '/picture/WhatsApp Image 2026-06-02 at 10.40.47 AM (1).jpeg',
  office1: '/picture/WhatsApp Image 2026-06-02 at 10.40.48 AM.jpeg',
  office2: '/picture/WhatsApp Image 2026-06-02 at 10.40.48 AM (1).jpeg',
  project1: '/picture/WhatsApp Image 2026-06-02 at 10.42.30 AM.jpeg',
  project2: '/picture/WhatsApp Image 2026-06-02 at 10.42.30 AM (1).jpeg',
  project3: '/picture/WhatsApp Image 2026-06-02 at 10.42.31 AM.jpeg',
  project4: '/picture/WhatsApp Image 2026-06-02 at 10.42.31 AM (1).jpeg',
  project5: '/picture/WhatsApp Image 2026-06-02 at 10.42.32 AM.jpeg',
  project6: '/picture/WhatsApp Image 2026-06-02 at 10.42.32 AM (1).jpeg',
  project7: '/picture/WhatsApp Image 2026-06-02 at 10.42.32 AM (2).jpeg',
};

// Collections categories structure
const COLLECTIONS = [
  {
    id: 'living',
    name: 'Living Room Sets',
    subtitle: 'Comfort & Elegance',
    description: 'Sleek, minimalist sofas, premium leather accent chairs, and custom marble tables crafted to anchor your living spaces.',
    mainImage: IMGS.project1,
    gallery: [IMGS.project1, IMGS.project5, IMGS.project6]
  },
  {
    id: 'bedroom',
    name: 'Bedroom Collection',
    subtitle: 'Sanctuary of Rest',
    description: 'Bespoke beds with custom upholstered headboards, luxury dressers, and warm lighting options for an intimate sanctuary.',
    mainImage: IMGS.living1,
    gallery: [IMGS.hero, IMGS.living1, IMGS.living2, IMGS.living3, IMGS.bedroom1, IMGS.bedroom2, IMGS.bedroom3, IMGS.office2]
  },
  {
    id: 'office',
    name: 'Office Interiors',
    subtitle: 'Focus & Prestige',
    description: 'Executive wooden desks, ergonomic luxury chairs, and organized wall shelving to inspire focus, productivity, and status.',
    mainImage: IMGS.office1,
    gallery: [IMGS.office1]
  },
  {
    id: 'dining',
    name: 'Dining Luxury Sets',
    subtitle: 'Shared Masterpieces',
    description: 'Exquisite dining tables, plush velvet dining chairs, and warm minimalist sideboards for unforgettable dinners.',
    mainImage: IMGS.project7,
    gallery: [IMGS.project7, IMGS.project2, IMGS.dining1, IMGS.dining2]
  }
];

// Craftsmanship tags
const FEATURE_TAGS = [
  { text: 'Handcrafted Woodwork', rot: '-3deg', color: 'bg-gold-premium/15 text-gold-premium border-gold-premium/30' },
  { text: 'Premium Materials', rot: '2deg', color: 'bg-white/5 text-white border-white/10' },
  { text: 'Custom Design', rot: '-1deg', color: 'bg-beige-warm/20 text-beige-warm border-beige-warm/30' },
  { text: 'Modern Aesthetic', rot: '4deg', color: 'bg-white/5 text-white border-white/10' },
  { text: 'Durable Engineering', rot: '-2deg', color: 'bg-gold-premium/15 text-gold-premium border-gold-premium/30' },
  { text: 'Luxury Finish', rot: '3deg', color: 'bg-beige-warm/20 text-beige-warm border-beige-warm/30' }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(COLLECTIONS[0]);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState(COLLECTIONS[0].gallery[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePreviewImg, setActivePreviewImg] = useState<string | null>(null);

  // Track page scroll to toggle navigation style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update selected gallery image when category changes
  useEffect(() => {
    setSelectedGalleryImg(activeCategory.gallery[0]);
  }, [activeCategory]);



  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen font-sans antialiased selection:bg-gold-premium selection:text-black">

      {/* Subtle background ambient lights */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-screen pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-gold-premium/5 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gold-premium/5 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-beige-warm/5 blur-[120px]" />
      </div>

      {/* TOP NAVBAR (Minimal Luxury) */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-4 shadow-xl' : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo brand reference styled gold */}
          <a href="#" className="flex items-end gap-3 group select-none">
            <img src="/kzlogo.png" alt="K & Z Furniture & Interior" className="h-16 md:h-20 w-auto object-contain" />

          </a>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-10 text-sm tracking-widest text-gray-300">
            <a href="#collections" className="hover:text-gold-premium transition-colors duration-300 uppercase font-medium">Collections</a>
            <a href="#identity" className="hover:text-gold-premium transition-colors duration-300 uppercase font-medium">About Us</a>
            <a href="#craftsmanship" className="hover:text-gold-premium transition-colors duration-300 uppercase font-medium">Craftsmanship</a>
            <a href="#projects" className="hover:text-gold-premium transition-colors duration-300 uppercase font-medium">Projects</a>
            <a href="#contact" className="hover:text-gold-premium transition-colors duration-300 uppercase font-medium">Contact</a>
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
                <img src="/kzlogo.png" alt="K & Z Furniture & Interior" className="h-14 w-auto object-contain" />
                <span className="text-[10px] tracking-[0.25em] text-gold-premium font-sans-modern font-bold uppercase opacity-95 pb-1 whitespace-nowrap">
                  Furniture & Interior
                </span>
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
                href="#collections"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold-premium transition-colors"
              >
                Collections
              </a>
              <a
                href="#identity"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold-premium transition-colors"
              >
                About Us
              </a>
              <a
                href="#craftsmanship"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold-premium transition-colors"
              >
                Craftsmanship
              </a>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold-premium transition-colors"
              >
                Projects
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gold-premium transition-colors"
              >
                Contact
              </a>
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

      {/* SECTION A: HERO (Luxury Dark Showroom) */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-36 bg-spotlight overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Hero text */}
          <div className="lg:col-span-6 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 border border-gold-premium/30 px-3 py-1 bg-gold-premium/5">
                <Sparkles className="w-3.5 h-3.5 text-gold-premium animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-premium font-bold">
                  Bespoke Interior Excellence
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif-luxury font-bold leading-[1.1] text-white tracking-tight">
                Designing Spaces <br />
                That Define <br />
                <span className="text-gold-premium italic font-normal">Luxury Living</span>
              </h1>

              <p className="text-base md:text-lg text-gray-muted font-light max-w-xl leading-relaxed">
                Experience high-end design craftsmanship tailored for modern spaces. From luxury showroom curation to complete custom home makeovers, K & Z transforms architecture into art.
              </p>

              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <a
                  href="#collections"
                  className="bg-gold-premium text-black hover:bg-white hover:text-black transition-all duration-500 font-bold uppercase tracking-widest text-xs py-4.5 px-8 rounded-none flex items-center gap-2 shadow-xl shadow-gold-premium/5"
                >
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual Layout with Parallax Depth and Floating elements */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Primary Main Showroom Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-none overflow-hidden border border-white/10 shadow-2xl z-10 group cursor-pointer"
              onClick={() => setActivePreviewImg(IMGS.hero)}
            >
              <img
                src={IMGS.hero}
                alt="Modern luxury showroom interior"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="text-xs uppercase tracking-widest text-white font-medium flex items-center gap-1">
                  View Full Gallery <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>

            {/* Floating Card 1: Luxury Bed Close-up */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 40 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="absolute left-[-20px] bottom-[-40px] md:bottom-[-50px] w-40 sm:w-56 glass-panel p-2 shadow-2xl z-20 hidden sm:block border border-white/10"
              onClick={() => setActivePreviewImg(IMGS.living1)}
            >
              <div className="overflow-hidden aspect-[4/3]">
                <img
                  src={IMGS.living1}
                  alt="Bespoke luxury bed"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                />
              </div>
              <div className="p-2.5 space-y-0.5">
                <p className="text-[10px] text-gold-premium tracking-wider uppercase font-bold">Bedroom</p>
                <p className="text-xs font-serif-luxury font-bold text-white truncate">Bespoke Upholstered Bed</p>
              </div>
            </motion.div>

            {/* Floating Card 2: Dining Set Close-up */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -40 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="absolute right-[-10px] top-[-30px] w-36 sm:w-48 glass-panel p-2 shadow-2xl z-20 hidden sm:block border border-white/10"
              onClick={() => setActivePreviewImg(IMGS.dining1)}
            >
              <div className="overflow-hidden aspect-[4/3]">
                <img
                  src={IMGS.dining1}
                  alt="Elegant dining table setup"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                />
              </div>
              <div className="p-2.5 space-y-0.5">
                <p className="text-[10px] text-gold-premium tracking-wider uppercase font-bold">Dining Room</p>
                <p className="text-xs font-serif-luxury font-bold text-white truncate">Handcrafted Dining Set</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION B: BRAND IDENTITY & STATS (Light Luxury) */}
      <section id="identity" className="relative py-24 bg-[#E8DDCF] text-[#0B0B0B] z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Mission Statement */}
            <div className="lg:col-span-8 space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-gold-premium font-bold">
                Design Philosophy
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-bold leading-tight text-[#0B0B0B] tracking-tight">
                “We shape interiors that balance comfort, elegance, and function.”
              </h2>
              <div className="h-[2px] w-24 bg-gold-premium/60" />
              <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-2xl font-light">
                At K & Z Furniture & Interior, we believe every room tells a story. Our team combines premium, ethically sourced materials with innovative architectural designs to create functional sanctuaries that stand the test of time.
              </p>
            </div>

            {/* Side visual branding (Card reference) */}
            <div className="lg:col-span-4 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative bg-white/60 p-4 border border-black/5 shadow-xl max-w-xs cursor-pointer group"
                onClick={() => setActivePreviewImg(IMGS.brandCard)}
              >
                <div className="aspect-[3.5/2] overflow-hidden bg-[#0B0B0B] flex items-center justify-center p-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#121212] via-[#080808] to-gold-premium/10" />
                  <div className="text-center z-10 border border-gold-premium/30 px-6 py-4">
                    <h3 className="text-2xl font-serif-luxury font-bold text-gold-premium tracking-widest">K & Z</h3>
                    <p className="text-[7px] tracking-[0.4em] text-white mt-1">FURNITURE & INTERIOR</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[10px] text-gray-600 tracking-wider">
                  <span>OFFICIAL BRAND CARD</span>
                  <span className="text-gold-premium font-bold group-hover:translate-x-1 transition-transform">VIEW INFO →</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Stats Grid (4 Columns) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-black/10">
            {[
              { val: '10+', label: 'Years Experience' },
              { val: '500+', label: 'Completed Projects' },
              { val: '120+', label: 'Luxury Designs' },
              { val: '15+', label: 'Cities Served' }
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left space-y-1">
                <p className="text-4xl md:text-5xl font-serif-luxury font-bold text-[#0B0B0B]">{stat.val}</p>
                <p className="text-xs uppercase tracking-widest text-gray-600 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION C: COLLECTIONS SHOWCASE (Interactive scroll & Switch) */}
      <section id="collections" className="relative py-24 bg-[#0B0B0B] border-t border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-premium font-bold">Showroom Collections</span>
            <h2 className="text-3xl md:text-4xl font-serif-luxury font-bold text-white">Curated Spaces</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Sticky Left Navigation and Details */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">

              {/* Category selectors */}
              <div className="flex flex-col space-y-2">
                {COLLECTIONS.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category)}
                    className={`text-left py-4 px-6 border-l-2 text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-between ${activeCategory.id === category.id
                      ? 'border-gold-premium text-gold-premium bg-gold-premium/5 font-bold'
                      : 'border-white/10 text-gray-muted hover:border-white/30 hover:text-white'
                      }`}
                  >
                    <span>{category.name}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeCategory.id === category.id ? 'translate-x-1 text-gold-premium' : 'text-gray-600'
                      }`} />
                  </button>
                ))}
              </div>

              {/* Dynamic Description Box */}
              <div className="p-8 border border-white/5 bg-[#121212]/80 space-y-4 shadow-xl">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-gold-premium">
                  {activeCategory.subtitle}
                </span>
                <h3 className="text-xl font-serif-luxury font-bold text-white">{activeCategory.name}</h3>
                <p className="text-xs md:text-sm text-gray-muted leading-relaxed font-light">
                  {activeCategory.description}
                </p>
                <div className="pt-4">
                  <a
                    href="https://wa.me/923011447981"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-widest uppercase font-bold text-white hover:text-gold-premium transition-colors flex items-center gap-1.5"
                  >
                    Call Showroom <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right-hand Dynamic Image Gallery with Transitions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Large Selected Preview Image */}
              <div className="relative aspect-[16/10] bg-[#121212] overflow-hidden border border-white/10 group cursor-pointer"
                onClick={() => setActivePreviewImg(selectedGalleryImg)}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedGalleryImg}
                    src={selectedGalleryImg}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
                    alt={activeCategory.name}
                  />
                </AnimatePresence>
                <div className="absolute top-4 right-4 bg-black/60 px-3 py-1.5 text-[9px] tracking-widest uppercase text-gold-premium font-medium border border-gold-premium/30">
                  Interactive Catalog
                </div>
              </div>

              {/* Thumbnails to Switch Within Active Category */}
              <div className="grid grid-cols-4 gap-4">
                {activeCategory.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedGalleryImg(img)}
                    className={`relative aspect-[4/3] bg-[#121212] overflow-hidden border-2 transition-all duration-300 ${selectedGalleryImg === img ? 'border-gold-premium scale-[0.98]' : 'border-white/5 hover:border-white/30'
                      }`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="Thumbnail" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: CRAFTSMANSHIP HIGHLIGHTS (Dark Mode Studio) */}
      <section id="craftsmanship" className="relative py-28 bg-[#0B0B0B] border-t border-white/5 overflow-hidden z-10 bg-spotlight-bottom">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">

          <div className="max-w-2xl mx-auto space-y-6 mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-premium font-bold">Uncompromising Details</span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
              “Crafted with Precision, Designed for Living”
            </h2>
            <div className="h-[2px] w-20 bg-gold-premium/60 mx-auto" />
            <p className="text-sm md:text-base text-gray-muted font-light leading-relaxed">
              Every detail is engineered with excellence. From initial furniture blueprint drafts to final premium finishes, K & Z showroom sets demonstrate artistic architectural structures and unparalleled comfort.
            </p>
          </div>

          {/* Floating Clusters of Features Tags */}
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto py-8">
            {FEATURE_TAGS.map((tag, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, rotate: '0deg', y: -5 }}
                style={{ rotate: tag.rot }}
                className={`py-4 px-8 border text-sm font-bold uppercase tracking-widest cursor-pointer shadow-lg transition-all duration-300 ${tag.color}`}
              >
                {tag.text}
              </motion.div>
            ))}
          </div>

          {/* Structural Blueprint Silhouette Card */}
          <div className="mt-20 max-w-5xl mx-auto bg-[#121212]/40 border border-white/10 p-6 sm:p-12 relative overflow-hidden">
            {/* Blueprint Grid Lines Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(200,162,74,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(200,162,74,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {[
                { step: '01', title: 'Consultation & Curation', text: 'We coordinate with your space requirements, drawing up furniture floorplans and luxury style sheets.' },
                { step: '02', title: 'Master Crafting', text: 'Select premium solid wood, luxury fabrics, and customized steel structures assembled by expert builders.' },
                { step: '03', title: 'Installation & Fitout', text: 'Our professional white-glove installation team sets up your home, guaranteeing a flawless premium layout.' }
              ].map((item, idx) => (
                <div key={idx} className="text-left space-y-4 border-l border-gold-premium/20 pl-6">
                  <span className="text-xs font-mono text-gold-premium tracking-widest">{item.step}</span>
                  <h4 className="text-lg font-serif-luxury font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-gray-muted leading-relaxed font-light">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: PROJECTS & TESTIMONIALS (Light Mode Bento Grid) */}
      <section id="projects" className="relative py-24 bg-[#F2ECE4] text-[#0B0B0B] z-10 overflow-hidden">
        {/* Subtle grid decoration */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0B0B0B_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

          <div className="mb-16 space-y-4 flex flex-col md:flex-row md:items-end justify-between">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-gold-premium font-bold">Our Masterpieces</span>
              <h2 className="text-3xl md:text-4xl font-serif-luxury font-bold text-[#0B0B0B]">Editorial Projects</h2>
            </div>
            <p className="text-xs text-gray-600 max-w-xs font-light tracking-wide md:text-right">
              Explore before/after living room transformations and designer sketches from K & Z design projects.
            </p>
          </div>

          {/* Bento Grid Editorial Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* Card 1: Featured Sofa Showcase (6 Cols) */}
            <div className="md:col-span-8 lg:col-span-7 bg-white p-6 border border-black/5 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] tracking-widest uppercase font-bold text-gold-premium">Featured Showcase</span>
                <h3 className="text-xl font-serif-luxury font-bold text-[#0B0B0B]">Luxury Living Room Design</h3>
                <p className="text-xs text-gray-500 font-light">A stunning showcase of our premium curved velvet sofa, custom brass accents, and minimalist wood paneling designed for modern residences.</p>
              </div>

              {/* Enhanced Sofa Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden border border-black/10 shadow-lg cursor-pointer"
                onClick={() => setActivePreviewImg(IMGS.project1)}>
                <img
                  src={IMGS.project1}
                  alt="Luxury Living Room Sofa Design"
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Card 2: Testimonial Card (4 Cols) */}
            <div className="md:col-span-4 lg:col-span-5 bg-[#0B0B0B] text-white p-8 border border-white/10 shadow-2xl flex flex-col justify-between space-y-12">
              <Quote className="w-10 h-10 text-gold-premium opacity-50" />
              <div className="space-y-4">
                <p className="text-lg md:text-xl font-serif-luxury leading-relaxed italic text-white/90">
                  “K & Z transformed our empty apartment into a masterpiece of luxury. Every custom sofa and dining table feels handcrafted just for us.”
                </p>
                <div className="h-[1px] w-12 bg-gold-premium/40" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-premium/20 border border-gold-premium/40 flex items-center justify-center text-gold-premium font-serif font-bold">
                  N
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide">Noor Ahmed</h4>
                  <p className="text-[10px] text-gray-muted uppercase tracking-widest">Villa Owner, Karachi</p>
                </div>
              </div>
            </div>

            {/* Card 3: Designer Working Sketch Card (5 Cols) */}
            <div className="md:col-span-5 bg-white p-6 border border-black/5 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group cursor-pointer"
              onClick={() => setActivePreviewImg(IMGS.project3)}>
              {/* Thin vector blueprint doodles overlay */}
              <div className="absolute top-2 right-2 w-24 h-24 border-r border-t border-gold-premium/20 pointer-events-none" />

              <div className="space-y-2">
                <span className="text-[10px] tracking-widest uppercase font-bold text-gold-premium font-mono">Drawing Board</span>
                <h3 className="text-lg font-serif-luxury font-bold text-[#0B0B0B]">Architectural Curation</h3>
                <p className="text-xs text-gray-500 font-light leading-relaxed">Our designers outline structural alignments before showroom layout curation starts.</p>
              </div>

              <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative border border-black/5">
                <img
                  src={IMGS.project3}
                  alt="Architectural furniture design sketching"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-xs font-bold text-white bg-black/70 px-4 py-2 border border-white/10 uppercase tracking-widest">Zoom Sketch</span>
                </div>
              </div>
            </div>

            {/* Card 4: Modern Villa Showcase (7 Cols) */}
            <div className="md:col-span-7 bg-white p-6 border border-black/5 shadow-xl flex flex-col justify-between space-y-6 group cursor-pointer"
              onClick={() => setActivePreviewImg(IMGS.project4)}>
              <div className="space-y-2">
                <span className="text-[10px] tracking-widest uppercase font-bold text-gold-premium">Residential Showcase</span>
                <h3 className="text-lg font-serif-luxury font-bold text-[#0B0B0B]">Minimalist Villa</h3>
                <p className="text-xs text-gray-500 font-light">Custom open-plan configuration blending dining luxury sets with concrete textures.</p>
              </div>

              <div className="aspect-[16/9] bg-gray-100 overflow-hidden relative border border-black/5">
                <img
                  src={IMGS.project4}
                  alt="Modern Minimalist Villa Interior"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-xs font-bold text-white bg-black/70 px-4 py-2 border border-white/10 uppercase tracking-widest">Zoom Image</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION F: CALL TO ACTION (Dark Luxury Finish) */}
      <section className="relative py-28 bg-[#0B0B0B] overflow-hidden z-10 border-t border-white/5 bg-spotlight">

        {/* Drawing vector curves as grid sketch decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold-premium/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-gold-premium/5 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10 space-y-8">

          <div className="inline-flex items-center gap-1.5 border border-gold-premium/30 px-3 py-1 bg-gold-premium/5">
            <span className="text-[9px] uppercase tracking-[0.25em] text-gold-premium font-bold">
              Begin Your Journey
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-serif-luxury font-bold text-white leading-tight">
            Bring your <span className="gold-underline text-gold-premium italic font-normal">dream</span> interior <br />to life
          </h2>

          <p className="text-sm md:text-base text-gray-muted max-w-xl mx-auto leading-relaxed font-light">
            Schedule a private consultation at our luxury showroom. Work with our master interior design architects to map out custom drafts and choose premium finishes.
          </p>

          <div className="pt-4 flex justify-center items-center">
            <a
              href="https://wa.me/923011447981"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-gold-premium text-black hover:bg-white transition-all duration-500 font-bold uppercase tracking-widest text-xs py-4.5 px-10 rounded-none shadow-xl shadow-gold-premium/5 flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" /> Call Showroom
            </a>
          </div>
        </div>

        {/* Decorative subtle floating chair vector silhouette representation */}
        <div className="absolute right-[5%] bottom-[10%] opacity-15 pointer-events-none hidden xl:block select-none">
          <svg width="220" height="220" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 80 L25 50 M75 80 L75 50 M30 85 L30 80 M70 85 L70 80 M20 50 L80 50 M25 50 Q25 20 50 20 Q75 20 75 50" stroke="#C8A24A" strokeWidth="1" />
            <path d="M22 55 L78 55" stroke="#C8A24A" strokeWidth="2" />
          </svg>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-[#070707] text-white py-16 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Col 1: About Brand */}
          <div className="space-y-4">
            <a href="#" className="flex items-end gap-3 select-none">
              <img src="/kzlogo.png" alt="K & Z Furniture & Interior" className="h-16 w-auto object-contain" />

            </a>
            <p className="text-xs text-gray-muted leading-relaxed font-light">
              Bespoke luxury interior designs, curated furniture showrooms, and custom woodwork built to elevate modern spaces.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-gold-premium font-bold">Quick Links</h4>
            <div className="flex flex-col space-y-2 text-xs text-gray-muted">
              <a href="#collections" className="hover:text-white transition-colors">Showroom Collections</a>
              <a href="#identity" className="hover:text-white transition-colors">Our Philosophy</a>
              <a href="#craftsmanship" className="hover:text-white transition-colors">Craftsmanship Process</a>
              <a href="#projects" className="hover:text-white transition-colors">Featured Projects</a>
            </div>
          </div>

          {/* Col 3: Contact details */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-gold-premium font-bold">Visit Showroom</h4>
            <div className="flex flex-col space-y-3 text-xs text-gray-muted">
              <span className="flex items-start gap-2 leading-relaxed">
                <MapPin className="w-4 h-4 text-gold-premium shrink-0" />
                <span>Sector F, Manzoor Colony, Near Maryam Masjid, Shaheed-e-Millat Road, Karachi</span>
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-premium" />
                <span>+92 3011447981 | 3092959329</span>
              </span>

            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-gold-premium font-bold">Newsletter</h4>
            <p className="text-xs text-gray-muted font-light leading-relaxed">
              Subscribe to receive exclusive access to new seasonal interior releases and showroom event invites.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }} className="flex">
              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full bg-[#121212] border border-white/10 text-xs px-4 py-2.5 text-white focus:outline-none focus:border-gold-premium transition-colors"
              />
              <button
                type="submit"
                className="bg-gold-premium text-black px-4 font-bold hover:bg-white transition-colors"
              >
                →
              </button>
            </form>
          </div>

        </div>

        {/* Footer Bottom bar */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] text-gray-500 tracking-wider">
          <p>© {new Date().getFullYear()} K & Z Furniture & Interior. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Showroom Catalog</a>
          </div>
        </div>
      </footer>



      {/* FULL-SIZE IMAGE PREVIEW LIGHTBOX */}
      <AnimatePresence>
        {activePreviewImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePreviewImg(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] z-10 border border-white/10"
            >
              <button
                onClick={() => setActivePreviewImg(null)}
                className="absolute top-[-40px] right-0 text-white hover:text-gold-premium flex items-center gap-1 text-xs tracking-widest uppercase font-bold"
              >
                Close <X className="w-4 h-4" />
              </button>
              <img
                src={activePreviewImg}
                alt="Enlarged showroom preview"
                className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
