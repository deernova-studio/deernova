# 成员与权限

一个团队或一个项目里有谁、各自能做什么。管理员来这里邀请人、改角色、把离职的人移出去；普通成员来这里看看还有谁。席位和付费在[账单与订阅](billing.md)，个人的账户设置在[设置页](settings.md)。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 「成员」、邀请；只有能邀请的人看到邀请按钮 | 是 |
| 席位 | 一句话：「已用 8 个席位，共 10 个」，加「增加席位」；免费方案不显示 | 按席位收费时 |
| 筛选行 | 搜索名字或邮箱、按角色筛 | 多于二十人时 |
| 成员表 | [表格](../../../deernova-style/references/components/table.md)：成员（头像、名字、邮箱）、角色、最近活跃、行尾「更多」 | 是 |
| 待接受的邀请 | 单独一组：邮箱、角色、谁邀请的、还有几天过期、「重新发送」「撤销」 | 有邀请时 |
| 角色说明 | 「角色能做什么」，点开是一张角色和操作的对照表 | 是 |
| 邀请链接 | 一条可以复制的链接，有效期和默认角色；可以随时重置 | 否 |

- **角色只有三四个，名字说清能做什么。** 所有者、管理员、成员、访客；每个角色在对照表里一行写全，不让人猜「编辑者」和「协作者」有什么区别。
- **改角色在行里直接改。** 角色列是一个下拉选择，改完立即生效，底部轻提示「周舟现在是管理员」加「撤销」。不进详情页、不点保存。
- **会让自己失去权限的操作要先确认。** 把自己降级、离开团队，先弹窗说明「之后你不能再邀请成员」。
- **团队至少留一个所有者。** 最后一个所有者的「移除」和「降级」是禁用的，旁边写原因「团队至少要有一位所有者，先把所有权转给别人」。
- **移除前说清他的东西去哪。** 「沈遥创建的 12 篇文档会转给你，分享出去的链接照常能打开」。移除不删他的账户，只是不在这个团队里了。
- **自己那一行标「你」。** 行尾的「移除」换成「离开团队」。
- **邀请过期用 `warning`。** 「明天过期」是 `warning` 文字，过期了写「已过期」加「重新发送」；其余是灰字。
- **不给成员按活跃度打分。** 最近活跃只写时间，不画进度条、不排名。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-members { display: grid; align-content: start; gap: var(--space-3); width: 100%; max-width: var(--wide-max); margin-inline: auto; }
.dn-members > h3 { display: flex; align-items: baseline; gap: var(--space-2); margin: var(--space-6) 0 0; font: var(--type-headline); }
.dn-members > h3 > span { color: var(--ink-tertiary); font-weight: var(--weight-regular); }
.dn-seats { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-2) var(--space-4); margin: 0; color: var(--ink-secondary); font: var(--type-callout); font-variant-numeric: tabular-nums; }
.dn-seats > .dn-progress-track { flex: none; width: 120px; }
.dn-members .dn-table-bar { justify-content: space-between; }
.dn-members .dn-table-bar > .dn-input-group { width: min(100%, 280px); }
.dn-members .dn-table td { height: calc(var(--table-row-height) + var(--space-4)); }
.dn-members .dn-table-cell { gap: var(--space-3); }
.dn-members .dn-table-cell > .dn-avatar { width: var(--button-height-md); height: var(--button-height-md); }
.dn-member-name { display: grid; min-width: 0; }
.dn-member-name > span:last-child { overflow: hidden; color: var(--ink-tertiary); font: var(--type-footnote); text-overflow: ellipsis; }
.dn-members .dn-select { width: 128px; }
.dn-members .dn-select > select { height: var(--button-height-sm); }
.dn-members .is-soon { color: var(--warning); }
.dn-roles td:not(:first-child), .dn-roles th:not(:first-child) { width: 88px; text-align: center; }
.dn-roles th[scope="row"] { font-weight: var(--weight-regular); }
.dn-roles .dn-icon { color: var(--ink); }
```

成员表的上面是席位；自己那一行标「你」、角色不能改；待接受的邀请单独一组，快过期的是黄字：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <h2 class="dn-toolbar-title"><span>成员</span></h2>
      <div class="dn-toolbar-actions"><button class="dn-button is-plain is-sm" type="button">角色能做什么</button><button class="dn-button is-primary is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg>邀请</button></div>
    </header>
    <div class="dn-app-content">
      <div class="dn-members">
        <div class="dn-seats"><div class="dn-progress-track" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" aria-label="席位"><div class="dn-progress-bar" style="width: 80%"></div></div>已用 8 个席位，共 10 个<a href="#">增加席位</a></div>
        <div class="dn-table-bar">
          <label class="dn-input-group"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><input type="search" placeholder="搜索名字或邮箱" aria-label="搜索成员"></label>
          <span class="dn-select"><select aria-label="按角色筛选"><option selected>所有角色</option><option>所有者</option><option>管理员</option><option>成员</option><option>访客</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span>
        </div>
        <div class="dn-table-wrap">
          <table class="dn-table">
            <thead><tr><th scope="col">成员</th><th scope="col">角色</th><th scope="col">最近活跃</th><th class="is-actions" scope="col"><span class="sr-only">操作</span></th></tr></thead>
            <tbody>
              <tr>
                <td class="is-primary"><span class="dn-table-cell"><span class="dn-avatar" aria-hidden="true">林</span><span class="dn-member-name"><span>林一 <span class="dn-tag">你</span></span><span>lin@deernova.me</span></span></span></td>
                <td>所有者</td><td>刚刚</td>
                <td class="is-actions"><span class="dn-table-cell"><button class="dn-icon-button" type="button" aria-label="更多操作"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></span></td>
              </tr>
              <tr>
                <td class="is-primary"><span class="dn-table-cell"><span class="dn-avatar" aria-hidden="true">周</span><span class="dn-member-name"><span>周舟</span><span>zhou@deernova.me</span></span></span></td>
                <td><span class="dn-select"><select aria-label="周舟的角色"><option>管理员</option><option selected>成员</option><option>访客</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span></td><td>2 小时前</td>
                <td class="is-actions"><span class="dn-table-cell"><button class="dn-icon-button" type="button" aria-label="更多操作"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></span></td>
              </tr>
              <tr>
                <td class="is-primary"><span class="dn-table-cell"><span class="dn-avatar" aria-hidden="true">沈</span><span class="dn-member-name"><span>沈遥</span><span>shen@deernova.me</span></span></span></td>
                <td><span class="dn-select"><select aria-label="沈遥的角色"><option selected>管理员</option><option>成员</option><option>访客</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span></td><td>昨天</td>
                <td class="is-actions"><span class="dn-table-cell"><button class="dn-icon-button" type="button" aria-label="更多操作"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></span></td>
              </tr>
              <tr>
                <td class="is-primary"><span class="dn-table-cell"><span class="dn-avatar" aria-hidden="true">许</span><span class="dn-member-name"><span>许明</span><span>xu@agency.cn</span></span></span></td>
                <td><span class="dn-select"><select aria-label="许明的角色"><option>管理员</option><option>成员</option><option selected>访客</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span></td><td>10月30日</td>
                <td class="is-actions"><span class="dn-table-cell"><button class="dn-icon-button" type="button" aria-label="更多操作"><svg class="dn-icon" aria-hidden="true"><use href="#dn-more"/></svg></button></span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3>待接受的邀请<span>2</span></h3>
        <div class="dn-table-wrap">
          <table class="dn-table">
            <thead><tr><th scope="col">邮箱</th><th scope="col">角色</th><th scope="col">邀请人</th><th scope="col">过期</th><th class="is-actions" scope="col"><span class="sr-only">操作</span></th></tr></thead>
            <tbody>
              <tr><td class="is-primary">gu@deernova.me</td><td>成员</td><td>林一</td><td class="is-soon">明天过期</td><td class="is-actions"><span class="dn-table-cell"><button class="dn-button is-plain is-sm" type="button">重新发送</button><button class="dn-button is-plain is-sm" type="button">撤销</button></span></td></tr>
              <tr><td class="is-primary">he@studio.cn</td><td>访客</td><td>沈遥</td><td>还有 6 天</td><td class="is-actions"><span class="dn-table-cell"><button class="dn-button is-plain is-sm" type="button">重新发送</button><button class="dn-button is-plain is-sm" type="button">撤销</button></span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
```

