# 整页错误

整页都显示不出该有的内容时的那一页：找不到、没有权限、服务出错、离线、维护中、版本太旧。用户本来要去别的地方，这一页的任务是说清发生了什么，并给一条最可能有用的路。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 骨架 | 应用里：侧边栏和顶栏照常，错误只占内容区；官网里：页眉和页脚照常 | 是 |
| 标题 | 用平常话说发生了什么（「这一页不在了」），不写错误码和「出错了」 | 是 |
| 一句话 | 为什么，以及是不是用户的问题 | 是 |
| 一条路 | 一个主操作：重试、申请访问、回到列表、搜索；最多再加一个次要操作 | 是 |
| 错误码 | 只在需要报告给客服时出现，放在一句话末尾或「复制错误详情」里 | 否 |

- 在应用里，错误页放在内容区里，用[空状态](../../../deernova-style/references/components/empty-state.md)的排法，视觉居中；侧边栏和顶栏照常能用，用户不用刷新整个应用就能离开。
- 在官网上，404 按[主页](home.md)首屏的排法：左边宋体标题、一句话和搜索框，右边可以放网点插画；它是少数可以有一点品牌表情的错误页。
- 能自己恢复的不让用户操作：离线时联网后自动重试，维护结束后自动刷新。
- 地址变了的页面直接跳转到新地址，不显示 404。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-error-search { width: min(100%, 360px); }
```

官网 404：页眉照常，左边宋体标题、一句话、搜索框，右边是网点插画（排法同主页首屏）：

```html
<div class="dn-site ex-page" data-density="comfortable">
  <header class="dn-site-header">
    <a class="dn-site-mark" href="#">deernova.</a>
    <nav class="dn-site-nav" aria-label="主导航"><a href="#">文档</a><a href="#">更新记录</a><a href="#">定价</a></nav>
  </header>
  <section class="dn-hero">
    <div class="dn-hero-copy">
      <h2 class="dn-hero-title">这一页不在了。</h2>
      <p class="dn-hero-lede">它可能换了地址。搜一下，或者回到首页。</p>
      <label class="dn-input-group dn-error-search"><svg class="dn-icon" aria-hidden="true"><use href="#dn-search"/></svg><input type="search" placeholder="搜索文档和更新记录" aria-label="搜索"></label>
      <button class="dn-button is-plain" type="button">回到首页</button>
    </div>
    <figure class="dn-hero-art">
      <img class="is-light" src="assets/examples/halftone-light.png" alt="">
      <img class="is-dark" src="assets/examples/halftone-dark.png" alt="">
    </figure>
  </section>
</div>
```

应用里没有权限：侧边栏照常，错误只占内容区，说清属于谁，给一个主操作：

```html
<div class="dn-app ex-page">
  <nav class="dn-sidebar" aria-label="侧边栏">
    <div class="dn-sidebar-section">
      <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span class="dn-sidebar-label">全部笔记</span><span class="dn-sidebar-count">128</span></a>
      <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-folder"/></svg><span class="dn-sidebar-label">设计组</span></a>
    </div>
  </nav>
  <div class="dn-app-main">
    <header class="dn-toolbar"><h2 class="dn-toolbar-title"><span>设计组</span></h2></header>
    <div class="dn-app-content">
      <div class="dn-centered">
        <div class="dn-empty">
          <svg class="dn-icon" aria-hidden="true"><use href="#dn-permission"/></svg>
          <p class="dn-empty-title">这个文件夹属于设计组</p>
          <p class="dn-empty-body">向管理员林一申请后就能查看和编辑。</p>
          <div class="dn-empty-actions">
            <button class="dn-button is-primary is-lg" type="button">申请访问</button>
            <button class="dn-button is-plain is-lg" type="button">回到全部笔记</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 窄屏和手机浏览器

