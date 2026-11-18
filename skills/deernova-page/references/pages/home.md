# 主页

产品官网的第一页。访客只看几秒，要在首屏知道这是什么、对我有什么用、下一步点哪里。它也是最容易做成模板的一页：居中的大标题、一句话、两个胶囊按钮、下面一张截图，谁家都长这样。Deernova 的主页用自己才有的东西开场。用舒展密度（`comfortable`），整页滚动。

## 区块

从上到下：

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 页眉 | 左边字标（点了回主页），右边 3–4 个链接和外观切换。悬浮在首屏上的玻璃条，不是贴边的一条线 | 是 |
| 首屏 | 左边：宋体大标题（最多两行）、一句话（最多两行）、一个主按钮和一个无底色按钮。右边：这个产品最有特点的画面，出血到页面右边和顶部 | 是 |
| 产品画面 | 首屏下面一张真实的界面截图，比正文宽，底部被下一节截断 | 是 |
| 功能 | 最多三节，每节一个标题、一段话（最多三行）、一张图 | 否 |
| 真实内容 | 用户做出来的东西、最近的更新，有真的才放 | 否 |
| 收尾 | 一句话加首屏那个主按钮，左对齐 | 否 |
| 页脚 | 版权、备案号、少量链接，一行或两行；左边和上面各节的内容对齐，不贴着页面边缘 | 是 |

