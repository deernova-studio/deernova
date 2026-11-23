// Product marks. Icons and Loaders share the antlered "Ui" of the Deernova Style mark (assets/deernova-style-icon.png);
// only the accent in the top-right corner changes: Style keeps its four-point star, Icons gets an icon tile,
// Loaders gets an open loading arc. Page has its own shape (see pageMark). The marks are filled with currentColor, so they follow the theme.
const ACCENTS = {
  icons: '<rect x="822" y="347" width="126" height="126" rx="32" fill="none" stroke="currentColor" stroke-width="34"/>',
  loaders: '<path d="M885 340A72 72 0 1 1 813 412" fill="none" stroke="currentColor" stroke-width="36" stroke-linecap="round"/>'
};

const alphaFilter = id => `<filter id="${id}-alpha" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -0.2126 -0.7152 -0.0722 0 1"/>
      <feComponentTransfer><feFuncA type="linear" slope="1.04" intercept="-0.02"/></feComponentTransfer>
    </filter>`;

// Page: a page split into header, sidebar and body by two gaps. The header carries Style's antlers (deer) over the
// sidebar, and the body cell carries Style's four-point star (nova); both are cut out, so the background shows through.
function pageMark(id) {
  // Cropped so the page fills 90% of the box, the same height as Style's U; a solid page reads heavier, so it stops there.
  return `<svg class="product-symbol" viewBox="110 100 780 800" aria-hidden="true" focusable="false">
  <defs>
    ${alphaFilter(id)}
    <mask id="${id}-art" maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style="mask-type: alpha">
      <image href="assets/deernova-style-icon.png" width="1254" height="1254" filter="url(#${id}-alpha)"/>
    </mask>
    <clipPath id="${id}-antlers"><rect x="230" y="280" width="560" height="330"/></clipPath>
    <mask id="${id}-cuts" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">
      <rect width="1000" height="1000" fill="#fff"/>
      <rect x="100" y="360" width="800" height="50" fill="#000"/>
      <rect x="370" y="360" width="50" height="560" fill="#000"/>
      <path d="M635 485L665 605L785 635L665 665L635 785L605 665L485 635L605 605Z" fill="#000"/>
      <g transform="translate(272 318) scale(0.38) translate(-512 -600)"><rect width="1254" height="1254" fill="#000" mask="url(#${id}-art)" clip-path="url(#${id}-antlers)"/></g>
    </mask>
  </defs>
  <rect x="150" y="140" width="700" height="720" rx="110" fill="currentColor" mask="url(#${id}-cuts)"/>
</svg>`;
}

// `id` must be unique on the page: each mark carries its own filter, mask and clip.
export function productMark(product, id = product) {
  if (product === 'page') return pageMark(id);
  const accent = ACCENTS[product];
  const clip = accent ? `<clipPath id="${id}-clip"><rect width="772" height="1254"/><rect x="772" y="530" width="482" height="724"/></clipPath>` : '';
  return `<svg class="product-symbol" viewBox="210 255 820 740" aria-hidden="true" focusable="false">
  <defs>
    ${alphaFilter(id)}
    <mask id="${id}-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style="mask-type: alpha">
      <image href="assets/deernova-style-icon.png" width="1254" height="1254" filter="url(#${id}-alpha)"/>
    </mask>${clip}
  </defs>
  <rect width="1254" height="1254" fill="currentColor" mask="url(#${id}-mask)"${accent ? ` clip-path="url(#${id}-clip)"` : ''}/>${accent ?? ''}
</svg>`;
}
