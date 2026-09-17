# 部署

> 线上地址：https://1008611-creater.github.io/aigc-motion-portfolio/
> 仓库：https://github.com/1008611-creater/aigc-motion-portfolio

## 1. 怎么发布的

没有服务器，也没有手动上传。流程是一条直线：

```
本地改代码 → push 到 main → GitHub Actions 构建 → 产物发布到 GitHub Pages
```

工作流文件：[../.github/workflows/deploy.yml](../.github/workflows/deploy.yml)

| 阶段 | 做了什么 |
|---|---|
| `on: push (main)` | 只有 `main` 分支的推送会触发；也支持手动 `workflow_dispatch` |
| `build` | `actions/setup-node@v4`（Node 22，开 npm 缓存）→ `npm ci` → `npm run build` |
| `upload` | `actions/upload-pages-artifact@v3` 把 `dist/` 打成 Pages 制品 |
| `deploy` | `actions/deploy-pages@v4` 发布，环境 `github-pages` |

`concurrency.group: pages` 保证同一时刻只有一个发布在跑，后来的取消前面的。

## 2. 首次部署必须做的一步

**仓库 `Settings → Pages` → Source 选 `GitHub Actions`。**

如果这里还停在旧版 `Deploy from a branch`，工作流会构建成功但页面不更新，
或者 `configure-pages` 直接报错。工作流里的 `enablement: true` 只是兜底，
不能替代这个设置。换仓库 / 换账号时记得重新确认。

## 3. 子路径为什么不会丢素材

线上是 `https://1008611-creater.github.io/aigc-motion-portfolio/`，
站点跑在 `/aigc-motion-portfolio/` 这个子路径下，不是根路径。

所以 [../vite.config.ts](../vite.config.ts) 里写的是：

```ts
base: ./
```

相对路径让 `assets/`、`media/` 在子路径下也能正确解析。**不要改成 `/`**，
改了会让所有图片和视频 404。

`build.assetsInlineLimit: 0` 同理：不希望小图被内联成 base64，
否则大封面会让 HTML 体积失控。

## 4. 怎么确认发布成功

```bash
gh run list --limit 5          # 看最近几次运行的状态
gh run watch <run-id>          # 盯着某一次跑到结束
```

状态含义：

| 状态 | 意思 |
|---|---|
| `completed / success` | 构建与发布都过了 |
| `completed / failure` | 看日志，多数是类型错误或 `npm ci` 依赖问题 |
| `queued` / `in_progress` | 还在跑，等 |

Pages 发布后 CDN 有缓存，**通常几十秒，偶尔几分钟**。
验证时不要只看首页，带个查询参数能绕过缓存：
`https://1008611-creater.github.io/aigc-motion-portfolio/?v=2`

## 5. 排查「线上不更新」

按这个顺序查，能覆盖绝大多数情况：

1. **推送真的上去了吗？** `git log --oneline origin/main -3` 与本地对比。
2. **工作流跑了吗？** `gh run list --limit 3`。没触发通常是推到了别的分支。
3. **工作流成功了吗？** 失败就看日志第一处报错，`npm run build` 失败会让后面全跳过。
4. **Pages 设置对吗？** `Settings → Pages` 的 Source 必须是 `GitHub Actions`。
5. **是不是缓存？** 加查询参数、换无痕窗口、手机流量各试一次。
6. **构建产物对不对？** 本地 `npm run build` 后看 `dist/` 里有没有 `index.html` 和素材。

## 6. 换域名 / 换仓库要改什么

如果以后迁到自定义域名或另一个仓库，只需要动这几处：

| 位置 | 改什么 |
|---|---|
| 仓库 `Settings → Pages` | 自定义域名、HTTPS 开关 |
| `public/CNAME`（如需） | 写上自定义域名，Vite 会原样拷进 `dist/` |
| `vite.config.ts` 的 `base` | 只有从子路径换到根路径时才改回 `/` |
| `index.html` 的 SEO / OG meta | 里面的绝对地址 |
| 本文档与 [handoff.md](handoff.md) | 线上地址 |

## 7. 回滚

没有单独的发布后台，回滚靠 Git：

```bash
git revert <坏提交>     # 生成一个反向提交，再 push，工作流自动重新发布
```

不要用 `git reset --hard` 强推 `main`：Pages 与协作都会受影响，
而且历史被改写后别人本地会冲突。
