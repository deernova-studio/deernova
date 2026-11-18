# 定价

访客来这一页做一个决定：哪个版本适合我、要花多少钱、有没有坑。所有数字都要真实、可比、看得懂；这一页最怕的是让人觉得在被推销。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 页眉 | 官网页眉，「定价」标为当前；写法同[主页](home.md) | 是 |
| 标题 | 宋体标题，一句话说怎么收费（「个人免费，团队按人数」） | 是 |
| 计费周期 | 「按月」「按年」的[分段控件](../../../deernova-style/references/components/segmented.md)，默认按年；按年省多少写在控件旁边，写金额不写百分比 | 有年付时 |
| 方案 | 两到三个方案并排，等宽。每个：名字、一句适合谁、价格、一个按钮、四到六条最主要的区别 | 是 |
| 对比表 | 方案下面一张[表格](../../../deernova-style/references/components/table.md)，按功能分组逐项对比，表头在滚动时固定 | 方案超过两个时 |
| 常见问题 | 退款、发票、换方案、学生和团队优惠；每题一句话答完，用折叠 | 否 |

- **只推荐一个。** 推荐的方案用 1px `ink` 描边和一个[标签](../../../deernova-style/references/components/tag.md)「多数人选这个」，不放大、不加阴影、不换颜色。
- **价格写清单位和付法。** 「¥18 / 人 / 月」是单位，「按年付 ¥216」是付法，分两行写；价格用等宽数字，几个方案的价格在同一条线上。
- **每个方案一个按钮**，写具体动作：「免费开始」「开始 14 天试用」；企业版写「联系我们」，不写价格时说明按什么计算。
- 方案里的区别写成具体的量（「无限笔记」「100 GB 附件」），不写「更多功能」「高级支持」。
- 有免费版时，免费版的限制写在它自己的方案里，不藏到对比表最后。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-pricing { width: min(100% - 2 * var(--page-margin), var(--wide-max)); margin: 0 auto; padding: var(--space-12) 0; }
.dn-pricing-head { display: flex; flex-wrap: wrap; align-items: end; gap: var(--space-4) var(--space-8); margin-bottom: var(--space-8); }
.dn-pricing-head h2 { margin: 0 0 var(--space-2); font: var(--weight-semibold) var(--type-display-size)/var(--type-display-line) var(--font-display); letter-spacing: var(--type-display-tracking); }
.dn-pricing-head p { margin: 0; color: var(--ink-secondary); font: var(--type-prose); }
.dn-pricing-period { display: flex; align-items: center; gap: var(--space-3); margin-left: auto; color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-plans { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--card-gap); }
.dn-plan { display: grid; align-content: start; gap: var(--space-2); padding: var(--space-6); border: var(--stroke-line) solid var(--line); border-radius: var(--card-radius); background: var(--surface); }
.dn-plan.is-recommended { border-color: var(--ink); }
.dn-plan-name { display: flex; align-items: center; gap: var(--space-2); margin: 0; font: var(--type-headline); }
.dn-plan-for { margin: 0; color: var(--ink-secondary); font: var(--type-callout); }
.dn-plan-price { margin: var(--space-4) 0 0; font: var(--weight-semibold) var(--type-title-size)/1.2 var(--font-sans); font-variant-numeric: tabular-nums; }
.dn-plan-price small { color: var(--ink-tertiary); font: var(--type-callout); }
.dn-plan-billing { margin: 0 0 var(--space-4); color: var(--ink-tertiary); font: var(--type-footnote); font-variant-numeric: tabular-nums; }
.dn-plan > .dn-button { justify-content: center; }
.dn-plan ul { display: grid; gap: var(--space-2); align-content: start; margin: var(--space-4) 0 0; padding: var(--space-4) 0 0; border-top: var(--stroke-line) solid var(--line); list-style: none; font: var(--type-callout); }
.dn-plan li { display: flex; align-items: center; gap: var(--space-2); }
.dn-plan li .dn-icon { flex: none; width: var(--icon-size-sm); height: var(--icon-size-sm); color: var(--ink-secondary); }
```

三个等宽的方案，只有一个推荐，用描边和一个标签标出；价格的单位和付法分两行，区别写成具体的量：

```html
<div class="dn-site ex-page is-auto" data-density="comfortable">
  <header class="dn-site-header">
    <a class="dn-site-mark" href="#">deernova.</a>
    <nav class="dn-site-nav" aria-label="主导航"><a href="#">文档</a><a href="#">更新记录</a><a href="#" aria-current="page">定价</a></nav>
  </header>
  <main class="dn-pricing">
    <div class="dn-pricing-head">
      <div>
        <h2>定价</h2>
        <p>个人免费，团队按人数。</p>
      </div>
      <div class="dn-pricing-period">
        按年付省 ¥48
        <div class="dn-segmented" role="group" aria-label="计费周期">
          <button type="button" aria-pressed="false">按月</button>
          <button type="button" aria-pressed="true">按年</button>
        </div>
      </div>
    </div>
    <div class="dn-plans">
      <section class="dn-plan">
        <h3 class="dn-plan-name">免费版</h3>
        <p class="dn-plan-for">一个人，一台设备</p>
        <p class="dn-plan-price">¥0</p>
        <p class="dn-plan-billing">不需要绑定付款方式</p>
        <button class="dn-button is-lg" type="button">免费开始</button>
        <ul><li><svg class="dn-icon" aria-hidden="true"><use href="#dn-check"/></svg>500 条笔记</li><li><svg class="dn-icon" aria-hidden="true"><use href="#dn-check"/></svg>1 GB 附件</li><li><svg class="dn-icon" aria-hidden="true"><use href="#dn-check"/></svg>只在这台设备上</li></ul>
      </section>
      <section class="dn-plan is-recommended">
        <h3 class="dn-plan-name">个人版<span class="dn-tag">多数人选这个</span></h3>
        <p class="dn-plan-for">一个人，所有设备</p>
        <p class="dn-plan-price">¥18 <small>/ 月</small></p>
        <p class="dn-plan-billing">按年付 ¥216</p>
        <button class="dn-button is-primary is-lg" type="button">开始 14 天试用</button>
        <ul><li><svg class="dn-icon" aria-hidden="true"><use href="#dn-check"/></svg>无限笔记</li><li><svg class="dn-icon" aria-hidden="true"><use href="#dn-check"/></svg>100 GB 附件</li><li><svg class="dn-icon" aria-hidden="true"><use href="#dn-check"/></svg>iCloud 同步</li><li><svg class="dn-icon" aria-hidden="true"><use href="#dn-check"/></svg>版本历史 1 年</li></ul>
      </section>
      <section class="dn-plan">
        <h3 class="dn-plan-name">团队版</h3>
        <p class="dn-plan-for">3 人以上的团队</p>
        <p class="dn-plan-price">¥30 <small>/ 人 / 月</small></p>
        <p class="dn-plan-billing">按年付，每人 ¥360</p>
        <button class="dn-button is-lg" type="button">开始 14 天试用</button>
        <ul><li><svg class="dn-icon" aria-hidden="true"><use href="#dn-check"/></svg>个人版的全部</li><li><svg class="dn-icon" aria-hidden="true"><use href="#dn-check"/></svg>共享文件夹和权限</li><li><svg class="dn-icon" aria-hidden="true"><use href="#dn-check"/></svg>管理后台</li></ul>
      </section>
    </div>
  </main>
