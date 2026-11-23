import {useEffect, useState} from 'react';
import {Menu, MessageSquare, X} from 'lucide-react';
import {getWhatsAppUrl} from '../data/assetData';
import {trackEvent} from '../utils/analytics';
import {BrandLogo} from './BrandLogo';

const NAV_LINKS = [
  {href: '#galeria-propiedad', label: 'Galería'},
  {href: '#activo', label: 'El Activo'},
  {href: '#ubicacion', label: 'Ubicación'},
  {href: '#financiacion', label: 'Financiación'},
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${
        scrolled || mobileOpen
          ? 'border-b border-white/10 bg-[#121417]/95 backdrop-blur-md'
          : 'bg-gradient-to-b from-[#0C0E11]/85 via-[#0C0E11]/45 to-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-8 px-6 py-3.5 lg:px-12">
        <a
          href="#presentacion"
          aria-label="GMAJ DESARROLLOS — Inicio"
          className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2451F]"
        >
          <BrandLogo />
        </a>

        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-white border-b border-transparent hover:border-[#C2451F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2451F]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', {origen: 'navbar'})}
            className="hidden sm:inline-flex items-center justify-center gap-2 rounded-lg bg-[#C2451F] px-4 py-2.5 text-xs font-semibold tracking-wide text-white transition-colors duration-150 hover:bg-[#A93917] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2451F]"
          >
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Consultar por WhatsApp</span>
          </a>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-white md:hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2451F]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#121417] px-6 py-5 md:hidden">
          <nav aria-label="Menú móvil" className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-base font-medium text-white/90 border-b border-white/10 last:border-b-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setMobileOpen(false);
                trackEvent('whatsapp_click', {origen: 'navbar_mobile'});
              }}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#C2451F] px-5 py-3 text-sm font-semibold text-white"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              <span>Consultar por WhatsApp</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
