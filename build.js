/**
 * Site Builder
 * Run: node build.js
 * Output: dist/ (deploy to Cloudflare Pages)
 * All HTML links use relative paths; sitemap/RSS use site URL from env or default.
 */

const fs = require('fs');
const path = require('path');

// Base path for GitHub Pages project sites: "/seo-site"
// For custom domains or user/org pages (xxx.github.io), set to ""
const BASE = '/seo-site';

// Get site URL from CF_PAGES_URL env var, else use pages.dev subdomain, else placeholder
const SITE_URL = process.env.CF_PAGES_URL
  ? `https://${process.env.CF_PAGES_URL}`
  : process.env.SITE_URL || 'https://yuchen686668-lang.github.io' + BASE;

const CATEGORIES = {
  notion: { label: 'Notion模板', slug: 'notion' },
  productivity: { label: '效率方法', slug: 'productivity' },
  tools: { label: '工具测评', slug: 'tools' },
  notes: { label: '数字笔记', slug: 'notes' }
};

// ==================== ARTICLE DATA ====================
const POSTS = [
  { slug: "notion-best-templates-2026", title: "2026年最值得用的10个Notion模板（免费+付费）", excerpt: "从个人知识管理到团队协作，精选10个真正实用的Notion模板，附详细使用场景和获取方式。", category: "notion", readTime: 12, date: "2026-06-14", keywords: "Notion模板,2026,免费模板,付费模板,知识管理,任务管理", content: `<h2>为什么需要Notion模板？</h2><p>Notion的强大在于它的灵活性——但灵活性也意味着你需要从零开始搭建。一个好的模板可以帮你节省2-8小时的配置时间，直接进入"使用"状态。</p><p>市面上的模板太多了，质量参差不齐。我花了整整一周时间，从各个渠道收集和实测了超过50个模板，筛选出这10个真正好用的。</p><h2>筛选标准</h2><ul><li><strong>开箱即用</strong>：不需要理解复杂的数据库关系就能开始用</li><li><strong>解决真实问题</strong>：不是炫技，模板的存在理由很明确</li><li><strong>可维护</strong>：使用3个月后不会因为数据太多而崩溃</li><li><strong>有审美</strong>：设计简洁，看着不累</li></ul><h2>10个精选模板</h2><h3>1. ADHD友好型任务拆解系统</h3><p><strong>适合谁</strong>：注意力容易分散、经常面对大任务感到无从下手的人</p><p><strong>核心功能</strong>：大任务自动拆解成5-15分钟的小步骤、脑力值评估系统、每日只聚焦3件事、能量管理看板。</p><p><strong>为什么好</strong>：大多数效率工具预设用户能"想好做什么然后做"，但ADHD大脑不是这样工作的。这个模板把"焦虑→行动"的路径降到了最低。</p><h3>2. 自由职业者客户管理+财务系统</h3><p><strong>适合谁</strong>：独立设计师、写作者、开发者、摄影师、咨询师</p><p><strong>核心功能</strong>：客户CRM（含14天未联系自动提醒）、项目从报价到结款全流程管理、收支自动汇总、年度收入目标追踪、可抵税支出标记。</p><p><strong>为什么好</strong>：一个人就是一家公司，但大部分自由职业者把"管理"这部分完全靠脑子记。这个模板把隐性的经营数据全部显性化。</p><h3>3. 考研/考公复习作战系统</h3><p><strong>适合谁</strong>：考研、考公、法考、CPA等标准化考试备考者</p><p><strong>核心功能</strong>：考试倒计时自动计算、每日学习记录+掌握度评估、错题归因分析、记忆曲线复习提醒、科目薄弱模块扫描。</p><h3>4. 打工人OKR目标管理+月度复盘系统</h3><p><strong>适合谁</strong>：职场人、新经理、任何想摆脱"浑浑噩噩上班"状态的人</p><p><strong>核心功能</strong>：季度OKR看板（KR进度自动计算）、每周日15分钟复盘模板、月度6维度深度回顾、能力雷达追踪、想法收集箱。</p><h3>5. 多宠家庭健康管理追踪器</h3><p><strong>适合谁</strong>：养2只以上猫/狗的家庭、宠物寄养家庭</p><h3>6-10. 其他值得关注的模板</h3><ul><li><strong>GTD完整系统</strong>：David Allen方法论在Notion中的完整实现。</li><li><strong>读书笔记系统</strong>：不只记录读了什么，而是建立知识之间的联系。</li><li><strong>内容创作日历</strong>：从选题→大纲→初稿→发布→数据复盘的全流程。</li><li><strong>家庭预算追踪</strong>：支持多人协作的家庭记账系统。</li><li><strong>旅行规划器</strong>：综合旅行规划工具。</li></ul><h2>免费 vs 付费：怎么选？</h2><p>免费模板足够大多数个人用户使用。付费模板（通常$12-$19）的价值在于更精细的公式和自动化、多视图已经配好、通常包含视频教程、作者会持续更新。</p><p>如果你是初次使用Notion，建议从免费模板开始，熟悉之后根据实际需求决定是否升级。</p>` },
  { slug: "notion-vs-obsidian-vs-logseq", title: "Notion、Obsidian、Logseq三大笔记工具横评：2026年选哪个？", excerpt: "深度对比三款主流笔记软件的优缺点、适用人群和迁移成本，帮你做出最适合自己的选择。", category: "tools", readTime: 15, date: "2026-06-12", keywords: "Notion,Obsidian,Logseq,笔记工具,测评,对比,2026", content: `<h2>三款工具，三种哲学</h2><p>Notion、Obsidian、Logseq。这三款工具占据了2026年中文笔记圈的大部分讨论。但它们本质上代表了三种完全不同的笔记哲学：<strong>Notion</strong>万物皆数据库，<strong>Obsidian</strong>万物皆链接，<strong>Logseq</strong>万物皆大纲。</p><h2>Notion：最强全能选手</h2><h3>核心优势</h3><ul><li><strong>数据库系统</strong>：Notion的数据库是它最强大的功能。你可以用数据库管理任何东西。</li><li><strong>模板生态</strong>：官方和社区模板数量庞大，几乎任何需求都有现成方案。</li><li><strong>分享和协作</strong>：一键生成分享链接、权限管理细致、多人实时协作流畅。</li><li><strong>AI功能</strong>：内置AI写作助手，可以生成、改写、翻译、总结内容。</li></ul><h3>核心缺陷</h3><ul><li><strong>离线体验差</strong>：网络不好时基本不可用。数据存储在Notion服务器上。</li><li><strong>性能问题</strong>：页面内容多了之后加载变慢。</li><li><strong>非Markdown原生</strong>：导出时的格式不完全标准。</li><li><strong>隐私顾虑</strong>：所有笔记都存在Notion的服务器上。</li></ul><h2>Obsidian：知识工作者的终极武器</h2><h3>核心优势</h3><ul><li><strong>本地优先</strong>：所有文件都是本地Markdown文件，数据100%在你手里。</li><li><strong>双向链接和图谱</strong>：Obsidian的杀手级功能。任何两个笔记之间都可以建立链接。</li><li><strong>插件生态爆炸</strong>：超过1500个社区插件。</li><li><strong>极快</strong>：因为是本地应用，打开和搜索都非常快。</li><li><strong>完全免费</strong>：个人使用完全免费。</li></ul><h3>核心缺陷</h3><ul><li><strong>学习曲线陡峭</strong>：开箱只是一个空白文件夹。</li><li><strong>协作困难</strong>：没有原生的多人实时协作功能。</li><li><strong>移动端体验一般</strong>：插件支持有限。</li></ul><h2>Logseq：大纲爱好者的归宿</h2><h3>核心优势</h3><ul><li><strong>天然的大纲结构</strong>：每一行就是一个块，可以无限嵌套。</li><li><strong>开源</strong>：代码完全开放，数据也是本地Markdown/Org-mode文件。</li><li><strong>日记驱动</strong>：每天打开就是一个新页面，降低了"写什么"的决策成本。</li><li><strong>PDF标注</strong>：内置PDF阅读器，批注自动成为可引用的块。</li></ul><h3>核心缺陷</h3><ul><li><strong>不太适合结构化数据</strong>：没有Notion那样的数据库系统。</li><li><strong>移动端还在追赶</strong>。</li><li><strong>社区和模板较少</strong>。</li></ul><h2>直观对比表</h2><table><thead><tr><th>维度</th><th>Notion</th><th>Obsidian</th><th>Logseq</th></tr></thead><tbody><tr><td>数据存储</td><td>云端</td><td>本地</td><td>本地</td></tr><tr><td>离线可用</td><td>差</td><td>优秀</td><td>优秀</td></tr><tr><td>数据库</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐</td><td>⭐⭐</td></tr><tr><td>双向链接</td><td>⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td></tr><tr><td>协作</td><td>⭐⭐⭐⭐⭐</td><td>⭐</td><td>⭐</td></tr><tr><td>学习曲线</td><td>易上手</td><td>较陡</td><td>中等</td></tr><tr><td>价格</td><td>免费/付费</td><td>免费</td><td>免费</td></tr></tbody></table><h2>我的建议</h2><ol><li>先用<strong>Notion</strong>入门。门槛最低，上手最快。</li><li>如果你开始觉得Notion"不够快"或"数据不在自己手里不舒服"，试试<strong>Obsidian</strong>。</li><li>如果你发现自己在Obsidian里总是在写大纲，试试<strong>Logseq</strong>。</li></ol><p>最终，工具是服务于你的思维方式的。最好的工具是那个你用起来不觉得别扭的工具。</p>` },
  { slug: "adhd-friendly-notion-setup", title: "用Notion搭建ADHD友好的任务管理系统：从焦虑到行动", excerpt: "专为注意力分散人群设计的Notion任务管理方案，包含任务拆解、脑力值评估和能量管理看板。", category: "notion", readTime: 10, date: "2026-06-10", keywords: "Notion,ADHD,任务管理,注意力分散,效率,执行功能", content: `<div class="affiliate-disclosure">💡 本文包含配套Notion模板的链接，免费版已包含核心功能，付费版增加了自动化公式和多视图。</div><h2>为什么大多数效率系统对ADHD不管用</h2><p>我试过GTD。也试过番茄钟、子弹笔记、四象限法则。每次都是第一周激情满满，第二周开始忘记维护，第三周彻底放弃。</p><p>后来我理解了原因：<strong>大多数效率系统假设你有一个正常运作的前额叶皮层</strong>——它们假设你能轻松地"决定做某事"然后"去做"。但ADHD大脑不是这样的。它对"大任务"的反应是焦虑和逃避，而不是行动。</p><h2>三个核心设计原则</h2><h3>原则1：把大任务变成不会失败的小步骤</h3><p>面对"写季度报告"这四个字，ADHD大脑会直接当机。但面对"打开Word→写标题→列出三个要点→写第一个要点的第一句话"——这是可以执行的。每个步骤控制在5-15分钟。</p><h3>原则2：用脑力值代替优先级</h3><p>传统效率系统让你给任务排优先级。但ADHD人的问题是：有时候你连一个高优先级任务都启动不了，因为脑力不够。脑力值系统：⚡低脑力（回邮件、整理文件）、⚡⚡中脑力（修改文档、做表格）、⚡⚡⚡高脑力（写新文章、做方案）。匹配脑力值和你的实际能量状态。</p><h3>原则3：每天只聚焦3件事</h3><p>不是只能做3件事，而是只有3件事是今天必须做的。其他任务都在"备用池"里。这个区分把"我应该做的"和"我承诺今天做的"分开了。</p><h2>系统四件套</h2><h3>📋 任务拆解中心</h3><p>每个任务进来先拆成步骤。"写季度报告"拆成：搜集资料(15min)→列大纲(10min)→写初稿(40min)→修改润色(20min)→发给同事review(5min)。5个步骤各自变成独立任务项，可以分开在不同时间完成。</p><h3>🎯 今日聚焦</h3><p>每天早上的第一件事：从任务池里选最多3个放进来。规则：最多3个。因为3这个数字足够让你有成就感，又不至于让你被压垮。</p><h3>🧘 能量管理看板</h3><p>高脑力时段（上午）做⚡⚡⚡任务，中脑力时段（下午）做⚡⚡任务，低脑力时段做⚡任务。关键是：不要对抗你的能量曲线，而是顺应它。</p><h3>🏆 成就日报</h3><p>每天晚上花2分钟填写：今天完成了什么、今天的心情、明天想改进的一个小点。这个习惯对抗ADHD大脑的"我什么都没干"的愧疚感。</p><h2>使用一个月后的变化</h2><ol><li><strong>启动阻力明显降低</strong>：因为每个任务都已经拆成了小步骤。</li><li><strong>对自己的能量波动更有意识了</strong>：下午效率低时不再自责。</li><li><strong>晚上的愧疚感少了</strong>：成就日报让我看到每天确实完成了一些事情。</li><li><strong>不再囤积要做的事在心里</strong>：全部扔进模板里。</li></ol>` },
  { slug: "freelancer-notion-crm", title: "自由职业者如何用Notion搭建客户管理和财务系统", excerpt: "一个人就是一家公司——用Notion同时管理客户跟进、项目进度、收支追踪和税务估算。", category: "notion", readTime: 11, date: "2026-06-08", keywords: "Notion,自由职业,CRM,客户管理,财务管理,发票追踪", content: `<h2>自由职业者最大的管理难题</h2><p>自由职业2年，我发现最大的坑不是找客户，而是<strong>管理</strong>。忘了跟进一个意向客户，丢了潜在收入；不知道这个月到底赚了多少花了多少；报税时手忙脚乱到处翻转账记录；不知道哪个客户最赚钱哪个客户在亏时间。</p><p>公司有各种部门——销售、财务、项目管理。但自由职业者只有自己。所以你需要一个轻量但完整的系统来替代这些"部门"。</p><h2>系统四大模块</h2><h3>👥 客户关系管理（CRM）</h3><p>每个客户一条记录：合作状态（意向沟通→报价中→进行中→已完成→长期合作→休眠）、累计收入（自动从收入记录汇总）、上次联系日期（超过14天自动标记待跟进）。每月初花15分钟浏览一遍客户列表，看哪些需要重新激活。</p><h3>📋 项目管道</h3><p>每个项目关联一个客户，追踪从报价到结款的全过程。状态流：待启动→进行中→等待反馈→修改中→已交付→已结款。报价金额vs已收款一目了然。</p><h3>💰 财务追踪</h3><p>收入和支出两个数据库自动汇总到Dashboard。收入分类帮你发现哪个方向最赚钱；支出分类了解钱花在哪里；可抵税标记让报税时直接导出；月度净利自动计算。</p><h3>🎯 年度目标</h3><p>设定年度收入目标，系统自动计算完成率、月均还需达成多少、本月实际收入。把遥远的年度目标拆成每月看得见的数字。</p><h2>三个日常使用习惯</h2><ol><li>每次客户沟通后：更新上次联系日期，加一行备注</li><li>每次收到钱：在收入库新增一条记录（30秒）</li><li>每月1日：花15分钟看Dashboard回顾上月财务数据</li></ol><p>这三个习惯加起来每天不超过5分钟，但积累一个月后你对自己的经营状况会有一个完全清晰的图景。</p>` },
  { slug: "okr-notion-template", title: "打工人必备：用Notion做OKR目标管理和月度复盘", excerpt: "不再浑浑噩噩地上班——搭建OKR目标看板、周复盘和技能雷达，让成长有据可查。", category: "notion", readTime: 9, date: "2026-06-06", keywords: "Notion,OKR,目标管理,职场,复盘,技能成长,绩效面谈", content: `<h2>绩效面谈的困境</h2><p>"过去半年你做了哪些成绩？"如果你在被问到的瞬间脑子里一片空白——你需要一个OKR和复盘系统。不是写给公司看的，是<strong>写给自己的</strong>。用它来摆脱"做了很多但说不清"的困境。</p><h2>OKR的简化版实践</h2><h3>季度目标（Objective）</h3><p>每季度定1-3个O。比如："提升技术影响力"、"改善工作幸福感"。O要足够有方向感但又不能太空。</p><h3>关键结果（Key Results）</h3><p>每个O配2-4个可量化的KR。比如"提升技术影响力"拆成：发表3篇技术文章、做2次部门技术分享、Github获得50 star。KR的关键词是<strong>可衡量</strong>。</p><h3>进度追踪</h3><p>每个KR都有一个进度条——从起始值到目标值，自动显示当前完成百分比。这比"感觉差不多了"要可靠一万倍。</p><h2>周复盘：15分钟够了</h2><p>每个周日晚上：本周目标完成情况、最大收获、1个改进点（只写1个）、下周最重要的3件事。15分钟。不需要更多仪式感。</p><h2>月度深度复盘：6个维度</h2><ol><li>📊 数据回顾：本月完成了几个KR？</li><li>🏆 高光时刻：最让你骄傲的一件事</li><li>📉 至暗时刻：最让你难受的一件事</li><li>💡 关键洞察：从中你学到了什么？</li><li>🔧 流程优化：有什么重复劳动可以自动化？</li><li>🎯 下月聚焦：下个月只做这3件事</li></ol><h2>能力雷达：把模糊的成长可视化</h2><p>每个月给自己在6个维度上打分（1-10）：专业深度、沟通表达、项目管理、领导力、效率工具、学习速度。连续追踪6个月，你能看到自己的短板和进步。绩效面谈时这份数据比任何自我陈述都有说服力。</p>` },
  { slug: "pet-health-notion-tracker", title: "多宠家庭福音：用Notion追踪所有毛孩子的健康数据", excerpt: "疫苗、体重、驱虫、就诊记录一站式管理，再也不会忘记哪只猫该打针了。", category: "notion", readTime: 7, date: "2026-06-04", keywords: "Notion,宠物,健康管理,多宠家庭,疫苗追踪,体重监测", content: `<h2>两只猫一只狗，我崩溃了</h2><p>我有两只猫和一只柯基。以前它们的健康信息全靠脑子记——或者更准确地说，靠遗忘后突然想起的恐慌。"上次打疫苗是几月来着？""喵喵最近是不是瘦了？""该做驱虫了吧……还是已经做过了？"后来我做了这个模板。现在打开Notion就知道每只毛孩子的健康状况。</p><h2>模板功能</h2><h3>🐾 宠物档案</h3><p>每只宠物一个独立档案：名字、品种、生日、性别、绝育状态、芯片号。信息集中，不用翻聊天记录。</p><h3>💉 疫苗接种追踪</h3><p>记录每针疫苗的接种日期和有效期。到期前30天自动标黄提醒——打疫苗最好的时机是"到期的前一天"，而不是"过期后想起来"。</p><h3>⚖️ 体重监测</h3><p>每月记录一次体重，自动显示与上月的对比和趋势。柯基超重0.5kg就会被标为⚠️需关注——小型犬的每一斤都是关节的负担。</p><h3>🪱 驱虫排期</h3><p>体内驱虫（每3个月一次）和体外驱虫（每月一次）分开管理。自动计算下次驱虫日期。</p><h3>🏥 就诊记录</h3><p>每次去医院的诊断、治疗和费用都有记录。一年下来你才知道在宠物医疗上花了多少钱。</p><h2>为什么推荐用Notion而不是Excel</h2><ul><li>手机就能随时记录体重和就诊信息</li><li>关联功能让宠物和记录之间无缝跳转</li><li>到期自动提醒（不用自己设闹钟）</li><li>分享给家人/宠物保姆协同填写</li></ul>` },
  { slug: "exam-review-notion-system", title: "考研/考公党必看：用Notion搭建科学的复习追踪系统", excerpt: "距离考试还有200天？这个系统帮你搞定每日学习记录、错题归因和记忆曲线复习提醒。", category: "notion", readTime: 10, date: "2026-06-02", keywords: "Notion,考研,考公,学习计划,错题本,记忆曲线,复习系统", content: `<h2>大多数人的复习是"盲飞"</h2><p>我考研那年（上岸了），前三个月基本是在盲飞。每天去图书馆坐8小时，但不知道自己的薄弱科目在哪、不知道哪些错题已经会了、不知道什么时候该复习什么（全凭感觉）。后来我开始用Notion搭建复习追踪系统。</p><h2>四件套复习系统</h2><h3>1. 倒计时+阶段规划</h3><p>首屏显示距离考试的天数。把整个备考期分成4个阶段：基础→强化→冲刺→临考。200天的备考被切成了4个50天，心理上比"还有200天"好承受得多。</p><h3>2. 每日学习记录</h3><p>每天结束后花3分钟记录：今天学了什么、花了多少小时、掌握度自评（⭐~⭐⭐⭐⭐⭐）、错了多少题。一周后你能看到时间分配图——是不是某个科目投入太少？</p><h3>3. 错题归因系统</h3><p>最关键的部分。不只是抄一遍错题，而是做归因分析：错误类型（知识点不熟？审题马虎？计算失误？）、根因、对策。归类之后你才能发现规律。比如我的错题有40%是"审题太快漏了关键条件"——这说明我需要练的是审题习惯，不是更多刷题。</p><h3>4. 记忆曲线复习提醒</h3><p>艾宾浩斯遗忘曲线的简化版：学习新内容后在第1、3、7、15天安排复习。模板里每个学习内容后面有5个checkbox对应5次复习窗口。不复杂，但能确保你不会"学了一遍就再也没看"。科学复习比盲目重复刷题高效得多。</p><h2>使用3个月后的收获</h2><ol><li>让"不知道学什么"的时刻消失了</li><li>发现了隐藏的薄弱科目</li><li>消灭了"好像会了又好像不会"的错题——归因+记忆曲线确保每道错题都被彻底消化</li></ol>` },
  { slug: "second-brain-notion", title: "用Notion搭建第二大脑：PARA方法的完整实践指南", excerpt: "Tiago Forte的PARA方法论在Notion中的具体落地——项目、领域、资源和存档的组织方式。", category: "notion", readTime: 12, date: "2026-05-28", keywords: "Notion,第二大脑,PARA,知识管理,个人信息管理", content: `<h2>什么是"第二大脑"</h2><p>这个概念由Tiago Forte提出。简单说：<strong>你的大脑是用来产生想法的，不是用来存储信息的。</strong>把所有需要记住的东西——想法、笔记、项目、任务——放进一个外部系统，释放大脑的创造力。</p><h2>PARA：四个文件夹管好一切</h2><ul><li><strong>P - Projects（项目）</strong>：有明确截止日期的、正在进行中的任务集合。</li><li><strong>A - Areas（领域）</strong>：需要持续关注的、没有截止日期的责任范围。例如"健康"、"个人财务"、"专业技能"。</li><li><strong>R - Resources（资源）</strong>：未来可能有用的参考资料。例如"想读的书单"、"设计灵感收集"。</li><li><strong>A - Archives（存档）</strong>：不再活跃的项目、领域和资源。放这里，不要删。</li></ul><p>这条简单的分类法可以应用在任何笔记工具中，Notion尤其合适。</p><h2>在Notion中的具体搭建</h2><h3>Projects数据库</h3><p>包含字段：项目名、关联领域、状态、截止日期、优先级、完成进度。每个项目是一个独立页面，里面包含项目笔记、任务清单、相关资源链接。</p><h3>Areas数据库</h3><p>包含字段：领域名、描述、当前状态、相关项目。每个领域链接到对应的资源库。</p><h3>Resources数据库</h3><p>包含字段：标题、类型、主题标签、是否已阅读/试用、评分、关联领域。资源库的价值在于"未来能找回来"。</p><h3>Archives</h3><p>已完成的项目、不再关注的领域、过时的资源——全部移到Archives。不删，因为未来的你可能需要翻阅。</p><h2>PARA的最关键规则：信息只放一次</h2><p>如果一个信息可以同时属于Projects和Resources——选一个放。通过Notion的关联（Relation）功能链接到另一个位置。复制粘贴是PARA的敌人。</p><h2>每周维护15分钟</h2><p>每周末花15分钟：检查Projects进度，把完成的移到Archives；给Resources里的新条目打标签；确认Areas有没有需要更新的。15分钟足够了。</p>` },
  { slug: "gtd-2026-modern-guide", title: "GTD方法2026现代实践指南：让大脑只做思考不做存储", excerpt: "David Allen的Getting Things Done方法论在现代工具环境下的重新演绎，从理论到实操。", category: "productivity", readTime: 10, date: "2026-05-25", keywords: "GTD,效率方法,时间管理,任务管理,Getting Things Done", content: `<h2>GTD在2026年还适用吗？</h2><p>David Allen的《Getting Things Done》出版于2001年。25年过去了，信息量爆炸了100倍，工具也换了无数代。但GTD的核心原则仍然有效——甚至比当年更需要。</p><p>GTD的核心洞察：<strong>你的大脑不擅长提醒你"该做什么"。它擅长的是思考、创造和解决问题。</strong>把所有"要做的事"从大脑转移到外部系统，大脑才能发挥它真正的作用。</p><h2>GTD五步法（现代版）</h2><h3>1. 收集（Capture）</h3><p>任何闪过脑海的想法——任务、灵感、担忧——立即记录。不要判断，不要分类，先记下来。2026年推荐工具：手机快速备忘录、微信文件传输助手、或笔记软件里的inbox页面。</p><h3>2. 理清（Clarify）</h3><p>定期处理收件箱里的每一条。问两个问题："这是什么？""下一步行动是什么？"如果可以2分钟内完成，立即做。否则放入对应清单。</p><h3>3. 组织（Organize）</h3><p>把理清后的条目放入对应清单：下一步行动、项目清单、等待清单、日历、someday/maybe（以后再说）。</p><h3>4. 回顾（Reflect）</h3><p>每周做一次完整的系统回顾。这是GTD中最重要也最容易被跳过的步骤。不看回顾，你的系统会在2周内变成信息坟墓。</p><h3>5. 执行（Engage）</h3><p>根据当前的情境、可用时间、能量水平、优先级来决定现在做什么。</p><h2>在Notion中实现GTD</h2><p>创建一个"GTD控制中心"页面，包含：收件箱数据库、下一步行动清单、项目清单、等待清单、Someday/Maybe清单、每周回顾模板。每个都用Notion的数据库视图实现。</p>` },
  { slug: "digital-minimalism-phone-setup", title: "数字极简主义：一个普通人的手机断舍离实践手记", excerpt: "从127个APP减到23个的完整过程，以及一个月后的真实变化——注意力回来了。", category: "productivity", readTime: 8, date: "2026-05-22", keywords: "数字极简,手机断舍离,注意力,APP管理,通知管理", content: `<h2>127个APP，每天解锁150次</h2><p>上个月我查了手机使用报告。数字让我震撼：安装了127个APP，每天解锁150次，平均每6分钟看一次手机。清醒时间里有将近5个小时花在屏幕上。我决定做一个实验：只保留最有用的APP，其他全删。</p><h2>删除原则</h2><ul><li><strong>30天没用过的</strong>：直接删。</li><li><strong>可以用网页版替代的</strong>：删APP用浏览器。</li><li><strong>消磨时间但不提供价值的</strong>：短视频APP、无意义游戏。</li><li><strong>重复功能的</strong>：只留最常用的那个。</li></ul><h2>最终留下的23个APP</h2><p>通讯（微信、邮件）、工具（相机、地图、支付、银行、日历备忘录）、笔记（Notion）、阅读（Kindle、播客）、健康（运动记录、睡眠追踪）、音乐（一个就够了）、少量娱乐（一个视频平台）。所有社交媒体APP都被删了——需要的时候用电脑看。</p><h2>一个月后的变化</h2><ol><li><strong>屏幕时间降到每天1.5小时</strong>：不是刻意克制，而是"没什么可看的了"。</li><li><strong>注意力回来了</strong>：以前看一篇文章中间要切出去好几次，现在能一口气读完。</li><li><strong>等电梯、排队时不焦虑了</strong>：可以发呆或者观察周围。</li><li><strong>电量焦虑没了</strong>：23个APP没有后台偷偷耗电的东西，一天一充绰绰有余。</li></ol><p>数字极简不是反科技，而是<strong>让科技服务于你，而不是你服务于科技</strong>。</p>` },
  { slug: "deep-work-practical-guide", title: "深度工作实战指南：如何在开放式办公室每天专注4小时", excerpt: "Cal Newport的深度工作理论在真实办公环境中的落地策略，包含环境搭建和防打断技巧。", category: "productivity", readTime: 9, date: "2026-05-18", keywords: "深度工作,专注,职场,开放式办公室,Cal Newport", content: `<h2>深度工作在2026年更难了</h2><p>Cal Newport在2016年提出"深度工作"概念时，Slack消息还没那么多。到2026年，IM、邮件、会议轮番轰炸——能连续专注1小时已经是奢侈。但深度工作的价值反而更高了：在AI能快速完成大部分浅层工作的时代，<strong>深度思考能力是你最后的安全网</strong>。</p><h2>在开放式办公室深度工作的策略</h2><h3>策略1：抢占黄金2小时</h3><p>找到你一天中精力最充沛的2小时——对大多数人来说是上午9-11点。把这段时间标记为"不可打扰"，不约会议、不看消息、不回邮件。就做最重要的一件事。</p><h3>策略2：物理信号</h3><p>戴降噪耳机（即使不放音乐）。在工位上放一个小牌子或贴纸，表示"深度工作中"。同事看到会自觉减少打扰——他们只是不知道你在专注。</p><h3>策略3：3-2-1节奏</h3><p>上午3个深度工作块（每个50分钟+10分钟休息），下午2个，傍晚1个。总共6个块就是5小时深度工作时间——这对大多数知识工作者来说已经远超平均水平。</p><h3>策略4：收尾仪式</h3><p>每天下班前花5分钟：列出明天最重要的3件事、清理桌面（物理和数字的）、对自己说"今天的工作结束了"。这个仪式帮助大脑真正切到休息模式。</p>` },
  { slug: "apple-notes-vs-notion", title: "Apple Notes vs Notion：轻量笔记和重型工具箱怎么选？", excerpt: "两款国民级笔记工具的适合人群完全不同——帮你判断自己究竟需要哪一个。", category: "tools", readTime: 8, date: "2026-05-15", keywords: "Apple Notes,Notion,笔记工具,测评,对比", content: `<h2>看似不公平的比较</h2><p>Apple Notes和Notion放在一起比，就像比较瑞士军刀和工厂车间。但它们恰好代表了两种完全不同的笔记哲学：<strong>极简vs全能</strong>。</p><h2>Apple Notes的优势</h2><ul><li><strong>打开就写</strong>：零启动时间。打开App，点新建，开始打字。没有任何配置。</li><li><strong>原生集成</strong>：和iPhone、iPad、Mac无缝同步。扫描文档、手写笔记、快速备忘录。</li><li><strong>免费</strong>：iCloud同步免费。</li><li><strong>极快</strong>：打开快、搜索快、同步快。没有任何等待。</li></ul><h2>Notion的优势</h2><ul><li><strong>数据库</strong>：Notion真正超越轻量笔记的地方。你可以构建完整的信息管理系统。</li><li><strong>模板</strong>：海量模板让你不用从零开始。</li><li><strong>协作</strong>：多人实时编辑、评论、权限管理。</li></ul><h2>决策清单</h2><p>选<strong>Apple Notes</strong>如果你：只是记笔记、写日记、做简单清单、扫描文档。需要速度快、操作简单。</p><p>选<strong>Notion</strong>如果你：需要管理项目、追踪数据、构建系统、团队协作。愿意花时间学习。</p><p>很多人两个都用——Apple Notes做快速记录，Notion做系统搭建。</p>` },
  { slug: "ai-notetaking-tools-2026", title: "2026年AI笔记工具盘点：自动总结、智能关联、语音转文字", excerpt: "AI正在改变记笔记的方式——实测5款AI增强笔记工具，看看它们到底有没有用。", category: "tools", readTime: 10, date: "2026-05-12", keywords: "AI,笔记工具,自动总结,语音转文字,智能关联,2026", content: `<h2>AI笔记工具的崛起</h2><p>2025-2026年，几乎所有主流笔记软件都加入了AI功能。从自动总结到智能标签、从语音转文字到AI搜索——AI正在改变我们对"记笔记"这件事的理解。我实测了5款AI增强笔记工具。</p><h2>1. Notion AI</h2><p><strong>功能</strong>：写作辅助、总结、翻译、问答、头脑风暴。集成度最高。选中文字就能弹出AI菜单。总结长会议记录的效果不错，但中文创意写作的质量有波动。<strong>适合</strong>：已经是Notion用户的人。</p><h2>2. Mem</h2><p><strong>功能</strong>：自动组织、智能搜索、AI聊天。最"AI原生"的笔记工具。不需要你手动建文件夹和标签——AI自动分析笔记内容并组织。但中文支持一般。<strong>适合</strong>：追求零组织成本、大部分笔记是英文的人。</p><h2>3. Reflect</h2><p><strong>功能</strong>：AI辅助回顾、语音转文字、自动反向链接。设计理念是"用AI帮你回忆"。每天AI帮你回顾过去的笔记，发现被遗忘的想法。<strong>适合</strong>：日记和反思型笔记用户。</p><h2>4. Otter.ai</h2><p><strong>功能</strong>：实时语音转文字、AI会议总结、自动生成行动项。会议场景的最佳工具。实时转录准确率高，会后自动生成总结和Action Items。<strong>适合</strong>：会议多的人。</p><h2>5. 飞书妙记</h2><p><strong>功能</strong>：视频会议自动转文字、AI总结、关键词提取。飞书生态内体验很好，中文识别准确率高。但生态外基本不适用。<strong>适合</strong>：飞书用户。</p><h2>AI笔记的时代真的来了吗？</h2><p>AI功能确实有用——尤其是自动总结和语音转文字。但现有的AI笔记工具还没有跨越"助手"到"替代者"的鸿沟。你最常用的笔记工具加上AI功能就是目前最好的选择。</p>` },
  { slug: "zettelkasten-beginners-guide", title: "卡片盒笔记法入门：用Zettelkasten让知识自然生长", excerpt: "德语直译：卡片盒子。这套诞生于上世纪的方法论，在数字时代反而更加闪耀——从零开始搭建你的知识网络。", category: "notes", readTime: 11, date: "2026-05-08", keywords: "Zettelkasten,卡片盒笔记法,知识管理,笔记方法,双链", content: `<h2>一个德国社会学家的秘密武器</h2><p>Niklas Luhmann是20世纪最高产的社会学家之一——一生出版了70多本书和400多篇学术论文。当被问及如何做到时，他归功于他的"Zettelkasten"（卡片盒）。他的卡片盒有超过9万张手写卡片，每张卡片只包含一个想法。卡片之间通过编号系统互相链接。Luhmann说这不是一个归档系统，而是一个<strong>"对话伙伴"</strong>——新的想法在与已有卡片的互动中自然涌现。</p><h2>Zettelkasten的核心原则</h2><h3>1. 原子化（Atomicity）</h3><p>每张卡片只包含一个想法。不是一页笔记，不是一个文章——就是一个想法。这迫使你提炼和精确表达。</p><h3>2. 连接（Connection）</h3><p>每次添加新卡片时，问自己：这和哪些已有的卡片相关？建立连接。知识的力量不在单独的事实，而在事实之间的联系。</p><h3>3. 用自己的话写（Your Own Words）</h3><p>不要复制粘贴。用自己的话重新表述——这个处理过程本身就是理解和记忆的关键。</p><h2>在Obsidian/Logseq中实践</h2><p>Obsidian和Logseq是Zettelkasten的最佳数字载体：每条笔记就是一张卡片（一个.md文件或一个块）、双链功能天然支持卡片之间的连接、图谱视图可视化你的知识网络。</p><h2>入门建议</h2><p>不需要追求Luhmann的9万张。从每天1-3张卡片开始，记录你阅读、学习或思考中遇到的有趣想法。一个月后回顾，你会发现一些意想不到的连接——这就是Zettelkasten的魔力。</p>` },
  { slug: "weekly-review-routine", title: "每周日只需要15分钟的复盘流程，让下周效率翻倍", excerpt: "不是复杂的周报——是一套极简的5步复盘法，我已经执行了52周，亲测有效。", category: "productivity", readTime: 7, date: "2026-05-05", keywords: "周复盘,效率方法,习惯,GTD,时间管理", content: `<h2>复盘的ROI可能是最高的</h2><p>每周投入15分钟做一次回顾，能让接下来一周的效率提升30%以上。这不是空话——我已经坚持了52周。</p><h2>极简5步复盘法</h2><h3>第1步：清理收件箱（3分钟）</h3><p>把你这一周随手记录的所有东西——便签、微信转发给自己、笔记软件收件箱——全部过一遍。决定每条的归属：做、存、删。</p><h3>第2步：回顾上周目标（2分钟）</h3><p>上周日你给这周定了什么目标？完成了多少？诚实面对。如果有没完成的，问一句"为什么"——但不用花时间自责。</p><h3>第3步：检查项目清单（3分钟）</h3><p>浏览所有活跃项目。每个项目都有明确的"下一步行动"吗？如果没有，补上。</p><h3>第4步：设定下周目标（5分钟）</h3><p>圈出下周最重要的3件事。只有3件。不够3件也OK，但不要超过3件。给每件事设定一个粗略的时间框架。</p><h3>第5步：安排深度工作块（2分钟）</h3><p>在日历上找到下周可以保护出来的深度工作时段（建议每天至少2小时），提前标注。</p><h2>为什么这个方法有效</h2><p>因为它足够简单。15分钟，5步。不需要写长篇大论，不需要情绪宣泄。就是机械地把"待办"变成"计划"，把模糊变成明确。试4周。如果没用，回来骂我。</p>` }
];

