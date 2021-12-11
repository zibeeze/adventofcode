import { TWO_DIMENSIONAL_NEIGHBOR_MOVES } from '@aoc/util';

let totalFlahes = 0;
export function partOne(input: string[]) {
  totalFlahes = 0;
  let octi = input.filter((x) => !!x).map((x) => x.split('').map((y) => +y));
  for (let i = 0; i < 100; i++) {
    octi = step(octi);
  }
  return totalFlahes;
}

function step(octi: number[][]) {
  const Y = octi.length;
  const X = octi[0].length;
  octi = increaseAll(octi);
  let flashed = {};

  for (let y = 0; y < Y; y++) {
    for (let x = 0; x < X; x++) {
      const octopus = octi[y][x];
      if (octopus > 9 && !flashed[`${x}${y}`]) {
        flashed[`${x}${y}`] = true;
        flash(octi, flashed, x, y);
      }
    }
  }
  octi = octi.map((x) => x.map((y) => (y >= 10 ? 0 : y)));
  return octi;
}

function flash(octi: number[][], flashed: any, x: number, y: number) {
  totalFlahes += 1;
  const YL = octi.length;
  const XL = octi[0].length;

  for (let i = 0; i < TWO_DIMENSIONAL_NEIGHBOR_MOVES.length; i++) {
    const move = TWO_DIMENSIONAL_NEIGHBOR_MOVES[i];
    const X = x + move[0];
    const Y = y + move[1];
    if (X >= 0 && X < XL && Y >= 0 && Y < YL) {
      octi[Y][X]++;
      if (octi[Y][X] > 9 && !flashed[`${X}${Y}`]) {
        flashed[`${X}${Y}`] = true;
        flash(octi, flashed, X, Y);
      }
    }
  }
}

function increaseAll(input: number[][]) {
  return input.map((x) => x.map((y) => ++y));
}

export function partTwo(input: string[]) {
  totalFlahes = 0;
  let startFlashes = 0;
  let delta;
  let octi = input.filter((x) => !!x).map((x) => x.split('').map((x) => +x));
  const compare = octi.length * octi[0].length;
  let currentStep = 0;
  do {
    currentStep++;
    octi = step(octi);
    delta = totalFlahes - startFlashes;
    startFlashes = totalFlahes;
  } while (compare !== delta);
  return currentStep;
}
