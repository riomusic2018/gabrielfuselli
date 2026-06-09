import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Star, Heart, Users, Briefcase } from 'lucide-react';
import { portfolioItems, testimonials } from '../data';

const heroSlides = [
  { src: '/cache_86121058.jpg',   label: 'Bodas' },
  { src: '/cache_59278614.jpg',   label: 'Bodas' },
  { src: '/cache_58392445.png',   label: 'Bodas' },
  { src: '/cache_78836344.jpg',   label: 'Celebraciones' },
  { src: '/cache_59291628.jpg',   label: 'Celebraciones' },
  { src: '/cache_59291767.jpg',   label: 'Comuniones' },
  { src: '/cache_59291256.jpg',   label: 'Maternidad' },
  { src: '/cache_59275548.jpg',   label: 'Flores' },
  { src: '/cache_59292006.png',   label: 'Bebés' },
  { src: '/cache_59275605.jpeg',  label: 'Niños' },
  { src: '/cache_59275637.jpg',   label: 'Book' },
  { src: '/cache_59275598.jpg',   label: 'Book' },
  { src: '/cache_81531387.jpg',   label: 'Gastronomía' },
  { src: '/cache_81531392.jpg',   label: 'Gastronomía' },
  { src: '/cache_59275524.png',   label: 'Inmuebles' },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = heroSlides.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.src}
            alt={slide.label}
            loading="eager"
            className="w-full h-full object-cover scale-105"
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Left arrow */}
      <button
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-black/30 hover:bg-black/60 border border-white/20 hover:border-gold/60 text-white/70 hover:text-gold transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        aria-label="Siguiente"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-black/30 hover:bg-black/60 border border-white/20 hover:border-gold/60 text-white/70 hover:text-gold transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ir a foto ${i + 1}`}
            className="transition-all duration-300"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 h-2 bg-gold'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

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

export default function Home() {
  const ref = useAnimateOnScroll();

  return (
    <div ref={ref}>
      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <HeroSlider />

        <div className="relative z-10 text-center px-4">
          <p className="section-label mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Fotografía & Video · Fuerteventura
          </p>
          <h1
            className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-wider mb-4 text-shadow animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            Gabriel
            <br />
            <span className="italic gold-gradient-text">Fuselli</span>
          </h1>
          <p
            className="font-serif-alt text-white/70 text-lg md:text-xl italic mb-12 animate-fade-up"
            style={{ animationDelay: '0.7s' }}
          >
            Fotografía & Video · Fuerteventura · Islas Canarias
          </p>
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
            style={{ animationDelay: '1s' }}
          >
            <Link to="/portfolio" className="btn-primary">
              Ver mi trabajo
              <ArrowRight size={15} />
            </Link>
            <Link to="/contacto" className="btn-outline">
              Contactar
            </Link>
          </div>
        </div>

        <a
          href="#about-preview"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-gold transition-colors animate-float"
          aria-label="Bajar"
        >
          <ChevronDown size={28} />
        </a>
      </section>

      {/* ── SOBRE MÍ PREVIEW ── */}
      <section id="about-preview" className="section-padding bg-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <div className="relative">
                <img
                  src="/cache_39078713.jpg"
                  alt="Gabriel Fuselli, fotógrafo"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute bottom-6 left-6 bg-dark/90 border border-gold/30 px-5 py-4 backdrop-blur-sm">
                  <p className="text-gold font-serif text-3xl font-medium">15+</p>
                  <p className="text-white/70 text-xs tracking-widest uppercase">Años de experiencia</p>
                </div>
              </div>
            </div>

            <div className="animate-on-scroll" style={{ transitionDelay: '150ms' }}>
              <p className="section-label">Sobre Mí</p>
              <h2 className="section-title mb-6">
                Emociones Auténticas
                <br />
                <span className="italic text-gold gold-title-shadow">¡Hazlo Diferente!</span>
              </h2>
              <div className="gold-divider !mx-0 mb-8" />
              <p className="text-white/70 leading-relaxed text-base mb-6">
                Soy Gabriel Fuselli, fotógrafo profesional afincado en Fuerteventura desde 2004. Con más de
                15 años de experiencia, he dedicado mi vida a capturar los momentos más auténticos y
                emotivos de cada persona, pareja y familia.
              </p>
              <p className="text-white/70 leading-relaxed text-base mb-10">
                Mi filosofía es sencilla: cada historia merece ser contada de manera única. Disponible
                en toda España para hacer realidad tus momentos más especiales.
              </p>
              <div className="flex flex-wrap items-center gap-8 mb-10">
                {[
                  { value: '15+', label: 'Años de exp.' },
                  { value: '58', label: 'Reseñas 5★' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-serif text-3xl text-gold font-medium">{stat.value}</p>
                    <p className="text-white/50 text-xs tracking-widest uppercase mt-1">{stat.label}</p>
                  </div>
                ))}
                <img
                  src="/image copy copy copy copy copy copy copy copy.png"
                  alt="Certificado Fotógrafos de Boda"
                  className="w-20 h-20 object-contain"
                  style={{ mixBlendMode: 'screen' }}
                />
              </div>
              <Link to="/sobre-mi" className="btn-ghost group">
                Conoce mi historia
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICIOS PREVIEW ── */}
      <section className="section-padding bg-dark-800">
        <div className="container-custom">
          <div className="text-center mb-16 animate-on-scroll">
            <p className="section-label">Servicios</p>
            <h2 className="section-title">
              Lo que puedo hacer<br />
              <span className="italic text-gold gold-title-shadow">por ti</span>
            </h2>
            <div className="gold-divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Heart,
                title: 'Bodas & Compromisos',
                desc: 'Tu día más especial merece ser inmortalizado con arte y emoción. Cobertura completa desde los preparativos hasta el último baile.',
                photo: '/image copy copy copy copy.png',
              },
              {
                icon: Users,
                title: 'Familias & Grupos',
                desc: 'Sesiones naturales y emotivas para capturar los lazos familiares en exteriores o estudio.',
                photo: '/image copy copy copy copy copy.png',
              },
              {
                icon: Briefcase,
                title: 'Publicidad',
                desc: 'Imagen profesional y moderna para tu empresa, equipo y proyectos institucionales.',
                photo: '/cache_74249069.png',
              },
            ].map((s, i) => (
              <div
                key={s.title}
                className="animate-on-scroll relative overflow-hidden group"
                style={{ height: '420px', borderRadius: '16px', transitionDelay: `${i * 100}ms` }}
              >
                {/* Background photo */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[400ms] ease-[ease] group-hover:scale-[1.05]"
                  style={{ backgroundImage: `url('${s.photo}')` }}
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 transition-all duration-[400ms]"
                  style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.88) 100%)' }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]"
                  style={{ background: 'rgba(0,0,0,0.15)' }}
                />
                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-7 flex flex-col items-start">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full mb-4"
                    style={{ background: 'rgba(201,168,76,0.18)', border: '1px solid rgba(201,168,76,0.4)' }}
                  >
                    <s.icon size={22} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-2 leading-tight">{s.title}</h3>
                  <p className="text-white/75 text-sm leading-relaxed mb-5 line-clamp-2">{s.desc}</p>
                  <Link
                    to="/contacto"
                    className="inline-flex items-center gap-2 border border-gold/70 text-gold font-sans font-medium text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-300 hover:bg-gold hover:text-dark hover:border-gold active:scale-95"
                  >
                    Consultar precio
                    <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center animate-on-scroll">
            <Link to="/servicios" className="btn-outline">
              Ver todos los servicios
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO PREVIEW ── */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16 animate-on-scroll">
            <p className="section-label">Portfolio</p>
            <h2 className="section-title">
              Momentos que<br />
              <span className="italic text-gold gold-title-shadow">perduran para siempre</span>
            </h2>
            <div className="gold-divider" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
            {portfolioItems.slice(0, 6).map((item, i) => (
              <div
                key={item.id}
                className="animate-on-scroll relative overflow-hidden group aspect-square"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <img
                  src={item.thumb}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/50 transition-all duration-300 flex items-end">
                  <div className="p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-gold text-xs tracking-widest uppercase">{item.category}</p>
                    <p className="text-white font-serif text-sm">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center animate-on-scroll">
            <Link to="/portfolio" className="btn-outline">
              Ver Portfolio completo
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS PREVIEW ── */}
      <section className="section-padding bg-dark-800">
        <div className="container-custom">
          <div className="text-center mb-16 animate-on-scroll">
            <p className="section-label">Testimonios</p>
            <h2 className="section-title">
              Lo que dicen<br />
              <span className="italic text-gold gold-title-shadow">mis clientes</span>
            </h2>
            <div className="gold-divider" />
          </div>

          <div className="max-w-3xl mx-auto animate-on-scroll">
            <div className="card-dark p-10 md:p-14 text-center relative">
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} className="text-gold fill-gold" />
                ))}
              </div>
              <blockquote className="font-serif-alt text-xl md:text-2xl text-white/90 italic leading-relaxed mb-8">
                "{testimonials[0].text}"
              </blockquote>
              <div className="gold-divider" />
              <p className="text-gold font-medium text-sm tracking-wider mt-4">
                — {testimonials[0].name}
              </p>
              <p className="text-white/40 text-xs mt-1">{testimonials[0].date}</p>
              <div className="absolute top-8 left-10 text-gold/10 font-serif text-8xl leading-none select-none">
                "
              </div>
            </div>
          </div>

          <div className="text-center mt-10 animate-on-scroll">
            <Link to="/testimonios" className="btn-outline">
              Ver todas las opiniones
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTACTO PREVIEW ── */}
      <section className="section-padding bg-dark relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=1200')",
          }}
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="relative z-10 container-custom text-center">
          <div className="animate-on-scroll">
            <p className="section-label">Contacto</p>
            <h2 className="section-title mb-4">
              ¿Hablamos?
            </h2>
            <p className="font-serif-alt text-white/60 text-xl italic mb-2">
              Tu historia merece ser contada
            </p>
            <div className="gold-divider" />
            <p className="text-white/60 text-base leading-relaxed max-w-xl mx-auto mb-10">
              Cuéntame sobre tu proyecto y trabajaremos juntos para crear imágenes que te emocionen
              el resto de tu vida.
            </p>
            <Link to="/contacto" className="btn-primary text-sm">
              Contactar ahora
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BODAS 2026 BANNER ── */}
      <div className="bg-gold py-5 px-4">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif text-dark text-lg font-medium">
            Bodas 2026 — <span className="italic">¡Plazas limitadas!</span>
          </p>
          <Link to="/contacto" className="bg-dark text-gold border border-dark font-sans text-xs font-medium tracking-widest uppercase px-6 py-2.5 hover:bg-dark-700 transition-colors whitespace-nowrap">
            Consulta disponibilidad
          </Link>
        </div>
      </div>
    </div>
  );
}
