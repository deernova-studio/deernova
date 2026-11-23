# 数据库

文档里的一张表：一行是一条记录，也是一页；每一列是一个属性（状态、负责人、截止日期）。同一份数据可以有好几个视图：表格、看板、日历、画廊，每个视图有自己的筛选、排序和分组。单独的[看板](board.md)和[日历](calendar.md)页讲各自的视图怎么画，这一页讲它们怎么挂在同一份数据上。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 标题 | 数据库的名字和一句说明；它在页面树里的位置写在顶栏 | 是 |
| 视图标签 | 标题下面一行：每个视图一个标签（图标和名字），最后一个「+」新建视图；用[侧面板的标签](../../../deernova-style/references/components/toolbar.md)加 `is-plain` | 是 |
| 工具 | 视图标签的同一行右边：筛选、排序、搜索、新建 | 是 |
| 筛选条 | 生效的筛选写成能读的短句：「状态 是 进行中」「负责人 是 我」，每条能点开改、能移除 | 有筛选时 |
| 表格 | 第一列是标题，其余是属性；表头只写属性名，类型在列菜单里 | 表格视图 |
| 新建行 | 表格最后一行「新建」，点了直接在表里输入标题 | 是 |
| 侧窗 | 点一行的标题从右边滑出：属性在上，下面是这一行自己的正文；可以展开成整页 | 是 |
| 汇总 | 表格底部一行，按列选：计数、求和、平均、已填比例 | 否 |

