# 个人主页

一个人在社区里的那一页：他是谁、发过什么、要不要关注他。别人点头像来到这里，自己来这里看自己发过的东西、改资料。同一个页面有两种样子：看别人时主操作是「关注」，看自己时是「编辑资料」。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 头部 | 头像、名字、账号；一句简介；所在地、链接、加入时间；关注和被关注的人数 | 是 |
| 主操作 | 看别人：「关注」（已关注时是「已关注」，悬停变「取消关注」）和「私信」；看自己：「编辑资料」。其余放在「更多」：分享主页、屏蔽、举报 | 是 |
| 关系 | 对方关注了你时，名字旁边一个小标签「关注了你」；共同关注的人写一行「林一、周舟也关注了他」 | 有时 |
| 分栏 | 帖子、回复、视频、喜欢；「喜欢」只有自己看得到 | 是 |
| 置顶 | 帖子栏最上面一条置顶的帖子，标「置顶」 | 否 |
| 内容 | 帖子和回复的写法同[图文信息流](feed.md)；视频是三列竖图网格，左下角写播放次数 | 是 |

- **头部不做成名片海报。** 没有大幅封面、渐变底、徽章墙。头像、名字和一句简介就够认出一个人；层次靠字号，不靠底色。
- **一栏，和信息流一样宽。** 头部和内容都在 600 宽的一栏里，左对齐；从信息流点进来，眼睛不用换位置。
- **数字可以点。** 「368 关注」「1.2 万 被关注」点开是人的列表；数字半粗，标签用 `ink-secondary`。
- **简介里能点的用靛青。** 链接、@ 别人、# 话题用 `link`；所在地、加入时间这些元信息分开放，用间距隔开，不用「·」串起来。
- **自己的主页和别人看到的一样。** 自己看时只多了「编辑资料」和「喜欢」那一栏，不另做一个「我的」页面；可以一键「以访客身份查看」。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。头像和帖子的写法同[图文信息流](feed.md)。

```css
.dn-profile { max-width: var(--content-max); margin-inline: auto; }
.dn-profile-head { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; gap: var(--space-4); align-items: start; padding: var(--space-4) 0; }
.dn-profile-avatar { display: grid; place-items: center; width: calc(var(--button-height-md) * 2); height: calc(var(--button-height-md) * 2); border-radius: var(--radius-full); background: var(--fill-selected); color: var(--ink); font: var(--weight-semibold) var(--type-title-size)/1 var(--font-sans); }
.dn-profile-name { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-2); margin: 0; font: var(--type-title); }
.dn-profile-handle { margin: 0; color: var(--ink-tertiary); font: var(--type-callout); }
.dn-profile-actions { display: flex; gap: var(--gap-stack); }
.dn-profile-bio { grid-column: 1 / -1; margin: 0; color: var(--ink); font: var(--type-body); }
.dn-profile-bio a { color: var(--link); text-decoration: none; }
.dn-profile-meta { display: flex; flex-wrap: wrap; grid-column: 1 / -1; gap: var(--space-1) var(--space-4); color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-profile-meta > span { display: inline-flex; align-items: center; gap: var(--space-1); }
.dn-profile-meta .dn-icon { width: var(--icon-size-sm); height: var(--icon-size-sm); }
.dn-profile-meta a { color: var(--link); text-decoration: none; }
.dn-profile-stats { display: flex; gap: var(--space-5); grid-column: 1 / -1; }
.dn-profile-stats a { color: var(--ink-secondary); font: var(--type-callout); text-decoration: none; }
.dn-profile-stats b { margin-right: var(--space-1); color: var(--ink); font-weight: var(--weight-semibold); font-variant-numeric: tabular-nums; }
.dn-profile-mutual { grid-column: 1 / -1; margin: 0; color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-profile .dn-panel-tabs { height: auto; padding: var(--space-2) 0; }
.dn-pinned { display: inline-flex; align-items: center; gap: var(--space-1); color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-pinned .dn-icon { width: var(--icon-size-sm); height: var(--icon-size-sm); }
.dn-video-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2px; margin-top: var(--space-3); }
.dn-video-tile { position: relative; display: block; aspect-ratio: 9 / 16; overflow: hidden; background: var(--surface-sunken); }
.dn-video-tile > img { width: 100%; height: 100%; object-fit: cover; }
.dn-video-tile > span { position: absolute; left: var(--space-2); bottom: var(--space-2); display: inline-flex; align-items: center; gap: 2px; padding: 2px var(--space-1); border-radius: var(--radius-xs); background: var(--scrim); color: var(--knob); font: var(--weight-medium) var(--type-caption-size)/1 var(--font-sans); font-variant-numeric: tabular-nums; }
.dn-video-tile .dn-icon { width: var(--icon-size-sm); height: var(--icon-size-sm); }
```

