import type { EventBusKey } from '@vueuse/core';
import type { ButtonProps } from 'primevue';
import type { ConfirmationOptions } from 'primevue/confirmationoptions';

type inputType = 'text' | 'textarea' | 'number' | 'date' | 'math' | 'text_only'
type extendedConfirmationOptions = {
    rejectProps?: ButtonProps;
    acceptProps?: ButtonProps;
    closeOnEscape?: boolean;
    inputsCount?: number
    inputType?: inputType | inputType[];
    initialValue?: any | any[];
    inputProps?: object | object[];
    accept?: (value: any | any[]) => void;
}

export type ConfirmDialogWithInputConfirmationOptions =
    Omit<ConfirmationOptions, keyof extendedConfirmationOptions>
    & extendedConfirmationOptions;

export type ConfirmDialogWithInputEventBus = {
    event: 'show' | 'hide';
    options?: ConfirmDialogWithInputConfirmationOptions;
};
export const ConfirmDialogWithInputKey: EventBusKey<ConfirmDialogWithInputEventBus> = Symbol('ConfirmDialogWithInputKey');
export const useConfirmDialogWithInput = function() {
    const bus = useEventBus(ConfirmDialogWithInputKey);
    return {
        show(options: ConfirmDialogWithInputConfirmationOptions) {
            bus.emit({ event: 'show', options });
        }
    };
};