// ==================== TEMPLATES ====================
const ARTICLE_TPL = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} — 效率工具箱</title>
  <meta name="description" content="{{EXCERPT}}">
  <meta name="keywords" content="{{KEYWORDS}}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${BASE}/blog/{{SLUG}}.html">
  <meta property="og:title" content="{{TITLE}}">
  <meta property="og:description" content="{{EXCERPT}}">
  <meta property="og:type" content="article">
  <meta property="article:published_time" content="{{DATE}}">
  <link rel="stylesheet" href="${BASE}/assets/css/style.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{{TITLE}}",
    "description": "{{EXCERPT}}",
    "datePublished": "{{DATE}}",
    "author": { "@type": "Person", "name": "效率工具箱" }
  }
  </script>
</head>
<body>
<header class="site-header"><div class="container"><a href="${BASE}/" class="logo">🧰 效率工具箱</a><nav><a href="${BASE}/">首页</a><a href="${BASE}/blog/">文章</a><a href="${BASE}/about.html">关于</a></nav></div></header>
<main class="article-container"><article>
  <header class="article-header">
    <nav class="breadcrumb"><a href="${BASE}/">首页</a> / <a href="${BASE}/blog/">文章</a> / <a href="${BASE}/blog/{{CATEGORY}}/">{{CATEGORY_LABEL}}</a></nav>
    <h1>{{TITLE}}</h1>
    <div class="article-meta"><span>📅 {{DATE}}</span><span>📂 <a href="${BASE}/blog/{{CATEGORY}}/">{{CATEGORY_LABEL}}</a></span><span>⏱ {{READ_TIME}}分钟阅读</span></div>
  </header>
  <div class="article-body">{{CONTENT}}</div>
  <div class="cta-box" style="margin-top:48px"><h3>📬 获取更多效率工具推荐</h3><p>每周分享一篇深度好文，关于Notion、数字笔记和生产力方法。</p><a href="${BASE}/rss.xml" class="btn">订阅 RSS</a></div>
