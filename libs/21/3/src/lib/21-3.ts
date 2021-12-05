export function partOne(input: string[]) {
  let epsilonRate = '';
  let gammaRate = '';
  for (let i = 0; i < input[0].length; i++) {
    let zero = 0;
    let one = 0;
    input.forEach((char) => {
      if (char[i] === '0') {
        zero += 1;
      } else {
        one += 1;
      }
    });
    if (zero > one) {
      epsilonRate += '1';
      gammaRate += '0';
    } else {
      epsilonRate += '0';
      gammaRate += '1';
    }
  }
  return parseInt(epsilonRate, 2) * parseInt(gammaRate, 2);
}

export function partTwo(input: string[]) {
  return oxygen(input) * co2(input);
}

function oxygen(input: string[]) {
  let remaining = [...input];

  for (let i = 0; i < input[0].length; i++) {
    let keep = [];
    if (remaining.length === 1) {
      break;
    }
    let zero = 0;
    let one = 0;
    remaining.forEach((char) => {
      if (char[i] === '0') {
        zero += 1;
      } else {
        one += 1;
      }
    });
    let z;
    if (zero > one) {
      z = '0';
    } else if (zero === one) {
      z = '1';
    } else {
      z = '1';
    }
    remaining.forEach((char) => {
      if (char[i] === z) {
        keep.push(char);
      }
    });

    remaining = keep;
  }
  return parseInt(remaining[0], 2);
}
function co2(input: string[]) {
  let remaining = [...input];

  for (let i = 0; i < 12; i++) {
    let keep = [];
    if (remaining.length === 1) {
      break;
    }
    let zero = 0;
    let one = 0;
    remaining.forEach((char) => {
      if (char[i] === '0') {
        zero += 1;
      } else {
        one += 1;
      }
    });
    let z;
    if (zero < one) {
      z = '0';
    } else if (zero === one) {
      z = '0';
    } else {
      z = '1';
    }
    remaining.forEach((char) => {
      if (char[i] === z) {
        keep.push(char);
      }
    });

    remaining = keep;
  }
  return parseInt(remaining[0], 2);
}
