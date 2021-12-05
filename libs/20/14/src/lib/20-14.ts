import { intToBinaryString } from '@aoc/util';
import * as _ from 'lodash';

export function partOne(input: string[]): number {
  const memory = {};
  let currentMask;
  for (let i = 0; i < input.length; i++) {
    const command = input[i];
    const split = command.split(' = ');
    const bank = split[0];
    const value = split[1];

    if (bank === 'mask') {
      currentMask = value;
    } else {
      let original = intToBinaryString(+value, 36);
      let result: string = '';
      for (let j = 0; j < currentMask.length; j++) {
        const mask = currentMask[j];
        const orig = original[j];
        switch (mask) {
          case 'X':
            result += orig;
            break;

          case '0':
            result += '0';
            break;

          case '1':
            result += '1';
            break;
          default:
            break;
        }
      }
      memory[bank] = parseInt(result, 2);
    }
  }

  const total = _.sum(Object.values(memory));
  return total;
}

export function partTwo(input: string[]) {
  const memory = {};
  let currentMask;
  for (let i = 0; i < input.length; i++) {
    const command = input[i];
    const split = command.split(' = ');
    const bank = split[0];
    const value = split[1];

    if (bank === 'mask') {
      currentMask = value;
    } else {
      const address = bank.replace('mem[', '').replace(']', '');
      let original = intToBinaryString(+address, 36);
      let result = [''];
      for (let j = 0; j < currentMask.length; j++) {
        const mask = currentMask[j];
        const orig = original[j];
        switch (mask) {
          case '0':
            result = result.map((x) => (x += orig));
            break;

          case '1':
            result = result.map((x) => (x += '1'));
            break;

          case 'X':
            const changed = [];
            result.forEach((res) => {
              changed.push(res + '0');
              changed.push(res + '1');
            });
            result = changed;
            break;

          default:
            break;
        }
      }
      result.forEach((res) => {
        memory[parseInt(res, 2)] = +value;
      });
    }
  }
  const total = _.sum(Object.values(memory));
  return total;
}