- 应用里：侧边栏收起，错误在内容区里居中，主操作按钮占满一行。
- 官网 404：插画移到标题上面或者去掉，搜索框占满一行。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 内容区里用 `ContentUnavailableView`，侧边栏和工具栏照常能用。
- 离线时工具栏下方一条横幅，联网后自动消失；不弹系统警告框。
- 需要更新时，用应用自己的更新窗口或 App Store 的页面，说明这一版的数据不会丢。

```swift
ContentUnavailableView {
    Label("这个文件夹属于设计组", systemImage: "lock")
} description: {
    Text("向管理员林一申请后就能查看和编辑。")
} actions: {
    Button("申请访问", action: requestAccess).buttonStyle(.borderedProminent)
}
```

侧边栏照常，错误只占内容区：

```html
<div class="ex-mac">
  <nav class="ex-mac-sidebar" aria-label="侧边栏">
    <div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div>
    <a class="dn-sidebar-item" href="#"><svg class="dn-icon" aria-hidden="true"><use href="#dn-document"/></svg><span class="dn-sidebar-label">全部笔记</span></a>
    <a class="dn-sidebar-item" href="#" aria-current="page"><svg class="dn-icon" aria-hidden="true"><use href="#dn-folder"/></svg><span class="dn-sidebar-label">设计组</span></a>
  </nav>
  <div class="ex-mac-main"><div class="ex-mac-bar"><span class="ex-mac-title">设计组</span></div><div class="ex-mac-body"><div class="dn-centered"><div class="dn-empty"><svg class="dn-icon" aria-hidden="true"><use href="#dn-permission"/></svg><p class="dn-empty-title">这个文件夹属于设计组</p><p class="dn-empty-body">向管理员林一申请后就能查看和编辑。</p><div class="dn-empty-actions"><button class="dn-button is-primary is-lg" type="button">申请访问</button></div></div></div></div></div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 用 `ContentUnavailableView`，在可用区域里视觉居中；底部标签栏照常能用。
- 离线时导航栏下方一条横幅，显示已缓存的内容。
- 主按钮占满宽度，次要操作是它下面的文字按钮。

```swift
ContentUnavailableView("这个文件夹属于设计组", systemImage: "lock", description: Text("向管理员林一申请后就能查看和编辑。"))
    .safeAreaInset(edge: .bottom) { Button("申请访问", action: requestAccess).buttonStyle(.borderedProminent).controlSize(.large) }
```

在可用区域里视觉居中，主按钮占满宽度：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-chevron-left"/></svg>全部笔记</button></div>
      <div class="dn-centered"><div class="dn-empty"><svg class="dn-icon" aria-hidden="true"><use href="#dn-permission"/></svg><p class="dn-empty-title">这个文件夹属于设计组</p><p class="dn-empty-body">向管理员林一申请后就能查看和编辑。</p><div class="dn-empty-actions"><button class="dn-button is-primary is-lg" type="button">申请访问</button></div></div></div>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 标题 | 一条路 |
| --- | --- | --- |
| 找不到（404） | 这一页不在了 | 搜索框，加几个最常去的入口 |
| 没有权限（403） | 这个文件夹属于设计组 | 申请访问；已经申请过时写「已申请，等待林一批准」 |
| 服务出错（500） | 页面没有加载出来 | 重试；次要操作「复制错误详情」 |
| 离线 | 现在没有网络 | 显示已缓存的内容；联网后自动刷新，不需要按钮 |
| 维护中 | Deernova 正在维护 | 写清预计恢复的时间（「大约 15:30」），给状态页链接 |
| 版本太旧 | 需要更新到新版本 | 「更新」，说明这一版的数据不会丢 |

## 不要

- 标题写「404」「Oops!」「出错了」；用俏皮话或道歉代替说明。
- 错误页没有页眉和导航，唯一的路是浏览器的返回。
- 应用里出错时整个窗口换成错误页，侧边栏也没了。
- 把技术细节（堆栈、请求 ID）直接摊在页面上；需要时放进「复制错误详情」。
- 离线、维护结束后还要用户手动刷新。
- 每个错误页都配一张大插画；应用里的错误页不放插画。
