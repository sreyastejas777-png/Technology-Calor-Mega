import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

// Animated Robot Mascot for Launcher & Header
const RobotMascot = ({ isHovered, className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-all duration-300`}
      style={{ transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)' }}
    >
      {/* Antenna */}
      <path
        d="M16 8V3"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle
        cx="16"
        cy="3"
        r="2"
        fill="currentColor"
        className={isHovered ? "animate-pulse" : ""}
      />
      {/* Head */}
      <rect
        x="6"
        y="8"
        width="20"
        height="18"
        rx="5"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Eyes Area Background */}
      <rect
        x="9"
        y="12"
        width="14"
        height="7"
        rx="2"
        fill="rgba(0, 0, 0, 0.15)"
      />
      {/* Eyes */}
      <ellipse
        cx="12"
        cy="15.5"
        rx="1.75"
        ry={isHovered ? "0.5" : "1.75"}
        fill="#FEFAF1"
        className="transition-all duration-150"
      />
      <ellipse
        cx="20"
        cy="15.5"
        rx="1.75"
        ry={isHovered ? "0.5" : "1.75"}
        fill="#FEFAF1"
        className="transition-all duration-150"
      />
      {/* Mouth */}
      <path
        d={isHovered ? "M13 21 Q16 23.5 19 21" : "M13 21 H19"}
        stroke="#FEFAF1"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        className="transition-all duration-300"
      />
      {/* Ears */}
      <rect x="3" y="14" width="3" height="6" rx="1.5" fill="currentColor" />
      <rect x="26" y="14" width="3" height="6" rx="1.5" fill="currentColor" />
    </svg>
  );
};

export default function AIChatbotPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am the CalorTech AI Assistant. I can help answer questions about our commercial dehumidifiers, crop compatibility, energy consumption, and product sizing. What would you like to know today?'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-focus input when chat window opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const suggestedQuestions = [
    "What size room does Calor Mega support?",
    "Which crops are suitable for drying?",
    "What is the starting price?",
    "How much energy is consumed?"
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle external/window event triggers
  useEffect(() => {
    const handleOpenChat = (e) => {
      setIsOpen(true);
      if (e.detail && e.detail.question) {
        // Send after window animation completes
        setTimeout(() => {
          handleSend(e.detail.question);
        }, 300);
      }
    };
    window.addEventListener('open-chatbot', handleOpenChat);
    return () => window.removeEventListener('open-chatbot', handleOpenChat);
  }, []);

  const handleSend = (textToSend) => {
    if (!textToSend.trim() || isTyping) return;

    // Add user message
    const userMsg = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Generate bot reply after a premium typing lag
    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let botReply = '';
      let isWhatsAppRedirect = false;

      if (lower.includes('size') || lower.includes('room') || lower.includes('square') || lower.includes('sq ft') || lower.includes('dimension') || lower.includes('mega') || lower.includes('standard') || lower.includes('mini')) {
        botReply = 'The Calor Mega is a walk-in 10x10 foot room suitable for spaces up to 1,000 sq ft. The Calor Standard is built as a cabinet for rooms up to 350 sq ft, while the Calor Mini fits comfortably on any desk and supports up to 80 sq ft.';
      } else if (lower.includes('crop') || lower.includes('fruit') || lower.includes('mango') || lower.includes('agricultural') || lower.includes('drying') || lower.includes('herb') || lower.includes('seed') || lower.includes('botanical')) {
        botReply = 'Our heat-pump technology is highly compatible with fruits (mango, banana, citrus segments), herbs, seeds, nuts, and medicinal botanicals. Drying at moderate temperatures (38°C to 55°C) keeps colors, vitamins, and natural flavors fully intact.';
      } else if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost') || lower.includes('buy') || lower.includes('catalog') || lower.includes('discount')) {
        botReply = 'Our catalog prices are: Calor Mega starts at $12,500; Calor Standard starts at $4,200; Calor Mini starts at $1,800. For custom cooperative pricing, volume discounts, or shipping, please click the "Chat on WhatsApp" button to reach our sales team directly.';
      } else if (lower.includes('energy') || lower.includes('power') || lower.includes('watt') || lower.includes('kilowatt') || lower.includes('kw') || lower.includes('electricity')) {
        botReply = 'Calor Tech systems are extremely efficient. The Calor Mega consumes an average of 3.2 kW, the Calor Standard consumes 1.2 kW, and the Calor Mini consumes just 0.45 kW. Our heat-pump cycle recycles thermal energy, lowering electricity bills by up to 45%.';
      } else if (lower.includes('warranty') || lower.includes('guarantee') || lower.includes('support') || lower.includes('parts') || lower.includes('repair')) {
        botReply = 'We offer a 2-Year Premium Commercial Warranty for the Calor Mega and Calor Standard (which includes certified on-site diagnostics and parts). The Calor Mini includes a 1-Year Limited Parts & Repair warranty.';
      } else {
        botReply = 'I am a virtual assistant with limited knowledge regarding that specific inquiry. To get specific configurations or a custom quotation, we highly recommend chatting directly with our engineers and sales team on WhatsApp!';
        isWhatsAppRedirect = true;
      }

      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: botReply, isWhatsAppRedirect }]);
    }, 1100);
  };

  const whatsappNumber = "919999999999";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello CalorTech Systems, I am using your AI Assistant and would like to ask a custom question regarding dehumidifiers."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      
      {/* Chat Window Popup Screen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-[360px] sm:w-[400px] h-[550px] sm:h-[600px] bg-[#FEFAF1] dark:bg-[#0c0c0e] rounded-3xl border border-border shadow-skeuo-out flex flex-col overflow-hidden mb-4 mr-0 sm:mr-2"
          >
            {/* Header: Brand Blue Gradient matching CalorTech branding */}
            <div className="bg-gradient-to-r from-accent to-secondary text-white p-5 flex justify-between items-center relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
              <div className="flex items-center gap-3 relative z-10">
                {/* Robot Avatar */}
                <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 relative">
                  <RobotMascot isHovered={true} className="w-6 h-6 text-white" />
                  {/* Blinking Active Status Indicator */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#FEFAF1] dark:border-[#0c0c0e] flex items-center justify-center">
                    <span className="absolute w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75"></span>
                  </span>
                </div>
                <div>
                  <h3 className="text-[17px] font-black font-outfit text-white tracking-wide leading-none">
                    CalorTech Advisor
                  </h3>
                  <span className="text-[12px] text-white/80 font-semibold mt-1 block">
                    Automated Assistant • Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white active:scale-90 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 relative z-10"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 flex flex-col bg-surface/30 dark:bg-surface/10 backdrop-blur-sm">
              
              {/* Render Messages */}
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex w-full flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-[15px] leading-relaxed font-sans ${
                      msg.sender === 'user'
                        ? 'bg-accent text-white font-semibold rounded-tr-none shadow-sm shadow-accent/20'
                        : 'bg-white dark:bg-[#1C1C1C] text-primary dark:text-base border border-border rounded-tl-none shadow-skeuo-out'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Render inline WhatsApp Redirect Link if triggered */}
                    {msg.isWhatsAppRedirect && (
                      <div className="mt-3 w-full">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full h-11 bg-whatsapp hover:bg-whatsapp/90 text-white font-extrabold text-sm rounded-xl transition-all shadow-md active:scale-[0.98] outline-none ring-2 ring-whatsapp/30"
                        >
                          <FaWhatsapp className="w-5 h-5" />
                          Chat on WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                  
                  {/* Subtle Timestamp / Status */}
                  <span className="text-[10px] text-primary-text/40 dark:text-base/40 mt-1 px-1 font-sans">
                    {msg.sender === 'user' ? 'Delivered' : 'AI Assistant'}
                  </span>
                </motion.div>
              ))}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex w-full items-start flex-col">
                  <div className="bg-white dark:bg-[#1C1C1C] border border-border text-primary dark:text-base rounded-2xl rounded-tl-none p-3.5 flex items-center gap-1.5 shadow-skeuo-out">
                    <span className="w-2.5 h-2.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2.5 h-2.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2.5 h-2.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestions Pills */}
            <div className="px-4 py-2 border-t border-border bg-brand-light/30 dark:bg-[#1C1C1C]/20 shrink-0">
              <span className="text-[11px] font-bold text-primary-text/60 dark:text-base/60 block mb-1.5 font-sans">Suggested Questions:</span>
              <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-accent">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    disabled={isTyping}
                    className="shrink-0 text-[13px] font-bold text-accent border border-accent/30 hover:border-accent hover:bg-accent/5 dark:hover:bg-accent/10 px-3 py-1.5 rounded-full transition-all focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input Bar */}
            <div className="p-4 border-t border-border bg-white dark:bg-[#151515] shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputVal);
                }}
                className="flex gap-2.5 items-center"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 h-11 px-4 rounded-xl bg-bg border border-border text-primary-text text-[15px] focus:outline-none focus:ring-2 focus:ring-accent placeholder-secondary-text/30 transition-all font-sans"
                  aria-label="Type message"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || isTyping}
                  className="h-11 w-11 bg-accent hover:bg-accent/90 disabled:bg-accent/40 active:scale-95 text-white rounded-xl flex items-center justify-center shadow-btn focus:outline-none focus:ring-2 focus:ring-accent shrink-0 transition-all"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="mt-2 text-center text-[10px] text-primary-text/40 dark:text-base/40 font-sans">
                Powered by CalorTech AI
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (Mascot Launcher) */}
      <div 
        className="flex items-center group relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Sleek Tooltip/Popup Bubble on Hover */}
        <div className="absolute right-16 bg-surface border border-border text-primary-text text-[13px] font-extrabold px-3 py-1.5 rounded-xl shadow-skeuo-out opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-300 whitespace-nowrap backdrop-blur-md z-50">
          Chat with AI Advisor
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[6px] border-l-border/30"></div>
        </div>

        {/* Floating Action Launcher Button */}
        <button
          className="flex items-center justify-center w-14 h-14 bg-accent hover:bg-accent/95 text-white rounded-full shadow-skeuo-out transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent focus:ring-offset-2 relative"
          aria-label="Toggle AI Advisor Chatbot"
        >
          {/* Animated Background Pulsing Glow */}
          <span className="absolute inset-0 rounded-full bg-accent opacity-30 animate-ping group-hover:animate-none"></span>
          
          {/* Robot Mascot SVG */}
          <RobotMascot isHovered={isHovered} className="w-8 h-8 relative z-10 text-white" />
        </button>
      </div>

    </div>
  );
}
