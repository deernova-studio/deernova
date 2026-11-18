# 数据概览页

一眼看清几个关键数字的变化，再往下看原因：经营概览、使用统计、项目进度。它最容易被做成一墙彩色卡片和图表；Deernova 的概览页先回答一个问题，数字少、对比清楚、图表只用墨色。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 页面名字；右边时间范围（[分段控件](../../../deernova-style/references/components/segmented.md)：7 天、30 天、90 天）和导出 | 是 |
| 关键数字 | 一行最多四个数。每个：名字、数值、和上一个周期比的变化。数与数之间一条竖线，不放进卡片 | 是 |
| 主图 | 一张大图回答最重要的问题（「年付占比怎么变的」），横轴是时间；重要事件直接标在图上 | 是 |
| 明细 | 主图下面一张[表格](../../../deernova-style/references/components/table.md)，按影响大小排序，可以点进去 | 否 |

- **先写问题。** 这一页要回答什么，决定放哪几个数；放不进前四的数，放到明细表里或者另一页。
- **每个数都有对比。** 写「较上 30 天 +13%」，不只写一个孤立的数；单位和时间范围写在数字旁边或时间控件里，不让人猜。
- **图表只用墨色。** 关注的那条线用 `ink`，参照线用 `ink-tertiary`，网格线用 `line`；状态色只用于真的异常（跌破阈值），不给每条系列分配一个颜色。
- **直接标注，不用图例。** 线的名字写在线的末端，事件写在发生的那一天上方。
- 最重要的数放在左上；所有数字用等宽数字，右对齐的列和数字的小数点对齐。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-dash { display: grid; gap: var(--space-8); max-width: var(--wide-max); }
.dn-kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); margin: 0; }
.dn-kpi { display: grid; gap: var(--space-1); padding: 0 var(--space-6); border-left: var(--stroke-line) solid var(--line); }
.dn-kpi:first-child { padding-left: 0; border-left: 0; }
.dn-kpi dt { color: var(--ink-secondary); font: var(--type-callout); }
.dn-kpi dd { margin: 0; }
.dn-kpi-value { color: var(--ink); font: var(--weight-semibold) var(--type-title-size)/1.2 var(--font-sans); font-variant-numeric: tabular-nums; }
.dn-kpi-delta { color: var(--ink-tertiary); font: var(--type-footnote); font-variant-numeric: tabular-nums; }
.dn-chart { display: grid; gap: var(--space-3); }
.dn-chart-title { margin: 0; font: var(--type-headline); }
.dn-chart svg { display: block; width: 100%; height: auto; overflow: visible; }
.dn-chart .is-grid { stroke: var(--line); stroke-width: 1; }
.dn-chart .is-main { fill: none; stroke: var(--ink); stroke-width: 2; }
.dn-chart .is-ref { fill: none; stroke: var(--ink-tertiary); stroke-width: 1.5; stroke-dasharray: 4 4; }
.dn-chart text { fill: var(--ink-tertiary); font: var(--type-caption); font-variant-numeric: tabular-nums; }
.dn-chart text.is-label { fill: var(--ink); font-weight: var(--weight-medium); }
```

一行四个数，每个都有对比，数与数之间一条竖线；主图只用墨色，线的名字和事件直接写在图上：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <h2 class="dn-toolbar-title"><span>订阅概览</span></h2>
      <div class="dn-toolbar-actions">
        <div class="dn-segmented" role="group" aria-label="时间范围"><button type="button" aria-pressed="false">7 天</button><button type="button" aria-pressed="true">30 天</button><button type="button" aria-pressed="false">90 天</button></div>
      </div>
    </header>
    <div class="dn-app-content">
      <div class="dn-dash">
        <dl class="dn-kpis">
          <div class="dn-kpi"><dt>付费用户</dt><dd class="dn-kpi-value">12,480</dd><dd class="dn-kpi-delta">较上 30 天 +13%</dd></div>
          <div class="dn-kpi"><dt>年付占比</dt><dd class="dn-kpi-value">44%</dd><dd class="dn-kpi-delta">较上 30 天 +13 个百分点</dd></div>
          <div class="dn-kpi"><dt>月收入</dt><dd class="dn-kpi-value">¥186,200</dd><dd class="dn-kpi-delta">较上 30 天 +9%</dd></div>
          <div class="dn-kpi"><dt>退订率</dt><dd class="dn-kpi-value">2.1%</dd><dd class="dn-kpi-delta">较上 30 天 −0.4 个百分点</dd></div>
        </dl>
        <figure class="dn-chart">
          <figcaption class="dn-chart-title">年付占比在 9 月调价后上升</figcaption>
          <svg viewBox="0 0 640 200" role="img" aria-label="年付占比从 31% 升到 44%，月付占比从 69% 降到 56%">
            <line class="is-grid" x1="0" y1="180" x2="560" y2="180"/><line class="is-grid" x1="0" y1="100" x2="560" y2="100"/><line class="is-grid" x1="0" y1="20" x2="560" y2="20"/>
            <line class="is-grid" x1="250" y1="14" x2="250" y2="180" stroke-dasharray="2 3"/>
            <text x="252" y="10">9月1日 调价</text>
            <polyline class="is-ref" points="0,70 60,69 120,70 180,70 250,70 310,76 370,82 430,86 490,89 560,90"/>
            <polyline class="is-main" points="0,130 60,131 120,130 180,130 250,130 310,124 370,118 430,114 490,111 560,110"/>
            <text class="is-label" x="568" y="114">年付 44%</text>
            <text x="568" y="94">月付 56%</text>
            <text x="0" y="196">7月</text><text x="250" y="196">9月</text><text x="530" y="196">11月</text>
          </svg>
        </figure>
      </div>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 窄于 `breakpoint-md`：关键数字两个一行；主图保留，横轴的刻度变少。
- 窄于 `breakpoint-sm`：明细表只留名字和最重要的一列，其余点进去看。
- 时间范围收进一个下拉选择。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 时间范围放在窗口工具栏的分段控件里。
- 图表用 Swift Charts，只用墨色和灰阶，规则同 PC；悬停在图上显示该点的数值。
- 窗口变窄时关键数字两个一行，不把字缩小。

```swift
DashboardView()
    .toolbar {
        Picker("时间范围", selection: $range) { Text("7 天").tag(7); Text("30 天").tag(30); Text("90 天").tag(90) }
            .pickerStyle(.segmented)
    }