看别人的主页：头部左对齐，主操作是「关注」和「私信」，名字旁边写着「关注了你」；帖子栏最上面是置顶的一条：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar"><button class="dn-button is-plain" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg>首页</button></header>
    <div class="dn-app-content">
      <div class="dn-profile">
        <div class="dn-profile-head">
          <span class="dn-profile-avatar" aria-hidden="true">沈</span>
          <div>
            <h2 class="dn-profile-name">沈遥<span class="dn-tag">关注了你</span></h2>
            <p class="dn-profile-handle">@shenyao</p>
          </div>
          <div class="dn-profile-actions">
            <button class="dn-icon-button" type="button" aria-label="更多"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button>
            <button class="dn-button" type="button">私信</button>
            <button class="dn-button is-primary" type="button">关注</button>
          </div>
          <p class="dn-profile-bio">拍野生动物，偶尔写字。这一季在 <a href="#">#东北雪原</a>，和 <a href="#">@林一</a> 一起。</p>
          <div class="dn-profile-meta">
            <span><svg class="dn-icon" aria-hidden="true"><use href="#dn-home"/></svg>杭州</span>
            <span><svg class="dn-icon" aria-hidden="true"><use href="#dn-link"/></svg><a href="#">shenyao.photo</a></span>
            <span>2023 年 4 月加入</span>
          </div>
          <div class="dn-profile-stats"><a href="#"><b>368</b>关注</a><a href="#"><b>1.2 万</b>被关注</a></div>
          <p class="dn-profile-mutual">林一、周舟也关注了她</p>
        </div>
        <div class="dn-panel-tabs" role="tablist" aria-label="内容">
          <button type="button" role="tab" aria-selected="true" id="ex-profile-posts-tab" aria-controls="ex-profile-posts-tab-panel">帖子</button>
          <button type="button" role="tab" aria-selected="false">回复</button>
          <button type="button" role="tab" aria-selected="false">视频</button>
        </div>
        <div role="tabpanel" id="ex-profile-posts-tab-panel" aria-labelledby="ex-profile-posts-tab">
        <article class="dn-entry">
          <span class="dn-entry-avatar" aria-hidden="true">沈</span>
          <div>
            <span class="dn-pinned"><svg class="dn-icon" aria-hidden="true"><use href="#dn-pin"/></svg>置顶</span>
            <div class="dn-entry-head"><span class="dn-entry-name">沈遥</span><span class="dn-entry-meta">10月3日</span></div>
            <p class="dn-entry-text">今年冬天的计划：在雪原上等一头麋鹿回头。拍到了就发在这里。</p>
            <div class="dn-entry-actions">
              <button class="dn-entry-action" type="button" aria-label="回复，86"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chat"/></svg>86</button>
              <button class="dn-entry-action" type="button" aria-label="转发，41"><svg class="dn-icon" aria-hidden="true"><use href="#dn-repost"/></svg>41</button>
              <button class="dn-entry-action" type="button" aria-label="喜欢，2,310"><svg class="dn-icon" aria-hidden="true"><use href="#dn-heart"/></svg>2,310</button>
              <button class="dn-entry-action" type="button" aria-label="收藏"><svg class="dn-icon" aria-hidden="true"><use href="#dn-bookmark"/></svg></button>
              <button class="dn-entry-action" type="button" aria-label="分享"><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></button>
            </div>
          </div>
        </article>
        </div>
      </div>
    </div>
  </div>
