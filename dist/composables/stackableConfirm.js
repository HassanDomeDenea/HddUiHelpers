import { useStackableDialog as t } from "HddUiHelpers/stores/stackableDialogs.ts";
import { omit as r } from "lodash-es";
import { useConfirm as c } from "primevue/useconfirm";
const m = () => {
  const a = c(), { updateDialogVisibility: e } = t();
  return {
    require: function(i) {
      e(!0), a.require({
        group: "dismissable",
        ...r(i, ["accept", "reject", "onHide"]),
        accept: async () => {
          await i.accept?.(), e(!1);
        },
        reject: async () => {
          await i.reject?.(), e(!1);
        },
        onHide: async () => {
          await i.onHide?.(), e(!1);
        }
      });
    }
  };
};
export {
  m as useStackableConfirm
};
