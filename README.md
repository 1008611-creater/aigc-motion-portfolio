# 刘曙宾 · AIGC 动效作品集

一个暗色沉浸式的个人作品集站点，用来展示 AI 商业视频样片、项目线、能力与联系方式。

线上地址：https://1008611-creater.github.io/aigc-motion-portfolio/

## 站点包含什么

- **首屏**：视频背景 + 视差 + 关键数据条（11 条真实样片 / 5w+ 商业变现 / 30+ 付费用户 / 3 天交付周期）。
- **作品区**：11 条真实样片，按用途筛选（产品广告、门店内容、人物种草、食品视觉、场景视觉），
  每条标注真实时长与交付比例；卡片悬停时才加载视频预览，点击进入弹层播放。
- **项目区**：四条项目线，每条给出可核对的证据点与技术标签。
- **服务区**：可承接的内容方向与四步合作流程。
- **能力区**：四条能力 + 教育背景。
- **联系区**：电话、邮箱、GitHub，支持一键复制联系方式。

## 技术栈

React 19 · TypeScript（strict）· Vite · Motion（滚动揭示）· Lenis（平滑滚动）· 手写 CSS + 设计 token。

动效全部遵循 `prefers-reduced-motion`：系统开启「减弱动态效果」时自动降级为静态展示。

## 本地开发

```bash
npm install
npm run dev        # 本地开发，默认 http://localhost:5173
npm run typecheck  # 只做类型检查
npm run build      # 类型检查 + 生产构建，产物在 dist/
npm run preview    # 预览构建产物
```

## 部署

推送到 `main` 分支后，GitHub Actions（`.github/workflows/deploy.yml`）会自动构建并发布到
GitHub Pages。首次使用需要在仓库 `Settings → Pages` 把 Source 设为 **GitHub Actions**。

构建产物使用相对路径（`vite.config.ts` 中 `base: ./`），因此部署在子路径下也不会丢素材。

## 目录结构

```
src/
  App.tsx                 # 组合各区块 + 弹层状态
  main.tsx                # 入口，Lenis 包裹全站
  data/portfolio.ts       # 全部真实内容数据（作品、项目、能力、联系方式）
  hooks/useReveal.ts      # 滚动揭示
  components/
    Chrome.tsx            # 滚动进度、鼠标跟随、导航、页脚
    Hero.tsx              # 首屏
    WorkCard.tsx          # 作品卡片
    Lightbox.tsx          # 弹层播放器
    Sections.tsx          # 作品 / 项目 / 服务 / 能力 / 联系
  styles/global.css       # 设计 token 与全部样式
public/
  assets/                 # 11 张封面
  media/                  # 11 条样片
```

## 素材与内容说明

站内所有作品信息、时长与数据均来自真实交付记录与成片实测，未使用虚构数据。
样片封面与视频为本人的项目交付物，仅用于个人作品展示。

联系方式：18518090752 · 1453637677@qq.com
