# 智能体配置

新建或修改一个智能体：它按什么指令做事、用哪个模型、能读哪些资料、能用哪些工具、做事前要不要问人、什么时候自己开始。改的人要边改边试，而且改动会影响所有用它的人，所以这一页和[设置页](settings.md)不同：改动先存成草稿，试好了再发布。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 返回、标记和名字（直接点了改）、草稿状态（「草稿，已自动保存」）、试用开关、「发布」 | 是 |
| 分类 | 左边一列：指令、模型、资料、工具、权限、触发、版本；每项行尾一个短状态：「2 个」「每周五」「1 个要重新登录」 | 是 |
| 指令 | 一个占满高度的编辑区，像写一页文档；输入 @ 引用资料和工具，被引用的写成[提及](../../../deernova-style/references/components/mention.md)；上面是一句话说明（显示在智能体列表里） | 是 |
| 模型 | 模型、思考深度、快慢；每项写来自哪里：「团队默认」或「这个智能体单独设置」 | 是 |
| 资料 | 它能读的文件夹、笔记本、日历和数据源，每个一行：名字、条数、只读还是能写 | 否 |
| 工具 | 每个连接一行：名字、状态（已连接、要重新登录）、开关；展开是这个连接里的每个操作 | 是 |
| 权限 | 先选一档整体权限，再列例外：某个操作单独「总是允许」「每次询问」或「不允许」 | 是 |
| 触发 | 手动、定时（每周五 16:00）、某件事发生时（收到带发票的邮件）；下面是最近几次运行，点开是[AI 任务页](task.md) | 否 |
| 版本 | 每次发布的说明和时间；选一版打开成新的草稿 | 是 |
| 试用 | 右边一栏，用当前草稿对话；左边改了什么，下一条消息就按新的来 | 是 |

