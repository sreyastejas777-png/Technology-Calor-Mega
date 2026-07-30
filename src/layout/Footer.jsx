import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const quickLinks = [
  { label: 'Products', path: '/products' },
  { label: 'Applications', path: '/applications' },
  { label: 'Technology', path: '/technology' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

const socials = [
  { icon: FaFacebookF, href: 'https://facebook.com' },
  { icon: FaInstagram, href: 'https://instagram.com' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com' },
  { icon: FaYoutube, href: 'https://youtube.com' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-bold">
            CALOR <span className="text-accent">MEGA</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Premium industrial food drying solutions that preserve freshness, increase profit and reduce food waste.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent hover:text-primary"
              >
                <s.icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 font-semibold text-accent">Quick Links</p>
          <ul className="space-y-3 text-sm text-white/70">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-semibold text-accent">Company</p>
          <ul className="space-y-3 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/quote" className="hover:text-white transition-colors">Get Quote</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-semibold text-accent">Contact</p>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2"><FaMapMarkerAlt className="mt-1 shrink-0" /> Industrial Estate, Kochi, Kerala, India</li>
            <li className="flex items-center gap-2"><FaPhoneAlt className="shrink-0" /> +91 99999 99999</li>
            <li className="flex items-center gap-2"><FaEnvelope className="shrink-0" /> info@calormega.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} CALOR MEGA. All rights reserved.
      </div>
    </footer>
  );
}
