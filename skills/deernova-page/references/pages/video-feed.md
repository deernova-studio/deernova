# 短视频流

竖屏视频一条占满一屏，上下滑动切换，看的人不用做任何选择。这一页的任务是让视频本身占满注意力：界面退到边上，文字压在视频底部，操作排成一列，评论打开时视频继续播。文字和图片为主、一屏好几条的那种见[图文信息流](feed.md)。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 视频 | 9:16 竖屏，一次一条；上下滑、滚轮或方向键切换，下一条提前加载 | 是 |
| 来源 | 视频上方居中两个标签：关注、推荐 | 是 |
| 作者和文案 | 压在视频底部：头像、名字、「关注」；文案最多两行，点开看全；话题和 @ 用靛青；最后一行是声音的来源 | 是 |
| 操作列 | 竖排在视频右边：喜欢、评论、收藏、分享，图标下面是计数 | 是 |
| 进度 | 视频最底下一条 2 像素的线，按住可以拖动；拖动时放大并显示时间 | 是 |
| 声音 | 网页默认静音，左上角「打开声音」；打开后后面的视频都有声音 | 网页 |
| 评论 | 点评论：桌面在右边打开一栏，手机从底部升起占半屏；视频继续播 | 是 |

- **整页固定深色。** 视频边上的白色会抢走视线，所以这一页不跟随系统外观，始终用深色主题的设计变量（在页面根元素上写 `data-theme="dark"`）。
- **字压在视频上，靠遮罩保证能读。** 视频下半部分有一层从透明到 `canvas`（88%）的遮罩，顶部有一层更浅的，只为压在上面的字在任何画面上都能读；不加别的装饰。
- **操作列只有图标和数字。** 圆形底用 `fill-selected`，喜欢之后心变实心，不变红、不放特效；计数用缩写（「1.2 万」）。
- **评论不打断视频。** 评论栏打开时视频继续播，只是让出位置；关掉评论回到原来的进度。
- **键盘和鼠标也能刷。** 网页上 ↑ ↓ 切换，空格暂停，M 静音；视频右边一对上下按钮，给不习惯滚轮的人。
- **能停下来。** 不自动连播到天亮：播放满一段时间后，在两条视频之间插一屏「已经看了 40 分钟」，给「继续」和「休息一下」。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。头像的写法同[图文信息流](feed.md)。

