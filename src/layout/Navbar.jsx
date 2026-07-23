import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSun, FaMoon, FaSearch } from 'react-icons/fa';
import { ChevronDown, Cpu, Layers, Sparkles, Compass, Info, Calendar, HelpCircle, ArrowRight, Sun, Moon } from 'lucide-react';
import { navLinks } from '../data/navigation';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleAIChatClick = (e, question = '') => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-chatbot', { detail: { question } }));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'glass shadow-soft py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <Link to="/" className="font-display text-xl md:text-2xl font-bold tracking-wide text-primary dark:text-base">
          CALOR <span className="text-accent">MEGA</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex h-full">
          {/* Home */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative py-2 text-sm font-semibold transition-colors ${
                isActive ? 'text-accent' : 'text-primary/80 dark:text-base/80 hover:text-accent'
              }`
            }
          >
            Home
          </NavLink>

          {/* Products Mega Menu Hover Group */}
          <div className="relative group h-full flex items-center">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `flex items-center gap-1 py-2 text-sm font-semibold transition-colors ${
                  isActive ? 'text-accent' : 'text-primary/80 dark:text-base/80 hover:text-accent'
                }`
              }
            >
              Products
              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 text-primary/50 dark:text-base/50 group-hover:text-accent" />
            </NavLink>

            {/* Products Mega Menu Dropdown */}
            <div className="absolute top-12 left-1/2 -translate-x-[45%] w-[820px] bg-white dark:bg-[#1C1C1C] border border-primary/10 dark:border-white/10 rounded-3xl shadow-2xl p-8 opacity-0 invisible translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50 before:content-[''] before:absolute before:-top-6 before:left-0 before:right-0 before:h-6 before:bg-transparent">
              <div className="grid grid-cols-12 gap-8 text-left">
                {/* Column 1: Current Models */}
                <div className="col-span-5 flex flex-col gap-4">
                  <h4 className="text-[13px] font-black uppercase tracking-wider text-accent font-sans">Current Systems</h4>
                  <div className="flex flex-col gap-2">
                    <Link to="/products/mega" className="p-3 rounded-xl hover:bg-primary/5 dark:hover:bg-white/5 transition-all flex flex-col gap-1 border border-transparent hover:border-primary/10 dark:hover:border-white/10">
                      <span className="text-[15px] font-bold text-primary dark:text-base flex items-center gap-2 font-sans">
                        <Cpu className="w-4 h-4 text-accent" />
                        Calor Mega
                      </span>
                      <span className="text-[12px] text-primary/60 dark:text-base/60 font-sans">Walk-in 10x10ft insulated room. Capacity: 1200L / 24 hrs.</span>
                    </Link>
                    <Link to="/products/standard" className="p-3 rounded-xl hover:bg-primary/5 dark:hover:bg-white/5 transition-all flex flex-col gap-1 border border-transparent hover:border-primary/10 dark:hover:border-white/10">
                      <span className="text-[15px] font-bold text-primary dark:text-base flex items-center gap-2 font-sans">
                        <Layers className="w-4 h-4 text-accent" />
                        Calor Standard
                      </span>
                      <span className="text-[12px] text-primary/60 dark:text-base/60 font-sans">Commercial drying cabinet. Capacity: 350L / 24 hrs.</span>
                    </Link>
                    <Link to="/products/mini" className="p-3 rounded-xl hover:bg-primary/5 dark:hover:bg-white/5 transition-all flex flex-col gap-1 border border-transparent hover:border-primary/10 dark:hover:border-white/10">
                      <span className="text-[15px] font-bold text-primary dark:text-base flex items-center gap-2 font-sans">
                        <Sparkles className="w-4 h-4 text-accent" />
                        Calor Mini
                      </span>
                      <span className="text-[12px] text-primary/60 dark:text-base/60 font-sans">Precision desktop drier. Capacity: 80L / 24 hrs.</span>
                    </Link>
                  </div>
                </div>

                {/* Column 2: Upcoming Models */}
                <div className="col-span-4 flex flex-col gap-4 border-l border-primary/10 dark:border-white/10 pl-6">
                  <h4 className="text-[13px] font-black uppercase tracking-wider text-accent font-sans">Upcoming Releases</h4>
                  <div className="flex flex-col gap-2">
                    <div className="p-3 rounded-xl bg-primary/[0.02] dark:bg-white/[0.02] flex flex-col gap-1 border border-primary/5 dark:border-white/5 select-none">
                      <span className="text-[14px] font-bold text-primary/80 dark:text-base/80 flex items-center justify-between font-sans">
                        Calor Hybrid
                        <span className="text-[9px] uppercase font-black tracking-widest px-1.5 py-0.5 rounded bg-accent/15 text-accent border border-accent/20">Solar Tech</span>
                      </span>
                      <span className="text-[11px] text-primary/50 dark:text-base/50 font-sans">Eco-friendly solar heat pump. Coming Q4 2026.</span>
                    </div>
                    <div className="p-3 rounded-xl bg-primary/[0.02] dark:bg-white/[0.02] flex flex-col gap-1 border border-primary/5 dark:border-white/5 select-none">
                      <span className="text-[14px] font-bold text-primary/80 dark:text-base/80 flex items-center justify-between font-sans">
                        Calor Ultra
                        <span className="text-[9px] uppercase font-black tracking-widest px-1.5 py-0.5 rounded bg-accent/15 text-accent border border-accent/20">Industrial</span>
                      </span>
                      <span className="text-[11px] text-primary/50 dark:text-base/50 font-sans">Continuous belt dehydrator. Coming 2027.</span>
                    </div>
                    <div className="p-3 rounded-xl bg-primary/[0.02] dark:bg-white/[0.02] flex flex-col gap-1 border border-primary/5 dark:border-white/5 select-none">
                      <span className="text-[14px] font-bold text-primary/80 dark:text-base/80 flex items-center justify-between font-sans">
                        Calor Nano
                        <span className="text-[9px] uppercase font-black tracking-widest px-1.5 py-0.5 rounded bg-accent/15 text-accent border border-accent/20">Botanical</span>
                      </span>
                      <span className="text-[11px] text-primary/50 dark:text-base/50 font-sans">Microscale precision dryer. Coming Q1 2027.</span>
                    </div>
                  </div>
                </div>

                {/* Column 3: Promo / Consultation Banner */}
                <div className="col-span-3 flex flex-col justify-between p-5 rounded-2xl bg-accent/5 border border-accent/10">
                  <div className="flex flex-col gap-1.5 text-left">
                    <span className="text-[11px] font-black uppercase tracking-wider text-accent font-sans">Need Custom Work?</span>
                    <h5 className="text-[15px] font-black leading-tight text-primary dark:text-base font-sans">Cooperative Engineering</h5>
                    <p className="text-[11px] text-primary/60 dark:text-base/60 leading-relaxed font-sans">We custom design volume chambers for agricultural cooperatives.</p>
                  </div>
                  <a
                    href="https://wa.me/919999999999?text=Hello%20CalorTech%2C%20I%20would%20like%20to%20consult%20an%20engineer%20regarding%20custom%20cooperative%20installations."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-full mt-3 bg-accent hover:bg-accent/90 active:scale-95 text-white text-[12px] font-black rounded-lg flex items-center justify-center gap-1 transition-all font-sans"
                  >
                    Ask Engineer
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Applications */}
          <NavLink
            to="/applications"
            className={({ isActive }) =>
              `relative py-2 text-sm font-semibold transition-colors ${
                isActive ? 'text-accent' : 'text-primary/80 dark:text-base/80 hover:text-accent'
              }`
            }
          >
            Applications
          </NavLink>

          {/* Technology */}
          <NavLink
            to="/technology"
            className={({ isActive }) =>
              `relative py-2 text-sm font-semibold transition-colors ${
                isActive ? 'text-accent' : 'text-primary/80 dark:text-base/80 hover:text-accent'
              }`
            }
          >
            Technology
          </NavLink>

          {/* Gallery */}
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `relative py-2 text-sm font-semibold transition-colors ${
                isActive ? 'text-accent' : 'text-primary/80 dark:text-base/80 hover:text-accent'
              }`
            }
          >
            Gallery
          </NavLink>

          {/* About Us Hover Group */}
          <div className="relative group h-full flex items-center">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center gap-1 py-2 text-sm font-semibold transition-colors ${
                  isActive ? 'text-accent' : 'text-primary/80 dark:text-base/80 hover:text-accent'
                }`
              }
            >
              About Us
              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 text-primary/50 dark:text-base/50 group-hover:text-accent" />
            </NavLink>

            {/* About Us Dropdown */}
            <div className="absolute top-12 left-1/2 -translate-x-[50%] w-[640px] bg-white dark:bg-[#1C1C1C] border border-primary/10 dark:border-white/10 rounded-3xl shadow-2xl p-8 opacity-0 invisible translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50 before:content-[''] before:absolute before:-top-6 before:left-0 before:right-0 before:h-6 before:bg-transparent">
              <div className="grid grid-cols-12 gap-8 text-left">
                {/* Column 1: Core Mission Statement */}
                <div className="col-span-5 flex flex-col gap-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-accent font-sans">Our Mission</span>
                  <h4 className="text-[15px] font-black text-primary dark:text-base leading-tight font-sans">Preserving Yields, Eliminating Waste</h4>
                  <p className="text-[12px] text-primary/60 dark:text-base/60 leading-relaxed font-sans">
                    CalorTech Systems designs high-efficiency drying equipment that allows cooperatives and family farms to add long-term value to their harvests.
                  </p>
                  <Link to="/about" className="inline-flex items-center gap-1 text-[12px] font-black text-accent hover:underline mt-1 font-sans">
                    Read Our Story <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Column 2: Navigation Links */}
                <div className="col-span-7 flex flex-col gap-3 border-l border-primary/10 dark:border-white/10 pl-6">
                  <span className="text-[11px] font-black uppercase tracking-wider text-accent font-sans">Explore Areas</span>
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/about" className="p-2.5 rounded-xl hover:bg-primary/5 dark:hover:bg-white/5 flex flex-col gap-1 transition-all border border-transparent hover:border-primary/10 dark:hover:border-white/10">
                      <span className="text-[13px] font-bold text-primary dark:text-base flex items-center gap-1.5 font-sans">
                        <Compass className="w-3.5 h-3.5 text-accent" />
                        Our Vision
                      </span>
                      <span className="text-[10px] text-primary/50 dark:text-base/50 font-sans">Agro-tech goals.</span>
                    </Link>
                    <Link to="/about" className="p-2.5 rounded-xl hover:bg-primary/5 dark:hover:bg-white/5 flex flex-col gap-1 transition-all border border-transparent hover:border-primary/10 dark:hover:border-white/10">
                      <span className="text-[13px] font-bold text-primary dark:text-base flex items-center gap-1.5 font-sans">
                        <Info className="w-3.5 h-3.5 text-accent" />
                        Tech Info
                      </span>
                      <span className="text-[10px] text-primary/50 dark:text-base/50 font-sans">Dehumidifier cycle.</span>
                    </Link>
                    <Link to="/about" className="p-2.5 rounded-xl hover:bg-primary/5 dark:hover:bg-white/5 flex flex-col gap-1 transition-all border border-transparent hover:border-primary/10 dark:hover:border-white/10">
                      <span className="text-[13px] font-bold text-primary dark:text-base flex items-center gap-1.5 font-sans">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        Our Journey
                      </span>
                      <span className="text-[10px] text-primary/50 dark:text-base/50 font-sans">Growth timeline.</span>
                    </Link>
                    <Link to="/about" className="p-2.5 rounded-xl hover:bg-primary/5 dark:hover:bg-white/5 flex flex-col gap-1 transition-all border border-transparent hover:border-primary/10 dark:hover:border-white/10">
                      <span className="text-[13px] font-bold text-primary dark:text-base flex items-center gap-1.5 font-sans">
                        <HelpCircle className="w-3.5 h-3.5 text-accent" />
                        Support
                      </span>
                      <span className="text-[10px] text-primary/50 dark:text-base/50 font-sans">Certifications info.</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>



          {/* Contact */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `relative py-2 text-sm font-semibold transition-colors ${
                isActive ? 'text-accent' : 'text-primary/80 dark:text-base/80 hover:text-accent'
              }`
            }
          >
            Contact
          </NavLink>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Toggle search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-primary dark:text-base hover:text-accent transition-colors"
          >
            <FaSearch />
          </button>
          {/* Premium Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1 focus:outline-none focus:ring-2 focus:ring-accent rounded-full transition-transform active:scale-95 ml-2"
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            <div className="w-[62px] h-[32px] rounded-[30px] bg-toggle-bg shadow-skeuo-in relative border border-border transition-colors duration-300">
              <div
                className={`w-[26px] h-[26px] rounded-full bg-toggle-thumb shadow-skeuo-out absolute top-[2px] left-[3px] flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${theme === 'light' ? 'translate-x-[28px]' : 'translate-x-0'
                  }`}
              >
                {theme === 'light' ? (
                  <Sun className="w-4 h-4 text-orange-500 fill-orange-500" />
                ) : (
                  <Moon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                )}
              </div>
            </div>
          </button>
          <Button as={Link} to="/quote" variant="accent">
            Get Quote
          </Button>
        </div>

        <button
          className="text-2xl text-primary dark:text-base lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-auto hidden max-w-md px-8 pt-4 lg:block"
          >
            <SearchBar />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="glass mx-4 mt-3 flex flex-col gap-4 rounded-2xl p-6">
              <SearchBar />
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={(e) => {
                    setMobileOpen(false);
                    if (link.path === '/ai-assistant') {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('open-chatbot'));
                    }
                  }}
                  className={({ isActive }) =>
                    `text-sm font-semibold ${isActive ? 'text-accent' : 'text-primary dark:text-base'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="flex items-center gap-3 pt-2">
                {/* Premium Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className="p-1 focus:outline-none focus:ring-2 focus:ring-accent rounded-full transition-transform active:scale-95"
                  aria-label="Toggle Theme"
                >
                  <div className="w-[62px] h-[32px] rounded-[30px] bg-toggle-bg shadow-skeuo-in relative border border-border transition-colors duration-300">
                    <div
                      className={`w-[26px] h-[26px] rounded-full bg-toggle-thumb shadow-skeuo-out absolute top-[2px] left-[3px] flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${theme === 'light' ? 'translate-x-[28px]' : 'translate-x-0'
                        }`}
                    >
                      {theme === 'light' ? (
                        <Sun className="w-4 h-4 text-orange-500 fill-orange-500" />
                      ) : (
                        <Moon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      )}
                    </div>
                  </div>
                </button>
                <Button as={Link} to="/quote" variant="accent" className="flex-1 text-center" onClick={() => setMobileOpen(false)}>
                  Get Quote
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
