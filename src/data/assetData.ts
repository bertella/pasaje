export interface InvestmentMetric {
  id: string;
  value: string;
  label: string;
}

export interface BuildingCompositionSummary {
  id: 'planta-baja' | 'lofts' | 'terraza';
  tag: string;
  title: string;
  summary: string;
}

export type CarouselCategory = 'todas' | 'local' | 'lofts' | 'terraza';

export interface CarouselPhoto {
  id: string;
  src: string;
  category: Exclude<CarouselCategory, 'todas'>;
  sectorLabel: string;
  title: string;
  alt: string;
}

export const ASSET_IMAGES = {
  fachada: '/assets/aistudio/Gemini_Generated_Image_gnvlb3gnvlb3gnvl_f06a124e.jpg',
} as const;

export const ASSET_INFO = {
  developerName: 'GMAJ DESARROLLOS',
  address: 'Bv. San Juan al 600',
  district: 'Centro de Córdoba · Zona Tribunales',
  priceUsd: 'USD 307.000',
  monthlyIncome: '+$3.000.000',
  coveredArea: '360 m²',
  terraceArea: '120 m²',
  age: '6 años',
  orientation: 'Noroeste',
  deed: 'Escritura',
  utilities: 'Todos los servicios',
  expenses: '$60.000',
} as const;

export const INVESTMENT_METRICS: InvestmentMetric[] = [
  {
    id: 'acquisition-value',
    value: 'USD 307.000',
    label: 'Edificio completo (sin subdivisión)',
  },
  {
    id: 'current-income',
    value: '+$3.000.000 / mes',
    label: 'Renta actual en funcionamiento',
  },
  {
    id: 'covered-surface',
    value: '360 m² cubiertos',
    label: 'Local en PB + 4 lofts',
  },
  {
    id: 'private-terrace',
    value: '120 m² propios',
    label: 'Terraza con quincho equipado',
  },
];

export const GENERAL_SPECS: Array<{label: string; value: string}> = [
  {label: 'Antigüedad', value: '6 años'},
  {label: 'Orientación', value: 'Noroeste'},
  {label: 'Dominio', value: 'Escritura'},
  {label: 'Servicios', value: 'Completos'},
  {label: 'Expensas', value: '$60.000'},
];

export const BUILDING_COMPOSITION: BuildingCompositionSummary[] = [
  {
    id: 'planta-baja',
    tag: 'Planta Baja · ~100 m²',
    title: 'Local comercial alquilado',
    summary:
      'Dos baños y dos cocinas. Actualmente en locación a estudio de abogados.',
  },
  {
    id: 'lofts',
    tag: 'Pisos Superiores · 4 unidades',
    title: 'Cuatro lofts de ~55 m² c/u',
    summary:
      'Luminosos y funcionales. Renta residencial tradicional y 3° nivel activo en Airbnb.',
  },
  {
    id: 'terraza',
    tag: 'Remate · 120 m²',
    title: 'Terraza propia y quincho',
    summary:
      'Quincho equipado, baño completo y espacio social exclusivo del edificio.',
  },
];

