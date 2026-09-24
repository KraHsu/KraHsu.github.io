// Shapes for content/site.js. Referenced via JSDoc so editors can autocomplete and type-check the config.

/** Text that differs per language. `en` is required and is the fallback for missing translations. */
export interface Localized<T = string> {
  en: T;
  zh?: T;
}

/** Plain value (same in every language) or a per-language value. */
export type Text = string | Localized;

/**
 * Text with light markup, used for display titles:
 * `*word*` renders as the accent-coloured emphasis and `\n` as a line break.
 */
export type RichText = Text;

/** A file name in content/images/ or an absolute URL. */
export type ImageSource =
  | string
  | {
      src: string;
      /** Alternative shown when the reader prefers a dark colour scheme. */
      dark?: string;
      /** Intrinsic size, so the browser can reserve space before the image loads. */
      width?: number;
      height?: number;
      alt?: Text;
    };

export interface Link {
  text: Text;
  href: string;
}

export interface Footnote {
  /** Small mono label on the left, e.g. "ARCHIVED / SIDE PROJECT". */
  label: Text;
  text: Text;
  href: string;
}

export interface Author {
  name: string;
  /** Superscript marks such as "*", "‡", or "†". */
  marks?: string;
  /** Highlights the site owner's name. */
  self?: boolean;
}

export interface PaperMetaRow {
  /** "context", "date", or "venue" use the built-in translated labels; anything else is shown as given. */
  label: "context" | "date" | "venue" | Text;
  text?: Text;
  /** Optional trailing link, e.g. an arXiv id. When `text` is omitted the link is the whole value. */
  link?: Link;
}

export interface Paper {
  title: string;
  /** Where the title and artwork link to (repository, project page, or paper). */
  href: string;
  /** "owner/name" on GitHub; shows a live star count. */
  repo?: string;
  image?: ImageSource;
  description: Text;
  authors?: Author[];
  /** Explains the author marks, e.g. "* equal contribution · † equal advising". */
  authorNotes?: Text;
  /** How many authors to show before collapsing. Defaults to at least 5, always including `self`. */
  visibleAuthors?: number;
  meta?: PaperMetaRow[];
}

export interface Project {
  name: string;
  /** Defaults to https://github.com/<repo>. */
  href?: string;
  repo?: string;
  image?: ImageSource;
  description: Text;
}

interface SectionBase {
  /** Anchor id; also used by the navigation. */
  id: string;
  /** Short name shown in the navigation and the section index. */
  label: Text;
  /** Set to false to keep the section out of the top navigation. */
  nav?: boolean;
  kicker?: Text;
  title?: RichText;
  aside?: Text;
}

export interface AboutSection extends SectionBase {
  type: "about";
  paragraphs: Text[];
  interests?: Text[];
}

export interface PapersSection extends SectionBase {
  type: "papers";
  /** Label next to each card's running number, e.g. "PAPER + CODE" → "01 / PAPER + CODE". */
  itemLabel: Text;
  items: Paper[];
  footnote?: Footnote;
}

export interface ProjectsSection extends SectionBase {
  type: "projects";
  itemLabel: Text;
  items: Project[];
  footnote?: Footnote;
}

export interface QuoteSection extends SectionBase {
  type: "quote";
  quote: Text;
  caption?: Text;
  link?: Link;
}

export type Section = AboutSection | PapersSection | ProjectsSection | QuoteSection;

export interface SiteConfig {
  /** Canonical origin, without a trailing slash. */
  url: string;
  name: string;
  avatar: string;
  github: string;
  meta: { title: Text; description: Text };
  hero: {
    eyebrow: Text;
    title: RichText;
    lede: Text;
    tags: Text[];
    /** Label inside the orbit's core; `\n` breaks the line. */
    core: Text;
    artLabels: { top: Text; bottom: Text };
    coordinates: [string, string];
  };
  marquee: Localized<string[]>;
  /** Rendered in order; numbering, navigation, and card numbers follow this order. */
  sections: Section[];
  contact: {
    kicker: Text;
    status: Text;
    title: RichText;
    email: string;
    links: Link[];
    signature: Text;
  };
}
