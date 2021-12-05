import { memory } from './20-15';
import { testInput, probInput } from './inputs';

describe('2015', () => {
  it('PART ONE', () => {
    expect(memory(<number[]>testInput, 2020)).toEqual(436);
    expect(memory([1, 3, 2], 2020)).toEqual(1);
    expect(memory([2, 1, 3], 2020)).toEqual(10);
    expect(memory([1, 2, 3], 2020)).toEqual(27);
    console.log(`PART ONE ANSWER: ${memory(<number[]>probInput, 2020)}`);
  });

  it('PART TWO', () => {
    expect(memory(<number[]>testInput, 30000000)).toEqual(175594);
    console.log(`PART TWO ANSWER: ${memory(<number[]>probInput, 30000000)}`);
  });
});
