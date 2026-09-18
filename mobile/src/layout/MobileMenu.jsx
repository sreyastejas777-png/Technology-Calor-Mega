import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Info, Cpu, Layers, Phone, FileText, Home, ShoppingBag, Image as ImageIcon, Trophy } from 'lucide-react';

export default function MobileMenu({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    if (location.pathname === path) {
      onClose();
      return;
    }
    onClose();
    setTimeout(() => {
      navigate(path);
    }, 350);
  };

  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Products', path: '/products', icon: ShoppingBag },
    { name: 'Gallery', path: '/gallery', icon: ImageIcon },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Technology', path: '/technology', icon: Cpu },
    { name: 'Awards & Achievements', path: '/awards', icon: Trophy },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-900/40 backdrop-blur-md z-[65]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.35 }}
            className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-slate-100 dark:bg-zinc-900 shadow-[0_0_40px_rgba(0,0,0,0.3)] z-[70] border-l border-white/20 dark:border-white/10 flex flex-col"
          >
            <div className="p-6 border-b border-border/30 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-display font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                  Calor Mega
                </h2>
                <p className="text-[10px] text-secondary-text mt-1 uppercase tracking-wider">Navigation</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
              {menuItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                  >
                    <button
                      onClick={() => handleNavigate(item.path)}
                      className={`flex items-center w-full text-left space-x-4 p-3.5 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-accent/10 text-accent font-semibold border border-accent/20' 
                          : 'text-primary-text hover:bg-black/5'
                      }`}
                    >
                      <Icon size={20} className={isActive ? 'text-accent' : 'text-secondary-text'} />
                      <span className="text-sm">{item.name}</span>
                    </button>
                  </motion.div>
                );
              })}
            </div>

            <div className="p-4 border-t border-border/30">
               <button 
                  onClick={() => handleNavigate('/quote')}
                  className="flex items-center justify-center w-full py-3.5 rounded-xl bg-gradient-to-r from-accent to-secondary text-paper font-semibold shadow-btn"
               >
                 Get Free Quote
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
