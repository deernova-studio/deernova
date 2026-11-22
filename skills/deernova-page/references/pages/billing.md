# 账单与订阅

已经付费的人来这里：看现在是什么方案、下次哪天扣多少钱、换付款方式、下载发票，或者取消。还没买的人看的是[定价](pricing.md)；这一页是买了之后用的。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 扣款失败 | 最上面一条 `danger` [横幅](../../../deernova-style/references/components/banner.md)：哪天没扣成功、为什么、什么时候停用，加「更新付款方式」 | 失败时 |
| 当前方案 | 方案名和计费周期，一句话写下一次扣款：「2027年1月1日扣款 ¥3,600」；「更换方案」 | 是 |
| 用量 | 按席位、按存储、按次数收费的部分，每项一条进度和「已用多少，共多少」 | 有额度时 |
| 付款方式 | 支付宝、微信支付或银行卡，一行写清是哪一个；「更换」 | 是 |
| 账单记录 | [表格](../../../deernova-style/references/components/table.md)：日期、说明、金额、状态、发票下载 | 是 |
| 发票信息 | 抬头、税号、接收发票的邮箱 | 需要开票时 |
| 取消订阅 | 页面最后一组，一句话写取消后会怎样，加「取消订阅」 | 是 |

- **先说钱。** 进来第一眼看到的是下次哪天扣多少，不是方案的功能介绍。
- **金额写含税的实际数字。** 「¥3,600」，不写「¥300/月起」；按年付的写一年的总额，后面再写折合每月多少。
- **扣款失败放最上面，并写清还剩几天。** 「11月1日扣款失败：银行卡已过期。11月15日前更新付款方式，之后团队会变成只读」。不在扣款失败的第一天就停用。
- **换方案前先给出差价。** 选好新方案后，确认弹窗写「今天支付 ¥240，是本期剩下 40 天的差价；之后每年 ¥4,800」。降级写「12月20日起生效，在那之前照常使用」。
- **取消和升级一样好找。** 「取消订阅」在页面最后一组，不藏进客服流程。取消只问一次，可以选填一个原因，不连弹三个挽留弹窗。
- **取消后说清哪天停。** 「团队版会用到 2027年1月1日。之后变成免费版：文档都保留，超过 3 人的成员变成只读」。到期前随时能恢复。
- **账单状态写字。** 「已支付」是灰字，「失败」是 `danger` 标签，「退款」写退了多少；不只用一个彩色圆点。
- **数字用等宽数字，金额右对齐。**

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-billing { display: grid; align-content: start; gap: var(--space-8); width: 100%; max-width: var(--content-max); margin-inline: auto; }
.dn-billing > section { display: grid; gap: var(--space-3); }
.dn-billing h3 { margin: 0; font: var(--type-headline); }
.dn-billing-plan { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: start; gap: var(--space-1) var(--space-4); padding: var(--card-padding-y) var(--card-padding-x); border: var(--stroke-line) solid var(--line); border-radius: var(--card-radius); background: var(--surface); }
.dn-billing-plan > p { grid-column: 1; margin: 0; color: var(--ink-secondary); font: var(--type-callout); font-variant-numeric: tabular-nums; }
.dn-billing-plan > p:first-child { color: var(--ink); font: var(--type-title); }
.dn-billing-plan > p strong { color: var(--ink); font-weight: var(--weight-semibold); }
.dn-billing-plan > .dn-button { grid-column: 2; grid-row: 1; }
.dn-meters { display: grid; gap: var(--space-4); margin: 0; }
.dn-meters.is-grouped { padding: var(--space-3) var(--card-padding-x); border-radius: var(--card-radius); background: var(--surface-raised); }
.dn-meter { display: grid; grid-template-columns: 96px minmax(0, 1fr) auto; align-items: center; gap: var(--space-4); }
.dn-meter > dt { color: var(--ink-secondary); font: var(--type-callout); }
.dn-meter > dd { display: contents; }
.dn-meter-text { color: var(--ink); font: var(--type-callout); font-variant-numeric: tabular-nums; text-align: right; }
.dn-pay { padding: var(--space-3); border: var(--stroke-line) solid var(--line); border-radius: var(--radius-md); }
.dn-billing .dn-table .is-number { font-variant-numeric: tabular-nums; }
.dn-billing-end { padding-top: var(--space-5); border-top: var(--stroke-line) solid var(--line); }
.dn-billing-end > p { margin: 0; max-width: var(--form-max); color: var(--ink-secondary); font: var(--type-callout); }
.dn-billing-end > .dn-button { justify-self: start; }
```

团队版按年付：先写下次扣款，然后是用量、付款方式和账单；有一笔失败过，后来补扣成功了；取消在最后：

```html
<div class="dn-app ex-page is-tall">
  <div class="dn-app-main">
    <header class="dn-toolbar"><h2 class="dn-toolbar-title"><span>账单与订阅</span></h2></header>
    <div class="dn-app-content">
      <div class="dn-billing">
        <div class="dn-billing-plan">
          <p>团队版，按年付</p>
          <p>2027年1月1日扣款 <strong>¥3,600</strong>，10 个席位，折合每席位每月 ¥30。</p>
          <button class="dn-button is-sm" type="button">更换方案</button>
        </div>
        <section aria-label="用量">
          <h3>用量</h3>
          <dl class="dn-meters">
            <div class="dn-meter"><dt>席位</dt><dd><div class="dn-progress-track" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" aria-label="席位"><div class="dn-progress-bar" style="width: 80%"></div></div><span class="dn-meter-text">8 / 10</span></dd></div>
            <div class="dn-meter"><dt>存储</dt><dd><div class="dn-progress-track" role="progressbar" aria-valuenow="34" aria-valuemin="0" aria-valuemax="100" aria-label="存储"><div class="dn-progress-bar" style="width: 34%"></div></div><span class="dn-meter-text">34 GB / 100 GB</span></dd></div>
          </dl>
        </section>
        <section aria-label="付款方式">
          <h3>付款方式</h3>
          <div class="dn-pay dn-item"><svg class="dn-icon" aria-hidden="true"><use href="#dn-card"/></svg><span class="dn-item-text"><span class="dn-item-title">招商银行储蓄卡，尾号 4242</span><span class="dn-item-detail">2028年3月到期</span></span><button class="dn-button is-plain is-sm dn-item-end" type="button">更换</button></div>
        </section>
        <section aria-label="账单">
          <h3>账单</h3>
          <div class="dn-table-wrap">
            <table class="dn-table">
              <thead><tr><th scope="col">日期</th><th scope="col">说明</th><th class="is-number" scope="col">金额</th><th scope="col">状态</th><th class="is-actions" scope="col"><span class="sr-only">发票</span></th></tr></thead>
              <tbody>
                <tr><td>2026年11月3日</td><td class="is-primary">增加 2 个席位</td><td class="is-number">¥120</td><td>已支付</td><td class="is-actions"><span class="dn-table-cell"><button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-download"/></svg>发票</button></span></td></tr>
                <tr><td>2026年1月4日</td><td class="is-primary">团队版，2026 年</td><td class="is-number">¥2,880</td><td>已支付</td><td class="is-actions"><span class="dn-table-cell"><button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-download"/></svg>发票</button></span></td></tr>
                <tr><td>2026年1月1日</td><td class="is-primary">团队版，2026 年</td><td class="is-number">¥2,880</td><td><span class="dn-tag is-danger">失败：余额不足</span></td><td class="is-actions"></td></tr>
                <tr><td>2025年1月1日</td><td class="is-primary">团队版，2025 年</td><td class="is-number">¥2,880</td><td>已支付</td><td class="is-actions"><span class="dn-table-cell"><button class="dn-button is-plain is-sm" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-download"/></svg>发票</button></span></td></tr>
              </tbody>
            </table>
          </div>
        </section>
        <section class="dn-billing-end" aria-label="取消订阅">
          <h3>取消订阅</h3>
          <p>取消后团队版用到 2027年1月1日，之后变成免费版。文档都保留；超过 3 人的部分，成员变成只读。</p>
          <button class="dn-button is-sm" type="button">取消订阅…</button>
        </section>
      </div>
    </div>
  </div>
