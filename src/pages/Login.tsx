import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowLeft, AlertCircle, Sparkles } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'kz321') {
      setError(null);
      localStorage.setItem('kz_admin_logged_in', 'true');
      onLoginSuccess();
      window.location.hash = '#/collections';
    } else {
      setError('Incorrect password. Access denied.');
    }
  };

  const handleBackToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '#/';
  };

  return (
    <section className="relative min-h-screen pt-32 pb-24 bg-spotlight overflow-hidden z-10 flex items-center justify-center">
      {/* Background ambient lights specifically for login page */}
      <div className="absolute top-[-10%] left-[10%] w-[400px] h-[400px] rounded-full bg-gold-premium/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] rounded-full bg-beige-warm/5 blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full px-6 z-20">
        {/* Back Link */}
        <div className="mb-8">
          <a
            href="#/"
            onClick={handleBackToHome}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-premium hover:text-white transition-colors duration-300 font-bold group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Site
          </a>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel border border-white/10 p-8 sm:p-10 space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-gold-premium/10 border border-gold-premium/30 flex items-center justify-center text-gold-premium mx-auto shadow-lg shadow-gold-premium/5">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-gold-premium">
                Admin Portal
              </span>
              <h2 className="text-2xl font-serif-luxury font-bold text-white">
                Enter Password
              </h2>
            </div>
            <p className="text-xs text-gray-muted font-light max-w-xs mx-auto text-center">
              Please enter the administrator password to unlock website management and curation features.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#121212]/80 border border-white/10 focus:border-gold-premium/60 px-4 py-3.5 pr-12 text-sm text-white tracking-widest focus:outline-none transition-all duration-300 placeholder:text-gray-600 rounded-none font-mono"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gold-premium transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 flex items-center gap-2 rounded-none"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full bg-gold-premium text-black font-bold uppercase tracking-widest text-xs py-4 hover:bg-white transition-colors duration-500 rounded-none shadow-xl shadow-gold-premium/5 cursor-pointer flex items-center justify-center gap-2"
            >
              Unlock Controls <Sparkles className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
