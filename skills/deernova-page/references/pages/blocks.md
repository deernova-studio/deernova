# 块编辑

文档由一个个块组成：段落、标题、待办、提示、折叠、引用、代码、图片、子页面、嵌入、数据库。这一页讲块怎么插入、怎么挪、怎么转换，以及每种块长什么样。页面的外壳和格式条见[文档编辑页](editor.md)。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 块把手 | 鼠标停在一块上时，正文左边的空白里出现两个按钮：「+」在下面插入，拖动把手挪动或打开块菜单 | 是 |
| 插入菜单 | 空行输入 `/` 弹出，按「最近用过」「基础」「媒体」「高级」分组；继续输入就按名称和拼音过滤 | 是 |
| 块菜单 | 点拖动把手打开：转换成、复制、移到、复制块链接、评论、删除 | 是 |
| 空行提示 | 光标所在的空行里一行灰字「输入 / 插入」，只在这一行显示 | 是 |
| 选中的块 | 按 Esc 或从块外拖选，整块用 `fill-selected` 底；可以一起挪、一起删、一起转换 | 是 |

- **把手不占正文的位置。** 把手在正文左边的空白里，出现和消失时正文不动。和块的第一行对齐，不和整块的中线对齐。
- **键盘能做所有事。** Markdown 写法直接转换（`#` 标题、`[]` 待办、`>` 折叠、`"` 引用、三个反引号代码）；⌘⇧↑↓ 挪动块；Tab 缩进成上一块的子块。
- **插入菜单先给最近用过的。** 每一项是一个线性图标、名字，右边灰字写对应的 Markdown 写法，用多了就不用再打开菜单。
- **块的间距由类型决定。** 标题上面空得多，列表项之间空得少；用户按两次回车得到的是一个新的空块，不是更大的间距。
- **颜色不是装饰。** 没有文字颜色和背景色的选项。高亮只有一种（`fill-selected`）。提示块只有三种：普通（`surface-sunken`）、注意（`warning-soft`）、危险（`danger-soft`），用意思选，不用颜色选。
- **提示块的图标是线性图标。** 普通用 `info`，注意用 `warning`，危险用 `error`；不用表情符号。
- **转换不丢内容。** 段落转成待办、标题转成折叠，文字和子块都保留；转不了的选项（图片转成标题）不出现在菜单里。
- **嵌入先给一个安静的卡片。** 链接粘贴进来先是一行带域名的卡片，点「展开预览」才加载完整的嵌入内容。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-doc > :has(> .dn-block-handle, > .dn-slash) { position: relative; }
.dn-block-handle { position: absolute; top: 0; right: calc(100% + var(--space-1)); display: flex; align-items: center; height: 1lh; opacity: 0; transition: opacity var(--duration-instant) var(--ease-standard); }
.dn-block-handle > button { display: grid; place-items: center; width: 22px; height: 24px; padding: 0; border: 0; border-radius: var(--radius-xs); background: none; color: var(--ink-tertiary); cursor: pointer; }
.dn-block-handle > button:last-child { cursor: grab; }
.dn-block-handle > button:hover { background: var(--fill-hover); color: var(--ink-secondary); }
.dn-block-handle .dn-icon { width: var(--icon-size-md); height: var(--icon-size-md); }
.dn-doc > :hover > .dn-block-handle, .dn-doc > .is-hover > .dn-block-handle, .dn-block-handle:focus-within { opacity: 1; }
.dn-doc > .is-selected { border-radius: var(--radius-xs); background: var(--fill-selected); box-shadow: 0 0 0 var(--space-1) var(--fill-selected); }
.dn-doc .is-empty::before { content: attr(data-placeholder); color: var(--ink-tertiary); pointer-events: none; }
.dn-slash { position: absolute; top: calc(100% + var(--space-1)); left: 0; z-index: var(--z-dropdown); width: 280px; max-height: 320px; overflow-y: auto; }
.dn-slash-typed { color: var(--ink); }
.dn-todo { display: flex; align-items: flex-start; gap: var(--space-2); margin: 0 0 var(--space-1); }
.dn-todo.is-done > span:last-child { color: var(--ink-tertiary); }
.dn-callout { display: flex; align-items: flex-start; gap: var(--space-3); margin: 0 0 var(--space-3); padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); background: var(--surface-sunken); }
.dn-callout > .dn-icon { flex: none; width: var(--icon-size-md); height: 1lh; color: var(--ink-secondary); }
.dn-callout > div > :last-child { margin-bottom: 0; }
.dn-callout.is-warning { background: var(--warning-soft); }
.dn-callout.is-warning > .dn-icon { color: var(--warning); }
.dn-callout.is-danger { background: var(--danger-soft); }
.dn-callout.is-danger > .dn-icon { color: var(--danger); }
.dn-toggle { margin: 0 0 var(--space-3); }
.dn-toggle > summary { display: flex; align-items: center; gap: var(--space-1); margin-left: calc(-1 * var(--space-6)); list-style: none; cursor: pointer; }
.dn-toggle > summary::-webkit-details-marker { display: none; }
.dn-toggle > summary > .dn-icon { width: var(--icon-size-md); height: var(--icon-size-md); margin-right: var(--space-1); color: var(--ink-tertiary); transition: rotate var(--duration-base) var(--ease-standard); }
.dn-toggle:not([open]) > summary > .dn-icon { rotate: -90deg; }
.dn-toggle > :not(summary) { margin-top: var(--space-2); }
.dn-doc blockquote { margin: 0 0 var(--space-3); padding-left: var(--space-4); border-left: var(--stroke-control) solid var(--ink); }
.dn-subpage { display: flex; align-items: center; gap: var(--space-2); margin: 0 0 var(--space-1); color: var(--ink); text-decoration: underline; text-decoration-color: var(--line-control); text-underline-offset: 3px; }
.dn-subpage > .dn-icon { width: var(--icon-size-md); height: var(--icon-size-md); color: var(--ink-secondary); }
.dn-embed { margin: 0 0 var(--space-3); padding: var(--space-3); border: var(--stroke-line) solid var(--line); border-radius: var(--radius-md); color: var(--ink); text-decoration: none; }
.dn-columns { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-6); margin: 0 0 var(--space-3); }
```

鼠标停在「范围」这一段上，左边出现「+」和拖动把手；下面的空行输入了「/待」，插入菜单按拼音过滤出待办：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <button class="dn-button is-plain" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg>发布 2.0</button>
      <div class="dn-toolbar-actions"><span class="dn-save-state">已保存</span><button class="dn-icon-button" type="button" aria-label="分享"><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></button></div>
    </header>
    <div class="dn-editor">
      <div class="dn-editor-scroll">
        <article class="dn-doc">
          <h1>需求文档</h1>
          <p>2.0 的目标是让旧版用户无痛迁移：笔记、附件和分享链接都要原样保留。</p>
          <h2>范围</h2>
          <p class="is-hover"><span class="dn-block-handle"><button type="button" aria-label="在下面插入"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button><button type="button" aria-label="拖动或打开块菜单"><svg class="dn-icon" aria-hidden="true"><use href="#dn-grip"/></svg></button></span>这一版只做迁移和分享，不改编辑器本身。下面是要做完的事：</p>
          <label class="dn-todo is-done"><span class="dn-choice-box"><input type="checkbox" checked><svg class="dn-icon is-check" aria-hidden="true"><use href="#dn-check"/></svg></span><span>导出旧版笔记的格式说明</span></label>
          <label class="dn-todo"><span class="dn-choice-box"><input type="checkbox"><svg class="dn-icon is-check" aria-hidden="true"><use href="#dn-check"/></svg></span><span>导入时保留附件</span></label>
          <p><span class="dn-slash-typed">/待</span>
            <span class="dn-menu dn-slash" role="listbox" aria-label="插入">
              <span class="dn-menu-heading">基础</span>
              <span class="dn-menu-item" role="option" aria-selected="true"><svg class="dn-icon" aria-hidden="true"><use href="#dn-success"/></svg><span class="dn-menu-label">待办</span><span class="dn-menu-shortcut">[]</span></span>
              <span class="dn-menu-heading">高级</span>
              <span class="dn-menu-item" role="option" aria-selected="false"><svg class="dn-icon" aria-hidden="true"><use href="#dn-table"/></svg><span class="dn-menu-label">待办数据库</span></span>
            </span>
          </p>
        </article>
      </div>
    </div>
  </div>
</div>
```

