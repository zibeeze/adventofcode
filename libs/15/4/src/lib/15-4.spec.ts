import { mine } from './15-4';
import { testInput, probInput } from './inputs';

describe('154', () => {
  it.only('PART ONE', () => {
    expect(mine(testInput, '00000')).toEqual(609043);
    console.log(`PART ONE ANSWER: ${mine(probInput, '00000')}`);
    console.log(`PART TWO ANSWER: ${mine(probInput, '000000')}`);
  });
});
