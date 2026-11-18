// Product marks. All three share the antlered "Ui" of the Deernova Style mark (assets/deernova-style-icon.png);
// only the accent in the top-right corner changes: Style keeps its four-point star, Icons gets an icon tile,
// Loaders gets an open loading arc, Page gets a page with a header band. The marks are filled with currentColor, so they follow the theme.
const ACCENTS = {
  icons: '<rect x="822" y="347" width="126" height="126" rx="32" fill="none" stroke="currentColor" stroke-width="34"/>',
  loaders: '<path d="M885 340A72 72 0 1 1 813 412" fill="none" stroke="currentColor" stroke-width="36" stroke-linecap="round"/>',
  page: '<rect x="830" y="330" width="112" height="146" rx="24" fill="none" stroke="currentColor" stroke-width="32"/><path d="M830 386H942" stroke="currentColor" stroke-width="32"/>'
};

// `id` must be unique on the page: each mark carries its own filter, mask and clip.
export function productMark(product, id = product) {
  const accent = ACCENTS[product];
  const clip = accent ? `<clipPath id="${id}-clip"><rect width="772" height="1254"/><rect x="772" y="530" width="482" height="724"/></clipPath>` : '';
  return `<svg class="product-symbol" viewBox="210 255 820 740" aria-hidden="true" focusable="false">
  <defs>
    <filter id="${id}-alpha" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -0.2126 -0.7152 -0.0722 0 1"/>
      <feComponentTransfer><feFuncA type="linear" slope="1.04" intercept="-0.02"/></feComponentTransfer>
    </filter>
    <mask id="${id}-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style="mask-type: alpha">
      <image href="assets/deernova-style-icon.png" width="1254" height="1254" filter="url(#${id}-alpha)"/>
    </mask>${clip}
  </defs>
  <rect width="1254" height="1254" fill="currentColor" mask="url(#${id}-mask)"${accent ? ` clip-path="url(#${id}-clip)"` : ''}/>${accent ?? ''}
</svg>`;
}
