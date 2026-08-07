import { motion } from 'framer-motion';

export default function RouteFallback() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className="flex min-h-[60svh] items-center justify-center"
    >
      <span className="h-9 w-9 animate-spin rounded-full border-2 border-secondary/20 border-t-accent" />
    </motion.div>
  );
}
