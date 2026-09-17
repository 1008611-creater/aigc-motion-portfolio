# 素材流水线

> 这份文档回答两件事：素材从哪来、怎么进站点；以及怎么在**不把仓库撑爆**的前提下加新成片。

## 1. 两条素材路线（不要混用）

站点里的作品分两层，素材来源完全不同：

| 层 | 条数 | 文件位置 | 进仓库吗 |
|---|---|---|---|
| 精选作品 | 11 | `public/assets/` + `public/media/` | 进，约 58MB |
| 作品库 | 31 | 公网 `https://hb.cauai.fun/show/works/` | 不进 |

**为什么这么分：** 精选是门面，必须离线可用、加载可控；作品库是「量」，
31 条原始成片加起来约 380MB，塞进仓库会让 clone 和 Pages 构建都变得难受。
已核对两层素材无体积重叠，**改数据时不要假设它们能互相替换**。

## 2. 仓库体积纪律

这是硬约束，不是建议：

- 单个文件 **超过约 10MB** 就不要放进 `public/`，改用外链或先压缩。
- `public/media/` 只放精选成片，保持 11 条；加第 12 条前先算总体积。
- `aigc-works/`、`_inbox/`、`_audit/` 已在 `.gitignore` 里，**永远不要提交**。
- 提交前用 `git count-objects -vH` 看仓库体积有没有异常增长。

一旦大文件进了 git 历史，删除也很麻烦（历史里还在），所以要在**提交前**把关。

## 3. 作品库数据是怎么生成的

作品库 31 条的宽高、时长、朝向**不是手写的**，是实测出来的：

```
本地原件 aigc-works/            ← 31 条成片 + 封面
        ↓  ffprobe / Pillow 测量
_audit/works_meta.json          ← 实测元数据（宽、高、时长、朝向）
        ↓  python scripts/_gen_library.py
src/data/library.ts             ← 站点读的数据文件
```

关键点：

- **`_audit/works_meta.json` 是唯一真源。** 要改作品库的尺寸 / 时长描述，改它然后重新生成。
- **不要手改 `src/data/library.ts`。** 它是生成产物，378 行，手改会在下次生成时被覆盖。
- 公网地址拼装规则：`https://hb.cauai.fun/show/works/<slug>.jpg` 与 `.mp4`，slug 形如 `w01`。

重新生成的命令（在仓库根目录）：

```bash
python scripts/_gen_library.py
npm run typecheck
```

脚本末尾会打印 `rows 31`。如果不是 31，说明 `_audit/works_meta.json` 被改过，先核对再提交。

## 4. 精选 11 条是怎么加的

精选**没有生成脚本**，直接写在 `src/data/portfolio.ts` 的 `works` 数组里，
因为每条都要人工写标题、摘要、用途分类——这是编辑判断，不适合自动化。

加一条精选的完整步骤：

1. 把封面放进 `public/assets/`，成片放进 `public/media/`，命名跟着现有 `case_NN` 走。
2. 确认体积：封面控制在几百 KB，成片尽量压到几 MB。
3. 用 ffprobe 量出真实时长与分辨率（**不要估**）。
4. 在 `portfolio.ts` 的 `works` 里加一条，字段约束见 [content-model.md](content-model.md)。
5. 同步更新首屏数据条 `heroStats` 里的「N 条真实样片」。
6. `npm run build`，本地打开确认卡片、筛选、弹层都正常。

## 5. 公网素材托管（hb.cauai.fun）

作品库的封面与视频放在 `hb.cauai.fun` 上，站点只存 URL。这意味着：

- **这个域名必须一直可用**，否则作品库整块失效（精选不受影响）。
- 该地址是免鉴权的静态直链，不带凭证，符合「凭证不出服务端」的铁律。
- 如果以后换托管，只需改 `_gen_library.py` 里的 `BASE` 常量，然后重新生成。

风险与对策：目前没有本地兜底图。若要加固，给每条作品加一张本地缩略图作为
`onError` 回退，是性价比较高的下一步（已列在 [handoff.md](handoff.md) §7）。

## 6. 辅助脚本清单

`scripts/` 目录已被 `.gitignore` 排除，是**本地工具**，不进仓库。
但为了让下一位接手的人能复现，这里记录每个脚本的用途：

| 脚本 | 用途 |
|---|---|
| `scan-assets.py` | 全盘扫描素材，产出 `_audit/candidates.json` 候选池（`--quick` 跳过 ffprobe） |
| `scan-inbox.py` | 扫描 `_inbox/` 原始投递素材 |
| `triage.py` | 对候选池做初筛分级 |
| `build-works.py` / `augment-works.py` | 从候选池构建精选作品数据 |
| `build-aigc-works.py` | 构建作品库的本地原件目录 `aigc-works/` |
| `build-pool-page.py` | 生成素材总览页 |
| `_gen_library.py` | **核心**：`_audit/works_meta.json` → `src/data/library.ts` |
| `shoot.mjs` / `scrollshoot.mjs` / `interact.mjs` | 截图与交互验证 |
| `check-lib.mjs` / `check-live.mjs` / `check-mobile.mjs` | 作品库 / 线上 / 移动端检查 |

跑截图类脚本前需要指定浏览器路径，见 [verification.md](verification.md)。
