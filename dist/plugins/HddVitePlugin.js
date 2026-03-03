import d from "@intlify/unplugin-vue-i18n/vite";
import { PrimeVueResolver as n } from "@primevue/auto-import-resolver";
import { unheadVueComposablesImports as l } from "@unhead/vue";
import m from "@vitejs/plugin-vue";
import e from "node:path";
import { fileURLToPath as i } from "node:url";
import a from "unocss/vite";
import p from "unplugin-auto-import/vite";
import c from "unplugin-vue-components/vite";
import v from "unplugin-vue-markdown/vite";
import { VueRouterAutoImports as h } from "unplugin-vue-router";
import f from "unplugin-vue-router/vite";
function P() {
  const o = e.dirname(i(import.meta.url)), t = {
    name: "hdd-ui-helpers-plugin"
  }, u = process.env.NODE_ENV === "development" || process.env.NODE_ENV === void 0, r = [
    f({
      routesFolder: [
        {
          src: "resources/js/pages"
        }
      ],
      extensions: [".vue", ".md"],
      dts: "resources/js/types/typed-router.d.ts",
      //dts: false, Disable DTS generation in dev mode for faster work
      // Use async import in dev mode for faster initial load
      // importMode: isDev ? 'async' : 'sync',
      importMode: "sync",
      routeBlockLang: "yaml"
      // Disable dts generation in dev mode for faster updates
    }),
    m({
      include: [
        /\.vue$/,
        /\.md$/,
        /node_modules\/@hassandomedenea\/hdduihelpers\/.+\.vue$/,
        /HddUiHelpers\/.+\.vue$/
      ],
      // Disable template compilation caching in dev mode for faster updates
      template: {
        compilerOptions: {
          // Reduce compilation overhead
          whitespace: "condense"
        },
        transformAssetUrls: {
          base: null,
          includeAbsolute: !1
        }
      }
    }),
    t,
    p({
      imports: [
        "vue",
        "vue-i18n",
        "@vueuse/core",
        h,
        l
      ],
      dts: "resources/js/types/auto-imports.d.ts",
      //dts: false, // Disable DTS generation in dev mode for faster work
      dirs: [
        "resources/js/composables",
        "resources/js/stores",
        "node_modules/@hassandomedenea/hdduihelpers/stores",
        "node_modules/@hassandomedenea/hdduihelpers/composables",
        "node_modules/@hassandomedenea/hdduihelpers/plugins",
        "node_modules/@hassandomedenea/hdduihelpers/utils"
      ],
      // Disable directory scanning in dev mode
      vueTemplate: !0,
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /HddUiHelpers\/.+\.(vue|ts)/]
    }),
    c({
      resolvers: [n()],
      dirs: ["resources/js/components", "node_modules/@hassandomedenea/hdduihelpers/components"],
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /HddUiHelpers\/.+\.(vue|ts)/],
      dts: "resources/js/types/components.d.ts"
    }),
    a({
      fetchMode: "no-cors"
    }),
    v({
      headEnabled: !0
    })
  ];
  return u ? [
    ...r,
    // Only include essential plugins in dev mode
    {
      name: "debug-paths",
      transform(y, s) {
        s.includes("basicAuth") && console.log("Resolved 3 path:", s, /HddUiHelpers\/.+\.(vue|ts)/.test(s));
      }
    },
    d({
      compositionOnly: !0,
      fullInstall: !1,
      include: [
        e.resolve(o, "../locales/*.yaml"),
        e.resolve(e.dirname(""), "lang/*.yaml")
      ],
      // Disable type generation in dev mode
      runtimeOnly: !0
    })
  ] : [
    ...r,
    d({
      include: [
        e.resolve(o, "../locales/*.yaml"),
        e.resolve(e.dirname(""), "lang/*.yaml")
      ]
    })
  ];
}
export {
  P as default
};
