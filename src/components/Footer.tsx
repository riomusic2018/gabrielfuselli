import { Link } from 'react-router-dom';
import { Instagram, MapPin, Globe, Star, Phone } from 'lucide-react';

const quickLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Sobre Mí', path: '/sobre-mi' },
  { label: 'Servicios', path: '/servicios' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Testimonios', path: '/testimonios' },
  { label: 'Contacto', path: '/contacto' },
];

const services = [
  'Bodas & Compromisos',
  'Eventos & Fiestas',
  'Familias & Grupos',
  'Fotografía Corporativa',
  'Retratos Individuales',
  'Maternidad & Recién Nacidos',
];

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-dark-400">
      {/* Main footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img
                src="/logo_gabriel_sin_fondo copy.png"
                alt="Gabriel Fuselli Foto y Video"
                className="h-24 w-auto brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Capturando emociones auténticas desde 2004 en Fuerteventura y toda España.
            </p>
            <div className="flex items-center gap-2 text-gold text-sm mb-2">
              <Star size={13} className="fill-gold" />
              <Star size={13} className="fill-gold" />
              <Star size={13} className="fill-gold" />
              <Star size={13} className="fill-gold" />
              <Star size={13} className="fill-gold" />
              <span className="text-white/70 ml-1 text-xs">5.0 · 58 reseñas</span>
            </div>
            <a
              href="https://instagram.com/gabrielfusellifotografia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors duration-300 text-sm mt-4"
            >
              <Instagram size={16} />
              @gabrielfusellifotografia
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans text-xs font-medium tracking-ultra uppercase text-gold mb-6">
              Navegación
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-sans text-xs font-medium tracking-ultra uppercase text-gold mb-6">
              Servicios
            </h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    to="/servicios"
                    className="text-white/60 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans text-xs font-medium tracking-ultra uppercase text-gold mb-6">
              Contacto
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={15} className="text-gold mt-0.5 shrink-0" />
                <span>C/ León y Castillo, 58<br />35600 Puerto del Rosario<br />Las Palmas, España</span>
              </li>
              <li>
                <a
                  href="https://www.gabrielfuselli.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors duration-300 text-sm"
                >
                  <Globe size={15} className="text-gold shrink-0" />
                  www.gabrielfuselli.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+34600000000"
                  className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors duration-300 text-sm"
                >
                  <Phone size={15} className="text-gold shrink-0" />
                  Llámanos ahora
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-400">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs tracking-wider">
            © 2026 Gabriel Fuselli Fotografía · Todos los derechos reservados
          </p>
          <div className="flex items-center gap-6">
            <Link to="/contacto" className="text-white/40 hover:text-gold transition-colors text-xs tracking-wider">
              Política de privacidad
            </Link>
            <Link to="/contacto" className="text-white/40 hover:text-gold transition-colors text-xs tracking-wider">
              Aviso legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
