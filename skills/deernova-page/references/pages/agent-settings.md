# 智能体配置

新建或修改一个智能体：它叫什么、按什么指令做事、用哪个模型、能读哪些资料、能用哪些工具、哪些操作要先问人。改的人要边改边试，而且改动会影响所有用它的人，所以这一页和[设置页](settings.md)不同：改动先存成草稿，试好了再发布。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 返回、智能体的名字、草稿状态（「草稿，已自动保存」）、「发布」；版本记录在「更多」里 | 是 |
| 身份 | 标记（一个字或一个图标）、名字、一句话说明 | 是 |
| 指令 | 多行输入框，写它的任务、语气和规矩；下面一句提示写什么最有用 | 是 |
| 模型 | 下拉选择，选项写用途和价格档（「深度：慢，适合复杂的任务」）；需要时加思考程度 | 是 |
| 资料 | 它能读的文件、文件夹和连接的数据源，每个一行，写大小或条数；「添加」 | 否 |
| 工具与权限 | 每个工具一行：名字、一句话说明、权限（每次询问、总是允许、不允许） | 是 |
| 开场建议 | 用户打开它时看到的三四条建议，可以留空 | 否 |
| 试用 | 右边一栏，用当前草稿对话；左边改了什么，下一条消息就按新的来 | 是 |

