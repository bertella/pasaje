/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useEffect, useRef, useState} from 'react';
import {MessageCircle} from 'lucide-react';
import {AssetOverviewSection} from './components/AssetOverviewSection';
import {FinancingContactSection} from './components/FinancingContactSection';
import {HeroSection} from './components/HeroSection';
import {LocationMapSection} from './components/LocationMapSection';
import {Navbar} from './components/Navbar';
import {PropertyCarousel} from './components/PropertyCarousel';
import {getWhatsAppUrl} from './data/assetData';
import {trackEvent} from './utils/analytics';

export default function App() {
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onQuotaExceeded = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuotaExceeded);
    return () =>
      window.removeEventListener('gmp-quota-exceeded', onQuotaExceeded);
  }, []);

  const handleRequestFinancing = () => {
    const section = document.getElementById('financiacion');
    section?.scrollIntoView({behavior: 'smooth', block: 'start'});
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 350);
  };

  return (
    <div className="min-h-screen bg-[#F5F4F1] text-[#141619]">
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Navbar />

      <main>
        <HeroSection onRequestFinancing={handleRequestFinancing} />
        <PropertyCarousel />
        <AssetOverviewSection onRequestFinancing={handleRequestFinancing} />
        <LocationMapSection />
        <FinancingContactSection nameInputRef={nameInputRef} />
      </main>

      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Consultar financiación por WhatsApp"
        onClick={() => trackEvent('whatsapp_click', {origen: 'cta_flotante'})}
        className="fixed right-4 bottom-4 z-30 inline-flex sm:hidden items-center gap-2 rounded-lg bg-[#15803D] px-4 py-3 text-xs font-semibold tracking-wide text-white shadow-lg transition-colors duration-150 hover:bg-[#116932] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803D]"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
