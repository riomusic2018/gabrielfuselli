import { Heart, Users, Briefcase, Home as HomeIcon, User, PartyPopper, Baby, Package } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

export interface PortfolioItem {
  id: number;
  src: string;
  thumb: string;
  category: string;
  title: string;
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  date: string;
  avatar?: string;
}

export const services: Service[] = [
  {
    id: 'bodas',
    icon: Heart,
    title: 'Bodas & Compromisos',
    description:
      'Captura cada momento de tu día más especial con sensibilidad artística y ojo técnico. Desde el primer beso hasta el último baile, inmortalizamos tu historia de amor.',
    features: ['Cobertura completa del día', 'Sesión preboda incluida', 'Entrega en alta resolución', 'Álbum personalizado'],
  },
  {
    id: 'eventos',
    icon: PartyPopper,
    title: 'Eventos & Fiestas',
    description:
      'Cumpleaños, bautizos, comuniones, aniversarios... Cada celebración merece ser recordada. Documentamos la alegría y la emoción de tus momentos más entrañables.',
    features: ['Cobertura de 2 a 8 horas', 'Fotografía + Video opcional', 'Edición profesional', 'Galería online privada'],
  },
  {
    id: 'familias',
    icon: Users,
    title: 'Familias & Grupos',
    description:
      'Sesiones en el estudio o en exteriores para inmortalizar los lazos familiares. Trabajamos con naturalidad para que todos se sientan cómodos y el resultado sea auténtico.',
    features: ['Sesión de 1-2 horas', 'Múltiples looks', 'Hasta 10 personas', 'Fotos digitales incluidas'],
  },
  {
    id: 'corporativo',
    icon: Briefcase,
    title: 'Fotografía Corporativa',
    description:
      'Imagen profesional para tu empresa, headshots ejecutivos, reportajes de equipo y fotografía de instalaciones. Proyecta confianza y credibilidad con imágenes de calidad.',
    features: ['Retratos corporativos', 'Fotografía de instalaciones', 'Eventos de empresa', 'Entrega rápida'],
  },
  {
    id: 'inmuebles',
    icon: HomeIcon,
    title: 'Fotografía de Bienes Inmuebles',
    description:
      'Presentación fotográfica de alta calidad para propiedades residenciales y comerciales. Maximiza el atractivo de tus inmuebles con imágenes que destacan cada espacio.',
    features: ['Interior y exterior', 'Luz natural optimizada', 'Gran angular profesional', 'Retoque incluido'],
  },
  {
    id: 'retratos',
    icon: User,
    title: 'Retratos Individuales',
    description:
      'Sesiones personalizadas para capturar tu esencia. Perfil de LinkedIn, redes sociales, proyectos artísticos o simplemente un recuerdo especial para ti.',
    features: ['Sesión de 1 hora', 'Asesoría de imagen', 'Múltiples ambientes', '10 fotos editadas'],
  },
  {
    id: 'maternidad',
    icon: Baby,
    title: 'Maternidad & Recién Nacidos',
    description:
      'Los momentos más tiernos de la vida merecen ser eternos. Sesiones delicadas y emotivas para embarazadas y bebés recién nacidos en un ambiente cálido y seguro.',
    features: ['Sesión prenatal y postnatal', 'Ambiente adaptado al bebé', 'Accesorios incluidos', 'Galería familiar'],
  },
  {
    id: 'producto',
    icon: Package,
    title: 'Fotografía de Producto',
    description:
      'Imágenes impactantes para e-commerce, catálogos y publicidad. Destacamos las cualidades de tus productos con iluminación y composición de alta gama.',
    features: ['Fondo blanco o creativo', 'Retoque avanzado', 'Múltiples ángulos', 'Adaptado a plataformas'],
  },
];

const BASE = 'https://www.gabrielfuselli.com/s/cc_images/';

function item(id: number, file: string, category: string, title: string): PortfolioItem {
  const src = BASE + file;
  return { id, src, thumb: src, category, title };
}

