const t = () => {
  const e = ref(!1), a = ref(!1);
  function n() {
    e.value = !0;
  }
  function o() {
    e.value = !1, a.value || (a.value = !0);
  }
  return {
    isLoadedOnce: a,
    isLoading: e,
    startLoading: n,
    endLoading: o
  };
};
export {
  t as useLoader
};
