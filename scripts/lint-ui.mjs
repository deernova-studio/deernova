import { readFile } from 'node:fs/promises';
import { isMain } from './lib/files.mjs';

// A first, deliberately small check of an HTML page against the Deernova rules that can be read from the source.
// It does not judge layout or taste; it counts the habits that pull a page away from the system:
// raw colours, sizes and fonts instead of tokens, decoration the style forbids, and coloured selection.
// Usage: node scripts/lint-ui.mjs page.html [more.html ...]   (exit code 1 when a page has errors)

const RULES = [
  { id: 'raw-color', level: 'error', what: '颜色没用设计变量', test: css => matches(css, /(?<![\w-])(#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\))/gi, line => !/^\s*--/.test(line)) },
  { id: 'raw-font-size', level: 'error', what: '字号没用设计变量', test: css => matches(css, /font(?:-size)?\s*:[^;]*?\b\d+(?:\.\d+)?(?:px|rem|em)\b[^;]*/gi, line => !/var\(--(type|button|field|segmented|tag|menu|tooltip|message|mention)/.test(line)) },
  { id: 'raw-font-family', level: 'error', what: '字体没用设计变量', test: css => matches(css, /font-family\s*:(?!\s*(?:var\(|inherit))[^;]+/gi) },
  { id: 'raw-spacing', level: 'warning', what: '间距没用设计变量', test: css => matches(css, /(?:^|[;{\s])(?:padding|margin|gap|row-gap|column-gap)(?:-[a-z]+)?\s*:[^;]*?\b(?:[3-9]|\d{2,})px\b[^;]*/gi) },
  { id: 'raw-radius', level: 'warning', what: '圆角没用设计变量', test: css => matches(css, /border-radius\s*:[^;]*?\b(?:[3-9]|\d{2,})px\b[^;]*/gi) },
  { id: 'raw-shadow', level: 'warning', what: '阴影没用设计变量', test: css => matches(css, /box-shadow\s*:\s*(?!var\(|none|0 0 0 var)[^;]*\d+px[^;]*/gi) },
  { id: 'gradient', level: 'error', what: '用了渐变（Deernova 不用渐变做装饰；用设计变量加 transparent 做的遮罩除外）', test: css => matches(css, /(?:linear|radial|conic)-gradient\([^;]*/gi, line => !/var\(--line\)|mask-image|transparent, var\(--ink\)|gradient\(\s*var\((--[\w-]+)\)\s*,\s*var\(\1\)\s*\)/.test(line) && !(/transparent/.test(line) && !/#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i.test(line))) },
  { id: 'heavy-weight', level: 'error', what: '字重超过 600', test: css => matches(css, /font-weight\s*:\s*(?:700|800|900|bold|bolder)\b/gi) },
  { id: 'emoji', level: 'error', what: '界面文字里有表情符号', test: (css, text) => matches(text, /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu) },
  { id: 'colored-selection', level: 'warning', what: '选中、当前项用了彩色（应该用 fill-selected）', test: css => matches(css, /(?:aria-selected|aria-current|aria-pressed|\.active|\.selected|:checked)[^{]*\{[^}]*(?:background|border-color)\s*:\s*var\(--(?:brand|link|success|warning|danger|info)\)/gi) },
  { id: 'no-tokens', level: 'error', what: '没有加载 tokens.css', test: (css, text, html) => /tokens\.css/.test(html) ? [] : ['<head> 里没有 tokens.css'] }
];

function matches(source, pattern, keep = () => true) {
  const found = [];
  for (const line of source.split('\n')) {
    for (const match of line.matchAll(pattern)) if (keep(line)) found.push(match[0].trim().slice(0, 80));
  }
  return found;
}

export function lintHtml(html) {
  const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(match => match[1]).join('\n')
    + '\n' + [...html.matchAll(/\sstyle="([^"]*)"/gi)].map(match => match[1]).join('\n');
  const text = html.replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ');
  const tokenUses = (css.match(/var\(--[a-z]/g) ?? []).length;
  const findings = RULES.map(rule => ({ ...rule, hits: rule.test(css, text, html) })).filter(rule => rule.hits.length);
  const errors = findings.filter(rule => rule.level === 'error').reduce((sum, rule) => sum + rule.hits.length, 0);
  const warnings = findings.filter(rule => rule.level === 'warning').reduce((sum, rule) => sum + rule.hits.length, 0);
  return { tokenUses, errors, warnings, findings };
}

if (isMain(import.meta.url)) {
  const files = process.argv.slice(2);
  if (!files.length) {
    console.error('Usage: node scripts/lint-ui.mjs page.html [more.html ...]');
    process.exit(2);
  }
  let failed = false;
  for (const file of files) {
    const report = lintHtml(await readFile(file, 'utf8'));
    failed ||= report.errors > 0;
    console.log(`\n${file}\n  设计变量引用 ${report.tokenUses} 处，错误 ${report.errors}，提醒 ${report.warnings}`);
    for (const rule of report.findings) {
      console.log(`  ${rule.level === 'error' ? '✖' : '!'} ${rule.what}（${rule.hits.length}）  例：${rule.hits.slice(0, 2).join('  |  ')}`);
    }
  }
  process.exit(failed ? 1 : 0);
}
