export function partOne(input: number[]) {
  let increased = 0;
  let last = undefined;
  for (let i = 0; i < input.length; i++) {
    const x = input[i];
    if (last) {
      if (x > last) {
        increased += 1;
      }
    }
    last = x;
  }
  return increased;
}

export function partTwo(input: number[]) {
  let increased = 0;
  let last = undefined;
  for (let i = 0; i < input.length; i++) {
    const x = input[i];
    const y = input[i + 1];
    const z = input[i + 2];

    if (z) {
      const sum = x + y + z;
      if (last) {
        if (sum > last) {
          increased += 1;
        }
      }
      last = sum;
    }
  }
  return increased;
}
