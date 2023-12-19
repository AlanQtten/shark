import { test, expect, describe } from '@jest/globals';
import isValidDate from 'utils/isValidDate';

const JestInAndOut = [
  ['ttt', false],
  ['2023-04-07 13:55:20', true],
  ['202-1-04-07 13:55:20', false],
  ['ss02-04-07 13:55:20', false],
  ['2023-14-07 13:55:20', false],
  ['2000-02-29 13:55:20', true],
  ['2001-02-29 13:55:20', false],
  ['2001-02-29 13:55:20', false],
  ['2001-04-31 13:55:20', false],
  ['2001-04-999 13:55:20', false],
  ['2023-04-07 -1x:55:20', false],
  ['2023-04-07 24:55:20', false],
  ['2023-04-07 00:55:20', true],
  ['2023-04-07 13:00:20', true],
  ['2023-04-07 13:60:20', false],
  ['2023-04-07 13:59:20', true],
  ['2023-04-07 13:59:00', true],
  ['2023-04-07 13:59:60', false],
  ['2023-04-07 13:59:-1x', false],
];

describe('isValidDate', () => {
  JestInAndOut.forEach(([input, output]) => {
    test(`isValidDate(${input}) should be ${output}`, () => {
      expect(isValidDate(input)).toBe(output);
    });
  });
});
