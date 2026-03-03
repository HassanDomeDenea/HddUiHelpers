import { getColumnName as b } from "HddUiHelpers/components/datatables/ServerDataTableUtilities.ts";
import { isBoolean as C } from "lodash-es";
import { ref as p } from "vue";
const V = function(o, u) {
  const l = p([]), f = useTemplateRef(
    "visibleColumnsPopoverRef"
  ), a = toRef(o), s = toRef(u), n = useStorage(
    "HddSeverDataTableHiddenColumns_" + a.value,
    []
  ), t = useStorage(
    "HddSeverDataTableVisibleColumns_" + a.value,
    []
  );
  onMounted(() => {
    v();
  });
  function v() {
    l.value = s.value.filter(
      (e) => t.value.indexOf(e.name || e.field) > -1 || e.visible !== !1 && n.value.indexOf(e.name || e.field) < 0
    ).map((e) => e.name || e.field);
  }
  function d() {
    const e = s.value.filter((i) => i.visibilityControl !== !1).map((i) => i.name || i.field).filter((i) => l.value.indexOf(i) < 0), m = s.value.filter(
      (i) => i.visibilityControl !== !1 && i.visible === !1 && l.value.indexOf(i.name || i.field) > -1
    ).map((i) => i.name || i.field);
    n.value = e, t.value = m;
  }
  function r(e) {
    return e.type !== "hidden" && (e.visibilityControl !== !1 ? l.value.indexOf(b(e)) > -1 : C(e.visible) ? e.visible : !0);
  }
  return {
    toggleableColumns: computed(
      () => s.value.filter(
        (e) => e.visibilityControl !== !1 && e.disabled !== !0 && e.type !== "hidden"
      )
    ),
    saveVisibleColumnsState: d,
    checkColumnIsVisible: r,
    visibleColumns: l,
    visibleColumnsPopoverRef: f
  };
};
export {
  V as useServerDataTableColumnVisibility
};
