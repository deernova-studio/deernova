import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { ROOT, isMain } from './lib/files.mjs';

// Brand logos live in packages/logos in two sets: AI logos (models, AI products and platforms) and app logos
// (companies and everyday apps). logos.json lists them; svg/<set>/ holds three files for each:
//   <id>.svg        one color, currentColor: for UI that follows the text color
//   <id>-light.svg  for light backgrounds
//   <id>-dark.svg   for dark backgrounds
// Drawings come from open-source sets (see `sources` in logos.json): LobeHub Icons (MIT), Simple Icons (CC0) and
// SVG Logos (CC0). A logo none of them has is traced from a PNG in art/logos/<set>/<id>.png.
// `node scripts/logos.mjs` regenerates svg/ from those sources.
export const LOGOS_DIR = 'packages/logos';
export const PNG_DIR = 'art/logos';
export const MODES = ['light', 'dark'];
const LOBE = 'node_modules/@lobehub/icons-static-svg/icons';
const ICONIFY = 'node_modules/@iconify-json/logos/icons.json';
const require = createRequire(import.meta.url);

export async function readLogoManifest(root = ROOT) {
  return JSON.parse(await readFile(join(root, LOGOS_DIR, 'logos.json'), 'utf8'));
}

export const logoList = manifest => manifest.sets.flatMap(set => set.groups.flatMap(group =>
  group.logos.map(logo => ({ ...logo, set: set.id, group: group.id }))));
export const fileNames = logo => [`${logo.id}.svg`, ...MODES.map(mode => `${logo.id}-${mode}.svg`)];

// Ink and paper come from the style tokens, so a logo drawn in one color matches the text around it.
async function themeColors(root) {
  const tokens = JSON.parse(await readFile(join(root, 'skills/deernova-style/assets/tokens.json'), 'utf8'));
  const flat = JSON.stringify(tokens);
  const hex = name => flat.match(new RegExp(`"name":"${name}","value":"(#[0-9a-f]{6})"`, 'i'))?.[1];
  const semantic = name => {
    const value = flat.match(new RegExp(`"name":"${name}","value":\\{"light":"\\{([\\w-]+)\\}","dark":"\\{([\\w-]+)\\}"\\}`));
    if (!value) throw Error(`Token ${name} not found`);
    return { light: hex(value[1]), dark: hex(value[2]) };
  };
  const ink = semantic('ink');
  const papers = ['canvas', 'surface'].map(semantic);
  return { ink, paper: { light: papers.map(paper => paper.light), dark: papers.map(paper => paper.dark) } };
}

