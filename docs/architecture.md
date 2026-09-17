# 架构

> 想搞清楚「组件谁调用谁、状态放哪」时读这份。视觉规范见 [design-system.md](design-system.md)。

## 1. 渲染链路

```
index.html
  └─ src/main.tsx          挂载 React，StrictMode，Lenis 包裹全站
       └─ src/App.tsx      组装分区 + 持有唯一全局状态 activeWork
            ├─ Chrome.tsx      ScrollProgress / CursorField / Nav
            ├─ Hero.tsx
            ├─ Sections.tsx    WorkSection / ProjectSection / ServiceSection
            │                  / CapabilitySection / ContactSection
            ├─ LibrarySection.tsx
            ├─ Chrome.tsx      Footer
            └─ Lightbox.tsx    受 activeWork 控制
```

## 2. 状态管理

全站只有一个跨组件状态：**当前打开的弹层作品**。

```
App.tsx
  const [active, setActive] = useState<Work | null>(null)
      │
      ├─ setActive ──→ WorkSection  onOpen
      │            └─ LibrarySection onOpen
      │
      └─ active ────→ Lightbox work={active}
```

除此之外的状态都**局部在组件内**，刻意不上全局 store：

| 状态 | 位置 | 说明 |
|---|---|---|
| 当前弹层作品 | `App.tsx` | 唯一跨组件状态 |
| 精选区筛选值 | `WorkSection` | 局部 |
| 作品库筛选值 / 是否展开 | `LibrarySection` | 局部 |
| 导航是否吸顶 | `Nav` | 由滚动位置推导 |
| 卡片是否悬停预览 | `WorkCard` | 局部，控制 video 挂载 |
| 联系方式的「已复制」 | `ContactSection` | 局部，2.2 秒后自动复位 |

**为什么不上状态库**：页面是单向展示流，唯一需要共享的是弹层开关。
引入 store 会让「数据从哪来」变模糊，而这里数据全部是静态的。

## 3. 数据层

`src/data/` 是纯数据 + 类型，不 import React、不读环境变量、不发请求。

```
portfolio.ts
  ├─ type Orientation = 'vertical' | 'wide'
  ├─ type Work        ← 作品的数据契约（精选与作品库共用）
  ├─ type Profile
  ├─ profile / heroStats / marqueeWords
  ├─ works            ← 11 条精选
  ├─ services / steps / projects / capabilities / education

library.ts
  └─ libraryWorks: Work[]   ← 31 条作品库，复用同一个 Work 类型
```

`Work` 是全站最重要的契约，字段含义见 [content-model.md](content-model.md)。
两个分区共用它，所以新增字段时两边都会受影响——这是有意的，避免两套卡片。

## 4. 组件职责边界

| 组件 | 负责 | 不负责 |
|---|---|---|
| `App.tsx` | 分区顺序、弹层状态 | 任何具体展示细节 |
| `Chrome.tsx` | 全站外壳：进度、光标、导航、页脚 | 分区内容 |
| `Sections.tsx` | 五个内容分区 | 作品卡片内部 |
| `LibrarySection.tsx` | 作品库的筛选与分页逻辑 | 卡片渲染（交给 WorkCard） |
| `WorkCard.tsx` | 单条作品的展示与悬停预览 | 筛选、弹层开关 |
| `Lightbox.tsx` | 播放弹层、键盘与滚动锁定 | 决定播放哪一条 |
| `SectionHead.tsx` | 分区标题结构 | 具体文案 |
| `FilterChips.tsx` | 通用筛选条交互 | 筛选逻辑本身 |

**共用组件是刻意抽出来的**：`SectionHead` 与 `FilterChips` 原本在
`Sections.tsx` 与 `LibrarySection.tsx` 各有一份，改一处忘另一处会导致
字号、间距、无障碍属性漂移。现在两边都引用同一份。

## 5. 样式架构

全部样式集中在 `src/styles/global.css`，按分区用注释分隔：

```
chrome → shared bits → hero → work grid → projects
→ services → capability & education → contact → footer → lightbox
```

设计 token 定义在 `:root`，组件只引用变量。命名用 BEM 风格（`card__title`、
`chip is-active`），作品朝向等状态用 `data-*` 属性选择器
（`.card[data-orientation='wide']`）而不是额外的 class。

## 6. 响应式策略

三个断点，只改布局密度，不改信息结构：

| 宽度 | 作品网格 | 说明 |
|---|---|---|
| > 1100px | 竖屏 4 栏 / 横屏 8 栏（12 栏制） | 桌面 |
| 700–1100px | 统一 6 栏 | 平板 |
| < 700px | 统一 12 栏（整行） | 手机 |

## 7. 无障碍与降级

- 全站遵循 `prefers-reduced-motion`：`useReveal` 直接置为可见，
  `Hero` 的视差位移归零，`CursorField` 不挂载。
- 弹层是 `role=dialog` + `aria-modal`，支持 Esc 关闭并锁定背景滚动。
- 筛选条用 `role=group` + `aria-pressed` 表达选中态，不靠颜色单独表意。
- 卡片用 `<button>` 承载点击，键盘可达。
