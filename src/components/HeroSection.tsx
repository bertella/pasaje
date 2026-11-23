import {useState} from 'react';
import {ArrowRight} from 'lucide-react';
import {ASSET_IMAGES, ASSET_INFO} from '../data/assetData';
import {trackEvent} from '../utils/analytics';

interface HeroSectionProps {
  onRequestFinancing: () => void;
}

export function HeroSection({onRequestFinancing}: HeroSectionProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section
      id="presentacion"
      className="relative flex min-h-[88svh] lg:min-h-[90vh] items-end overflow-hidden bg-[#121417] text-white"
    >
      {!imageFailed ? (
        <>
          <img
            src={ASSET_IMAGES.fachada}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-40 blur-2xl"
          />

          <div className="pointer-events-none absolute inset-x-0 top-14 bottom-10 flex items-start justify-center lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[58%] lg:items-end lg:justify-end lg:pt-16 lg:bottom-0">
            <img
              src={ASSET_IMAGES.fachada}
              alt="Fotografía real de la fachada del edificio en Bv. San Juan al 600, Córdoba"
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
              className="h-full w-auto max-w-full object-contain object-top lg:object-right-bottom"
            />
          </div>
        </>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#1C2026] via-[#121417] to-[#262320]"
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C0E11] via-[#0C0E11]/88 via-50% to-[#0C0E11]/25 lg:bg-gradient-to-r lg:from-[#0C0E11] lg:via-[#0C0E11]/84 lg:to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0C0E11]/85 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0C0E11] to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-6 pt-36 pb-10 sm:pb-14 lg:px-12 lg:pt-36 lg:pb-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#E28A6B]">
            Centro de Córdoba · Zona Tribunales · {ASSET_INFO.address}
          </p>

          <h1
            className="mt-3 font-display font-bold tracking-tight text-white leading-[1.03]"
            style={{
              fontSize: 'clamp(2.25rem, 4.3vw, 3.85rem)',
              textWrap: 'balance',
            }}
          >
            Un activo inmobiliario. Múltiples fuentes de renta.
          </h1>

          <div className="mt-5 max-w-xl border-l-[3px] border-[#C2451F] pl-4 sm:pl-5">
            <p className="font-display text-lg font-semibold leading-snug text-white sm:text-xl lg:text-[1.35rem]">
              Edificio completo en venta en bloque con financiación directa.
            </p>
            <p className="mt-1.5 text-base font-medium leading-snug text-[#ECEFF4] sm:text-lg">
              Local comercial, 4 lofts y terraza propia operando desde el primer día.
            </p>
          </div>

          <div className="mt-6 grid max-w-xl grid-cols-1 divide-y divide-white/15 overflow-hidden rounded-xl border border-white/25 bg-[#121417]/85 backdrop-blur-md sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
            <div className="px-5 py-3.5">
              <span className="block text-[11px] font-semibold tracking-[0.16em] uppercase text-[#B8BCC4]">
                Valor del edificio completo
              </span>
              <strong className="mt-1 block font-mono text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-[1.75rem]">
                {ASSET_INFO.priceUsd}
              </strong>
            </div>

            <div className="px-5 py-3.5">
              <span className="block text-[11px] font-semibold tracking-[0.16em] uppercase text-[#F09A7C]">
                Renta actual en operación
              </span>
              <strong className="mt-1 flex items-baseline gap-1.5 font-mono text-2xl font-semibold tracking-tight text-[#F09A7C] tabular-nums sm:text-[1.75rem]">
                <span>{ASSET_INFO.monthlyIncome}</span>
                <span className="text-sm font-medium text-white/80">/ mes</span>
              </strong>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => {
                trackEvent('hero_consultar_financiacion');
                onRequestFinancing();
              }}
              className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#C2451F] px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#A93917] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2451F]"
            >
              <span>Consultar financiación</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
