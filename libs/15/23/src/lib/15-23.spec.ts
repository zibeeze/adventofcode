import { partOne, partTwo } from './15-23';
import { testInput, probInput } from './inputs';

describe('1523', () => {
  it.only('PART ONE', () => {
    expect(partOne(testInput)).toEqual();
    console.log(`PART ONE ANSWER: ${partOne(probInput)}`);
  });

  //it.only('PART TWO', () => {
  //    expect(partTwo(testInput)).toEqual('');
  //    console.log(`PART TWO ANSWER: ${partTwo(probInput)}`);
  //});
});
