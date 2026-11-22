# 表单与多步向导

新建一个东西，或者填一份申请：新建项目、开通团队、提交报销。字段少的放一页填完；字段多、又能分成意思清楚的几组时，分成几步，一步一屏。字段本身怎么排、怎么校验按 style 的[表单](../../../deernova-style/references/components/form.md)，这一页讲整页的结构：步骤、草稿、确认和离开。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 关闭、标题（「新建项目」）、草稿状态（「草稿已保存」） | 是 |
| 步骤 | 左边一列步骤名，做完的打勾、能点回去；当前这一步底色标出 | 三步及以上时 |
| 这一步 | 一个标题、一句说明这一步决定什么，然后是字段；宽度不超过 `form-max`，在步骤列右边的区域里居中 | 是 |
| 底部操作 | 吸底一条：左边「上一步」，右边「下一步」；最后一步的主按钮写结果，「创建项目」 | 是 |
| 确认 | 最后一步把前面填的列成一张清单，每组右边一个「修改」，点了跳回那一步 | 四步及以上时 |
| 预览 | 右边一栏，边填边显示建好之后的样子 | 否 |

- **能一页填完就不分步。** 十项以内、没有先后关系的字段放一页。分步只是为了让每一屏的决定少一点，不是为了显得正式。
- **最多五步。** 步骤名写这一步填什么：「基本信息」「成员」「权限」「确认」，不写「第一步」。
- **进度只看步骤列。** 不加百分比进度条，不写「已完成 50%」。
- **前面的步骤随时能回去。** 做完的步骤可以点；后面的步骤在前面填完之前不能点，但名字照常显示，让人知道还剩什么。
- **默认值替人填好。** 可见范围默认「只有成员」，角色默认「可以编辑」；大部分人不用改的项，放进「更多选项」折起来。
- **点「下一步」才校验这一步。** 单个字段失焦时只查格式；点下一步时查这一步全部，出错的字段下面写怎么改，焦点移到第一个出错的字段。不在打字时报错。
- **自动存草稿，关闭不拦人。** 每改一项都存；关掉后在列表里是一条「草稿」，回来从离开的那一步接着填。所以关闭时不弹「放弃修改？」。
- **主按钮写结果。** 「创建项目」「提交报销」「开通团队」，不写「完成」「提交」「确定」。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-wizard { display: grid; grid-template-columns: var(--sidebar-width-min) minmax(0, 1fr); flex: 1; min-height: 0; }
.dn-wizard-steps { display: flex; flex-direction: column; gap: var(--row-gap); margin: 0; padding: var(--space-6) var(--space-3); border-right: var(--stroke-line) solid var(--line); list-style: none; }
.dn-wizard-steps > li > :is(a, span) { display: flex; align-items: center; gap: var(--space-2); min-height: var(--row-height); padding: 0 var(--row-padding-x); border-radius: var(--row-radius); color: var(--ink-tertiary); font: var(--type-callout); text-decoration: none; }
.dn-wizard-steps > .is-done > a { color: var(--ink-secondary); }
.dn-wizard-steps > .is-done > a:hover { background: var(--fill-hover); color: var(--ink); }
.dn-wizard-steps > [aria-current="step"] > span { background: var(--fill-selected); color: var(--ink); font-weight: var(--weight-medium); }
.dn-wizard-num { display: grid; place-items: center; flex: none; width: 20px; height: 20px; border: var(--stroke-line) solid var(--line-control); border-radius: var(--radius-full); font: var(--weight-medium) var(--type-caption-size)/1 var(--font-sans); font-variant-numeric: tabular-nums; }
.dn-wizard-num > .dn-icon { width: var(--icon-size-sm); height: var(--icon-size-sm); }
.is-done .dn-wizard-num { border-color: var(--accent); background: var(--accent); color: var(--on-accent); }
[aria-current="step"] .dn-wizard-num { border-color: var(--ink); color: var(--ink); }
.dn-wizard-main { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
.dn-wizard-body { flex: 1; min-height: 0; overflow-y: auto; padding: var(--space-6) max(var(--page-margin), calc((100% - var(--form-max)) / 2)) var(--space-8); }
.dn-wizard-title { margin: 0 0 var(--space-1); font: var(--type-title); }
.dn-wizard-lede { margin: 0 0 var(--space-6); color: var(--ink-secondary); font: var(--type-callout); }
.dn-wizard-foot { padding: var(--space-3) max(var(--page-margin), calc((100% - var(--form-max)) / 2)); border-top: var(--stroke-line) solid var(--line); background: var(--canvas); }
.dn-wizard-foot > div { display: flex; align-items: center; gap: var(--space-2); }
.dn-wizard-foot .is-primary { margin-left: auto; }
.dn-wizard-invite { display: flex; gap: var(--space-2); }
.dn-wizard-invite > .dn-input { flex: 1; min-width: 0; }
.dn-people { display: grid; margin: 0; padding: 0; list-style: none; }
.dn-people > li { display: grid; grid-template-columns: auto minmax(0, 1fr) 128px auto; align-items: center; gap: var(--space-3); min-height: calc(var(--row-height) + var(--space-4)); border-bottom: var(--stroke-line) solid var(--line); }
.dn-people-pending { color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-recap { display: grid; gap: var(--space-5); }
.dn-recap > section { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: var(--space-2) var(--space-4); padding-bottom: var(--space-5); border-bottom: var(--stroke-line) solid var(--line); }
.dn-recap h4 { margin: 0; font: var(--type-headline); }
.dn-recap .dn-props { grid-column: 1 / -1; }
@media (max-width: 760px) {
  .dn-wizard { grid-template-columns: minmax(0, 1fr); }
  .dn-wizard-steps { display: none; }
}
```

第二步「成员」：基本信息已经打勾、能点回去；后面两步灰着；邀请的人列在下面，角色有默认值；底部吸底的操作和表单同宽：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <button class="dn-icon-button" type="button" aria-label="关闭"><svg class="dn-icon" aria-hidden="true"><use href="#dn-close"/></svg></button>
      <h2 class="dn-toolbar-title"><span>新建项目</span></h2>
      <div class="dn-toolbar-actions"><span class="dn-save-state">草稿已保存</span></div>
    </header>
    <div class="dn-wizard">
      <ol class="dn-wizard-steps" aria-label="步骤">
        <li class="is-done"><a href="#"><span class="dn-wizard-num"><svg class="dn-icon" aria-hidden="true"><use href="#dn-check"/></svg></span>基本信息</a></li>
        <li aria-current="step"><span><span class="dn-wizard-num">2</span>成员</span></li>
        <li><span><span class="dn-wizard-num">3</span>权限</span></li>
        <li><span><span class="dn-wizard-num">4</span>确认</span></li>
      </ol>
      <div class="dn-wizard-main">
        <div class="dn-wizard-body">
          <h3 class="dn-wizard-title">成员</h3>
          <p class="dn-wizard-lede">谁一起做「发布 2.0」。以后在项目设置里还能加人。</p>
          <div class="dn-form">
            <div class="dn-field">
              <label class="dn-field-label" for="ex-wiz-invite">邀请</label>
              <div class="dn-wizard-invite"><input class="dn-input" id="ex-wiz-invite" type="email" placeholder="邮箱，多个用逗号隔开" aria-describedby="ex-wiz-invite-help"><button class="dn-button" type="button">添加</button></div>
              <p class="dn-field-help" id="ex-wiz-invite-help">对方会收到一封邮件，7 天内有效。</p>
            </div>
            <ul class="dn-people" aria-label="已添加的成员">
              <li><span class="dn-avatar is-lg" aria-hidden="true">林</span><span class="dn-item-text"><span class="dn-item-title">林一（你）</span><span class="dn-item-detail">lin@deernova.me</span></span><span class="dn-people-pending">所有者</span><span></span></li>
              <li><span class="dn-avatar is-lg" aria-hidden="true">周</span><span class="dn-item-text"><span class="dn-item-title">周舟</span><span class="dn-item-detail">zhou@deernova.me</span></span><span class="dn-select"><select aria-label="周舟的角色"><option selected>可以编辑</option><option>只能查看</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span><button class="dn-icon-button" type="button" aria-label="移除周舟"><svg class="dn-icon" aria-hidden="true"><use href="#dn-close"/></svg></button></li>
              <li><span class="dn-avatar is-lg" aria-hidden="true">s</span><span class="dn-item-text"><span class="dn-item-title">shen@studio.cn</span><span class="dn-item-detail">还没有账户，会收到注册邀请</span></span><span class="dn-select"><select aria-label="shen@studio.cn 的角色"><option selected>可以编辑</option><option>只能查看</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span><button class="dn-icon-button" type="button" aria-label="移除 shen@studio.cn"><svg class="dn-icon" aria-hidden="true"><use href="#dn-close"/></svg></button></li>
            </ul>
            <fieldset class="dn-choice-group">
              <legend>谁能找到这个项目</legend>
              <label class="dn-choice"><span class="dn-choice-box"><input type="radio" name="ex-wiz-scope" checked></span><span class="dn-choice-text"><span class="dn-choice-label">只有成员</span></span></label>
              <label class="dn-choice"><span class="dn-choice-box"><input type="radio" name="ex-wiz-scope"></span><span class="dn-choice-text"><span class="dn-choice-label">团队里所有人</span><span class="dn-choice-help">不是成员的人能看到名字，可以申请加入。</span></span></label>
            </fieldset>
          </div>
        </div>
        <div class="dn-wizard-foot"><div><button class="dn-button is-plain" type="button">上一步</button><button class="dn-button is-primary" type="button">下一步</button></div></div>
      </div>
    </div>
  </div>
</div>
```

最后一步把前面填的列成清单，每组都能跳回去改；主按钮写结果：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <button class="dn-icon-button" type="button" aria-label="关闭"><svg class="dn-icon" aria-hidden="true"><use href="#dn-close"/></svg></button>
      <h2 class="dn-toolbar-title"><span>新建项目</span></h2>
      <div class="dn-toolbar-actions"><span class="dn-save-state">草稿已保存</span></div>
    </header>
    <div class="dn-wizard">
      <ol class="dn-wizard-steps" aria-label="步骤">
        <li class="is-done"><a href="#"><span class="dn-wizard-num"><svg class="dn-icon" aria-hidden="true"><use href="#dn-check"/></svg></span>基本信息</a></li>
        <li class="is-done"><a href="#"><span class="dn-wizard-num"><svg class="dn-icon" aria-hidden="true"><use href="#dn-check"/></svg></span>成员</a></li>
        <li class="is-done"><a href="#"><span class="dn-wizard-num"><svg class="dn-icon" aria-hidden="true"><use href="#dn-check"/></svg></span>权限</a></li>
        <li aria-current="step"><span><span class="dn-wizard-num">4</span>确认</span></li>
      </ol>
      <div class="dn-wizard-main">
        <div class="dn-wizard-body">
          <h3 class="dn-wizard-title">确认</h3>
          <p class="dn-wizard-lede">创建后会给 2 个人发邀请。</p>
          <div class="dn-recap">
            <section><h4>基本信息</h4><a class="dn-button is-plain is-sm" href="#">修改</a><dl class="dn-props"><dt>名称</dt><dd>发布 2.0</dd><dt>开始</dt><dd>11月10日</dd><dt>结束</dt><dd>12月20日</dd></dl></section>
            <section><h4>成员</h4><a class="dn-button is-plain is-sm" href="#">修改</a><dl class="dn-props"><dt>成员</dt><dd>林一、周舟、shen@studio.cn</dd><dt>可见范围</dt><dd>只有成员</dd></dl></section>
            <section><h4>权限</h4><a class="dn-button is-plain is-sm" href="#">修改</a><dl class="dn-props"><dt>邀请他人</dt><dd>只有所有者</dd><dt>分享链接</dt><dd>关闭</dd></dl></section>
          </div>
        </div>
        <div class="dn-wizard-foot"><div><button class="dn-button is-plain" type="button">上一步</button><button class="dn-button is-primary" type="button">创建项目</button></div></div>
      </div>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 左边的步骤列收起，顶栏标题下面一行小字「第 2 步，共 4 步：成员」。
- 底部操作吸在屏幕底部，跟着键盘升起；「上一步」换成顶栏的返回。
- 确认清单一组一块，「修改」放在组标题的同一行。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 新建用一个附着在窗口上的 `sheet`，固定宽度，不铺满窗口；只有一屏的表单直接放在 sheet 里，分步的在 sheet 里换内容。
- 步骤写在 sheet 顶部，一行文字「基本信息 › 成员 › 权限 › 确认」，当前那一步是墨色。
- 按钮在右下角：主按钮是默认按钮，回车触发；「上一步」在它左边，「取消」在最左。Esc 关闭，草稿照样保存。

```swift
.sheet(isPresented: $creating) {
    NavigationStack(path: $steps) {
        BasicInfoStep(draft: $draft)
            .navigationDestination(for: Step.self) { step in StepView(step: step, draft: $draft) }
    }
    .frame(width: 520, height: 460)
    .safeAreaInset(edge: .top) { StepTrail(steps: Step.allCases, current: steps.last ?? .basics) }
    .toolbar {
        ToolbarItem(placement: .cancellationAction) { Button("取消", action: close) }
        ToolbarItem(placement: .confirmationAction) {
            Button(isLast ? "创建项目" : "下一步", action: next).keyboardShortcut(.defaultAction)
        }
    }
}
```

附着在窗口上的 sheet，顶部一行步骤，按钮在右下：

```html
<div class="ex-mac is-settings">
  <div class="ex-mac-bar"><div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div><span class="ex-mac-title">新建项目</span></div>
  <p class="dn-wizard-trail"><span>基本信息</span><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-right"/></svg><span aria-current="step">成员</span><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-right"/></svg><span>权限</span><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-right"/></svg><span>确认</span></p>
  <div class="ex-mac-form">
    <div class="dn-field">
      <label class="dn-field-label" for="ex-mac-wiz-invite">邀请</label>
      <div class="dn-wizard-invite"><input class="dn-input" id="ex-mac-wiz-invite" type="email" placeholder="邮箱，多个用逗号隔开"><button class="dn-button" type="button">添加</button></div>
    </div>
    <ul class="dn-people" aria-label="已添加的成员">
      <li><span class="dn-avatar is-lg" aria-hidden="true">林</span><span class="dn-item-text"><span class="dn-item-title">林一（你）</span><span class="dn-item-detail">lin@deernova.me</span></span><span class="dn-people-pending">所有者</span><span></span></li>
      <li><span class="dn-avatar is-lg" aria-hidden="true">周</span><span class="dn-item-text"><span class="dn-item-title">周舟</span><span class="dn-item-detail">zhou@deernova.me</span></span><span class="dn-select"><select aria-label="周舟的角色"><option selected>可以编辑</option><option>只能查看</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span><button class="dn-icon-button" type="button" aria-label="移除周舟"><svg class="dn-icon" aria-hidden="true"><use href="#dn-close"/></svg></button></li>
    </ul>
    <div class="dn-form-actions"><button class="dn-button is-plain" type="button">取消</button><button class="dn-button" type="button">上一步</button><button class="dn-button is-primary" type="button">下一步</button></div>
  </div>
</div>
```

步骤那一行：

```css
.dn-wizard-trail { display: flex; align-items: center; justify-content: center; gap: var(--space-1); margin: 0; padding: 0 var(--space-4) var(--space-3); border-bottom: var(--stroke-line) solid var(--line); color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-wizard-trail > .dn-icon { width: var(--icon-size-sm); height: var(--icon-size-sm); }
.dn-wizard-trail > [aria-current="step"] { color: var(--ink); font-weight: var(--weight-medium); }
.dn-form-actions > .dn-button.is-plain:first-child { margin-right: auto; }
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 从底部升起一张全屏 sheet；每一步是一页，往里推进，返回就是上一步。
- 左上「取消」，右上「下一步」，最后一步右上是「创建」；导航标题下面一行小字「2 / 4」。
- 字段用分组的 `Form`；邀请的人一行一个，左滑移除。

```swift
NavigationStack(path: $steps) {
    BasicInfoStep(draft: $draft)
        .navigationDestination(for: Step.self) { step in
            StepView(step: step, draft: $draft)
                .navigationTitle(step.title)
                .navigationSubtitle("\(step.number) / \(Step.allCases.count)")
                .toolbar {
                    ToolbarItem(placement: .confirmationAction) { Button(step.isLast ? "创建" : "下一步", action: next) }
                }
        }
        .toolbar { ToolbarItem(placement: .cancellationAction) { Button("取消", action: close) } }
}
```

第二步，标题下面是进度，右上是下一步：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-icon-button" type="button" aria-label="上一步"><svg class="dn-icon" aria-hidden="true"><use href="#dn-back"/></svg></button><span class="ex-ios-nav-title">成员<small class="dn-wizard-count">2 / 4</small></span><button class="dn-button is-plain is-sm" type="button">下一步</button></div>
      <div class="dn-wizard-invite"><input class="dn-input" type="email" placeholder="邮箱" aria-label="邀请"><button class="dn-button" type="button">添加</button></div>
      <ul class="dn-list">
        <li class="dn-list-row">林一（你）<span class="dn-list-value">所有者</span></li>
        <li class="dn-list-row">周舟<span class="dn-list-value">可以编辑</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
        <li class="dn-list-row">shen@studio.cn<span class="dn-list-value">可以编辑</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
      </ul>
      <section class="dn-list-section"><ul class="dn-list"><li class="dn-list-row">谁能找到<span class="dn-list-value">只有成员</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li></ul><p class="dn-list-footer">对方会收到一封邮件，7 天内有效。</p></section>
    </div>
  </div>
</div>
```

```css
.dn-wizard-count { display: block; color: var(--ink-tertiary); font: var(--type-caption); }
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 点下一步时有错 | 留在这一步，出错的字段下面写怎么改，焦点移到第一个；步骤列里这一步不打勾 |
| 回到前面改了会影响后面的项 | 后面受影响的步骤去掉勾，名字后面写「需要重新确认」 |
| 草稿保存失败 | 顶栏的「草稿已保存」换成 `warning` 的「没能保存草稿」加「重试」，照样能往下填 |
| 回来接着填 | 从离开的那一步打开，顶部一句「接着上次的草稿，11月18日」加「重新开始」 |
| 正在创建 | 主按钮保持宽度，换成加载动效加「正在创建」；字段照常显示，不能再点 |
| 创建失败 | 留在确认页，顶部[横幅](../../../deernova-style/references/components/banner.md)写原因（「名称和已有项目重复」），点一下跳到那一项 |
| 创建成功 | 直接进入新建好的项目，不弹「创建成功」；草稿从列表里消失 |

## 不要

- 三四个字段也拆成三步，每步一个「下一步」。
- 步骤写成「第一步」「第二步」，或者只有数字没有名字。
- 顶部一条百分比进度条，加「还差一点就完成了！」。
- 用户打字时就标红；必填项只靠红色星号。
- 关闭时弹「确定要离开吗？你填的内容将会丢失」。
- 最后的按钮写「完成」「提交」，看不出点了会发生什么。
- 成功后弹一个撒花的「恭喜！项目创建成功」。
