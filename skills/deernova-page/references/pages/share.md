# 分享只读页

用户把一条笔记、一份文档或一个看板分享出去，别人点开链接看到的那一页。看的人多半没有账号，也不认识这个产品：先让他读到内容，品牌退到最后。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 左边分享者的名字或空间名（「林一 分享」），右边一个按钮：「复制到我的笔记」或「用 Deernova 打开」。不放侧边栏、不放导航 | 是 |
| 内容 | 分享的东西本身，只读。文档用舒展密度的长文排版，宽不超过 `content-max`；标题用 `--font-display` | 是 |
| 更新时间 | 标题下面一行「11月14日更新」，让看的人知道新不新 | 是 |
| 页脚 | 一行小字「用 Deernova 写成」，链到官网；这是全页唯一的品牌位置。和正文在同一栏里，左边对齐 | 是 |

- 内容在第一屏。不在内容上面放横幅广告「注册 Deernova，免费开始」，也不读到一半弹出注册框。
- 顶栏右边只有一个操作。评论、点赞、目录这些功能对没登录的人不显示。
- 页面的标题、描述和预览图（`og:title`、`og:description`、`og:image`）用分享内容自己的标题和第一段，聊天软件里展开的卡片才看得出是什么。
- 分享者能随时关掉链接；关掉后这一页立即失效。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-share-bar { display: flex; align-items: center; gap: var(--space-3); height: var(--toolbar-height); padding: 0 var(--page-margin); border-bottom: var(--stroke-line) solid var(--line); color: var(--ink-secondary); font: var(--type-callout); }
.dn-share-bar > :last-child { margin-left: auto; }
.dn-share-avatar { display: grid; place-items: center; width: var(--icon-size-lg); height: var(--icon-size-lg); border-radius: var(--radius-full); background: var(--fill-selected); color: var(--ink); font: var(--weight-medium) var(--type-caption-size)/1 var(--font-sans); }
.dn-share-foot { width: min(100% - 2 * var(--page-margin), var(--content-max)); margin: 0 auto; padding: var(--space-8) 0; color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-share-foot a { color: inherit; }
```

只读的内容占满第一屏；顶栏只有分享者和一个操作，品牌只在页脚一行：

```html
<div class="dn-site ex-page is-tall" data-density="comfortable">
  <header class="dn-share-bar">
    <span class="dn-share-avatar" aria-hidden="true">林</span>林一 分享
    <button class="dn-button is-sm" type="button">复制到我的笔记</button>
  </header>
  <article class="dn-article">
    <h1>杭州周末去哪儿</h1>
    <p class="dn-article-meta"><time datetime="2026-11-14">11月14日更新</time></p>
    <p>周六上午去龙井村，九点前到，人少。中午在满觉陇吃饭，下午沿着九溪走回来，全程大约两个半小时。</p>
    <p>周日留给良渚博物院，周一闭馆，记得提前约。</p>
  </article>
  <footer class="dn-share-foot"><a href="#">用 Deernova 写成</a></footer>
</div>
```

示例里的正文用[博客页](blog.md)的 `dn-article` 排版。

### 窄屏和手机浏览器

- 顶栏只留分享者名字和按钮，按钮文字太长时换成「打开」。
- 内容左右留 `page-margin`，图片和表格在自己内部横向滚动。

手机上顶栏只留分享者和一个短按钮：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body is-web">
      <div class="dn-site" data-density="comfortable">
        <header class="dn-share-bar"><span class="dn-share-avatar" aria-hidden="true">林</span>林一 分享<button class="dn-button is-sm" type="button">打开</button></header>
        <article class="dn-article">
          <h1>杭州周末去哪儿</h1>
          <p class="dn-article-meta"><time datetime="2026-11-14">11月14日更新</time></p>
          <p>周六上午去龙井村，九点前到，人少。中午在满觉陇吃饭，下午沿着九溪走回来。</p>
        </article>
      </div>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 链接已关闭 | 整页提示：「这个链接已经关闭」，一句「可以请分享者重新发一次」；不显示原来的标题 |
| 需要密码 | 只有一个密码框和「查看」按钮，标题写「林一 分享了一份需要密码的笔记」 |
| 只对某些人可见 | 「登录后查看」，登录后回到这一页 |
| 内容被删除 | 「这条笔记已被删除」，不给任何操作 |
| 看的人就是作者 | 顶栏按钮换成「编辑」，直接进应用 |

## 不要

- 内容上方的「注册 Deernova，免费开始使用」横幅；读到一半弹出注册或下载框。
- 顶栏放完整的产品导航、侧边栏和一排操作按钮，看起来像进了别人的工作区。
- 品牌大字和产品介绍压过分享的内容。
- 链接预览只显示「Deernova - 你的智能笔记」，看不出分享的是什么。
- 链接失效时跳到官网首页，让人不知道发生了什么。
