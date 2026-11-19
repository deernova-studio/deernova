# 登录与首次打开

用户第一次和应用打交道的两页：登录（包括注册和找回），以及登录后第一次看到的工作区。两页都是任务，不是宣传：越快进到产品里越好。

## 区块

### 登录

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 页眉 | 只有左上角的字标，点了回官网（写法同[主页](home.md)） | 是 |
| 标题 | 宋体（`--font-display`）「登录 Deernova」，不加欢迎语 | 是 |
| 邮箱 | 一个邮箱输入框，下面一个占满宽度的「继续」主按钮 | 是 |
| 其他方式 | 「用 Apple 账号继续」这类第三方登录，放在主按钮下面，用普通按钮；最多两个 | 否 |
| 切换 | 最下面一行「还没有账号？注册」，用文字按钮 | 是 |

- **先问邮箱，在同一页往下展开。** 输入邮箱后，同一页出现验证码输入框或密码框（按账号的设置），不跳到第二页，浏览器和密码管理器的自动填充才不会断。
- **不用密码优先。** 默认发 6 位验证码到邮箱；有密码的账号显示密码框，旁边「忘记密码」。
- **输入框写对属性。** 邮箱 `type="email"` `autocomplete="username"`，验证码 `autocomplete="one-time-code"` `inputmode="numeric"`，密码 `autocomplete="current-password"`，并能切换显示。
- 一栏窄表单，宽约 360，在页面里水平居中、垂直方向略高于正中（上下 2 : 3），表单里的文字左对齐。不加卡片外框、不加背景图。
- 注册和登录是同一个流程：没注册过的邮箱，在下一步直接创建账号，不让用户先选「登录」还是「注册」。

### 首次打开

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 应用骨架 | 侧边栏、顶栏照常出现，和以后每次打开一样 | 是 |
| 空的内容区 | [空状态](../../../deernova-style/references/components/empty-state.md)：一个标题、一句话、「新建笔记」主按钮，旁边「导入」 | 是 |
| 一个问题 | 只问会改变第一屏的问题（「你主要在哪台设备上写？」），能跳过 | 否 |

