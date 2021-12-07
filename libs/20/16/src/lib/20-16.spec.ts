import { partOne, partTwo } from './20-16';
import { testInput, probInput, testInput2 } from './inputs';

describe('2016', () => {
  it('PROBLEM', () => {
    const answer = partOne(<string[]>testInput);
    expect(answer.invalid).toEqual(71);
    const answer2 = partOne(<string[]>testInput2);
    expect(answer2.actualTicket['class']).toEqual(12);
    expect(answer2.actualTicket['row']).toEqual(11);
    expect(answer2.actualTicket['seat']).toEqual(13);
    const answerProb = partOne(<string[]>probInput);
    console.log(`PART ONE ANSWER: ${answer.invalid}`);
    console.log(`PART TWO ANSWER: ${answer.departureProduct}`);
  });
});
