import { join } from 'node:path';
import { escape, read } from './files.mjs';
import { renderIconsDoc } from './icon-catalog.mjs';
import { renderLoadersDoc } from './loader-page.mjs';
import { productMark } from './marks.mjs';
import { readIcons } from '../icons.mjs';
import { LOGOS_DIR, readLogoFiles } from '../logos.mjs';

// The Material page: the assets that sit next to the two skills. Icons and loaders ship in @deernova/icons,
// logos in @deernova/logos. The logo files are served from packages/logos/svg at assets/logos/.
const version = async (root, name) => JSON.parse(await read(join(root, 'packages', name, 'package.json'))).version;

function renderLogosDoc({ manifest, logos }, logoVersion) {
  const card = logo => `<li><span class="logo-art">
<img class="shot-light" src="assets/logos/${logo.set}/${logo.id}-light.svg" alt="" width="32" height="32" loading="lazy">
<img class="shot-dark" src="assets/logos/${logo.set}/${logo.id}-dark.svg" alt="" width="32" height="32" loading="lazy">
</span><span class="logo-name">${escape(logo.name)}</span>${logo.for ? `<span class="logo-for">${escape(logo.for)}</span>` : ''}<code>${logo.id}</code></li>`;
  const count = id => logos.filter(logo => logo.set === id).length;
  const sets = manifest.sets.map(set => `<h3 id="package-logos-${set.id}">${escape(set.title)}</h3>
<p>${set.id === 'ai' ? 'AI 模型、AI 产品和 AI 平台' : '公司和日常应用'}，共 ${count(set.id)} 个，文件在 <code>svg/${set.id}/</code>。</p>
${set.groups.map(group => `<h4 class="logo-group-title" id="package-logos-${set.id}-${group.id}">${escape(group.title)}</h4>
<ul class="logo-grid">${logos.filter(logo => logo.set === set.id && logo.group === group.id).map(card).join('')}</ul>`).join('\n')}`).join('\n');
  const credits = Object.values(manifest.sources).map(source =>
    `<a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(source.name)}</a>（${escape(source.license)}）`).join('、');
  return `<section class="doc doc-package" id="package-logos" aria-labelledby="package-logos-title">
<header class="doc-head"><h2 id="package-logos-title">Logo</h2><code class="doc-path">@deernova/logos</code></header>
<div class="doc-body">
<p class="lede">${logos.length} 个 logo，分两套：AI logo（${count('ai')} 个）和应用 logo（${count('app')} 个）。每个都有浅色、深色和单色三个 SVG：浅色和深色版在看得清时保留品牌色，看不清时换成和文字一样的墨色；单色版跟随文字颜色。这一页跟着外观切换，显示的就是对应主题的文件。</p>
<h3 id="package-logos-install">安装和使用</h3>
<pre><code>npm install @deernova/logos</code></pre>
<p>按主题换文件，用 <code>&lt;picture&gt;</code>：</p>
<pre><code>&lt;picture&gt;
  &lt;source srcset=&quot;@deernova/logos/svg/ai/claude-dark.svg&quot; media=&quot;(prefers-color-scheme: dark)&quot;&gt;
  &lt;img src=&quot;@deernova/logos/svg/ai/claude-light.svg&quot; alt=&quot;Claude&quot; width=&quot;24&quot; height=&quot;24&quot;&gt;
&lt;/picture&gt;</code></pre>
<div class="table-wrap"><table><thead><tr><th>文件</th><th>用在</th></tr></thead><tbody>
<tr><td><code>svg/&lt;套&gt;/&lt;id&gt;-light.svg</code></td><td>浅色背景</td></tr>
<tr><td><code>svg/&lt;套&gt;/&lt;id&gt;-dark.svg</code></td><td>深色背景</td></tr>
<tr><td><code>svg/&lt;套&gt;/&lt;id&gt;.svg</code></td><td>单色，<code>currentColor</code>。Deernova 以黑白灰为主，模型选择器、设置页、列表里优先用它，彩色版留给需要认出品牌的地方，比如官网的「支持的模型」</td></tr>
</tbody></table></div>
${sets}
<p class="doc-credit">图形来自社区开源的 ${credits}；这些都没有的，从 Wikimedia Commons、官网图标或 App Store 图标的 PNG 描成矢量。logo 是各公司的商标，只用来指代对应的产品。v${logoVersion}，文件在 <code>${LOGOS_DIR}/svg</code>。</p>
</div>
</section>`;
}

export async function renderMaterialGuide(root) {
  const { icons } = await readIcons(root);
  const logos = await readLogoFiles(root);
  const [iconVersion, logoVersion] = await Promise.all([version(root, 'icons'), version(root, 'logos')]);
  const nav = ['<a class="toc-top" href="#overview">总览</a>',
    '<p class="toc-group">图标与动效</p><ol><li><a href="#package-icons">图标</a></li><li><a href="#package-loaders">加载动效</a></li></ol><p class="toc-group">Logo</p><ol><li><a href="#package-logos">安装和使用</a></li><li><a href="#package-logos-ai">AI logo</a></li><li><a href="#package-logos-app">应用 logo</a></li></ol>'];
  const packages = [
    ['图标', '@deernova/icons', iconVersion, `${icons.length} 个线性图标，24×24 网格、1.75 描边，颜色跟随文字。`, '#package-icons'],
    ['加载动效', '@deernova/icons/loaders', iconVersion, 'AI 正在思考、搜索、读取、写入时的加载动效，和图标同一个包。', '#package-loaders'],
    ['Logo', '@deernova/logos', logoVersion, `${logos.logos.length} 个 logo：AI 模型和工具一套，公司和常用应用一套；浅色、深色、单色各一份 SVG。`, '#package-logos']
  ];
  const docs = [`<section class="doc doc-overview" id="overview" aria-labelledby="overview-title">
<header class="overview-head"><h1 id="overview-title">Deernova Material</h1><p class="lede">做界面用的素材：图标、加载动效和 logo。什么时候用、多大、什么颜色，以 <a href="guide.html">Style</a> 为准。</p></header>
<div class="doc-body"><div class="table-wrap"><table><thead><tr><th>素材</th><th>npm 包</th><th>内容</th></tr></thead><tbody>
${packages.map(([name, pkg, ver, text, href]) => `<tr><td><a href="${href}">${name}</a></td><td><code>${pkg}</code> <span class="doc-version">v${ver}</span></td><td>${text}</td></tr>`).join('\n')}
</tbody></table></div></div>
</section>`];
  docs.push(await renderIconsDoc(root));
  docs.push(renderLoadersDoc(icons.find(icon => icon.name === 'thinking').body.join('')));
  docs.push(renderLogosDoc(logos, logoVersion));
  return { materialNav: nav.join('\n'), materialDocs: docs.join('\n'), materialMark: productMark('material', 'mark-material') };
}
