// Post data — add new articles here
const POSTS = [
  {
    slug: "notion-best-templates-2026",
    title: "2026年最值得用的10个Notion模板（免费+付费）",
    excerpt: "从个人知识管理到团队协作，精选10个真正实用的Notion模板，附详细使用场景和获取方式。",
    category: "notion",
    date: "2026-06-14",
    tags: ["Notion","模板","推荐"],
    featured: true
  },
  {
    slug: "notion-vs-obsidian-vs-logseq",
    title: "Notion、Obsidian、Logseq三大笔记工具横评：2026年选哪个？",
    excerpt: "深度对比三款主流笔记软件的优缺点、适用人群和迁移成本，帮你做出最适合自己的选择。",
    category: "tools",
    date: "2026-06-12",
    tags: ["Notion","Obsidian","Logseq","测评"],
    featured: true
  },
  {
    slug: "adhd-friendly-notion-setup",
    title: "用Notion搭建ADHD友好的任务管理系统：从焦虑到行动",
    excerpt: "专为注意力分散人群设计的Notion任务管理方案，包含任务拆解、脑力值评估和能量管理看板。",
    category: "notion",
    date: "2026-06-10",
    tags: ["Notion","ADHD","任务管理","效率"],
    featured: true
  },
  {
    slug: "freelancer-notion-crm",
    title: "自由职业者如何用Notion搭建客户管理和财务系统",
    excerpt: "一个人就是一家公司——用Notion同时管理客户跟进、项目进度、收支追踪和税务估算。",
    category: "notion",
    date: "2026-06-08",
    tags: ["Notion","自由职业","CRM","财务管理"],
    featured: true
  },
  {
    slug: "okr-notion-template",
    title: "打工人必备：用Notion做OKR目标管理和月度复盘",
    excerpt: "不再浑浑噩噩地上班——搭建OKR目标看板、周复盘和技能雷达，让成长有据可查。",
    category: "notion",
    date: "2026-06-06",
    tags: ["Notion","OKR","职场","复盘"],
    featured: true
  },
  {
    slug: "pet-health-notion-tracker",
    title: "多宠家庭福音：用Notion追踪所有毛孩子的健康数据",
    excerpt: "疫苗、体重、驱虫、就诊记录一站式管理，再也不会忘记哪只猫该打针了。",
    category: "notion",
    date: "2026-06-04",
    tags: ["Notion","宠物","健康管理","模板"],
    featured: false
  },
  {
    slug: "exam-review-notion-system",
    title: "考研/考公党必看：用Notion搭建科学的复习追踪系统",
    excerpt: "距离考试还有200天？这个系统帮你搞定每日学习记录、错题归因和记忆曲线复习提醒。",
    category: "notion",
    date: "2026-06-02",
    tags: ["Notion","考研","学习","错题本"],
    featured: true
  },
  {
    slug: "second-brain-notion",
    title: "用Notion搭建第二大脑：PARA方法的完整实践指南",
    excerpt: "Tiago Forte的PARA方法论在Notion中的具体落地——项目、领域、资源和存档的组织方式。",
    category: "notion",
    date: "2026-05-28",
    tags: ["Notion","第二大脑","PARA","知识管理"],
    featured: false
  },
  {
    slug: "gtd-2026-modern-guide",
    title: "GTD方法2026现代实践指南：让大脑只做思考不做存储",
    excerpt: "David Allen的Getting Things Done方法论在现代工具环境下的重新演绎，从理论到实操。",
    category: "productivity",
    date: "2026-05-25",
    tags: ["GTD","效率方法","时间管理"],
    featured: false
  },
  {
    slug: "digital-minimalism-phone-setup",
    title: "数字极简主义：一个普通人的手机断舍离实践手记",
    excerpt: "从127个APP减到23个的完整过程，以及一个月后的真实变化——注意力回来了。",
    category: "productivity",
    date: "2026-05-22",
    tags: ["数字极简","手机","注意力"],
    featured: false
  },
  {
    slug: "deep-work-practical-guide",
    title: "深度工作实战指南：如何在开放式办公室每天专注4小时",
    excerpt: "Cal Newport的深度工作理论在真实办公环境中的落地策略，包含环境搭建和防打断技巧。",
    category: "productivity",
    date: "2026-05-18",
    tags: ["深度工作","专注","职场"],
    featured: false
  },
  {
    slug: "apple-notes-vs-notion",
    title: "Apple Notes vs Notion：轻量笔记和重型工具箱怎么选？",
    excerpt: "两款国民级笔记工具的适合人群完全不同——帮你判断自己究竟需要哪一个。",
    category: "tools",
    date: "2026-05-15",
    tags: ["Apple Notes","Notion","测评","笔记"],
    featured: false
  },
  {
    slug: "ai-notetaking-tools-2026",
    title: "2026年AI笔记工具盘点：自动总结、智能关联、语音转文字",
    excerpt: "AI正在改变记笔记的方式——实测5款AI增强笔记工具，看看它们到底有没有用。",
    category: "tools",
    date: "2026-05-12",
    tags: ["AI","笔记工具","测评","2026"],
    featured: false
  },
  {
    slug: "zettelkasten-beginners-guide",
    title: "卡片盒笔记法入门：用Zettelkasten让知识自然生长",
    excerpt: "德语直译：卡片盒子。这套诞生于上世纪的方法论，在数字时代反而更加闪耀——从零开始搭建你的知识网络。",
    category: "notes",
    date: "2026-05-08",
    tags: ["Zettelkasten","笔记方法","知识管理"],
    featured: false
  },
  {
    slug: "weekly-review-routine",
    title: "每周日只需要15分钟的复盘流程，让下周效率翻倍",
    excerpt: "不是复杂的周报——是一套极简的5步复盘法，我已经执行了52周，亲测有效。",
    category: "productivity",
    date: "2026-05-05",
    tags: ["周复盘","效率方法","习惯"],
    featured: false
  }
];

// Render featured posts on homepage
(function(){
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;

  const featured = POSTS.filter(p => p.featured);
  grid.innerHTML = featured.map(p => `
    <a href="/blog/${p.slug}.html" class="post-card">
      <div class="post-card-body">
        <span class="cat-tag">${categoryLabel(p.category)}</span>
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
        <div class="meta">${p.date} · ${p.tags.slice(0,3).join(' / ')}</div>
      </div>
    </a>
  `).join('');
})();

function categoryLabel(cat) {
  const map = {notion:'Notion模板',productivity:'效率方法',tools:'工具测评',notes:'数字笔记'};
  return map[cat] || cat;
}

// Expose for blog list page
if (typeof window !== 'undefined') window.POSTS = POSTS;
