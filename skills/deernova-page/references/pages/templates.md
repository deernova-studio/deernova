# 模板库

新建一页时从现成的结构开始：会议记录、需求文档、周报、复盘。从侧边栏的「模板」或新建菜单的「从模板开始」打开。团队自己存的模板排在最前面；点一个先预览整页，再决定用不用。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 分类 | 左边一列：团队模板、我的模板、会议、项目、个人、写作；加搜索 | 是 |
| 模板网格 | [卡片](cards.md)：缩略图是模板本身缩小后的样子，下面是名字和一句「用在什么时候」 | 是 |
| 空白页 | 网格的第一张，什么都没有的一页 | 是 |
| 预览 | 点一张卡片打开整页预览，只读；顶栏「使用这个模板」 | 是 |
| 存为模板 | 任何一页的「更多 › 存为模板」，存进「我的模板」或「团队模板」 | 是 |

- **缩略图是模板自己。** 用模板真实的标题和前几个块缩小排出来，不画插画、不用照片、不配图标。
- **团队的排在前面。** 团队存的模板最贴近他们的工作方式；内置模板在后面。
- **占位文字写要填什么。** 「（这次会议要决定的一件事）」这样的灰字，开始输入就消失；不写「在这里输入内容」。
- **用了就脱钩。** 用模板建出的是一页普通页面，以后模板改了不影响它；模板的作者改模板不用担心改坏别人的页面。
- **模板里能带数据库视图和子页面。** 预览里列出会一起创建的东西：「会创建 1 个数据库和 2 个子页面」。
- **没有商店和评分。** 不放下载量、星级、付费模板和「热门」角标。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-templates { display: grid; grid-template-columns: 200px minmax(0, 1fr); flex: 1; min-height: 0; }
.dn-templates-main { min-width: 0; overflow-y: auto; padding: var(--space-6) var(--page-margin) var(--space-10); }
.dn-templates-main h3 { margin: 0 0 var(--space-3); color: var(--ink-tertiary); font: var(--weight-medium) var(--type-footnote-size)/var(--type-footnote-line) var(--font-sans); }
.dn-templates-main .dn-gallery { grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); margin-bottom: var(--space-8); }
.dn-mini-doc { display: grid; align-content: start; gap: 5px; height: 100%; padding: var(--space-3) var(--space-4); color: var(--ink-tertiary); font: var(--weight-regular) 9px/1.4 var(--font-sans); }
.dn-mini-doc > strong { margin-bottom: 2px; color: var(--ink); font: var(--weight-semibold) var(--type-caption-size)/1.3 var(--font-serif); }
.dn-mini-doc > b { margin-top: 3px; color: var(--ink-secondary); font-weight: var(--weight-semibold); }
.dn-mini-doc > i { display: block; height: 5px; border-radius: var(--radius-full); background: var(--fill-selected); font-style: normal; }
.dn-mini-doc > i.is-short { width: 60%; }
.dn-tile-preview.is-blank { display: grid; place-items: center; color: var(--ink-tertiary); }
.dn-tile-preview.is-blank > .dn-icon { width: var(--icon-size-md); height: var(--icon-size-md); }
.dn-doc .dn-placeholder { color: var(--ink-tertiary); }
.dn-template-note { margin: 0 0 var(--space-6); padding: var(--space-2) var(--space-3); border-radius: var(--radius-md); background: var(--surface-sunken); color: var(--ink-secondary); font: var(--type-footnote); }
@media (max-width: 760px) {
  .dn-templates { grid-template-columns: minmax(0, 1fr); }
  .dn-templates > .dn-settings-nav { display: none; }
}
```

团队模板排在最前，缩略图就是模板本身缩小后的样子；第一张是空白页：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar"><button class="dn-icon-button" type="button" aria-label="关闭"><svg class="dn-icon" aria-hidden="true"><use href="#dn-close"/></svg></button><h2 class="dn-toolbar-title"><span>从模板开始</span></h2></header>
    <div class="dn-templates">
      <nav class="dn-settings-nav" aria-label="模板分类">
        <label class="dn-input-group"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><input type="search" placeholder="搜索模板" aria-label="搜索模板"></label>
        <a class="dn-sidebar-item" href="#" aria-current="page"><span class="dn-sidebar-label">全部</span></a>
        <a class="dn-sidebar-item" href="#"><span class="dn-sidebar-label">团队模板</span><span class="dn-sidebar-count">4</span></a>
        <a class="dn-sidebar-item" href="#"><span class="dn-sidebar-label">我的模板</span><span class="dn-sidebar-count">2</span></a>
        <a class="dn-sidebar-item" href="#"><span class="dn-sidebar-label">会议</span></a>
        <a class="dn-sidebar-item" href="#"><span class="dn-sidebar-label">项目</span></a>
        <a class="dn-sidebar-item" href="#"><span class="dn-sidebar-label">写作</span></a>
      </nav>
      <div class="dn-templates-main">
        <h3>鹿野工作室</h3>
        <div class="dn-gallery">
          <a class="dn-tile" href="#"><div class="dn-tile-preview is-blank"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></div><div class="dn-tile-text"><span class="dn-tile-title">空白页</span><span class="dn-tile-meta">从零开始</span></div></a>
          <a class="dn-tile" href="#" aria-current="true"><div class="dn-tile-preview"><div class="dn-mini-doc"><strong>需求文档</strong>背景<i></i><i class="is-short"></i><b>范围</b><i></i><i class="is-short"></i><b>不做什么</b><i class="is-short"></i></div></div><div class="dn-tile-text"><span class="dn-tile-title">需求文档</span><span class="dn-tile-meta">评审前写清做什么、不做什么</span></div></a>
          <a class="dn-tile" href="#"><div class="dn-tile-preview"><div class="dn-mini-doc"><strong>周会记录</strong><b>上周说要做的</b><i></i><i class="is-short"></i><b>这周的决定</b><i></i><b>待办</b><i class="is-short"></i></div></div><div class="dn-tile-text"><span class="dn-tile-title">周会记录</span><span class="dn-tile-meta">每周一，30 分钟</span></div></a>
          <a class="dn-tile" href="#"><div class="dn-tile-preview"><div class="dn-mini-doc"><strong>发布复盘</strong><b>发生了什么</b><i></i><i></i><b>为什么</b><i class="is-short"></i><b>下次怎么避免</b><i class="is-short"></i></div></div><div class="dn-tile-text"><span class="dn-tile-title">发布复盘</span><span class="dn-tile-meta">出问题后一周内写</span></div></a>
        </div>
        <h3>内置</h3>
        <div class="dn-gallery">
          <a class="dn-tile" href="#"><div class="dn-tile-preview"><div class="dn-mini-doc"><strong>读书笔记</strong><b>一句话</b><i class="is-short"></i><b>摘抄</b><i></i><i></i></div></div><div class="dn-tile-text"><span class="dn-tile-title">读书笔记</span><span class="dn-tile-meta">读完一本书</span></div></a>
          <a class="dn-tile" href="#"><div class="dn-tile-preview"><div class="dn-mini-doc"><strong>项目计划</strong><b>目标</b><i class="is-short"></i><b>里程碑</b><i></i><i></i></div></div><div class="dn-tile-text"><span class="dn-tile-title">项目计划</span><span class="dn-tile-meta">带一个任务数据库</span></div></a>
        </div>
      </div>
    </div>
  </div>
</div>
```

