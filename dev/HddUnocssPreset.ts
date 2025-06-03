import {
    definePreset,
    Preset,
    presetIcons,
    presetTypography,
    transformerDirectives,
    transformerVariantGroup
} from 'unocss';

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

        transformers: [
            transformerDirectives(),
            transformerVariantGroup(),
        ],
        rules: [
            ['dir-ltr', { direction: 'ltr' }],
            ['dir-rtl', { direction: 'rtl' }],
        ],
        variants: [
            // ...
        ],
        shortcuts: [
            // ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer !outline-none hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
            // ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
            [
                'text-muted',
                `light:text-gray-700 dark:text-gray-400`,
            ],
            [
                'text-success',
                `light:text-green-500 dark:text-green-400`,
            ],
            [
                'text-warning',
                `light:text-yellow-600 dark:text-orange-400`,
            ],
            [
                'text-danger',
                `light:text-red-600 dark:text-red-400`,
            ],
            [
                'bg-danger',
                `light:bg-red-500 light:text-white dark:bg-red-400 dark:text-black`,
            ],
            [
                /^m-start-(.*)$/,
                ([, n]) => `ltr:ml-${n} rtl:mr-${n}`,
            ],
            [
                /^m-end-(.*)$/,
                ([, n]) => `ltr:mr-${n} rtl:ml-${n}`,
            ],
            [
                /^rounded-side-start-(.*)$/,
                ([, n]) => `ltr:(rounded-tl-${n} rounded-bl-${n}) rtl:(rounded-tr-${n} rounded-br-${n})`,
            ],
            [
                /^rounded-side-end-(.*)$/,
                ([, n]) => `ltr:(rounded-tr-${n} rounded-br-${n}) rtl:(rounded-tl-${n} rounded-bl-${n})`,
            ],
        ],
    } as Preset
})