</article></main>
<footer class="site-footer"><div class="container"><div class="footer-bottom"><p>&copy; 2026 效率工具箱 · All Rights Reserved</p></div></div></footer>
</body>
</html>`;

const CATEGORY_TPL = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{CATEGORY_LABEL}} — 效率工具箱</title>
  <meta name="description" content="效率工具箱 {{CATEGORY_LABEL}} 分类下的所有文章。">
  <meta name="robots" content="index, follow">
  <link rel="stylesheet" href="${BASE}/assets/css/style.css">
</head>
<body>
<header class="site-header"><div class="container"><a href="${BASE}/" class="logo">🧰 效率工具箱</a><nav><a href="${BASE}/">首页</a><a href="${BASE}/blog/">文章</a><a href="${BASE}/about.html">关于</a></nav></div></header>
<div class="blog-list-header"><h1>{{CATEGORY_LABEL}}</h1><p style="color:#6b7280;margin-top:8px">共 {{COUNT}} 篇文章</p></div>
<div class="blog-list">{{ITEMS}}</div>
<footer class="site-footer"><div class="container"><div class="footer-bottom"><p>&copy; 2026 效率工具箱 · All Rights Reserved</p></div></div></footer>
</body>
</html>`;

// ==================== BUILD ====================
function ensureDir(dir) { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); }

