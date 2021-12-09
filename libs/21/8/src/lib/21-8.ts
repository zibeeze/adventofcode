import { filter, values } from 'lodash';

export function partOne(input: string[]) {
  let outputs = input
    .filter((x) => !!x)
    .map((x) => x.split(' | ')[1].split(' '));
  let occurences = 0;
  outputs.forEach((output) => {
    output.forEach((value) => {
      const length = value.length;
      if (length === 2 || length === 4 || length === 3 || length === 7) {
        occurences++;
      }
    });
  });
  return occurences;
}

export function partTwo(input: string[]) {
  let sum = 0;
  const filtered = input.filter((x) => !!x);
  filtered.forEach((line) => {
    sum += decode(line);
  });
  return sum;
}

function decode(line: string) {
  let split = line.split(' | ');
  let signals = split[0].split(' ');
  const outputs = split[1].split(' ');
  const codes = {};
  const numbers = {};

  // GET GIVEN
  for (let i = 0; i < signals.length; i++) {
    const signal = signals[i];
    switch (signal.length) {
      case 2:
        codes[signal] = 1;
        numbers[1] = signal;
        break;

      case 4:
        codes[signal] = 4;
        numbers[4] = signal;
        break;

      case 3:
        codes[signal] = 7;
        numbers[7] = signal;
        break;

      case 7:
        codes[signal] = 8;
        numbers[8] = signal;
        break;

      default:
        break;
    }
  }

  let signals5 = signals.filter((x) => x.length === 5);
  let signals6 = signals.filter((x) => x.length === 6);

  // FIND 9 OUT OF SIXES, IT CONTAINS ALL OF 4
  numbers[9] = findSignalContained(signals6, numbers[4]);
  codes[numbers[9]] = 9;
  signals6 = signals6.filter((x) => x !== numbers[9]);

  // FIND 0 NOW BECAUSE IT CONTAINS 1
  numbers[0] = findSignalContained(signals6, numbers[1]);
  codes[numbers[0]] = 0;
  signals6 = signals6.filter((x) => x !== numbers[0]);

  // 6 REMAINS
  numbers[6] = signals6[0];
  codes[numbers[6]] = 6;

  // FIND 3 OUT OF FIVES, IT CONTAINS ALL OF 1
  numbers[3] = findSignalContained(signals5, numbers[1]);
  codes[numbers[3]] = 3;
  signals5 = signals5.filter((x) => x !== numbers[3]);

  // COMAPARE LAST TWO (2,5) TO 6, 5 IS FULLY INCLUDED IN 6;

  for (let i = 0; i < signals5.length; i++) {
    const signal = signals5[i];
    let shouldBreak = false;
    for (let j = 0; j < signal.length; j++) {
      const char = signal[j];
      if (numbers[6].indexOf(char) === -1) {
        numbers[2] = signal;
        codes[signal] = 2;
      }
    }
    if (shouldBreak) {
      break;
    }
  }
  numbers[5] = signals5.filter((x) => x !== numbers[2])[0];
  codes[numbers[5]] = 5;

  let number = '';
  const keys5 = [numbers[2], numbers[3], numbers[5]];
  const keys6 = [numbers[0], numbers[6], numbers[9]];
  for (let i = 0; i < outputs.length; i++) {
    const output = outputs[i];
    switch (output.length) {
      case 2:
        number += 1;
        continue;
        break;
      case 3:
        number += 7;
        continue;
        break;
      case 4:
        number += 4;
        continue;
        break;
      case 7:
        number += 8;
        continue;
        break;
      case 5:
        for (let i = 0; i < keys5.length; i++) {
          const code = keys5[i];
          let shouldBreak = false;
          for (let j = 0; j < code.length; j++) {
            const char = code[j];
            if (output.indexOf(char) === -1) {
              break;
            }
            if (j === code.length - 1) {
              number += codes[code];
              shouldBreak = true;
              break;
            }
          }
          if (shouldBreak) {
            break;
          }
        }
        break;
      case 6:
        for (let i = 0; i < keys6.length; i++) {
          const code = keys6[i];
          let shoudBreak = false;
          for (let j = 0; j < code.length; j++) {
            const char = code[j];
            if (output.indexOf(char) === -1) {
              break;
            }
            if (j === code.length - 1) {
              number += codes[code];
              shoudBreak = true;
              break;
            }
          }
          if (shoudBreak) {
            break;
          }
        }
        break;
      default:
        break;
    }
  }
  return +number;
}

function findSignalContained(array: string[], code: string) {
  for (let i = 0; i < array.length; i++) {
    const signal = array[i];
    let shouldBreak = false;
    for (let j = 0; j < code.length; j++) {
      const char = code[j];
      if (signal.indexOf(char) === -1) {
        break;
      }
      if (j === code.length - 1) {
        return signal;
      }
    }
  }
}
