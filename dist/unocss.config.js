import { defineConfig as e, presetWind4 as s, presetWebFonts as o } from "unocss";
import { createLocalFontProcessor as t } from "@unocss/preset-web-fonts/local";
import a from "HddUiHelpers/plugins/HddUnoCssPreset";
const f = e({
  content: {
    filesystem: ["node_modules/@hassandomedenea/hdduihelpers/**/*.{vue,ts}"]
  },
  presets: [
    s(),
    o({
      themeKey: "font",
      fonts: {
        sans: "Roboto",
        // serif: 'DM Serif Display',
        // mono: 'DM Mono',
        amiri: "Amiri",
        tajawal: "Tajawal",
        mirza: "Mirza",
        aref: "Aref Ruqaa",
        arial: "Arial",
        times: "Times New Roman"
      },
      timeouts: {
        warning: 5e3,
        failure: 1e4
      },
      processors: t({
        // Directory to cache the fonts
        cacheDir: "node_modules/.cache/unocss/fonts",
        // Directory to save the fonts assets
        fontAssetsDir: "public/assets/fonts",
        // Base URL to serve the fonts from the client
        fontServeBaseUrl: "/assets/fonts"
      })
    }),
    a()
  ],
  safelist: "prose prose-sm m-auto text-left".split(" ")
});
export {
  f as default
};
