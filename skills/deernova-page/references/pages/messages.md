# 私信

两个人或几个人之间的私下对话。左边是会话列表，右边是当前这一段对话。和 [AI 对话页](chat.md) 不同，两边都是人：双方都有气泡和头像，要看得出谁说的、什么时候说的、对方看到没有。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 会话列表 | 一行一段会话：头像、名字、最后一条消息、时间；有未读时名字半粗，行尾一个 `ink` 圆点 | 是 |
| 消息请求 | 列表最上面一行「3 条消息请求」：没关注的人发来的，单独放，回复前对方看不到你是否已读 | 有时 |
| 对话顶栏 | 对方的头像和名字，点开是他的[个人主页](profile.md)；右边「更多」：静音、屏蔽、举报、删除会话 | 是 |
| 消息 | 对方的气泡靠左带头像，自己的靠右；同一个人连续几条只在最后一条旁边放头像；隔了 15 分钟以上中间插一行时间 | 是 |
| 分享的内容 | 帖子、视频、链接以小卡片出现在气泡里，点开去原处 | 否 |
| 状态 | 自己最后一条下面一行灰字「已读」或「已送达」；对方在输入时，对话末尾一行「周舟正在输入」 | 是 |
| 输入框 | 底部的输入框：附件、图片、文字、发送；回车发送，⇧回车换行 | 是 |

- **两种气泡靠深浅区分。** 对方用 `surface-raised`，自己用 `fill-selected`，都是 `ink` 字；不用彩色气泡，不用左右两种颜色制造对比。
- **头像只放在一组的最后一条。** 同一个人连续发的几条贴在一起（间距 2），换人时间距拉开到 `space-3`。
- **时间不挂在每条上。** 隔 15 分钟以上居中插一行时间，悬停气泡才显示这一条的具体时间。
- **已读只写在最后一条。** 不给每条消息挂对勾；对方关掉了已读回执时，只写「已送达」。
- **陌生人的消息不直接进来。** 没关注的人发来的进「消息请求」，接受后才进会话列表；拒绝不通知对方。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。头像的写法同[图文信息流](feed.md)，输入框见 style 的 [AI 输入框](../../../deernova-style/references/components/composer.md)。

```css
.dn-dm { display: grid; grid-template-columns: var(--pane-width) minmax(0, 1fr); flex: 1; min-height: 0; }
.dn-dm-list { display: flex; flex-direction: column; min-height: 0; overflow-y: auto; padding: var(--space-2); border-right: var(--stroke-line) solid var(--line); }
.dn-dm-row { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 2px var(--space-3); padding: var(--space-2); border-radius: var(--radius-sm); color: var(--ink); text-decoration: none; }
@media (hover: hover) { .dn-dm-row:hover { background: var(--fill-hover); } }
.dn-dm-row[aria-current="true"] { background: var(--fill-selected); }
.dn-dm-row > .dn-entry-avatar { grid-row: span 2; }
.dn-dm-name { overflow: hidden; font: var(--type-body); text-overflow: ellipsis; white-space: nowrap; }
.dn-dm-row.is-unread .dn-dm-name { font-weight: var(--weight-semibold); }
.dn-dm-time { color: var(--ink-tertiary); font: var(--type-footnote); font-variant-numeric: tabular-nums; }
.dn-dm-last { overflow: hidden; color: var(--ink-tertiary); font: var(--type-footnote); text-overflow: ellipsis; white-space: nowrap; }
.dn-dm-row.is-unread .dn-dm-last { color: var(--ink-secondary); }
.dn-dm-row .dn-dot { justify-self: end; }
.dn-dm-requests { display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-2); padding: var(--space-2); border-bottom: var(--stroke-line) solid var(--line); color: var(--ink-secondary); font: var(--type-callout); text-decoration: none; }
.dn-dm-chat { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
.dn-dm-scroll { display: flex; flex: 1; flex-direction: column; gap: 2px; min-height: 0; overflow-y: auto; padding: var(--space-4) var(--space-6); }
.dn-dm-when { align-self: center; margin: var(--space-3) 0 var(--space-2); color: var(--ink-tertiary); font: var(--type-caption); }
.dn-msg { display: flex; align-items: flex-end; gap: var(--space-2); max-width: min(75%, 520px); }
.dn-msg.is-mine { align-self: flex-end; flex-direction: row-reverse; }
.dn-msg:not(.is-mine) + .dn-msg.is-mine, .dn-msg.is-mine + .dn-msg:not(.is-mine), .dn-dm-status + .dn-msg { margin-top: var(--space-3); }
.dn-msg > .dn-entry-avatar { width: 28px; height: 28px; font-size: var(--type-caption-size); }
.dn-msg > .is-spacer { flex: none; width: 28px; }
.dn-bubble { padding: var(--space-2) var(--space-3); border-radius: var(--radius-lg); background: var(--surface-raised); color: var(--ink); font: var(--type-body); }
.dn-msg.is-mine .dn-bubble { background: var(--fill-selected); }
.dn-bubble .dn-entry-link { margin-top: var(--space-2); background: var(--canvas); }
.dn-dm-status { align-self: flex-end; margin-top: 2px; color: var(--ink-tertiary); font: var(--type-caption); }
.dn-dm-typing { margin-top: var(--space-2); color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-dm-dock { padding: 0 var(--space-6) var(--space-4); }
@media (max-width: 760px) {
  .dn-dm { grid-template-columns: minmax(0, 1fr); }
  .dn-dm-chat { display: none; }
}
```

