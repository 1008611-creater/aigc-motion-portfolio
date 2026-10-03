export type Orientation = 'vertical' | 'wide';

/** 作品层级：case = 对得上商业用途的交付成片；stock = 可批量复用的场景素材 */
export type WorkTier = 'case' | 'stock';

export type Work = {
  id: string;
  index: string;
  title: string;
  /**
   * 用途，取自站内用途词表：
   * 产品广告 / 门店内容 / 人物种草 / 品牌概念 / 投放素材测试 / 国风 / 自然 / 城市景观 / 节庆民俗 / 视觉特效 / 过渡 / 空间。
   * 注意：横竖屏请用 orientation，不要塞进 category。
   */
  category: string;
  tier: WorkTier;
  summary: string;
  duration: string;
  orientation: Orientation;
  poster: string;
  video: string;
  featured: boolean;
};

export type Profile = {
  name: string;
  latin: string;
  role: string;
  headline: string;
  intro: string;
  location: string;
  education: string;
  phone: string;
  email: string;
  github: string;
};

// 所有作品信息取自真实样片与真实项目记录，时长按成片实测填写。
export const profile: Profile = {
  name: '刘曙宾',
  latin: 'LIU SHUBIN',
  role: 'AIGC 商业视频 / 生成式工作流',
  headline: '把产品与视觉证据，收成一条能看懂的展示主线。',
  intro:
    '从需求理解、模型与工作流选型，到成片交付与复购维护，独立跑完 AI 视频的商业化链路；同时把 Hermes / ACP 协作方式沉淀成可复用的生产 SOP。',
  location: '北京',
  education: '中国农业大学 · 数据科学与大数据技术 · 2027 届',
  phone: '18518090752',
  email: '1453637677@qq.com',
  github: 'https://github.com/1008611-creater',
};

export const heroStats = [
  { value: '42', label: '条真实样片', note: '11 条精选 + 31 条全量' },
  { value: '5w+', label: '商业变现', note: 'AI 视频交付链路' },
  { value: '30+', label: '付费用户', note: '含 MCN 复购' },
  { value: '3 天', label: '交付周期', note: '从 7 天压缩而来' },
];

export const marqueeWords = [
  'AI 商业视频',
  '产品广告',
  '门店内容',
  '人物种草',
  '食品视觉',
  '场景氛围',
  '投放素材测试',
  'Hermes / ACP',
  '工作流编排',
  '交付 SOP',
];

