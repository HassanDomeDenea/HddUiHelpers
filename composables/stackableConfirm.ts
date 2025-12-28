import { useStackableDialog } from 'HddUiHelpers/stores/stackableDialogs.ts'
import omit from 'lodash/omit'
import { ConfirmationOptions } from 'primevue/confirmationoptions'
import { useConfirm } from 'primevue/useconfirm'

export const useStackableConfirm = () => {
  const confirm = useConfirm()
  const { updateDialogVisibility: updateDeleteDialogVisibility } = useStackableDialog()
  const show = function (options: ConfirmationOptions) {
    updateDeleteDialogVisibility(true)
    confirm.require({
      group: 'dismissable',
      ...omit(options, ['accept', 'reject', 'onHide']),
      accept: async () => {
        await options.accept?.()
        updateDeleteDialogVisibility(false)
      },
      reject: async () => {
        await options.reject?.()
        updateDeleteDialogVisibility(false)
      },
      onHide: async () => {
        await options.onHide?.()
        updateDeleteDialogVisibility(false)
      },
    })
  }

  return {
    require: show,
  }
}
