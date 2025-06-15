import type { StyleValue } from 'vue';

export type classType = string | { [name: string]: boolean } | ({ [name: string]: boolean } | string)[];

export interface BaseInputProps {
    autocomplete?: string;
    icon?: string;
    label?: string;
    variant?: string | 'outlined' | 'filled';
    iconAsAddon?: boolean;
    floatingLabel?: boolean;
    showErrorMessage?: boolean;
    /**
     * From Primevue FloatLabel variant, default is over
     */
    floatingLabelVariant?: 'in' | 'on' | 'over';
    /*
     * Ifta = Infield top aligned labels
     * */
    infieldTopAlignedLabel?: boolean;
    inputId?: string;
    required?: boolean;
    showRequiredAsterisk?: boolean;
    requiredInLabel?: boolean | undefined;
    formName?: string;
    name?: string;
    error?: string | boolean;
    helperText?: string;
    placeholder?: string;
    autoI18nLabel?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    inline?: boolean;
    controlBeforeLabel?: boolean;
    labelSingleLine?: boolean;
    hideLabelDoubleDots?: boolean;
    ignoreLabelSelector?: boolean;
    labelClass?: string;
    labelStyle?: StyleValue;
    iconClass?: string;
    inputClass?: classType;
    controlWrapperClass?: any;
    size?: 'small' | 'large';
}

export type AutocompleteInputProps = {
    url?: string;
    options?: { name: string; id: string }[];
    disabled?: boolean;
    searchOnFocus?: boolean;
    optionLabelProperty?: string;
    helperText?: string;
    optionIdProperty?: string;
    withoutObject?: boolean;
    noManualInput?: boolean;
    hideCurrentOption?: boolean;
    useIdModel?: boolean;
    clearable?: boolean;
    clearOnDblClick?: boolean;
    hideListWhenEmpty?: boolean;
    formatter?: (option: any) => string;
    inputClass?: classType;
    panelClass?: classType;

    ajaxParams?: { [key: string]: any } | ((params: { [key: string]: any }) => void);
    autoCompleteClass?: classType;
} & BaseInputProps;
export type TextInputProps = {
    type?: string;
    filterPattern?: RegExp;
} & BaseInputProps;
