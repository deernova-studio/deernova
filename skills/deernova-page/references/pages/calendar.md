# 日历

用户来这里看一段时间里排了什么、哪里还空着，在空着的地方放一件事。默认打开本周，今天在视野里；点开一个日程是一个小浮层，不跳整页。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 当前范围（「2026年11月」）、「今天」、上一段和下一段、视图（日、周、月）、新建 | 是 |
| 月历 | 侧栏顶上一个小月历，本周那一行底色标出，点一天跳过去 | 宽屏时 |
| 日历列表 | 侧栏里「我的日历」和「其他人」，每个一个复选框，勾上才显示 | 有多个日历时 |
| 日期行 | 星期和日期；今天的日期放进墨色圆里 | 是 |
| 全天 | 日期行下面一行，放全天和跨天的事，跨几天就横跨几列 | 是 |
| 时间网格 | 左边一列时刻，每小时一条细线；日程按开始和结束时间占满对应的高度 | 日和周视图 |
| 现在 | 今天那一列上一条墨色横线，左端一个圆点 | 是 |

- **周视图是默认。** 日视图给只看今天的人，月视图看远一点的安排；三个视图共用一套日程块，只是高度不同。
- **日程块只写名字和开始时间。** 地点、参与人、会议链接在点开的浮层里。半小时以内的块只写名字，时间写在同一行。
- **不用颜色区分日历。** 只有三种样子：实心是我要参加的；空心细框是个人日历和叠加进来的别人的日历；虚线框是还没回复的邀请。同时开着的日历超过两个时，用侧栏的复选框筛，不靠颜色认。
- **现在用墨色，不用红线。** 红色只留给冲突和过期这类要处理的事。
- **过去的日程变淡。** 现在这条线以上的日程降低不透明度，让人一眼看到下午还剩什么。
- **重叠的日程并排。** 时间有交叉的两个块各占一半宽度，不互相盖住。
- **在空白处拖出一段就是新建。** 松手后在那一段旁边弹出[浮层](../../../deernova-style/references/components/sheet.md)填名字，回车保存；需要更多选项再点「更多选项」进整页。
- **周末和工作时间以外铺一层 `surface-sunken`。** 只是提示，照样可以放日程。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-cal-page { display: grid; grid-template-columns: 216px minmax(0, 1fr); flex: 1; min-height: 0; }
.dn-cal-aside { display: flex; flex-direction: column; gap: var(--space-5); min-height: 0; overflow-y: auto; padding: var(--space-3) var(--space-3) var(--space-4); border-right: var(--stroke-line) solid var(--line); }
.dn-minical { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); row-gap: 2px; text-align: center; font: var(--type-caption); font-variant-numeric: tabular-nums; }
.dn-minical > span { padding-bottom: var(--space-1); color: var(--ink-tertiary); }
.dn-minical > button { height: 24px; border: 0; border-radius: var(--radius-full); background: none; color: var(--ink); font: inherit; cursor: pointer; }
.dn-minical > button:hover { background: var(--fill-hover); }
.dn-minical > .is-other { color: var(--ink-tertiary); }
.dn-minical > .is-week { border-radius: 0; background: var(--fill-selected); }
.dn-minical > .is-week:nth-child(7n + 1) { border-radius: var(--radius-full) 0 0 var(--radius-full); }
.dn-minical > .is-week:nth-child(7n) { border-radius: 0 var(--radius-full) var(--radius-full) 0; }
.dn-minical > .is-today { color: var(--on-accent); background: radial-gradient(circle closest-side, var(--accent) 11px, transparent 12px), var(--fill-selected); font-weight: var(--weight-semibold); }
.dn-cal { display: flex; flex-direction: column; flex: 1; min-width: 0; min-height: 0; }
.dn-cal-head, .dn-cal-allday, .dn-cal-grid { display: grid; grid-template-columns: 52px repeat(7, minmax(0, 1fr)); }
.dn-cal.is-5 :is(.dn-cal-head, .dn-cal-allday, .dn-cal-grid) { grid-template-columns: 52px repeat(5, minmax(0, 1fr)); }
.dn-cal.is-1 :is(.dn-cal-head, .dn-cal-allday, .dn-cal-grid) { grid-template-columns: 44px minmax(0, 1fr); }
.dn-cal-head { border-bottom: var(--stroke-line) solid var(--line); }
.dn-cal-day { display: flex; align-items: center; gap: var(--space-1); min-width: 0; padding: var(--space-2); color: var(--ink-secondary); font: var(--type-footnote); white-space: nowrap; }
.dn-cal-day > b { display: grid; place-items: center; min-width: 26px; height: 26px; border-radius: var(--radius-full); color: var(--ink); font: var(--weight-semibold) var(--type-headline-size)/1 var(--font-sans); font-variant-numeric: tabular-nums; }
.dn-cal-day.is-today > b { background: var(--accent); color: var(--on-accent); }
.dn-cal-day.is-weekend { color: var(--ink-tertiary); }
.dn-cal-allday { align-items: center; min-height: 30px; padding-block: 3px; border-bottom: var(--stroke-line) solid var(--line); }
.dn-cal-allday > .dn-cal-label { grid-column: 1; }
.dn-cal-label, .dn-cal-hour { padding-right: var(--space-2); color: var(--ink-tertiary); font: var(--type-caption); font-variant-numeric: tabular-nums; text-align: right; }
.dn-cal-scroll { flex: 1; min-height: 0; overflow-y: auto; }
.dn-cal-grid { grid-template-rows: repeat(20, 22px); padding-bottom: var(--space-4); }
.dn-cal-col { grid-row: 1 / -1; border-left: var(--stroke-line) solid var(--line); background-image: linear-gradient(var(--line) 1px, transparent 1px); background-size: 100% 44px; }
.dn-cal-col.is-weekend { background-color: var(--surface-sunken); }
.dn-cal-hour { grid-column: 1; translate: 0 -50%; }
.dn-cal-event { position: relative; z-index: 1; display: flex; flex-direction: column; min-width: 0; margin: 1px var(--space-1) 1px 2px; padding: 2px var(--space-2); overflow: hidden; border-left: var(--stroke-control) solid var(--ink); border-radius: var(--radius-xs); background: var(--fill-selected); color: var(--ink); font: var(--type-footnote); text-decoration: none; }
.dn-cal-event > b { font-weight: var(--weight-medium); overflow-wrap: anywhere; }
.dn-cal-event.is-short > b, .dn-cal-allday > .dn-cal-event > b { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dn-cal-event > span { color: var(--ink-secondary); font-variant-numeric: tabular-nums; }
.dn-cal-event.is-short { flex-direction: row; gap: var(--space-1); align-items: center; padding-block: 0; }
.dn-cal-event.is-quiet { border: var(--stroke-line) solid var(--line); border-left: var(--stroke-control) solid var(--ink-tertiary); background: var(--surface); }
.dn-cal-event.is-tentative { border: var(--stroke-line) dashed var(--ink-tertiary); background: var(--surface); color: var(--ink-secondary); }
.dn-cal-event.is-past { opacity: 0.55; }
.dn-cal-event.is-start { margin-right: 50%; }
.dn-cal-event.is-end { margin-left: 50%; }
.dn-cal-allday > .dn-cal-event { flex-direction: row; gap: var(--space-1); padding-block: 1px; }
.dn-cal-now { position: relative; z-index: 2; align-self: start; height: var(--stroke-control); background: var(--ink); pointer-events: none; }
.dn-cal-now::before { content: ""; position: absolute; top: 50%; left: -4px; width: 8px; height: 8px; border-radius: var(--radius-full); background: var(--ink); translate: 0 -50%; }
@media (max-width: 960px) {
  .dn-cal-page { grid-template-columns: minmax(0, 1fr); }
  .dn-cal-aside { display: none; }
}
```

本周，今天是周四：现在这条线以上的日程变淡；重叠的两个会并排；下午的一对一还没回复，是虚线框；周末铺了一层浅灰：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <h2 class="dn-toolbar-title"><span>2026年11月</span></h2>
      <button class="dn-button is-sm" type="button">今天</button>
      <button class="dn-icon-button" type="button" aria-label="上一周"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg></button>
      <button class="dn-icon-button" type="button" aria-label="下一周"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-right"/></svg></button>
      <div class="dn-toolbar-actions">
        <div class="dn-segmented" role="group" aria-label="视图"><button type="button" aria-pressed="false">日</button><button type="button" aria-pressed="true">周</button><button type="button" aria-pressed="false">月</button></div>
        <button class="dn-button is-primary is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg>新建</button>
      </div>
    </header>
    <div class="dn-cal-page">
      <aside class="dn-cal-aside" aria-label="日历">
        <div class="dn-minical" role="group" aria-label="2026年11月"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span><button type="button" class="is-other">26</button><button type="button" class="is-other">27</button><button type="button" class="is-other">28</button><button type="button" class="is-other">29</button><button type="button" class="is-other">30</button><button type="button" class="is-other">31</button><button type="button">1</button><button type="button">2</button><button type="button">3</button><button type="button">4</button><button type="button">5</button><button type="button">6</button><button type="button">7</button><button type="button">8</button><button type="button">9</button><button type="button">10</button><button type="button">11</button><button type="button">12</button><button type="button">13</button><button type="button">14</button><button type="button">15</button><button type="button" class="is-week">16</button><button type="button" class="is-week">17</button><button type="button" class="is-week">18</button><button type="button" class="is-week is-today" aria-current="date">19</button><button type="button" class="is-week">20</button><button type="button" class="is-week">21</button><button type="button" class="is-week">22</button><button type="button">23</button><button type="button">24</button><button type="button">25</button><button type="button">26</button><button type="button">27</button><button type="button">28</button><button type="button">29</button><button type="button">30</button><button type="button" class="is-other">1</button><button type="button" class="is-other">2</button><button type="button" class="is-other">3</button><button type="button" class="is-other">4</button><button type="button" class="is-other">5</button><button type="button" class="is-other">6</button></div>
        <fieldset class="dn-choice-group">
          <legend class="dn-sidebar-heading">我的日历</legend>
          <label class="dn-choice"><span class="dn-choice-box"><input type="checkbox" checked><svg class="dn-icon is-check" aria-hidden="true"><use href="#dn-check"/></svg></span><span class="dn-choice-text"><span class="dn-choice-label">工作</span></span></label>
          <label class="dn-choice"><span class="dn-choice-box"><input type="checkbox" checked><svg class="dn-icon is-check" aria-hidden="true"><use href="#dn-check"/></svg></span><span class="dn-choice-text"><span class="dn-choice-label">个人</span></span></label>
        </fieldset>
        <fieldset class="dn-choice-group">
          <legend class="dn-sidebar-heading">其他人</legend>
          <label class="dn-choice"><span class="dn-choice-box"><input type="checkbox"><svg class="dn-icon is-check" aria-hidden="true"><use href="#dn-check"/></svg></span><span class="dn-choice-text"><span class="dn-choice-label">周舟</span></span></label>
          <label class="dn-choice"><span class="dn-choice-box"><input type="checkbox"><svg class="dn-icon is-check" aria-hidden="true"><use href="#dn-check"/></svg></span><span class="dn-choice-text"><span class="dn-choice-label">沈遥</span></span></label>
        </fieldset>
      </aside>
      <div class="dn-cal">
        <div class="dn-cal-head"><span></span><span class="dn-cal-day">周一<b>16</b></span><span class="dn-cal-day">周二<b>17</b></span><span class="dn-cal-day">周三<b>18</b></span><span class="dn-cal-day is-today" aria-current="date">周四<b>19</b></span><span class="dn-cal-day">周五<b>20</b></span><span class="dn-cal-day is-weekend">周六<b>21</b></span><span class="dn-cal-day is-weekend">周日<b>22</b></span></div>
        <div class="dn-cal-allday"><span class="dn-cal-label">全天</span><a class="dn-cal-event" href="#" style="grid-column: 5 / 7"><b>发布冻结</b></a></div>
        <div class="dn-cal-scroll">
          <div class="dn-cal-grid">
            <span class="dn-cal-col" style="grid-column: 2" aria-hidden="true"></span>
            <span class="dn-cal-col" style="grid-column: 3" aria-hidden="true"></span>
            <span class="dn-cal-col" style="grid-column: 4" aria-hidden="true"></span>
            <span class="dn-cal-col" style="grid-column: 5" aria-hidden="true"></span>
            <span class="dn-cal-col" style="grid-column: 6" aria-hidden="true"></span>
            <span class="dn-cal-col is-weekend" style="grid-column: 7" aria-hidden="true"></span>
            <span class="dn-cal-col is-weekend" style="grid-column: 8" aria-hidden="true"></span>
            <span class="dn-cal-hour" style="grid-row: 3">10:00</span>
            <span class="dn-cal-hour" style="grid-row: 5">11:00</span>
            <span class="dn-cal-hour" style="grid-row: 7">12:00</span>
            <span class="dn-cal-hour" style="grid-row: 9">13:00</span>
            <span class="dn-cal-hour" style="grid-row: 11">14:00</span>
            <span class="dn-cal-hour" style="grid-row: 13">15:00</span>
            <span class="dn-cal-hour" style="grid-row: 15">16:00</span>
            <span class="dn-cal-hour" style="grid-row: 17">17:00</span>
            <span class="dn-cal-hour" style="grid-row: 19">18:00</span>
            <a class="dn-cal-event is-past" href="#" style="grid-column: 2; grid-row: 3 / 5"><b>周会</b><span>10:00</span></a>
            <a class="dn-cal-event is-past" href="#" style="grid-column: 2; grid-row: 11 / 14"><b>设计评审</b><span>14:00</span></a>
            <a class="dn-cal-event is-past is-short" href="#" style="grid-column: 3; grid-row: 2 / 3"><b>站会</b><span>9:30</span></a>
            <a class="dn-cal-event is-quiet is-past" href="#" style="grid-column: 3; grid-row: 13 / 17"><b>写发布说明</b><span>15:00</span></a>
            <a class="dn-cal-event is-past is-short" href="#" style="grid-column: 4; grid-row: 2 / 3"><b>站会</b><span>9:30</span></a>
            <a class="dn-cal-event is-past" href="#" style="grid-column: 4; grid-row: 5 / 7"><b>面试：前端</b><span>11:00</span></a>
            <a class="dn-cal-event is-quiet is-past" href="#" style="grid-column: 4; grid-row: 9 / 11"><b>和周舟吃饭</b><span>13:00</span></a>
            <a class="dn-cal-event is-past is-short" href="#" style="grid-column: 5; grid-row: 2 / 3"><b>站会</b><span>9:30</span></a>
            <a class="dn-cal-event is-start is-past" href="#" style="grid-column: 5; grid-row: 4 / 6"><b>发布评审</b><span>10:30</span></a>
            <a class="dn-cal-event is-end is-past" href="#" style="grid-column: 5; grid-row: 5 / 7"><b>客户电话</b><span>11:00</span></a>
            <a class="dn-cal-event is-tentative" href="#" style="grid-column: 5; grid-row: 13 / 15"><b>一对一：沈遥</b><span>15:00</span></a>
            <a class="dn-cal-event is-short" href="#" style="grid-column: 6; grid-row: 2 / 3"><b>站会</b><span>9:30</span></a>
            <a class="dn-cal-event" href="#" style="grid-column: 6; grid-row: 15 / 17"><b>周报</b><span>16:00</span></a>
            <a class="dn-cal-event is-quiet" href="#" style="grid-column: 7; grid-row: 3 / 7"><b>爬山</b><span>10:00</span></a>
            <span class="dn-cal-now" style="grid-column: 5; grid-row: 11; margin-top: 15px" aria-label="现在 14:20"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 窄于 `breakpoint-md`：侧栏收起，月历和日历列表进顶栏的「日历」菜单；周视图换成三天，左右滑动一次挪一天。
- 手机宽度默认日视图，顶上一行七天的日期条，点一天切过去。
- 新建不靠拖：点空白处的某个时刻，从那个时刻开始新建一小时。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 侧边栏放月历和日历列表；周视图可以在工具栏里改成只看工作日。
- 日程用系统拖放：拖动挪时间，拖下边缘改长短，按住 ⌥ 拖是复制；从邮件或网页拖一段文字进来就是新建。
- 点一个日程弹出 `popover`，改完点别处就保存；双击打开独立窗口。
- 键盘：⌘T 回到今天，⌘← 和 ⌘→ 翻周，⌘1 到 ⌘3 切换日、周、月。

```swift
NavigationSplitView {
    VStack(alignment: .leading, spacing: Deernova.space5) {
        DatePicker("日期", selection: $focusDate, displayedComponents: .date)
            .datePickerStyle(.graphical)
            .labelsHidden()
        CalendarList(calendars: $calendars)
    }
    .padding(Deernova.space3)
} detail: {
    WeekView(start: weekStart, days: workWeekOnly ? 5 : 7, events: visibleEvents)
        .popover(item: $openEvent) { EventPopover(event: $0) }
        .toolbar {
            Button("今天", action: goToToday).keyboardShortcut("t")
            ControlGroup {
                Button("上一周", systemImage: "chevron.left", action: previous)
                Button("下一周", systemImage: "chevron.right", action: next)
            }
            Picker("视图", selection: $scale) { Text("日").tag(Scale.day); Text("周").tag(Scale.week); Text("月").tag(Scale.month) }
                .pickerStyle(.segmented)
        }
}
```

侧边栏是日历列表，主区只看工作日：

```html
<div class="ex-mac">
  <nav class="ex-mac-sidebar" aria-label="日历">
    <div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div>
    <p class="dn-sidebar-heading">我的日历</p>
    <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-calendar"/></svg><span class="dn-sidebar-label">工作</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-calendar"/></svg><span class="dn-sidebar-label">个人</span></a>
    <p class="dn-sidebar-heading">其他人</p>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-user"/></svg><span class="dn-sidebar-label">周舟</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-user"/></svg><span class="dn-sidebar-label">沈遥</span></a>
  </nav>
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><span class="ex-mac-title">2026年11月</span><div class="dn-glass-group"><button class="dn-glass dn-glass-button" type="button" aria-label="上一周"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg></button><button class="dn-glass dn-glass-button" type="button" aria-label="下一周"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-right"/></svg></button></div></div>
    <div class="dn-cal is-5">
      <div class="dn-cal-head"><span></span><span class="dn-cal-day">周一<b>16</b></span><span class="dn-cal-day">周二<b>17</b></span><span class="dn-cal-day">周三<b>18</b></span><span class="dn-cal-day is-today" aria-current="date">周四<b>19</b></span><span class="dn-cal-day">周五<b>20</b></span></div>
      <div class="dn-cal-allday"><span class="dn-cal-label">全天</span><a class="dn-cal-event" href="#" style="grid-column: 5 / 7"><b>发布冻结</b></a></div>
      <div class="dn-cal-scroll">
        <div class="dn-cal-grid">
            <span class="dn-cal-col" style="grid-column: 2" aria-hidden="true"></span>
            <span class="dn-cal-col" style="grid-column: 3" aria-hidden="true"></span>
            <span class="dn-cal-col" style="grid-column: 4" aria-hidden="true"></span>
            <span class="dn-cal-col" style="grid-column: 5" aria-hidden="true"></span>
            <span class="dn-cal-col" style="grid-column: 6" aria-hidden="true"></span>
            <span class="dn-cal-hour" style="grid-row: 3">10:00</span>
            <span class="dn-cal-hour" style="grid-row: 5">11:00</span>
            <span class="dn-cal-hour" style="grid-row: 7">12:00</span>
            <span class="dn-cal-hour" style="grid-row: 9">13:00</span>
            <span class="dn-cal-hour" style="grid-row: 11">14:00</span>
            <span class="dn-cal-hour" style="grid-row: 13">15:00</span>
            <span class="dn-cal-hour" style="grid-row: 15">16:00</span>
            <span class="dn-cal-hour" style="grid-row: 17">17:00</span>
            <span class="dn-cal-hour" style="grid-row: 19">18:00</span>
            <a class="dn-cal-event is-past" href="#" style="grid-column: 2; grid-row: 3 / 5"><b>周会</b><span>10:00</span></a>
            <a class="dn-cal-event is-past" href="#" style="grid-column: 2; grid-row: 11 / 14"><b>设计评审</b><span>14:00</span></a>
            <a class="dn-cal-event is-past is-short" href="#" style="grid-column: 3; grid-row: 2 / 3"><b>站会</b><span>9:30</span></a>
            <a class="dn-cal-event is-quiet is-past" href="#" style="grid-column: 3; grid-row: 13 / 17"><b>写发布说明</b><span>15:00</span></a>
            <a class="dn-cal-event is-past is-short" href="#" style="grid-column: 4; grid-row: 2 / 3"><b>站会</b><span>9:30</span></a>
            <a class="dn-cal-event is-past" href="#" style="grid-column: 4; grid-row: 5 / 7"><b>面试：前端</b><span>11:00</span></a>
            <a class="dn-cal-event is-quiet is-past" href="#" style="grid-column: 4; grid-row: 9 / 11"><b>和周舟吃饭</b><span>13:00</span></a>
            <a class="dn-cal-event is-past is-short" href="#" style="grid-column: 5; grid-row: 2 / 3"><b>站会</b><span>9:30</span></a>
            <a class="dn-cal-event is-start is-past" href="#" style="grid-column: 5; grid-row: 4 / 6"><b>发布评审</b><span>10:30</span></a>
            <a class="dn-cal-event is-end is-past" href="#" style="grid-column: 5; grid-row: 5 / 7"><b>客户电话</b><span>11:00</span></a>
            <a class="dn-cal-event is-tentative" href="#" style="grid-column: 5; grid-row: 13 / 15"><b>一对一：沈遥</b><span>15:00</span></a>
            <a class="dn-cal-event is-short" href="#" style="grid-column: 6; grid-row: 2 / 3"><b>站会</b><span>9:30</span></a>
            <a class="dn-cal-event" href="#" style="grid-column: 6; grid-row: 15 / 17"><b>周报</b><span>16:00</span></a>
            <span class="dn-cal-now" style="grid-column: 5; grid-row: 11; margin-top: 15px" aria-label="现在 14:20"></span>
        </div>
      </div>
    </div>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 默认日视图：顶上一行七天的日期条，左右滑换一周；下面是当天的时间网格，左右滑换一天。
- 点月份标题回到月视图，月视图每天只画几个小点，点一天回到那天的日视图。
- 长按空白处新建，长按日程拿起来挪；点日程从底部升起详情。

```swift
NavigationStack {
    VStack(spacing: 0) {
        WeekStrip(selection: $day)
        DayTimeline(day: day, events: events(on: day))
            .gesture(DragGesture().onEnded(changeDay))
    }
    .navigationTitle(day.formatted(.dateTime.month().year()))
    .toolbarTitleMenu { Button("月视图", action: showMonth) }
    .toolbar {
        Button("今天", action: goToToday)
        Button("新建", systemImage: "plus", action: newEvent)
    }
    .sheet(item: $openEvent) { EventDetail(event: $0).presentationDetents([.medium, .large]) }
}
```

当天的时间网格，顶上一行是这一周：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><span class="ex-ios-nav-title">2026年11月</span><button class="dn-icon-button" type="button" aria-label="新建"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button></div>
      <div class="dn-cal-strip"><span></span><span class="dn-cal-day">周一<b>16</b></span><span class="dn-cal-day">周二<b>17</b></span><span class="dn-cal-day">周三<b>18</b></span><span class="dn-cal-day is-today" aria-current="date">周四<b>19</b></span><span class="dn-cal-day">周五<b>20</b></span><span class="dn-cal-day is-weekend">周六<b>21</b></span><span class="dn-cal-day is-weekend">周日<b>22</b></span></div>
      <div class="dn-cal is-1">
        <div class="dn-cal-scroll">
          <div class="dn-cal-grid">
            <span class="dn-cal-col" style="grid-column: 2" aria-hidden="true"></span>
            <span class="dn-cal-hour" style="grid-row: 3">10:00</span>
            <span class="dn-cal-hour" style="grid-row: 5">11:00</span>
            <span class="dn-cal-hour" style="grid-row: 7">12:00</span>
            <span class="dn-cal-hour" style="grid-row: 9">13:00</span>
            <span class="dn-cal-hour" style="grid-row: 11">14:00</span>
            <span class="dn-cal-hour" style="grid-row: 13">15:00</span>
            <span class="dn-cal-hour" style="grid-row: 15">16:00</span>
            <span class="dn-cal-hour" style="grid-row: 17">17:00</span>
            <span class="dn-cal-hour" style="grid-row: 19">18:00</span>
            <a class="dn-cal-event is-past is-short" href="#" style="grid-column: 2; grid-row: 2 / 3"><b>站会</b><span>9:30</span></a>
            <a class="dn-cal-event is-start is-past" href="#" style="grid-column: 2; grid-row: 4 / 6"><b>发布评审</b><span>10:30</span></a>
            <a class="dn-cal-event is-end is-past" href="#" style="grid-column: 2; grid-row: 5 / 7"><b>客户电话</b><span>11:00</span></a>
            <a class="dn-cal-event is-quiet is-past" href="#" style="grid-column: 2; grid-row: 9 / 11"><b>午饭</b><span>13:00</span></a>
            <a class="dn-cal-event is-tentative" href="#" style="grid-column: 2; grid-row: 13 / 15"><b>一对一：沈遥</b><span>15:00</span></a>
            <a class="dn-cal-event" href="#" style="grid-column: 2; grid-row: 16 / 18"><b>整理评审意见</b><span>16:30</span></a>
            <span class="dn-cal-now" style="grid-column: 2; grid-row: 11; margin-top: 15px" aria-label="现在 14:20"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

日期条在网页的手机宽度里也用：

```css
.dn-cal-strip { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); border-bottom: var(--stroke-line) solid var(--line); }
.dn-cal-strip > span:empty { display: none; }
.dn-cal-strip > .dn-cal-day { flex-direction: column; gap: 2px; padding-inline: 0; }
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 这一周没有安排 | 网格照常画出来，不放插画、不写「享受空闲时光」 |
| 时间冲突 | 两个块并排；新建或挪动造成冲突时，浮层里一句「和“发布评审”重叠 30 分钟」，用 `warning` |
| 别人的日历只能看忙闲 | 块里只写「忙」，空心细框，点开没有详情 |
| 时区和日历不同 | 时刻列上方写「北京时间」；出差时可以并排显示两列时刻 |
| 同步失败 | 顶栏下一条[横幅](../../../deernova-style/references/components/banner.md)「工作日历 10 分钟没有同步」加「重试」，日程照常显示最后一次的结果 |
| 一天的事太多（月视图） | 每格最多三条，第四条写「还有 2 项」，点开看那一天 |

## 不要

- 每个日历一种颜色，满屏彩色块；用颜色表示会议类型。
- 现在这条线用红色，或者今天整列涂成高亮色。
- 日程块里写地点、参与人头像、会议链接图标。
- 重叠的日程互相盖住，或者把后来的那个藏起来。
- 新建日程必须打开整页表单，填完十几项才能保存。
- 过去的日程和将来的长得一样，看不出今天还剩什么。
