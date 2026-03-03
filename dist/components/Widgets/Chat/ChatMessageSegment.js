import { defineComponent as Y, resolveComponent as w, openBlock as v, createElementBlock as b, normalizeClass as d, unref as e, createElementVNode as s, createVNode as M, toDisplayString as l, createCommentVNode as _ } from "vue";
import { useBasicAuthStore as D } from "HddUiHelpers/stores/basicAuth.ts";
import u from "moment/moment";
const S = { class: "flex-grow-1 text-start" }, N = ["data-unread", "textContent"], V = { class: "dir-ltr flex items-center gap-1" }, A = ["textContent"], R = ["textContent"], B = ["title"], z = /* @__PURE__ */ Y({
  __name: "ChatMessageSegment",
  props: {
    message: {},
    activeContact: {}
  },
  emits: ["seen"],
  setup(a, { emit: h }) {
    const i = D(), y = h, { t: m } = useI18n(), g = useTemplateRef("mainMessageRef"), k = computed(() => i.user?.id), t = computed(() => a.message.sender_id === k.value), c = useNow({
      interval: 5e3
    }), x = computed(() => t.value ? i.user?.avatar_thumb_url : a.activeContact?.avatar_thumb_url), p = computed(() => u(c.value).format("YYYY-MM-DD")), C = computed(() => u(c.value).subtract(1, "day").format("YYYY-MM-DD")), f = computed(() => {
      const r = u(a.message.sent_at);
      if (Math.abs(r.diff(c.value, "hours")) < 13)
        return {
          date: r.locale(m("lang_code")).fromNow(),
          time: ""
        };
      const n = r.format("YYYY-MM-DD");
      let o = "";
      return p.value === n ? o = m("Today") : C.value === n ? o = m("Yesterday") : o = n, {
        date: o,
        time: r.format("HH:mm A")
      };
    });
    if (!t.value && !a.message.read_at) {
      const r = useElementVisibility(g, {
        once: !0,
        threshold: 0.9
        // rootMargin: '0px 0px 100px 0px',
      });
      watchOnce(r, (n) => {
        n === !0 && y("seen", a.message);
      });
    }
    return (r, n) => {
      const o = w("Avatar");
      return v(), b("div", {
        class: d(["m-1 flex gap-x-2 rounded-lg p-1", {
          "me-8 bg-blue-700/75 text-white dark:bg-blue-900/75": e(t),
          "border-1 ms-8 flex-row-reverse border-gray-400/55 bg-gray-100/45 dark:border-gray-500/55 dark:bg-gray-800/45": !e(t)
        }])
      }, [
        s("div", null, [
          M(o, {
            image: e(x) || void 0,
            icon: e(x) ? void 0 : "i-mdi-user",
            class: "shadow-zinc shadow",
            shape: "circle"
          }, null, 8, ["image", "icon"])
        ]),
        s("div", S, [
          s("div", {
            class: d(["text-secondary-3 text-sm", {
              "text-gray-200 dark:text-gray-300": e(t),
              "text-end font-bold text-blue-700 dark:text-blue-300": !e(t)
            }])
          }, l(e(t) ? e(i).user?.name : a.activeContact.name), 3),
          s("div", {
            ref_key: "mainMessageRef",
            ref: g,
            "data-unread": !e(t) && !a.message.read_at,
            class: "whitespace-pre-wrap text-start",
            dir: "auto",
            textContent: l(a.message.text)
          }, null, 8, N),
          s("div", {
            class: d(["mt-2 flex items-center justify-end gap-1 text-xs", {
              "flex-row-reverse text-blue-500 dark:text-blue-200": !e(t),
              "text-gray-200 dark:text-gray-300": e(t)
            }])
          }, [
            s("div", V, [
              s("span", {
                class: "inline-block",
                textContent: l(e(f).date)
              }, null, 8, A),
              s("span", {
                class: "inline-block text-[0.675rem]",
                textContent: l(e(f).time)
              }, null, 8, R)
            ]),
            e(t) && a.message.read_at ? (v(), b("i", {
              key: 0,
              title: a.message.read_at,
              class: "i-mdi-check-all mb-1px inline-block text-green-300 dark:text-green-500"
            }, null, 8, B)) : _("", !0),
            n[0] || (n[0] = s("i", { class: "i-mdi-clock-outline mb-1px inline-block pe-1" }, null, -1))
          ], 2)
        ])
      ], 2);
    };
  }
});
export {
  z as default
};