会话列表在左，未读的名字半粗、行尾一个圆点；右边对话里两种气泡只靠深浅区分，头像放在每组的最后一条，已读只写在自己的最后一条下面：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar"><h2 class="dn-toolbar-title"><span>私信</span></h2><div class="dn-toolbar-actions"><button class="dn-icon-button" type="button" aria-label="新私信"><svg class="dn-icon" aria-hidden="true"><use href="#dn-new-chat"/></svg></button></div></header>
    <div class="dn-dm">
      <nav class="dn-dm-list" aria-label="会话">
        <a class="dn-dm-requests" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-mail"/></svg>3 条消息请求</a>
        <a class="dn-dm-row" href="#" aria-current="true"><span class="dn-entry-avatar" aria-hidden="true">周</span><span class="dn-dm-name">周舟</span><span class="dn-dm-time">14:06</span><span class="dn-dm-last">好，那周五见</span></a>
        <a class="dn-dm-row is-unread" href="#"><span class="dn-entry-avatar" aria-hidden="true">沈</span><span class="dn-dm-name">沈遥</span><span class="dn-dm-time">11:20</span><span class="dn-dm-last">照片发你了，原图在网盘里</span><span class="dn-dot" aria-label="未读"></span></a>
        <a class="dn-dm-row" href="#"><span class="dn-entry-avatar" aria-hidden="true">设</span><span class="dn-dm-name">设计组（5 人）</span><span class="dn-dm-time">周一</span><span class="dn-dm-last">陈澈：我先把侧边栏的稿子放上来</span></a>
      </nav>
      <section class="dn-dm-chat" aria-label="和周舟的对话">
        <div class="dn-dm-scroll">
          <span class="dn-dm-when">今天 13:58</span>
          <div class="dn-msg"><span class="is-spacer"></span><div class="dn-bubble">评审前能先聊十分钟吗？</div></div>
          <div class="dn-msg"><span class="dn-entry-avatar" aria-hidden="true">周</span><div class="dn-bubble">主要是分组那一块，我觉得「外观」应该单独一组<a class="dn-entry-link" href="#">设置页的交互稿周五评审，欢迎来挑刺。<span>林一的帖子</span></a></div></div>
          <div class="dn-msg is-mine"><div class="dn-bubble">可以，周五上午十点？</div></div>
          <div class="dn-msg is-mine"><div class="dn-bubble">我把会议室订好</div></div>
          <span class="dn-dm-status">已读</span>
          <div class="dn-msg"><span class="dn-entry-avatar" aria-hidden="true">周</span><div class="dn-bubble">好，那周五见</div></div>
          <p class="dn-dm-typing">周舟正在输入</p>
        </div>
        <div class="dn-dm-dock">
          <div class="dn-composer">
            <button class="dn-icon-button" type="button" aria-label="添加图片或文件"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button>
            <textarea rows="1" aria-label="消息" placeholder="发消息给周舟"></textarea>
            <button class="dn-send" type="button" aria-label="发送" disabled><svg class="dn-icon" aria-hidden="true"><use href="#dn-send"/></svg></button>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 窄于 `breakpoint-sm`：会话列表是第一页，点一段进入对话，顶栏出现返回。
- 键盘弹出时输入框贴着键盘，对话自动滚到最后一条。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 三栏的 `NavigationSplitView`：侧边栏是导航，中间是会话列表，右边是对话。
- 可以把一段会话拖出去成一个独立的小窗口；收到新消息时发系统通知，通知里可以直接回复。
- ⌘N 新私信，⌘F 在当前会话里搜索；回车发送，⇧回车换行。

```swift
NavigationSplitView {
    SidebarView(section: $section)
} content: {
    List(conversations, selection: $selected) { ConversationRow(conversation: $0) }
        .toolbar { Button("新私信", systemImage: "square.and.pencil", action: newMessage).keyboardShortcut("n") }
} detail: {
    ScrollView {
        LazyVStack(spacing: 2) { ForEach(selected?.messageGroups ?? []) { MessageGroupView(group: $0) } }
    }
    .defaultScrollAnchor(.bottom)
    .safeAreaInset(edge: .bottom) { MessageComposer(conversation: selected) }
    .navigationTitle(selected?.title ?? "")
}
```

侧边栏、会话列表和对话三栏：

