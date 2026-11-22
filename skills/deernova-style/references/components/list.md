# 分组列表与设置页

分组列表，用于设置页、详情页和各种表单：一组组白色的列表浮在 `canvas` 上。

**需要提供**：分组，每个分组可以有页头和页脚说明；每一行提供标题，以及可选的图标、右侧的值、开关或箭头，点击后跳转或执行动作。

## 尺寸

<!-- tokens:list -->
| Token | 桌面<br>Web 应用、macOS 内容区 | 触控<br>iOS、iPadOS、Web 触屏 | 舒展<br>官网与文档 | 用途 |
| --- | --- | --- | --- | --- |
| `row-icon-size` | 20 | 28 | 24 | 列表行左侧图标底的边长。 |
| `switch-width` | 36 | 51 | 44 | 开关宽度。 |
| `switch-height` | 20 | 31 | 24 | 开关高度；圆钮直径 = 高度 − 4。 |
<!-- /tokens -->

行高、行内边距沿用[侧边栏](sidebar.md)的 `row-height`、`row-padding-x`；分组圆角沿用[卡片](card.md)的 `card-radius`。

- 页面底色 `canvas`，分组底色 `surface-raised`，分组之间 `gap-group`。
- 每行最小高度 `row-height`，文字 `type-body`、`ink`；右侧的值用 `ink-secondary`，箭头用 `ink-tertiary`。
- 图标放在边长 `row-icon-size` 的方块里，`accent-soft` 底、`ink` 图标、`radius-sm`。整个列表统一用灰色，不要每行一个颜色。
- 分隔线 `stroke-line`、`line` 色，从文字起点开始。
- 页头 `footnote` 字号、`ink-secondary`；页脚 `footnote` 字号、`ink-tertiary`，写清楚这个设置会带来什么后果。
- 开关打开时是墨色轨道（`accent`），圆钮换成 `on-accent`：浅色主题黑底白钮，深色主题浅底黑钮，两套主题都看得清。开关是页面里最常出现的控件，用彩色会让它比内容更抢眼。原生应用用系统开关，圆钮固定是白色，轨道沿用 `success`。
- **设置行**：一行一项，左边是名字和一句说明（[`dn-item-text`](../foundations/layout.md)），右边是控件（开关、下拉、短输入框、按钮），放在 `dn-list-control` 里，最宽 300px。说明只写后果或当前来源，不复述名字。
- **恢复继承**：值来自团队或上一级默认、又被单独改过时，名字后面一个恢复按钮（`dn-list-reset`），说明写「单独设置，默认是“低”」；跟随默认时说明写「默认」，没有恢复按钮。
- **单选行**：一组互斥的选项排成一组列表（`div.dn-list` 加 `role="radiogroup"`，每行是一个 `label.dn-list-row`），每行左边是单选圆，和第一行文字对齐；不把单选组散着铺在页面上。
- **子项**：一行下面附属的几项（一个连接里的几个操作），缩进到主行文字的起点，分隔线也从那里开始。
- 一组里的前导统一：都是小图标，或者都是 `button-height-md` 的头像或标记。

## Web

什么时候用开关、复选框还是单选，见[选择控件](choice.md)。开关用原生的 `<input type="checkbox" role="switch">`，保留键盘和读屏支持。

```css
.dn-list-section { display: grid; gap: var(--space-2); }
.dn-list-section + .dn-list-section { margin-top: var(--gap-group); }
.dn-list-header, .dn-list-footer { margin: 0; padding: 0 var(--row-padding-x); font: var(--weight-regular) var(--type-footnote-size)/var(--type-footnote-line) var(--font-sans); }
.dn-list-header { color: var(--ink-secondary); }
.dn-list-footer { color: var(--ink-tertiary); }
.dn-list { margin: 0; padding: 0; overflow: hidden; list-style: none; border-radius: var(--card-radius); background: var(--surface-raised); }
.dn-list-row {
  --separator-inset: var(--row-padding-x);
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-height: var(--row-height);
  padding: 0 var(--row-padding-x);
  color: var(--ink);
  font: var(--type-body);
}
.dn-list-row.has-icon { --separator-inset: calc(var(--row-padding-x) + var(--row-icon-size) + var(--space-3)); }
.dn-list-row + .dn-list-row::before, .dn-list > li + li > .dn-list-row::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  left: var(--separator-inset);
  border-top: var(--stroke-line) var(--line-style-divider) var(--line);
}
.dn-list-icon { display: grid; place-items: center; flex: none; width: var(--row-icon-size); height: var(--row-icon-size); border-radius: var(--radius-sm); background: var(--accent-soft); color: var(--ink); }
.dn-list-icon .dn-icon { width: calc(var(--row-icon-size) * 0.6); height: calc(var(--row-icon-size) * 0.6); }
.dn-list-value { margin-left: auto; color: var(--ink-secondary); white-space: nowrap; }
.dn-list-row .dn-chevron { width: var(--icon-size-sm); height: var(--icon-size-sm); margin-left: auto; color: var(--ink-tertiary); }
.dn-list-value + .dn-chevron { margin-left: 0; }
.dn-list-row:has(> .dn-item-text > .dn-item-detail) { padding-block: var(--space-2); }
.dn-list-row > .dn-item-text { flex: 1; min-width: 9em; }
.dn-list-row > :is(.dn-avatar, .dn-mark) { flex: none; }
.dn-list-row.has-lead { --separator-inset: calc(var(--row-padding-x) + var(--button-height-md) + var(--space-3)); }
.dn-list-row.is-sub { --separator-inset: calc(var(--row-padding-x) + var(--button-height-md) + var(--space-3)); padding-left: var(--separator-inset); }
label.dn-list-row { cursor: pointer; }
.dn-list-row > .dn-choice-box { align-self: flex-start; }
.dn-list-row:has(> .dn-item-text > .dn-item-detail) > .dn-choice-box { margin-top: calc((var(--type-body-line) - var(--check-size)) / 2); }
.dn-list-control { display: flex; flex: 0 1 300px; align-items: center; justify-content: flex-end; gap: var(--space-2); min-width: 0; margin-left: auto; }
.dn-list-control > :is(.dn-input, .dn-select, .dn-segmented) { flex: 1; min-width: 0; }
.dn-list-control > .dn-segmented > button { flex: 1; }
.dn-list-control > :is(.dn-switch, .dn-button, .dn-icon-button) { flex: none; margin-left: 0; }
.dn-list-reset { width: var(--button-height-sm); height: var(--button-height-sm); margin-block: calc(-1 * var(--space-1)); color: var(--ink-tertiary); vertical-align: middle; }
.dn-list-reset .dn-icon { width: var(--icon-size-sm); height: var(--icon-size-sm); }

.dn-switch {
  position: relative;
  flex: none;
  width: var(--switch-width);
  height: var(--switch-height);
  margin: 0 0 0 auto;
  border-radius: var(--radius-full);
  background: var(--fill-selected);
  appearance: none;
  cursor: pointer;
  transition: background-color var(--duration-base) var(--ease-standard);
}
.dn-switch::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(var(--switch-height) - 4px);
  height: calc(var(--switch-height) - 4px);
  border-radius: var(--radius-full);
  background: var(--knob);
  box-shadow: var(--shadow-control);
  transition: transform var(--duration-base) var(--ease-standard);
}
.dn-switch:checked { background: var(--accent); }
.dn-switch:checked::after { background: var(--on-accent); }
.dn-switch:checked::after { transform: translateX(calc(var(--switch-width) - var(--switch-height))); }
.dn-switch:focus-visible { outline: var(--stroke-focus) solid var(--focus-ring); outline-offset: var(--focus-offset); }
```

