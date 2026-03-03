import W from "moment";
const o = 3.78;
async function $(M, e = {}) {
  const y = M.outerHTML, u = [], a = [];
  e.inlineStyles || (document.querySelectorAll("link[rel=stylesheet]").forEach((r) => {
    u.push(r.href);
  }), document.querySelectorAll("style").forEach((r) => {
    a.push(r.innerHTML);
  }));
  const i = e.paperSize?.toLowerCase() ?? "a4";
  e.headerMaxWidth || (i.startsWith("a4") ? e.headerMaxWidth = 210 : i.startsWith("letter") ? e.headerMaxWidth = 216 : i.startsWith("a5") && (e.headerMaxWidth = 148), e.headerMaxWidth && (e.leftMargin && (e.headerMaxWidth -= e.leftMargin), e.rightMargin && (e.headerMaxWidth -= e.rightMargin))), e.footerMaxWidth || (i.startsWith("a4") ? e.footerMaxWidth = 210 : i.startsWith("letter") ? e.footerMaxWidth = 216 : i.startsWith("a5") && (e.footerMaxWidth = 148), e.footerMaxWidth && (e.leftMargin && (e.footerMaxWidth -= e.leftMargin), e.rightMargin && (e.footerMaxWidth -= e.rightMargin)), e.footerMaxWidth !== void 0 && (e.showPrintTime || e.pageCounter) && (e.footerMaxWidth -= 55));
  const h = e.headerMaxHeight ?? 100, l = e.footerMaxHeight ?? 50, f = e.footerMaxWidth ?? 210, m = e.headerMaxWidth ?? 210;
  if (e.headerImageUrl) {
    const { dataUrl: r, newHeight: t } = await w(
      e.headerImageUrl,
      o * m,
      o * h
    ), n = +(t / o).toFixed(2);
    n > (e.topMargin ?? 0) && (e.topMargin = n), a.push(`
        @page {
            @top-center {
                content: url('${r}');
            }
        `);
  }
  if (e.firstPageHeaderImageUrl) {
    const { dataUrl: r, newHeight: t } = await w(
      e.firstPageHeaderImageUrl,
      o * m,
      o * h
    ), n = +(t / o).toFixed(2);
    let c = null;
    n > (e.topMargin ?? 0) && (c = n), a.push(`
        @page:first {
            @top-center {
                content: url('${r}');
            }
            margin-top: ${typeof c == "number" ? c + "mm!important" : ""};

        `);
  }
  if (e.footerImageUrl) {
    const { dataUrl: r, newHeight: t } = await w(
      e.footerImageUrl,
      o * f,
      o * l
    ), n = +(t / o).toFixed(2);
    n > (e.bottomMargin ?? 0) && (e.bottomMargin = n), a.push(`
        @page {
            @bottom-center {
                content: url('${r}');
            }
        `);
  }
  const g = window.getComputedStyle(document.body).direction, b = window.getComputedStyle(document.body).fontFamily;
  a.push(
    `body{background:white; font-family:${b}!important; direction: ${g}; text-align:${g === "ltr" ? "left" : "right"};}`
  ), a.push(
    `
        @page {
            size: ${i} ;
            margin: ${typeof e.paperMargin == "number" ? e.paperMargin + "mm" : e.paperMargin || "8mm"};
            margin-top: ${typeof e.topMargin == "number" ? e.topMargin + "mm" : ""};
            margin-bottom: ${typeof e.bottomMargin == "number" ? e.bottomMargin + "mm" : ""};
            margin-left: ${typeof e.leftMargin == "number" ? e.leftMargin + "mm" : ""};
            margin-right: ${typeof e.rightMargin == "number" ? e.rightMargin + "mm" : ""};
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;

        }
    `
  ), a.push(
    `
            @page {

                @bottom-left {
                ` + (e.pageCounter ? `
                    content: 'Page ' counter(page) ' of ' counter(pages);
                    vertical-align: bottom;
                    padding-bottom: 10px;
                    font-size: 10px;
                    ` : "") + `
                }

                @bottom-right {
                  ` + (e.showPrintTime ? `
                    content: '🖨️ ${W().format("YYYY-MM-DD HH:mm")}';
                    vertical-align: bottom;
                    padding-bottom: 10px;
                    font-size: 10px;
                    ` : "") + `
                }
            }`
  ), e.backgroundImage && (a.push(
    `body{ background-image: url('${e.backgroundImage}')!important; background-size: cover; background-repeat: no-repeat;} `
  ), e.bodyTopMargin && a.push(
    ` body{padding-top:${typeof e.bodyTopMargin == "number" ? e.paperMargin + "cm" : e.paperMargin || "0"}`
  ));
  let x = "";
  return e.themeClassName ? x = e.themeClassName : x = "light", new Promise((r) => {
    const t = document.createElement("iframe");
    t.style.position = "absolute", t.style.left = "-1", t.style.visibility = "hidden", document.body.appendChild(t), t.onload = async () => {
      const n = t.contentWindow?.document ?? t.contentDocument;
      if (!n) {
        r();
        return;
      }
      const c = n.images;
      c.length > 0 && await Promise.all(
        Array.from(c).map((d) => d.src && d.src !== window.location.href ? new Promise((s) => {
          d.complete ? s() : (d.addEventListener("load", () => s()), d.addEventListener("error", () => s()));
        }) : Promise.resolve())
      ), await n.fonts.ready, await new Promise((d) => {
        t.focus();
        try {
          t.contentWindow?.document.execCommand("print", !1, void 0), d();
        } catch {
          setTimeout(function() {
            t.contentWindow?.print(), d();
          }, 250);
        }
      }), e.successCallback && e.successCallback(), r();
    }, t.srcdoc = `<html lang="${document.body.parentElement?.lang}" class="${x} light"><head><title>${e.documentTitle || document.title}</title>` + u.map((n) => '<link rel="stylesheet" href="' + n + '" />').join("") + a.map((n) => `<style>${n}</style>`).join("") + `</head><body>${y}</body></html>`, document.body.appendChild(t);
  });
}
async function w(M, e, y) {
  return new Promise((u, a) => {
    const i = new Image();
    i.crossOrigin = "Anonymous", i.onload = function() {
      const h = Math.min(e / i.width, y / i.height, 1), l = i.width * h, f = i.height * h, m = document.createElement("canvas");
      m.width = l, m.height = f;
      const g = m.getContext("2d");
      g && (g.imageSmoothingEnabled = !0, g.imageSmoothingQuality = "high", g.drawImage(i, 0, 0, l, f));
      const b = m.toDataURL("image/png");
      u({ dataUrl: b, newWidth: l, newHeight: f });
    }, i.onerror = a, i.src = M;
  });
}
export {
  $ as printDomWithStyles
};