- **视图只改看法，不改数据。** 视图决定显示哪些属性、怎么筛选、怎么排序、按什么分组。删掉一个视图，数据都在。
- **改共享视图要说出来。** 用户调筛选和排序时只对自己生效，视图标签旁出现「保存给所有人」和「还原」；点了保存才改所有人看到的视图。
- **点一行是看它，不是跳走。** 侧窗占右边三分之一，表格还在左边；方向键上下切换行，侧窗跟着换。需要大块写字时再展开成整页。
- **选项不配颜色。** 选择属性的选项都是无色的[标签](../../../deernova-style/references/components/tag.md)。可以给个别选项指定意思：「阻塞」是危险，「等反馈」是注意，这时才用状态色。
- **属性类型给对的输入方式。** 日期弹日期选择，人员弹成员搜索，选择弹选项列表，数字右对齐用等宽数字；不让所有属性都退化成文本框。
- **空单元格就是空的。** 不写「空」「无」「—」，悬停时出现灰字的「添加」。
- **单元格先选中再编辑。** 单击选中（1px 墨色框），回车或双击进入编辑；方向键在单元格之间走，和电子表格一样。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-db { display: grid; align-content: start; gap: var(--space-3); width: 100%; min-width: 0; }
.dn-db-title { margin: 0; font: var(--type-display); letter-spacing: var(--type-display-tracking); }
.dn-db-lede { margin: calc(-1 * var(--space-2)) 0 var(--space-2); color: var(--ink-secondary); font: var(--type-callout); }
.dn-db-unsaved { color: var(--ink-tertiary); font: var(--type-footnote); white-space: nowrap; }
.dn-filters { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-2); }
.dn-filter { display: inline-flex; align-items: center; gap: var(--space-1); height: var(--button-height-sm); padding: 0 var(--space-1) 0 var(--space-3); border: var(--stroke-line) solid var(--line); border-radius: var(--radius-full); background: var(--surface); color: var(--ink-secondary); font: var(--type-footnote); }
.dn-filter > b { color: var(--ink); font-weight: var(--weight-medium); }
.dn-filter > .dn-icon-button { width: calc(var(--button-height-sm) - var(--space-2)); height: calc(var(--button-height-sm) - var(--space-2)); }
.dn-db .dn-table-cell { gap: var(--space-2); }
.dn-db td.is-empty { color: transparent; }
.dn-db tr:hover td.is-empty, .dn-db td.is-empty:focus-within { color: var(--ink-tertiary); }
.dn-db td.is-active { box-shadow: inset 0 0 0 var(--stroke-line) var(--ink); }
.dn-db-add > td { color: var(--ink-tertiary); }
.dn-db-add button { display: inline-flex; align-items: center; gap: var(--space-1); padding: 0; border: 0; background: none; color: inherit; font: var(--type-callout); cursor: pointer; }
.dn-db-sum > td { color: var(--ink-tertiary); font: var(--type-footnote); font-variant-numeric: tabular-nums; }
.dn-db-split { display: grid; grid-template-columns: minmax(0, 1fr) minmax(320px, 36%); flex: 1; min-height: 0; }
.dn-db-split > .dn-app-content { min-width: 0; }
.dn-peek { display: flex; flex-direction: column; gap: var(--space-4); min-height: 0; overflow-y: auto; padding: var(--space-3) var(--space-6) var(--space-8); border-left: var(--stroke-line) solid var(--line); background: var(--surface); }
.dn-peek-bar { display: flex; gap: var(--space-1); margin-inline: calc(-1 * var(--space-3)); }
.dn-peek-bar > :last-child { margin-left: auto; }
.dn-peek h2 { margin: 0; font: var(--type-title); }
.dn-peek .dn-props { padding-bottom: var(--space-4); border-bottom: var(--stroke-line) solid var(--line); }
.dn-peek p { margin: 0; font: var(--type-body); }
@media (max-width: 960px) {
  .dn-db-split { grid-template-columns: minmax(0, 1fr); }
  .dn-peek { position: fixed; inset: 0; z-index: var(--z-overlay); border-left: 0; box-shadow: var(--shadow-float); }
}
```

需求池的「表格」视图：筛选写成短句，改过的筛选只对自己生效，旁边写着还没保存；空的单元格就是空的；「阻塞」这个选项被指定为危险：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <span class="dn-toolbar-title"><span class="dn-ws-path">产品 /</span>需求池</span>
      <div class="dn-toolbar-actions"><button class="dn-icon-button" type="button" aria-label="分享"><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></button><button class="dn-icon-button" type="button" aria-label="更多"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></div>
    </header>
    <div class="dn-app-content">
      <div class="dn-db">
        <h2 class="dn-db-title">需求池</h2>
        <p class="dn-db-lede">所有提过的需求，排期在评审会上定。</p>
        <div class="dn-panel-tabs is-plain" role="tablist" aria-label="视图">
            <button type="button" role="tab" aria-selected="true" id="ex-db-view-tab" aria-controls="ex-db-view-tab-panel"><svg class="dn-icon" aria-hidden="true"><use href="#dn-table"/></svg>全部</button>
            <button type="button" role="tab" aria-selected="false"><svg class="dn-icon" aria-hidden="true"><use href="#dn-board"/></svg>按状态</button>
            <button type="button" role="tab" aria-selected="false"><svg class="dn-icon" aria-hidden="true"><use href="#dn-calendar"/></svg>排期</button>
            <button class="dn-icon-button" type="button" aria-label="新建视图"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button>
          <div class="dn-panel-actions">
            <span class="dn-db-unsaved">只对你生效</span><button class="dn-button is-plain" type="button">保存给所有人</button>
            <button class="dn-icon-button" type="button" aria-label="排序"><svg class="dn-icon" aria-hidden="true"><use href="#dn-arrow-down"/></svg></button>
            <button class="dn-icon-button" type="button" aria-label="搜索"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg></button>
            <button class="dn-button is-primary" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg>新建</button>
          </div>
        </div>
        <div class="dn-filters">
          <span class="dn-filter">状态 不是 <b>已上线</b><button class="dn-icon-button" type="button" aria-label="移除这条筛选"><svg class="dn-icon" aria-hidden="true"><use href="#dn-close"/></svg></button></span>
          <span class="dn-filter">版本 是 <b>2.0</b><button class="dn-icon-button" type="button" aria-label="移除这条筛选"><svg class="dn-icon" aria-hidden="true"><use href="#dn-close"/></svg></button></span>
          <button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg>筛选</button>
        </div>
        <div role="tabpanel" id="ex-db-view-tab-panel" aria-labelledby="ex-db-view-tab" class="dn-table-wrap">
          <table class="dn-table">
            <thead><tr><th scope="col">名称</th><th scope="col">状态</th><th scope="col">负责人</th><th class="is-number" scope="col">截止</th><th class="is-number" scope="col">估时（天）</th></tr></thead>
            <tbody>
              <tr><td class="is-primary"><a href="#">导入时保留附件</a></td><td><span class="dn-tag">进行中</span></td><td><span class="dn-table-cell"><span class="dn-avatar is-sm" aria-hidden="true">周</span>周舟</span></td><td class="is-number">11月28日</td><td class="is-number">5</td></tr>
              <tr><td class="is-primary"><a href="#">分享链接设置有效期</a></td><td><span class="dn-tag">进行中</span></td><td><span class="dn-table-cell"><span class="dn-avatar is-sm" aria-hidden="true">林</span>林一</span></td><td class="is-number is-active">11月21日</td><td class="is-number">3</td></tr>
              <tr><td class="is-primary"><a href="#">同步冲突时保留两份</a></td><td><span class="dn-tag is-danger"><span class="dn-dot"></span>阻塞</span></td><td><span class="dn-table-cell"><span class="dn-avatar is-sm" aria-hidden="true">周</span>周舟</span></td><td class="is-number">12月2日</td><td class="is-number">8</td></tr>
              <tr><td class="is-primary"><a href="#">命令面板支持拼音</a></td><td><span class="dn-tag">待评审</span></td><td class="is-empty">添加</td><td class="is-empty">添加</td><td class="is-number">2</td></tr>
              <tr class="dn-db-add"><td colspan="5"><button type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg>新建</button></td></tr>
              <tr class="dn-db-sum"><td>4 条</td><td></td><td></td><td></td><td class="is-number">合计 18</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
```

