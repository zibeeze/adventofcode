import * as _ from 'lodash';
import { identity } from 'lodash';

export function partOne(input: string[]) {
  let pairs: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    xMax: number;
    yMax: number;
    isHorizontal: boolean;
    yDirection: number;
    xDirection: number;
  }[] = [];
  for (let i = 0; i < input.length; i++) {
    const inp = input[i];
    const split1 = inp.split(' -> ');
    const pair: any = {};
    for (let j = 0; j < split1.length; j++) {
      const split2 = split1[j].split(',');
      let index = j === 0 ? '1' : '2';
      pair[`x${index}`] = +split2[0];
      pair[`y${index}`] = +split2[1];
    }
    pairs.push(pair);
  }
  pairs = pairs
    .filter((pair) => {
      return pair.x1 === pair.x2 || pair.y1 === pair.y2;
    })
    .map((pair) => ({
      ...pair,
      xMax: pair.x1 > pair.x2 ? pair.x1 : pair.x2,
      xDirection: pair.x1 > pair.x2 ? -1 : 1,
      yMax: pair.y1 > pair.y2 ? pair.y1 : pair.y2,
      yDirection: pair.y1 > pair.y2 ? -1 : 1,
      isHorizontal: pair.y1 === pair.y2,
    }));
  const maxX = _.maxBy(pairs, 'xMax').xMax;
  const maxY = _.maxBy(pairs, 'yMax').yMax;

  let seaBottom = [];

  for (let y = 0; y < maxY + 1; y++) {
    let row = [];
    for (let x = 0; x < maxX + 1; x++) {
      row.push(0);
    }
    seaBottom.push(row);
  }
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    const length = pair.isHorizontal
      ? Math.abs(pair.x1 - pair.x2) + 1
      : Math.abs(pair.y1 - pair.y2) + 1;
    if (pair.isHorizontal) {
      for (let d = 0; d < length; d++) {
        seaBottom[pair.y1][pair.x1 + d * pair.xDirection] += 1;
      }
    } else {
      for (let d = 0; d < length; d++) {
        seaBottom[pair.y1 + d * pair.yDirection][pair.x1] += 1;
      }
    }
  }

  let count = 0;
  for (let i = 0; i < seaBottom.length; i++) {
    const row = seaBottom[i];
    for (let j = 0; j < row.length; j++) {
      const floor = row[j];
      if (floor > 1) count++;
    }
  }
  return count;
}

export function partTwo(input: string[]) {
  let pairs: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    xMax: number;
    yMax: number;
    isHorizontal: boolean;
    isVertical: boolean;
    yDirection: number;
    xDirection: number;
  }[] = [];
  for (let i = 0; i < input.length; i++) {
    const inp = input[i];
    const split1 = inp.split(' -> ');
    const pair: any = {};
    for (let j = 0; j < split1.length; j++) {
      const split2 = split1[j].split(',');
      let index = j === 0 ? '1' : '2';
      pair[`x${index}`] = +split2[0];
      pair[`y${index}`] = +split2[1];
    }
    pairs.push(pair);
  }
  pairs = pairs.map((pair) => ({
    ...pair,
    xMax: pair.x1 > pair.x2 ? pair.x1 : pair.x2,
    xDirection: pair.x1 > pair.x2 ? -1 : 1,
    yMax: pair.y1 > pair.y2 ? pair.y1 : pair.y2,
    yDirection: pair.y1 > pair.y2 ? -1 : 1,
    isHorizontal: pair.y1 === pair.y2,
    isVertical: pair.x1 === pair.x2,
  }));
  const maxX = _.maxBy(pairs, 'xMax').xMax;
  const maxY = _.maxBy(pairs, 'yMax').yMax;

  let seaBottom = [];

  for (let y = 0; y < maxY + 1; y++) {
    let row = [];
    for (let x = 0; x < maxX + 1; x++) {
      row.push(0);
    }
    seaBottom.push(row);
  }
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    const length = pair.isHorizontal
      ? Math.abs(pair.x1 - pair.x2) + 1
      : Math.abs(pair.y1 - pair.y2) + 1;
    if (pair.isHorizontal) {
      for (let d = 0; d < length; d++) {
        seaBottom[pair.y1][pair.x1 + d * pair.xDirection] += 1;
      }
    } else if (pair.isVertical) {
      for (let d = 0; d < length; d++) {
        seaBottom[pair.y1 + d * pair.yDirection][pair.x1] += 1;
      }
    } else {
      for (let d = 0; d < length; d++) {
        seaBottom[pair.y1 + d * pair.yDirection][
          pair.x1 + d * pair.xDirection
        ] += 1;
      }
    }
  }

  let count = 0;
  for (let i = 0; i < seaBottom.length; i++) {
    const row = seaBottom[i];
    for (let j = 0; j < row.length; j++) {
      const floor = row[j];
      if (floor > 1) count++;
    }
  }
  return count;
}
