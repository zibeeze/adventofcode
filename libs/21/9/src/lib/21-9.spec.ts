import { partOne, partTwo } from './21-9';
import { testInput, probInput } from './inputs';

describe('219', () => {
  it('PART ONE', () => {
    expect(partOne(<string[]>testInput)).toEqual(15);
    console.log(`PART ONE ANSWER: ${partOne(<string[]>probInput)}`);
  });

  it('PART TWO', () => {
    expect(partTwo(<string[]>testInput)).toEqual(1134);
    console.log(`PART TWO ANSWER: ${partTwo(<string[]>probInput)}`);
  });
});
