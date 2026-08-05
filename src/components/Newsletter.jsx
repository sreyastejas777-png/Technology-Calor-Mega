import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import Button from './Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-primary to-secondary px-6 py-10 md:py-12 text-center text-white shadow-soft">
      <h3 className="font-display text-2xl md:text-3xl font-bold">Stay Ahead of the Harvest</h3>
      <p className="mx-auto mt-3 max-w-md text-white/70">
        Subscribe for drying tips, product updates and seasonal offers from CALOR MEGA.
      </p>
      {submitted ? (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 font-semibold text-success"
        >
          <FaCheckCircle /> Thank you for subscribing!
        </motion.p>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full flex-1 rounded-full bg-white/10 px-5 py-3 text-white placeholder-white/50 outline-none ring-1 ring-white/20 focus:ring-accent"
          />
          <Button type="submit" variant="accent" icon={FaPaperPlane}>
            Subscribe
          </Button>
        </form>
      )}
    </div>
  );
}
