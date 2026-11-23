# 文档编辑页

写一篇笔记、一份文档的那一页。用户在这里待得最久，页面上除了正在写的字，别的都应该安静下来。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 左边所在文件夹（可以点回去）；右边保存状态、分享、更多。不放格式按钮 | 是 |
| 标题 | 文档的第一行就是标题，直接在正文上方输入，没有单独的标题框 | 是 |
| 正文 | 宽不超过 `content-max`，居中；正文用 `type-body`，长文阅读模式可以切到 `type-prose` | 是 |
| 格式条 | 选中文字时在选区上方出现：加粗、斜体、链接、标题、列表；用完就消失 | 是 |
| 插入 | 空行开头输入 `/` 弹出插入菜单（标题、待办、表格、图片），见[命令面板](../../../deernova-style/references/components/command.md) | 是 |
| 大纲 | 右边一栏，按标题生成，可以收起；文档少于三个标题时不显示 | 否 |

- **没有常驻的格式工具栏。** 格式条只在选中文字时出现；常用格式靠快捷键和 Markdown 写法（`#`、`-`、`**`）。
- **保存不用操心。** 输入后自动保存，顶栏右边一行灰字「已保存」；离线时写「已存在本机」，联网后同步，不弹窗。
- **专注时界面退开。** 开始打字后，顶栏和侧边栏淡到 `ink-tertiary`，鼠标移过去恢复；可以一键进入只剩正文的全屏。
- 标题、待办、引用这些块的间距由块的类型决定，不让用户用空行凑间距。
- 字数、阅读时长这些统计放在「更多」里，不常驻。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-editor { display: grid; grid-template-columns: minmax(0, 1fr) auto; flex: 1; min-height: 0; }
.dn-editor-scroll { position: relative; min-width: 0; min-height: 0; overflow-y: auto; scrollbar-gutter: stable both-edges; padding: var(--space-12) var(--page-margin); }
.dn-doc { max-width: var(--content-max); margin-inline: auto; color: var(--ink); font: var(--type-body); }
.dn-doc h1 { margin: 0 0 var(--space-6); font: var(--type-display); letter-spacing: var(--type-display-tracking); }
.dn-doc h2 { margin: var(--space-8) 0 var(--space-3); font: var(--type-headline); }
.dn-doc p { margin: 0 0 var(--space-3); }
.dn-doc :is(ul, ol) { margin: 0 0 var(--space-3); padding-left: 1.4em; }
.dn-doc ::selection { background: var(--fill-selected); }
.dn-doc mark.is-selected { background: var(--fill-selected); color: inherit; }
.dn-save-state { color: var(--ink-tertiary); font: var(--type-footnote); white-space: nowrap; }
.dn-format-bar { position: absolute; display: flex; gap: 2px; padding: var(--space-1); border: var(--stroke-line) solid var(--line); border-radius: var(--menu-radius); background: var(--surface-raised); box-shadow: var(--shadow-float); }
.dn-outline { display: grid; align-content: start; gap: var(--space-2); width: 200px; padding: var(--space-12) var(--space-4); font: var(--type-footnote); }
.dn-outline a { color: var(--ink-tertiary); text-decoration: none; }
.dn-outline a[aria-current="true"] { color: var(--ink); }
@media (max-width: 960px) { .dn-editor { grid-template-columns: minmax(0, 1fr); } .dn-outline { display: none; } }
```

顶栏只有位置、保存状态和分享；正文居中，选中文字时上方才出现格式条：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <button class="dn-button is-plain" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg>工作</button>
      <div class="dn-toolbar-actions">
        <span class="dn-save-state">已保存</span>
        <button class="dn-icon-button" type="button" aria-label="分享"><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></button>
        <button class="dn-icon-button" type="button" aria-label="更多"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button>
      </div>
    </header>
    <div class="dn-editor">
      <div class="dn-editor-scroll">
        <article class="dn-doc">
          <h1>首页改版：第二轮反馈</h1>
          <p>导航层级是这轮反馈最集中的地方：七位受访者里有五位没找到「归档」。下一版把它移到侧边栏底部，<span class="ex-select"><span class="dn-format-bar ex-format-bar" role="toolbar" aria-label="格式"><button class="dn-icon-button" type="button" aria-label="加粗" aria-pressed="true"><b>B</b></button><button class="dn-icon-button" type="button" aria-label="斜体"><i>I</i></button><button class="dn-icon-button" type="button" aria-label="链接"><svg class="dn-icon" aria-hidden="true"><use href="#dn-link"/></svg></button><button class="dn-icon-button" type="button" aria-label="转成列表"><svg class="dn-icon" aria-hidden="true"><use href="#dn-list"/></svg></button></span><mark class="is-selected">和「回收站」放在一起</mark></span>。</p>
          <h2>下一步</h2>
          <ul><li>周三前出交互稿</li><li>约设计组过一遍侧边栏</li></ul>
        </article>
      </div>
      <nav class="dn-outline" aria-label="大纲">
        <a href="#" aria-current="true">首页改版：第二轮反馈</a>
        <a href="#">下一步</a>
      </nav>
    </div>
  </div>
</div>
```

