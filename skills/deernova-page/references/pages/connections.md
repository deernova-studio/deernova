# 工具与连接

智能体能动手的范围：接了哪些外部服务（邮件、日历、帮助中心、代码仓库、表格），用的是谁的账户，每个服务准许做哪些事，哪些智能体在用。用户来这里连接一个新服务、处理授权过期，或者收回某项权限。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 已连接 | 一行一个服务：标记、名字、用的账户、用在几个智能体；有问题的写清并给出处理按钮 | 是 |
| 可以连接 | 还没连接的服务，小卡片网格：标记、名字、一句话说明能让智能体做什么、「连接」 | 是 |
| 自定义工具 | 填服务地址和密钥，接入自己团队的工具；放在最后，写给开发者 | 否 |
| 连接详情 | 点一个已连接的服务进入：账户、授权时间、它能做什么（每个操作一个权限）、哪些智能体在用、断开连接 | 是 |

- **先说能做什么，再去授权。** 点「连接」先弹一个[弹窗](../../../deernova-style/references/components/sheet.md)，列出智能体将能做的事（「读取邮件、起草邮件；发送前会问你」），确认后才打开服务方的授权页。
- **只要用得到的权限。** 连接时默认只申请读取；需要发送、删除这类权限时，在用到的那一刻再申请。
- **连接是上限，智能体是具体值。** 连接详情里的权限是所有智能体的上限；每个智能体在[智能体配置](agent-settings.md)里只能在这个范围内再收紧。两处的说法一致：每次询问、总是允许、不允许。
- **授权过期要说出来。** 已连接的那一行写「需要重新授权」，按钮就在行尾；用到它的智能体在[智能体列表](agents.md)里同时显示出错。不默默失败。
- **用服务自己的标志，但只用单色。** 一眼认出是哪个服务；不用服务的品牌色，和整页的颜色保持一致。示例里用通用图标代替。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。标记的写法同[智能体列表](agents.md)，权限行的写法同[智能体配置](agent-settings.md)。

```css
.dn-connect { display: grid; gap: var(--space-8); max-width: var(--content-max); }
.dn-connect h3 { margin: 0 0 var(--space-1); font: var(--type-headline); }
.dn-connect-note { margin: var(--space-2) 0 0; color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-connect .dn-rows-item { align-items: center; }
.dn-connect .dn-rows-item > .dn-button { flex: none; }
.dn-connect-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: var(--space-3); margin-top: var(--space-3); }
.dn-connect-card { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: var(--space-3); padding: var(--space-3); border: var(--stroke-line) solid var(--line); border-radius: var(--card-radius); }
.dn-connect-head { display: flex; align-items: center; gap: var(--space-3); }
.dn-connect-head .dn-mark { width: calc(var(--button-height-md) * 1.5); height: calc(var(--button-height-md) * 1.5); }
.dn-connect-head h3 { margin: 0; }
.dn-connect-head p { margin: 0; color: var(--ink-secondary); font: var(--type-callout); }
```

已连接的一行一个，有问题的写清并把按钮放在行尾；没连接的排成小卡片，每张写一句能让智能体做什么：

```html
<div class="dn-app ex-page is-auto">
  <div class="dn-app-main">
    <header class="dn-toolbar"><h2 class="dn-toolbar-title"><span>工具与连接</span></h2></header>
    <div class="dn-app-content">
      <div class="dn-connect">
        <section>
          <h3>已连接</h3>
          <ul class="dn-rows">
            <li class="dn-rows-item"><span class="dn-mark" aria-hidden="true"><svg class="dn-icon"><use href="#dn-web"/></svg></span><a class="dn-rows-text" href="#"><span class="dn-rows-title">帮助中心</span><span class="dn-rows-detail">授权在 11月15日过期，客服回复现在读不到它</span></a><button class="dn-button is-primary is-sm" type="button">重新授权</button></li>
            <li class="dn-rows-item"><span class="dn-mark" aria-hidden="true"><svg class="dn-icon"><use href="#dn-mail"/></svg></span><a class="dn-rows-text" href="#"><span class="dn-rows-title">邮件</span><span class="dn-rows-detail">lin@deernova.me，3 个智能体在用</span></a><button class="dn-button is-plain is-sm" type="button">管理</button></li>
            <li class="dn-rows-item"><span class="dn-mark" aria-hidden="true">历</span><a class="dn-rows-text" href="#"><span class="dn-rows-title">日历</span><span class="dn-rows-detail">工作日历，只读，1 个智能体在用</span></a><button class="dn-button is-plain is-sm" type="button">管理</button></li>
            <li class="dn-rows-item"><span class="dn-mark" aria-hidden="true"><svg class="dn-icon"><use href="#dn-code"/></svg></span><a class="dn-rows-text" href="#"><span class="dn-rows-title">代码仓库</span><span class="dn-rows-detail">deernova-studio，2 个仓库，1 个智能体在用</span></a><button class="dn-button is-plain is-sm" type="button">管理</button></li>
          </ul>
        </section>
        <section>
          <h3>可以连接</h3>
          <div class="dn-connect-grid">
            <div class="dn-connect-card"><span class="dn-mark" aria-hidden="true"><svg class="dn-icon"><use href="#dn-cloud"/></svg></span><span class="dn-item-text"><span class="dn-item-title">网盘</span><span class="dn-item-detail">读取共享文件夹里的文件</span></span><button class="dn-button is-sm" type="button">连接</button></div>
            <div class="dn-connect-card"><span class="dn-mark" aria-hidden="true"><svg class="dn-icon"><use href="#dn-table"/></svg></span><span class="dn-item-text"><span class="dn-item-title">表格</span><span class="dn-item-detail">读写你指定的几张表</span></span><button class="dn-button is-sm" type="button">连接</button></div>
            <div class="dn-connect-card"><span class="dn-mark" aria-hidden="true"><svg class="dn-icon"><use href="#dn-chat"/></svg></span><span class="dn-item-text"><span class="dn-item-title">即时消息</span><span class="dn-item-detail">在群里收到提问时回复</span></span><button class="dn-button is-sm" type="button">连接</button></div>
          </div>
        </section>
        <section>
          <h3>自定义工具</h3>
          <button class="dn-button is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg>添加自定义工具</button>
          <p class="dn-connect-note">填写服务地址和密钥，把团队自己的工具接给智能体。</p>
        </section>
      </div>
    </div>
  </div>
</div>
```

