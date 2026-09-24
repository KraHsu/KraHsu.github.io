// Everything shown on the homepage lives here.
//
// - Translatable fields take `{ en, zh }`; a plain string is used for every language.
// - Titles accept `*emphasis*` (accent colour) and `\n` (line break).
// - Images are file names in content/images/ (or absolute URLs).
// - Sections render in order; section numbers, card numbers, and navigation follow automatically.
//
// See content/types.d.ts for every available field.

/** @type {import("./types").SiteConfig} */
export default {
  url: "https://krahsu.github.io",
  name: "Charles Hsu",
  avatar: "https://github.com/KraHsu.png?size=96",
  github: "KraHsu",

  meta: {
    title: {
      en: "Charles Hsu — Physical AI & beautiful interfaces",
      zh: "Charles Hsu — 物理 AI 与优雅的界面",
    },
    description: {
      en: "Charles Hsu — Physical AI researcher, interface maker, and open-source builder.",
      zh: "Charles Hsu —— 物理 AI 研究者、界面设计者、开源构建者。",
    },
  },

  hero: {
    eyebrow: { en: "PHD RESEARCHER / PHYSICAL AI", zh: "博士研究生 / 物理 AI" },
    title: { en: "I make things\nthat *move*.", zh: "我创造\n会*动*的东西。" },
    lede: {
      en: "I study intelligent systems in the physical world. I also make beautiful interfaces and open-source software because the tools we use should feel as considered as the ideas behind them.",
      zh: "我研究物理世界中的智能系统。我也做优雅的界面和开源软件——因为我们使用的工具，理应和它背后的想法一样经过深思熟虑。",
    },
    tags: [
      { en: "Web · Robotics · WAM · VLA", zh: "Web · 机器人 · WAM · VLA" },
      { en: "Former RoboMaster member", zh: "前 RoboMaster 队员" },
    ],
    core: { en: "PHYSICAL\nAI", zh: "物理\nAI" },
    artLabels: {
      top: { en: "01 — IN MOTION", zh: "01 — 运动中" },
      bottom: { en: "research / systems / form", zh: "研究 / 系统 / 形式" },
    },
    coordinates: ["31.2304", "121.4737"],
  },

  marquee: {
    en: ["WEB", "ROBOTICS", "WAM", "VLA", "OPEN SOURCE"],
    zh: ["WEB", "机器人", "WAM", "VLA", "开源"],
  },

  sections: [
    {
      id: "now",
      type: "about",
      label: { en: "Now", zh: "此刻" },
      kicker: { en: "A SMALL INTRODUCTION", zh: "简单介绍一下" },
      title: {
        en: "Curious about the gap between *thinking* and *touching*.",
        zh: "好奇于*思考*与*触碰*之间的距离。",
      },
      paragraphs: [
        {
          en: "I am a PhD student researching Physical AI — systems that perceive, reason, and act in the real world. My work lives somewhere between robotics, learning, simulation, and the messy details of making an idea actually run.",
          zh: "我是一名博士生，研究物理 AI——能在真实世界中感知、推理并行动的系统。我的工作介于机器人、学习、仿真，以及让一个想法真正跑起来的种种琐碎细节之间。",
        },
        {
          en: "When I am away from the lab, I design interfaces, maintain open-source tools, and obsess over the little moments that make software feel calm, clear, and surprisingly nice to use.",
          zh: "离开实验室时，我设计界面、维护开源工具，并执着于那些让软件显得平静、清晰、又出乎意料地好用的小瞬间。",
        },
      ],
      interests: [
        { en: "01 / embodied intelligence", zh: "01 / 具身智能" },
        { en: "02 / interface craft", zh: "02 / 界面工艺" },
        { en: "03 / open source", zh: "03 / 开源" },
      ],
    },

    {
      id: "research",
      type: "papers",
      label: { en: "Research", zh: "研究" },
      kicker: { en: "PAPER + CODE", zh: "论文 + 代码" },
      title: { en: "World–Action Models,\n*in the open.*", zh: "世界–动作模型，\n*在开放中构建。*" },
      aside: {
        en: "An open, modular exploration toward systematic World–Action Model pretraining.",
        zh: "一次开放、模块化的探索，迈向系统化的世界–动作模型预训练。",
      },
      itemLabel: { en: "PAPER + CODE", zh: "论文 + 代码" },
      items: [
        {
          title: "OpenWAM",
          href: "https://github.com/OpenWAM-Official/OpenWAM",
          repo: "OpenWAM-Official/OpenWAM",
          image: { src: "openwam-title.webp", width: 2172, height: 425 },
          description: {
            en: "An open, modular research stack for World–Action Model pretraining, spanning infrastructure, controlled studies, and an open pretrained WAM.",
            zh: "一套开放、模块化的世界–动作模型（WAM）预训练研究栈，涵盖基础设施、对照研究，以及一个开源的预训练 WAM。",
          },
          authors: [
            { name: "Yuran Wang", marks: "*‡" },
            { name: "Siqiao Huang", marks: "*‡" },
            { name: "Mingleyang Li", marks: "*" },
            { name: "Chenhao Zhang", marks: "*", self: true },
            { name: "Jiaqi Liang", marks: "*" },
            { name: "Weiyang Jin" },
            { name: "Yue Chen" },
            { name: "Xuemin Chi" },
            { name: "Donghao Zhou" },
            { name: "Qize Yu" },
            { name: "Yu-Kai Wang" },
            { name: "Yuhan Rui" },
            { name: "Shenzhe Yao" },
            { name: "Zhen Yuan" },
            { name: "Zhenhao Shen" },
            { name: "Kefei Zhu" },
            { name: "Zijie Zhu" },
            { name: "Ning Gao" },
            { name: "Xiaowei Chi" },
            { name: "Guanqi He" },
            { name: "Shanghang Zhang" },
            { name: "Hao Dong" },
            { name: "Lin Shao", marks: "†" },
            { name: "Hang Zhao", marks: "†" },
          ],
          authorNotes: {
            en: "* equal contribution · ‡ project lead · † equal advising",
            zh: "* 同等贡献 · ‡ 项目负责人 · † 共同指导",
          },
          meta: [
            {
              label: "context",
              link: { text: { en: "WUJI Tech internship", zh: "WUJI Tech 实习" }, href: "https://wuji.tech/zh/" },
            },
            {
              label: "date",
              text: { en: "2026 · arXiv preprint", zh: "2026 · arXiv 预印本" },
              link: { text: "2609.07398", href: "https://arxiv.org/abs/2609.07398" },
            },
          ],
        },
      ],
      footnote: {
        label: { en: "ARCHIVED / SIDE PROJECT", zh: "已归档 / 业余项目" },
        text: {
          en: "HsuBlog — an earlier Astro theme, kept here as a small footnote",
          zh: "HsuBlog —— 早期的一个 Astro 主题，作为小小的脚注留在这里",
        },
        href: "https://github.com/KraHsu/HsuBlog",
      },
    },

    {
      id: "engineering",
      type: "projects",
      label: { en: "Engineering", zh: "工程" },
      kicker: { en: "TOOLS, SYSTEMS, EXPERIMENTS", zh: "工具、系统与实验" },
      title: { en: "Different problems,\n*same curiosity.*", zh: "不同的问题，\n*同样的好奇。*" },
      aside: {
        en: "GeneLab and Parley belong here: engineering projects around the research, with their own visual language.",
        zh: "GeneLab 和 Parley 属于这里：围绕研究展开的工程项目，各自有自己的视觉语言。",
      },
      itemLabel: { en: "ENGINEERING", zh: "工程" },
      items: [
        {
          name: "GeneLab",
          repo: "KraHsu/GeneLab",
          image: { src: "genelab-promo.svg", width: 1200, height: 720 },
          description: {
            en: "An Isaac Lab–style API for RL and robotics research, powered by Genesis.",
            zh: "一套 Isaac Lab 风格的强化学习与机器人研究 API，基于 Genesis 构建。",
          },
        },
        {
          name: "Parley",
          repo: "KraHsu/parley",
          image: { src: "parley-hero-light.svg", dark: "parley-hero-dark.svg", width: 1600, height: 520 },
          description: {
            en: "An open-source language practice workspace for chat, explanations, vocabulary, and review.",
            zh: "一个开源的语言练习工作台，支持对话、讲解、词汇与复习。",
          },
        },
      ],
      footnote: {
        label: { en: "MORE EXPERIMENTS", zh: "更多实验" },
        text: { en: "Everything else lives on GitHub", zh: "其余项目都在 GitHub 上" },
        href: "https://github.com/KraHsu?tab=repositories",
      },
    },

    {
      id: "notes",
      type: "quote",
      label: { en: "Notes", zh: "随笔" },
      kicker: { en: "A LINE I KEEP COMING BACK TO", zh: "一句我时常回想的话" },
      quote: {
        en: "“The best tools disappear just enough for the idea to come through.”",
        zh: "“最好的工具，恰到好处地隐去自身，让想法得以显现。”",
      },
      caption: {
        en: "I write about frontend systems, research tooling, and the places where engineering becomes a design problem.",
        zh: "我写前端系统、研究工具，以及工程变成设计问题的那些地方。",
      },
      link: { text: { en: "Read the archived blog", zh: "阅读已归档的博客" }, href: "https://hsublog.pages.dev" },
    },
  ],

  contact: {
    kicker: { en: "KEEP IN TOUCH", zh: "保持联系" },
    status: { en: "OPEN TABS", zh: "标签页常开" },
    title: { en: "Say hello\n*when you feel like it.*", zh: "想打招呼时，\n*随时都好。*" },
    email: "charles040318@gmail.com",
    links: [
      { text: "GitHub", href: "https://github.com/KraHsu" },
      { text: { en: "Bilibili", zh: "哔哩哔哩" }, href: "https://space.bilibili.com/86698256" },
    ],
    signature: { en: "made between the lab and the browser", zh: "诞生于实验室与浏览器之间" },
  },
};
