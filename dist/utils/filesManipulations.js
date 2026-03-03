async function F(r, i = 0) {
  return new Promise((s, a) => {
    const n = new FileReader();
    n.onload = () => {
      const d = n.result;
      if (typeof d != "string")
        return a(new Error("Failed to read the file as a data URL."));
      const e = new Image();
      e.src = d, e.onload = () => {
        const t = document.createElement("canvas"), o = t.getContext("2d");
        if (!o)
          return a(new Error("Failed to get canvas context."));
        const h = i * (Math.PI / 180), c = e.width, l = e.height;
        i % 180 === 90 ? (t.width = l, t.height = c) : (t.width = c, t.height = l), o.translate(t.width / 2, t.height / 2), o.rotate(h), o.drawImage(e, -e.width / 2, -e.height / 2), o.rotate(-h), t.toBlob((w) => {
          if (w) {
            const g = new File([w], r.name, { type: r.type });
            s(g);
          } else
            a(new Error("Failed to convert canvas to file."));
        }, r.type);
      }, e.onerror = () => {
        a(new Error("Failed to load image."));
      };
    }, n.onerror = () => {
      a(new Error("Failed to read the file."));
    }, n.readAsDataURL(r);
  });
}
function m(r, i = "image.png", s = "image/png") {
  return new Promise((a) => {
    r.toBlob((n) => {
      if (n) {
        const d = new File([n], i, { type: s });
        a(d);
      }
    }, s);
  });
}
export {
  m as canvasToFile,
  F as rotateImageFile
};
