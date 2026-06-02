import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; subtitle: string; description: string; mainImage: string }) => void;
  initialData?: { name: string; subtitle: string; description: string; mainImage: string };
  title: string;
}

export default function CollectionModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  title,
}: CollectionModalProps) {
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || '');
      setSubtitle(initialData?.subtitle || '');
      setDescription(initialData?.description || '');
      setMainImage(initialData?.mainImage || '');
      setFileError('');
    }
  }, [isOpen, initialData]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFileError('Please select a valid image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size must be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        compressImage(reader.result);
      }
    };
    reader.onerror = () => {
      setFileError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const compressImage = (base64Str: string) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 600;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        setMainImage(compressedBase64);
        setFileError('');
      } else {
        setMainImage(base64Str);
        setFileError('');
      }
    };
    img.onerror = () => {
      setFileError('Invalid image data.');
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFileError('Collection name is required.');
      return;
    }
    onSave({
      name: name.trim(),
      subtitle: subtitle.trim() || 'Curated Spaces',
      description: description.trim() || 'A beautiful collection of custom furniture designs.',
      mainImage: mainImage.trim(),
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-lg w-full glass-panel bg-[#121212]/95 p-6 sm:p-8 shadow-2xl border border-gold-premium/20 z-10 space-y-5 overflow-y-auto max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-serif-luxury font-bold text-white uppercase tracking-wider">
                {title}
              </h3>
              <p className="text-xs text-gray-muted font-light leading-relaxed">
                Fill in the details below to configure your showroom collection.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-gold-premium font-bold block">
                  Collection Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Patio Sets"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-premium transition-colors rounded-none font-sans-modern"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-gold-premium font-bold block">
                  Subtitle
                </label>
                <input
                  type="text"
                  placeholder="e.g. Comfort & Elegance"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-premium transition-colors rounded-none font-sans-modern"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-gold-premium font-bold block">
                  Description
                </label>
                <textarea
                  placeholder="Describe this collection's craftsmanship, styles, or options..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-[#1A1A1A] border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-premium transition-colors rounded-none font-sans-modern resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-wider text-gold-premium font-bold block">
                  Cover Photo (Optional)
                </label>

                {mainImage ? (
                  <div className="relative aspect-[16/9] border border-white/10 bg-[#1A1A1A] overflow-hidden group">
                    <img src={mainImage} className="w-full h-full object-cover" alt="Cover preview" />
                    <button
                      type="button"
                      onClick={() => setMainImage('')}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs uppercase tracking-widest text-red-500 font-bold cursor-pointer"
                    >
                      Remove Cover Photo
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Method 1: File Upload */}
                    <label className="border border-dashed border-white/10 hover:border-gold-premium/40 bg-white/5 hover:bg-gold-premium/5 p-4 rounded-none flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-300 group text-center">
                      <Upload className="w-5 h-5 text-gray-400 group-hover:text-gold-premium transition-colors" />
                      <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">
                        Upload Image
                      </span>
                      <span className="text-[8px] text-gray-muted">Max 5MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>

                    {/* Method 2: URL Paste */}
                    <div className="border border-white/10 bg-[#1A1A1A] p-4 flex flex-col justify-center space-y-2">
                      <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">
                        Or Paste Web URL
                      </span>
                      <input
                        type="text"
                        placeholder="https://example.com/image.jpg"
                        value={mainImage}
                        onChange={(e) => setMainImage(e.target.value)}
                        className="w-full bg-[#242424] border border-white/5 px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-gold-premium transition-colors rounded-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {fileError && (
                <p className="text-xs text-red-500 text-center font-medium">{fileError}</p>
              )}

              <div className="pt-2 flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 border border-white/10 hover:border-white/30 text-white font-bold uppercase tracking-widest text-xs py-3 hover:bg-white/5 transition-colors rounded-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-gold-premium text-black font-bold uppercase tracking-widest text-xs py-3 hover:bg-white transition-colors duration-500 rounded-none shadow-xl shadow-gold-premium/5 cursor-pointer"
                >
                  Save Collection
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
