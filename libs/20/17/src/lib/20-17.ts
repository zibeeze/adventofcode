import * as _ from 'lodash';
import {
  THREE_DIMENSIONAL_NEIGHBOR_MOVES,
  FOUR_DIMENSIONAL_NEIGHBOR_MOVES,
} from '@aoc/util';
export function partOne(input: string[]) {
  let cube: any = [
    input
      .filter((x) => !!x)
      .map((x) => x.split('').map((x) => (x === '.' ? false : true))),
  ];
  for (let i = 0; i < 6; i++) {
    cube = cycleCube(cube);
  }
  return cube.flat(2).filter((x) => x).length;
}
function expandCube(cube: boolean[][][]) {
  const pocket = [];
  const newX = _.range(cube[0][0].length + 2).map((x) => false);
  const newZ = _.range(newX.length).map((x) => [...newX]);
  pocket.push([...newZ]);
  for (let i = 0; i < cube.length; i++) {
    let z = cube[i];
    z = z.map((x) => {
      return [false, ...x, false];
    });
    z.push([...newX]);
    z.unshift([...newX]);
    pocket.push([...z]);
  }
  pocket.push([...newZ]);
  return pocket;
}
function expandQuad(quad: boolean[][][][]) {
  const pocket = [];
  const newY = _.range(quad[0][0].length + 2).map((x) => false);
  const newZ = _.range(newY.length).map((x) => [...newY]);
  const newW = _.range(quad[0].length + 2).map((x) => [...newZ]);
  pocket.push([...newW]);
  for (let i = 0; i < quad.length; i++) {
    let w = quad[i];
    w = w.map((x) => {
      return [
        newY,
        ...x.map((y) => {
          return [false, ...y, false];
        }),
        newY,
      ];
    });
    w.push(newZ);
    w.unshift(newZ);
    pocket.push([...w]);
  }
  pocket.push([...newW]);
  return pocket;
}
function cycleCube(cube: boolean[][][]) {
  cube = expandCube(cube);
  let energized = [];
  for (let z = 0; z < cube.length; z++) {
    const Z = cube[z];
    const newZ = [];
    for (let y = 0; y < Z.length; y++) {
      const Y = Z[y];
      const newY = [];
      for (let x = 0; x < Y.length; x++) {
        const point = Y[x];
        const active = checkNeighborsCube(cube, x, y, z);
        if (point) {
          if (active === 2 || active === 3) {
            newY.push(true);
          } else {
            newY.push(false);
          }
        } else {
          if (active === 3) {
            newY.push(true);
          } else {
            newY.push(false);
          }
        }
      }
      newZ.push(newY);
    }
    energized.push(newZ);
  }
  return energized;
}
function cycleQuad(quad: boolean[][][][]) {
  quad = expandQuad(quad);
  let energized = [];
  for (let w = 0; w < quad.length; w++) {
    const W = quad[w];
    let newW = [];
    for (let z = 0; z < W.length; z++) {
      const Z = W[z];
      const newZ = [];
      for (let y = 0; y < Z.length; y++) {
        const Y = Z[y];
        const newY = [];
        for (let x = 0; x < Y.length; x++) {
          const point = Y[x];
          const active = checkNeighborsQuad(quad, x, y, z, w);
          if (point) {
            if (active === 2 || active === 3) {
              newY.push(true);
            } else {
              newY.push(false);
            }
          } else {
            if (active === 3) {
              newY.push(true);
            } else {
              newY.push(false);
            }
          }
        }
        newZ.push(newY);
      }
      newW.push(newZ);
    }
    energized.push(newW);
  }
  return energized;
}
function checkNeighborsCube(
  cube: boolean[][][],
  x: number,
  y: number,
  z: number
) {
  const ZL = cube.length;
  const XYL = cube[0].length;
  let active = 0;
  for (let i = 0; i < THREE_DIMENSIONAL_NEIGHBOR_MOVES.length; i++) {
    const move = THREE_DIMENSIONAL_NEIGHBOR_MOVES[i];
    const X = x + move[0];
    const Y = y + move[1];
    const Z = z + move[2];
    if (X >= 0 && X < XYL && Y >= 0 && Y < XYL && Z >= 0 && Z < ZL) {
      active += cube[Z][Y][X] ? 1 : 0;
    }
  }
  return active;
}
function checkNeighborsQuad(
  quad: boolean[][][][],
  x: number,
  y: number,
  z: number,
  w: number
) {
  const ZWL = quad.length;
  const XYL = quad[0][0].length;
  let active = 0;
  for (let i = 0; i < FOUR_DIMENSIONAL_NEIGHBOR_MOVES.length; i++) {
    const move = FOUR_DIMENSIONAL_NEIGHBOR_MOVES[i];
    const X = x + move[0];
    const Y = y + move[1];
    const Z = z + move[2];
    const W = w + move[3];
    if (
      X >= 0 &&
      X < XYL &&
      Y >= 0 &&
      Y < XYL &&
      Z >= 0 &&
      Z < ZWL &&
      W >= 0 &&
      W < ZWL
    ) {
      active += quad[W][Z][Y][X] ? 1 : 0;
    }
  }
  return active;
}
export function partTwo(input: string[]) {
  let quad: any = [
    [
      input
        .filter((x) => !!x)
        .map((x) => x.split('').map((x) => (x === '.' ? false : true))),
    ],
  ];
  for (let i = 0; i < 6; i++) {
    quad = cycleQuad(quad);
  }
  return quad.flat(3).filter((x) => x).length;
}