各种块放在一起：提示、折叠、引用、子页面、嵌入和分栏；第二个提示块被选中了：

```html
<article class="dn-doc">
  <div class="dn-callout"><svg class="dn-icon" aria-hidden="true"><use href="#dn-info"/></svg><div><p>旧版的分享链接在 12月31日前继续有效，之后跳到新版的同一页。</p></div></div>
  <div class="dn-callout is-warning is-selected"><svg class="dn-icon" aria-hidden="true"><use href="#dn-warning"/></svg><div><p>导入超过 2 GB 的附件会被跳过，导入完成后列出跳过了哪些。</p></div></div>
  <details class="dn-toggle" open><summary><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg><strong>为什么不改编辑器</strong></summary><p>两件事一起上线，出了问题分不清是谁的。编辑器的改动放到 2.1。</p></details>
  <blockquote><p>迁移这件事，用户只会在出错的时候注意到它。</p></blockquote>
  <a class="dn-subpage" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg>迁移测试记录</a>
  <a class="dn-embed dn-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-web"/></svg><span class="dn-item-text"><span class="dn-item-title">旧版导出格式说明</span><span class="dn-item-detail">help.deernova.me</span></span><svg class="dn-icon dn-item-end" aria-hidden="true"><use href="#dn-external"/></svg></a>
  <div class="dn-columns"><div><h2>迁移</h2><p>笔记、附件、标签。</p></div><div><h2>分享</h2><p>链接、权限、有效期。</p></div></div>
</article>
```

