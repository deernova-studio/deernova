# 用量

看 AI 用了多少：token、对话和任务的次数、花了多少钱、离额度还有多远，以及每个智能体各用了多少。看这一页的是付钱的人和管理员，他们想知道三件事：这个月会不会超、钱花在哪个智能体上、大家是不是真的在用。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 「用量」、时间范围（本月、上月、近 90 天）、导出 | 是 |
| 额度 | 一条进度条：已用多少、总共多少、哪天重置；用到八成时加一句预计哪天用完 | 有额度时 |
| 关键数字 | 四个：token、对话、任务、费用，各带和上一期的对比；排法同[数据概览页](dashboard.md) | 是 |
| 每天的使用 | 热力图：过去半年每天一格，用得越多颜色越深，一眼看出哪几周在用、哪几天停了 | 是 |
| 按智能体 | [表格](../../../deernova-style/references/components/table.md)：智能体、对话、任务、token、费用、占比；按费用排序 | 是 |
| 按模型 | 每个模型一行：token 和费用；只用一个模型时不要 | 多个模型时 |

- **先回答会不会超。** 额度条放在最上面；还早时只写「已用 62%，12月1日重置」，快用完时写预计哪天用完和超了会怎样（「超出后按量计费」或「超出后暂停，直到重置」）。
- **数字用人看得懂的单位。** 「6,240 万 token」，不写 62,400,000；费用写到分，用 `tabular-nums` 对齐。
- **热力图只用墨色的深浅。** 五档，从几乎看不见的灰到墨色，不用绿色；一列是一周，从上到下是周一到周日；左边只标一、三、五，上面标月份，右下角「少 到 多」的图例。悬停或聚焦一格时用 [tooltip](../../../deernova-style/references/components/tooltip.md) 显示「11月12日：38 次对话」。
- **占比用一根短条。** 按智能体的表格最后一列是一根墨色的条，长度是这个智能体的费用占比，旁边写百分比。
- **对比写清和谁比。** 「较上月 +18%」，不写一个孤零零的箭头。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-usage { display: grid; gap: var(--space-8); max-width: var(--wide-max); }
.dn-usage-section { display: grid; gap: var(--space-3); min-width: 0; }
.dn-usage-section > h3 { display: flex; align-items: baseline; justify-content: space-between; gap: var(--space-3); margin: 0; font: var(--type-headline); }
.dn-quota { display: grid; gap: var(--space-2); max-width: var(--form-max); }
.dn-quota-text { margin: 0; color: var(--ink-secondary); font: var(--type-callout); font-variant-numeric: tabular-nums; }
.dn-quota-text strong { color: var(--ink); font-weight: var(--weight-semibold); }
.dn-heatmap { display: grid; grid-template-columns: max-content max-content; justify-content: start; gap: var(--space-1) var(--space-2); max-width: 100%; overflow-x: auto; color: var(--ink-tertiary); font: var(--type-caption); }
.dn-heatmap-months { display: grid; grid-row: 1; grid-column: 2; grid-auto-columns: 11px; grid-auto-flow: column; column-gap: 3px; white-space: nowrap; }
.dn-heatmap-days { display: grid; grid-row: 2; grid-column: 1; grid-template-rows: repeat(7, 11px); row-gap: 3px; line-height: 11px; }
.dn-heatmap-grid { display: grid; grid-row: 2; grid-column: 2; grid-template-rows: repeat(7, 11px); grid-auto-columns: 11px; grid-auto-flow: column; gap: 3px; }
:is(.dn-heatmap-grid, .dn-heatmap-legend) > i { display: block; width: 11px; height: 11px; border-radius: 2px; background: color-mix(in srgb, var(--ink) 7%, transparent); }
:is(.dn-heatmap-grid, .dn-heatmap-legend) > i.is-1 { background: color-mix(in srgb, var(--ink) 22%, transparent); }
:is(.dn-heatmap-grid, .dn-heatmap-legend) > i.is-2 { background: color-mix(in srgb, var(--ink) 45%, transparent); }
:is(.dn-heatmap-grid, .dn-heatmap-legend) > i.is-3 { background: color-mix(in srgb, var(--ink) 70%, transparent); }
:is(.dn-heatmap-grid, .dn-heatmap-legend) > i.is-4 { background: var(--ink); }
.dn-heatmap-legend { display: inline-flex; align-items: center; gap: 3px; color: var(--ink-tertiary); font: var(--type-caption); }
.dn-heatmap-legend > :first-child { margin-right: var(--space-1); }
.dn-heatmap-legend > :last-child { margin-left: var(--space-1); }
.dn-share { display: flex; align-items: center; gap: var(--space-2); }
.dn-share-track { width: 80px; height: var(--progress-height); overflow: hidden; border-radius: var(--radius-full); background: var(--fill-selected); }
.dn-share-track > i { display: block; height: 100%; border-radius: inherit; background: var(--ink); }
```

额度在最上面，下面四个数，然后是半年的热力图和按智能体的表格：

```html
<div class="dn-app ex-page is-auto">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <h2 class="dn-toolbar-title"><span>用量</span></h2>
      <div class="dn-toolbar-actions">
        <div class="dn-segmented" role="group" aria-label="时间范围"><button type="button" aria-pressed="true">本月</button><button type="button" aria-pressed="false">上月</button><button type="button" aria-pressed="false">近 90 天</button></div>
        <button class="dn-button is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-download"/></svg>导出</button>
      </div>
    </header>
    <div class="dn-app-content">
      <div class="dn-usage">
        <div class="dn-quota">
          <p class="dn-quota-text">本月额度已用 <strong>6,240 万</strong>，共 1 亿 token，12月1日重置。按现在的速度，大约 11月27日用完，超出后按量计费。</p>
          <div class="dn-progress"><div class="dn-progress-track" role="progressbar" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" aria-label="本月额度"><div class="dn-progress-bar" style="width: 62%"></div></div><span class="dn-progress-label">62%</span></div>
        </div>
        <dl class="dn-kpis">
          <div class="dn-kpi"><dt>Token</dt><dd class="dn-kpi-value">6,240 万</dd><dd class="dn-kpi-delta">较上月同期 +18%</dd></div>
          <div class="dn-kpi"><dt>对话</dt><dd class="dn-kpi-value">1,610</dd><dd class="dn-kpi-delta">较上月同期 +6%</dd></div>
          <div class="dn-kpi"><dt>任务</dt><dd class="dn-kpi-value">342</dd><dd class="dn-kpi-delta">较上月同期 +41%</dd></div>
          <div class="dn-kpi"><dt>费用</dt><dd class="dn-kpi-value">¥1,284.60</dd><dd class="dn-kpi-delta">较上月同期 +22%</dd></div>
        </dl>
        <section class="dn-usage-section">
          <h3>每天的对话<span class="dn-heatmap-legend" aria-hidden="true"><span>少</span><i></i><i class="is-1"></i><i class="is-2"></i><i class="is-3"></i><i class="is-4"></i><span>多</span></span></h3>
          <div class="dn-heatmap" role="img" aria-label="过去 26 周每天的对话次数">
            <div class="dn-heatmap-months" aria-hidden="true"><span style="grid-column: span 1"></span><span style="grid-column: span 5">6月</span><span style="grid-column: span 4">7月</span><span style="grid-column: span 5">8月</span><span style="grid-column: span 4">9月</span><span style="grid-column: span 4">10月</span><span style="grid-column: span 3">11月</span></div>
            <div class="dn-heatmap-days" aria-hidden="true"><span>一</span><span></span><span>三</span><span></span><span>五</span><span></span><span></span></div>
            <div class="dn-heatmap-grid"><i></i><i></i><i class="is-1"></i><i></i><i class="is-1"></i><i></i><i></i><i class="is-1"></i><i></i><i class="is-1"></i><i></i><i></i><i></i><i class="is-1"></i><i></i><i></i><i class="is-1"></i><i class="is-2"></i><i class="is-1"></i><i></i><i class="is-1"></i><i></i><i class="is-2"></i><i></i><i></i><i></i><i></i><i class="is-1"></i><i></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i></i><i></i><i></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i></i><i></i><i class="is-2"></i><i class="is-2"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-2"></i><i></i><i class="is-1"></i><i class="is-2"></i><i></i><i></i><i></i><i class="is-2"></i><i class="is-2"></i><i class="is-1"></i><i class="is-2"></i><i></i><i class="is-1"></i><i class="is-2"></i><i class="is-2"></i><i class="is-1"></i><i class="is-2"></i><i class="is-2"></i><i></i><i class="is-1"></i><i></i><i class="is-2"></i><i class="is-2"></i><i class="is-3"></i><i class="is-2"></i><i></i><i></i><i class="is-2"></i><i></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-2"></i><i class="is-1"></i><i></i><i class="is-1"></i><i class="is-3"></i><i class="is-2"></i><i class="is-3"></i><i class="is-1"></i><i class="is-2"></i><i></i><i class="is-1"></i><i class="is-3"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-2"></i><i class="is-2"></i><i class="is-2"></i><i class="is-2"></i><i class="is-1"></i><i class="is-2"></i><i class="is-2"></i><i class="is-2"></i><i class="is-1"></i><i class="is-3"></i><i class="is-1"></i><i class="is-2"></i><i class="is-3"></i><i class="is-2"></i><i class="is-2"></i><i class="is-1"></i><i class="is-2"></i><i></i><i></i><i class="is-1"></i><i class="is-1"></i><i class="is-2"></i><i></i><i></i><i></i><i></i><i></i><i></i><i class="is-1"></i><i class="is-2"></i><i class="is-1"></i><i></i><i></i><i class="is-2"></i><i class="is-1"></i><i class="is-3"></i><i class="is-3"></i><i class="is-2"></i><i class="is-1"></i><i></i><i class="is-2"></i><i class="is-2"></i><i class="is-2"></i><i class="is-3"></i><i class="is-2"></i><i></i><i class="is-2"></i><i class="is-3"></i><i class="is-2"></i><i class="is-3"></i><i class="is-1"></i><i class="is-3"></i><i class="is-2"></i><i class="is-2"></i><i class="is-3"></i><i class="is-2"></i><i class="is-2"></i><i class="is-2"></i><i class="is-3"></i><i class="is-1"></i><i class="is-2"></i><i class="is-2"></i><i class="is-2"></i><i class="is-3"></i><i class="is-4"></i><i class="is-3"></i><i class="is-2"></i><i class="is-2"></i><i class="is-3"></i><i class="is-2"></i></div>
          </div>
        </section>
        <section class="dn-usage-section">
          <h3>按智能体</h3>
          <div class="dn-table-wrap">
            <table class="dn-table">
              <thead><tr><th scope="col">智能体</th><th class="is-number" scope="col">对话</th><th class="is-number" scope="col">任务</th><th class="is-number" scope="col">Token</th><th class="is-number" scope="col" aria-sort="descending">费用</th><th scope="col">占比</th></tr></thead>
              <tbody>
                <tr><td class="is-primary">代码审查</td><td class="is-number">312</td><td class="is-number">208</td><td class="is-number">3,120 万</td><td class="is-number">¥642.30</td><td><span class="dn-share"><span class="dn-share-track"><i style="width: 50%"></i></span>50%</span></td></tr>
                <tr><td class="is-primary">客服回复</td><td class="is-number">1,208</td><td class="is-number">0</td><td class="is-number">2,050 万</td><td class="is-number">¥398.20</td><td><span class="dn-share"><span class="dn-share-track"><i style="width: 31%"></i></span>31%</span></td></tr>
                <tr><td class="is-primary">发票整理</td><td class="is-number">64</td><td class="is-number">118</td><td class="is-number">890 万</td><td class="is-number">¥186.40</td><td><span class="dn-share"><span class="dn-share-track"><i style="width: 15%"></i></span>15%</span></td></tr>
                <tr><td class="is-primary">周报助手</td><td class="is-number">26</td><td class="is-number">16</td><td class="is-number">180 万</td><td class="is-number">¥57.70</td><td><span class="dn-share"><span class="dn-share-track"><i style="width: 4%"></i></span>4%</span></td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 关键数字两个一行。
