# 更新记录

产品每个版本改了什么。和[博客页](blog.md)不同，它不讲故事，按版本排，读者来查「我关心的那个问题修了没有」「这周多了什么」。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 页眉 | 官网页眉，「更新记录」标为当前；写法同[主页](home.md) | 是 |
| 标题 | 宋体「更新记录」，右边一个「订阅（RSS）」文字按钮 | 是 |
| 版本 | 最新的在最上面。左边一栏版本号和日期，滚动时停在顶部；右边是这一版的内容 | 是 |
| 每一版 | 一个宋体标题说最重要的那件事，一两句话，需要时一张截图；下面按「新增」「改进」「修复」分组，每条一行 | 是 |
| 翻页 | 页面末尾「更早的版本」，每页有自己的地址 | 版本多时 |

- 每一版有自己的锚点（`#v0.4.0`），版本号本身就是链接，可以直接分享。
- 每条写用户看得到的变化（「深色主题里的字不再发虚」），不写内部说法（「重构渲染管线」）；能链到文档的就链过去。
- 小版本只有修复时，不写标题和段落，只留分组列表。
- 发版的同时更新这一页；一个停更的更新记录比没有更糟。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-changelog { width: min(100% - 2 * var(--page-margin), var(--wide-max)); margin: 0 auto; padding: var(--space-12) 0; }
.dn-changelog-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: var(--space-4); margin-bottom: var(--space-8); }
.dn-changelog-head h2 { margin: 0; font: var(--weight-semibold) var(--type-display-size)/var(--type-display-line) var(--font-display); letter-spacing: var(--type-display-tracking); }
.dn-changelog-head > :last-child { margin-left: auto; }
.dn-release { display: grid; grid-template-columns: 10em minmax(0, var(--content-max)); gap: var(--space-2) var(--grid-gutter); padding: var(--space-8) 0; border-top: var(--stroke-line) solid var(--line); }
.dn-release-meta { position: sticky; top: calc(var(--toolbar-height) + var(--space-4)); align-self: start; display: grid; gap: 2px; }
.dn-release-meta a { color: var(--ink); font: var(--weight-medium) var(--type-body-size)/var(--type-body-line) var(--font-sans); font-variant-numeric: tabular-nums; text-decoration: none; }
.dn-release-meta time { color: var(--ink-tertiary); font: var(--type-footnote); font-variant-numeric: tabular-nums; }
.dn-release h3 { margin: 0 0 var(--space-3); font: var(--weight-semibold) var(--type-title-size)/var(--type-title-line) var(--font-display); text-wrap: balance; }
.dn-release p { margin: 0 0 var(--space-5); color: var(--ink-secondary); font: var(--type-prose); }
.dn-release h4 { margin: var(--space-5) 0 var(--space-2); color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-release ul { margin: 0; padding-left: 1.2em; font: var(--type-body); }
.dn-release li + li { margin-top: var(--space-1); }
@media (max-width: 960px) {
  .dn-release { grid-template-columns: minmax(0, 1fr); }
  .dn-release-meta { position: static; display: flex; gap: var(--space-3); align-items: baseline; }
}
```

版本号和日期在左边停靠，右边一个标题说最重要的那件事；下面按新增、改进、修复分组，每条一行：

```html
<div class="dn-site ex-page is-tall" data-density="comfortable">
  <header class="dn-site-header">
    <a class="dn-site-mark" href="#">deernova.</a>
    <nav class="dn-site-nav" aria-label="主导航"><a href="#">文档</a><a href="#" aria-current="page">更新记录</a><a href="#">定价</a></nav>
  </header>
  <main class="dn-changelog">
    <div class="dn-changelog-head">
      <h2>更新记录</h2>
      <button class="dn-button is-plain is-sm" type="button">订阅（RSS）</button>
    </div>
    <section class="dn-release" id="ex-v0-4-0">
      <div class="dn-release-meta"><a href="#ex-v0-4-0">0.4.0</a><time datetime="2026-11-14">11月14日</time></div>
      <div>
        <h3>按钮按下时会轻轻一缩</h3>
        <p>只缩底色，文字不动；松开时回弹。列表行和菜单不缩。</p>
        <h4>改进</h4>
        <ul><li>深色主题里的字不再发虚：三档字重各减 40。</li><li>官网标题的中文换成思源宋体。</li></ul>
        <h4>修复</h4>
        <ul><li>对话栏右侧比输入框多出 5 像素。</li></ul>
      </div>
    </section>
    <section class="dn-release" id="ex-v0-3-16">
      <div class="dn-release-meta"><a href="#ex-v0-3-16">0.3.16</a><time datetime="2026-11-09">11月9日</time></div>
      <div>
        <h4>修复</h4>
        <ul><li>表单错误在深色主题里看不清。</li></ul>
      </div>
    </section>
  </main>
</div>
```

### 窄屏和手机浏览器

- 窄于 `breakpoint-md`：左边的版本号和日期移到每一版标题的上方，不再停靠。
- 截图占满正文宽度。

手机上版本号和日期移到每一版的标题上方，不再停靠：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body is-web">
      <div class="dn-site" data-density="comfortable">
        <header class="dn-site-header"><a class="dn-site-mark" href="#">deernova.</a><nav class="dn-site-nav" aria-label="主导航"><a href="#">文档</a></nav><button class="dn-icon-button" type="button" aria-label="菜单"><svg class="dn-icon" aria-hidden="true"><use href="#dn-sidebar"/></svg></button></header>
        <main class="dn-changelog">
          <div class="dn-changelog-head"><h2>更新记录</h2><button class="dn-button is-plain is-sm" type="button">订阅（RSS）</button></div>
          <section class="dn-release" id="ex-m-v040">
            <div class="dn-release-meta"><a href="#ex-m-v040">0.4.0</a><time datetime="2026-11-14">11月14日</time></div>
            <div><h3>按钮按下时会轻轻一缩</h3><p>只缩底色，文字不动；松开时回弹。</p><h4>修复</h4><ul><li>对话栏右侧比输入框多出 5 像素。</li></ul></div>
          </section>
        </main>
      </div>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 还没有发过版 | 不上线这一页，页眉里不放入口 |
| 某一版被撤回 | 保留这一版，标题后面加一个「已撤回」[标签](../../../deernova-style/references/components/tag.md)，一句话说明原因和替代的版本 |
| 有安全修复 | 「修复」组里这一条写在最前面，说明影响范围和需要用户做什么 |
| 从应用里的「有新版本」点进来 | 直接滚到对应版本 |

## 不要

- 用博客的写法写更新记录：长段的背景故事、「我们很高兴地宣布」。
- 每一版都配一张大插画或彩色的「NEW」「FIX」徽标。
- 条目写成内部说法：「优化性能」「若干问题修复」「重构渲染管线」。
- 最旧的在最上面；版本没有锚点，没法直接链到某一版。
- 只在应用里弹窗公告，官网上没有可以回看的地方。
