# 智能体列表

用户有好几个智能体：周报助手、代码审查、客服回复、发票整理。这一页是它们的总入口，用户在这里找到一个去用，看哪个在忙、哪个出了问题，也在这里新建一个或复制一个。用一个智能体的页面是 [AI 对话页](chat.md) 或 [AI 任务页](task.md)，改它的页面是[智能体配置](agent-settings.md)。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 「智能体」、新建；新建打开[智能体配置](agent-settings.md)的空白草稿 | 是 |
| 筛选行 | 搜索、范围（我的、团队共享）、排序（最近使用） | 多于一屏时 |
| 列表 | [表格](../../../deernova-style/references/components/table.md)：智能体（标记、名字、一句话说明）、状态、模型、30 天对话、最近使用 | 是 |
| 状态 | 空闲时不写；只写要人注意的：「运行中 2」「等你确认 1」「出错」，出错的写原因 | 是 |
| 行尾操作 | 「设置」，和「更多」：复制、停用、删除 | 是 |
| 从模板开始 | 智能体少于三个时，列表下面三四个模板，点一个打开预先填好的草稿 | 新用户时 |

- **点名字是去用它，设置在行尾。** 用的次数远多于改的次数。点名字打开它的对话或任务；「设置」打开配置页。
- **用表格，不用卡片。** 智能体之间要比较模型、用了多少、多久没用，这是表格的事。卡片网格适合挑模板，不适合管理自己的十几个智能体。
- **标记是一个字或一个线性图标。** 黑白，和名字一起出现；不用 AI 生成的头像、渐变色块、拟人表情。
- **名字写它做什么。** 「周报助手」「代码审查」，不起人名；说明一句话写它做什么、读什么：「每周五读本周的笔记和日程，起草周报」。
- **运行中用朱砂，问题用状态色。** 「运行中」前面一个朱砂的加载动画，不放进标签；「等你确认」用 `warning` 标签，「出错」用 `danger` 标签。
- **状态只写要人注意的。** 空闲的行不放「空闲」标签，不然满屏标签，真正出错的那个反而看不见。等你确认的智能体排在最前面。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-agents { display: grid; align-content: start; gap: var(--space-2); width: 100%; max-width: var(--wide-max); margin-inline: auto; }
.dn-agents .dn-table-bar > .dn-input-group { width: min(100%, 320px); }
.dn-agents .dn-table td { height: calc(var(--table-row-height) + var(--space-5)); }
.dn-agents .dn-table-cell { gap: var(--space-3); max-width: 440px; }
.dn-agent-mark { display: grid; place-items: center; flex: none; width: var(--button-height-md); height: var(--button-height-md); border: var(--stroke-line) solid var(--line); border-radius: var(--radius-sm); background: var(--surface); color: var(--ink); font: var(--weight-semibold) var(--type-callout-size)/1 var(--font-sans); }
.dn-agent-mark > .dn-icon { width: var(--icon-size-md); height: var(--icon-size-md); }
.dn-agent-name { display: grid; gap: 2px; min-width: 0; }
.dn-agent-name > a { overflow: hidden; color: var(--ink); font-weight: var(--weight-medium); text-decoration: none; text-overflow: ellipsis; }
.dn-agent-name > span { overflow: hidden; color: var(--ink-tertiary); font: var(--type-footnote); text-overflow: ellipsis; }
.dn-rows-item > .dn-agent-mark { align-self: center; }
.dn-agent-running { display: inline-flex; align-items: center; gap: var(--space-1); color: var(--ink-secondary); white-space: nowrap; }
.dn-agent-running > dn-loader { --loader-size: var(--icon-size-sm); color: var(--brand); }
.dn-agents tr.is-off :is(.dn-agent-mark, .dn-agent-name) { opacity: 0.5; }
```

等你确认的排在最前，空闲的不写状态，出错的写原因；点名字去用，行尾是设置：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <h2 class="dn-toolbar-title"><span>智能体</span></h2>
      <div class="dn-toolbar-actions"><button class="dn-button is-primary is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg>新建</button></div>
    </header>
    <div class="dn-app-content">
      <div class="dn-agents">
        <div class="dn-table-bar">
          <label class="dn-input-group"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><input type="search" placeholder="搜索智能体" aria-label="搜索智能体"></label>
          <div class="dn-segmented" role="group" aria-label="范围"><button type="button" aria-pressed="true">我的</button><button type="button" aria-pressed="false">团队共享</button></div>
        </div>
        <div class="dn-table-wrap">
          <table class="dn-table">
            <thead><tr>
              <th scope="col">智能体</th>
              <th scope="col">状态</th>
              <th scope="col">模型</th>
              <th class="is-number" scope="col">30 天对话</th>
              <th scope="col" aria-sort="descending"><button class="dn-sort" type="button">最近使用<svg class="dn-icon" aria-hidden="true"><use href="#dn-arrow-down"/></svg></button></th>
              <th class="is-actions" scope="col"><span class="sr-only">操作</span></th>
            </tr></thead>
            <tbody>
              <tr>
                <td class="is-primary"><span class="dn-table-cell"><span class="dn-agent-mark" aria-hidden="true">票</span><span class="dn-agent-name"><a href="#">发票整理</a><span>读邮箱里的发票，按月汇总成表格</span></span></span></td>
                <td><span class="dn-tag is-warning"><span class="dn-dot"></span>等你确认 1</span></td>
                <td>标准</td><td class="is-number">64</td><td>15 分钟前</td>
                <td class="is-actions"><span class="dn-table-cell"><button class="dn-button is-plain is-sm" type="button">设置</button><button class="dn-icon-button" type="button" aria-label="更多操作"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></span></td>
              </tr>
              <tr>
                <td class="is-primary"><span class="dn-table-cell"><span class="dn-agent-mark" aria-hidden="true"><svg class="dn-icon"><use href="#dn-code"/></svg></span><span class="dn-agent-name"><a href="#">代码审查</a><span>看每个合并请求，指出可能出错的地方</span></span></span></td>
                <td><span class="dn-agent-running"><dn-loader name="spinner"></dn-loader>运行中 2</span></td>
                <td>深度</td><td class="is-number">312</td><td>刚刚</td>
                <td class="is-actions"><span class="dn-table-cell"><button class="dn-button is-plain is-sm" type="button">设置</button><button class="dn-icon-button" type="button" aria-label="更多操作"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></span></td>
              </tr>
              <tr>
                <td class="is-primary"><span class="dn-table-cell"><span class="dn-agent-mark" aria-hidden="true">周</span><span class="dn-agent-name"><a href="#">周报助手</a><span>每周五读本周的笔记和日程，起草周报</span></span></span></td>
                <td></td>
                <td>标准</td><td class="is-number">26</td><td>周五</td>
                <td class="is-actions"><span class="dn-table-cell"><button class="dn-button is-plain is-sm" type="button">设置</button><button class="dn-icon-button" type="button" aria-label="更多操作"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></span></td>
              </tr>
              <tr>
                <td class="is-primary"><span class="dn-table-cell"><span class="dn-agent-mark" aria-hidden="true"><svg class="dn-icon"><use href="#dn-mail"/></svg></span><span class="dn-agent-name"><a href="#">客服回复</a><span>按帮助中心的文档起草回复，发送前给人看</span></span></span></td>
                <td><span class="dn-tag is-danger"><span class="dn-dot"></span>出错：帮助中心连不上</span></td>
                <td>快速</td><td class="is-number">1,208</td><td>昨天</td>
                <td class="is-actions"><span class="dn-table-cell"><button class="dn-button is-plain is-sm" type="button">设置</button><button class="dn-icon-button" type="button" aria-label="更多操作"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></span></td>
              </tr>
              <tr class="is-off">
                <td class="is-primary"><span class="dn-table-cell"><span class="dn-agent-mark" aria-hidden="true">研</span><span class="dn-agent-name"><a href="#">竞品调研</a><span>已停用</span></span></span></td>
                <td></td>
                <td>深度</td><td class="is-number">0</td><td>10月3日</td>
                <td class="is-actions"><span class="dn-table-cell"><button class="dn-button is-plain is-sm" type="button">设置</button><button class="dn-icon-button" type="button" aria-label="更多操作"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 表格换成一行一个智能体的列表：标记、名字和说明；状态写在说明的位置，有状态时替换说明。模型和次数不显示。
- 「设置」收进行尾的「更多」。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 智能体同时出现在侧边栏，常用的几个固定在上面，点一下就开始用；有等你确认的，名字后面显示数字。
- 侧边栏最上面的「全部智能体」打开这一页，用 `Table`，列可以排序、可以拖宽。
- 双击一行开始用；⌘I 或「设置」打开配置；右键菜单里有复制、停用、删除。

```swift
NavigationSplitView {
    List(selection: $selection) {
        Label("全部智能体", systemImage: "square.grid.2x2").tag(Destination.allAgents)
        Section("智能体") {
            ForEach(pinnedAgents) { agent in
                Label { Text(agent.name) } icon: { AgentMark(agent) }
                    .badge(agent.waitingCount)
                    .tag(Destination.agent(agent.id))
            }
        }
    }
} detail: {
    Table(agents, selection: $selectedAgent, sortOrder: $sortOrder) {
        TableColumn("智能体") { AgentNameCell(agent: $0) }
        TableColumn("状态") { AgentStatus(agent: $0) }
        TableColumn("模型", value: \.modelName)
        TableColumn("30 天对话", value: \.conversationCount) { Text($0.conversationCount, format: .number) }
        TableColumn("最近使用", value: \.lastUsed) { Text($0.lastUsed, format: .relative(presentation: .named)) }
    }
    .contextMenu(forSelectionType: Agent.ID.self) { ids in AgentActions(ids: ids) } primaryAction: { ids in open(ids) }
    .toolbar { Button("新建", systemImage: "plus", action: newAgent) }
}
```

侧边栏里是常用的智能体，「全部智能体」是一张可以排序的表：

```html
<div class="ex-mac">
  <nav class="ex-mac-sidebar" aria-label="智能体">
    <div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div>
    <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-table"/></svg><span class="dn-sidebar-label">全部智能体</span></a>
    <p class="dn-sidebar-heading">智能体</p>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-file"/></svg><span class="dn-sidebar-label">发票整理</span><span class="dn-sidebar-count">1</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-code"/></svg><span class="dn-sidebar-label">代码审查</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span class="dn-sidebar-label">周报助手</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-mail"/></svg><span class="dn-sidebar-label">客服回复</span></a>
  </nav>
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><span class="ex-mac-title">全部智能体</span><button class="dn-glass dn-glass-button" type="button" aria-label="新建"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button></div>
    <div class="ex-mac-body">
      <div class="dn-agents"><table class="dn-table">
        <thead><tr><th scope="col">智能体</th><th scope="col">状态</th><th class="is-number" scope="col">30 天对话</th></tr></thead>
        <tbody>
          <tr><td class="is-primary"><span class="dn-table-cell"><span class="dn-agent-mark" aria-hidden="true">票</span><span class="dn-agent-name"><a href="#">发票整理</a><span>按月汇总发票</span></span></span></td><td><span class="dn-tag is-warning"><span class="dn-dot"></span>等你确认 1</span></td><td class="is-number">64</td></tr>
          <tr aria-selected="true"><td class="is-primary"><span class="dn-table-cell"><span class="dn-agent-mark" aria-hidden="true"><svg class="dn-icon"><use href="#dn-code"/></svg></span><span class="dn-agent-name"><a href="#">代码审查</a><span>看每个合并请求</span></span></span></td><td><span class="dn-agent-running"><dn-loader name="spinner"></dn-loader>运行中 2</span></td><td class="is-number">312</td></tr>
          <tr><td class="is-primary"><span class="dn-table-cell"><span class="dn-agent-mark" aria-hidden="true">周</span><span class="dn-agent-name"><a href="#">周报助手</a><span>每周五起草周报</span></span></span></td><td></td><td class="is-number">26</td></tr>
          <tr><td class="is-primary"><span class="dn-table-cell"><span class="dn-agent-mark" aria-hidden="true"><svg class="dn-icon"><use href="#dn-mail"/></svg></span><span class="dn-agent-name"><a href="#">客服回复</a><span>帮助中心连不上</span></span></span></td><td><span class="dn-tag is-danger"><span class="dn-dot"></span>出错</span></td><td class="is-number">1,208</td></tr>
        </tbody>
      </table></div>
    </div>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 一行一个智能体：标记、名字，下面一行是说明；有状态时状态替换说明。模型和次数不显示，进了设置再看。
