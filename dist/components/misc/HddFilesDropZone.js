import { defineComponent as y, useTemplateRef as b, ref as u, onMounted as D, onBeforeUnmount as E, unref as n, openBlock as h, createElementBlock as B, normalizeClass as L, createElementVNode as m, toDisplayString as k, createCommentVNode as Z } from "vue";
import { useI18n as x } from "vue-i18n";
import { useDropZone as C } from "@vueuse/core";
const T = /* @__PURE__ */ y({
  __name: "HddFilesDropZone",
  props: {
    accept: { default: () => ["image/jpeg", "image/png", "image/webp", "image/gif"] },
    multiple: { type: Boolean, default: !0 }
  },
  emits: ["upload"],
  setup(r, { emit: p }) {
    const f = p, a = b("dropZoneRef"), { t: c } = x(), { isOverDropZone: g } = C(a, {
      onDrop: v,
      dataTypes: r.accept,
      multiple: r.multiple,
      // whether to prevent default behavior for unhandled events
      preventDefaultForUnhandled: !1
    });
    function v(e) {
      e && f("upload", e);
    }
    const o = u(!1), t = u(0);
    function d(e) {
      t.value++, e.dataTransfer?.types.includes("Files") && (o.value = !0);
    }
    function l() {
      t.value--, t.value === 0 && (o.value = !1);
    }
    function i(e) {
      t.value = 0, o.value = !1;
    }
    return D(() => {
      document.body.addEventListener("dragenter", d), document.body.addEventListener("dragleave", l), document.body.addEventListener("drop", i);
    }), E(() => {
      document.body.removeEventListener("dragenter", d), document.body.removeEventListener("dragleave", l), document.body.removeEventListener("drop", i);
    }), (e, s) => n(o) ? (h(), B("div", {
      key: 0,
      ref_key: "dropZoneRef",
      ref: a,
      class: L(["light:border-amber-700 border-1 m-1 flex min-h-24 items-center justify-center gap-1 rounded-lg border-dashed p-1 text-lg dark:border-amber-300", { "light:bg-yellow-100/25 dark:bg-yellow-900/25": n(g) }])
    }, [
      s[0] || (s[0] = m("i", { class: "i-material-symbols:upload-sharp" }, null, -1)),
      m("span", null, k(n(c)("Drop Files Here to Upload")), 1)
    ], 2)) : Z("", !0);
  }
});
export {
  T as default
};