export const PROPERTY_CAROUSEL_PHOTOS: CarouselPhoto[] = [
  {
    id: 'local-sala-seis',
    src: '/assets/aistudio/Gemini_Generated_Image_lgtmculgtmculgtm_e5f4d3e2.jpg',
    category: 'local',
    sectorLabel: 'Local Comercial · PB',
    title: 'Planta baja — Sector profesional equipado',
    alt: 'Interior del local comercial en planta baja con recepción y escritorio',
  },
  {
    id: 'local-sala-cinco',
    src: '/assets/aistudio/Gemini_Generated_Image_a5sd5ha5sd5ha5sd_4ab21f8f.jpg',
    category: 'local',
    sectorLabel: 'Local Comercial · PB',
    title: 'Planta baja — Oficina y circulación interior',
    alt: 'Oficina privada dentro del local comercial en planta baja',
  },
  {
    id: 'terraza-quincho',
    src: '/assets/aistudio/Gemini_Generated_Image_33vxs233vxs233vx_d9cfa9e6.jpg',
    category: 'terraza',
    sectorLabel: 'Terraza · 120 m²',
    title: 'Terraza propia con quincho techado y parrilla',
    alt: 'Terraza propia de 120 m² con quincho cubierto en madera y asador',
  },
  {
    id: 'loft-living-cortinas',
    src: '/assets/aistudio/2073984966_9bfa5115.webp',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Estar luminoso con ventanal y salida al balcón',
    alt: 'Living de unidad loft con sillón, TV y ventanales con cortinas',
  },
  {
    id: 'loft-vista-amplia-1',
    src: '/assets/aistudio/2073984969_e26f4eee.webp',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Planta abierta integrada — Estar, comedor y descanso',
    alt: 'Vista general de loft con estar, mesa comedor y sector de dormitorio',
  },
  {
    id: 'loft-cocina-1',
    src: '/assets/aistudio/2073984971_bb9b7bce.webp',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Cocina equipada con mesada de granito y horno',
    alt: 'Cocina de loft con mesada de granito, bacha inoxidable y estantería',
  },
  {
    id: 'loft-vista-amplia-2',
    src: '/assets/aistudio/2073984976_184640c7.webp',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Sector estar y comedor diario para renta temporaria',
    alt: 'Vista del living hacia el comedor y camas de la unidad',
  },
  {
    id: 'loft-dormitorio-1',
    src: '/assets/aistudio/2073984983_2e003038.webp',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Sector dormitorio con placard corredizo y luminarias',
    alt: 'Cama matrimonial y placard con puertas corredizas en el loft',
  },
  {
    id: 'loft-cocina-2',
    src: '/assets/aistudio/2073985006_8bfb466d.webp',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Kitchenette completa con iluminación natural',
    alt: 'Vista frontal de la cocina del loft con ventana y equipamiento',
  },
  {
    id: 'loft-ingreso-balcon',
    src: '/assets/aistudio/2073985027_e04d07ce.webp',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Ingreso por puerta de madera y conexión al balcón',
    alt: 'Acceso al loft con puerta de madera lustrada y ventanal al balcón',
  },
  {
    id: 'loft-perspectiva-fondo',
    src: '/assets/aistudio/2073985052_669668fe.webp',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Perspectiva completa de la unidad hacia cocina',
    alt: 'Vista amplia desde el dormitorio hacia el comedor y cocina',
  },
  {
    id: 'loft-comedor-wa0149',
    src: '/assets/aistudio/IMG-20260114-WA0149_84c8d280.jpg',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Comedor equipado con mesa y cuatro sillas',
    alt: 'Mesa comedor con sillas negras y sillón frente al televisor',
  },
  {
    id: 'loft-cocina-anafe-wa0150',
    src: '/assets/aistudio/IMG-20260114-WA0150_dd5116e9.jpg',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Anafe vitrocerámico, horno eléctrico y vajilla',
    alt: 'Detalle de cocina equipada con anafe vitrocerámico y horno eléctrico',
  },
  {
    id: 'loft-living-wa0151',
    src: '/assets/aistudio/IMG-20260114-WA0151_d6e42e1a.jpg',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Área de estar amoblada con riel de iluminación',
    alt: 'Sillón principal con mesa ratona, TV y puerta de madera',
  },
  {
    id: 'loft-bano-wa0152',
    src: '/assets/aistudio/IMG-20260114-WA0152_d625bd03.jpg',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Baño completo revestido en porcelanato marmolado',
    alt: 'Baño moderno con espejo circular, vanitory y bacha de apoyo',
  },
  {
    id: 'loft-dormitorio-wa0153',
    src: '/assets/aistudio/IMG-20260114-WA0153_ad7d61b4.jpg',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Dormitorio luminoso con placard piso a techo',
    alt: 'Cama doble con lámparas colgantes cálidas y ventana lateral',
  },
  {
    id: 'loft-dormitorio-wa0154',
    src: '/assets/aistudio/IMG-20260114-WA0154_c9254b07.jpg',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Segunda vista de dormitorio y placard integrado',
    alt: 'Cama matrimonial vestida en tonos neutros junto al placard',
  },
  {
    id: 'loft-cortinas-wa0155',
    src: '/assets/aistudio/IMG-20260114-WA0155_15065356.jpg',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Estar con luz natural sobre carpintería de aluminio',
    alt: 'Living de loft junto al ventanal con cortinas translúcidas',
  },
  {
    id: 'loft-pasillo-cocina-wa0156',
    src: '/assets/aistudio/IMG-20260114-WA0156_2a52e97b.jpg',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Circulación hacia cocina y sector heladera',
    alt: 'Acceso a cocina equipada con heladera y estantería vertical',
  },
  {
    id: 'loft-bano-ducha-wa0157',
    src: '/assets/aistudio/IMG-20260114-WA0157_a12d08ff.jpg',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Sector ducha con grifería cromada y bacha',
    alt: 'Baño completo con sector de ducha y revestimiento marmolado',
  },
  {
    id: 'loft-ventanal-balcon-wa0158',
    src: '/assets/aistudio/IMG-20260114-WA0158_513c02aa.jpg',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Carpintería negra y salida directa al balcón',
    alt: 'Puerta balcón vidriada con cortinas de gasa natural',
  },
  {
    id: 'loft-mesada-wa0159',
    src: '/assets/aistudio/IMG-20260114-WA0159_6bfd2ba5.jpg',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Detalle de mesada, anafe eléctrico y bacha',
    alt: 'Mesada de granito gris con bacha de acero y anafe de dos hornallas',
  },
  {
    id: 'loft-balcon-vista-wa0160',
    src: '/assets/aistudio/IMG-20260114-WA0160_16c203dc.jpg',
    category: 'lofts',
    sectorLabel: 'Unidades Loft',
    title: 'Balcón con cielorraso de madera y vista al bulevar',
    alt: 'Balcón del edificio con cielorraso en madera lustrada y vista urbana',
  },
];

export const LANDMARK_QUERIES = [
  {
    id: 'caneda',
    label: 'La Cañada de Córdoba',
    blocks: '2 cuadras',
    walkTime: '2 min a pie',
  },
  {
    id: 'tribunales',
    label: 'Palacio de Justicia · Tribunales I',
    blocks: '4 cuadras',
    walkTime: '5 min a pie',
  },
  {
    id: 'sobremonte',
    label: 'Paseo Sobremonte',
    blocks: '5 cuadras',
    walkTime: '6 min a pie',
  },
  {
    id: 'patio-olmos',
    label: 'Patio Olmos / Av. Vélez Sarsfield',
    blocks: '6 cuadras',
    walkTime: '8 min a pie',
  },
];

export function getWhatsAppUrl(customMessage?: string): string {
  const rawPhone = import.meta.env.VITE_WHATSAPP_NUMBER || '5493512042270';
  const phone = rawPhone.replace(/\D/g, '') || '5493512042270';
  const message =
    customMessage ||
    'Hola GMAJ DESARROLLOS, quiero solicitar información sobre la financiación disponible para el edificio completo en Bv. San Juan al 600 (USD 307.000).';
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
