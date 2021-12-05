import { partOne, partTwo } from './21-1';
import { testInput, probInput } from './inputs';

describe('211', () => {
  it.only('PART ONE', () => {
    expect(partOne(<number[]>testInput)).toEqual(7);
    console.log(`PART ONE ANSWER: ${partOne(<number[]>probInput)}`);
  });

  it.only('PART TWO', () => {
    expect(partTwo(<number[]>testInput)).toEqual(5);
    console.log(`PART TWO ANSWER: ${partTwo(<number[]>probInput)}`);
  });
});
