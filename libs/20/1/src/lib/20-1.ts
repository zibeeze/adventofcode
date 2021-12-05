export function partOne(input: number[]): number {
  let result: number;
  for (let i = 0; i < input.length; i++) {
    const x = input[i];
    let shouldBreak = false;
    for (let j = 0; j < input.length; j++) {
      if (j !== i) {
        const y = input[j];
        if (x + y === 2020) {
          result = x * y;
          shouldBreak = true;
          break;
        }
      }
    }
    if (shouldBreak) break;
  }
  return result;
}

export function partTwo(input: number[]): number {
  let result: number;
  for (let i = 0; i < input.length; i++) {
    const x = input[i];
    let shouldBreak = false;
    for (let j = 0; j < input.length; j++) {
      const y = input[j];
      for (let k = 0; k < input.length; k++) {
        const z = input[k];
        if (x != y && y != z) {
          if (x + y + z === 2020) {
            result = x * y * z;
            shouldBreak = true;
          }
        }
      }
      if (shouldBreak) break;
    }
    if (shouldBreak) break;
  }
  return result;
}