- **左边配置，右边试用。** 宽屏时两边同时看得见，改一句指令就能马上问一句试试，不用来回切页面。
- **草稿自动保存，发布才生效。** 草稿只有改的人能用；「发布」时写一句改了什么，进版本记录，可以回到任何一版。离开页面不问「是否保存」。
- **从「是谁」排到「能做什么」。** 身份、指令、模型、资料、工具；越往下越接近权限，危险的设置在最后。
- **权限默认最紧。** 会写入、发送、付费、删除的工具默认「每次询问」；改成「总是允许」时，在这一行下面写清后果（「发邮件前不再问你」）。
- **指令框够大。** 至少八行高，随内容变长；不要单行输入框，也不要把指令拆成十几个小表单项。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-builder { display: grid; grid-template-columns: minmax(0, 1fr) minmax(320px, 400px); flex: 1; min-height: 0; }
.dn-builder-form { min-width: 0; min-height: 0; overflow-y: auto; padding: var(--space-6) var(--page-margin) var(--space-12); }
.dn-builder-form > .dn-form { margin-inline: auto; }
.dn-builder-state { color: var(--ink-tertiary); font: var(--type-footnote); white-space: nowrap; }
.dn-builder-identity { display: flex; align-items: flex-end; gap: var(--space-3); }
.dn-builder-identity > .dn-field { flex: 1; }
.dn-builder-identity > .dn-agent-mark { width: var(--field-height); height: var(--field-height); font-size: var(--type-headline-size); }
.dn-builder-instructions { min-height: calc(var(--type-body-line) * 8); }
.dn-perms { margin: 0; padding: 0; list-style: none; }
.dn-perm { display: grid; grid-template-columns: minmax(0, 1fr) 140px; align-items: center; gap: var(--space-3); padding: var(--space-2) 0; border-bottom: var(--stroke-line) solid var(--line); }
.dn-perm-name { display: grid; gap: 2px; color: var(--ink); font: var(--type-body); }
.dn-perm-name > span { color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-builder-try { display: flex; flex-direction: column; min-width: 0; min-height: 0; border-left: var(--stroke-line) solid var(--line); }
.dn-builder-try-head { display: flex; align-items: center; justify-content: space-between; height: var(--toolbar-height); padding: 0 var(--space-4); border-bottom: var(--stroke-line) solid var(--line); color: var(--ink-secondary); font: var(--type-callout); }
.dn-builder-try > .dn-thread { flex: 1; min-height: 0; overflow-y: auto; padding: var(--space-4); }
.dn-builder-try-dock { padding: 0 var(--space-4) var(--space-4); }
@media (max-width: 960px) {
  .dn-builder { grid-template-columns: minmax(0, 1fr); }
  .dn-builder-try { display: none; }
}
```

左边从身份排到权限，右边用当前草稿试用；顶栏写清这是草稿，「发布」才对别人生效：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg>智能体</button>
      <h2 class="dn-toolbar-title"><span>周报助手</span></h2>
      <span class="dn-builder-state">草稿，已自动保存</span>
      <div class="dn-toolbar-actions">
        <button class="dn-icon-button" type="button" aria-label="版本记录"><svg class="dn-icon" aria-hidden="true"><use href="#dn-history"/></svg></button>
        <button class="dn-button is-primary is-sm" type="button">发布</button>
      </div>
    </header>
    <div class="dn-builder">
      <div class="dn-builder-form">
        <form class="dn-form">
          <fieldset class="dn-form-section">
            <legend>身份</legend>
            <div class="dn-builder-identity">
              <button class="dn-agent-mark" type="button" aria-label="更换标记">周</button>
              <div class="dn-field"><label class="dn-field-label" for="ex-ag-name">名字</label><input class="dn-input" id="ex-ag-name" value="周报助手"></div>
            </div>
            <div class="dn-field"><label class="dn-field-label" for="ex-ag-desc">一句话说明</label><input class="dn-input" id="ex-ag-desc" value="每周五读本周的笔记和日程，起草周报"></div>
          </fieldset>
          <fieldset class="dn-form-section">
            <legend>指令</legend>
            <div class="dn-field">
              <textarea class="dn-input dn-builder-instructions" id="ex-ag-prompt" aria-label="指令" aria-describedby="ex-ag-prompt-help">每周五下午读我本周的笔记和日程，起草一份周报。
先写三件最重要的进展，每件一句话，带上数字；再写下周要做的事。
不写客套话，不评价自己做得怎样。拿不准的地方标出来问我。</textarea>
              <p class="dn-field-help" id="ex-ag-prompt-help">写它要做什么、按什么格式交，以及什么时候该停下来问你。</p>
            </div>
          </fieldset>
          <fieldset class="dn-form-section">
            <legend>模型</legend>
            <div class="dn-field">
              <div class="dn-select"><select id="ex-ag-model" aria-label="模型"><option>标准：适合大多数任务</option><option>深度：慢一些，适合复杂的任务</option><option>快速：便宜，适合简单的分类和改写</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></div>
            </div>
          </fieldset>
          <fieldset class="dn-form-section">
            <legend>资料</legend>
            <ul class="dn-changes">
              <li class="dn-change"><svg class="dn-icon" aria-hidden="true"><use href="#dn-folder"/></svg><span class="dn-change-path">笔记 / 工作</span><span class="dn-change-tag">64 篇</span></li>
              <li class="dn-change"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span class="dn-change-path">日历：工作</span><span class="dn-change-tag">只读</span></li>
            </ul>
            <div><button class="dn-button is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg>添加资料</button></div>
          </fieldset>
          <fieldset class="dn-form-section">
            <legend>工具与权限</legend>
            <ul class="dn-perms">
              <li class="dn-perm"><span class="dn-perm-name">搜索笔记<span>在你的笔记里找相关的内容</span></span><div class="dn-select"><select aria-label="搜索笔记的权限"><option>总是允许</option><option>每次询问</option><option>不允许</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></div></li>
              <li class="dn-perm"><span class="dn-perm-name">新建笔记<span>把起草好的周报存成一篇笔记</span></span><div class="dn-select"><select aria-label="新建笔记的权限"><option>每次询问</option><option>总是允许</option><option>不允许</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></div></li>
              <li class="dn-perm"><span class="dn-perm-name">发送邮件<span>把周报发给你指定的人</span></span><div class="dn-select"><select aria-label="发送邮件的权限"><option>不允许</option><option>每次询问</option><option>总是允许</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></div></li>
            </ul>
          </fieldset>
        </form>
      </div>
      <section class="dn-builder-try" aria-label="试用">
        <div class="dn-builder-try-head">试用草稿<button class="dn-icon-button" type="button" aria-label="清空试用对话"><svg class="dn-icon" aria-hidden="true"><use href="#dn-regenerate"/></svg></button></div>
        <div class="dn-thread">
          <div class="dn-message-user">按这周的内容起草</div>
          <div class="dn-message-assistant"><p><strong>本周进展</strong></p><ul><li>首页改版定稿，七位受访者里五位找不到的「归档」移到了侧边栏。</li><li>支付超时降到 0.3%。</li></ul><p>「设置页交互稿」的截止日期我拿不准，是周五还是下周一？</p></div>
        </div>
        <div class="dn-builder-try-dock"><div class="dn-composer"><textarea rows="1" aria-label="试用消息" placeholder="问一句试试"></textarea><button class="dn-send" type="button" aria-label="发送" disabled><svg class="dn-icon" aria-hidden="true"><use href="#dn-send"/></svg></button></div></div>
      </section>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 试用栏收起，顶栏多一个「试用」按钮，点开是全屏的试用对话，顶上「回到配置」。
- 工具与权限的下拉选择换到名字下面一行，占满宽度。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 配置在主窗口里打开，用 `Form` 加 `.formStyle(.grouped)`；试用放在 `.inspector` 里，可以收起。
- 权限用每行行尾的 `Picker`；指令用 `TextEditor`，跟着内容变高。
- 「发布」在工具栏，⌘S 只存草稿（本来就自动存），⇧⌘P 发布。

```swift
Form {
    Section("身份") {
        TextField("名字", text: $draft.name)
        TextField("一句话说明", text: $draft.summary)
    }
    Section("指令") {
        TextEditor(text: $draft.instructions).frame(minHeight: 160)
    }
    Section("模型") { Picker("模型", selection: $draft.model) { ForEach(Model.allCases) { Text($0.label).tag($0) } } }
    Section("工具与权限") {
        ForEach($draft.tools) { $tool in
            Picker(selection: $tool.permission) {
                Text("每次询问").tag(Permission.ask)
                Text("总是允许").tag(Permission.allow)
                Text("不允许").tag(Permission.deny)
            } label: { LabeledContent(tool.name, value: tool.summary) }
        }
    }
}
.formStyle(.grouped)
.navigationTitle(draft.name)
.navigationSubtitle("草稿，已自动保存")
.inspector(isPresented: $showsTrial) { TrialChat(agent: draft) }
.toolbar { Button("发布", action: publish).keyboardShortcut("p", modifiers: [.command, .shift]) }
```

分组表单在左，试用在右边的 inspector 里，标题下面一行写草稿状态：

```html
<div class="ex-mac has-inspector">
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div><span class="ex-mac-title">周报助手</span><span class="dn-builder-state">草稿</span><button class="dn-button is-primary is-sm" type="button">发布</button></div>
    <div class="ex-mac-form">
      <ul class="dn-list"><li class="dn-list-row">名字<span class="dn-list-value">周报助手</span></li><li class="dn-list-row">模型<span class="dn-list-value">标准</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></li></ul>
      <section class="dn-list-section"><ul class="dn-list"><li class="dn-list-row">搜索笔记<span class="dn-list-value">总是允许</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></li><li class="dn-list-row">新建笔记<span class="dn-list-value">每次询问</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></li><li class="dn-list-row">发送邮件<span class="dn-list-value">不允许</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></li></ul><p class="dn-list-footer">会写入或发送的工具默认每次询问。</p></section>
    </div>
  </div>
  <aside class="ex-mac-inspector" aria-label="试用">
    <div class="dn-thread">
      <div class="dn-message-user">按这周的内容起草</div>
      <div class="dn-message-assistant"><p>首页改版定稿；支付超时降到 0.3%。设置页交互稿的截止日期是周五还是下周一？</p></div>
    </div>
  </aside>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 一页分组表单：身份、指令、模型、资料、工具与权限。指令点进下一页全屏编辑。
- 「试用」在底部，点开是从底部升起的 sheet，用当前草稿对话；「发布」在右上角。
- 权限点进下一页选，当前值写在行尾。

```swift
Form {
    Section { TextField("名字", text: $draft.name); TextField("一句话说明", text: $draft.summary) }
    Section("指令") { NavigationLink { InstructionsEditor(text: $draft.instructions) } label: { Text(draft.instructions).lineLimit(3) } }
    Section("模型") { Picker("模型", selection: $draft.model) { ForEach(Model.allCases) { Text($0.label).tag($0) } } }
    Section("工具与权限") { ForEach($draft.tools) { $tool in Picker(tool.name, selection: $tool.permission) { PermissionOptions() } } }
}
.navigationTitle(draft.name)
.toolbar { Button("发布", action: publish) }
.safeAreaInset(edge: .bottom) { Button("试用") { showsTrial = true }.buttonStyle(.bordered) }
.sheet(isPresented: $showsTrial) { TrialChat(agent: draft).presentationDetents([.medium, .large]) }
```

指令只露出前三行，点进去全屏编辑；权限的当前值写在行尾：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg>智能体</button><button class="dn-button is-primary is-sm" type="button">发布</button></div>
      <h3 class="ex-ios-large">周报助手</h3>
      <section class="dn-list-section"><ul class="dn-list"><li class="dn-list-row">指令<span class="dn-list-value">读本周笔记，起草周报</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li><li class="dn-list-row">模型<span class="dn-list-value">标准</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li></ul></section>
      <section class="dn-list-section"><ul class="dn-list"><li class="dn-list-row">新建笔记<span class="dn-list-value">每次询问</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li><li class="dn-list-row">发送邮件<span class="dn-list-value">不允许</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li></ul><p class="dn-list-footer">会写入或发送的工具默认每次询问。</p></section>
    </div>
    <div class="ex-ios-dock"><span></span><button class="dn-glass dn-glass-button" type="button">试用</button><span></span></div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 新建 | 名字为空，指令框里是灰色的示例；试用栏写「写好指令后，在这里问一句试试」 |
| 有未发布的改动 | 顶栏「草稿，已自动保存」，「发布」可以点；没有改动时「发布」不可点，状态写「已发布，11月14日」 |
| 资料或工具连不上 | 这一行下面一句原因（「帮助中心的密钥过期了」）加「重新连接」；试用时用到它会在回答里说明 |
| 发布 | 弹一个小窗口写「这一版改了什么」，可以留空；发布后顶栏状态变成「已发布」 |
| 回到旧版本 | 版本记录里选一版，打开成新的草稿，不直接覆盖已发布的版本 |
| 只能查看 | 团队共享、你不是管理员时，整页只读，顶栏写「由林一管理」，没有「发布」 |

## 不要

- 改一项就立即对所有人生效，或者反过来，离开页面时弹「是否保存」。
- 指令只给一个单行输入框；或者拆成「角色」「目标」「语气」「限制」十几个小框。
- 工具默认全部「总是允许」，用户不知道它能替自己发邮件。
- 试用要先发布、或者要跳到另一个页面。
- 模型下拉里只写内部型号，不写快慢和适合做什么。