```css
.dn-reels { display: grid; grid-template-columns: minmax(0, 1fr) auto; flex: 1; min-height: 0; gap: var(--space-4); padding: var(--space-4) var(--space-6); background: var(--canvas); color: var(--ink); }
.dn-reels-stage { display: flex; justify-content: center; align-items: flex-end; gap: var(--space-4); height: 100%; min-height: 0; }
.dn-reel { position: relative; height: 100%; aspect-ratio: 9 / 16; overflow: hidden; border-radius: var(--card-radius); background: var(--surface-sunken); }
.dn-reel > :is(img, video) { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.dn-reel::before { content: ""; position: absolute; inset: 0 0 auto; z-index: 1; height: 22%; background: linear-gradient(color-mix(in srgb, var(--canvas) 70%, transparent), transparent); pointer-events: none; }
.dn-reel::after { content: ""; position: absolute; inset: 50% 0 0; background: linear-gradient(transparent, color-mix(in srgb, var(--canvas) 88%, transparent) 75%); pointer-events: none; }
.dn-reel-tabs { position: absolute; top: var(--space-4); left: 0; right: 0; z-index: 2; display: flex; justify-content: center; gap: var(--space-5); font: var(--weight-medium) var(--type-body-size)/1 var(--font-sans); }
.dn-reel-tabs a { color: var(--ink-secondary); text-decoration: none; }
.dn-reel-tabs a[aria-current="page"] { color: var(--ink); }
.dn-reel-mute { position: absolute; top: var(--space-3); left: var(--space-3); z-index: 1; }
.dn-reel-info { position: absolute; left: var(--space-4); right: var(--space-4); bottom: var(--space-5); z-index: 1; display: grid; gap: var(--space-1); }
.dn-reel-author { display: flex; align-items: center; gap: var(--space-2); font: var(--weight-semibold) var(--type-body-size)/var(--type-body-line) var(--font-sans); }
.dn-reel-caption { display: -webkit-box; margin: 0; overflow: hidden; font: var(--type-callout); -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
.dn-reel-caption a { color: var(--link); text-decoration: none; }
.dn-reel-sound { display: flex; align-items: center; gap: var(--space-1); color: var(--ink-secondary); font: var(--type-footnote); }
.dn-reel-sound > .dn-icon { width: var(--icon-size-sm); height: var(--icon-size-sm); }
.dn-reel-progress { position: absolute; left: 0; right: 0; bottom: 0; z-index: 1; height: 2px; background: var(--fill-selected); }
.dn-reel-progress > i { display: block; height: 100%; background: var(--ink); }
.dn-reel-side { display: grid; justify-items: center; gap: var(--space-4); padding-bottom: var(--space-5); }
.dn-reel-action { display: grid; justify-items: center; gap: var(--space-1); padding: 0; border: 0; background: none; color: var(--ink); font: var(--weight-regular) var(--type-caption-size)/1 var(--font-sans); font-variant-numeric: tabular-nums; cursor: pointer; }
.dn-reel-action > span { display: grid; place-items: center; width: 44px; height: 44px; border-radius: var(--radius-full); background: var(--fill-selected); }
.dn-reel-action .dn-icon { width: var(--icon-size-lg); height: var(--icon-size-lg); }
.dn-reel-action[aria-pressed="true"] .dn-icon { fill: currentColor; }
.dn-reel > .dn-reel-side { position: absolute; right: var(--space-3); bottom: var(--space-12); z-index: 1; padding: 0; }
.dn-reel > .dn-reel-side ~ .dn-reel-info { right: 72px; }
.dn-reels-nav { display: grid; align-content: center; gap: var(--space-2); }
.dn-reel.is-full { width: 100%; height: 100%; aspect-ratio: auto; border-radius: 0; }
.dn-comments { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
.dn-comments-head { display: flex; align-items: center; justify-content: space-between; padding-bottom: var(--space-2); border-bottom: var(--stroke-line) solid var(--line); font: var(--type-headline); }
.dn-comments ul { flex: 1; min-height: 0; overflow-y: auto; margin: 0; padding: 0; list-style: none; }
.dn-comment { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; gap: var(--space-2); padding: var(--space-3) 0; font: var(--type-callout); }
.dn-comment b { display: block; color: var(--ink-secondary); font: var(--type-footnote); }
.dn-comment-like { display: grid; justify-items: center; color: var(--ink-tertiary); font: var(--type-caption); }
```

视频居中占满高度，作者和文案压在底部，操作列在视频右边，最右边一对上下按钮；网页默认静音，左上角是「打开声音」：

