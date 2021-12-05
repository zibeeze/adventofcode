import { partOne, partTwo } from './21-3';
import { testInput, probInput } from './inputs';

describe('213', () => {
  it('PART ONE', () => {
    expect(partOne(<string[]>testInput)).toEqual(198);
    console.log(`PART ONE ANSWER: ${partOne(<string[]>probInput)}`);
  });

  it('PART TWO', () => {
    expect(partTwo(<string[]>testInput)).toEqual(230);
    console.log(`PART TWO ANSWER: ${partTwo(<string[]>probInput)}`);
  });
});
