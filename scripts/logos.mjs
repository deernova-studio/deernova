import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { ROOT, isMain } from './lib/files.mjs';

// AI brand logos live in packages/logos: logos.json lists them, svg/ holds three files for each.
//   <id>.svg        one color, currentColor: for UI that follows the text color
//   <id>-light.svg  for light backgrounds
//   <id>-dark.svg   for dark backgrounds
// The drawings come from LobeHub Icons (@lobehub/icons-static-svg, MIT). A logo they don't have is traced from
// a PNG in art/logos/<id>.png instead. `node scripts/logos.mjs` regenerates svg/ from those two sources.
export const LOGOS_DIR = 'packages/logos';
export const PNG_DIR = 'art/logos';
const LOBE = 'node_modules/@lobehub/icons-static-svg/icons';
const require = createRequire(import.meta.url);

export async function readLogoManifest(root = ROOT) {
  return JSON.parse(await readFile(join(root, LOGOS_DIR, 'logos.json'), 'utf8'));
}

export const logoList = manifest => manifest.groups.flatMap(group => group.logos.map(logo => ({ ...logo, group: group.id })));

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
export const MIN_CONTRAST = 1.3;
const readableOn = (svg, papers) => fixedColors(svg).every(color => papers.every(paper => contrast(color, paper) >= MIN_CONTRAST));

// One clean root element: the viewBox, paint attributes and a title; LobeHub's 1em size and inline style go.
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

// A PNG logo traced into filled paths: dark, opaque pixels become the shape, everything else is left out.
export async function tracePng(file) {
  const { PNG } = require('pngjs');
  const ImageTracer = require('imagetracerjs');
  const png = PNG.sync.read(await readFile(file));
  const { width, height, data } = png;
  const mono = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const ink = data[i + 3] > 127 && luminance(`#${[0, 1, 2].map(k => data[i + k].toString(16).padStart(2, '0')).join('')}`) < 0.5;
    mono.set(ink ? [0, 0, 0, 255] : [255, 255, 255, 255], i);
  }
  const traced = ImageTracer.imagedataToSVG({ width, height, data: mono }, {
    ltres: 0.5, qtres: 0.5, pathomit: 4, colorsampling: 0, numberofcolors: 2,
    pal: [{ r: 0, g: 0, b: 0, a: 255 }, { r: 255, g: 255, b: 255, a: 255 }], roundcoords: 2, linefilter: true, viewbox: true
  });
  const paths = [...traced.matchAll(/<path\b[^>]*\bfill="rgb\(0,0,0\)"[^>]*\bd="([^"]+)"[^>]*\/>/g)].map(match => match[1]);
  if (!paths.length) throw Error(`${file}: nothing dark to trace`);
  return `<svg viewBox="0 0 ${width} ${height}" fill="currentColor" fill-rule="evenodd"><path d="${paths.join(' ')}"/></svg>`;
}

// The three files for one logo, plus which drawing each theme uses ("color" or "mono") and where it came from.
export async function renderLogo(logo, { root = ROOT, theme } = {}) {
  theme ??= await themeColors(root);
  let mono;
  let color = null;
  let source;
  const png = join(root, PNG_DIR, `${logo.id}.png`);
  if (logo.png) {
    mono = await tracePng(png);
    source = `traced from ${PNG_DIR}/${logo.id}.png`;
  } else {
    const key = logo.lobe ?? logo.id;
    mono = await readFile(join(root, LOBE, `${key}.svg`), 'utf8');
    color = await readFile(join(root, LOBE, `${key}-color.svg`), 'utf8').catch(() => null);
    source = `LobeHub Icons "${key}"`;
  }
  const modes = {};
  const files = { [`${logo.id}.svg`]: normalize(mono, { name: logo.name, fill: 'currentColor' }) };
  for (const mode of ['light', 'dark']) {
    const forced = logo.theme?.[mode];
    const useColor = color && (forced ? forced === 'color' : readableOn(paintWith(color, theme.ink[mode]), theme.paper[mode]));
    modes[mode] = useColor ? 'color' : 'mono';
    const drawing = useColor ? normalize(paintWith(color, theme.ink[mode]), { name: logo.name }) : paintWith(files[`${logo.id}.svg`], theme.ink[mode]);
    files[`${logo.id}-${mode}.svg`] = drawing;
  }
  const note = `<!-- ${logo.name}: ${source} (see LICENSE-LOBEHUB). Logos are trademarks of their owners. -->\n`;
  for (const name of Object.keys(files)) files[name] = note + files[name];
  return { files, modes, hasColor: Boolean(color) };
}

