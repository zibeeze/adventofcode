import { partOne, partTwo } from './21-10';
import { testInput, probInput } from './inputs';

describe('2110', () => {
  it('PART ONE', () => {
    expect(partOne(<string[]>testInput)).toEqual(26397);
    console.log(`PART ONE ANSWER: ${partOne(<string[]>probInput)}`);
  });

  it('PART TWO', () => {
    expect(partTwo(<string[]>testInput)).toEqual(288957);
    console.log(`PART TWO ANSWER: ${partTwo(<string[]>probInput)}`);
  });
});
