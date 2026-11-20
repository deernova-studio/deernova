# 分享与权限

点文档右上角的「分享」弹出的那一块：谁现在能看到这一页、邀请谁、链接给谁用、要不要发布到网页。别人点开链接之后看到的是[分享只读页](share.md)；团队层面的角色见[成员与权限](members.md)。

## 区块

| 区块 | 放什么 | 必须 |
| --- | --- | --- |
| 现状 | 最上面一句话写清现在谁能看到：「鹿野工作室的所有人可以查看，3 个人可以编辑」 | 是 |
| 邀请 | 输入名字或邮箱，右边选权限，「邀请」；可以附一句话 | 是 |
| 有权限的人 | 一行一个：头像、名字、权限；从上级页面继承来的写「来自“产品”」 | 是 |
| 一般访问 | 三档：只有被邀请的人、鹿野工作室的所有人、有链接的任何人；后两档右边再选「可以查看」或「可以评论」 | 是 |
| 发布到网页 | 单独一组：开关、公开地址、「允许搜索引擎收录」 | 否 |
| 底部 | 左边「复制链接」，右边「完成」 | 是 |

- **先说现状，再给开关。** 打开分享面板的人最想知道的是「现在谁能看到」，所以第一行是一句话，不是一排控件。
- **权限只有三档。** 可以编辑、可以评论、可以查看；所有者单独写，不能在这里改。
- **继承要看得出来。** 子页面默认和上级页面的权限一样，行尾写来源。在这里改了某个人的权限，这一页就和上级不同了，现状那句话后面加「和“产品”不同」，旁边一个「恢复成和上级一样」。
- **放宽之前说清后果。** 一般访问改成「有链接的任何人」时，下面一行灰字「不用登录就能打开，包括 3 个子页面」。发布到网页先确认一次，确认里写公开地址。
- **复制链接不改权限。** 「复制链接」只是复制，复制完按钮变成「已复制」两秒；不会顺手把一般访问改成公开。
- **移除一个人在权限下拉里。** 下拉最后一项是红字的「移除」，不在每行再放一个叉。

## 网页

HTML 和 CSS 的写法，Web 应用和官网都按这一节做。窄屏和手机浏览器见本节最后。

```css
.dn-access { display: grid; gap: var(--space-4); width: min(100%, 440px); padding: var(--space-4); border: var(--stroke-line) solid var(--line); border-radius: var(--sheet-radius); background: var(--surface-raised); box-shadow: var(--shadow-float); }
.dn-access h3 { margin: 0; font: var(--type-headline); }
.dn-access-now { margin: calc(-1 * var(--space-3)) 0 0; color: var(--ink-secondary); font: var(--type-callout); }
.dn-access-invite { display: flex; gap: var(--space-2); }
.dn-access-invite > .dn-input { flex: 1; min-width: 0; }
.dn-access-invite > .dn-select { width: 112px; }
.dn-access-list { display: grid; gap: var(--space-1); margin: 0; padding: 0; list-style: none; }
.dn-access-list > li { display: grid; grid-template-columns: auto minmax(0, 1fr) 120px; align-items: center; gap: var(--space-3); min-height: var(--row-height); }
.dn-access-list > li > .dn-avatar { width: var(--button-height-md); height: var(--button-height-md); }
.dn-access-list .dn-member-name > span:last-child { color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-access-list .dn-select > select { height: var(--button-height-sm); border-color: transparent; background: none; }
.dn-access-role { padding-left: var(--field-padding-x); color: var(--ink-tertiary); font: var(--type-callout); }
.dn-access-general { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: var(--space-1) var(--space-3); padding-top: var(--space-4); border-top: var(--stroke-line) solid var(--line); }
.dn-access-general > .dn-icon { width: var(--icon-size-md); height: var(--icon-size-md); color: var(--ink-secondary); }
.dn-access-general > p { grid-column: 2 / -1; margin: 0; color: var(--ink-tertiary); font: var(--type-footnote); }
.dn-access .dn-access-general .dn-select > select { border-color: transparent; background: none; font-weight: var(--weight-medium); }
.dn-access-foot { display: flex; align-items: center; gap: var(--space-2); }
.dn-access-foot > :last-child { margin-left: auto; }
```

从「产品」继承了团队可见；这一页单独给许明加了评论权限，所以现状那句写了「和上级不同」：

