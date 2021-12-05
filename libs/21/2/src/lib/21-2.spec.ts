import { env } from 'process';
import { partOne, partTwo } from './21-2';
import { testInput, probInput } from './inputs';

describe('212', () => {
  it('PART ONE', () => {
    expect(partOne(testInput)).toEqual(150);
    console.log(`PART ONE ANSWER: ${partOne(probInput)}`);
  });

  it('PART TWO', () => {
    expect(partTwo(testInput)).toEqual(900);
    console.log(`PART TWO ANSWER: ${partTwo(probInput)}`);
  });
});
