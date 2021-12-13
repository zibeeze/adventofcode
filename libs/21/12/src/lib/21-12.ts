import { logInspect } from '@aoc/util';
import * as _ from 'lodash';
export function partOne(input: string[]) {
  let caves = getCaves(input);
  let paths = [];
  // START
  caves['start'].forEach((con) => {
    paths.push(['start', con]);
  });

  const finalPaths: string[][] = [];
  let foundAll;
  do {
    foundAll = false;
    const newPaths = [];
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const result = travel(path, caves);
      newPaths.push(...result.paths);
      finalPaths.push(...result.final);
    }
    paths = [];
    if (!newPaths.length) {
      foundAll = true;
    } else {
      paths = [...newPaths];
    }
  } while (!foundAll);
  return finalPaths.length;
}

function getCaves(input: string[]) {
  const connections = input.filter((x) => !!x).map((x) => x.split('-'));
  const caveHash = {};
  const caves: { [name: string]: string[] } = {};
  connections.forEach((con) => {
    if (!caveHash[con[0]]) {
      caveHash[con[0]] = {};
    }
    if (!caveHash[con[1]]) {
      caveHash[con[1]] = {};
    }
    caveHash[con[0]][con[1]] = true;
    caveHash[con[1]][con[0]] = true;
  });
  Object.keys(caveHash).forEach((name) => {
    caves[name] = Object.keys(caveHash[name]);
  });
  return caves;
}

function travel(
  path: string[],
  caves: { [name: string]: string[] },
  allowSecondVisit: boolean = false
) {
  const paths = [];
  const final = [];
  const currentCave = path[path.length - 1];
  for (let i = 0; i < caves[currentCave].length; i++) {
    const next = caves[currentCave][i];
    if (next === 'end') {
      final.push([...path, next]);
    } else if (next === 'start') {
      continue;
    } else {
      const isLowercase = next.toLowerCase() === next;
      if (isLowercase) {
        // IF IT IS LOWERCASE AND IT IS ALREADY IN THE PATH, THE PATH IS INVALID
        const hasVisited = path.indexOf(next) !== -1;
        if (hasVisited) {
          if (allowSecondVisit) {
            let counts = {};
            let allowed = true;
            for (let j = 0; j < path.length; j++) {
              const p = path[j];
              if (p.toLowerCase() === p) {
                if (counts[p]) {
                  allowed = false;
                  break;
                }
                counts[p] = true;
              }
            }
            if (!allowed) {
              continue;
            }
          } else {
            continue;
          }
        }
      }
      paths.push([...path, next]);
    }
  }
  return { paths, final };
}

export function getPaths(input: string[], allowSecondVisit: boolean) {
  let caves = getCaves(input);
  let paths = [];
  // START
  caves['start'].forEach((con) => {
    paths.push(['start', con]);
  });

  delete caves['start'];

  const finalPaths: string[][] = [];
  let foundAll;

  do {
    foundAll = false;
    const newPaths = [];
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const result = travel(path, caves, allowSecondVisit);
      newPaths.push(...result.paths);
      finalPaths.push(...result.final);
    }
    paths = [];
    if (!newPaths.length) {
      foundAll = true;
    } else {
      paths = [...newPaths];
    }
  } while (!foundAll);
  return finalPaths.length;
}
