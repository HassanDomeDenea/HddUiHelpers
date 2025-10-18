import { Paragraph } from '@tiptap/extension-paragraph';

export const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute('class'),
        renderHTML: (attributes) => {
          return { class: attributes.class };
        },
      },
      data: {
        default: {},
        parseHTML: (element) => {
          // collect all data-* attributes
          const dataset: Record<string, string> = {};
          for (const attr of Array.from(element.attributes)) {
            if (attr.name.startsWith('data-')) {
              dataset[attr.name] = attr.value;
            }
          }
          return dataset;
        },
        renderHTML: (attributes) => {
          // render back all data-* attributes
          const result: Record<string, string> = {};
          for (const [key, value] of Object.entries(attributes.data || {})) {
            result[key] = value as any;
          }
          return result;
        },
      },
    };
  },
});
