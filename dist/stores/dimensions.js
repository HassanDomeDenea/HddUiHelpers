import { defineStore as r } from "pinia";
import { ref as o } from "vue";
const s = r("dimensionsStore", () => {
  const t = o(0), e = o(0);
  return {
    topNavbarHeight: t,
    botFooterHeight: e
  };
});
export {
  s as useDimensionsStore
};