export const works: Work[] = [
  {
    id: 'case-02',
    index: '01',
    title: '产品工具广告组',
    category: '产品广告',
    tier: 'case',
    summary: '真人出镜感、产品展示、痛点表达、字幕口播与多开头测试版本。',
    duration: '28.1s',
    orientation: 'vertical',
    poster: 'https://hb.cauai.fun/show/works/w02.jpg',
    video: 'https://hb.cauai.fun/show/works/w02.mp4',
    featured: true,
  },
  {
    id: 'case-03',
    index: '02',
    title: '露营人物横屏短片',
    category: '生活方式',
    tier: 'case',
    summary: '品牌调性、生活方式、长片段与多镜头延展，适合做氛围主片。',
    duration: '49.5s',
    orientation: 'wide',
    poster: 'https://hb.cauai.fun/show/works/w03.jpg',
    video: 'https://hb.cauai.fun/show/works/w03.mp4',
    featured: true,
  },
  {
    id: 'case-10',
    index: '03',
    title: '童装门店生活方式组',
    category: '门店内容',
    tier: 'case',
    summary: '童装门店、亲子品牌、换季上新与橱窗氛围，适配小红书种草。',
    duration: '17.0s',
    orientation: 'vertical',
    poster: 'https://hb.cauai.fun/show/works/w10.jpg',
    video: 'https://hb.cauai.fun/show/works/w10.mp4',
    featured: true,
  },
  {
    id: 'case-06',
    index: '04',
    title: '水果视觉广告',
    category: '食品视觉',
    tier: 'case',
    summary: '水果、食品与农产品视觉广告，突出质感与产地印象。',
    duration: '15.3s',
    orientation: 'wide',
    poster: 'https://hb.cauai.fun/show/works/w06.jpg',
    video: 'https://hb.cauai.fun/show/works/w06.mp4',
    featured: true,
  },
  {
    id: 'case-01',
    index: '05',
    title: '航拍风景质感片',
    category: '场景视觉',
    tier: 'case',
    summary: '文旅、城市、酒店与景区类项目的氛围开场镜头。',
    duration: '14.3s',
    orientation: 'vertical',
    poster: 'https://hb.cauai.fun/show/works/w01.jpg',
    video: 'https://hb.cauai.fun/show/works/w01.mp4',
    featured: true,
  },
  {
    id: 'case-04',
    index: '06',
    title: '露营人物竖屏组',
    category: '人物种草',
    tier: 'case',
    summary: '人物稳定、夜景氛围与竖屏展示，适合平台种草素材。',
    duration: '17.0s',
    orientation: 'vertical',
    poster: 'https://hb.cauai.fun/show/works/w04.jpg',
    video: 'https://hb.cauai.fun/show/works/w04.mp4',
    featured: true,
  },
  {
    id: 'case-05',
    index: '07',
    title: '工具车广告 · 车库版',
    category: '产品广告',
    tier: 'case',
    summary: '同一产品的另一组镜头方案，车库场景与产品使用动线展示。',
    duration: '16.3s',
    orientation: 'vertical',
    poster: 'https://hb.cauai.fun/show/works/w05.jpg',
    video: 'https://hb.cauai.fun/show/works/w05.mp4',
    featured: false,
  },
  {
    id: 'case-09',
    index: '08',
    title: '工具车广告 · 卖点版',
    category: '产品广告',
    tier: 'case',
    summary: '围绕产品卖点重新组织节奏，验证同一产品的多版本投放。',
    duration: '16.3s',
    orientation: 'vertical',
    poster: 'https://hb.cauai.fun/show/works/w09.jpg',
    video: 'https://hb.cauai.fun/show/works/w09.mp4',
    featured: false,
  },
  {
    id: 'case-07',
    index: '09',
    title: '夜景露营人物竖屏',
    category: '人物种草',
    tier: 'case',
    summary: '夜间氛围、人物状态与竖屏构图，用于生活方式内容测试。',
    duration: '17.0s',
    orientation: 'vertical',
    poster: 'https://hb.cauai.fun/show/works/w07.jpg',
    video: 'https://hb.cauai.fun/show/works/w07.mp4',
    featured: false,
  },
  {
    id: 'case-08',
    index: '10',
    title: '童装居家生活方式',
    category: '门店内容',
    tier: 'case',
    summary: '室内场景与童装穿搭展示，适合品牌日常内容更新。',
    duration: '14.1s',
    orientation: 'vertical',
    poster: 'https://hb.cauai.fun/show/works/w08.jpg',
    video: 'https://hb.cauai.fun/show/works/w08.mp4',
    featured: false,
  },
  {
    id: 'case-11',
    index: '11',
    title: '童装门店展示组',
    category: '门店内容',
    tier: 'case',
    summary: '门店货架环境与成套穿搭展示，用于上新与橱窗内容。',
    duration: '16.9s',
    orientation: 'vertical',
    poster: 'https://hb.cauai.fun/show/works/w11.jpg',
    video: 'https://hb.cauai.fun/show/works/w11.mp4',
    featured: false,
  },
];

export const services = [
  {
    title: 'AI 商业视频',
    copy: '产品广告、种草短片与品牌视觉样片，适合先试单再扩量。',
  },
  {
    title: '投放素材测试',
    copy: '为同一产品做多开头、多卖点、多节奏版本，方便广告测试。',
  },
  {
    title: '门店与品牌内容',
    copy: '门店氛围、换季上新与平台种草素材的系列化产出。',
  },
  {
    title: '交付包装',
    copy: '字幕、配音、封面、比例适配与系列化视觉的成套交付。',
  },
];

export const steps = [
  { index: '01', title: '提供资料', copy: '产品链接或图片、核心卖点、参考风格、目标平台、预算与数量。' },
  { index: '02', title: '判断方案', copy: '先判断适合试单、批量素材、精品广告，还是先补一个展示页。' },
  { index: '03', title: '制作交付', copy: '确认方向后制作成片，并完成字幕、封面与比例适配等基础包装。' },
  { index: '04', title: '复盘扩展', copy: '根据投放与反馈继续扩展新案例、新素材与新版本。' },
];

export const capabilities = [
  {
    title: '商业化交付',
    copy: '能把需求判断、制作排期与复购维护串成稳定链路，交付周期从 7 天压缩到 3 天。',
  },
  {
    title: 'AI 工作流设计',
    copy: '做过模型选型、提示词设计、参考一致性控制与工作流编排的完整生产链路。',
  },
  {
    title: '产品与工程实现',
    copy: '能在 Next.js / React / TypeScript 侧直接推进页面结构、状态流转与验证脚本。',
  },
  {
    title: '视觉与量产',
    copy: '理解印刷尺寸、联版与打样偏差，能把视觉方案推进到真实量产。',
  },
];

export const education = {
  school: '中国农业大学',
  major: '数据科学与大数据技术',
  period: '2023.09 — 2027.06',
  note: '本科在读，预计 2027 年毕业；课程训练覆盖人工智能、机器学习、数据挖掘与数字图像处理。',
  courses: ['人工智能', '机器学习', '数据挖掘', '数字图像处理'],
};
