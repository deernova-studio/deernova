# AI 任务页

AI 自己动手做一件要花几分钟的事：改代码、整理一批文件、调研后写报告。和[AI 对话页](chat.md)不同，用户不是一句一句地聊，而是交代任务、看它做、在关键的地方拍板。这一页要回答三个问题：它在做什么、做到哪了、需要我做什么。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 任务名；运行时右边一个「停止」，任何时候一次点击就能停 | 是 |
| 过程 | 中间一栏：用户交代的任务，下面按时间排的思考和工具调用，每段收成一行灰字，点开再看 | 是 |
| 计划 | 右边面板的第一个标签：[任务清单](../../../deernova-style/references/components/task-list.md)，做完的打勾，当前这一步在转，失败的写原因 | 有多个步骤时 |
| 改动 | 右边面板的第二个标签：改过的文件和增删行数，点开看差异 | 有改动时 |
| 确认 | AI 要做有风险的事时，[权限确认](../../../deernova-style/references/components/approval.md)卡片停在过程的末尾，写清楚具体要运行什么 | 需要时 |
| 输入框 | 底部，任务运行时也能补充说明，补充的话在下一步生效 | 是 |
| 结果 | 做完后过程的末尾：一两句话说做成了什么、没做成什么，下面是改动清单和「全部撤销」 | 做完时 |