示例里用 `mark.is-selected` 画出选区；真实页面里格式条按选区的位置放在它上方。

### 窄屏和手机浏览器

- 窄于 `breakpoint-md`：大纲收进「更多」；正文左右留 `page-margin`。
- 触屏：格式条固定在键盘上方的一行，横向滑动；插入菜单从键盘上方升起。
- 侧边栏收成抽屉，编辑时不出现。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 格式放在菜单栏的「格式」菜单和快捷键里，工具栏只有分享和更多；不做悬浮的格式条以外的格式按钮。
- 支持全屏（⌃⌘F）和只剩正文的专注模式；大纲用 `.inspector`。
- 文档用系统的自动保存和版本历史（「文件 › 恢复到」）。

```swift
DocumentGroup(newDocument: NoteDocument()) { file in
    EditorView(document: file.$document)
        .toolbar { ShareLink(item: file.fileURL!) }
}
.commands { TextFormattingCommands() }   // 格式在菜单栏，用快捷键
```

工具栏只有分享，格式在菜单栏和快捷键里：

```html
<div class="ex-mac is-small ex-mac-wide">
  <div class="ex-mac-bar"><div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div><span class="ex-mac-title">首页改版：第二轮反馈</span><button class="dn-glass dn-glass-button" type="button" aria-label="分享"><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></button></div>
  <div class="ex-mac-pad"><article class="dn-doc"><h1>首页改版：第二轮反馈</h1><p>导航层级是这轮反馈最集中的地方：七位受访者里有五位没找到「归档」。</p><h2>下一步</h2><ul><li>周三前出交互稿</li><li>约设计组过一遍侧边栏</li></ul></article></div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 格式条放在键盘上方的工具栏（`.toolbar(placement: .keyboard)`），横向滑动。
- 插入菜单从键盘上方升起；标题是第一行的大字。
- 顶栏只有返回、分享和更多；打字时导航栏可以收起。

```swift
EditorView(document: $document)
    .navigationBarTitleDisplayMode(.inline)
    .toolbar {
        ToolbarItemGroup(placement: .keyboard) { FormatButtons() }   // 键盘上方的格式条
    }
```

格式条贴在键盘上方，横向滑动：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg>工作</button><button class="dn-icon-button" type="button" aria-label="分享"><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></button></div>
      <article class="dn-doc"><h1>首页改版：第二轮反馈</h1><p>导航层级是这轮反馈最集中的地方：七位受访者里有五位没找到「归档」。</p><h2>下一步</h2><ul><li>周三前出交互稿</li><li>约设计组过一遍侧边栏</li></ul></article>
    </div>
    <div class="ex-keyboard-bar" role="toolbar" aria-label="格式"><button class="dn-icon-button" type="button" aria-label="加粗"><b>B</b></button><button class="dn-icon-button" type="button" aria-label="斜体"><i>I</i></button><button class="dn-icon-button" type="button" aria-label="列表"><svg class="dn-icon" aria-hidden="true"><use href="#dn-list"/></svg></button><button class="dn-icon-button" type="button" aria-label="链接"><svg class="dn-icon" aria-hidden="true"><use href="#dn-link"/></svg></button><button class="dn-icon-button" type="button" aria-label="插入"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button></div>
    <div class="ex-keyboard" aria-hidden="true"></div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 新建的空文档 | 光标在标题行，标题行里灰字「标题」；正文第一行灰字「输入 / 插入内容」，打字后消失 |
| 正在保存 | 「正在保存」，不转圈；超过两秒没存上，换成「没有保存，正在重试」 |
| 别人同时在编辑 | 对方的光标和名字出现在正文里；顶栏右边是正在编辑的人的头像 |
| 版本冲突 | 顶部一条[横幅](../../../deernova-style/references/components/banner.md)「另一台设备上有新的改动」，给「对比」和「用这一版」 |
| 只读 | 不显示格式条和插入菜单；顶栏写「只读」，旁边「复制一份来编辑」 |

## 不要

- 顶部常驻一整排 Word 式的格式按钮。
- 标题单独一个输入框，下面再一个正文框。
- 「保存」按钮，或者每次自动保存都弹「已保存」提示。
- 正文拉满宽屏；正文用衬线小字。
- 字数、阅读时长、最后编辑人这些信息常驻在正文上方。
- 编辑时侧边栏、顶栏、大纲都保持高亮，抢走注意力。