点一行的标题，右边滑出侧窗：属性在上，下面是这一行自己的正文；左边的表还在：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar"><span class="dn-toolbar-title"><span class="dn-ws-path">产品 /</span>需求池</span></header>
    <div class="dn-db-split">
      <div class="dn-app-content">
        <div class="dn-db">
          <div class="dn-table-wrap">
            <table class="dn-table">
              <thead><tr><th scope="col">名称</th><th scope="col">状态</th></tr></thead>
              <tbody>
                <tr><td class="is-primary"><a href="#">导入时保留附件</a></td><td><span class="dn-tag">进行中</span></td></tr>
                <tr aria-selected="true"><td class="is-primary"><a href="#">分享链接设置有效期</a></td><td><span class="dn-tag">进行中</span></td></tr>
                <tr><td class="is-primary"><a href="#">同步冲突时保留两份</a></td><td><span class="dn-tag is-danger"><span class="dn-dot"></span>阻塞</span></td></tr>
                <tr><td class="is-primary"><a href="#">命令面板支持拼音</a></td><td><span class="dn-tag">待评审</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <aside class="dn-peek" aria-label="分享链接设置有效期">
        <div class="dn-peek-bar">
          <button class="dn-icon-button" type="button" aria-label="展开成整页"><svg class="dn-icon" aria-hidden="true"><use href="#dn-expand"/></svg></button>
          <button class="dn-icon-button" type="button" aria-label="更多"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button>
          <button class="dn-icon-button" type="button" aria-label="关闭"><svg class="dn-icon" aria-hidden="true"><use href="#dn-close"/></svg></button>
        </div>
        <h2>分享链接设置有效期</h2>
        <dl class="dn-props">
          <dt>状态</dt><dd><span class="dn-tag">进行中</span></dd>
          <dt>负责人</dt><dd>林一</dd>
          <dt>截止</dt><dd>11月21日</dd>
          <dt>估时</dt><dd>3 天</dd>
          <dt>版本</dt><dd>2.0</dd>
        </dl>
        <p>分享时可以选 7 天、30 天或永久。过期后打开链接的人看到「链接已过期」，可以向作者申请。</p>
      </aside>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 表格视图换成列表：一行一条，标题下面一行写两三个最要紧的属性；其余属性进这一条的页面里看。
- 视图标签收成标题旁边的一个菜单「全部 ▾」。
- 侧窗变成整屏，顶栏左边是返回。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 表格视图用 `Table`：列可以拖宽、拖动换顺序、点表头排序；多选行后一起改某个属性。
- 视图切换在工具栏，筛选和排序在工具栏的菜单里；侧窗用 `.inspector`，⌥⌘I 开关。
- 单元格就地编辑：选中一行按回车编辑标题，Tab 走到下一列。

```swift
Table(rows, selection: $selection, sortOrder: $sortOrder, columnCustomization: $columns) {
    TableColumn("名称", value: \.title)
    TableColumn("状态") { OptionTag(option: $0.status) }
    TableColumn("负责人") { PersonCell(person: $0.owner) }
    TableColumn("截止", value: \.due) { Text($0.due, format: .dateTime.month().day()) }
    TableColumn("估时（天）", value: \.estimate) { Text($0.estimate, format: .number) }
}
.inspector(isPresented: $showsPeek) { RowInspector(row: selectedRow) }
.toolbar {
    Picker("视图", selection: $view) { ForEach(views) { Label($0.name, systemImage: $0.symbol).tag($0.id) } }
    Menu("筛选", systemImage: "line.3.horizontal.decrease") { FilterMenu(view: $view) }
}
```

表在左，选中的一行在右边的检查器里改：

