import Swiper from 'swiper/bundle';

export function initHeroSlider() {
  const root = document.querySelector('.js-hero-swiper');
  if (!root) return;

  new Swiper(root, {
    loop: true,
    autoplay: { delay: 3000 },
    pagination: { el: root.querySelector('.swiper-pagination'), clickable: true },
  });
}