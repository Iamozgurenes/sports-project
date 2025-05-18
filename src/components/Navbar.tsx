import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Dışarı tıklandığında menüyü kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const linkStyle = (path: string) =>
    `px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
      location.pathname === path
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-300/30'
        : 'text-gray-700 hover:bg-gray-100/80 hover:text-blue-600'
    }`;

  const mobileLinkStyle = (path: string) =>
    `flex items-center gap-3 w-full text-left px-5 py-4 rounded-lg font-medium transition-all duration-300 ${
      location.pathname === path
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <header className="sticky top-0 z-50">
      <nav 
        className="bg-white/90 backdrop-blur-md border-b shadow-sm"
        aria-label="Ana Navigasyon"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo ve Marka */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 
                flex items-center justify-center text-white font-bold shadow-md shadow-blue-300/20
                transition-transform duration-300 group-hover:scale-110">
                <span className="text-xl">E</span>
              </div>
              <div>
                <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
                  text-transparent bg-clip-text transition-all duration-300 group-hover:from-indigo-600 
                  group-hover:to-blue-600">
                  Egzersiz Rehberi
                </span>

              </div>
            </Link>
            
            <div className="hidden md:flex md:items-center md:gap-4">
              <Link to="/" className={linkStyle('/')}>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Ana Sayfa
                </span>
              </Link>
              <Link to="/favorites" className={linkStyle('/favorites')}>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Favoriler
                </span>
              </Link>
            </div>
            
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2.5 rounded-lg text-gray-700 
                  bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 
                  transition-all duration-300"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Ana menüyü aç/kapat"
              >
                {isMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

      
      </nav>
      
      
      <div 
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden fixed left-0 right-0 top-16 z-40 transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <div className="mx-4 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-3 space-y-1">
            <Link to="/" className={mobileLinkStyle('/')}>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Ana Sayfa</span>
            </Link>
            <Link to="/favorites" className={mobileLinkStyle('/favorites')}>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Favoriler</span>
            </Link>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Navbar;
