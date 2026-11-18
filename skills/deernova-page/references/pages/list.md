# 列表页

应用里浏览一组同类条目、挑出一条来处理：任务、订单、联系人、文件、笔记、邮件。有两种排法：默认是**单栏列表**，点一行就地处理或打开它的[详情页](detail.md)；要一条接一条地读时（邮件、笔记、消息）用**列表加详情**，左边列表、右边当前这一条。条目有很多可比较的属性（大小、金额、负责人）时改用[表格](../../../deernova-style/references/components/table.md)，条目以图片为主时用[卡片页](cards.md)。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 当前范围的名字（「全部笔记」）、新建，最多再加一个视图切换 | 是 |
| 筛选行 | 搜索框、一到三个最常用的筛选、排序。条目少于一屏时不要 | 否 |
| 已生效的筛选 | 每个筛选一个标签，可以单独去掉，末尾「清除」 | 有筛选时 |
| 列表 | 每行一个主文字加一个次要值（时间或状态），行高一致。按时间排序时可以分组（今天、本周、更早） | 是 |
| 行尾操作 | 每行最多一两个常用操作，悬停或聚焦时才出现；其余放右键菜单 | 否 |
| 详情 | 列表加详情时，右边是选中的那一条，正文不超过 `content-max` | 列表加详情时 |

**单栏列表**（默认）

- 用在条目各自独立、找到一条就去处理的场合：任务、订单、联系人、文件、通知。
- 列表在内容区里居中，宽不超过 `wide-max`；一行一条，行之间一条细线，不放进卡片。
- 点一行打开详情页，或者就地完成（勾选任务、切换状态）；勾选框、行尾操作不触发打开。
- 行比列表加详情里的更舒展：主文字一行，下面一行灰色的所属（项目、客户），行尾是时间或金额。

**列表加详情**

- 用在要连续读很多条的场合：邮件、笔记、消息、工单。
- 列表栏宽 `pane-width`，可以拖动；列表和详情各自滚动，互不带动。
- 打开时选中第一条，详情不空着；用户删掉当前这条后，选中下一条。

**两种都要遵守**

