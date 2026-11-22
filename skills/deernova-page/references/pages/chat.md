# AI 对话页

和 AI 来回对话的那一页：新对话的首页、进行中的对话，以及回答生成文件时打开的预览。这一页的主角是对话内容本身，界面要退到几乎看不见。组件的写法见 style 的 [AI 输入框](../../../deernova-style/references/components/composer.md)、[消息](../../../deernova-style/references/components/message.md)、[思考与工具调用](../../../deernova-style/references/components/step-row.md) 和 [产物预览](../../../deernova-style/references/components/artifact.md)。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 侧边栏 | 新对话、搜索，下面是最近的对话，按今天、本周、更早分组；对话名由 AI 起，可以改 | 桌面是 |
| 顶栏 | 当前对话的名字，点开是重命名、分享、删除；右边分享 | 是 |
| 新对话首页 | 一句问候、输入框、三到四个[建议](../../../deernova-style/references/components/suggestion.md)，在内容区里视觉居中 | 新对话时 |
| 对话 | 用户消息是靠右的气泡；回答不加气泡，直接排版；思考和工具调用收成一行灰字，点开再看 | 是 |
| 输入框 | 固定在内容区底部，和对话栏同宽；附件、@、/ 命令和模型都在输入框里；发送和停止在同一个位置 | 是 |
| 预览面板 | 回答生成文件、页面或图片时，右边打开预览；对话栏变窄，不跳到新页面 | 有产物时 |

