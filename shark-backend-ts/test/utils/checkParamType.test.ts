import { test, expect, describe } from '@jest/globals';
import checkParamType from 'utils/checkParamType';
import requestParamType from 'enums/requestParamType';

const JestInAndOut = [
  [
    {
      type: requestParamType.ParamString,
      default: '123',
      required: false,
    },
    {
      pass: true,
      message: 'xxx',
    },
  ],
];

describe('checkParamType', () => {
  JestInAndOut.forEach(([input, output]) => {
    test(`checkParamType(${input}) should be ${output}`, () => {
      // @ts-ignore
      expect(checkParamType(input)).toStrictEqual(output);
    });
  });
});