// 图表：Chart { LineMark(...).foregroundStyle(.ink) }，参照线用 .inkTertiary 和虚线
```

时间范围在工具栏，关键数字一行四个，图表只用墨色：

```html
<div class="ex-mac is-small ex-mac-wide">
  <div class="ex-mac-bar"><div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div><span class="ex-mac-title">订阅概览</span><div class="dn-segmented" role="group" aria-label="时间范围"><button type="button" aria-pressed="false">7 天</button><button type="button" aria-pressed="true">30 天</button><button type="button" aria-pressed="false">90 天</button></div></div>
  <div class="ex-mac-pad">
    <dl class="dn-kpis">
      <div class="dn-kpi"><dt>付费用户</dt><dd class="dn-kpi-value">12,480</dd><dd class="dn-kpi-delta">较上 30 天 +13%</dd></div>
      <div class="dn-kpi"><dt>年付占比</dt><dd class="dn-kpi-value">44%</dd><dd class="dn-kpi-delta">+13 个百分点</dd></div>
      <div class="dn-kpi"><dt>月收入</dt><dd class="dn-kpi-value">¥186,200</dd><dd class="dn-kpi-delta">较上 30 天 +9%</dd></div>
      <div class="dn-kpi"><dt>退订率</dt><dd class="dn-kpi-value">2.1%</dd><dd class="dn-kpi-delta">−0.4 个百分点</dd></div>
    </dl>
    <figure class="dn-chart">
            <figcaption class="dn-chart-title">年付占比在 9 月调价后上升</figcaption>
            <svg viewBox="0 0 640 200" role="img" aria-label="年付占比从 31% 升到 44%，月付占比从 69% 降到 56%">
              <line class="is-grid" x1="0" y1="180" x2="560" y2="180"/><line class="is-grid" x1="0" y1="100" x2="560" y2="100"/><line class="is-grid" x1="0" y1="20" x2="560" y2="20"/>
              <line class="is-grid" x1="250" y1="14" x2="250" y2="180" stroke-dasharray="2 3"/>
              <text x="252" y="10">9月1日 调价</text>
              <polyline class="is-ref" points="0,70 60,69 120,70 180,70 250,70 310,76 370,82 430,86 490,89 560,90"/>
              <polyline class="is-main" points="0,130 60,131 120,130 180,130 250,130 310,124 370,118 430,114 490,111 560,110"/>
              <text class="is-label" x="568" y="114">年付 44%</text>
              <text x="568" y="94">月付 56%</text>
              <text x="0" y="196">7月</text><text x="250" y="196">9月</text><text x="530" y="196">11月</text>
            </svg>
          </figure>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 关键数字两个一行；主图占满宽度，横向拖动查看每一天的数值。
