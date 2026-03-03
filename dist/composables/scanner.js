import g from "axios";
import D from "HddUiHelpers/components/HddScannerLunchModal.vue";
import y from "moment";
import { useDialog as S } from "primevue";
import { safeTry as f } from "../utils/safeTry.js";
const _ = function() {
  const t = window._HDD_SCANNER_PORT ?? 40101, c = S(), i = `http://localhost:${t}/api/`, o = g.create({
    baseURL: i,
    withCredentials: !1
  }), e = "hddscanner://";
  async function a(m = 0) {
    const [r, d] = await f(
      () => o.get("check", {
        timeout: 100
      })
    );
    return d ? m < 1 ? (window.location.href = e + "start", await new Promise((s) => setTimeout(s, 5e3)), await a(1)) : !1 : r.data.success;
  }
  function n() {
    c.open(D, {
      props: {
        header: "HDD Scanner",
        style: {
          minWidth: "50vw"
        },
        modal: !0,
        dismissableMask: !0
      }
    });
  }
  async function p() {
    if (!await a()) {
      n();
      return;
    }
    const [r] = await f(() => o.get("start-scanning"));
    if (r && r.data.success) {
      const d = r.data.images;
      let s = 0;
      const h = y().format("YYYYMMDDHHMMSS"), w = d.map((l) => (s++, b(l, `ScannedImage_${h}_${s}.png`))), u = new DataTransfer();
      return w.forEach((l) => {
        u.items.add(l);
      }), u.files;
    }
  }
  return {
    scanWithDialog: p
  };
};
function b(t, c, i = "image/png") {
  const o = t.padEnd(
    t.length + (4 - t.length % 4) % 4,
    "="
  ), e = atob(o), a = new Uint8Array(e.length);
  for (let n = 0; n < e.length; n++)
    a[n] = e.charCodeAt(n);
  return new File([a], c, { type: i });
}
export {
  _ as useScanner
};