export const portfolioItems: PortfolioItem[] = [
  // BODAS
  item(1,  'cache_84470990.jpg',  'Bodas', 'Boda'),
  item(2,  'cache_83977436.jpg',  'Bodas', 'Boda'),
  item(3,  'cache_83977432.jpg',  'Bodas', 'Boda'),
  item(4,  'cache_82901831.jpg',  'Bodas', 'Boda'),
  item(5,  'cache_82901824.jpg',  'Bodas', 'Boda'),
  item(6,  'cache_82901823.jpg',  'Bodas', 'Boda'),
  item(7,  'cache_82901820.jpg',  'Bodas', 'Boda'),
  item(8,  'cache_82901821.jpg',  'Bodas', 'Boda'),
  item(9,  'cache_82901818.jpg',  'Bodas', 'Boda'),
  item(10, 'cache_82901808.jpg',  'Bodas', 'Boda'),
  item(11, 'cache_78840667.jpg',  'Bodas', 'Boda'),
  item(12, 'cache_78840680.jpg',  'Bodas', 'Boda'),
  item(13, 'cache_75958026.jpg',  'Bodas', 'Boda'),
  item(14, 'cache_75958011.jpg',  'Bodas', 'Boda'),
  item(15, 'cache_86118169.jpg',  'Bodas', 'Boda'),
  item(16, 'cache_75958015.jpg',  'Bodas', 'Boda'),
  item(17, 'cache_75957982.jpg',  'Bodas', 'Boda'),
  item(18, 'cache_75957979.jpg',  'Bodas', 'Boda'),
  // BAUTIZOS
  item(19, 'cache_86320302.jpg',  'Bautizos', 'Bautizo'),
  item(20, 'cache_86320297.jpg',  'Bautizos', 'Bautizo'),
  item(21, 'cache_85693762.jpeg', 'Bautizos', 'Bautizo'),
  item(22, 'cache_83788217.jpg',  'Bautizos', 'Bautizo'),
  item(23, 'cache_83106852.jpg',  'Bautizos', 'Bautizo'),
  item(24, 'cache_83105127.jpg',  'Bautizos', 'Bautizo'),
  item(25, 'cache_83105124.jpg',  'Bautizos', 'Bautizo'),
  item(26, 'cache_82189518.jpg',  'Bautizos', 'Bautizo'),
  item(27, 'cache_86320301.jpg',  'Bautizos', 'Bautizo'),
  item(28, 'cache_86320298.jpg',  'Bautizos', 'Bautizo'),
  item(29, 'cache_85693764.jpeg', 'Bautizos', 'Bautizo'),
  item(30, 'cache_83788220.jpg',  'Bautizos', 'Bautizo'),
  // COMUNIONES
  item(31, 'cache_78688636.jpg',  'Comuniones', 'Comunión'),
  item(32, 'cache_75957913.jpg',  'Comuniones', 'Comunión'),
  item(33, 'cache_75957911.jpg',  'Comuniones', 'Comunión'),
  item(34, 'cache_75957902.jpg',  'Comuniones', 'Comunión'),
  item(35, 'cache_75957897.jpg',  'Comuniones', 'Comunión'),
  item(36, 'cache_75957894.jpg',  'Comuniones', 'Comunión'),
  item(37, 'cache_82709623.jpg',  'Comuniones', 'Comunión'),
  item(38, 'cache_78688635.jpg',  'Comuniones', 'Comunión'),
  item(39, 'cache_75957923.jpg',  'Comuniones', 'Comunión'),
  item(40, 'cache_75957910.jpg',  'Comuniones', 'Comunión'),
  item(41, 'cache_75957903.jpg',  'Comuniones', 'Comunión'),
  item(42, 'cache_75957899.jpg',  'Comuniones', 'Comunión'),
  // MODA & BOOK
  item(43, 'cache_82698813.jpg',  'Moda & Book', 'Moda & Book'),
  item(44, 'cache_78690175.jpg',  'Moda & Book', 'Moda & Book'),
  item(45, 'cache_78690581.jpg',  'Moda & Book', 'Moda & Book'),
  item(46, 'cache_78690570.jpg',  'Moda & Book', 'Moda & Book'),
  item(47, 'cache_78690164.jpg',  'Moda & Book', 'Moda & Book'),
  item(48, 'cache_78690141.jpg',  'Moda & Book', 'Moda & Book'),
  item(49, 'cache_74227835.jpg',  'Moda & Book', 'Moda & Book'),
  item(50, 'cache_74227807.jpg',  'Moda & Book', 'Moda & Book'),
  item(51, 'cache_78690580.jpg',  'Moda & Book', 'Moda & Book'),
  item(52, 'cache_78690169.jpg',  'Moda & Book', 'Moda & Book'),
  item(53, 'cache_78690569.jpg',  'Moda & Book', 'Moda & Book'),
  item(54, 'cache_78690579.jpg',  'Moda & Book', 'Moda & Book'),
  // PREMAMÁ
  item(55, 'cache_78828842.jpg',  'Premamá', 'Premamá'),
  item(56, 'cache_75601619.jpg',  'Premamá', 'Premamá'),
  item(57, 'cache_75601620.jpg',  'Premamá', 'Premamá'),
  item(58, 'cache_75601477.jpg',  'Premamá', 'Premamá'),
  item(59, 'cache_74223372.jpg',  'Premamá', 'Premamá'),
  item(60, 'cache_78828849.jpg',  'Premamá', 'Premamá'),
  item(61, 'cache_75601571.jpg',  'Premamá', 'Premamá'),
  item(62, 'cache_75601569.jpg',  'Premamá', 'Premamá'),
  item(63, 'cache_75601494.jpg',  'Premamá', 'Premamá'),
  item(64, 'cache_78828853.jpg',  'Premamá', 'Premamá'),
  item(65, 'cache_75601510.jpg',  'Premamá', 'Premamá'),
  item(66, 'cache_75601637.jpg',  'Premamá', 'Premamá'),
  // GASTRONOMÍA
  item(67, 'cache_84609892.jpg',  'Gastronomía', 'Gastronomía'),
  item(68, 'cache_84609890.jpg',  'Gastronomía', 'Gastronomía'),
  item(69, 'cache_81531347.jpg',  'Gastronomía', 'Gastronomía'),
  item(70, 'cache_81531346.jpg',  'Gastronomía', 'Gastronomía'),
  item(71, 'cache_79318618.jpg',  'Gastronomía', 'Gastronomía'),
  item(72, 'cache_84609893.jpg',  'Gastronomía', 'Gastronomía'),
  item(73, 'cache_81531382.jpg',  'Gastronomía', 'Gastronomía'),
  item(74, 'cache_81531350.jpg',  'Gastronomía', 'Gastronomía'),
  item(75, 'cache_81531349.jpg',  'Gastronomía', 'Gastronomía'),
  item(76, 'cache_79321203.jpg',  'Gastronomía', 'Gastronomía'),
  item(77, 'cache_84609894.jpg',  'Gastronomía', 'Gastronomía'),
  item(78, 'cache_81531355.jpg',  'Gastronomía', 'Gastronomía'),
  // INMUEBLES
  item(79, 'cache_82830871.jpg',  'Inmuebles', 'Inmueble'),
  item(80, 'cache_82830853.jpg',  'Inmuebles', 'Inmueble'),
  item(81, 'cache_82830852.jpg',  'Inmuebles', 'Inmueble'),
  item(82, 'cache_82830846.jpg',  'Inmuebles', 'Inmueble'),
  item(83, 'cache_82830844.jpg',  'Inmuebles', 'Inmueble'),
  item(84, 'cache_82830843.jpg',  'Inmuebles', 'Inmueble'),
  item(85, 'cache_82830842.jpg',  'Inmuebles', 'Inmueble'),
  item(86, 'cache_82830841.jpg',  'Inmuebles', 'Inmueble'),
  item(87, 'cache_82830840.jpg',  'Inmuebles', 'Inmueble'),
  item(88, 'cache_82830838.jpg',  'Inmuebles', 'Inmueble'),
  item(89, 'cache_82830837.jpg',  'Inmuebles', 'Inmueble'),
  item(90, 'cache_82830868.jpg',  'Inmuebles', 'Inmueble'),
  // NIÑOS
  item(91, 'cache_82709711.jpg',  'Niños', 'Niños'),
  item(92, 'cache_82709708.jpg',  'Niños', 'Niños'),
  item(93, 'cache_82709705.jpg',  'Niños', 'Niños'),
  item(94, 'cache_82709712.jpg',  'Niños', 'Niños'),
  item(95, 'cache_82709709.jpg',  'Niños', 'Niños'),
  item(96, 'cache_82709706.jpg',  'Niños', 'Niños'),
  item(97, 'cache_82709713.jpg',  'Niños', 'Niños'),
  item(98, 'cache_82709710.jpg',  'Niños', 'Niños'),
  item(99, 'cache_82709707.jpg',  'Niños', 'Niños'),
  // ESTABLECIMIENTOS
  item(100, 'cache_75958456.jpg',  'Establecimientos', 'Establecimiento'),
  item(101, 'cache_75958080.jpg',  'Establecimientos', 'Establecimiento'),
  item(102, 'cache_74249058.png',  'Establecimientos', 'Establecimiento'),
  item(103, 'cache_74248897.png',  'Establecimientos', 'Establecimiento'),
  item(104, 'cache_74248905.png',  'Establecimientos', 'Establecimiento'),
  item(105, 'cache_74248844.jpg',  'Establecimientos', 'Establecimiento'),
  item(106, 'cache_75958396.jpg',  'Establecimientos', 'Establecimiento'),
  item(107, 'cache_74249069.png',  'Establecimientos', 'Establecimiento'),
  item(108, 'cache_75958460.jpg',  'Establecimientos', 'Establecimiento'),
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Francisco Javier Palomino',
    text: 'No tenemos palabras suficientes para agradecerte por las fotos tan increíbles de nuestra preboda en Fuerteventura. Capturaste cada emoción de manera perfecta. El resultado fue espectacular y nos dejó sin palabras. Sin duda el mejor fotógrafo de las Islas Canarias.',
    rating: 5,
    date: 'Octubre 2024',
  },
  {
    id: 2,
    name: 'Demelza De León',
    text: 'Un gran profesional. Conecta muy bien con los niños y hace maravillas. He realizado fotos de bautizo, cumpleaños y Navidad con Gabriel y siempre quedo encantada con el resultado. Muy recomendable. Los niños se sienten cómodos y las fotos salen naturales y preciosas.',
    rating: 5,
    date: 'Diciembre 2024',
  },
  {
    id: 3,
    name: 'Pilar Vega',
    text: 'Todo un gran profesional. Le hizo las fotos de Navidad a mi hija y quedaron preciosas!! Muy atento, creativo y con mucha paciencia con los más pequeños. El estudio es acogedor y el resultado final superó todas mis expectativas. ¡100% recomendado!',
    rating: 5,
    date: 'Enero 2025',
  },
  {
    id: 4,
    name: 'María González',
    text: 'Contratamos a Gabriel para nuestra boda y fue la mejor decisión que tomamos. Cada foto cuenta una historia, cada imagen tiene alma. Profesionalismo, creatividad y un trato humano excepcional. Las fotos de nuestra boda son simplemente perfectas.',
    rating: 5,
    date: 'Junio 2024',
  },
  {
    id: 5,
    name: 'Carlos Ramírez',
    text: 'Sesión corporativa para nuestra empresa. El resultado fue impresionante, las fotos de equipo y las instalaciones quedaron espectaculares. Muy profesional y con gran ojo para los detalles. Lo recomendamos a cualquier empresa que necesite imagen de calidad.',
    rating: 5,
    date: 'Marzo 2025',
  },
  {
    id: 6,
    name: 'Ana Martín',
    text: 'Sesión de maternidad absolutamente mágica. Gabriel consiguió capturar la emoción de ese momento tan especial de una manera que jamás olvidaré. Las fotos son una obra de arte. Muy recomendado para cualquier pareja que espere un bebé.',
    rating: 5,
    date: 'Febrero 2025',
  },
];
