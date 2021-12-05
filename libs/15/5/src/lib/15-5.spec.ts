import { partOne, partTwo } from './15-5';
import { testInput, probInput, testInput2 } from './inputs';

describe('155', () => {
  it('PART ONE', () => {
    expect(partOne(<string[]>testInput)).toEqual(2);
    console.log(`PART ONE ANSWER: ${partOne(<string[]>probInput)}`);
  });

  it('PART TWO', () => {
    expect(partTwo(<string[]>testInput2)).toEqual(2);
    console.log(`PART TWO ANSWER: ${partTwo(<string[]>probInput)}`);
  });
});
