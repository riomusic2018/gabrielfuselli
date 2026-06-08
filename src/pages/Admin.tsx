import { useState, useEffect, useRef } from 'react';
import { supabase, type PortfolioItem, type TiendaProduct } from '../lib/supabase';
import { LogOut, Upload, Trash2, Loader2, AlertCircle, ImageOff, Package, LayoutGrid } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';

const PORTFOLIO_CATEGORIES = ['Bodas', 'Retratos', 'Paisajes', 'Eventos', 'Otros'];

// ─── Auth Guard ────────────────────────────────────────────────────────────────

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError('Credenciales incorrectas. Verifica tu email y contraseña.');
    } else {
      onLogin();
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <img
            src="/logo_gabriel_sin_fondo copy.png"
            alt="Gabriel Fuselli"
            className="h-20 w-auto mx-auto mb-6 brightness-0 invert opacity-90"
          />
          <p className="text-white/40 text-xs tracking-ultra uppercase">Panel de administración</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/50 text-xs tracking-widest uppercase mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-dark-700 border border-dark-400 focus:border-gold/60 text-white px-4 py-3 text-sm outline-none transition-colors duration-200 placeholder-white/20"
              placeholder="admin@ejemplo.com"
            />
          </div>
          <div>
            <label className="block text-white/50 text-xs tracking-widest uppercase mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-dark-700 border border-dark-400 focus:border-gold/60 text-white px-4 py-3 text-sm outline-none transition-colors duration-200 placeholder-white/20"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-4 py-3">
              <AlertCircle size={15} className="shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-dark font-sans font-semibold text-xs tracking-widest uppercase py-3.5 hover:bg-gold-light transition-colors duration-300 disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            {loading ? 'Entrando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Portfolio Tab ─────────────────────────────────────────────────────────────

function PortfolioTab() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(PORTFOLIO_CATEGORIES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  async function fetchItems() {
    const { data, error: err } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false });
    if (err) setError(err.message);
    else setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchItems(); }, []);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setError('');
    setUploading(true);

    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: upErr } = await supabase.storage
      .from('portfolio')
      .upload(path, file, { cacheControl: '3600', upsert: false });

    if (upErr) { setError(upErr.message); setUploading(false); return; }

    const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(path);

    const { error: dbErr } = await supabase.from('portfolio_items').insert({
      title,
      category,
      image_path: path,
      image_url: urlData.publicUrl,
    });

    if (dbErr) { setError(dbErr.message); setUploading(false); return; }

    setTitle('');
    setCategory(PORTFOLIO_CATEGORIES[0]);
    setFile(null);
    setPreview('');
    if (fileRef.current) fileRef.current.value = '';
    setUploading(false);
    fetchItems();
  }

  async function handleDelete(item: PortfolioItem) {
    if (!confirm(`¿Eliminar "${item.title}"?`)) return;
    await supabase.storage.from('portfolio').remove([item.image_path]);
    await supabase.from('portfolio_items').delete().eq('id', item.id);
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }

  return (
    <div className="space-y-8">
      {/* Upload Form */}
      <div className="bg-dark-700 border border-dark-400 p-6">
        <h2 className="font-serif text-xl text-white mb-6 flex items-center gap-2">
          <Upload size={18} className="text-gold" />
          Subir nueva foto
        </h2>
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/50 text-xs tracking-widest uppercase mb-2">Título</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-dark border border-dark-400 focus:border-gold/60 text-white px-4 py-2.5 text-sm outline-none transition-colors"
              placeholder="Nombre de la foto"
            />
          </div>
          <div>
            <label className="block text-white/50 text-xs tracking-widest uppercase mb-2">Categoría</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-dark border border-dark-400 focus:border-gold/60 text-white px-4 py-2.5 text-sm outline-none transition-colors"
            >
              {PORTFOLIO_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-white/50 text-xs tracking-widest uppercase mb-2">Foto</label>
            <div
              className="border border-dashed border-dark-400 hover:border-gold/40 transition-colors cursor-pointer p-6 text-center"
              onClick={() => fileRef.current?.click()}
            >
              {preview ? (
                <img src={preview} alt="preview" className="max-h-48 mx-auto object-contain" />
              ) : (
                <div className="text-white/30 text-sm">
                  <Upload size={24} className="mx-auto mb-2 opacity-50" />
                  Haz clic para seleccionar una imagen
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
          </div>
          {error && (
            <div className="md:col-span-2 flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-4 py-3">
              <AlertCircle size={14} />
              {error}
            </div>
          )}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={uploading || !file}
              className="bg-gold text-dark font-sans font-semibold text-xs tracking-widest uppercase px-8 py-3 hover:bg-gold-light transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {uploading && <Loader2 size={13} className="animate-spin" />}
              {uploading ? 'Subiendo...' : 'Subir foto'}
            </button>
          </div>
        </form>
      </div>

      {/* Gallery Grid */}
      <div>
        <h2 className="font-serif text-xl text-white mb-4 flex items-center gap-2">
          <LayoutGrid size={18} className="text-gold" />
          Fotos actuales
          <span className="text-white/30 text-sm font-sans font-normal ml-2">({items.length})</span>
        </h2>
        {loading ? (
          <div className="flex items-center justify-center py-16 text-white/30">
            <Loader2 size={24} className="animate-spin mr-3" />
            Cargando...
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-white/30 border border-dashed border-dark-400">
            <ImageOff size={32} className="mx-auto mb-3 opacity-40" />
            No hay fotos en el portfolio aún
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {items.map((item) => (
              <div key={item.id} className="relative group overflow-hidden bg-dark-700">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-dark/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-2">
                  <p className="text-white text-xs text-center font-medium leading-tight">{item.title}</p>
                  <span className="text-gold text-[10px] tracking-widest uppercase">{item.category}</span>
                  <button
                    onClick={() => handleDelete(item)}
                    className="mt-1 flex items-center gap-1.5 bg-red-500/80 hover:bg-red-500 text-white text-xs px-3 py-1.5 transition-colors"
                  >
                    <Trash2 size={11} />
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tienda Tab ────────────────────────────────────────────────────────────────

function TiendaTab() {
  const [products, setProducts] = useState<TiendaProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  async function fetchProducts() {
    const { data, error: err } = await supabase
      .from('tienda_products')
      .select('*')
      .order('created_at', { ascending: false });
    if (err) setError(err.message);
    else setProducts(data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchProducts(); }, []);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setError('');
    setUploading(true);

    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: upErr } = await supabase.storage
      .from('tienda')
      .upload(path, file, { cacheControl: '3600', upsert: false });

    if (upErr) { setError(upErr.message); setUploading(false); return; }

    const { data: urlData } = supabase.storage.from('tienda').getPublicUrl(path);

    const { error: dbErr } = await supabase.from('tienda_products').insert({
      title,
      description,
      price: parseFloat(price),
      image_path: path,
      image_url: urlData.publicUrl,
    });

    if (dbErr) { setError(dbErr.message); setUploading(false); return; }

    setTitle('');
    setDescription('');
    setPrice('');
    setFile(null);
    setPreview('');
    if (fileRef.current) fileRef.current.value = '';
    setUploading(false);
    fetchProducts();
  }

  async function handleDelete(product: TiendaProduct) {
    if (!confirm(`¿Eliminar "${product.title}"?`)) return;
    await supabase.storage.from('tienda').remove([product.image_path]);
    await supabase.from('tienda_products').delete().eq('id', product.id);
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  }

  return (
    <div className="space-y-8">
      {/* Upload Form */}
      <div className="bg-dark-700 border border-dark-400 p-6">
        <h2 className="font-serif text-xl text-white mb-6 flex items-center gap-2">
          <Upload size={18} className="text-gold" />
          Añadir producto
        </h2>
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/50 text-xs tracking-widest uppercase mb-2">Título</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-dark border border-dark-400 focus:border-gold/60 text-white px-4 py-2.5 text-sm outline-none transition-colors"
              placeholder="Nombre del producto"
            />
          </div>
          <div>
            <label className="block text-white/50 text-xs tracking-widest uppercase mb-2">Precio (€)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full bg-dark border border-dark-400 focus:border-gold/60 text-white px-4 py-2.5 text-sm outline-none transition-colors"
              placeholder="0.00"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-white/50 text-xs tracking-widest uppercase mb-2">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              className="w-full bg-dark border border-dark-400 focus:border-gold/60 text-white px-4 py-2.5 text-sm outline-none transition-colors resize-none"
              placeholder="Describe el producto..."
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-white/50 text-xs tracking-widest uppercase mb-2">Foto del producto</label>
            <div
              className="border border-dashed border-dark-400 hover:border-gold/40 transition-colors cursor-pointer p-6 text-center"
              onClick={() => fileRef.current?.click()}
            >
              {preview ? (
                <img src={preview} alt="preview" className="max-h-48 mx-auto object-contain" />
              ) : (
                <div className="text-white/30 text-sm">
                  <Upload size={24} className="mx-auto mb-2 opacity-50" />
                  Haz clic para seleccionar una imagen
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
          </div>
          {error && (
            <div className="md:col-span-2 flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-4 py-3">
              <AlertCircle size={14} />
              {error}
            </div>
          )}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={uploading || !file}
              className="bg-gold text-dark font-sans font-semibold text-xs tracking-widest uppercase px-8 py-3 hover:bg-gold-light transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {uploading && <Loader2 size={13} className="animate-spin" />}
              {uploading ? 'Subiendo...' : 'Añadir producto'}
            </button>
          </div>
        </form>
      </div>

      {/* Products Grid */}
      <div>
        <h2 className="font-serif text-xl text-white mb-4 flex items-center gap-2">
          <Package size={18} className="text-gold" />
          Productos actuales
          <span className="text-white/30 text-sm font-sans font-normal ml-2">({products.length})</span>
        </h2>
        {loading ? (
          <div className="flex items-center justify-center py-16 text-white/30">
            <Loader2 size={24} className="animate-spin mr-3" />
            Cargando...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-white/30 border border-dashed border-dark-400">
            <Package size={32} className="mx-auto mb-3 opacity-40" />
            No hay productos en la tienda aún
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-dark-700 border border-dark-400 overflow-hidden group">
                <div className="relative overflow-hidden" style={{ height: '200px' }}>
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-white text-base mb-1 leading-snug">{product.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gold font-serif text-lg font-medium">{product.price}€</span>
                    <button
                      onClick={() => handleDelete(product)}
                      className="flex items-center gap-1.5 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white text-xs px-3 py-1.5 border border-red-500/30 hover:border-red-500 transition-all duration-200"
                    >
                      <Trash2 size={11} />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Dashboard ─────────────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<'portfolio' | 'tienda'>('portfolio');

  async function handleLogout() {
    await supabase.auth.signOut();
    onLogout();
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Top bar */}
      <header className="bg-dark-800 border-b border-dark-400 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <img
            src="/logo_gabriel_sin_fondo copy.png"
            alt="Gabriel Fuselli"
            className="h-8 w-auto brightness-0 invert opacity-80"
          />
          <span className="text-white/30 text-xs tracking-ultra uppercase hidden sm:block">
            Panel de administración
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors"
        >
          <LogOut size={14} />
          Salir
        </button>
      </header>

      {/* Tab bar */}
      <div className="bg-dark-800 border-b border-dark-400">
        <div className="max-w-6xl mx-auto px-6 flex gap-1 pt-3">
          {([
            { id: 'portfolio', label: 'Portfolio', Icon: LayoutGrid },
            { id: 'tienda', label: 'Tienda', Icon: Package },
          ] as const).map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-medium tracking-widest uppercase border-b-2 transition-all duration-200 ${
                tab === id
                  ? 'border-gold text-gold'
                  : 'border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {tab === 'portfolio' ? <PortfolioTab /> : <TiendaTab />}
      </main>
    </div>
  );
}

// ─── Root Admin Page ───────────────────────────────────────────────────────────

export default function Admin() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-gold" />
      </div>
    );
  }

  if (!session) {
    return <LoginPage onLogin={() => {}} />;
  }

  return <Dashboard onLogout={() => {}} />;
}
