const r = async (a) => {
  try {
    return [await a(), void 0];
  } catch (t) {
    return [void 0, t];
  }
}, e = async (a) => {
  try {
    return [(await a()).data, void 0];
  } catch (t) {
    return [void 0, t];
  }
};
export {
  e as safeRequest,
  r as safeTry
};
