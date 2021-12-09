import { partOne, partTwo } from './21-8';
import { testInput, probInput } from './inputs';

describe('218', () => {
  it('PART ONE', () => {
    expect(partOne(<string[]>testInput)).toEqual(26);
    console.log(`PART ONE ANSWER: ${partOne(<string[]>probInput)}`);
  });

  it('PART TWO', () => {
    expect(partTwo(<string[]>testInput)).toEqual(61229);
    console.log(`PART TWO ANSWER: ${partTwo(<string[]>probInput)}`);
  });
});
