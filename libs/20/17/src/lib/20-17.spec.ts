import { partOne, partTwo } from './20-17';
import { testInput, probInput } from './inputs';

describe('2017', () => {
  it('PART ONE', () => {
    expect(partOne(<string[]>testInput)).toEqual(112);
    console.log(`PART ONE ANSWER: ${partOne(<string[]>probInput)}`);
  });

  it.only('PART TWO', () => {
    expect(partTwo(<string[]>testInput)).toEqual(848);
    console.log(`PART TWO ANSWER: ${partTwo(<string[]>probInput)}`);
  });
});