- 热力图只显示最近 15 周，整块可以横向滑动看更早的；月份和星期的标注跟着走。
- 按智能体的表格换成列表：名字和费用一行，下面一行是对话和任务的次数；占比条放在费用下面。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 用量在主窗口侧边栏里，和智能体、任务并列；时间范围用工具栏里的分段控件。
- 热力图用 Swift Charts 的 `RectangleMark`，颜色只用墨色的不同透明度；悬停一格显示当天的数字。
- 按智能体用 `Table`，双击一行打开这个智能体的配置。

```swift
VStack(alignment: .leading, spacing: Deernova.space8) {
    QuotaView(used: usage.tokens, limit: plan.tokenLimit, resetsOn: plan.resetDate)
    KPIRow(usage: usage)
    Chart(days) { day in
        RectangleMark(
            x: .value("周", day.date, unit: .weekOfYear),
            y: .value("星期", day.weekdayIndex)
        )
        .foregroundStyle(Color.primary.opacity(day.level.opacity))   // 0.07、0.22、0.45、0.7、1
        .cornerRadius(2)
    }
    .chartYScale(domain: .automatic(reversed: true))
    Table(usage.byAgent) { /* 智能体、对话、任务、Token、费用、占比 */ }
}
.navigationTitle("用量")
.toolbar { Picker("时间范围", selection: $range) { RangeOptions() }.pickerStyle(.segmented) }
```