- 明细表变成列表，每行一个名字和最重要的一个数。
- 时间范围放在导航栏下方的分段控件里。

```swift
ScrollView {
    Picker("时间范围", selection: $range) { … }.pickerStyle(.segmented)
    LazyVGrid(columns: [GridItem(), GridItem()]) { ForEach(kpis) { KPIView(kpi: $0) } }
    Chart { … }.chartXSelection(value: $selectedDay)   // 横向拖动查看每一天
}
.navigationTitle("订阅概览")
```

关键数字两个一行，时间范围在标题下面：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"></div>
      <h3 class="ex-ios-large">订阅概览</h3>
      <div class="dn-segmented" role="group" aria-label="时间范围"><button type="button" aria-pressed="false">7 天</button><button type="button" aria-pressed="true">30 天</button><button type="button" aria-pressed="false">90 天</button></div>
      <dl class="dn-kpis">
        <div class="dn-kpi"><dt>付费用户</dt><dd class="dn-kpi-value">12,480</dd><dd class="dn-kpi-delta">+13%</dd></div>
        <div class="dn-kpi"><dt>年付占比</dt><dd class="dn-kpi-value">44%</dd><dd class="dn-kpi-delta">+13 个百分点</dd></div>
        <div class="dn-kpi"><dt>月收入</dt><dd class="dn-kpi-value">¥186,200</dd><dd class="dn-kpi-delta">+9%</dd></div>
        <div class="dn-kpi"><dt>退订率</dt><dd class="dn-kpi-value">2.1%</dd><dd class="dn-kpi-delta">−0.4 个百分点</dd></div>
      </dl>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 数据还不够 | 关键数字写「—」，下面一句「需要 7 天的数据」，图表位置是空坐标轴加同一句话 |
| 加载中 | 数字和图表位置的[骨架](../../../deernova-style/references/components/skeleton.md)，尺寸和真实内容一致 |
| 部分数据延迟 | 受影响的数字旁边一个 `ink-tertiary` 的小圆点，悬停写「今天的数据 2 小时后更新」 |
| 出现异常 | 只有异常的那个数用 `danger`，旁边一句原因或「查看明细」 |
| 没有权限看某些数 | 那一格写「需要管理员权限」，其余照常 |

## 不要

- 一墙彩色的统计卡片，每张一个图标和一个上升箭头；八个以上的关键数字。
- 只写一个数，不写和什么比、单位是什么、是哪段时间。
- 饼图、仪表盘、3D 图表；超过三个分类的饼图。
- 每条系列一个颜色，再配一个图例让人来回对照；红绿表示好坏。
- 为了填满版面放和这一页的问题无关的图表。
- 图表用渐变填充、阴影和动画入场。
