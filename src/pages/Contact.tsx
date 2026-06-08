import { useState, useEffect, useRef, FormEvent } from 'react';
import { MapPin, Globe, Instagram, Star, ArrowRight, Send, CheckCircle } from 'lucide-react';

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

const serviceTypes = [
  'Bodas & Compromisos',
  'Eventos & Fiestas',
  'Familias & Grupos',
  'Fotografía Corporativa',
  'Fotografía de Bienes Inmuebles',
  'Retratos Individuales',
  'Maternidad & Recién Nacidos',
  'Fotografía de Producto',
  'Otro',
];

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  fecha: string;
  mensaje: string;
}

export default function Contact() {
  const ref = useAnimateOnScroll();
  const [form, setForm] = useState<FormData>({
    nombre: '', email: '', telefono: '', servicio: '', fecha: '', mensaje: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

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
          <p className="section-label">Contacto</p>
          <h1 className="section-title text-5xl md:text-6xl mb-4">
            ¿<span className="italic text-gold">Hablamos</span>?
          </h1>
          <p className="font-serif-alt text-white/60 text-xl italic">
            Tu historia merece ser contada de manera única
          </p>
          <div className="gold-divider" />
        </div>
      </section>

      {/* Bodas 2026 Banner */}
      <div className="bg-gold/10 border-b border-gold/20 py-4 px-4">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <span className="text-gold font-serif text-lg font-medium">
            Bodas 2026 — <span className="italic">¡Plazas limitadas!</span>
          </span>
          <span className="text-white/50 text-sm">Consulta disponibilidad cuanto antes</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-3 animate-on-scroll">
              <p className="section-label">Envíame un mensaje</p>
              <h2 className="section-title mb-8">
                Cuéntame tu<br />
                <span className="italic text-gold">proyecto</span>
              </h2>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 border border-gold flex items-center justify-center mb-6">
                    <CheckCircle size={28} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-3">¡Mensaje enviado!</h3>
                  <p className="text-white/60 leading-relaxed max-w-md">
                    Gracias por ponerte en contacto. Te responderé en menos de 24 horas para
                    hablar sobre tu proyecto.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ nombre: '', email: '', telefono: '', servicio: '', fecha: '', mensaje: '' }); }}
                    className="btn-outline mt-8 text-xs"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-white/60 tracking-widest uppercase mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        required
                        value={form.nombre}
                        onChange={handleChange}
                        placeholder="Tu nombre completo"
                        className="w-full bg-dark-700 border border-dark-400 text-white placeholder-white/30 px-4 py-3.5 text-sm focus:outline-none focus:border-gold transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/60 tracking-widest uppercase mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className="w-full bg-dark-700 border border-dark-400 text-white placeholder-white/30 px-4 py-3.5 text-sm focus:outline-none focus:border-gold transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-white/60 tracking-widest uppercase mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        placeholder="+34 600 000 000"
                        className="w-full bg-dark-700 border border-dark-400 text-white placeholder-white/30 px-4 py-3.5 text-sm focus:outline-none focus:border-gold transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/60 tracking-widest uppercase mb-2">
                        Tipo de servicio *
                      </label>
                      <select
                        name="servicio"
                        required
                        value={form.servicio}
                        onChange={handleChange}
                        className="w-full bg-dark-700 border border-dark-400 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-gold transition-colors duration-300 appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="text-white/30">Selecciona un servicio</option>
                        {serviceTypes.map((s) => (
                          <option key={s} value={s} className="bg-dark-700 text-white">{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/60 tracking-widest uppercase mb-2">
                      Fecha del evento
                    </label>
                    <input
                      type="date"
                      name="fecha"
                      value={form.fecha}
                      onChange={handleChange}
                      className="w-full bg-dark-700 border border-dark-400 text-white placeholder-white/30 px-4 py-3.5 text-sm focus:outline-none focus:border-gold transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/60 tracking-widest uppercase mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      name="mensaje"
                      required
                      rows={5}
                      value={form.mensaje}
                      onChange={handleChange}
                      placeholder="Cuéntame sobre tu proyecto, fecha, lugar y cualquier detalle importante..."
                      className="w-full bg-dark-700 border border-dark-400 text-white placeholder-white/30 px-4 py-3.5 text-sm focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-dark/40 border-t-dark rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Enviar mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 animate-on-scroll" style={{ transitionDelay: '150ms' }}>
              <p className="section-label">Información</p>
              <h2 className="section-title mb-8">
                Encuéntrame
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs tracking-widest uppercase mb-1">Estudio</p>
                    <p className="text-white text-sm leading-relaxed">
                      C/ León y Castillo, 58<br />
                      35600 Puerto del Rosario<br />
                      Las Palmas, España
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Globe size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs tracking-widest uppercase mb-1">Web</p>
                    <a
                      href="https://www.gabrielfuselli.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm hover:text-gold transition-colors"
                    >
                      www.gabrielfuselli.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Instagram size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs tracking-widest uppercase mb-1">Instagram</p>
                    <a
                      href="https://instagram.com/gabrielfusellifotografia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm hover:text-gold transition-colors"
                    >
                      @gabrielfusellifotografia
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Star size={16} className="text-gold fill-gold" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs tracking-widest uppercase mb-1">Google</p>
                    <p className="text-white text-sm">
                      5.0 ⭐ · <span className="text-gold">58 reseñas</span> verificadas
                    </p>
                  </div>
                </div>
              </div>

              {/* Map embed */}
              <div className="w-full h-64 bg-dark-700 border border-dark-400 overflow-hidden relative">
                <iframe
                  title="Estudio Gabriel Fuselli"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3546.5!2d-13.863!3d28.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMwJzAwLjAiTiAxM8KwNTEnNDguMCJX!5e0!3m2!1ses!2ses!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(0.9)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="text-white/40 text-xs mt-3 flex items-center gap-1.5">
                <MapPin size={11} />
                Puerto del Rosario, Fuerteventura · Disponibilidad nacional
              </p>

              {/* Quick WhatsApp CTA */}
              <a
                href="https://wa.me/34600000000?text=Hola%20Gabriel!%20Me%20gustaría%20obtener%20información%20sobre%20tus%20servicios."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-colors px-6 py-4 text-sm font-medium w-full"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Escríbeme por WhatsApp
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
