// src/product-detail.js

// ====== 1) Дані товару (заміни шляхи до зображень під свої) ======
const product = {
  title: 'Nike Air Max Plus',
  currency: '$',
  colors: {
    pink: {
      name: 'Pink',
      // свотч-картинка (маленький превʼюшник для плитки кольору):
      swatchThumb: '/src/images/product__main-pink-2.png',
      // ціна для цього кольору:
      price: 280.00,
      // доступні розміри:
      sizes: ['36', '37', '38', '39'],
      // фото саме цього кольору (thumb — мініатюра збоку, full — велике зображення)
      images: [
        { thumb: '/src/images/pink-1-thumb.jpg', full: '/src/images/product__main-pink.png', alt: 'Pink 1' },
        { thumb: '/src/images/pink-2-thumb.jpg', full: '/src/images/pink-2.jpg',               alt: 'Pink 2' },
        { thumb: '/src/images/pink-3-thumb.jpg', full: '/src/images/pink-3.jpg',               alt: 'Pink 3' },
      ],
      defaultSize: '37',
    },
    black: {
      name: 'Black',
      swatchThumb: '/src/images/black-swatch.jpg',
      price: 4699,
      sizes: ['38', '39', '40', '41'],
      images: [
        { thumb: '/src/images/black-1-thumb.jpg', full: '/src/images/black-1.jpg', alt: 'Black 1' },
        { thumb: '/src/images/black-2-thumb.jpg', full: '/src/images/black-2.jpg', alt: 'Black 2' },
      ],
      defaultSize: '40',
    },
    white: {
      name: 'White',
      swatchThumb: '/src/images/white-swatch.jpg',
      price: 4899,
      sizes: ['36', '37', '38'],
      images: [
        { thumb: '/src/images/white-1-thumb.jpg', full: '/src/images/white-1.jpg', alt: 'White 1' },
        { thumb: '/src/images/white-2-thumb.jpg', full: '/src/images/white-2.jpg', alt: 'White 2' },
      ],
      defaultSize: '38',
    },
  },
};

// ====== 2) Стан ======
const state = {
  colorKey: 'pink',
  imageIndex: 0,
  size: null,
};

// ====== 3) Допоміжні ======
const fmtMoney = (n, cur) => `${new Intl.NumberFormat('uk-UA').format(n)} ${cur}`;
const currentColor = () => product.colors[state.colorKey];

// ====== 4) Елементи DOM (очікуємо, що вони є в HTML) ======
let elThumbs, elMain, elPrice, elColors, elSizes, elTitle;

// ====== 5) Рендери ======
function renderTitle() {
  if (elTitle) elTitle.textContent = product.title;
}

function renderThumbs() {
  const c = currentColor();
  const images = Array.isArray(c.images) ? c.images : [];
  elThumbs.innerHTML = images
    .map((img, idx) => {
      const isActive = idx === state.imageIndex;
      return `
        <button class="pd__thumb"
                type="button"
                data-index="${idx}"
                aria-current="${isActive ? 'true' : 'false'}"
                title="${c.name} ${idx + 1}">
          <img src="${img.thumb}" alt="${img.alt || c.name + ' ' + (idx + 1)}">
        </button>
      `;
    })
    .join('');
}

function renderColors() {
  const entries = Object.entries(product.colors);
  elColors.innerHTML = entries
    .map(([key, c]) => {
      const cover = c.swatchThumb || c.images?.[0]?.thumb || '';
      const active = key === state.colorKey;
      return `
        <button class="pd__color"
                type="button"
                role="radio"
                aria-checked="${active}"
                data-color="${key}"
                title="${c.name}">
          <img class="pd__color-img" src="${cover}" alt="${c.name} color">
        </button>
      `;
    })
    .join('');
}

function renderSizes() {
  const sizes = currentColor().sizes || [];
  elSizes.innerHTML = sizes
    .map(
      (sz) => `
        <button class="pd__size"
                type="button"
                role="radio"
                aria-checked="${state.size === sz}"
                data-size="${sz}">
          ${sz}
        </button>`
    )
    .join('');
}

