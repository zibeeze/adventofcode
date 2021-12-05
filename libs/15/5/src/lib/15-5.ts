export function partOne(input: string[]) {
  let correctStrings: number = 0;
  let incorrectCombos: { [name: string]: boolean } = {
    ab: true,
    cd: true,
    pq: true,
    xy: true,
  };
  let vowels: { [name: string]: boolean } = {
    a: true,
    e: true,
    i: true,
    o: true,
    u: true,
  };
  input.forEach((str) => {
    let vowel = 0;
    let twoInARow;
    let naughty;
    let lastChara;
    for (let i = 0; i < str.length; i++) {
      const chara = str[i];
      if (vowels[chara]) vowel++;
      if (lastChara != undefined) {
        if (lastChara === chara) {
          twoInARow = true;
        } else {
          naughty = incorrectCombos[`${lastChara}${chara}`];
          if (naughty) {
            break;
          }
        }
      }
      lastChara = chara;
    }
    if (!naughty) {
      if (vowel >= 3 && twoInARow) {
        correctStrings++;
      }
    }
  });

  return correctStrings;
}

export function partTwo(input: string[]) {
  let correctStrings: number = 0;
  let incorrectCombos: { [name: string]: boolean } = {
    ab: true,
    cd: true,
    pq: true,
    xy: true,
  };
  let vowels: { [name: string]: boolean } = {
    a: true,
    e: true,
    i: true,
    o: true,
    u: true,
  };
  input.forEach((str) => {
    let repeats = 0;
    let lastChara;
    let twoAgo;
    let threeAgo;
    let pairs: { [name: string]: number[] } = {};
    let hasPair = false;
    for (let i = 0; i < str.length; i++) {
      const chara = str.charAt(i);
      if (chara === twoAgo) {
        repeats++;
      }
      if (lastChara) {
        let pair = `${lastChara}${chara}`;
        if (pairs[pair]) {
          pairs[pair].push(i);
        } else {
          pairs[pair] = [i];
        }
      }
      threeAgo = twoAgo;
      twoAgo = lastChara;
      lastChara = chara;
    }
    let keys = Object.keys(pairs);
    for (let z = 0; z < keys.length; z++) {
      const key = keys[z];
      const pair = pairs[key];
      if (pair.length > 1) {
        if (pair[pair.length - 1] - pair[0] > 1) {
          hasPair = true;
        }
        if (hasPair) {
          break;
        }
      }
    }

    if (repeats > 0 && hasPair) {
      correctStrings++;
    }
  });

  return correctStrings;
}
