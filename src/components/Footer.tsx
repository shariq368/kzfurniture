import { MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === 'collections') {
      window.location.hash = '#/collections';
    } else {
      window.location.hash = '#/';
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <footer id="contact" className="bg-[#070707] text-white py-16 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Col 1: About Brand */}
        <div className="space-y-4">
          <a href="#/" onClick={(e) => handleLinkClick(e, 'hero')} className="flex items-end gap-3 select-none">
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
            <a
              href="#/collections"
              onClick={(e) => handleLinkClick(e, 'collections')}
              className="hover:text-white transition-colors"
            >
              Showroom Collections
            </a>
            <a
              href="#identity"
              onClick={(e) => handleLinkClick(e, 'identity')}
              className="hover:text-white transition-colors"
            >
              Our Philosophy
            </a>
            <a
              href="#craftsmanship"
              onClick={(e) => handleLinkClick(e, 'craftsmanship')}
              className="hover:text-white transition-colors"
            >
              Craftsmanship Process
            </a>
            <a
              href="#projects"
              onClick={(e) => handleLinkClick(e, 'projects')}
              className="hover:text-white transition-colors"
            >
              Featured Projects
            </a>
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Subscribed!');
            }}
            className="flex"
          >
            <input
              type="email"
              required
              placeholder="Email Address"
              className="w-full bg-[#121212] border border-white/10 text-xs px-4 py-2.5 text-white focus:outline-none focus:border-gold-premium transition-colors"
            />
            <button
              type="submit"
              className="bg-gold-premium text-black px-4 font-bold hover:bg-white transition-colors cursor-pointer"
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
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Showroom Catalog
          </a>
        </div>
      </div>
    </footer>
  );
}
