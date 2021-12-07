import { logInspect } from '@aoc/util';
import { log } from 'console';
import * as _ from 'lodash';
export function partOne(input: string[]) {
  const myTicket = input[1]
    .split('\n')[1]
    .split(',')
    .map((x) => +x);
  const parsed = input[0]
    .split('\n')
    .map((x) =>
      x
        .split(': ')
        .map((y, index) =>
          index === 0
            ? y
            : y.split(' or ').map((y) => y.split('-').map((x) => +x))
        )
    );

  const validRanges: any = {};
  parsed.forEach((parse) => {
    validRanges[<string>parse[0]] = {};
    (<number[][]>parse[1]).forEach((range) => {
      for (let i = range[0]; i < range[1] + 1; i++) {
        validRanges[<string>parse[0]][i] = true;
      }
    });
  });
  const allAccepted = {};
  let invalid = 0;
  Object.keys(validRanges).forEach((key) => {
    Object.assign(allAccepted, validRanges[key]);
  });

  const nearby = input[2]
    .split('\n')
    .filter((x) => x !== 'nearby tickets:')
    .map((x) =>
      x.split(',').map((x) => {
        const result = +x;
        if (!allAccepted[result]) invalid += result;
        return result;
      })
    )
    .filter((x) => x.map((y) => allAccepted[y]).every((y) => y === true));

  const keys = Object.keys(validRanges);
  let couldBeValid = {};
  keys.forEach((key) => (couldBeValid[key] = []));
  nearby.forEach((ticket) => {
    for (let i = 0; i < ticket.length; i++) {
      const id = ticket[i];
      keys.forEach((key) => {
        if (validRanges[key][id]) couldBeValid[key].push(i);
      });
    }
  });
  keys.forEach((key) => {
    let count = _.countBy(couldBeValid[key]);
    Object.keys(count).forEach((cKey) => {
      let c = count[cKey];
      if (c < nearby.length) {
        couldBeValid[key] = couldBeValid[key].filter((x) => x !== +cKey);
      }
    });
  });
  keys.forEach((key) => {
    couldBeValid[key] = (<number[]>couldBeValid[key]).filter(
      (x, i, array) => array.indexOf(x) === i
    );
  });

  const translated = {};

  let found = 0;
  do {
    keys.forEach((key) => {
      if (couldBeValid[key].length === 1) {
        found += 1;
        let value = couldBeValid[key][0];
        translated[key] = value;
        keys.forEach((xKey) => {
          couldBeValid[xKey] = couldBeValid[xKey].filter((x) => x !== value);
        });
      }
    });
  } while (found < keys.length);

  const actualTicket = {};
  keys.forEach((key) => {
    actualTicket[key] = myTicket[translated[key]];
  });

  let departureProduct = 1;
  keys
    .filter((x) => x.startsWith('departure'))
    .map((x) => (departureProduct *= actualTicket[x]));
  return { invalid, actualTicket, departureProduct };
}

export function partTwo(input) {}
