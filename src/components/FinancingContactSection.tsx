import {useState} from 'react';
import {ArrowUpRight, MessageCircle} from 'lucide-react';
import {ASSET_INFO, getWhatsAppUrl} from '../data/assetData';
import {trackEvent} from '../utils/analytics';
import {BrandLogo} from './BrandLogo';

export type FinancingTopic =
  | 'Opciones de financiación'
  | 'Anticipo y cuotas'
  | 'Coordinar visita';

interface FinancingContactSectionProps {
  nameInputRef: React.RefObject<HTMLInputElement | null>;
}

const TOPICS: FinancingTopic[] = [
  'Opciones de financiación',
  'Anticipo y cuotas',
  'Coordinar visita',
];

export function FinancingContactSection({
  nameInputRef,
}: FinancingContactSectionProps) {
  const [nombre, setNombre] = useState('');
  const [tema, setTema] = useState<FinancingTopic>('Opciones de financiación');
  const [mensaje, setMensaje] = useState('');

  const cleanName = nombre.trim();
  const cleanMsg = mensaje.trim();

  const whatsappText = [
    `Hola ${ASSET_INFO.developerName}${cleanName ? `, soy ${cleanName}` : ''}.`,
    `Quiero consultar sobre "${tema}" para el edificio en ${ASSET_INFO.address} (${ASSET_INFO.priceUsd}).`,
    cleanMsg ? `Detalle: ${cleanMsg}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <section
        id="financiacion"
        className="bg-[#121417] py-16 text-white lg:py-20"
      >
        <div className="mx-auto max-w-[1360px] px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#E28A6B]">
                04 · Financiación
              </p>
              <h2
                className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl leading-[1.1]"
                style={{textWrap: 'balance'}}
              >
                Consultá por la financiación directa.
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#B8BCC4]">
                Comercialización exclusiva del edificio completo en{' '}
                {ASSET_INFO.address}. Evaluamos propuestas de anticipo y
                financiación directa con cada inversor.
              </p>
            </div>

            <div className="lg:col-span-7 rounded-xl border border-white/10 bg-[#1A1D22] p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold text-white">
                Enviar consulta por WhatsApp
              </h3>

              <div className="mt-5 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="fin-topic"
                      className="block text-xs font-medium text-[#D0D4DC]"
                    >
                      Motivo de la consulta
                    </label>
                    <select
                      id="fin-topic"
                      value={tema}
                      onChange={(e) => setTema(e.target.value as FinancingTopic)}
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#121417] px-4 py-2.5 text-sm text-white focus:border-[#C2451F] focus:outline-none"
                    >
                      {TOPICS.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="fin-name"
                      className="block text-xs font-medium text-[#D0D4DC]"
                    >
                      Tu nombre (opcional)
                    </label>
                    <input
                      ref={nameInputRef}
                      id="fin-name"
                      name="nombre"
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej. Martín Echeverría"
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#121417] px-4 py-2.5 text-sm text-white placeholder-[#6B707A] focus:border-[#C2451F] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="fin-msg"
                    className="block text-xs font-medium text-[#D0D4DC]"
                  >
                    Mensaje o propuesta (opcional)
                  </label>
                  <textarea
                    id="fin-msg"
                    name="mensaje"
                    rows={2}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Contanos tu propuesta de anticipo o disponibilidad para coordinar."
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#121417] px-4 py-2.5 text-sm text-white placeholder-[#6B707A] focus:border-[#C2451F] focus:outline-none"
                  />
                </div>

                <div className="pt-1">
                  <a
                    href={getWhatsAppUrl(whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent('whatsapp_click', {
                        origen: 'seccion_financiacion',
                        tema,
                      })
                    }
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-lg bg-[#15803D] px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#116932] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803D]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Consultar por WhatsApp</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0E1013] py-7 text-xs text-[#9BA0AA]">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-12">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <BrandLogo compact />
            <span aria-hidden="true">·</span>
            <span>{ASSET_INFO.address} · Córdoba</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#galeria-propiedad"
              className="hover:text-white transition-colors"
            >
              Galería
            </a>
            <a href="#activo" className="hover:text-white transition-colors">
              El Activo
            </a>
            <a href="#ubicacion" className="hover:text-white transition-colors">
              Ubicación
            </a>
            <a
              href="#financiacion"
              className="hover:text-white transition-colors"
            >
              Financiación
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
