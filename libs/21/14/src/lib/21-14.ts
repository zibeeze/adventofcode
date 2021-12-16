let counts = {};
let rules = {};
export function calculate(input: string[], depth: number) {
  counts = {};
  rules = {};
  let template = input[0];

  const r = input[1].split('\n').filter((x) => !!x);
  for (let i = 0; i < r.length; i++) {
    const rule = r[i].split(' -> ');
    rules[rule[0]] = rule[1];
    if (!counts[rule[1]]) counts[rule[1]] = 0;
  }
  const pairs = [];
  for (let i = 0; i < template.length - 1; i++) {
    pairs.push(`${template[i]}${template[i + 1]}`);
  }
  console.log(pairs);
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    step(pair, 0, depth);
  }
  counts[template[template.length - 1]]++;
  console.log(counts);
  // for (let i = 0; i < 10; i++) {
  //   let newTemplate = template[0];
  //   for (let j = 0; j < template.length - 1; j++) {
  //     const start = j;
  //     const end = start + 1;
  //     const insert = rules[`${template[start]}${template[end]}`];
  //     newTemplate += `${insert}${template[end]}`;
  //   }
  //   template = newTemplate;
  // }
  // console.log(template.length);
  //   const counts = {};
  // for (let i = 0; i < template.length; i++) {
  //   const e = template[i];
  //   if (!counts[e]) {
  //     counts[e] = 0;
  //   }
  //   counts[e]++;
  // }
  let max;
  let min;
  Object.keys(counts).forEach((e) => {
    if (!max) max = counts[e];
    if (!min) min = counts[e];
    if (counts[e] > max) {
      max = counts[e];
    }
    if (counts[e] < min) {
      min = counts[e];
    }
  });
  console.log({ max, min });
  return max - min;
}

function step(pair: string, depth: number, totalDepth: number) {
  if (depth === totalDepth) {
    counts[pair[0]]++;
  } else {
    depth++;
    const insert = rules[pair];
    step(`${pair[0]}${insert}`, depth, totalDepth);
    step(`${insert}${pair[1]}`, depth, totalDepth);
  }
}

export function partTwo(input) {}
