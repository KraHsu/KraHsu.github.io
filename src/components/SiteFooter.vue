<script setup>
import { useContent } from "../content";
import RichText from "./RichText.js";

const { site, l } = useContent();
const contact = site.contact;
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer-section" id="contact">
    <div class="section footer-inner">
      <div class="footer-top mono-label"><p class="section-kicker">{{ site.contactNumber }} / {{ l(contact.kicker) }}</p><span class="footer-status"><span class="live-dot"></span> {{ l(contact.status) }}</span></div>
      <div class="footer-main">
        <RichText tag="h2" class="display-title" :text="l(contact.title)" />
        <div class="footer-links">
          <a :href="`mailto:${contact.email}`">{{ contact.email }} ↗</a>
          <a v-for="link in contact.links" :key="link.href" :href="link.href" target="_blank" rel="noreferrer">{{ l(link.text) }} ↗</a>
        </div>
      </div>
      <div class="footer-bottom mono-label"><span>© {{ year }} {{ site.name }}</span><span>{{ l(contact.signature) }}</span></div>
    </div>
  </footer>
</template>

<style scoped>
.footer-section { background: var(--footer-bg); }
.footer-inner { padding: 36px 0 22px; }
.footer-top { display: flex; justify-content: space-between; }
.footer-status { color: var(--muted); font-size: 10px; }
.footer-main { display: flex; align-items: end; justify-content: space-between; gap: 80px; padding: 130px 0 160px; }
.footer-main .display-title { max-width: 720px; margin-bottom: 0; font-size: clamp(50px, 7vw, 96px); }
.footer-links { display: flex; min-width: 190px; flex-direction: column; gap: 17px; color: var(--muted); font: 400 14px var(--mono); }
.footer-links a { transition: color .2s ease; }
.footer-links a:hover { color: var(--accent); }
.footer-bottom { display: flex; justify-content: space-between; gap: 20px; padding-top: 19px; border-top: 1px solid var(--line-strong); color: var(--faint); font-size: 11px; }

@media (max-width: 800px) {
  .footer-main { display: block; padding: 100px 0 105px; }
  .footer-main .display-title { font-size: clamp(42px, 12vw, 68px); }
  .footer-links { margin-top: 58px; }
  .footer-bottom { flex-direction: column; }
}
</style>
