export const useBooleanToggler =
  (booleanRef: Ref, inverted: boolean = false) =>
  (isTrueOrFalse: boolean) => {
    booleanRef.value = inverted ? !isTrueOrFalse : isTrueOrFalse;
  };
