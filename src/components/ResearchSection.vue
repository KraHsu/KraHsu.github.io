<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const repo = "https://github.com/OpenWAM-Official/OpenWAM";
const authors = [
  { name: "Yuran Wang", sup: "*‡" },
  { name: "Siqiao Huang", sup: "*‡" },
  { name: "Mingleyang Li", sup: "*" },
  { name: "Chenhao Zhang", sup: "*", self: true },
  { name: "Jiaqi Liang", sup: "*" },
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
  { name: "Lin Shao", sup: "†" },
  { name: "Hang Zhao", sup: "†" },
];
</script>

<template>
  <section v-reveal class="section work-section reveal" id="research">
    <div class="section-index">02 <span>{{ t("research.index") }}</span></div>
    <div class="work-content">
      <div class="section-head">
        <div>
          <p class="section-kicker">{{ t("research.kicker") }}</p>
          <i18n-t keypath="research.title" tag="h2" scope="global">
            <template #br><br /></template>
            <template #open><em>{{ t("research.open") }}</em></template>
          </i18n-t>
        </div>
        <p class="section-aside">{{ t("research.aside") }}</p>
      </div>
      <div class="work-grid research-grid">
        <article class="work-item work-item-large research-entry">
          <div class="work-top"><span>{{ t("research.tag") }}</span><span>OPENWAM</span></div>
          <a class="project-media" :href="repo" target="_blank" rel="noreferrer" :aria-label="t('a11y.openwamRepo')"><img src="https://raw.githubusercontent.com/OpenWAM-Official/OpenWAM/main/assets/repo_images/openwam_title.png" :alt="t('a11y.openwamImage')" loading="lazy" /></a>
          <h3><a class="project-title" :href="repo" target="_blank" rel="noreferrer">OpenWAM <span>↗</span></a></h3>
          <p>{{ t("research.openwam") }}</p>
          <div class="paper-meta">
            <div class="paper-meta-row">
              <span class="paper-meta-label">{{ t("research.authors") }}</span>
              <span class="paper-meta-value author-list">
                <template v-for="(author, index) in authors" :key="author.name"><template v-if="index > 0"> · </template><component :is="author.self ? 'strong' : 'span'">{{ author.name }}<sup v-if="author.sup">{{ author.sup }}</sup></component></template>
                <span class="author-key">{{ t("research.authorKey") }}</span>
              </span>
            </div>
            <div class="paper-meta-row"><span class="paper-meta-label">{{ t("research.context") }}</span><a class="paper-meta-value" href="https://wuji.tech/zh/" target="_blank" rel="noreferrer">{{ t("research.contextValue") }} ↗</a></div>
            <div class="paper-meta-row"><span class="paper-meta-label">{{ t("research.date") }}</span><span class="paper-meta-value">{{ t("research.dateValue") }} <a href="https://arxiv.org/abs/2609.07398" target="_blank" rel="noreferrer">2609.07398 ↗</a></span></div>
          </div>
        </article>
      </div>
      <div class="archived-note"><span>{{ t("research.archivedLabel") }}</span><a href="https://github.com/KraHsu/HsuBlog" target="_blank" rel="noreferrer">{{ t("research.archivedLink") }} ↗</a></div>
    </div>
  </section>
</template>
