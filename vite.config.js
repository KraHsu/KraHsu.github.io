import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

export default defineConfig({
  plugins: [
    vue(),
    // Precompile locale files so the runtime-only vue-i18n build (no message compiler) is enough.
    VueI18nPlugin({ include: fileURLToPath(new URL("./src/locales/**", import.meta.url)) }),
  ],
  ssgOptions: {
    dirStyle: "nested",
    includedRoutes: () => ["/", "/zh/"],
  },
});
