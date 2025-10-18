import { mergeAttributes, Node } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3';

import Component from './TipTapPageBreakerNode.vue';
// import { canInsertNode, isNodeSelection, mergeAttributes, Node, nodeInputRule } from "@tiptap/core";
// import { NodeSelection, TextSelection } from "@tiptap/pm/state";

export default Node.create({
  name: 'TipTapPageBreakerNode',

  group: 'block',

  atom: true,

  addAttributes() {
    return {};
  },
  addCommands() {
    return {
      setPageBreak:
        () =>
        ({ commands, chain, state }) => {
          return commands.first([
            () => commands.exitCode(),
            () =>
              commands.command(() => {
                const { selection } = state;
                if (selection.$from.parent.type.spec.isolating) {
                  return false;
                }
                return chain().insertContent({ type: this.name }).run();
              }),
          ]);
        },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'tip-tap-page-breaker-node',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['tip-tap-page-breaker-node', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return VueNodeViewRenderer(Component);
  },
});

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    TipTapPageBreakerNode: {
      /**
       * Add a page break
       * @example editor.commands.setPageBreak()
       */
      setPageBreak: () => ReturnType;
    };
  }
}
