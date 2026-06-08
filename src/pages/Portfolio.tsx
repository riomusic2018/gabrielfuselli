import { useState, useEffect, useRef } from 'react';
import { portfolioItems as staticItems } from '../data';
import { supabase } from '../lib/supabase';
import type { PortfolioItem as DBPortfolioItem } from '../lib/supabase';

type PortfolioItem = { id: string | number; src: string; thumb: string; category: string; title: string };

const STATIC_CATEGORIES = ['Bodas', 'Bautizos', 'Comuniones', 'Moda & Book', 'Premamá', 'Gastronomía', 'Inmuebles', 'Niños', 'Establecimientos'];
const ADMIN_CATEGORIES = ['Retratos', 'Paisajes', 'Eventos', 'Otros'];
const INITIAL_COUNT = 8;

function useAnimateOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.05 }
    );
    const el = ref.current;
    if (el) el.querySelectorAll('.animate-on-scroll').forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [dbItems, setDbItems] = useState<PortfolioItem[]>([]);
  const ref = useAnimateOnScroll();

  useEffect(() => {
    supabase
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) {
          setDbItems(
            (data as DBPortfolioItem[]).map((d) => ({
              id: d.id,
              src: d.image_url,
              thumb: d.image_url,
              category: d.category,
              title: d.title,
            }))
          );
        }
      });
  }, []);

  const allItems: PortfolioItem[] = [...dbItems, ...staticItems];

  const extraCategories = [...new Set(dbItems.map((d) => d.category))].filter(
    (c) => !STATIC_CATEGORIES.includes(c)
  );
  const categories = ['Todos', ...STATIC_CATEGORIES, ...ADMIN_CATEGORIES.filter((c) => extraCategories.includes(c))];

  const filtered = activeCategory === 'Todos'
    ? allItems
    : allItems.filter((p) => p.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);

  // Re-observe when items change
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.05 }
    );
    el.querySelectorAll('.animate-on-scroll:not(.visible)').forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [visible.length, activeCategory, ref]);

  return (
    <div ref={ref}>
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1045541/pexels-photo-1045541.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          }}
        />
        <div className="absolute inset-0 bg-dark/80" />
        <div className="relative z-10 container-custom text-center">
          <p className="section-label">Portfolio</p>
          <h1 className="section-title text-5xl md:text-6xl mb-4">
            Mi <span className="italic text-gold">Portfolio</span>
          </h1>
          <p className="font-serif-alt text-white/60 text-xl italic">
            Momentos que perduran para siempre
          </p>
          <div className="gold-divider" />
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-dark-800 border-b border-dark-400 sticky top-[60px] z-30">
        <div className="container-custom">
          <div className="flex items-center gap-1 overflow-x-auto py-4 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(INITIAL_COUNT);
                }}
                className={`px-5 py-2 text-xs font-medium tracking-widest uppercase whitespace-nowrap transition-all duration-300 shrink-0 ${
                  activeCategory === cat
                    ? 'bg-gold text-dark'
                    : 'text-white/60 hover:text-white hover:bg-dark-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          {visible.length === 0 ? (
            <div className="text-center py-20 text-white/40">
              No hay imágenes en esta categoría.
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {visible.map((item, i) => (
                <div
                  key={`${activeCategory}-${item.id}`}
                  className="animate-on-scroll break-inside-avoid overflow-hidden"
                  style={{ transitionDelay: `${(i % 6) * 60}ms` }}
                >
                  <img
                    src={item.thumb}
                    alt={item.title}
                    className="w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="eager"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Load more */}
          {visibleCount < filtered.length && (
            <div className="text-center mt-14 animate-on-scroll">
              <button
                onClick={() => setVisibleCount((c) => c + 6)}
                className="btn-outline"
              >
                Cargar más fotos
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
