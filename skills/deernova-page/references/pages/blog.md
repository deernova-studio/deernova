# 博客页

产品博客、更新日志、个人文章。分两种页面：文章列表和单篇文章。读者来这里是为了读，所以文章页就是一栏好读的长文，列表页让人凭标题和日期决定读哪篇。用舒展密度，整页滚动。

## 区块

### 文章列表

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 页眉 | 同[主页](home.md)的页眉，「博客」标为当前 | 是 |
| 标题 | 宋体标题「博客」，可以加一句话说写什么 | 是 |
| 分类 | 有三类以上文章时，一行文字链接切换（全部、产品、工程）；不用标签云 | 否 |
| 文章 | 竖排的列表，行之间一条细线。每篇：日期、宋体标题、一句摘要 | 是 |
| 翻页 | 列表末尾「更早的文章」，每页有自己的地址，可以收藏和分享 | 文章多时 |

- 日期放在每篇的最前面，等宽数字；读者先看新不新，再看标题。
- 摘要是专门写的一句话，不是正文第一句截断；写不出来就不放。
- 封面图不是必须的。有图的文章不多时，不要为了整齐给每篇配图。

### 单篇文章

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 标题区 | 宋体大标题（`--font-display`），下面一行日期和作者，用间距分开 | 是 |
| 正文 | `type-prose` 长文（英文衬线，中文苹方），栏宽不超过 `content-max`（每行约 35–40 个汉字）。图片可以比正文宽，图注在图下 | 是 |
| 文末 | 上一篇和下一篇的标题，一行订阅（RSS 或邮件） | 是 |

