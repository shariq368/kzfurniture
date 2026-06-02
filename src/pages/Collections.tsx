import { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Star,
  Check,
  Eye,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import type { Category } from '../types';
import CollectionModal from '../components/CollectionModal';
import AddPhotoModal from '../components/AddPhotoModal';

interface CollectionsProps {
  collections: Category[];
  onAddCollection: (data: { name: string; subtitle: string; description: string; mainImage: string }) => void;
  onEditCollection: (id: string, data: { name: string; subtitle: string; description: string; mainImage: string }) => void;
  onDeleteCollection: (id: string) => void;
  onAddImage: (colId: string, imageUrl: string) => void;
  onDeleteImage: (colId: string, imageUrl: string) => void;
  onSetCoverImage: (colId: string, imageUrl: string) => void;
  onPreviewImage: (src: string) => void;
}

export default function Collections({
  collections,
  onAddCollection,
  onEditCollection,
  onDeleteCollection,
  onAddImage,
  onDeleteImage,
  onSetCoverImage,
  onPreviewImage,
}: CollectionsProps) {
  const [activeId, setActiveId] = useState<string>('');

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);

  // Sync activeId when collections load or change
  useEffect(() => {
    if (collections.length > 0) {
      if (!activeId || !collections.find((c) => c.id === activeId)) {
        setActiveId(collections[0].id);
      }
    } else {
      setActiveId('');
    }
  }, [collections, activeId]);

  const activeCategory = collections.find((c) => c.id === activeId);

  const handleCreateSave = (data: {
    name: string;
    subtitle: string;
    description: string;
    mainImage: string;
  }) => {
    onAddCollection(data);
  };

  const handleEditSave = (data: {
    name: string;
    subtitle: string;
    description: string;
    mainImage: string;
  }) => {
    if (activeId) {
      onEditCollection(activeId, data);
    }
  };

  const handleDeleteActive = () => {
    if (!activeId || !activeCategory) return;
    if (
      confirm(
        `Are you sure you want to delete the collection "${activeCategory.name}"? This action cannot be undone.`
      )
    ) {
      const remaining = collections.filter((c) => c.id !== activeId);
      onDeleteCollection(activeId);
      if (remaining.length > 0) {
        setActiveId(remaining[0].id);
      } else {
        setActiveId('');
      }
    }
  };

  const handleBackToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '#/';
  };

  return (
    <section className="relative pt-32 pb-24 bg-spotlight overflow-hidden z-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb / Nav Action */}
        <div className="mb-8">
          <a
            href="#/"
            onClick={handleBackToHome}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-premium hover:text-white transition-colors duration-300 font-bold group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </a>
        </div>

        {/* Collections Page Header */}
        <div className="mb-12 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-premium font-bold">
            Showroom Portfolios
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-bold text-white tracking-tight">
            Curated Spaces & Galleries
          </h1>
          <p className="text-sm md:text-base text-gray-muted max-w-2xl font-light leading-relaxed">
            Create, rename, and configure our premium showroom collections. Manage details, upload high-quality photography, and define branding cover layouts in real time.
          </p>
        </div>

        {collections.length === 0 ? (
          /* Empty Collections State */
          <div className="glass-panel border border-white/10 p-12 md:p-20 text-center flex flex-col items-center justify-center gap-6 max-w-2xl mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-gold-premium/10 flex items-center justify-center text-gold-premium border border-gold-premium/30 animate-pulse">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif-luxury font-bold text-white uppercase tracking-wider">
                No Collections Curated
              </h3>
              <p className="text-sm text-gray-muted max-w-md font-light leading-relaxed">
                Our portfolio is currently empty. Get started by designing your first custom furniture collection showcase.
              </p>
            </div>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="bg-gold-premium text-black font-bold uppercase tracking-widest text-xs py-4 px-8 hover:bg-white transition-colors duration-500 rounded-none shadow-xl shadow-gold-premium/5 cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Create First Collection
            </button>
          </div>
        ) : (
          /* Collection Workspace Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Sidebar Navigation */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-panel border border-white/10 bg-[#121212]/50 p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-widest text-white font-bold flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-gold-premium" /> Collections ({collections.length})
                  </h3>
                  <button
                    onClick={() => setIsCreateOpen(true)}
                    className="text-[10px] uppercase tracking-widest text-gold-premium hover:text-white font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Create
                  </button>
                </div>

                <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1 no-scrollbar">
                  {collections.map((cat) => {
                    const isActive = cat.id === activeId;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveId(cat.id)}
                        className={`w-full text-left p-3 border text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                          isActive
                            ? 'border-gold-premium text-gold-premium bg-gold-premium/5 font-bold'
                            : 'border-white/5 text-gray-muted bg-[#1A1A1A]/40 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <div className="w-12 h-9 bg-black/40 border border-white/10 shrink-0 overflow-hidden">
                          {cat.mainImage ? (
                            <img src={cat.mainImage} className="w-full h-full object-cover" alt="" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#1E1E1E]">
                              <ImageIcon className="w-3.5 h-3.5 text-gray-700" />
                            </div>
                          )}
                        </div>
                        <div className="truncate flex-1">
                          <p className="font-bold truncate">{cat.name}</p>
                          <p className="text-[9px] text-gray-500 lowercase mt-0.5">
                            {cat.gallery.length} {cat.gallery.length === 1 ? 'photo' : 'photos'}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setIsCreateOpen(true)}
                  className="w-full border border-dashed border-gold-premium/45 hover:border-gold-premium bg-gold-premium/5 hover:bg-gold-premium hover:text-black text-gold-premium text-center py-3.5 font-bold uppercase tracking-widest text-xs transition-all duration-500 rounded-none cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Create Collection
                </button>
              </div>
            </div>

            {/* Right Column: Active Workspace */}
            <div className="lg:col-span-8">
              {activeCategory ? (
                <div className="glass-panel border border-white/10 bg-[#121212]/30 p-6 sm:p-8 space-y-8">
                  {/* Category Details */}
                  <div className="border-b border-white/5 pb-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-2.5 max-w-xl">
                      <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-gold-premium px-2 py-0.5 bg-gold-premium/5 border border-gold-premium/20 inline-block">
                        {activeCategory.subtitle}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
                        {activeCategory.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-muted leading-relaxed font-light">
                        {activeCategory.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 flex-wrap">
                      <button
                        onClick={() => setIsAddPhotoOpen(true)}
                        className="bg-gold-premium text-black font-bold uppercase tracking-widest text-[10px] py-2 px-4 hover:bg-white transition-all duration-500 rounded-none shadow-md cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Photo
                      </button>
                      <button
                        onClick={() => setIsEditOpen(true)}
                        className="border border-white/15 hover:border-white/40 text-white font-bold uppercase tracking-widest text-[10px] py-2 px-4 hover:bg-white/5 transition-all rounded-none cursor-pointer flex items-center gap-1"
                        title="Rename & edit details"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-gold-premium" /> Edit
                      </button>
                      <button
                        onClick={handleDeleteActive}
                        className="border border-red-500/30 hover:border-red-500 text-red-400 hover:text-white font-bold uppercase tracking-widest text-[10px] py-2 px-4 hover:bg-red-500/10 transition-all rounded-none cursor-pointer flex items-center gap-1"
                        title="Delete entire collection"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>

                  {/* Active Gallery */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-white font-bold mb-6 flex items-center gap-1.5">
                      Showroom Gallery ({activeCategory.gallery.length} Images)
                    </h4>

                    {activeCategory.gallery.length === 0 ? (
                      /* Empty active category state */
                      <div className="border border-dashed border-white/10 p-12 text-center flex flex-col items-center justify-center gap-4 bg-[#121212]/40">
                        <ImageIcon className="w-8 h-8 text-gray-600" />
                        <div className="space-y-1">
                          <p className="text-xs uppercase tracking-wider font-bold text-gray-300">
                            Empty Gallery Portfolio
                          </p>
                          <p className="text-[11px] text-gray-500 font-light">
                            Showcase this collection by adding images of furniture sets or projects.
                          </p>
                        </div>
                        <button
                          onClick={() => setIsAddPhotoOpen(true)}
                          className="border border-gold-premium text-gold-premium hover:bg-gold-premium hover:text-black text-[10px] uppercase font-bold tracking-widest py-2 px-5 transition-all duration-300 rounded-none cursor-pointer"
                        >
                          Add First Photo
                        </button>
                      </div>
                    ) : (
                      /* Image Grid */
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {activeCategory.gallery.map((imgSrc, idx) => {
                          const isCover = activeCategory.mainImage === imgSrc;
                          return (
                            <div
                              key={idx}
                              className="relative aspect-[4/3] group overflow-hidden border border-white/5 bg-[#1C1C1C] flex items-center justify-center"
                            >
                              <img
                                src={imgSrc}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                alt=""
                              />

                              {/* Cover Badge */}
                              {isCover && (
                                <div className="absolute top-2 left-2 bg-gold-premium text-black px-2 py-0.5 text-[8px] uppercase tracking-widest font-bold shadow-md flex items-center gap-0.5 z-10 border border-gold-premium/40">
                                  <Star className="w-2.5 h-2.5 fill-black" /> Cover
                                </div>
                              )}

                              {/* Hover Action Panel */}
                              <div className="absolute inset-0 bg-black/85 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 z-10">
                                <div className="flex items-center justify-between w-full">
                                  {isCover ? (
                                    <span className="text-[8px] text-gold-premium uppercase tracking-widest font-bold inline-flex items-center gap-0.5">
                                      <Check className="w-3 h-3" /> Current Cover
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => onSetCoverImage(activeCategory.id, imgSrc)}
                                      className="text-[8px] text-white hover:text-gold-premium uppercase tracking-widest font-bold inline-flex items-center gap-0.5 cursor-pointer hover:bg-white/5 px-2 py-1 transition-colors"
                                    >
                                      <Star className="w-2.5 h-2.5" /> Make Cover
                                    </button>
                                  )}

                                  <button
                                    onClick={() => {
                                      if (
                                        confirm(
                                          'Are you sure you want to remove this photo from the collection?'
                                        )
                                      ) {
                                        onDeleteImage(activeCategory.id, imgSrc);
                                      }
                                    }}
                                    className="p-1 bg-black/50 hover:bg-red-600/90 text-white rounded-full border border-white/10 hover:border-transparent transition-all cursor-pointer"
                                    title="Delete Photo"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => onPreviewImage(imgSrc)}
                                  className="w-full bg-white/10 hover:bg-gold-premium hover:text-black py-2 text-[9px] uppercase tracking-widest font-bold transition-all duration-300 border border-white/5 hover:border-transparent cursor-pointer flex items-center justify-center gap-1"
                                >
                                  <Eye className="w-3 h-3" /> Zoom Preview
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="glass-panel border border-white/10 p-12 text-center text-gray-500 font-light">
                  Select a collection from the sidebar to manage it.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      <CollectionModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCreateSave}
        title="Create Collection"
      />

      <CollectionModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEditSave}
        initialData={
          activeCategory
            ? {
                name: activeCategory.name,
                subtitle: activeCategory.subtitle,
                description: activeCategory.description,
                mainImage: activeCategory.mainImage,
              }
            : undefined
        }
        title="Edit Collection Details"
      />

      <AddPhotoModal
        isOpen={isAddPhotoOpen}
        onClose={() => setIsAddPhotoOpen(false)}
        onAdd={(imageUrl) => {
          if (activeId) {
            onAddImage(activeId, imageUrl);
          }
        }}
        collectionName={activeCategory?.name || ''}
      />
    </section>
  );
}