- **先给计划，再动手。** 开始前把计划列在右边面板里；用户可以改计划或直接让它开始。
- **进度写具体。** 「第 2 步，共 4 步：改写设计变量」，加已用时间；不用一个转了几分钟的圈代表一切。
- **只在有风险的地方停下来。** 运行会改动外部的命令、删除、发送、付费、推送才需要确认；读文件、运行测试不打扰。确认卡片写出将要运行的原样命令，给「允许一次」和「总是允许」两档。
- **可以离开。** 任务在后台继续；做完或等待确认时，侧边栏这条任务旁边出现圆点，并发一条[通知](../../../deernova-style/references/components/notification.md)。
- **结果可以撤销。** 文件改动列在结果里，能逐个看差异，也能一次全部撤销。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-agent { display: grid; grid-template-columns: minmax(0, 1fr) var(--pane-width); flex: 1; min-height: 0; }
.dn-agent-main { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
.dn-agent-scroll { flex: 1; min-height: 0; overflow-y: auto; scrollbar-gutter: stable both-edges; padding: var(--space-6) 0; }
.dn-agent-dock { padding-bottom: var(--space-4); }
.dn-agent-progress { display: flex; align-items: baseline; gap: var(--space-2); margin-left: var(--space-2); color: var(--ink-tertiary); font: var(--type-footnote); font-variant-numeric: tabular-nums; white-space: nowrap; }
.dn-agent .dn-panel-body { font: var(--type-callout); color: var(--ink); }
@media (max-width: 960px) {
  .dn-agent { grid-template-columns: minmax(0, 1fr); }
  .dn-agent > .dn-panel { display: none; }
}
```

计划在右边，过程收成几行灰字，有风险的那一步停下来等确认，写出原样命令；顶栏随时能停：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <h2 class="dn-toolbar-title"><span>给设置页加深色主题</span></h2>
      <span class="dn-agent-progress">第 3 步，共 4 步，已用 2 分 14 秒</span>
      <div class="dn-toolbar-actions"><button class="dn-button is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-stop"/></svg>停止</button></div>
    </header>
    <div class="dn-agent">
      <div class="dn-agent-main">
        <div class="dn-agent-scroll">
          <div class="dn-column dn-thread">
            <div class="dn-message-user">给设置页加深色主题，颜色全部用设计变量，改完跑一遍测试</div>
            <details class="dn-activity">
              <summary><svg class="dn-icon" aria-hidden="true"><use href="#dn-tool"/></svg>已读取 6 个文件，修改了 2 个<svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-right"/></svg></summary>
            </details>
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
        </div>
        <div class="dn-column dn-agent-dock">
          <div class="dn-composer">
            <textarea rows="1" aria-label="补充说明" placeholder="补充说明，下一步生效"></textarea>
            <button class="dn-send" type="button" aria-label="发送" disabled><svg class="dn-icon" aria-hidden="true"><use href="#dn-send"/></svg></button>
          </div>
        </div>
      </div>
      <aside class="dn-panel" aria-label="计划与改动">
        <div class="dn-panel-tabs" role="tablist">
          <button type="button" role="tab" aria-selected="true">计划</button>
          <button type="button" role="tab" aria-selected="false">改动 2</button>
        </div>
        <div class="dn-panel-body">
          <ul class="dn-task-list" aria-label="计划">
            <li class="dn-task is-done"><svg class="dn-task-glyph" aria-hidden="true"><use href="#dn-success"/></svg>找出设置页里写死的颜色</li>
            <li class="dn-task is-done"><svg class="dn-task-glyph" aria-hidden="true"><use href="#dn-success"/></svg>换成设计变量</li>
            <li class="dn-task" aria-current="step"><dn-loader name="spinner"></dn-loader>加上颜色检查</li>
            <li class="dn-task"><span class="dn-task-glyph" aria-hidden="true"></span>运行测试</li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 窄于 `breakpoint-md`：右边面板收起，顶栏多一个「计划」按钮，点开是从底部升起的[弹窗](../../../deernova-style/references/components/sheet.md)；过程里当前这一步始终显示在最下面。
- 确认卡片的按钮竖排，主按钮在最下面，贴着拇指。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 计划和改动放在 `.inspector` 里，标签切换；窗口变窄时 inspector 自动收起。
- 「停止」放在窗口工具栏，⌘. 也能停。
- 任务在后台继续；做完或等待确认时发系统通知，点通知回到这个任务；Dock 图标上显示等待确认的数量。

```swift
TaskRunView(task: task)
    .navigationTitle(task.title)
    .navigationSubtitle("第 \(task.step) 步，共 \(task.steps.count) 步")
    .toolbar { Button("停止", systemImage: "stop.fill", action: task.stop).keyboardShortcut(".") }
    .inspector(isPresented: $showsPlan) { PlanView(steps: task.steps) }
```

计划在右边的 inspector 里，「停止」在工具栏，任务名下面一行写进度：

```html
<div class="ex-mac has-inspector">
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div><span class="ex-mac-title">给设置页加深色主题</span><span class="dn-agent-progress">第 3 步，共 4 步</span><button class="dn-glass dn-glass-button" type="button" aria-label="停止"><svg class="dn-icon" aria-hidden="true"><use href="#dn-stop"/></svg></button></div>
    <div class="ex-mac-body">
      <div class="dn-thread">
        <details class="dn-activity"><summary><svg class="dn-icon" aria-hidden="true"><use href="#dn-tool"/></svg>已读取 6 个文件，修改了 2 个<svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-right"/></svg></summary></details>
        <div class="dn-approval" role="group" aria-labelledby="ex-mac-ap">
          <div class="dn-approval-head"><svg class="dn-icon" aria-hidden="true"><use href="#dn-terminal"/></svg><h3 class="dn-approval-title" id="ex-mac-ap">运行命令</h3><span class="dn-approval-status">等待你确认</span></div>
          <p class="dn-approval-body">会更新 package-lock.json。</p>
          <pre class="dn-approval-code">npm install --save-dev stylelint</pre>
          <div class="dn-approval-actions"><button class="dn-button is-plain" type="button">拒绝</button><button class="dn-button" type="button">总是允许 <span class="dn-approval-scope">本项目</span></button><button class="dn-button is-primary" type="button">允许一次</button></div>
        </div>
      </div>
    </div>
  </div>
  <aside class="ex-mac-inspector" aria-label="计划">
    <ul class="dn-task-list" aria-label="计划">
      <li class="dn-task is-done"><svg class="dn-task-glyph" aria-hidden="true"><use href="#dn-success"/></svg>找出设置页里写死的颜色</li>
      <li class="dn-task is-done"><svg class="dn-task-glyph" aria-hidden="true"><use href="#dn-success"/></svg>换成设计变量</li>
      <li class="dn-task" aria-current="step"><dn-loader name="spinner"></dn-loader>加上颜色检查</li>
      <li class="dn-task"><span class="dn-task-glyph" aria-hidden="true"></span>运行测试</li>
    </ul>
  </aside>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 计划收进顶栏的按钮，点开是从底部升起的 sheet；过程里当前这一步始终显示在最下面。
- 确认卡片的按钮竖排，主按钮在最下面，贴着拇指。
- 离开应用后任务继续，用通知或锁屏上的实时活动显示进度和等待确认。

```swift
TaskRunView(task: task)
    .navigationBarTitleDisplayMode(.inline)
    .toolbar { Button("计划", systemImage: "checklist") { showsPlan = true } }
    .sheet(isPresented: $showsPlan) { PlanView(steps: task.steps).presentationDetents([.medium, .large]) }
```

等待确认时卡片停在最下面，按钮竖排，主按钮在最下面：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-icon-button" type="button" aria-label="返回"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg></button><span class="ex-ios-nav-title">给设置页加深色主题</span><button class="dn-icon-button" type="button" aria-label="计划"><svg class="dn-icon" aria-hidden="true"><use href="#dn-list"/></svg></button></div>
      <details class="dn-activity"><summary><svg class="dn-icon" aria-hidden="true"><use href="#dn-tool"/></svg>已读取 6 个文件，修改了 2 个<svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-right"/></svg></summary></details>
      <div class="dn-approval" role="group" aria-labelledby="ex-ios-ap">
        <div class="dn-approval-head"><svg class="dn-icon" aria-hidden="true"><use href="#dn-terminal"/></svg><h3 class="dn-approval-title" id="ex-ios-ap">运行命令</h3><span class="dn-approval-status">等待你确认</span></div>
        <pre class="dn-approval-code">npm install --save-dev stylelint</pre>
        <div class="dn-approval-actions ex-stack-actions"><button class="dn-button is-plain" type="button">拒绝</button><button class="dn-button" type="button">总是允许</button><button class="dn-button is-primary" type="button">允许一次</button></div>
      </div>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 运行中 | 过程末尾一行「正在运行 npm test」加已用时间；计划里当前一步在转 |
| 等待确认 | 确认卡片停在末尾，顶栏任务名旁边写「等待你确认」，其他步骤不继续 |
| 一步失败 | 这一步写原因（「找不到 eslint 配置」），AI 决定跳过还是换方法，并在过程里说一句；不整体中断 |
| 用户停止 | 停在当前这一步，已做的改动保留，结果里列出来，给「继续」和「撤销已做的改动」 |
| 全部完成 | 结果段落加改动清单；计划全部打勾；侧边栏圆点消失 |

## 不要

- 只有一个转了几分钟的圈和「AI 正在努力工作中…」，看不出做到哪一步。
- 每读一个文件、每跑一次测试都弹确认，用户最后不看就点「允许」。
- 确认卡片只写「AI 想要执行一个操作」，不写原样的命令。
- 停止按钮藏在菜单里，或者只在某些步骤出现。
- 任务做完只说「完成了！」，不列改了哪些文件，也不能撤销。
- 用户离开这一页，任务就暂停或丢失。