```html
<div class="dn-app ex-page is-tall" data-theme="dark">
  <nav class="dn-sidebar" aria-label="导航">
    <div class="dn-sidebar-section">
      <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-home"/></svg><span class="dn-sidebar-label">推荐</span></a>
      <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-user"/></svg><span class="dn-sidebar-label">关注</span></a>
      <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><span class="dn-sidebar-label">搜索</span></a>
      <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-bookmark"/></svg><span class="dn-sidebar-label">收藏</span></a>
    </div>
  </nav>
  <div class="dn-app-main">
    <div class="dn-reels">
      <div class="dn-reels-stage">
        <div class="dn-reel">
          <img src="assets/examples/halftone-dark.png" alt="一头麋鹿在雪地里走">
          <button class="dn-button is-sm dn-reel-mute" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-mute"/></svg>打开声音</button>
          <div class="dn-reel-info">
            <div class="dn-reel-author"><span class="dn-entry-avatar" aria-hidden="true">沈</span>沈遥<button class="dn-button is-sm" type="button">关注</button></div>
            <p class="dn-reel-caption">早上六点的雪原，它走了二十分钟才发现我。<a href="#">#野生动物</a> <a href="#">#冬天</a></p>
            <span class="dn-reel-sound"><svg class="dn-icon" aria-hidden="true"><use href="#dn-volume"/></svg>原声：沈遥</span>
          </div>
          <div class="dn-reel-progress" aria-hidden="true"><i style="width: 38%"></i></div>
        </div>
        <div class="dn-reel-side">
          <button class="dn-reel-action" type="button" aria-pressed="true" aria-label="喜欢，1.2 万"><span><svg class="dn-icon" aria-hidden="true"><use href="#dn-heart"/></svg></span>1.2 万</button>
          <button class="dn-reel-action" type="button" aria-label="评论，368"><span><svg class="dn-icon" aria-hidden="true"><use href="#dn-chat"/></svg></span>368</button>
          <button class="dn-reel-action" type="button" aria-label="收藏，905"><span><svg class="dn-icon" aria-hidden="true"><use href="#dn-bookmark"/></svg></span>905</button>
          <button class="dn-reel-action" type="button" aria-label="分享"><span><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></span>分享</button>
        </div>
      </div>
      <div class="dn-reels-nav">
        <button class="dn-icon-button" type="button" aria-label="上一条"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-up"/></svg></button>
        <button class="dn-icon-button" type="button" aria-label="下一条"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg></button>
      </div>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 视频占满整屏，没有圆角；操作列压在视频右下方，作者和文案在左下，给操作列让出 72 的宽度。
- 来源标签压在视频顶部居中；侧边导航换成底部一排图标。
- 手机浏览器里默认静音，第一次点屏幕打开声音。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 窗口固定深色外观（`.preferredColorScheme(.dark)`），视频在内容区里按高度居中。
- 评论放在 `.inspector` 里，打开时视频往左让，继续播放。
- 触控板上下轻扫切换；↑ ↓、空格、M 和网页一样；全屏时侧边栏和工具栏隐藏。

```swift
NavigationSplitView {
    List(selection: $section) { ForEach(Section.allCases) { Label($0.title, systemImage: $0.symbol) } }
} detail: {
    ScrollView(.vertical) {
        LazyVStack(spacing: 0) {
            ForEach(feed.videos) { video in
                ReelView(video: video)                      // AVPlayer，9:16，底部文案和右侧操作列
                    .containerRelativeFrame(.vertical)
            }
        }
        .scrollTargetLayout()
    }
    .scrollTargetBehavior(.paging)
    .inspector(isPresented: $showsComments) { CommentsView(video: feed.current) }
}
.preferredColorScheme(.dark)
```

评论在右边的 inspector 里打开，视频让出位置继续播：

```html
<div class="ex-mac has-inspector" data-theme="dark">
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div><span class="ex-mac-title">推荐</span></div>
    <div class="ex-mac-body">
      <div class="dn-reels-stage">
        <div class="dn-reel">
          <img src="assets/examples/halftone-dark.png" alt="一头麋鹿在雪地里走">
          <div class="dn-reel-info">
            <div class="dn-reel-author">沈遥</div>
            <p class="dn-reel-caption">早上六点的雪原，它走了二十分钟才发现我。<a href="#">#野生动物</a></p>
          </div>
          <div class="dn-reel-progress" aria-hidden="true"><i style="width: 38%"></i></div>
        </div>
        <div class="dn-reel-side">
          <button class="dn-reel-action" type="button" aria-pressed="true" aria-label="喜欢，1.2 万"><span><svg class="dn-icon" aria-hidden="true"><use href="#dn-heart"/></svg></span>1.2 万</button>
          <button class="dn-reel-action" type="button" aria-label="评论，368"><span><svg class="dn-icon" aria-hidden="true"><use href="#dn-chat"/></svg></span>368</button>
          <button class="dn-reel-action" type="button" aria-label="分享"><span><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></span>分享</button>
        </div>
      </div>
    </div>
  </div>
  <aside class="ex-mac-inspector dn-comments" aria-label="评论">
    <div class="dn-comments-head">368 条评论</div>
    <ul>
      <li class="dn-comment"><span class="dn-entry-avatar" aria-hidden="true">周</span><span><b>周舟</b>它回头那一下太好了</span><span class="dn-comment-like"><svg class="dn-icon" aria-hidden="true"><use href="#dn-heart"/></svg>86</span></li>
      <li class="dn-comment"><span class="dn-entry-avatar" aria-hidden="true">林</span><span><b>林一</b>是在哪拍的？</span><span class="dn-comment-like"><svg class="dn-icon" aria-hidden="true"><use href="#dn-heart"/></svg>12</span></li>
    </ul>
  </aside>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 视频铺满整个屏幕，状态栏压在视频上；来源标签在顶部居中，标签栏在底部。
- 上下滑切换，单击暂停，双击喜欢（心在点的位置轻轻出现一次，不放满屏特效）；长按是倍速和「不感兴趣」。
- 评论是从底部升起的 sheet，停在半屏，视频缩到上半部分继续播。
- 开着「减弱动态效果」时不自动播放下一条，显示封面和播放按钮。

