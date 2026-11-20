# 协作与评论

几个人同时写一篇文档：谁在、谁在改哪里、哪段话有人提了意见。这一页讲在线状态、别人的光标和选区、划词评论和评论栏。谁能看到这篇文档见[分享与权限](sharing.md)；评论通知进[通知](notifications.md)。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 在线头像 | 顶栏右边，正在看这篇的人，最多三个头像，多了写「+2」；点一个头像跳到他的光标 | 有别人在时 |
| 别人的光标 | 一条细竖线，上面一个小名字签；他停止输入几秒后名字签收起，只留竖线 | 有别人在编辑时 |
| 别人的选区 | 很浅的灰底，下面一条细灰线；比自己的选区浅，一眼分得出是别人的 | 有别人在选时 |
| 评论锚点 | 被评论的文字下面一条靛蓝的线；正在看的那条线程，锚点那段加 `link-soft` 底 | 有评论时 |
| 评论栏 | 正文右边一栏，每条线程和它的锚点对齐：发起人、时间、内容、回复、回复框、「解决」 | 有评论时 |
| 已解决 | 评论栏顶上「已解决 3」，点开看；解决的线程从正文里收起锚点 | 有已解决的时 |

- **在不在只用头像和光标表示。** 不弹「周舟加入了文档」，不播提示音；离开的人头像直接消失。
- **光标不按人分配颜色。** 所有人的光标都是墨色，靠名字签认人。三四个人同时在一篇文档里时，名字比颜色好认，也不会和状态色、靛蓝撞在一起。
- **评论用引用色。** 锚点下的线和打开时的底色用 `link` 和 `link-soft`，和 @ 提及、引用同一种颜色：它们都是「指向别处的东西」。
- **线程跟着锚点走。** 评论栏里的线程和正文里的锚点在同一高度；正文滚动，评论栏一起滚。两条线程挤在一起时往下错开，用一条细线连回锚点。
- **划词就能评论。** 选中文字时格式条最右边是「评论」（⌘⌥M）；新线程的输入框直接出现在评论栏里，光标在框里。
- **解决不是删除。** 「解决」把线程收起，锚点的下划线消失；在「已解决」里能重新打开。删除只给发起人，在线程的「更多」里。
- **只通知该知道的人。** 被 @ 的人、参与过这条线程的人、文档作者；其他看过文档的人不通知。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-presence { display: flex; align-items: center; }
.dn-presence > .dn-avatar { margin-left: -6px; box-shadow: 0 0 0 2px var(--canvas); }
.dn-presence > .dn-avatar:first-child { margin-left: 0; }
.dn-presence > .dn-avatar.is-more { background: var(--surface-sunken); color: var(--ink-secondary); }
.dn-cursor { position: relative; display: inline-block; width: 0; height: 1lh; margin: 0 -1px; border-left: var(--stroke-control) solid var(--ink); vertical-align: top; }
.dn-cursor > span { position: absolute; bottom: 100%; left: -2px; padding: 1px var(--space-1); border-radius: var(--radius-xs) var(--radius-xs) var(--radius-xs) 0; background: var(--ink); color: var(--canvas); font: var(--weight-medium) var(--type-caption-size)/1.3 var(--font-sans); white-space: nowrap; }
.dn-their-selection { background: var(--fill-hover); box-shadow: inset 0 calc(-1 * var(--stroke-line)) var(--ink-tertiary); }
.dn-anchor { border-bottom: var(--stroke-control) solid var(--link); }
.dn-anchor.is-open { background: var(--link-soft); }
.dn-collab { display: grid; grid-template-columns: minmax(0, 1fr) 300px; flex: 1; min-height: 0; overflow-y: auto; }
.dn-collab > .dn-editor-scroll { overflow: visible; }
.dn-rail { position: relative; display: grid; align-content: start; gap: var(--space-3); padding: var(--space-4) var(--space-4) var(--space-8) 0; }
.dn-rail-head { display: flex; justify-content: flex-end; }
.dn-thread-card { display: grid; gap: var(--space-3); padding: var(--space-3); border: var(--stroke-line) solid var(--line); border-radius: var(--radius-lg); background: var(--surface); }
.dn-thread-card.is-open { border-color: var(--line-control); box-shadow: var(--shadow-float); }
.dn-thread-card.is-quiet { padding-block: var(--space-2); color: var(--ink-secondary); }
.dn-comment-row { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 2px var(--space-2); font: var(--type-callout); }
.dn-comment-row > .dn-avatar { grid-row: span 2; width: 24px; height: 24px; }
.dn-comment-row > b { font-weight: var(--weight-medium); }
.dn-comment-row > b > span { margin-left: var(--space-2); color: var(--ink-tertiary); font: var(--type-caption); }
.dn-comment-row > p { margin: 0; color: var(--ink); }
.dn-thread-actions { display: flex; align-items: center; gap: var(--space-2); }
.dn-thread-actions > .dn-input { flex: 1; min-width: 0; height: var(--button-height-sm); }
@media (max-width: 960px) {
  .dn-collab { grid-template-columns: minmax(0, 1fr); }
  .dn-rail { display: none; }
}
```

三个人在同一篇文档里：周舟正在写下一句，他的光标上有名字；沈遥选中了一段；右边打开的线程和它的锚点在同一高度，另一条线程收着：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg>发布 2.0</button>
      <div class="dn-toolbar-actions">
        <div class="dn-presence" aria-label="正在看的人：周舟、沈遥、许明、另外 2 人"><span class="dn-avatar" aria-hidden="true">周</span><span class="dn-avatar" aria-hidden="true">沈</span><span class="dn-avatar" aria-hidden="true">许</span><span class="dn-avatar is-more" aria-hidden="true">+2</span></div>
        <button class="dn-icon-button" type="button" aria-label="评论"><svg class="dn-icon" aria-hidden="true"><use href="#dn-comment"/></svg></button>
        <button class="dn-button is-sm" type="button">分享</button>
      </div>
    </header>
    <div class="dn-collab">
      <div class="dn-editor-scroll">
        <article class="dn-doc">
          <h1>发布清单</h1>
          <p>灰度从周三开始，<span class="dn-anchor is-open">先开 5% 的新用户</span>，观察两天的崩溃率和同步失败率，没有异常再放到 30%。</p>
          <p><span class="dn-their-selection">回滚只需要关掉开关，旧版数据不会被改写。</span>迁移脚本单独上线，提前一周在测试环境跑完全量数据。<span class="dn-cursor"><span>周舟</span></span></p>
          <h2>对外</h2>
          <p>更新记录和<span class="dn-anchor">帮助中心的迁移说明</span>同一天发。</p>
        </article>
      </div>
      <aside class="dn-rail" aria-label="评论">
        <div class="dn-rail-head"><button class="dn-button is-plain is-sm" type="button">已解决 3</button></div>
        <div class="dn-thread-card is-open">
          <div class="dn-comment-row"><span class="dn-avatar" aria-hidden="true">沈</span><b>沈遥<span>10 分钟前</span></b><p>5% 会不会太少，两天看不出问题？<span class="dn-mention">@林一</span> 你定一下。</p></div>
          <div class="dn-comment-row"><span class="dn-avatar" aria-hidden="true">林</span><b>林一<span>刚刚</span></b><p>新用户一天大约 4,000 人，5% 够看崩溃率了。先这样。</p></div>
          <div class="dn-thread-actions"><input class="dn-input" placeholder="回复" aria-label="回复"><button class="dn-button is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-check"/></svg>解决</button></div>
        </div>
        <div class="dn-thread-card is-quiet">
          <div class="dn-comment-row"><span class="dn-avatar" aria-hidden="true">周</span><b>周舟<span>昨天</span></b><p>说明里加一张截图？</p></div>
        </div>
      </aside>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 评论栏收起；有评论的段落右边一个小的评论图标加条数，点了从底部升起这条线程。
- 在线头像只留一个，后面写人数「3 人在看」。
- 别人的光标照常显示，名字签更短：只写姓。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 评论栏是 `.inspector`，⌥⌘C 开关；在线头像在工具栏。
- 「评论」在菜单栏「插入」和右键菜单里，快捷键 ⌘⌥M。
- 被 @ 时发系统通知，通知里能直接回复；点通知打开文档并定位到那条线程。

```swift
EditorView(document: $document, remoteCursors: session.cursors)
    .inspector(isPresented: $showsComments) {
        CommentList(threads: document.threads, focused: $focusedThread)
    }
    .toolbar {
        PresenceAvatars(people: session.viewers) { person in jump(to: person) }
        Button("评论", systemImage: "text.bubble") { showsComments.toggle() }
            .keyboardShortcut("c", modifiers: [.command, .option])
    }
