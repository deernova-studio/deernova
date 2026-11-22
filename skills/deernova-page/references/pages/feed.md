# 图文信息流

一条接一条往下刷的短内容：文字、图片、链接，可以回复、转发、喜欢。用户来这里是为了看，偶尔说一句。这一页要让人读得舒服、不丢位置，而且随时能停下来。短视频一条占满一屏的那种见[短视频流](video-feed.md)。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 导航 | 首页、搜索、通知、私信、收藏、个人主页；「发布」放在导航最下面；宽屏上信息流顶部已有写帖框时，导航里不再放「发布」 | 是 |
| 顶栏 | 「首页」，和信息流的来源：为你推荐、关注 | 是 |
| 发布框 | 信息流最上面一行：头像和「写点什么」，点进去展开；发布后自己的帖子出现在第一条 | 是 |
| 新内容提示 | 有新帖时，顶部浮出「12 条新内容」，点一下才把新帖放进来，回到顶部 | 是 |
| 帖子 | 头像、名字、账号、时间；正文；图片或链接卡片；操作行：回复、转发、喜欢、收藏、分享，带计数 | 是 |
| 侧栏 | 宽屏时信息流右边：搜索、正在讨论的话题、可能认识的人 | 否 |

- **一栏居中，宽不超过 `content-max`。** 正文一行 40 来个字，和对话、文档的内容栏一样宽；帖子之间一条细线，不放进卡片。
- **不自动插入新帖。** 用户在读的时候，新内容只变成顶部的提示；点了才插进来。刷新、返回、切换标签后回到原来读到的那一条。
- **头像是唯一的大块图形。** 名字用 `weight-medium` 的 `ink`，账号和时间用 `ink-tertiary`，分开放，用间距隔开，不用「·」串起来。
- **能点的东西用靛青。** 正文里的 @ 某人、# 话题、链接用 `link`；其余文字都是墨色。
- **操作行轻一点。** 五个操作等距排开，`ink-tertiary` 的图标和计数，悬停才变深；喜欢之后心变成实心的墨色，不放彩色烟花。
- **计数用缩写。** 「1.2 万」「368」；精确数字放在悬停的提示里。
- **图片保持比例。** 一张图按原比例，最高不超过一屏的六成；两到四张排成网格，点开是[图片查看器](gallery.md)。长文字超过 8 行折叠成「展开」。
- **能到底。** 无限加载时，侧栏里放页脚链接（关于、隐私、帮助），不放在永远到不了的页面最底下。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-feed-page { display: grid; grid-template-columns: minmax(0, var(--content-max)) 280px; justify-content: center; align-items: start; gap: var(--space-8); }
.dn-feed { position: relative; min-width: 0; }
.dn-feed-new { position: sticky; top: var(--space-3); z-index: 1; display: flex; justify-content: center; padding: var(--space-3) 0 0; pointer-events: none; }
.dn-feed-new > .dn-button { box-shadow: var(--shadow-float); pointer-events: auto; }
.dn-feed-compose { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: var(--space-3); padding: var(--space-3) 0 var(--space-4); border-bottom: var(--stroke-line) solid var(--line); }
.dn-feed-compose > input { min-width: 0; padding: 0; border: 0; background: transparent; color: var(--ink); font: var(--type-body); outline: none; }
.dn-feed-compose > input::placeholder { color: var(--ink-tertiary); }
.dn-entry { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: var(--space-3); padding: var(--space-4) 0 var(--space-2); border-bottom: var(--stroke-line) solid var(--line); }
.dn-entry-avatar { display: grid; place-items: center; width: var(--button-height-md); height: var(--button-height-md); border-radius: var(--radius-full); background: var(--fill-selected); color: var(--ink); font: var(--weight-medium) var(--type-callout-size)/1 var(--font-sans); }
.dn-entry-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0 var(--space-2); }
.dn-entry-name { color: var(--ink); font: var(--weight-medium) var(--type-body-size)/var(--type-body-line) var(--font-sans); }
.dn-entry-meta { color: var(--ink-tertiary); font: var(--type-callout); font-variant-numeric: tabular-nums; }
.dn-entry-head > .dn-icon-button { margin-left: auto; }
.dn-entry-text { margin: 2px 0 0; color: var(--ink); font: var(--type-body); }
.dn-entry-text a { color: var(--link); text-decoration: none; }
.dn-entry-media { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2px; margin-top: var(--space-3); overflow: hidden; border: var(--stroke-line) solid var(--line); border-radius: var(--card-radius); }
.dn-entry-media > img { display: block; width: 100%; aspect-ratio: 1; object-fit: cover; }
.dn-entry-media > img:only-child { grid-column: 1 / -1; aspect-ratio: 16 / 10; }
.dn-entry-link { display: grid; gap: 2px; margin-top: var(--space-3); padding: var(--space-3); border: var(--stroke-line) solid var(--line); border-radius: var(--card-radius); color: var(--ink); text-decoration: none; }
.dn-entry-link > span { color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-entry-actions { display: flex; justify-content: space-between; max-width: 440px; margin: var(--space-2) 0 0 calc(var(--space-2) * -1); }
.dn-entry-action { display: inline-flex; align-items: center; gap: var(--space-1); height: var(--button-height-md); padding: 0 var(--space-2); border: 0; border-radius: var(--radius-full); background: transparent; color: var(--ink-tertiary); font: var(--weight-regular) var(--type-footnote-size)/1 var(--font-sans); font-variant-numeric: tabular-nums; cursor: pointer; }
@media (hover: hover) { .dn-entry-action:hover { background: var(--fill-hover); color: var(--ink); } }
.dn-entry-action[aria-pressed="true"] { color: var(--ink); }
.dn-entry-action[aria-pressed="true"] .dn-icon { fill: currentColor; }
.dn-feed-aside { position: sticky; top: var(--space-3); display: grid; gap: var(--space-5); }
.dn-feed-aside h3 { margin: 0 0 var(--space-2); font: var(--type-headline); }
.dn-trends { display: grid; gap: var(--space-3); margin: 0; padding: 0; list-style: none; }
.dn-trends a { display: grid; color: var(--link); font: var(--weight-medium) var(--type-callout-size)/var(--type-callout-line) var(--font-sans); text-decoration: none; }
.dn-trends a > span { color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-feed-foot { display: flex; flex-wrap: wrap; gap: var(--space-1) var(--space-3); color: var(--ink-tertiary); font: var(--type-footnote); }
@media (max-width: 1280px) {
  .dn-feed-page { grid-template-columns: minmax(0, var(--content-max)); }
  .dn-feed-aside { display: none; }
}
```

一栏居中的信息流：顶上浮着新内容的提示，点了才插进来；能点的 @、# 和链接是靛青，其余都是墨色；右边侧栏放话题和页脚：

```html
<div class="dn-app ex-page is-tall">
  <nav class="dn-sidebar" aria-label="导航">
    <div class="dn-sidebar-section">
      <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-home"/></svg><span class="dn-sidebar-label">首页</span></a>
      <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><span class="dn-sidebar-label">搜索</span></a>
      <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-bell"/></svg><span class="dn-sidebar-label">通知</span><span class="dn-sidebar-count">3</span></a>
      <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-mail"/></svg><span class="dn-sidebar-label">私信</span></a>
      <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-bookmark"/></svg><span class="dn-sidebar-label">收藏</span></a>
      <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-user"/></svg><span class="dn-sidebar-label">我</span></a>
    </div>
  </nav>
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <h2 class="dn-toolbar-title"><span>首页</span></h2>
      <div class="dn-toolbar-actions"><div class="dn-segmented" role="group" aria-label="来源"><button type="button" aria-pressed="true">为你推荐</button><button type="button" aria-pressed="false">关注</button></div></div>
    </header>
    <div class="dn-app-content">
      <div class="dn-feed-page">
        <div class="dn-feed">
          <div class="dn-feed-compose"><span class="dn-entry-avatar" aria-hidden="true">林</span><input type="text" placeholder="写点什么" aria-label="写点什么"><button class="dn-button is-primary is-sm" type="button" disabled>发布</button></div>
          <div class="dn-feed-new"><button class="dn-button is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-up"/></svg>12 条新内容</button></div>
          <article class="dn-entry">
            <span class="dn-entry-avatar" aria-hidden="true">周</span>
            <div>
              <div class="dn-entry-head"><span class="dn-entry-name">周舟</span><span class="dn-entry-meta">@zhouzhou</span><span class="dn-entry-meta">12 分钟</span><button class="dn-icon-button" type="button" aria-label="更多"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></div>
              <p class="dn-entry-text">改版第二周的数据出来了：找不到「归档」的人从 5/7 降到 1/7。把它挪到侧边栏底部这件事，比我们想的重要得多。<a href="#">#设计复盘</a></p>
              <div class="dn-entry-actions">
                <button class="dn-entry-action" type="button" aria-label="回复，24"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chat"/></svg>24</button>
                <button class="dn-entry-action" type="button" aria-label="转发，8"><svg class="dn-icon" aria-hidden="true"><use href="#dn-repost"/></svg>8</button>
                <button class="dn-entry-action" type="button" aria-pressed="true" aria-label="喜欢，132"><svg class="dn-icon" aria-hidden="true"><use href="#dn-heart"/></svg>132</button>
                <button class="dn-entry-action" type="button" aria-label="收藏"><svg class="dn-icon" aria-hidden="true"><use href="#dn-bookmark"/></svg></button>
                <button class="dn-entry-action" type="button" aria-label="分享"><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></button>
              </div>
            </div>
          </article>
          <article class="dn-entry">
            <span class="dn-entry-avatar" aria-hidden="true">沈</span>
            <div>
              <div class="dn-entry-head"><span class="dn-entry-name">沈遥</span><span class="dn-entry-meta">@shenyao</span><span class="dn-entry-meta">1 小时</span><button class="dn-icon-button" type="button" aria-label="更多"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></div>
              <p class="dn-entry-text">周末在龙井村走了一圈，九点前到人还很少。谢谢 <a href="#">@林一</a> 推荐的路线。</p>
              <div class="dn-entry-media">
                <img src="assets/examples/halftone-light.png" alt="龙井村的茶田">
              </div>
              <div class="dn-entry-actions">
                <button class="dn-entry-action" type="button" aria-label="回复，6"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chat"/></svg>6</button>
                <button class="dn-entry-action" type="button" aria-label="转发，2"><svg class="dn-icon" aria-hidden="true"><use href="#dn-repost"/></svg>2</button>
                <button class="dn-entry-action" type="button" aria-pressed="false" aria-label="喜欢，1.2 万"><svg class="dn-icon" aria-hidden="true"><use href="#dn-heart"/></svg>1.2 万</button>
                <button class="dn-entry-action" type="button" aria-label="收藏"><svg class="dn-icon" aria-hidden="true"><use href="#dn-bookmark"/></svg></button>
                <button class="dn-entry-action" type="button" aria-label="分享"><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></button>
              </div>
            </div>
          </article>
          <article class="dn-entry">
            <span class="dn-entry-avatar" aria-hidden="true">D</span>
            <div>
              <div class="dn-entry-head"><span class="dn-entry-name">Deernova</span><span class="dn-entry-meta">@deernova</span><span class="dn-entry-meta">昨天</span></div>
              <p class="dn-entry-text">0.4.0 发布：按钮按下时会轻轻一缩，深色主题里的字重补偿了。</p>
              <a class="dn-entry-link" href="#">更新记录：0.4.0<span>deernova.me</span></a>
            </div>
          </article>
        </div>
        <aside class="dn-feed-aside" aria-label="侧栏">
          <label class="dn-input-group"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><input type="search" placeholder="搜索" aria-label="搜索"></label>
          <section>
            <h3>正在讨论</h3>
            <ul class="dn-trends">
              <li><a href="#">#设计复盘<span>1,284 条</span></a></li>
              <li><a href="#">#周末去哪儿<span>862 条</span></a></li>
              <li><a href="#">#深色主题<span>311 条</span></a></li>
            </ul>
          </section>
          <nav class="dn-feed-foot" aria-label="页脚"><a href="#">关于</a><a href="#">帮助</a><a href="#">隐私</a><span>© 2026 Deernova</span></nav>
        </aside>
      </div>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 侧栏去掉；导航变成底部一排图标：首页、搜索、通知、私信、我；「发布」是右下角的圆形按钮。
- 信息流占满宽度，左右留 `page-margin`；头像大小不变（`is-lg` 那一档，触屏上自动变大）。
- 顶栏向下滚动时收起，向上滚一点就回来。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 两栏：系统侧边栏是导航，右边是信息流；信息流宽度跟着窗口，但帖子内容不超过 `content-max`，居中。
- 「为你推荐 / 关注」用工具栏中间的分段控件；⌘N 发布，⌘R 载入新内容。
- 键盘能刷：J、K 上下一条，L 喜欢，R 回复；当前这一条用 `fill-selected` 标出。

```swift
NavigationSplitView {
    List(selection: $section) { ForEach(Section.allCases) { Label($0.title, systemImage: $0.symbol) } }
} detail: {
    ScrollViewReader { proxy in
        List(feed.posts) { PostRow(post: $0).frame(maxWidth: Deernova.contentMax) }
            .listStyle(.plain)
            .overlay(alignment: .top) { if feed.newCount > 0 { NewPostsButton(count: feed.newCount) { feed.insertNew(); proxy.scrollTo(feed.posts.first?.id) } } }
    }
    .toolbar {
        ToolbarItem(placement: .principal) { Picker("来源", selection: $source) { Text("为你推荐").tag(Source.forYou); Text("关注").tag(Source.following) }.pickerStyle(.segmented) }
        ToolbarItem { Button("发布", systemImage: "square.and.pencil", action: compose).keyboardShortcut("n") }
    }
}
```

侧边栏是导航，工具栏中间是来源的分段控件，帖子在窗口里居中：

```html
<div class="ex-mac">
  <nav class="ex-mac-sidebar" aria-label="导航">
    <div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div>
    <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-home"/></svg><span class="dn-sidebar-label">首页</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-bell"/></svg><span class="dn-sidebar-label">通知</span><span class="dn-sidebar-count">3</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-mail"/></svg><span class="dn-sidebar-label">私信</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-bookmark"/></svg><span class="dn-sidebar-label">收藏</span></a>
  </nav>
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><span class="ex-mac-title">首页</span><div class="dn-segmented" role="group" aria-label="来源"><button type="button" aria-pressed="true">为你推荐</button><button type="button" aria-pressed="false">关注</button></div></div>
    <div class="ex-mac-body">
      <article class="dn-entry">
        <span class="dn-entry-avatar" aria-hidden="true">周</span>
        <div>
          <div class="dn-entry-head"><span class="dn-entry-name">周舟</span><span class="dn-entry-meta">12 分钟</span></div>
          <p class="dn-entry-text">找不到「归档」的人从 5/7 降到 1/7。<a href="#">#设计复盘</a></p>
          <div class="dn-entry-actions"><button class="dn-entry-action" type="button" aria-label="回复，24"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chat"/></svg>24</button><button class="dn-entry-action" type="button" aria-label="转发，8"><svg class="dn-icon" aria-hidden="true"><use href="#dn-repost"/></svg>8</button><button class="dn-entry-action" type="button" aria-pressed="true" aria-label="喜欢，132"><svg class="dn-icon" aria-hidden="true"><use href="#dn-heart"/></svg>132</button><button class="dn-entry-action" type="button" aria-label="分享"><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></button></div>
        </div>
      </article>
      <article class="dn-entry">
        <span class="dn-entry-avatar" aria-hidden="true">沈</span>
        <div>
          <div class="dn-entry-head"><span class="dn-entry-name">沈遥</span><span class="dn-entry-meta">1 小时</span></div>
          <p class="dn-entry-text">周末在龙井村走了一圈，九点前到人还很少。谢谢 <a href="#">@林一</a> 推荐的路线。</p>
          <div class="dn-entry-actions"><button class="dn-entry-action" type="button" aria-label="回复，6"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chat"/></svg>6</button><button class="dn-entry-action" type="button" aria-label="转发，2"><svg class="dn-icon" aria-hidden="true"><use href="#dn-repost"/></svg>2</button><button class="dn-entry-action" type="button" aria-label="喜欢，1.2 万"><svg class="dn-icon" aria-hidden="true"><use href="#dn-heart"/></svg>1.2 万</button><button class="dn-entry-action" type="button" aria-label="分享"><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></button></div>
        </div>
      </article>
    </div>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 底部是系统标签栏：首页、搜索、通知、私信、我；「发布」是标签栏旁边单独的玻璃按钮。
- 顶部「为你推荐 / 关注」两个标签，左右滑动也能切换；向下刷时标签栏和顶栏收起，往上一点就回来。
- 下拉刷新只在用户主动下拉时发生；新内容的提示浮在顶部，点一下回到最上面。
- 长按一条帖子是菜单：复制、不感兴趣、屏蔽、举报。

```swift
TabView {
    Tab("首页", systemImage: "house") {
        NavigationStack {
            List(feed.posts) { PostRow(post: $0) }
                .listStyle(.plain)
                .refreshable { await feed.reload() }
                .safeAreaInset(edge: .top) { SourcePicker(source: $source) }
        }
    }
    Tab("搜索", systemImage: "magnifyingglass", role: .search) { SearchView() }
    Tab("通知", systemImage: "bell") { NotificationsView() }.badge(3)
    Tab("我", systemImage: "person") { ProfileView() }
}
.tabBarMinimizeBehavior(.onScrollDown)
```

顶部切换来源，帖子占满宽度；底部是标签栏和单独的发布按钮：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="dn-segmented" role="group" aria-label="来源"><button type="button" aria-pressed="true">为你推荐</button><button type="button" aria-pressed="false">关注</button></div>
      <article class="dn-entry">
        <span class="dn-entry-avatar" aria-hidden="true">周</span>
        <div>
          <div class="dn-entry-head"><span class="dn-entry-name">周舟</span><span class="dn-entry-meta">12 分钟</span></div>
          <p class="dn-entry-text">找不到「归档」的人从 5/7 降到 1/7，比我们想的重要得多。<a href="#">#设计复盘</a></p>
          <div class="dn-entry-actions"><button class="dn-entry-action" type="button" aria-label="回复，24"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chat"/></svg>24</button><button class="dn-entry-action" type="button" aria-label="转发，8"><svg class="dn-icon" aria-hidden="true"><use href="#dn-repost"/></svg>8</button><button class="dn-entry-action" type="button" aria-pressed="true" aria-label="喜欢，132"><svg class="dn-icon" aria-hidden="true"><use href="#dn-heart"/></svg>132</button></div>
        </div>
      </article>
      <article class="dn-entry">
        <span class="dn-entry-avatar" aria-hidden="true">沈</span>
        <div>
          <div class="dn-entry-head"><span class="dn-entry-name">沈遥</span><span class="dn-entry-meta">1 小时</span></div>
          <p class="dn-entry-text">周末在龙井村走了一圈，九点前到人还很少。</p>
          <div class="dn-entry-media"><img src="assets/examples/halftone-light.png" alt="龙井村的茶田"></div>
        </div>
      </article>
    </div>
    <div class="ex-ios-dock">
      <div class="dn-glass dn-glass-group" role="group" aria-label="标签栏">
        <button class="dn-glass-button" type="button" aria-label="首页" aria-pressed="true"><svg class="dn-icon" aria-hidden="true"><use href="#dn-home"/></svg></button>
        <button class="dn-glass-button" type="button" aria-label="搜索"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg></button>
        <button class="dn-glass-button" type="button" aria-label="通知"><svg class="dn-icon" aria-hidden="true"><use href="#dn-bell"/></svg></button>
        <button class="dn-glass-button" type="button" aria-label="我"><svg class="dn-icon" aria-hidden="true"><use href="#dn-user"/></svg></button>
      </div>
      <button class="dn-glass dn-glass-button is-prominent" type="button" aria-label="发布"><svg class="dn-icon" aria-hidden="true"><use href="#dn-new-chat"/></svg></button>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 第一次打开、还没关注任何人 | 「关注」那一栏是[空状态](../../../deernova-style/references/components/empty-state.md)「关注几个人，他们的新帖会出现在这里」，下面列几个可能认识的人，每个带「关注」 |
| 加载更多 | 列表末尾两三条和帖子一样大小的[骨架](../../../deernova-style/references/components/skeleton.md)；加载失败时原位一行「没有加载出来」加「重试」 |
| 有新内容 | 顶部浮出「12 条新内容」；不自动插入，不挪动正在读的那一条 |
| 帖子被删除 | 原位一行灰字「这条内容已被作者删除」，回复串里保留位置 |
| 可能令人不适的图片 | 图片先模糊，上面一句「可能令人不适」加「查看」；不整条隐藏 |
| 离线 | 顶部一条[横幅](../../../deernova-style/references/components/banner.md)「现在没有网络，显示的是之前的内容」；发布的内容排队，联网后自动发出 |

## 不要

- 新帖自动插到最上面，把正在读的内容推下去；返回后跳回顶部。
- 每条帖子装进带阴影的卡片，卡片之间留大空隙。
- 计数写到个位并撑宽操作行（「12,384」）；喜欢后放彩色动画、变成红色。
- 名字、账号和时间用「·」串成一行；给认证、等级、会员挂一排彩色徽章。
- 在信息流里插广告不标「推广」，或者样子和普通帖子一模一样。
- 无限加载把页脚永远推到够不着的地方。
