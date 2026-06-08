import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    'Hola Gabriel! Me gustaría obtener más información sobre tus servicios fotográficos.'
  );
  const whatsappUrl = `https://wa.me/34600000000?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-[#20BD5C] transition-all duration-300 group animate-float"
    >
      <MessageCircle size={26} className="text-white fill-white" />
      <span className="absolute right-16 bg-dark-700 text-white text-xs font-medium px-3 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-dark-400">
        Escríbeme por WhatsApp
      </span>
    </a>
  );
}
