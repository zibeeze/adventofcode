export function memory(input: number[], position: number) {
  let spoken: { [name: number]: { diff: number; turn: number } } = {};
  let last: number;
  for (let i = 0; i < input.length; i++) {
    const x = input[i];
    spoken[x] = { diff: 0, turn: i };
    last = x;
  }
  for (let i = input.length; i < position; i++) {
    const lastSpoken = spoken[last];
    if (lastSpoken === undefined) {
      spoken[last] = { diff: 0, turn: i };
      last = 0;
    } else {
      if (lastSpoken.diff === 0) {
        spoken[0] = returnSpoken(0, spoken, i);
        last = 0;
      } else {
        spoken[lastSpoken.diff] = returnSpoken(lastSpoken.diff, spoken, i);
        last = lastSpoken.diff;
      }
    }
    // console.log(spoken);
  }
  return last;
}

function returnSpoken(
  number: number,
  spoken: { [name: number]: { diff: number; turn: number } },
  turn: number
) {
  let spoked = spoken[number];
  if (!spoked) {
    return { diff: 0, turn };
  } else {
    return { diff: turn - spoked.turn, turn };
  }
}
