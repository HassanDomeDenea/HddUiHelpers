// my-vite-plugin.ts
import VueI18n from '@intlify/unplugin-vue-i18n/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import { unheadVueComposablesImports } from '@unhead/vue';
import Vue from '@vitejs/plugin-vue';
import path from 'node:path';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Markdown from 'unplugin-vue-markdown/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import VueRouter from 'unplugin-vue-router/vite';
import type { Plugin, PluginOption } from 'vite';

export default function HddUiHelpersPlugin(): PluginOption {
  // Initialize other plugins
  const HddUiHelpersActualPlugin: Plugin = {
    name: 'hdd-ui-helpers-plugin',
  };

  // Check if we're in development mode
  const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;

  // Base plugins that are always needed
  const basePlugins = [
    VueRouter({
      routesFolder: [
        {
          src: 'resources/js/pages',
        },
      ],
      extensions: ['.vue', '.md'],
      dts: 'resources/js/types/typed-router.d.ts',
      //dts: false, Disable DTS generation in dev mode for faster work
      // Use async import in dev mode for faster initial load
      importMode: isDev ? 'async' : 'sync',
      routeBlockLang: 'yaml',
      // Disable dts generation in dev mode for faster updates
    }),
    Vue({
      include: [/\.vue$/, /\.md$/],
      // Disable template compilation caching in dev mode for faster updates
      template: {
        compilerOptions: {
          // Reduce compilation overhead
          whitespace: 'condense',
        },
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
    HddUiHelpersActualPlugin,
  ];

  // Development-optimized plugins
  if (isDev) {
    return [
      ...basePlugins,
      // Only include essential plugins in dev mode
      AutoImport({
        imports: ['vue', 'vue-i18n', '@vueuse/core', VueRouterAutoImports],
        dts: 'resources/js/types/auto-imports.d.ts',
        //dts: false, // Disable DTS generation in dev mode for faster work
        dirs: ['resources/js/composables', 'resources/js/stores', 'resources/js/HddUiHelpers/composables'], // Disable directory scanning in dev mode
        vueTemplate: true,
      }),
      Components({
        resolvers: [PrimeVueResolver()],
        dirs: ['resources/js/components', 'resources/js/HddUiHelpers/components'],
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/],
        dts: 'resources/js/types/components.d.ts',
        //dts: false, // Disable DTS generation in dev mode for faster work
      }),
      UnoCSS({
        fetchMode: 'no-cors',
      }),
      VueI18n({
        compositionOnly: true,
        fullInstall: false,
        include: [path.resolve(__dirname, '../locales/*.yaml'), path.resolve(__dirname, '../../../../lang/*.yaml')],
        // Disable type generation in dev mode
        runtimeOnly: true,
      }),
    ];
  }

  // Production plugins with full functionality
  return [
    ...basePlugins,
    AutoImport({
      imports: ['vue', 'vue-i18n', '@vueuse/core', VueRouterAutoImports, unheadVueComposablesImports],
      dts: 'resources/js/types/auto-imports.d.ts',
      dirs: ['resources/js/composables', 'resources/js/stores', 'resources/js/HddUiHelpers/composables'],
      vueTemplate: true,
    }),
    Components({
      resolvers: [PrimeVueResolver()],
      dirs: ['resources/js/components', 'resources/js/HddUiHelpers/components'],
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'resources/js/types/components.d.ts',
    }),
    UnoCSS({
      fetchMode: 'no-cors',
    }),
    Markdown({
      headEnabled: true,
    }),
    VueI18n({
      include: [path.resolve(__dirname, '../locales/*.yaml'), path.resolve(__dirname, '../../../../lang/*.yaml')],
    }),
  ];
}
