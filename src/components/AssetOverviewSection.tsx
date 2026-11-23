import {ArrowRight} from 'lucide-react';
import {
  BUILDING_COMPOSITION,
  GENERAL_SPECS,
  INVESTMENT_METRICS,
} from '../data/assetData';
import {trackEvent} from '../utils/analytics';

interface AssetOverviewSectionProps {
  onRequestFinancing: () => void;
}

export function AssetOverviewSection({
  onRequestFinancing,
}: AssetOverviewSectionProps) {
  return (
    <section
      id="activo"
      className="border-b border-[#E2E0DA] bg-white py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1360px] px-6 lg:px-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C2451F]">
              02 · El activo
            </p>
            <h2
              className="mt-2 font-display text-3xl font-bold tracking-tight text-[#141619] sm:text-4xl leading-[1.12]"
              style={{textWrap: 'balance'}}
            >
              Composición y cifras clave
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              trackEvent('overview_consultar_financiacion');
              onRequestFinancing();
            }}
            className="inline-flex items-center gap-2 self-start sm:self-auto rounded-lg bg-[#141619] px-5 py-3 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-[#C2451F] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Consultar financiación</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INVESTMENT_METRICS.map((metric, idx) => {
            const isHighlightedIncome = metric.id === 'current-income';
            const isPrimaryValue = metric.id === 'acquisition-value';
            const isDark = isPrimaryValue || isHighlightedIncome;

            return (
              <div
                key={metric.id}
                className={`relative flex flex-col justify-between rounded-xl border p-6 transition-colors ${
                  isDark
                    ? 'border-[#1E2229] bg-[#121417] text-white'
                    : 'border-[#E2E0DA] bg-[#FAF9F6] text-[#141619]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-mono text-[11px] font-medium tracking-[0.16em] uppercase tabular-nums ${
                      isHighlightedIncome
                        ? 'text-[#F09A7C]'
                        : isDark
                        ? 'text-[#9BA0AA]'
                        : 'text-[#C2451F]'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-6 rounded-full ${
                      isHighlightedIncome
                        ? 'bg-[#C2451F]'
                        : isDark
                        ? 'bg-white/25'
                        : 'bg-[#D6D2C9]'
                    }`}
                  />
                </div>

                <div className="mt-5">
                  <p
                    className={`font-mono text-2xl font-semibold tracking-tight tabular-nums ${
                      isHighlightedIncome
                        ? 'text-[#F09A7C]'
                        : isDark
                        ? 'text-white'
                        : 'text-[#141619]'
                    }`}
                  >
                    {metric.value}
                  </p>
                  <p
                    className={`mt-1.5 text-xs font-medium ${
                      isDark ? 'text-[#B8BCC4]' : 'text-[#5D6169]'
                    }`}
                  >
                    {metric.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {BUILDING_COMPOSITION.map((item, idx) => (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-xl border border-[#E2E0DA] border-t-[3px] border-t-[#141619] bg-[#FAF9F6] p-6 sm:p-7 transition-colors hover:border-t-[#C2451F]"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#C2451F]">
                    {item.tag}
                  </span>
                  <span className="font-mono text-xs font-medium text-[#8C9099] tabular-nums">
                    Nivel 0{idx + 1}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-[#141619]">
                  {item.title}
                </h3>

                <p className="mt-3 border-t border-[#E6E3DC] pt-3 text-sm leading-relaxed text-[#4B4F56]">
                  {item.summary}
                </p>
              </div>
            </article>
          ))}
        </div>

        <dl className="mt-5 grid grid-cols-2 divide-y divide-white/10 overflow-hidden rounded-xl bg-[#121417] text-white sm:grid-cols-3 sm:divide-y-0 sm:divide-x lg:grid-cols-5">
          {GENERAL_SPECS.map((spec) => (
            <div key={spec.label} className="px-5 py-4">
              <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#9BA0AA]">
                {spec.label}
              </dt>
              <dd className="mt-1 font-mono text-sm font-semibold text-white tabular-nums">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
