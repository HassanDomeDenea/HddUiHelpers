import { defineStore as d } from "pinia";
const g = d("globalDragging", () => {
  const e = ref(!1);
  let n = 0;
  function r(o) {
    n++, o.dataTransfer?.types.includes("Files") && (e.value = !0);
  }
  function t() {
    n--, n === 0 && (e.value = !1);
  }
  function a() {
    e.value = !1, n = 0;
  }
  return document.body.addEventListener("dragenter", r), document.body.addEventListener("dragleave", t), document.body.addEventListener("drop", a), {
    isDragging: e
  };
});
export {
  g as useGlobalDragging
};
