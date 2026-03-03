import { getColumnName as p } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import { isBoolean as y } from "lodash-es";
import { ref as g, useTemplateRef as x, toRef as o, onMounted as V, computed as O } from "vue";
import { useStorage as u } from "@vueuse/core";
const c = function(f, v) {
  const l = g([]), m = x(
    "visibleColumnsPopoverRef"
  ), s = o(f), n = o(v), a = u(
    "HddSeverDataTableHiddenColumns_" + s.value,
    []
  ), t = u(
    "HddSeverDataTableVisibleColumns_" + s.value,
    []
  );
  V(() => {
    r();
  });
  function r() {
    l.value = n.value.filter(
      (e) => t.value.indexOf(e.name || e.field) > -1 || e.visible !== !1 && a.value.indexOf(e.name || e.field) < 0
    ).map((e) => e.name || e.field);
  }
  function d() {
    const e = n.value.filter((i) => i.visibilityControl !== !1).map((i) => i.name || i.field).filter((i) => l.value.indexOf(i) < 0), C = n.value.filter(
      (i) => i.visibilityControl !== !1 && i.visible === !1 && l.value.indexOf(i.name || i.field) > -1
    ).map((i) => i.name || i.field);
    a.value = e, t.value = C;
  }
  function b(e) {
    return e.type !== "hidden" && (e.visibilityControl !== !1 ? l.value.indexOf(p(e)) > -1 : y(e.visible) ? e.visible : !0);
  }
  return {
    toggleableColumns: O(
      () => n.value.filter(
        (e) => e.visibilityControl !== !1 && e.disabled !== !0 && e.type !== "hidden"
      )
    ),
    saveVisibleColumnsState: d,
    checkColumnIsVisible: b,
    visibleColumns: l,
    visibleColumnsPopoverRef: m
  };
};
export {
  c as useServerDataTableColumnVisibility
};
