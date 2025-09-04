import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

export function initProductsSlider() {
  const container = document.querySelector('.js-products-swiper');
  if (!container) return;

  const prevBtn = container.querySelector('.products-prev');
  const nextBtn = container.querySelector('.products-next');

  new Swiper(container, {
    modules: [Navigation],
    slidesPerView: 1.1,
    spaceBetween: 16,
    centeredSlides: false,
    loop: false,
    grabCursor: true,
    breakpoints: {
      768:  { slidesPerView: 2.5, spaceBetween: 20 },
      1024: { slidesPerView: 4,   spaceBetween: 24 },
    },
    navigation: { prevEl: prevBtn, nextEl: nextBtn },
  });
}