</div>
```

看自己的主页：主操作换成「编辑资料」，多一栏只有自己看得到的「喜欢」；视频栏是三列竖图，左下角是播放次数：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar"><h2 class="dn-toolbar-title"><span>我</span></h2></header>
    <div class="dn-app-content">
      <div class="dn-profile">
        <div class="dn-profile-head">
          <span class="dn-profile-avatar" aria-hidden="true">林</span>
          <div>
            <h2 class="dn-profile-name">林一</h2>
            <p class="dn-profile-handle">@linyi</p>
          </div>
          <div class="dn-profile-actions"><button class="dn-button" type="button">编辑资料</button></div>
          <div class="dn-profile-stats"><a href="#"><b>212</b>关注</a><a href="#"><b>3,480</b>被关注</a></div>
        </div>
        <div class="dn-panel-tabs" role="tablist" aria-label="内容">
          <button type="button" role="tab" aria-selected="false">帖子</button>
          <button type="button" role="tab" aria-selected="false">回复</button>
          <button type="button" role="tab" aria-selected="true" id="ex-profile-video-tab" aria-controls="ex-profile-video-tab-panel">视频</button>
          <button type="button" role="tab" aria-selected="false">喜欢</button>
        </div>
        <div role="tabpanel" id="ex-profile-video-tab-panel" aria-labelledby="ex-profile-video-tab" class="dn-video-grid">
          <a class="dn-video-tile" href="#"><img src="assets/examples/halftone-dark.png" alt="雪原上的麋鹿" style="object-position: 30% 20%"><span><svg class="dn-icon" aria-hidden="true"><use href="#dn-play"/></svg>8.6 万</span></a>
          <a class="dn-video-tile" href="#"><img src="assets/examples/halftone-light.png" alt="茶田里的小路" style="object-position: 60% 40%"><span><svg class="dn-icon" aria-hidden="true"><use href="#dn-play"/></svg>1.2 万</span></a>
          <a class="dn-video-tile" href="#"><img src="assets/examples/halftone-dark.png" alt="清晨的树林" style="object-position: 90% 70%"><span><svg class="dn-icon" aria-hidden="true"><use href="#dn-play"/></svg>3,402</span></a>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 头像仍是 `is-xl` 那一档（触屏上自动变大），主操作移到简介下面一行，「关注」占满宽度，「私信」和「更多」在它右边。
- 分栏在向下滚动时贴住顶部；视频网格仍然三列。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 在主窗口内容区里推入，工具栏左边是返回；主页的内容在 600 宽里居中。
- 分栏用工具栏中间的分段控件；「关注」「私信」放在头部，不放进工具栏。
- 右键头像或名字是菜单：复制链接、屏蔽、举报。

```swift
ScrollView {
    VStack(alignment: .leading, spacing: Deernova.space4) {
        ProfileHeader(user: user)                 // 头像、名字、简介、元信息、人数、关注
        switch tab {
        case .posts: ForEach(user.posts) { PostRow(post: $0) }
        case .videos: LazyVGrid(columns: Array(repeating: GridItem(spacing: 2), count: 3), spacing: 2) { ForEach(user.videos) { VideoTile(video: $0) } }
        default: EmptyView()
        }
    }
    .frame(maxWidth: 600)
    .frame(maxWidth: .infinity)
}
.toolbar {
    ToolbarItem(placement: .principal) { Picker("内容", selection: $tab) { ProfileTabs(isMe: user.isMe) }.pickerStyle(.segmented) }
}
```

头部和内容在窗口里居中，分栏在工具栏中间：

```html
<div class="ex-mac">
  <nav class="ex-mac-sidebar" aria-label="导航">
    <div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-home"/></svg><span class="dn-sidebar-label">首页</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-bell"/></svg><span class="dn-sidebar-label">通知</span></a>
    <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-user"/></svg><span class="dn-sidebar-label">我</span></a>
  </nav>
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><span class="ex-mac-title">林一</span><div class="dn-segmented" role="group" aria-label="内容"><button type="button" aria-pressed="true">帖子</button><button type="button" aria-pressed="false">视频</button><button type="button" aria-pressed="false">喜欢</button></div></div>
    <div class="ex-mac-body dn-profile">
      <div class="dn-profile-head">
        <span class="dn-profile-avatar" aria-hidden="true">林</span>
        <div><h2 class="dn-profile-name">林一</h2><p class="dn-profile-handle">@linyi</p></div>
        <div class="dn-profile-actions"><button class="dn-button" type="button">编辑资料</button></div>
        <p class="dn-profile-bio">做笔记应用的设计。周末在山里。</p>
        <div class="dn-profile-stats"><a href="#"><b>212</b>关注</a><a href="#"><b>3,480</b>被关注</a></div>
      </div>
      <article class="dn-entry">
        <span class="dn-entry-avatar" aria-hidden="true">林</span>
        <div>
          <div class="dn-entry-head"><span class="dn-entry-name">林一</span><span class="dn-entry-meta">昨天</span></div>
          <p class="dn-entry-text">设置页的交互稿周五评审，欢迎来挑刺。</p>
        </div>
      </article>
    </div>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 从信息流点头像推入；顶部是返回和「更多」，往下滚时名字出现在导航栏中间。
