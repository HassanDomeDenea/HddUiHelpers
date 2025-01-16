// eslint-disable-next-line ts/ban-ts-comment
// @ts-ignore

import type { LocaleObject } from 'yup'
import { printValue, ValidationError } from 'yup'

const mixed: Required<LocaleObject['mixed']> = {
  default: '${path} غير صحيح',
  required: '${path} مطلوب',
  defined: '${path} يجب ان يكون معرف',
  notNull: '${path} لا يمكن أن يكون فارغاً',
  oneOf: '${path} لا بد أن يكون أحد القيم: ${values}',
  notOneOf: '${path} لا بد أن لا يكون أحد القيم: ${values}',
  notType: ({ path, type, value, originalValue }) => {
    const castMsg
            = originalValue != null && originalValue !== value
              ? ` (cast from the value \`${printValue(originalValue, true)}\`).`
              : '.'

    return type !== 'mixed'
      ? `${path} must be a \`${type}\` type, `
      + `but the final value was: \`${printValue(value, true)}\`${
        castMsg}`
      : `${path} must match the configured type. `
        + `The validated value was: \`${printValue(value, true)}\`${
          castMsg}`
  },
}

const string: Required<LocaleObject['string']> = {
  length: '${path} يجب ان يتكون من ${length} حرف',
  min: '${path} يجب أن يتكون على الأقل من ${min} حرف',
  max: '${path} يجب أن يتكون على الأكثر من ${max} حرف',
  matches: '${path} يجب أن يكون مطابق لـ: "${regex}"',
  email: '${path} يجب أن يكون بريد الكتروني صحيح',
  url: '${path} يجب أن يكون رابط صحيح',
  uuid: '${path} must be a valid UUID',
  datetime: '${path} must be a valid ISO date-time',
  datetime_precision:
        '${path} must be a valid ISO date-time with a sub-second precision of exactly ${precision} digits',
  datetime_offset:
        '${path} must be a valid ISO date-time with UTC "Z" timezone',
  trim: '${path} must be a trimmed string',
  lowercase: '${path} must be a lowercase string',
  uppercase: '${path} must be a upper case string',
}

const number: Required<LocaleObject['number']> = {
  min: '${path} must be greater than or equal to ${min}',
  max: '${path} must be less than or equal to ${max}',
  lessThan: '${path} must be less than ${less}',
  moreThan: '${path} must be greater than ${more}',
  positive: '${path} must be a positive number',
  negative: '${path} must be a negative number',
  integer: '${path} must be an integer',
}

const date: Required<LocaleObject['date']> = {
  min: '${path} field must be later than ${min}',
  max: '${path} field must be at earlier than ${max}',
}

const boolean: LocaleObject['boolean'] = {
  isValue: '${path} field must be ${value}',
}

const object: Required<LocaleObject['object']> = {
  noUnknown: '${path} field has unspecified keys: ${unknown}',
  exact: '${path} object contains unknown properties: ${properties}',
}

const array: Required<LocaleObject['array']> = {
  min: '${path} field must have at least ${min} items',
  max: '${path} field must have less than or equal to ${max} items',
  length: '${path} must have ${length} items',
}

const tuple: Required<LocaleObject['tuple']> = {
  notType: (params) => {
    const { path, value, spec } = params
    const typeLen = spec.types.length
    if (Array.isArray(value)) {
      if (value.length < typeLen) {
        return `${path} tuple value has too few items, expected a length of ${typeLen} but got ${
          value.length
        } for value: \`${printValue(value, true)}\``
      }
      if (value.length > typeLen) {
        return `${path} tuple value has too many items, expected a length of ${typeLen} but got ${
          value.length
        } for value: \`${printValue(value, true)}\``
      }
    }

    return ValidationError.formatError(mixed.notType, params)
  },
}

export default Object.assign(Object.create(null), {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
  tuple,
}) as LocaleObject
