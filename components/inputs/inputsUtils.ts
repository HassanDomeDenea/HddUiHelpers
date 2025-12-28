import type BaseInput from 'HddUiHelpers/components/inputs/BaseInput.vue'
import type { BaseInputProps } from 'HddUiHelpers/components/inputs/types'
import { pick } from 'lodash-es'
import uniqueId from 'lodash/uniqueId'
import type { TreeNode } from 'primevue/treenode'
import type { ComponentExposed } from 'vue-component-type-helpers'

export const DefaultBasInputProps: Partial<BaseInputProps> = {
  hideLabelDoubleDots: true,
} as Partial<BaseInputProps>

// This array takes the keys of the BaseInputProps type and makes it a const array
const baseInputPropsKeys = [
  'autocomplete',
  'icon',
  'uniqueId',
  'modelValue',
  'label',
  'labelMinWidth',
  'variant',
  'iconAsAddon',
  'onLocalEnterKeyDown',
  'floatingLabel',
  'showErrorMessage',
  'floatingLabelVariant',
  'infieldTopAlignedLabel',
  'inputId',
  'required',
  'showRequiredAsterisk',
  'requiredInLabel',
  'formName',
  'name',
  'error',
  'helperText',
  'placeholder',
  'autoI18nLabel',
  'disabled',
  'readonly',
  'inline',
  'controlBeforeLabel',
  'labelSingleLine',
  'hideLabelDoubleDots',
  'ignoreLabelSelector',
  'labelClass',
  'labelStyle',
  'iconClass',
  'inputClass',
  'wrapperClass',
  'controlWrapperClass',
  'size',
  'buttonAddon',
  'controlComponent',
] as const

export const useHddBaseInputUtils = function (props: Readonly<BaseInputProps>) {
  const hasError = computed(() => !!props.error)
  const baseInputRef = ref<ComponentExposed<typeof BaseInput>>()

  const fieldUniqueId = computed(() => {
    return props.uniqueId ?? uniqueId(props.name ?? 'unnamed')
  })

  const baseInputForwardedProps = computed(() => {
    return {
      inputId: fieldUniqueId.value,
      ref: (el: any) => (baseInputRef.value = el),
      ...pick(props, baseInputPropsKeys),
    }
  })

  const exposed = {
    hasError,
    baseInputRef,
    name: props.name,
    disabled: props.disabled,
  }

  const generalInputProps = computed(() => {
    return {
      fluid: true,
      size: props.size as 'large' | 'small',
      name: props.name,
      invalid: hasError.value,
      disabled: props.disabled,
      readonly: props.readonly,
      variant: props.variant,
    }
  })

  return {
    exposed,
    baseInputRef,
    fieldUniqueId,
    hasError,
    baseInputForwardedProps,
    generalInputProps,
  }
}

/**
 * Return array of ancestor nodes for a given id.
 * The returned array is ordered [node, parent, grandParent, ... , root].
 * Returns null if not found.
 */
export function getTreeAncestorsById(
  id: any,
  tree: TreeNode[],
  idProperty = 'id',
  childrenProperty = 'children'
): TreeNode[] | null {
  let result: TreeNode[] | null = null

  function recurse(nodes: TreeNode[], parents: TreeNode[]) {
    for (const n of nodes) {
      if (result) return // already found
      const newParents = parents.concat(n)
      if (n[idProperty] === id) {
        // build ancestors starting from node up to root
        result = []
        for (let i = newParents.length - 1; i >= 0; i--) {
          result.push(newParents[i])
        }
        return
      }
      if (n[childrenProperty]?.length) {
        recurse(n[childrenProperty] as TreeNode[], newParents)
      }
    }
  }

  recurse(tree, [])
  return result
}

export function getTreeItemLabelWithParents(
  id: number | string,
  nodes: TreeNode[],
  idProperty: string = 'id',
  labelProperty: string = 'label',
  childrenProperty = 'children'
) {
  const path = getTreeAncestorsById(id, nodes, idProperty, childrenProperty)
  return path ? getTextFromTreePath(path, labelProperty) : ''
}

export function getTextFromTreePath(
  path: TreeNode[],
  labelProperty: string = 'label',
  glue = '>>'
): string {
  return path
    .slice() // copy
    .reverse() // our helper returns [node, parent, ...root], reverse to root..node
    .map((n) => n[labelProperty])
    .join(`  ${glue}  `)
}

export function cursorAtStartOfInput(input: HTMLInputElement) {
  if (!input) return false
  const cursorPosition = input.selectionStart
  const hasTextSelection = input.selectionStart !== input.selectionEnd
  return !hasTextSelection && cursorPosition === 0
}

export function cursorAtEndOfInput(input: HTMLInputElement) {
  if (!input) return false
  const cursorPosition = input.selectionStart
  const hasTextSelection = input.selectionStart !== input.selectionEnd
  return !hasTextSelection && cursorPosition === input.value.length
}
