import { calculate, partTwo } from './21-14';
import { testInput, probInput } from './inputs';

describe('2114', () => {
  it('PART ONE', () => {
    expect(calculate(<string[]>testInput, 10)).toEqual(1588);
    console.log(`PART ONE ANSWER: ${calculate(<string[]>probInput, 10)}`);
  });

  it.only('PART TWO', () => {
    expect(calculate(<string[]>testInput, 40)).toEqual(2188189693529);
    console.log(`PART TWO ANSWER: ${calculate(<string[]>probInput, 40)}`);
  });
});
