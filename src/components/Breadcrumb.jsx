import { Link, useLocation } from 'react-router-dom';
import { FaChevronRight, FaHome } from 'react-icons/fa';
import { routeLabels } from '../data/navigation';
import { getProductById } from '../data/products';

export default function Breadcrumb({ current }) {
  const location = useLocation();

  if (location.pathname === '/') return null;

  const segments = location.pathname.split('/').filter(Boolean);
  let path = '';
  const crumbs = segments.map((seg, i) => {
    path += `/${seg}`;
    const isLast = i === segments.length - 1;
    const product = isLast ? getProductById(seg) : null;
    const label = isLast && current ? current : product ? product.name : routeLabels[path] || seg;
    return { path, label, isLast };
  });

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-primary/60 dark:text-paper/60">
      <Link to="/" className="flex items-center gap-1 hover:text-accent transition-colors">
        <FaHome /> Home
      </Link>
      {crumbs.map((crumb) => (
        <span key={crumb.path} className="flex items-center gap-2">
          <FaChevronRight className="text-xs opacity-50" />
          {crumb.isLast ? (
            <span className="font-semibold text-primary dark:text-paper">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="hover:text-accent transition-colors">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