「角色能做什么」是一张对照表，一行一个操作，能做的打勾，不能做的空着：

```html
<div class="dn-table-wrap">
  <table class="dn-table dn-roles">
    <thead><tr><th scope="col">操作</th><th scope="col">所有者</th><th scope="col">管理员</th><th scope="col">成员</th><th scope="col">访客</th></tr></thead>
    <tbody>
      <tr><th scope="row">查看共享给他的项目</th><td><svg class="dn-icon" role="img" aria-label="可以"><use href="#dn-check"/></svg></td><td><svg class="dn-icon" role="img" aria-label="可以"><use href="#dn-check"/></svg></td><td><svg class="dn-icon" role="img" aria-label="可以"><use href="#dn-check"/></svg></td><td><svg class="dn-icon" role="img" aria-label="可以"><use href="#dn-check"/></svg></td></tr>
      <tr><th scope="row">新建和编辑文档</th><td><svg class="dn-icon" role="img" aria-label="可以"><use href="#dn-check"/></svg></td><td><svg class="dn-icon" role="img" aria-label="可以"><use href="#dn-check"/></svg></td><td><svg class="dn-icon" role="img" aria-label="可以"><use href="#dn-check"/></svg></td><td></td></tr>
      <tr><th scope="row">邀请和移除成员</th><td><svg class="dn-icon" role="img" aria-label="可以"><use href="#dn-check"/></svg></td><td><svg class="dn-icon" role="img" aria-label="可以"><use href="#dn-check"/></svg></td><td></td><td></td></tr>
      <tr><th scope="row">管理账单和席位</th><td><svg class="dn-icon" role="img" aria-label="可以"><use href="#dn-check"/></svg></td><td></td><td></td><td></td></tr>
      <tr><th scope="row">删除团队</th><td><svg class="dn-icon" role="img" aria-label="可以"><use href="#dn-check"/></svg></td><td></td><td></td><td></td></tr>
    </tbody>
  </table>
</div>
```

