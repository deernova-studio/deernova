# 卡片页

一组以画面为主、用来浏览的条目：文档缩略图、设计稿、相册、模板。用户是在「看一眼挑一个」，不是逐条比较。条目都是一样的文字、要比较属性时，用[列表页](list.md)或[表格](../../../deernova-style/references/components/table.md)，扫读更快。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 当前范围的名字、新建，可以加列表和卡片的视图切换 | 是 |
| 筛选行 | 一个[分段控件](../../../deernova-style/references/components/segmented.md)切换范围（全部、我的、共享），右边排序 | 否 |
| 卡片网格 | 等宽的卡片，按可用宽度自动增减列数，间距 `card-gap` | 是 |
| 加载更多 | 网格末尾一个「加载更多」按钮，或者滚到底自动接上 | 条目多时 |

每张卡片从上到下：

1. **预览**：固定宽高比（文档 4 : 3，照片 1 : 1 或 3 : 2），整张卡片宽度。没有图时用内容本身的缩略（文档的前几行），不用占位插画。
2. **标题**：一行，截断。
3. **一个次要信息**：修改时间或作者，二选一。

- 整张卡片是一个链接。卡片里不放主按钮；更多操作在悬停时出现在预览右上角，或者右键菜单。
- 同一行的卡片顶部对齐。预览高度固定，所以整行自然等高；不要靠截断标题去凑。
- 选中、拖动排序这些状态用 `fill-selected` 和描边表达，不加阴影。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: var(--card-gap); align-items: start; }
.dn-tile { display: grid; gap: var(--space-2); min-width: 0; color: var(--ink); text-decoration: none; }
.dn-tile-preview { position: relative; aspect-ratio: 4 / 3; overflow: hidden; border: var(--stroke-line) solid var(--line); border-radius: var(--card-radius); background: var(--surface); transition: border-color var(--duration-instant) var(--ease-standard); }
.dn-tile-preview.is-photo { aspect-ratio: 1; }
.dn-tile-preview.is-pending { background: var(--surface-sunken); }
.dn-tile-excerpt { margin: 0; padding: var(--space-3); color: var(--ink-secondary); font: var(--weight-regular) var(--type-caption-size)/var(--type-caption-line) var(--font-serif); }
.dn-tile-excerpt strong { display: block; margin-bottom: var(--space-1); color: var(--ink); font-weight: var(--weight-semibold); }
.dn-tile-text { display: grid; gap: 2px; padding: 0 2px; }
.dn-tile-title { overflow: hidden; font: var(--weight-medium) var(--type-callout-size)/var(--type-callout-line) var(--font-sans); text-overflow: ellipsis; white-space: nowrap; }
.dn-tile-meta { color: var(--ink-tertiary); font: var(--type-caption); font-variant-numeric: tabular-nums; }
@media (hover: hover) { .dn-tile:hover .dn-tile-preview { border-color: var(--line-control); } }
.dn-tile[aria-current="true"] .dn-tile-preview { border-color: var(--ink); }
.dn-tile:focus-visible { outline: none; }
.dn-tile:focus-visible .dn-tile-preview { outline: var(--stroke-focus) solid var(--focus-ring); outline-offset: var(--focus-offset); }
.dn-gallery-bar { display: flex; flex-wrap: wrap; align-items: center; gap: var(--gap-stack); margin-bottom: var(--space-4); }
.dn-gallery-bar > :last-child:not(:first-child) { margin-left: auto; }
.dn-gallery-more { display: flex; justify-content: center; margin-top: var(--gap-group); }
```

预览占主体，下面只有标题和时间；范围用分段控件切换，排序在最右边：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <h2 class="dn-toolbar-title"><span>文档</span></h2>
      <div class="dn-toolbar-actions">
        <button class="dn-icon-button" type="button" aria-label="列表视图"><svg class="dn-icon" aria-hidden="true"><use href="#dn-list"/></svg></button>
        <button class="dn-icon-button" type="button" aria-label="新建文档"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button>
      </div>
    </header>
    <div class="dn-app-content">
      <div class="dn-gallery-bar">
        <div class="dn-segmented" role="group" aria-label="范围">
          <button type="button" aria-pressed="true">全部</button>
          <button type="button" aria-pressed="false">我的</button>
          <button type="button" aria-pressed="false">共享</button>
        </div>
        <button class="dn-button is-plain is-sm" type="button">最近修改<svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg></button>
      </div>
      <div class="dn-gallery">
        <a class="dn-tile" href="#"><div class="dn-tile-preview"><p class="dn-tile-excerpt"><strong>首页改版：第二轮反馈</strong>导航层级是这轮反馈最集中的地方：七位受访者里有五位没找到「归档」。</p></div><div class="dn-tile-text"><span class="dn-tile-title">首页改版：第二轮反馈</span><span class="dn-tile-meta">今天 14:03</span></div></a>
        <a class="dn-tile" href="#" aria-current="true"><div class="dn-tile-preview"><p class="dn-tile-excerpt"><strong>2027 年第一季度计划</strong>三件事：设置页上线、搜索支持文件夹、iPad 版进入测试。</p></div><div class="dn-tile-text"><span class="dn-tile-title">2027 年第一季度计划</span><span class="dn-tile-meta">昨天</span></div></a>
        <a class="dn-tile" href="#"><div class="dn-tile-preview"><p class="dn-tile-excerpt"><strong>支付超时复盘</strong>重试间隔从 2 秒改成指数退避，上限 30 秒。</p></div><div class="dn-tile-text"><span class="dn-tile-title">支付超时复盘</span><span class="dn-tile-meta">11月10日</span></div></a>
        <a class="dn-tile" href="#"><div class="dn-tile-preview is-pending"></div><div class="dn-tile-text"><span class="dn-tile-title">杭州周末去哪儿</span><span class="dn-tile-meta">11月2日</span></div></a>
        <a class="dn-tile" href="#"><div class="dn-tile-preview"><p class="dn-tile-excerpt"><strong>读书笔记：《设计中的设计》</strong>好的设计是把已知的东西重新变得陌生。</p></div><div class="dn-tile-text"><span class="dn-tile-title">读书笔记：《设计中的设计》</span><span class="dn-tile-meta">10月30日</span></div></a>
      </div>
      <div class="dn-gallery-more"><button class="dn-button" type="button">加载更多</button></div>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 网格按容器宽度自动减列，最窄一列不小于 160；手机上两列，预览照样保持宽高比。
- 筛选行的分段控件放不下时改成下拉选择，排序收进同一个菜单。
- 悬停才出现的操作在触屏上不可见：改成长按菜单，或者预览右上角常驻一个「更多」按钮。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 网格用 `LazyVGrid` 的自适应列，跟着窗口宽度增减列数。
- 单击选中、双击打开、空格快速预览；右键菜单代替悬停出现的「更多」。
- 选中项用 1px `ink` 描边，和 Web 一致，不用系统强调色填满。

```swift
ScrollView {
    LazyVGrid(columns: [GridItem(.adaptive(minimum: 160), spacing: Deernova.cardGap)]) {
        ForEach(documents) { DocumentTile(document: $0) }
    }
}
.contextMenu(forSelectionType: Document.ID.self) { DocumentActions(ids: $0) } primaryAction: { open($0) }
```

系统侧边栏加自适应列数的网格；右键菜单代替悬停出现的「更多」：

```html
<div class="ex-mac">
  <nav class="ex-mac-sidebar" aria-label="文件夹">
    <div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div>
    <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span class="dn-sidebar-label">全部文档</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-user"/></svg><span class="dn-sidebar-label">我的</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg><span class="dn-sidebar-label">共享</span></a>
  </nav>
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><span class="ex-mac-title">全部文档</span><button class="dn-glass dn-glass-button" type="button" aria-label="新建"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button></div>
    <div class="ex-mac-body"><div class="dn-gallery"><a class="dn-tile" href="#"><div class="dn-tile-preview"><p class="dn-tile-excerpt"><strong>首页改版：第二轮反馈</strong>导航层级是这轮反馈最集中的地方。</p></div><div class="dn-tile-text"><span class="dn-tile-title">首页改版：第二轮反馈</span><span class="dn-tile-meta">今天 14:03</span></div></a><a class="dn-tile" href="#"><div class="dn-tile-preview"><p class="dn-tile-excerpt"><strong>2027 年第一季度计划</strong>设置页上线、搜索支持文件夹。</p></div><div class="dn-tile-text"><span class="dn-tile-title">2027 年第一季度计划</span><span class="dn-tile-meta">昨天</span></div></a><a class="dn-tile" href="#"><div class="dn-tile-preview"><p class="dn-tile-excerpt"><strong>支付超时复盘</strong>重试间隔改成指数退避。</p></div><div class="dn-tile-text"><span class="dn-tile-title">支付超时复盘</span><span class="dn-tile-meta">11月10日</span></div></a></div></div>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 两列网格，预览保持宽高比；长按出上下文菜单和预览。
