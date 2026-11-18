# 图片库与查看器

一批图片的浏览页，以及点开一张后的全屏查看器：相册、设计稿库、AI 生成的图片、附件里的照片。这一页里图片就是内容，界面只负责排好它们、让人放大看清楚。图片之外有较多文字的条目，用[卡片页](cards.md)。

## 区块

### 图片库

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 相册或文件夹的名字、数量；右边上传和「选择」 | 是 |
| 分组 | 按日期分组（「11月14日」），组名是一行小字，左对齐 | 图片多时 |
| 网格 | 等大的正方形缩略图，间距 2–4px，按宽度自动增减列数；或者保留原比例、每行等高的排法 | 是 |
| 加载更多 | 滚到底自动接上，位置不跳 | 图片多时 |

- **图片不加说明文字。** 缩略图下面不放文件名、尺寸和日期；需要时在查看器的信息面板里看。
- **两种排法选一种。** 想多看几张、快速扫（相册、截图）用正方形裁切；构图重要（设计稿、作品集）用原比例、每行等高。同一页不要混用。
- 悬停时左上角出现选择框，右上角出现「更多」；进入选择模式后，顶栏换成「已选 3 张」和批量操作。
- 缩略图按显示尺寸加载小图（`srcset`），点开后再加载原图。

### 查看器

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 图片 | 按原比例放到最大，四周留 `space-6` | 是 |
| 顶部一行 | 左边文件名和「3 / 24」，右边信息、下载、更多、关闭 | 是 |
| 左右切换 | 两侧的箭头按钮，键盘 ← → 也能切换 | 多张时 |
| 缩略图条 | 底部一行缩略图，当前这张描边标出；不用一排圆点代替 | 多张时 |
| 信息面板 | 点「信息」从右边打开：拍摄时间、尺寸、大小、所在相册 | 否 |

- 查看器铺满窗口，背景用当前主题的 `canvas`，界面元素用细线和图标按钮，不做黑色的「影院模式」。
- 打开时图片从缩略图的位置放大过来，关闭时缩回去；减弱动态效果时直接切换。
- `Esc` 关闭，焦点回到刚才那张缩略图；触屏上左右滑动切换，双指缩放，向下拖动关闭。
- 原图加载超过一秒时，先显示放大的缩略图，原图到了再替换。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-photos { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 3px; }
.dn-photos-group { margin: var(--space-5) 0 var(--space-2); color: var(--ink-secondary); font: var(--type-footnote); }
.dn-photo { position: relative; aspect-ratio: 1; overflow: hidden; background: var(--surface-sunken); }
.dn-photo img { display: block; width: 100%; height: 100%; object-fit: cover; }
.dn-photo:focus-visible { outline: var(--stroke-focus) solid var(--focus-ring); outline-offset: var(--focus-offset); }
.dn-viewer { position: relative; display: grid; grid-template-rows: var(--toolbar-height) minmax(0, 1fr) auto; height: 100%; background: var(--canvas); }
.dn-viewer-bar { display: flex; align-items: center; gap: var(--space-3); padding: 0 var(--space-2) 0 var(--space-4); }
.dn-viewer-name { min-width: 0; overflow: hidden; color: var(--ink); font: var(--weight-medium) var(--type-callout-size)/1 var(--font-sans); text-overflow: ellipsis; white-space: nowrap; }
.dn-viewer-count { color: var(--ink-tertiary); font: var(--type-footnote); font-variant-numeric: tabular-nums; }
.dn-viewer-bar > :last-child { display: flex; gap: 2px; margin-left: auto; }
.dn-viewer-stage { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; grid-template-rows: minmax(0, 1fr); align-items: center; gap: var(--space-2); min-height: 0; overflow: hidden; padding: var(--space-6) var(--space-2); }
.dn-viewer-stage img { width: 100%; height: 100%; min-width: 0; min-height: 0; object-fit: contain; }
.dn-viewer-strip { display: flex; justify-content: center; gap: var(--space-1); padding: var(--space-2) var(--space-4) var(--space-4); }
.dn-viewer-strip img { width: 44px; height: 44px; border-radius: var(--radius-xs); object-fit: cover; opacity: 0.6; }
.dn-viewer-strip img[aria-current="true"] { outline: var(--stroke-focus) solid var(--ink); outline-offset: 1px; opacity: 1; }
@media (max-width: 760px) {
  .dn-photos { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2px; }
  .dn-viewer-stage { grid-template-columns: minmax(0, 1fr); padding-inline: 0; }
  .dn-viewer-stage > .dn-icon-button, .dn-viewer-strip { display: none; }
}
```

图片库：按日期分组的正方形网格，缩略图下面不放任何文字：

```html
<div class="dn-app ex-page">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <h2 class="dn-toolbar-title"><span>设计稿</span></h2>
      <div class="dn-toolbar-actions">
        <button class="dn-icon-button" type="button" aria-label="上传"><svg class="dn-icon" aria-hidden="true"><use href="#dn-upload"/></svg></button>
        <button class="dn-button is-plain is-sm" type="button">选择</button>
      </div>
    </header>
    <div class="dn-app-content">
      <p class="dn-photos-group">11月14日</p>
      <div class="dn-photos">
        <a class="dn-photo" href="#"><img src="assets/screens/mac-window-light.png" alt="Mac 窗口"></a>
        <a class="dn-photo" href="#"><img src="assets/screens/iphone-screens-light.png" alt="iPhone 列表页和对话页"></a>
        <a class="dn-photo" href="#"><img src="assets/screens/iphone-button-sizes-light.png" alt="iOS 按钮尺寸"></a>
        <a class="dn-photo" href="#"><img src="assets/examples/halftone-light.png" alt="网点插画"></a>
      </div>
      <p class="dn-photos-group">11月9日</p>
      <div class="dn-photos">
        <a class="dn-photo" href="#"><img src="assets/screens/mac-window-dark.png" alt="Mac 窗口，深色"></a>
        <a class="dn-photo" href="#"><img src="assets/screens/iphone-screens-dark.png" alt="iPhone 列表页和对话页，深色"></a>
        <a class="dn-photo" href="#"><img src="assets/examples/halftone-dark.png" alt="网点插画，深色"></a>
      </div>
    </div>
  </div>
