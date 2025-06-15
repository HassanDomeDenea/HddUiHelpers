import { definePreset, Preset, presetIcons, presetTypography, transformerDirectives, transformerVariantGroup } from 'unocss';

export default definePreset(() => {
    return {
        name: 'HddUnocssPreset',
        presets: [
            presetIcons({
                scale: 1.2,
                extraProperties: {
                    display: 'inline-block',
                },
            }),
            presetTypography(),
        ],

        transformers: [transformerDirectives(), transformerVariantGroup()],
        rules: [
            ['dir-ltr', { direction: 'ltr' }],
            ['dir-rtl', { direction: 'rtl' }],
        ],
        variants: [
            // ...
        ],
        shortcuts: [
            ['bg-secondary-0', 'bg-gray-50 dark:bg-gray-900'],
            ['bg-secondary-1', 'bg-gray-100 dark:bg-gray-800'],
            ['bg-secondary-2', 'bg-gray-200 dark:bg-gray-700'],
            ['bg-secondary-3', 'bg-gray-300 dark:bg-gray-600'],

            ['bg-primary-1', 'bg-blue-100 dark:bg-blue-900'],
            ['bg-primary-2', 'bg-blue-200 dark:bg-blue-800'],
            ['bg-primary-3', 'bg-blue-300 dark:bg-blue-700'],

            ['bg-success-1', 'bg-green-100 dark:bg-green-900'],
            ['bg-success-2', 'bg-green-200 dark:bg-green-800'],
            ['bg-success-3', 'bg-green-300 dark:bg-green-700'],

            ['bg-warning-1', 'bg-yellow-100 dark:bg-yellow-900'],
            ['bg-warning-2', 'bg-yellow-200 dark:bg-yellow-800'],
            ['bg-warning-3', 'bg-yellow-300 dark:bg-yellow-700'],

            ['bg-danger-1', 'bg-red-100 dark:bg-red-900'],
            ['bg-danger-2', 'bg-red-200 dark:bg-red-800'],
            ['bg-danger-3', 'bg-red-300 dark:bg-red-700'],

            ['bg-info-1', 'bg-cyan-100 dark:bg-cyan-900'],
            ['bg-info-2', 'bg-cyan-200 dark:bg-cyan-800'],
            ['bg-info-3', 'bg-cyan-300 dark:bg-cyan-700'],

            // Texts

            ['text-secondary-1', 'text-gray-800 dark:text-gray-100'],
            ['text-secondary-2', 'text-gray-700 dark:text-gray-200'],
            ['text-secondary-3', 'text-gray-600 dark:text-gray-300'],

            ['text-primary-1', 'text-blue-800 dark:text-blue-100'],
            ['text-success-1', 'text-green-800 dark:text-green-100'],
            ['text-warning-1', 'text-yellow-800 dark:text-yellow-100'],
            ['text-danger-1', 'text-red-800 dark:text-red-100'],
            ['text-info-1', 'text-cyan-800 dark:text-cyan-100'],
            // ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer !outline-none hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
            // ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
            ['text-muted', `light:text-gray-700 dark:text-gray-400`],
            ['text-success', `light:text-green-500 dark:text-green-400`],
            ['text-warning', `light:text-yellow-600 dark:text-orange-400`],
            ['text-danger', `light:text-red-600 dark:text-red-400`],
            ['bg-danger', `light:bg-red-500 light:text-white dark:bg-red-400 dark:text-black`],
            /*[/^m-start-(.*)$/, ([, n]) => `ltr:ml-${n} rtl:mr-${n}`],
            [/^m-end-(.*)$/, ([, n]) => `ltr:mr-${n} rtl:ml-${n}`],
            [/^rounded-side-start-(.*)$/, ([, n]) => `ltr:(rounded-tl-${n} rounded-bl-${n}) rtl:(rounded-tr-${n} rounded-br-${n})`],
            [/^rounded-side-end-(.*)$/, ([, n]) => `ltr:(rounded-tr-${n} rounded-br-${n}) rtl:(rounded-tl-${n} rounded-bl-${n})`],*/
        ],
    } as Preset;
});
