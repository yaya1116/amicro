import { portalyUrl } from '../utils/portaly';

// Public display configuration only. Never put API keys in VITE_* variables.
export const site = {
  name: 'Yaya Motion',
  description: '給設計師與開發者的繁體中文互動元件庫',
  repository: 'https://github.com/yaya1116/amicro',
  productName: import.meta.env.VITE_PRODUCT_NAME || 'Yaya Motion 網頁動效即用包',
  productPrice: import.meta.env.VITE_PRODUCT_PRICE || 'NT$99',
  checkoutUrl: portalyUrl(import.meta.env.VITE_PORTALY_PRODUCT_URL),
};
