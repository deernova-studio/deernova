---
name: deernova-page
description: Deernova 的页面布局：一种页面由哪些区块组成、按什么顺序排、哪些必须有、哪些不要放、窄屏和空状态时怎么变。在 Deernova 的应用或网站里新建整页、调整页面结构或区块顺序时使用，包括应用里的 AI 对话页、AI 任务页（任务列表、过程、确认、改动）、智能体列表、智能体配置（指令、模型、工具权限、试用、发布）、用量（额度、热力图、按智能体）、资料库（同步状态、检索试试）、工具与连接（授权、权限上限）、列表页（列表加详情）、详情页、文档编辑页、卡片页（缩略图网格）、图片库与查看器、数据概览页、搜索结果页、设置页、登录与首次打开、分享出去的只读页、整页错误（404、无权限、离线），图文信息流、短视频流、个人主页和社区通知，以及官网的主页、文档页、博客页、更新记录和定价页。页面按 AI 系统、中台、信息展示、社区与内容、官网与文档、通用分组，每种页面分网页、Mac 应用和 iPhone 应用来写。颜色、字体、尺寸和组件写法以 deernova-style 为准。
---

# Deernova Page

一页里放什么、按什么顺序放、哪些不放。

## 和 deernova-style 的分工

- style 管一个东西长什么样：颜色、字体、尺寸、组件。page 管一页里有哪些东西、怎么排。
- 先按 style 的总则和场景定好密度，再读这里。page 不定义新的数值和组件。每份页面文件的示例 CSS 只写页面骨架（分栏、栏宽、区块间距），全部引用 style 的变量；项目里换成自己的类名。
- 官网类页面（主页、文档页、博客页）共用[主页](references/pages/home.md)示例里的页眉和页脚：主页的页眉是浮在插画上的玻璃条，文档页和博客页用不带玻璃的那一种。三种页面的标题都用 `--font-display`（中文思源宋体）。
- 两边说法不一致时，以 style 为准，并告诉用户哪里不一致。

## 页面

按页面是做什么的分成六组。每份页面文件先写各端共用的区块，再分「网页」（HTML 和 CSS，包括窄屏和手机浏览器）、「Mac 应用」和「iPhone 应用」（SwiftUI）三节；只在浏览器里打开的页面只有网页一节。三端是同一个设计：区块、设计变量、组件和文案都相同，Mac 和 iPhone 两节只写外壳的不同。iPad 按 Mac 应用的结构、触控的尺寸来做。

### AI 系统

| 页面 | 什么时候用 |
| --- | --- |
| [AI 对话页](references/pages/chat.md) | 和 AI 来回对话：新对话首页、进行中的对话、产物预览 |
| [AI 任务页](references/pages/task.md) | AI 自己做一件要花几分钟的事：任务列表，以及一个任务的过程、确认和改动 |
| [智能体列表](references/pages/agents.md) | 有好几个智能体时的总入口：哪个在忙、哪个出错，新建和复制 |
| [智能体配置](references/pages/agent-settings.md) | 一个智能体的指令、模型、资料、工具与权限，边改边试，发布才生效 |
| [用量](references/pages/usage.md) | token、对话、任务和费用，额度还剩多少，每天的使用热力图，按智能体拆开 |
| [资料库](references/pages/knowledge.md) | 智能体能读的文件、文件夹和数据源：同步状态、谁在用、检索试试 |
| [工具与连接](references/pages/connections.md) | 接了哪些外部服务、用谁的账户、每个操作的权限上限、授权过期 |

### 中台

| 页面 | 什么时候用 |
| --- | --- |
| [列表页](references/pages/list.md) | 浏览一组同类条目、挑一条处理：笔记、邮件、任务、订单 |
| [详情页](references/pages/detail.md) | 打开一条记录整页地看和改 |
| [设置页](references/pages/settings.md) | 账户、通知、外观这类设置 |
| [数据概览页](references/pages/dashboard.md) | 一眼看清几个关键数字的变化：经营、使用、进度 |

### 信息展示

| 页面 | 什么时候用 |
| --- | --- |
| [卡片页](references/pages/cards.md) | 以画面为主、用来浏览的条目：文档缩略图、设计稿、模板 |
| [图片库与查看器](references/pages/gallery.md) | 一批图片的网格，和点开一张后的全屏查看 |
| [文档编辑页](references/pages/editor.md) | 写一篇笔记或文档 |
| [分享只读页](references/pages/share.md) | 别人点开分享链接看到的那一页 |

### 社区与内容

| 页面 | 什么时候用 |
| --- | --- |
| [图文信息流](references/pages/feed.md) | 一条接一条往下刷的短内容：文字、图片、链接，回复、转发、喜欢 |
| [短视频流](references/pages/video-feed.md) | 竖屏视频一条占满一屏，上下滑切换，评论不打断播放 |
| [个人主页](references/pages/profile.md) | 一个人是谁、发过什么、要不要关注；自己看时是编辑资料 |
| [通知](references/pages/notifications.md) | 回复、提及、转发、喜欢、关注；需要回应的单列，只是数量的合并 |

### 官网与文档

| 页面 | 什么时候用 |
| --- | --- |
| [主页](references/pages/home.md) | 产品官网的第一页 |
| [文档页](references/pages/docs.md) | 产品文档、帮助中心、开发者指南 |
| [博客页](references/pages/blog.md) | 博客：文章列表和单篇文章 |
| [更新记录](references/pages/changelog.md) | 每个版本改了什么 |
| [定价](references/pages/pricing.md) | 方案、价格和对比 |

### 通用

| 页面 | 什么时候用 |
| --- | --- |
| [登录与首次打开](references/pages/sign-in.md) | 登录、注册、找回，以及登录后第一次看到的工作区 |
| [搜索结果页](references/pages/search.md) | 在整个应用或网站里搜一个词之后的那一页 |
| [整页错误](references/pages/error.md) | 找不到、没有权限、出错、离线、维护中、版本太旧 |

表里没有的页面，按 style 的总则和整页示例搭。

## 工作流程

1. 读 style 的总则，确定场景和密度。
2. 在上面的表里找最接近的页面，读它的文件：先读共用的区块，再读你要做的那一端（网页、Mac 应用或 iPhone 应用）。
3. 按文件里的区块顺序搭出整页，每个区块用 style 的组件实现。
4. 对照页面文件的示例和「不要」，再用 style 的审查清单过一遍。
