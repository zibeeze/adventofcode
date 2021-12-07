import * as _ from 'lodash';

export function fuelUsage(input: number[]): any {
  let max = _.max(input);
  let min = _.min(input);

  let fuel = {};
  let fuel2 = {};
  for (let i = min; i < max + 1; i++) {
    fuel[i] = 0;
    fuel2[i] = 0;

    input.forEach((x) => {
      const n = Math.abs(i - x);
      const addition = (Math.pow(n, 2) + n) / 2;
      fuel2[i] += addition;
      fuel[i] += n;
    });
  }
  const used = Object.keys(fuel).map((x) => ({ place: x, fuel: fuel[x] }));
  const used2 = Object.keys(fuel2).map((x) => ({ place: x, fuel: fuel2[x] }));
  return {
    fuel: _.minBy(used, 'fuel').fuel,
    fuel2: _.minBy(used2, 'fuel').fuel,
  };
}
