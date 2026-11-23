# @deernova/logos

AI 模型、公司和工具的 logo，共 94 个，按海外模型与公司、国内模型与公司、图像视频与声音、编程与智能体、平台与本地运行分组。每个 logo 有三个 SVG 文件：

| 文件 | 用在 |
| --- | --- |
| `svg/<id>-light.svg` | 浅色背景。有彩色版、并且在浅色纸面上看得清时用彩色，否则用墨色（#171717）单色 |
| `svg/<id>-dark.svg` | 深色背景。规则同上，单色用 #ededed |
| `svg/<id>.svg` | 单色，`fill="currentColor"`，颜色跟随文字。Deernova 的界面以黑白灰为主，模型选择器、设置页这类地方优先用它 |

```html
<picture>
  <source srcset="node_modules/@deernova/logos/svg/claude-dark.svg" media="(prefers-color-scheme: dark)">
  <img src="node_modules/@deernova/logos/svg/claude-light.svg" alt="Claude" width="24" height="24">
</picture>
```

名字、分组和对应的产品见 `logos.json`。每个 SVG 都带 `<title>`，内联使用时就是读屏读出的名字；只做装饰时加 `aria-hidden="true"`。

## 来源

图形来自社区开源的 [LobeHub Icons](https://github.com/lobehub/lobe-icons)（`@lobehub/icons-static-svg`，MIT，见 `LICENSE-LOBEHUB`）。LobeHub 没有的 logo，从 `art/logos/<id>.png` 描成矢量。

这些 logo 是各公司的商标，按各家的品牌规范使用，只用来指代对应的产品，不要改形状、不要拿来表示别的东西。

## 加 logo

1. 在 `logos.json` 对应分组里加一行：`id`（kebab-case）、`name`（显示名）；LobeHub 里的名字和 `id` 不同时写 `lobe`；它代表的产品写在 `for` 里。
2. LobeHub 没有时，把 PNG（透明背景、深色图形）放到仓库的 `art/logos/<id>.png`，这一行加 `"png": true`。
3. `npm run logos`。脚本按对比度决定每种主题用彩色还是单色；看着不对时，用 `"theme": { "light": "mono", "dark": "color" }` 指定。
4. `npm test`。
