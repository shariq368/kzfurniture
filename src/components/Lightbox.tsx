import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LightboxProps {
  imageSrc: string | null;
  onClose: () => void;
}

export default function Lightbox({ imageSrc, onClose }: LightboxProps) {
  return (
    <AnimatePresence>
      {imageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
              onClick={onClose}
              className="absolute top-[-40px] right-0 text-white hover:text-gold-premium flex items-center gap-1 text-xs tracking-widest uppercase font-bold cursor-pointer"
            >
              Close <X className="w-4 h-4" />
            </button>
            <img
              src={imageSrc}
              alt="Enlarged showroom preview"
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
