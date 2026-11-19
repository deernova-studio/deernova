# 通知

社区里别人对你做了什么：回复、提到、转发、喜欢、关注。用户来这里是想知道「有没有人找我」，所以要先把需要回应的露出来，把只是数量的合并起来。应用里后台任务、同步失败这类系统通知见 style 的[通知](../../../deernova-style/references/components/notification.md)，这一页是社区的通知列表。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 「通知」、范围（全部、提及）、右边「通知设置」 | 是 |
| 分组 | 今天、本周、更早 | 是 |
| 合并的通知 | 喜欢、转发、关注：类型图标、最多 3 个叠在一起的头像、「沈遥和另外 23 人喜欢了你的帖子」、被喜欢那条帖子的第一行、时间 | 是 |
| 回复和提及 | 一条一条，不合并：上面一行灰字写回复了哪条，下面是完整的回复，带回复和喜欢两个操作 | 是 |
| 新的关注 | 头像、名字、一句简介、「回关」按钮；已经互相关注的写「互相关注」 | 是 |
| 未读 | 没看过的通知左边一个 `ink` 圆点；打开这一页就算看过，几秒后圆点消失 | 是 |

- **需要回应的不合并，只是数量的合并。** 回复和提及每条都完整显示，能直接回；喜欢、转发按帖子合并成一条，关注按天合并。
- **头像最多叠三个。** 第四个人以后写成「和另外 23 人」；点开是完整的名单。
- **类型图标是灰的。** 喜欢、转发、关注、回复各一个 `ink-secondary` 图标，放在最左边一列，扫一眼就知道是哪种；不给每种配一个颜色。
- **点一条去它说的地方。** 合并的喜欢去那条帖子，关注去那个人的[个人主页](profile.md)，回复去回复串并定位到那一条。
- **不用「全部标为已读」。** 打开就算看过；侧边栏和标签栏上的数字同时清掉。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。头像和帖子操作行的写法同[图文信息流](feed.md)。

```css
.dn-notifs { max-width: 600px; margin-inline: auto; }
.dn-notifs-group { margin: var(--space-5) 0 0; padding-bottom: var(--space-2); border-bottom: var(--stroke-line) solid var(--line); color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-notif { position: relative; display: grid; grid-template-columns: var(--icon-size-md) minmax(0, 1fr) auto; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: var(--stroke-line) solid var(--line); color: var(--ink); text-decoration: none; }
.dn-notif.is-unread::before { content: ""; position: absolute; top: calc(var(--space-3) + (var(--type-body-line) - var(--badge-dot-size)) / 2); left: calc(var(--space-4) * -1); width: var(--badge-dot-size); height: var(--badge-dot-size); border-radius: var(--radius-full); background: var(--ink); }
.dn-notif-type { width: var(--icon-size-md); height: var(--icon-size-md); margin-top: calc((var(--type-body-line) - var(--icon-size-md)) / 2); color: var(--ink-secondary); }
.dn-avatars { display: flex; }
.dn-avatars > span { display: grid; place-items: center; width: 28px; height: 28px; margin-left: -8px; border: 2px solid var(--canvas); border-radius: var(--radius-full); background: var(--fill-selected); color: var(--ink); font: var(--weight-medium) var(--type-caption-size)/1 var(--font-sans); }
.dn-avatars > span:first-child { margin-left: 0; }
.dn-notif-text { margin: var(--space-2) 0 0; font: var(--type-body); }
.dn-notif-text:first-child { margin-top: 0; }
.dn-notif-text b { font-weight: var(--weight-medium); }
.dn-notif-text a { color: var(--link); text-decoration: none; }
.dn-notif-quote { margin: 2px 0 0; overflow: hidden; color: var(--ink-tertiary); font: var(--type-callout); text-overflow: ellipsis; white-space: nowrap; }
.dn-notif-time { color: var(--ink-tertiary); font: var(--type-footnote); font-variant-numeric: tabular-nums; line-height: var(--type-body-line); white-space: nowrap; }
.dn-notif-person { display: flex; align-items: center; gap: var(--space-3); }
.dn-notif-person p { margin: 0; color: var(--ink-tertiary); font: var(--type-footnote); }
```

