# 验收

> 这份文档定义「改完了」的标准。**没跑完这里的检查，就不要说改完了。**

## 1. 提交前必跑

```bash
npm run build        # 类型检查 + 生产构建，必须零报错
npm run typecheck    # 单独跑类型，改数据时更快
```

`npm run build` 就是 `tsc --noEmit && vite build`。类型不过，构建不会往下走，
线上也不会发布（CI 跑的是同一个命令）。所以本地过了，线上基本就过。

## 2. 手动点一遍

构建通过不等于功能正常。改过 UI 或数据后，按这个清单点一遍：

- [ ] 首屏视频能播，滚动时视差正常，数据条数字正确
- [ ] 精选作品筛选：切到每个用途分类，卡片数量对得上
- [ ] 点任意卡片能开弹层，视频能播，`Esc` 能关，关闭后页面滚动恢复
- [ ] 作品库初始 **12** 条，点「展开全部 31 条」后变 **31** 条，再点能收起
- [ ] 作品库筛选横屏 / 竖屏，数量与朝向一致
- [ ] 联系区复制按钮能复制到正确内容
- [ ] 浏览器宽度 390px（手机）无横向滚动条、无文字溢出
- [ ] 系统开启「减弱动态效果」后，页面仍可用（不依赖动画才能看到内容）

## 3. 自动化检查脚本

`scripts/` 是本地工具（已被 `.gitignore` 排除）。跑 Playwright 类脚本前先起本地服务，
并指定浏览器路径：

```powershell
$env:PLAYWRIGHT_BROWSERS_PATH='C:\Users\lsb\AppData\Local\ms-playwright'
npm run preview -- --port 4191     # 另开一个终端
node scripts/check-lib.mjs
```

| 脚本 | 检查什么 | 期望输出 |
|---|---|---|
| `check-lib.mjs` | 作品库初始条数、展开、筛选 | `cards0:12`，展开后 `cards1:31` |
| `check-live.mjs` | 线上站点可访问、关键区块存在 | `ok` |
| `check-mobile.mjs` | 390px 视口下作品库渲染 | 截图无溢出 |
| `shoot.mjs` / `scrollshoot.mjs` / `interact.mjs` | 分区截图、滚动截图、交互截图 | 图片落在 `.shots/` |

注意脚本里写的是**绝对路径**（浏览器模块、截图目录），换机器要改。

## 4. 内容真实性检查

这是这个项目的铁律，每次改数据都要自查：

- [ ] 新增作品的时长、分辨率是**实测**的，不是估的
- [ ] 展示内容带作者 / 来源，不把第三方原文说成原创
- [ ] 没有出现「一键发布」这类做不到的承诺
- [ ] 接口失败时有真实提示，不是空白页或无限 loading

## 5. 仓库卫生

```bash
git status --short                  # 确认没有误加的大文件
git count-objects -vH               # 看仓库体积有没有异常
rg hb.cauai.fun src/              # 外链地址集中在预期位置
```

确认 `.gitignore` 覆盖了这些（应当**不**出现在 `git status` 里）：

```
node_modules/  dist/  .shots/  scripts/  _audit/  _inbox/  aigc-works/  *.local
```

## 6. 发布后确认

```bash
gh run list --limit 3
```

看到 `success` 后，用带查询参数的地址绕过 CDN 缓存再点一遍关键路径：

```
https://1008611-creater.github.io/aigc-motion-portfolio/?v=2
```

详细排查流程见 [deployment.md](deployment.md) §5。
