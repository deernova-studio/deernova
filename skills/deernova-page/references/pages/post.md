# 帖子详情

点开一条帖子之后的那一页：这条帖子本身、它在回复谁、大家怎么回复它。用户来这里是为了读完整的讨论，或者自己说一句。这一页要让人看清谁在回谁，长的讨论不迷路。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 返回、「帖子」 | 是 |
| 上文 | 这条帖子如果是回复，上面依次是它回复的那几条，头像之间一条竖线连起来；超过三条时中间折叠成「还有 4 条」 | 有时 |
| 主帖 | 名字和账号、完整的正文（字号大一档）、图片和链接；完整的发布时间；可以点开的计数（回复、转发、喜欢）；操作行 | 是 |
| 回复框 | 主帖下面一行：自己的头像和「回复周舟」，点进去展开 | 是 |
| 排序 | 「最相关」或「最新」 | 回复多时 |
| 回复 | 写法同[图文信息流](feed.md)的帖子；作者自己的回复名字旁边标「作者」；每条下面最多露出一层回复，更多的折叠成「展开 3 条回复」 | 是 |
| 隐藏的回复 | 被折叠的低质量或可能令人不适的回复，放在最后一行「显示更多回复」 | 否 |

- **竖线表示「在回谁」。** 一条帖子和它回复的那条之间，头像下面一条 2 像素的 `line` 竖线连到下一个头像；回复串里也一样。不用缩进一层又一层表示层级。
- **主帖比列表里大一档。** 正文用比 `type-body` 大一档的字，完整的发布时间（「11月18日 14:02」）只在这里出现。
- **计数可以点。** 「24 回复」「8 转发」「132 喜欢」写成一行，数字半粗；点「喜欢」看是谁喜欢的。
- **作者的回复标出来。** 名字旁边一个中性的「作者」标签；作者回复过的那一串排在前面。
- **打开时停在主帖。** 有上文时，页面打开后主帖在视野顶部，上文在它上面，往上滚才看到；不从最上面开始。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。头像、帖子、操作行和发布框的写法同[图文信息流](feed.md)。

```css
.dn-thread-page { max-width: var(--content-max); margin-inline: auto; }
.dn-entry.is-parent { position: relative; border-bottom: 0; }
.dn-entry.is-parent::before { content: ""; position: absolute; top: calc(var(--space-4) + 44px); bottom: -4px; left: 19px; width: 2px; border-radius: 1px; background: var(--line); }
.dn-thread-fold { display: flex; align-items: center; gap: var(--space-3); padding: 0 0 var(--space-2); color: var(--link); font: var(--type-callout); text-decoration: none; }
.dn-thread-fold::before { content: ""; width: 40px; height: 2px; }
.dn-focus { padding: var(--space-3) 0; border-bottom: var(--stroke-line) solid var(--line); }
.dn-focus-head { display: flex; align-items: center; gap: var(--space-3); }
.dn-focus-head > div { display: grid; }
.dn-focus-text { margin: var(--space-3) 0 0; color: var(--ink); font: var(--weight-regular) var(--type-headline-size)/1.6 var(--font-sans); }
.dn-focus-text a { color: var(--link); text-decoration: none; }
.dn-focus-time { margin: var(--space-3) 0 0; color: var(--ink-tertiary); font: var(--type-footnote); font-variant-numeric: tabular-nums; }
.dn-focus-stats { display: flex; flex-wrap: wrap; gap: var(--space-4); margin-top: var(--space-3); padding: var(--space-3) 0; border-block: var(--stroke-line) solid var(--line); }
.dn-focus-stats a { color: var(--ink-secondary); font: var(--type-callout); text-decoration: none; }
.dn-focus-stats b { margin-right: var(--space-1); color: var(--ink); font-weight: var(--weight-semibold); font-variant-numeric: tabular-nums; }
.dn-replies-bar { display: flex; align-items: center; justify-content: space-between; padding: var(--space-3) 0 var(--space-1); color: var(--ink-secondary); font: var(--type-callout); }
.dn-thread-page .dn-entry .dn-entry-actions { justify-content: flex-start; gap: var(--space-5); }
.dn-replies-more { display: block; margin: 0 0 var(--space-2) 52px; padding: var(--space-1) 0; color: var(--link); font: var(--type-callout); text-decoration: none; }
```

