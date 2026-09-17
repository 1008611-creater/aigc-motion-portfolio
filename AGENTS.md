# AGENTS.md — 本仓库工程铁律

> 面向所有在此仓库工作的人与 AI Agent。文档总索引见 [docs/INDEX.md](docs/INDEX.md)。
> 仓库：https://github.com/1008611-creater/aigc-motion-portfolio
> 线上：https://1008611-creater.github.io/aigc-motion-portfolio/

## 1. 不可违反

1. **不编造作品数据。** 站内每条作品的标题、分辨率、时长、分类都必须来自真实成片实测。
   禁止为了让页面「看起来更满」而补假条目、改时长、编项目名。没有素材就少展示一条。
2. **不承诺做不到的事。** 这是展示型站点，不写「一键发布」「自动投放」这类无法兑现的文案。
3. **素材体积要有纪律。** `public/media` 与 `public/assets` 是**随仓库发布**的（当前 11 条精选，
   约 58MB）。新增超过 ~10MB 的成片不要塞进 `public/`，改为公网托管后只存 URL，
   参照 `src/data/library.ts` 的 31 条作品库做法。
4. **动效必须可降级。** 任何新增动效都要考虑 `prefers-reduced-motion: reduce`；
   系统开启减弱动效时不得出现闪烁、位移或强制滚动动画。
5. **不使用 Tailwind。** 本项目是手写 CSS + 设计 token（见 [docs/design-system.md](docs/design-system.md)）。
   新样式一律加在 `src/styles/global.css` 的对应分区里，不要在组件里写内联魔法值。
6. **凭证与隐私不入库。** 手机号与邮箱是本人在简历场景下主动公开的联系方式，属于有意展示；
   除此之外的任何密钥、token、后台地址一律禁止进入仓库、URL、日志与截图。
7. **推送 `main` 就等于上线。** `main` 由 GitHub Actions 自动发布，没有预览环境。
   小改动可以直接推，但必须先本地 `npm run build` 并看过页面；
   涉及布局重构、批量改数据、换素材这类影响面大的改动，先开分支验证再合并。
   回滚用 `git revert`，不要强推 `main`（见 [docs/deployment.md](docs/deployment.md) §7）。

## 2. 目录约定

| 目录 | 放什么 | 不许放什么 |
|---|---|---|
| `src/data/` | 全部展示内容与类型定义（纯数据，无副作用） | 网络请求、DOM 操作 |
| `src/components/` | 展示与交互组件 | 直接读写远端接口 |
| `src/hooks/` | 可复用浏览器行为（滚动揭示等） | 业务数据 |
| `src/styles/` | 设计 token 与全部样式 | 组件私有的一次性 hack |
| `public/` | 随站点发布的静态素材（精选封面与成片） | 超过 ~10MB 的单个成片 |
| `docs/` | 规格、架构、交接文档 | 密钥、隐私、临时草稿 |
| `scripts/` | 素材处理与浏览器验证脚本（**已 gitignore**） | 站点运行时依赖 |

依赖方向单向，不允许反向 import：

```
src/main.tsx → App.tsx → components/ → data/
                         hooks/
```

- `src/data/` 必须是**纯数据 + 类型**，不 import React、不读环境变量。
- 组件之间共享的 UI 结构（标题、筛选条）抽到独立组件，不要各自复制一份：
  已有 `SectionHead.tsx` 与 `FilterChips.tsx`。

## 3. 代码风格

- TypeScript `strict`，不使用 `any`；新增数据结构先在 `src/data/portfolio.ts` 定义类型。
- 组件 `PascalCase.tsx`，hook 以 `use` 开头，常量 `SCREAMING_SNAKE`。
- 中文注释写「为什么」，不写「做了什么」。
- 颜色、圆角、间距、缓动一律引用 `:root` 里的 token，不写裸值。

## 4. 提交前自检

- [ ] `npm run build` 通过（含 `tsc --noEmit` 类型检查）。
- [ ] 桌面与手机两种宽度都看过，新分区在 390px 下不溢出。
- [ ] 新增作品的分辨率与时长是从成片实测得来的。
- [ ] 动效在 `prefers-reduced-motion: reduce` 下可读可用。
- [ ] 大素材没有进 `public/`；仓库体积没有异常增长。
- [ ] 改了架构或约定，`docs/` 已同步更新。
