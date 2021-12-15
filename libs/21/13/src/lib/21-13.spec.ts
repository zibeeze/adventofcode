import { partOne, partTwo } from './21-13';
import { testInput, probInput } from './inputs';

describe('2113', () => {
  it('PART ONE', () => {
    expect(partOne(<string[]>testInput)).toEqual(17);
    console.log(`PART ONE ANSWER: ${partOne(<string[]>probInput)}`);
  });

  it('PART TWO', () => {
    expect(partTwo(<string[]>testInput)).toEqual(
      '#####\n#   #\n#   #\n#   #\n#####\n     \n     '
    );
    console.log(`PART TWO ANSWER: \n \n${partTwo(<string[]>probInput)}`);
  });
});
