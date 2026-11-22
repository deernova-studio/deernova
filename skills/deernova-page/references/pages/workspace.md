# 工作区与页面树

文档类应用的外壳：左边是一棵可以层层嵌套的页面树，右边是打开的页面。打开应用先看到工作区首页：最近在写什么、谁提到了你。写一页的样子见[文档编辑页](editor.md)，页面里的块见[块编辑](blocks.md)。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 工作区切换 | 侧边栏最上面：工作区名字和切换菜单 | 有多个工作区时 |
| 常用入口 | 搜索（⌘K）、首页、收件箱（提到你的、分配给你的） | 是 |
| 收藏 | 用户自己钉住的几页，平铺，不展开子页面 | 有收藏时 |
| 页面树 | 「团队空间」和「私人」两组；每页一行，有子页面的行首一个展开箭头，子页面缩进一级 | 是 |
| 行尾操作 | 悬停或选中时出现：更多（重命名、移动、复制链接、删除）、在这一页里新建子页面；样子见 Mac 一节的示例 | 是 |
| 侧栏底部 | 模板、回收站、设置 | 是 |
| 工作区首页 | 最近编辑的页面、提到你的评论；不放欢迎语和使用技巧 | 是 |

- **树就是目录。** 一页可以放进另一页，层级不限；但展开超过四层时，侧边栏只显示到第四层，更深的在页面顶部的路径里走。
- **页面图标默认是同一个线性文档图标。** 数据库用表格图标。不用表情符号做页面图标，也不给页面加彩色封面图；页面靠标题区分。
- **当前页在树里标出来。** 打开一页时，它的上级自动展开，这一行用 `fill-selected` 底；树滚到能看见它。
- **拖动就是移动。** 把一行拖到另一行上是放进去当子页面，拖到两行之间是排顺序；拖动时只画一条墨线或给目标行一个 1px 墨色框。
- **私人的页面只有自己看得到。** 「私人」组里的页面挪到「团队空间」时，先确认「团队里所有人都能看到它和它的 3 个子页面」。
- **首页只回答两件事。** 我上次写到哪了，谁在等我回复。不放「下午好」、使用技巧和插画。
- **删除先进回收站。** 删掉一页连同子页面进回收站，底部轻提示「已删除“发布 2.0”和 2 个子页面」加「撤销」；30 天后才真正删除。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-workspace { display: flex; align-items: center; gap: var(--space-2); min-height: var(--row-height); padding: 0 var(--row-padding-x); border: 0; border-radius: var(--row-radius); background: none; color: var(--ink); font: var(--weight-semibold) var(--type-callout-size)/1.2 var(--font-sans); text-align: left; cursor: pointer; }
.dn-workspace > .dn-icon { width: var(--icon-size-sm); height: var(--icon-size-sm); color: var(--ink-tertiary); }
.dn-tree, .dn-tree ul { margin: 0; padding: 0; list-style: none; }
.dn-tree ul { padding-left: var(--space-4); }
.dn-tree-row { display: flex; align-items: center; gap: 2px; min-height: var(--row-height); padding: 0 var(--space-1); border-radius: var(--row-radius); }
@media (hover: hover) { .dn-tree-row:hover { background: var(--fill-hover); } }
.dn-tree-row[aria-current="page"] { background: var(--fill-selected); }
.dn-tree-toggle { display: grid; place-items: center; flex: none; width: calc(var(--row-height) - var(--space-4)); height: calc(var(--row-height) - var(--space-4)); padding: 0; border: 0; border-radius: var(--radius-xs); background: none; color: var(--ink-tertiary); cursor: pointer; }
.dn-tree-toggle > .dn-icon { width: var(--icon-size-sm); height: var(--icon-size-sm); transition: rotate var(--duration-base) var(--ease-standard); }
.dn-tree-toggle[aria-expanded="false"] > .dn-icon { rotate: -90deg; }
.dn-tree-row > a { display: flex; align-items: center; gap: var(--space-2); flex: 1; min-width: 0; color: var(--ink); font: var(--type-callout); text-decoration: none; }
.dn-tree-row > a > .dn-icon { flex: none; width: var(--icon-size-md); height: var(--icon-size-md); color: var(--ink-secondary); }
.dn-tree-row > a > span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dn-tree-actions { display: none; flex: none; }
.dn-tree-actions > .dn-icon-button { width: calc(var(--row-height) - var(--space-4)); height: calc(var(--row-height) - var(--space-4)); }
.dn-tree-row:is(:hover, :focus-within, [aria-current="page"]) > .dn-tree-actions { display: flex; }
.dn-ws-home { display: grid; align-content: start; gap: var(--space-8); width: 100%; max-width: var(--content-max); margin-inline: auto; padding-top: var(--space-6); }
.dn-ws-home h2 { margin: 0 0 var(--space-2); color: var(--ink-tertiary); font: var(--weight-regular) var(--type-footnote-size)/var(--type-footnote-line) var(--font-sans); }
.dn-ws-path { color: var(--ink-tertiary); }
.dn-ws-home .dn-rows-item > .dn-icon { flex: none; width: var(--icon-size-md); height: var(--icon-size-md); margin-top: calc((var(--type-body-line) - var(--icon-size-md)) / 2); color: var(--ink-secondary); }
```

工作区首页：侧边栏里是收藏和两组页面树；主区只有最近编辑和提到你的评论：

```html
<div class="dn-app ex-page is-tall">
  <nav class="dn-sidebar" aria-label="侧边栏">
    <button class="dn-workspace" type="button" aria-haspopup="menu"><span class="dn-mark is-sm" aria-hidden="true">鹿</span>鹿野工作室<svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg></button>
    <div class="dn-sidebar-section">
      <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><span class="dn-sidebar-label">搜索</span><span class="dn-sidebar-count">⌘K</span></a>
      <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-home"/></svg><span class="dn-sidebar-label">首页</span></a>
      <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-bell"/></svg><span class="dn-sidebar-label">收件箱</span><span class="dn-sidebar-count">2</span></a>
    </div>
    <details class="dn-sidebar-group" open>
      <summary class="dn-sidebar-heading">收藏<svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg></summary>
      <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span class="dn-sidebar-label">需求文档</span></a>
    </details>
    <details class="dn-sidebar-group" open>
      <summary class="dn-sidebar-heading">团队空间<svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg></summary>
      <ul class="dn-tree" aria-label="团队空间"><li><div class="dn-tree-row"><button class="dn-tree-toggle" type="button" aria-expanded="true" aria-label="收起产品"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg></button><a href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span>产品</span></a></div><ul><li><div class="dn-tree-row"><button class="dn-tree-toggle" type="button" aria-expanded="true" aria-label="收起发布 2.0"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg></button><a href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span>发布 2.0</span></a></div><ul><li><div class="dn-tree-row"><span class="dn-tree-toggle" aria-hidden="true"></span><a href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span>需求文档</span></a></div></li><li><div class="dn-tree-row"><span class="dn-tree-toggle" aria-hidden="true"></span><a href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span>发布清单</span></a></div></li></ul></li><li><div class="dn-tree-row"><span class="dn-tree-toggle" aria-hidden="true"></span><a href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-table"/></svg><span>需求池</span></a></div></li><li><div class="dn-tree-row"><span class="dn-tree-toggle" aria-hidden="true"></span><a href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span>设计评审记录</span></a></div></li></ul></li><li><div class="dn-tree-row"><button class="dn-tree-toggle" type="button" aria-expanded="false" aria-label="展开工程"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg></button><a href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span>工程</span></a></div></li><li><div class="dn-tree-row"><button class="dn-tree-toggle" type="button" aria-expanded="false" aria-label="展开周会"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg></button><a href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-table"/></svg><span>周会</span></a></div></li></ul>
    </details>
    <details class="dn-sidebar-group" open>
      <summary class="dn-sidebar-heading">私人<svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg></summary>
      <ul class="dn-tree" aria-label="私人"><li><div class="dn-tree-row"><span class="dn-tree-toggle" aria-hidden="true"></span><a href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span>读书笔记</span></a></div></li><li><div class="dn-tree-row"><button class="dn-tree-toggle" type="button" aria-expanded="false" aria-label="展开2026 年计划"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg></button><a href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span>2026 年计划</span></a></div></li></ul>
    </details>
    <div class="dn-sidebar-section">
      <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-template"/></svg><span class="dn-sidebar-label">模板</span></a>
      <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-trash"/></svg><span class="dn-sidebar-label">回收站</span></a>
    </div>
  </nav>
  <div class="dn-app-main">
    <div class="dn-app-content">
      <div class="dn-ws-home">
        <section aria-label="最近编辑">
          <h2>最近编辑</h2>
          <ul class="dn-rows">
            <li class="dn-rows-item"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><a class="dn-rows-text" href="#"><span class="dn-rows-title">需求文档</span><span class="dn-rows-detail"><span class="dn-ws-path">产品 / 发布 2.0</span>　你在 10 分钟前编辑</span></a></li>
            <li class="dn-rows-item"><svg class="dn-icon" aria-hidden="true"><use href="#dn-table"/></svg><a class="dn-rows-text" href="#"><span class="dn-rows-title">需求池</span><span class="dn-rows-detail"><span class="dn-ws-path">产品</span>　周舟在 1 小时前加了 3 条</span></a></li>
            <li class="dn-rows-item"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><a class="dn-rows-text" href="#"><span class="dn-rows-title">读书笔记</span><span class="dn-rows-detail"><span class="dn-ws-path">私人</span>　你在昨天编辑</span></a></li>
          </ul>
        </section>
        <section aria-label="提到你的">
          <h2>提到你的</h2>
          <ul class="dn-rows">
            <li class="dn-rows-item"><span class="dn-avatar is-lg" aria-hidden="true">沈</span><a class="dn-rows-text" href="#"><span class="dn-rows-title">沈遥在「发布清单」里提到你</span><span class="dn-rows-detail">灰度比例要不要从 5% 开始？@林一 你定一下。</span></a></li>
            <li class="dn-rows-item"><span class="dn-avatar is-lg" aria-hidden="true">周</span><a class="dn-rows-text" href="#"><span class="dn-rows-title">周舟回复了你的评论</span><span class="dn-rows-detail">附件导入那段我补了截图，再看看。</span></a></li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 侧边栏收成左边滑出的抽屉，打开一页后自动收起。
