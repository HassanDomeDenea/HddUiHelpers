import { defineComponent as p, useTemplateRef as w, computed as l, resolveComponent as M, openBlock as f, createElementBlock as b, normalizeClass as d, createElementVNode as a, createVNode as _, toDisplayString as o, unref as D, createCommentVNode as S } from "vue";
import { useNow as N, useElementVisibility as V, watchOnce as A } from "@vueuse/core";
import { useBasicAuthStore as R } from "HddUiHelpers/stores/basicAuth.ts";
import u from "moment/moment";
import { useI18n as B } from "vue-i18n";
const E = { class: "flex-grow-1 text-start" }, I = ["data-unread", "textContent"], T = { class: "dir-ltr flex items-center gap-1" }, z = ["textContent"], H = ["textContent"], U = ["title"], J = /* @__PURE__ */ p({
  __name: "ChatMessageSegment",
  props: {
    message: {},
    activeContact: {}
  },
  emits: ["seen"],
  setup(t, { emit: h }) {
    const i = R(), y = h, { t: m } = B(), g = w("mainMessageRef"), k = l(() => i.user?.id), e = l(() => t.message.sender_id === k.value), c = N({
      interval: 5e3
    }), v = l(() => e.value ? i.user?.avatar_thumb_url : t.activeContact?.avatar_thumb_url), C = l(() => u(c.value).format("YYYY-MM-DD")), Y = l(() => u(c.value).subtract(1, "day").format("YYYY-MM-DD")), x = l(() => {
      const n = u(t.message.sent_at);
      if (Math.abs(n.diff(c.value, "hours")) < 13)
        return {
          date: n.locale(m("lang_code")).fromNow(),
          time: ""
        };
      const s = n.format("YYYY-MM-DD");
      let r = "";
      return C.value === s ? r = m("Today") : Y.value === s ? r = m("Yesterday") : r = s, {
        date: r,
        time: n.format("HH:mm A")
      };
    });
    if (!e.value && !t.message.read_at) {
      const n = V(g, {
        once: !0,
        threshold: 0.9
        // rootMargin: '0px 0px 100px 0px',
      });
      A(n, (s) => {
        s === !0 && y("seen", t.message);
      });
    }
    return (n, s) => {
      const r = M("Avatar");
      return f(), b("div", {
        class: d(["m-1 flex gap-x-2 rounded-lg p-1", {
          "me-8 bg-blue-700/75 text-white dark:bg-blue-900/75": e.value,
          "border-1 ms-8 flex-row-reverse border-gray-400/55 bg-gray-100/45 dark:border-gray-500/55 dark:bg-gray-800/45": !e.value
        }])
      }, [
        a("div", null, [
          _(r, {
            image: v.value || void 0,
            icon: v.value ? void 0 : "i-mdi-user",
            class: "shadow-zinc shadow",
            shape: "circle"
          }, null, 8, ["image", "icon"])
        ]),
        a("div", E, [
          a("div", {
            class: d(["text-secondary-3 text-sm", {
              "text-gray-200 dark:text-gray-300": e.value,
              "text-end font-bold text-blue-700 dark:text-blue-300": !e.value
            }])
          }, o(e.value ? D(i).user?.name : t.activeContact.name), 3),
          a("div", {
            ref_key: "mainMessageRef",
            ref: g,
            "data-unread": !e.value && !t.message.read_at,
            class: "whitespace-pre-wrap text-start",
            dir: "auto",
            textContent: o(t.message.text)
          }, null, 8, I),
          a("div", {
            class: d(["mt-2 flex items-center justify-end gap-1 text-xs", {
              "flex-row-reverse text-blue-500 dark:text-blue-200": !e.value,
              "text-gray-200 dark:text-gray-300": e.value
            }])
          }, [
            a("div", T, [
              a("span", {
                class: "inline-block",
                textContent: o(x.value.date)
              }, null, 8, z),
              a("span", {
                class: "inline-block text-[0.675rem]",
                textContent: o(x.value.time)
              }, null, 8, H)
            ]),
            e.value && t.message.read_at ? (f(), b("i", {
              key: 0,
              title: t.message.read_at,
              class: "i-mdi-check-all mb-1px inline-block text-green-300 dark:text-green-500"
            }, null, 8, U)) : S("", !0),
            s[0] || (s[0] = a("i", { class: "i-mdi-clock-outline mb-1px inline-block pe-1" }, null, -1))
          ], 2)
        ])
      ], 2);
    };
  }
});
export {
  J as default
};
