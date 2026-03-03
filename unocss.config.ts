import { defineConfig, presetWebFonts, presetWind4 } from "unocss";
import { createLocalFontProcessor } from "@unocss/preset-web-fonts/local";
import HddUnoCssPreset from "HddUiHelpers/plugins/HddUnoCssPreset";

export default defineConfig({
  content: {
    filesystem: ["node_modules/@hassandomedenea/hdduihelpers/**/*.{vue,ts}"],
  },
  presets: [
    presetWind4(),
    presetWebFonts({
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
        times: "Times New Roman",
      },
      timeouts: {
        warning: 5000,
        failure: 10000,
      },
      processors: createLocalFontProcessor({
        // Directory to cache the fonts
        cacheDir: "node_modules/.cache/unocss/fonts",
        // Directory to save the fonts assets
        fontAssetsDir: "public/assets/fonts",
        // Base URL to serve the fonts from the client
        fontServeBaseUrl: "/assets/fonts",
      }),
    }),
    HddUnoCssPreset(),
  ],
  safelist: "prose prose-sm m-auto text-left".split(" "),
});
