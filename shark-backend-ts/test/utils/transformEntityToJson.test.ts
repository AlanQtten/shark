import { test, expect, describe } from '@jest/globals';
import transformEntityToJson from 'utils/transformEntityToJson';

const JestInAndOut = [
  [null, []],
  [[], []],
  [[{ user_name: 'kang', user_age: 12 }], [{ userName: 'kang', userAge: 12 }]],
];

describe('transformEntityToJson', () => {
  JestInAndOut.forEach(([input, output]) => {
    test(`transformEntityToJson(${input ? JSON.stringify(input) : ''}) should be ${output}`, () => {
      expect(transformEntityToJson(input)).toStrictEqual(output);
    });
  });
});
