import type { ColumnSelectOptions } from 'HddUiHelpers/components/datatables/ServerDataTableTypes.ts';
import { isLocalListType } from 'HddUiHelpers/utils/dynamicListsUtilities.ts';
import { get } from 'lodash-es';

export const useFormatters = () => {
  const { t } = useI18n();

  const suppressDecimalsInIqd = ref(false);
  const suppressDecimals = ref(false);

  function formatPrice(amount: number, currency?: string | { currency: string }) {
    if (!amount) {
      return '0';
    }

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    currency = ((typeof currency === 'object' ? currency.currency : currency) ?? '').toLowerCase();
    const dollarSign = currency === 'usd' ? '$' : '';
    const iqdSign = currency === 'iqd' ? ' ' + t('IQD') : '';

    let num = +amount || 0;

    if (suppressDecimals.value || (suppressDecimalsInIqd && iqdSign)) {
      num = Math.round(num);
    }

    return dollarSign + formatter.format(num) + iqdSign;
  }

  function formatPriceColumn(amount: number, row: any, attributeName: string) {
    const currency = get(row, attributeName + '_currency');
    return formatPrice(amount, currency);
  }

  return {
    suppressDecimalsInIqd,
    formatPrice,
    formatPriceWithoutCurrency: formatNumberGrouped,
    formatPriceColumn,
  };
};

export function formatNumberGrouped(amount: number, suppressDecimals = true) {
  if (!amount) {
    return '0';
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  let num = +amount || 0;

  if (suppressDecimals) {
    num = Math.round(num);
  }
  return formatter.format(num);
}

export function safeNumber(value: number, _default: number | null = 0) {
  return isNaN(value) ? _default : value;
}

export function formatListToSeverityTag({ value, options }: { value: any; options: ColumnSelectOptions }): {
  severity: any;
} {
  if (isLocalListType(options)) {
    return {
      severity: options?.keyObjectPair?.[value]?.severity,
    };
  } else {
    return {
      severity: null,
    };
  }
}

export function formatReceiptNumberByFirstLetter(value: string): string {
  const splitted = value.split('-');
  return splitted[0][0] + '-' + splitted[1];
}