```html
<div class="ex-mac has-inspector">
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div><span class="ex-mac-title">需求池</span><div class="dn-segmented" role="group" aria-label="视图"><button type="button" aria-pressed="true">全部</button><button type="button" aria-pressed="false">按状态</button><button type="button" aria-pressed="false">排期</button></div></div>
    <div class="ex-mac-body">
      <div class="dn-db"><table class="dn-table">
        <thead><tr><th scope="col">名称</th><th scope="col">状态</th><th class="is-number" scope="col">截止</th></tr></thead>
        <tbody>
          <tr><td class="is-primary"><a href="#">导入时保留附件</a></td><td><span class="dn-tag">进行中</span></td><td class="is-number">11月28日</td></tr>
          <tr aria-selected="true"><td class="is-primary"><a href="#">分享链接设置有效期</a></td><td><span class="dn-tag">进行中</span></td><td class="is-number">11月21日</td></tr>
          <tr><td class="is-primary"><a href="#">同步冲突时保留两份</a></td><td><span class="dn-tag is-danger"><span class="dn-dot"></span>阻塞</span></td><td class="is-number">12月2日</td></tr>
        </tbody>
      </table></div>
    </div>
  </div>
  <aside class="ex-mac-inspector" aria-label="分享链接设置有效期">
    <dl class="dn-props"><dt>状态</dt><dd>进行中</dd><dt>负责人</dt><dd>林一</dd><dt>截止</dt><dd>11月21日</dd><dt>估时</dt><dd>3 天</dd></dl>
  </aside>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 所有视图都画成列表或它自己的手机样子：看板一屏一列，日历是日视图；画廊是两列网格。
- 视图切换是导航标题的菜单（`toolbarTitleMenu`）；筛选是标题下面一行可以横滑的短句。
- 点一行推进到它的页面：属性是顶部的分组列表，下面是正文。

```swift
List(rows) { row in
    NavigationLink(value: row) {
        VStack(alignment: .leading) {
            Text(row.title)
            Text("\(row.status.name)　\(row.owner?.name ?? "")").font(.footnote).foregroundStyle(.secondary)
        }
    }
}
.navigationTitle(view.name)
.toolbarTitleMenu { ForEach(views) { v in Button(v.name, systemImage: v.symbol) { view = v } } }
.safeAreaInset(edge: .top) { FilterStrip(filters: $view.filters) }
```

标题是视图菜单，下面一行是筛选，每条只写两个属性：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-icon-button" type="button" aria-label="返回"><svg class="dn-icon" aria-hidden="true"><use href="#dn-back"/></svg></button><span class="ex-ios-nav-title">全部<svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span><button class="dn-icon-button" type="button" aria-label="新建"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button></div>
      <div class="dn-filters"><span class="dn-filter">版本 是 <b>2.0</b><button class="dn-icon-button" type="button" aria-label="移除这条筛选"><svg class="dn-icon" aria-hidden="true"><use href="#dn-close"/></svg></button></span></div>
      <ul class="dn-rows">
        <li class="dn-rows-item"><a class="dn-rows-text" href="#"><span class="dn-rows-title">导入时保留附件</span><span class="dn-rows-detail">进行中　周舟</span></a></li>
        <li class="dn-rows-item"><a class="dn-rows-text" href="#"><span class="dn-rows-title">分享链接设置有效期</span><span class="dn-rows-detail">进行中　林一</span></a></li>
        <li class="dn-rows-item"><a class="dn-rows-text" href="#"><span class="dn-rows-title">同步冲突时保留两份</span><span class="dn-rows-detail">阻塞　周舟</span></a></li>
        <li class="dn-rows-item"><a class="dn-rows-text" href="#"><span class="dn-rows-title">命令面板支持拼音</span><span class="dn-rows-detail">待评审</span></a></li>
      </ul>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 新建的数据库 | 三列（名称、状态、日期）三行空行，光标在第一行的名称里；不放示例数据 |
| 筛选后没有结果 | 表头照常，下面一行「没有符合筛选的记录」加「清除筛选」 |
| 改了视图还没保存 | 视图标签旁「只对你生效」加「保存给所有人」「还原」；换到别的视图再回来，改动还在 |
| 属性改了类型 | 先说会怎样：「改成日期后，有 3 个值认不出来，会被清空」，加「改」和「取消」 |
| 很多行 | 只渲染看得见的行；汇总行写全部的数，不是看得见的数 |
| 只能看 | 单元格点了不进编辑；「新建」和「保存给所有人」不显示，自己的临时筛选照样能用 |

## 不要

- 每个选项一种颜色，表格变成彩虹。
- 点一行就跳到新页面，回来还得重新找刚才看到哪了。
- 筛选做成一个弹窗里的条件表达式编辑器，看不出现在筛了什么。
- 一个人调了排序，所有人的视图跟着变。
- 空单元格写「空」「无」「—」。
- 所有属性都是文本框，日期要手打、人员要手打名字。
