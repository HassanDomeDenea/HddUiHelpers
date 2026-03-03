const s = ["HddForm", "ServerDataTable", "YesNoCheckbox"];
function r(n = {}) {
  const { prefix: e = "" } = n;
  return {
    type: "component",
    resolve: (o) => {
      if (o.toLowerCase().startsWith(e.toLowerCase())) {
        const t = o.substring(e.length);
        if (s.includes(t))
          return {
            name: t,
            from: "@hassandomedenea/hdd-vue-helpers"
          };
      }
    }
  };
}
export {
  s as components,
  r as default
};
