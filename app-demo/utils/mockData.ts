// 模拟数据服务
export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  author: string;
  publishTime: string;
  readCount: number;
  channel: string; // 新增频道字段
}

export interface NewsDetail {
  id: string;
  title: string;
  author: string;
  publishTime: string;
  readCount: number;
  content: string;
  imageUrl: string;
  tags: string[];
}

export interface Channel {
  id: string;
  name: string;
  key: string;
}

// 频道数据
export const channels: Channel[] = [
  { id: '1', name: '头条', key: 'headline' },
  { id: '2', name: '精选', key: 'featured' },
  { id: '3', name: '国际', key: 'international' },
  { id: '4', name: '财经', key: 'finance' },
  { id: '5', name: '科技', key: 'tech' },
];

// 新闻标题列表
const newsTitles: string[] = [
  "国内经济稳中有进，消费回暖明显",
  "北京启动新一轮城市交通优化计划",
  "高校开学在即，学生返校安全成关注重点",
  "科技公司发布最新人工智能产品",
  "环保组织呼吁加强河流保护力度",
  "国际油价连续上涨，引发市场关注",
  "全国多地迎来强降雨天气预警",
  "文化遗产保护项目获国家专项资金支持",
  "医疗机构引入智能诊疗系统提升效率",
  "体育赛事圆满落幕，冠军归属揭晓"
];

// 新闻总结列表
const newsSummaries: string[] = [
  "近期国内经济保持稳定增长，消费市场逐渐回暖，居民信心增强。",
  "北京市将实施新交通方案，优化道路布局，缓解交通拥堵问题。",
  "随着开学临近，各高校加强学生返校的安全管理和防疫措施。",
  "多家科技公司推出新一代人工智能产品，应用场景更加广泛。",
  "环保组织呼吁各级政府采取措施，加强河流及水生态保护。",
  "受国际市场影响，油价连续上涨，可能影响国内能源成本。",
  "全国多地发布强降雨预警，提醒公众注意防范自然灾害。",
  "国家对文化遗产保护项目投入专项资金，推动文物修复和保护。",
  "部分医疗机构引入智能诊疗系统，提高医疗服务效率和准确性。",
  "近期举办的体育赛事顺利结束，各项目冠军名单已正式公布。"
];

// 根据频道生成模拟列表数据
export const generateMockListData = (page: number, channel: string = 'headline'): NewsItem[] => {
  const data: NewsItem[] = [];
  const channelNames = {
    headline: '头条',
    featured: '精选',
    international: '国际',
    finance: '财经',
    tech: '科技',
  };
  
  for (let i = 0; i < 10; i++) {
    const id = page * 10 + i;
    const channelName = channelNames[channel as keyof typeof channelNames] || '头条';
    
    data.push({
      id,
      title: newsTitles[i],
      summary: newsSummaries[i],
      imageUrl: `https://picsum.photos/200/150?random=${id}`,
      author: `${channelName}作者 ${id + 1}`,
      publishTime: `${Math.floor(Math.random() * 24)}小时前`,
      readCount: Math.floor(Math.random() * 10000),
      channel,
    });
  }
  return data;
};

// 生成模拟卡片数据
export const generateMockCardData = (page: number): NewsItem[] => {
  const data: NewsItem[] = [];
  for (let i = 0; i < 10; i++) {
    const id = page * 10 + i;
    data.push({
      id,
      title: newsTitles[i],
      summary: newsSummaries[i],
      imageUrl: `https://picsum.photos/300/200?random=${id}`,
      author: `作者 ${id + 1}`,
      publishTime: `${Math.floor(Math.random() * 24)}小时前`,
      readCount: Math.floor(Math.random() * 10000),
      channel: 'featured',
    });
  }
  return data;
};

// 获取模拟详情数据
export const getMockDetailData = (id: string, width: number): NewsDetail => {
  return {
    id,
    title: `资讯详情标题 ${id} - 这是一个非常详细的标题，用来展示资讯的完整内容`,
    author: `作者 ${id}`,
    publishTime: `${Math.floor(Math.random() * 24)}小时前`,
    readCount: Math.floor(Math.random() * 10000),
    content: `近期，国内经济保持稳中有进的发展态势，多个经济指标显示消费市场正在逐步回暖。随着居民收入水平的持续提升和消费信心的增强，零售、餐饮、旅游等行业呈现出明显的复苏迹象。统计数据显示，上半年社会消费品零售总额同比增长稳健，其中线上消费和新兴消费形式发展迅速，成为拉动经济增长的重要力量。

专家表示，消费回暖的背后，既有政策支持的推动，也反映了居民对经济前景的乐观预期。各地政府在疫情防控常态化的前提下，积极出台刺激消费的措施，包括发放消费券、优化购物环境、举办各类促销活动等，这些举措有效提升了居民的消费意愿。同时，随着产业链逐步完善，新兴产业和服务业的发展也为消费市场注入了新的活力。

从具体行业来看，餐饮业和旅游业的恢复速度较快，周末和节假日的消费人次明显增加；零售行业在电商和线下结合的模式下，销售额持续增长。尤其是年轻群体和中产阶级消费能力增强，对高品质产品和服务的需求显著提升。此外，新能源汽车、智能家电等新兴产品也成为消费热点，推动相关产业链的发展。

总体而言，国内经济在保持稳定增长的基础上，消费市场的活跃表现为经济发展提供了坚实支撑。专家指出，未来若能继续优化政策环境，激发居民消费潜力，同时推动产业升级，国内经济有望实现高质量发展，形成更加健康和可持续的增长格局。`,
    imageUrl: `https://fastly.picsum.photos/id/980/600/400.jpg?hmac=vmPq3H2jrGs20m62ZvEMdfwELaVrVVUOmgIgsrmUnbs`,
    tags: ['科技', '创新', '发展'],
  };
}; 