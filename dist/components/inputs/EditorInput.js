import { defineComponent as g, useModel as w, ref as V, computed as C, resolveComponent as A, openBlock as I, createBlock as L, mergeProps as r, unref as u, withCtx as d, createVNode as k, createElementVNode as e, createCommentVNode as z, mergeModels as m } from "vue";
import { useHddBaseInputUtils as E } from "HddUiHelpers/components/inputs/inputsUtils.ts";
import t from "quill";
import { _ as M } from "../../BaseInput.vue_vue_type_script_setup_true_lang-C8yTwTDa.js";
const _ = /* @__PURE__ */ g({
  __name: "EditorInput",
  props: /* @__PURE__ */ m({
    autocomplete: {},
    icon: {},
    uniqueId: {},
    modelValue: {},
    label: {},
    labelMinWidth: {},
    variant: {},
    iconAsAddon: { type: Boolean },
    onLocalEnterKeyDown: { type: Function },
    floatingLabel: { type: Boolean },
    showErrorMessage: { type: Boolean },
    floatingLabelVariant: {},
    infieldTopAlignedLabel: { type: Boolean },
    inputId: {},
    required: { type: Boolean },
    showRequiredAsterisk: { type: Boolean },
    requiredInLabel: { type: Boolean },
    formName: {},
    name: {},
    error: { type: [String, Boolean] },
    helperText: {},
    placeholder: {},
    autoI18nLabel: { type: Boolean },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    inline: { type: Boolean },
    controlBeforeLabel: { type: Boolean },
    labelSingleLine: { type: Boolean },
    hideLabelDoubleDots: { type: Boolean },
    ignoreLabelSelector: { type: Boolean },
    labelClass: {},
    labelStyle: { type: [Boolean, null, String, Object, Array] },
    iconClass: {},
    inputClass: {},
    wrapperClass: {},
    controlWrapperClass: {},
    size: {},
    buttonAddon: {},
    controlComponent: {},
    initialRows: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ m(["keydown", "change"], ["update:modelValue"]),
  setup(a, { expose: c, emit: S }) {
    const b = a, n = w(a, "modelValue"), s = V();
    function p() {
      s.value.$el.focus();
    }
    const i = t.import("attributors/class/font");
    i.whitelist = ["tajawal", "mirza", "amiri", "aref"], t.register(i, !0);
    const l = t.import("attributors/class/size");
    l.whitelist = [
      ...l.whitelist || [],
      "8px",
      "10px",
      "12px",
      !1,
      "14px",
      "16px",
      "18px",
      "20px",
      "22px",
      "24px",
      "26px",
      "28px",
      "30px",
      "36px",
      "40px",
      "48px"
    ], t.register(l, !0);
    const f = C(() => ({
      // toolbar: [{ direction: 'rtl' }, { direction: 'ltr' }],
      /*toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],
      
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction
      
            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
      
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],
      
            ['clean'], // remove formatting button
          ],*/
    })), { exposed: x, baseInputForwardedProps: y, fieldUniqueId: j, generalInputProps: q } = E(b);
    return c({ focus: p, ...x }), (D, o) => {
      const v = A("Editor");
      return I(), L(M, r(u(y), {
        class: "HDD_Quill_Editor",
        onClick: p
      }), {
        default: d(() => [
          k(v, r({ id: "fieldUniqueId" }, u(q), {
            ref_key: "inputRef",
            ref: s,
            modelValue: n.value,
            "onUpdate:modelValue": o[0] || (o[0] = (B) => n.value = B),
            modules: f.value
          }), {
            toolbar: d(() => [
              o[2] || (o[2] = e("span", { class: "ql-formats" }, [
                e("select", { class: "ql-font" }, [
                  e("option"),
                  e("option", { value: "tajawal" }, "Tajawal"),
                  e("option", { value: "amiri" }, "Amiri"),
                  e("option", { value: "mirza" }, "Mirza"),
                  e("option", { value: "aref" }, "Aref Ruqaa")
                ]),
                e("select", { class: "ql-size" }, [
                  e("option", { value: "10px" }, "10px"),
                  e("option", { selected: "" }),
                  e("option", { value: "14px" }, "14px"),
                  e("option", { value: "16px" }, "16px"),
                  e("option", { value: "18px" }, "18px"),
                  e("option", { value: "20px" }, "20px"),
                  e("option", { value: "24px" }, "24px"),
                  e("option", { value: "28px" }, "28px"),
                  e("option", { value: "30px" }, "30px"),
                  e("option", { value: "36px" }, "36px")
                ])
              ], -1)),
              o[3] || (o[3] = e("span", { class: "ql-formats" }, [
                e("button", {
                  class: "ql-bold",
                  type: "button"
                }),
                e("button", {
                  class: "ql-italic",
                  type: "button"
                }),
                e("button", {
                  class: "ql-underline",
                  type: "button"
                })
              ], -1)),
              o[4] || (o[4] = e("span", { class: "ql-formats" }, [
                e("select", { class: "ql-color" }),
                e("select", { class: "ql-background" })
              ], -1)),
              o[5] || (o[5] = e("span", { class: "ql-formats" }, [
                e("button", {
                  class: "ql-list",
                  value: "ordered",
                  type: "button"
                }),
                e("button", {
                  class: "ql-list",
                  value: "bullet",
                  type: "button"
                }),
                e("select", { class: "ql-align" }, [
                  e("option", { defaultValue: "" }),
                  e("option", { value: "center" }),
                  e("option", { value: "right" }),
                  e("option", { value: "justify" })
                ]),
                e("button", {
                  class: "ql-direction",
                  type: "button",
                  value: "rtl"
                })
              ], -1)),
              z("", !0),
              o[6] || (o[6] = e("span", { class: "ql-formats" }, [
                e("button", {
                  class: "ql-table",
                  type: "button"
                }),
                e("button", {
                  class: "ql-clean",
                  type: "button"
                })
              ], -1))
            ]),
            _: 1
          }, 16, ["modelValue", "modules"])
        ]),
        _: 1
      }, 16);
    };
  }
});
export {
  _ as default
};
