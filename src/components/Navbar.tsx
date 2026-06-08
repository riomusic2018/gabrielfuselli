import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Sobre Mí', path: '/sobre-mi' },
  { label: 'Servicios', path: '/servicios' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Tienda', path: '/tienda' },
  { label: 'Testimonios', path: '/testimonios' },
  { label: 'Contacto', path: '/contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'bg-dark/95 backdrop-blur-md border-b border-dark-400 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group" aria-label="Gabriel Fuselli Fotografía">
          <img
            src="/logo_gabriel_sin_fondo.png"
            alt="Gabriel Fuselli Foto y Video"
            className="h-12 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-sans text-[11px] font-medium tracking-widest uppercase transition-all duration-300 relative group ${
                location.pathname === link.path
                  ? 'text-gold'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:text-gold transition-colors"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 top-0 bg-dark/98 backdrop-blur-lg z-40 flex flex-col transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b border-dark-400">
          <Link to="/" className="flex items-center">
            <img
              src="/logo_gabriel_sin_fondo.png"
              alt="Gabriel Fuselli Foto y Video"
              className="h-12 w-auto brightness-0 invert opacity-90"
            />
          </Link>
          <button onClick={() => setMenuOpen(false)} className="text-white hover:text-gold transition-colors">
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center flex-1 gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
              className={`font-serif text-2xl transition-all duration-300 ${
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${location.pathname === link.path ? 'text-gold' : 'text-white hover:text-gold'}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contacto"
            className="btn-primary mt-4"
            style={{ transitionDelay: menuOpen ? '380ms' : '0ms' }}
          >
            Reservar sesión
          </Link>
        </nav>
        <div className="text-center pb-8 text-dark-300 text-xs tracking-widest uppercase">
          @gabrielfusellifotografia
        </div>
      </div>
    </header>
  );
}