### 窄屏和手机浏览器

- 没有悬停，就没有块把手：长按一块选中它，上方出现块菜单；选中后拖动挪位置。
- 插入用键盘上方工具栏里的「+」，从底部升起的面板里按分组排开，也能搜索。
- 分栏在窄屏上排成一列，顺序从左到右变成从上到下。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 块把手、插入菜单和网页一样；插入菜单同时出现在菜单栏「插入」里，每一项有快捷键。
- 块菜单用系统的右键菜单，「转换成」是子菜单。
- 选中的块可以拖进别的文档、别的应用；从访达拖进来的图片和文件直接变成块。

```swift
BlockList(blocks: $document.blocks) { block in
    BlockView(block: block)
        .overlay(alignment: .topLeading) { BlockHandle(block: block).offset(x: -48) }
        .draggable(block.transferID)
        .contextMenu {
            Menu("转换成") { ForEach(block.convertibleKinds) { kind in Button(kind.title) { convert(block, to: kind) } } }
            Button("复制块链接") { copyLink(block) }
            Button("删除", role: .destructive) { delete(block) }
        }
}
.commands {
    CommandMenu("插入") {
        Button("待办") { insert(.todo) }.keyboardShortcut("4", modifiers: [.command, .option])
        Button("代码") { insert(.code) }.keyboardShortcut("c", modifiers: [.command, .option])
    }
}
```

右键一块，转换成子菜单列出它能转换成的类型：

