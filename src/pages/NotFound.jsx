import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-5 py-32 text-center md:px-8">
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-8xl font-bold text-gradient"
      >
        404
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-4 text-2xl font-bold text-primary dark:text-paper"
      >
        This Page Has Dried Up
      </motion.h1>
      <p className="mt-4 text-primary/65 dark:text-paper/65">
        The page you're looking for doesn't exist or may have moved. Let's get you back on track.
      </p>
      <Button as={Link} to="/" variant="primary" icon={FaHome} className="mt-8">
        Back to Home
      </Button>
    </section>
  );
}
