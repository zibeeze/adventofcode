import { partOne, partTwo } from './20-1';
import { testInput, probInput } from './inputs';

describe('201', () => {
  it.only('PART ONE', () => {
    expect(partOne(<number[]>testInput)).toEqual(514579);
    console.log(`PART ONE ANSWER: ${partOne(<number[]>probInput)}`);
  });

  it.only('PART TWO', () => {
    expect(partTwo(<number[]>testInput)).toEqual(241861950);
    console.log(`PART TWO ANSWER: ${partTwo(<number[]>probInput)}`);
  });
});
