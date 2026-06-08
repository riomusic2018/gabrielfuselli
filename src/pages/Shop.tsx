import { useEffect, useRef, useState } from 'react';
import { MessageCircle, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import { supabase, type TiendaProduct } from '../lib/supabase';

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

const staticProducts = [
  {
    id: 'static-1',
    title: 'Impresión Fine Art 30×40 cm',
    description: 'Impresión de alta resolución sobre papel fotográfico Fine Art de 300 g/m². Acabado mate premium, colores duraderos.',
    price: 45,
    badge: 'Más vendido',
    image_url: 'https://images.pexels.com/photos/1070534/pexels-photo-1070534.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'static-2',
    title: 'Impresión Fine Art 50×70 cm',
    description: 'Gran formato sobre papel Fine Art 300 g/m². Ideal para salones y espacios con mucha luz natural. Acabado satinado.',
    price: 85,
    badge: null,
    image_url: 'https://images.pexels.com/photos/3493777/pexels-photo-3493777.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'static-3',
    title: 'Lienzo Canvas 40×60 cm',
    description: 'Impresión sobre lienzo tensado en bastidor de madera maciza. Listo para colgar. Bordes envolventes de 4 cm.',
    price: 95,
    badge: 'Novedad',
    image_url: 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'static-4',
    title: 'Lienzo Canvas 60×90 cm',
    description: 'Formato grande para el protagonismo que merece tu imagen. Bastidor de madera reforzado y lienzo con textura suave.',
    price: 145,
    badge: null,
    image_url: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'static-5',
    title: 'Álbum de Boda Premium',
    description: 'Álbum artesanal con tapa dura personalizada, páginas de alta calidad y encuadernación cosida. 30×30 cm, 40 páginas.',
    price: 320,
    badge: 'Premium',
    image_url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'static-6',
    title: 'Marco Dorado con Impresión',
    description: 'Marco de madera lacada en dorado envejecido con impresión Fine Art 20×30 cm incluida. Entrega lista para regalar.',
    price: 75,
    badge: 'Ideal regalo',
    image_url: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

type DisplayProduct = {
  id: string;
  title: string;
  description: string;
  price: number;
  badge?: string | null;
  image_url: string;
};

function ProductCard({ product, delay }: { product: DisplayProduct; delay: number }) {
  const message = encodeURIComponent(
    `Hola Gabriel! Me interesa el producto: "${product.title}" (${product.price}€). ¿Podrías darme más información?`
  );
  const whatsappUrl = `https://wa.me/34600000000?text=${message}`;

  return (
    <div
      className="animate-on-scroll flex flex-col bg-dark-700 border border-dark-400 hover:border-gold/40 transition-all duration-500 group overflow-hidden"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden" style={{ height: '260px' }}>
        <img
          src={product.image_url}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-700/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {product.badge && (
          <span className="absolute top-4 left-4 bg-gold text-dark font-sans font-medium text-[10px] tracking-widest uppercase px-3 py-1.5">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-serif text-xl text-white mb-3 leading-snug group-hover:text-gold transition-colors duration-300">
          {product.title}
        </h3>
        <p className="text-white/55 text-sm leading-relaxed mb-6 flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-dark-400">
          <div>
            <span className="text-gold font-serif text-2xl font-medium">{product.price}€</span>
            <span className="text-white/30 text-xs ml-1">/ unidad</span>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-dark font-sans font-medium text-[11px] tracking-widest uppercase px-5 py-2.5 hover:bg-gold-light hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <MessageCircle size={13} />
            Consultar
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  const ref = useAnimateOnScroll();
  const [dbProducts, setDbProducts] = useState<TiendaProduct[]>([]);
  const [loadingDb, setLoadingDb] = useState(true);

  useEffect(() => {
    supabase
      .from('tienda_products')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (data) setDbProducts(data as TiendaProduct[]);
        if (error) console.error('tienda_products fetch error:', error.message);
        setLoadingDb(false);
      });
  }, []);

  const allProducts: DisplayProduct[] = [
    ...dbProducts.map((p) => ({ id: p.id, title: p.title, description: p.description, price: p.price, image_url: p.image_url })),
    ...staticProducts,
  ];

  // Re-observe product cards after they render (data loads after initial mount)
  useEffect(() => {
    const el = ref.current;
    if (!el || loadingDb) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.05 }
    );
    el.querySelectorAll('.animate-on-scroll:not(.visible)').forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [loadingDb, allProducts.length, ref]);

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1070534/pexels-photo-1070534.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          }}
        />
        <div className="absolute inset-0 bg-dark/80" />
        <div className="relative z-10 container-custom text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold font-sans text-xs font-medium tracking-ultra uppercase">
              Impresiones & Productos
            </span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h1 className="section-title text-6xl md:text-7xl mb-4">
            <span className="italic text-gold">Tienda</span>
          </h1>
          <p className="font-serif-alt text-white/60 text-xl italic max-w-lg mx-auto">
            Lleva tus recuerdos más especiales a casa en formato impreso
          </p>
          <div className="gold-divider" />
        </div>
      </section>

      {/* Intro strip */}
      <section className="py-8 bg-dark-700 border-y border-dark-400">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 text-center">
            {[
              { label: 'Impresión profesional', sub: 'Papel Fine Art 300 g/m²' },
              { label: 'Entrega en Fuerteventura', sub: 'Recogida o entrega a domicilio' },
              { label: 'Consulta por WhatsApp', sub: 'Respuesta en menos de 24h' },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-serif text-white text-base">{item.label}</p>
                <p className="text-white/40 text-xs tracking-widest uppercase mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16 animate-on-scroll">
            <p className="section-label">Catálogo</p>
            <h2 className="section-title">
              Productos disponibles
            </h2>
            <div className="gold-divider" />
            <p className="text-white/50 text-sm max-w-md mx-auto mt-4">
              Cada producto se elabora a medida con las fotografías de tu sesión. Contáctame por WhatsApp para personalizar tu pedido.
            </p>
          </div>

          {loadingDb ? (
            <div className="flex items-center justify-center py-10 text-white/30">
              <Loader2 size={22} className="animate-spin mr-3" />
              Cargando productos...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} delay={i * 80} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 bg-dark-800 border-t border-dark-400">
        <div className="container-custom text-center animate-on-scroll">
          <ShoppingBag size={28} className="text-gold mx-auto mb-6" />
          <p className="section-label">Pedido personalizado</p>
          <h2 className="section-title mb-4">
            ¿Buscas algo <span className="italic text-gold">diferente?</span>
          </h2>
          <div className="gold-divider" />
          <p className="text-white/60 text-base max-w-md mx-auto mb-10">
            Puedo preparar cualquier formato, tamaño o combinación. Escríbeme y diseñamos juntos tu producto perfecto.
          </p>
          <a
            href={`https://wa.me/34600000000?text=${encodeURIComponent('Hola Gabriel! Me gustaría consultar sobre un pedido personalizado de impresiones.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <MessageCircle size={15} />
            Consultar por WhatsApp
            <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </div>
  );
}
