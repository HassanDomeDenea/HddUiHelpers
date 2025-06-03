// my-vite-plugin.ts
import Vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';
import { Plugin, PluginOption } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import { unheadVueComposablesImports } from '@unhead/vue';
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import UnoCSS from 'unocss/vite';
import Markdown from 'unplugin-vue-markdown/vite';

export default function HddUiHelpersPlugin(): PluginOption {
    // Initialize other plugins
    const HddUiHelpersActualPlugin: Plugin = {
        name: 'hdd-ui-helpers-plugin',
    };

    return [
        VueRouter({
            routesFolder: [
                {
                    src: 'resources/js/pages',
                },
            ],
            extensions: ['.vue', '.md'],
            dts: 'resources/js/types/typed-router.d.ts',
            importMode: 'sync',
            routeBlockLang: 'yaml',
        }),
        Vue({
            include: [/\.vue$/, /\.md$/],
        }),
        AutoImport({
            imports: [
                'vue',
                'vue-i18n',
                '@vueuse/core',
                VueRouterAutoImports,
                unheadVueComposablesImports,
            ],
            dts: 'resources/js/auto-imports.d.ts',
            dirs: [
                'resources/js/composables',
                'resources/js/stores',
                'resources/js/HddUiHelpers/composables',
            ],
            vueTemplate: true,
        }),
        Components({
            resolvers: [
                // HddUiComponentsResolver(),
                PrimeVueResolver(),
            ],
            dirs: [
                'resources/js/components',
                'resources/js/HddUiHelpers/components',
            ],
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
        HddUiHelpersActualPlugin,
    ];
}