</div>
```

### 窄屏和手机浏览器

- 窄于 `breakpoint-md`：方案竖排，推荐的方案排第一个；计费周期的控件固定在方案上方。
- 对比表改成只比两个方案，用顶上的两个下拉选择切换要比哪两个；或者在表格内部横向滚动，第一列固定。

手机上方案竖排，推荐的方案排第一个：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body is-web">
      <div class="dn-site" data-density="comfortable">
        <header class="dn-site-header"><a class="dn-site-mark" href="#">deernova.</a><nav class="dn-site-nav" aria-label="主导航"><a href="#">文档</a></nav><button class="dn-icon-button" type="button" aria-label="菜单"><svg class="dn-icon" aria-hidden="true"><use href="#dn-sidebar"/></svg></button></header>
        <main class="dn-pricing">
          <div class="dn-pricing-head"><div><h2>定价</h2><p>个人免费，团队按人数。</p></div>
            <div class="dn-pricing-period"><div class="dn-segmented" role="group" aria-label="计费周期"><button type="button" aria-pressed="false">按月</button><button type="button" aria-pressed="true">按年</button></div>按年付省 ¥48</div></div>
          <div class="dn-plans">
            <section class="dn-plan is-recommended"><h3 class="dn-plan-name">个人版<span class="dn-tag">多数人选这个</span></h3><p class="dn-plan-for">一个人，所有设备</p><p class="dn-plan-price">¥18 <small>/ 月</small></p><p class="dn-plan-billing">按年付 ¥216</p><button class="dn-button is-primary is-lg" type="button">开始 14 天试用</button></section>
            <section class="dn-plan"><h3 class="dn-plan-name">免费版</h3><p class="dn-plan-for">一个人，一台设备</p><p class="dn-plan-price">¥0</p><button class="dn-button is-lg" type="button">免费开始</button></section>
          </div>
        </main>
      </div>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 已登录的用户 | 当前方案的按钮换成「当前方案」并禁用，其他方案写「升级」或「降级」 |
| 不同地区 | 按访问地区显示本地货币和是否含税（「含税价」），旁边可以切换 |
| 优惠活动 | 原价和活动价都写清，写明截止日期；没有活动时不放划掉的原价 |
| 价格调整 | 新价格生效前在这一页顶部一条[横幅](../../../deernova-style/references/components/banner.md)说明日期和已订阅用户受不受影响 |

## 不要

- 三个方案里两个都标「推荐」；推荐的方案放大一圈、加阴影或换成彩色。
- 价格只写「¥18」，不写单位和付法；按年付时只显示折算后的月价，不写一次要付多少。
- 用划掉的「原价」制造优惠感；没有截止日期的「限时优惠」。
- 区别写成「更多功能」「高级支持」「优先体验」这类说不清的词。
- 免费版的限制藏在对比表最后一行，或者要点进去才看得到。
- 每个方案配一个图标或插画；价格下面一行「最受欢迎！」「性价比之王」这类口号。
