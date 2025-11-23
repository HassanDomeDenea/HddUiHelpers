# hdduihelpers

To add to your project

```bash
git submodule add https://github.com/HassanDomeDenea/HddUiHelpers.git resources/js/HddUiHelpers
```

When pulling:

```bash
git pull --recurse-submodules
```

When pushing:

```bash

# Commit the submodule changes
git -C ./resources/js/HddUiHelpers add .
git -C ./resources/js/HddUiHelpers commit -m "New Updates"

# Commit the main repo to update submodule reference
git add resources/js/HddUiHelpers
git commit -m "Update HddUiHelpers submodule"

# Push everything in one go
git push --recurse-submodules=on-demand
```

Packages to install:

```bash
bun add -D unocss unplugin-vue-components unplugin-vue-router unplugin-auto-import unplugin-vue-components unocss @unhead/vue unplugin-vue-markdown @primevue/auto-import-resolver @intlify/unplugin-vue-i18n @types/lodash-es  vue-component-type-helpers @types/jsonpath @types/sortablejs @types/downloadjs
```

```bash
bun add axios lodash-es primevue @primeuix/themes vue-i18n vue-router pinia moment lodash-es nprogress @vueuse/components @vueuse/core jsonpath sortablejs @vueuse/integrations downloadjs quill @tiptap/extension-text-style @tiptap/starter-kit @tiptap/vue-3 @tiptap/extension-list @tiptap/extension-table @vueuse/router 
```

Add this to vite.config.ts

```ts
({
  resolve: {
    alias: {
      'HddUiHelpers/': `${path.resolve(__dirname, 'resources/js/HddUiHelpers')}/`,
    },
  },
});
```
