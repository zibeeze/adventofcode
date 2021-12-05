import { partOne, partTwo } from './15-2';
import { testInput, probInput } from './inputs';

describe('152', () => {
  it('PART ONE', () => {
    expect(partOne(<string[]>testInput)).toEqual(101);
    console.log(`PART ONE ANSWER: ${partOne(<string[]>probInput)}`);
  });

  it('PART TWO', () => {
    expect(partTwo(<string[]>testInput)).toEqual(48);
    console.log(`PART TWO ANSWER: ${partTwo(<string[]>probInput)}`);
  });
});