连接详情：账户和授权时间在最上面，下面是它能做的每件事和对应的权限，再下面是谁在用；断开连接单独放最后：

```html
<div class="dn-app ex-page is-auto">
  <div class="dn-app-main">
    <header class="dn-toolbar"><button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg>工具与连接</button></header>
    <div class="dn-app-content">
      <div class="dn-connect">
        <div class="dn-connect-head"><span class="dn-mark" aria-hidden="true"><svg class="dn-icon"><use href="#dn-mail"/></svg></span><div><h3>邮件</h3><p>lin@deernova.me，11月2日授权</p></div></div>
        <section>
          <h3>它能做什么</h3>
          <ul class="dn-list">
            <li class="dn-list-row"><span class="dn-item-text"><span class="dn-item-title">读取邮件</span><span class="dn-item-detail">搜索和读取收件箱里的邮件</span></span><span class="dn-list-control"><div class="dn-select"><select aria-label="读取邮件的权限"><option>总是允许</option><option>每次询问</option><option>不允许</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></div></span></li>
            <li class="dn-list-row"><span class="dn-item-text"><span class="dn-item-title">起草邮件</span><span class="dn-item-detail">存成草稿，不会发出去</span></span><span class="dn-list-control"><div class="dn-select"><select aria-label="起草邮件的权限"><option>总是允许</option><option>每次询问</option><option>不允许</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></div></span></li>
            <li class="dn-list-row"><span class="dn-item-text"><span class="dn-item-title">发送邮件</span><span class="dn-item-detail">以 lin@deernova.me 的名义发出</span></span><span class="dn-list-control"><div class="dn-select"><select aria-label="发送邮件的权限"><option>每次询问</option><option>总是允许</option><option>不允许</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></div></span></li>
            <li class="dn-list-row"><span class="dn-item-text"><span class="dn-item-title">删除邮件</span><span class="dn-item-detail">移到废纸篓</span></span><span class="dn-list-control"><div class="dn-select"><select aria-label="删除邮件的权限"><option>不允许</option><option>每次询问</option><option>总是允许</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></div></span></li>
          </ul>
          <p class="dn-connect-note">这是所有智能体的上限；每个智能体可以在自己的配置里再收紧。</p>
        </section>
        <section>
          <h3>谁在用</h3>
          <ul class="dn-rows">
            <li class="dn-rows-item"><span class="dn-mark" aria-hidden="true">票</span><a class="dn-rows-text" href="#"><span class="dn-rows-title">发票整理</span><span class="dn-rows-detail">读取邮件</span></a></li>
            <li class="dn-rows-item"><span class="dn-mark" aria-hidden="true"><svg class="dn-icon"><use href="#dn-mail"/></svg></span><a class="dn-rows-text" href="#"><span class="dn-rows-title">客服回复</span><span class="dn-rows-detail">读取邮件、起草邮件</span></a></li>
          </ul>
        </section>
        <section>
          <button class="dn-button is-danger" type="button">断开连接…</button>
          <p class="dn-connect-note">断开后，发票整理和客服回复将读不到邮件。</p>
        </section>
      </div>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 可以连接的卡片一行一张。
- 连接详情里的权限下拉换到说明下面一行，占满宽度。
- 授权页在新标签页打开；回来后这一行自动变成已连接，不用刷新。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 放在设置窗口（⌘,）的「连接」标签里，和账户、通知并列；连接详情是同一窗口里的下一层。
- 授权用 `ASWebAuthenticationSession`，在系统的授权窗口里完成，不打开浏览器的新标签页。
- 授权过期时发一条系统通知，点通知直接打开这个连接。

```swift
struct ConnectionsSettings: View {
    var body: some View {
        NavigationStack {
            Form {
                Section("已连接") {
                    ForEach(connected) { connection in
                        NavigationLink(value: connection) {
                            LabeledContent { ConnectionStatus(connection) } label: {
                                Label(connection.name, systemImage: connection.symbol)
                                Text(connection.account)
                            }
                        }
                    }
                }
                Section("可以连接") {
                    ForEach(available) { service in
                        LabeledContent(service.name) { Button("连接") { connect(service) } }
                    }
                }
            }
            .formStyle(.grouped)
            .navigationDestination(for: Connection.self) { ConnectionDetail(connection: $0) }
        }
    }
}
```

设置窗口的「连接」标签：已连接一组，有问题的那一行行尾直接给按钮；可以连接一组：

```html
<div class="ex-mac is-settings">
  <div class="ex-mac-bar"><div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div><span class="ex-mac-title">连接</span></div>
  <div class="ex-mac-tabs" role="group" aria-label="设置分类">
    <button type="button" aria-pressed="false"><svg class="dn-icon" aria-hidden="true"><use href="#dn-user"/></svg>账户</button>
    <button type="button" aria-pressed="true"><svg class="dn-icon" aria-hidden="true"><use href="#dn-link"/></svg>连接</button>
    <button type="button" aria-pressed="false"><svg class="dn-icon" aria-hidden="true"><use href="#dn-bell"/></svg>通知</button>
  </div>
  <div class="ex-mac-form">
    <ul class="dn-list">
      <li class="dn-list-row">帮助中心<button class="dn-button is-primary is-sm dn-list-value" type="button">重新授权</button></li>
      <li class="dn-list-row">邮件<span class="dn-list-value">lin@deernova.me</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
      <li class="dn-list-row">日历<span class="dn-list-value">只读</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
    </ul>
    <ul class="dn-list">
      <li class="dn-list-row">网盘<button class="dn-button is-sm dn-list-value" type="button">连接</button></li>
      <li class="dn-list-row">表格<button class="dn-button is-sm dn-list-value" type="button">连接</button></li>
    </ul>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 在「设置」里的「连接」一页：已连接、可以连接两组；自定义工具不在手机上出现。
