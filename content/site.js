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
      zh: "Charles Hsu —— 研究物理 AI，设计界面，开发开源软件。",
    },
  },

  hero: {
    eyebrow: { en: "PHD RESEARCHER / PHYSICAL AI", zh: "博士研究生 / 物理 AI" },
    title: { en: "I make things\nthat *move*.", zh: "让智能\n*行动起来。*" },
    lede: {
      en: "I study intelligent systems in the physical world. I also make beautiful interfaces and open-source software because the tools we use should feel as considered as the ideas behind them.",
      zh: "我研究物理世界中的智能系统，也设计界面、开发开源软件。我相信，工具本身和背后的想法一样，都值得用心打磨。",
    },
    tags: [
      { en: "Web · Robotics · WAM · VLA", zh: "Web · 机器人 · WAM · VLA" },
      { en: "Former RoboMaster member", zh: "前 RoboMaster 队员" },
    ],
    core: { en: "PHYSICAL\nAI", zh: "物理\nAI" },
    artLabels: {
      top: { en: "01 — IN MOTION", zh: "01 — 运动中" },
      bottom: { en: "research / systems / form", zh: "研究 / 系统 / 形态" },
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
        zh: "从*思考*到*触碰*，中间还有多远？",
      },
      paragraphs: [
        {
          en: "I am a PhD student researching Physical AI — systems that perceive, reason, and act in the real world. My work lives somewhere between robotics, learning, simulation, and the messy details of making an idea actually run.",
          zh: "我是一名PhD，研究 Physical AI，也就是能在真实世界中感知、推理和行动的智能系统。我的研究涉及机器人、机器学习和仿真，也需要处理各种具体问题，让想法真正运行起来。",
        },
        {
          en: "When I am away from the lab, I design interfaces, maintain open-source tools, and obsess over the little moments that make software feel calm, clear, and surprisingly nice to use.",
          zh: "研究之余，我设计界面、维护开源工具。我喜欢琢磨使用中的细节，让软件清晰易懂，用起来轻松顺手，偶尔还能带来一点惊喜。",
        },
      ],
      interests: [
        { en: "01 / embodied intelligence", zh: "01 / 具身智能" },
        { en: "02 / interface craft", zh: "02 / 界面设计" },
        { en: "03 / open source", zh: "03 / 开源" },
      ],
    },

    {
      id: "research",
      type: "papers",
      label: { en: "Research", zh: "研究" },
      kicker: { en: "SELECTED PAPERS", zh: "代表论文" },
      title: { en: "Learning to act\n*in the physical world.*", zh: "学习如何\n*在真实世界中行动。*" },
      aside: {
        en: "Physical AI: how models perceive, predict, and act. Papers, preprints, and the code behind them.",
        zh: "研究模型如何在物理世界中感知、预测和行动。这里是我的相关论文和代码。",
      },
      itemLabel: { en: "PAPER", zh: "论文" },
      items: [
        {
          title: "OpenWAM",
          href: "https://github.com/OpenWAM-Official/OpenWAM",
          repo: "OpenWAM-Official/OpenWAM",
          image: { src: "openwam-title.webp", width: 2172, height: 425 },
          description: {
            en: "An open, modular research stack for World–Action Model pretraining, spanning infrastructure, controlled studies, and an open pretrained WAM.",
            zh: "一套开放、模块化的世界–动作模型（WAM）预训练研究工具体系，涵盖基础设施、对照实验，以及一个开放的 WAM 预训练模型。",
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
              link: { text: { en: "WUJI Tech internship", zh: "WUJI Tech internship" }, href: "https://wuji.tech/zh/" },
            },
            {
              label: "date",
              text: { en: "2026 · arXiv preprint", zh: "2026 · arXiv 预印本" },
              link: { text: "2609.07398", href: "https://arxiv.org/abs/2609.07398" },
            },
          ],
        },
      ],
    },

    {
      id: "engineering",
      type: "projects",
      label: { en: "Engineering", zh: "工程" },
      kicker: { en: "TOOLS, SYSTEMS, EXPERIMENTS", zh: "工具、系统与实验" },
      title: { en: "Different problems,\n*same curiosity.*", zh: "不同的问题，\n*同样的好奇心。*" },
      aside: {
        en: "Tools I build around the research, and open-source projects I help shape.",
        zh: "这里有我为研究开发的工具，也有我参与的开源项目。",
      },
      itemLabel: { en: "ENGINEERING", zh: "工程" },
      items: [
        {
          name: "GeneLab",
          repo: "KraHsu/GeneLab",
          image: { src: "genelab-promo.svg", width: 1200, height: 720 },
          description: {
            en: "An Isaac Lab–style API for RL and robotics research, powered by Genesis.",
            zh: "基于 Genesis，为强化学习和机器人研究提供 Isaac Lab 风格的 API。",
          },
        },
        {
          name: "Parley",
          repo: "KraHsu/parley",
          image: { src: "parley-hero-light.svg", dark: "parley-hero-dark.svg", width: 1600, height: 520 },
          description: {
            en: "An open-source language practice workspace for chat, explanations, vocabulary, and review.",
            zh: "一个开源语言练习工具，集对话练习、语言讲解、词汇学习和复习于一体。",
          },
        },
        {
          name: "ThoughtLite",
          repo: "tuyuritio/astro-theme-thought-lite",
          image: { src: "thoughtlite-preview-light.webp", dark: "thoughtlite-preview-dark.webp", width: 1400, height: 788 },
          description: {
            en: "A modern Astro theme focused on content creation. I contribute to it, and my blog runs on it.",
            zh: "一个专注于内容创作的现代 Astro 主题。我参与了这个项目的开发，自己的博客也用它搭建。",
          },
        },
      ],
      footnotes: [
        {
          label: { en: "ARCHIVED / SIDE PROJECT", zh: "已归档 / 业余项目" },
          text: {
            en: "HsuBlog — an earlier Astro theme, kept here as a small footnote",
            zh: "HsuBlog —— 早期做的一个 Astro 主题，留在这里作个记录",
          },
          href: "https://github.com/KraHsu/HsuBlog",
        },
        {
          label: { en: "MORE EXPERIMENTS", zh: "更多实验" },
          text: { en: "Everything else lives on GitHub", zh: "其余项目都在 GitHub 上" },
          href: "https://github.com/KraHsu?tab=repositories",
        },
      ],
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
        zh: "我在博客里记录前端系统和科研工具的开发，也聊聊工程实践中遇到的设计问题。",
      },
      link: { text: { en: "Read the blog", zh: "去博客看看" }, href: "https://blog.krahsu.top" },
    },
  ],

  contact: {
    kicker: { en: "KEEP IN TOUCH", zh: "保持联系" },
    status: { en: "OPEN TABS", zh: "总有标签页开着" },
    title: { en: "Say hello\n*when you feel like it.*", zh: "想聊聊？\n*随时来打个招呼。*" },
    email: "charles040318@gmail.com",
    links: [
      { text: "blog.krahsu.top", href: "https://blog.krahsu.top" },
      { text: "GitHub", href: "https://github.com/KraHsu" },
      { text: { en: "Bilibili", zh: "哔哩哔哩" }, href: "https://space.bilibili.com/86698256" },
    ],
    signature: { en: "made between the lab and the browser", zh: "诞生于实验室与浏览器之间" },
  },
};
