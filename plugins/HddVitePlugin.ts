// my-vite-plugin.ts
import VueI18n from "@intlify/unplugin-vue-i18n/vite";
import { PrimeVueResolver } from "@primevue/auto-import-resolver";
import { unheadVueComposablesImports } from "@unhead/vue";
import Vue from "@vitejs/plugin-vue";
import path from "node:path";
import { fileURLToPath } from "node:url";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Markdown from "unplugin-vue-markdown/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import VueRouter from "unplugin-vue-router/vite";
import type { Plugin, PluginOption } from "vite";

export default function HddUiHelpersPlugin(): PluginOption {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  // Initialize other plugins
  const HddUiHelpersActualPlugin: Plugin = {
    name: "hdd-ui-helpers-plugin",
  };

  // Check if we're in development mode
  const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined;

  // Base plugins that are always needed
  const basePlugins = [
    VueRouter({
      routesFolder: [
        {
          src: "resources/js/pages",
        },
      ],
      extensions: [".vue", ".md"],
      dts: "resources/js/types/typed-router.d.ts",
      //dts: false, Disable DTS generation in dev mode for faster work
      // Use async import in dev mode for faster initial load
      // importMode: isDev ? 'async' : 'sync',
      importMode: "sync",
      routeBlockLang: "yaml",
      // Disable dts generation in dev mode for faster updates
    }),
    Vue({
      include: [
        /\.vue$/,
        /\.md$/,
        /node_modules\/@hassandomedenea\/hdduihelpers\/.+\.vue$/,
        /HddUiHelpers\/.+\.vue$/,
      ],
      // Disable template compilation caching in dev mode for faster updates
      template: {
        compilerOptions: {
          // Reduce compilation overhead
          whitespace: "condense",
        },
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
    HddUiHelpersActualPlugin,
    AutoImport({
      imports: [
        "vue",
        "vue-i18n",
        "@vueuse/core",
        VueRouterAutoImports,
        unheadVueComposablesImports,
      ],
      dts: "resources/js/types/auto-imports.d.ts",
      //dts: false, // Disable DTS generation in dev mode for faster work
      dirs: [
        "resources/js/composables",
        "resources/js/stores",
        "node_modules/@hassandomedenea/hdduihelpers/stores",
        "node_modules/@hassandomedenea/hdduihelpers/composables",
        "node_modules/@hassandomedenea/hdduihelpers/plugins",
        "node_modules/@hassandomedenea/hdduihelpers/utils",
      ], // Disable directory scanning in dev mode
      vueTemplate: true,
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /HddUiHelpers\/.+\.(vue|ts)/],
    }),
    Components({
      resolvers: [PrimeVueResolver()],
      dirs: ["resources/js/components", "node_modules/@hassandomedenea/hdduihelpers/components"],
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /HddUiHelpers\/.+\.(vue|ts)/],
      dts: "resources/js/types/components.d.ts",
    }),
    UnoCSS({
      fetchMode: "no-cors",
    }),

    Markdown({
      headEnabled: true,
    }),
  ];
  // Development-optimized plugins
  if (isDev) {
    return [
      ...basePlugins,
      // Only include essential plugins in dev mode
      {
        name: "debug-paths",
        transform(code, id) {
          if (id.includes("basicAuth")) {
            console.log("Resolved 3 path:", id, /HddUiHelpers\/.+\.(vue|ts)/.test(id));
          }
        },
      },
      VueI18n({
        compositionOnly: true,
        fullInstall: false,
        include: [
          path.resolve(dirname, "../locales/*.yaml"),
          path.resolve(path.dirname(""), "lang/*.yaml"),
        ],
        // Disable type generation in dev mode
        runtimeOnly: true,
      }),
    ];
  }
  // Production plugins with full functionality
  return [
    ...basePlugins,
    VueI18n({
      include: [
        path.resolve(dirname, "../locales/*.yaml"),
        path.resolve(path.dirname(""), "lang/*.yaml"),
      ],
    }),
  ];
}
