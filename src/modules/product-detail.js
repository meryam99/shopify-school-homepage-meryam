// ====== 1) Дані товару ======
const product = {
  title: 'Nike Air Max Plus',
  currency: '$',
  colors: {
    pink: {
      name: 'Pink',
      // свотч-картинка:
      swatchThumb: 'images/product__main-pink-2.png',
      // ціна для цього кольору:
      price: 280.00,
      // доступні розміри:
      sizes: ['UK 6 (EU 39)', 'UK 5.5', 'UK 6 (EU 40)', 'UK 6.5'],
      // фото саме цього кольору:
      images: [
        { thumb: 'images/product__main-pink.png', full: 'images/product__main-pink.png', alt: 'Pink 1' },
        { thumb: 'images/product__main-pink-2.png', full: 'images/product__main-pink-2.png', alt: 'Pink 2' },
        { thumb: 'images/product__main-pink-3.png', full: 'images/product__main-pink-3.png', alt: 'Pink 3' },
        { thumb: 'images/product__main-pink-4.png', full: 'images/product__main-pink-4.png', alt: 'Pink 4' },
        { thumb: 'images/product__main-pink-5.png', full: 'images/product__main-pink-5.png', alt: 'Pink 5' },
      ],
      defaultSize: 'UK 6 (EU 39)',
    },
    black: {
      name: 'Black',
      swatchThumb: 'images/product__main-black-2.png',
      price: 290,
      sizes: ['UK 6.5', 'UK 7', 'UK 8', 'UK 9'],
      images: [
        { thumb: 'images/product__main-black-2.png', full: 'images/product__main-black-2.png', alt: 'Black 1' },
        { thumb: 'images/product__main-black.png', full: 'images/product__main-black.png', alt: 'Black 2' },
        { thumb: 'images/product__main-black-3.png', full: 'images/product__main-black-3.png', alt: 'Black 3' },
        { thumb: 'images/product__main-black-4.png', full: 'images/product__main-black-4.png', alt: 'Black 4' },
        { thumb: 'images/product__main-black-5.png', full: 'images/product__main-black-5.png', alt: 'Black 5' },
      ],
      defaultSize: 'UK 9',
    },
    white: {
      name: 'White',
      swatchThumb: 'images/product__main-white-3.png',
      price: 270,
      sizes: ['UK 7.5', 'UK 8', 'UK 9', 'UK 10'],
      images: [
        { thumb: 'images/product__main-white-3.png', full: 'images/product__main-white-3.png', alt: 'White 1' },
        { thumb: 'images/product__main-white-2.png', full: 'images/product__main-white-2.png', alt: 'White 2' },
        { thumb: 'images/product__main-white.png', full: 'images/product__main-white.png', alt: 'White 3' },
        { thumb: 'images/product__main-white-4.png', full: 'images/product__main-white-4.png', alt: 'White 4' },
        { thumb: 'images/product__main-white-5.png', full: 'images/product__main-white-5.png', alt: 'White 5' },
      ],
      defaultSize: 'UK 7.5',
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
const fmtMoney = (n, cur) => `${cur} ${new Intl.NumberFormat('uk-UA').format(n)}`;
const currentColor = () => product.colors[state.colorKey];

// ====== 4) Елементи DOM ======
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
  renderThumbs();
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
  elThumbs = document.getElementById('pd-thumbs');
  elMain   = document.getElementById('pd-main');
  elPrice  = document.getElementById('pd-price');
  elColors = document.getElementById('pd-colors');
  elSizes  = document.getElementById('pd-sizes');
  elTitle  = document.querySelector('.pd__title');

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
  renderThumbs();
  renderSizes();
  updateMainImage();
  updatePrice();
  syncUIActiveStates();

  elThumbs.addEventListener('click', onThumbClick);
  elColors.addEventListener('click', onColorClick);
  elSizes.addEventListener('click', onSizeClick);
}

document.addEventListener('DOMContentLoaded', () => {
  initProductDetail();
});