function buildArticle(post) {
  let t = ARTICLE_TPL;
  const cat = CATEGORIES[post.category];
  return t.replaceAll('{{TITLE}}', post.title)
    .replaceAll('{{EXCERPT}}', post.excerpt)
    .replaceAll('{{KEYWORDS}}', post.keywords)
    .replaceAll('{{SLUG}}', post.slug)
    .replaceAll('{{DATE}}', post.date)
    .replaceAll('{{READ_TIME}}', String(post.readTime))
    .replaceAll('{{CONTENT}}', post.content)
    .replaceAll('{{CATEGORY}}', post.category)
    .replaceAll('{{CATEGORY_LABEL}}', cat ? cat.label : post.category);
}

function buildCategoryPage(catSlug, catInfo) {
  const catPosts = POSTS.filter(p => p.category === catSlug);
  const items = catPosts.map(p =>
    `<a href="${BASE}/blog/${p.slug}.html" style="display:flex;gap:20px;padding:24px 0;border-bottom:1px solid #e5e7eb;text-decoration:none;color:inherit"><span style="font-size:0.85rem;color:#9ca3af;min-width:90px;padding-top:3px">${p.date}</span><div><h3 style="font-size:1.2rem;margin-bottom:6px;color:#0f172a">${p.title}</h3><p style="font-size:0.9rem;color:#6b7280">${p.excerpt}</p></div></a>`
  ).join('');
  return CATEGORY_TPL.replaceAll('{{CATEGORY_LABEL}}', catInfo.label)
    .replaceAll('{{COUNT}}', String(catPosts.length))
    .replaceAll('{{ITEMS}}', items);
}

