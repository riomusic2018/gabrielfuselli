import { useEffect, useRef } from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { testimonials } from '../data';

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

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="text-gold fill-gold" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useAnimateOnScroll();

  return (
    <div ref={ref}>
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          }}
        />
        <div className="absolute inset-0 bg-dark/80" />
        <div className="relative z-10 container-custom text-center">
          <p className="section-label">Testimonios</p>
          <h1 className="section-title text-5xl md:text-6xl mb-4">
            Lo que dicen<br />
            <span className="italic text-gold">mis clientes</span>
          </h1>
          <div className="gold-divider" />
        </div>
      </section>

      {/* Google Rating Badge */}
      <section className="py-14 bg-dark-700 border-b border-dark-400">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-on-scroll">
            <div className="flex flex-col items-center">
              <div className="flex gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={24} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="font-serif text-5xl text-white font-medium">5.0</p>
              <p className="text-white/50 text-sm tracking-widest uppercase mt-1">Puntuación media</p>
            </div>
            <div className="w-px h-16 bg-dark-400 hidden sm:block" />
            <div className="flex flex-col items-center">
              <p className="font-serif text-5xl text-gold font-medium">58</p>
              <p className="text-white/50 text-sm tracking-widest uppercase mt-1">Reseñas verificadas</p>
            </div>
            <div className="w-px h-16 bg-dark-400 hidden sm:block" />
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-white font-medium">Google</span>
              </div>
              <p className="text-white/50 text-sm tracking-widest uppercase">Reseñas certificadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className="animate-on-scroll card-dark p-8 relative flex flex-col"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute top-6 right-6 text-gold/10 font-serif text-6xl leading-none select-none">
                  "
                </div>
                <StarRating count={t.rating} />
                <blockquote className="font-serif-alt text-white/80 italic leading-relaxed mt-5 mb-6 flex-1 text-base">
                  "{t.text}"
                </blockquote>
                <div className="border-t border-dark-400 pt-5 flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs mt-0.5">{t.date}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/30 text-xs">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84z" fill="#EA4335"/>
                    </svg>
                    Google
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to leave review */}
      <section className="section-padding bg-dark-800">
        <div className="container-custom text-center animate-on-scroll">
          <p className="section-label">Tu opinión importa</p>
          <h2 className="section-title mb-4">
            ¿Has trabajado<br />
            <span className="italic text-gold">conmigo antes?</span>
          </h2>
          <div className="gold-divider" />
          <p className="text-white/60 text-base max-w-lg mx-auto mb-10">
            Tu reseña ayuda a otras familias y parejas a tomar la mejor decisión. ¡Comparte tu experiencia!
          </p>
          <a
            href="https://g.page/r/review"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <ExternalLink size={15} />
            Deja tu opinión en Google
          </a>
        </div>
      </section>
    </div>
  );
}
