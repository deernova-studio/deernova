# 搜索结果页

在应用或网站里搜一个词后看到的整页。用户心里已经有一个目标，要在第一眼判断：找到了吗、在哪一条、不对的话怎么改搜索。只搜当前列表时，用[列表页](list.md)顶上的搜索框，不需要这一页。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 搜索框 | 页面顶上，保留用户搜的词，可以直接改；右边清除 | 是 |
| 范围 | 一个[分段控件](../../../deernova-style/references/components/segmented.md)：全部、笔记、文件、成员，每项后面是结果数；数为零的范围变灰但不消失 | 结果有多种类型时 |
| 结果 | 按相关度排。每条：类型图标、标题、所在位置（文件夹或项目）、包含搜索词的一行片段 | 是 |
| 分组 | 「全部」里按类型分组，每组最多五条，末尾「查看全部 23 条笔记」切到对应范围 | 结果有多种类型时 |
| 更多 | 结果末尾「加载更多」，或者翻页；地址里带上搜索词和范围，可以分享和返回 | 结果多时 |

- **匹配的词加粗。** 标题和片段里命中的字用 `weight-semibold` 和 `ink`，其余是 `ink-secondary`；不用黄色底色高亮。
- **边输入边出结果。** 输入停顿约 200ms 后刷新结果；回车不是必须的。
- **默认搜最大的范围。** 先搜全部，再让用户缩小；从某个文件夹里发起的搜索，范围默认是那个文件夹，并在范围里写明。
- **键盘能走完。** ↑↓ 在结果间移动，回车打开，Esc 清空搜索框。
- 还没输入时，搜索框下面是最近的搜索和最近打开的条目，不是空白。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-search { display: grid; gap: var(--space-4); max-width: var(--content-max); margin-inline: auto; }
.dn-search > .dn-input-group { height: var(--button-height-lg); }
.dn-results { display: grid; gap: 2px; margin: 0; padding: 0; list-style: none; }
.dn-results-group { margin: var(--space-4) 0 var(--space-1); padding: 0 var(--row-padding-x); color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-result { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 2px var(--space-3); padding: var(--space-2) var(--row-padding-x); border-radius: var(--row-radius); color: var(--ink-secondary); text-decoration: none; }
.dn-result > .dn-icon { grid-row: span 2; margin-top: 2px; width: var(--icon-size-md); height: var(--icon-size-md); }
.dn-result-title { overflow: hidden; color: var(--ink); font: var(--type-body); text-overflow: ellipsis; white-space: nowrap; }
.dn-result-title small { margin-left: var(--space-2); color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-result-snippet { overflow: hidden; font: var(--type-callout); text-overflow: ellipsis; white-space: nowrap; }
.dn-result mark { background: none; color: var(--ink); font-weight: var(--weight-semibold); }
@media (hover: hover) { .dn-result:hover { background: var(--fill-hover); } }
.dn-result[aria-selected="true"] { background: var(--fill-selected); }
.dn-results-more { justify-self: start; margin-top: var(--space-1); }
```

搜索框保留原词，范围后面是结果数；命中的字加粗，不用色块高亮；每组最多五条：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar"><h2 class="dn-toolbar-title"><span>搜索</span></h2></header>
    <div class="dn-app-content">
      <div class="dn-search">
        <label class="dn-input-group"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><input type="search" value="设置页" aria-label="搜索"><button class="dn-input-action" type="button" aria-label="清除"><svg class="dn-icon" aria-hidden="true"><use href="#dn-close"/></svg></button></label>
        <div class="dn-segmented" role="group" aria-label="范围">
          <button type="button" aria-pressed="true">全部 9</button>
          <button type="button" aria-pressed="false">笔记 6</button>
          <button type="button" aria-pressed="false">任务 3</button>
          <button type="button" aria-pressed="false">成员 0</button>
        </div>
        <ul class="dn-results" role="listbox" aria-label="搜索结果">
          <li class="dn-results-group" role="presentation">笔记</li>
          <li><a class="dn-result" href="#" role="option" aria-selected="true"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span class="dn-result-title"><mark>设置页</mark>改版：账户分组<small>工作 / 设计</small></span><span class="dn-result-snippet">iCloud 同步的开关要写清楚关掉以后会怎样，其余<mark>设置</mark>不加说明。</span></a></li>
          <li><a class="dn-result" href="#" role="option"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span class="dn-result-title">设计周会纪要<small>工作</small></span><span class="dn-result-snippet"><mark>设置页</mark>先出交互稿，周五评审，只看结构。</span></a></li>
          <li class="dn-results-group" role="presentation">任务</li>
          <li><a class="dn-result" href="#" role="option"><svg class="dn-icon" aria-hidden="true"><use href="#dn-check"/></svg><span class="dn-result-title"><mark>设置页</mark>先出交互稿<small>设置页改版</small></span><span class="dn-result-snippet">林一负责，11月21日到期</span></a></li>
        </ul>
        <button class="dn-button is-plain is-sm dn-results-more" type="button">查看全部 6 条笔记</button>
      </div>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 窄于 `breakpoint-sm`：范围改成横向滑动的一行，隐藏滚动条，末端渐隐（见[布局与对齐](../../../deernova-style/references/foundations/layout.md)）。
- 片段保留一行，所在位置移到标题下面。
- 搜索框固定在顶部，结果在下面滚动。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 搜索框在工具栏（`.searchable`），⌘F 聚焦；范围用 `.searchScopes` 放在搜索框下面。
- 结果在内容区，↑↓ 选择，回车打开，⌘回车在新窗口打开。
- 全局搜索也可以做成 ⌘K 的[命令面板](../../../deernova-style/references/components/command.md)。

```swift
ResultsView(query: query, scope: scope)
    .searchable(text: $query, placement: .toolbar)
    .searchScopes($scope) { Text("全部").tag(Scope.all); Text("笔记").tag(Scope.notes); Text("任务").tag(Scope.tasks) }
```

搜索框在工具栏，范围在它下面，结果在内容区：

```html
<div class="ex-mac is-small ex-mac-wide">
  <div class="ex-mac-bar"><div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div><label class="dn-input-group ex-mac-search"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><input type="search" value="设置页" aria-label="搜索"></label></div>
  <div class="ex-mac-pad">
    <div class="dn-segmented" role="group" aria-label="范围"><button type="button" aria-pressed="true">全部 9</button><button type="button" aria-pressed="false">笔记 6</button><button type="button" aria-pressed="false">任务 3</button></div>
    <ul class="dn-results" role="listbox" aria-label="搜索结果">
        <li class="dn-results-group" role="presentation">笔记</li>
        <li><a class="dn-result" href="#" role="option" aria-selected="true"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span class="dn-result-title"><mark>设置页</mark>改版：账户分组</span><span class="dn-result-snippet">iCloud 同步的开关要写清楚关掉以后会怎样。</span></a></li>
        <li><a class="dn-result" href="#" role="option"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span class="dn-result-title">设计周会纪要</span><span class="dn-result-snippet"><mark>设置页</mark>先出交互稿，周五评审。</span></a></li>
      </ul>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 搜索框在顶部，进入时键盘弹出，下面是最近的搜索。
- 范围用 `.searchScopes`，在搜索框下面横排。
- 结果是列表，滚动时收起键盘。

```swift
NavigationStack {
    ResultsView(query: query, scope: scope)
        .searchable(text: $query, isPresented: $isSearching)
        .searchScopes($scope) { … }
        .scrollDismissesKeyboard(.immediately)
}
```

搜索框在顶上，范围在它下面横排：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"></div>
      <label class="dn-input-group"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><input type="search" value="设置页" aria-label="搜索"></label>
      <div class="dn-segmented" role="group" aria-label="范围"><button type="button" aria-pressed="true">全部</button><button type="button" aria-pressed="false">笔记</button><button type="button" aria-pressed="false">任务</button></div>
      <ul class="dn-results" role="listbox" aria-label="搜索结果">
        <li class="dn-results-group" role="presentation">笔记</li>
        <li><a class="dn-result" href="#" role="option" aria-selected="true"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span class="dn-result-title"><mark>设置页</mark>改版：账户分组</span><span class="dn-result-snippet">iCloud 同步的开关要写清楚关掉以后会怎样。</span></a></li>
        <li><a class="dn-result" href="#" role="option"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span class="dn-result-title">设计周会纪要</span><span class="dn-result-snippet"><mark>设置页</mark>先出交互稿，周五评审。</span></a></li>
      </ul>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 没有结果 | 大字写清「没有找到“季度预算”」，搜索框里保留原词；下面给拼写建议、换一个范围（「在全部范围里有 3 条」），再列几个常用入口 |
| 正在搜索 | 保留上一轮的结果，搜索框里一个小的 `spinner`；不清空成骨架 |
| 搜索出错 | 结果位置一行「搜索没有完成」加「重试」，搜索框里的词不丢 |
| 结果很多 | 只显示数量的量级（「1,000+ 条」），不算精确总数拖慢搜索 |
| 没有权限的结果 | 不显示；整体被过滤掉时说一句「有 2 条结果你没有权限查看」 |

## 不要

- 搜完把搜索框清空，用户要改一个字得重打一遍。
- 用黄色、彩色底块高亮命中的词。
- 没有结果时只写「无结果」，或者用一句俏皮话；把推荐内容排得像搜索结果，让人以为搜到了。
- 结果只有标题，看不出在哪个文件夹、为什么命中。
- 每次输入都把结果清空成骨架，列表上下跳动。
- 把「高级搜索」的一整排筛选条件放在搜索框下面，大部分人用不上。
