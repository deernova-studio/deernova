# 设置页

用户来这里改一项具体的设置，改完就走。设置页要让人快速找到那一项、看懂改了会怎样、改了立刻生效。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 分类 | 左边一栏分类（账户、通知、外观、隐私、高级），当前分类用 `fill-selected` 标出。设置少于两屏时不要分类，整页一列 | 设置多时 |
| 搜索 | 分类栏顶上一个搜索框，按设置名找；结果直接跳到那一项并短暂标出 | 设置超过三十项时 |
| 分组 | 每个分类里几组[分组列表](../../../deernova-style/references/components/list.md)，每组一个短标题；一行一项，名字在左、控件或当前值在右 | 是 |
| 说明 | 只给会带来后果或不明显的项写一句说明，放在组的下面 | 否 |
| 危险操作 | 退出登录、删除账户放在分类最后单独一组，按钮用 `is-danger`，点了先确认 | 有时 |

- **改了就生效。** 开关、单选、下拉选择改完立即保存，不放「保存」按钮；需要填写的项（名字、邮箱）在失焦时保存，出错时在这一项下面说明。
- **当前值写在行尾。** 「外观　跟随系统 ›」，不用点进去就知道现在是什么。
- **进下一级用箭头。** 一项有多个子选项时，行尾放当前值和箭头，点进去是下一页；不在当前页展开一大片。
- 内容栏宽不超过 `form-max`，靠左，不居中漂在宽屏中间。
- 设置项的名字写名词（「通知声音」），不写「是否开启通知声音」。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-settings { display: grid; grid-template-columns: 220px minmax(0, 1fr); flex: 1; min-height: 0; }
.dn-settings-nav { display: flex; flex-direction: column; gap: var(--row-gap); min-height: 0; overflow-y: auto; padding: var(--space-3) var(--space-2); border-right: var(--stroke-line) solid var(--line); }
.dn-settings-nav > .dn-input-group { margin-bottom: var(--space-2); }
.dn-settings-main { min-width: 0; min-height: 0; overflow-y: auto; padding: var(--space-6) var(--page-margin) var(--space-12); }
.dn-settings-main > * { max-width: var(--form-max); }
.dn-settings-main > .dn-list-section + .dn-list-section { margin-top: var(--gap-group); }
.dn-settings-main h2 { margin: 0 0 var(--space-5); font: var(--type-title); }
@media (max-width: 960px) {
  .dn-settings { grid-template-columns: minmax(0, 1fr); }
  .dn-settings-nav { border-right: 0; }
}
```

分类在左，当前值写在行尾，只有会带来后果的一项有说明，危险操作单独一组放最后：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar"><h2 class="dn-toolbar-title"><span>设置</span></h2></header>
    <div class="dn-settings">
      <nav class="dn-settings-nav" aria-label="设置分类">
        <label class="dn-input-group"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><input type="search" placeholder="搜索设置" aria-label="搜索设置"></label>
        <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-user"/></svg><span class="dn-sidebar-label">账户</span></a>
        <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-bell"/></svg><span class="dn-sidebar-label">通知</span></a>
        <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-options"/></svg><span class="dn-sidebar-label">外观</span></a>
        <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-permission"/></svg><span class="dn-sidebar-label">隐私</span></a>
      </nav>
      <div class="dn-settings-main">
        <h2>账户</h2>
        <section class="dn-list-section">
          <ul class="dn-list">
            <li class="dn-list-row">名字<span class="dn-list-value">林一</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
            <li class="dn-list-row">邮箱<span class="dn-list-value">lin@deernova.me</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
            <li class="dn-list-row">订阅<span class="dn-list-value">个人版，按年</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
          </ul>
        </section>
        <section class="dn-list-section">
          <ul class="dn-list">
            <li class="dn-list-row"><label for="ex-settings-sync">iCloud 同步</label><input class="dn-switch" id="ex-settings-sync" type="checkbox" role="switch" checked></li>
          </ul>
          <p class="dn-list-footer">关闭后，新笔记只保存在这台设备上。</p>
        </section>
        <section class="dn-list-section">
          <ul class="dn-list">
            <li class="dn-list-row">退出登录<button class="dn-button is-sm dn-list-value" type="button">退出</button></li>
            <li class="dn-list-row">删除账户<button class="dn-button is-danger is-sm dn-list-value" type="button">删除…</button></li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 窄于 `breakpoint-md`：分类栏变成第一页，点一个分类进入它的设置，顶栏出现返回。
- 搜索留在分类页顶上。
- 行尾的当前值放不下时先截断当前值，不截断设置名。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 用 `Settings` 场景打开独立的设置窗口（⌘,），不放在主窗口里。
- 分类少于六个用窗口顶部的标签（`TabView`），多了用左边的侧边栏；内容用 `Form` 加 `.formStyle(.grouped)`。
- 设置窗口不能缩放到很大，宽度跟着内容；改了立即生效，没有「好」和「取消」。

```swift
Settings {
    TabView {
        AccountSettings().tabItem { Label("账户", systemImage: "person.crop.circle") }
        NotificationSettings().tabItem { Label("通知", systemImage: "bell") }
        AppearanceSettings().tabItem { Label("外观", systemImage: "circle.lefthalf.filled") }
    }
    .frame(width: 480)
}

