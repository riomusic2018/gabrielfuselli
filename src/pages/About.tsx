import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, MapPin, Award, Camera, Heart } from 'lucide-react';

function useAnimateOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) el.querySelectorAll('.animate-on-scroll').forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return ref;
}

const stats = [
  { value: '15+', label: 'Años de experiencia', icon: Camera },
  { value: '58', label: 'Reseñas 5 estrellas', icon: Award },
  { value: '2004', label: 'Llegué a Fuerteventura', icon: MapPin },
  { value: '∞', label: 'Momentos únicos', icon: Heart },
];

const timeline = [
  { year: '2004', event: 'Llegada a Fuerteventura e inicio de la aventura canaria' },
  { year: '2007', event: 'Primeras bodas profesionales en las Islas Canarias' },
  { year: '2010', event: 'Apertura del estudio propio en Puerto del Rosario' },
  { year: '2015', event: 'Expansión a nivel nacional — toda España' },
  { year: '2020', event: 'Premio a la excelencia con 50+ reseñas de 5 estrellas' },
  { year: '2024', event: '58 reseñas verificadas 5 estrellas en Google' },
];

export default function About() {
  const ref = useAnimateOnScroll();

  return (
    <div ref={ref}>
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          }}
        />
        <div className="absolute inset-0 bg-dark/80" />
        <div className="relative z-10 container-custom text-center">
          <p className="section-label">Sobre Mí</p>
          <h1 className="section-title text-5xl md:text-6xl mb-4">
            Gabriel <span className="italic text-gold">Fuselli</span>
          </h1>
          <p className="font-serif-alt text-white/60 text-xl italic">
            Emociones Auténticas · ¡Hazlo Diferente!
          </p>
          <div className="gold-divider" />
        </div>
      </section>

      {/* Main Bio Section */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Photo column */}
            <div className="animate-on-scroll">
              <div className="relative">
                <img
                  src="/cache_39078713.jpg"
                  alt="Gabriel Fuselli, fotógrafo profesional"
                  className="w-full h-[600px] object-cover"
                />
              </div>
            </div>

            {/* Bio column */}
            <div className="animate-on-scroll" style={{ transitionDelay: '150ms' }}>
              <p className="section-label">Mi Historia</p>
              <h2 className="section-title mb-8">
                Fotografiando<br />
                <span className="italic text-gold">el alma de las personas</span>
              </h2>

              <div className="space-y-5 text-white/70 leading-relaxed text-base">
                <p>
                  Llegué a Fuerteventura en 2004 enamorado de la luz única que bañan estas islas y
                  del carácter auténtico de sus gentes. Desde ese primer día supe que este sería mi
                  hogar y mi escenario.
                </p>
                <p>
                  Con más de <span className="text-gold font-medium">15 años de experiencia</span>,
                  he tenido el privilegio de acompañar a cientos de familias, parejas y empresas
                  en sus momentos más importantes. Cada sesión es para mí una responsabilidad y
                  un honor.
                </p>
                <p>
                  Mi filosofía parte de la autenticidad: las mejores fotografías no se construyen,
                  se descubren. Mi trabajo consiste en crear el espacio y la confianza para que las
                  emociones reales afloren de manera natural.
                </p>
                <p>
                  Disponible para proyectos en toda España, siempre con el corazón puesto en
                  Fuerteventura y las Islas Canarias.
                </p>
              </div>

              <div className="mt-10 p-6 border border-gold/20 bg-dark-700">
                <p className="font-serif-alt text-2xl italic text-white/80 leading-relaxed">
                  "Emociones Auténticas · ¡Hazlo Diferente!"
                </p>
                <div className="w-10 h-px bg-gold mt-4" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Link to="/portfolio" className="btn-primary">
                  Ver mi trabajo
                  <ArrowRight size={14} />
                </Link>
                <Link to="/contacto" className="btn-outline">
                  Contactar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-dark-700 border-y border-dark-400">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="animate-on-scroll text-center"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex justify-center mb-3">
                  <stat.icon size={20} className="text-gold" />
                </div>
                <p className="font-serif text-4xl text-gold font-medium">{stat.value}</p>
                <p className="text-white/50 text-xs tracking-widest uppercase mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16 animate-on-scroll">
            <p className="section-label">Trayectoria</p>
            <h2 className="section-title">
              Un camino de<br />
              <span className="italic text-gold">pasión y dedicación</span>
            </h2>
            <div className="gold-divider" />
          </div>

          <div className="max-w-2xl mx-auto">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className="animate-on-scroll flex gap-8 mb-10 last:mb-0"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 border border-gold flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 bg-gold rounded-full" />
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-dark-400 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-gold font-sans text-xs font-medium tracking-ultra uppercase mb-2">
                    {item.year}
                  </p>
                  <p className="text-white/70 leading-relaxed">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-20 bg-dark-800">
        <div className="container-custom text-center animate-on-scroll">
          <p className="section-label">Sígueme</p>
          <h2 className="section-title mb-4">
            Día a día en<br />
            <span className="italic text-gold">Instagram</span>
          </h2>
          <div className="gold-divider" />
          <p className="text-white/60 text-base max-w-md mx-auto mb-8">
            Comparto mi trabajo, el proceso creativo y los momentos especiales de cada sesión.
          </p>
          <a
            href="https://instagram.com/gabrielfusellifotografia"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <Instagram size={16} />
            @gabrielfusellifotografia
          </a>
        </div>
      </section>
    </div>
  );
}