```

评论栏在右边的检查器里，顶栏是正在看的人：

```html
<div class="ex-mac has-inspector">
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div><span class="ex-mac-title">发布清单</span><div class="dn-presence" aria-label="正在看的人：周舟、沈遥"><span class="dn-avatar" aria-hidden="true">周</span><span class="dn-avatar" aria-hidden="true">沈</span></div></div>
    <div class="ex-mac-pad"><article class="dn-doc"><p>灰度从周三开始，<span class="dn-anchor is-open">先开 5% 的新用户</span>，观察两天的崩溃率和同步失败率。<span class="dn-cursor"><span>周舟</span></span></p></article></div>
  </div>
  <aside class="ex-mac-inspector dn-rail" aria-label="评论">
    <div class="dn-thread-card is-open">
      <div class="dn-comment-row"><span class="dn-avatar" aria-hidden="true">沈</span><b>沈遥<span>10 分钟前</span></b><p>5% 会不会太少？</p></div>
      <div class="dn-thread-actions"><input class="dn-input" placeholder="回复" aria-label="回复"></div>
    </div>
  </aside>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 有评论的段落右边一个评论图标和条数；点了从底部升起这条线程，正文里的锚点加底色。
- 全部评论在导航栏的评论按钮里，按在文档里的顺序排；已解决的在最后一组。
- 回复框贴在键盘上方，@ 时弹出成员列表。