</div>
```

查看器：铺满窗口，图片按原比例放到最大；顶部一行写文件名和位置，底部缩略图条标出当前这张：

```html
<div class="dn-viewer ex-page is-tall" role="dialog" aria-label="图片查看器">
  <div class="dn-viewer-bar">
    <span class="dn-viewer-name">Mac 窗口</span><span class="dn-viewer-count">1 / 4</span>
    <div>
      <button class="dn-icon-button" type="button" aria-label="信息"><svg class="dn-icon" aria-hidden="true"><use href="#dn-info"/></svg></button>
      <button class="dn-icon-button" type="button" aria-label="下载"><svg class="dn-icon" aria-hidden="true"><use href="#dn-download"/></svg></button>
      <button class="dn-icon-button" type="button" aria-label="关闭"><svg class="dn-icon" aria-hidden="true"><use href="#dn-close"/></svg></button>
    </div>
  </div>
  <div class="dn-viewer-stage">
    <button class="dn-icon-button" type="button" aria-label="上一张" disabled><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg></button>
    <img src="assets/screens/mac-window-light.png" alt="Mac 窗口：玻璃侧边栏、工具栏和输入框">
    <button class="dn-icon-button" type="button" aria-label="下一张"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-right"/></svg></button>
  </div>
  <div class="dn-viewer-strip">
    <img src="assets/screens/mac-window-light.png" alt="" aria-current="true">
    <img src="assets/screens/iphone-screens-light.png" alt="">
    <img src="assets/screens/iphone-button-sizes-light.png" alt="">
    <img src="assets/examples/halftone-light.png" alt="">
  </div>
