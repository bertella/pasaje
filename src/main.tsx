import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {initAnalytics} from './utils/analytics.ts';

window.gm_authFailure = () => {
  window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
};

const origError = console.error;
console.error = (...args: unknown[]) => {
  origError.apply(console, args);
  const msg = args.map((a) => String(a)).join(' ');
  if (msg.includes('OverQuotaMapError') || msg.includes('QuotaExceededError')) {
    window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
  }
};

initAnalytics();

createRoot(document.getElementById('root')!).render(<App />);

