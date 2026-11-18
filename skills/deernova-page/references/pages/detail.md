# 详情页

应用里打开一条记录来看和改：一个任务、一份订单、一位联系人、一个项目。和[列表页](list.md)右边的详情不同，它是一整页，内容多到需要自己的结构：正文、属性、动态。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 左边返回（回到来的那个列表，写列表名）；中间不放标题；右边分享、更多 | 是 |
| 标题 | 记录的名字，可以直接点进去改；下面一行状态，用[标签](../../../deernova-style/references/components/tag.md)，只放一个 | 是 |
| 正文 | 定义这条记录的内容：描述、清单、附件。宽不超过 `content-max` | 是 |
| 属性栏 | 右边一栏：负责人、日期、所属项目这类可以单独改的字段，一行一项，标签在左、值在右 | 内容有属性时 |
| 动态 | 正文下面：评论和修改记录，按时间排，最新的在下面，输入框在最后 | 否 |

- 主内容占左边，属性栏宽 `pane-width`，两栏各自滚动。属性是辅助信息，不要把它们堆在标题下面挤占正文。
- 改了就存：字段失焦或开关切换时保存，不放「保存」按钮；保存失败时字段下面说明，保留用户填的内容。需要一次提交的整张表单，按[表单](../../../deernova-style/references/components/form.md)的规则做。
- 删除、归档、复制这类整条记录的操作放进「更多」菜单，不在页面上常驻；删除后回到列表，并给一条带「撤销」的[轻提示](../../../deernova-style/references/components/banner.md)。
- 顶栏的返回写去处（「‹ 全部任务」），不写「返回」。从链接直接打开、没有来路时，返回到这类记录的列表。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-detail { display: grid; grid-template-columns: minmax(0, 1fr) var(--pane-width); flex: 1; min-height: 0; }
.dn-detail-main { min-width: 0; min-height: 0; overflow-y: auto; padding: var(--space-8) var(--page-margin) var(--space-12); }
.dn-detail-main > * { max-width: var(--content-max); margin-inline: auto; }
.dn-detail-title { margin: 0 0 var(--space-2); color: var(--ink); font: var(--type-title); }
.dn-detail-status { margin-bottom: var(--space-6); }
.dn-detail-main p { margin: 0 0 var(--space-3); font: var(--type-body); }
.dn-detail-aside { min-height: 0; overflow-y: auto; padding: var(--space-6) var(--space-4); border-left: var(--stroke-line) solid var(--line); }
.dn-props { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: var(--space-1) var(--space-4); margin: 0; }
.dn-props dt { color: var(--ink-tertiary); font: var(--type-callout); }
.dn-props dd { display: flex; align-items: center; min-height: var(--row-height); margin: 0; padding: 0 var(--space-2); border-radius: var(--row-radius); color: var(--ink); font: var(--type-callout); }
@media (hover: hover) { .dn-props dd:hover { background: var(--fill-hover); } }
.dn-activity-log { display: grid; gap: var(--space-3); margin-top: var(--space-10); padding-top: var(--space-6); border-top: var(--stroke-line) solid var(--line); }
.dn-activity-log p { margin: 0; color: var(--ink-secondary); font: var(--type-callout); }
.dn-activity-log time { margin-left: var(--space-2); color: var(--ink-tertiary); font: var(--type-footnote); font-variant-numeric: tabular-nums; }
@media (max-width: 960px) {
  .dn-detail { grid-template-columns: minmax(0, 1fr); }
  .dn-detail-aside { border-left: 0; border-top: var(--stroke-line) solid var(--line); }
}
```

顶栏只有去处和操作，标题在正文上方；属性在右边一栏，一行一项，点值就能改：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg>全部任务</button>
      <div class="dn-toolbar-actions">
        <button class="dn-icon-button" type="button" aria-label="分享"><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></button>
        <button class="dn-icon-button" type="button" aria-label="更多"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button>
      </div>
    </header>
    <div class="dn-detail">
      <article class="dn-detail-main">
        <div>
          <h2 class="dn-detail-title">设置页先出交互稿</h2>
          <div class="dn-detail-status"><span class="dn-tag is-warning"><span class="dn-dot"></span>周五到期</span></div>
          <p>覆盖账户、通知、外观三组。iCloud 同步的开关要写清楚关掉以后会怎样，其余设置不加说明。</p>
          <p>周五评审前发到设计组，评审只看结构，不看视觉。</p>
          <div class="dn-activity-log">
            <p>林一 把截止日期改成了 11月21日<time>昨天</time></p>
            <p>周舟：账户那组要不要放退出登录？<time>今天 10:12</time></p>
          </div>
        </div>
      </article>
      <aside class="dn-detail-aside" aria-label="属性">
        <dl class="dn-props">
          <dt>负责人</dt><dd>林一</dd>
          <dt>截止</dt><dd>11月21日</dd>
          <dt>项目</dt><dd>设置页改版</dd>
          <dt>优先级</dt><dd>高</dd>
        </dl>
      </aside>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 窄于 `breakpoint-md`：属性栏移到标题下面，收成两三行最重要的属性，其余点「全部属性」展开。
- 窄于 `breakpoint-sm`：动态里的输入框固定在底部，避开安全区。
- 顶栏的返回只剩箭头和列表名，列表名太长时截断。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 属性栏用 `.inspector`，⌥⌘I 显示或隐藏；正文在主内容区。
- 返回靠侧边栏和列表的选中项，不放「返回」按钮；单独窗口打开时，工具栏左边写所在列表。
- 更多操作放在工具栏的菜单和右键菜单里，也出现在菜单栏的对应菜单中。

```swift
TaskDetail(task: task)
    .inspector(isPresented: $showsProperties) {
        Form {
            LabeledContent("负责人", value: task.owner)
            LabeledContent("截止", value: task.due, format: .dateTime.month().day())
        }
    }
    .toolbar {
        ShareLink(item: task.url)
        Menu("更多", systemImage: "ellipsis") { TaskActions(task: task) }
    }
