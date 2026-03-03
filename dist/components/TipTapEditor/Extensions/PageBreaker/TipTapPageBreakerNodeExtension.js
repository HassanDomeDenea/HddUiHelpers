import { Node as n, mergeAttributes as o } from "@tiptap/core";
import { VueNodeViewRenderer as i } from "@tiptap/vue-3";
import { _ as p } from "../../../../TipTapPageBreakerNode.vue_vue_type_script_setup_true_lang-HsODQlN_.js";
const m = n.create({
  name: "TipTapPageBreakerNode",
  group: "block",
  atom: !0,
  addAttributes() {
    return {};
  },
  addCommands() {
    return {
      setPageBreak: () => ({ commands: e, chain: r, state: t }) => e.first([
        () => e.exitCode(),
        () => e.command(() => {
          const { selection: a } = t;
          return a.$from.parent.type.spec.isolating ? !1 : r().insertContent({ type: this.name }).run();
        })
      ])
    };
  },
  parseHTML() {
    return [
      {
        tag: "tip-tap-page-breaker-node"
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["tip-tap-page-breaker-node", o(e)];
  },
  addNodeView() {
    return i(p);
  }
});
export {
  m as default
};
