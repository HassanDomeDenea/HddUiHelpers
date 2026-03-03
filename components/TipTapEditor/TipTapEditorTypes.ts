import type { Editor } from '@tiptap/vue-3';
import type { ButtonProps } from 'primevue';

export type TipTapExtraButton = {
  component?: any;
  binds: ButtonProps;
};

export type TipTapEditorConfig = {
  readonly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  defaultAlignment?: 'left' | 'center' | 'right' | 'justify';
  onlyFontFamilies?: string[];
  exceptFontFamilies?: string[];
  onlyFontSizes?: number[];
  exceptFontSizes?: number[];
  fontSizes?: number[];
  withPrintButton?: boolean;
  withPageBreakButton?: boolean;
  extraExtensions?: any[];
  containerClass?: any;
  extraToolbarStartButtons?: TipTapExtraButton[] | ((event: { editor: Editor; config: TipTapEditorConfig }) => TipTapExtraButton[]);
  extraToolbarEndButtons?: TipTapExtraButton[] | ((event: { editor: Editor; config: TipTapEditorConfig }) => TipTapExtraButton[]);
};
