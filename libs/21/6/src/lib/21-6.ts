export function ageFish(input: number[], days: number) {
  let totalFish = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  };

  for (let i = 0; i < input.length; i++) {
    const lf = input[i];
    totalFish[lf]++;
  }

  for (let i = 0; i < days; i++) {
    const newFish = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
    };
    Object.keys(newFish).forEach((age) => {
      let count = totalFish[age];
      let newAge = +age - 1;
      if (newAge < 0) {
        newFish[6] += count;
        newFish[8] += count;
      } else {
        newFish[newAge] += count;
      }
    });
    totalFish = newFish;
  }
  let sum = 0;
  Object.keys(totalFish).forEach((age) => {
    sum += totalFish[age];
  });
  return sum;
}
