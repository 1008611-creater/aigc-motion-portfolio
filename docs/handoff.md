# 交接说明

> 面向下一位接手这个站点的 Agent。读完这份 + [../AGENTS.md](../AGENTS.md)，就能直接开工。
> 本文只写「现状」与「为什么」，不写教程。

## 1. 这是什么

刘曙宾的个人 AIGC 作品集站点。单页应用，暗色沉浸式，用来展示 AI 商业视频样片、
项目线、能力与联系方式。

- 线上：https://1008611-creater.github.io/aigc-motion-portfolio/
- 仓库：https://github.com/1008611-creater/aigc-motion-portfolio
- 技术栈：React 19 · TypeScript strict · Vite 8 · Motion（滚动动效）· Lenis（平滑滚动）
- 样式：手写 CSS + 设计 token，**不使用 Tailwind**

## 2. 当前完成度

| 分区 | 状态 | 数据源 |
|---|---|---|
| 首屏 Hero | 完成 | `portfolio.ts` → `profile` / `heroStats` |
| 精选作品 11 条 | 完成 | `portfolio.ts` → `works` |
| 作品库 31 条 | 完成 | `library.ts` → `libraryWorks` |
| 项目线 4 条 | 完成 | `portfolio.ts` → `projects` |
| 服务与流程 | 完成 | `portfolio.ts` → `services` / `steps` |
| 能力与教育 | 完成 | `portfolio.ts` → `capabilities` / `education` |
| 联系方式 | 完成 | `portfolio.ts` → `profile` |
| 部署流水线 | 完成 | `.github/workflows/deploy.yml` |

站点结构分两层，这是刻意的：

1. **精选 11 条**回答「我能做什么」——按用途归类，有标题、有摘要。
2. **作品库 31 条**回答「我真的做过」——按横竖屏归档，只有序号 + 实测参数。

两层素材**不是同一批文件**（已核对，无体积重叠）。改数据时不要假设它们能互相替换。

## 3. 五分钟跑起来

```bash
npm install
npm run dev        # 本地开发，默认 http://localhost:5173
npm run typecheck  # 只做类型检查
npm run build      # 类型检查 + 生产构建，产物在 dist/
npm run preview    # 预览构建产物
```

需要 Node 22+（CI 用 22，本地开发机实测 24 可用）。Python 3 仅在跑素材脚本时需要。

## 4. 代码地图

```
index.html                  # HTML 外壳、字体、SEO meta
src/
  main.tsx                  # 入口：挂载 React，用 Lenis 包裹全站滚动
  App.tsx                   # 组装各分区 + 弹层状态（active work）
  data/
    portfolio.ts            # 类型定义 + 精选 11 条 + 项目/服务/能力/教育/联系方式
    library.ts              # 作品库 31 条（仅数据，公网 URL）
  hooks/
    useReveal.ts            # 滚动揭示（IntersectionObserver，单例阈值）
  components/
    Chrome.tsx              # 滚动进度条、鼠标跟随光晕、导航、页脚
    Hero.tsx                # 首屏（视频背景 + 视差 + 数据条）
    SectionHead.tsx         # 各分区共用标题结构
    FilterChips.tsx         # 各分区共用筛选条
    Sections.tsx            # 作品 / 项目 / 服务 / 能力 / 联系 五个分区
    WorkCard.tsx            # 作品卡片（悬停才挂载视频预览）
    LibrarySection.tsx      # 作品库分区（筛选 + 分页展开）
    Lightbox.tsx            # 弹层播放器（Esc 关闭、锁滚动）
  styles/
    global.css              # 设计 token + 全部样式，按分区注释分隔
public/
  assets/                   # 11 张精选封面 .webp
  media/                    # 11 条精选成片 .mp4
  favicon.svg
docs/                       # 你正在读的这套文档
```

## 5. 已经踩过的坑（别再踩一遍）

这几条都是实际花时间解决的，写下来是为了省掉下一次的试错：

1. **卡片视频不要一次性挂载。** `WorkCard` 只在鼠标悬停时才插入 `<video>` 节点，
   否则 31 条同时加载会直接拖垮首屏。改动这张卡片时务必保留这个策略。
2. **作品库首屏只渲染 12 条。** 见 `LibrarySection.tsx` 的 `PAGE` 常量。
   一次渲染 31 张封面会明显拉长首屏时间，展开按钮按需补齐。
3. **网格要开密集排列。** 作品库横屏卡占 8 栏、竖屏卡占 4 栏，横屏连排时会剩 4 栏空洞。
   `global.css` 里 `#library .grid { grid-auto-flow: dense; }` 就是为这个加的。
4. **滚动揭示的阈值必须为 0。** `useReveal` 用 `threshold: 0`，
   因为作品网格在移动端比视口高得多，按比例触发会导致整块永远停在隐藏态。
5. **素材脚本不要在管道里传中文。** 用 Python 通过 stdin 处理中文会乱码，
   要写脚本文件到磁盘或显式指定 UTF-8。

## 6. 本地目录里还有什么（不在 git 里）

工作区还有几个大目录，已被 `.gitignore` 排除，**不会进仓库**：

| 目录 | 内容 | 体积量级 |
|---|---|---|
| `aigc-works/` | 31 条作品库的本地原件（成片 + 封面） | ~388MB |
| `_inbox/` | 原始投递素材，未筛选 | ~423MB |
| `_audit/` | 素材扫描结果、缩略图、`works_meta.json` | ~432MB |
| `node_modules/` `dist/` `.shots/` | 依赖、构建产物、截图 | — |

`_audit/works_meta.json` 是作品库 31 条的**实测元数据来源**（宽高、时长、朝向），
`src/data/library.ts` 由它生成。要改作品库数据，改这个 JSON 后重新生成，别手改 378 行。

## 7. 下一步可以做什么

按性价比排序，都还没做：

1. **给作品库补交付场景标签。** 现在 31 条只有「横屏 / 竖屏」，可以再加一层
   「投放素材测试 / 门店内容 / 人物种草」的用途维度，让数量变成有信息量的分类。
2. **压手机端首屏。** 12 张封面在弱网下仍偏重，可考虑响应式 `srcset` 或更小尺寸封面。
3. **加 PDF 简历下载入口。** 作品集配合简历投递转化更好，目前只有联系方式。
4. **作品库封面走本地缩略图。** 现在直接引用公网 `hb.cauai.fun`，
   若该域名不可用则作品库整块失效；加一层本地兜底图会更稳。

## 8. 交接检查清单

接手后建议按顺序确认：

- [ ] `npm install && npm run build` 通过
- [ ] `npm run dev` 打开，首屏视频能播
- [ ] 精选 11 条筛选可用，点卡片能开弹层，Esc 能关
- [ ] 作品库初始 12 条，「展开全部 31 条」后变 31 条
- [ ] 手机宽度（390px）下无横向溢出
- [ ] `git log --oneline` 能看到 4 条提交，`main` 与线上一致