```html
<div class="dn-access" role="dialog" aria-label="分享「需求文档」">
  <h3>分享「需求文档」</h3>
  <p class="dn-access-now">鹿野工作室的所有人可以查看，3 个人可以编辑。和「产品」不同 <a href="#">恢复成一样</a></p>
  <div class="dn-access-invite">
    <input class="dn-input" placeholder="名字或邮箱" aria-label="邀请">
    <span class="dn-select"><select aria-label="邀请的权限"><option selected>可以编辑</option><option>可以评论</option><option>可以查看</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span>
    <button class="dn-button is-primary" type="button">邀请</button>
  </div>
  <ul class="dn-access-list" aria-label="有权限的人">
    <li><span class="dn-avatar" aria-hidden="true">林</span><span class="dn-member-name"><span>林一（你）</span><span>lin@deernova.me</span></span><span class="dn-access-role">所有者</span></li>
    <li><span class="dn-avatar" aria-hidden="true">周</span><span class="dn-member-name"><span>周舟</span><span>来自「产品」</span></span><span class="dn-select"><select aria-label="周舟的权限"><option selected>可以编辑</option><option>可以评论</option><option>可以查看</option><option>移除</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span></li>
    <li><span class="dn-avatar" aria-hidden="true">沈</span><span class="dn-member-name"><span>沈遥</span><span>来自「产品」</span></span><span class="dn-select"><select aria-label="沈遥的权限"><option selected>可以编辑</option><option>可以评论</option><option>可以查看</option><option>移除</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span></li>
    <li><span class="dn-avatar" aria-hidden="true">许</span><span class="dn-member-name"><span>许明</span><span>xu@agency.cn</span></span><span class="dn-select"><select aria-label="许明的权限"><option>可以编辑</option><option selected>可以评论</option><option>可以查看</option><option>移除</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span></li>
  </ul>
  <div class="dn-access-general">
    <svg class="dn-icon" aria-hidden="true"><use href="#dn-team"/></svg>
    <span class="dn-select"><select aria-label="一般访问"><option>只有被邀请的人</option><option selected>鹿野工作室的所有人</option><option>有链接的任何人</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span>
    <span class="dn-select"><select aria-label="一般访问的权限"><option selected>可以查看</option><option>可以评论</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span>
    <p>工作室里的人在搜索和页面树里都能找到这一页。</p>
  </div>
  <div class="dn-access-foot">
    <button class="dn-button" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-link"/></svg>复制链接</button>
    <button class="dn-button is-plain" type="button">完成</button>
  </div>
</div>
```

改成「有链接的任何人」时，下面一行写清后果；发布到网页是单独的一组：

```html
<div class="dn-access" role="dialog" aria-label="分享「需求文档」">
  <div class="dn-access-general">
    <svg class="dn-icon" aria-hidden="true"><use href="#dn-web"/></svg>
    <span class="dn-select"><select aria-label="一般访问"><option>只有被邀请的人</option><option>鹿野工作室的所有人</option><option selected>有链接的任何人</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span>
    <span class="dn-select"><select aria-label="一般访问的权限"><option selected>可以查看</option><option>可以评论</option></select><svg class="dn-icon dn-select-chevron" aria-hidden="true"><use href="#dn-chevron-down"/></svg></span>
    <p>不用登录就能打开，包括 3 个子页面。</p>
  </div>
  <ul class="dn-list">
    <li class="dn-list-row"><label for="ex-share-publish">发布到网页</label><input class="dn-switch" id="ex-share-publish" type="checkbox" role="switch"></li>
  </ul>
  <div class="dn-access-foot">
    <button class="dn-button" type="button"><svg class="dn-icon" aria-hidden="true"><use href="#dn-link"/></svg>复制链接</button>
    <button class="dn-button is-plain" type="button">完成</button>
  </div>
</div>
```

### 窄屏和手机浏览器

- 分享面板变成从底部升起的整屏 sheet，顺序不变。
- 邀请的权限下拉放到输入框下面一行。
- 「复制链接」旁边加系统分享。

## Mac 应用

原生 macOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。尺寸见 style 的 [macOS](../../../deernova-style/references/scenes/macos.md)。

- 工具栏的「分享」打开一个 `popover`，内容和网页一样；「通过…发送」用系统的 `ShareLink`，发出的是链接。
- 权限下拉用系统的 `Picker`；「移除」在下拉最后，用分隔线隔开。
- popover 点别处就关；改动立即生效，没有「保存」。