- 点已连接的一行进入详情；权限点进下一页选，当前值写在行尾。
- 授权用 `ASWebAuthenticationSession`，完成后回到这一页，那一行变成已连接。

```swift
Form {
    Section("已连接") {
        ForEach(connected) { connection in
            NavigationLink { ConnectionDetail(connection: connection) } label: {
                LabeledContent(connection.name) { ConnectionStatus(connection) }
            }
        }
    }
    Section("可以连接") {
        ForEach(available) { service in LabeledContent(service.name) { Button("连接") { connect(service) } } }
    }
}
.navigationTitle("连接")
```

有问题的一行把按钮放在行尾，其余写账户或权限：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg>设置</button></div>
      <h3 class="ex-ios-large">连接</h3>
      <section class="dn-list-section">
        <ul class="dn-list">
          <li class="dn-list-row">帮助中心<button class="dn-button is-primary is-sm dn-list-value" type="button">重新授权</button></li>
          <li class="dn-list-row">邮件<span class="dn-list-value">3 个智能体</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
          <li class="dn-list-row">日历<span class="dn-list-value">只读</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
        </ul>
        <p class="dn-list-footer">帮助中心的授权已过期，客服回复现在读不到它。</p>
      </section>
      <ul class="dn-list">
        <li class="dn-list-row">网盘<button class="dn-button is-sm dn-list-value" type="button">连接</button></li>
        <li class="dn-list-row">表格<button class="dn-button is-sm dn-list-value" type="button">连接</button></li>
      </ul>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 还没有连接 | 只显示「可以连接」，上面一句「连接一个服务，智能体就能替你读邮件、查日历」 |
| 正在授权 | 那张卡片的按钮变成「等你在授权页完成…」加「取消」；完成后自动变成已连接 |
| 授权被拒绝或失败 | 卡片下面一句原因（「你没有同意读取邮件」），按钮恢复成「连接」 |
| 授权过期 | 已连接那一行写过期时间和影响到的智能体，行尾「重新授权」；智能体列表里对应的智能体显示出错 |
| 管理员禁用了某个服务 | 卡片灰掉，写「团队管理员关闭了这个服务」，没有「连接」 |
| 断开连接 | 先说明哪些智能体会受影响，确认后断开；服务方那边的授权一并撤销 |

## 不要

- 点「连接」直接跳到服务方的授权页，事先不说智能体将能做什么。
- 连接时一次申请所有权限，「以防以后用到」。
- 可以连接的服务排成满屏彩色大图标墙，已连接的反而要往下找。
- 授权过期后不提示，智能体每次调用都默默失败。
- 连接的权限和智能体的权限用两套说法，或者智能体能超出连接的上限。