- 页面树里展开箭头的点击区域扩到 `hit-min`，和标题分开，点标题打开、点箭头展开。
- 拖动换成每一行「更多」菜单里的「移到…」，选目标页。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 侧边栏用系统的 `List` 加 `OutlineGroup`，展开箭头、拖动排序、键盘方向键展开收起都是系统行为。
- 一页可以用 ⌘ 双击在新窗口或新标签页打开；窗口标签页（`.tabbingMode`）用系统的。
- 右键菜单：在新窗口打开、复制链接、移到、收藏、删除；拖到访达里导出为 Markdown。

```swift
NavigationSplitView {
    List(selection: $selection) {
        Section("收藏") { ForEach(favorites) { PageRow(page: $0) } }
        Section("团队空间") {
            OutlineGroup(teamPages, children: \.childrenIfAny) { PageRow(page: $0) }
        }
        Section("私人") {
            OutlineGroup(privatePages, children: \.childrenIfAny) { PageRow(page: $0) }
        }
    }
    .contextMenu(forSelectionType: Page.ID.self) { ids in PageActions(ids: ids) }
    .dropDestination(for: Page.TransferID.self) { ids, _ in move(ids) }
} detail: {
    PageView(page: selectedPage)
}
```

页面树在系统侧边栏里，当前页的上级自动展开：