上文和主帖之间一条竖线；主帖字大一档，有完整时间和可以点开的计数；回复里作者的那条标「作者」，更深的回复折叠起来：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar"><button class="dn-button is-plain" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg>帖子</button></header>
    <div class="dn-app-content">
      <div class="dn-thread-page">
        <article class="dn-entry is-parent">
          <span class="dn-entry-avatar" aria-hidden="true">林</span>
          <div>
            <div class="dn-entry-head"><span class="dn-entry-name">林一</span><span class="dn-entry-meta">@linyi</span><span class="dn-entry-meta">3 小时</span></div>
            <p class="dn-entry-text">设置页的交互稿周五评审，欢迎来挑刺。分组现在是账户、通知、外观、隐私。</p>
          </div>
        </article>
        <article class="dn-focus">
          <div class="dn-focus-head"><span class="dn-entry-avatar" aria-hidden="true">周</span><div><span class="dn-entry-name">周舟</span><span class="dn-entry-meta">@zhouzhou</span></div></div>
          <p class="dn-focus-text">我觉得「外观」应该排在「通知」前面：改主题的人比改通知的人多得多。上一版的点击数据在这里，<a href="#">@林一</a> 评审前可以先看看。</p>
          <p class="dn-focus-time">11月18日 14:02</p>
          <div class="dn-focus-stats"><a href="#"><b>24</b>回复</a><a href="#"><b>8</b>转发</a><a href="#"><b>132</b>喜欢</a></div>
          <div class="dn-entry-actions">
            <button class="dn-entry-action" type="button" aria-label="回复"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chat"/></svg></button>
            <button class="dn-entry-action" type="button" aria-label="转发"><svg class="dn-icon" aria-hidden="true"><use href="#dn-repost"/></svg></button>
            <button class="dn-entry-action" type="button" aria-pressed="true" aria-label="喜欢"><svg class="dn-icon" aria-hidden="true"><use href="#dn-heart"/></svg></button>
            <button class="dn-entry-action" type="button" aria-label="收藏"><svg class="dn-icon" aria-hidden="true"><use href="#dn-bookmark"/></svg></button>
            <button class="dn-entry-action" type="button" aria-label="分享"><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></button>
          </div>
        </article>
        <div class="dn-feed-compose"><span class="dn-entry-avatar" aria-hidden="true">林</span><input type="text" placeholder="回复周舟" aria-label="回复周舟"><button class="dn-button is-primary is-sm" type="button" disabled>回复</button></div>
        <div class="dn-replies-bar"><span>24 条回复</span><div class="dn-segmented" role="group" aria-label="排序"><button type="button" aria-pressed="true">最相关</button><button type="button" aria-pressed="false">最新</button></div></div>
        <article class="dn-entry is-parent">
          <span class="dn-entry-avatar" aria-hidden="true">林</span>
          <div>
            <div class="dn-entry-head"><span class="dn-entry-name">林一</span><span class="dn-tag">作者</span><span class="dn-entry-meta">2 小时</span></div>
            <p class="dn-entry-text">有道理，数据我看了。周五把这两组的顺序换一下再讨论。</p>
            <div class="dn-entry-actions"><button class="dn-entry-action" type="button" aria-label="回复，3"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chat"/></svg>3</button><button class="dn-entry-action" type="button" aria-label="喜欢，18"><svg class="dn-icon" aria-hidden="true"><use href="#dn-heart"/></svg>18</button></div>
          </div>
        </article>
        <article class="dn-entry">
          <span class="dn-entry-avatar" aria-hidden="true">陈</span>
          <div>
            <div class="dn-entry-head"><span class="dn-entry-name">陈澈</span><span class="dn-entry-meta">1 小时</span></div>
            <p class="dn-entry-text">隐私也可以往前放，最近好几个人问同步的事。</p>
          </div>
        </article>
        <a class="dn-replies-more" href="#">展开 3 条回复</a>
      </div>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 主帖正文回到 `type-body` 大小；回复框固定在页面底部，键盘弹出时跟着上移。
- 上文默认折叠成一行「回复给 @林一」，点开再展开。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 在信息流里点一条，内容区推入详情，工具栏左边是返回；也可以双击在新窗口里打开。
- 打开时用 `ScrollViewReader` 滚到主帖；R 回复主帖，回复框在主帖下面原地展开。
- 右键任意一条回复：复制链接、屏蔽这个人、举报。

```swift
ScrollViewReader { proxy in
    ScrollView {
        LazyVStack(alignment: .leading, spacing: 0) {
            ForEach(post.ancestors) { PostRow(post: $0, connectsToNext: true) }
            FocusedPost(post: post).id(post.id)                    // 大一档的正文、完整时间、计数
            ReplyField(replyingTo: post.author)
            ForEach(replies) { ReplyThread(reply: $0, maxDepth: 1) }
        }
        .frame(maxWidth: 600)
        .frame(maxWidth: .infinity)
    }
    .onAppear { proxy.scrollTo(post.id, anchor: .top) }
}
.navigationTitle("帖子")
```

主帖在窗口里居中，上文和回复都用竖线连起来：