```html
<div class="ex-mac is-small ex-mac-wide">
  <div class="ex-mac-bar"><div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div><span class="ex-mac-title">需求文档</span></div>
  <div class="ex-mac-pad">
    <article class="dn-doc">
      <h2>范围</h2>
      <p class="is-selected">这一版只做迁移和分享，不改编辑器本身。</p>
      <div class="dn-menu ex-block-menu" role="menu" aria-label="块">
        <button class="dn-menu-item" type="button" role="menuitem" aria-haspopup="menu"><svg class="dn-icon" aria-hidden="true"><use href="#dn-changes"/></svg><span class="dn-menu-label">转换成</span><svg class="dn-icon dn-menu-more" aria-hidden="true"><use href="#dn-chevron-right"/></svg></button>
        <button class="dn-menu-item" type="button" role="menuitem"><svg class="dn-icon" aria-hidden="true"><use href="#dn-comment"/></svg><span class="dn-menu-label">评论</span><span class="dn-menu-shortcut">⌘⌥M</span></button>
        <button class="dn-menu-item" type="button" role="menuitem"><svg class="dn-icon" aria-hidden="true"><use href="#dn-link"/></svg><span class="dn-menu-label">复制块链接</span></button>
        <div class="dn-menu-separator" role="separator"></div>
        <button class="dn-menu-item" type="button" role="menuitem"><svg class="dn-icon" aria-hidden="true"><use href="#dn-trash"/></svg><span class="dn-menu-label">删除</span><span class="dn-menu-shortcut">⌫</span></button>
      </div>
    </article>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 键盘上方的工具栏最左边是「+」，打开插入面板；面板按分组排成两列，顶上是搜索。
- 长按一块选中它，上方出现编辑菜单（转换、复制、删除）；按住再拖动挪位置。
- 待办的勾选框扩到 `hit-min` 的点击区域，点字是编辑，点框是勾选。

```swift
EditorView(document: $document)
    .toolbar {
        ToolbarItemGroup(placement: .keyboard) {
            Button("插入", systemImage: "plus") { showsInsert = true }
            FormatButtons()
        }
    }
    .sheet(isPresented: $showsInsert) {
        InsertPanel(onPick: insert).presentationDetents([.medium])
    }
```

插入面板从键盘的位置升起，分组排成两列：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg>发布 2.0</button></div>
      <article class="dn-doc"><h2>范围</h2><p>这一版只做迁移和分享，不改编辑器本身。</p><p class="is-empty" data-placeholder="输入 / 插入"></p></article>
    </div>
    <div class="ex-sheet-panel">
      <label class="dn-input-group"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><input type="search" placeholder="搜索块" aria-label="搜索块"></label>
      <p class="dn-menu-heading">基础</p>
      <div class="dn-insert-grid">
        <button type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-success"/></svg>待办</button>
        <button type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-list"/></svg>列表</button>
        <button type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg>子页面</button>
        <button type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-image"/></svg>图片</button>
        <button type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-info"/></svg>提示</button>
        <button type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-code"/></svg>代码</button>
      </div>
    </div>
  </div>
</div>
```

插入面板里的两列：

```css
.dn-insert-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--space-2); }
.dn-insert-grid > button { display: flex; align-items: center; gap: var(--space-2); min-height: var(--hit-min); padding: 0 var(--space-3); border: 0; border-radius: var(--radius-md); background: var(--surface-raised); color: var(--ink); font: var(--type-body); text-align: left; }
.dn-insert-grid .dn-icon { width: var(--icon-size-md); height: var(--icon-size-md); color: var(--ink-secondary); }
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 插入菜单没有匹配 | 菜单里一行「没有叫“甘特”的块」，回车就把「/甘特」当普通文字留下 |
| 拖动中 | 被拖的块变淡，要放下的位置一条 2px 墨线；拖到另一块右边缘时出现竖线，松手变成分栏 |
| 粘贴一段 Markdown | 按块解析：标题、列表、代码各成一块；底部轻提示「已粘贴 12 块」加「撤销」 |
| 嵌入加载失败 | 卡片保留域名和标题，下面一行灰字「预览加载不出来」，链接照常能点 |
| 图片上传中 | 图片位置先占好尺寸，显示本地预览和一条细进度；失败时写原因和「重试」 |
| 一次删除很多块 | 直接删，底部轻提示「已删除 8 块」加「撤销」，不弹确认 |

## 不要

- 给文字和块提供一整排颜色，文档变得花花绿绿。
- 提示块用表情符号当图标，或者让用户从十几种底色里挑。
- 把手常驻在每一块左边，或者出现时把正文往右推。
- 插入菜单一打开就是几十项平铺，没有分组和搜索。
- 用户按几次回车就多几行空白间距。
- 粘贴网页内容时连字体、颜色和字号一起带进来；粘贴只保留结构。
