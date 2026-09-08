import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSun, FaMoon, FaSearch } from 'react-icons/fa';
import { ChevronDown, Cpu, Layers, Sparkles, Compass, Target, Users, Building2, ArrowRight, Sun, Moon } from 'lucide-react';
import { navLinks } from '../data/navigation';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 z-50 w-full navbar-transition glass ${
        scrolled ? 'shadow-soft py-3' : 'py-5'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1760px] min-[1600px]:max-w-[95vw] items-center justify-between px-5 md:px-8 xl:px-12">
        <Link to="/" className="font-display text-xl md:text-2xl font-bold tracking-wide text-primary dark:text-paper">
          CALOR <span className="text-accent">MEGA</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex h-full">
          {/* Home */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative py-2 text-sm font-semibold transition-colors ${
                isActive ? 'text-accent' : 'text-primary/80 dark:text-paper/80 hover:text-accent'
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
                  isActive ? 'text-accent' : 'text-primary/80 dark:text-paper/80 hover:text-accent'
                }`
              }
            >
              Products
              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 text-primary/50 dark:text-paper/50 group-hover:text-accent" />
            </NavLink>

            {/* Products Mega Menu Dropdown */}
            <div className="absolute top-12 left-1/2 -translate-x-[45%] w-[820px] bg-white dark:bg-[#1C1C1C] border border-primary/10 dark:border-white/10 rounded-3xl shadow-2xl p-8 opacity-0 invisible translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50 before:content-[''] before:absolute before:-top-6 before:left-0 before:right-0 before:h-6 before:bg-transparent">
              <div className="grid grid-cols-12 gap-8 text-left">
                {/* Column 1: Current Models */}
                <div className="col-span-5 flex flex-col gap-4">
                  <h4 className="text-[13px] font-black uppercase tracking-wider text-accent font-sans">Current Systems</h4>
                  <div className="flex flex-col gap-2">
                    <Link to="/products/mega" className="p-3 rounded-xl hover:bg-primary/5 dark:hover:bg-white/5 transition-all flex flex-col gap-1 border border-transparent hover:border-primary/10 dark:hover:border-white/10">
                      <span className="text-[15px] font-bold text-primary dark:text-paper flex items-center gap-2 font-sans">
                        <Cpu className="w-4 h-4 text-accent" />
                        Calor Mega
                      </span>
                      <span className="text-[12px] text-primary/60 dark:text-paper/60 font-sans">Walk-in 10x10ft insulated room. Capacity: 1200L / 24 hrs.</span>
                    </Link>
                    <Link to="/products/standard" className="p-3 rounded-xl hover:bg-primary/5 dark:hover:bg-white/5 transition-all flex flex-col gap-1 border border-transparent hover:border-primary/10 dark:hover:border-white/10">
                      <span className="text-[15px] font-bold text-primary dark:text-paper flex items-center gap-2 font-sans">
                        <Layers className="w-4 h-4 text-accent" />
                        Calor Standard
                      </span>
                      <span className="text-[12px] text-primary/60 dark:text-paper/60 font-sans">Commercial drying cabinet. Capacity: 350L / 24 hrs.</span>
                    </Link>
                    <Link to="/products/mini" className="p-3 rounded-xl hover:bg-primary/5 dark:hover:bg-white/5 transition-all flex flex-col gap-1 border border-transparent hover:border-primary/10 dark:hover:border-white/10">
                      <span className="text-[15px] font-bold text-primary dark:text-paper flex items-center gap-2 font-sans">
                        <Sparkles className="w-4 h-4 text-accent" />
                        Calor Mini
                      </span>
                      <span className="text-[12px] text-primary/60 dark:text-paper/60 font-sans">Precision desktop drier. Capacity: 80L / 24 hrs.</span>
                    </Link>
                  </div>
                </div>

                {/* Column 2: Upcoming Models */}
                <div className="col-span-4 flex flex-col gap-4 border-l border-primary/10 dark:border-white/10 pl-6">
                  <h4 className="text-[13px] font-black uppercase tracking-wider text-accent font-sans">Upcoming Releases</h4>
                  <div className="flex flex-col gap-2">
                    <div className="p-3 rounded-xl bg-primary/[0.02] dark:bg-white/[0.02] flex flex-col gap-1 border border-primary/5 dark:border-white/5 select-none">
                      <span className="text-[14px] font-bold text-primary/80 dark:text-paper/80 flex items-center justify-between font-sans">
                        Calor Hybrid
                        <span className="text-[9px] uppercase font-black tracking-widest px-1.5 py-0.5 rounded bg-accent/15 text-accent border border-accent/20">Solar Tech</span>
                      </span>
                      <span className="text-[11px] text-primary/50 dark:text-paper/50 font-sans">Eco-friendly solar heat pump. Coming Q4 2026.</span>
                    </div>
                    <div className="p-3 rounded-xl bg-primary/[0.02] dark:bg-white/[0.02] flex flex-col gap-1 border border-primary/5 dark:border-white/5 select-none">
                      <span className="text-[14px] font-bold text-primary/80 dark:text-paper/80 flex items-center justify-between font-sans">
                        Calor Ultra
                        <span className="text-[9px] uppercase font-black tracking-widest px-1.5 py-0.5 rounded bg-accent/15 text-accent border border-accent/20">Industrial</span>
                      </span>
                      <span className="text-[11px] text-primary/50 dark:text-paper/50 font-sans">Continuous belt dehydrator. Coming 2027.</span>
                    </div>
                    <div className="p-3 rounded-xl bg-primary/[0.02] dark:bg-white/[0.02] flex flex-col gap-1 border border-primary/5 dark:border-white/5 select-none">
                      <span className="text-[14px] font-bold text-primary/80 dark:text-paper/80 flex items-center justify-between font-sans">
                        Calor Nano
                        <span className="text-[9px] uppercase font-black tracking-widest px-1.5 py-0.5 rounded bg-accent/15 text-accent border border-accent/20">Botanical</span>
                      </span>
                      <span className="text-[11px] text-primary/50 dark:text-paper/50 font-sans">Microscale precision dryer. Coming Q1 2027.</span>
                    </div>
                  </div>
                </div>

                {/* Column 3: Promo / Consultation Banner */}
                <div className="col-span-3 flex flex-col justify-between p-5 rounded-2xl bg-accent/5 border border-accent/10">
                  <div className="flex flex-col gap-1.5 text-left">
                    <span className="text-[11px] font-black uppercase tracking-wider text-accent font-sans">Need Custom Work?</span>
                    <h5 className="text-[15px] font-black leading-tight text-primary dark:text-paper font-sans">Cooperative Engineering</h5>
                    <p className="text-[11px] text-primary/60 dark:text-paper/60 leading-relaxed font-sans">We custom design volume chambers for agricultural cooperatives.</p>
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
                isActive ? 'text-accent' : 'text-primary/80 dark:text-paper/80 hover:text-accent'
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
                isActive ? 'text-accent' : 'text-primary/80 dark:text-paper/80 hover:text-accent'
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
                isActive ? 'text-accent' : 'text-primary/80 dark:text-paper/80 hover:text-accent'
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
                  isActive ? 'text-accent' : 'text-primary/80 dark:text-paper/80 hover:text-accent'
                }`
              }
            >
              About Us
              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 text-primary/50 dark:text-paper/50 group-hover:text-accent" />
            </NavLink>

            {/* About Us Dropdown */}
            <div className="absolute top-12 left-1/2 -translate-x-[50%] w-[640px] bg-white dark:bg-[#1C1C1C] border border-primary/10 dark:border-white/10 rounded-3xl shadow-2xl p-8 opacity-0 invisible translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50 before:content-[''] before:absolute before:-top-6 before:left-0 before:right-0 before:h-6 before:bg-transparent">
              <div className="grid grid-cols-12 gap-8 text-left">
                {/* Column 1: Core Mission Statement */}
                <div className="col-span-5 flex flex-col gap-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-accent font-sans">Our Mission</span>
                  <h4 className="text-[15px] font-black text-primary dark:text-paper leading-tight font-sans">Student-Led Industrial Engineering</h4>
                  <p className="text-[12px] text-primary/60 dark:text-paper/60 leading-relaxed font-sans">
                    To design and build high-performance industrial machinery through practical innovation under the IHRD "Earn While Learn" framework.
                  </p>
                  <Link to="/about" className="inline-flex items-center gap-1 text-[12px] font-black text-accent hover:underline mt-1 font-sans">
                    Read Our Story <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Column 2: Navigation Links */}
                <div className="col-span-7 flex flex-col gap-3 border-l border-primary/10 dark:border-white/10 pl-6">
                  <span className="text-[11px] font-black uppercase tracking-wider text-accent font-sans">Explore Areas</span>
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/about#vision" className="p-2.5 rounded-xl hover:bg-primary/5 dark:hover:bg-white/5 flex flex-col gap-1 transition-all border border-transparent hover:border-primary/10 dark:hover:border-white/10">
                      <span className="text-[13px] font-bold text-primary dark:text-paper flex items-center gap-1.5 font-sans">
                        <Compass className="w-3.5 h-3.5 text-accent" />
                        Our Vision
                      </span>
                      <span className="text-[10px] text-primary/50 dark:text-paper/50 font-sans">Pioneering innovation.</span>
                    </Link>
                    <Link to="/about#mission" className="p-2.5 rounded-xl hover:bg-primary/5 dark:hover:bg-white/5 flex flex-col gap-1 transition-all border border-transparent hover:border-primary/10 dark:hover:border-white/10">
                      <span className="text-[13px] font-bold text-primary dark:text-paper flex items-center gap-1.5 font-sans">
                        <Target className="w-3.5 h-3.5 text-accent" />
                        Our Mission
                      </span>
                      <span className="text-[10px] text-primary/50 dark:text-paper/50 font-sans">Practical engineering.</span>
                    </Link>
                    <Link to="/about#leadership" className="p-2.5 rounded-xl hover:bg-primary/5 dark:hover:bg-white/5 flex flex-col gap-1 transition-all border border-transparent hover:border-primary/10 dark:hover:border-white/10">
                      <span className="text-[13px] font-bold text-primary dark:text-paper flex items-center gap-1.5 font-sans">
                        <Users className="w-3.5 h-3.5 text-accent" />
                        Leadership
                      </span>
                      <span className="text-[10px] text-primary/50 dark:text-paper/50 font-sans">Meet our team.</span>
                    </Link>
                    <Link to="/about#profile" className="p-2.5 rounded-xl hover:bg-primary/5 dark:hover:bg-white/5 flex flex-col gap-1 transition-all border border-transparent hover:border-primary/10 dark:hover:border-white/10">
                      <span className="text-[13px] font-bold text-primary dark:text-paper flex items-center gap-1.5 font-sans">
                        <Building2 className="w-3.5 h-3.5 text-accent" />
                        Company Profile
                      </span>
                      <span className="text-[10px] text-primary/50 dark:text-paper/50 font-sans">Our background.</span>
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
                isActive ? 'text-accent' : 'text-primary/80 dark:text-paper/80 hover:text-accent'
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
            className="flex h-10 w-10 items-center justify-center rounded-full text-primary dark:text-paper hover:text-accent transition-colors"
          >
            <FaSearch />
          </button>
          {/* Minimal Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full text-primary dark:text-paper hover:text-accent transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <Button as={Link} to="/quote" variant="accent">
            Get Quote
          </Button>
        </div>

        <button
          className="text-2xl text-primary dark:text-paper lg:hidden"
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
            <div className="glass mx-3 sm:mx-4 mt-3 flex max-h-[80vh] flex-col gap-3.5 rounded-2xl p-4 sm:p-6 overflow-y-auto no-scrollbar pb-safe">
              <SearchBar />

              {/* Home */}
              <NavLink
                to="/"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-semibold py-1.5 ${isActive ? 'text-accent' : 'text-primary dark:text-paper'}`
                }
              >
                Home
              </NavLink>

              {/* Products Accordion */}
              <div className="flex flex-col border-y border-primary/5 dark:border-white/5 py-2">
                <div className="flex items-center justify-between">
                  <NavLink
                    to="/products"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `text-sm font-semibold ${isActive ? 'text-accent' : 'text-primary dark:text-paper'}`
                    }
                  >
                    Products
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="p-2 text-primary/70 dark:text-paper/70"
                    aria-label="Toggle Products Submenu"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileProductsOpen ? 'rotate-180 text-accent' : ''}`} />
                  </button>
                </div>

                {mobileProductsOpen && (
                  <div className="flex flex-col gap-2 pl-3 pt-2 text-xs">
                    <span className="font-bold text-accent uppercase tracking-wider text-[10px]">Current Systems</span>
                    <Link to="/products/mega" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-1 text-primary/90 dark:text-paper/90">
                      <Cpu className="w-3.5 h-3.5 text-accent" /> Calor Mega
                    </Link>
                    <Link to="/products/standard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-1 text-primary/90 dark:text-paper/90">
                      <Layers className="w-3.5 h-3.5 text-accent" /> Calor Standard
                    </Link>
                    <Link to="/products/mini" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-1 text-primary/90 dark:text-paper/90">
                      <Sparkles className="w-3.5 h-3.5 text-accent" /> Calor Mini
                    </Link>
                    <span className="font-bold text-accent uppercase tracking-wider text-[10px] mt-2">Upcoming Releases</span>
                    <div className="py-1 text-primary/60 dark:text-paper/60">Calor Hybrid (Solar Tech)</div>
                    <div className="py-1 text-primary/60 dark:text-paper/60">Calor Ultra (Industrial)</div>
                    <div className="py-1 text-primary/60 dark:text-paper/60">Calor Nano (Botanical)</div>
                  </div>
                )}
              </div>

              {/* Applications */}
              <NavLink
                to="/applications"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-semibold py-1.5 ${isActive ? 'text-accent' : 'text-primary dark:text-paper'}`
                }
              >
                Applications
              </NavLink>

              {/* Technology */}
              <NavLink
                to="/technology"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-semibold py-1.5 ${isActive ? 'text-accent' : 'text-primary dark:text-paper'}`
                }
              >
                Technology
              </NavLink>

              {/* Gallery */}
              <NavLink
                to="/gallery"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-semibold py-1.5 ${isActive ? 'text-accent' : 'text-primary dark:text-paper'}`
                }
              >
                Gallery
              </NavLink>

              {/* About Us Accordion */}
              <div className="flex flex-col border-y border-primary/5 dark:border-white/5 py-2">
                <div className="flex items-center justify-between">
                  <NavLink
                    to="/about"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `text-sm font-semibold ${isActive ? 'text-accent' : 'text-primary dark:text-paper'}`
                    }
                  >
                    About Us
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                    className="p-2 text-primary/70 dark:text-paper/70"
                    aria-label="Toggle About Submenu"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileAboutOpen ? 'rotate-180 text-accent' : ''}`} />
                  </button>
                </div>

                {mobileAboutOpen && (
                  <div className="flex flex-col gap-2 pl-3 pt-2 text-xs">
                    <Link to="/about#vision" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-1 text-primary/90 dark:text-paper/90">
                      <Compass className="w-3.5 h-3.5 text-accent" /> Our Vision
                    </Link>
                    <Link to="/about#mission" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-1 text-primary/90 dark:text-paper/90">
                      <Target className="w-3.5 h-3.5 text-accent" /> Our Mission
                    </Link>
                    <Link to="/about#leadership" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-1 text-primary/90 dark:text-paper/90">
                      <Users className="w-3.5 h-3.5 text-accent" /> Leadership
                    </Link>
                    <Link to="/about#profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-1 text-primary/90 dark:text-paper/90">
                      <Building2 className="w-3.5 h-3.5 text-accent" /> Company Profile
                    </Link>
                  </div>
                )}
              </div>

              {/* Contact */}
              <NavLink
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-semibold py-1.5 ${isActive ? 'text-accent' : 'text-primary dark:text-paper'}`
                }
              >
                Contact
              </NavLink>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={toggleTheme}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-primary dark:text-paper hover:text-accent transition-colors"
                  aria-label="Toggle Theme"
                >
                  {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
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