function buildSitemap() {
  let urls = '';
  urls += `  <url><loc>${SITE_URL}/</loc><priority>1.0</priority></url>\n`;
  urls += `  <url><loc>${SITE_URL}/blog/</loc><priority>0.9</priority></url>\n`;
  urls += `  <url><loc>${SITE_URL}/about.html</loc><priority>0.5</priority></url>\n`;
  for (const cat of Object.keys(CATEGORIES)) {
    urls += `  <url><loc>${SITE_URL}/blog/${cat}/</loc><priority>0.7</priority></url>\n`;
  }
  for (const p of POSTS) {
    urls += `  <url><loc>${SITE_URL}/blog/${p.slug}.html</loc><priority>0.8</priority></url>\n`;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}</urlset>`;
}

function buildRSS() {
  let items = '';
  for (const p of POSTS) {
    items += `    <item>
      <title>${p.title}</title>
      <link>${SITE_URL}/blog/${p.slug}.html</link>
      <description>${p.excerpt}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <guid>${SITE_URL}/blog/${p.slug}.html</guid>
    </item>\n`;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="${BASE}/assets/rss.xsl"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
  <title>效率工具箱</title>
  <link>${SITE_URL}</link>
  <description>Notion模板、数字笔记技巧、效率工具测评和生产力系统</description>
  <language>zh-CN</language>
  <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}</channel>
</rss>`;
}

