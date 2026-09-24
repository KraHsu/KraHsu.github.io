import { h } from "vue";

// Renders config text with `*emphasis*` → <em> and `\n` → <br>, without resorting to v-html.
export default function RichText({ text = "", tag = "span" }) {
  const children = [];
  String(text).split("\n").forEach((line, lineIndex) => {
    if (lineIndex > 0) children.push(h("br"));
    line.split(/\*([^*]+)\*/).forEach((part, partIndex) => {
      if (!part) return;
      children.push(partIndex % 2 ? h("em", part) : part);
    });
  });
  return h(tag, children);
}

RichText.props = { text: String, tag: String };
