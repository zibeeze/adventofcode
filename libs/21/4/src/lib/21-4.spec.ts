import { partOne, partTwo } from './21-4';
import { testInput, probInput } from './inputs';

describe('214', () => {
  it('PART ONE', () => {
    expect(partOne(<string[]>testInput)).toEqual(4512);
    console.log(`PART ONE ANSWER: ${partOne(<string[]>probInput)}`);
  });

  it('PART TWO', () => {
    expect(partTwo(testInput)).toEqual(1924);
    console.log(`PART TWO ANSWER: ${partTwo(probInput)}`);
  });
});
