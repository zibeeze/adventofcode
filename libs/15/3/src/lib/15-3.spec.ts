import { Deliver } from './15-3';
import { testInput, probInput } from './inputs';

describe('153', () => {
  it('PART ONE', () => {
    const partOne = new Deliver(testInput, 'ONE');
    expect(partOne.answer()).toEqual(4);
    console.log(`PART ONE ANSWER: ${new Deliver(probInput, 'ONE').answer()}`);
  });

  it('PART TWO', () => {
    const partTwo = new Deliver(testInput, 'TWO');
    expect(partTwo.answer()).toEqual(3);
    console.log(`PART TWO ANSWER: ${new Deliver(probInput, 'TWO').answer()}`);
  });
});
