import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, MessageCircle, FileText, Camera, ImageIcon } from 'lucide-react';
import { services } from '../data';

function useAnimateOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    );
    const el = ref.current;
    if (el) el.querySelectorAll('.animate-on-scroll').forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return ref;
}

const BASE = 'https://www.gabrielfuselli.com/s/cc_images/';

const servicePhotos: Record<string, string> = {
  bodas:      '/image copy copy.png',
  eventos:    '/image copy copy copy copy.png',
  familias:   '/image copy copy copy copy copy.png',
  corporativo: '/image copy copy copy copy copy copy copy copy copy copy.png',
  inmuebles:  '/image copy copy copy copy copy copy.png',
  retratos:   BASE + 'cache_82698813.jpg',
  maternidad: BASE + 'cache_78828842.jpg',
  producto:   BASE + 'cache_84609892.jpg',
};

const processSteps = [
  { step: '01', title: 'Consulta inicial', desc: 'Nos conocemos y hablamos de tu proyecto, fechas y necesidades.', Icon: MessageCircle },
  { step: '02', title: 'Propuesta', desc: 'Te envío una propuesta personalizada adaptada a tu visión y presupuesto.', Icon: FileText },
  { step: '03', title: 'La sesión', desc: 'Capturamos juntos los momentos que importan en un ambiente relajado.', Icon: Camera },
  { step: '04', title: 'Entrega', desc: 'Recibes tus imágenes editadas en una galería privada online.', Icon: ImageIcon },
];

export default function Services() {
  const ref = useAnimateOnScroll();

  return (
    <div ref={ref}>
      {/* Page Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=1920')" }}
        />
        <div className="absolute inset-0 bg-dark/80" />
        <div className="relative z-10 container-custom text-center">
          <p className="section-label">Servicios</p>
          <h1 className="section-title text-5xl md:text-6xl mb-4">
            Mis <span className="italic text-gold gold-title-shadow">Servicios</span>
          </h1>
          <p className="font-serif-alt text-white/60 text-xl italic max-w-xl mx-auto">
            Cada momento tiene su propia luz. Yo me encargo de encontrarla.
          </p>
          <div className="gold-divider" />
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              const photo = servicePhotos[service.id];
              return (
                <div
                  key={service.id}
                  className="animate-on-scroll relative overflow-hidden group"
                  style={{
                    height: '420px',
                    borderRadius: '16px',
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  {/* Background photo */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[400ms] ease-[ease] group-hover:scale-[1.05]"
                    style={{ backgroundImage: `url('${photo}')` }}
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 transition-all duration-[400ms]"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.88) 100%)',
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]"
                    style={{ background: 'rgba(0,0,0,0.15)' }}
                  />

                  {/* Content — bottom aligned */}
                  <div className="absolute inset-x-0 bottom-0 p-7 flex flex-col items-start">
                    {/* Icon circle */}
                    <div
                      className="flex items-center justify-center w-12 h-12 rounded-full mb-4"
                      style={{
                        background: 'rgba(201, 168, 76, 0.18)',
                        border: '1px solid rgba(201, 168, 76, 0.4)',
                      }}
                    >
                      <Icon size={22} className="text-gold" />
                    </div>

                    <h2 className="font-serif text-2xl text-white mb-2 leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-white/75 text-sm leading-relaxed mb-5 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Features — hidden by default, shown on hover */}
                    <ul className="space-y-1.5 mb-5 max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-white/70 text-xs">
                          <CheckCircle size={11} className="text-gold shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/contacto"
                      className="inline-flex items-center gap-2 border border-gold/70 text-gold font-sans font-medium text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-300 hover:bg-gold hover:text-dark hover:border-gold active:scale-95"
                    >
                      Consultar precio
                      <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-dark-800">
        <div className="container-custom">
          <div className="text-center mb-20 animate-on-scroll">
            <p className="section-label">El proceso</p>
            <h2 className="section-title">
              ¿Cómo trabajamos<br />
              <span className="italic text-gold gold-title-shadow">juntos?</span>
            </h2>
            <div className="gold-divider" />
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-10 left-[calc(12.5%+1px)] right-[calc(12.5%+1px)] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
              {processSteps.map((s, i) => (
                <div
                  key={s.step}
                  className="animate-on-scroll flex flex-col items-center text-center"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div
                    className="relative w-20 h-20 rounded-full flex flex-col items-center justify-center mb-6 z-10"
                    style={{
                      background: 'linear-gradient(135deg, #C9A84C 0%, #A8892D 100%)',
                      boxShadow: '0 0 30px rgba(201,168,76,0.35), 0 4px 16px rgba(0,0,0,0.5)',
                    }}
                  >
                    <s.Icon size={22} className="text-dark mb-0.5" />
                    <span className="font-sans text-dark text-[10px] font-bold tracking-widest">{s.step}</span>
                  </div>
                  <h3 className="font-serif text-lg text-white mb-3">{s.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bodas 2026 Banner */}
      <section className="bg-gold py-16 px-4">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-sans text-dark text-xs font-medium tracking-ultra uppercase mb-2">
              Disponibilidad 2026
            </p>
            <h2 className="font-serif text-dark text-3xl md:text-4xl font-medium">
              Bodas 2026 — <span className="italic">Consulta disponibilidad ahora</span>
            </h2>
            <p className="text-dark/70 text-base mt-2">
              Las plazas son limitadas. Asegura tu fecha cuanto antes.
            </p>
          </div>
          <Link
            to="/contacto"
            className="bg-dark text-gold border border-dark font-sans text-xs font-medium tracking-widest uppercase px-8 py-4 hover:bg-dark-700 transition-colors whitespace-nowrap shrink-0"
          >
            Reservar fecha
            <ArrowRight size={14} className="inline ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
