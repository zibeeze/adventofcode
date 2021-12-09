import * as _ from 'lodash';

export function getLowSpots(input: string[]) {
  let map = input.map((x) => x.split('').map((y) => +y));

  const lowSpots = [];
  for (let y = 0; y < map.length; y++) {
    const row = map[y];
    for (let x = 0; x < row.length; x++) {
      const elevation = row[x];
      let above = y - 1;
      let below = y + 1;
      let left = x - 1;
      let right = x + 1;
      if (above >= 0) {
        if (map[above][x] <= elevation) {
          continue;
        }
      }
      if (below < map.length) {
        if (map[below][x] <= elevation) {
          continue;
        }
      }
      if (left >= 0) {
        if (map[y][left] <= elevation) {
          continue;
        }
      }
      if (right < row.length) {
        if (map[y][right] <= elevation) {
          continue;
        }
      }
      lowSpots.push({ elevation, x, y });
    }
  }
  return { lowSpots, map };
}

export function partOne(input: string[]) {
  const { lowSpots, map } = getLowSpots(input);
  return _.sum(lowSpots.map((x) => x.elevation + 1));
}

export function partTwo(input: string[]) {
  let { lowSpots, map } = getLowSpots(input);
  let basinSizes = [];
  for (let i = 0; i < lowSpots.length; i++) {
    const lowSpot = lowSpots[i];
    let searched = search(map, lowSpot.x, lowSpot.y, {});
    basinSizes.push(Object.keys(searched).length);
  }
  const sorted = _.sortBy(basinSizes).reverse();
  return sorted[0] * sorted[1] * sorted[2];
}

function search(
  map: number[][],
  x: number,
  y: number,
  searched: { [name: string]: boolean }
) {
  let above = y - 1;
  let below = y + 1;
  let left = x - 1;
  let right = x + 1;
  searched[`${x}${y}`] = true;
  if (above >= 0) {
    if (map[above][x] < 9) {
      if (!searched[`${x}${above}`]) {
        Object.assign(searched, search(map, x, above, searched));
      }
    }
  }
  if (below < map.length) {
    if (map[below][x] < 9) {
      if (!searched[`${x}${below}`]) {
        Object.assign(searched, search(map, x, below, searched));
      }
    }
  }
  if (left >= 0) {
    if (map[y][left] < 9) {
      if (!searched[`${left}${y}`]) {
        Object.assign(searched, search(map, left, y, searched));
      }
    }
  }
  if (right < map[y].length) {
    if (map[y][right] < 9) {
      if (!searched[`${right}${y}`]) {
        Object.assign(searched, search(map, right, y, searched));
      }
    }
  }
  return searched;
}

function searchAbove(map: number[][], x: number, y: number) {
  let above = y - 1;
  let searched = {};
  searched[`${x}${y}`] = true;
  if (above >= 0) {
    if (map[above][x] < 9) {
      Object.assign(searched, searchAbove(map, x, above));
    }
  }
}
