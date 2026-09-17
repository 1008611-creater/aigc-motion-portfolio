# 内容模型

> 要新增或修改作品数据时读这份。类型定义在 [../src/data/portfolio.ts](../src/data/portfolio.ts)。

## 1. Work —— 全站唯一的作品契约

精选区与作品库**共用**这一个类型：

```ts
type Orientation = 'vertical' | 'wide';

type Work = {
  id: string;          // 唯一键，React key；精选用 'case-01'，作品库用 'w01'
  index: string;       // 展示用序号，两位字符串，如 '01'
  title: string;       // 标题
  category: string;    // 分类，同时是筛选依据
  summary: string;     // 一句话摘要，卡片上展示
  duration: string;    // 时长，如 '4:01' 或 '30.0s'
  orientation: Orientation;  // 决定卡片比例与网格占宽
  poster: string;      // 封面图 URL
  video: string;       // 成片 URL
  featured: boolean;   // 是否精选
};
```

字段有实际约束，不是随意填的：

| 字段 | 约束 | 违反后果 |
|---|---|---|
| `id` | 全站唯一 | React key 冲突，列表渲染错乱 |
| `category` | 精选区必须落在 `Sections.tsx` 的 `FILTERS` 里 | 筛选后永远选不中这条 |
| `orientation` | `'vertical'` 或 `'wide'` | 卡片比例与占宽错误 |
| `duration` | 与成片实测一致 | 与点击播放后的实际时长对不上 |
| `poster` / `video` | 可公开访问的绝对 URL 或 `/` 开头的站内路径 | 卡片空白或播放失败 |

## 2. 两个分区的差异

| | 精选区 `works` | 作品库 `libraryWorks` |
|---|---|---|
| 文件 | `src/data/portfolio.ts` | `src/data/library.ts` |
| 数量 | 11 条 | 31 条 |
| `title` | 有描述性标题（如「产品工具广告组」） | 只有序号（`AIGC 样片 01`） |
| `category` | 用途维度（产品广告 / 门店内容 / …） | 画面比例（横屏 / 竖屏） |
| 素材位置 | 仓库内 `public/media`、`public/assets` | 公网 `hb.cauai.fun` |
| 筛选条 | 按用途 | 按画面比例 |

两批素材**不是同一批文件**，已核对无体积重叠。不要假设一条精选对应某条作品库。

## 3. 怎么加一条作品库条目

作品库 31 条是**生成**的，不是手写的。改数据请走这条链路：

1. 把成片与封面放到本地素材目录，确保公网可访问（当前托管在 `hb.cauai.fun`）。
2. 用 `ffprobe` 实测宽高与时长，更新 `_audit/works_meta.json`。
3. 运行 `scripts/_gen_library.py` 重新生成 `src/data/library.ts`。
4. `npm run build` 确认类型通过，本地看一遍卡片比例是否正确。

`_gen_library.py` 会把朝向、分辨率、时长拼进 `summary`，并自动判断横竖屏。
手改 378 行的生成文件容易漏字段，也容易让 `summary` 与 `orientation` 不一致。

## 4. 怎么加一条精选条目

精选是手写的，直接编辑 `src/data/portfolio.ts` 的 `works` 数组：

1. 封面放 `public/assets/`，成片放 `public/media/`，命名 `case_NN.webp` / `case_NN.mp4`。
2. 在 `works` 里加一条，`category` 必须是 `Sections.tsx` 里 `FILTERS` 已有的值，
   否则要么改 `FILTERS` 加一类，要么归到已有类里。
3. 时长用实测值，不要估算。

**体积红线**：`public/` 是随仓库发布的。单个成片超过约 10MB 就不要放进来，
改用公网托管 + URL 引用（作品库就是这么做的）。

## 5. 其余内容类型

`portfolio.ts` 里还有这些，都是纯展示数据：

| 导出 | 用途 | 展示位置 |
|---|---|---|
| `profile` | 姓名、角色、简介、联系方式、教育 | Hero、Contact、Footer |
| `heroStats` | 首屏四个数据条 | Hero |
| `marqueeWords` | 首屏跑马灯关键词 | Hero |
| `services` | 可承接的内容方向 | ServiceSection |
| `steps` | 四步合作流程 | ServiceSection |
| `projects` | 四条项目线（含证据点与标签） | ProjectSection |
| `capabilities` | 四条能力 | CapabilitySection |
| `education` | 学校、专业、课程 | CapabilitySection |

## 6. 数据诚实性

这是本仓库的第一条铁律（见 [../AGENTS.md](../AGENTS.md)）：

**所有展示的作品信息必须来自真实成片与真实交付记录。**

- 时长、分辨率：`ffprobe` 实测，不估算。
- 标题与分类：真实用途，不编造项目名。
- 数据条（`heroStats`）：真实统计，不注水。
- 接口或素材不可用时，展示真实错误或降级，**不用假数据填充**。

宁可少展示一条，也不要让访客点开后发现对不上。