```html
<section class="dn-list-section">
  <h3 class="dn-list-header">同步</h3>
  <ul class="dn-list">
    <li class="dn-list-row has-icon"><span class="dn-list-icon"><svg class="dn-icon" aria-hidden="true"><use href="#dn-user"/></svg></span>个人资料<span class="dn-list-value">林一</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
    <li class="dn-list-row has-icon"><span class="dn-list-icon"><svg class="dn-icon" aria-hidden="true"><use href="#dn-cloud"/></svg></span><label for="sync">iCloud 同步</label><input class="dn-switch" id="sync" type="checkbox" role="switch" checked></li>
  </ul>
  <p class="dn-list-footer">关闭 iCloud 同步后，新笔记只保存在这台设备上。</p>
</section>
```

设置行：名字和说明在左，控件在右；单独改过的值有恢复按钮；单选行的圆对齐第一行：

```html
<section class="dn-list-section">
  <h3 class="dn-list-header">模型</h3>
  <ul class="dn-list">
    <li class="dn-list-row"><span class="dn-item-text"><span class="dn-item-title">地址</span><span class="dn-item-detail">服务商文档里的 Base URL</span></span><span class="dn-list-control"><input class="dn-input" value="https://api.deepseek.com/v1" aria-label="地址"></span></li>
    <li class="dn-list-row"><span class="dn-item-text"><span class="dn-item-title">思考深度<button class="dn-icon-button dn-list-reset" type="button" aria-label="恢复成默认"><svg class="dn-icon" aria-hidden="true"><use href="#dn-undo"/></svg></button></span><span class="dn-item-detail">单独设置，默认是「低」</span></span><span class="dn-list-control"><span class="dn-select"><select aria-label="思考深度"><option>低</option><option selected>中</option><option>高</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span></span></li>
    <li class="dn-list-row"><span class="dn-item-text"><span class="dn-item-title">连接</span><span class="dn-item-detail is-success">已连接，2 分钟前</span></span><span class="dn-list-control"><button class="dn-button is-sm" type="button">测试连接</button></span></li>
  </ul>
</section>
<section class="dn-list-section">
  <h3 class="dn-list-header">整体权限</h3>
  <div class="dn-list" role="radiogroup" aria-label="整体权限">
    <label class="dn-list-row"><span class="dn-choice-box"><input type="radio" name="list-level"></span><span class="dn-item-text"><span class="dn-item-title">每次都问</span><span class="dn-item-detail">新建、修改、发送前都先问你</span></span></label>
    <label class="dn-list-row"><span class="dn-choice-box"><input type="radio" name="list-level" checked></span><span class="dn-item-text"><span class="dn-item-title">只在外发前问</span><span class="dn-item-detail">发送、付费、删除前问你</span></span></label>
  </div>
</section>
```

## SwiftUI

```swift
Form {
    Section("账号") {
        NavigationLink { ProfileView() } label: {
            LabeledContent { Text("林一") } label: { Label("个人资料", systemImage: "person") }
        }
    }
    Section {
        Toggle(isOn: $iCloudSync) { Label("iCloud 同步", systemImage: "icloud") }
            .tint(.success)
    } header: {
        Text("同步")
    } footer: {
        Text("关闭 iCloud 同步后，新笔记只保存在这台设备上。")
    }
}
.scrollContentBackground(.hidden)
.background(.canvas)
.tint(.brandAccent)
```

Mac 上的设置窗口同样用 `Form` 加 `.formStyle(.grouped)`，系统会给出对应的 Mac 样式。

## 不要

- 每行用不同颜色的图标。
- 页脚写成一大段。
- 在列表行里放主按钮（主按钮放在页面底部）。