- 不做多步的欢迎轮播和遮罩式的功能导览。功能在用户第一次用到的地方，用一句[气泡提示](../../../deernova-style/references/components/tooltip.md)说明，看过就不再出现。
- 需要示例内容时，放一条真的能用的笔记（「快捷键」），标题直接写清是什么，用户可以删掉；不放「示例笔记 1、2、3」。
- 权限（通知、文件访问）在第一次用到时再请求，并先说为什么。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-auth { display: grid; grid-template-rows: auto minmax(0, 1fr); min-height: 100%; background: var(--canvas); }
.dn-auth-header { display: flex; align-items: center; height: var(--toolbar-height); padding: 0 var(--page-margin); }
.dn-auth-main { display: grid; grid-template-rows: 2fr auto 3fr; padding: 0 var(--page-margin); }
.dn-auth-form { grid-row: 2; display: grid; gap: var(--space-4); width: min(100%, 360px); margin-inline: auto; }
.dn-auth-title { margin: 0 0 var(--space-2); font: var(--weight-semibold) var(--type-display-size)/var(--type-display-line) var(--font-display); letter-spacing: var(--type-display-tracking); }
.dn-auth-form > .dn-button { width: 100%; justify-content: center; }
.dn-auth-or { margin: var(--space-2) 0 0; color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-auth-switch { display: flex; align-items: center; gap: var(--space-1); margin: var(--space-4) 0 0; color: var(--ink-secondary); font: var(--type-callout); }
```

登录：只有字标、宋体标题、一个邮箱框和一个主按钮；其他方式在下面，注册和登录是同一个入口：

```html
<div class="dn-auth ex-page is-tall" data-density="comfortable">
  <header class="dn-auth-header"><a class="dn-site-mark" href="#">deernova<span>.</span></a></header>
  <main class="dn-auth-main">
    <form class="dn-auth-form">
      <h2 class="dn-auth-title">登录 Deernova</h2>
      <div class="dn-field">
        <label class="dn-field-label" for="ex-auth-email">邮箱</label>
        <input class="dn-input" id="ex-auth-email" type="email" autocomplete="username" value="lin@deernova.me">
      </div>
      <button class="dn-button is-primary is-lg" type="submit">继续</button>
      <p class="dn-auth-or">也可以</p>
      <button class="dn-button is-lg" type="button">用 Apple 账号继续</button>
      <p class="dn-auth-switch">还没有账号？<button class="dn-button is-plain is-sm" type="button">注册</button></p>
    </form>
  </main>
</div>
```

首次打开：骨架和以后每次一样，内容区只有一个空状态，没有欢迎轮播：

```html
<div class="dn-app ex-page">
  <nav class="dn-sidebar" aria-label="侧边栏">
    <div class="dn-sidebar-section">
      <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><span class="dn-sidebar-label">搜索</span><span class="dn-sidebar-count">⌘K</span></a>
      <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span class="dn-sidebar-label">全部笔记</span></a>
    </div>
  </nav>
  <div class="dn-app-main">
    <header class="dn-toolbar"><h2 class="dn-toolbar-title"><span>全部笔记</span></h2></header>
    <div class="dn-app-content">
      <div class="dn-centered">
        <div class="dn-empty">
          <svg class="dn-icon" aria-hidden="true"><use href="#dn-file"/></svg>
          <p class="dn-empty-title">写下第一条笔记</p>
          <p class="dn-empty-body">标题和待办会在你打字时自动成形。</p>
          <div class="dn-empty-actions">
            <button class="dn-button is-primary is-lg" type="button">新建笔记</button>
            <button class="dn-button is-lg" type="button">导入…</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 登录：表单占满宽度，左右留 `page-margin`；主按钮和输入框都是触控高度。键盘弹出时，「继续」按钮仍然可见。
- 首次打开：侧边栏收起，空状态在内容区里居中；导入收进「更多」。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 登录是一个不大的窗口或主窗口里的 sheet，只有邮箱、继续和「通过 Apple 登录」；支持钥匙串和通行密钥自动填充。
- 首次打开就是正常的主窗口：系统侧边栏照常，内容区一个 `ContentUnavailableView`。
- 需要的权限（通知、文件访问）在第一次用到时，用系统的请求弹窗。

```swift
VStack(alignment: .leading, spacing: Deernova.space4) {
    Text("登录 Deernova").font(.deernovaDisplay)
    TextField("邮箱", text: $email).textContentType(.username)
    Button("继续", action: continueWithEmail).buttonStyle(.borderedProminent).keyboardShortcut(.defaultAction)
    SignInWithAppleButton(.signIn, onRequest: configure, onCompletion: handle)
}
.frame(width: 320)
.padding(Deernova.space8)
```

一个不大的窗口，只有邮箱、继续和通过 Apple 登录：

```html
<div class="ex-mac is-small">
  <div class="ex-mac-bar"><div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div></div>
  <div class="ex-mac-pad"><form class="dn-auth-form">
      <h2 class="dn-auth-title">登录 Deernova</h2>
      <div class="dn-field"><label class="dn-field-label" for="ex-mac-email">邮箱</label><input class="dn-input" id="ex-mac-email" type="email" autocomplete="username" value="lin@deernova.me"></div>
      <button class="dn-button is-primary is-lg" type="submit">继续</button>
      <button class="dn-button is-lg" type="button">通过 Apple 登录</button>
    </form></div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 表单在屏幕上半部分，键盘弹出时不被挡住；主按钮占满宽度。
- 验证码用 `.textContentType(.oneTimeCode)`，短信和邮件里的码可以自动填入；提供「通过 Apple 登录」。
- 首次打开不放欢迎轮播，直接是空的列表加一个主按钮。

```swift
Form {
    TextField("邮箱", text: $email).textContentType(.username).keyboardType(.emailAddress)
    if codeSent { TextField("验证码", text: $code).textContentType(.oneTimeCode) }
}
.safeAreaInset(edge: .bottom) { Button("继续", action: next).buttonStyle(.borderedProminent).controlSize(.large) }
```

表单在屏幕上半部分，键盘弹出时不被挡住：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"></div>
      <form class="dn-auth-form">
      <h2 class="dn-auth-title">登录 Deernova</h2>
      <div class="dn-field"><label class="dn-field-label" for="ex-ios-email">邮箱</label><input class="dn-input" id="ex-ios-email" type="email" autocomplete="username" value="lin@deernova.me"></div>
      <button class="dn-button is-primary is-lg" type="submit">继续</button>
      <button class="dn-button is-lg" type="button">通过 Apple 登录</button>
    </form>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 邮箱格式不对 | 失焦后在输入框下面说明（「邮箱少了 @」），不在输入第一个字时报错 |
| 验证码错误或过期 | 输入框下面一句说明，给「重新发送」，并显示多少秒后能再发 |
| 发送中 | 「继续」按钮保持宽度，换成 `spinner` 加「正在发送」 |
| 账号被停用 | 整页提示，说明原因和联系方式，不只说「登录失败」 |
| 从邀请链接进来 | 邮箱已经填好，标题写「加入 设计组」 |

## 不要

- 左边一半屏幕的插画或渐变配右边的表单；表单外面再套一张有阴影的卡片。
- 「欢迎回来！👋」「很高兴见到你」这类欢迎语；按钮下面一行服务条款小字以外的说明。
- 先让用户选「登录」还是「注册」；把邮箱和密码拆成两页，打断自动填充。
- 错误只写「登录失败」；验证码输错后清空整个输入框。
- 登录后先放三到五页的欢迎轮播或遮罩导览，再让人进产品。
- 一进来就同时弹通知权限、文件权限和评分请求。