```swift
EditorView(document: $document)
    .sheet(item: $openThread) { thread in
        ThreadView(thread: thread)
            .presentationDetents([.fraction(0.4), .large])
            .presentationBackgroundInteraction(.enabled(upThrough: .fraction(0.4)))
    }
    .toolbar { Button("评论", systemImage: "text.bubble") { showsAllComments = true } }
```

线程从底部升起，正文里的锚点还看得见：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg>发布 2.0</button><button class="dn-icon-button" type="button" aria-label="全部评论"><svg class="dn-icon" aria-hidden="true"><use href="#dn-comment"/></svg></button></div>
      <article class="dn-doc"><h2>发布清单</h2><p>灰度从周三开始，<span class="dn-anchor is-open">先开 5% 的新用户</span>，观察两天的崩溃率和同步失败率，没有异常再放到 30%。</p></article>
    </div>
    <div class="ex-sheet-panel">
      <div class="dn-comment-row"><span class="dn-avatar" aria-hidden="true">沈</span><b>沈遥<span>10 分钟前</span></b><p>5% 会不会太少，两天看不出问题？<span class="dn-mention">@林一</span> 你定一下。</p></div>
      <div class="dn-comment-row"><span class="dn-avatar" aria-hidden="true">林</span><b>林一<span>刚刚</span></b><p>新用户一天大约 4,000 人，5% 够看崩溃率了。</p></div>
      <div class="dn-thread-actions"><input class="dn-input" placeholder="回复" aria-label="回复"><button class="dn-button is-sm" type="button">解决</button></div>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 只有自己 | 顶栏没有在线头像；评论栏没有评论时不出现 |
| 锚点的文字被删了 | 线程留在评论栏原来的位置，顶上一行灰字「评论的原文已删除」，引用被删掉的那几个字 |
| 两个人改同一句 | 两边的输入都保留，按到达的顺序合并；不锁段落，不弹冲突 |
| 断线 | 顶栏头像变淡，一行灰字「离线，改动会在联网后合并」；自己照常能写 |
| 只能评论 | 正文点了不进编辑，选中文字只出现「评论」 |
| 很多线程 | 评论栏只显示和视野里锚点对应的线程；顶上可以按「提到我的」「未解决」筛 |

## 不要

- 每个人分配一种光标颜色，满屏彩色竖线和彩色选区。
- 有人进出文档就弹提示、播声音。
- 评论做成文档最底下的一长串，看不出在说哪一段。
- 「解决」就是删除，讨论过的结论找不回来。
- 段落被别人编辑时锁住，显示「周舟正在编辑，请稍候」。
- 文档的所有读者都收到每一条评论的通知。