### 窄屏和手机浏览器

- 表格换成一行一个人：头像、名字，下面一行是角色；最近活跃不显示。点一行打开这个人的角色和操作。
- 待接受的邀请是列表最后一组。
- 对照表横着放不下时，一个角色一块，列出它能做的操作。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 成员放在设置窗口的「成员」分类里，用 `Table`；角色列是行内的 `Picker`。
- 可以多选几行后一起改角色或移除；右键菜单里有「复制邮箱」「转让所有权」「移除」。
- 邀请按钮在表格下面，左边「+」右边「−」，和系统设置里的列表一样。

```swift
Form {
    Section {
        Table(members, selection: $selection) {
            TableColumn("成员") { MemberCell(member: $0) }
            TableColumn("角色") { member in
                Picker("角色", selection: binding(for: member)) { ForEach(Role.allCases) { Text($0.title).tag($0) } }
                    .labelsHidden()
                    .disabled(member.isLastOwner)
            }
            TableColumn("最近活跃") { Text($0.lastActive, format: .relative(presentation: .named)) }
        }
        .contextMenu(forSelectionType: Member.ID.self) { ids in MemberActions(ids: ids) }
    } footer: {
        HStack {
            ControlGroup { Button("邀请", systemImage: "plus", action: invite); Button("移除", systemImage: "minus", action: removeSelected) }
            Spacer()
            Text("已用 8 个席位，共 10 个").foregroundStyle(.secondary)
        }
    }
}
.formStyle(.grouped)
```

设置窗口的成员分类：表格下面是加减按钮和席位：

