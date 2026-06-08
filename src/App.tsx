import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Shop from './pages/Shop';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-mi" element={<About />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/tienda" element={<Shop />} />
          <Route path="/testimonios" element={<Testimonials />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </>
  );
}