- 点一行开始用；左滑是「设置」和「停用」，删除在设置页的最后。
- 新建在右上角；搜索在下拉时出现。

```swift
NavigationStack {
    List(agents) { agent in
        NavigationLink(value: agent) {
            HStack(alignment: .firstTextBaseline, spacing: Deernova.space3) {
                AgentMark(agent)
                VStack(alignment: .leading) {
                    Text(agent.name)
                    Text(agent.statusText ?? agent.summary).font(.footnote).foregroundStyle(.secondary)
                }
            }
        }
        .swipeActions { Button("设置", systemImage: "slider.horizontal.3") { edit(agent) } }
    }
    .navigationTitle("智能体")
    .searchable(text: $query)
    .toolbar { Button("新建", systemImage: "plus", action: newAgent) }
}
```

有状态的智能体用状态替换说明，等你确认的排在最上面：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><span></span><button class="dn-icon-button" type="button" aria-label="新建"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button></div>
      <h3 class="ex-ios-large">智能体</h3>
      <ul class="dn-rows">
        <li class="dn-rows-item"><span class="dn-agent-mark" aria-hidden="true">票</span><a class="dn-rows-text" href="#"><span class="dn-rows-title">发票整理</span><span class="dn-rows-detail">等你确认：把汇总表发给财务</span></a></li>
        <li class="dn-rows-item"><span class="dn-agent-mark" aria-hidden="true"><svg class="dn-icon"><use href="#dn-code"/></svg></span><a class="dn-rows-text" href="#"><span class="dn-rows-title">代码审查</span><span class="dn-rows-detail">运行中 2</span></a></li>
        <li class="dn-rows-item"><span class="dn-agent-mark" aria-hidden="true">周</span><a class="dn-rows-text" href="#"><span class="dn-rows-title">周报助手</span><span class="dn-rows-detail">每周五读本周的笔记和日程，起草周报</span></a></li>
        <li class="dn-rows-item"><span class="dn-agent-mark" aria-hidden="true"><svg class="dn-icon"><use href="#dn-mail"/></svg></span><a class="dn-rows-text" href="#"><span class="dn-rows-title">客服回复</span><span class="dn-rows-detail">出错：帮助中心连不上</span></a></li>
      </ul>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 还没有智能体 | [空状态](../../../deernova-style/references/components/empty-state.md)「建一个智能体，交给它一件重复的事」，主按钮「新建」，下面三四个模板 |
| 搜索没有结果 | 「没有叫“周报”的智能体」，加「新建一个叫“周报”的智能体」 |
| 出错 | 状态列写原因（「帮助中心连不上」），点一下打开配置页里出问题的那一项 |
| 已停用 | 标记和名字变淡，排在最后；说明的位置写「已停用」，不能开始用，设置照常能打开 |
| 团队共享、只能用 | 行尾的「设置」换成「查看设置」，配置页只读 |

## 不要

- 每个智能体配一张 AI 生成的头像、一块渐变色，或者拟人的表情和名字。
- 管理自己的智能体用卡片网格，每张卡片一段介绍，看不出哪个在忙、哪个出错。
- 每一行都挂「空闲」「正常」的标签；状态只用彩色圆点，不写字。
- 点一行进入设置页，想用它反而要找按钮。
- 删除和停用不区分；删除不说明它的对话和任务会怎样。