- **一次只看一类。** 左边分类、中间这一类、右边试用。智能体能配的东西越来越多，一长串表单翻到底才看到权限，改的人会漏看最要紧的那几项。
- **指令是一页文档，不是一个输入框。** 编辑区占满中间的高度，正文字号，段落之间有间距；不要把指令拆成「角色」「目标」「语气」「限制」十几个小框。底部一行灰字写字数。
- **定时写在触发里，不写进指令。** 「每周五下午」是什么时候运行，属于触发；指令只写它要做什么。指令里出现时间词时，触发那一项旁边提示「指令里提到了每周五，要设成定时吗」。
- **权限先选一档，再列例外。** 整体权限四档，从紧到松：每次都问、只在外发前问、自动、完全放开。大部分人只需要选一档；个别操作和整体不同时，写在例外里。不让人给十几个操作一个一个选。
- **会发送、付费、删除的操作，只有「完全放开」不问。** 选「完全放开」时，这一档的说明换成 `warning` 色，写清后果：「它会直接发邮件、删除笔记，不再问你」。
- **每个值都写来自哪里。** 模型、权限这类团队有默认值的项，旁边一行灰字「团队默认」；单独改过的写「单独设置，团队默认是“标准”」加「恢复」。连接的权限是上限，这里只能收得更紧，见[工具与连接](connections.md)。
- **草稿自动保存，发布才生效。** 草稿只有改的人能用；「发布」时写一句改了什么，进版本，可以回到任何一版。离开页面不问「是否保存」。
- **只有要处理的才有颜色。** 分类行尾的状态是灰字；要重新登录的连接用 `warning`；试用里正在回答时的加载动效用朱砂，和其他 AI 页面一致。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-builder { display: grid; grid-template-columns: 200px minmax(0, 1fr) minmax(300px, 360px); flex: 1; min-height: 0; }
.dn-builder.is-solo { grid-template-columns: 200px minmax(0, 1fr); }
.dn-builder > .dn-settings-nav .dn-sidebar-count.is-warning { color: var(--warning); }
.dn-builder-main { display: flex; flex-direction: column; min-width: 0; min-height: 0; overflow-y: auto; padding: var(--space-6) var(--space-8) var(--space-10); }
.dn-builder-main > * { width: 100%; max-width: var(--content-max); }
.dn-builder-main > h3 { margin: 0 0 var(--space-1); font: var(--type-title); }
.dn-builder-main > h4 { margin: var(--space-8) 0 var(--space-2); font: var(--type-headline); }
.dn-builder-lede { margin: 0 0 var(--space-5); color: var(--ink-secondary); font: var(--type-callout); }
.dn-builder-state { color: var(--ink-tertiary); font: var(--type-footnote); white-space: nowrap; }
.dn-toolbar > .dn-agent-mark { width: var(--button-height-sm); height: var(--button-height-sm); font-size: var(--type-footnote-size); }
.dn-builder-name { width: 9em; min-width: 0; height: var(--button-height-sm); padding: 0 var(--space-2); border: 0; border-radius: var(--radius-sm); background: none; color: var(--ink); font: var(--weight-semibold) var(--toolbar-title-size)/1.2 var(--font-sans); }
@media (hover: hover) { .dn-builder-name:hover { background: var(--fill-hover); } }
.dn-builder-name:focus { outline: none; background: var(--surface-sunken); }
.dn-builder-summary { margin-bottom: var(--space-4); }
.dn-prompt { flex: 1; min-height: calc(var(--type-body-line) * 12); padding: var(--space-4) var(--space-5); border: var(--stroke-line) solid var(--line); border-radius: var(--radius-lg); background: var(--surface); color: var(--ink); font: var(--type-body); }
.dn-prompt:focus-within { border-color: var(--line-control); box-shadow: var(--shadow-control); }
.dn-prompt > p { margin: 0 0 var(--space-3); }
.dn-prompt-foot { display: flex; justify-content: space-between; gap: var(--space-4); margin-top: var(--space-2); color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-levels { display: grid; margin: 0; padding: 0; border: var(--stroke-line) solid var(--line); border-radius: var(--radius-lg); background: var(--surface); }
.dn-levels > legend { padding: 0; margin-bottom: var(--space-2); font: var(--type-headline); }
.dn-level { display: flex; align-items: flex-start; gap: var(--space-3); padding: var(--space-3) var(--space-4); cursor: pointer; }
.dn-level + .dn-level { border-top: var(--stroke-line) solid var(--line); }
.dn-level:has(input:checked) { background: var(--fill-hover); }
.dn-level-text { display: grid; gap: 2px; }
.dn-level-name { color: var(--ink); font: var(--weight-medium) var(--type-body-size)/var(--type-body-line) var(--font-sans); }
.dn-level-help { color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-level.is-risky:has(input:checked) .dn-level-help { color: var(--warning); }
.dn-source { display: flex; flex-wrap: wrap; align-items: baseline; gap: var(--space-2); margin: var(--space-2) 0 0; color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-perms { margin: 0; padding: 0; list-style: none; }
.dn-perm { display: grid; grid-template-columns: minmax(0, 1fr) 140px; align-items: center; gap: var(--space-3); padding: var(--space-2) 0; border-bottom: var(--stroke-line) solid var(--line); }
.dn-perm-name { display: grid; gap: 2px; color: var(--ink); font: var(--type-body); }
.dn-perm-name > span { color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-toolset { margin: 0; padding: 0; border: var(--stroke-line) solid var(--line); border-radius: var(--radius-lg); background: var(--surface); list-style: none; }
.dn-toolset-item { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: var(--space-1) var(--space-3); padding: var(--space-3) var(--space-4); }
.dn-toolset-item + .dn-toolset-item { border-top: var(--stroke-line) solid var(--line); }
.dn-toolset-item > .dn-agent-mark { width: var(--button-height-sm); height: var(--button-height-sm); }
.dn-toolset-name { display: grid; gap: 2px; font: var(--type-body); }
.dn-toolset-name > span { color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-toolset-name > span.is-warning { color: var(--warning); }
.dn-toolset-item > .dn-perms { grid-column: 2 / -1; margin-top: var(--space-1); }
.dn-toolset-item > .dn-perms > .dn-perm:last-child { border-bottom: 0; }
.dn-runs { margin-top: var(--space-2); }
.dn-builder-main > .dn-form-pair { margin-top: var(--space-4); max-width: var(--form-max); }
.dn-toolbar .dn-button.is-plain[aria-pressed="true"] { background: var(--fill-selected); }
.dn-builder-try { display: flex; flex-direction: column; min-width: 0; min-height: 0; border-left: var(--stroke-line) solid var(--line); }
.dn-builder-try-head { display: flex; align-items: center; justify-content: space-between; height: var(--toolbar-height); padding: 0 var(--space-4); border-bottom: var(--stroke-line) solid var(--line); color: var(--ink-secondary); font: var(--type-callout); }
.dn-builder-try > .dn-thread { flex: 1; min-height: 0; overflow-y: auto; padding: var(--space-4); }
.dn-builder-try-dock { padding: 0 var(--space-4) var(--space-4); }
@media (max-width: 1100px) {
  .dn-builder { grid-template-columns: 200px minmax(0, 1fr); }
  .dn-builder-try { display: none; }
}
@media (max-width: 760px) {
  .dn-builder { grid-template-columns: minmax(0, 1fr); }
  .dn-builder > .dn-settings-nav { display: none; }
}
```

「指令」这一类：顶栏里的名字直接点了改；指令像一页文档，@ 引用的资料和工具写成提及；右边用当前草稿试用：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <button class="dn-icon-button" type="button" aria-label="返回智能体列表"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg></button>
      <button class="dn-agent-mark" type="button" aria-label="更换标记">周</button>
      <input class="dn-builder-name" value="周报助手" aria-label="名字">
      <span class="dn-builder-state">草稿，已自动保存</span>
      <div class="dn-toolbar-actions">
        <button class="dn-button is-plain is-sm" type="button" aria-pressed="true">试用</button>
        <button class="dn-button is-primary is-sm" type="button">发布</button>
      </div>
    </header>
    <div class="dn-builder">
      <nav class="dn-settings-nav" aria-label="配置分类">
        <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span class="dn-sidebar-label">指令</span></a>
        <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-model"/></svg><span class="dn-sidebar-label">模型</span><span class="dn-sidebar-count">标准</span></a>
        <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-folder"/></svg><span class="dn-sidebar-label">资料</span><span class="dn-sidebar-count">2 个</span></a>
        <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-tool"/></svg><span class="dn-sidebar-label">工具</span><span class="dn-sidebar-count is-warning">1 个要登录</span></a>
        <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-permission"/></svg><span class="dn-sidebar-label">权限</span><span class="dn-sidebar-count">外发前问</span></a>
        <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-calendar"/></svg><span class="dn-sidebar-label">触发</span><span class="dn-sidebar-count">每周五</span></a>
        <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-history"/></svg><span class="dn-sidebar-label">版本</span><span class="dn-sidebar-count">v4</span></a>
      </nav>
      <div class="dn-builder-main">
        <h3>指令</h3>
        <p class="dn-builder-lede">写它要做什么、按什么格式交、什么时候停下来问你。</p>
        <div class="dn-field dn-builder-summary"><label class="dn-field-label" for="ex-ag-desc">一句话说明</label><input class="dn-input" id="ex-ag-desc" value="读本周的笔记和日程，起草周报"></div>
        <div class="dn-prompt" role="textbox" aria-multiline="true" aria-label="指令">
          <p>读我本周的 <span class="dn-mention"><svg class="dn-icon" aria-hidden="true"><use href="#dn-folder"/></svg>笔记 / 工作</span> 和 <span class="dn-mention"><svg class="dn-icon" aria-hidden="true"><use href="#dn-calendar"/></svg>日历：工作</span>，起草一份周报。</p>
          <p>先写三件最重要的进展，每件一句话，带上数字；再写下周要做的事。不写客套话，不评价自己做得怎样。</p>
          <p>拿不准的地方标出来问我。写好后用 <span class="dn-mention"><svg class="dn-icon" aria-hidden="true"><use href="#dn-tool"/></svg>新建笔记</span> 存进「周报」文件夹，不要发给任何人。</p>
        </div>
        <div class="dn-prompt-foot"><span>输入 @ 引用资料和工具</span><span>142 字</span></div>
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

「权限」这一类：先选一档整体权限，写清它来自哪里；下面是和整体不同的例外。试用栏收起时，中间占满：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <button class="dn-icon-button" type="button" aria-label="返回智能体列表"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg></button>
      <button class="dn-agent-mark" type="button" aria-label="更换标记">周</button>
      <input class="dn-builder-name" value="周报助手" aria-label="名字">
      <span class="dn-builder-state">草稿，已自动保存</span>
      <div class="dn-toolbar-actions">
        <button class="dn-button is-plain is-sm" type="button" aria-pressed="false">试用</button>
        <button class="dn-button is-primary is-sm" type="button">发布</button>
      </div>
    </header>
    <div class="dn-builder is-solo">
      <nav class="dn-settings-nav" aria-label="配置分类">
        <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span class="dn-sidebar-label">指令</span></a>
        <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-model"/></svg><span class="dn-sidebar-label">模型</span><span class="dn-sidebar-count">标准</span></a>
        <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-folder"/></svg><span class="dn-sidebar-label">资料</span><span class="dn-sidebar-count">2 个</span></a>
        <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-tool"/></svg><span class="dn-sidebar-label">工具</span><span class="dn-sidebar-count is-warning">1 个要登录</span></a>
        <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-permission"/></svg><span class="dn-sidebar-label">权限</span><span class="dn-sidebar-count">外发前问</span></a>
        <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-calendar"/></svg><span class="dn-sidebar-label">触发</span><span class="dn-sidebar-count">每周五</span></a>
        <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-history"/></svg><span class="dn-sidebar-label">版本</span><span class="dn-sidebar-count">v4</span></a>
      </nav>
      <div class="dn-builder-main">
        <h3>权限</h3>
        <p class="dn-builder-lede">它做事前什么时候停下来问你。只读的操作都不问。</p>
        <fieldset class="dn-levels">
          <label class="dn-level"><span class="dn-choice-box"><input type="radio" name="ex-ag-level"></span><span class="dn-level-text"><span class="dn-level-name">每次都问</span><span class="dn-level-help">新建、修改、发送前都先问你。</span></span></label>
          <label class="dn-level"><span class="dn-choice-box"><input type="radio" name="ex-ag-level" checked></span><span class="dn-level-text"><span class="dn-level-name">只在外发前问</span><span class="dn-level-help">新建和修改直接做；发送、付费、删除前问你。</span></span></label>
          <label class="dn-level"><span class="dn-choice-box"><input type="radio" name="ex-ag-level"></span><span class="dn-level-text"><span class="dn-level-name">自动</span><span class="dn-level-help">只在它拿不准、或者要付费时问你。</span></span></label>
          <label class="dn-level is-risky"><span class="dn-choice-box"><input type="radio" name="ex-ag-level"></span><span class="dn-level-text"><span class="dn-level-name">完全放开</span><span class="dn-level-help">所有操作都不问，包括发邮件和删除。</span></span></label>
        </fieldset>
        <p class="dn-source">团队默认</p>
        <h4>例外</h4>
        <ul class="dn-perms">
          <li class="dn-perm"><span class="dn-perm-name">发送邮件<span>邮箱 lin@deernova.me</span></span><span class="dn-select"><select aria-label="发送邮件的权限"><option>跟随整体</option><option>总是允许</option><option>每次询问</option><option selected>不允许</option></select></span></li>
          <li class="dn-perm"><span class="dn-perm-name">新建日程<span>日历：工作</span></span><span class="dn-select"><select aria-label="新建日程的权限"><option>跟随整体</option><option>总是允许</option><option selected>每次询问</option><option>不允许</option></select></span></li>
        </ul>
        <p class="dn-source"><button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg>添加例外</button></p>
      </div>
    </div>
  </div>
</div>
```

「工具」这一类：每个连接一行，写状态和开关；展开的那个列出它的操作，权限默认「跟随整体」：

```html
<div class="dn-builder-main">
  <h3>工具</h3>
  <p class="dn-builder-lede">它能用哪些连接。连接本身在「工具与连接」里接入，这里只决定这个智能体用不用。</p>
  <ul class="dn-toolset">
    <li class="dn-toolset-item">
      <span class="dn-agent-mark" aria-hidden="true"><svg class="dn-icon"><use href="#dn-document"/></svg></span>
      <span class="dn-toolset-name">笔记<span>已连接，5 个操作</span></span>
      <input class="dn-switch" type="checkbox" role="switch" checked aria-label="使用笔记">
      <ul class="dn-perms">
        <li class="dn-perm"><span class="dn-perm-name">搜索笔记</span><span class="dn-select"><select aria-label="搜索笔记的权限"><option selected>跟随整体</option><option>每次询问</option><option>不允许</option></select></span></li>
        <li class="dn-perm"><span class="dn-perm-name">新建笔记</span><span class="dn-select"><select aria-label="新建笔记的权限"><option selected>跟随整体</option><option>总是允许</option><option>每次询问</option><option>不允许</option></select></span></li>
      </ul>
    </li>
    <li class="dn-toolset-item">
      <span class="dn-agent-mark" aria-hidden="true"><svg class="dn-icon"><use href="#dn-calendar"/></svg></span>
      <span class="dn-toolset-name">日历<span>已连接，只读</span></span>
      <input class="dn-switch" type="checkbox" role="switch" checked aria-label="使用日历">
    </li>
    <li class="dn-toolset-item">
      <span class="dn-agent-mark" aria-hidden="true"><svg class="dn-icon"><use href="#dn-mail"/></svg></span>
      <span class="dn-toolset-name">邮箱<span class="is-warning">授权过期，要重新登录</span></span>
      <button class="dn-button is-sm" type="button">重新登录</button>
    </li>
  </ul>
</div>
```

「触发」这一类：定时写在这里，不写进指令；下面是最近几次运行：

```html
<div class="dn-builder-main">
  <h3>触发</h3>
  <p class="dn-builder-lede">它什么时候自己开始。手动随时都能用。</p>
  <fieldset class="dn-choice-group">
    <label class="dn-choice"><span class="dn-choice-box"><input type="radio" name="ex-ag-trigger"></span><span class="dn-choice-text"><span class="dn-choice-label">只在我叫它时</span></span></label>
    <label class="dn-choice"><span class="dn-choice-box"><input type="radio" name="ex-ag-trigger" checked></span><span class="dn-choice-text"><span class="dn-choice-label">定时</span><span class="dn-choice-help">每周五 16:00，北京时间</span></span></label>
    <label class="dn-choice"><span class="dn-choice-box"><input type="radio" name="ex-ag-trigger"></span><span class="dn-choice-text"><span class="dn-choice-label">某件事发生时</span><span class="dn-choice-help">比如收到带附件的邮件、日历里新加了会议</span></span></label>
  </fieldset>
  <div class="dn-form-pair">
    <div class="dn-field"><label class="dn-field-label" for="ex-ag-day">每周</label><span class="dn-select"><select id="ex-ag-day"><option>周一</option><option selected>周五</option></select></span></div>
    <div class="dn-field"><label class="dn-field-label" for="ex-ag-time">时间</label><input class="dn-input" id="ex-ag-time" value="16:00"></div>
  </div>
  <h4>最近运行</h4>
  <ul class="dn-rows dn-runs">
    <li class="dn-rows-item"><a class="dn-rows-text" href="#"><span class="dn-rows-title">11月14日 16:00</span><span class="dn-rows-detail">起草了周报，问了 1 个问题</span></a></li>
    <li class="dn-rows-item"><a class="dn-rows-text" href="#"><span class="dn-rows-title">11月7日 16:00</span><span class="dn-rows-detail">起草了周报</span></a></li>
  </ul>
</div>
```

### 窄屏和手机浏览器

- 窄于 1100px：试用栏收起，顶栏的「试用」打开全屏的试用对话，顶上「回到配置」。
- 窄于 `breakpoint-md`：分类变成第一页，一行一类，行尾写当前状态；点进去是这一类，顶栏出现返回。
- 例外和工具操作的权限下拉换到名字下面一行，占满宽度。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 一个智能体的配置在它自己的窗口里打开：侧边栏是分类，中间是这一类，试用在 `.inspector` 里，可以收起（⌥⌘I）。
- 整体权限用 `Picker` 加 `.pickerStyle(.radioGroup)`，每一档下面一行说明；例外用 `Table`。
- 指令用 `TextEditor`，占满中间；名字在窗口标题上，双击改。「发布」在工具栏，⇧⌘P。

```swift
NavigationSplitView {
    List(BuilderSection.allCases, selection: $section) { item in
        Label(item.title, systemImage: item.symbol).badge(item.status(for: draft))
    }
} detail: {
    switch section {
    case .instructions: InstructionsEditor(text: $draft.instructions, references: draft.references)
    case .permissions:
        Form {
            Picker("整体权限", selection: $draft.level) {
                ForEach(PermissionLevel.allCases) { level in
                    VStack(alignment: .leading) { Text(level.title); Text(level.help).font(.caption).foregroundStyle(.secondary) }.tag(level)
                }
            }
            .pickerStyle(.radioGroup)
            Section("例外") { ExceptionsTable(exceptions: $draft.exceptions) }
        }
        .formStyle(.grouped)
    default: SectionView(section: section, draft: $draft)
    }
}
.navigationTitle($draft.name)
.navigationSubtitle("草稿，已自动保存")
.inspector(isPresented: $showsTrial) { TrialChat(agent: draft) }
.toolbar { Button("发布", action: publish).keyboardShortcut("p", modifiers: [.command, .shift]) }
```

侧边栏是分类，中间是「权限」：

```html
<div class="ex-mac">
  <nav class="ex-mac-sidebar" aria-label="配置分类">
    <div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span class="dn-sidebar-label">指令</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-model"/></svg><span class="dn-sidebar-label">模型</span><span class="dn-sidebar-count">标准</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-tool"/></svg><span class="dn-sidebar-label">工具</span><span class="dn-sidebar-count">3</span></a>
    <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-permission"/></svg><span class="dn-sidebar-label">权限</span></a>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-calendar"/></svg><span class="dn-sidebar-label">触发</span><span class="dn-sidebar-count">每周五</span></a>
  </nav>
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><span class="ex-mac-title">周报助手</span><span class="dn-builder-state">草稿</span><button class="dn-button is-primary is-sm" type="button">发布</button></div>
    <div class="ex-mac-body">
      <fieldset class="dn-levels">
        <label class="dn-level"><span class="dn-choice-box"><input type="radio" name="ex-mac-level"></span><span class="dn-level-text"><span class="dn-level-name">每次都问</span><span class="dn-level-help">新建、修改、发送前都先问你。</span></span></label>
        <label class="dn-level"><span class="dn-choice-box"><input type="radio" name="ex-mac-level" checked></span><span class="dn-level-text"><span class="dn-level-name">只在外发前问</span><span class="dn-level-help">新建和修改直接做；发送、付费、删除前问你。</span></span></label>
        <label class="dn-level"><span class="dn-choice-box"><input type="radio" name="ex-mac-level"></span><span class="dn-level-text"><span class="dn-level-name">自动</span><span class="dn-level-help">只在它拿不准、或者要付费时问你。</span></span></label>
      </fieldset>
      <p class="dn-source">团队默认</p>
    </div>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 第一页是分类的分组列表，行尾写当前状态；点进去是这一类。指令进去是全屏编辑。
- 「试用」在底部，点开是从底部升起的 sheet，用当前草稿对话；「发布」在右上角。
- 整体权限是一页单选列表，每一档下面一行说明。

```swift
Form {
    Section {
        NavigationLink { InstructionsEditor(text: $draft.instructions) } label: { LabeledContent("指令", value: "\(draft.instructions.count) 字") }
        NavigationLink { ModelView(draft: $draft) } label: { LabeledContent("模型", value: draft.model.title) }
    }
    Section {
        NavigationLink { ToolsView(draft: $draft) } label: { LabeledContent("工具", value: draft.toolStatus) }
        NavigationLink { LevelView(level: $draft.level) } label: { LabeledContent("权限", value: draft.level.title) }
        NavigationLink { TriggerView(trigger: $draft.trigger) } label: { LabeledContent("触发", value: draft.trigger.title) }
    }
}
.navigationTitle(draft.name)
.toolbar { Button("发布", action: publish) }
.safeAreaInset(edge: .bottom) { Button("试用") { showsTrial = true }.buttonStyle(.bordered) }
.sheet(isPresented: $showsTrial) { TrialChat(agent: draft).presentationDetents([.medium, .large]) }
```

分类的分组列表，每类行尾写当前状态，要处理的那一行是黄字：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg>智能体</button><button class="dn-button is-primary is-sm" type="button">发布</button></div>
      <h3 class="ex-ios-large">周报助手</h3>
      <section class="dn-list-section"><ul class="dn-list">
        <li class="dn-list-row">指令<span class="dn-list-value">142 字</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
        <li class="dn-list-row">模型<span class="dn-list-value">标准</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
        <li class="dn-list-row">资料<span class="dn-list-value">2 个</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
      </ul></section>
      <section class="dn-list-section"><ul class="dn-list">
        <li class="dn-list-row">工具<span class="dn-list-value is-soon">1 个要登录</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
        <li class="dn-list-row">权限<span class="dn-list-value">只在外发前问</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
        <li class="dn-list-row">触发<span class="dn-list-value">每周五 16:00</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
      </ul></section>
      <p class="dn-list-footer">草稿，已自动保存。发布后对所有人生效。</p>
    </div>
    <div class="ex-ios-dock"><span></span><button class="dn-glass dn-glass-button" type="button">试用</button><span></span></div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 新建 | 名字为空，停在「指令」；编辑区里是灰色的示例，试用栏写「写好指令后，在这里问一句试试」 |
| 有未发布的改动 | 顶栏「草稿，已自动保存」，「发布」可以点；没有改动时「发布」不可点，状态写「已发布，11月14日」 |
| 资料或工具连不上 | 分类行尾 `warning` 色写「1 个要登录」；那一行写原因和「重新登录」；试用时用到它，回答里会说明 |
| 选了「完全放开」 | 这一档的说明换成 `warning` 色；发布时的小窗口里再写一次「这一版不再问你就会发邮件和删除」 |
| 指令里写了时间 | 触发那一类出现一行提示「指令里提到了每周五，要设成定时吗」，加「设成定时」 |
| 发布 | 弹一个小窗口写「这一版改了什么」，可以留空；发布后顶栏状态变成「已发布」，版本里多一条 |
| 回到旧版本 | 版本里选一版，打开成新的草稿，不直接覆盖已发布的版本 |
| 只能查看 | 团队共享、你不是管理员时，整页只读，顶栏写「由林一管理」，没有「发布」 |

## 不要

- 所有配置排成一长串表单，权限在最底下，要翻好几屏才看到。
- 指令只给一个几行高的输入框；或者拆成「角色」「目标」「语气」「限制」十几个小框。
- 把「每周五下午」这种运行时间写在指令里，而不是设成定时。
- 权限只能一个工具一个工具地选，没有整体的一档。
- 工具默认全部「总是允许」，用户不知道它能替自己发邮件。
- 看不出一个值是团队默认还是单独改过的。
- 试用要先发布、或者要跳到另一个页面。
- 模型下拉里只写内部型号，不写快慢和适合做什么。
