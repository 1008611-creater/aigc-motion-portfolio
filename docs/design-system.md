# 设计系统

> 要改配色、字号、间距、动效节奏时读这份。
> Token 定义在 [../src/styles/global.css](../src/styles/global.css) 顶部的 `:root`。

## 1. 设计意图

暗色沉浸式，内容优先。视觉服务两件事：让视频成为主角，让信息层级一眼可读。

因此有三条原则：

1. **背景退后。** 近黑背景 + 极低对比度的面板，素材自己发光。
2. **层级靠字号与留白，不靠装饰。** 没有多余边框、阴影、渐变。
3. **强调色稀缺。** 橙色只用于交互与关键数字，出现越少越有力。

## 2. 颜色 Token

```css
--bg:            #07080a;   /* 页面底色，近黑 */
--bg-soft:       #0d0f12;   /* 交替分区底色 */
--panel:         rgba(255,255,255,0.035);  /* 卡片面 */
--panel-strong:  rgba(255,255,255,0.06);   /* 悬停态卡片面 */
--line:          rgba(255,255,255,0.1);    /* 常规描边 */
--line-strong:   rgba(255,255,255,0.2);    /* 悬停描边 */
--text:          #f2f2ef;   /* 主文本，略带暖调的白 */
--text-soft:     #a8a8a2;   /* 次级文本 */
--text-dim:      #6f7076;   /* 弱化文本 */
--accent:        #ff6a2b;   /* 强调色，仅用于交互与关键数字 */
--accent-soft:   rgba(255,106,43,0.14);    /* 强调色的低透明背景 */
--ink:           #0a0a0b;   /* 强调色上的文字 */
```

**用色纪律**：`--accent` 在一屏内出现不要超过 3 处。
它现在的落点是：品牌圆点、主按钮、卡片序号。再加就会稀释。

## 3. 形状与节奏

```css
--radius:     14px;   /* 常规圆角：按钮、小面板 */
--radius-lg:  26px;   /* 大圆角：卡片、弹层 */
--pad:        clamp(20px, 5vw, 84px);  /* 页面左右留白，随视口伸缩 */
--ease:       cubic-bezier(0.22, 1, 0.36, 1);  /* 全站统一缓动 */
```

`--ease` 是一条「快出慢收」曲线，全站所有过渡都用它。
新增动效时不要另写贝塞尔曲线，否则手感会不一致。

## 4. 字体

```css
--font-display: 'Archivo', 'Space Grotesk', 'PingFang SC', 'Microsoft YaHei', sans-serif;
--font-body:    'Space Grotesk', 'Archivo', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
```

- 西文字体从 Google Fonts 加载（见 `index.html`），已配 `preconnect`。
- 中文回退到系统字体，**不额外加载中文字体包**（体积不可控）。
- 标题用 `--font-display`，正文用 `--font-body`。
- 大标题统一用 `clamp()` 做流式字号，例如 `clamp(30px, 4.6vw, 58px)`。

## 5. 样式组织

全部样式在 `src/styles/global.css`，按分区注释分隔，顺序即优先级意图：

```
chrome → shared bits → hero → work grid → projects
→ services → capability & education → contact → footer → lightbox
```

新增样式**加进对应分区**，不要堆在文件末尾。跨分区的新区块就新开一段注释。

## 6. 命名约定

- BEM 风格：`.card` / `.card__title` / `.card__frame`。
- 状态用独立 class 或 `data-*`：
  - 交互态用 class（`.chip.is-active`、`.nav.is-solid`）
  - 数据驱动的状态用属性（`.card[data-orientation='wide']`）
- **不使用 Tailwind**，不写行内样式。唯一例外是 Motion 驱动的动态值
  （如 `style={{ y: mediaY }}`），因为那是运行时计算值。

## 7. 动效规范

动效只用两种，都走 `--ease`：

| 动效 | 时长 | 实现 |
|---|---|---|
| 滚动揭示（区块入场） | 0.7s | `useReveal` 切 `data-reveal` 属性 |
| 交互反馈（悬停、弹层） | 0.24–0.42s | CSS transition / Motion |

三条硬规则：

1. **必须可降级。** `prefers-reduced-motion: reduce` 时，揭示直接可见、视差归零、
   光标光晕不挂载。
2. **不在滚动里做 setState。** 鼠标光晕走 CSS 变量 + `requestAnimationFrame`
   （见 `Chrome.tsx` 的 `CursorField`），逐帧 setState 会掉帧。
3. **不做强制滚动动画。** 不劫持用户滚动，Lenis 只做平滑插值。

## 8. 响应式

三个断点（详见 [architecture.md](architecture.md) 第 6 节）：
`> 1100px` 桌面 / `700–1100px` 平板 / `< 700px` 手机。

断点只调整布局密度，**不改变信息结构**：手机上卡片变整行，但内容一条不少。
