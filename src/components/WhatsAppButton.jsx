import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function WhatsAppButton({ phoneNumber = "919999999999", message = "Hello CalorTech Systems, I would like to inquire about your premium dehumidifiers and preservation systems." }) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Sleek Tooltip/Popup Bubble on Hover */}
      <div className="absolute right-16 bg-surface border border-border text-primary-text text-[15px] font-bold px-4 py-2 rounded-xl shadow-skeuo-out opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-300 whitespace-nowrap backdrop-blur-md">
        Chat on WhatsApp
        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[6px] border-l-border/30"></div>
      </div>

      {/* Floating Action Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        className="flex items-center justify-center w-14 h-14 bg-whatsapp text-white rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-whatsapp focus:ring-offset-2"
        aria-label="Contact CalorTech via WhatsApp for enquiries"
      >
        {/* Outer Pulsing Glow Ring */}
        <span className="absolute inset-0 rounded-full bg-whatsapp opacity-75 animate-ping group-hover:animate-none"></span>
        
        {/* WhatsApp Icon */}
        <FaWhatsapp className="w-8 h-8 relative z-10 text-white" />
      </motion.a>
    </div>
  );
}
