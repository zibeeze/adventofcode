import { parseArrayFromText } from './util';

describe('util', () => {
  it('parse single', () => {
    expect(
      parseArrayFromText('./libs/util/src/lib/test.txt', ['\n'], true)
    ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(
      parseArrayFromText('./libs/util/src/lib/test.txt', ['\n'], false)
    ).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
  });

  it.only('parse multi', () => {
    expect(
      parseArrayFromText(
        './libs/util/src/lib/test-multi.txt',
        ['\n', ' '],
        true
      )
    ).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12],
    ]);
  });
});
