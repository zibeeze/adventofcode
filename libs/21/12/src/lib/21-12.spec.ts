import { getPaths } from './21-12';
import { testInput, probInput } from './inputs';

describe('2112', () => {
  it('PART ONE', () => {
    expect(getPaths(<string[]>testInput, false)).toEqual(10);
    console.log(`PART ONE ANSWER: ${getPaths(<string[]>probInput, false)}`);
  });

  it('PART TWO', () => {
    expect(getPaths(<string[]>testInput, true)).toEqual(36);
    console.log(`PART TWO ANSWER: ${getPaths(<string[]>probInput, true)}`);
  });
});
