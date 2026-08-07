import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/') return null;

  return (
    <motion.button
      onClick={() => navigate(-1)}
      whileHover={{ x: -4 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-2 text-sm font-semibold text-secondary dark:text-accent hover:text-accent transition-colors"
    >
      <FaArrowLeft /> Back
    </motion.button>
  );
}