```html
<div class="ex-mac is-settings">
  <div class="ex-mac-bar"><div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div><span class="ex-mac-title">成员</span></div>
  <div class="ex-mac-tabs" role="group" aria-label="设置分类">
    <button type="button" aria-pressed="false"><svg class="dn-icon" aria-hidden="true"><use href="#dn-user"/></svg>账户</button>
    <button type="button" aria-pressed="true"><svg class="dn-icon" aria-hidden="true"><use href="#dn-team"/></svg>成员</button>
    <button type="button" aria-pressed="false"><svg class="dn-icon" aria-hidden="true"><use href="#dn-card"/></svg>账单</button>
  </div>
  <div class="ex-mac-form">
    <div class="dn-members">
      <table class="dn-table">
        <thead><tr><th scope="col">成员</th><th scope="col">角色</th></tr></thead>
        <tbody>
          <tr><td class="is-primary"><span class="dn-table-cell"><span class="dn-avatar" aria-hidden="true">林</span><span class="dn-member-name"><span>林一（你）</span><span>lin@deernova.me</span></span></span></td><td>所有者</td></tr>
          <tr aria-selected="true"><td class="is-primary"><span class="dn-table-cell"><span class="dn-avatar" aria-hidden="true">周</span><span class="dn-member-name"><span>周舟</span><span>zhou@deernova.me</span></span></span></td><td><span class="dn-select"><select aria-label="周舟的角色"><option>管理员</option><option selected>成员</option><option>访客</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span></td></tr>
          <tr><td class="is-primary"><span class="dn-table-cell"><span class="dn-avatar" aria-hidden="true">沈</span><span class="dn-member-name"><span>沈遥</span><span>shen@deernova.me</span></span></span></td><td><span class="dn-select"><select aria-label="沈遥的角色"><option selected>管理员</option><option>成员</option><option>访客</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span></td></tr>
        </tbody>
      </table>
      <div class="dn-seats"><span class="dn-plusminus"><button class="dn-icon-button" type="button" aria-label="邀请"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button><button class="dn-icon-button" type="button" aria-label="移除选中的成员"><svg class="dn-icon" aria-hidden="true"><use href="#dn-minus"/></svg></button></span>已用 8 个席位，共 10 个</div>
    </div>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 分组列表：成员一组，待接受的邀请一组；行尾写角色。
- 点一个人进他的页面，角色是一个选择列表，最后一组是红字的「从团队移除」。
- 邀请在右上角，打开的 sheet 里可以填邮箱，也可以直接用系统分享发出邀请链接。

```swift
List {
    Section { ForEach(members) { member in NavigationLink(value: member) { MemberRow(member: member) } } } footer: { Text("已用 8 个席位，共 10 个") }
    Section("待接受的邀请") { ForEach(invites) { InviteRow(invite: $0) } }
}
.navigationTitle("成员")
.toolbar { Button("邀请", systemImage: "plus") { inviting = true } }
.sheet(isPresented: $inviting) { InviteSheet() }
```

成员一组、邀请一组，角色写在行尾：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-icon-button" type="button" aria-label="返回"><svg class="dn-icon" aria-hidden="true"><use href="#dn-back"/></svg></button><button class="dn-icon-button" type="button" aria-label="邀请"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button></div>
      <h3 class="ex-ios-large">成员</h3>
      <section class="dn-list-section"><ul class="dn-list">
        <li class="dn-list-row">林一（你）<span class="dn-list-value">所有者</span></li>
        <li class="dn-list-row">周舟<span class="dn-list-value">成员</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
        <li class="dn-list-row">沈遥<span class="dn-list-value">管理员</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
        <li class="dn-list-row">许明<span class="dn-list-value">访客</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
      </ul><p class="dn-list-footer">已用 8 个席位，共 10 个。</p></section>
      <section class="dn-list-section"><ul class="dn-list">
        <li class="dn-list-row">gu@deernova.me<span class="dn-list-value is-soon">明天过期</span></li>
        <li class="dn-list-row">he@studio.cn<span class="dn-list-value">还有 6 天</span></li>
      </ul><p class="dn-list-footer">待接受的邀请。左滑重新发送或撤销。</p></section>
    </div>
  </div>
</div>
```

Mac 的加减按钮和 iPhone 行尾的过期时间：

```css
.dn-plusminus { display: inline-flex; border: var(--stroke-line) solid var(--line); border-radius: var(--radius-sm); }
.dn-plusminus > .dn-icon-button + .dn-icon-button { border-left: var(--stroke-line) solid var(--line); border-radius: 0; }
.dn-list-value.is-soon { color: var(--warning); }
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 只有自己 | 表格只有一行，下面一句「邀请同事一起用」加邀请按钮和可复制的邀请链接 |
| 席位用完 | 邀请照常能点；邀请弹窗里写「会多用一个席位，每月 ¥30」，加「去增加席位」；免费方案写「免费版最多 3 人」 |
| 没有权限管理 | 角色列是纯文字，没有邀请按钮；顶部不显示席位 |
| 成员由公司账号统一管理 | 顶部一句「成员由你公司的单点登录管理，在那边加人和移除」；表格只读 |
| 邀请发送失败 | 这一行的过期列写 `danger` 的「没有送达：邮箱不存在」，加「修改」 |
| 移除一个人 | 弹窗说明他的文档转给谁、分享链接会不会失效；主按钮是 `is-danger` 的「移除沈遥」 |

## 不要

- 角色起含糊的名字：「协作者」「贡献者」「编辑者」，又不给对照表。
- 改个角色要进详情页、再点保存。
- 移除时只写「确定移除吗？」，不说他的东西会怎样。
- 允许移除最后一个所有者，然后团队没人能管。
- 给成员排活跃度、打分，或者给不活跃的人标红。
- 每个成员配彩色头像底；头像用名字的一个字，墨色字配 `fill-selected` 底。
