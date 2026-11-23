// Product marks, cut from or built around the Deernova Style mark (assets/deernova-style-icon.png). Page and Material have
// their own shapes (see pageMark, materialMark). The marks are filled with currentColor, so they follow the theme.
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

// Material: four pieces laid out like a tray of materials. The top-left tile carries Style's antlers (deer) cut out,
// the top-right piece is Style's four-point star (nova); below them a square tile and a round one, for icons and logos.
function materialMark(id) {
  return `<svg class="product-symbol" viewBox="110 100 780 800" aria-hidden="true" focusable="false">
  <defs>
    ${alphaFilter(id)}
    <mask id="${id}-art" maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style="mask-type: alpha">
      <image href="assets/deernova-style-icon.png" width="1254" height="1254" filter="url(#${id}-alpha)"/>
    </mask>
    <clipPath id="${id}-antlers"><rect x="230" y="280" width="560" height="330"/></clipPath>
    <mask id="${id}-cuts" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">
      <rect width="1000" height="1000" fill="#fff"/>
      <g transform="translate(310 318) scale(0.46) translate(-510 -445)"><rect width="1254" height="1254" fill="#000" mask="url(#${id}-art)" clip-path="url(#${id}-antlers)"/></g>
    </mask>
  </defs>
  <rect x="150" y="140" width="320" height="320" rx="80" fill="currentColor" mask="url(#${id}-cuts)"/>
  <path d="M690 140L728 262L850 300L728 338L690 460L652 338L530 300L652 262Z" fill="currentColor"/>
  <rect x="150" y="540" width="320" height="320" rx="80" fill="currentColor"/>
  <circle cx="690" cy="700" r="160" fill="currentColor"/>
</svg>`;
}

// `id` must be unique on the page: each mark carries its own filter, mask and clip.
export function productMark(product, id = product) {
  if (product === 'page') return pageMark(id);
  if (product === 'material') return materialMark(id);
  return `<svg class="product-symbol" viewBox="210 255 820 740" aria-hidden="true" focusable="false">
  <defs>
    ${alphaFilter(id)}
    <mask id="${id}-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style="mask-type: alpha">
      <image href="assets/deernova-style-icon.png" width="1254" height="1254" filter="url(#${id}-alpha)"/>
    </mask>
  </defs>
  <rect width="1254" height="1254" fill="currentColor" mask="url(#${id}-mask)"/>
</svg>`;
}
