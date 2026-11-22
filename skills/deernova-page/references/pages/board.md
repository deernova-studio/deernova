# 看板

一组事情按进度排成几列：待办、进行中、审核中、完成。用户来这里看哪一列堆住了，把一张卡片拖到下一列。它和[列表页](list.md)是同一批数据的两种看法，顶栏可以切换；点开一张卡片是[详情页](detail.md)。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 项目名、视图切换（列表、看板、日历）、筛选、新建 | 是 |
| 筛选条 | 已经生效的筛选写成一行可移除的条件：「负责人：林一 ×」「标签：设计 ×」，加「清除」 | 有筛选时 |
| 列 | 一列一个状态，三到六列，固定宽度，横向排开；列不等高 | 是 |
| 列头 | 状态名（`headline` 半粗，它是这一列的标题，不是侧边栏那种分组标题）和数量；设了上限的列写「3 / 4」；行尾「添加」 | 是 |
| 卡片 | 紧凑版的[卡片](../../../deernova-style/references/components/card.md)：标题用正文字重，圆角 `radius-md`，列的圆角是它加上列的内边距；下面一行最多三样：截止日期、一个标签、负责人头像。选中用 `fill-selected` 底 | 是 |
| 完成列的折叠 | 完成列只显示最近 7 天，更早的折成「还有 38 条更早完成的」 | 完成的多时 |
| 泳道 | 按负责人或优先级横着分组，每组一行完整的列 | 否 |

