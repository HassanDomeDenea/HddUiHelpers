function i(r) {
  return "operator" in r && "fields" in r;
}
function n(r) {
  return "field" in r && "value" in r;
}
export {
  n as isToolbarFilterValue,
  i as isToolbarFilterWrapper
};
