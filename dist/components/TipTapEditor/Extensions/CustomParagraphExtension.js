import { Paragraph as s } from "@tiptap/extension-paragraph";
const o = s.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        parseHTML: (t) => t.getAttribute("class"),
        renderHTML: (t) => ({ class: t.class })
      },
      data: {
        default: {},
        parseHTML: (t) => {
          const r = {};
          for (const a of Array.from(t.attributes))
            a.name.startsWith("data-") && (r[a.name] = a.value);
          return r;
        },
        renderHTML: (t) => {
          const r = {};
          for (const [a, e] of Object.entries(t.data || {}))
            r[a] = e;
          return r;
        }
      }
    };
  }
});
export {
  o as CustomParagraph
};
