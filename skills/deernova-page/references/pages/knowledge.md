# 资料库

智能体能读的东西都在这里：上传的文件、连上的文件夹、定时同步的数据源（帮助中心、网盘、数据库）。用户来这里要弄清四件事：里面有什么、是不是最新的、哪些智能体在用、它到底能不能从里面找到答案。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 顶栏 | 「资料库」、添加（上传文件、连接文件夹、同步数据源）；整页可以直接拖文件进来 | 是 |
| 筛选行 | 搜索、类型（文件、文件夹、数据源）、只看有问题的 | 多于一屏时 |
| 列表 | [表格](../../../deernova-style/references/components/table.md)：名称、多少（篇、页、条）、用在哪些智能体、状态 | 是 |
| 状态 | 正常时写「同步于 10 分钟前」；处理中写进度「正在处理 32 / 120」；有问题写清哪里（「3 页是扫描件，读不出文字」） | 是 |
| 详情 | 右边一栏，选中的那一个：来源、同步频率、谁能看、用在哪些智能体；「立即同步」「移除」 | 是 |
| 检索试试 | 详情里一个输入框：问一句，列出它会找到的几段原文和出处 | 是 |

- **状态写最近一次同步。** 资料过时了，智能体就会答错；「同步于 3 天前」比一个绿点有用。处理中的写进度，不只转圈。
- **问题落到具体的文件。** 「3 页是扫描件，读不出文字」「12 个文件超过 50 MB，没有读取」，点一下打开那几个文件。
- **能试检索。** 智能体答错时，用户最想知道的是它到底找到了什么；检索试试列出原文片段和出处，命中的词用 `fill-selected` 标出。
- **写清用在哪。** 每一份资料写出哪些智能体在用；没有智能体在用的灰着写「没有智能体在用」，方便清理。移除前说明哪些智能体会受影响。
- **谁能看要写明。** 团队共享的资料，别人的智能体也能读；详情里写「团队里的人都能让智能体读它」。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-library { display: grid; grid-template-columns: minmax(0, 1fr) var(--pane-width); flex: 1; min-height: 0; }
.dn-library-main { min-width: 0; min-height: 0; overflow: auto; padding: var(--space-3) var(--page-margin) var(--space-8); }
.dn-library .dn-table td { height: calc(var(--table-row-height) + var(--space-4)); }
.dn-library td.is-unused { color: var(--ink-tertiary); }
.dn-library-aside { display: flex; flex-direction: column; gap: var(--space-5); min-height: 0; overflow-y: auto; padding: var(--space-4); border-left: var(--stroke-line) solid var(--line); }
.dn-library-aside h3 { margin: 0; font: var(--type-headline); }
.dn-library-aside h4 { margin: 0 0 var(--space-2); color: var(--ink-secondary); font: var(--type-footnote); }
.dn-library-actions { display: flex; gap: var(--gap-stack); }
.dn-hits { display: grid; gap: var(--space-2); margin: var(--space-2) 0 0; padding: 0; list-style: none; }
.dn-hit { padding: var(--space-2) var(--space-3); border-radius: var(--radius-sm); background: var(--surface-sunken); color: var(--ink); font: var(--type-callout); }
.dn-hit mark { background: var(--fill-selected); color: inherit; }
.dn-hit-source { display: block; margin-top: var(--space-1); color: var(--ink-tertiary); font: var(--type-caption); }
@media (max-width: 960px) {
  .dn-library { grid-template-columns: minmax(0, 1fr); }
  .dn-library-aside { display: none; }
}
```

每一行写同步到什么时候、谁在用；选中帮助中心，右边看它的来源，并问一句试试它能找到什么：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar">
      <h2 class="dn-toolbar-title"><span>资料库</span></h2>
      <div class="dn-toolbar-actions"><button class="dn-button is-primary is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg>添加</button></div>
    </header>
    <div class="dn-library">
      <div class="dn-library-main">
        <div class="dn-table-wrap">
          <table class="dn-table">
            <thead><tr><th scope="col">名称</th><th class="is-number" scope="col">多少</th><th scope="col">用在</th><th scope="col">状态</th></tr></thead>
            <tbody>
              <tr aria-selected="true"><td class="is-primary"><span class="dn-table-cell"><svg class="dn-icon" aria-hidden="true"><use href="#dn-web"/></svg><span class="dn-item-text"><span class="dn-item-title">帮助中心</span><span class="dn-item-detail">每小时同步</span></span></span></td><td class="is-number">1,284 篇</td><td>客服回复</td><td>同步于 10 分钟前</td></tr>
              <tr><td class="is-primary"><span class="dn-table-cell"><svg class="dn-icon" aria-hidden="true"><use href="#dn-folder"/></svg><span class="dn-item-text"><span class="dn-item-title">笔记 / 工作</span><span class="dn-item-detail">连接的文件夹</span></span></span></td><td class="is-number">64 篇</td><td>周报助手</td><td>同步于刚刚</td></tr>
              <tr><td class="is-primary"><span class="dn-table-cell"><svg class="dn-icon" aria-hidden="true"><use href="#dn-folder"/></svg><span class="dn-item-text"><span class="dn-item-title">2026 年发票</span><span class="dn-item-detail">上传的文件夹</span></span></span></td><td class="is-number">120 个文件</td><td>发票整理</td><td><div class="dn-progress"><div class="dn-progress-track" role="progressbar" aria-valuenow="27" aria-valuemin="0" aria-valuemax="100" aria-label="处理进度"><div class="dn-progress-bar" style="width: 27%"></div></div><span class="dn-progress-label">32 / 120</span></div></td></tr>
              <tr><td class="is-primary"><span class="dn-table-cell"><svg class="dn-icon" aria-hidden="true"><use href="#dn-file"/></svg><span class="dn-item-text"><span class="dn-item-title">产品规格.pdf</span><span class="dn-item-detail">上传的文件</span></span></span></td><td class="is-number">48 页</td><td>代码审查、客服回复</td><td><span class="dn-tag is-warning"><span class="dn-dot"></span>3 页是扫描件，读不出文字</span></td></tr>
              <tr><td class="is-primary"><span class="dn-table-cell"><svg class="dn-icon" aria-hidden="true"><use href="#dn-folder"/></svg><span class="dn-item-text"><span class="dn-item-title">竞品资料</span><span class="dn-item-detail">上传的文件夹</span></span></span></td><td class="is-number">18 个文件</td><td class="is-unused">没有智能体在用</td><td>10月3日上传</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <aside class="dn-library-aside" aria-label="帮助中心">
        <div>
          <h3>帮助中心</h3>
          <dl class="dn-props"><dt>来源</dt><dd>help.deernova.me</dd><dt>同步</dt><dd>每小时，10 分钟前</dd><dt>谁能看</dt><dd>团队</dd><dt>用在</dt><dd>客服回复</dd></dl>
        </div>
        <div class="dn-library-actions"><button class="dn-button is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-regenerate"/></svg>立即同步</button><button class="dn-button is-plain is-sm" type="button">移除</button></div>
        <section>
          <h4>检索试试</h4>
          <label class="dn-input-group"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><input type="search" value="退款多久到账" aria-label="问一句试试"></label>
          <ol class="dn-hits">
            <li class="dn-hit">申请通过后，<mark>退款</mark>会在 1 到 3 个工作日内原路<mark>到账</mark>。<span class="dn-hit-source">退款与发票 / 退款需要多久</span></li>
            <li class="dn-hit">年付方案中途取消时，按剩余月份<mark>退款</mark>。<span class="dn-hit-source">订阅 / 取消订阅</span></li>
          </ol>
        </section>
      </aside>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 表格换成一行一份资料：名称，下面一行是状态；有问题的状态替换「同步于」。
- 点一行进入它的详情页，检索试试在详情页的最后。
- 添加只留「上传文件」和「同步数据源」；连接本地文件夹在手机浏览器里不出现。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 资料库在主窗口侧边栏里；列表用 `Table`，详情和检索试试在 `.inspector` 里。
- 可以从访达直接把文件或文件夹拖进窗口；拖进来的文件夹默认保持同步。
- 右键菜单：在访达中显示、立即同步、移除；选中多个可以一起移除。

```swift
Table(sources, selection: $selected) {
    TableColumn("名称") { SourceNameCell(source: $0) }
    TableColumn("多少") { Text($0.countText) }
    TableColumn("用在") { Text($0.agentNames.formatted(.list(type: .and))) }
    TableColumn("状态") { SourceStatus(source: $0) }          // 同步时间、进度或问题
}
.dropDestination(for: URL.self) { urls, _ in add(urls) }
.inspector(isPresented: $showsDetail) {
    SourceDetail(source: selectedSource)                      // 来源、同步、谁能看、用在
    RetrievalTest(source: selectedSource)                     // 检索试试
}
.toolbar { Menu("添加", systemImage: "plus") { AddSourceMenu() } }
```

表格在中间，详情和检索试试在右边的 inspector 里：

```html
<div class="ex-mac has-inspector">
  <div class="ex-mac-main">
    <div class="ex-mac-bar"><div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div><span class="ex-mac-title">资料库</span><button class="dn-glass dn-glass-button" type="button" aria-label="添加"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button></div>
    <div class="ex-mac-body dn-library-main">
      <table class="dn-table">
        <thead><tr><th scope="col">名称</th><th scope="col">状态</th></tr></thead>
        <tbody>
          <tr aria-selected="true"><td class="is-primary"><span class="dn-table-cell"><svg class="dn-icon" aria-hidden="true"><use href="#dn-web"/></svg><span>帮助中心</span></span></td><td>同步于 10 分钟前</td></tr>
          <tr><td class="is-primary"><span class="dn-table-cell"><svg class="dn-icon" aria-hidden="true"><use href="#dn-folder"/></svg><span>笔记 / 工作</span></span></td><td>同步于刚刚</td></tr>
          <tr><td class="is-primary"><span class="dn-table-cell"><svg class="dn-icon" aria-hidden="true"><use href="#dn-folder"/></svg><span>2026 年发票</span></span></td><td>正在处理 32 / 120</td></tr>
          <tr><td class="is-primary"><span class="dn-table-cell"><svg class="dn-icon" aria-hidden="true"><use href="#dn-file"/></svg><span>产品规格.pdf</span></span></td><td><span class="dn-tag is-warning"><span class="dn-dot"></span>3 页读不出</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <aside class="ex-mac-inspector dn-library-aside" aria-label="帮助中心">
    <dl class="dn-props"><dt>同步</dt><dd>每小时</dd><dt>谁能看</dt><dd>团队</dd><dt>用在</dt><dd>客服回复</dd></dl>
    <section>
      <h4>检索试试</h4>
      <label class="dn-input-group"><input type="search" value="退款多久到账" aria-label="问一句试试"></label>
      <ol class="dn-hits"><li class="dn-hit"><mark>退款</mark>会在 1 到 3 个工作日内原路<mark>到账</mark>。<span class="dn-hit-source">退款需要多久</span></li></ol>
    </section>
  </aside>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 一行一份资料：名称，下面一行是状态；有问题的排在最上面。
