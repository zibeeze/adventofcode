import * as _ from 'lodash';

export function partOne(input: string[]) {
  let score = 0;
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const result = checkLine(line);
    if (result.incorrect) {
      switch (result.incorrect) {
        case ')':
          score += 3;
          break;
        case ']':
          score += 57;
          break;
        case '}':
          score += 1197;
          break;
        case '>':
          score += 25137;
          break;

        default:
          break;
      }
    }
  }
  return score;
}

function checkLine(line: string) {
  let open = [];
  let incorrect;
  for (let i = 0; i < line.length; i++) {
    const command = line[i];
    switch (command) {
      case '(':
      case '[':
      case '{':
      case '<':
        open.push(command);
        break;

      case ')':
      case ']':
      case '}':
      case '>':
        if (open.length) {
          const opener = open.pop();
          switch (command) {
            case ')':
              if (opener !== '(') {
                incorrect = command;
                break;
              }
              break;
            case ']':
              if (opener !== '[') {
                incorrect = command;
                break;
              }
              break;
            case '}':
              if (opener !== '{') {
                incorrect = command;
                break;
              }
              break;
            case '>':
              if (opener !== '<') {
                incorrect = command;
                break;
              }
              break;

            default:
              break;
          }
        } else {
          incorrect = command;
          break;
        }
        break;

      default:
        break;
    }
  }
  return { incorrect, open };
}

export function partTwo(input: string[]) {
  const incompletes = input
    .map((line) => checkLine(line))
    .filter((x) => !x.incorrect);
  let scores = [];
  for (let i = 0; i < incompletes.length; i++) {
    let s = 0;
    const inc = incompletes[i].open.reverse();
    for (let j = 0; j < inc.length; j++) {
      const closer = inc[j];
      s *= 5;
      switch (closer) {
        case '(':
          s += 1;
          break;
        case '[':
          s += 2;
          break;
        case '{':
          s += 3;
          break;
        case '<':
          s += 4;
          break;

        default:
          break;
      }
    }
    scores.push(s);
  }
  const sorted = _.sortBy(scores);
  const index = Math.floor(sorted.length / 2);
  return sorted[index];
}
