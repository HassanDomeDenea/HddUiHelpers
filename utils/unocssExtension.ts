export default {
  theme: {
    colors: {
      'primary-50': 'rgb(var(--primary-50))',
      'primary-100': 'rgb(var(--primary-100))',
      'primary-200': 'rgb(var(--primary-200))',
      'primary-300': 'rgb(var(--primary-300))',
      'primary-400': 'rgb(var(--primary-400))',
      'primary-500': 'rgb(var(--primary-500))',
      'primary-600': 'rgb(var(--primary-600))',
      'primary-700': 'rgb(var(--primary-700))',
      'primary-800': 'rgb(var(--primary-800))',
      'primary-900': 'rgb(var(--primary-900))',
      'primary-950': 'rgb(var(--primary-950))',
      'surface-0': 'rgb(var(--surface-0))',
      'surface-50': 'rgb(var(--surface-50))',
      'surface-100': 'rgb(var(--surface-100))',
      'surface-200': 'rgb(var(--surface-200))',
      'surface-300': 'rgb(var(--surface-300))',
      'surface-400': 'rgb(var(--surface-400))',
      'surface-500': 'rgb(var(--surface-500))',
      'surface-600': 'rgb(var(--surface-600))',
      'surface-700': 'rgb(var(--surface-700))',
      'surface-800': 'rgb(var(--surface-800))',
      'surface-900': 'rgb(var(--surface-900))',
      'surface-950': 'rgb(var(--surface-950))',
    },
  },
  rules: [
    ['dir-ltr', { direction: 'ltr' }],
    ['dir-rtl', { direction: 'rtl' }],
  ],
  shortcuts: [
    [
      'btn',
      'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer !outline-none hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    ],
    [
      'icon-btn',
      'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',
    ],
    ['icon-label', 'flex items-center gap-1'],
    [
      /^m-start-(.*)$/,
      ([, n]: string[]) => `ltr:ml-${n} rtl:mr-${n}`,
    ],
    [
      /^m-end-(.*)$/,
      ([, n]: string[]) => `ltr:mr-${n} rtl:ml-${n}`,
    ],
    [
      /^rounded-side-start-(.*)$/,
      ([, n]: string[]) => `ltr:(rounded-tl-${n} rounded-bl-${n}) rtl:(rounded-tr-${n} rounded-br-${n})`,
    ],
    [
      /^rounded-side-end-(.*)$/,
      ([, n]: string[]) => `ltr:(rounded-tr-${n} rounded-br-${n}) rtl:(rounded-tl-${n} rounded-bl-${n})`,
    ],
  ],
}
