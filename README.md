# Charles Hsu — personal homepage

An English-first personal homepage for Charles Hsu, a Physical AI PhD researcher, interface maker, and open-source builder.

The page is currently intended for iteration and review. It is not configured for formal deployment yet.

## Stack

Vue 3 + Vite, with [vue-i18n](https://vue-i18n.intlify.dev/) for English (default) and Simplified Chinese.

```sh
npm install
npm run dev      # local dev server
npm run build    # static output in dist/
npm run preview  # serve the built site
```

## Layout

- `src/components/` — one component per page section
- `src/locales/{en,zh-CN}.json` — all translatable copy; keep keys in sync
- `src/i18n.js` — locale setup; the chosen language is persisted in `localStorage`
- `src/styles.css` — global styles (includes `:lang(zh-CN)` typography tweaks)

Inline markup inside translated sentences (`<em>`, `<br>`) is passed through `<i18n-t>` slots, e.g. `"title": "I make things{br}that {move}."`.
