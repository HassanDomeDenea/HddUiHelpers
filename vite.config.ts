import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import { unheadVueComposablesImports } from "@unhead/vue";
import Components from "unplugin-vue-components/vite";
import { PrimeVueResolver } from "@primevue/auto-import-resolver";
import path from "node:path";

export default defineConfig({
  plugins: [
    AutoImport({
      imports: [
        "vue",
        "vue-i18n",
        "@vueuse/core",
        VueRouterAutoImports,
        unheadVueComposablesImports,
      ],
      dts: "types/auto-imports.d.ts",
      //dts: false, // Disable DTS generation in dev mode for faster work
      dirs: ["composables", "stores"], // Disable directory scanning in dev mode
      vueTemplate: true,
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      eslintrc: {
        enabled: true,
        filepath: ".eslintrc-auto-import.json",
        globalsPropValue: true,
      },
    }),
    Components({
      resolvers: [PrimeVueResolver()],
      dirs: ["components"],
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "types/auto-components.d.ts",
    }),
  ],
  resolve: {
    dedupe: ["vue", "primevue"],
    alias: {
      HddUiHelpers: `${path.resolve(__dirname, "")}`,
    },
  },
});
