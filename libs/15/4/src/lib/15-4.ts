import * as md5 from 'md5';

export function mine(input: string, compare: string) {
  let i = -1;
  let cont = true;
  while (cont) {
    i++;
    let hash: string = md5(`${input}${i}`);
    let check = hash.slice(0, compare.length);
    if (check === compare) {
      cont = false;
    }
  }
  return i;
}
