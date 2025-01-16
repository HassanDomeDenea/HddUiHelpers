"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tuple = exports.array = exports.object = exports.boolean = exports.date = exports.number = exports.string = exports.mixed = void 0;
var yup_1 = require("yup");
exports.mixed = {
    default: '${path} غير صحيح',
    required: '${path} مطلوب',
    defined: '${path} يجب ان يكون معرف',
    notNull: '${path} لا يمكن أن يكون فارغاً',
    oneOf: '${path} لا بد أن يكون أحد القيم: ${values}',
    notOneOf: '${path} لا بد أن لا يكون أحد القيم: ${values}',
    notType: function (_a) {
        var path = _a.path, type = _a.type, value = _a.value, originalValue = _a.originalValue;
        var castMsg = originalValue != null && originalValue !== value
            ? " (cast from the value `".concat((0, yup_1.printValue)(originalValue, true), "`).")
            : '.';
        return type !== 'mixed'
            ? "".concat(path, " must be a `").concat(type, "` type, ")
                + "but the final value was: `".concat((0, yup_1.printValue)(value, true), "`").concat(castMsg)
            : "".concat(path, " must match the configured type. ")
                + "The validated value was: `".concat((0, yup_1.printValue)(value, true), "`").concat(castMsg);
    },
};
exports.string = {
    length: '${path} يجب ان يتكون من ${length} حرف',
    min: '${path} يجب أن يتكون على الأقل من ${min} حرف',
    max: '${path} يجب أن يتكون على الأكثر من ${max} حرف',
    matches: '${path} يجب أن يكون مطابق لـ: "${regex}"',
    email: '${path} يجب أن يكون بريد الكتروني صحيح',
    url: '${path} يجب أن يكون رابط صحيح',
    uuid: '${path} must be a valid UUID',
    datetime: '${path} must be a valid ISO date-time',
    datetime_precision: '${path} must be a valid ISO date-time with a sub-second precision of exactly ${precision} digits',
    datetime_offset: '${path} must be a valid ISO date-time with UTC "Z" timezone',
    trim: '${path} must be a trimmed string',
    lowercase: '${path} must be a lowercase string',
    uppercase: '${path} must be a upper case string',
};
exports.number = {
    min: '${path} must be greater than or equal to ${min}',
    max: '${path} must be less than or equal to ${max}',
    lessThan: '${path} must be less than ${less}',
    moreThan: '${path} must be greater than ${more}',
    positive: '${path} must be a positive number',
    negative: '${path} must be a negative number',
    integer: '${path} must be an integer',
};
exports.date = {
    min: '${path} field must be later than ${min}',
    max: '${path} field must be at earlier than ${max}',
};
exports.boolean = {
    isValue: '${path} field must be ${value}',
};
exports.object = {
    noUnknown: '${path} field has unspecified keys: ${unknown}',
    exact: '${path} object contains unknown properties: ${properties}',
};
exports.array = {
    min: '${path} field must have at least ${min} items',
    max: '${path} field must have less than or equal to ${max} items',
    length: '${path} must have ${length} items',
};
exports.tuple = {
    notType: function (params) {
        var path = params.path, value = params.value, spec = params.spec;
        var typeLen = spec.types.length;
        if (Array.isArray(value)) {
            if (value.length < typeLen) {
                return "".concat(path, " tuple value has too few items, expected a length of ").concat(typeLen, " but got ").concat(value.length, " for value: `").concat((0, yup_1.printValue)(value, true), "`");
            }
            if (value.length > typeLen) {
                return "".concat(path, " tuple value has too many items, expected a length of ").concat(typeLen, " but got ").concat(value.length, " for value: `").concat((0, yup_1.printValue)(value, true), "`");
            }
        }
        return yup_1.ValidationError.formatError(exports.mixed.notType, params);
    },
};
exports.default = Object.assign(Object.create(null), {
    mixed: exports.mixed,
    string: exports.string,
    number: exports.number,
    date: exports.date,
    object: exports.object,
    array: exports.array,
    boolean: exports.boolean,
    tuple: exports.tuple,
});