// ====== 6) Оновлення конкретних частин ======
function updateMainImage() {
  const c = currentColor();
  const total = c.images?.length || 0;
  if (!total) {
    elMain.removeAttribute('src');
    elMain.alt = 'No image';
    return;
  }
  state.imageIndex = Math.min(Math.max(0, state.imageIndex), total - 1);
  const img = c.images[state.imageIndex];
  elMain.src = img.full;
  elMain.alt = img.alt || `${c.name} product image`;
}

function updatePrice() {
  const c = currentColor();
  elPrice.textContent = fmtMoney(c.price, product.currency);
}

function ensureValidSize() {
  const c = currentColor();
  if (!state.size || !c.sizes.includes(state.size)) {
    state.size = c.defaultSize || c.sizes[0] || null;
  }
}

function syncUIActiveStates() {
  // thumbs
  elThumbs.querySelectorAll('.pd__thumb').forEach((b) => {
    const idx = Number(b.dataset.index);
    b.setAttribute('aria-current', idx === state.imageIndex ? 'true' : 'false');
  });

  // color tiles
  elColors.querySelectorAll('.pd__color').forEach((b) => {
    b.setAttribute('aria-checked', b.dataset.color === state.colorKey ? 'true' : 'false');
  });

  // sizes
  elSizes.querySelectorAll('.pd__size').forEach((b) => {
    const sz = b.dataset.size;
    b.setAttribute('aria-checked', state.size === sz ? 'true' : 'false');
  });
}

// ====== 7) Обробники ======
function onThumbClick(e) {
  const btn = e.target.closest('.pd__thumb');
  if (!btn) return;
  state.imageIndex = Number(btn.dataset.index) || 0;
  updateMainImage();
  syncUIActiveStates();
}

function onColorClick(e) {
  const btn = e.target.closest('.pd__color');
  if (!btn) return;
  const newColor = btn.dataset.color;
  if (!newColor || newColor === state.colorKey) return;

  state.colorKey = newColor;
  state.imageIndex = 0;

  ensureValidSize();
  renderThumbs();        // thumbs тільки для цього кольору
  updateMainImage();
  updatePrice();
  renderSizes();
  syncUIActiveStates();
}

function onSizeClick(e) {
  const btn = e.target.closest('.pd__size');
  if (!btn) return;
  state.size = btn.dataset.size;
  syncUIActiveStates();
}

// ====== 8) Ініціалізація ======
export function initProductDetail() {
  // Підхоплюємо елементи
  elThumbs = document.getElementById('pd-thumbs');
  elMain   = document.getElementById('pd-main');
  elPrice  = document.getElementById('pd-price');
  elColors = document.getElementById('pd-colors');
  elSizes  = document.getElementById('pd-sizes');
  elTitle  = document.querySelector('.pd__title');

  // Перевірка наявності ключових контейнерів
  if (!elThumbs || !elMain || !elPrice || !elColors || !elSizes) {
    console.warn('[ProductDetail] Missing required DOM elements.');
    return;
  }

  // Початковий стан
  state.colorKey = Object.keys(product.colors)[0] || 'pink';
  state.imageIndex = 0;
  state.size = currentColor().defaultSize || currentColor().sizes?.[0] || null;

  // Рендер
  renderTitle();
  renderColors();
  renderThumbs();     // лише поточний колір
  renderSizes();
  updateMainImage();
  updatePrice();
  syncUIActiveStates();

  // Слухачі
  elThumbs.addEventListener('click', onThumbClick);
  elColors.addEventListener('click', onColorClick);
  elSizes.addEventListener('click', onSizeClick);
}

// Автоініт, якщо підʼєднано напряму у сторінку (ESM через Vite теж ок)
document.addEventListener('DOMContentLoaded', () => {
  initProductDetail();
});