需要回应的回复单独一条、带操作；喜欢和转发合并成一条、头像叠起来；新的关注直接给「回关」：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <h2 class="dn-toolbar-title"><span>通知</span></h2>
      <div class="dn-toolbar-actions">
        <div class="dn-segmented" role="group" aria-label="范围"><button type="button" aria-pressed="true">全部</button><button type="button" aria-pressed="false">提及</button></div>
        <button class="dn-icon-button" type="button" aria-label="通知设置"><svg class="dn-icon" aria-hidden="true"><use href="#dn-settings"/></svg></button>
      </div>
    </header>
    <div class="dn-app-content">
      <div class="dn-notifs">
        <p class="dn-notifs-group">今天</p>
        <div class="dn-notif is-unread">
          <svg class="dn-icon dn-notif-type" aria-hidden="true"><use href="#dn-chat"/></svg>
          <div>
            <p class="dn-notif-quote">回复了你：设置页的交互稿周五评审，欢迎来挑刺。</p>
            <p class="dn-notif-text"><b>周舟</b> 分组那一块我有点意见，<a href="#">@林一</a> 评审前能先聊十分钟吗？</p>
            <div class="dn-entry-actions">
              <button class="dn-entry-action" type="button" aria-label="回复"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chat"/></svg>回复</button>
              <button class="dn-entry-action" type="button" aria-label="喜欢"><svg class="dn-icon" aria-hidden="true"><use href="#dn-heart"/></svg></button>
            </div>
          </div>
          <span class="dn-notif-time">12 分钟</span>
        </div>
        <a class="dn-notif is-unread" href="#">
          <svg class="dn-icon dn-notif-type" aria-hidden="true"><use href="#dn-heart"/></svg>
          <div>
            <div class="dn-avatars" aria-hidden="true"><span>沈</span><span>周</span><span>陈</span></div>
            <p class="dn-notif-text"><b>沈遥</b>和另外 23 人喜欢了你的帖子</p>
            <p class="dn-notif-quote">设置页的交互稿周五评审，欢迎来挑刺。</p>
          </div>
          <span class="dn-notif-time">1 小时</span>
        </a>
        <div class="dn-notif">
          <svg class="dn-icon dn-notif-type" aria-hidden="true"><use href="#dn-user"/></svg>
          <div class="dn-notif-person">
            <span class="dn-entry-avatar" aria-hidden="true">陈</span>
            <div><p class="dn-notif-text"><b>陈澈</b> 关注了你</p><p>做独立游戏，在杭州</p></div>
          </div>
          <button class="dn-button is-sm" type="button">回关</button>
        </div>
        <p class="dn-notifs-group">本周</p>
        <a class="dn-notif" href="#">
          <svg class="dn-icon dn-notif-type" aria-hidden="true"><use href="#dn-repost"/></svg>
          <div>
            <div class="dn-avatars" aria-hidden="true"><span>林</span><span>周</span></div>
            <p class="dn-notif-text"><b>林一</b>和<b>周舟</b>转发了你的帖子</p>
            <p class="dn-notif-quote">0.4.0 发布：按钮按下时会轻轻一缩。</p>
          </div>
          <span class="dn-notif-time">周二</span>
        </a>
      </div>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 列表占满宽度；未读圆点放进左边距里，不挤占类型图标。
- 「通知设置」收进顶栏右边的「更多」。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 侧边栏的「通知」后面显示未读数；打开后数字清掉，Dock 图标上的数字同时清掉。
- 系统通知按帖子归到同一组（`threadIdentifier`），一条帖子被很多人喜欢只占一条系统通知；回复和提及的系统通知可以直接回复。
- 列表用 `List`，回复那一行可以在原地展开输入框回复，不用跳走。

```swift
List {
    ForEach(groups) { group in
        Section(group.title) {
            ForEach(group.items) { item in
                switch item.kind {
                case .reply, .mention: ReplyNotificationRow(item: item)     // 完整的回复和操作
                case .likes, .reposts: GroupedNotificationRow(item: item)    // 叠起来的头像和人数
                case .follows: FollowNotificationRow(item: item)             // 回关
                }
            }
        }
    }
}
.navigationTitle("通知")
.toolbar { Picker("范围", selection: $scope) { Text("全部").tag(Scope.all); Text("提及").tag(Scope.mentions) }.pickerStyle(.segmented) }
.onAppear { notifications.markSeen() }
```

侧边栏里写着未读数，列表在窗口里居中：

