# @deernova/logos

品牌 logo，分两套：

| 套 | 文件夹 | 内容 |
| --- | --- | --- |
| AI logo | `svg/ai/` | 87 个：海外和国内的模型与 AI 公司、图像视频与声音、编程与智能体、AI 平台与本地运行 |
| 应用 logo | `svg/app/` | 89 个：海外常用应用、办公与开发、国内常用应用，以及 Google、Apple、Microsoft、腾讯、百度这类公司 |

每个 logo 有三个 SVG 文件：

| 文件 | 用在 |
| --- | --- |
| `<id>-light.svg` | 浅色背景。有彩色版、并且在浅色纸面上看得清时用彩色，否则用墨色（#171717）单色 |
| `<id>-dark.svg` | 深色背景。规则同上，单色用 #ededed |
| `<id>.svg` | 单色，`fill="currentColor"`，颜色跟随文字。Deernova 的界面以黑白灰为主，模型选择器、设置页这类地方优先用它 |

```html
<picture>
  <source srcset="node_modules/@deernova/logos/svg/app/google-dark.svg" media="(prefers-color-scheme: dark)">
  <img src="node_modules/@deernova/logos/svg/app/google-light.svg" alt="Google" width="24" height="24">
</picture>
```

名字、分组和对应的产品见 `logos.json`。每个 SVG 都带 `<title>`，内联使用时就是读屏读出的名字；只做装饰时加 `aria-hidden="true"`。

## 来源

大部分图形来自社区开源的图标集，每个文件开头的注释写明了出处：

- [LobeHub Icons](https://github.com/lobehub/lobe-icons)（`@lobehub/icons-static-svg`，MIT，见 `LICENSE-LOBEHUB`）：AI logo 的默认来源，也用于应用 logo 里的 Google、Apple、Microsoft、Meta、腾讯、百度、字节跳动、哔哩哔哩、剪映。
- [Simple Icons](https://github.com/simple-icons/simple-icons)（`simple-icons`，CC0）：应用 logo 的默认来源，提供单色图形和品牌色。
- [SVG Logos](https://github.com/gilbarbara/logos)（`@iconify-json/logos`，CC0）：多色的应用 logo，比如 Chrome、YouTube、Slack。

这三个图标集都没有的 19 个（京东、拼多多、钉钉、飞书、Amazon、LinkedIn、VS Code 等），从 PNG 描成矢量：图片取自 Wikimedia Commons、各家官网的网站图标或 App Store 的应用图标，裁好后放在仓库的 `art/logos/<套>/<id>.png`，`logos.json` 里的 `from` 写明出处。描出来的图形比原版矢量粗糙一些，拿到官方 SVG 后应该换掉。这些 logo 是各公司的商标，按各家的品牌规范使用，只用来指代对应的产品，不要改形状、不要拿来表示别的东西。

## 加 logo

1. 在 `logos.json` 对应的套和分组里加一行：`id`（kebab-case）、`name`（显示名），它代表的产品写在 `for` 里。
   - 默认从这一套的来源取，名字就是 `id`；名字不同时写 `lobe`、`simple` 或 `logos`。
   - 应用 logo 想要多色版时，加上 SVG Logos 里的名字（`logos`），单色版仍从 Simple Icons 取。
   - 只有多色版、而且压成一种颜色后形状还清楚时，写 `"mono": "flatten"`。
2. 都没有时，把 PNG 放到仓库的 `art/logos/<套>/<id>.png`，这一行加 `"png": true` 和出处 `from`。透明或白色背景会被去掉；四角有颜色时当作铺满方块的应用图标，裁成圆角方块。单色版里比 `threshold`（默认 0.85）浅的颜色变成镂空，图形被吞掉时调低它：`"png": { "threshold": 0.5 }`。
3. `npm run logos`。脚本按对比度决定每种主题用彩色还是单色；看着不对时，用 `"theme": { "light": "mono", "dark": "color" }` 指定。
4. `npm test`。