- **用最有特点的东西开场。** 先回答：这个产品有什么是别人没有的？Deernova 的答案是网点插画，和官网首页的麋鹿同一种做法。没有插画时，用真实的界面截图，不加设备外壳、不倾斜。不用抽象渐变、光斑、3D 图标这种放到哪个产品都成立的画面。
- **左对齐，不对称。** 文字占左边一半弱，画面占右边一半强并出血到页面边缘。不要把标题、一句话和按钮居中堆成一列。
- **标题用宋体。** 首屏和每节的标题用 `--font-display`：中文是思源宋体，英文是 New York。字重 `weight-semibold`。中文标题在语义停顿处手动换行（逗号后面加 `<br>`），不让浏览器从词中间断开；英文标题加 `text-wrap: balance`。正文和按钮仍然是无衬线。
- **一个主按钮。** 写具体去处（「下载 Mac 版」），在首屏和收尾各出现一次，文字相同。第二个操作用无底色的按钮，不做两个并排的胶囊。
- **疏密要有对比。** 首屏留白大，功能节紧凑。节与节不要都是同一个结构，尤其不要「左图右文、右图左文」一直交替下去。
- 页眉的链接是访客最常找的几处（文档、更新记录、定价），不是网站地图。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-site { position: relative; display: flex; flex-direction: column; min-height: 100%; background: var(--canvas); color: var(--ink); }
.dn-site > * { flex-shrink: 0; }
.dn-site-header { position: sticky; top: 0; z-index: var(--z-sticky); display: flex; align-items: center; gap: var(--space-6); height: var(--toolbar-height); padding: 0 var(--page-margin); border-bottom: var(--stroke-line) solid var(--line); background: var(--canvas); }
.dn-site-header.is-floating { top: var(--space-4); height: var(--toolbar-height); margin: var(--space-4) var(--page-margin) calc(-1 * (var(--toolbar-height) + var(--space-4))); padding: 0 var(--space-3) 0 var(--space-6); border: var(--stroke-line) solid var(--glass-stroke); border-radius: var(--radius-full); background: var(--glass-fill); box-shadow: var(--shadow-glass); -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)); backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)); }
@media (prefers-reduced-transparency: reduce) { .dn-site-header.is-floating { background: var(--surface-raised); -webkit-backdrop-filter: none; backdrop-filter: none; } }
.dn-site-mark { color: var(--ink); font: var(--weight-semibold) var(--type-headline-size)/1 var(--font-serif); text-decoration: none; }
.dn-site-nav { display: flex; align-items: center; gap: var(--space-5); margin-left: auto; }
.dn-site-nav a { color: var(--ink-secondary); font: var(--type-callout); text-decoration: none; }
.dn-site-nav a[aria-current="page"] { color: var(--ink); }
@media (hover: hover) { .dn-site-nav a:hover { color: var(--ink); } }
.dn-hero { container-type: inline-size; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); min-height: min(100svh, 760px); }
.dn-hero-copy { display: grid; align-content: center; justify-items: start; gap: var(--space-6); padding: var(--space-16) var(--space-6) var(--space-12) calc(var(--page-margin) + var(--space-5)); }
.dn-hero-title { margin: 0; font: var(--weight-semibold) clamp(32px, 4cqi, 56px)/1.2 var(--font-display); letter-spacing: -0.01em; text-wrap: balance; }
.dn-hero-lede { max-width: 24em; margin: 0; color: var(--ink-secondary); font: var(--type-prose); }
.dn-hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-3); margin-top: var(--space-2); }
.dn-hero-art { margin: 0; overflow: hidden; background: var(--canvas); }
.dn-hero-art img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: left top; }
.dn-hero-art .is-dark { display: none; }
[data-theme="dark"] .dn-hero-art .is-light { display: none; }
[data-theme="dark"] .dn-hero-art .is-dark { display: block; }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .dn-hero-art .is-light { display: none; }
  :root:not([data-theme="light"]) .dn-hero-art .is-dark { display: block; }
}
.dn-section { width: min(100% - 2 * var(--page-margin), var(--wide-max)); margin: var(--space-16) auto 0; }
.dn-section-title { max-width: 16em; margin: 0 0 var(--space-3); font: var(--weight-semibold) var(--type-title-size)/var(--type-title-line) var(--font-display); text-wrap: balance; }
.dn-section-text { max-width: 30em; margin: 0 0 var(--space-8); color: var(--ink-secondary); font: var(--type-prose); }
.dn-shot { overflow: hidden; border: var(--stroke-line) solid var(--line); border-bottom: 0; border-radius: var(--radius-lg) var(--radius-lg) 0 0; background: var(--surface); }
.dn-closing { display: grid; justify-items: start; gap: var(--space-5); width: min(100% - 2 * var(--page-margin), var(--wide-max)); margin: var(--space-16) auto; }
.dn-site-footer { display: flex; flex-wrap: wrap; gap: var(--space-2) var(--space-5); margin-top: auto; padding: var(--space-6) max(var(--page-margin), (100% - var(--wide-max)) / 2); border-top: var(--stroke-line) solid var(--line); color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-site-footer a { color: inherit; }
@media (max-width: 960px) {
  .dn-site-nav a { display: none; }
  .dn-hero { grid-template-columns: minmax(0, 1fr); }
  .dn-hero-art { order: -1; height: 50svh; }
  .dn-hero-copy { padding-top: var(--space-8); }
}
@media (max-width: 760px) {
  .dn-hero-actions { flex-direction: column; align-items: stretch; justify-self: stretch; }
}
```

首屏：玻璃页眉浮在网点插画上，宋体标题左对齐，一个主按钮。插画出血到右边和顶部：

```html
<div class="dn-site ex-page is-tall" data-density="comfortable">
  <header class="dn-site-header is-floating">
    <a class="dn-site-mark" href="#">deernova.</a>
    <nav class="dn-site-nav" aria-label="主导航">
      <a href="#">文档</a><a href="#">更新记录</a><a href="#">定价</a>
    </nav>
  </header>
  <section class="dn-hero">
    <div class="dn-hero-copy">
      <h2 class="dn-hero-title">把想法写下来，<br>它会自己长成文档。</h2>
      <p class="dn-hero-lede">你写的时候，它整理结构；你要找的时候，它已经放在那里。</p>
      <div class="dn-hero-actions">
        <button class="dn-button is-primary is-lg" type="button">下载 Mac 版</button>
        <button class="dn-button is-plain is-lg" type="button">在浏览器中使用</button>
      </div>
    </div>
    <figure class="dn-hero-art">
      <img class="is-light" src="assets/examples/halftone-light.png" alt="">
      <img class="is-dark" src="assets/examples/halftone-dark.png" alt="">
    </figure>
  </section>
</div>
```

往下是产品本身：标题左对齐、比正文宽的截图，底部被截断；收尾只有一句话和同一个主按钮：

```html
<div class="dn-site ex-page is-auto" data-density="comfortable">
  <section class="dn-section">
    <h3 class="dn-section-title">写到哪，整理到哪。</h3>
    <p class="dn-section-text">标题、待办和引用在你打字时自动成形。不用先建文件夹，也不用回头整理。</p>
    <div class="dn-shot" data-density="desktop">
      <div class="dn-app ex-shot">
        <nav class="dn-sidebar" aria-label="侧边栏">
          <div class="dn-sidebar-section">
            <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span class="dn-sidebar-label">全部笔记</span><span class="dn-sidebar-count">128</span></a>
            <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-star"/></svg><span class="dn-sidebar-label">收藏</span><span class="dn-sidebar-count">24</span></a>
          </div>
        </nav>
        <div class="dn-app-main">
          <header class="dn-toolbar"><h4 class="dn-toolbar-title"><span>首页改版：第二轮反馈</span></h4></header>
          <div class="dn-app-content"><p>导航层级是这轮反馈最集中的地方：七位受访者里有五位没找到「归档」。下一版把它移到侧边栏底部，和「回收站」放在一起。</p></div>
        </div>
      </div>
    </div>
  </section>
  <section class="dn-closing">
    <h3 class="dn-section-title">从今天的第一条笔记开始。</h3>
    <button class="dn-button is-primary is-lg" type="button">下载 Mac 版</button>
  </section>
  <footer class="dn-site-footer"><span>© 2026 Deernova</span><a href="#">隐私</a><a href="#">京ICP备2026076994号-1</a></footer>
</div>
```

示例里的插画换成你产品自己的网点插画；文档页和博客页用不带玻璃的 `dn-site-header`。

### 窄屏和手机浏览器

- 窄于 `breakpoint-md`：画面移到标题上面，占满宽度、高度约半屏，仍然出血到左右两边；文字在下面左对齐。页眉的链接收进一个菜单按钮。
- 窄于 `breakpoint-sm`：标题字号跟着宽度缩小，仍然最多两行；主按钮占满一行，无底色按钮在它下面。
- 产品截图换成手机端的截图，不把桌面截图缩成看不清的小图。

手机上插画在标题上面，按钮各占一行：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body is-web">
      <div class="dn-site" data-density="comfortable">
        <header class="dn-site-header"><a class="dn-site-mark" href="#">deernova.</a><nav class="dn-site-nav" aria-label="主导航"><a href="#">文档</a></nav><button class="dn-icon-button" type="button" aria-label="菜单"><svg class="dn-icon" aria-hidden="true"><use href="#dn-sidebar"/></svg></button></header>
        <section class="dn-hero">
          <div class="dn-hero-copy">
            <h2 class="dn-hero-title">把想法写下来，<br>它会自己长成文档。</h2>
            <p class="dn-hero-lede">你写的时候，它整理结构；你要找的时候，它已经放在那里。</p>
            <div class="dn-hero-actions"><button class="dn-button is-primary is-lg" type="button">下载 Mac 版</button><button class="dn-button is-plain is-lg" type="button">在浏览器中使用</button></div>
          </div>
          <figure class="dn-hero-art"><img class="is-light" src="assets/examples/halftone-light.png" alt=""><img class="is-dark" src="assets/examples/halftone-dark.png" alt=""></figure>
        </section>
      </div>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 宋体还没加载 | 先用苹方显示，加载完替换（`font-display: swap`）；字体只打包标题用到的字，控制在 200 KB 以内 |
| 插画还没加载 | 按插画的宽高比留出 `canvas` 底色的位置，加载完不跳 |
| 深色主题 | 插画换成深色版本：网点和底色对调，不在深色页面里放一块浅色图 |
| 减弱动态效果 | 动态插画停在一帧 |
| 没有真实用户内容 | 「真实内容」整节不放，不用占位或编造的评价顶上 |

## 不要

- 居中堆叠的首屏：大标题、一句话、两个胶囊按钮排成一列，下面一张截图。
- 首屏放抽象渐变、光斑、3D 图标、倾斜的设备外壳这类放到哪个产品都成立的画面。
- 标题上方的胶囊徽标，「重新定义」「一站式」「下一代」这类口号，按钮下面的一行小字。
- 编造的用户数、可用率、评分和客户标志墙；没有真实数据的区块整节不放。
- 每节都是同一个结构；「左图右文、右图左文」一直交替；一排图标加三行介绍的功能卡片；功能超过三节。
- 轮播图、自动播放的有声视频、每个区块都在动的滚动特效。
- 「了解更多」「立即体验」这类说不清去哪的按钮；链接文字后面加箭头。
- 把安装命令、API 说明放在首屏；放到文档或页面末尾。
