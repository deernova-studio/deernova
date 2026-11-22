import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { lintHtml } from '../scripts/lint-ui.mjs';

const PAGES_DIR = 'skills/deernova-page/references/pages';

test('the UI lint flags raw values, decoration and missing tokens', () => {
  const bad = lintHtml(`<style>
    .hero { background: linear-gradient(135deg, #6366f1, #a855f7); font-size: 13px; font-weight: 800; padding: 20px; }
    .tab[aria-selected="true"] { background: var(--link); }
  </style><p>上手吧 ✨</p>`);
  const ids = new Set(bad.findings.map(rule => rule.id));
  for (const id of ['raw-color', 'raw-font-size', 'gradient', 'heavy-weight', 'emoji', 'no-tokens', 'raw-spacing', 'colored-selection']) {
    assert.ok(ids.has(id), `lint should report ${id}`);
  }
  const good = lintHtml(`<link rel="stylesheet" href="tokens.css"><style>
    .row { padding: var(--space-2) var(--row-padding-x); color: var(--ink); font: var(--type-body); }
    .press { background: linear-gradient(var(--fill-hover), var(--fill-hover)); }
    .scrim { background: linear-gradient(transparent, color-mix(in srgb, var(--canvas) 80%, transparent)); }
  </style><p>同步到 iCloud</p>`);
  assert.equal(good.errors, 0, JSON.stringify(good.findings));
});

test('every page example passes the UI lint without errors', async () => {
  for (const name of (await readdir(PAGES_DIR)).filter(file => file.endsWith('.md'))) {
    const text = await readFile(join(PAGES_DIR, name), 'utf8');
    const css = [...text.matchAll(/```css\n([\s\S]*?)```/g)].map(match => match[1]).join('\n');
    const html = [...text.matchAll(/```html\n([\s\S]*?)```/g)].map(match => match[1]).join('\n');
    const report = lintHtml(`<link rel="stylesheet" href="tokens.css"><style>${css}</style>${html}`);
    const errors = report.findings.filter(rule => rule.level === 'error').map(rule => `${rule.what}: ${rule.hits.slice(0, 3).join(' | ')}`);
    assert.deepEqual(errors, [], `${name} breaks the UI lint`);
  }
});
