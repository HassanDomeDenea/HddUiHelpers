import type { ComponentResolver } from 'unplugin-vue-components/types'

export function HddUiComponentsResolver(): ComponentResolver[] {
  return [
    {
      type: 'component',
      resolve: (componentName) => {
        // console.log(componentName)
        if (componentName === 'HddForm') {
          return { from: 'HddUiHelpers/components/FormWrapper/HddForm.vue' }
        }
      },
    },
    /* {
      type: 'directive',
      resolve: (name: string) => {
        if (!directives) {
          let indexesJson: any
          try {
            const corePath = resolveModule('@vueuse/core') || process.cwd()
            const path = resolveModule('@vueuse/core/indexes.json')
              || resolveModule('@vueuse/metadata/index.json')
              || resolveModule('@vueuse/metadata/index.json', { paths: [corePath] })
            indexesJson = JSON.parse(readFileSync(path!, 'utf-8'))
            directives = indexesJson
              .functions
              .filter((i: any) => i.directive && i.name)
              .map(({ name }: any) => name[0].toUpperCase() + name.slice(1))
              .map((name: string) => name.startsWith('Use') ? name.slice(3) : name)
          }
          catch (error) {
            console.error(error)
            throw new Error('[vue-components] failed to load @vueuse/core, have you installed it?')
          }
        }

        if (directives && directives.includes(name))
          return { name: `v${name}`, as: name, from: '@vueuse/components' }
      },
    }, */
  ]
}
