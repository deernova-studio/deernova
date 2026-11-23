import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { LOGOS_DIR, fixedColors, problems, readLogoFiles, renderLogo, renderLogos } from '../scripts/logos.mjs';
import { PACKAGES } from '../scripts/publish.mjs';

const require = createRequire(import.meta.url);

test('every listed logo has a one-color, a light and a dark SVG, and nothing else is in svg/', async () => {
  const set = await readLogoFiles();
  assert.deepEqual(problems(set, set.files), []);
  assert.equal(set.files.length, set.logos.length * 3);
  for (const logo of set.logos) for (const [name, svg] of Object.entries(logo.files)) {
    assert.ok(svg, `${name} is missing; run npm run logos`);
    assert.match(svg, new RegExp(`<title>${logo.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</title>`), `${name} is named for screen readers`);
  }
});

test('the committed logos are exactly what the sources produce', async () => {
  const { logos } = await renderLogos();
  const committed = await readLogoFiles();
  for (const logo of logos) {
    const files = committed.logos.find(item => item.id === logo.id).files;
    for (const [name, svg] of Object.entries(logo.files)) assert.equal(files[name], svg, `${name} is out of date; run npm run logos`);
  }
});

test('themed files only keep brand colors that stay visible on that theme', async () => {
  const { logos } = await renderLogos();
  for (const logo of logos) {
    for (const mode of ['light', 'dark']) {
      const svg = logo.files[`${logo.id}-${mode}.svg`];
      if (logo.modes[mode] === 'mono') assert.equal(fixedColors(svg).length, 1, `${logo.id}-${mode}.svg is drawn in the ink color only`);
    }
  }
  const openai = logos.find(logo => logo.id === 'openai');
  assert.match(openai.files['openai-light.svg'], /fill="#171717"/);
  assert.match(openai.files['openai-dark.svg'], /fill="#ededed"/);
});

test('a logo without an SVG is traced from its PNG', async () => {
  const root = await mkdtemp(join(tmpdir(), 'deernova-logos-'));
  try {
    await mkdir(join(root, 'skills/deernova-style/assets'), { recursive: true });
    await cp('skills/deernova-style/assets/tokens.json', join(root, 'skills/deernova-style/assets/tokens.json'));
    await mkdir(join(root, 'art/logos'), { recursive: true });
    const { PNG } = require('pngjs');
    const png = new PNG({ width: 64, height: 64 });
    for (let y = 0; y < 64; y++) for (let x = 0; x < 64; x++) {
      const d = (x - 32) ** 2 + (y - 32) ** 2;
      png.data.set(d < 400 && d > 100 ? [20, 20, 20, 255] : [0, 0, 0, 0], (y * 64 + x) * 4);
    }
    await writeFile(join(root, 'art/logos/ring.png'), PNG.sync.write(png));
    const { files, modes } = await renderLogo({ id: 'ring', name: 'Ring', png: true }, { root });
    assert.deepEqual(modes, { light: 'mono', dark: 'mono' });
    assert.match(files['ring.svg'], /viewBox="0 0 64 64"[^>]*fill="currentColor"[^>]*fill-rule="evenodd"/);
    assert.match(files['ring.svg'], /<path d="M [\d.]+ [\d.]+ [^"]*Z M /, 'the hole is kept as a second subpath');
    assert.match(files['ring-dark.svg'], /fill="#ededed"/);
    assert.deepEqual(problems({ manifest: { source: { license: 'MIT' } }, logos: [{ id: 'ring', name: 'Ring', files }] }, Object.keys(files)), []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('the logos package ships its files and both licenses, and is published with the others', async () => {
  const pkg = JSON.parse(await readFile(join(LOGOS_DIR, 'package.json'), 'utf8'));
  assert.equal(pkg.name, '@deernova/logos');
  for (const file of ['svg', 'logos.json', 'LICENSE', 'LICENSE-LOBEHUB']) assert.ok(pkg.files.includes(file), `ships ${file}`);
  assert.match(await readFile(join(LOGOS_DIR, 'LICENSE-LOBEHUB'), 'utf8'), /Copyright \(c\) \d{4} LobeHub/);
  assert.ok(PACKAGES.includes('logos'));
});

test('the Material page shows icons, loaders and every logo; the Style guide no longer does', async () => {
  const material = await readFile('dist/material.html', 'utf8');
  const guide = await readFile('dist/guide.html', 'utf8');
  for (const id of ['package-icons', 'package-loaders', 'package-logos']) {
    assert.match(material, new RegExp(`id="${id}"`));
    assert.doesNotMatch(guide, new RegExp(`id="${id}"`));
  }
  const { logos } = await readLogoFiles();
  for (const logo of logos) for (const mode of ['light', 'dark']) {
    assert.ok(material.includes(`src="assets/logos/${logo.id}-${mode}.svg"`), `${logo.id} ${mode} is on the page`);
    await readFile(join('dist/assets/logos', `${logo.id}-${mode}.svg`));
  }
  assert.match(await readFile('dist/index.html', 'utf8'), /href="material.html"/);
});