- 正文里的二级标题用无衬线的 `headline`，和正文的衬线拉开层次。
- 代码块、表格、引用用规范里的组件，宽度和正文对齐。
- 分享按钮最多一个「复制链接」，放在文末，不悬浮在侧边。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-blog { width: min(100% - 2 * var(--page-margin), var(--content-max)); margin: 0 auto; padding: var(--space-12) 0; }
.dn-blog-title { margin: 0 0 var(--space-2); font: var(--weight-semibold) var(--type-display-size)/var(--type-display-line) var(--font-display); letter-spacing: var(--type-display-tracking); }
.dn-blog-lede { margin: 0 0 var(--space-6); color: var(--ink-secondary); font: var(--type-prose); }
.dn-blog-filter { display: flex; flex-wrap: wrap; gap: var(--space-5); margin: 0 0 var(--space-4); }
.dn-blog-filter a { color: var(--ink-tertiary); font: var(--type-callout); text-decoration: none; }
.dn-blog-filter a[aria-current="page"] { color: var(--ink); }
.dn-posts { margin: 0; padding: 0; list-style: none; }
.dn-post { display: grid; grid-template-columns: 7em minmax(0, 1fr); gap: var(--space-1) var(--space-5); padding: var(--space-5) 0; border-top: var(--stroke-line) solid var(--line); }
.dn-post time { color: var(--ink-tertiary); font: var(--type-footnote); font-variant-numeric: tabular-nums; line-height: var(--type-title-line); }
.dn-post-title { margin: 0; font: var(--weight-semibold) var(--type-title-size)/var(--type-title-line) var(--font-display); text-wrap: balance; }
.dn-post-title a { color: var(--ink); text-decoration: none; }
@media (hover: hover) { .dn-post-title a:hover { text-decoration: underline; text-underline-offset: 0.2em; } }
.dn-post-summary { grid-column: 2; margin: 0; color: var(--ink-secondary); font: var(--type-body); }
.dn-blog-more { display: inline-block; margin-top: var(--space-6); color: var(--ink); font: var(--type-callout); }
.dn-article { width: min(100% - 2 * var(--page-margin), var(--content-max)); margin: 0 auto; padding: var(--space-12) 0; }
.dn-article h1 { margin: 0 0 var(--space-3); font: var(--weight-semibold) clamp(28px, 4vw, 44px)/1.25 var(--font-display); letter-spacing: var(--type-display-tracking); text-wrap: balance; }
.dn-article-meta { display: flex; flex-wrap: wrap; gap: var(--space-4); margin: 0 0 var(--space-10); color: var(--ink-tertiary); font: var(--type-footnote); font-variant-numeric: tabular-nums; }
.dn-article p { margin: 0 0 1.2em; font: var(--type-prose); }
.dn-article h2 { margin: var(--space-10) 0 var(--space-3); font: var(--type-headline); }
.dn-article figure { margin: var(--space-8) 0; }
.dn-article figcaption { margin-top: var(--space-2); color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-article-end { display: grid; gap: var(--space-3); margin-top: var(--space-12); padding-top: var(--space-6); border-top: var(--stroke-line) solid var(--line); font: var(--type-callout); }
.dn-article-end a { color: var(--ink); }
@media (max-width: 760px) {
  .dn-post { grid-template-columns: minmax(0, 1fr); }
  .dn-post-summary { grid-column: 1; }
}
```

文章列表：日期在前，宋体标题，一句专门写的摘要，行之间一条细线：

```html
<div class="dn-site ex-page is-tall" data-density="comfortable">
  <header class="dn-site-header">
    <a class="dn-site-mark" href="#">deernova<span>.</span></a>
    <nav class="dn-site-nav" aria-label="主导航"><a href="#">文档</a><a href="#" aria-current="page">博客</a><a href="#">更新记录</a></nav>
  </header>
  <main class="dn-blog">
    <h2 class="dn-blog-title">博客</h2>
    <nav class="dn-blog-filter" aria-label="分类"><a href="#" aria-current="page">全部</a><a href="#">产品</a><a href="#">工程</a></nav>
    <ol class="dn-posts">
      <li class="dn-post"><time datetime="2026-11-12">11月12日</time><h3 class="dn-post-title"><a href="#">为什么我们去掉了统计卡片</a></h3><p class="dn-post-summary">首页少了四个数字，笔记多露出了三条。</p></li>
      <li class="dn-post"><time datetime="2026-10-28">10月28日</time><h3 class="dn-post-title"><a href="#">深色主题里的字重补偿</a></h3><p class="dn-post-summary">同样的 400，在深色背景上看起来更粗。我们减了 40。</p></li>
      <li class="dn-post"><time datetime="2026-10-03">10月3日</time><h3 class="dn-post-title"><a href="#">把同步冲突交给用户之前</a></h3><p class="dn-post-summary">九成的冲突可以自动合并，剩下的一成怎么问。</p></li>
    </ol>
    <a class="dn-blog-more" href="#">更早的文章</a>
  </main>
</div>
```

单篇文章：宋体标题加一栏长文，标题下一行日期和作者，文末给上一篇和下一篇：

```html
<div class="dn-site ex-page is-tall" data-density="comfortable">
  <article class="dn-article">
    <h1>为什么我们去掉了统计卡片</h1>
    <p class="dn-article-meta"><time datetime="2026-11-12">2026年11月12日</time><span>林一</span></p>
    <p>改版前，打开应用先看到四张卡片：笔记总数、本周新增、AI 摘要、节省时间。它们占了首屏的一半，而用户打开应用，是为了找一条笔记。</p>
    <p>我们看了两周的点击记录：四张卡片加起来的点击，不到侧边栏「收藏」一项的五分之一。</p>
    <h2>数字去了哪里</h2>
    <p>总数放回侧边栏的计数里，和每个文件夹的数量在一起。「节省时间」直接删掉了，它是估出来的。</p>
    <footer class="dn-article-end">
      <a href="#">上一篇：深色主题里的字重补偿</a>
      <a href="#">订阅更新（RSS）</a>
    </footer>
  </article>
</div>
```

### 窄屏和手机浏览器

- 列表页：日期移到标题上方，变成一行小字；摘要保留。
- 文章页：左右边距 `page-margin`，标题用 `clamp()` 缩小；比正文宽的图片回到正文宽度。
- 不改字号去塞更多字，正文字号和宽屏一样。

手机上日期移到标题上方：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body is-web">
      <div class="dn-site" data-density="comfortable">
        <header class="dn-site-header"><a class="dn-site-mark" href="#">deernova<span>.</span></a><nav class="dn-site-nav" aria-label="主导航"><a href="#">文档</a></nav><button class="dn-icon-button" type="button" aria-label="菜单"><svg class="dn-icon" aria-hidden="true"><use href="#dn-sidebar"/></svg></button></header>
        <main class="dn-blog">
          <h2 class="dn-blog-title">博客</h2>
          <ol class="dn-posts">
            <li class="dn-post"><time datetime="2026-11-12">11月12日</time><h3 class="dn-post-title"><a href="#">为什么我们去掉了统计卡片</a></h3><p class="dn-post-summary">首页少了四个数字，笔记多露出了三条。</p></li>
            <li class="dn-post"><time datetime="2026-10-28">10月28日</time><h3 class="dn-post-title"><a href="#">深色主题里的字重补偿</a></h3><p class="dn-post-summary">同样的 400，在深色背景上看起来更粗。</p></li>
          </ol>
        </main>
      </div>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 还没有文章 | 不上线博客入口；页眉里不放一个点进去是空的链接 |
| 某个分类没有文章 | 这个分类不出现在分类行里 |
| 文章不存在 | 404：「这篇文章不在了」，下面列出最近的三篇 |
| 图片还没加载 | 按图片宽高比留出位置，加载完不跳 |

## 不要

- 列表页用三栏卡片网格，每篇配一张没有信息的封面图。
- 列表里的摘要是正文第一句截断，后面带「阅读更多 →」。
- 文章页的侧边栏放热门文章、标签云、作者介绍和订阅表单；正文拉满宽屏。
- 文章正文用无衬线小字，或者正文字号小于 `type-prose`。
- 悬浮的分享按钮条、读到一半弹出的订阅弹窗、文章开头的「本文约 3000 字，阅读需要 8 分钟」整段说明。
- 用「·」把日期、作者、阅读时长串成一行；分开放，用间距隔开。
- 无限滚动的文章列表：读者没法回到刚才看到的位置，也没法把第二页发给别人。
