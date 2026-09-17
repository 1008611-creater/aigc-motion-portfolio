# 文档索引

> 先读这里，再决定翻哪一份。**不要整目录通读 docs/。**
> 仓库铁律见 [../AGENTS.md](../AGENTS.md)。

## 按任务查

| 我要做的事 | 读这一份 |
|---|---|
| 第一次接手，想搞清楚这站是什么、怎么跑起来 | [handoff.md](handoff.md) |
| 新增 / 修改一条作品数据 | [content-model.md](content-model.md) |
| 改视觉、配色、字号、间距 | [design-system.md](design-system.md) |
| 搞清楚组件谁调用谁、状态放哪 | [architecture.md](architecture.md) |
| 改部署、换域名、排查线上不更新 | [deployment.md](deployment.md) |
| 处理素材、加新成片、控制仓库体积 | [media-pipeline.md](media-pipeline.md) |
| 提交前跑验收 | [verification.md](verification.md) |

## 一页速览

| 事实 | 值 |
|---|---|
| 技术栈 | React 19 · TypeScript strict · Vite 8 · Motion · Lenis |
| 样式 | 手写 CSS + 设计 token（无 Tailwind） |
| 入口 | `index.html` → `src/main.tsx` → `src/App.tsx` |
| 内容源 | `src/data/portfolio.ts`（11 条精选）· `src/data/library.ts`（31 条作品库） |
| 素材 | 精选走仓库内 `public/`；作品库走公网 `hb.cauai.fun` |
| 发布 | 推送 `main` → GitHub Actions → GitHub Pages |
| 线上 | https://1008611-creater.github.io/aigc-motion-portfolio/ |
| 构建 | `npm install` → `npm run build` |

## 维护约定

这份索引是文档的唯一入口。新增一份文档时，同时在上面的「按任务查」表里加一行；
删除文档时也要删掉对应行，避免索引指向不存在的文件。