```

正文在主内容区，属性在右边的 inspector 里，可以收起：

```html
<div class="ex-mac has-inspector">
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div><div class="dn-glass dn-glass-group"><button class="dn-glass-button" type="button" aria-label="分享"><svg class="dn-icon" aria-hidden="true"><use href="#dn-share"/></svg></button><button class="dn-glass-button" type="button" aria-label="更多"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></div></div>
    <div class="ex-mac-body dn-detail-main">
      <div>
        <h3 class="dn-detail-title">设置页先出交互稿</h3>
        <div class="dn-detail-status"><span class="dn-tag is-warning"><span class="dn-dot"></span>周五到期</span></div>
        <p>覆盖账户、通知、外观三组。iCloud 同步的开关要写清楚关掉以后会怎样。</p>
      </div>
    </div>
  </div>
  <aside class="ex-mac-inspector" aria-label="属性">
    <dl class="dn-props"><dt>负责人</dt><dd>林一</dd><dt>截止</dt><dd>11月21日</dd><dt>项目</dt><dd>设置页改版</dd></dl>
  </aside>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 标题下面两三行最重要的属性，其余点「全部属性」进入下一页。
- 更多操作在右上角的菜单里；删除在菜单最后，红字，点了先确认。
- 动态的输入框贴在键盘上方。

```swift
ScrollView {
    VStack(alignment: .leading, spacing: Deernova.space3) {
        Text(task.title).font(.deernovaTitle)
        PropertySummary(task: task)          // 两三行最重要的属性
        NavigationLink("全部属性") { TaskProperties(task: task) }
        Text(task.body)
    }
    .padding(.horizontal, Deernova.pageMargin)
}
.navigationBarTitleDisplayMode(.inline)
.toolbar { Menu("更多", systemImage: "ellipsis.circle") { TaskActions(task: task) } }
```

标题下面只留两三行属性，其余点进下一页：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg>全部任务</button><button class="dn-icon-button" type="button" aria-label="更多"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></div>
      <h3 class="dn-detail-title">设置页先出交互稿</h3>
      <div><span class="dn-tag is-warning"><span class="dn-dot"></span>周五到期</span></div>
      <ul class="dn-list">
        <li class="dn-list-row">负责人<span class="dn-list-value">林一</span></li>
        <li class="dn-list-row">截止<span class="dn-list-value">11月21日</span></li>
        <li class="dn-list-row">全部属性<svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
      </ul>
      <p>覆盖账户、通知、外观三组。iCloud 同步的开关要写清楚关掉以后会怎样，其余设置不加说明。</p>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 记录不存在或已删除 | 整页提示：「这个任务已被删除」，给「回到全部任务」；有回收站时再给「去回收站恢复」 |
| 没有权限 | 「这个任务属于设计组」，给「申请访问」；标题能看就显示标题 |
| 只读 | 字段显示成纯文字，不显示禁用的输入框；顶部不加横幅，属性栏里一行「只读」说明原因 |
| 别人同时在改 | 对方正在改的字段旁边显示对方的头像；保存冲突时保留两份，让用户选 |
| 加载中 | 标题、正文和属性栏各自的[骨架](../../../deernova-style/references/components/skeleton.md)，位置和真实内容一致 |

## 不要

- 顶栏和正文各写一遍标题；标题下面再加一行「任务详情」。
- 把十几个属性堆在标题下面，正文要往下翻才看得到。
- 每个字段旁边一个「编辑」按钮，页面底部再放「保存」「取消」。
- 删除按钮常驻在页面上；删除前不确认、删除后不能撤销。
- 只读时显示一整页灰掉的输入框。
- 返回只写「返回」；从分享链接进来时返回没有去处。
