import { partOne, partTwo } from './21-11';
import { testInput, probInput } from './inputs';

describe('2111', () => {
  it('PART ONE', () => {
    expect(partOne(<string[]>testInput)).toEqual(1656);
    console.log(`PART ONE ANSWER: ${partOne(<string[]>probInput)}`);
  });

  it('PART TWO', () => {
    expect(partTwo(<string[]>testInput)).toEqual(195);
    console.log(`PART TWO ANSWER: ${partTwo(<string[]>probInput)}`);
  });
});
