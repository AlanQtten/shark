import { requestParamType } from 'enums/index';
import type RequestParamType from 'enums/requestParamType';
import { ParamConfig } from 'types/service';
import dayjs from 'dayjs';
import isValidDate from 'utils/isValidDate';
import dayjsPlus from 'utils/dayjsPlus';

const IS_REQUIRED = (key) => `${key} is required`;
const TYPE_MISMATCH = (type) => (key) => `${key} type mismatch, should be ${type}`;

export default function checkParamType({
  type,
  default: defaultValue,
  required,
} = {} as ParamConfig): {
  pass: boolean,
  message: (key: string) => string,
  defaultValue?: any
} {
  if (defaultValue === undefined) {
    if (required) {
      return { pass: false, message: IS_REQUIRED };
    }
    return { pass: true, message: (k) => k, defaultValue: generateValueByRequestParamType(type) };
  }

  switch (type) {
    case requestParamType.ParamString:
      if (typeof defaultValue !== 'string') {
        return {
          pass: false,
          message: TYPE_MISMATCH(type),
        };
      }
      break;
    case requestParamType.ParamNumber:
      if (typeof defaultValue !== 'number') {
        return {
          pass: false,
          message: TYPE_MISMATCH(type),
        };
      }
      break;
    case requestParamType.ParamDate:
      if (!isValidDate(defaultValue)) {
        return {
          pass: false,
          message: (key) => `${key} is not a valid date`,
        };
      }
      // for date str like '2022-01-01', fill with current time
      if (defaultValue.length === 10) {
        const now = dayjs();
        defaultValue = dayjsPlus
          .dayjs()
          .hour(now.hour())
          .minute(now.minute())
          .second(now.second())
          .format(dayjsPlus.getCommonFormatter());
      }

      break;
    default:
  }

  return {
    pass: true,
    message: (k) => k,
    defaultValue,
  };
}

function generateValueByRequestParamType(type: RequestParamType) {
  switch (type) {
    case requestParamType.ParamString: return '';
    case requestParamType.ParamNumber: return 0;
    case requestParamType.ParamDate: return dayjsPlus.dayjsF();
    default:
      return '';
  }
}
