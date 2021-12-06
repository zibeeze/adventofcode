import { ageFish } from './21-6';
import { testInput, probInput } from './inputs';

describe('216', () => {
  it('PART ONE', () => {
    expect(ageFish(<number[]>testInput, 18)).toEqual(26);
    console.log(`PART ONE ANSWER: ${ageFish(<number[]>probInput, 80)}`);
  });

  it('PART TWO', () => {
    expect(ageFish(<number[]>testInput, 256)).toEqual(26984457539);
    console.log(`PART TWO ANSWER: ${ageFish(<number[]>probInput, 256)}`);
  });
});
