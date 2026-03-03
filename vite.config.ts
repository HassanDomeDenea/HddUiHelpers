import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import { unheadVueComposablesImports } from "@unhead/vue";
import Components from "unplugin-vue-components/vite";
import { PrimeVueResolver } from "@primevue/auto-import-resolver";
import path, { resolve, join } from "node:path";
import { readdirSync, statSync } from "fs";

import vue from "@vitejs/plugin-vue";

// Collect all .ts and .vue entry points
const SKIP = ["node_modules", "dist", "vite.config.ts"];

function getEntries(dir: string, base = ""): Record<string, string> {
  const entries: Record<string, string> = {};
  for (const file of readdirSync(dir)) {
    if (SKIP.includes(file) || file.startsWith(".")) continue;
    const full = join(dir, file);
    const rel = base ? `${base}/${file}` : file;
    if (statSync(full).isDirectory()) {
      Object.assign(entries, getEntries(full, rel));
    } else if (/\.(ts|vue)$/.test(file)) {
      entries[rel.replace(/\.(ts|vue)$/, "")] = full;
    }
  }

  // const entries = {
  //   ...getEntries(resolve(__dirname, 'components'), 'components'),
  //   ...getEntries(resolve(__dirname, 'composables'), 'composables'),
  //   ...getEntries(resolve(__dirname, 'utils'), 'utils'),
  //   ...getEntries(resolve(__dirname, 'stores'), 'stores'),
  //   // add whatever other folders you have
  // }
  return entries;
}

export default defineConfig({
  plugins: [
    {
      name: "strip-vue-styles",
      enforce: "pre",
      transform(code, id) {
        if (id.endsWith(".vue")) {
          return {
            code: code.replace(/<style[\s\S]*?<\/style>/gi, ""),
            map: null,
          };
        }
      },
    },
    vue(),
  ],
  resolve: {
    dedupe: ["vue", "primevue"],
    alias: {
      HddUiHelpers: `${path.resolve(__dirname, "")}`,
    },
  },
  build: {
    lib: {
      entry: getEntries(resolve(__dirname, ".")),
      formats: ["es"],
    },
    rollupOptions: {
      external: (id) => {
        // Only bundle your own source files
        if (id.startsWith(".") || id.startsWith("/") || id.startsWith("\0")) {
          return false;
        }
        // Externalize all dependencies
        return true;
      },
    },
    outDir: "dist",
  },
});