- **对话栏居中，宽不超过 `content-max`。** 输入框和对话栏用同一个居中的栏；按 style 的布局，消息比输入框左右各多缩进 `space-3`，回答的文字不会贴着输入框的边。
- **建议要具体。** 写这个产品真正做得好的三四件事（「总结一份文件」），不写「你可以问我任何问题」；发出第一条消息后建议消失。回答后的追问建议最多三条，没有好的就不放。
- **跟随到底，但让位给用户。** 生成时自动滚到最新的内容；用户往上翻，就停止跟随，右下角出现「回到底部」；回到底部后恢复跟随。
- **回答直接说事。** 不寒暄，不复述问题，不用 emoji 当小标题；复制、重新生成、反馈这些操作悬停在回答上时才出现。
- **需要确认的操作停在对话里。** AI 要运行命令、写文件、发消息时，用[权限确认](../../../deernova-style/references/components/approval.md)卡片停在当前位置，等用户决定；确认后卡片收成一行结果。
- 要 AI 自己连续做几分钟的事（改代码、整理一批文件），用 [AI 任务页](task.md)：那里的主角是做出来的东西，不是对话。
- 免责提示只在输入框下方出现一次，见 [AI 输入框](../../../deernova-style/references/components/composer.md)。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-chat { display: grid; grid-template-columns: minmax(0, 1fr) auto; flex: 1; min-height: 0; }
.dn-chat-main { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
.dn-chat-scroll { flex: 1; min-height: 0; overflow-y: auto; scrollbar-gutter: stable both-edges; padding: var(--space-6) 0; }
.dn-chat-dock { padding-bottom: var(--space-4); }
.dn-chat-scroll .dn-thread { padding-inline: calc(var(--page-margin) + var(--space-3)); }
.dn-chat .dn-preview { width: min(48vw, 560px); }
@media (max-width: 960px) {
  .dn-chat { grid-template-columns: minmax(0, 1fr); }
  .dn-chat .dn-preview { position: fixed; inset: 0 0 0 auto; z-index: var(--z-overlay); width: min(100%, var(--sheet-width-md)); box-shadow: var(--shadow-float); }
}
```

新对话：侧边栏照常，内容区里一句问候、输入框和三个具体的建议，视觉居中：

```html
<div class="dn-app ex-page">
  <nav class="dn-sidebar" aria-label="侧边栏">
    <div class="dn-sidebar-section">
      <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-new-chat"/></svg><span class="dn-sidebar-label">新对话</span><span class="dn-sidebar-count">⌘N</span></a>
      <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><span class="dn-sidebar-label">搜索</span><span class="dn-sidebar-count">⌘K</span></a>
    </div>
    <details class="dn-sidebar-group" open>
      <summary class="dn-sidebar-heading">今天<svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg></summary>
      <a class="dn-sidebar-item" href="#"><span class="dn-sidebar-label">本周周报的三条要点</span></a>
      <a class="dn-sidebar-item" href="#"><span class="dn-sidebar-label">设置页的分组怎么排</span></a>
    </details>
  </nav>
  <div class="dn-app-main">
    <div class="dn-app-content">
      <div class="dn-home">
        <div class="dn-home-main">
          <h2 class="dn-home-title">下午好，林一</h2>
          <div class="dn-composer is-stacked">
            <textarea rows="2" aria-label="消息" placeholder="描述你要做的事，可以拖入文件"></textarea>
            <div class="dn-composer-toolbar">
              <button class="dn-icon-button" type="button" aria-label="添加" aria-haspopup="menu"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button>
              <div class="dn-composer-end"><button class="dn-send" type="button" aria-label="发送" disabled><svg class="dn-icon" aria-hidden="true"><use href="#dn-send"/></svg></button></div>
            </div>
          </div>
          <div class="dn-suggestions" role="group" aria-label="建议">
            <button class="dn-suggestion" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span>总结一份文件</span></button>
            <button class="dn-suggestion" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-mail"/></svg><span>起草一封邮件</span></button>
            <button class="dn-suggestion" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-table"/></svg><span>整理一张表格</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

进行中的对话：读文件的过程收成一行，回答直接说事；生成了文件就在右边打开预览，对话栏变窄：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <button class="dn-toolbar-title" type="button"><span>第三季度经营分析</span><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg></button>
      <div class="dn-toolbar-actions"><button class="dn-icon-button" type="button" aria-label="分享"><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></button></div>
    </header>
    <div class="dn-chat">
      <div class="dn-chat-main">
        <div class="dn-chat-scroll">
          <div class="dn-column dn-thread">
            <div class="dn-message-user">把这三个月的订阅数据整理成一份分析，重点看年付</div>
            <details class="dn-activity">
              <summary><svg class="dn-icon" aria-hidden="true"><use href="#dn-tool"/></svg>已读取 3 个文件<svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-right"/></svg></summary>
            </details>
            <div class="dn-message-assistant">
              <p>年付占比从 31% 升到 44%，主要来自 9 月的定价调整。分析放在右边的文档里，结论在第一页。</p>
              <div class="dn-artifact" role="button" tabindex="0" aria-current="true">
                <span class="dn-artifact-icon"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg></span>
                <span class="dn-artifact-text"><span class="dn-artifact-title">第三季度经营分析</span><span class="dn-artifact-meta">文档，3 页</span></span>
              </div>
            </div>
          </div>
        </div>
        <div class="dn-column dn-chat-dock">
          <div class="dn-composer">
            <button class="dn-icon-button" type="button" aria-label="添加" aria-haspopup="menu"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button>
            <textarea rows="1" aria-label="消息"></textarea>
            <button class="dn-send" type="button" aria-label="发送" disabled><svg class="dn-icon" aria-hidden="true"><use href="#dn-send"/></svg></button>
          </div>
        </div>
      </div>
      <aside class="dn-preview ex-chat-preview" aria-label="预览">
        <div class="dn-preview-head">
          <span class="dn-preview-title">第三季度经营分析</span>
          <div class="dn-preview-head-end"><button class="dn-icon-button" type="button" aria-label="关闭"><svg class="dn-icon" aria-hidden="true"><use href="#dn-close"/></svg></button></div>
        </div>
        <div class="dn-preview-frame ex-doc-preview">
          <h3>年付占比升到 44%</h3>
          <p>九月起年付首月优惠改为直接折扣，年付新订阅比八月多 62%。月付没有下降，增长来自原本不付费的用户。</p>
        </div>
      </aside>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 窄于 `breakpoint-md`：预览面板变成从右边滑出的[抽屉](../../../deernova-style/references/components/sheet.md)，盖在对话上，关掉后回到原来的位置。
- 窄于 `breakpoint-sm`：侧边栏收成抽屉，顶栏左边一个按钮打开它；输入框贴底，避开安全区和键盘。
- 用户消息的气泡最宽占八成，回答占满对话栏。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 用 `NavigationSplitView`：左边是系统侧边栏（Liquid Glass），列出对话；右边是对话。不要自己画侧边栏背景。
- 对话名放在窗口工具栏的标题位置，点开是重命名、分享、删除；分享按钮在工具栏右边。
- 产物预览用 `.inspector` 从右边打开，可以拖动宽度，⌥⌘I 收起。
- 快捷键：⌘N 新对话，⌘K 搜索，⌘. 或 Esc 停止生成，⌘⇧C 复制最后一条回答。

```swift
NavigationSplitView {
    List(conversations, selection: $selected) { Text($0.title) }
        .toolbar { Button("新对话", systemImage: "square.and.pencil", action: newChat) }
} detail: {
    ThreadView(conversation: selected)
        .safeAreaInset(edge: .bottom) { Composer() }
        .navigationTitle(selected?.title ?? "")
        .toolbar { ShareLink(item: shareURL) }
        .inspector(isPresented: $showsPreview) { ArtifactPreview() }
}
```

系统侧边栏浮在窗口里，对话标题在工具栏，输入框贴着内容区底部：

```html
<div class="ex-mac">
  <nav class="ex-mac-sidebar" aria-label="对话">
    <div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-new-chat"/></svg><span class="dn-sidebar-label">新对话</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><span class="dn-sidebar-label">搜索</span></a>
    <p class="dn-sidebar-heading">今天</p>
    <a class="dn-sidebar-item" href="#" aria-current="page"><span class="dn-sidebar-label">第三季度经营分析</span></a>
    <a class="dn-sidebar-item" href="#"><span class="dn-sidebar-label">设置页的分组怎么排</span></a>
  </nav>
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><span class="ex-mac-title">第三季度经营分析</span><button class="dn-glass dn-glass-button" type="button" aria-label="分享"><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></button></div>
    <div class="ex-mac-body">
      <div class="dn-thread">
        <div class="dn-message-user">把这三个月的订阅数据整理成一份分析，重点看年付</div>
        <div class="dn-message-assistant"><p>年付占比从 31% 升到 44%，主要来自 9 月的定价调整。分析放在右边的文档里，结论在第一页。</p><div class="dn-artifact" role="button" tabindex="0" aria-current="true"><span class="dn-artifact-icon"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg></span><span class="dn-artifact-text"><span class="dn-artifact-title">第三季度经营分析</span><span class="dn-artifact-meta">文档，3 页</span></span></div></div>
      </div>
    </div>
    <div class="ex-mac-dock"><div class="dn-composer"><button class="dn-icon-button" type="button" aria-label="添加"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button><textarea rows="1" aria-label="消息"></textarea><button class="dn-send" type="button" aria-label="发送" disabled><svg class="dn-icon" aria-hidden="true"><use href="#dn-send"/></svg></button></div></div>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 第一页是对话列表（`NavigationStack`），右上角新对话；点进去是对话。
- 输入框贴在键盘上方，避开安全区；发送和停止在同一个位置。
- 产物预览用全屏的 sheet，下拉关闭回到对话原来的位置。
- 新对话首页的建议排成两行，可以横向滑动；长按回答出菜单（复制、重新生成）。

```swift
NavigationStack {
    List(conversations) { NavigationLink($0.title, value: $0) }
        .navigationTitle("对话")
        .toolbar { Button("新对话", systemImage: "square.and.pencil", action: newChat) }
        .navigationDestination(for: Conversation.self) { conversation in
            ThreadView(conversation: conversation)
                .safeAreaInset(edge: .bottom) { Composer() }
                .navigationBarTitleDisplayMode(.inline)
        }
}
```

对话页：顶上是返回和对话名，输入框浮在底部，键盘弹出时跟着上移：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-icon-button" type="button" aria-label="返回"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg></button><span class="ex-ios-nav-title">第三季度经营分析</span><button class="dn-icon-button" type="button" aria-label="分享"><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></button></div>
      <div class="dn-thread">
        <div class="dn-message-user">把这三个月的订阅数据整理成一份分析，重点看年付</div>
        <div class="dn-message-assistant"><p>年付占比从 31% 升到 44%，主要来自 9 月的定价调整。分析放在下面的文档里。</p>
          <div class="dn-artifact" role="button" tabindex="0"><span class="dn-artifact-icon"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg></span><span class="dn-artifact-text"><span class="dn-artifact-title">第三季度经营分析</span><span class="dn-artifact-meta">文档，3 页</span></span></div>
        </div>
      </div>
    </div>
    <div class="ex-ios-dock"><div class="dn-composer"><button class="dn-icon-button" type="button" aria-label="添加"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button><textarea rows="1" aria-label="消息"></textarea><button class="dn-send" type="button" aria-label="发送" disabled><svg class="dn-icon" aria-hidden="true"><use href="#dn-send"/></svg></button></div></div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 正在生成 | 回答边写边显示；输入框里发送换成停止，`Esc` 也能停 |
| 已停止 | 保留已经写出来的部分，末尾一行灰字「已停止」，给「继续」 |
| 出错 | 在回答的位置一行说明（「网络断开了」）加「重试」，用户的消息不丢 |
| 对话太长 | 输入框旁的上下文用量满了以后，说明一句「开一个新对话，带上这段的摘要」，给按钮 |
| 等待确认 | 权限确认卡片停在对话里，侧边栏这条对话旁边一个圆点，切走后也看得到 |
| 没有对话记录 | 侧边栏只有「新对话」，不放空状态插图 |

## 不要

- 回答也套气泡，和用户消息左右对称地排成聊天软件。
- 回答开头「好的！」「这是一个很好的问题」，结尾「希望对你有帮助」；用 emoji 当小标题。
- 每条回答下面常驻五个胶囊按钮；把工具调用的过程整段展开在回答前面。
- 首页的建议写成「你可以问我任何问题」「帮我写点东西」这种说了等于没说的话；建议超过四个。
- 用户往上翻的时候，生成的内容把页面一直往下拽。
- 生成了文件就跳到新页面，回来时对话位置丢了。
- 输入框下面、顶栏、首页各写一遍「AI 可能出错」。