- 点进去是详情页：来源、同步、谁能看、用在，最后是检索试试。
- 添加用系统的文件选择器和「从网址同步」；左滑是「立即同步」和「移除」。

```swift
NavigationStack {
    List(sources) { source in
        NavigationLink(value: source) {
            VStack(alignment: .leading) {
                Label(source.name, systemImage: source.symbol)
                SourceStatus(source: source).font(.footnote).foregroundStyle(.secondary)
            }
        }
        .swipeActions { Button("立即同步", systemImage: "arrow.clockwise") { sync(source) } }
    }
    .navigationTitle("资料库")
    .navigationDestination(for: Source.self) { SourceDetail(source: $0) }
    .fileImporter(isPresented: $importing, allowedContentTypes: [.item], allowsMultipleSelection: true) { add($0) }
    .toolbar { Menu("添加", systemImage: "plus") { AddSourceMenu(importing: $importing) } }
}
```

有问题的排在最上面，每行第二行写同步到什么时候：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><span></span><button class="dn-icon-button" type="button" aria-label="添加"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button></div>
      <h3 class="ex-ios-large">资料库</h3>
      <ul class="dn-rows">
        <li class="dn-rows-item"><svg class="dn-icon dn-agent-state is-waiting" aria-hidden="true"><use href="#dn-warning"/></svg><a class="dn-rows-text" href="#"><span class="dn-rows-title">产品规格.pdf</span><span class="dn-rows-detail">3 页是扫描件，读不出文字</span></a></li>
        <li class="dn-rows-item"><svg class="dn-icon dn-agent-state" aria-hidden="true"><use href="#dn-web"/></svg><a class="dn-rows-text" href="#"><span class="dn-rows-title">帮助中心</span><span class="dn-rows-detail">1,284 篇，同步于 10 分钟前</span></a></li>
        <li class="dn-rows-item"><svg class="dn-icon dn-agent-state" aria-hidden="true"><use href="#dn-folder"/></svg><a class="dn-rows-text" href="#"><span class="dn-rows-title">2026 年发票</span><span class="dn-rows-detail">正在处理 32 / 120</span></a></li>
        <li class="dn-rows-item"><svg class="dn-icon dn-agent-state" aria-hidden="true"><use href="#dn-folder"/></svg><a class="dn-rows-text" href="#"><span class="dn-rows-title">笔记 / 工作</span><span class="dn-rows-detail">64 篇，同步于刚刚</span></a></li>
      </ul>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 资料库是空的 | [空状态](../../../deernova-style/references/components/empty-state.md)「把文件拖到这里，智能体就能读」，主按钮「上传文件」，次要「同步数据源」 |
| 正在处理 | 状态列是进度条和「32 / 120」；处理完的部分已经能被检索，不用等全部做完 |
| 部分读不出 | 状态写原因和数量；点开列出那几个文件或页码，给「重新上传」 |
| 同步失败 | 「同步失败：帮助中心要求重新登录」，加「重新连接」；上一次同步的内容照常能用，写明「智能体在用 3 天前的版本」 |
| 检索没有结果 | 「没有找到和“退款多久到账”相关的内容」，下面一句建议：换个说法，或者这份资料里可能没有 |
| 移除 | 先说明哪些智能体会受影响（「客服回复将读不到帮助中心」），确认后移除；能在 30 天内恢复 |

## 不要

- 只用绿点、黄点表示状态，不写同步时间和出了什么问题。
- 上传后只有一个转圈，看不出处理到哪了，也不说读不出的那几页。
- 智能体答错时，没有办法看它到底从资料里找到了什么。
- 移除资料不说哪些智能体在用，删了以后智能体默默答不出来。
- 把每份资料拆成的段落、向量这些内部结构摊给用户看。
