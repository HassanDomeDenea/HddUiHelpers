import { defineStore as t } from "pinia";
const n = t("dimensionsStore", () => {
  const e = ref(0), o = ref(0);
  return {
    topNavbarHeight: e,
    botFooterHeight: o
  };
});
export {
  n as useDimensionsStore
};
