import { fuelUsage } from './21-7';
import { testInput, probInput } from './inputs';

describe('217', () => {
  it.only('PART ONE', () => {
    const test = fuelUsage(<number[]>testInput);
    expect(test.fuel).toEqual(37);
    expect(test.fuel2).toEqual(168);
    const prob = fuelUsage(<number[]>probInput);
    console.log(`PART ONE ANSWER: ${prob.fuel}`);
    console.log(`PART TWO ANSWER: ${prob.fuel2}`);
  });
});