</div>
```

扣款失败时，最上面的横幅写清原因和最后期限：

```html
<div class="dn-banner is-danger" role="alert">
  <svg class="dn-icon" aria-hidden="true"><use href="#dn-error"/></svg>
  <div class="dn-banner-text"><p class="dn-banner-title">1月1日扣款失败：银行卡余额不足</p><p class="dn-banner-body">1月15日前更新付款方式或补扣成功即可，在那之前一切照常；之后团队会变成只读。</p></div>
  <button class="dn-button is-sm" type="button">更新付款方式</button>
</div>
```

取消只问一次，写清哪天停、停了会怎样；原因选填；默认按钮是保留：

```html
<div class="dn-sheet" role="dialog" aria-modal="true" aria-labelledby="ex-cancel-title" aria-describedby="ex-cancel-desc">
  <div class="dn-sheet-head">
    <div class="dn-sheet-heading">
      <h3 class="dn-sheet-title" id="ex-cancel-title">取消团队版</h3>
      <p class="dn-sheet-description" id="ex-cancel-desc">团队版用到 2027年1月1日，到期前随时可以恢复。之后变成免费版：文档都保留，超过 3 人的部分成员变成只读，不会再扣款。</p>
    </div>
  </div>
  <div class="dn-sheet-content">
    <div class="dn-field">
      <label class="dn-field-label" for="ex-cancel-why">为什么取消 <span class="dn-optional">（可选）</span></label>
      <span class="dn-select"><select id="ex-cancel-why"><option selected>不说了</option><option>太贵了</option><option>团队不用了</option><option>换了别的工具</option><option>其他</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span>
    </div>
  </div>
  <div class="dn-sheet-actions">
    <button class="dn-button is-danger" type="button">取消订阅</button>
    <button class="dn-button is-primary" type="button">保留团队版</button>
  </div>