- 主操作在简介下面一行：「关注」占满剩余宽度，「私信」在右边。
- 分栏用分段控件，滚动时贴住顶部；视频是三列竖图，点开进入[短视频流](video-feed.md)，从这一条开始往下刷。

```swift
ScrollView {
    LazyVStack(alignment: .leading, spacing: Deernova.space4, pinnedViews: .sectionHeaders) {
        ProfileHeader(user: user)
        Section {
            ProfileContent(user: user, tab: tab)
        } header: {
            Picker("内容", selection: $tab) { ProfileTabs(isMe: user.isMe) }.pickerStyle(.segmented).background(.bar)
        }
    }
    .padding(.horizontal, Deernova.pageMargin)
}
.navigationTitle(user.name)
.navigationBarTitleDisplayMode(.inline)
.toolbar { Menu("更多", systemImage: "ellipsis") { ProfileMenu(user: user) } }
```

主操作在简介下面一行，「关注」占满宽度；分栏贴住顶部：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-icon-button" type="button" aria-label="返回"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg></button><button class="dn-icon-button" type="button" aria-label="更多"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></div>
      <div class="dn-profile-head">
        <span class="dn-profile-avatar" aria-hidden="true">沈</span>
        <div><h2 class="dn-profile-name">沈遥</h2><p class="dn-profile-handle">@shenyao</p></div>
        <span></span>
        <p class="dn-profile-bio">拍野生动物，偶尔写字。这一季在 <a href="#">#东北雪原</a>。</p>
        <div class="dn-profile-stats"><a href="#"><b>368</b>关注</a><a href="#"><b>1.2 万</b>被关注</a></div>
        <div class="dn-profile-actions ex-profile-actions"><button class="dn-button is-primary" type="button">关注</button><button class="dn-button" type="button">私信</button></div>
      </div>
      <div class="dn-segmented" role="group" aria-label="内容"><button type="button" aria-pressed="false">帖子</button><button type="button" aria-pressed="true">视频</button><button type="button" aria-pressed="false">回复</button></div>
      <div class="dn-video-grid">
        <a class="dn-video-tile" href="#"><img src="assets/examples/halftone-dark.png" alt="雪原上的麋鹿" style="object-position: 30% 20%"><span><svg class="dn-icon" aria-hidden="true"><use href="#dn-play"/></svg>8.6 万</span></a>
        <a class="dn-video-tile" href="#"><img src="assets/examples/halftone-light.png" alt="茶田里的小路" style="object-position: 60% 40%"><span><svg class="dn-icon" aria-hidden="true"><use href="#dn-play"/></svg>1.2 万</span></a>
        <a class="dn-video-tile" href="#"><img src="assets/examples/halftone-dark.png" alt="清晨的树林" style="object-position: 90% 70%"><span><svg class="dn-icon" aria-hidden="true"><use href="#dn-play"/></svg>3,402</span></a>
      </div>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 还没发过内容 | 看别人：一行灰字「沈遥还没有发过帖子」；看自己：[空状态](../../../deernova-style/references/components/empty-state.md)「发第一条帖子」加「发布」 |
| 私密账号 | 头部照常，内容区写「这个账号只给关注的人看」，主操作变成「申请关注」；申请后是「已申请」 |
| 你屏蔽了对方 | 头部照常，内容区写「你屏蔽了沈遥」加「取消屏蔽」，内容不显示 |
| 对方屏蔽了你 | 只显示名字和账号，写「你看不到这个账号的内容」，没有关注按钮 |
| 账号不存在或已注销 | 按[整页错误](error.md)：「这个账号不存在」，给搜索框 |
| 取消关注 | 悬停「已关注」时变成「取消关注」；点了直接取消，给「撤销」，不先弹确认 |

## 不要

- 头部铺一张大封面图、渐变底，或者一排认证、等级、会员的彩色徽章。
- 关注数、获赞数、作品数排成三四个大号统计卡片。
- 自己的主页和别人看到的长得不一样，另做一个「个人中心」把设置、钱包、草稿都塞进来。
- 名字、所在地、加入时间用「·」串成一行。
- 取消关注先弹窗问「确定吗」；关注后弹「关注成功」。