```html
<div class="ex-mac">
  <nav class="ex-mac-sidebar" aria-label="导航">
    <div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-home"/></svg><span class="dn-sidebar-label">首页</span></a>
    <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-bell"/></svg><span class="dn-sidebar-label">通知</span><span class="dn-sidebar-count">3</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-user"/></svg><span class="dn-sidebar-label">我</span></a>
  </nav>
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><span class="ex-mac-title">通知</span><div class="dn-segmented" role="group" aria-label="范围"><button type="button" aria-pressed="true">全部</button><button type="button" aria-pressed="false">提及</button></div></div>
    <div class="ex-mac-body dn-notifs">
      <div class="dn-notif is-unread">
        <svg class="dn-icon dn-notif-type" aria-hidden="true"><use href="#dn-chat"/></svg>
        <div><p class="dn-notif-quote">回复了你：设置页的交互稿周五评审</p><p class="dn-notif-text"><b>周舟</b> 评审前能先聊十分钟吗？</p></div>
        <span class="dn-notif-time">12 分钟</span>
      </div>
      <a class="dn-notif is-unread" href="#">
        <svg class="dn-icon dn-notif-type" aria-hidden="true"><use href="#dn-heart"/></svg>
        <div><div class="dn-avatars" aria-hidden="true"><span>沈</span><span>周</span><span>陈</span></div><p class="dn-notif-text"><b>沈遥</b>和另外 23 人喜欢了你的帖子</p></div>
        <span class="dn-notif-time">1 小时</span>
      </a>
      <div class="dn-notif">
        <svg class="dn-icon dn-notif-type" aria-hidden="true"><use href="#dn-user"/></svg>
        <div><p class="dn-notif-text"><b>陈澈</b> 关注了你</p></div>
        <button class="dn-button is-sm" type="button">回关</button>
      </div>
    </div>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 标签栏的「通知」上显示未读数；顶部「全部 / 提及」用分段控件。
- 推送按帖子归组；锁屏上的回复通知长按可以直接回复。
- 左滑一条是「不再接收这类通知」，点了直接生效，给撤销。

```swift
NavigationStack {
    List { NotificationSections(groups: groups) }
        .listStyle(.plain)
        .navigationTitle("通知")
        .safeAreaInset(edge: .top) {
            Picker("范围", selection: $scope) { Text("全部").tag(Scope.all); Text("提及").tag(Scope.mentions) }
                .pickerStyle(.segmented).padding(.horizontal)
        }
        .refreshable { await notifications.reload() }
}
.badge(notifications.unseenCount)
```

大标题下面是分段控件，未读的左边一个圆点：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><span></span><button class="dn-icon-button" type="button" aria-label="通知设置"><svg class="dn-icon" aria-hidden="true"><use href="#dn-settings"/></svg></button></div>
      <h3 class="ex-ios-large">通知</h3>
      <div class="dn-segmented" role="group" aria-label="范围"><button type="button" aria-pressed="true">全部</button><button type="button" aria-pressed="false">提及</button></div>
      <div class="dn-notifs">
        <div class="dn-notif is-unread">
          <svg class="dn-icon dn-notif-type" aria-hidden="true"><use href="#dn-chat"/></svg>
          <div><p class="dn-notif-quote">回复了你的帖子</p><p class="dn-notif-text"><b>周舟</b> 评审前能先聊十分钟吗？</p></div>
          <span class="dn-notif-time">12 分钟</span>
        </div>
        <a class="dn-notif is-unread" href="#">
          <svg class="dn-icon dn-notif-type" aria-hidden="true"><use href="#dn-heart"/></svg>
          <div><div class="dn-avatars" aria-hidden="true"><span>沈</span><span>周</span><span>陈</span></div><p class="dn-notif-text"><b>沈遥</b>和另外 23 人喜欢了你的帖子</p></div>
          <span class="dn-notif-time">1 小时</span>
        </a>
        <div class="dn-notif">
          <svg class="dn-icon dn-notif-type" aria-hidden="true"><use href="#dn-user"/></svg>
          <div><p class="dn-notif-text"><b>陈澈</b> 关注了你</p></div>
          <button class="dn-button is-sm" type="button">回关</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 还没有通知 | [空状态](../../../deernova-style/references/components/empty-state.md)「有人回复、提到或关注你时，会出现在这里」，不放按钮 |
| 提及里没有内容 | 一行灰字「还没有人提到你」 |
| 一条帖子被很多人喜欢 | 持续合并在同一条里，人数更新，移到最上面并重新标成未读；不每来一个人就新增一条 |
| 原帖已删除 | 引用那一行写「原帖已删除」，通知保留 |
| 关闭了某类通知 | 列表顶部一行灰字「已关闭喜欢的通知」，加「通知设置」 |
| 账号安全 | 新设备登录、密码修改这类不进这个列表，用页面顶部的[横幅](../../../deernova-style/references/components/banner.md)和系统通知 |

## 不要

- 每一个喜欢都单独一条，真正需要回复的消息被淹没。
- 每种通知配一个彩色圆形图标底；用红色角标显示 99+ 制造紧张。
- 要用户手动「全部标为已读」才能清掉数字。
- 把推荐内容、活动推广、「你可能认识」混进通知列表。
- 回复只露出「周舟回复了你」，要点进去才知道说了什么。