```swift
ScrollView(.vertical) {
    LazyVStack(spacing: 0) {
        ForEach(feed.videos) { video in
            ReelView(video: video)
                .containerRelativeFrame([.horizontal, .vertical])
                .onTapGesture(count: 2) { like(video) }
        }
    }
    .scrollTargetLayout()
}
.scrollTargetBehavior(.paging)
.ignoresSafeArea()
.sheet(isPresented: $showsComments) { CommentsView(video: feed.current).presentationDetents([.medium, .large]) }
.preferredColorScheme(.dark)
```

视频铺满屏幕，操作列压在右下，作者和文案在左下，底部是标签栏：

```html
<div class="ex-device">
  <div class="ex-phone is-media" data-density="touch" data-theme="dark">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="dn-reel is-full">
        <img src="assets/examples/halftone-dark.png" alt="一头麋鹿在雪地里走">
        <nav class="dn-reel-tabs" aria-label="来源"><a href="#">关注</a><a href="#" aria-current="page">推荐</a></nav>
        <div class="dn-reel-side">
          <button class="dn-reel-action" type="button" aria-pressed="true" aria-label="喜欢，1.2 万"><span><svg class="dn-icon" aria-hidden="true"><use href="#dn-heart"/></svg></span>1.2 万</button>
          <button class="dn-reel-action" type="button" aria-label="评论，368"><span><svg class="dn-icon" aria-hidden="true"><use href="#dn-chat"/></svg></span>368</button>
          <button class="dn-reel-action" type="button" aria-label="收藏，905"><span><svg class="dn-icon" aria-hidden="true"><use href="#dn-bookmark"/></svg></span>905</button>
          <button class="dn-reel-action" type="button" aria-label="分享"><span><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></span>分享</button>
        </div>
        <div class="dn-reel-info">
          <div class="dn-reel-author">沈遥<button class="dn-button is-sm" type="button">关注</button></div>
          <p class="dn-reel-caption">早上六点的雪原，它走了二十分钟才发现我。<a href="#">#野生动物</a> <a href="#">#冬天</a></p>
          <span class="dn-reel-sound"><svg class="dn-icon" aria-hidden="true"><use href="#dn-volume"/></svg>原声：沈遥</span>
        </div>
        <div class="dn-reel-progress" aria-hidden="true"><i style="width: 38%"></i></div>
      </div>
    </div>
    <div class="ex-ios-dock">
      <div class="dn-glass dn-glass-group" role="group" aria-label="标签栏">
        <button class="dn-glass-button" type="button" aria-label="首页" aria-pressed="true"><svg class="dn-icon" aria-hidden="true"><use href="#dn-home"/></svg></button>
        <button class="dn-glass-button" type="button" aria-label="搜索"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg></button>
        <button class="dn-glass-button" type="button" aria-label="消息"><svg class="dn-icon" aria-hidden="true"><use href="#dn-mail"/></svg></button>
        <button class="dn-glass-button" type="button" aria-label="我"><svg class="dn-icon" aria-hidden="true"><use href="#dn-user"/></svg></button>
      </div>
      <button class="dn-glass dn-glass-button is-prominent" type="button" aria-label="拍摄"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 下一条还没加载好 | 先显示封面，中间一个小的 `spinner`；不显示黑屏 |
| 网络变慢 | 自动降低清晰度，左上角一句「已切到流畅」，几秒后消失 |
| 视频已删除或不可看 | 原位一屏「这条视频已被作者删除」，一秒后自动滑到下一条 |
| 可能令人不适 | 封面模糊，中间一句「可能令人不适」加「仍要观看」 |
| 看了很久 | 两条视频之间插一屏「已经看了 40 分钟」，给「继续」和「休息一下」 |
| 没有关注的人发新视频 | 「关注」里是一屏「关注的人还没有新视频」，加「去推荐里看看」 |

## 不要

- 网页一打开就有声播放；或者每条都要重新点一次「打开声音」。
- 操作按钮配彩色底、喜欢变红色并放满屏飘心；在视频上堆贴纸、倒计时和抽奖浮层。
- 评论打开就暂停视频，或者盖住整个视频。
- 文案不限行数，把视频下半部分全遮住；遮罩做成大块深色渐变。
- 只能靠手势切换，网页上没有键盘和按钮的方式。
- 无止境地自动连播，从不给停下来的机会。
