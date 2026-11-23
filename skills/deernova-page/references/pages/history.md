# 版本历史

一篇文档过去的样子：谁在什么时候改了什么，能把整篇恢复到某个版本，或者只拿回一段被删掉的话。从文档的「更多 › 版本历史」打开，占满文档的位置；看完关掉回到正在写的那一版。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 「正在看 11月18日 14:02 的版本」、「标出改动」开关、「恢复这个版本」、关闭 | 是 |
| 正文 | 选中的那个版本，只读；打开「标出改动」时，和它的上一个版本比，新增和删除的地方标出来 | 是 |
| 版本列表 | 右边一栏，按天分组；每个版本一行：时间、改的人；起过名字的版本名字写在最前面 | 是 |
| 改动摘要 | 每个版本下面一行灰字：「改了 3 段，新增 1 张图」 | 是 |

- **自动版本按编辑时段合并。** 一个人连续写一个小时是一个版本，不是每次停顿一个；几个人同时在写，合在一个版本里，列出每个人。
- **给版本起名字。** 「发布前定稿」这类重要的版本可以命名，命名的版本永远保留，在列表里加粗；「只看命名的版本」可以过滤掉其余的。
- **改动不只靠颜色。** 新增的文字用 `success-soft` 底加下划线，删除的文字用 `danger` 色加删除线；色弱的人也分得清。
- **恢复不会丢东西。** 恢复是把那个版本复制成最新的一版，恢复前的当前版本也留在历史里；所以恢复不需要二次确认，底部轻提示「已恢复到 11月18日 14:02」加「撤销」。
- **只拿回一段。** 在旧版本里选中一段，「复制」或「复制为新页面」，不用整篇恢复。
- **历史是只读的。** 旧版本里不能编辑，点正文时提示「这是历史版本，恢复后才能编辑」。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-history { display: grid; grid-template-columns: minmax(0, 1fr) 260px; flex: 1; min-height: 0; }
.dn-history > .dn-editor-scroll { background: var(--surface-sunken); }
.dn-history .dn-doc { padding: var(--space-8) var(--space-10); border: var(--stroke-line) solid var(--line); border-radius: var(--radius-md); background: var(--canvas); }
.dn-history-toggle { display: inline-flex; align-items: center; gap: var(--space-2); color: var(--ink-secondary); font: var(--type-callout); white-space: nowrap; }
.dn-history-toggle > .dn-switch { margin: 0; }
.dn-doc ins { background: var(--success-soft); color: var(--ink); text-decoration: underline; text-decoration-color: var(--success); text-underline-offset: 3px; }
.dn-doc del { color: var(--danger); text-decoration: line-through; }
.dn-versions { display: flex; flex-direction: column; gap: var(--row-gap); min-height: 0; overflow-y: auto; margin: 0; padding: var(--space-3) var(--space-2) var(--space-6); border-left: var(--stroke-line) solid var(--line); list-style: none; }
.dn-versions > .dn-version-day { padding: var(--space-4) var(--row-padding-x) var(--space-1); color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-versions > .dn-version-day:first-child { padding-top: 0; }
.dn-version { display: grid; gap: 2px; padding: var(--space-2) var(--row-padding-x); border-radius: var(--row-radius); color: var(--ink); text-decoration: none; }
@media (hover: hover) { .dn-version:hover { background: var(--fill-hover); } }
.dn-version[aria-current="true"] { background: var(--fill-selected); }
.dn-version > b { font: var(--weight-semibold) var(--type-callout-size)/var(--type-callout-line) var(--font-sans); }
.dn-version > span { font: var(--type-callout); font-variant-numeric: tabular-nums; }
.dn-version > small { color: var(--ink-tertiary); font: var(--type-footnote); }
@media (max-width: 960px) {
  .dn-history { grid-template-columns: minmax(0, 1fr); }
  .dn-versions { border-left: 0; }
}
```

看 11月18日 14:02 的版本，标出了相对上一版的改动；右边的列表里「发布前定稿」是命名的版本：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <button class="dn-icon-button" type="button" aria-label="关闭版本历史"><svg class="dn-icon" aria-hidden="true"><use href="#dn-close"/></svg></button>
      <h2 class="dn-toolbar-title"><span>正在看 11月18日 14:02 的版本</span></h2>
      <div class="dn-toolbar-actions">
        <label class="dn-history-toggle"><input class="dn-switch" type="checkbox" role="switch" checked>标出改动</label>
        <button class="dn-button is-primary" type="button">恢复这个版本</button>
      </div>
    </header>
    <div class="dn-history">
      <div class="dn-editor-scroll">
        <article class="dn-doc">
          <h1>发布清单</h1>
          <p>灰度从<del>周二</del><ins>周三</ins>开始，先开 5% 的新用户，观察两天的崩溃率<ins>和同步失败率</ins>，没有异常再放到 30%。</p>
          <p>回滚只需要关掉开关，旧版数据不会被改写。<del>迁移脚本和客户端一起上线。</del></p>
          <h2>对外</h2>
          <p>更新记录和帮助中心的迁移说明同一天发。</p>
        </article>
      </div>
      <ul class="dn-versions" aria-label="版本">
        <li class="dn-version-day">今天</li>
        <li><a class="dn-version" href="#"><span>10:30 到现在</span><small>林一、周舟　改了 2 段</small></a></li>
        <li class="dn-version-day">11月18日</li>
        <li><a class="dn-version" href="#" aria-current="true"><span>14:02</span><small>沈遥　改了 2 段，删了 1 句</small></a></li>
        <li><a class="dn-version" href="#"><b>发布前定稿</b><span>11:20</span><small>林一</small></a></li>
        <li class="dn-version-day">11月15日</li>
        <li><a class="dn-version" href="#"><span>16:45</span><small>林一　新建</small></a></li>
      </ul>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 先是版本列表一整页；点一个版本进入它的正文，顶栏是返回和「恢复」。
- 「标出改动」放在正文页的顶栏菜单里，默认打开。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 本地文档用系统的版本浏览（「文件 › 恢复到 › 浏览所有版本」）；云端文档用这一页的样子，放在 sheet 里，宽度接近窗口。
- 版本列表在 sheet 右边；左右方向键在版本之间切换。
- 「恢复这个版本」是默认按钮，Esc 关闭。

```swift
.sheet(isPresented: $showsHistory) {
    HStack(spacing: 0) {
        VersionPreview(version: selectedVersion, showsChanges: showsChanges)
        Divider()
        List(versions, selection: $selectedVersion) { VersionRow(version: $0) }
            .frame(width: 260)
    }
    .frame(minWidth: 820, minHeight: 560)
    .toolbar {
        ToolbarItem(placement: .cancellationAction) { Button("完成") { showsHistory = false } }
        ToolbarItem { Toggle("标出改动", isOn: $showsChanges) }
        ToolbarItem(placement: .confirmationAction) { Button("恢复这个版本", action: restore).keyboardShortcut(.defaultAction) }
    }
}
```

sheet 里左边是旧版本，右边是版本列表：

```html
<div class="ex-mac has-inspector">
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div><span class="ex-mac-title">11月18日 14:02</span><button class="dn-button is-primary is-sm" type="button">恢复这个版本</button></div>
    <div class="ex-mac-pad"><article class="dn-doc"><p>灰度从<del>周二</del><ins>周三</ins>开始，先开 5% 的新用户，观察两天的崩溃率<ins>和同步失败率</ins>。</p><p>回滚只需要关掉开关。<del>迁移脚本和客户端一起上线。</del></p></article></div>
  </div>
  <ul class="dn-versions ex-mac-inspector" aria-label="版本">
    <li class="dn-version-day">11月18日</li>
    <li><a class="dn-version" href="#" aria-current="true"><span>14:02</span><small>沈遥</small></a></li>
    <li><a class="dn-version" href="#"><b>发布前定稿</b><span>11:20</span><small>林一</small></a></li>
  </ul>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 版本列表是一页分组列表，按天分组；点一行推进到那个版本的正文。
- 正文页右上角「恢复」，点了直接恢复并返回文档，底部轻提示可以撤销。
- 左滑一个版本可以命名。

```swift
List {
    ForEach(versionsByDay) { day in
        Section(day.title) {
            ForEach(day.versions) { version in
                NavigationLink(value: version) { VersionRow(version: version) }
                    .swipeActions { Button("命名") { rename(version) } }
            }
        }
    }
}
.navigationTitle("版本历史")
.navigationDestination(for: Version.self) { VersionPreview(version: $0).toolbar { Button("恢复") { restore($0) } } }
```

按天分组的版本列表，命名的版本写名字：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-icon-button" type="button" aria-label="返回"><svg class="dn-icon" aria-hidden="true"><use href="#dn-back"/></svg></button></div>
      <h3 class="ex-ios-large">版本历史</h3>
      <section class="dn-list-section"><p class="dn-list-header">今天</p><ul class="dn-list"><li class="dn-list-row">10:30 到现在<span class="dn-list-value">林一、周舟</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li></ul></section>
      <section class="dn-list-section"><p class="dn-list-header">11月18日</p><ul class="dn-list">
        <li class="dn-list-row">14:02<span class="dn-list-value">沈遥</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
        <li class="dn-list-row"><b>发布前定稿</b><span class="dn-list-value">11:20</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
      </ul></section>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 新文档 | 列表里只有一行「新建」；正文就是现在的样子，「恢复」不能点 |
| 改动太多 | 「标出改动」时只标段落：改过的段落左边一条竖线，点开看逐字的改动 |
| 超出保留期限 | 免费版只保留 30 天；列表最后一行灰字「更早的版本需要团队版」，不把整个列表锁起来 |
| 恢复失败 | 留在历史页，横幅写原因「网络断开了，没有恢复」加「重试」 |
| 版本里有已删除的子页面 | 子页面的链接写「（已删除）」，点了打开回收站里的那一页 |

## 不要

- 每按一次键存一个版本，列表长到翻不完。
- 改动只用红绿两种颜色区分，色弱的人看不出来。
- 恢复前弹「确定吗？当前内容将丢失」：恢复本来就不应该丢东西。
- 版本只写时间，不写谁改的、改了多少。
- 在历史页里也能编辑，改的到底是哪一版说不清。