```html
<div class="ex-mac has-list">
  <nav class="ex-mac-sidebar" aria-label="导航">
    <div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-home"/></svg><span class="dn-sidebar-label">首页</span></a>
    <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-mail"/></svg><span class="dn-sidebar-label">私信</span><span class="dn-sidebar-count">1</span></a>
  </nav>
  <div class="ex-mac-col">
    <a class="dn-dm-row" href="#" aria-current="true"><span class="dn-entry-avatar" aria-hidden="true">周</span><span class="dn-dm-name">周舟</span><span class="dn-dm-time">14:06</span><span class="dn-dm-last">好，那周五见</span></a>
    <a class="dn-dm-row is-unread" href="#"><span class="dn-entry-avatar" aria-hidden="true">沈</span><span class="dn-dm-name">沈遥</span><span class="dn-dm-time">11:20</span><span class="dn-dm-last">照片发你了</span><span class="dn-dot" aria-label="未读"></span></a>
  </div>
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><span class="ex-mac-title">周舟</span></div>
    <div class="ex-mac-body dn-dm-scroll">
      <div class="dn-msg"><span class="dn-entry-avatar" aria-hidden="true">周</span><div class="dn-bubble">评审前能先聊十分钟吗？</div></div>
      <div class="dn-msg is-mine"><div class="dn-bubble">可以，周五上午十点？</div></div>
      <span class="dn-dm-status">已读</span>
      <div class="dn-msg"><span class="dn-entry-avatar" aria-hidden="true">周</span><div class="dn-bubble">好，那周五见</div></div>
    </div>
    <div class="ex-mac-dock"><div class="dn-composer"><textarea rows="1" aria-label="消息" placeholder="发消息给周舟"></textarea><button class="dn-send" type="button" aria-label="发送" disabled><svg class="dn-icon" aria-hidden="true"><use href="#dn-send"/></svg></button></div></div>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 会话列表是第一层，点进去是对话；顶部中间是对方的头像和名字，点开去主页。
- 输入框浮在底部，键盘弹出时跟着上移；长按一条消息是回应（一个心）、回复、复制、撤回。
- 左滑会话是静音和删除；推送里可以直接回复。

```swift
NavigationStack {
    List(conversations) { conversation in
        NavigationLink(value: conversation) { ConversationRow(conversation: conversation) }
            .swipeActions { Button("静音", systemImage: "bell.slash") { mute(conversation) } }
    }
    .navigationTitle("私信")
    .navigationDestination(for: Conversation.self) { conversation in
        ScrollView { LazyVStack(spacing: 2) { ForEach(conversation.messageGroups) { MessageGroupView(group: $0) } } }
            .defaultScrollAnchor(.bottom)
            .safeAreaInset(edge: .bottom) { MessageComposer(conversation: conversation) }
            .toolbar { ToolbarItem(placement: .principal) { PersonTitle(person: conversation.other) } }
    }
}
```

对话页：顶部中间是对方，气泡两边深浅不同，输入框浮在底部：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-icon-button" type="button" aria-label="返回"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg></button><span class="ex-ios-nav-title">周舟</span><button class="dn-icon-button" type="button" aria-label="更多"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></div>
      <div class="dn-dm-scroll ex-dm-phone">
        <span class="dn-dm-when">今天 13:58</span>
        <div class="dn-msg"><span class="dn-entry-avatar" aria-hidden="true">周</span><div class="dn-bubble">评审前能先聊十分钟吗？</div></div>
        <div class="dn-msg is-mine"><div class="dn-bubble">可以，周五上午十点？</div></div>
        <div class="dn-msg is-mine"><div class="dn-bubble">我把会议室订好</div></div>
        <span class="dn-dm-status">已读</span>
        <div class="dn-msg"><span class="dn-entry-avatar" aria-hidden="true">周</span><div class="dn-bubble">好，那周五见</div></div>
      </div>
    </div>
    <div class="ex-ios-dock"><div class="dn-composer"><button class="dn-icon-button" type="button" aria-label="添加"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button><textarea rows="1" aria-label="消息" placeholder="发消息"></textarea><button class="dn-send" type="button" aria-label="发送" disabled><svg class="dn-icon" aria-hidden="true"><use href="#dn-send"/></svg></button></div></div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 还没有私信 | [空状态](../../../deernova-style/references/components/empty-state.md)「给关注的人发一条私信」，加「新私信」 |
| 发送中、发送失败 | 发送中的气泡淡一档；失败时气泡旁边一个 `danger` 图标，下面「没有发出去」加「重试」 |
| 消息请求 | 对话上方一句「周舟还没有关注你」，底部是「接受」「删除」「屏蔽」，接受前不能回复 |
| 撤回 | 原位一行灰字「你撤回了一条消息」；2 分钟内可以撤回 |
| 对方屏蔽了你 | 输入框换成一行「你不能给这个账号发私信」 |
| 群聊 | 对方的气泡上面一行灰字写名字，只在每组第一条；顶栏写「设计组（5 人）」 |

## 不要

- 自己的气泡用彩色或渐变；每条消息都挂时间和双对勾。
- 陌生人的消息直接进会话列表，和朋友的混在一起。
- 「正在输入」用跳动的三个点占一整个气泡的位置。
- 发送失败只在角落里放一个小红点，不说怎么办。
- 删除会话、屏蔽、举报和静音不区分，或者删除前不说对方那边是否还在。
