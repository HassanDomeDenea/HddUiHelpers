import type { DynamicShortcut, Rule, StaticShortcut } from 'unocss'

export const HddUnocssShortcuts: (StaticShortcut | DynamicShortcut) [] = [
  // ['icon-label', 'flex items-center gap-1'],
  [
    'text-muted',
    `light:text-gray-600 dark:text-gray-400`,
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
]

export const HddUnocssRules: Rule[] = [
  ['dir-ltr', { direction: 'ltr' }],
  ['dir-rtl', { direction: 'rtl' }],
]
