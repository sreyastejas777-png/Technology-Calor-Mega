import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import Button from './Button';

export default function Newsletter({ className = '' }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-primary via-[#0e271f] to-primary text-white shadow-2xl p-8 sm:p-12 md:p-16 lg:p-20 text-center border border-white/10 w-full ${className}`}>
      {/* Ambient background glows */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/25 blur-3xl pointer-events-none" />
      <div className="dot-grid absolute inset-0 opacity-15 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent font-semibold text-xs sm:text-sm uppercase tracking-wider mb-4 sm:mb-5">
          Stay Connected
        </span>
        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white max-w-4xl mx-auto">
          Stay Ahead of the Harvest
        </h3>
        <p className="mx-auto mt-4 sm:mt-5 max-w-2xl text-base sm:text-lg md:text-xl text-white/80 leading-relaxed font-normal">
          Subscribe for expert drying profiles, commercial crop guides, new technology releases, and seasonal offers from CALOR MEGA.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto mt-8 sm:mt-10 flex max-w-md items-center justify-center gap-3 rounded-full bg-white/10 px-6 py-4 font-semibold text-accent backdrop-blur-md border border-accent/30 shadow-lg text-base sm:text-lg"
          >
            <FaCheckCircle className="text-xl" /> Thank you for subscribing!
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="relative z-10 mx-auto mt-8 sm:mt-10 flex w-full max-w-2xl flex-col sm:flex-row gap-3 sm:gap-4 p-2 sm:p-2.5 rounded-2xl sm:rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-inner">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your business email address..."
              className="w-full flex-1 rounded-xl sm:rounded-full bg-transparent px-5 sm:px-6 py-3.5 sm:py-4 text-white text-base sm:text-lg placeholder-white/50 outline-none focus:placeholder-white/30"
            />
            <Button 
              type="submit" 
              variant="accent" 
              icon={FaPaperPlane}
              className="py-3.5 sm:py-4 px-8 text-base sm:text-lg font-bold rounded-xl sm:rounded-full shrink-0 shadow-lg shadow-accent/25 hover:shadow-accent/40"
            >
              Subscribe
            </Button>
          </form>
        )}

        <div className="relative z-10 mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs sm:text-sm text-white/70">
          <span className="flex items-center gap-2">
            <FaCheckCircle className="text-accent text-sm" /> No spam guaranteed
          </span>
          <span className="flex items-center gap-2">
            <FaCheckCircle className="text-accent text-sm" /> Expert drying profiles
          </span>
          <span className="flex items-center gap-2">
            <FaCheckCircle className="text-accent text-sm" /> Unsubscribe anytime
          </span>
        </div>
      </div>
    </div>
  );
}