- **列是状态，不是分类。** 一张卡片从左往右走，最后走到「完成」。「前端」「后端」这种分类用筛选或泳道，不做成列。
- **卡片只放决定要不要拖它的信息。** 标题、什么时候到期、谁在做。描述、子任务、评论数进详情页；卡片上多一个图标，整板就多几十个图标。
- **列头不配颜色。** 列靠位置和名字区分。卡片也不按状态涂色：它在哪一列就是什么状态。
- **只有要人注意的才有颜色。** 过期的截止日期用 `danger` 文字，三天内到期用 `warning`，其余是灰字。「阻塞」用 `danger` 标签；普通标签用无色的 `dn-tag`。
- **卡片平放，拖的时候只画一条线。** 卡片和其他卡片一样没有阴影；拿起来时才抬高一层（`shadow-float`），原位置留一个变淡的影子，要放下的位置出现一条 2px 的墨色线。不高亮整列，不摇晃卡片。
- **超出上限的列只改数字的颜色。** 「进行中 5 / 4」的数字变成 `warning`，卡片照常能拖进去；不弹窗拦着。
- **拖到完成要能撤销。** 放下后底部出一条[轻提示](../../../deernova-style/references/components/banner.md)「已移到完成」加「撤销」。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-board { display: flex; align-items: flex-start; gap: var(--space-3); flex: 1; min-height: 0; overflow: auto hidden; padding: var(--space-4) var(--page-margin); }
.dn-board-col { display: flex; flex-direction: column; gap: var(--space-2); flex: none; width: 240px; max-height: 100%; padding: var(--space-2); border-radius: calc(var(--radius-md) + var(--space-2)); background: var(--surface-sunken); }
.dn-board-head { display: flex; align-items: center; gap: var(--space-2); min-height: var(--button-height-sm); padding-left: var(--space-2); font: var(--type-headline); }
.dn-board-count { color: var(--ink-tertiary); font-weight: var(--weight-regular); font-variant-numeric: tabular-nums; }
.dn-board-count.is-over { color: var(--warning); }
.dn-board-head > .dn-icon-button { margin-left: auto; }
.dn-board-cards { display: grid; gap: var(--space-2); min-height: 0; margin: 0; padding: 0; overflow-y: auto; list-style: none; }
.dn-board-card { display: grid; gap: var(--space-2); padding: var(--space-3); border: var(--stroke-line) solid var(--line); border-radius: var(--radius-md); background: var(--surface); cursor: grab; position: relative; }
.dn-board-card > a { color: var(--ink); font: var(--type-body); text-decoration: none; }
.dn-board-card > a::after { content: ""; position: absolute; inset: 0; }
.dn-board-meta { display: flex; align-items: center; gap: var(--space-2); min-height: var(--button-height-sm); color: var(--ink-tertiary); font: var(--type-footnote); font-variant-numeric: tabular-nums; }
.dn-board-meta > .dn-avatar { margin-left: auto; }
.dn-board-due.is-late { color: var(--danger); }
.dn-board-due.is-soon { color: var(--warning); }
.dn-board-card.is-source { opacity: 0.4; }
.dn-board-card.is-lifted { box-shadow: var(--shadow-float); cursor: grabbing; }
.dn-board-card[aria-selected="true"] { background: var(--fill-selected); }
@media (hover: hover) { .dn-board-card:hover { border-color: var(--line-control); } }
.dn-board-drop { height: 2px; margin-block: calc(-1 * var(--space-1)); border-radius: var(--radius-full); background: var(--ink); }
.dn-board-inspect { margin: 0 0 var(--space-4); font: var(--type-headline); }
.dn-board-more { padding: var(--space-1) var(--space-2); border: 0; background: none; color: var(--ink-secondary); font: var(--type-footnote); text-align: left; cursor: pointer; }
.dn-board-more:hover { color: var(--ink); }
@media (max-width: 760px) {
  .dn-board { gap: var(--space-2); padding-inline: var(--space-4); scroll-snap-type: x mandatory; }
  .dn-board-col { width: calc(100vw - var(--space-12)); scroll-snap-align: center; }
}
```

一张卡片正从进行中拖到审核中：原位置变淡，要放下的地方是一条墨线；过期的日期是红字，完成列只留最近一周：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <h2 class="dn-toolbar-title"><span>发布 2.0</span></h2>
      <div class="dn-segmented" role="group" aria-label="视图"><button type="button" aria-pressed="false">列表</button><button type="button" aria-pressed="true">看板</button><button type="button" aria-pressed="false">日历</button></div>
      <div class="dn-toolbar-actions">
        <button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-filter"/></svg>筛选</button>
        <button class="dn-button is-primary is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg>新建</button>
      </div>
    </header>
    <div class="dn-board">
      <section class="dn-board-col" aria-label="待办">
        <h3 class="dn-board-head">待办<span class="dn-board-count">6</span><button class="dn-icon-button" type="button" aria-label="在待办里添加"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button></h3>
        <ul class="dn-board-cards">
          <li class="dn-board-card"><a href="#">导入旧版笔记时保留附件</a><div class="dn-board-meta"><span class="dn-board-due">11月28日</span><span class="dn-avatar" role="img" aria-label="周舟">周</span></div></li>
          <li class="dn-board-card"><a href="#">设置页加「跟随系统」外观</a><div class="dn-board-meta"><span class="dn-tag">设计</span><span class="dn-avatar" role="img" aria-label="林一">林</span></div></li>
          <li class="dn-board-card"><a href="#">离线时的保存提示</a><div class="dn-board-meta"><span class="dn-board-due">12月2日</span></div></li>
        </ul>
      </section>
      <section class="dn-board-col" aria-label="进行中">
        <h3 class="dn-board-head">进行中<span class="dn-board-count">3 / 4</span><button class="dn-icon-button" type="button" aria-label="在进行中里添加"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button></h3>
        <ul class="dn-board-cards">
          <li class="dn-board-card"><a href="#">搜索结果按最近编辑排序</a><div class="dn-board-meta"><span class="dn-board-due is-late">昨天到期</span><span class="dn-avatar" role="img" aria-label="沈遥">沈</span></div></li>
          <li class="dn-board-card is-source" aria-grabbed="true"><a href="#">分享链接设置有效期</a><div class="dn-board-meta"><span class="dn-board-due is-soon">后天</span><span class="dn-avatar" role="img" aria-label="林一">林</span></div></li>
          <li class="dn-board-card"><a href="#">同步冲突时保留两份</a><div class="dn-board-meta"><span class="dn-tag is-danger"><span class="dn-dot"></span>阻塞</span><span class="dn-avatar" role="img" aria-label="周舟">周</span></div></li>
        </ul>
      </section>
      <section class="dn-board-col" aria-label="审核中">
        <h3 class="dn-board-head">审核中<span class="dn-board-count">2</span><button class="dn-icon-button" type="button" aria-label="在审核中里添加"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button></h3>
        <ul class="dn-board-cards">
          <li class="dn-board-card"><a href="#">新的图标集换进侧边栏</a><div class="dn-board-meta"><span class="dn-tag">设计</span><span class="dn-avatar" role="img" aria-label="沈遥">沈</span></div></li>
          <li class="dn-board-drop" aria-hidden="true"></li>
          <li class="dn-board-card"><a href="#">命令面板支持拼音</a><div class="dn-board-meta"><span class="dn-board-due">11月25日</span><span class="dn-avatar" role="img" aria-label="林一">林</span></div></li>
        </ul>
      </section>
      <section class="dn-board-col" aria-label="完成">
        <h3 class="dn-board-head">完成<span class="dn-board-count">40</span></h3>
        <ul class="dn-board-cards">
          <li class="dn-board-card"><a href="#">深色模式下的代码块配色</a><div class="dn-board-meta"><span>今天完成</span><span class="dn-avatar" role="img" aria-label="周舟">周</span></div></li>
          <li class="dn-board-card"><a href="#">登录页去掉验证码</a><div class="dn-board-meta"><span>周一完成</span><span class="dn-avatar" role="img" aria-label="沈遥">沈</span></div></li>
        </ul>
        <button class="dn-board-more" type="button">还有 38 条更早完成的</button>
      </section>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 一屏一列，顶上一行列名用[侧面板的标签](../../../deernova-style/references/components/toolbar.md)加 `is-plain`；左右滑动换列，列宽是屏宽减去两边各一点，露出下一列的边，让人知道还能滑。
- 拖卡片换成卡片上的「移到…」菜单，列出各列；长按拖动保留，拖到屏幕边缘时自动滑到下一列。
- 顶栏的视图切换收进「更多」，筛选留在顶栏。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 项目在侧边栏；视图切换用工具栏里的分段控件。
- 拖动用系统的拖放：卡片可以拖进别的项目，也可以拖到别的应用里成为一个链接。⌘ 点选多张后一起拖。
- 选中一张卡片按空格，右边打开检查器看详情和改负责人，不离开看板；双击打开整页详情。
- 键盘：方向键在卡片间移动，⌘→ 把选中的卡片移到下一列。

```swift
ScrollView(.horizontal) {
    LazyHStack(alignment: .top, spacing: Deernova.space3) {
        ForEach(columns) { column in
            BoardColumn(column: column) {
                ForEach(column.cards) { card in
                    BoardCard(card: card)
                        .draggable(card.transferID)
                }
            }
            .dropDestination(for: Card.TransferID.self) { ids, location in
                move(ids, to: column, at: location)
            }
            .frame(width: 240)
        }
    }
    .padding(Deernova.pageMargin)
}
.inspector(isPresented: $showsInspector) { CardInspector(card: selectedCard) }
.toolbar {
    Picker("视图", selection: $view) { Text("列表").tag(ViewMode.list); Text("看板").tag(ViewMode.board); Text("日历").tag(ViewMode.calendar) }
        .pickerStyle(.segmented)
    Button("新建", systemImage: "plus", action: newCard)
}
```

侧边栏是项目，选中的卡片在右边的检查器里改，不离开看板：

```html
<div class="ex-mac has-aside">
  <nav class="ex-mac-sidebar" aria-label="项目">
    <div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div>
    <p class="dn-sidebar-heading">项目</p>
    <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-board"/></svg><span class="dn-sidebar-label">发布 2.0</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-board"/></svg><span class="dn-sidebar-label">官网改版</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-board"/></svg><span class="dn-sidebar-label">招聘</span></a>
  </nav>
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><span class="ex-mac-title">发布 2.0</span><div class="dn-segmented" role="group" aria-label="视图"><button type="button" aria-pressed="false">列表</button><button type="button" aria-pressed="true">看板</button></div><button class="dn-glass dn-glass-button" type="button" aria-label="新建"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button></div>
    <div class="dn-board">
      <section class="dn-board-col" aria-label="待办">
        <h3 class="dn-board-head">待办<span class="dn-board-count">6</span></h3>
        <ul class="dn-board-cards">
          <li class="dn-board-card"><a href="#">导入旧版笔记时保留附件</a><div class="dn-board-meta"><span class="dn-board-due">11月28日</span><span class="dn-avatar" role="img" aria-label="周舟">周</span></div></li>
          <li class="dn-board-card"><a href="#">离线时的保存提示</a><div class="dn-board-meta"><span class="dn-board-due">12月2日</span></div></li>
        </ul>
      </section>
      <section class="dn-board-col" aria-label="进行中">
        <h3 class="dn-board-head">进行中<span class="dn-board-count">3 / 4</span></h3>
        <ul class="dn-board-cards">
          <li class="dn-board-card"><a href="#">搜索结果按最近编辑排序</a><div class="dn-board-meta"><span class="dn-board-due is-late">昨天到期</span><span class="dn-avatar" role="img" aria-label="沈遥">沈</span></div></li>
          <li class="dn-board-card" aria-selected="true"><a href="#">分享链接设置有效期</a><div class="dn-board-meta"><span class="dn-board-due is-soon">后天</span><span class="dn-avatar" role="img" aria-label="林一">林</span></div></li>
        </ul>
      </section>
    </div>
  </div>
  <aside class="ex-mac-inspector" aria-label="卡片">
    <h3 class="dn-board-inspect">分享链接设置有效期</h3>
    <dl class="dn-props">
      <dt>状态</dt><dd>进行中</dd>
      <dt>负责人</dt><dd>林一</dd>
      <dt>截止</dt><dd>11月21日</dd>
      <dt>标签</dt><dd>分享</dd>
    </dl>
  </aside>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 一屏一列。列名排成顶部一行，点名字或左右滑换列，当前列的名字是墨色，其余灰色。
