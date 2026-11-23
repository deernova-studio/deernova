# AI 任务页

AI 自己动手做一件要花几分钟的事：改代码、整理一批文件、调研后写报告。用户交代完就可以走开，回来时只需要看结果、在关键的地方拍板。这一页要回答三个问题：它在做什么、做到哪了、需要我做什么。

它和 [AI 对话页](chat.md) 用的组件差不多，页面的重心却完全不同：

| | AI 对话页 | AI 任务页 |
| --- | --- | --- |
| 主角 | 对话本身 | AI 做出来的东西：改动、文件、页面 |
| 用户在做什么 | 一来一回地问 | 交代、离开、回来拍板 |
| 同时有几个 | 一次一个 | 好几个一起跑，入口是任务列表 |
| 排法 | 对话居中，产物点开才在右边出现 | 左边窄栏是过程，右边宽的工作区一直开着 |

## 区块

任务页分两层：**任务列表**是入口，**任务详情**是其中一个任务。

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 新任务 | 任务列表顶上的输入框，交代一件新的事；发出后这件事出现在「进行中」的第一行 | 是 |
| 任务列表 | [单栏列表](list.md)，按「等你处理」「进行中」「已完成」分组；每行是状态图标、任务名，下面一行写卡在哪一步或做成了什么 | 是 |
| 顶栏 | 任务名、进度（「第 3 步，共 4 步，已用 2 分 14 秒」）；运行时右边一个「停止」，任何时候一次点击就能停 | 是 |
| 过程 | 详情页左边的窄栏：用户交代的话、[计划](../../../deernova-style/references/components/task-list.md)、按时间排的[步骤](../../../deernova-style/references/components/step-row.md)；每一步一行，点开再看 | 是 |
| 确认 | AI 要做有风险的事时，[权限确认](../../../deernova-style/references/components/approval.md)卡片停在过程的末尾，写清楚具体要运行什么 | 需要时 |
| 补充说明 | 过程栏底部的输入框，运行时也能补充，补充的话在下一步生效 | 是 |
| 工作区 | 详情页右边，占大部分宽度：「改动」列出改过的文件，下面是当前文件的差异；「预览」是做出来的页面或文档；「终端」是命令输出。右上角「全部撤销」 | 是 |

