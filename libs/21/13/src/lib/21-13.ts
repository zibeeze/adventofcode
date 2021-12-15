import * as _ from 'lodash';

export function partOne(input: string[]) {
  //   for (let c = 0; c < commands.length; c++) {
  //     const command = commands[c];
  //     fold(paper, command);
  //   }
  //   console.log(paper);
  let { paper, commands } = getPaperAndCommands(input);
  fold(paper, commands[0]);
  return paper.flat(1).filter((x) => x === 1).length;
}

function getPaperAndCommands(input: string[]) {
  const coords = input[0].split('\n').map((x) => {
    let z = x.split(',');
    let result = { x: +z[0], y: +z[1] };
    return result;
  });
  let X = _.maxBy(coords, 'x').x;
  let Y = _.maxBy(coords, 'y').y;
  let paper: number[][] = [];
  for (let i = 0; i < Y + 1; i++) {
    const y = [];
    for (let j = 0; j < X + 1; j++) {
      y.push(0);
    }
    paper.push(y);
  }
  for (let i = 0; i < coords.length; i++) {
    const coord = coords[i];
    paper[coord.y][coord.x] = 1;
  }

  const commands = input[1].split('\n').map((x) => x.split('='));
  return { paper, commands };
}

function fold(paper: number[][], command: string[]) {
  const X = paper[0].length;
  const Y = paper.length;
  const foldLine = +command[1];
  switch (command[0]) {
    case 'fold along y':
      for (let from = foldLine; from < Y; from++) {
        const to = foldLine - (from - foldLine);
        if (to >= 0) {
          for (let x = 0; x < X; x++) {
            if (paper[from][x]) {
              paper[to][x] = 1;
            }
          }
        }
      }
      paper = paper.splice(foldLine);
      break;
    case 'fold along x':
      for (let y = 0; y < paper.length; y++) {
        for (let from = 0; from < X; from++) {
          const to = foldLine - (from - foldLine);
          if (to >= 0) {
            if (paper[y][from]) {
              paper[y][to] = 1;
            }
          }
        }
      }
      paper = paper.map((x) => x.splice(foldLine));
      break;

    default:
      break;
  }
}

export function partTwo(input: string[]) {
  let { paper, commands } = getPaperAndCommands(input);
  for (let c = 0; c < commands.length; c++) {
    const command = commands[c];
    fold(paper, command);
  }

  let answer = paper
    .map((x) => x.map((y) => (y === 1 ? '#' : ' ')).join(''))
    .join('\n');
  return answer;
}