</div>
```

### 窄屏和手机浏览器

- 各区块排成一列；账单表换成一行一笔：说明和日期在左，金额和状态在右，点一行下载发票。
- 方案卡片里「更换方案」放到文字下面，占满宽度。
- 付款跳到支付宝或微信时，回来后停在这一页，顶部写结果。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 账单放在设置窗口的「账单」分类，用分组的 `Form`。
- 通过 App Store 订阅的，付款方式、发票和取消都交给系统：「在 App Store 管理订阅」打开系统的订阅页；这一页只写方案和下次扣款。
- 在网页上买的，付款和取消在浏览器里打开网页版的这一页。不在应用里放一个嵌入的付款表单。

```swift
Form {
    Section {
        LabeledContent("方案", value: "团队版，按年付")
        LabeledContent("下次扣款") { Text("2027年1月1日，¥3,600") }
    }
    Section("用量") {
        LabeledContent("席位") { ProgressView(value: 8, total: 10) { EmptyView() } currentValueLabel: { Text("8 / 10") } }
        LabeledContent("存储") { ProgressView(value: 34, total: 100) { EmptyView() } currentValueLabel: { Text("34 GB / 100 GB") } }
    }
    Section {
        if purchasedThroughAppStore {
            Button("在 App Store 管理订阅") { showManageSubscriptions = true }
        } else {
            Link("在网页上管理付款和发票", destination: billingURL)
        }
    }
}
.formStyle(.grouped)
.manageSubscriptionsSheet(isPresented: $showManageSubscriptions)
```

设置窗口的账单分类；付款和发票交给系统或网页：

```html
<div class="ex-mac is-settings">
  <div class="ex-mac-bar"><div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div><span class="ex-mac-title">账单</span></div>
  <div class="ex-mac-tabs" role="group" aria-label="设置分类">
    <button type="button" aria-pressed="false"><svg class="dn-icon" aria-hidden="true"><use href="#dn-user"/></svg>账户</button>
    <button type="button" aria-pressed="false"><svg class="dn-icon" aria-hidden="true"><use href="#dn-team"/></svg>成员</button>
    <button type="button" aria-pressed="true"><svg class="dn-icon" aria-hidden="true"><use href="#dn-card"/></svg>账单</button>
  </div>
  <div class="ex-mac-form">
    <ul class="dn-list"><li class="dn-list-row">方案<span class="dn-list-value">团队版，按年付</span></li><li class="dn-list-row">下次扣款<span class="dn-list-value">2027年1月1日，¥3,600</span></li></ul>
    <section class="dn-list-section"><dl class="dn-meters is-grouped">
      <div class="dn-meter"><dt>席位</dt><dd><div class="dn-progress-track" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" aria-label="席位"><div class="dn-progress-bar" style="width: 80%"></div></div><span class="dn-meter-text">8 / 10</span></dd></div>
      <div class="dn-meter"><dt>存储</dt><dd><div class="dn-progress-track" role="progressbar" aria-valuenow="34" aria-valuemin="0" aria-valuemax="100" aria-label="存储"><div class="dn-progress-bar" style="width: 34%"></div></div><span class="dn-meter-text">34 / 100 GB</span></dd></div>
    </dl></section>
    <section class="dn-list-section"><ul class="dn-list"><li class="dn-list-row">在网页上管理付款和发票<svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-external"/></svg></li></ul></section>
  </div>
