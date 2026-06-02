import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AddPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (imageUrl: string) => void;
  collectionName: string;
}

export default function AddPhotoModal({
  isOpen,
  onClose,
  onAdd,
  collectionName,
}: AddPhotoModalProps) {
  const [newImageUrl, setNewImageUrl] = useState('');
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNewImageUrl('');
      setFileError('');
    }
  }, [isOpen]);

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
        compressAndAddImage(reader.result);
      }
    };
    reader.onerror = () => {
      setFileError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const compressAndAddImage = (base64Str: string) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 1200;
      const MAX_HEIGHT = 900;
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
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
        try {
          onAdd(compressedBase64);
          onClose();
        } catch (e) {
          setFileError('Storage quota exceeded. Try a web image URL or a smaller image.');
        }
      } else {
        try {
          onAdd(base64Str);
          onClose();
        } catch (e) {
          setFileError('Storage quota exceeded. Try a web image URL or a smaller image.');
        }
      }
    };
    img.onerror = () => {
      setFileError('Invalid image data.');
    };
  };

  const handleUrlSubmit = () => {
    if (newImageUrl.trim()) {
      onAdd(newImageUrl.trim());
      onClose();
    } else {
      setFileError('Please enter a valid image web URL.');
    }
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
            className="relative max-w-md w-full glass-panel bg-[#121212]/95 p-6 sm:p-8 shadow-2xl border border-gold-premium/20 z-10 space-y-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-serif-luxury font-bold text-white uppercase tracking-wider">
                Add Photo
              </h3>
              <p className="text-xs text-gray-muted font-light leading-relaxed">
                Add a photo to the{' '}
                <span className="text-gold-premium font-bold">{collectionName}</span> collection.
              </p>
            </div>

            {/* Option A: File Upload */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-gold-premium font-bold block">
                Method 1: Upload File
              </span>
              <label className="border border-dashed border-white/10 hover:border-gold-premium/40 bg-white/5 hover:bg-gold-premium/5 p-6 rounded-none flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 group">
                <Upload className="w-6 h-6 text-gray-400 group-hover:text-gold-premium transition-colors" />
                <span className="text-xs text-gray-300 font-bold uppercase tracking-wider">
                  Choose Image File
                </span>
                <span className="text-[9px] text-gray-muted">Supports JPG, PNG, WEBP (Max 5MB)</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 text-gray-600 text-[10px] uppercase tracking-wider font-bold">
              <div className="h-[1px] bg-white/5 grow" />
              <span>or</span>
              <div className="h-[1px] bg-white/5 grow" />
            </div>

            {/* Option B: URL Paste */}
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-gold-premium font-bold block">
                  Method 2: Paste Web URL
                </span>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newImageUrl}
                  onChange={(e) => {
                    setNewImageUrl(e.target.value);
                    setFileError('');
                  }}
                  className="w-full bg-[#1A1A1A] border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-premium transition-colors rounded-none font-sans-modern"
                />
              </div>

              <button
                type="button"
                onClick={handleUrlSubmit}
                className="w-full bg-gold-premium text-black font-bold uppercase tracking-widest text-xs py-3.5 hover:bg-white transition-colors duration-500 rounded-none shadow-xl shadow-gold-premium/5 cursor-pointer"
              >
                Add URL to Gallery
              </button>
            </div>

            {fileError && <p className="text-xs text-red-500 text-center font-medium">{fileError}</p>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
