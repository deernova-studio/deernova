# 文档页

产品文档、帮助中心、开发者指南。读者大多从搜索直接落到某一页，要立刻知道自己在哪、这一页讲什么、下一步去哪。用舒展密度，整页滚动，正文用无衬线。

## 区块

左中右三栏，上面一条页眉：

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 页眉 | 字标、搜索（⌘K）、版本切换（有多个版本时）；外观切换可以放，默认跟随系统时可以省略。写法同[主页](home.md)的页眉 | 是 |
| 左侧目录 | 整套文档的结构，最多两层，当前页用 `fill-selected` 标出。宽 `sidebar-width`，吸顶，自己滚动 | 是 |
| 标题区 | 宋体标题（`--font-display`）和一句话说明这一页解决什么。所在分组只在左侧目录里标出，不在标题上方再写一行小字 | 是 |
| 正文 | 宽不超过 `content-max`。二级标题分节，代码块带复制，提示用[横幅](../../../deernova-style/references/components/banner.md) | 是 |
| 本页目录 | 本页的二级和三级标题，跟随滚动标出当前一节。少于三个二级标题时不放 | 否 |
| 页尾 | 上一篇和下一篇，写出标题；可以加最后更新日期 | 是 |

- 左侧目录的分组名就是文档结构，不用图标装饰；分组可以折叠，打开的分组是当前页所在的那个。
- 标题和一级目录项用同一个名字，读者从目录点进来要认得出。
- 本页目录由二级、三级标题生成，代码块里的 `#` 注释不算。
- 每个标题可以直接链接：悬停时在标题旁边出现链接图标。跳到锚点时用 `scroll-padding-top` 留出页眉高度。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-docs-search { width: min(100%, 280px); }
.dn-docs { display: grid; grid-template-columns: var(--sidebar-width) minmax(0, 1fr) 200px; align-items: start; gap: var(--grid-gutter); padding-inline: var(--page-margin); }
.dn-docs-nav { position: sticky; top: var(--toolbar-height); display: flex; flex-direction: column; gap: var(--row-gap); max-height: calc(100dvh - var(--toolbar-height)); overflow-y: auto; padding: var(--space-6) 0; }
.dn-docs-nav .dn-sidebar-heading { cursor: default; }
.dn-docs-main { width: 100%; min-width: 0; max-width: var(--content-max); margin-inline: auto; padding: var(--space-8) 0 var(--space-12); }
.dn-docs-main h1 { margin: 0 0 var(--space-3); font: var(--weight-semibold) var(--type-display-size)/var(--type-display-line) var(--font-display); letter-spacing: var(--type-display-tracking); text-wrap: balance; }
.dn-docs-lede { margin: 0 0 var(--space-8); color: var(--ink-secondary); font: var(--type-body); }
.dn-docs-main h2 { margin: var(--space-10) 0 var(--space-3); font: var(--weight-semibold) var(--type-title-size)/var(--type-title-line) var(--font-display); }
.dn-docs-main p { margin: 0 0 var(--space-4); font: var(--type-body); }
.dn-docs-main :is(h1, h2) + .dn-code { margin-top: var(--space-4); }
.dn-docs-toc { position: sticky; top: var(--toolbar-height); display: grid; gap: var(--space-2); padding: var(--space-8) 0; font: var(--type-footnote); }
.dn-docs-toc p { margin: 0; color: var(--ink); }
.dn-docs-toc a { padding-left: var(--space-3); border-left: var(--stroke-line) solid var(--line); color: var(--ink-tertiary); text-decoration: none; }
.dn-docs-toc a[aria-current="true"] { border-left-color: var(--ink); color: var(--ink); }
@media (hover: hover) { .dn-docs-toc a:hover { color: var(--ink); } }
.dn-docs-pager { display: grid; grid-template-columns: 1fr 1fr; gap: var(--card-gap); margin-top: var(--space-12); padding-top: var(--space-6); border-top: var(--stroke-line) solid var(--line); }
.dn-docs-pager a { display: grid; gap: 2px; color: var(--ink); font: var(--weight-medium) var(--type-body-size)/var(--type-body-line) var(--font-sans); text-decoration: none; }
.dn-docs-pager a span { color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-docs-pager a:last-child { text-align: end; }
@media (max-width: 1280px) { .dn-docs { grid-template-columns: var(--sidebar-width) minmax(0, 1fr); } .dn-docs-toc { display: none; } }
@media (max-width: 960px) { .dn-docs { grid-template-columns: minmax(0, 1fr); } .dn-docs-nav { display: none; } }
@media (max-width: 760px) { .dn-docs-search { flex: 1; min-width: 0; width: auto; } }
```

左边整套文档的结构，中间正文，右边本页的几节；页尾写出上一篇和下一篇的标题：

```html
<div class="dn-site ex-page is-tall" data-density="comfortable">
  <header class="dn-site-header">
    <a class="dn-site-mark" href="#">deernova<span>.</span></a>
    <label class="dn-input-group dn-docs-search"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><input type="search" placeholder="搜索文档" aria-label="搜索文档"><kbd class="dn-input-kbd">⌘K</kbd></label>
    <nav class="dn-site-nav" aria-label="主导航"><a href="#">更新记录</a><a href="#">GitHub</a></nav>
  </header>
  <div class="dn-docs ex-docs">
    <nav class="dn-docs-nav" aria-label="文档目录">
      <p class="dn-sidebar-heading">开始</p>
      <a class="dn-sidebar-item" href="#"><span class="dn-sidebar-label">安装</span></a>
      <a class="dn-sidebar-item" href="#" aria-current="page"><span class="dn-sidebar-label">同步与备份</span></a>
      <a class="dn-sidebar-item" href="#"><span class="dn-sidebar-label">快捷键</span></a>
      <p class="dn-sidebar-heading">进阶</p>
      <a class="dn-sidebar-item" href="#"><span class="dn-sidebar-label">导入与导出</span></a>
      <a class="dn-sidebar-item" href="#"><span class="dn-sidebar-label">命令行</span></a>
    </nav>
    <article class="dn-docs-main">
      <h1>同步与备份</h1>
      <p class="dn-docs-lede">在多台设备之间保持笔记一致，并保留每一次修改。</p>
      <h2 id="ex-turn-on">打开同步</h2>
      <p>在「设置 › 账户」里打开 iCloud 同步。第一次同步会上传这台设备上的全部笔记，期间可以照常编辑。</p>
      <div class="dn-code">
        <div class="dn-code-header">shell<button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-copy"/></svg>复制</button></div>
        <pre><code>deernova sync status</code></pre>
      </div>
      <nav class="dn-docs-pager" aria-label="上一篇和下一篇">
        <a href="#"><span>上一篇</span>安装</a>
        <a href="#"><span>下一篇</span>快捷键</a>
      </nav>
    </article>
    <nav class="dn-docs-toc" aria-label="本页内容">
      <p>本页内容</p>
      <a href="#ex-turn-on" aria-current="true">打开同步</a>
      <a href="#">冲突怎么处理</a>
      <a href="#">恢复旧版本</a>
    </nav>
  </div>
</div>
```

### 窄屏和手机浏览器

- 窄于 `breakpoint-lg`：本页目录不放在右边，移到标题区下面，收成一个可以展开的「本页内容」。
- 窄于 `breakpoint-md`：左侧目录收成抽屉，页眉左边出现一个打开它的按钮；打开时当前页滚动到可见位置。
- 代码块在自己内部横向滚动，页面不能横向滚动。

手机上左侧目录收进菜单，本页目录收成标题下的一行：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body is-web">
      <div class="dn-site" data-density="comfortable">
        <header class="dn-site-header"><a class="dn-site-mark" href="#">deernova<span>.</span></a><nav class="dn-site-nav" aria-label="主导航"><a href="#">GitHub</a></nav><button class="dn-icon-button" type="button" aria-label="搜索文档"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg></button><button class="dn-icon-button" type="button" aria-label="文档目录"><svg class="dn-icon" aria-hidden="true"><use href="#dn-sidebar"/></svg></button></header>
        <div class="dn-docs">
          <article class="dn-docs-main">
                  <h1>同步与备份</h1>
            <p class="dn-docs-lede">在多台设备之间保持笔记一致，并保留每一次修改。</p>
            <details class="dn-activity"><summary>本页内容<svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-right"/></svg></summary></details>
            <h2>打开同步</h2>
            <p>在「设置 › 账户」里打开 iCloud 同步。</p>
          </article>
        </div>
      </div>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 页面已移动或删除 | 404 页：「这一页已经不在了」，放搜索框和文档首页的链接；能找到新地址时直接跳转 |
| 搜索没有结果 | 「没有找到“季度预算”」，下面列出三五个最常看的页面 |
| 看的是旧版本 | 页面顶部一条横幅「这是 2.x 的文档」加「看最新版」 |
| 复制代码 | 复制按钮短暂换成「已复制」，不弹提示 |

## 不要

- 目录超过两层；目录项前面加彩色图标；当前页只靠加粗区分。
- 用面包屑、标签、「阅读时长」「本文适合初学者」这些小字堆在标题上面。
- 正文拉满宽屏，或者把正文改成衬线长文排版；技术文档用无衬线。
- 本页目录和左侧目录一样长；只有两节也放本页目录。
- 页尾只写「上一页」「下一页」，不写标题；放一排「这篇有帮助吗？」表情按钮。
- 404 页只有一句「页面不存在」，没有搜索也没有回去的路。