function build() {
  const dist = path.join(__dirname, 'dist');
  if (fs.existsSync(dist)) fs.rmSync(dist, { recursive: true });
  ensureDir(dist);
  ensureDir(path.join(dist, 'assets/css'));
  ensureDir(path.join(dist, 'assets/js'));

  // Copy static files
  ['index.html','about.html','privacy.html','404.html','robots.txt'].forEach(f => {
    const src = path.join(__dirname, f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(dist, f));
  });
  fs.cpSync(path.join(__dirname, 'assets'), path.join(dist, 'assets'), { recursive: true });

  // Build blog list
  ensureDir(path.join(dist, 'blog'));
  const blogListPosts = POSTS.map(p =>
    `<a href="${BASE}/blog/${p.slug}.html" style="display:flex;gap:20px;padding:24px 0;border-bottom:1px solid #e5e7eb;text-decoration:none;color:inherit"><span style="font-size:0.85rem;color:#9ca3af;min-width:90px;padding-top:3px">${p.date}</span><div><h3 style="font-size:1.2rem;margin-bottom:6px;color:#0f172a">${p.title}</h3><p style="font-size:0.9rem;color:#6b7280">${p.excerpt}</p></div></a>`
  ).join('');
  let blogIndex = fs.readFileSync(path.join(__dirname, 'blog/index.html'), 'utf8');
  // Note: blog/index.html already uses /seo-site/ absolute paths — do NOT regex-rewrite them
  // Inject posts into blog list page
  blogIndex = blogIndex.replace(/<div class="blog-list" id="blogList">[\s\S]*?<\/div>\s*<footer/, `<div class="blog-list">${blogListPosts}</div><footer`);
  fs.writeFileSync(path.join(dist, 'blog/index.html'), blogIndex);

  // Build articles
  for (const post of POSTS) {
    ensureDir(path.join(dist, 'blog'));
    fs.writeFileSync(path.join(dist, 'blog', `${post.slug}.html`), buildArticle(post));
  }

  // Build category pages
  for (const [slug, info] of Object.entries(CATEGORIES)) {
    ensureDir(path.join(dist, 'blog', slug));
    fs.writeFileSync(path.join(dist, 'blog', slug, 'index.html'), buildCategoryPage(slug, info));
  }

  // Sitemap & RSS
  fs.writeFileSync(path.join(dist, 'sitemap.xml'), buildSitemap());
  fs.writeFileSync(path.join(dist, 'rss.xml'), buildRSS());

  console.log(`\n✅ Built ${POSTS.length} articles + ${Object.keys(CATEGORIES).length} categories`);
  console.log(`📂 ${dist}/ ready for deployment\n`);
}

build();