- 没有悬停，「更多」改成长按或预览右上角常驻的按钮。
- 范围用分段控件，放在导航栏下方。

```swift
ScrollView {
    LazyVGrid(columns: [GridItem(), GridItem()], spacing: Deernova.cardGap) {
        ForEach(documents) { document in
            NavigationLink(value: document) { DocumentTile(document: document) }
                .contextMenu { DocumentActions(document: document) } preview: { DocumentPreview(document: document) }
        }
    }
}
.navigationTitle("文档")
```

两列，预览保持宽高比；长按出菜单：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><span></span><button class="dn-icon-button" type="button" aria-label="新建"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button></div>
      <h3 class="ex-ios-large">文档</h3>
      <div class="dn-segmented" role="group" aria-label="范围"><button type="button" aria-pressed="true">全部</button><button type="button" aria-pressed="false">我的</button><button type="button" aria-pressed="false">共享</button></div>
      <div class="dn-gallery"><a class="dn-tile" href="#"><div class="dn-tile-preview"><p class="dn-tile-excerpt"><strong>首页改版：第二轮反馈</strong>导航层级是这轮反馈最集中的地方。</p></div><div class="dn-tile-text"><span class="dn-tile-title">首页改版：第二轮反馈</span><span class="dn-tile-meta">今天 14:03</span></div></a><a class="dn-tile" href="#"><div class="dn-tile-preview"><p class="dn-tile-excerpt"><strong>2027 年第一季度计划</strong>设置页上线、搜索支持文件夹。</p></div><div class="dn-tile-text"><span class="dn-tile-title">2027 年第一季度计划</span><span class="dn-tile-meta">昨天</span></div></a><a class="dn-tile" href="#"><div class="dn-tile-preview"><p class="dn-tile-excerpt"><strong>支付超时复盘</strong>重试间隔改成指数退避。</p></div><div class="dn-tile-text"><span class="dn-tile-title">支付超时复盘</span><span class="dn-tile-meta">11月10日</span></div></a><a class="dn-tile" href="#"><div class="dn-tile-preview"><p class="dn-tile-excerpt"><strong>读书笔记</strong>好的设计是把已知的东西重新变得陌生。</p></div><div class="dn-tile-text"><span class="dn-tile-title">读书笔记</span><span class="dn-tile-meta">10月30日</span></div></a></div>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 一张都没有 | [空状态](../../../deernova-style/references/components/empty-state.md)：「还没有文档」加「新建文档」，可以再给「从模板开始」 |
| 预览还在生成 | 预览位置是 `surface-sunken` 底，标题照常显示，生成好后淡入，位置不跳 |
| 预览生成失败 | 预览位置放文件类型图标，不显示报错；打开后再说明 |
| 加载中 | 和真实卡片同样大小的[骨架](../../../deernova-style/references/components/skeleton.md)块，数量和一屏能放下的一致 |
| 标题很长 | 一行截断，悬停显示全文 |

## 不要

- 每张卡片一个彩色图标底块，或者换着颜色的渐变封面。
- 卡片里放「查看详情」「编辑」「删除」按钮；整张卡片可点时，里面再套一个主按钮。
- 预览高度跟着内容变，一行卡片参差不齐；用截断标题去凑等高。
- 卡片加阴影、悬停时上浮放大。
- 内容其实是同类文字（订单、任务、联系人）也排成卡片，比较起来要来回扫。
- 第一屏就塞满几百张卡片；没有加载更多，滚动条一直在变短。
