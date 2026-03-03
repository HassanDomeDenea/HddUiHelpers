import Y from "primevue/avatar";
import { defineComponent as w, useTemplateRef as M, computed as i, openBlock as b, createElementBlock as h, normalizeClass as u, unref as e, createElementVNode as s, createVNode as D, toDisplayString as l, createCommentVNode as S } from "vue";
import { useBasicAuthStore as N } from "HddUiHelpers/stores/basicAuth.ts";
import g from "moment/moment";
import { useI18n as V } from "vue-i18n";
import { useNow as R, useElementVisibility as A, watchOnce as B } from "@vueuse/core";
const E = { class: "flex-grow-1 text-start" }, I = ["data-unread", "textContent"], T = { class: "dir-ltr flex items-center gap-1" }, z = ["textContent"], H = ["textContent"], U = ["title"], K = /* @__PURE__ */ w({
  __name: "ChatMessageSegment",
  props: {
    message: {},
    activeContact: {}
  },
  emits: ["seen"],
  setup(a, { emit: y }) {
    const m = N(), k = y, { t: c } = V(), x = M("mainMessageRef"), _ = i(() => m.user?.id), t = i(() => a.message.sender_id === _.value), d = R({
      interval: 5e3
    }), f = i(() => t.value ? m.user?.avatar_thumb_url : a.activeContact?.avatar_thumb_url), p = i(() => g(d.value).format("YYYY-MM-DD")), C = i(() => g(d.value).subtract(1, "day").format("YYYY-MM-DD")), v = i(() => {
      const r = g(a.message.sent_at);
      if (Math.abs(r.diff(d.value, "hours")) < 13)
        return {
          date: r.locale(c("lang_code")).fromNow(),
          time: ""
        };
      const n = r.format("YYYY-MM-DD");
      let o = "";
      return p.value === n ? o = c("Today") : C.value === n ? o = c("Yesterday") : o = n, {
        date: o,
        time: r.format("HH:mm A")
      };
    });
    if (!t.value && !a.message.read_at) {
      const r = A(x, {
        once: !0,
        threshold: 0.9
        // rootMargin: '0px 0px 100px 0px',
      });
      B(r, (n) => {
        n === !0 && k("seen", a.message);
      });
    }
    return (r, n) => {
      const o = Y;
      return b(), h("div", {
        class: u(["m-1 flex gap-x-2 rounded-lg p-1", {
          "me-8 bg-blue-700/75 text-white dark:bg-blue-900/75": e(t),
          "border-1 ms-8 flex-row-reverse border-gray-400/55 bg-gray-100/45 dark:border-gray-500/55 dark:bg-gray-800/45": !e(t)
        }])
      }, [
        s("div", null, [
          D(o, {
            image: e(f) || void 0,
            icon: e(f) ? void 0 : "i-mdi-user",
            class: "shadow-zinc shadow",
            shape: "circle"
          }, null, 8, ["image", "icon"])
        ]),
        s("div", E, [
          s("div", {
            class: u(["text-secondary-3 text-sm", {
              "text-gray-200 dark:text-gray-300": e(t),
              "text-end font-bold text-blue-700 dark:text-blue-300": !e(t)
            }])
          }, l(e(t) ? e(m).user?.name : a.activeContact.name), 3),
          s("div", {
            ref_key: "mainMessageRef",
            ref: x,
            "data-unread": !e(t) && !a.message.read_at,
            class: "whitespace-pre-wrap text-start",
            dir: "auto",
            textContent: l(a.message.text)
          }, null, 8, I),
          s("div", {
            class: u(["mt-2 flex items-center justify-end gap-1 text-xs", {
              "flex-row-reverse text-blue-500 dark:text-blue-200": !e(t),
              "text-gray-200 dark:text-gray-300": e(t)
            }])
          }, [
            s("div", T, [
              s("span", {
                class: "inline-block",
                textContent: l(e(v).date)
              }, null, 8, z),
              s("span", {
                class: "inline-block text-[0.675rem]",
                textContent: l(e(v).time)
              }, null, 8, H)
            ]),
            e(t) && a.message.read_at ? (b(), h("i", {
              key: 0,
              title: a.message.read_at,
              class: "i-mdi-check-all mb-1px inline-block text-green-300 dark:text-green-500"
            }, null, 8, U)) : S("", !0),
            n[0] || (n[0] = s("i", { class: "i-mdi-clock-outline mb-1px inline-block pe-1" }, null, -1))
          ], 2)
        ])
      ], 2);
    };
  }
});
export {
  K as default
};
