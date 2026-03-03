import { ref as n } from "vue";
const s = () => {
  const e = n(!1), a = n(!1);
  function o() {
    e.value = !0;
  }
  function t() {
    e.value = !1, a.value || (a.value = !0);
  }
  return {
    isLoadedOnce: a,
    isLoading: e,
    startLoading: o,
    endLoading: t
  };
};
export {
  s as useLoader
};