struct AccountSettings: View {
    var body: some View {
        Form {
            Section { LabeledContent("名字", value: name) }
            Section { Toggle("iCloud 同步", isOn: $sync) } footer: { Text("关闭后，新笔记只保存在这台设备上。") }
        }
        .formStyle(.grouped)
    }
}
```

独立的设置窗口，顶部是分类标签，内容是分组表单：

```html
<div class="ex-mac is-settings">
  <div class="ex-mac-bar"><div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div><span class="ex-mac-title">账户</span></div>
  <div class="ex-mac-tabs" role="group" aria-label="设置分类">
    <button type="button" aria-pressed="true"><svg class="dn-icon" aria-hidden="true"><use href="#dn-user"/></svg>账户</button>
    <button type="button" aria-pressed="false"><svg class="dn-icon" aria-hidden="true"><use href="#dn-bell"/></svg>通知</button>
    <button type="button" aria-pressed="false"><svg class="dn-icon" aria-hidden="true"><use href="#dn-options"/></svg>外观</button>
  </div>
  <div class="ex-mac-form">
    <ul class="dn-list"><li class="dn-list-row">名字<span class="dn-list-value">林一</span></li><li class="dn-list-row">邮箱<span class="dn-list-value">lin@deernova.me</span></li></ul>
    <section class="dn-list-section"><ul class="dn-list"><li class="dn-list-row"><label for="ex-mac-sync">iCloud 同步</label><input class="dn-switch" id="ex-mac-sync" type="checkbox" role="switch" checked></li></ul><p class="dn-list-footer">关闭后，新笔记只保存在这台设备上。</p></section>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 用 `Form` 的分组列表；分类是第一层列表，点进去是下一页，顶部有返回。
- 当前值写在行尾，箭头表示进下一页；开关切换立即生效。
- 退出登录、删除账户放在最后一组，删除用红字，点了先确认。

```swift
NavigationStack {
    Form {
        Section {
            NavigationLink { AccountView() } label: { LabeledContent("账户", value: "林一") }
            NavigationLink { AppearanceView() } label: { LabeledContent("外观", value: "跟随系统") }
        }
        Section { Toggle("iCloud 同步", isOn: $sync) } footer: { Text("关闭后，新笔记只保存在这台设备上。") }
        Section { Button("删除账户…", role: .destructive, action: confirmDelete) }
    }
    .navigationTitle("设置")
}
```

分组列表，当前值写在行尾；删除账户单独一组放最后：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"></div>
      <h3 class="ex-ios-large">设置</h3>
      <ul class="dn-list">
        <li class="dn-list-row">账户<span class="dn-list-value">林一</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
        <li class="dn-list-row">外观<span class="dn-list-value">跟随系统</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
      </ul>
      <section class="dn-list-section"><ul class="dn-list"><li class="dn-list-row"><label for="ex-ios-sync">iCloud 同步</label><input class="dn-switch" id="ex-ios-sync" type="checkbox" role="switch" checked></li></ul><p class="dn-list-footer">关闭后，新笔记只保存在这台设备上。</p></section>
      <ul class="dn-list"><li class="dn-list-row ex-danger-row">删除账户…</li></ul>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 保存失败 | 控件回到原来的值，行下面一句「没有保存，网络断开了」加「重试」 |
| 需要重启或重新登录才生效 | 这一项下面一句说明；改完后在分组下方出现「重新启动」按钮，不弹窗打断 |
| 由管理员统一设置 | 控件换成纯文字的当前值，说明一句「由你的团队管理员设置」 |
| 搜索没有结果 | 「没有叫“字体大小”的设置」，下面列出外观分类的入口 |
| 删除账户 | 先弹[弹窗](../../../deernova-style/references/components/sheet.md)说明会删掉什么、能不能恢复，要求输入账户名再确认 |

## 不要

- 每一项都配一句说明；把说明写成功能介绍（「开启后你可以随时随地……」）。
- 开关切换后还要点「保存所有设置」；离开页面时问「是否保存」。
- 设置项排成卡片网格，每张卡片一个渐变图标。
- 把还没做好的设置先放出来，标「即将推出」。
- 删除账户和普通设置混在一起，或者点一下就删。
- 设置名写成问句：「是否在启动时打开上次的笔记？」