const luminance = hex => {
  const value = hex.length === 4 ? hex.slice(1).split('').map(c => c + c).join('') : hex.slice(1, 7);
  const [r, g, b] = [0, 2, 4].map(i => parseInt(value.slice(i, i + 2), 16) / 255)
    .map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
// Fixed colors in a drawing: fills, strokes and gradient stops. currentColor is not fixed, it takes the ink.
export const fixedColors = svg => [...new Set([...svg.matchAll(/(?:fill|stroke|stop-color)(?:="|:\s*)(#[0-9a-f]{3,8})\b/gi)].map(match => match[1].toLowerCase()))];
// The color drawing works on a paper when every fixed color stands out from it; otherwise that theme gets one color.
// White details on a light paper, or black ones on a dark paper, are fine when the logo also has a color that
// stands out: they sit inside it (the play button in YouTube, the ring in Chrome). A logo that is only white or
// only black still gets one color.
export const MIN_CONTRAST = 1.3;
const DETAIL_CONTRAST = 2;
const PAPER_LIKE = 1.6;
function readableOn(svg, papers) {
  const colors = fixedColors(svg);
  const stands = color => papers.every(paper => contrast(color, paper) >= MIN_CONTRAST);
  const paperLike = color => papers.every(paper => contrast(color, paper) < PAPER_LIKE);
  const anchored = colors.some(color => papers.every(paper => contrast(color, paper) >= DETAIL_CONTRAST));
  return colors.every(color => stands(color) || (anchored && paperLike(color)));
}

// One clean root element: the viewBox, paint attributes and a title; source sizes, roles and inline styles go.
function normalize(svg, { name, fill }) {
  const root = svg.match(/<svg\b([^>]*)>/);
  if (!root) throw Error(`${name}: not an SVG`);
  const attrs = Object.fromEntries([...root[1].matchAll(/([\w:-]+)="([^"]*)"/g)].map(match => [match[1], match[2]]));
  const viewBox = attrs.viewBox ?? '0 0 24 24';
  const [, , w, h] = viewBox.split(/[\s,]+/).map(Number);
  const keep = ['fill-rule', 'clip-rule'].filter(key => attrs[key]).map(key => ` ${key}="${attrs[key]}"`).join('');
  const paint = fill ?? attrs.fill;
  const inner = svg.slice(root.index + root[0].length, svg.lastIndexOf('</svg>')).replace(/<title>[\s\S]*?<\/title>/, '').trim();
  const width = Math.round((24 * w) / h * 100) / 100;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="24"${paint ? ` fill="${paint}"` : ''}${keep}><title>${name}</title>${inner}</svg>\n`;
}

const paintWith = (svg, color) => svg.replaceAll('currentColor', color);

// A multicolor drawing turned into one color: every paint becomes currentColor and the gradients go.
export function flatten(svg) {
  return svg.replace(/<defs>[\s\S]*?<\/defs>/g, '').replace(/<(linear|radial)Gradient\b[\s\S]*?<\/\1Gradient>/g, '')
    .replace(/\b(fill|stroke)="(?!none)[^"]*"/g, '$1="currentColor"').replace(/\b(fill|stroke):\s*(?!none)[^;"]+/g, '$1:currentColor');
}

let simpleIcons;
function simpleIcon(slug) {
  simpleIcons ??= new Map(Object.values(require('simple-icons')).filter(icon => icon?.slug).map(icon => [icon.slug, icon]));
  const icon = simpleIcons.get(slug);
  if (!icon) throw Error(`Simple Icons has no "${slug}"`);
  return icon;
}

const NAMED = { red: '#ff0000', white: '#ffffff', black: '#000000' };
let iconify;
async function iconifyLogo(root, name) {
  iconify ??= JSON.parse(await readFile(join(root, ICONIFY), 'utf8'));
  const parent = iconify.aliases?.[name]?.parent;
  const icon = iconify.icons[name] ?? iconify.icons[parent];
  if (!icon) throw Error(`SVG Logos has no "${name}"`);
  const width = icon.width ?? iconify.width ?? 16;
  const height = icon.height ?? iconify.height ?? 16;
  // A few bodies use color names; spelled as hex they take part in the contrast check like any other color.
  const body = icon.body.replace(/\b(fill|stroke|stop-color)="(red|white|black)"/g, (_, key, name) => `${key}="${NAMED[name]}"`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.left ?? 0} ${icon.top ?? 0} ${width} ${height}">${body}</svg>`;
}

// A PNG logo traced into a color drawing and a one-color one. The background is what the corners show: transparent,
// or near-white (removed). When the corners are part of the logo, it is an app icon filling its square, and both
// drawings are clipped to a rounded square. In the one-color drawing, pixels lighter than `threshold` are holes,
// so a white glyph on a colored plate stays visible.
const hex2 = n => n.toString(16).padStart(2, '0');
const rgbHex = (r, g, b) => `#${hex2(r)}${hex2(g)}${hex2(b)}`;
export async function tracePng(file, { threshold = 0.85, colors = 8 } = {}) {
  const { PNG } = require('pngjs');
  const ImageTracer = require('imagetracerjs');
  const { width, height, data } = PNG.sync.read(await readFile(file));
  const at = (x, y) => (y * width + x) * 4;
  const corners = [at(0, 0), at(width - 1, 0), at(0, height - 1), at(width - 1, height - 1)];
  const transparent = corners.some(i => data[i + 3] < 128);
  const lum = i => luminance(rgbHex(data[i], data[i + 1], data[i + 2]));
  const whiteBackground = !transparent && corners.every(i => lum(i) > 0.9);
  const icon = !transparent && !whiteBackground;
  // On a white background the off-white rim of an icon goes too; white inside the logo becomes a cut-out.
  const isBackground = i => (transparent ? data[i + 3] < 128 : whiteBackground && lum(i) > 0.8);
  const color = Buffer.alloc(data.length);
  const mono = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const background = isBackground(i);
    color.set(background ? [255, 255, 255, 0] : [data[i], data[i + 1], data[i + 2], 255], i);
    mono.set(!background && lum(i) < threshold ? [0, 0, 0, 255] : [255, 255, 255, 255], i);
  }
  const options = { ltres: 1, qtres: 1, pathomit: Math.max(4, Math.round(width / 64)), roundcoords: 1, linefilter: true, viewbox: true };
  const clip = icon ? `<clipPath id="icon"><rect width="${width}" height="${height}" rx="${Math.round(width * 0.225)}"/></clipPath>` : '';
  const wrap = (body, root = '') => `<svg viewBox="0 0 ${width} ${height}"${root}>${clip}${icon ? `<g clip-path="url(#icon)">${body}</g>` : body}</svg>`;
  // Color: each quantized layer is a path in its own color; transparent layers are dropped.
  const traced = ImageTracer.imagedataToSVG({ width, height, data: color }, { ...options, numberofcolors: colors, colorquantcycles: 3, blurradius: 0 });
  const layers = [...traced.matchAll(/<path\b[^>]*\/>/g)].map(match => match[0]).filter(path => !/opacity="0(\.0+)?"/.test(path)).map(path => {
    const [, r, g, b] = path.match(/fill="rgb\((\d+),(\d+),(\d+)\)"/).map(Number);
    const d = path.match(/\bd="([^"]+)"/)[1];
    const paint = rgbHex(r, g, b);
    return `<path fill="${paint}" stroke="${paint}" stroke-width="1" d="${d}"/>`;
  });
  // One color: dark, opaque pixels become the shape.
  const monoTraced = ImageTracer.imagedataToSVG({ width, height, data: mono }, {
    ...options, colorsampling: 0, numberofcolors: 2, pal: [{ r: 0, g: 0, b: 0, a: 255 }, { r: 255, g: 255, b: 255, a: 255 }]
  });
  const paths = [...monoTraced.matchAll(/<path\b[^>]*\bfill="rgb\(0,0,0\)"[^>]*\bd="([^"]+)"[^>]*\/>/g)].map(match => match[1]);
  if (!paths.length || !layers.length) throw Error(`${file}: nothing to trace`);
  return {
    color: wrap(layers.join('')),
    mono: wrap(`<path d="${paths.join(' ')}"/>`, ' fill="currentColor" fill-rule="evenodd"')
  };
}

// Where a logo's one-color and color drawings come from. A LobeHub logo has both; a Simple Icons logo is one path
// plus its brand color; SVG Logos only has color, so it gives the color drawing and Simple Icons (or flattening) the one-color one.
async function drawings(logo, set, root) {
  if (logo.png) {
    const options = typeof logo.png === 'object' ? logo.png : {};
    const traced = await tracePng(join(root, PNG_DIR, set.id, `${logo.id}.png`), options);
    return { ...traced, source: `traced from ${PNG_DIR}/${set.id}/${logo.id}.png${logo.from ? ` (${logo.from})` : ''}` };
  }
  const lobe = logo.lobe ?? (set.source === 'lobe' && !logo.simple && !logo.logos ? logo.id : null);
  if (lobe) {
    return {
      mono: await readFile(join(root, LOBE, `${lobe}.svg`), 'utf8'),
      color: await readFile(join(root, LOBE, `${lobe}-color.svg`), 'utf8').catch(() => null),
      source: `LobeHub Icons "${lobe}", MIT`
    };
  }
  const color = logo.logos ? await iconifyLogo(root, logo.logos) : null;
  if (logo.mono === 'flatten') {
    if (!color) throw Error(`${logo.id}: flatten needs a color drawing`);
    return { mono: flatten(color), color, source: `SVG Logos "${logo.logos}", CC0` };
  }
  const icon = simpleIcon(logo.simple ?? logo.id);
  const mono = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="${icon.path}"/></svg>`;
  return {
    mono,
    color: color ?? `<svg viewBox="0 0 24 24" fill="#${icon.hex.toLowerCase()}"><path d="${icon.path}"/></svg>`,
    source: color ? `Simple Icons "${icon.slug}" and SVG Logos "${logo.logos}", CC0` : `Simple Icons "${icon.slug}", CC0`
  };
}

// The three files for one logo, plus which drawing each theme uses ("color" or "mono") and where it came from.
export async function renderLogo(logo, { root = ROOT, theme, set = { id: logo.set ?? 'ai', source: 'lobe' } } = {}) {
  theme ??= await themeColors(root);
  const { mono, color, source } = await drawings(logo, set, root);
  const modes = {};
  const files = { [`${logo.id}.svg`]: normalize(mono, { name: logo.name, fill: 'currentColor' }) };
  for (const mode of MODES) {
    const forced = logo.theme?.[mode];
    const useColor = color && (forced ? forced === 'color' : readableOn(paintWith(color, theme.ink[mode]), theme.paper[mode]));
    modes[mode] = useColor ? 'color' : 'mono';
    files[`${logo.id}-${mode}.svg`] = useColor ? normalize(paintWith(color, theme.ink[mode]), { name: logo.name }) : paintWith(files[`${logo.id}.svg`], theme.ink[mode]);
  }
  const note = `<!-- ${logo.name}: ${source}. Logos are trademarks of their owners. -->\n`;
  for (const name of Object.keys(files)) files[name] = note + files[name];
  return { files, modes, hasColor: Boolean(color) };
}

export async function renderLogos(root = ROOT) {
  const manifest = await readLogoManifest(root);
  const theme = await themeColors(root);
  const logos = [];
  for (const logo of logoList(manifest)) {
    const set = manifest.sets.find(item => item.id === logo.set);
    logos.push({ ...logo, ...(await renderLogo(logo, { root, theme, set })) });
  }
  return { manifest, logos };
}

const FORBIDDEN = /<(image|script|foreignObject|iframe)\b|\bon\w+=|javascript:|href="(?!#)/i;
// `files` are paths inside svg/, such as "app/google.svg".
export function problems({ manifest, logos }, files) {
  const out = [];
  for (const set of manifest.sets) {
    const ids = logos.filter(logo => logo.set === set.id).map(logo => logo.id);
    for (const id of ids) if (ids.indexOf(id) !== ids.lastIndexOf(id)) out.push(`${set.id}/${id}: listed twice`);
  }
  const expected = new Set(logos.flatMap(logo => Object.keys(logo.files).map(name => `${logo.set}/${name}`)));
  for (const file of files) if (!expected.has(file)) out.push(`${file}: not in logos.json`);
  for (const logo of logos) {
    const where = `${logo.set}/${logo.id}`;
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(logo.id)) out.push(`${where}: id must be kebab-case`);
    if (!logo.name) out.push(`${where}: missing name`);
    for (const [name, svg] of Object.entries(logo.files)) {
      if (FORBIDDEN.test(svg)) out.push(`${logo.set}/${name}: only plain vector drawing is allowed`);
      if (!/viewBox="[\d.\s-]+"/.test(svg)) out.push(`${logo.set}/${name}: missing viewBox`);
    }
    const mono = logo.files[`${logo.id}.svg`];
    if (!mono.includes('fill="currentColor"')) out.push(`${where}.svg: must follow currentColor`);
    if (fixedColors(mono).length) out.push(`${where}.svg: one-color file has fixed colors`);
    for (const mode of MODES) if (logo.files[`${logo.id}-${mode}.svg`].includes('currentColor')) out.push(`${where}-${mode}.svg: themed file must not depend on currentColor`);
  }
  for (const set of manifest.sets) if (!manifest.sources?.[set.source]) out.push(`${set.id}: unknown default source ${set.source}`);
  for (const [id, source] of Object.entries(manifest.sources ?? {})) if (!source.license) out.push(`sources.${id}: name the license`);
  return out;
}

export async function buildLogos({ root = ROOT } = {}) {
  const set = await renderLogos(root);
  const found = problems(set, []);
  if (found.length) throw Error(`Logo set has problems:\n${found.join('\n')}`);
  const out = join(root, LOGOS_DIR, 'svg');
  await rm(out, { recursive: true, force: true });
  for (const { id } of set.manifest.sets) await mkdir(join(out, id), { recursive: true });
  for (const logo of set.logos) for (const [name, svg] of Object.entries(logo.files)) await writeFile(join(out, logo.set, name), svg);
  return set.logos;
}

// What the committed svg/ folder holds, for the site and the tests (no source packages needed).
export async function readLogoFiles(root = ROOT) {
  const manifest = await readLogoManifest(root);
  const dir = join(root, LOGOS_DIR, 'svg');
  const files = [];
  for (const { id } of manifest.sets) {
    for (const file of await readdir(join(dir, id)).catch(() => [])) if (file.endsWith('.svg')) files.push(`${id}/${file}`);
  }
  const logos = [];
  for (const logo of logoList(manifest)) {
    const own = {};
    for (const name of fileNames(logo)) own[name] = await readFile(join(dir, logo.set, name), 'utf8').catch(() => '');
    logos.push({ ...logo, files: own });
  }
  return { manifest, logos, files };
}

if (isMain(import.meta.url)) {
  const logos = await buildLogos();
  for (const set of [...new Set(logos.map(logo => logo.set))]) {
    const own = logos.filter(logo => logo.set === set);
    const colored = mode => own.filter(logo => logo.modes[mode] === 'color').length;
    console.log(`Built ${own.length} ${set} logos into ${LOGOS_DIR}/svg/${set} (color drawing on light: ${colored('light')}, on dark: ${colored('dark')}).`);
  }
  const mixed = logos.filter(logo => logo.hasColor && logo.modes.light !== logo.modes.dark).map(logo => `${logo.set}/${logo.id} (light ${logo.modes.light}, dark ${logo.modes.dark})`);
  if (mixed.length) console.log(`Color on one theme only: ${mixed.join(', ')}`);
}
