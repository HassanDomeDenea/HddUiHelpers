import { defineComponent as v, unref as t, openBlock as y, createElementBlock as b, normalizeClass as D, createElementVNode as u, toDisplayString as E, createCommentVNode as h } from "vue";
const L = /* @__PURE__ */ v({
  __name: "HddFilesDropZone",
  props: {
    accept: { default: () => ["image/jpeg", "image/png", "image/webp", "image/gif"] },
    multiple: { type: Boolean, default: !0 }
  },
  emits: ["upload"],
  setup(r, { emit: m }) {
    const p = m, a = useTemplateRef("dropZoneRef"), { t: c } = useI18n(), { isOverDropZone: f } = useDropZone(a, {
      onDrop: g,
      dataTypes: r.accept,
      multiple: r.multiple,
      // whether to prevent default behavior for unhandled events
      preventDefaultForUnhandled: !1
    });
    function g(e) {
      e && p("upload", e);
    }
    const n = ref(!1), o = ref(0);
    function d(e) {
      o.value++, e.dataTransfer?.types.includes("Files") && (n.value = !0);
    }
    function l() {
      o.value--, o.value === 0 && (n.value = !1);
    }
    function s(e) {
      o.value = 0, n.value = !1;
    }
    return onMounted(() => {
      document.body.addEventListener("dragenter", d), document.body.addEventListener("dragleave", l), document.body.addEventListener("drop", s);
    }), onBeforeUnmount(() => {
      document.body.removeEventListener("dragenter", d), document.body.removeEventListener("dragleave", l), document.body.removeEventListener("drop", s);
    }), (e, i) => t(n) ? (y(), b("div", {
      key: 0,
      ref_key: "dropZoneRef",
      ref: a,
      class: D(["light:border-amber-700 border-1 m-1 flex min-h-24 items-center justify-center gap-1 rounded-lg border-dashed p-1 text-lg dark:border-amber-300", { "light:bg-yellow-100/25 dark:bg-yellow-900/25": t(f) }])
    }, [
      i[0] || (i[0] = u("i", { class: "i-material-symbols:upload-sharp" }, null, -1)),
      u("span", null, E(t(c)("Drop Files Here to Upload")), 1)
    ], 2)) : h("", !0);
  }
});
export {
  L as default
};
