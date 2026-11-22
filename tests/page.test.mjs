import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const PAGE_DIR = 'skills/deernova-page';
const PAGES_DIR = join(PAGE_DIR, 'references/pages');
// Every page doc opens with one paragraph on what the page is for, then these sections in this order.
// Pages that only open in a browser (the official site, shared links) have no native sections.
const SECTIONS = ['区块', '网页', 'Mac 应用', 'iPhone 应用', '状态', '不要'];
const WEB_ONLY_SECTIONS = SECTIONS.filter(name => !name.endsWith('应用'));

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function markdownFiles(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await markdownFiles(path));
    else result.push(path);
  }
  return result;
}

test('the page skill has the frontmatter agents use to find it and defers to style', async () => {
  const text = await readFile(join(PAGE_DIR, 'SKILL.md'), 'utf8');
  const frontmatter = text.match(/^---\n([\s\S]*?)\n---\n/)?.[1];
  assert.ok(frontmatter, 'missing frontmatter');
  assert.match(frontmatter, /^name: deernova-page$/m);
  const description = frontmatter.match(/^description: (.+)$/m)?.[1] ?? '';
  assert.ok(description.length > 40 && description.length <= 1024, 'description must say when to use the skill and stay under 1024 characters');
  assert.match(description, /deernova-style/, 'description must point at the style skill for tokens and components');
});