```html
<div class="ex-mac">
  <nav class="ex-mac-sidebar" aria-label="页面">
    <div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div>
    <p class="dn-sidebar-heading">团队空间</p>
    <ul class="dn-tree" aria-label="团队空间"><li><div class="dn-tree-row"><button class="dn-tree-toggle" type="button" aria-expanded="true" aria-label="收起产品"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg></button><a href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span>产品</span></a></div><ul><li><div class="dn-tree-row"><button class="dn-tree-toggle" type="button" aria-expanded="true" aria-label="收起发布 2.0"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg></button><a href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span>发布 2.0</span></a></div><ul><li><div class="dn-tree-row" aria-current="page"><span class="dn-tree-toggle" aria-hidden="true"></span><a href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span>需求文档</span></a><span class="dn-tree-actions"><button class="dn-icon-button" type="button" aria-label="需求文档的更多操作"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button><button class="dn-icon-button" type="button" aria-label="在需求文档里新建页面"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button></span></div></li><li><div class="dn-tree-row"><span class="dn-tree-toggle" aria-hidden="true"></span><a href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span>发布清单</span></a></div></li></ul></li><li><div class="dn-tree-row"><span class="dn-tree-toggle" aria-hidden="true"></span><a href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-table"/></svg><span>需求池</span></a></div></li></ul></li><li><div class="dn-tree-row"><button class="dn-tree-toggle" type="button" aria-expanded="false" aria-label="展开工程"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg></button><a href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span>工程</span></a></div></li></ul>
  </nav>
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><span class="ex-mac-title"><span class="dn-ws-path">产品 / 发布 2.0 /</span> 需求文档</span><button class="dn-glass dn-glass-button" type="button" aria-label="分享"><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></button></div>
    <div class="ex-mac-pad"><article class="dn-doc"><h1>需求文档</h1><p>2.0 的目标是让旧版用户无痛迁移：笔记、附件和分享链接都要原样保留。</p><h2>范围</h2><ul><li>导入旧版笔记时保留附件</li><li>分享链接设置有效期</li></ul></article></div>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 不画树：一层一页往里推进。一页里先是它的正文，子页面列在正文最后；工作区首页列出顶层页面。
- 有子页面的行写「3 个子页面」，点进去是那一页。
- 右上角新建；长按一行是收藏、移到、复制链接、删除。

```swift
NavigationStack(path: $path) {
    List {
        Section("最近") { ForEach(recent) { PageLink(page: $0) } }
        Section("团队空间") { ForEach(teamPages) { PageLink(page: $0) } }
        Section("私人") { ForEach(privatePages) { PageLink(page: $0) } }
    }
    .navigationTitle("鹿野工作室")
    .navigationDestination(for: Page.self) { PageView(page: $0) }
    .toolbar { Button("新建", systemImage: "square.and.pencil", action: newPage) }
}
```

一层一页：顶层页面写子页面数，点进去再往下走：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><span></span><button class="dn-icon-button" type="button" aria-label="新建"><svg class="dn-icon" aria-hidden="true"><use href="#dn-edit"/></svg></button></div>
      <h3 class="ex-ios-large">鹿野工作室</h3>
      <section class="dn-list-section"><p class="dn-list-header">最近编辑</p><ul class="dn-list">
        <li class="dn-list-row">需求文档<span class="dn-list-value">10 分钟前</span></li>
        <li class="dn-list-row">需求池<span class="dn-list-value">1 小时前</span></li>
      </ul></section>
      <section class="dn-list-section"><p class="dn-list-header">团队空间</p><ul class="dn-list">
        <li class="dn-list-row">产品<span class="dn-list-value">3 个子页面</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
        <li class="dn-list-row">工程<span class="dn-list-value">5 个子页面</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
        <li class="dn-list-row">周会<span class="dn-list-value">数据库</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
      </ul></section>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 新工作区 | 树里只有一页「开始」，首页一句「新建一页，或者从模板开始」加两个按钮；不放引导动画 |
| 没有权限的页面 | 不出现在树里；从链接打开时是[整页错误](error.md)的「没有权限」，加「申请访问」 |
| 别人刚建了一页 | 直接出现在树里对应的位置，不弹提示 |
| 页面已删除 | 从树里消失；从链接打开时顶部横幅「这一页在回收站里」，加「恢复」 |
| 拖到不能放的位置 | 目标行不出现墨线，松手后回到原处；不能把一页拖进它自己的子页面 |
| 离线 | 侧边栏顶部一行灰字「离线，改动会在联网后同步」；树照常能用 |

## 不要

- 每一页配一个表情符号和一张彩色封面图，侧边栏变成贴纸墙。
- 首页放「下午好」、每日一句和使用技巧卡片。
- 树一展开就是十几层，缩进挤得只剩两个字。
- 删除一页时不提它的子页面也一起删了。
- 页面树和「最近」「收藏」里同一页长得不一样，或者点了去的地方不一样。