预览「需求文档」：只读，占位的灰字写要填什么；顶上说明会一起创建什么：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg>模板</button>
      <div class="dn-toolbar-actions"><button class="dn-button is-primary is-sm" type="button">使用这个模板</button></div>
    </header>
    <div class="dn-editor">
      <div class="dn-editor-scroll">
        <article class="dn-doc">
          <p class="dn-template-note">沈遥存的团队模板，11月2日更新。会创建这一页和 1 个「待决问题」数据库。</p>
          <h1>需求文档</h1>
          <h2>背景</h2>
          <p class="dn-placeholder">（谁遇到了什么问题，有多少人，现在怎么绕过去的）</p>
          <h2>范围</h2>
          <p class="dn-placeholder">（这一版要做完的事，每条一句，能验收）</p>
          <h2>不做什么</h2>
          <p class="dn-placeholder">（容易被顺手加进来、但这一版不做的事）</p>
        </article>
      </div>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 分类变成网格上方一行能横滑的短标签；网格两列。
- 预览整屏打开，「使用这个模板」吸在底部。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- ⌘N 新建空白页；⇧⌘N 打开模板选择器，是附着在窗口上的 sheet，左边分类、右边网格。
- 选中一张卡片按空格，用快速查看的方式放大预览；回车用这个模板。
- 「存为模板」在菜单栏「文件」里。

```swift
.sheet(isPresented: $choosingTemplate) {
    NavigationSplitView {
        List(TemplateCategory.allCases, selection: $category) { Text($0.title) }
    } detail: {
        ScrollView {
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 180), spacing: Deernova.cardGap)]) {
                ForEach(templates(in: category)) { template in
                    TemplateTile(template: template)
                        .onTapGesture(count: 2) { use(template) }
                }
            }
            .padding(Deernova.pageMargin)
        }
    }
    .frame(width: 760, height: 520)
}
```

模板选择器是附着在窗口上的 sheet：