- 筛选减少条目，排序只改顺序，两者分开放：筛选在左，排序在筛选行最右边。
- 从详情返回列表时，保留筛选、排序、滚动位置和选中项，不重新加载、不跳回顶部。
- 条目多时按需加载，滚到底自动接上；用户要找某一条时，靠搜索，不靠一直往下翻。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-rows-page { max-width: var(--wide-max); margin-inline: auto; }
.dn-rows-bar { display: flex; flex-wrap: wrap; align-items: center; gap: var(--gap-stack); margin-bottom: var(--space-2); }
.dn-rows-bar > .dn-input-group { width: min(100%, 320px); }
.dn-rows-bar > :last-child { margin-left: auto; }
.dn-rows { margin: 0; padding: 0; list-style: none; }
.dn-rows-group { margin: var(--space-5) 0 0; padding: 0 var(--row-padding-x) var(--space-2); border-bottom: var(--stroke-line) solid var(--line); color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-rows-item { display: flex; align-items: center; gap: var(--space-3); min-height: calc(var(--row-height) + var(--space-4)); padding: 0 var(--row-padding-x); border-bottom: var(--stroke-line) solid var(--line); color: var(--ink); text-decoration: none; }
@media (hover: hover) { .dn-rows-item:hover { background: var(--fill-hover); } }
.dn-rows-item > .dn-choice-box { margin-top: 0; }
.dn-rows-text { display: grid; flex: 1; min-width: 0; color: inherit; text-decoration: none; }
.dn-rows-title { overflow: hidden; font: var(--type-body); text-overflow: ellipsis; white-space: nowrap; }
.dn-rows-detail { color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-rows-meta { flex: none; color: var(--ink-secondary); font: var(--type-callout); font-variant-numeric: tabular-nums; }
.dn-rows-actions { flex: none; opacity: 0; transition: opacity var(--duration-instant) var(--ease-standard); }
.dn-rows-item:is(:hover, :focus-within) .dn-rows-actions { opacity: 1; }
.dn-split { display: grid; grid-template-columns: var(--pane-width) minmax(0, 1fr); flex: 1; min-height: 0; }
.dn-split-list { display: flex; flex-direction: column; min-height: 0; border-right: var(--stroke-line) solid var(--line); }
.dn-split-scroll { flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; padding: 0 var(--space-2) var(--space-2); }
.dn-split-group { margin: 0; padding: var(--space-3) var(--row-padding-x) var(--space-1); color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-split-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: baseline; gap: 2px var(--space-3); padding: var(--space-2) var(--row-padding-x); border-radius: var(--row-radius); color: var(--ink); text-decoration: none; }
.dn-split-row-title { overflow: hidden; font: var(--weight-medium) var(--type-body-size)/var(--type-body-line) var(--font-sans); text-overflow: ellipsis; white-space: nowrap; }
.dn-split-row-meta { color: var(--ink-tertiary); font: var(--type-footnote); font-variant-numeric: tabular-nums; white-space: nowrap; }
.dn-split-row-detail { grid-column: 1 / -1; overflow: hidden; color: var(--ink-secondary); font: var(--type-callout); text-overflow: ellipsis; white-space: nowrap; }
@media (hover: hover) { .dn-split-row:hover { background: var(--fill-hover); } }
.dn-split-row[aria-current="true"] { background: var(--fill-selected); }
.dn-split-row:focus-visible { outline: var(--stroke-focus) solid var(--focus-ring); outline-offset: calc(-1 * var(--stroke-focus)); }
.dn-split-detail { min-width: 0; min-height: 0; overflow-y: auto; padding: var(--space-6) var(--page-margin); }
.dn-split-detail > * { max-width: var(--content-max); margin-inline: auto; }
.dn-split-detail :is(h1, h2, h3) { margin: 0 0 var(--space-4); font: var(--type-title); }
.dn-split-detail p { margin: 0 0 var(--space-3); color: var(--ink); font: var(--type-body); }
.dn-filter-bar { display: flex; flex-wrap: wrap; align-items: center; gap: var(--gap-stack); padding: var(--space-2); }
.dn-filter-bar > .dn-input-group { flex: 1 1 100%; }
.dn-filter-end { margin-left: auto; }
@media (max-width: 960px) {
  .dn-split { grid-template-columns: minmax(0, 1fr); }
  .dn-split:has(.dn-split-row[aria-current="true"]) .dn-split-list { display: none; }
}
```

单栏列表：在内容区里居中，一行一条、行之间一条细线；勾选就地完成，点标题打开详情页，「更多」悬停时才出现：

```html
<div class="dn-app ex-page">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <h2 class="dn-toolbar-title"><span>我的任务</span></h2>
      <div class="dn-toolbar-actions"><button class="dn-icon-button" type="button" aria-label="新建任务"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button></div>
    </header>
    <div class="dn-app-content">
      <div class="dn-rows-page">
        <div class="dn-rows-bar">
          <label class="dn-input-group"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><input type="search" placeholder="搜索任务" aria-label="搜索任务"></label>
          <button class="dn-button is-sm" type="button" aria-label="去掉筛选：未完成">未完成<svg class="dn-icon" aria-hidden="true"><use href="#dn-close"/></svg></button>
          <button class="dn-button is-plain is-sm" type="button">截止日期<svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg></button>
        </div>
        <ul class="dn-rows">
          <li class="dn-rows-group">本周</li>
          <li class="dn-rows-item"><span class="dn-choice-box"><input type="checkbox" aria-label="完成：设置页先出交互稿"><svg class="dn-icon is-check" aria-hidden="true"><use href="#dn-check"/></svg></span><a class="dn-rows-text" href="#"><span class="dn-rows-title">设置页先出交互稿</span><span class="dn-rows-detail">设置页改版</span></a><span class="dn-rows-meta">周五</span><button class="dn-icon-button dn-rows-actions" type="button" aria-label="更多"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></li>
          <li class="dn-rows-item"><span class="dn-choice-box"><input type="checkbox" aria-label="完成：约设计组过一遍侧边栏"><svg class="dn-icon is-check" aria-hidden="true"><use href="#dn-check"/></svg></span><a class="dn-rows-text" href="#"><span class="dn-rows-title">约设计组过一遍侧边栏</span><span class="dn-rows-detail">首页改版</span></a><span class="dn-rows-meta">周三</span><button class="dn-icon-button dn-rows-actions" type="button" aria-label="更多"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></li>
          <li class="dn-rows-group">更晚</li>
          <li class="dn-rows-item"><span class="dn-choice-box"><input type="checkbox" aria-label="完成：支付超时复盘的改进上线"><svg class="dn-icon is-check" aria-hidden="true"><use href="#dn-check"/></svg></span><a class="dn-rows-text" href="#"><span class="dn-rows-title">支付超时复盘的改进上线</span><span class="dn-rows-detail">支付</span></a><span class="dn-rows-meta">11月28日</span><button class="dn-icon-button dn-rows-actions" type="button" aria-label="更多"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></li>
          <li class="dn-rows-item"><span class="dn-choice-box"><input type="checkbox" aria-label="完成：整理 2027 年第一季度计划"><svg class="dn-icon is-check" aria-hidden="true"><use href="#dn-check"/></svg></span><a class="dn-rows-text" href="#"><span class="dn-rows-title">整理 2027 年第一季度计划</span><span class="dn-rows-detail">计划</span></a><span class="dn-rows-meta">12月5日</span><button class="dn-icon-button dn-rows-actions" type="button" aria-label="更多"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></li>
        </ul>
      </div>
    </div>
  </div>
</div>
```

列表加详情：列表行是标题、时间加一行摘要；筛选和排序分开，已生效的筛选能单独去掉：

```html
<div class="dn-app ex-page">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <h2 class="dn-toolbar-title"><span>全部笔记</span></h2>
      <div class="dn-toolbar-actions">
        <button class="dn-icon-button" type="button" aria-label="新建笔记"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button>
      </div>
    </header>
    <div class="dn-split">
      <div class="dn-split-list">
        <div class="dn-filter-bar">
          <label class="dn-input-group"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><input type="search" placeholder="搜索" aria-label="搜索笔记"></label>
          <button class="dn-button is-sm" type="button" aria-label="去掉筛选：工作">工作<svg class="dn-icon" aria-hidden="true"><use href="#dn-close"/></svg></button>
          <button class="dn-button is-plain is-sm dn-filter-end" type="button">最近修改<svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg></button>
        </div>
        <div class="dn-split-scroll">
          <p class="dn-split-group">今天</p>
          <a class="dn-split-row" href="#" aria-current="true"><span class="dn-split-row-title">首页改版：第二轮反馈</span><span class="dn-split-row-meta">14:03</span><span class="dn-split-row-detail">导航层级是这轮反馈最集中的地方</span></a>
          <a class="dn-split-row" href="#"><span class="dn-split-row-title">设计周会纪要</span><span class="dn-split-row-meta">09:30</span><span class="dn-split-row-detail">设置页先出交互稿，周五评审</span></a>
          <p class="dn-split-group">本周</p>
          <a class="dn-split-row" href="#"><span class="dn-split-row-title">给官网的三条修改意见</span><span class="dn-split-row-meta">周二</span><span class="dn-split-row-detail">首屏标题太长，按钮文字不具体</span></a>
          <a class="dn-split-row" href="#"><span class="dn-split-row-title">支付超时复盘</span><span class="dn-split-row-meta">周一</span><span class="dn-split-row-detail">重试间隔从 2 秒改成指数退避</span></a>
        </div>
      </div>
      <article class="dn-split-detail">
        <div>
          <h3>首页改版：第二轮反馈</h3>
          <p>导航层级是这轮反馈最集中的地方：七位受访者里有五位没找到「归档」。下一版把它移到侧边栏底部，和「回收站」放在一起。</p>
          <p>搜索的反馈都是正面的。两位提到希望能按文件夹筛选，先记下，不放进这一版。</p>
        </div>
      </article>
    </div>
  </div>
</div>
```

筛选后没有结果，和「一条都没有」分开写，并给出回去的路：

```html
<div class="dn-app ex-page">
  <div class="dn-app-main">
    <header class="dn-toolbar"><h2 class="dn-toolbar-title"><span>全部笔记</span></h2></header>
    <div class="dn-app-content">
      <div class="dn-centered">
        <div class="dn-empty">
          <svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg>
          <p class="dn-empty-title">没有符合条件的笔记</p>
          <p class="dn-empty-body">「工作」里没有包含「季度预算」的笔记。</p>
          <div class="dn-empty-actions"><button class="dn-button" type="button">清除筛选</button></div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 窄于 `breakpoint-md`：列表和详情变成两页。点一行进入详情，顶栏左边出现返回；返回后列表停在原来的位置。
- 窄于 `breakpoint-sm`：筛选收进一个「筛选」按钮，按钮上显示已生效的数量；搜索留在列表顶部。
- 行里的次要值不换行，空间不够时先截断主文字。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 单栏列表用两栏的 `NavigationSplitView`（系统侧边栏、列表），双击或回车打开详情：推入当前窗口，或用 ⌘ 双击在新窗口打开。
- 列表加详情用三栏的 `NavigationSplitView`：系统侧边栏、列表栏、详情；列表用 `List(selection:)`，选中项由系统画出底色。
- 搜索用 `.searchable` 放在工具栏，⌘F 聚焦；排序和筛选放进工具栏的菜单。
- 新建在工具栏，⌘N；删除用 ⌫ 或右键菜单，删除后可以 ⌘Z 撤销。

```swift
NavigationSplitView {
    List(folders, selection: $folder) { Label($0.name, systemImage: "folder") }
} content: {
    List(notes, selection: $note) { NoteRow(note: $0) }
        .searchable(text: $query)
        .toolbar { Menu("排序", systemImage: "arrow.up.arrow.down") { SortPicker() } }
} detail: {
    NoteDetail(note: note)
}
```

三栏：系统侧边栏、列表栏、详情；选中的那一行一直标着：

```html
<div class="ex-mac has-list">
  <nav class="ex-mac-sidebar" aria-label="文件夹">
    <div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div>
    <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span class="dn-sidebar-label">全部笔记</span><span class="dn-sidebar-count">128</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-folder"/></svg><span class="dn-sidebar-label">工作</span><span class="dn-sidebar-count">64</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-folder"/></svg><span class="dn-sidebar-label">读书</span><span class="dn-sidebar-count">23</span></a>
  </nav>
  <div class="ex-mac-col">
    <a class="dn-split-row" href="#" aria-current="true"><span class="dn-split-row-title">首页改版：第二轮反馈</span><span class="dn-split-row-meta">14:03</span><span class="dn-split-row-detail">导航层级是这轮反馈最集中的地方</span></a>
    <a class="dn-split-row" href="#"><span class="dn-split-row-title">设计周会纪要</span><span class="dn-split-row-meta">09:30</span><span class="dn-split-row-detail">设置页先出交互稿，周五评审</span></a>
    <a class="dn-split-row" href="#"><span class="dn-split-row-title">支付超时复盘</span><span class="dn-split-row-meta">周一</span><span class="dn-split-row-detail">重试间隔改成指数退避</span></a>
  </div>
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><div class="dn-glass dn-glass-group"><button class="dn-glass-button" type="button" aria-label="新建"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button><button class="dn-glass-button" type="button" aria-label="搜索"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg></button></div></div>
    <div class="ex-mac-body dn-split-detail"><div><h3>首页改版：第二轮反馈</h3><p>导航层级是这轮反馈最集中的地方：七位受访者里有五位没找到「归档」。</p></div></div>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- `NavigationStack`：列表是第一页，点一行进入详情，返回后停在原来的位置。
- 搜索栏在列表顶部，下拉时出现；筛选和排序放在右上角的菜单。
- 左滑删除或归档，右滑标记；新建在右上角，或者底部的主按钮。

```swift
NavigationStack {
    List(notes) { note in
        NavigationLink(value: note) { NoteRow(note: note) }
            .swipeActions { Button("删除", role: .destructive) { delete(note) } }
    }
    .navigationTitle("全部笔记")
    .searchable(text: $query)
    .navigationDestination(for: Note.self) { NoteDetail(note: $0) }
}
```

大标题、下拉出现的搜索、一行一条；新建在底部的玻璃按钮里：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><span></span><button class="dn-icon-button" type="button" aria-label="排序和筛选"><svg class="dn-icon" aria-hidden="true"><use href="#dn-options"/></svg></button></div>
      <h3 class="ex-ios-large">全部笔记</h3>
      <label class="dn-input-group"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><input type="search" placeholder="搜索" aria-label="搜索笔记"></label>
      <div>
        <a class="dn-split-row" href="#"><span class="dn-split-row-title">首页改版：第二轮反馈</span><span class="dn-split-row-meta">14:03</span><span class="dn-split-row-detail">导航层级是这轮反馈最集中的地方</span></a>
        <a class="dn-split-row" href="#"><span class="dn-split-row-title">设计周会纪要</span><span class="dn-split-row-meta">09:30</span><span class="dn-split-row-detail">设置页先出交互稿，周五评审</span></a>
        <a class="dn-split-row" href="#"><span class="dn-split-row-title">支付超时复盘</span><span class="dn-split-row-meta">周一</span><span class="dn-split-row-detail">重试间隔改成指数退避</span></a>
      </div>
    </div>
    <div class="ex-ios-dock"><span></span><button class="dn-glass dn-glass-button is-prominent" type="button" aria-label="新建笔记"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button></div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 一条都没有 | 列表位置放[空状态](../../../deernova-style/references/components/empty-state.md)：「还没有笔记」加「新建笔记」 |
| 筛选后没有结果 | 「没有符合条件的笔记」加「清除筛选」，和上一种分开写 |
| 加载中 | 和真实行同样高度的[骨架](../../../deernova-style/references/components/skeleton.md)，加载完位置不跳 |
| 加载失败 | 列表位置一行「没有加载出来」加「重试」，顶栏和筛选照常可用 |
| 条目被别人删除 | 详情显示「这条笔记已被删除」，列表里移除它，选中下一条 |
| 标题很长 | 一行截断，详情里看全文 |

## 不要

- 列表上方放统计卡片（「共 128 条」「本周新增 14」）；数量放在侧边栏计数里。
- 每行塞进头像、标签、三个图标按钮和两行摘要；行尾常驻「编辑」「删除」，改成悬停或右键菜单。
- 条目没几条也配全套搜索、筛选和排序。
- 从详情返回后列表跳回顶部、筛选被清空。
- 「没有结果」和「还没有内容」用同一句话。
- 用户要找一条具体的记录时，只能无限往下滚，没有搜索。
