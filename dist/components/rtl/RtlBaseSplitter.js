import t from "@primevue/core/basecomponent";
import e from "primevue/splitter/style";
import "vue";
const s = {
  name: "BaseSplitter",
  extends: t,
  provide() {
    return {
      $pcSplitter: this,
      $parentInstance: this
    };
  },
  props: {
    layout: {
      type: String,
      default: "horizontal"
    },
    gutterSize: {
      type: Number,
      default: 4
    },
    stateKey: {
      type: String,
      default: null
    },
    stateStorage: {
      type: String,
      default: "session"
    },
    step: {
      type: Number,
      default: 5
    }
  },
  style: e
};
export {
  s as default
};
