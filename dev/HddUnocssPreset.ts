import type { Preset } from 'unocss'
import {
  definePreset,
  presetIcons,
  presetTypography,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetAnimateCSS from 'unocss-preset-animatecss'
import { presetMagicss } from 'unocss-preset-magicss'

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
      presetAnimateCSS(),
      presetMagicss(),
    ],

    transformers: [transformerDirectives(), transformerVariantGroup()],
    rules: [
      ['dir-ltr', { direction: 'ltr' }],
      ['dir-rtl', { direction: 'rtl' }],
    ],
    variants: [
      (matcher) => {
        if (!matcher.startsWith('screen:')) return matcher
        return {
          matcher: matcher.slice(7),
          parent: '@media screen',
        }
      },
    ],
    shortcuts: [
      [
        'TWO_COLUMNS_FORM_CLASS_ON_MD',
        'md:grid md:grid-cols-2 md:gap-x-8 [&>*:nth-child(odd)]:md:border-ie [&>*:nth-child(odd)]:md:border-dotted [&>*:nth-child(odd)]:light:md:border-gray-300 [&>*:nth-child(odd)]:dark:md:border-gray-700 [&>*:nth-child(odd)]:md:pe-8',
      ],
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
      [
        'text-secondary-hoverable',
        'text-gray-400 hover:text-gray-600 dark:text-gray-700 hover:dark:text-gray-500',
      ],

      ['text-primary-1', 'text-blue-800 dark:text-blue-100'],
      ['text-primary-2', 'text-blue-700 dark:text-blue-200'],
      ['text-primary-3', 'text-blue-600 dark:text-blue-300'],
      ['text-success-1', 'text-green-800 dark:text-green-100'],
      ['text-success-2', 'text-green-700 dark:text-green-200'],
      ['text-success-3', 'text-green-600 dark:text-green-300'],
      ['text-warning-1', 'text-yellow-800 dark:text-yellow-100'],
      ['text-warning-2', 'text-yellow-700 dark:text-yellow-200'],
      ['text-warning-3', 'text-yellow-600 dark:text-yellow-300'],
      ['text-info-1', 'text-cyan-800 dark:text-cyan-100'],
      ['text-info-2', 'text-cyan-700 dark:text-cyan-200'],
      ['text-info-3', 'text-cyan-600 dark:text-cyan-300'],
      ['text-danger-1', 'text-red-800 dark:text-red-100'],
      ['text-danger-2', 'text-red-700 dark:text-red-200'],
      ['text-danger-3', 'text-red-600 dark:text-red-300'],
      // ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer !outline-none hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
      // ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
      ['text-muted', `light:text-gray-700 dark:text-gray-400`],
      //['text-success', `light:text-green-500 dark:text-green-400`],
      ['text-warning', `light:text-yellow-600 dark:text-orange-400`],
      ['text-danger', `light:text-red-600 dark:text-red-400`],
      ['bg-danger', `light:bg-red-500 light:text-white dark:bg-red-400 dark:text-black`],

      // Based on Primevue Message Text Color
      ['text-success', `text-[var(--p-message-success-color)]`],
      ['text-info', `text-[var(--p-message-info-color)]`],
      ['text-warn', `text-[var(--p-message-warn-color)]`],
      ['text-error', `text-[var(--p-message-error-color)]`],
      ['text-secondary', `text-[var(--p-message-secondary-color)]`],
      ['text-contrast', `text-[var(--p-message-contrast-color)]`],

      [
        'bg-frosted-light',
        `bg-gradient-to-b from-white via-blue-50 to-blue-100 dark:from-slate-900 dark:via-blue-950 dark:to-blue-900`,
      ],

      /*Sharp Gradients: */
      [
        'bg-neon-blue-pink',
        `bg-gradient-to-tr from-fuchsia-500 via-purple-600 to-sky-500 dark:from-fuchsia-700 dark:via-purple-900 dark:to-sky-800`,
      ],
      [
        'bg-minimal-gray',
        `bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-black`,
      ],
      [
        'bg-nature-green',
        `bg-gradient-to-tr from-emerald-300 via-lime-400 to-green-600 dark:from-emerald-900 dark:via-green-900 dark:to-lime-950`,
      ],
      [
        'bg-cool-ocean',
        `bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 dark:from-cyan-900 dark:via-blue-900 dark:to-indigo-950`,
      ],
      [
        'bg-sunset-orange-pink',
        `bg-gradient-to-br from-orange-300 via-pink-400 to-rose-500 dark:from-orange-800 dark:via-pink-800 dark:to-rose-900`,
      ],
      [
        'bg-elegant-blue-purple',
        `bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-600 dark:from-indigo-900 dark:via-purple-900 dark:to-fuchsia-800`,
      ],

      /*Calm Gradients: */
      [
        'bg-calm-sky',
        `bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-sky-950 dark:to-indigo-950`,
      ],
      [
        'bg-soft-mint',
        `bg-gradient-to-br from-teal-50 via-green-50 to-emerald-100 dark:from-emerald-900 dark:via-teal-950 dark:to-green-950`,
      ],
      [
        'bg-morning-mist',
        `bg-gradient-to-b from-gray-50 via-slate-100 to-gray-200 dark:from-gray-900 dark:via-slate-950 dark:to-black`,
      ],
      [
        'bg-blush-petal',
        `bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 dark:from-rose-900 dark:via-pink-950 dark:to-rose-950`,
      ],
      [
        'bg-lavender-dream',
        `bg-gradient-to-tr from-violet-100 via-purple-50 to-indigo-100 dark:from-violet-950 dark:via-purple-950 dark:to-indigo-950`,
      ],
      [
        'bg-misty-forest',
        `bg-gradient-to-tr from-emerald-100 via-green-50 to-lime-100 dark:from-emerald-950 dark:via-green-950 dark:to-lime-950`,
      ],
      [
        'bg-cloudy-silver',
        `bg-gradient-to-br from-slate-50 via-gray-100 to-zinc-200 dark:from-slate-900 dark:via-gray-950 dark:to-zinc-950`,
      ],
      [
        'bg-arctic-breeze',
        `bg-gradient-to-br from-cyan-50 via-sky-50 to-slate-100 dark:from-cyan-950 dark:via-sky-950 dark:to-slate-950`,
      ],
      [
        'bg-soft-aqua',
        `bg-gradient-to-br from-teal-100 via-cyan-50 to-blue-100 dark:from-teal-950 dark:via-cyan-950 dark:to-blue-950`,
      ],
      [
        'bg-peaceful-sand',
        `bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100 dark:from-amber-900 dark:via-yellow-950 dark:to-orange-950`,
      ],

      [
        'bg-calm-sky-contrast',
        `bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-200 dark:from-slate-800 dark:via-sky-900 dark:to-indigo-950`,
      ],
      [
        'bg-soft-mint-contrast',
        `bg-gradient-to-br from-teal-200 via-green-100 to-emerald-200 dark:from-emerald-800 dark:via-teal-900 dark:to-green-950`,
      ],
      [
        'bg-morning-mist-contrast',
        `bg-gradient-to-b from-gray-100 via-slate-200 to-gray-300 dark:from-gray-800 dark:via-slate-900 dark:to-black`,
      ],
      [
        'bg-blush-petal-contrast',
        `bg-gradient-to-br from-rose-200 via-pink-100 to-rose-200 dark:from-rose-800 dark:via-pink-900 dark:to-rose-950`,
      ],
      [
        'bg-lavender-dream-contrast',
        `bg-gradient-to-tr from-violet-200 via-purple-100 to-indigo-200 dark:from-violet-800 dark:via-purple-900 dark:to-indigo-950`,
      ],
      [
        'bg-misty-forest-contrast',
        `bg-gradient-to-tr from-emerald-200 via-green-100 to-lime-200 dark:from-emerald-800 dark:via-green-900 dark:to-lime-950`,
      ],
      [
        'bg-cloudy-silver-contrast',
        `bg-gradient-to-br from-slate-100 via-gray-200 to-zinc-300 dark:from-slate-800 dark:via-gray-900 dark:to-zinc-950`,
      ],
      [
        'bg-arctic-breeze-contrast',
        `bg-gradient-to-br from-cyan-200 via-sky-100 to-slate-200 dark:from-cyan-900 dark:via-sky-950 dark:to-slate-950`,
      ],
      [
        'bg-soft-aqua-contrast',
        `bg-gradient-to-br from-teal-200 via-cyan-100 to-blue-200 dark:from-teal-900 dark:via-cyan-950 dark:to-blue-950`,
      ],
      [
        'bg-peaceful-sand-contrast',
        `bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-200 dark:from-amber-800 dark:via-yellow-900 dark:to-orange-950`,
      ],
      /*[/^m-start-(.*)$/, ([, n]) => `ltr:ml-${n} rtl:mr-${n}`],
            [/^m-end-(.*)$/, ([, n]) => `ltr:mr-${n} rtl:ml-${n}`],
            [/^rounded-side-start-(.*)$/, ([, n]) => `ltr:(rounded-tl-${n} rounded-bl-${n}) rtl:(rounded-tr-${n} rounded-br-${n})`],
            [/^rounded-side-end-(.*)$/, ([, n]) => `ltr:(rounded-tr-${n} rounded-br-${n}) rtl:(rounded-tl-${n} rounded-bl-${n})`],*/
    ],
    safelist: [
      'text-success',
      'text-info',
      'text-warn',
      'text-error',
      'text-secondary',
      'text-contrast',
      // 'w-[75vw]',
      // 'max-w-[90vw]'
    ],
  } as Preset
})
