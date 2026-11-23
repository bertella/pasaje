import {
  ArrowUpRight,
  Clock,
  Footprints,
  GraduationCap,
  MapPin,
} from 'lucide-react';
import {ASSET_INFO, LANDMARK_QUERIES} from '../data/assetData';

const EMBED_MAP_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.8342465001874!2d-64.19735012399731!3d-31.418692574260547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a280a201689f%3A0x1c502ddbf0d25572!2sBlvd.%20San%20Juan%20651%2C%20X5000%20C%C3%B3rdoba!5e0!3m2!1ses-419!2sar!4v1795450825423!5m2!1ses-419!2sar';

export function LocationMapSection() {
  const externalMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Blvd.+San+Juan+651,+X5000+Cordoba,+Argentina';

  return (
    <section
      id="ubicacion"
      className="border-b border-[#E2E0DA] bg-[#F5F4F1] py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1360px] px-6 lg:px-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C2451F]">
              03 · Ubicación
            </p>
            <h2
              className="mt-2 font-display text-3xl font-bold tracking-tight text-[#141619] sm:text-4xl leading-[1.12]"
              style={{textWrap: 'balance'}}
            >
              {ASSET_INFO.address} · {ASSET_INFO.district}
            </h2>
          </div>

          <a
            href={externalMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start sm:self-auto rounded-lg border border-[#D4D1C9] bg-white px-4 py-2.5 text-xs font-semibold text-[#141619] transition-colors hover:border-[#C2451F] hover:text-[#C2451F] whitespace-nowrap shrink-0"
          >
            <span>Abrir en Google Maps</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between gap-5 rounded-xl border border-[#E2E0DA] bg-white p-6">
            <div>
              <span className="block text-xs font-semibold tracking-[0.14em] uppercase text-[#C2451F]">
                Puntos de referencia a pie
              </span>

              <div className="mt-4 flex flex-col divide-y divide-[#E2E0DA] border-t border-b border-[#E2E0DA]">
                {LANDMARK_QUERIES.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-2 py-3.5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin
                        className="h-3.5 w-3.5 shrink-0 text-[#C2451F]"
                        aria-hidden="true"
                      />
                      <p className="text-sm font-semibold text-[#141619]">
                        {item.label}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pl-5 sm:pl-0 text-xs font-mono text-[#4B4F56] shrink-0">
                      <span className="inline-flex items-center gap-1.5">
                        <Footprints
                          className="h-3.5 w-3.5 text-[#C2451F]"
                          aria-hidden="true"
                        />
                        <span>{item.blocks}</span>
                      </span>
                      <span aria-hidden="true" className="text-[#D4D1C9]">
                        ·
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock
                          className="h-3.5 w-3.5 text-[#5D6169]"
                          aria-hidden="true"
                        />
                        <span>{item.walkTime}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#E2E0DA] border-l-[3px] border-l-[#C2451F] bg-[#FAF8F5] p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#C2451F]/10 text-[#C2451F]">
                  <GraduationCap className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-[#C2451F]">
                    Córdoba · Ciudad universitaria
                  </span>
                  <h3 className="mt-0.5 font-display text-base font-bold text-[#141619]">
                    Fácil acceso a Ciudad Universitaria (UNC)
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#4B4F56]">
                    Líneas directas sobre Bv. San Juan y conexión rápida a través
                    de Nueva Córdoba (10–15 min en transporte), sosteniendo la
                    demanda de alquiler estudiantil y temporario todo el año.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 overflow-hidden rounded-xl border border-[#E2E0DA] bg-[#EAE8E2]">
            <iframe
              title="Ubicación en Google Maps — Bv. San Juan al 600, Córdoba"
              src={EMBED_MAP_URL}
              width="600"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-[420px] sm:h-[460px] lg:h-full lg:min-h-[500px] w-full border-0 block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