```html
<div class="ex-mac">
  <nav class="ex-mac-sidebar" aria-label="导航">
    <div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div>
    <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-home"/></svg><span class="dn-sidebar-label">首页</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-bell"/></svg><span class="dn-sidebar-label">通知</span></a>
  </nav>
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><button class="dn-icon-button" type="button" aria-label="返回"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg></button><span class="ex-mac-title">帖子</span></div>
    <div class="ex-mac-body dn-thread-page">
      <article class="dn-focus">
        <div class="dn-focus-head"><span class="dn-entry-avatar" aria-hidden="true">周</span><div><span class="dn-entry-name">周舟</span><span class="dn-entry-meta">@zhouzhou</span></div></div>
        <p class="dn-focus-text">我觉得「外观」应该排在「通知」前面：改主题的人比改通知的人多得多。</p>
        <p class="dn-focus-time">11月18日 14:02</p>
        <div class="dn-focus-stats"><a href="#"><b>24</b>回复</a><a href="#"><b>132</b>喜欢</a></div>
      </article>
      <article class="dn-entry">
        <span class="dn-entry-avatar" aria-hidden="true">林</span>
        <div><div class="dn-entry-head"><span class="dn-entry-name">林一</span><span class="dn-tag">作者</span><span class="dn-entry-meta">2 小时</span></div><p class="dn-entry-text">有道理，周五把这两组的顺序换一下再讨论。</p></div>
      </article>
    </div>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 从信息流推入；回复框浮在底部，点一条回复，回复框就变成「回复陈澈」。
- 上文折叠成主帖上面一行「回复给 @林一」，点开展开。
- 长按一条回复是菜单：复制、屏蔽、举报；自己的回复多一个删除。

```swift
ScrollView {
    LazyVStack(alignment: .leading, spacing: 0) {
        if !post.ancestors.isEmpty { AncestorsDisclosure(posts: post.ancestors) }
        FocusedPost(post: post)
        ForEach(replies) { ReplyThread(reply: $0, maxDepth: 1) }
    }
    .padding(.horizontal, Deernova.pageMargin)
}
.navigationTitle("帖子")
.navigationBarTitleDisplayMode(.inline)
.safeAreaInset(edge: .bottom) { ReplyComposer(replyingTo: replyTarget ?? post.author) }
```

主帖在上，回复串在下，回复框浮在底部：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-icon-button" type="button" aria-label="返回"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg></button><span class="ex-ios-nav-title">帖子</span><span></span></div>
      <a class="dn-thread-fold" href="#">回复给 @林一</a>
      <article class="dn-focus">
        <div class="dn-focus-head"><span class="dn-entry-avatar" aria-hidden="true">周</span><div><span class="dn-entry-name">周舟</span><span class="dn-entry-meta">@zhouzhou</span></div></div>
        <p class="dn-entry-text">我觉得「外观」应该排在「通知」前面：改主题的人比改通知的人多得多。</p>
        <p class="dn-focus-time">11月18日 14:02</p>
        <div class="dn-focus-stats"><a href="#"><b>24</b>回复</a><a href="#"><b>132</b>喜欢</a></div>
      </article>
      <article class="dn-entry">
        <span class="dn-entry-avatar" aria-hidden="true">林</span>
        <div><div class="dn-entry-head"><span class="dn-entry-name">林一</span><span class="dn-tag">作者</span><span class="dn-entry-meta">2 小时</span></div><p class="dn-entry-text">有道理，周五把顺序换一下再讨论。</p></div>
      </article>
    </div>
    <div class="ex-ios-dock"><div class="dn-composer"><textarea rows="1" aria-label="回复周舟" placeholder="回复周舟"></textarea><button class="dn-send" type="button" aria-label="发送" disabled><svg class="dn-icon" aria-hidden="true"><use href="#dn-send"/></svg></button></div></div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 还没有回复 | 回复框下面一行灰字「还没有回复」，不放空状态插画 |
| 上文里有一条被删除 | 那一条的位置写「这条内容已被作者删除」，竖线照常连着 |
| 主帖被删除 | 按[整页错误](error.md)：「这条帖子不在了」，给返回和作者的主页 |
| 只有关注的人能回复 | 回复框换成一行灰字「只有周舟关注的人可以回复」 |
| 回复很多 | 先显示最相关的 20 条，末尾自动加载更多；「最新」排序时顶部浮出「5 条新回复」 |
| 低质量或可能令人不适的回复 | 折叠到最后，「显示更多回复」点开才出现 |

## 不要

- 用一层一层的缩进表示回复的回复，缩到第四层文字只剩半屏宽。
- 打开详情从页面最上面的上文开始，要往下找才看到点开的那一条。
- 主帖和回复长得一样，看不出哪条是这一页的主角。
- 回复框藏在页面最底下，要滚过几十条回复才能说话。
- 每条回复都展开它全部的回复，长讨论变成一面墙。