- 长按卡片拿起，拖到屏幕左右边缘时换到旁边一列；卡片的菜单里有「移到…」，不会拖的人也能用。
- 点卡片进详情页；新建在右上角，新卡片放进当前这一列。

```swift
TabView(selection: $column) {
    ForEach(columns) { column in
        List(column.cards) { card in
            NavigationLink(value: card) { BoardCardRow(card: card) }
                .contextMenu { MoveMenu(card: card, columns: columns) }
        }
        .tag(column.id)
    }
}
.tabViewStyle(.page(indexDisplayMode: .never))
.safeAreaInset(edge: .top) { ColumnStrip(columns: columns, selection: $column) }
.navigationTitle("发布 2.0")
.toolbar { Button("新建", systemImage: "plus", action: newCard) }
```

一屏一列，顶部是列名，当前是进行中：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-icon-button" type="button" aria-label="返回"><svg class="dn-icon" aria-hidden="true"><use href="#dn-back"/></svg></button><span class="ex-ios-nav-title">发布 2.0</span><button class="dn-icon-button" type="button" aria-label="新建"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button></div>
      <div class="dn-panel-tabs is-plain" role="tablist" aria-label="列">
        <button type="button" role="tab" aria-selected="false">待办 6</button>
        <button type="button" role="tab" aria-selected="true" id="ex-board-col-tab" aria-controls="ex-board-col-tab-panel">进行中 3</button>
        <button type="button" role="tab" aria-selected="false">审核中 2</button>
        <button type="button" role="tab" aria-selected="false">完成</button>
      </div>
      <div role="tabpanel" id="ex-board-col-tab-panel" aria-labelledby="ex-board-col-tab">
      <ul class="dn-board-cards">
        <li class="dn-board-card"><a href="#">搜索结果按最近编辑排序</a><div class="dn-board-meta"><span class="dn-board-due is-late">昨天到期</span><span class="dn-avatar" role="img" aria-label="沈遥">沈</span></div></li>
        <li class="dn-board-card"><a href="#">分享链接设置有效期</a><div class="dn-board-meta"><span class="dn-board-due is-soon">后天</span><span class="dn-avatar" role="img" aria-label="林一">林</span></div></li>
        <li class="dn-board-card"><a href="#">同步冲突时保留两份</a><div class="dn-board-meta"><span class="dn-tag is-danger"><span class="dn-dot"></span>阻塞</span><span class="dn-avatar" role="img" aria-label="周舟">周</span></div></li>
      </ul>
      </div>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 还没有卡片 | 列照常排出来，第一列里一句「把要做的事加在这里」和「添加」；其余列空着，不放插画 |
| 一列是空的 | 列里只留列头，拖动经过时显示放下的线 |
| 筛选后没有结果 | 列都空着，板子上方一行「没有符合筛选的卡片」加「清除筛选」 |
| 拖动没有保存 | 卡片回到原来的列，轻提示「没能移动，网络断开了」加「重试」 |
| 别人刚移动了一张 | 卡片直接滑到新位置，不弹提示；正在拖的那张不受影响 |
| 没有权限移动 | 卡片不能拿起，鼠标是普通指针；列头不显示「添加」 |

## 不要

- 每一列配一种颜色，或者卡片按状态涂底色。
- 卡片上堆满图标：评论数、附件数、子任务进度、优先级旗子、点赞。
- 列做成分类（「前端」「后端」「设计」），卡片在列之间没有先后。
- 拖动时整列高亮、卡片倾斜摇晃，或者放下时有弹跳动画。
- 超出列的上限就弹窗拦住，不让拖进去。
- 完成列越来越长，一年的卡片全堆在里面。