</div>
```

### 窄屏和手机浏览器

- 网格变成三列，间距 2px；分组名吸顶。
- 查看器里隐藏左右箭头和缩略图条，靠滑动切换；顶部一行只留关闭和更多，轻点图片隐藏或显示它。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- ⌘+ 和 ⌘− 改变缩略图大小；方向键在网格里移动，空格快速预览。
- 查看器在窗口里全屏显示，← → 切换，Esc 返回网格；可以 ⌃⌘F 进入系统全屏。
- 从访达拖进来就上传，拖出去就导出。

```swift
ScrollView {
    LazyVGrid(columns: [GridItem(.adaptive(minimum: thumbnailSize), spacing: 3)]) {
        ForEach(photos) { PhotoThumbnail(photo: $0) }
    }
}
.onKeyPress(.space) { quickLook(selection); return .handled }   // 空格快速预览
```

侧边栏是相册，网格里只有图片；⌘+ 和 ⌘− 改变缩略图大小：

```html
<div class="ex-mac">
  <nav class="ex-mac-sidebar" aria-label="相册">
    <div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div>
    <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-image"/></svg><span class="dn-sidebar-label">设计稿</span><span class="dn-sidebar-count">24</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-image"/></svg><span class="dn-sidebar-label">截图</span><span class="dn-sidebar-count">112</span></a>
  </nav>
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><span class="ex-mac-title">设计稿</span><button class="dn-glass dn-glass-button" type="button" aria-label="上传"><svg class="dn-icon" aria-hidden="true"><use href="#dn-upload"/></svg></button></div>
    <div class="ex-mac-body"><p class="dn-photos-group">11月14日</p><div class="dn-photos"><a class="dn-photo" href="#"><img src="assets/screens/mac-window-light.png" alt=""></a><a class="dn-photo" href="#"><img src="assets/screens/iphone-screens-light.png" alt=""></a><a class="dn-photo" href="#"><img src="assets/screens/iphone-button-sizes-light.png" alt=""></a><a class="dn-photo" href="#"><img src="assets/examples/halftone-light.png" alt=""></a><a class="dn-photo" href="#"><img src="assets/screens/mac-window-dark.png" alt=""></a><a class="dn-photo" href="#"><img src="assets/screens/iphone-screens-dark.png" alt=""></a></div></div>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 三列网格，间距 2pt；双指捏合改变列数。
- 查看器全屏，左右滑动切换，双指缩放，下拉关闭；轻点图片隐藏或显示界面。
- 选择模式下滑动手指可以连续选中多张。

```swift
ScrollView {
    LazyVGrid(columns: Array(repeating: GridItem(spacing: 2), count: columns), spacing: 2) {
        ForEach(photos) { PhotoThumbnail(photo: $0) }
    }
}
.gesture(MagnifyGesture().onEnded { columns = $0.magnification > 1 ? 2 : 4 })   // 捏合改变列数
```

三列、间距 2pt，图片铺到屏幕两边：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><span></span><button class="dn-button is-plain is-sm" type="button">选择</button></div>
      <h3 class="ex-ios-large">设计稿</h3>
      <p class="dn-photos-group">11月14日</p>
      <div class="dn-photos"><a class="dn-photo" href="#"><img src="assets/screens/mac-window-light.png" alt=""></a><a class="dn-photo" href="#"><img src="assets/screens/iphone-screens-light.png" alt=""></a><a class="dn-photo" href="#"><img src="assets/screens/iphone-button-sizes-light.png" alt=""></a><a class="dn-photo" href="#"><img src="assets/examples/halftone-light.png" alt=""></a><a class="dn-photo" href="#"><img src="assets/screens/mac-window-dark.png" alt=""></a><a class="dn-photo" href="#"><img src="assets/screens/iphone-screens-dark.png" alt=""></a></div>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 相册是空的 | [空状态](../../../deernova-style/references/components/empty-state.md)：「还没有图片」，给「上传」，并说明可以直接拖进来 |
| 上传中 | 新图片先以占位出现在网格最前面，底部一条进度；失败的那张标出来，给「重试」 |
| 缩略图加载中 | `surface-sunken` 底色的方块，不放转圈 |
| 图片加载失败 | 方块里一个图片图标，查看器里写「这张图片没有加载出来」加「重试」 |
| AI 正在生成 | 方块用[骨架](../../../deernova-style/references/components/skeleton.md)的闪动，左下角写进度；生成完淡入 |

## 不要

- 每张缩略图下面写文件名、日期和尺寸；给缩略图加圆角卡片、阴影和悬停放大。
- 正方形裁切和原比例混在同一页。
- 查看器只给一排圆点表示还有几张；关闭后回到页面顶部，找不到刚才那张。
- 查看器强制黑底，和应用的浅色主题对不上；图片上叠一排半透明的大按钮。
- 不能用键盘切换和关闭；触屏上不能滑动和缩放。
- 一打开就加载所有原图，网格滚动卡顿。
