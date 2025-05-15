import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const linkStyle = (path: string) =>
    `px-4 py-2 rounded ${location.pathname === path ? 'bg-blue-600 text-white' : 'text-blue-600 border'}`;

  return (
    <nav className="flex gap-4 p-4 border-b mb-4">
      <Link to="/" className={linkStyle('/')}>
        Ana Sayfa
      </Link>
      <Link to="/favorites" className={linkStyle('/favorites')}>
        Favoriler
      </Link>
    </nav>
  );
};

export default Navbar;
