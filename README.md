# HDD Ui Helpers

Tools to build Vue 3 applications with laravel as an api, and mainly PrimeVue as frontend framework.

## For local development:

- Run `bun link` in this library folder.
- Run `bun link @hassandomedenea/hdduihelpers` in the project folder.
- Add a dependency to project package.json:

```json5
{
  dependencies: {
    "@hassandomedenea/hdduihelpers": "github:HassanDomeDenea/HddUiHelpers",
    // "@hassandomedenea/hdduihelpers": "github:HassanDomeDenea/HddUiHelpers#v0.2.0" // With version hash
    // "@hassandomedenea/hdduihelpers": "github:HassanDomeDenea/HddUiHelpers#abc1234" // With commit hash
  },
}
```

- To remove the link and install the pushed version from GitHub:

```bash
bun unlink @hassandomedenea/hdduihelpers
bun install
```

## Setting up files

- **Step 1**: In `vite.config.ts`, resolve symlink and watch it in dev:

```ts
import path from "path";
import HddVitePlugin from "@hassandomedenea/hdduihelpers/plugins/HddVitePlugin";

export default defineConfig({
  resolve: {
    // Follow symlinks to their real path so imports work correctly
    preserveSymlinks: false, // this is default, but be explicit

    dedupe: ["vue", "primevue"],
    alias: {
      "@": path.resolve(__dirname, "resources/js"),
      HddUiHelpers: `${path.resolve(__dirname, "node_modules/@hassandomedenea/hdduihelpers")}`,
    },
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname), path.resolve(__dirname, "../HddUiHelpers")],
    },
    watch: {
      // By default Vite ignores node_modules for file watching
      // This tells it to watch your linked package
      ignored: ["!**/node_modules/@hassandomedenea/hdduihelpers/**"],
    },
  },
  plugins: [HddVitePlugin()],
  // Tell Vite to process .vue and .ts files from this dependency
  // (normally it skips node_modules from transformation)
  optimizeDeps: {
    exclude: ["@hassandomedenea/hdduihelpers"],
  },
});
```

- **Step 2**: In `unocss.config.ts`, include the preset:

```ts
import HddUnoCssPreset from "@hassandomedenea/hdduihelpers/plugins/HddUnoCssPreset";

export default defineConfig({
  content: {
    filesystem: ["node_modules/@hassandomedenea/hdduihelpers/**/*.{vue,ts}"],
  },
  presets: [
    //... Other Presets
    HddUnoCssPreset(),
  ],
  safelist: "prose prose-sm m-auto text-left".split(" "),
});
```

- **Step 3**: In `tsconfig.json`, include the linked package:

```json5
{
  compilerOptions: {
    paths: {
      "HddUiHelpers/*": ["./node_modules/@hassandomedenea/hdduihelpers/*"],
    },
  },
  // Make sure TS doesn't skip it
  include: [
    "resources/js/**/*",
    "node_modules/@hassandomedenea/hdduihelpers/**/*.d.ts",
    "node_modules/@hassandomedenea/hdduihelpers/**/*.ts",
    "node_modules/@hassandomedenea/hdduihelpers/**/*.vue",
  ],
}
```