```swift
Button("分享") { showsShare = true }
    .popover(isPresented: $showsShare, arrowEdge: .bottom) {
        Form {
            Text(accessSummary).foregroundStyle(.secondary)
            InviteField(onInvite: invite)
            Section { ForEach(people) { PersonAccessRow(person: $0) } }
            Section { GeneralAccessPicker(access: $page.generalAccess) }
            HStack { ShareLink("通过…发送", item: page.url); Spacer(); Button("复制链接", action: copyLink) }
        }
        .formStyle(.grouped)
        .frame(width: 440)
    }
```

## iPhone 应用

原生 iOS 应用，用 SwiftUI 和系统控件。和网页是同一个设计：区块、设计变量、组件和文案都相同，下面只写外壳的不同：窗口、材质、导航方式、系统控件和输入方式。iPad 按 Mac 应用的结构、触控的尺寸来做。

- 分享先弹系统分享面板，最上面一行是这一页的「权限设置」，点进去是这一页的分组列表。
- 有权限的人一组，一般访问一组，发布到网页一组；每个人的权限点进去选。
- 邀请在右上角，打开联系人和成员的搜索。

```swift
NavigationStack {
    Form {
        Section { Text(accessSummary) }
        Section("有权限的人") { ForEach(people) { person in NavigationLink(value: person) { LabeledContent(person.name, value: person.role.title) } } }
        Section("一般访问") { Picker("谁能打开", selection: $page.generalAccess) { ForEach(GeneralAccess.allCases) { Text($0.title).tag($0) } } }
        Section { Toggle("发布到网页", isOn: $page.isPublished) }
    }
    .navigationTitle("分享")
    .toolbar { Button("邀请", systemImage: "person.badge.plus", action: invite) }
}
```

分组列表，现状写在最上面：

```html
<div class="ex-device">
  <div class="ex-phone" data-density="touch">
    <div class="ex-phone-status" aria-hidden="true"><span>9:41</span><span>100%</span></div>
    <div class="ex-phone-body">
      <div class="ex-ios-nav"><button class="dn-button is-plain is-sm" type="button">完成</button><span class="ex-ios-nav-title">分享</span><button class="dn-icon-button" type="button" aria-label="邀请"><svg class="dn-icon" aria-hidden="true"><use href="#dn-plus"/></svg></button></div>
      <p class="dn-access-now">鹿野工作室的所有人可以查看，3 个人可以编辑。</p>
      <section class="dn-list-section"><p class="dn-list-header">有权限的人</p><ul class="dn-list">
        <li class="dn-list-row">周舟<span class="dn-list-value">可以编辑</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
        <li class="dn-list-row">沈遥<span class="dn-list-value">可以编辑</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
        <li class="dn-list-row">许明<span class="dn-list-value">可以评论</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li>
      </ul></section>
      <section class="dn-list-section"><ul class="dn-list"><li class="dn-list-row">谁能打开<span class="dn-list-value">工作室所有人</span><svg class="dn-icon dn-chevron" aria-hidden="true"><use href="#dn-chevron-right"/></svg></li><li class="dn-list-row"><label for="ex-ios-publish">发布到网页</label><input class="dn-switch" id="ex-ios-publish" type="checkbox" role="switch"></li></ul></section>
    </div>
  </div>
</div>
```

## 状态

| 情况 | 样子 |
| --- | --- |
| 邀请的人还没有账户 | 行里写邮箱和「等对方接受」；7 天后过期，过期写 `warning` 的「邀请已过期」加「重新发送」 |
| 没有权限分享 | 面板只有「复制链接」和一句「只有可以编辑的人能改权限」；有链接的人能不能打开照常写在现状里 |
| 团队禁止公开链接 | 「有链接的任何人」在下拉里禁用，旁边写「你的团队不允许公开链接」 |
| 改了权限 | 立即生效，底部轻提示「许明现在可以评论」加「撤销」 |
| 已发布到网页 | 发布那一组展开：公开地址、「复制」、「允许搜索引擎收录」开关、「取消发布」 |

## 不要

- 打开分享面板先看到一排开关和下拉，要自己拼出现在谁能看到。
- 「复制链接」时偷偷把页面改成公开。
- 子页面的权限和上级不同，界面上却看不出来。
- 每一行一个红色的叉，一不小心就把人移除了。
- 权限分成「完全访问」「可以编辑内容」「可以编辑」「可以插入」……好几档意思差不多的。