</div>
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- App Store 的订阅：「管理订阅」打开系统的订阅 sheet，取消和换方案都在那里；「恢复购买」放在最后一组。
- 分组列表：方案和下次扣款一组，用量一组，账单记录一组（点一行看详情、分享发票 PDF）。
- 扣款失败时，第一组上面是红字的一句说明和「更新付款方式」。

```swift
List {
    Section { LabeledContent("方案", value: "团队版，按年付"); LabeledContent("下次扣款", value: "1月1日，¥3,600") }
    Section("用量") { MeterRow(title: "席位", used: 8, total: 10); MeterRow(title: "存储", used: 34, total: 100, unit: "GB") }
    Section { Button("管理订阅") { showManageSubscriptions = true }; Button("恢复购买", action: restore) }
}
.navigationTitle("账单与订阅")
.manageSubscriptionsSheet(isPresented: $showManageSubscriptions)
```

方案和下次扣款在最上面，管理订阅交给系统：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-icon-button" type="button" aria-label="返回"><svg class="dn-icon" aria-hidden="true"><use href="#dn-back"/></svg></button></div>
      <h3 class="ex-ios-large">账单与订阅</h3>
      <ul class="dn-list"><li class="dn-list-row">方案<span class="dn-list-value">团队版，按年付</span></li><li class="dn-list-row">下次扣款<span class="dn-list-value">1月1日，¥3,600</span></li></ul>
      <section class="dn-list-section"><dl class="dn-meters is-grouped">
        <div class="dn-meter"><dt>席位</dt><dd><div class="dn-progress-track" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" aria-label="席位"><div class="dn-progress-bar" style="width: 80%"></div></div><span class="dn-meter-text">8 / 10</span></dd></div>
        <div class="dn-meter"><dt>存储</dt><dd><div class="dn-progress-track" role="progressbar" aria-valuenow="34" aria-valuemin="0" aria-valuemax="100" aria-label="存储"><div class="dn-progress-bar" style="width: 34%"></div></div><span class="dn-meter-text">34 GB</span></dd></div>
      </dl></section>
      <ul class="dn-list"><li class="dn-list-row">账单记录<svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li><li class="dn-list-row ex-link-row">管理订阅</li><li class="dn-list-row ex-link-row">恢复购买</li></ul>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 免费版 | 方案卡片写「免费版，最多 3 人、5 GB」，按钮是「升级」；没有付款方式和账单两组 |
| 试用中 | 方案卡片写「团队版试用，还有 9 天，11月28日结束」；没有付款方式时写「结束后变成免费版，不会自动扣款」 |
| 扣款失败 | 顶部 `danger` 横幅写原因和最后期限；账单里这一笔是 `danger` 标签；期限前一切照常 |
| 已取消、还没到期 | 方案卡片写「团队版用到 2027年1月1日，之后变成免费版」，按钮换成「恢复订阅」 |
| 额度快用完 | 那一条进度后面写 `warning` 的「还剩 5%」；用完后写清是停用还是按量收费 |
| 没有权限 | 只显示方案名，一句「账单由林一管理」；其余区块不显示 |
| 退款 | 账单里新增一行，金额写「−¥240」，状态写「已退回原付款方式」 |

## 不要

- 进来先看到一屏功能介绍和「升级到企业版」，下次扣多少钱反而要找。
- 价格写「低至 ¥30/月」，实际按年一次扣 ¥3,600。
- 取消藏在客服对话里，或者连弹三个「你确定吗」「再考虑一下」「送你一个月」。
- 取消的按钮写「我不想要更好的体验」这种让人内疚的话。
- 扣款失败当天就锁住团队，或者只发一封邮件、页面上什么都不写。
- 账单状态只用彩色圆点；失败和成功只差一个颜色。
