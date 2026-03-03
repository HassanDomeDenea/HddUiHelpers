import { defineComponent as y, useTemplateRef as b, ref as s, onMounted as D, onBeforeUnmount as E, openBlock as h, createElementBlock as B, normalizeClass as L, unref as u, createElementVNode as m, toDisplayString as k, createCommentVNode as Z } from "vue";
import { useDropZone as x } from "@vueuse/core";
import { useI18n as C } from "vue-i18n";
const T = /* @__PURE__ */ y({
  __name: "HddFilesDropZone",
  props: {
    accept: { default: () => ["image/jpeg", "image/png", "image/webp", "image/gif"] },
    multiple: { type: Boolean, default: !0 }
  },
  emits: ["upload"],
  setup(n, { emit: p }) {
    const f = p, r = b("dropZoneRef"), { t: c } = C(), { isOverDropZone: g } = x(r, {
      onDrop: v,
      dataTypes: n.accept,
      multiple: n.multiple,
      // whether to prevent default behavior for unhandled events
      preventDefaultForUnhandled: !1
    });
    function v(e) {
      e && f("upload", e);
    }
    const o = s(!1), t = s(0);
    function a(e) {
      t.value++, e.dataTransfer?.types.includes("Files") && (o.value = !0);
    }
    function d() {
      t.value--, t.value === 0 && (o.value = !1);
    }
    function l(e) {
      t.value = 0, o.value = !1;
    }
    return D(() => {
      document.body.addEventListener("dragenter", a), document.body.addEventListener("dragleave", d), document.body.addEventListener("drop", l);
    }), E(() => {
      document.body.removeEventListener("dragenter", a), document.body.removeEventListener("dragleave", d), document.body.removeEventListener("drop", l);
    }), (e, i) => o.value ? (h(), B("div", {
      key: 0,
      ref_key: "dropZoneRef",
      ref: r,
      class: L(["light:border-amber-700 border-1 m-1 flex min-h-24 items-center justify-center gap-1 rounded-lg border-dashed p-1 text-lg dark:border-amber-300", { "light:bg-yellow-100/25 dark:bg-yellow-900/25": u(g) }])
    }, [
      i[0] || (i[0] = m("i", { class: "i-material-symbols:upload-sharp" }, null, -1)),
      m("span", null, k(u(c)("Drop Files Here to Upload")), 1)
    ], 2)) : Z("", !0);
  }
});
export {
  T as default
};