- **工作区是主角。** 用户来详情页是为了看 AI 做出了什么，所以工作区占大部分宽度并且一直开着；过程是旁边的一栏日志，不是居中的对话。
- **先给计划，再动手。** 开始前把计划列在过程栏的最上面；用户可以改计划或直接让它开始。
- **颜色只跟着状态走。** 进行中的任务和当前这一步用朱砂的加载动画，等你处理的用 `warning` 的图标，完成的用 `success` 的勾；列表里一眼看得出哪几个还在跑、哪几个在等你。
- **进度写具体。** 「第 2 步，共 4 步：改写设计变量」，加已用时间；不用一个转了几分钟的圈代表一切。
- **只在有风险的地方停下来。** 运行会改动外部的命令、删除、发送、付费、推送才需要确认；读文件、运行测试不打扰。确认卡片写出将要运行的原样命令，给「允许一次」和「总是允许」两档。
- **可以离开。** 任务在后台继续；等待确认的任务排到列表最上面，并发一条[通知](../../../deernova-style/references/components/notification.md)。
- **结果可以撤销。** 改动能逐个看差异，也能一次全部撤销。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-agent-home { max-width: var(--content-max); margin-inline: auto; }
.dn-agent-home > .dn-composer { margin-bottom: var(--space-4); }
.dn-agent-state { flex: none; width: var(--icon-size-md); height: var(--icon-size-md); margin-top: calc((var(--type-body-line) - var(--icon-size-md)) / 2); color: var(--ink-tertiary); }
.dn-agent-state.is-waiting { color: var(--warning); }
.dn-agent-state.is-done { color: var(--success); }
dn-loader.dn-agent-state { --loader-size: var(--icon-size-md); color: var(--brand); }
.dn-agent-progress { display: flex; align-items: baseline; gap: var(--space-2); margin-left: var(--space-2); color: var(--ink-tertiary); font: var(--type-footnote); font-variant-numeric: tabular-nums; white-space: nowrap; }
.dn-agent { display: grid; grid-template-columns: minmax(300px, 380px) minmax(0, 1fr); flex: 1; min-height: 0; }
.dn-agent-log { display: flex; flex-direction: column; min-width: 0; min-height: 0; border-right: var(--stroke-line) solid var(--line); }
.dn-agent-scroll { display: flex; flex: 1; flex-direction: column; gap: var(--space-3); min-height: 0; overflow-y: auto; padding: var(--space-4); }
.dn-agent-dock { padding: 0 var(--space-4) var(--space-4); }
.dn-agent-work { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
.dn-agent-work-body { flex: 1; min-height: 0; overflow: auto; padding: var(--space-3) var(--space-4); }
.dn-agent-work-body > .dn-changes { margin: 0 0 var(--space-3); }
.dn-change[aria-current="true"] { background: var(--fill-selected); }
@media (max-width: 960px) {
  .dn-agent { grid-template-columns: minmax(0, 1fr); }
  .dn-agent-work { display: none; }
}
```

任务列表：顶上交代新任务，下面按「等你处理」「进行中」「已完成」分组，每行第二行写卡在哪里或做成了什么：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar"><h2 class="dn-toolbar-title"><span>任务</span></h2></header>
    <div class="dn-app-content">
      <div class="dn-agent-home">
        <div class="dn-composer">
          <textarea rows="2" aria-label="新任务" placeholder="交代一件事，比如：把设置页的颜色换成设计变量"></textarea>
          <button class="dn-send" type="button" aria-label="开始" disabled><svg class="dn-icon" aria-hidden="true"><use href="#dn-send"/></svg></button>
        </div>
        <ul class="dn-rows">
          <li class="dn-rows-group">等你处理</li>
          <li class="dn-rows-item"><svg class="dn-icon dn-agent-state is-waiting" aria-label="等你确认"><use href="#dn-waiting"/></svg><a class="dn-rows-text" href="#"><span class="dn-rows-title">给设置页加深色主题</span><span class="dn-rows-detail">等你确认：npm install --save-dev stylelint</span></a><span class="dn-rows-meta">2 分钟前</span></li>
          <li class="dn-rows-item"><svg class="dn-icon dn-agent-state is-waiting" aria-label="等你确认"><use href="#dn-waiting"/></svg><a class="dn-rows-text" href="#"><span class="dn-rows-title">整理 10 月的发票</span><span class="dn-rows-detail">等你确认：把汇总表发给财务</span></a><span class="dn-rows-meta">15 分钟前</span></li>
          <li class="dn-rows-group">进行中</li>
          <li class="dn-rows-item"><dn-loader class="dn-agent-state" name="spinner" aria-label="进行中"></dn-loader><a class="dn-rows-text" href="#"><span class="dn-rows-title">调研三家竞品的定价</span><span class="dn-rows-detail">第 2 步，共 5 步：读取官网定价页</span></a><span class="dn-rows-meta">已用 6 分钟</span></li>
          <li class="dn-rows-group">已完成</li>
          <li class="dn-rows-item"><svg class="dn-icon dn-agent-state is-done" aria-label="已完成"><use href="#dn-success"/></svg><a class="dn-rows-text" href="#"><span class="dn-rows-title">修复支付超时</span><span class="dn-rows-detail">改了 3 个文件，测试全部通过</span></a><span class="dn-rows-meta">10:42</span></li>
          <li class="dn-rows-item"><svg class="dn-icon dn-agent-state is-done" aria-label="已完成"><use href="#dn-success"/></svg><a class="dn-rows-text" href="#"><span class="dn-rows-title">第三季度经营分析</span><span class="dn-rows-detail">写好了一份 3 页的报告</span></a><span class="dn-rows-meta">09:15</span></li>
        </ul>
      </div>
    </div>
  </div>
</div>
```

任务详情：左边窄栏是过程，停在等待确认的那一步；右边是工作区，打开着它刚改的文件：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <button class="dn-button is-plain" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg>任务</button>
      <h2 class="dn-toolbar-title"><span>给设置页加深色主题</span></h2>
      <span class="dn-agent-progress">第 3 步，共 4 步，已用 2 分 14 秒</span>
      <div class="dn-toolbar-actions"><button class="dn-button" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-stop"/></svg>停止</button></div>
    </header>
    <div class="dn-agent">
      <div class="dn-agent-log">
        <div class="dn-agent-scroll">
          <div class="dn-message-user">给设置页加深色主题，颜色全部用设计变量，改完跑一遍测试</div>
          <ul class="dn-task-list" aria-label="计划">
            <li class="dn-task is-done"><svg class="dn-task-glyph" aria-hidden="true"><use href="#dn-success"/></svg>找出设置页里写死的颜色</li>
            <li class="dn-task is-done"><svg class="dn-task-glyph" aria-hidden="true"><use href="#dn-success"/></svg>换成设计变量</li>
            <li class="dn-task" aria-current="step"><dn-loader name="spinner"></dn-loader>加上颜色检查</li>
            <li class="dn-task"><span class="dn-task-glyph" aria-hidden="true"></span>运行测试</li>
          </ul>
          <div class="dn-steps">
            <div class="dn-step is-success"><svg class="dn-icon dn-step-glyph" aria-hidden="true"><use href="#dn-success"/></svg><span class="dn-step-name">修改</span><span class="dn-step-summary">settings.css</span><span class="dn-step-meta">+18 −12</span></div>
            <div class="dn-step is-success"><svg class="dn-icon dn-step-glyph" aria-hidden="true"><use href="#dn-success"/></svg><span class="dn-step-name">修改</span><span class="dn-step-summary">tokens.css</span><span class="dn-step-meta">+4</span></div>
          </div>
          <div class="dn-approval" role="group" aria-labelledby="ex-agent-ap">
            <div class="dn-approval-head"><svg class="dn-icon" aria-hidden="true"><use href="#dn-terminal"/></svg><h3 class="dn-approval-title" id="ex-agent-ap">运行命令</h3><span class="dn-approval-status">等待你确认</span></div>
            <p class="dn-approval-body">会更新 package-lock.json。</p>
            <pre class="dn-approval-code">npm install --save-dev stylelint</pre>
            <div class="dn-approval-actions">
              <button class="dn-button is-plain" type="button">拒绝</button>
              <button class="dn-button" type="button">总是允许 <span class="dn-approval-scope">本项目</span></button>
              <button class="dn-button is-primary" type="button">允许一次</button>
            </div>
          </div>
        </div>
        <div class="dn-agent-dock">
          <div class="dn-composer">
            <textarea rows="1" aria-label="补充说明" placeholder="补充说明，下一步生效"></textarea>
            <button class="dn-send" type="button" aria-label="发送" disabled><svg class="dn-icon" aria-hidden="true"><use href="#dn-send"/></svg></button>
          </div>
        </div>
      </div>
      <section class="dn-agent-work" aria-label="工作区">
        <div class="dn-panel-tabs" role="tablist">
          <button type="button" role="tab" aria-selected="true" id="ex-task-changes-tab" aria-controls="ex-task-changes-tab-panel">改动 2</button>
          <button type="button" role="tab" aria-selected="false">预览</button>
          <button type="button" role="tab" aria-selected="false">终端</button>
          <div class="dn-panel-actions"><button class="dn-button is-plain" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-undo"/></svg>全部撤销</button></div>
        </div>
        <div role="tabpanel" id="ex-task-changes-tab-panel" aria-labelledby="ex-task-changes-tab" class="dn-agent-work-body">
          <ul class="dn-changes">
            <li class="dn-change" aria-current="true"><svg class="dn-icon" aria-hidden="true"><use href="#dn-file"/></svg><span class="dn-change-path">src/settings/settings.css</span><span class="dn-approval-total"><span class="dn-diff-add">+18</span><span class="dn-diff-del">−12</span></span></li>
            <li class="dn-change"><svg class="dn-icon" aria-hidden="true"><use href="#dn-file"/></svg><span class="dn-change-path">src/styles/tokens.css</span><span class="dn-approval-total"><span class="dn-diff-add">+4</span></span></li>
          </ul>
          <div class="dn-diff">
            <div class="dn-diff-line"><span>24</span><span> </span><span>.settings-row {</span></div>
            <div class="dn-diff-line is-del"><span>25</span><span>−</span><span>  background: #ffffff;</span></div>
            <div class="dn-diff-line is-del"><span>26</span><span>−</span><span>  color: #1c1c1c;</span></div>
            <div class="dn-diff-line is-add"><span>25</span><span>+</span><span>  background: var(--surface);</span></div>
            <div class="dn-diff-line is-add"><span>26</span><span>+</span><span>  color: var(--ink);</span></div>
            <div class="dn-diff-line"><span>27</span><span> </span><span>}</span></div>
            <div class="dn-diff-fold">展开 40 行未修改</div>
            <div class="dn-diff-line"><span>68</span><span> </span><span>.settings-hint {</span></div>
            <div class="dn-diff-line is-del"><span>69</span><span>−</span><span>  color: #8a8a8a;</span></div>
            <div class="dn-diff-line is-add"><span>69</span><span>+</span><span>  color: var(--ink-tertiary);</span></div>
            <div class="dn-diff-line"><span>70</span><span> </span><span>}</span></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 任务列表照常一栏，新任务的输入框留在最上面。
- 任务详情窄于 `breakpoint-md`：工作区收起，顶栏多一个「改动」按钮，点开是全屏的改动页；过程里当前这一步始终显示在最下面。
- 确认卡片的按钮竖排，主按钮在最下面，贴着拇指。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 三栏的 `NavigationSplitView`：侧边栏是任务列表，中间是过程，右边是工作区。任务列表在侧边栏里，切换任务不用回到上一层。
- 工作区的「改动 / 预览 / 终端」用工具栏里的分段控件切换；「停止」也在工具栏，⌘. 也能停。
- 任务在后台继续；等待确认时发系统通知，点通知回到这个任务；Dock 图标上显示等待确认的数量。

```swift
NavigationSplitView {
    List(tasks, selection: $selected) { TaskRow(task: $0) }        // 状态图标、任务名、卡在哪一步
        .toolbar { Button("新任务", systemImage: "plus", action: newTask) }
} content: {
    TaskLog(task: selected)                                     // 交代的话、计划、步骤、确认卡片
        .safeAreaInset(edge: .bottom) { Composer(prompt: "补充说明，下一步生效") }
} detail: {
    Workspace(task: selected, tab: tab)                         // 改动、预览、终端
        .toolbar {
            Picker("工作区", selection: $tab) {
                Text("改动").tag(WorkspaceTab.changes)
                Text("预览").tag(WorkspaceTab.preview)
                Text("终端").tag(WorkspaceTab.terminal)
            }
            .pickerStyle(.segmented)
            Button("停止", systemImage: "stop.fill", action: selected.stop).keyboardShortcut(".")
        }
}
```

侧边栏是任务，中间一栏是过程，右边的工作区打开着刚改的文件：

```html
<div class="ex-mac has-list has-log">
  <nav class="ex-mac-sidebar" aria-label="任务">
    <div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div>
    <p class="dn-sidebar-heading">等你处理</p>
    <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-waiting"/></svg><span class="dn-sidebar-label">给设置页加深色主题</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-waiting"/></svg><span class="dn-sidebar-label">整理 10 月的发票</span></a>
    <p class="dn-sidebar-heading">进行中</p>
    <a class="dn-sidebar-item" href="#"><dn-loader class="dn-agent-state" name="spinner"></dn-loader><span class="dn-sidebar-label">调研三家竞品的定价</span></a>
    <p class="dn-sidebar-heading">已完成</p>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-success"/></svg><span class="dn-sidebar-label">修复支付超时</span></a>
  </nav>
  <div class="ex-mac-col">
    <div class="dn-steps">
      <div class="dn-step is-success"><svg class="dn-icon dn-step-glyph" aria-hidden="true"><use href="#dn-success"/></svg><span class="dn-step-name">读取</span><span class="dn-step-summary">6 个文件</span></div>
      <div class="dn-step is-success"><svg class="dn-icon dn-step-glyph" aria-hidden="true"><use href="#dn-success"/></svg><span class="dn-step-name">修改</span><span class="dn-step-summary">settings.css</span><span class="dn-step-meta">+18 −12</span></div>
      <div class="dn-step is-success"><svg class="dn-icon dn-step-glyph" aria-hidden="true"><use href="#dn-success"/></svg><span class="dn-step-name">修改</span><span class="dn-step-summary">tokens.css</span><span class="dn-step-meta">+4</span></div>
    </div>
    <div class="dn-approval" role="group" aria-labelledby="ex-mac-ap">
      <div class="dn-approval-head"><svg class="dn-icon" aria-hidden="true"><use href="#dn-terminal"/></svg><h3 class="dn-approval-title" id="ex-mac-ap">运行命令</h3></div>
      <pre class="dn-approval-code">npm install -D stylelint</pre>
      <div class="dn-approval-actions"><button class="dn-button is-plain" type="button">拒绝</button><button class="dn-button is-primary" type="button">允许一次</button></div>
    </div>
  </div>
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><span class="ex-mac-title">给设置页加深色主题</span><div class="dn-segmented" role="group" aria-label="工作区"><button type="button" aria-pressed="true">改动</button><button type="button" aria-pressed="false">预览</button><button type="button" aria-pressed="false">终端</button></div><button class="dn-glass dn-glass-button" type="button" aria-label="停止"><svg class="dn-icon" aria-hidden="true"><use href="#dn-stop"/></svg></button></div>
    <div class="ex-mac-body">
      <ul class="dn-changes">
        <li class="dn-change" aria-current="true"><svg class="dn-icon" aria-hidden="true"><use href="#dn-file"/></svg><span class="dn-change-path">settings.css</span><span class="dn-approval-total"><span class="dn-diff-add">+18</span><span class="dn-diff-del">−12</span></span></li>
        <li class="dn-change"><svg class="dn-icon" aria-hidden="true"><use href="#dn-file"/></svg><span class="dn-change-path">tokens.css</span><span class="dn-approval-total"><span class="dn-diff-add">+4</span></span></li>
      </ul>
      <div class="dn-diff">
        <div class="dn-diff-line"><span>24</span><span> </span><span>.settings-row {</span></div>
        <div class="dn-diff-line is-del"><span>25</span><span>−</span><span>  background: #ffffff;</span></div>
        <div class="dn-diff-line is-add"><span>25</span><span>+</span><span>  background: var(--surface);</span></div>
        <div class="dn-diff-line"><span>26</span><span> </span><span>}</span></div>
      </div>
    </div>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 第一层是任务列表，等你处理的排在最上面；新任务的输入框浮在底部。
- 任务详情顶上用分段控件在「过程」和「改动」之间切换；等待确认时打开就停在过程的确认卡片上。
- 确认卡片的按钮竖排，主按钮在最下面，贴着拇指。
- 离开应用后任务继续，用通知或锁屏上的实时活动显示进度和等待确认。

```swift
NavigationStack {
    List {
        Section("等你处理") { ForEach(waiting) { TaskRow(task: $0) } }
        Section("进行中") { ForEach(running) { TaskRow(task: $0) } }
        Section("已完成") { ForEach(done) { TaskRow(task: $0) } }
    }
    .navigationTitle("任务")
    .safeAreaInset(edge: .bottom) { Composer(prompt: "交代一件事") }
    .navigationDestination(for: AgentTask.self) { task in
        TaskDetail(task: task)            // 顶上分段控件：过程、改动
            .toolbar { Button("停止", systemImage: "stop.fill", action: task.stop) }
    }
}
```

任务列表：等你处理的排在最上面，每行写卡在哪里；新任务的输入框浮在底部：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"></div>
      <h3 class="ex-ios-large">任务</h3>
      <ul class="dn-rows">
        <li class="dn-rows-group">等你处理</li>
        <li class="dn-rows-item"><svg class="dn-icon dn-agent-state is-waiting" aria-label="等你确认"><use href="#dn-waiting"/></svg><a class="dn-rows-text" href="#"><span class="dn-rows-title">给设置页加深色主题</span><span class="dn-rows-detail">等你确认：安装 stylelint</span></a></li>
        <li class="dn-rows-group">进行中</li>
        <li class="dn-rows-item"><dn-loader class="dn-agent-state" name="spinner" aria-label="进行中"></dn-loader><a class="dn-rows-text" href="#"><span class="dn-rows-title">调研三家竞品的定价</span><span class="dn-rows-detail">第 2 步，共 5 步</span></a></li>
        <li class="dn-rows-group">已完成</li>
        <li class="dn-rows-item"><svg class="dn-icon dn-agent-state is-done" aria-label="已完成"><use href="#dn-success"/></svg><a class="dn-rows-text" href="#"><span class="dn-rows-title">修复支付超时</span><span class="dn-rows-detail">改了 3 个文件</span></a></li>
      </ul>
    </div>
    <div class="ex-ios-dock"><div class="dn-composer"><textarea rows="1" aria-label="新任务" placeholder="交代一件事"></textarea><button class="dn-send" type="button" aria-label="开始" disabled><svg class="dn-icon" aria-hidden="true"><use href="#dn-send"/></svg></button></div></div>
  </div>
</div>
```

任务详情：顶上切换过程和改动，确认卡片的按钮竖排，主按钮在最下面：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg>任务</button><button class="dn-icon-button" type="button" aria-label="停止"><svg class="dn-icon" aria-hidden="true"><use href="#dn-stop"/></svg></button></div>
      <div class="dn-segmented" role="group" aria-label="视图"><button type="button" aria-pressed="true">过程</button><button type="button" aria-pressed="false">改动 2</button></div>
      <div class="dn-steps">
        <div class="dn-step is-success"><svg class="dn-icon dn-step-glyph" aria-hidden="true"><use href="#dn-success"/></svg><span class="dn-step-name">修改</span><span class="dn-step-summary">settings.css</span><span class="dn-step-meta">+18 −12</span></div>
        <div class="dn-step is-success"><svg class="dn-icon dn-step-glyph" aria-hidden="true"><use href="#dn-success"/></svg><span class="dn-step-name">修改</span><span class="dn-step-summary">tokens.css</span><span class="dn-step-meta">+4</span></div>
      </div>
      <div class="dn-approval" role="group" aria-labelledby="ex-ios-ap">
        <div class="dn-approval-head"><svg class="dn-icon" aria-hidden="true"><use href="#dn-terminal"/></svg><h3 class="dn-approval-title" id="ex-ios-ap">运行命令</h3><span class="dn-approval-status">等待你确认</span></div>
        <pre class="dn-approval-code">npm install --save-dev stylelint</pre>
        <div class="dn-approval-actions ex-stack-actions"><button class="dn-button is-plain" type="button">拒绝</button><button class="dn-button" type="button">总是允许 <span class="dn-approval-scope">本项目</span></button><button class="dn-button is-primary" type="button">允许一次</button></div>
      </div>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 运行中 | 过程末尾一行「正在运行 npm test」加已用时间；计划里当前一步在转 |
| 等待确认 | 确认卡片停在过程末尾，其他步骤不继续；这个任务移到列表的「等你处理」，第二行写要确认什么 |
| 一步失败 | 这一步写原因（「找不到 eslint 配置」），AI 决定跳过还是换方法，并在过程里说一句；不整体中断 |
| 用户停止 | 停在当前这一步，已做的改动保留，结果里列出来，给「继续」和「撤销已做的改动」 |
| 全部完成 | 过程末尾一两句话说做成了什么、没做成什么；计划全部打勾；工作区停在改动上；列表里移到「已完成」 |

## 不要

- 把任务页做成对话页：对话居中，做出来的东西藏在要点开的面板里。
- 只有一个转了几分钟的圈和「AI 正在努力工作中…」，看不出做到哪一步。
- 每读一个文件、每跑一次测试都弹确认，用户最后不看就点「允许」。
- 确认卡片只写「AI 想要执行一个操作」，不写原样的命令。
- 停止按钮藏在菜单里，或者只在某些步骤出现。
- 任务做完只说「完成了！」，不列改了哪些文件，也不能撤销。
- 用户离开这一页，任务就暂停或丢失。