```html
<div class="ex-mac">
  <nav class="ex-mac-sidebar" aria-label="模板分类">
    <div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div>
    <a class="dn-sidebar-item" href="#" aria-current="page"><span class="dn-sidebar-label">团队模板</span><span class="dn-sidebar-count">4</span></a>
    <a class="dn-sidebar-item" href="#"><span class="dn-sidebar-label">我的模板</span><span class="dn-sidebar-count">2</span></a>
    <a class="dn-sidebar-item" href="#"><span class="dn-sidebar-label">会议</span></a>
    <a class="dn-sidebar-item" href="#"><span class="dn-sidebar-label">项目</span></a>
  </nav>
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><span class="ex-mac-title">从模板开始</span><button class="dn-button is-primary is-sm" type="button">使用</button></div>
    <div class="ex-mac-body">
      <div class="dn-gallery">
        <a class="dn-tile" href="#" aria-current="true"><div class="dn-tile-preview"><div class="dn-mini-doc"><strong>需求文档</strong>背景<i></i><i class="is-short"></i><b>范围</b><i></i></div></div><div class="dn-tile-text"><span class="dn-tile-title">需求文档</span></div></a>
        <a class="dn-tile" href="#"><div class="dn-tile-preview"><div class="dn-mini-doc"><strong>周会记录</strong><b>上周说要做的</b><i></i><b>这周的决定</b><i></i></div></div><div class="dn-tile-text"><span class="dn-tile-title">周会记录</span></div></a>
        <a class="dn-tile" href="#"><div class="dn-tile-preview"><div class="dn-mini-doc"><strong>发布复盘</strong><b>发生了什么</b><i></i><b>为什么</b><i class="is-short"></i></div></div><div class="dn-tile-text"><span class="dn-tile-title">发布复盘</span></div></a>
      </div>
    </div>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 新建按钮长按出现「从模板开始」，打开一张 sheet：顶上横滑的分类，下面两列网格。
- 点一张卡片推进到预览，底部「使用这个模板」。
- 「存为模板」在一页的「更多」菜单里。

```swift
NavigationStack {
    ScrollView {
        CategoryStrip(selection: $category)
        LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: Deernova.cardGap) {
            ForEach(templates(in: category)) { template in
                NavigationLink(value: template) { TemplateTile(template: template) }
            }
        }
        .padding(.horizontal)
    }
    .navigationTitle("从模板开始")
    .navigationDestination(for: Template.self) { TemplatePreview(template: $0) }
}
```

两列网格，顶上是分类：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-button is-plain is-sm" type="button">取消</button></div>
      <h3 class="ex-ios-large">从模板开始</h3>
      <div class="dn-segmented" role="group" aria-label="分类"><button type="button" aria-pressed="true">团队</button><button type="button" aria-pressed="false">我的</button><button type="button" aria-pressed="false">内置</button></div>
      <div class="dn-gallery ex-gallery-2">
        <a class="dn-tile" href="#"><div class="dn-tile-preview is-blank"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></div><div class="dn-tile-text"><span class="dn-tile-title">空白页</span></div></a>
        <a class="dn-tile" href="#"><div class="dn-tile-preview"><div class="dn-mini-doc"><strong>需求文档</strong>背景<i></i><b>范围</b><i class="is-short"></i></div></div><div class="dn-tile-text"><span class="dn-tile-title">需求文档</span></div></a>
        <a class="dn-tile" href="#"><div class="dn-tile-preview"><div class="dn-mini-doc"><strong>周会记录</strong><b>这周的决定</b><i></i><i class="is-short"></i></div></div><div class="dn-tile-text"><span class="dn-tile-title">周会记录</span></div></a>
        <a class="dn-tile" href="#"><div class="dn-tile-preview"><div class="dn-mini-doc"><strong>发布复盘</strong><b>为什么</b><i></i><i class="is-short"></i></div></div><div class="dn-tile-text"><span class="dn-tile-title">发布复盘</span></div></a>
      </div>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 团队还没有模板 | 「团队模板」分类里一句「把常用的页面存成模板，团队里的人新建时就能用」，加「怎么存」的链接 |
| 搜索没有结果 | 「没有叫“OKR”的模板」，下面是空白页和最常用的三个 |
| 模板里的数据库很大 | 预览写「会创建 1 个数据库（只带结构，不带 120 条记录）」 |
| 模板被作者删了 | 已经用它建的页面不受影响；模板库里不再显示 |
| 没有权限存团队模板 | 「存为模板」里只有「我的模板」 |

## 不要

- 缩略图用插画、照片或渐变色块，看不出模板里有什么。
- 模板库做成商店：下载量、评分、「热门」「新」角标、付费模板。
- 占位文字写「在这里输入内容」「Lorem ipsum」。
- 模板一改，所有用它建过的页面跟着变。
- 新建页面强制先选模板，想要空白页还得找。
