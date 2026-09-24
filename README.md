# Charles Hsu — personal homepage

An English-first personal homepage for Charles Hsu, a Physical AI PhD researcher, interface maker, and open-source builder.

The page is currently intended for iteration and review. It is not configured for formal deployment yet.

## Stack

Vue 3 + Vite, prerendered with [vite-ssg](https://github.com/antfu-collective/vite-ssg). [vue-i18n](https://vue-i18n.intlify.dev/) serves English at `/` (default) and Simplified Chinese at `/zh/`.

```sh
npm install
npm run dev      # local dev server
npm run build    # prerendered static output in dist/ (index.html + zh/index.html)
npm run preview  # serve the built site
```

## Editing content

All content lives in `content/`. You shouldn't need to touch components to add things.

- `content/site.js`: the whole page (profile, hero, sections, papers, projects, contact)
- `content/images/`: artwork referenced by file name from `site.js`
- `content/types.d.ts`: every available field; editors autocomplete `site.js` from it

Conventions:

- Translatable fields are `{ en: "…", zh: "…" }`; a plain string is used for every language.
- Titles accept `*emphasis*` (accent colour) and `\n` (line break).
- Sections render in the order listed. Section numbers, card numbers, navigation, and anchors are generated from that order.
- `npm run dev` warns in the console about any `{ en }` missing its `zh`. A misspelled image name fails the build.

**Add a paper**: append to the `items` of the `type: "papers"` section:

```js
{
  title: "MyPaper",
  href: "https://github.com/me/my-paper",   // title + artwork link
  repo: "me/my-paper",                      // optional: live GitHub stars
  image: { src: "my-paper.webp", width: 1600, height: 900 },  // optional, file in content/images/
  description: { en: "…", zh: "…" },
  authors: [{ name: "Chenhao Zhang", marks: "*", self: true }, { name: "…" }],
  authorNotes: { en: "* equal contribution", zh: "* 同等贡献" },
  meta: [
    { label: "venue", text: "CoRL 2026" },
    { label: "date", text: "2026", link: { text: "arXiv", href: "https://arxiv.org/abs/…" } },
  ],
}
```

**Add a project**: append `{ name, repo, image, description }` to the `type: "projects"` section (`href` defaults to the GitHub repo).

**Add a section**: add an entry to `sections` with one of the types `about`, `papers`, `projects`, `quote`. It appears in the navigation automatically (`nav: false` hides it).

## Code layout

- `src/content/index.js`: loads `content/site.js`, resolves images, numbers sections and cards, and provides `useContent()`
- `src/pages/HomePage.vue`: page shell, `<head>` tags, and cursor glow
- `src/components/sections/`: one component per section type
- `src/composables/`: scroll spy (`useActiveSection`) and GitHub star counts (`useRepoStars`)
- `src/locales/{en,zh-CN}.json`: interface strings only (labels, accessibility text)
- `src/styles.css`: design tokens (light and dark), base styles, and shared section scaffolding
- `public/`: favicon, touch icon, and `og.png` share image
