
import 'swiper/css/bundle';
import './style.css';


import { initProductsSlider } from './modules/products.js';
import { initHeroSlider } from './modules/hero.js';
import { initProductDetail } from './modules/product-detail.js';
import { initHelpForm } from './modules/need-help.js';
import { initFooterAccordion } from './modules/footer.js';
import { initNewsletterPopup } from './modules/popup.js'; 

document.addEventListener('DOMContentLoaded', () => {
  initProductDetail();
  initProductsSlider();
  initHeroSlider();
  initHelpForm();
  initFooterAccordion();
  initNewsletterPopup();
});