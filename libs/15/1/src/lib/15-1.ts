export function partOne(input: string) {
  let floor = 0;
  let part2: number;
  for (let i = 0; i < input.length; i++) {
    const chara = input.charAt(i);
    chara === '(' ? floor++ : floor--;
    if (floor === -1) {
      if (part2 === undefined) {
        part2 = i + 1;
      }
    }
  }
  return floor;
}

export function partTwo(input) {
  let floor = 0;
  let part2: number;
  for (let i = 0; i < input.length; i++) {
    const chara = input.charAt(i);
    chara === '(' ? floor++ : floor--;
    if (floor === -1) {
      if (part2 === undefined) {
        part2 = i + 1;
      }
    }
  }
  return part2;
}
