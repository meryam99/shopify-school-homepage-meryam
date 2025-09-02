
import 'swiper/css/bundle';
import './header.css';


import { initProductsSlider } from './sliders/products.js';
import { initHeroSlider } from './sliders/hero.js';
import { initProductDetail } from './sliders/product-detail.js';

document.addEventListener('DOMContentLoaded', () => {
  initProductDetail();
  initProductsSlider();
  initHeroSlider();
});