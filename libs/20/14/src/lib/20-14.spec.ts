import { partOne, partTwo } from './20-14';
import { testInput, testInput2, probInput } from './inputs';

describe('2014', () => {
  it('PART ONE', () => {
    expect(partOne(<string[]>testInput)).toEqual(165);
    console.log(`PART ONE ANSWER: ${partOne(<string[]>probInput)}`);
  });

  it.only('PART TWO', () => {
    expect(partTwo(<string[]>testInput2)).toEqual(208);
    console.log(`PART TWO ANSWER: ${partTwo(<string[]>probInput)}`);
  });
});
