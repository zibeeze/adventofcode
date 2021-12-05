import { partOne, partTwo } from './21-5';
import { testInput, probInput } from './inputs';

describe('215', () => {
  it('PART ONE', () => {
    expect(partOne(<string[]>testInput)).toEqual(5);
    console.log(`PART ONE ANSWER: ${partOne(<string[]>probInput)}`);
  });

  it('PART TWO', () => {
    expect(partTwo(<string[]>testInput)).toEqual(12);
    console.log(`PART TWO ANSWER: ${partTwo(<string[]>probInput)}`);
  });
});
