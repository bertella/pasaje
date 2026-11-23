import {useCallback, useEffect, useRef, useState} from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  PROPERTY_CAROUSEL_PHOTOS,
  type CarouselCategory,
  type CarouselPhoto,
} from '../data/assetData';
import {trackEvent} from '../utils/analytics';

const FILTER_TABS: Array<{id: CarouselCategory; label: string}> = [
  {id: 'todas', label: 'Todas'},
  {id: 'local', label: 'Local Comercial'},
  {id: 'lofts', label: 'Lofts e Interiores'},
  {id: 'terraza', label: 'Terraza y Quincho'},
];

export function PropertyCarousel() {
  const [category, setCategory] = useState<CarouselCategory>('todas');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);
  const [failedIds, setFailedIds] = useState<Record<string, boolean>>({});

  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const lightboxTouchStart = useRef<{x: number; y: number} | null>(null);

  const filteredPhotos: CarouselPhoto[] =
    category === 'todas'
      ? PROPERTY_CAROUSEL_PHOTOS
      : PROPERTY_CAROUSEL_PHOTOS.filter((p) => p.category === category);

  const safeIndex =
    filteredPhotos.length > 0 ? currentIndex % filteredPhotos.length : 0;
  const activePhoto = filteredPhotos[safeIndex] ?? PROPERTY_CAROUSEL_PHOTOS[0];

  const scrollToSlide = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      const clamped =
        filteredPhotos.length > 0
          ? (index + filteredPhotos.length) % filteredPhotos.length
          : 0;
      setCurrentIndex(clamped);
      const track = trackRef.current;
      if (track) {
        track.scrollTo({
          left: clamped * track.clientWidth,
          behavior,
        });
      }
    },
    [filteredPhotos.length]
  );

  const handleCategoryChange = (nextCategory: CarouselCategory) => {
    setCategory(nextCategory);
    setCurrentIndex(0);
    if (trackRef.current) {
      trackRef.current.scrollTo({left: 0, behavior: 'auto'});
    }
    trackEvent('carrusel_filtrar_categoria', {categoria: nextCategory});
  };

  const handlePrev = useCallback(() => {
    if (filteredPhotos.length === 0) return;
    scrollToSlide(safeIndex - 1);
  }, [filteredPhotos.length, safeIndex, scrollToSlide]);

  const handleNext = useCallback(() => {
    if (filteredPhotos.length === 0) return;
    scrollToSlide(safeIndex + 1);
  }, [filteredPhotos.length, safeIndex, scrollToSlide]);

  const openLightbox = useCallback((photo: CarouselPhoto, idx: number) => {
    setCurrentIndex(idx);
    setLightboxZoomed(false);
    setLightboxOpen(true);
    trackEvent('carrusel_ampliar_foto', {foto: photo.id});
  }, []);

  const handleTrackScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
    }
    scrollTimerRef.current = window.setTimeout(() => {
      const nextIdx = Math.round(track.scrollLeft / track.clientWidth);
      if (
        nextIdx >= 0 &&
        nextIdx < filteredPhotos.length &&
        nextIdx !== currentIndex
      ) {
        setCurrentIndex(nextIdx);
      }
    }, 60);
  };

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      const track = trackRef.current;
      if (track) {
        track.scrollTo({
          left: safeIndex * track.clientWidth,
          behavior: 'auto',
        });
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [safeIndex]);

  useEffect(() => {
    const el = thumbRefs.current[safeIndex];
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [safeIndex]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') {
        setLightboxZoomed(false);
        handlePrev();
      }
      if (e.key === 'ArrowRight') {
        setLightboxZoomed(false);
        handleNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxOpen, handlePrev, handleNext]);

  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    if (lightboxZoomed) return;
    const touch = e.touches[0];
    if (!touch) return;
    lightboxTouchStart.current = {x: touch.clientX, y: touch.clientY};
  };

  const handleLightboxTouchEnd = (e: React.TouchEvent) => {
    if (lightboxZoomed || !lightboxTouchStart.current) return;
    const touch = e.changedTouches[0];
    if (touch) {
      const dx = touch.clientX - lightboxTouchStart.current.x;
      const dy = touch.clientY - lightboxTouchStart.current.y;
      if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) handleNext();
        else handlePrev();
      }
    }
    lightboxTouchStart.current = null;
  };

  return (
    <section
      id="galeria-propiedad"
      className="border-b border-[#E2E0DA] bg-[#F5F4F1] py-14 lg:py-20"
    >
      <div className="mx-auto max-w-[1360px] px-6 lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="block text-xs font-semibold tracking-[0.18em] uppercase text-[#C2451F]">
              01 · Registro fotográfico real
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#141619] sm:text-4xl leading-[1.12]">
              Recorrido por la propiedad
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filtrar fotografías por sector"
            className="flex flex-wrap gap-2"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = category === tab.id;
              const count =
                tab.id === 'todas'
                  ? PROPERTY_CAROUSEL_PHOTOS.length
                  : PROPERTY_CAROUSEL_PHOTOS.filter((p) => p.category === tab.id)
                      .length;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategoryChange(tab.id)}
                  className={`rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'border-[#141619] bg-[#141619] text-white'
                      : 'border-[#DCD9D0] bg-white text-[#4B4F56] hover:border-[#C2451F] hover:text-[#141619]'
                  }`}
                >
                  {tab.label}{' '}
                  <span className="ml-1 font-mono text-[11px] opacity-75 tabular-nums">
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-[#E2E0DA] bg-[#121417] text-white">
          <div className="relative h-[340px] sm:h-[460px] lg:h-[540px] w-full bg-[#0C0E11] select-none">
            <div
              ref={trackRef}
              onScroll={handleTrackScroll}
              className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scroll-smooth touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-roledescription="carrusel"
              aria-label="Fotografías de la propiedad"
            >
              {filteredPhotos.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(photo, idx)}
                  role="button"
                  tabIndex={idx === safeIndex ? 0 : -1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(photo, idx);
                    }
                  }}
                  aria-label={`Ampliar: ${photo.title}`}
                  className="relative flex h-full w-full shrink-0 snap-center snap-always items-center justify-center cursor-zoom-in focus-visible:outline-none"
                >
                  {!failedIds[photo.id] ? (
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading={Math.abs(idx - safeIndex) <= 2 ? 'eager' : 'lazy'}
                      draggable={false}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedIds((prev) => ({...prev, [photo.id]: true}))
                      }
                      className="h-full w-full object-contain pointer-events-none select-none"
                    />
                  ) : (
                    <div className="p-8 text-center">
                      <p className="font-display text-lg font-bold text-white">
                        {photo.title}
                      </p>
                      <p className="mt-1 text-xs text-[#9BA0AA]">
                        {photo.sectorLabel}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handlePrev}
              aria-label="Fotografía anterior"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-[#121417]/80 text-white backdrop-blur-sm transition-colors hover:border-[#C2451F] hover:bg-[#C2451F] cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Siguiente fotografía"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-[#121417]/80 text-white backdrop-blur-sm transition-colors hover:border-[#C2451F] hover:bg-[#C2451F] cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => openLightbox(activePhoto, safeIndex)}
              aria-label="Ampliar fotografía"
              className="absolute right-3 sm:right-5 bottom-3 sm:bottom-5 z-10 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#121417]/85 px-3 py-2 text-[11px] font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-[#C2451F] hover:bg-[#C2451F] cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            >
              <Expand className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Ampliar</span>
            </button>
          </div>

          <div className="flex flex-col gap-2 border-t border-white/10 bg-[#16191D] px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[#E28A6B]">
                {activePhoto.sectorLabel}
              </span>
              <span aria-hidden="true" className="text-white/30">
                ·
              </span>
              <span className="text-sm font-medium text-white">
                {activePhoto.title}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[11px] text-[#9BA0AA] sm:hidden">
                Deslizá o tocá para ampliar
              </span>
              <span className="font-mono text-xs text-[#9BA0AA] tabular-nums">
                {String(safeIndex + 1).padStart(2, '0')} /{' '}
                {String(filteredPhotos.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="border-t border-white/10 bg-[#121417] px-4 py-3">
            <div
              className="flex gap-2.5 overflow-x-auto pb-1"
              role="listbox"
              aria-label="Miniaturas de la propiedad"
            >
              {filteredPhotos.map((photo, idx) => {
                const isSelected = idx === safeIndex;
                return (
                  <button
                    key={photo.id}
                    ref={(el) => {
                      thumbRefs.current[idx] = el;
                    }}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    aria-label={`Ver ${photo.title}`}
                    onClick={() => scrollToSlide(idx)}
                    className={`relative h-16 w-20 sm:h-[72px] sm:w-24 shrink-0 overflow-hidden rounded-lg border-2 bg-[#0C0E11] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-white ${
                      isSelected
                        ? 'border-[#C2451F] opacity-100'
                        : 'border-transparent opacity-55 hover:opacity-90'
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt=""
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {lightboxOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.title}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C0E11]/95 p-2 sm:p-6"
            onClick={() => setLightboxOpen(false)}
          >
            <div
              className="relative flex max-h-[95dvh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-white/15 bg-[#121417] text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.12em] uppercase text-[#E28A6B]">
                  <span>{activePhoto.sectorLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-[#9BA0AA] tabular-nums">
                    {String(safeIndex + 1).padStart(2, '0')} /{' '}
                    {String(filteredPhotos.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setLightboxZoomed((prev) => !prev)}
                    aria-label={
                      lightboxZoomed ? 'Reducir zoom' : 'Acercar fotografía'
                    }
                    className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-white/15 px-3 text-xs font-medium text-white transition-colors hover:border-[#C2451F] cursor-pointer"
                  >
                    {lightboxZoomed ? (
                      <>
                        <ZoomOut className="h-4 w-4" aria-hidden="true" />
                        <span className="hidden sm:inline">Ajustar</span>
                      </>
                    ) : (
                      <>
                        <ZoomIn className="h-4 w-4" aria-hidden="true" />
                        <span className="hidden sm:inline">Zoom</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setLightboxOpen(false)}
                    aria-label="Cerrar vista ampliada"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white transition-colors hover:border-[#C2451F] cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div
                className={`relative flex-1 bg-[#0A0C0E] ${
                  lightboxZoomed
                    ? 'overflow-auto touch-pan-x touch-pan-y'
                    : 'flex items-center justify-center overflow-hidden'
                }`}
                onTouchStart={handleLightboxTouchStart}
                onTouchEnd={handleLightboxTouchEnd}
              >
                <img
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  draggable={false}
                  referrerPolicy="no-referrer"
                  onClick={() => setLightboxZoomed((prev) => !prev)}
                  className={
                    lightboxZoomed
                      ? 'w-[175%] max-w-none sm:w-[140%] h-auto cursor-zoom-out select-none'
                      : 'max-h-[74dvh] w-full object-contain cursor-zoom-in select-none transition-transform duration-150'
                  }
                />
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-3.5 sm:px-6">
                <p className="text-xs sm:text-sm font-medium text-white">
                  {activePhoto.title}
                </p>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setLightboxZoomed(false);
                      handlePrev();
                    }}
                    aria-label="Foto anterior"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-white transition-colors hover:border-[#C2451F] cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLightboxZoomed(false);
                      handleNext();
                    }}
                    aria-label="Siguiente foto"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-white transition-colors hover:border-[#C2451F] cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
