import { defineStore } from "pinia";
import { ref } from "vue";

export const useDimensionsStore = defineStore("dimensionsStore", () => {
  const topNavbarHeight = ref(0);
  const botFooterHeight = ref(0);

  return {
    topNavbarHeight,
    botFooterHeight,
  };
});