侧边栏里和智能体、任务并列，额度、关键数字和热力图在同一屏里：

```html
<div class="ex-mac">
  <nav class="ex-mac-sidebar" aria-label="侧边栏">
    <div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-table"/></svg><span class="dn-sidebar-label">全部智能体</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-list"/></svg><span class="dn-sidebar-label">任务</span></a>
    <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-history"/></svg><span class="dn-sidebar-label">用量</span></a>
  </nav>
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><span class="ex-mac-title">用量</span><div class="dn-segmented" role="group" aria-label="时间范围"><button type="button" aria-pressed="true">本月</button><button type="button" aria-pressed="false">上月</button></div></div>
    <div class="ex-mac-body dn-usage">
      <div class="dn-quota">
        <p class="dn-quota-text">已用 <strong>6,240 万</strong>，共 1 亿 token，12月1日重置。</p>
        <div class="dn-progress"><div class="dn-progress-track" role="progressbar" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" aria-label="本月额度"><div class="dn-progress-bar" style="width: 62%"></div></div><span class="dn-progress-label">62%</span></div>
      </div>
      <dl class="dn-kpis">
        <div class="dn-kpi"><dt>Token</dt><dd class="dn-kpi-value">6,240 万</dd></div>
        <div class="dn-kpi"><dt>对话</dt><dd class="dn-kpi-value">1,610</dd></div>
        <div class="dn-kpi"><dt>费用</dt><dd class="dn-kpi-value">¥1,284.60</dd></div>
      </dl>
      <section class="dn-usage-section">
        <h3>每天的对话</h3>
        <div class="dn-heatmap" role="img" aria-label="过去 20 周每天的对话次数">
          <div class="dn-heatmap-months" aria-hidden="true"><span style="grid-column: span 4">7月</span><span style="grid-column: span 5">8月</span><span style="grid-column: span 4">9月</span><span style="grid-column: span 4">10月</span><span style="grid-column: span 3">11月</span></div>
          <div class="dn-heatmap-days" aria-hidden="true"><span>一</span><span></span><span>三</span><span></span><span>五</span><span></span><span></span></div>
          <div class="dn-heatmap-grid"><i></i><i></i><i class="is-1"></i><i></i><i class="is-1"></i><i></i><i></i><i class="is-1"></i><i></i><i class="is-1"></i><i></i><i></i><i></i><i class="is-1"></i><i></i><i></i><i class="is-1"></i><i class="is-2"></i><i class="is-1"></i><i></i><i class="is-1"></i><i></i><i class="is-2"></i><i></i><i></i><i></i><i></i><i class="is-1"></i><i></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i></i><i></i><i class="is-1"></i><i class="is-2"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i></i><i></i><i class="is-2"></i><i class="is-2"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-2"></i><i class="is-1"></i><i class="is-1"></i><i class="is-2"></i><i></i><i></i><i></i><i class="is-2"></i><i class="is-2"></i><i class="is-2"></i><i class="is-2"></i><i></i><i class="is-1"></i><i class="is-2"></i><i class="is-2"></i><i class="is-1"></i><i class="is-2"></i><i class="is-3"></i><i></i><i class="is-1"></i><i class="is-1"></i><i class="is-2"></i><i class="is-2"></i><i class="is-3"></i><i class="is-2"></i><i></i><i></i><i class="is-2"></i><i class="is-1"></i><i class="is-2"></i><i class="is-1"></i><i class="is-1"></i><i></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-2"></i><i class="is-1"></i><i></i><i></i><i></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-2"></i><i class="is-2"></i><i></i><i class="is-2"></i><i class="is-3"></i><i class="is-1"></i><i class="is-1"></i><i class="is-2"></i><i class="is-2"></i><i class="is-1"></i><i class="is-1"></i><i class="is-2"></i><i class="is-1"></i><i class="is-2"></i><i class="is-2"></i><i class="is-2"></i><i class="is-2"></i><i class="is-1"></i><i class="is-2"></i><i class="is-3"></i><i class="is-3"></i><i class="is-1"></i><i class="is-3"></i><i class="is-1"></i><i class="is-2"></i><i class="is-3"></i><i class="is-2"></i><i class="is-2"></i><i class="is-2"></i><i class="is-3"></i><i></i><i></i><i class="is-2"></i><i class="is-2"></i><i class="is-2"></i><i class="is-2"></i><i class="is-1"></i><i></i><i></i><i class="is-2"></i><i class="is-2"></i></div>
        </div>
      </section>
    </div>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 一屏从上到下：额度、两个一行的关键数字、最近 15 周的热力图、按智能体的列表。
- 热力图可以横向滑动看更早的；按住一格显示当天的数字。
- 时间范围用顶部的分段控件；导出放在右上角的分享里。

```swift
ScrollView {
    VStack(alignment: .leading, spacing: Deernova.space6) {
        QuotaView(used: usage.tokens, limit: plan.tokenLimit, resetsOn: plan.resetDate)
        Grid { GridRow { KPI("Token", usage.tokens); KPI("对话", usage.conversations) }
               GridRow { KPI("任务", usage.tasks); KPI("费用", usage.cost) } }
        ScrollView(.horizontal) { ActivityHeatmap(days: days) }.defaultScrollAnchor(.trailing)
        ForEach(usage.byAgent) { AgentUsageRow(row: $0) }
    }
    .padding(.horizontal, Deernova.pageMargin)
}
.navigationTitle("用量")
.toolbar { ShareLink(item: usage.csv, preview: SharePreview("用量")) }
```

额度和数字在上面，热力图停在最近的几周：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><span></span><button class="dn-icon-button" type="button" aria-label="导出"><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></button></div>
      <h3 class="ex-ios-large">用量</h3>
      <div class="dn-quota">
        <p class="dn-quota-text">已用 <strong>62%</strong>，12月1日重置</p>
        <div class="dn-progress"><div class="dn-progress-track" role="progressbar" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" aria-label="本月额度"><div class="dn-progress-bar" style="width: 62%"></div></div></div>
      </div>
      <dl class="dn-kpis">
        <div class="dn-kpi"><dt>Token</dt><dd class="dn-kpi-value">6,240 万</dd></div>
        <div class="dn-kpi"><dt>费用</dt><dd class="dn-kpi-value">¥1,284.60</dd></div>
      </dl>
      <section class="dn-usage-section">
        <div class="dn-heatmap" role="img" aria-label="过去 15 周每天的对话次数">
          <div class="dn-heatmap-months" aria-hidden="true"><span style="grid-column: span 4">8月</span><span style="grid-column: span 4">9月</span><span style="grid-column: span 4">10月</span><span style="grid-column: span 3">11月</span></div>
          <div class="dn-heatmap-days" aria-hidden="true"><span>一</span><span></span><span>三</span><span></span><span>五</span><span></span><span></span></div>
          <div class="dn-heatmap-grid"><i></i><i></i><i class="is-1"></i><i></i><i class="is-1"></i><i></i><i></i><i class="is-1"></i><i></i><i class="is-1"></i><i></i><i></i><i></i><i class="is-1"></i><i></i><i></i><i class="is-1"></i><i class="is-2"></i><i class="is-1"></i><i></i><i class="is-1"></i><i></i><i class="is-2"></i><i class="is-1"></i><i></i><i></i><i></i><i class="is-1"></i><i></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i></i><i></i><i class="is-1"></i><i class="is-2"></i><i class="is-1"></i><i class="is-1"></i><i class="is-2"></i><i></i><i></i><i class="is-2"></i><i class="is-2"></i><i class="is-1"></i><i class="is-2"></i><i class="is-2"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-3"></i><i class="is-1"></i><i></i><i class="is-1"></i><i></i><i></i><i></i><i class="is-1"></i><i class="is-1"></i><i class="is-2"></i><i class="is-3"></i><i></i><i class="is-1"></i><i class="is-2"></i><i class="is-2"></i><i class="is-2"></i><i class="is-3"></i><i class="is-3"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-3"></i><i class="is-2"></i><i class="is-3"></i><i class="is-3"></i><i></i><i></i><i class="is-3"></i><i class="is-1"></i><i class="is-2"></i><i class="is-1"></i><i class="is-1"></i><i></i><i class="is-1"></i><i class="is-2"></i><i class="is-2"></i><i class="is-2"></i><i class="is-3"></i><i class="is-1"></i><i class="is-1"></i><i class="is-1"></i><i class="is-3"></i><i class="is-3"></i><i class="is-3"></i><i class="is-2"></i><i class="is-2"></i><i class="is-1"></i><i class="is-2"></i><i class="is-4"></i><i class="is-2"></i></div>
        </div>
      </section>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 刚开始用 | 热力图只有最近几格有颜色，其余是最浅的灰；不放「数据不足」的空状态 |
| 快用完 | 额度条下面一句「大约 11月27日用完，超出后按量计费」，加「调整额度」 |
| 已经用完 | 额度条上面一条[横幅](../../../deernova-style/references/components/banner.md)：「本月额度已用完，智能体暂停到 12月1日」，加「提高额度」 |
| 数据有延迟 | 关键数字下面一行「最近 1 小时的用量还在统计」，不把数字写成 0 |
| 不是管理员 | 只看到自己的用量；按智能体的表格只列自己的智能体，没有费用列 |

## 不要

- 只给一个总数，看不出钱花在哪个智能体上。
- token 写成一长串数字（62,400,000），或者只写「6.24e7」。
- 热力图用绿色或彩虹色；五档颜色之间的差别太小，看不出哪天多哪天少。
- 用仪表盘、环形图表示额度；一根进度条加一句话就够。
- 快用完时什么都不说，等用户发现智能体停了才知道。
