import { motion } from 'framer-motion';

const variants = {
  primary:
    'bg-primary text-white hover:bg-secondary shadow-soft',
  secondary:
    'bg-secondary text-white hover:bg-primary shadow-soft',
  accent:
    'bg-accent text-primary hover:brightness-95 shadow-soft',
  outline:
    'border-2 border-primary text-primary dark:border-paper dark:text-paper bg-transparent hover:bg-primary hover:text-white dark:hover:bg-paper dark:hover:text-primary',
  glass: 'glass text-primary dark:text-paper',
};

export default function Button({
  children,
  variant = 'primary',
  as: Component = 'button',
  className = '',
  icon: Icon,
  ...props
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
      className="inline-block"
    >
      <Component
        className={`ripple inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold tracking-wide transition-colors duration-300 ${variants[variant]} ${className}`}
        {...props}
      >
        {Icon && <Icon className="text-lg" />}
        {children}
      </Component>
    </motion.div>
  );
}
