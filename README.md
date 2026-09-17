# 刘曙宾 · AIGC 动效作品集

一个暗色沉浸式的个人作品集站点，用来展示 AI 商业视频样片、项目线、能力与联系方式。

- 线上地址：https://1008611-creater.github.io/aigc-motion-portfolio/
- 仓库地址：https://github.com/1008611-creater/aigc-motion-portfolio

> **第一次接手请先读 [AGENTS.md](AGENTS.md)（仓库铁律）和 [docs/handoff.md](docs/handoff.md)（交接说明）。**
> 文档总入口是 [docs/INDEX.md](docs/INDEX.md)，按任务查，不要整目录通读。

## 站点包含什么

作品分两层，这是刻意设计：

- **首屏**：视频背景 + 视差 + 关键数据条。
- **精选作品 11 条**：回答「我能做什么」。按用途筛选（产品广告、门店内容、人物种草、
  食品视觉、场景视觉），每条有标题、摘要、实测时长与交付比例。悬停才加载视频预览，
  点击进入弹层播放。
- **作品库 31 条**：回答「我真的做过」。按横竖屏归档，只有序号 + 实测参数，
  首屏渲染 12 条，按需展开全部。
- **项目区**：四条项目线，每条给出可核对的证据点与技术标签。
- **服务区**：可承接的内容方向与四步合作流程。
- **能力区**：四条能力 + 教育背景。
- **联系区**：电话、邮箱、GitHub，支持一键复制联系方式。

## 技术栈

React 19 · TypeScript（strict）· Vite 8 · Motion（滚动揭示）· Lenis（平滑滚动）·
手写 CSS + 设计 token（**不使用 Tailwind**）。

动效全部遵循 `prefers-reduced-motion`：系统开启「减弱动态效果」时自动降级为静态展示。

## 本地开发

需要 **Node 22+**（CI 用 22，本地实测 24 可用）。Python 3 只在跑素材脚本时需要。

```bash
npm install
npm run dev        # 本地开发，默认 http://localhost:5173
npm run typecheck  # 只做类型检查
npm run build      # 类型检查 + 生产构建，产物在 dist/
npm run preview    # 预览构建产物
```

## 部署

推送到 `main` 分支后，GitHub Actions（[.github/workflows/deploy.yml](.github/workflows/deploy.yml)）
会自动构建并发布到 GitHub Pages。首次使用需要在仓库 `Settings → Pages` 把 Source 设为
**GitHub Actions**。

构建产物使用相对路径（`vite.config.ts` 中 `base: ./`），因此部署在子路径下也不会丢素材。
细节见 [docs/deployment.md](docs/deployment.md)。

## 目录结构

```
src/
  App.tsx                 # 组合各区块 + 弹层状态
  main.tsx                # 入口，Lenis 包裹全站
  data/portfolio.ts       # 类型定义 + 精选 11 条 + 项目/服务/能力/教育/联系方式
  data/library.ts         # 作品库 31 条（由 _audit/works_meta.json 生成）
  hooks/useReveal.ts      # 滚动揭示
  components/
    Chrome.tsx            # 滚动进度、鼠标跟随、导航、页脚
    Hero.tsx              # 首屏
    SectionHead.tsx       # 分区标题（共用）
    FilterChips.tsx       # 筛选条（共用）
    Sections.tsx          # 作品 / 项目 / 服务 / 能力 / 联系
    WorkCard.tsx          # 作品卡片
    LibrarySection.tsx    # 作品库分区
    Lightbox.tsx          # 弹层播放器
  styles/global.css       # 设计 token 与全部样式
public/
  assets/                 # 11 张精选封面
  media/                  # 11 条精选成片
docs/                     # 交接文档，入口 docs/INDEX.md
```

## 素材与内容说明

站内所有作品信息、时长与数据均来自真实交付记录与成片实测，未使用虚构数据。
样片封面与视频为本人的项目交付物，仅用于个人作品展示。
作品库 31 条走公网静态直链，不占仓库体积；规则见 [docs/media-pipeline.md](docs/media-pipeline.md)。

联系方式：18518090752 · 1453637677@qq.com
