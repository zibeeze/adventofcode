import { partOne, partTwo } from './15-1';
import { testInput, probInput } from './inputs';

describe('151', () => {
  it('PART ONE', () => {
    expect(partOne(testInput)).toEqual(0);
    console.log(`PART ONE ANSWER: ${partOne(probInput)}`);
  });

  it('PART TWO', () => {
    expect(partTwo('()())')).toEqual(5);
    console.log(`PART TWO ANSWER: ${partTwo(probInput)}`);
  });
});