export async function renderLogos(root = ROOT) {
  const manifest = await readLogoManifest(root);
  const theme = await themeColors(root);
  const logos = [];
  for (const logo of logoList(manifest)) logos.push({ ...logo, ...(await renderLogo(logo, { root, theme })) });
  return { manifest, logos };
}

const FORBIDDEN = /<(image|script|foreignObject|iframe)\b|\bon\w+=|javascript:|href="(?!#)/i;
export function problems({ manifest, logos }, files) {
  const out = [];
  const ids = logos.map(logo => logo.id);
  for (const id of ids) if (ids.indexOf(id) !== ids.lastIndexOf(id)) out.push(`${id}: listed twice`);
  const expected = new Set(logos.flatMap(logo => Object.keys(logo.files)));
  for (const file of files) if (!expected.has(file)) out.push(`${file}: not in logos.json`);
  for (const logo of logos) {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(logo.id)) out.push(`${logo.id}: id must be kebab-case`);
    if (!logo.name) out.push(`${logo.id}: missing name`);
    for (const [name, svg] of Object.entries(logo.files)) {
      if (FORBIDDEN.test(svg)) out.push(`${name}: only plain vector drawing is allowed`);
      if (!/viewBox="[\d.\s-]+"/.test(svg)) out.push(`${name}: missing viewBox`);
    }
    if (!logo.files[`${logo.id}.svg`].includes('fill="currentColor"')) out.push(`${logo.id}.svg: must follow currentColor`);
    if (fixedColors(logo.files[`${logo.id}.svg`]).length) out.push(`${logo.id}.svg: one-color file has fixed colors`);
    for (const mode of ['light', 'dark']) if (logo.files[`${logo.id}-${mode}.svg`].includes('currentColor')) out.push(`${logo.id}-${mode}.svg: themed file must not depend on currentColor`);
  }
  if (!manifest.source?.license) out.push('logos.json: name the source license');
  return out;
}

export async function buildLogos({ root = ROOT } = {}) {
  const set = await renderLogos(root);
  const found = problems(set, []);
  if (found.length) throw Error(`Logo set has problems:\n${found.join('\n')}`);
  const out = join(root, LOGOS_DIR, 'svg');
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });
  for (const logo of set.logos) for (const [name, svg] of Object.entries(logo.files)) await writeFile(join(out, name), svg);
  return set.logos;
}

// What the committed svg/ folder holds, for the site and the tests (no LobeHub package needed).
export async function readLogoFiles(root = ROOT) {
  const manifest = await readLogoManifest(root);
  const dir = join(root, LOGOS_DIR, 'svg');
  const files = (await readdir(dir)).filter(file => file.endsWith('.svg'));
  const logos = [];
  for (const logo of logoList(manifest)) {
    const own = {};
    for (const name of [`${logo.id}.svg`, `${logo.id}-light.svg`, `${logo.id}-dark.svg`]) own[name] = await readFile(join(dir, name), 'utf8').catch(() => '');
    logos.push({ ...logo, files: own });
  }
  return { manifest, logos, files };
}

if (isMain(import.meta.url)) {
  const logos = await buildLogos();
  const colored = mode => logos.filter(logo => logo.modes[mode] === 'color').length;
  console.log(`Built ${logos.length} logos into ${LOGOS_DIR}/svg (color drawing on light: ${colored('light')}, on dark: ${colored('dark')}).`);
  const mixed = logos.filter(logo => logo.hasColor && logo.modes.light !== logo.modes.dark).map(logo => `${logo.id} (light ${logo.modes.light}, dark ${logo.modes.dark})`);
  if (mixed.length) console.log(`One color on one theme only: ${mixed.join(', ')}`);
}