test('the page skill is Markdown only and defines no tokens of its own', async () => {
  const top = (await readdir(PAGE_DIR)).sort();
  assert.ok(top.every(name => ['SKILL.md', 'references'].includes(name)), `unexpected entries: ${top}`);
  for (const file of await markdownFiles(PAGE_DIR)) {
    assert.match(file, /\.md$/);
    const text = await readFile(file, 'utf8');
    assert.doesNotMatch(text, /^\s*--[a-z-]+\s*:/m, `${file} declares a CSS variable; tokens belong to deernova-style`);
    for (const [, target] of text.matchAll(/\]\(([^)#\s]+)(?:#[^)]*)?\)/g)) {
      if (/^https?:/.test(target)) continue;
      await stat(join(dirname(file), target));
    }
  }
});

test('the page table lists every page doc and each doc keeps the shared section order', async () => {
  const skill = await readFile(join(PAGE_DIR, 'SKILL.md'), 'utf8');
  const table = skill.split('## 页面\n')[1].split('\n## ')[0];
  const linked = [...table.matchAll(/\]\(references\/pages\/([^)]+\.md)\)/g)].map(match => match[1]).sort();
  const docs = (await exists(PAGES_DIR)) ? (await readdir(PAGES_DIR)).filter(name => name.endsWith('.md')).sort() : [];
  assert.deepEqual(linked, docs, 'SKILL.md must list each page doc once');
  for (const name of docs) {
    const text = await readFile(join(PAGES_DIR, name), 'utf8');
    const headings = [...text.matchAll(/^## (.+)$/gm)].map(match => match[1]);
    assert.ok([SECTIONS, WEB_ONLY_SECTIONS].some(order => order.join() === headings.join()), `${name} sections: ${headings.join(', ')}`);
    assert.match(text.split('\n## ')[0], /^# .+\n\n\S/, `${name} opens with a title and one paragraph on what the page is for`);
  }
});

test('page example CSS only uses variables that deernova-style defines', async () => {
  const tokensCss = await readFile('skills/deernova-style/assets/tokens.css', 'utf8');
  const defined = new Set([...tokensCss.matchAll(/(--[a-z0-9-]+)\s*:/g)].map(match => match[1]));
  const docs = (await exists(PAGES_DIR)) ? (await readdir(PAGES_DIR)).filter(name => name.endsWith('.md')) : [];
  for (const name of docs) {
    const text = await readFile(join(PAGES_DIR, name), 'utf8');
    for (const [, css] of text.matchAll(/```css\n([\s\S]*?)```/g)) {
      for (const [, variable] of css.matchAll(/var\((--[a-z0-9-]+)/g)) assert.ok(defined.has(variable), `${name} uses undefined ${variable}`);
    }
  }
});

test('the display serif subset covers every Chinese character the website examples use', async () => {
  const covered = new Set(await readFile('apps/website/assets/fonts/noto-serif-sc-600.txt', 'utf8'));
  await stat('apps/website/assets/fonts/noto-serif-sc-600.woff2');
  const styleDocs = (await readdir('skills/deernova-style/references', { recursive: true }))
    .filter(name => name.endsWith('.md')).map(name => join('skills/deernova-style/references', name));
  const sources = [...((await exists(PAGES_DIR)) ? (await readdir(PAGES_DIR)).filter(name => name.endsWith('.md')).map(name => join(PAGES_DIR, name)) : []),
    ...styleDocs];
  const cjk = /[　-〿㐀-䶿一-鿿＀-￯]/gu;
  for (const file of sources) {
    const text = await readFile(file, 'utf8');
    for (const [, html] of text.matchAll(/```html\n([\s\S]*?)```/g)) {
      const missing = [...new Set(html.match(cjk) ?? [])].filter(char => !covered.has(char));
      assert.deepEqual(missing, [], `${file} uses characters the font subset lacks; run scripts/subset-display-font.py`);
    }
  }
});

test('the page table groups every page under a category heading', async () => {
  const skill = await readFile(join(PAGE_DIR, 'SKILL.md'), 'utf8');
  const table = skill.split('## 页面\n')[1].split('\n## ')[0];
  const groups = table.split(/^### /m).slice(1);
  assert.ok(groups.length >= 2, 'pages are grouped with ### headings');
  for (const group of groups) assert.match(group, /\]\(references\/pages\/[\w-]+\.md\)/, `group ${group.split('\n')[0]} lists pages`);
});

test('page examples only borrow classes from pages the skill lists as shared', async () => {
  const skill = await readFile('skills/deernova-page/SKILL.md', 'utf8');
  const sharedSection = skill.split('## 几页共用的写法')[1]?.split('\n## ')[0] ?? '';
  const shared = new Set([...sharedSection.matchAll(/references\/pages\/([\w-]+)\.md/g)].map(match => match[1]));
  const classesIn = (text, fence) => new Set([...text.matchAll(new RegExp('```' + fence + '\\n([\\s\\S]*?)```', 'g'))]
    .flatMap(([, block]) => fence === 'css' ? [...block.matchAll(/\.(dn-[a-z0-9-]+)/g)].map(m => m[1])
      : [...block.matchAll(/class="([^"]+)"/g)].flatMap(m => m[1].split(/\s+/)).filter(name => name.startsWith('dn-'))));
  const styleClasses = new Set();
  for (const name of await readdir('skills/deernova-style/references', { recursive: true })) {
    if (name.endsWith('.md')) for (const c of classesIn(await readFile(join('skills/deernova-style/references', name), 'utf8'), 'css')) styleClasses.add(c);
  }
  const pages = new Map();
  for (const name of (await readdir(PAGES_DIR)).filter(file => file.endsWith('.md'))) {
    const text = await readFile(join(PAGES_DIR, name), 'utf8');
    pages.set(name.replace('.md', ''), { css: classesIn(text, 'css'), html: classesIn(text, 'html') });
  }
  const loose = [];
  for (const [page, { css, html }] of pages) {
    for (const name of html) {
      if (styleClasses.has(name) || css.has(name) || name === 'dn-choice-label') continue;
      const owners = [...pages].filter(([, other]) => other.css.has(name)).map(([owner]) => owner);
      if (!owners.some(owner => shared.has(owner))) loose.push(`${page}: ${name} (${owners.join(', ') || 'no CSS anywhere'})`);
    }
  }
  assert.deepEqual(loose, [], 'classes borrowed from pages that are not listed under 几页共用的写法');
});
