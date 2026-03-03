import { defineStore as d } from "pinia";
import { ref as i } from "vue";
const s = d("globalDragging", () => {
  const e = i(!1);
  let n = 0;
  function r(a) {
    n++, a.dataTransfer?.types.includes("Files") && (e.value = !0);
  }
  function t() {
    n--, n === 0 && (e.value = !1);
  }
  function o() {
    e.value = !1, n = 0;
  }
  return document.body.addEventListener("dragenter", r), document.body.addEventListener("dragleave", t), document.body.addEventListener("drop", o), {
    isDragging: e
  };
});
export {
  s as useGlobalDragging
};
