const t = function(e, n = !1) {
  return (o) => {
    e.value = n ? !o : o;
  };
};
export {
  t as useBooleanToggler
};
