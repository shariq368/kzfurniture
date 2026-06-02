import { useState, useEffect } from 'react';
import type { Category } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Login from './pages/Login';

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

const DEFAULT_COLLECTIONS: Category[] = [
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

export default function App() {
  // Hash-based simple router
  const [view, setView] = useState<'home' | 'collections' | 'login'>(() => {
    const hash = window.location.hash;
    if (hash === '#/collections' || hash === '#collections') {
      return 'collections';
    }
    if (hash === '#/login' || hash === '#login') {
      return 'login';
    }
    return 'home';
  });

  // Central Collections State
  const [collections, setCollections] = useState<Category[]>(() => {
    const saved = localStorage.getItem('kz_collections');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse collections from localStorage', e);
      }
    }
    return DEFAULT_COLLECTIONS;
  });

  // Reusable Image Preview Lightbox State
  const [activePreviewImg, setActivePreviewImg] = useState<string | null>(null);

  // Authentication State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('kz_admin_logged_in') === 'true';
  });

  const handleLogout = () => {
    localStorage.removeItem('kz_admin_logged_in');
    setIsAdmin(false);
    window.location.hash = '#/';
  };

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/collections' || hash === '#collections') {
        setView('collections');
      } else if (hash === '#/login' || hash === '#login') {
        setView('login');
      } else {
        setView('home');
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Persist collections to localStorage when updated
  useEffect(() => {
    localStorage.setItem('kz_collections', JSON.stringify(collections));
  }, [collections]);

  // Centralized State Modifiers
  const handleAddCollection = (data: {
    name: string;
    subtitle: string;
    description: string;
    mainImage: string;
  }) => {
    if (!isAdmin) return;
    const id = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const newCol: Category = {
      id,
      name: data.name,
      subtitle: data.subtitle,
      description: data.description,
      mainImage: data.mainImage,
      gallery: data.mainImage ? [data.mainImage] : [],
    };
    setCollections((prev) => [...prev, newCol]);
  };

  const handleEditCollection = (
    id: string,
    data: { name: string; subtitle: string; description: string; mainImage: string }
  ) => {
    if (!isAdmin) return;
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const gallery = [...c.gallery];
          if (data.mainImage && !gallery.includes(data.mainImage)) {
            gallery.push(data.mainImage);
          }
          return {
            ...c,
            name: data.name,
            subtitle: data.subtitle,
            description: data.description,
            mainImage: data.mainImage,
            gallery,
          };
        }
        return c;
      })
    );
  };

  const handleDeleteCollection = (id: string) => {
    if (!isAdmin) return;
    setCollections((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddImage = (colId: string, imageUrl: string) => {
    if (!isAdmin) return;
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id === colId) {
          if (c.gallery.includes(imageUrl)) return c;
          const updatedGallery = [...c.gallery, imageUrl];
          return {
            ...c,
            gallery: updatedGallery,
            mainImage: c.mainImage ? c.mainImage : imageUrl,
          };
        }
        return c;
      })
    );
  };

  const handleDeleteImage = (colId: string, imageUrl: string) => {
    if (!isAdmin) return;
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id === colId) {
          const updatedGallery = c.gallery.filter((img) => img !== imageUrl);
          return {
            ...c,
            gallery: updatedGallery,
            mainImage: c.mainImage === imageUrl ? updatedGallery[0] || '' : c.mainImage,
          };
        }
        return c;
      })
    );
  };

  const handleSetCoverImage = (colId: string, imageUrl: string) => {
    if (!isAdmin) return;
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id === colId) {
          return {
            ...c,
            mainImage: imageUrl,
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen font-sans antialiased selection:bg-gold-premium selection:text-black">
      {/* Subtle background ambient lights */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-screen pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-gold-premium/5 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gold-premium/5 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-beige-warm/5 blur-[120px]" />
      </div>

      {/* Shared Header Navigation */}
      <Header view={view} isAdmin={isAdmin} onLogout={handleLogout} />

      {/* Routed Main View */}
      {view === 'home' ? (
        <Home onPreviewImage={setActivePreviewImg} />
      ) : view === 'login' ? (
        <Login onLoginSuccess={() => setIsAdmin(true)} />
      ) : (
        <Collections
          collections={collections}
          isAdmin={isAdmin}
          onAddCollection={handleAddCollection}
          onEditCollection={handleEditCollection}
          onDeleteCollection={handleDeleteCollection}
          onAddImage={handleAddImage}
          onDeleteImage={handleDeleteImage}
          onSetCoverImage={handleSetCoverImage}
          onPreviewImage={setActivePreviewImg}
        />
      )}

      {/* Shared Footer */}
      <Footer />

      {/* Shared Fullscreen Lightbox Image Preview */}
      <Lightbox imageSrc={activePreviewImg} onClose={() => setActivePreviewImg(null)} />
    </div>
  );
}
